import { readFileSync } from 'node:fs';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';

export async function withTestEnv(fn) {
  const testEnv = await initializeTestEnvironment({
    projectId: 'pik-a-class-rules-test',
    firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
  });
  try {
    await testEnv.clearFirestore();
    await fn(testEnv);
  } finally {
    await testEnv.cleanup();
  }
}

export function authedDb(testEnv, uid) {
  return testEnv.authenticatedContext(uid).firestore();
}

export function anonDb(testEnv) {
  return testEnv.unauthenticatedContext().firestore();
}

export async function seed(testEnv, docs) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    for (const [path, data] of Object.entries(docs)) {
      const [collection, id] = path.split('/');
      await db.collection(collection).doc(id).set(data);
    }
  });
}

export function studentDoc(overrides = {}) {
  return {
    uid: 'student1',
    email: 'student@example.com',
    fullName: 'นักเรียน ทดสอบ',
    nickname: 'เรียน',
    grade: 'ม.3',
    school: 'โรงเรียนตัวอย่าง',
    phone: '0800000000',
    role: 'student',
    tier: 'free',
    onboardingComplete: true,
    createdAt: '2026-09-20T10:00:00.000Z',
    ...overrides,
  };
}

export function adminDoc(overrides = {}) {
  return studentDoc({
    uid: 'admin1',
    email: 'admin@example.com',
    role: 'admin',
    tier: 'full',
    ...overrides,
  });
}
