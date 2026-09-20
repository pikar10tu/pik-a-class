import { str, enumOf, bool, arrayOfStr, isoDate } from './field-types.js';
import { LEVELS } from './taxonomy.js';
import { REVIEW_STATUSES, tagsRule } from './exercises.js';

function grammarTagsOnlyRule(data) {
  if (!Array.isArray(data.tags)) return null;
  if (data.tags.every((id) => id.startsWith('grammar:'))) return null;
  return [{ field: 'tags', message: 'สรุปไวยากรณ์ต้องใช้ tag ขึ้นต้นด้วย grammar: เท่านั้น' }];
}

export const grammarNotesSchema = {
  fields: {
    level: enumOf(LEVELS),
    topic: str({ maxLength: 200 }),
    tags: arrayOfStr({ minItems: 1, maxItems: 10 }),
    summary: str({ maxLength: 4000 }),
    isPreview: bool(),
    reviewStatus: enumOf(REVIEW_STATUSES),
    source: str({ required: false }),
    sourceUrl: str({ required: false }),
    reviewNotes: str({ required: false, maxLength: 4000 }),
    contentHash: str(),
    importBatchId: str({ required: false }),
    createdAt: isoDate(),
    updatedAt: isoDate(),
    createdBy: str(),
  },
  rules: [tagsRule, grammarTagsOnlyRule],
};
