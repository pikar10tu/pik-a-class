import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { CONSENT_VERSION } from './consent.js';

export async function fetchUserDoc(db, uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function createUserDoc(db, uid, data) {
  await setDoc(doc(db, 'users', uid), data);
}

export async function completeOnboarding(db, uid, formData, { now = new Date().toISOString() } = {}) {
  const { consent, ...profile } = formData;
  await updateDoc(doc(db, 'users', uid), {
    ...profile,
    onboardingComplete: true,
    consentAcceptedAt: now,
    consentVersion: CONSENT_VERSION,
  });
}
