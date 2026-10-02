import { describe, it } from 'vitest';
import { assertSucceeds } from '@firebase/rules-unit-testing';
import { withTestEnv, authedDb, seed, studentDoc } from './helpers.js';
import { saveStageResult } from '../../src/lib/stage-result-io.js';

describe('saveStageResult against real rules', () => {
  it('saves a first-time stage clear for a student', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc() });
      const db = authedDb(env, 'student1');
      const stage = { id: 's1', skill: 'grammar', level: 'A1', order: 1, passThreshold: 0.7 };
      const exercises = [1, 2, 3].map((n) => ({ id: `ex${n}`, skill: 'grammar', level: 'A1', type: 'mcq', tags: [] }));
      const results = exercises.map((e) => ({ exerciseId: e.id, answer: 'a', correct: true }));
      await assertSucceeds(saveStageResult(db, { uid: 'student1', stage, exercises, results }));
      // เล่นซ้ำ: ต้องอ่านของเดิมได้และเขียนทับโดยไม่ผิด rules
      await assertSucceeds(saveStageResult(db, { uid: 'student1', stage, exercises, results }));
    });
  });
});
