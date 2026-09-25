import { describe, it, expect, vi, beforeEach } from 'vitest';

const store = new Map();
const writes = [];

vi.mock('firebase/firestore', () => ({
  collection: vi.fn((db, name) => ({ name })),
  doc: vi.fn((db, name, id) => ({ name, id })),
  documentId: vi.fn(() => '__name__'),
  where: vi.fn((field, op, value) => ({ field, op, value })),
  query: vi.fn((coll, clause) => ({ coll, clause })),
  getDocs: vi.fn(async (q) => {
    // Firestore จริงรับค่าใน 'in' ได้ไม่เกิน 30 ตัว — จำลองให้ throw เหมือนของจริง
    if (q.clause.op === 'in' && q.clause.value.length > 30) {
      throw new Error("'in' filters support a maximum of 30 elements");
    }
    return {
      docs: q.clause.value
        .filter((id) => store.has(id))
        .map((id) => ({ id, data: () => store.get(id) })),
    };
  }),
  writeBatch: vi.fn(() => {
    const pending = [];
    return {
      set: (ref, data) => pending.push([ref.id, data]),
      commit: async () => writes.push(...pending),
    };
  }),
}));

const { saveVocabSessionResults } = await import('./vocab-session-io.js');

function word(n) {
  return { id: `v_a1_food_${n}`, level: 'A1', category: 'food-drink' };
}

beforeEach(() => {
  store.clear();
  writes.length = 0;
});

describe('saveVocabSessionResults', () => {
  it('saves every word of a long endless session (more than 30 words)', async () => {
    const history = Array.from({ length: 45 }, (_, i) => ({ word: word(i), correct: true }));
    await saveVocabSessionResults({}, { uid: 'u1', history, now: 'T' });
    expect(writes).toHaveLength(45);
  });

  it('merges repeated answers to the same word into one write', async () => {
    store.set('u1__bank__v_a1_food_1', { attemptCount: 2, wrongCount: 1, bestStars: 3, createdAt: 'OLD' });
    const history = [
      { word: word(1), correct: false, selectedAnswer: 'x' },
      { word: word(1), correct: true, selectedAnswer: 'y' },
    ];
    await saveVocabSessionResults({}, { uid: 'u1', history, now: 'T' });

    expect(writes).toHaveLength(1);
    const [, data] = writes[0];
    expect(data.attemptCount).toBe(4);
    expect(data.wrongCount).toBe(2);
    expect(data.bestStars).toBe(3);
    expect(data.score).toBe(1);
    expect(data.answer).toBe('y');
    expect(data.createdAt).toBe('OLD');
  });
});
