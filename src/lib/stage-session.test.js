import { describe, it, expect } from 'vitest';
import { createSession, currentExercise, answerCurrent, advance, summarize } from './stage-session.js';

const exercises = [
  { id: 'e1', type: 'mcq', choices: ['go', 'goes'], answerKey: ['goes'] },
  { id: 'e2', type: 'mcq', choices: ['was', 'were'], answerKey: ['were'] },
];

function playThrough(answers) {
  let session = createSession(exercises);
  for (const answer of answers) {
    session = advance(answerCurrent(session, answer));
  }
  return session;
}

describe('createSession', () => {
  it('starts on the first question with nothing answered', () => {
    const session = createSession(exercises);
    expect(session.index).toBe(0);
    expect(session.results).toEqual([]);
    expect(session.finished).toBe(false);
    expect(currentExercise(session).id).toBe('e1');
  });
});

describe('answerCurrent', () => {
  it('records the result without moving to the next question', () => {
    const session = answerCurrent(createSession(exercises), 'goes');
    expect(session.results).toEqual([{ exerciseId: 'e1', answer: 'goes', correct: true }]);
    expect(session.index).toBe(0);
  });

  it('does not mutate the session it was given', () => {
    const before = createSession(exercises);
    answerCurrent(before, 'goes');
    expect(before.results).toEqual([]);
  });

  it('ignores a second answer for the same question', () => {
    const once = answerCurrent(createSession(exercises), 'goes');
    const twice = answerCurrent(once, 'go');
    expect(twice.results).toEqual(once.results);
  });
});

describe('advance', () => {
  it('moves to the next question', () => {
    const session = advance(answerCurrent(createSession(exercises), 'goes'));
    expect(session.index).toBe(1);
    expect(session.finished).toBe(false);
  });

  it('marks the session finished after the last question', () => {
    const session = playThrough(['goes', 'were']);
    expect(session.finished).toBe(true);
    expect(currentExercise(session)).toBeNull();
  });
});

describe('summarize', () => {
  it('reports a perfect run as three stars and passed', () => {
    expect(summarize(playThrough(['goes', 'were']), 0.7)).toEqual({
      correctCount: 2,
      total: 2,
      score: 1,
      stars: 3,
      passed: true,
    });
  });

  it('reports a half run as one star and not passed at the default threshold', () => {
    expect(summarize(playThrough(['goes', 'was']), 0.7)).toEqual({
      correctCount: 1,
      total: 2,
      score: 0.5,
      stars: 1,
      passed: false,
    });
  });
});

// --- Edge cases not spelled out in the brief; each decision is documented in the task report. ---

describe('currentExercise edge cases', () => {
  it('returns null when the exercise list is empty', () => {
    const session = createSession([]);
    expect(session.finished).toBe(true);
    expect(currentExercise(session)).toBeNull();
  });

  it('returns null once the session is finished', () => {
    const session = playThrough(['goes', 'were']);
    expect(currentExercise(session)).toBeNull();
  });
});

describe('answerCurrent on a finished session', () => {
  it('is a no-op that returns the session unchanged', () => {
    const finished = playThrough(['goes', 'were']);
    const after = answerCurrent(finished, 'anything');
    expect(after).toBe(finished);
    expect(after.results).toEqual(finished.results);
  });
});

describe('advance past the last exercise', () => {
  it('keeps finished true and currentExercise null when advanced again', () => {
    const finished = playThrough(['goes', 'were']);
    const advancedAgain = advance(finished);
    expect(advancedAgain.finished).toBe(true);
    expect(currentExercise(advancedAgain)).toBeNull();
  });
});

describe('summarize on a session with no results', () => {
  it('reports zero correct, zero score, zero stars and not passed', () => {
    const session = createSession(exercises);
    expect(summarize(session, 0.7)).toEqual({
      correctCount: 0,
      total: 2,
      score: 0,
      stars: 0,
      passed: false,
    });
  });

  it('reports zero total for an empty exercise list', () => {
    const session = createSession([]);
    expect(summarize(session, 0.7)).toEqual({
      correctCount: 0,
      total: 0,
      score: 0,
      stars: 0,
      passed: false,
    });
  });
});

describe('immutability', () => {
  it('answerCurrent never mutates the original session, verified by deep snapshot', () => {
    const before = createSession(exercises);
    const snapshot = JSON.stringify(before);
    const after = answerCurrent(before, 'goes');
    expect(JSON.stringify(before)).toBe(snapshot);
    expect(after).not.toBe(before);
  });

  it('advance never mutates the original session, verified by deep snapshot', () => {
    const before = answerCurrent(createSession(exercises), 'goes');
    const snapshot = JSON.stringify(before);
    const after = advance(before);
    expect(JSON.stringify(before)).toBe(snapshot);
    expect(after).not.toBe(before);
  });
});
