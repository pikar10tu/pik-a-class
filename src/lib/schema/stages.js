import { str, enumOf, bool, int, num, arrayOfStr, isoDate } from './field-types.js';
import { LEVELS } from './taxonomy.js';
import { REVIEW_STATUSES } from './exercises.js';

export const DEFAULT_PASS_THRESHOLD = 0.7;

export const stagesSchema = {
  fields: {
    skill: enumOf(['grammar', 'vocab', 'dialogue']),
    level: enumOf(LEVELS),
    order: int({ min: 1 }),
    title: str({ maxLength: 200 }),
    itemIds: arrayOfStr({ minItems: 1, maxItems: 20 }),
    passThreshold: num({ min: 0, max: 1 }),
    isPreview: bool(),
    reviewStatus: enumOf(REVIEW_STATUSES),
    createdAt: isoDate(),
    updatedAt: isoDate(),
    createdBy: str(),
  },
  rules: [],
};
