import { describe, it, expect } from 'vitest';
import {
  STAGE_ITEM_TYPES,
  emptyStageState,
  stageStateFromDoc,
  toggleTag,
  validateStage,
  buildStageDoc,
} from './stage-form.js';

const now = '2026-09-22T04:00:00.000Z';

function readyState(overrides = {}) {
  return emptyStageState({ title: 'Past Simple', order: 1, tags: ['grammar:past-simple'], ...overrides });
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
    expect(emptyStageState().tags).toEqual([]);
  });

  it('only allows auto-gradable question types in a stage', () => {
    expect(STAGE_ITEM_TYPES).toEqual(['mcq', 'fill_blank']);
  });
});

describe('toggleTag', () => {
  it('เพิ่มแท็กที่ยังไม่มี', () => {
    const next = toggleTag(emptyStageState(), 'grammar:past-simple');
    expect(next.tags).toEqual(['grammar:past-simple']);
  });

  it('เอาแท็กที่มีอยู่แล้วออก', () => {
    const state = emptyStageState({ tags: ['grammar:past-simple'] });
    expect(toggleTag(state, 'grammar:past-simple').tags).toEqual([]);
  });

  it('ไม่แก้ state เดิม', () => {
    const state = emptyStageState({ tags: ['a'] });
    const snapshot = JSON.stringify(state);
    toggleTag(state, 'b');
    expect(JSON.stringify(state)).toBe(snapshot);
  });
});

describe('validateStage กับคลังแบบแท็ก', () => {
  const ready = (overrides = {}) =>
    emptyStageState({ title: 'Past Simple', tags: ['grammar:past-simple'], ...overrides });
  const poolItem = (overrides = {}) => ({
    id: 'e1',
    type: 'mcq',
    level: 'A2',
    skill: 'grammar',
    isPreview: false,
    ...overrides,
  });
  const fullPool = Array.from({ length: 7 }, (_, i) => poolItem({ id: `e${i}` }));

  it('ผ่านเมื่อมีชื่อ แท็ก และคลังพอ', () => {
    expect(validateStage(ready(), fullPool).valid).toBe(true);
  });

  it('ไม่เลือกแท็กเลยถือว่าผิด', () => {
    const { valid, errors } = validateStage(ready({ tags: [] }), fullPool);
    expect(valid).toBe(false);
    expect(errors.tags).toBeTruthy();
  });

  it('จำนวนข้อต่อรอบนอกช่วงถือว่าผิด', () => {
    expect(validateStage(ready({ drawCount: 0 }), fullPool).errors.drawCount).toBeTruthy();
    expect(validateStage(ready({ drawCount: 99 }), fullPool).errors.drawCount).toBeTruthy();
  });

  it('คลังน้อยกว่าที่ตั้งไว้เป็นคำเตือน ไม่ใช่ error', () => {
    const { valid, warnings } = validateStage(ready(), [poolItem()]);
    expect(valid).toBe(true);
    expect(warnings.join(' ')).toContain('น้อยกว่าที่ตั้งไว้');
  });

  it('เปิดให้ผู้ใช้ทั่วไปแต่คลังไม่มีข้อ preview เลย เตือน', () => {
    const { valid, warnings } = validateStage(ready({ isPreview: true }), fullPool);
    expect(valid).toBe(true);
    expect(warnings.join(' ')).toContain('เด็กกลุ่มนั้นจะเจอด่านว่าง');
  });
});

describe('buildStageDoc กับคลังแบบแท็ก', () => {
  it('เก็บ tags และ drawCount ลงเอกสาร', () => {
    const doc = buildStageDoc(
      emptyStageState({ title: 'T', tags: ['grammar:past-simple'], drawCount: 5 }),
      { adminUid: 'admin1', now: '2026-09-21T00:00:00.000Z' },
    );
    expect(doc.tags).toEqual(['grammar:past-simple']);
    expect(doc.drawCount).toBe(5);
    expect(doc.itemIds).toBeUndefined();
  });
});

describe('validateStage', () => {
  it('accepts a complete stage', () => {
    expect(validateStage(readyState()).valid).toBe(true);
  });

  it('requires a title', () => {
    const { valid, errors } = validateStage(readyState({ title: '  ' }));
    expect(valid).toBe(false);
    expect(errors.title).toBe('กรุณาตั้งชื่อด่าน');
  });

  it('rejects a passThreshold above 1', () => {
    const { valid, errors } = validateStage(readyState({ passThreshold: 1.5 }));
    expect(valid).toBe(false);
    expect(errors.passThreshold).toBe('เกณฑ์ผ่านด่านต้องอยู่ระหว่าง 0% ถึง 100%');
  });

  it('rejects a negative passThreshold', () => {
    const { valid, errors } = validateStage(readyState({ passThreshold: -0.1 }));
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
      tags: ['grammar:past-simple'],
      drawCount: 7,
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
