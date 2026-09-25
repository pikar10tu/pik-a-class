import { GRAMMAR_NOTES_A1 } from './notes-a1.js';
import { GRAMMAR_NOTES_A2 } from './notes-a2.js';
import { GRAMMAR_NOTES_B1 } from './notes-b1.js';
import { GRAMMAR_NOTES_B2 } from './notes-b2.js';

export { GRAMMAR_NOTES_A1 } from './notes-a1.js';
export { GRAMMAR_NOTES_A2 } from './notes-a2.js';
export { GRAMMAR_NOTES_B1 } from './notes-b1.js';
export { GRAMMAR_NOTES_B2 } from './notes-b2.js';

export const GRAMMAR_NOTES = {
  ...GRAMMAR_NOTES_A1,
  ...GRAMMAR_NOTES_A2,
  ...GRAMMAR_NOTES_B1,
  ...GRAMMAR_NOTES_B2,
};

export function getGrammarNote(tags = []) {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  const grammarTags = tags.filter(t => t.startsWith('grammar:'));

  // B2 Final Boss: เมื่อมีแท็ก review หรือมีแท็ก B2 ครบ (รวม academic-hedging)
  if (tags.includes('review:b2-finalboss') || (grammarTags.length >= 8 && tags.includes('grammar:academic-hedging'))) {
    return GRAMMAR_NOTES['review:b2-finalboss'];
  }
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
  // B2 Mid-Boss (4 โมดูลแรกของ B2: participle, cond-3-mixed, unreal-past, modals-past)
  if (tags.includes('review:b2-midboss') || (grammarTags.length >= 4 && tags.includes('grammar:participle-clauses'))) {
    return GRAMMAR_NOTES['review:b2-midboss'];
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

  const TAG_ALIASES = {
    'grammar:causative': 'grammar:passive-advanced-causative',
    'grammar:passive-advanced': 'grammar:passive-advanced-causative',
    'grammar:future-continuous': 'grammar:future-advanced',
    'grammar:future-perfect': 'grammar:future-advanced',
    'grammar:conditional-3': 'grammar:conditional-3-mixed',
    'grammar:mixed-conditionals': 'grammar:conditional-3-mixed',
  };

  // หากระบุ tag เดี่ยวตรงๆ หรือผ่าน alias
  for (const tag of tags) {
    if (GRAMMAR_NOTES[tag]) {
      return GRAMMAR_NOTES[tag];
    }
    const aliasTarget = TAG_ALIASES[tag];
    if (aliasTarget && GRAMMAR_NOTES[aliasTarget]) {
      return GRAMMAR_NOTES[aliasTarget];
    }
  }

  return null;
}

