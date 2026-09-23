import { describe, it, expect } from 'vitest';
import { getGrammarNote, GRAMMAR_NOTES } from './grammar-notes.js';

describe('getGrammarNote', () => {
  it('returns null for empty or invalid tags', () => {
    expect(getGrammarNote()).toBeNull();
    expect(getGrammarNote([])).toBeNull();
    expect(getGrammarNote(['unknown:tag'])).toBeNull();
  });

  it('returns past-simple note for grammar:past-simple', () => {
    const note = getGrammarNote(['grammar:past-simple']);
    expect(note).toBeDefined();
    expect(note.title).toContain('Past Simple');
    expect(note.formula).toBe('S + V.2');
  });

  it('returns past-continuous note for grammar:past-continuous', () => {
    const note = getGrammarNote(['grammar:past-continuous']);
    expect(note).toBeDefined();
    expect(note.title).toContain('Past Continuous');
    expect(note.formula).toContain('was/were');
  });

  it('returns present-perfect note for grammar:present-perfect', () => {
    const note = getGrammarNote(['grammar:present-perfect']);
    expect(note).toBeDefined();
    expect(note.title).toContain('Present Perfect');
    expect(note.formula).toContain('have/has');
  });

  it('returns future note for grammar:future-going-to-will', () => {
    const note = getGrammarNote(['grammar:future-going-to-will']);
    expect(note).toBeDefined();
    expect(note.title).toContain('Future Forms');
    expect(note.formula).toContain('going to');
  });

  it('returns review note when multiple grammar tags are present', () => {
    const note = getGrammarNote([
      'grammar:past-simple',
      'grammar:past-continuous',
      'grammar:present-perfect'
    ]);
    expect(note).toBeDefined();
    expect(note.title).toContain('ทบทวนเปรียบเทียบ');
  });

  it('returns miniboss note when 4 grammar tags are present', () => {
    const note = getGrammarNote([
      'grammar:past-simple',
      'grammar:past-continuous',
      'grammar:present-perfect',
      'grammar:future-going-to-will'
    ]);
    expect(note).toBeDefined();
    expect(note.title).toContain('มินิบอส');
  });

  it('returns B1 notes for individual B1 tags', () => {
    const note = getGrammarNote(['grammar:present-perfect-continuous']);
    expect(note).toBeDefined();
    expect(note.title).toContain('Present Perfect Continuous');
    expect(note.formula).toContain('have/has been + V.ing');

    const cond2 = getGrammarNote(['grammar:conditional-2']);
    expect(cond2).toBeDefined();
    expect(cond2.title).toContain('Second Conditional');

    const passive = getGrammarNote(['grammar:passive-basic']);
    expect(passive).toBeDefined();
    expect(passive.title).toContain('Passive Voice');
  });

  it('returns B1 midboss note when 4 B1 tags are passed', () => {
    const note = getGrammarNote([
      'grammar:present-perfect-continuous',
      'grammar:past-perfect',
      'grammar:used-to-habits',
      'grammar:passive-basic'
    ]);
    expect(note).toBeDefined();
    expect(note.title).toContain('มินิบอสประลอง 4 โครงสร้าง B1');
  });

  it('returns B1 final boss note when B1 tags are combined', () => {
    const note = getGrammarNote(['review:b1-finalboss']);
    expect(note).toBeDefined();
    expect(note.title).toContain('มหาศึกผู้เชี่ยวชาญไวยากรณ์ B1');
  });
});

