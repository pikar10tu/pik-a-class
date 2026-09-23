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

  it('writes a stage clear with attemptCount and stats even when the stage was not passed', () => {
    const { stageClear } = build();
    expect(stageClear.id).toBe('student1__st1');
    expect(stageClear.data).toEqual({
      uid: 'student1',
      stageId: 'st1',
      skill: 'grammar',
      level: 'A2',
      order: 1,
      score: 0.5,
      lastScore: 0.5,
      bestStars: 1,
      attemptCount: 1,
      clearCount: 0,
      totalQuestionsAnswered: 2,
      lastPlayedAt: now,
      clearedAt: now,
    });
  });

  it('preserves best score and increments attemptCount when stored score is already better', () => {
    const existing = {
      score: 1,
      attemptCount: 3,
      clearCount: 2,
      totalQuestionsAnswered: 6,
      clearedAt: '2026-09-01T00:00:00.000Z',
    };
    const { stageClear } = build({ existingClear: existing });
    expect(stageClear.data.score).toBe(1);
    expect(stageClear.data.lastScore).toBe(0.5);
    expect(stageClear.data.bestStars).toBe(3);
    expect(stageClear.data.attemptCount).toBe(4);
    expect(stageClear.data.clearCount).toBe(2);
    expect(stageClear.data.totalQuestionsAnswered).toBe(8);
    expect(stageClear.data.clearedAt).toBe('2026-09-01T00:00:00.000Z');
  });

  it('updates best score and increments clearCount when new run passes and is better', () => {
    const passedResults = [
      { exerciseId: 'e1', answer: 'went', correct: true },
      { exerciseId: 'e2', answer: 'went', correct: true },
    ];
    const existing = {
      score: 0.5,
      attemptCount: 1,
      clearCount: 0,
      totalQuestionsAnswered: 2,
    };
    const { stageClear } = build({ results: passedResults, existingClear: existing });
    expect(stageClear.data.score).toBe(1);
    expect(stageClear.data.lastScore).toBe(1);
    expect(stageClear.data.bestStars).toBe(3);
    expect(stageClear.data.attemptCount).toBe(2);
    expect(stageClear.data.clearCount).toBe(1);
    expect(stageClear.data.totalQuestionsAnswered).toBe(4);
  });
});
