import { describe, it, expect } from 'vitest';
import { pickRound, matchesStagePool, findOrphanExercises } from './stage-pool.js';

const ex = (id, overrides = {}) => ({
  id,
  skill: 'grammar',
  level: 'A2',
  tags: ['grammar:past-simple'],
  reviewStatus: 'published',
  visibility: 'bank',
  ...overrides,
});

const stage = (overrides = {}) => ({
  skill: 'grammar',
  level: 'A2',
  tags: ['grammar:past-simple'],
  drawCount: 7,
  ...overrides,
});

describe('pickRound', () => {
  const pool = [ex('a'), ex('b'), ex('c'), ex('d'), ex('e')];

  it('คืนข้อตามจำนวนที่ขอ', () => {
    expect(pickRound(pool, 3, () => 0)).toHaveLength(3);
  });

  it('ไม่มีข้อซ้ำในรอบเดียว', () => {
    let i = 0;
    const picked = pickRound(pool, 5, () => ((i += 1) % 7) / 7);
    expect(new Set(picked.map((item) => item.id)).size).toBe(5);
  });

  it('คลังน้อยกว่าที่ขอ ก็เล่นเท่าที่มี', () => {
    expect(pickRound([ex('a'), ex('b')], 7, () => 0)).toHaveLength(2);
  });

  it('คลังว่างคืน array ว่าง ไม่โยน error', () => {
    expect(pickRound([], 7, () => 0)).toEqual([]);
  });

  it('ผลลัพธ์คงที่เมื่อ random เหมือนเดิม', () => {
    const stub = () => 0.42;
    expect(pickRound(pool, 3, stub)).toEqual(pickRound(pool, 3, stub));
  });

  it('ไม่แก้ array ที่รับเข้ามา', () => {
    const snapshot = JSON.stringify(pool);
    pickRound(pool, 3, () => 0.5);
    expect(JSON.stringify(pool)).toBe(snapshot);
  });

  it('คืนข้อที่มาจากคลังจริงเท่านั้น', () => {
    const ids = new Set(pool.map((item) => item.id));
    for (const item of pickRound(pool, 4, () => 0.3)) expect(ids.has(item.id)).toBe(true);
  });

  it('ลำดับที่ต่างกันของ random ทำให้ลำดับข้อต่างกัน', () => {
    const seq1 = () => 0.1;
    const seq2 = () => 0.9;
    const order1 = pickRound(pool, 5, seq1).map((item) => item.id).join('');
    const order2 = pickRound(pool, 5, seq2).map((item) => item.id).join('');
    expect(order1).not.toBe(order2);
  });

  it('random ที่ต่างกันเลือกเซตข้อต่างกันเมื่อคลังใหญ่กว่า drawCount', () => {
    const bigPool = [ex('a'), ex('b'), ex('c'), ex('d'), ex('e'), ex('f'), ex('g')];
    let i1 = 0;
    let i2 = 0;
    const set1 = new Set(pickRound(bigPool, 3, () => (i1 += 0.1) % 1).map((item) => item.id));
    const set2 = new Set(pickRound(bigPool, 3, () => (i2 += 0.3) % 1).map((item) => item.id));
    expect([...set1].sort().join('')).not.toBe([...set2].sort().join(''));
  });
});

describe('matchesStagePool', () => {
  it('เข้าเงื่อนไขครบทุกด้าน', () => {
    expect(matchesStagePool(stage(), ex('a'))).toBe(true);
  });

  it('คนละระดับไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { level: 'B1' }))).toBe(false);
  });

  it('คนละสกิลไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { skill: 'vocab' }))).toBe(false);
  });

  it('ไม่มีแท็กที่ตรงกันเลยไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { tags: ['grammar:present-perfect'] }))).toBe(false);
  });

  it('มีแท็กตรงอย่างน้อยหนึ่งอันก็เข้า', () => {
    const wide = stage({ tags: ['grammar:past-simple', 'grammar:present-perfect'] });
    expect(matchesStagePool(wide, ex('a', { tags: ['grammar:present-perfect', 'x'] }))).toBe(true);
  });

  it('ข้อที่ยังไม่อนุมัติไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { reviewStatus: 'draft' }))).toBe(false);
  });

  it('ข้อที่ไม่ใช่ของคลังกลางไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { visibility: 'assignmentOnly' }))).toBe(false);
  });
});

describe('findOrphanExercises', () => {
  it('คืนข้อที่อนุมัติแล้วแต่ไม่เข้าด่านไหนเลย', () => {
    const orphan = ex('lost', { tags: ['grammar:future-simple'] });
    const result = findOrphanExercises([stage()], [ex('a'), orphan]);
    expect(result.map((item) => item.id)).toEqual(['lost']);
  });

  it('ข้อที่ยังไม่อนุมัติไม่นับเป็นข้อกำพร้า', () => {
    const draft = ex('d', { tags: ['grammar:future-simple'], reviewStatus: 'draft' });
    expect(findOrphanExercises([stage()], [draft])).toEqual([]);
  });

  it('ไม่มีด่านเลย ข้อที่อนุมัติแล้วทุกข้อคือข้อกำพร้า', () => {
    expect(findOrphanExercises([], [ex('a'), ex('b')])).toHaveLength(2);
  });
});
