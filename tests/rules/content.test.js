import { describe, it } from 'vitest';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { withTestEnv, authedDb, anonDb, seed, studentDoc, adminDoc } from './helpers.js';

function exercise(overrides = {}) {
  return {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She ___ to school.',
    choices: ['go', 'goes'],
    answerKey: ['goes'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    contentHash: 'hash1',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin1',
    ...overrides,
  };
}

const baseWorld = {
  'users/admin1': adminDoc(),
  'users/student1': studentDoc(),
  'users/paid1': studentDoc({ uid: 'paid1', tier: 'full' }),
  'exercises/preview1': exercise({ isPreview: true, contentHash: 'h-preview' }),
  'exercises/paid-only': exercise({ contentHash: 'h-paid' }),
  'exercises/draft1': exercise({ reviewStatus: 'draft', contentHash: 'h-draft' }),
  'exercises/assigned1': exercise({
    visibility: 'assignmentOnly',
    assignedUids: ['student1'],
    contentHash: 'h-assigned',
  }),
};

describe('exercises rules', () => {
  it('lets a free student read preview content but not paid-only content', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('exercises').doc('preview1').get());
      await assertFails(db.collection('exercises').doc('paid-only').get());
    });
  });

  it('lets a full-tier student read paid-only content', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertSucceeds(authedDb(env, 'paid1').collection('exercises').doc('paid-only').get());
    });
  });

  it('lets a free student read an exercise they were assigned', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertSucceeds(authedDb(env, 'student1').collection('exercises').doc('assigned1').get());
      await assertFails(authedDb(env, 'paid1').collection('exercises').doc('assigned1').get());
    });
  });

  it('hides drafts from students but shows them to admins', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertFails(authedDb(env, 'paid1').collection('exercises').doc('draft1').get());
      await assertSucceeds(authedDb(env, 'admin1').collection('exercises').doc('draft1').get());
    });
  });

  it('accepts the documented free-tier query and rejects an unfiltered one', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      const db = authedDb(env, 'student1');
      await assertSucceeds(
        db
          .collection('exercises')
          .where('reviewStatus', '==', 'published')
          .where('visibility', '==', 'bank')
          .where('isPreview', '==', true)
          .get(),
      );
      await assertFails(db.collection('exercises').get());
    });
  });

  it('blocks all student writes and allows admin writes inside the allowlist', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertFails(authedDb(env, 'student1').collection('exercises').doc('new1').set(exercise()));
      await assertFails(
        authedDb(env, 'student1').collection('exercises').doc('preview1').update({ isPreview: false }),
      );

      const adminDb = authedDb(env, 'admin1');
      await assertSucceeds(adminDb.collection('exercises').doc('new1').set(exercise({ contentHash: 'h-new' })));
      await assertSucceeds(adminDb.collection('exercises').doc('draft1').update({ reviewStatus: 'published' }));
      await assertSucceeds(adminDb.collection('exercises').doc('new1').delete());
      await assertFails(adminDb.collection('exercises').doc('new2').set(exercise({ totalStars: 3 })));
    });
  });

  it('blocks anonymous reads', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertFails(anonDb(env).collection('exercises').doc('preview1').get());
    });
  });
});

describe('stages and grammarNotes rules', () => {
  const stage = {
    skill: 'grammar',
    level: 'A1',
    order: 1,
    title: 'ด่าน 1',
    itemIds: ['preview1'],
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin1',
  };

  const note = {
    level: 'A1',
    topic: 'Present Simple',
    tags: ['grammar:present-simple'],
    summary: 'ใช้พูดถึงสิ่งที่ทำเป็นประจำ',
    isPreview: true,
    reviewStatus: 'published',
    contentHash: 'h-note',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin1',
  };

  it('applies the same published + tier gate', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        ...baseWorld,
        'stages/st1': stage,
        'stages/st-draft': { ...stage, order: 2, reviewStatus: 'draft' },
        'grammarNotes/n1': note,
      });

      await assertFails(authedDb(env, 'student1').collection('stages').doc('st1').get());
      await assertSucceeds(authedDb(env, 'paid1').collection('stages').doc('st1').get());
      await assertFails(authedDb(env, 'paid1').collection('stages').doc('st-draft').get());
      await assertSucceeds(authedDb(env, 'student1').collection('grammarNotes').doc('n1').get());
      await assertFails(
        authedDb(env, 'student1').collection('grammarNotes').doc('n1').update({ summary: 'แก้เอง' }),
      );
    });
  });
});
