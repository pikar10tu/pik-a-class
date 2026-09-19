import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from './lib/firebase.js';
import { fetchUserDoc, createUserDoc } from './lib/user-profile-io.js';
import { buildNewUserDoc, getPostLoginRedirect } from './lib/user-profile.js';

document.getElementById('google-signin-btn').addEventListener('click', async () => {
  const result = await signInWithPopup(auth, googleProvider);
  let userDoc = await fetchUserDoc(db, result.user.uid);
  if (!userDoc) {
    userDoc = buildNewUserDoc(result.user);
    await createUserDoc(db, result.user.uid, userDoc);
  }
  const target = getPostLoginRedirect(userDoc) === 'onboarding' ? './onboarding.html' : './dashboard.html';
  window.location.href = target;
});
