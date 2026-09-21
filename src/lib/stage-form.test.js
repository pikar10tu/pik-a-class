import { describe, it, expect } from 'vitest';
import {
  STAGE_ITEM_TYPES,
  emptyStageState,
  stageStateFromDoc,
  toggleItem,
  moveItem,
  validateStage,
  buildStageDoc,
} from './stage-form.js';

const now = '2026-09-22T04:00:00.000Z';

function exercise(id, overrides = {}) {
  return {
    id,
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    choices: ['a', 'b'],
    answerKey: ['a'],
    reviewStatus: 'published',
    ...overrides,
  };
}

const library = {
  e1: exercise('e1'),
  e2: exercise('e2'),
  e3: exercise('e3', { type: 'fill_blank', choices: undefined, answerKey: ['went'] }),
};

function readyState(overrides = {}) {
  return emptyStageState({ title: 'Past Simple', order: 1, itemIds: ['e1', 'e2'], ...overrides });
}

describe('emptyStageState', () => {
  it('starts as a draft A1 grammar stage with the default threshold', () => {
    expect(emptyStageState()).toMatchObject({
      skill: 'grammar',
      level: 'A1',
      order: 1,
      title: '',
      passThreshold: 0.7,
      isPreview: false,
      reviewStatus: 'draft',
    });
    expect(emptyStageState().itemIds).toEqual([]);
  });

  it('only allows auto-gradable question types in a stage', () => {
    expect(STAGE_ITEM_TYPES).toEqual(['mcq', 'fill_blank']);
  });
});

describe('toggleItem', () => {
  it('adds an id that is not in the stage yet', () => {
    expect(toggleItem(emptyStageState(), 'e1').itemIds).toEqual(['e1']);
  });

  it('removes an id that is already there', () => {
    expect(toggleItem(readyState(), 'e1').itemIds).toEqual(['e2']);
  });

  it('does not mutate the state passed in', () => {
    const state = readyState();
    const snapshot = JSON.stringify(state);
    toggleItem(state, 'e1');
    expect(JSON.stringify(state)).toBe(snapshot);
  });

  it('adds an id that does not exist in the exercise pool at all (pure id bookkeeping)', () => {
    expect(toggleItem(readyState(), 'ghost').itemIds).toEqual(['e1', 'e2', 'ghost']);
  });
});

describe('moveItem', () => {
  it('moves an item later in the list', () => {
    expect(moveItem(readyState(), 0, 1).itemIds).toEqual(['e2', 'e1']);
  });

  it('does nothing at the edges', () => {
    expect(moveItem(readyState(), 0, -1).itemIds).toEqual(['e1', 'e2']);
    expect(moveItem(readyState(), 1, 1).itemIds).toEqual(['e1', 'e2']);
  });

  it('does not throw and does not corrupt order for an out-of-range index', () => {
    expect(moveItem(readyState(), 5, 1).itemIds).toEqual(['e1', 'e2']);
    expect(moveItem(readyState(), -1, 1).itemIds).toEqual(['e1', 'e2']);
  });

  it('does not mutate the state or its itemIds array passed in', () => {
    const state = readyState();
    const snapshot = JSON.stringify(state);
    const originalItemIds = state.itemIds;
    moveItem(state, 0, 1);
    expect(JSON.stringify(state)).toBe(snapshot);
    expect(state.itemIds).toBe(originalItemIds);
  });
});

describe('validateStage', () => {
  it('accepts a complete stage', () => {
    expect(validateStage(readyState(), library).valid).toBe(true);
  });

  it('requires a title', () => {
    const { valid, errors } = validateStage(readyState({ title: '  ' }), library);
    expect(valid).toBe(false);
    expect(errors.title).toBe('กรุณาตั้งชื่อด่าน');
  });

  it('requires at least one question', () => {
    const { errors } = validateStage(readyState({ itemIds: [] }), library);
    expect(errors.itemIds).toBe('ด่านต้องมีโจทย์อย่างน้อย 1 ข้อ');
  });

  it('refuses more than twenty questions', () => {
    const many = Array.from({ length: 21 }, (_, i) => `x${i}`);
    const { errors } = validateStage(readyState({ itemIds: many }), library);
    expect(errors.itemIds).toBe('ด่านมีโจทย์ได้ไม่เกิน 20 ข้อ');
  });

  it('refuses question types that cannot be graded automatically', () => {
    const shelf = { ...library, e4: exercise('e4', { type: 'paragraph', choices: undefined, answerKey: undefined }) };
    const { errors } = validateStage(readyState({ itemIds: ['e1', 'e4'] }), shelf);
    expect(errors.itemIds).toBe('ด่านรับเฉพาะข้อปรนัยและข้อเติมคำเท่านั้น');
  });

  it('blocks publishing a stage that still holds unpublished questions', () => {
    const shelf = { ...library, e2: exercise('e2', { reviewStatus: 'draft' }) };
    const state = readyState({ reviewStatus: 'published' });
    const { errors } = validateStage(state, shelf);
    expect(errors.reviewStatus).toBe('อนุมัติด่านไม่ได้ เพราะยังมีโจทย์ที่ยังไม่อนุมัติอยู่ในด่าน');
  });

  it('allows an unpublished question while the stage is still a draft', () => {
    const shelf = { ...library, e2: exercise('e2', { reviewStatus: 'draft' }) };
    expect(validateStage(readyState(), shelf).valid).toBe(true);
  });

  it('blocks opening a stage to free users while its questions are still closed', () => {
    // โจทย์ทั้งสองข้อยังเป็น isPreview: false (ค่าเริ่มต้นของ exercise() ในเทสนี้)
    const { valid, errors } = validateStage(readyState({ isPreview: true }), library);
    expect(valid).toBe(false);
    expect(errors.isPreview).toBe(
      'เปิดด่านนี้ให้ผู้ใช้ทั่วไปไม่ได้ เพราะมีโจทย์ 2 ข้อที่ยังไม่เปิดให้ผู้ใช้ทั่วไป ' +
        'ต้องไปเปิดโจทย์เหล่านั้นในคลังเนื้อหาก่อน หรือเอาออกจากด่าน',
    );
  });

  it('counts only the questions that are still closed', () => {
    const shelf = { ...library, e1: exercise('e1', { isPreview: true }) };
    const { errors } = validateStage(readyState({ isPreview: true }), shelf);
    expect(errors.isPreview).toContain('มีโจทย์ 1 ข้อ');
  });

  it('accepts a preview stage once every question is open to free users', () => {
    const shelf = {
      ...library,
      e1: exercise('e1', { isPreview: true }),
      e2: exercise('e2', { isPreview: true }),
    };
    const { valid, errors } = validateStage(readyState({ isPreview: true }), shelf);
    expect(valid).toBe(true);
    expect(errors.isPreview).toBeUndefined();
  });

  it('says nothing about preview questions while the stage itself is not preview', () => {
    expect(validateStage(readyState({ isPreview: false }), library).errors.isPreview).toBeUndefined();
  });

  it('warns when a question does not match the skill or level of the stage', () => {
    const shelf = { ...library, e2: exercise('e2', { level: 'B1' }) };
    const { valid, warnings } = validateStage(readyState(), shelf);
    expect(valid).toBe(true);
    // หมายเหตุ: ระดับของ readyState() คือ A1 ตามค่าเริ่มต้นของ emptyStageState()
    // (ตรึงไว้โดยเทส buildStageDoc ที่คาดหวัง level: 'A1') ข้อความเตือนจึงอ้างอิง (A1) ไม่ใช่ (A2)
    expect(warnings).toContain('โจทย์ข้อที่ 2 เป็นระดับ B1 ไม่ตรงกับด่าน (A1)');
  });

  it('warns when a blank cannot get three distractors from the stage', () => {
    const { warnings } = validateStage(readyState({ itemIds: ['e3'] }), library);
    expect(warnings).toContain('ข้อเติมคำข้อที่ 1 หาตัวเลือกลวงได้ไม่ครบ 3 ตัว เด็กจะเดาง่ายเกินไป');
  });

  it('reports an id that refers to an exercise that no longer exists as a missing-question error, not a crash', () => {
    const { valid, errors } = validateStage(readyState({ itemIds: ['e1', 'ghost'] }), library);
    expect(valid).toBe(false);
    expect(errors.itemIds).toBe('มีโจทย์บางข้อในด่านนี้ถูกลบไปแล้ว กรุณาเอาออก');
  });

  it('rejects a passThreshold above 1', () => {
    const { valid, errors } = validateStage(readyState({ passThreshold: 1.5 }), library);
    expect(valid).toBe(false);
    expect(errors.passThreshold).toBe('เกณฑ์ผ่านด่านต้องอยู่ระหว่าง 0% ถึง 100%');
  });

  it('rejects a negative passThreshold', () => {
    const { valid, errors } = validateStage(readyState({ passThreshold: -0.1 }), library);
    expect(valid).toBe(false);
    expect(errors.passThreshold).toBe('เกณฑ์ผ่านด่านต้องอยู่ระหว่าง 0% ถึง 100%');
  });
});

describe('buildStageDoc', () => {
  it('builds a document ready for Firestore', () => {
    const doc = buildStageDoc(readyState(), { adminUid: 'admin1', now });
    expect(doc).toEqual({
      skill: 'grammar',
      level: 'A1',
      order: 1,
      title: 'Past Simple',
      itemIds: ['e1', 'e2'],
      passThreshold: 0.7,
      isPreview: false,
      reviewStatus: 'draft',
      createdAt: now,
      updatedAt: now,
      createdBy: 'admin1',
    });
  });

  it('keeps the original creator and creation time when editing', () => {
    const existing = { createdAt: '2026-09-01T00:00:00.000Z', createdBy: 'admin2' };
    const doc = buildStageDoc(readyState(), { existing, adminUid: 'admin1', now });
    expect(doc.createdAt).toBe('2026-09-01T00:00:00.000Z');
    expect(doc.createdBy).toBe('admin2');
    expect(doc.updatedAt).toBe(now);
  });
});
