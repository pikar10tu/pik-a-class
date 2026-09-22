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

  it('returns review note when multiple grammar tags are present', () => {
    const note = getGrammarNote([
      'grammar:past-simple',
      'grammar:past-continuous',
      'grammar:present-perfect'
    ]);
    expect(note).toBeDefined();
    expect(note.title).toContain('ทบทวนเปรียบเทียบ');
  });
});
