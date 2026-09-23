import { GRAMMAR_NOTES_A1 } from './notes-a1.js';
import { GRAMMAR_NOTES_A2 } from './notes-a2.js';

export { GRAMMAR_NOTES_A1 } from './notes-a1.js';
export { GRAMMAR_NOTES_A2 } from './notes-a2.js';

export const GRAMMAR_NOTES = {
  ...GRAMMAR_NOTES_A1,
  ...GRAMMAR_NOTES_A2,
};

export function getGrammarNote(tags = []) {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  const grammarTags = tags.filter(t => t.startsWith('grammar:'));

  // A2 Final Boss: เมื่อมีแท็กของเงื่อนไข (zero-first-conditional) หรือมีแท็ก A2 ครบ
  if (tags.includes('review:a2-finalboss') || (grammarTags.length >= 8 && tags.includes('grammar:zero-first-conditional'))) {
    return GRAMMAR_NOTES['review:a2-finalboss'];
  }
  // A1 Final Boss: เมื่อมีแท็กของ A1 (present-simple & past-simple-be)
  if (tags.includes('review:a1-finalboss') || (grammarTags.length >= 8 && tags.includes('grammar:present-simple'))) {
    return GRAMMAR_NOTES['review:a1-finalboss'];
  }
  // A1 Mid-Boss (5 โมดูลแรกของ A1)
  if (tags.includes('review:a1-midboss') || (grammarTags.length === 5 && tags.includes('grammar:present-simple'))) {
    return GRAMMAR_NOTES['review:a1-midboss'];
  }
  // A2 Mid-Boss / Tenses Review (4 Tenses ของ A2)
  if (tags.includes('review:tenses-miniboss') || (grammarTags.length >= 4 && tags.includes('grammar:past-simple'))) {
    return GRAMMAR_NOTES['review:tenses-miniboss'];
  }
  if (grammarTags.length > 1) {
    return GRAMMAR_NOTES['review:past-tenses'];
  }

  for (const tag of tags) {
    if (GRAMMAR_NOTES[tag]) {
      return GRAMMAR_NOTES[tag];
    }
  }

  return null;
}
