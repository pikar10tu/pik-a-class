import { describe, it, expect } from 'vitest';
import {
  FORM_TYPES,
  emptyFormState,
  formStateFromExercise,
  changeType,
  changeLevel,
  availableTags,
  buildExerciseDoc,
  previewLines,
} from './exercise-form.js';
import { contentHash } from './schema/content-checks.js';

const now = '2026-09-21T10:00:00.000Z';

function mcqState(overrides = {}) {
  return emptyFormState({
    prompt: 'She ___ to school.',
    choices: ['go', 'goes'],
    correctIndex: 1,
    tags: ['grammar:present-simple'],
    ...overrides,
  });
}

describe('emptyFormState', () => {
  it('starts as a blank A1 grammar MCQ with two empty choices', () => {
    const state = emptyFormState();
    expect(state).toMatchObject({ skill: 'grammar', level: 'A1', type: 'mcq', reviewStatus: 'draft' });
    expect(state.choices).toEqual(['', '']);
    expect(state.correctIndex).toBe(0);
    expect(state.tags).toEqual([]);
  });

  it('only offers the four supported types', () => {
    expect(FORM_TYPES).toEqual(['mcq', 'fill_blank', 'short_answer', 'paragraph']);
  });
});

describe('buildExerciseDoc', () => {
  it('turns MCQ form state into a valid document with the answer taken from the choices', () => {
    const { ok, errors, doc } = buildExerciseDoc(mcqState(), { adminUid: 'admin1', now });

    expect(errors).toEqual([]);
    expect(ok).toBe(true);
    expect(doc.answerKey).toEqual(['goes']);
    expect(doc.choices).toEqual(['go', 'goes']);
    expect(doc.rubric).toBeUndefined();
    expect(doc.createdBy).toBe('admin1');
    expect(doc.createdAt).toBe(now);
    expect(doc.reviewStatus).toBe('draft');
    expect(doc.assignedUids).toEqual([]);
    expect(doc.contentHash).toBe(contentHash({ prompt: 'She ___ to school.', choices: ['go', 'goes'] }));
  });

  it('drops blank choices and keeps the right answer pointing at the same text', () => {
    const state = mcqState({ choices: ['go', 'goes', '  ', ''], correctIndex: 1 });
    const { doc } = buildExerciseDoc(state, { adminUid: 'admin1', now });
    expect(doc.choices).toEqual(['go', 'goes']);
    expect(doc.answerKey).toEqual(['goes']);
  });

  it('reports a validation error instead of a document when the form is incomplete', () => {
    const { ok, errors, doc } = buildExerciseDoc(mcqState({ prompt: '' }), { adminUid: 'admin1', now });
    expect(ok).toBe(false);
    expect(doc).toBeNull();
    expect(errors).toContainEqual({ field: 'prompt', message: 'ห้ามเว้นว่าง' });
  });

  it('builds a fill_blank document from the accepted-answers list', () => {
    const state = emptyFormState({
      type: 'fill_blank',
      prompt: 'I ___ to work by bus.',
      answers: ['go', 'travel', ''],
      tags: ['grammar:present-simple'],
    });
    const { ok, doc } = buildExerciseDoc(state, { adminUid: 'admin1', now });

    expect(ok).toBe(true);
    expect(doc.answerKey).toEqual(['go', 'travel']);
    expect(doc.choices).toBeUndefined();
  });

  it('builds a written-answer document with only a rubric', () => {
    const state = emptyFormState({
      type: 'paragraph',
      level: 'A2',
      prompt: 'เขียนเล่าวันหยุดที่ผ่านมา',
      rubric: 'ให้ 3 ดาวเมื่อใช้ Past Simple ถูกเกือบทั้งหมด',
      tags: ['grammar:past-simple'],
    });
    const { ok, doc } = buildExerciseDoc(state, { adminUid: 'admin1', now });

    expect(ok).toBe(true);
    expect(doc.rubric).toBe('ให้ 3 ดาวเมื่อใช้ Past Simple ถูกเกือบทั้งหมด');
    expect(doc.choices).toBeUndefined();
    expect(doc.answerKey).toBeUndefined();
  });

  it('keeps createdAt and createdBy of an existing document when editing', () => {
    const existing = {
      createdAt: '2026-09-01T00:00:00.000Z',
      createdBy: 'someone-else',
      importBatchId: 'batch-9',
      assignedUids: ['student1'],
    };
    const { doc } = buildExerciseDoc(mcqState(), { existing, adminUid: 'admin1', now });

    expect(doc.createdAt).toBe('2026-09-01T00:00:00.000Z');
    expect(doc.createdBy).toBe('someone-else');
    expect(doc.importBatchId).toBe('batch-9');
    expect(doc.assignedUids).toEqual(['student1']);
    expect(doc.updatedAt).toBe(now);
  });
});

describe('formStateFromExercise', () => {
  it('round-trips an MCQ document back into form state', () => {
    const { doc } = buildExerciseDoc(mcqState(), { adminUid: 'admin1', now });
    const state = formStateFromExercise(doc);

    expect(state.type).toBe('mcq');
    expect(state.choices).toEqual(['go', 'goes']);
    expect(state.correctIndex).toBe(1);
    expect(state.tags).toEqual(['grammar:present-simple']);
  });

  it('round-trips a fill_blank document into the answers list', () => {
    const state = formStateFromExercise({
      skill: 'grammar',
      level: 'A1',
      type: 'fill_blank',
      prompt: 'I ___ tea.',
      answerKey: ['drink', 'like'],
      tags: ['grammar:present-simple'],
      isPreview: false,
      visibility: 'bank',
      reviewStatus: 'published',
    });

    expect(state.answers).toEqual(['drink', 'like']);
    expect(state.reviewStatus).toBe('published');
  });
});

describe('changeType', () => {
  it('clears choices and the answer when moving from MCQ to a written answer', () => {
    const next = changeType(mcqState(), 'paragraph');
    expect(next.type).toBe('paragraph');
    expect(next.choices).toEqual([]);
    expect(next.answers).toEqual([]);
  });

  it('gives MCQ two blank choices when coming from another type', () => {
    const written = emptyFormState({ type: 'paragraph', rubric: 'เกณฑ์' });
    const next = changeType(written, 'mcq');
    expect(next.choices).toEqual(['', '']);
    expect(next.correctIndex).toBe(0);
    expect(next.rubric).toBe('');
  });

  it('keeps the prompt, tags, level, and skill across a type change', () => {
    const next = changeType(mcqState({ level: 'B1' }), 'fill_blank');
    expect(next.prompt).toBe('She ___ to school.');
    expect(next.tags).toEqual(['grammar:present-simple']);
    expect(next.level).toBe('B1');
    expect(next.skill).toBe('grammar');
  });
});

describe('changeLevel and availableTags', () => {
  it('offers only tags at or below the chosen level', () => {
    const ids = availableTags('A1').map((tag) => tag.id);
    expect(ids).toContain('grammar:present-simple');
    expect(ids).not.toContain('grammar:past-perfect');
    expect(availableTags('B1').map((tag) => tag.id)).toContain('grammar:past-perfect');
  });

  it('drops tags that are now too advanced when the level goes down, and says which', () => {
    const state = emptyFormState({ level: 'B1', tags: ['grammar:present-simple', 'grammar:past-perfect'] });
    const result = changeLevel(state, 'A1');

    expect(result.state.level).toBe('A1');
    expect(result.state.tags).toEqual(['grammar:present-simple']);
    expect(result.droppedTags).toEqual(['grammar:past-perfect']);
  });

  it('keeps every tag when the level goes up', () => {
    const state = emptyFormState({ level: 'A1', tags: ['grammar:present-simple'] });
    const result = changeLevel(state, 'B2');
    expect(result.droppedTags).toEqual([]);
    expect(result.state.tags).toEqual(['grammar:present-simple']);
  });
});

describe('previewLines', () => {
  it('shows the student-facing view of the current form state', () => {
    expect(previewLines(mcqState())).toEqual([
      'โจทย์: She ___ to school.',
      'ตัวเลือก: go / goes',
      'เฉลย: goes',
    ]);
  });
});
