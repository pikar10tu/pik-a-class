import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function fetchUserDoc(db, uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function createUserDoc(db, uid, data) {
  await setDoc(doc(db, 'users', uid), data);
}

export async function completeOnboarding(db, uid, formData) {
  await updateDoc(doc(db, 'users', uid), { ...formData, onboardingComplete: true });
}
