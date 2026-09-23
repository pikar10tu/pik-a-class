import { describe, it, expect } from 'vitest';
import { distractorPool, buildWordBank, WORD_BANK_SIZE } from './word-bank.js';

const target = { id: 'e1', type: 'fill_blank', answerKey: ["doesn't", 'does not'] };

const stage = [
  target,
  { id: 'e2', type: 'fill_blank', answerKey: ['went'] },
  { id: 'e3', type: 'fill_blank', answerKey: ['was watching'] },
  { id: 'e4', type: 'fill_blank', answerKey: ['have been'] },
];

// Stub random that always returns 0, making shuffle deterministic for tests
const notRandom = () => 0;

describe('distractorPool', () => {
  it('collects the answers of the other blanks in the stage', () => {
    expect(distractorPool(target, stage).sort()).toEqual(['have been', 'was watching', 'went']);
  });

  it('never offers a word that would also be accepted for this question', () => {
    const tricky = [target, { id: 'e5', type: 'fill_blank', answerKey: ['does not'] }];
    expect(distractorPool(target, tricky)).toEqual([]);
  });

  it('falls back to multiple choice options when there are not enough blanks', () => {
    const thin = [
      target,
      { id: 'e6', type: 'mcq', choices: ['is', 'are', 'am'], answerKey: ['is'] },
    ];
    expect(distractorPool(target, thin).sort()).toEqual(['am', 'are', 'is']);
  });

  it('does not repeat the same word twice', () => {
    const duplicated = [
      target,
      { id: 'e7', type: 'fill_blank', answerKey: ['went'] },
      { id: 'e8', type: 'fill_blank', answerKey: ['Went'] },
    ];
    expect(distractorPool(target, duplicated)).toEqual(['went']);
  });

  it('ignores full sentences or punctuated options from mcq choices', () => {
    const withSentence = [
      target,
      {
        id: 'e10',
        type: 'mcq',
        choices: [
          'The woman having sat in the corner is an author.',
          'Walking down the street, my hat blew away.',
          'went',
        ],
        answerKey: ['went'],
      },
    ];
    expect(distractorPool(target, withSentence)).toEqual(['went']);
  });
});

describe('buildWordBank', () => {
  it('always contains exactly one accepted answer', () => {
    const bank = buildWordBank(target, stage, { random: notRandom });
    expect(bank).toHaveLength(WORD_BANK_SIZE);
    expect(bank.filter((word) => target.answerKey.includes(word))).toHaveLength(1);
  });

  it('returns whatever it can when distractors run out, never fewer than two cards', () => {
    const thin = [target, { id: 'e9', type: 'fill_blank', answerKey: ['went'] }];
    const bank = buildWordBank(target, thin, { random: notRandom });
    expect(bank).toHaveLength(2);
    expect(bank).toContain('went');
  });

  it('returns just the answer when the stage has nothing else to offer', () => {
    const bank = buildWordBank(target, [target], { random: notRandom });
    expect(bank).toEqual(["doesn't"]);
  });
});
