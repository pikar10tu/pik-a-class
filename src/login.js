import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, db } from './lib/firebase.js';
import { fetchUserDoc, createUserDoc } from './lib/user-profile-io.js';
import { buildNewUserDoc, getPostLoginRedirect } from './lib/user-profile.js';
import { showPageError } from './lib/page-error.js';
import { mascotSrc } from './lib/mascot.js';
import { attachUiSounds } from './lib/ui-sound.js';
import { readReadySession } from './lib/local-cache.js';

// เคยล็อกอินและ onboarding แล้ว → ไปหน้าหลักทันที ไม่ต้องรอ Firebase
// ถ้า session หมดจริง หน้าหลักจะล้าง cache แล้วส่งกลับมาที่นี่ (ไม่วน เพราะ cache ถูกล้างแล้ว)
if (readReadySession()) {
  window.location.replace('./dashboard.html');
}

const base = import.meta.env.BASE_URL;
const mascotEl = document.getElementById('mascot');
if (mascotEl) {
  mascotEl.onerror = () => {
    mascotEl.src = mascotSrc('normal', base, 'png');
  };
  mascotEl.src = mascotSrc('normal', base, 'webp');
}
attachUiSounds();

// 1. ตรวจจับ LINE In-App Browser และระบบปฏิบัติการ
function checkLineBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera || '';
  const isLine = /\bLine\//i.test(ua);
  const isAndroid = /Android/i.test(ua);

  const guideBox = document.getElementById('line-browser-guide');
  const iosSteps = document.getElementById('line-steps-ios');
  const androidSteps = document.getElementById('line-steps-android');
  const copyBtn = document.getElementById('copy-link-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  if (isLine && guideBox) {
    guideBox.hidden = false;
    if (isAndroid) {
      if (iosSteps) iosSteps.hidden = true;
      if (androidSteps) androidSteps.hidden = false;
    } else {
      if (iosSteps) iosSteps.hidden = false;
      if (androidSteps) androidSteps.hidden = true;
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        const cleanUrl = window.location.origin + window.location.pathname;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(cleanUrl);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = cleanUrl;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        if (copyFeedback) {
          copyFeedback.hidden = false;
          setTimeout(() => {
            copyFeedback.hidden = true;
          }, 6000);
        }
      } catch (err) {
        alert('คัดลอกลิงก์สำเร็จแล้วครับ: ' + window.location.href);
      }
    });
  }

  return isLine;
}

const isInsideLine = checkLineBrowser();

// 2. ตรวจจับ Session เดิมที่เคยล็อกอินไว้แล้ว — ถือว่ามีสิทธิ์ ให้พากลับเข้าสู่ Dashboard ทันที
onAuthStateChanged(auth, async (firebaseUser) => {
  if (!firebaseUser) return;
  try {
    const userDoc = await fetchUserDoc(db, firebaseUser.uid);
    const target = getPostLoginRedirect(userDoc) === 'onboarding' ? './onboarding.html' : './dashboard.html';
    window.location.replace(target);
  } catch (err) {
    console.error('Auto-login session restore error:', err);
  }
});

// 3. จัดการการคลิกปุ่มเข้าสู่ระบบด้วย Google
document.getElementById('google-signin-btn').addEventListener('click', async () => {
  // หากตรวจพบว่าเปิดอยู่ใน LINE ให้เตือนก่อนเพื่อไม่ให้ติด error 403 disallowed_useragent ของ Google
  if (isInsideLine) {
    alert(
      '⚠️ ไม่สามารถล็อกอินผ่านหน้าต่างแชต LINE ได้ครับ\n\n' +
      'เนื่องจากระบบความปลอดภัยของ Google ไม่อนุญาตให้ล็อกอินในแอป LINE\n\n' +
      '👉 กรุณากดปุ่ม "คัดลอกลิงก์" ด้านบน แล้วนำไปเปิดใน Safari (สำหรับ iPhone) หรือ Chrome (สำหรับ Android) นะครับ 😊'
    );
    return;
  }

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
    if (error.code === 'auth/popup-blocked') {
      showPageError('เบราว์เซอร์บล็อกป๊อปอัป กรุณาอนุญาตป๊อปอัปแล้วลองใหม่อีกครั้ง');
      return;
    }
    showPageError('เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    console.error(error);
  }
});
