import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase.js';
import { fetchUserDoc } from './user-profile-io.js';

export function isAdmin(userDocData) {
  return !!userDocData && userDocData.role === 'admin';
}

export function requireLogin(onReady) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      window.location.href = `${import.meta.env.BASE_URL}login.html`;
      return;
    }
    let userDoc;
    try {
      userDoc = await fetchUserDoc(db, firebaseUser.uid);
    } catch (error) {
      console.error(error);
      window.location.href = `${import.meta.env.BASE_URL}login.html`;
      return;
    }
    onReady(firebaseUser, userDoc);
  });
}

export function requireAdmin(onReady) {
  return requireLogin((firebaseUser, userDoc) => {
    if (!isAdmin(userDoc)) {
      window.location.href = `${import.meta.env.BASE_URL}dashboard.html`;
      return;
    }
    onReady(firebaseUser, userDoc);
  });
}
