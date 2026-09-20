import { usersSchema } from './users.js';
import { exercisesSchema } from './exercises.js';
import { stagesSchema } from './stages.js';
import { grammarNotesSchema } from './grammar-notes.js';

export const collectionSchemas = {
  users: usersSchema,
  exercises: exercisesSchema,
  stages: stagesSchema,
  grammarNotes: grammarNotesSchema,
};
