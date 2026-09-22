import { describe, it, expect } from 'vitest';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { withTestEnv, authedDb, anonDb, seed, studentDoc, adminDoc } from './helpers.js';
import { stagePoolConstraints } from '../../src/lib/queries.js';

function buildQuery(db, collectionName, constraints, orderBySpec = null) {
  let q = constraints.reduce(
    (acc, [field, op, value]) => acc.where(field, op, value),
    db.collection(collectionName),
  );
  if (orderBySpec) {
    q = q.orderBy(orderBySpec.field, orderBySpec.direction ?? 'asc');
  }
  return q;
}

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
  'exercises/paid-only': exercise({ level: 'A2', contentHash: 'h-paid' }),
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

  it('lets an admin move an exercise to the trash but keeps students out of it', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        ...baseWorld,
        'exercises/trashed1': exercise({
          reviewStatus: 'draft',
          deletedAt: '2026-09-21T10:00:00.000Z',
          contentHash: 'h-trashed',
        }),
      });

      await assertSucceeds(
        authedDb(env, 'admin1')
          .collection('exercises')
          .doc('preview1')
          .update({ deletedAt: '2026-09-21T10:00:00.000Z', reviewStatus: 'draft' }),
      );
      await assertSucceeds(authedDb(env, 'admin1').collection('exercises').doc('trashed1').get());
      await assertFails(authedDb(env, 'paid1').collection('exercises').doc('trashed1').get());
      await assertFails(
        authedDb(env, 'student1')
          .collection('exercises')
          .doc('preview1')
          .update({ deletedAt: '2026-09-21T10:00:00.000Z' }),
      );
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
        'stages/st1': { ...stage, level: 'A2' },
        'stages/st-draft': { ...stage, level: 'A2', order: 2, reviewStatus: 'draft' },
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

  // list query ของ /stages ต้องล็อกทุกฟิลด์ที่ rule แตะ (reviewStatus + isPreview)
  // ไม่งั้น Firestore ประเมิน publishedAndAllowed() ไม่ได้และปฏิเสธทั้งชุด — ไม่ใช่แค่กรองบางใบทิ้ง
  // นี่คือ query จริงที่ stageConstraints() สร้างให้แต่ละ tier
  describe('the stage list query the learn pages actually issue', () => {
    const world = {
      ...baseWorld,
      'stages/st-preview': { ...stage, isPreview: true },
      'stages/st-paid': { ...stage, order: 2 },
      'stages/st-draft': { ...stage, order: 3, reviewStatus: 'draft' },
    };

    it('denies a free student who forgets the isPreview clause', async () => {
      await withTestEnv(async (env) => {
        await seed(env, world);
        await assertFails(
          authedDb(env, 'student1')
            .collection('stages')
            .where('reviewStatus', '==', 'published')
            .orderBy('order')
            .get(),
        );
      });
    });

    it('allows a free student once the isPreview clause is there', async () => {
      await withTestEnv(async (env) => {
        await seed(env, world);
        await assertSucceeds(
          authedDb(env, 'student1')
            .collection('stages')
            .where('reviewStatus', '==', 'published')
            .where('isPreview', '==', true)
            .orderBy('order')
            .get(),
        );
        await assertSucceeds(
          authedDb(env, 'student1')
            .collection('stages')
            .where('reviewStatus', '==', 'published')
            .where('isPreview', '==', true)
            .where('skill', '==', 'grammar')
            .where('level', '==', 'A1')
            .orderBy('order')
            .get(),
        );
      });
    });

    it('allows a full-tier student without the isPreview clause', async () => {
      await withTestEnv(async (env) => {
        await seed(env, world);
        await assertSucceeds(
          authedDb(env, 'paid1')
            .collection('stages')
            .where('reviewStatus', '==', 'published')
            .orderBy('order')
            .get(),
        );
      });
    });

    it('allows the admin stage list to see drafts with no filters at all', async () => {
      await withTestEnv(async (env) => {
        await seed(env, world);
        await assertSucceeds(authedDb(env, 'admin1').collection('stages').orderBy('order').get());
      });
    });
  });
});

describe('stage pool query rules', () => {
  const poolWorld = {
    'users/student1': studentDoc(),
    'users/paid1': studentDoc({ uid: 'paid1', tier: 'full' }),
    'exercises/pool-preview': exercise({ level: 'A2', isPreview: true, contentHash: 'h-pool-preview' }),
    'exercises/pool-paid': exercise({ level: 'A2', isPreview: false, contentHash: 'h-pool-paid' }),
    'exercises/pool-draft': exercise({ level: 'A2', reviewStatus: 'draft', isPreview: true, contentHash: 'h-pool-draft' }),
  };

  it('allows a free student to query the pool on a locked level and returns only published preview exercises', async () => {
    await withTestEnv(async (env) => {
      await seed(env, poolWorld);
      const constraints = stagePoolConstraints({
        skill: 'grammar',
        level: 'A2',
        tags: ['grammar:present-simple'],
        tier: 'free',
      });
      const db = authedDb(env, 'student1');
      const snap = await assertSucceeds(buildQuery(db, 'exercises', constraints).get());
      expect(snap.docs.map((d) => d.id)).toEqual(['pool-preview']);
    });
  });

  it('allows a full-tier student to query the pool and returns both preview and paid exercises but not drafts', async () => {
    await withTestEnv(async (env) => {
      await seed(env, poolWorld);
      const constraints = stagePoolConstraints({
        skill: 'grammar',
        level: 'A2',
        tags: ['grammar:present-simple'],
        tier: 'full',
      });
      const db = authedDb(env, 'paid1');
      const snap = await assertSucceeds(buildQuery(db, 'exercises', constraints).get());
      expect(snap.docs.map((d) => d.id).sort()).toEqual(['pool-paid', 'pool-preview']);
    });
  });

  it('allows a free student to query an A1 pool and get all exercises without preview filter', async () => {
    await withTestEnv(async (env) => {
      const a1World = {
        'users/student1': studentDoc(),
        'exercises/a1-preview': exercise({ level: 'A1', isPreview: true, contentHash: 'h-a1-prev' }),
        'exercises/a1-full': exercise({ level: 'A1', isPreview: false, contentHash: 'h-a1-full' }),
      };
      await seed(env, a1World);
      const constraints = stagePoolConstraints({
        skill: 'grammar',
        level: 'A1',
        tags: ['grammar:present-simple'],
        tier: 'free',
      });
      const db = authedDb(env, 'student1');
      const snap = await assertSucceeds(buildQuery(db, 'exercises', constraints).get());
      expect(snap.docs.map((d) => d.id).sort()).toEqual(['a1-full', 'a1-preview']);
    });
  });
});

