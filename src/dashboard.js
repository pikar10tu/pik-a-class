import { signOut } from 'firebase/auth';
import { requireLogin, isAdmin } from './lib/auth-guard.js';
import { auth } from './lib/firebase.js';

requireLogin((firebaseUser, userDoc) => {
  const name = userDoc?.nickname || firebaseUser.displayName || firebaseUser.email;
  document.getElementById('welcome-message').textContent = `สวัสดี ${name}`;

  // ทางเข้าฝั่ง admin โผล่เฉพาะกับ role admin เท่านั้น — นักเรียนทั่วไปไม่เห็นเมนูนี้เลย
  if (isAdmin(userDoc)) {
    document.getElementById('admin-link').href = `${import.meta.env.BASE_URL}admin/index.html`;
    document.getElementById('admin-entry').hidden = false;
  }
});

document.getElementById('sign-out-btn').addEventListener('click', () => {
  signOut(auth);
});
