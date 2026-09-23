import { describe, it, expect } from 'vitest';
import {
  createCafeSession,
  getCurrentOrder,
  submitAnswer,
  timeoutOrder,
  getCafeSummary,
  sanitizeChoiceText,
} from './cafe-engine.js';

describe('cafe-engine', () => {
  const dummyWords = [
    {
      id: 'w1',
      word: 'breakfast',
      thai: 'อาหารเช้า',
      alternatives: ['อาหารกลางวัน', 'อาหารเย็น', 'ของว่าง'],
    },
    {
      id: 'w2',
      word: 'delicious',
      thai: 'อร่อย',
      alternatives: ['เผ็ด', 'ขม', 'เค็ม'],
    },
    {
      id: 'w3',
      word: 'ingredient',
      thai: 'ส่วนผสม',
      alternatives: ['สูตรอาหาร', 'เครื่องปรุง', 'จานหลัก'],
    },
  ];

  it('initializes a fresh session', () => {
    const session = createCafeSession({ words: dummyWords, maxLives: 3 });
    expect(session.state).toBe('playing');
    expect(session.lives).toBe(3);
    expect(session.score).toBe(0);
    expect(session.streak).toBe(0);
  });

  it('throws when initialized with empty words', () => {
    expect(() => createCafeSession({ words: [] })).toThrow();
  });

  it('returns current order with 4 choices containing the correct answer', () => {
    const session = createCafeSession({ words: dummyWords });
    const order = getCurrentOrder(session);
    expect(order.word.id).toBe('w1');
    expect(order.choices).toHaveLength(4);
    expect(order.choices).toContain('อาหารเช้า');
    expect(order.orderNumber).toBe(1);
    expect(order.totalOrders).toBe(3);
  });

  it('increments streak and calculates combo bonus score on correct answers', () => {
    const session = createCafeSession({ words: dummyWords });

    // ตอบข้อ 1 ถูก: streak 1 -> 100 คะแนน
    const res1 = submitAnswer(session, 'อาหารเช้า');
    expect(res1.correct).toBe(true);
    expect(res1.pointsEarned).toBe(100);
    expect(session.score).toBe(100);
    expect(session.streak).toBe(1);

    // ตอบข้อ 2 ถูก: streak 2 -> 100 + 25 = 125 คะแนน -> รวม 225
    const res2 = submitAnswer(session, 'อร่อย');
    expect(res2.correct).toBe(true);
    expect(res2.pointsEarned).toBe(125);
    expect(session.score).toBe(225);
    expect(session.streak).toBe(2);
  });

  it('resets streak and docks a life on wrong answer', () => {
    const session = createCafeSession({ words: dummyWords, maxLives: 3 });
    submitAnswer(session, 'อาหารเช้า'); // streak 1
    expect(session.streak).toBe(1);

    const res2 = submitAnswer(session, 'ผิดนะ');
    expect(res2.correct).toBe(false);
    expect(session.streak).toBe(0);
    expect(session.lives).toBe(2);
  });

  it('handles timeout order like a wrong answer', () => {
    const session = createCafeSession({ words: dummyWords, maxLives: 3 });
    const res = timeoutOrder(session);
    expect(res.correct).toBe(false);
    expect(res.timedOut).toBe(true);
    expect(session.lives).toBe(2);
    expect(session.streak).toBe(0);
  });

  it('ends game with lost state when all lives are depleted', () => {
    const session = createCafeSession({ words: dummyWords, maxLives: 2 });
    submitAnswer(session, 'ผิด 1');
    expect(session.lives).toBe(1);
    expect(session.state).toBe('playing');

    submitAnswer(session, 'ผิด 2');
    expect(session.lives).toBe(0);
    expect(session.state).toBe('lost');

    const summary = getCafeSummary(session);
    expect(summary.isGameOver).toBe(true);
    expect(summary.isVictory).toBe(false);
    expect(summary.missedWords).toHaveLength(2);
  });

  it('finishes game with won state and calculates summary and stars', () => {
    const session = createCafeSession({ words: dummyWords, maxLives: 3 });
    submitAnswer(session, 'อาหารเช้า');
    submitAnswer(session, 'อร่อย');
    submitAnswer(session, 'ส่วนผสม');

    expect(session.state).toBe('won');
    const summary = getCafeSummary(session);
    expect(summary.isVictory).toBe(true);
    expect(summary.accuracy).toBe(100);
    expect(summary.stars).toBe(3);
    expect(summary.missedWords).toHaveLength(0);
  });

  it('sanitizes choice texts to prevent clue commas and parentheses', () => {
    expect(sanitizeChoiceText('กระหายน้ำ, หิวน้ำ')).toBe('กระหายน้ำ');
    expect(sanitizeChoiceText('เรื้อรัง (เป็นเวลานาน)')).toBe('เรื้อรัง');
    expect(sanitizeChoiceText('   อาหารเช้า   ')).toBe('อาหารเช้า');

    const multiMeaningWord = [
      {
        id: 'test_multi',
        word: 'complex',
        thai: 'ซับซ้อน, ยุ่งยาก',
        alternatives: ['ง่ายดาย, สะดวก', 'ตรงไปตรงมา', 'รวดเร็ว'],
      },
    ];

    const session = createCafeSession({ words: multiMeaningWord });
    const order = getCurrentOrder(session);
    expect(order.choices).toContain('ซับซ้อน');
    expect(order.choices).not.toContain('ซับซ้อน, ยุ่งยาก');
    expect(order.choices.every((c) => !c.includes(','))).toBe(true);

    const res = submitAnswer(session, 'ซับซ้อน');
    expect(res.correct).toBe(true);
  });
});
