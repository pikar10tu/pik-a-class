import { GRAMMAR_NOTES_A1 } from './notes-a1.js';
import { GRAMMAR_NOTES_A2 } from './notes-a2.js';
import { GRAMMAR_NOTES_B1 } from './notes-b1.js';

export { GRAMMAR_NOTES_A1 } from './notes-a1.js';
export { GRAMMAR_NOTES_A2 } from './notes-a2.js';
export { GRAMMAR_NOTES_B1 } from './notes-b1.js';

export const GRAMMAR_NOTES = {
  ...GRAMMAR_NOTES_A1,
  ...GRAMMAR_NOTES_A2,
  ...GRAMMAR_NOTES_B1,
};

export function getGrammarNote(tags = []) {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  const grammarTags = tags.filter(t => t.startsWith('grammar:'));

  // B1 Final Boss: เมื่อมีแท็ก review หรือมีแท็ก B1 ครบ (รวม discourse-connectors)
  if (tags.includes('review:b1-finalboss') || (grammarTags.length >= 8 && tags.includes('grammar:discourse-connectors'))) {
    return GRAMMAR_NOTES['review:b1-finalboss'];
  }
  // A2 Final Boss: เมื่อมีแท็กของเงื่อนไข (zero-first-conditional) หรือมีแท็ก A2 ครบ
  if (tags.includes('review:a2-finalboss') || (grammarTags.length >= 8 && tags.includes('grammar:zero-first-conditional'))) {
    return GRAMMAR_NOTES['review:a2-finalboss'];
  }
  // A1 Final Boss: เมื่อมีแท็กของ A1 (present-simple & past-simple-be)
  if (tags.includes('review:a1-finalboss') || (grammarTags.length >= 8 && tags.includes('grammar:present-simple'))) {
    return GRAMMAR_NOTES['review:a1-finalboss'];
  }
  // B1 Mid-Boss (4 โมดูลแรกของ B1: pres-perf-con, past-perf, used-to, passive)
  if (tags.includes('review:b1-midboss') || (grammarTags.length >= 4 && tags.includes('grammar:present-perfect-continuous'))) {
    return GRAMMAR_NOTES['review:b1-midboss'];
  }
  // A1 Mid-Boss (5 โมดูลแรกของ A1)
  if (tags.includes('review:a1-midboss') || (grammarTags.length === 5 && tags.includes('grammar:present-simple'))) {
    return GRAMMAR_NOTES['review:a1-midboss'];
  }
  // A2 Mid-Boss / Tenses Review (4 Tenses ของ A2)
  if (tags.includes('review:tenses-miniboss') || (grammarTags.length >= 4 && tags.includes('grammar:past-simple'))) {
    return GRAMMAR_NOTES['review:tenses-miniboss'];
  }

  if (grammarTags.length > 1 && GRAMMAR_NOTES['review:past-tenses']) {
    return GRAMMAR_NOTES['review:past-tenses'];
  }

  // หากระบุ tag เดี่ยวตรงๆ
  for (const tag of tags) {
    if (GRAMMAR_NOTES[tag]) {
      return GRAMMAR_NOTES[tag];
    }
  }

  return null;
}

