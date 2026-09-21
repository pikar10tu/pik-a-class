import { describe, it, expect } from 'vitest';
import { buildStageWrites } from './stage-writes.js';

const now = '2026-09-22T04:00:00.000Z';
const stage = { id: 'st1', skill: 'grammar', level: 'A2', order: 1, passThreshold: 0.7 };
const exercises = [
  { id: 'e1', skill: 'grammar', level: 'A2', type: 'mcq', tags: ['grammar:past-simple'] },
  { id: 'e2', skill: 'grammar', level: 'A2', type: 'fill_blank', tags: ['grammar:past-simple'] },
];
const results = [
  { exerciseId: 'e1', answer: 'went', correct: true },
  { exerciseId: 'e2', answer: 'goed', correct: false },
];

function build(overrides = {}) {
  return buildStageWrites({
    uid: 'student1',
    stage,
    exercises,
    results,
    existingSubmissions: {},
    existingClear: null,
    now,
    ...overrides,
  });
}

describe('buildStageWrites', () => {
  it('uses the stable submission id for every question', () => {
    expect(build().submissions.map((write) => write.id)).toEqual([
      'student1__bank__e1',
      'student1__bank__e2',
    ]);
  });

  it('writes a fresh submission with attempt one', () => {
    const [first] = build().submissions;
    expect(first.data).toMatchObject({
      uid: 'student1',
      exerciseId: 'e1',
      skill: 'grammar',
      level: 'A2',
      type: 'mcq',
      answer: 'went',
      autoGraded: true,
      score: 1,
      bestStars: 3,
      attemptCount: 1,
      wrongCount: 0,
      status: 'completed',
      lastAnsweredAt: now,
      createdAt: now,
    });
  });

  it('never lowers bestStars, because the rules reject it and the whole batch would fail', () => {
    const existing = {
      student1__bank__e2: { bestStars: 3, attemptCount: 2, wrongCount: 0, createdAt: '2026-09-01T00:00:00.000Z' },
    };
    const write = build({ existingSubmissions: existing }).submissions[1];
    expect(write.data.bestStars).toBe(3);
    expect(write.data.score).toBe(0);
  });

  it('keeps counting attempts and wrong answers on top of what is stored', () => {
    const existing = {
      student1__bank__e2: { bestStars: 0, attemptCount: 2, wrongCount: 1, createdAt: '2026-09-01T00:00:00.000Z' },
    };
    const write = build({ existingSubmissions: existing }).submissions[1];
    expect(write.data.attemptCount).toBe(3);
    expect(write.data.wrongCount).toBe(2);
  });

  it('preserves the original createdAt, which the rules forbid changing', () => {
    const existing = {
      student1__bank__e1: { bestStars: 3, attemptCount: 1, wrongCount: 0, createdAt: '2026-09-01T00:00:00.000Z' },
    };
    const write = build({ existingSubmissions: existing }).submissions[0];
    expect(write.data.createdAt).toBe('2026-09-01T00:00:00.000Z');
  });

  it('writes a stage clear that records the score even when the stage was not passed', () => {
    const { stageClear } = build();
    expect(stageClear.id).toBe('student1__st1');
    expect(stageClear.data).toEqual({
      uid: 'student1',
      stageId: 'st1',
      skill: 'grammar',
      level: 'A2',
      order: 1,
      score: 0.5,
      clearedAt: now,
    });
  });

  it('skips the stage clear when the stored score is already better', () => {
    expect(build({ existingClear: { score: 1 } }).stageClear).toBeNull();
  });

  it('replaces the stage clear when this run was better', () => {
    expect(build({ existingClear: { score: 0.25 } }).stageClear.data.score).toBe(0.5);
  });

  it('does not churn the stage clear when the score is exactly the same', () => {
    expect(build({ existingClear: { score: 0.5 } }).stageClear).toBeNull();
  });
});
