import { describe, it, expect } from 'vitest';
import { buildStagePath, totalStars, clearsByStageId } from './stage-progress.js';

const stages = [
  { id: 's1', order: 1, title: 'Past Simple', drawCount: 2, passThreshold: 0.7 },
  { id: 's2', order: 2, title: 'Past Continuous', drawCount: 1, passThreshold: 0.7 },
  { id: 's3', order: 3, title: 'Present Perfect', drawCount: 1, passThreshold: 0.7 },
];

describe('clearsByStageId', () => {
  it('keys the clear documents by their stage', () => {
    const map = clearsByStageId([{ stageId: 's1', score: 0.5 }]);
    expect(map).toEqual({ s1: { score: 0.5 } });
  });

  it('keeps the last document seen when a stage has duplicate clear docs', () => {
    // ปกติไม่ควรมีเอกสารซ้ำ (stageClearId กันไว้แล้ว) แต่ถ้าหลุดมาจริง เอกสารที่มาทีหลังชนะ
    const map = clearsByStageId([
      { stageId: 's1', score: 1 },
      { stageId: 's1', score: 0.4 },
    ]);
    expect(map).toEqual({ s1: { score: 0.4 } });
  });
});

describe('buildStagePath', () => {
  it('unlocks the first stage even with no history', () => {
    const path = buildStagePath(stages, {});
    expect(path[0]).toMatchObject({ id: 's1', unlocked: true, cleared: false, stars: 0 });
    expect(path[1]).toMatchObject({ id: 's2', unlocked: false });
  });

  it('explains why a locked stage is locked', () => {
    const path = buildStagePath(stages, {});
    expect(path[1].lockedReason).toBe('ผ่านด่าน 1 ที่ 70% ก่อน');
  });

  it('does not attach a lockedReason to an unlocked stage', () => {
    const path = buildStagePath(stages, {});
    expect(path[0].lockedReason).toBeFalsy();
  });

  it('unlocks the next stage once the threshold is met', () => {
    const path = buildStagePath(stages, { s1: { score: 0.7 } });
    expect(path[0]).toMatchObject({ cleared: true, stars: 2 });
    expect(path[1].unlocked).toBe(true);
    expect(path[2].unlocked).toBe(false);
  });

  it('keeps the next stage locked when the score is below the threshold', () => {
    const path = buildStagePath(stages, { s1: { score: 0.5 } });
    expect(path[0]).toMatchObject({ cleared: false, stars: 1 });
    expect(path[1].unlocked).toBe(false);
  });

  it('unlocks only the stage right after the one just cleared, not the whole rest of the path', () => {
    // เคลียร์ด่าน 1 อย่างเดียว: ด่าน 2 ควรเปิด แต่ด่าน 3 ยังต้องล็อกอยู่
    const path = buildStagePath(stages, { s1: { score: 0.7 } });
    expect(path[1].unlocked).toBe(true);
    expect(path[2].unlocked).toBe(false);
    expect(path[2].lockedReason).toBe('ผ่านด่าน 2 ที่ 70% ก่อน');
  });

  it('marks a stage unattempted when no clear document exists for it', () => {
    const path = buildStagePath(stages, {});
    expect(path[0].attempted).toBe(false);
  });

  it('marks a stage attempted even when the clear document scored zero', () => {
    // เล่นแล้วแต่ตอบผิดหมด (score 0) ก็ยังนับว่า "เคยเล่น" ต่างจากไม่เคยเล่นเลย
    const path = buildStagePath(stages, { s1: { score: 0 } });
    expect(path[0]).toMatchObject({ attempted: true, cleared: false, stars: 0 });
  });

  it('marks a cleared stage as attempted too, so attempted never tracks cleared', () => {
    const path = buildStagePath(stages, { s1: { score: 0.7 } });
    expect(path[0]).toMatchObject({ attempted: true, cleared: true });
  });

  it('sorts by order even when the input is shuffled', () => {
    const path = buildStagePath([stages[2], stages[0], stages[1]], {});
    expect(path.map((stage) => stage.id)).toEqual(['s1', 's2', 's3']);
  });

  it('reports how many questions each stage has', () => {
    expect(buildStagePath(stages, {})[0].itemCount).toBe(2);
  });

  it('ignores a clear document that refers to a stage id which no longer exists', () => {
    const clearsMap = clearsByStageId([
      { stageId: 's1', score: 1 },
      { stageId: 'ghost-stage', score: 1 },
    ]);
    const path = buildStagePath(stages, clearsMap);
    expect(path.map((stage) => stage.id)).toEqual(['s1', 's2', 's3']);
    expect(path[0]).toMatchObject({ cleared: true, stars: 3 });
  });
});

describe('totalStars', () => {
  it('adds up the stars of every stage', () => {
    const path = buildStagePath(stages, { s1: { score: 1 }, s2: { score: 0.5 } });
    expect(totalStars(path)).toBe(4);
  });

  it('is zero for a brand-new student with no clears', () => {
    const path = buildStagePath(stages, {});
    expect(totalStars(path)).toBe(0);
  });
});
