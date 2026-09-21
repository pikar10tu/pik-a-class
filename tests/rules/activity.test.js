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

  it('never lets a stage clear score go down', async () => {
    await withTestEnv(async (env) => {
      const clear = (overrides = {}) => ({
        uid: 'student1',
        stageId: 'st1',
        skill: 'grammar',
        level: 'A1',
        order: 1,
        score: 0.5,
        clearedAt: '2026-09-20T10:00:00.000Z',
        ...overrides,
      });
      await seed(env, {
        'users/student1': studentDoc(),
        'stageClears/student1__st1': clear({ score: 0.5 }),
      });
      const db = authedDb(env, 'student1');
      // สูงขึ้นได้
      await assertSucceeds(
        db.collection('stageClears').doc('student1__st1').set(clear({ score: 0.9 })),
      );
      // เท่าเดิมได้ (แม้ client ปกติจะไม่ยิง write ตอนคะแนนเท่าเดิม แต่ rules ต้อง coherent เอง)
      await assertSucceeds(
        db.collection('stageClears').doc('student1__st1').set(clear({ score: 0.9 })),
      );
      // ต่ำกว่าเดิมต้องถูกปฏิเสธ
      await assertFails(
        db.collection('stageClears').doc('student1__st1').set(clear({ score: 0.2 })),
      );
    });
  });
});

describe('finishing a stage', () => {
  const stageClear = (overrides = {}) => ({
    uid: 'student1',
    stageId: 'st1',
    skill: 'grammar',
    level: 'A2',
    order: 1,
    score: 0.5,
    clearedAt: '2026-09-22T04:00:00.000Z',
    ...overrides,
  });

  it('writes every submission and the stage clear in one batch', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc() });
      const db = authedDb(env, 'student1');
      const batch = db.batch();
      batch.set(db.collection('submissions').doc('student1__bank__e1'), submission({ exerciseId: 'e1' }));
      batch.set(db.collection('submissions').doc('student1__bank__e2'), submission({ exerciseId: 'e2' }));
      batch.set(db.collection('stageClears').doc('student1__st1'), stageClear());
      await assertSucceeds(batch.commit());
    });
  });

  it('rejects the whole batch when one submission lowers bestStars', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        'users/student1': studentDoc(),
        'submissions/student1__bank__e1': submission({ exerciseId: 'e1', bestStars: 3 }),
      });
      const db = authedDb(env, 'student1');
      const batch = db.batch();
      batch.set(db.collection('submissions').doc('student1__bank__e1'), submission({ exerciseId: 'e1', bestStars: 0 }));
      batch.set(db.collection('stageClears').doc('student1__st1'), stageClear());
      await assertFails(batch.commit());
    });
  });

  it('rejects the whole batch when the stage clear score drops', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        'users/student1': studentDoc(),
        'stageClears/student1__st1': stageClear({ score: 0.9 }),
      });
      const db = authedDb(env, 'student1');
      const batch = db.batch();
      batch.set(db.collection('submissions').doc('student1__bank__e1'), submission({ exerciseId: 'e1' }));
      batch.set(db.collection('stageClears').doc('student1__st1'), stageClear({ score: 0.5 }));
      await assertFails(batch.commit());
    });
  });

  it('accepts the batch when bestStars stays the same', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        'users/student1': studentDoc(),
        'submissions/student1__bank__e1': submission({ exerciseId: 'e1', bestStars: 3 }),
      });
      const db = authedDb(env, 'student1');
      await assertSucceeds(
        db
          .collection('submissions')
          .doc('student1__bank__e1')
          .set(submission({ exerciseId: 'e1', bestStars: 3, attemptCount: 2, wrongCount: 1, score: 0 })),
      );
    });
  });

  it('blocks writing a stage clear that belongs to somebody else', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc(), 'users/student2': studentDoc({ uid: 'student2' }) });
      const db = authedDb(env, 'student1');
      await assertFails(
        db.collection('stageClears').doc('student2__st1').set(stageClear({ uid: 'student2' })),
      );
    });
  });

  it('allows creating the first stage clear when none exists yet', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc() });
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('stageClears').doc('student1__st1').set(stageClear()));
    });
  });

  it('blocks a free-tier student from reading a stage that is not a preview', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        'users/student1': studentDoc({ tier: 'free' }),
        'stages/st1': {
          skill: 'grammar',
          level: 'A2',
          order: 1,
          title: 'Past Simple',
          itemIds: ['e1'],
          passThreshold: 0.7,
          isPreview: false,
          reviewStatus: 'published',
          createdAt: '2026-09-22T04:00:00.000Z',
          updatedAt: '2026-09-22T04:00:00.000Z',
          createdBy: 'admin1',
        },
      });
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('stages').doc('st1').get());
    });
  });
});
