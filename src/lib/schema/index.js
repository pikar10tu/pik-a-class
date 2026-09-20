import { usersSchema } from './users.js';
import { exercisesSchema } from './exercises.js';
import { stagesSchema } from './stages.js';
import { grammarNotesSchema } from './grammar-notes.js';
import { assignmentsSchema } from './assignments.js';
import { submissionsSchema } from './submissions.js';
import { stageClearsSchema } from './stage-clears.js';

export const collectionSchemas = {
  users: usersSchema,
  exercises: exercisesSchema,
  stages: stagesSchema,
  grammarNotes: grammarNotesSchema,
  assignments: assignmentsSchema,
  submissions: submissionsSchema,
  stageClears: stageClearsSchema,
};
