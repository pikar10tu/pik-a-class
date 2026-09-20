import { str, arrayOfStr, isoDate } from './field-types.js';

export const assignmentsSchema = {
  fields: {
    createdBy: str(),
    title: str({ maxLength: 200 }),
    note: str({ required: false, maxLength: 2000 }),
    exerciseIds: arrayOfStr({ minItems: 1, maxItems: 100 }),
    assignedTo: arrayOfStr({ minItems: 1, maxItems: 200 }),
    dueDate: isoDate({ required: false }),
    createdAt: isoDate(),
    updatedAt: isoDate(),
  },
  rules: [],
};
