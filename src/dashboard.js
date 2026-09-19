import { signOut } from 'firebase/auth';
import { requireLogin } from './lib/auth-guard.js';
import { auth } from './lib/firebase.js';

requireLogin((firebaseUser, userDoc) => {
  const name = userDoc?.nickname || firebaseUser.displayName || firebaseUser.email;
  document.getElementById('welcome-message').textContent = `สวัสดี ${name}`;
});

document.getElementById('sign-out-btn').addEventListener('click', () => {
  signOut(auth);
});
