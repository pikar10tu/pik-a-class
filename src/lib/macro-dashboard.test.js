import { describe, it, expect } from 'vitest';
import {
  calculateTierStats,
  getTopCafeLearners,
  getRecentStudents,
} from './macro-dashboard.js';

describe('calculateTierStats', () => {
  it('returns zeros for empty student list', () => {
    const res = calculateTierStats([]);
    expect(res).toEqual({
      total: 0,
      full: 0,
      free: 0,
      fullPercent: 0,
    });
  });

  it('calculates full vs free tiers and percentage correctly', () => {
    const students = [
      { id: '1', tier: 'full' },
      { id: '2', tier: 'free' },
      { id: '3', tier: 'full' },
      { id: '4', tier: 'free' },
    ];
    const res = calculateTierStats(students);
    expect(res.total).toBe(4);
    expect(res.full).toBe(2);
    expect(res.free).toBe(2);
    expect(res.fullPercent).toBe(50);
  });

  it('handles 100% full tier students', () => {
    const students = [{ id: '1', tier: 'full' }, { id: '2', tier: 'full' }];
    const res = calculateTierStats(students);
    expect(res.fullPercent).toBe(100);
  });
});

describe('getTopCafeLearners', () => {
  it('filters out students without cafe high scores', () => {
    const students = [
      { id: '1', nickname: 'Noob' },
      { id: '2', nickname: 'Zero', speedCafeStats: { highScore: 0 } },
    ];
    expect(getTopCafeLearners(students)).toEqual([]);
  });

  it('ranks players by high score descending and tie-breaks by maxCombo', () => {
    const students = [
      { id: '1', nickname: 'A', speedCafeStats: { highScore: 1500, maxCombo: 10 } },
      { id: '2', nickname: 'B', speedCafeStats: { highScore: 2200, maxCombo: 15 } },
      { id: '3', nickname: 'C', speedCafeStats: { highScore: 2200, maxCombo: 25 } },
      { id: '4', nickname: 'D', speedCafeStats: { highScore: 800, maxCombo: 5 } },
      { id: '5', nickname: 'E', speedCafeStats: { highScore: 1900, maxCombo: 12 } },
      { id: '6', nickname: 'F', speedCafeStats: { highScore: 500, maxCombo: 3 } },
    ];

    const top5 = getTopCafeLearners(students, 5);
    expect(top5).toHaveLength(5);
    expect(top5[0].nickname).toBe('C'); // 2200, maxCombo 25
    expect(top5[1].nickname).toBe('B'); // 2200, maxCombo 15
    expect(top5[2].nickname).toBe('E'); // 1900
    expect(top5[3].nickname).toBe('A'); // 1500
    expect(top5[4].nickname).toBe('D'); // 800
  });
});

describe('getRecentStudents', () => {
  it('returns up to limit students', () => {
    const students = [1, 2, 3, 4, 5, 6, 7].map((i) => ({ id: `s${i}` }));
    expect(getRecentStudents(students, 5)).toHaveLength(5);
    expect(getRecentStudents(students, 5)[0].id).toBe('s1');
  });

  it('returns all students if fewer than limit', () => {
    const students = [{ id: 's1' }, { id: 's2' }];
    expect(getRecentStudents(students, 5)).toHaveLength(2);
  });
});
