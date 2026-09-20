import { describe, it, expect } from 'vitest';
import { normalizeAnswer, gradeAnswer, starsFor, scoreOf } from './grading.js';

const mcq = { type: 'mcq', choices: ['go', 'goes'], answerKey: ['goes'] };
const blank = { type: 'fill_blank', prompt: 'She ___ home.', answerKey: ["doesn't", 'does not'] };

describe('normalizeAnswer', () => {
  it('trims, collapses spaces and ignores letter case', () => {
    expect(normalizeAnswer('  Does   NOT ')).toBe('does not');
  });

  it('treats both apostrophe shapes as the same character', () => {
    const curly = 'doesn’t';
    const straight = "doesn't";
    expect(normalizeAnswer(curly)).toBe(normalizeAnswer(straight));
  });

  it('confirms U+2019 is folded to U+0027 in output', () => {
    const result = normalizeAnswer('doesn’t');
    const codepoints = [...result].map(c => c.codePointAt(0));
    expect(codepoints).not.toContain(0x2019);
  });

  it('keeps punctuation that carries meaning', () => {
    expect(normalizeAnswer('Yes, I do.')).toBe('yes, i do.');
  });
});

describe('gradeAnswer', () => {
  it('scores a correct multiple choice answer', () => {
    expect(gradeAnswer(mcq, 'goes')).toEqual({ correct: true, score: 1 });
  });

  it('scores a wrong multiple choice answer', () => {
    expect(gradeAnswer(mcq, 'go')).toEqual({ correct: false, score: 0 });
  });

  it('accepts any of the listed answers for a blank', () => {
    expect(gradeAnswer(blank, 'does not').correct).toBe(true);
    expect(gradeAnswer(blank, "DOESN'T").correct).toBe(true);
    expect(gradeAnswer(blank, 'did not').correct).toBe(false);
  });

  it('accepts curly apostrophe in student answer against straight apostrophe in key', () => {
    expect(gradeAnswer({ type: 'fill_blank', answerKey: ["doesn't"] }, 'doesn’t')).toEqual({ correct: true, score: 1 });
  });

  it('treats a missing answer as wrong instead of throwing', () => {
    expect(gradeAnswer(mcq, undefined)).toEqual({ correct: false, score: 0 });
  });
});

describe('starsFor', () => {
  it('gives three stars only for a perfect score of exactly 1.0', () => {
    expect(starsFor(1.0)).toBe(3);
  });

  it('gives two stars just below perfect', () => {
    expect(starsFor(0.99)).toBe(2);
    expect(starsFor(0.999999999)).toBe(2);
  });

  it('gives two stars from seventy percent', () => {
    expect(starsFor(0.7)).toBe(2);
    expect(starsFor(7 / 10)).toBe(2);
  });

  it('gives one star just below seventy percent', () => {
    expect(starsFor(0.69)).toBe(1);
    expect(starsFor(0.6999999999)).toBe(1);
  });

  it('gives one star from forty percent', () => {
    expect(starsFor(0.4)).toBe(1);
  });

  it('gives no stars just below forty percent', () => {
    expect(starsFor(0.39)).toBe(0);
    expect(starsFor(0.3999999999)).toBe(0);
  });

  it('gives no stars for zero', () => {
    expect(starsFor(0)).toBe(0);
  });
});

describe('scoreOf', () => {
  it('returns the share of correct answers', () => {
    expect(scoreOf([{ correct: true }, { correct: false }, { correct: true }, { correct: true }])).toBe(0.75);
  });

  it('returns zero for an empty list instead of dividing by zero', () => {
    expect(scoreOf([])).toBe(0);
  });
});