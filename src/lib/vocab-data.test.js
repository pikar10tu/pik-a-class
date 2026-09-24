import { describe, it, expect } from 'vitest';
import {
  VOCAB_ITEMS,
  CATEGORIES,
  getVocabList,
  getRandomWords,
  shuffleArray,
} from './vocab-data.js';

describe('vocab-data', () => {
  it('has valid categories', () => {
    expect(CATEGORIES.length).toBeGreaterThanOrEqual(11);
    for (const cat of CATEGORIES) {
      expect(cat.id).toBeTruthy();
      expect(cat.label).toBeTruthy();
      expect(cat.icon).toBeTruthy();
    }
  });

  it('has unique IDs for every vocabulary item', () => {
    const ids = new Set();
    for (const item of VOCAB_ITEMS) {
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);
    }
  });

  it('contains complete required fields and no hint commas/parentheses for each word', () => {
    const validLevels = ['A1', 'A2', 'B1', 'B2'];
    expect(VOCAB_ITEMS.length).toBeGreaterThanOrEqual(1000);

    for (const item of VOCAB_ITEMS) {
      expect(item.word.trim()).not.toBe('');
      expect(item.thai.trim()).not.toBe('');
      expect(item.pos.trim()).not.toBe('');
      expect(validLevels).toContain(item.level);
      expect(item.example.trim()).not.toBe('');
      expect(item.exampleThai.trim()).not.toBe('');
      expect(item.alternatives.length).toBe(3);
      expect(item.alternatives).not.toContain(item.thai);

      // ข้อสอบที่ดี: คำแปลและตัวเลือกต้องไม่มีลูกน้ำหรือวงเล็บที่บอกใบ้เฉลย
      expect(item.thai).not.toMatch(/[,()\/]/);
      for (const alt of item.alternatives) {
        expect(alt).not.toMatch(/[,()\/]/);
      }
    }
  });

  it('provides at least 50 words for every category', () => {
    for (const cat of CATEGORIES) {
      const items = getVocabList({ category: cat.id });
      expect(items.length).toBeGreaterThanOrEqual(50);
    }
  });

  it('filters by level accurately', () => {
    const a1List = getVocabList({ level: 'A1' });
    expect(a1List.length).toBeGreaterThan(0);
    expect(a1List.every((item) => item.level === 'A1')).toBe(true);

    const b2List = getVocabList({ level: 'B2' });
    expect(b2List.length).toBeGreaterThan(0);
    expect(b2List.every((item) => item.level === 'B2')).toBe(true);
  });

  it('filters by allowedLevels array accurately', () => {
    const listA1A2 = getVocabList({ allowedLevels: ['A1', 'A2'] });
    expect(listA1A2.length).toBeGreaterThan(0);
    expect(listA1A2.every((item) => ['A1', 'A2'].includes(item.level))).toBe(true);
    expect(listA1A2.some((item) => item.level === 'A1')).toBe(true);
    expect(listA1A2.some((item) => item.level === 'A2')).toBe(true);
    expect(listA1A2.some((item) => item.level === 'B1')).toBe(false);
  });

  it('filters by category accurately', () => {
    const foodList = getVocabList({ category: 'food-drink' });
    expect(foodList.length).toBeGreaterThan(0);
    expect(foodList.every((item) => item.category === 'food-drink')).toBe(true);
  });

  it('filters by search term in English or Thai', () => {
    const results = getVocabList({ search: 'delicious' });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].word).toBe('delicious');

    const thaiResults = getVocabList({ search: 'อาหารเช้า' });
    expect(thaiResults.length).toBeGreaterThan(0);
    expect(thaiResults[0].word).toBe('breakfast');
  });

  it('getRandomWords returns requested count', () => {
    const randomFive = getRandomWords(5);
    expect(randomFive.length).toBe(5);
  });

  it('shuffleArray preserves elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled.sort()).toEqual(arr.sort());
  });
});
