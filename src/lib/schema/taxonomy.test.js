import { describe, it, expect } from 'vitest';
import { LEVELS, TAGS, getTag, levelRank, checkTagsForLevel } from './taxonomy.js';

describe('taxonomy data', () => {
  it('orders CEFR levels from A1 to C1', () => {
    expect(LEVELS).toEqual(['A1', 'A2', 'B1', 'B2', 'C1']);
  });

  it('gives every tag a unique id, a label, and a known level', () => {
    const ids = TAGS.map((tag) => tag.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const tag of TAGS) {
      expect(tag.id).toMatch(/^(grammar|vocab):[a-z0-9-]+$/);
      expect(tag.label.length).toBeGreaterThan(0);
      expect(LEVELS).toContain(tag.level);
    }
  });

  it('covers both skills at every level', () => {
    for (const level of LEVELS) {
      expect(TAGS.some((tag) => tag.level === level && tag.id.startsWith('grammar:'))).toBe(true);
      expect(TAGS.some((tag) => tag.level === level && tag.id.startsWith('vocab:'))).toBe(true);
    }
  });
});

describe('checkTagsForLevel', () => {
  it('accepts a tag introduced at the same level', () => {
    expect(checkTagsForLevel(['grammar:present-simple'], 'A1')).toEqual([]);
  });

  it('accepts an easier tag on a harder exercise (revision is fine)', () => {
    expect(checkTagsForLevel(['grammar:present-simple'], 'B1')).toEqual([]);
  });

  it('rejects a harder tag on an easier exercise', () => {
    expect(checkTagsForLevel(['grammar:past-perfect'], 'A1')).toEqual([
      'tag "grammar:past-perfect" เป็นของเลเวล B1 ซึ่งสูงกว่าเลเวลของข้อนี้ (A1)',
    ]);
  });

  it('rejects an unknown tag', () => {
    expect(checkTagsForLevel(['grammar:made-up'], 'A1')).toEqual([
      'tag "grammar:made-up" ไม่มีอยู่ใน taxonomy',
    ]);
  });

  it('looks tags up by id', () => {
    expect(getTag('grammar:present-simple').level).toBe('A1');
    expect(getTag('nope')).toBeUndefined();
    expect(levelRank('B2')).toBe(3);
    expect(levelRank('Z9')).toBe(-1);
  });
});
