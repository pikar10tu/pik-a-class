import { describe, it } from 'vitest';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { withTestEnv, authedDb, seed, studentDoc, adminDoc } from './helpers.js';

function submission(overrides = {}) {
  return {
    uid: 'student1',
    exerciseId: 'ex1',
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    tags: ['grammar:present-simple'],
    answer: 'goes',
    autoGraded: true,
    score: 1,
    bestStars: 3,
    attemptCount: 1,
    wrongCount: 0,
    lastAnsweredAt: '2026-09-20T10:00:00.000Z',
    status: 'completed',
    createdAt: '2026-09-20T10:00:00.000Z',
    ...overrides,
  };
}

const world = {
  'users/admin1': adminDoc(),
  'users/student1': studentDoc(),
  'users/student2': studentDoc({ uid: 'student2' }),
  'submissions/student1__bank__ex1': submission(),
  'submissions/student2__bank__ex1': submission({ uid: 'student2' }),
  'submissions/student1__bank__ex2': submission({
    exerciseId: 'ex2',
    type: 'paragraph',
    autoGraded: false,
    bestStars: 0,
    status: 'pending',
  }),
  'assignments/as1': {
    createdBy: 'admin1',
    title: 'การบ้านที่ 1',
    exerciseIds: ['ex1'],
    assignedTo: ['student1'],
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
  },
};

describe('submissions rules', () => {
  it('lets a student write their own submission only', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'student1');
      await assertSucceeds(
        db.collection('submissions').doc('student1__bank__ex3').set(submission({ exerciseId: 'ex3' })),
      );
      await assertFails(
        db
          .collection('submissions')
          .doc('student2__bank__ex3')
          .set(submission({ uid: 'student2', exerciseId: 'ex3' })),
      );
    });
  });

  it('blocks a student from writing grading fields or marking themselves graded', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('submissions').doc('student1__bank__ex2').update({ feedback: 'เยี่ยมมาก' }));
      await assertFails(db.collection('submissions').doc('student1__bank__ex2').update({ gradedBy: 'student1' }));
      await assertFails(
        db.collection('submissions').doc('student1__bank__ex2').update({ status: 'graded', bestStars: 3 }),
      );
    });
  });

  it('never lets best stars go down', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'student1');
      await assertSucceeds(
        db.collection('submissions').doc('student1__bank__ex1').update({ bestStars: 3, attemptCount: 2 }),
      );
      await assertFails(db.collection('submissions').doc('student1__bank__ex1').update({ bestStars: 1 }));
    });
  });

  it('keeps students out of other students submissions', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('submissions').doc('student2__bank__ex1').get());
      await assertFails(db.collection('submissions').get());
      await assertSucceeds(db.collection('submissions').where('uid', '==', 'student1').get());
    });
  });

  it('lets an admin read the grading queue and grade a submission', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'admin1');
      await assertSucceeds(db.collection('submissions').where('status', '==', 'pending').get());
      await assertSucceeds(
        db.collection('submissions').doc('student1__bank__ex2').update({
          status: 'graded',
          bestStars: 2,
          feedback: 'เขียนดีขึ้นมาก',
          gradedBy: 'admin1',
          gradedAt: '2026-09-21T10:00:00.000Z',
        }),
      );
    });
  });

  it('blocks an admin from crediting the grade to somebody else', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      await assertFails(
        authedDb(env, 'admin1').collection('submissions').doc('student1__bank__ex2').update({
          status: 'graded',
          feedback: 'ดี',
          gradedBy: 'student1',
          gradedAt: '2026-09-21T10:00:00.000Z',
        }),
      );
    });
  });
});

describe('assignments and stageClears rules', () => {
  it('shows an assignment only to the people it was assigned to', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      await assertSucceeds(authedDb(env, 'student1').collection('assignments').doc('as1').get());
      await assertFails(authedDb(env, 'student2').collection('assignments').doc('as1').get());
      await assertFails(
        authedDb(env, 'student1').collection('assignments').doc('as1').update({ title: 'แก้เอง' }),
      );
      await assertSucceeds(
        authedDb(env, 'admin1').collection('assignments').doc('as1').update({ title: 'แก้โดยแอดมิน' }),
      );
    });
  });

  it('lets a student record their own stage clear only', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const clear = {
        uid: 'student1',
        stageId: 'st1',
        skill: 'grammar',
        level: 'A1',
        order: 1,
        score: 0.9,
        clearedAt: '2026-09-20T10:00:00.000Z',
      };
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('stageClears').doc('student1__st1').set(clear));
      await assertFails(db.collection('stageClears').doc('student2__st1').set({ ...clear, uid: 'student2' }));
      await assertFails(db.collection('stageClears').doc('student1__st1').delete());
      await assertSucceeds(
        authedDb(env, 'admin1').collection('stageClears').where('uid', '==', 'student1').get(),
      );
    });
  });
});
