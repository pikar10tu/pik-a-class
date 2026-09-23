import { describe, it, expect } from 'vitest';
import { validate } from './validate.js';

function mcq(overrides = {}) {
  return {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She ___ to school every day.',
    choices: ['go', 'goes', 'going'],
    answerKey: ['goes'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'draft',
    assignedUids: [],
    contentHash: 'abc123',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin-uid',
    ...overrides,
  };
}

describe('exercises schema', () => {
  it('accepts a valid MCQ', () => {
    expect(validate('exercises', mcq())).toEqual({ ok: true, errors: [] });
  });

  it('rejects an answerKey that is not one of the choices', () => {
    const result = validate('exercises', mcq({ answerKey: ['went'] }));
    expect(result.errors).toContainEqual({ field: 'answerKey', message: 'คำตอบ "went" ไม่มีอยู่ในตัวเลือก' });
  });

  it('rejects an MCQ with more than one correct answer', () => {
    const result = validate('exercises', mcq({ answerKey: ['go', 'goes'] }));
    expect(result.errors).toContainEqual({ field: 'answerKey', message: 'MCQ ต้องมีคำตอบถูกข้อเดียว' });
  });

  it('rejects duplicate choices', () => {
    const result = validate('exercises', mcq({ choices: ['goes', 'goes', 'going'] }));
    expect(result.errors).toContainEqual({ field: 'choices', message: 'ตัวเลือกห้ามซ้ำกัน' });
  });

  it('requires a rubric for written answers and forbids choices there', () => {
    const written = mcq({
      type: 'paragraph',
      choices: undefined,
      answerKey: undefined,
      rubric: 'ให้ดาวตามความครบถ้วนของเหตุผล',
    });
    expect(validate('exercises', written)).toEqual({ ok: true, errors: [] });

    const noRubric = mcq({ type: 'paragraph', choices: undefined, answerKey: undefined });
    expect(validate('exercises', noRubric).errors).toContainEqual({
      field: 'rubric',
      message: 'ข้อเขียนตอบต้องมีเกณฑ์ให้คะแนน (rubric)',
    });

    const strayChoices = mcq({ type: 'paragraph', answerKey: undefined, rubric: 'เกณฑ์' });
    expect(validate('exercises', strayChoices).errors).toContainEqual({
      field: 'choices',
      message: 'ข้อชนิด paragraph ห้ามมีตัวเลือก',
    });
  });

  it('requires exactly one blank marker in a fill_blank prompt', () => {
    const ok = mcq({ type: 'fill_blank', choices: undefined, answerKey: ['goes', 'go'] });
    expect(validate('exercises', ok)).toEqual({ ok: true, errors: [] });

    const twoBlanks = mcq({
      type: 'fill_blank',
      choices: undefined,
      answerKey: ['goes'],
      prompt: 'She ___ to ___ every day.',
    });
    expect(validate('exercises', twoBlanks).errors).toContainEqual({
      field: 'prompt',
      message: 'ข้อเติมคำต้องมีช่องว่าง ___ พอดี 1 ช่อง (พบ 2 ช่อง)',
    });
  });

  it('rejects a tag that is above the exercise level', () => {
    const result = validate('exercises', mcq({ tags: ['grammar:past-perfect'] }));
    expect(result.errors).toContainEqual({
      field: 'tags',
      message: 'tag "grammar:past-perfect" เป็นของเลเวล B1 ซึ่งสูงกว่าเลเวลของข้อนี้ (A1)',
    });
  });

  it('accepts an optional deletedAt timestamp', () => {
    expect(validate('exercises', mcq({ deletedAt: '2026-09-21T10:00:00.000Z' }))).toEqual({
      ok: true,
      errors: [],
    });
    expect(validate('exercises', mcq({ deletedAt: 'เมื่อวาน' })).errors).toContainEqual({
      field: 'deletedAt',
      message: 'ต้องเป็นวันที่รูปแบบ ISO (เช่น 2026-09-20T10:00:00.000Z)',
    });
  });

  it('requires at least one tag', () => {
    const result = validate('exercises', mcq({ tags: [] }));
    expect(result.errors).toContainEqual({ field: 'tags', message: 'ต้องมีอย่างน้อย 1 รายการ' });
  });

  it('validates sentence_builder that all words in answerKey exist in choices with sufficient frequency', () => {
    const validSb = mcq({
      type: 'sentence_builder',
      prompt: 'จงเรียงประโยค',
      choices: ['Having', 'finished', 'his', 'homework', 'he', 'went', 'out', 'with', 'his', 'friends'],
      answerKey: ['Having finished his homework he went out with his friends'],
    });
    expect(validate('exercises', validSb)).toEqual({ ok: true, errors: [] });

    const missingDuplicate = mcq({
      type: 'sentence_builder',
      prompt: 'จงเรียงประโยค',
      choices: ['Having', 'finished', 'his', 'homework', 'he', 'went', 'out', 'with', 'friends'],
      answerKey: ['Having finished his homework he went out with his friends'],
    });
    const result = validate('exercises', missingDuplicate);
    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({
      field: 'choices',
      message: 'คำว่า "his" มีในตัวเลือกไม่พอสำหรับเฉลย (ต้องใช้ 2 คำ แต่มี 1 คำ)',
    });
  });
});

describe('stages schema', () => {
  const stage = {
    skill: 'grammar',
    level: 'A1',
    order: 1,
    title: 'ด่านที่ 1 — Present Simple',
    tags: ['grammar:present-simple'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: true,
    reviewStatus: 'published',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin-uid',
  };

  it('accepts a valid stage', () => {
    expect(validate('stages', stage)).toEqual({ ok: true, errors: [] });
  });

  it('rejects an empty tag list and an out-of-range threshold', () => {
    expect(validate('stages', { ...stage, tags: [] }).errors).toContainEqual({
      field: 'tags',
      message: 'ต้องมีอย่างน้อย 1 รายการ',
    });
    expect(validate('stages', { ...stage, passThreshold: 1.5 }).errors).toContainEqual({
      field: 'passThreshold',
      message: 'ต้องอยู่ระหว่าง 0 ถึง 1',
    });
  });
});

describe('grammarNotes schema', () => {
  const note = {
    level: 'A2',
    topic: 'Present Perfect',
    tags: ['grammar:present-perfect'],
    summary: 'have/has + V3 ใช้พูดถึงประสบการณ์',
    isPreview: false,
    reviewStatus: 'draft',
    contentHash: 'hash1',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin-uid',
  };

  it('accepts a valid note', () => {
    expect(validate('grammarNotes', note)).toEqual({ ok: true, errors: [] });
  });

  it('rejects vocabulary tags on a grammar note', () => {
    const result = validate('grammarNotes', { ...note, tags: ['vocab:food-drink'] });
    expect(result.errors).toContainEqual({
      field: 'tags',
      message: 'สรุปไวยากรณ์ต้องใช้ tag ขึ้นต้นด้วย grammar: เท่านั้น',
    });
  });
});
