import { str, enumOf, int, num, isoDate } from './field-types.js';
import { LEVELS } from './taxonomy.js';

export const stageClearsSchema = {
  fields: {
    uid: str(),
    stageId: str(),
    skill: enumOf(['grammar', 'vocab', 'dialogue']),
    level: enumOf(LEVELS),
    order: int({ min: 1 }),
    score: num({ min: 0, max: 1 }),
    clearedAt: isoDate(),
  },
  rules: [],
};
