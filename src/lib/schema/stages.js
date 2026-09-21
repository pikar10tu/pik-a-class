import { str, enumOf, bool, int, num, arrayOfStr, isoDate } from './field-types.js';
import { LEVELS } from './taxonomy.js';
import { REVIEW_STATUSES } from './exercises.js';

export const DEFAULT_PASS_THRESHOLD = 0.7;
export const DEFAULT_DRAW_COUNT = 7;
export const MAX_DRAW_COUNT = 30;
export const MAX_STAGE_TAGS = 30;

export const stagesSchema = {
  fields: {
    skill: enumOf(['grammar', 'vocab', 'dialogue']),
    level: enumOf(LEVELS),
    order: int({ min: 1 }),
    title: str({ maxLength: 200 }),
    tags: arrayOfStr({ minItems: 1, maxItems: MAX_STAGE_TAGS }),
    drawCount: int({ min: 1, max: MAX_DRAW_COUNT }),
    passThreshold: num({ min: 0, max: 1 }),
    isPreview: bool(),
    reviewStatus: enumOf(REVIEW_STATUSES),
    createdAt: isoDate(),
    updatedAt: isoDate(),
    createdBy: str(),
  },
  rules: [],
};
