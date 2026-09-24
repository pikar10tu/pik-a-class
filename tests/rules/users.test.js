import { describe, it } from 'vitest';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { withTestEnv, authedDb, anonDb, seed, studentDoc, adminDoc } from './helpers.js';

describe('users rules', () => {
  it('lets a signed-in user create their own student doc', async () => {
    await withTestEnv(async (env) => {
      const db = authedDb(env, 'student1');
      await assertSucceeds(
        db.collection('users').doc('student1').set(studentDoc({ onboardingComplete: false })),
      );
    });
  });

  it('blocks creating a doc for somebody else', async () => {
    await withTestEnv(async (env) => {
      const db = authedDb(env, 'student1');
      await assertFails(
        db.collection('users').doc('student2').set(studentDoc({ uid: 'student2', onboardingComplete: false })),
      );
    });
  });

  it('blocks self-promotion to admin or full tier at create time', async () => {
    await withTestEnv(async (env) => {
      const db = authedDb(env, 'student1');
      await assertFails(
        db.collection('users').doc('student1').set(studentDoc({ role: 'admin', onboardingComplete: false })),
      );
      await assertFails(
        db.collection('users').doc('student1').set(studentDoc({ tier: 'full', onboardingComplete: false })),
      );
    });
  });

  it('blocks fields that are not in the allowlist', async () => {
    await withTestEnv(async (env) => {
      const db = authedDb(env, 'student1');
      await assertFails(
        db.collection('users').doc('student1').set(studentDoc({ onboardingComplete: false, totalStars: 99 })),
      );
    });
  });

  it('lets the owner edit profile fields but not tier, role, email, or createdAt', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc() });
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('users').doc('student1').update({ nickname: 'ชื่อใหม่', prefix: 'พี่', callName: 'พี่ชื่อใหม่' }));
      await assertSucceeds(
        db
          .collection('users')
          .doc('student1')
          .update({
            streak: { current: 1, longest: 1, lastActiveDate: '2026-09-20' },
            favoriteVocab: ['w-a1-1', 'w-a1-2'],
            favoriteVocabUpdatedAt: '2026-09-24T10:00:00.000Z',
            hasReviewed: true,
            reviewSubmittedAt: '2026-09-24T10:00:00.000Z',
          }),
      );
      // Student reviews collection test
      await assertSucceeds(
        db.collection('reviews').doc('student1').set({
          uid: 'student1',
          authorName: 'น้องเรียน',
          rating: 5,
          comment: 'เรียนสนุกมากครับ ชอบแอนิเมชันกับเสียง',
          clearedCount: 3,
          createdAt: '2026-09-24T10:00:00.000Z',
        }),
      );
      // Cannot submit review with rating 0 or empty comment
      await assertFails(
        db.collection('reviews').doc('student1').update({ rating: 0 }),
      );
      await assertFails(
        db.collection('reviews').doc('student1').update({ comment: '' }),
      );
      // Other student cannot write someone else's review
      await assertFails(
        db.collection('reviews').doc('student2').set({
          uid: 'student2',
          authorName: 'น้องบีน',
          rating: 5,
          comment: 'เยี่ยม',
          clearedCount: 3,
          createdAt: '2026-09-24T10:00:00.000Z',
        }),
      );
      await assertFails(db.collection('users').doc('student1').update({ tier: 'full' }));
      await assertFails(db.collection('users').doc('student1').update({ role: 'admin' }));
      await assertFails(db.collection('users').doc('student1').update({ groupTags: ['เสาร์บ่าย'] }));
      await assertFails(db.collection('users').doc('student1').update({ allowedLevels: ['A1', 'A2'] }));
      await assertFails(db.collection('users').doc('student1').update({ email: 'other@example.com' }));
      await assertFails(db.collection('users').doc('student1').update({ createdAt: '2020-01-01T00:00:00.000Z' }));
    });
  });

  it('keeps students out of other students documents', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc(), 'users/student2': studentDoc({ uid: 'student2' }) });
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('users').doc('student2').get());
      await assertFails(db.collection('users').get());
    });
  });

  it('lets an admin list students and change tier, note, and groupTags', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/admin1': adminDoc(), 'users/student1': studentDoc() });
      const db = authedDb(env, 'admin1');
      await assertSucceeds(db.collection('users').where('role', '==', 'student').get());
      await assertSucceeds(
        db
          .collection('users')
          .doc('student1')
          .update({ tier: 'full', tierNote: 'จ่ายแล้ว', groupTags: ['เสาร์บ่าย'], callName: 'น้องบีน', allowedLevels: ['A1', 'A2'] }),
      );
    });
  });

  it('blocks anonymous access entirely', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc() });
      const db = anonDb(env);
      await assertFails(db.collection('users').doc('student1').get());
      await assertFails(db.collection('users').doc('student1').set(studentDoc()));
    });
  });

  it('blocks deleting user documents', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/admin1': adminDoc(), 'users/student1': studentDoc() });
      await assertFails(authedDb(env, 'student1').collection('users').doc('student1').delete());
      await assertFails(authedDb(env, 'admin1').collection('users').doc('student1').delete());
    });
  });

  it('lets the owner record their consent', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc({ onboardingComplete: false }) });
      const db = authedDb(env, 'student1');
      await assertSucceeds(
        db.collection('users').doc('student1').update({
          onboardingComplete: true,
          consentAcceptedAt: '2026-09-21T03:00:00.000Z',
          consentVersion: 1,
        }),
      );
    });
  });

  it('still blocks unknown fields sneaking in with consent', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc({ onboardingComplete: false }) });
      const db = authedDb(env, 'student1');
      await assertFails(
        db.collection('users').doc('student1').update({
          consentAcceptedAt: '2026-09-21T03:00:00.000Z',
          consentVersion: 1,
          consent: 'on',
        }),
      );
    });
  });
});
