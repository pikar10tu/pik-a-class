import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from './lib/firebase.js';
import { fetchUserDoc, createUserDoc } from './lib/user-profile-io.js';
import { buildNewUserDoc, getPostLoginRedirect } from './lib/user-profile.js';
import { showPageError } from './lib/page-error.js';
import { mascotSrc } from './lib/mascot.js';
import { attachUiSounds } from './lib/ui-sound.js';

const base = import.meta.env.BASE_URL;
const mascotEl = document.getElementById('mascot');
if (mascotEl) mascotEl.src = mascotSrc('normal', base);
attachUiSounds();

document.getElementById('google-signin-btn').addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    let userDoc = await fetchUserDoc(db, result.user.uid);
    if (!userDoc) {
      userDoc = buildNewUserDoc(result.user);
      await createUserDoc(db, result.user.uid, userDoc);
    }
    const target = getPostLoginRedirect(userDoc) === 'onboarding' ? './onboarding.html' : './dashboard.html';
    window.location.href = target;
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') return;
    showPageError('เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    console.error(error);
  }
});
