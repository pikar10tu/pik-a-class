import { signOut } from 'firebase/auth';
import { requireLogin, isAdmin } from './lib/auth-guard.js';
import { auth } from './lib/firebase.js';
import { mascotSrc } from './lib/mascot.js';
import { attachUiSounds } from './lib/ui-sound.js';

const base = import.meta.env.BASE_URL;
const learnLink = document.getElementById('learn-link');
if (learnLink) learnLink.href = `${base}learn/index.html`;

const mascotEl = document.getElementById('dashboard-mascot');
if (mascotEl) mascotEl.src = mascotSrc('normal', base);

attachUiSounds();

requireLogin((firebaseUser, userDoc) => {
  const callName = userDoc?.callName?.trim();
  const nickname = userDoc?.nickname?.trim();
  const displayName = nickname || firebaseUser.displayName || 'เพื่อนๆ';
  
  // ถ้าพี่ปิ๊กตั้งชื่อเรียกเฉพาะตัว (เช่น น้องบีน, พี่โก้, คุณแม่น้องมินท์) ให้ทักทายโดยตรง
  // ถ้ายังไม่ได้ตั้ง ให้ใช้ค่ามาตรฐานสุภาพ: สวัสดีคุณ [ชื่อเล่น]
  const greetingTarget = callName ? callName : `คุณ ${displayName}`;
  const welcomeEl = document.getElementById('welcome-message');
  if (welcomeEl) welcomeEl.textContent = `สวัสดี${greetingTarget}!`;

  const userPill = document.getElementById('user-pill');
  if (userPill) userPill.textContent = `👤 ${callName || displayName}`;

  // ทางเข้าฝั่ง admin โผล่เฉพาะกับ role admin เท่านั้น — นักเรียนทั่วไปไม่เห็นเมนูนี้เลย
  if (isAdmin(userDoc)) {
    const adminLink = document.getElementById('admin-link');
    if (adminLink) adminLink.href = `${base}admin/index.html`;
    const adminEntry = document.getElementById('admin-entry');
    if (adminEntry) adminEntry.hidden = false;

    const navAdminLink = document.getElementById('nav-admin-link');
    if (navAdminLink) {
      navAdminLink.href = `${base}admin/index.html`;
      navAdminLink.hidden = false;
    }
  }
});

document.getElementById('sign-out-btn').addEventListener('click', () => {
  signOut(auth);
});
