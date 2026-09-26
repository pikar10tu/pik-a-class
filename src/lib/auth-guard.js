import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase.js';
import { fetchUserDoc } from './user-profile-io.js';
import { readReadySession, writeSession, clearAll } from './local-cache.js';

export function isAdmin(userDocData) {
  return !!userDocData && userDocData.role === 'admin';
}

function goToLogin() {
  window.location.href = `${import.meta.env.BASE_URL}login.html`;
}

// onCached (ถ้าส่งมา) ถูกเรียกทันทีจาก session ในเครื่อง เพื่อให้หน้าขึ้นก่อนรอ Firebase (~0.5–1 วินาที)
// onReady ถูกเรียกเมื่อ Auth + โปรไฟล์จาก server พร้อม เหมือนเดิม — หน้าต้อง render ซ้ำได้ปลอดภัย
export function requireLogin(onReady, { onCached } = {}) {
  const cached = onCached ? readReadySession() : null;
  let shownFromCache = false;
  if (cached) {
    try {
      onCached({ uid: cached.uid, displayName: cached.displayName, email: cached.email }, cached.userDoc);
      shownFromCache = true;
    } catch (error) {
      console.error(error);
    }
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      clearAll();
      goToLogin();
      return;
    }
    const sameUserAsCache = !!cached && cached.uid === firebaseUser.uid;
    if (cached && !sameUserAsCache) clearAll();

    let userDoc;
    try {
      userDoc = await fetchUserDoc(db, firebaseUser.uid);
    } catch (error) {
      console.error(error);
      // เน็ตหลุดแต่แสดงจาก cache ของคนเดิมไปแล้ว — คงหน้าจอไว้ ไม่เด้งเด็กออก
      if (shownFromCache && sameUserAsCache) return;
      goToLogin();
      return;
    }
    writeSession({
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName ?? '',
      email: firebaseUser.email ?? '',
      userDoc,
    });
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
