import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { requireLogin, isAdmin } from './lib/auth-guard.js';
import { auth, db } from './lib/firebase.js';
import { getAvatarSrc } from './lib/user-profile.js';
import { attachUiSounds } from './lib/ui-sound.js';
import { calculateStudentOverview } from './lib/student-analytics.js';
import { readCache, writeCache, isSameData, clearAll } from './lib/local-cache.js';

const base = import.meta.env.BASE_URL;

const learnLink = document.getElementById('learn-link');
if (learnLink) learnLink.href = `${base}learn/index.html`;

const cafeLink = document.getElementById('cafe-link');
if (cafeLink) cafeLink.href = `${base}vocab/cafe.html`;

const handbookLink = document.getElementById('handbook-link');
if (handbookLink) handbookLink.href = `${base}handbook.html`;

const vocabLink = document.getElementById('vocab-link');
if (vocabLink) vocabLink.href = `${base}vocab/index.html`;

const userPillLink = document.getElementById('user-pill-link');
if (userPillLink) userPillLink.href = `${base}profile.html`;

attachUiSounds();

function renderProfile(user, userDoc) {
  const callName = userDoc?.callName?.trim();
  const nickname = userDoc?.nickname?.trim();
  const displayName = nickname || user.displayName || 'เพื่อนๆ';

  const avatarId = userDoc?.avatarId || 'avatar-1';
  const avatarSrc = getAvatarSrc(avatarId, base, 'webp');

  const mascotEl = document.getElementById('dashboard-mascot');
  if (mascotEl) {
    mascotEl.onerror = () => {
      mascotEl.src = getAvatarSrc(avatarId, base, 'png');
    };
    if (mascotEl.getAttribute('src') !== avatarSrc) mascotEl.src = avatarSrc;
    mascotEl.alt = 'น้องหยกอวตาร';
  }

  const greetingTarget = callName ? callName : `คุณ ${displayName}`;
  const welcomeEl = document.getElementById('welcome-message');
  if (welcomeEl) welcomeEl.textContent = `สวัสดี${greetingTarget}!`;

  const userPill = document.getElementById('user-pill');
  if (userPill) {
    userPill.innerHTML = `
      <span class="user-pill-avatar-wrap">
        <img class="user-pill-avatar" alt="Avatar" width="22" height="22" />
      </span>
      <span class="user-pill-name"></span>
    `;
    // ชื่อมาจากผู้ใช้กรอกเอง — ใส่ผ่าน textContent เสมอ ห้ามแทรกลง innerHTML
    userPill.querySelector('.user-pill-avatar').src = avatarSrc;
    userPill.querySelector('.user-pill-name').textContent = callName || displayName;
    userPill.removeAttribute('aria-busy');
  }

  // ตั้งทั้งสองทาง: cache อาจบอกว่าเป็นแอดมิน แต่ server บอกว่าไม่ใช่แล้ว
  const admin = isAdmin(userDoc);
  const adminLink = document.getElementById('admin-link');
  if (adminLink) adminLink.href = `${base}admin/index.html`;
  const adminEntry = document.getElementById('admin-entry');
  if (adminEntry) adminEntry.hidden = !admin;
  const navAdminLink = document.getElementById('nav-admin-link');
  if (navAdminLink) {
    navAdminLink.href = `${base}admin/index.html`;
    navAdminLink.hidden = !admin;
  }
}

function renderStats(overview) {
  const statStars = document.getElementById('stat-stars');
  const statStages = document.getElementById('stat-stages');
  const statQuestions = document.getElementById('stat-questions');
  if (statStars) statStars.textContent = overview.totalStars;
  if (statStages) statStages.textContent = overview.totalStagesCleared;
  if (statQuestions) statQuestions.textContent = overview.totalQuestionsAnswered;
  const heroStats = document.getElementById('hero-stats');
  if (heroStats) heroStats.hidden = false;
  const skeleton = document.getElementById('hero-stats-skeleton');
  if (skeleton) skeleton.hidden = true;
}

let shownOverview = null;

requireLogin(async (firebaseUser, userDoc) => {
  renderProfile(firebaseUser, userDoc);

  try {
    const [clearsSnap, subsSnap] = await Promise.all([
      getDocs(query(collection(db, 'stageClears'), where('uid', '==', firebaseUser.uid))),
      getDocs(query(collection(db, 'submissions'), where('uid', '==', firebaseUser.uid))),
    ]);
    const stageClears = clearsSnap.docs.map((d) => d.data());
    const submissions = subsSnap.docs.map((d) => d.data());
    // เก็บเฉพาะตัวเลขที่คำนวณแล้ว submissions ดิบโตเรื่อยๆ ไม่เก็บลงเครื่อง
    const overview = calculateStudentOverview({ submissions, stageClears });

    if (!isSameData(overview, shownOverview)) renderStats(overview);
    shownOverview = overview;
    writeCache(firebaseUser.uid, 'overview', overview);
    writeCache(firebaseUser.uid, 'clears', stageClears);
  } catch (error) {
    console.error('Failed to load student progress:', error);
    // ไม่มีตัวเลขให้แสดง — เอาโครงร่างออก ไม่ให้วิบวับค้าง
    const skeleton = document.getElementById('hero-stats-skeleton');
    if (skeleton && !shownOverview) skeleton.hidden = true;
  }
}, {
  onCached(user, userDoc) {
    renderProfile(user, userDoc);
    const overview = readCache(user.uid, 'overview');
    if (overview) {
      renderStats(overview);
      shownOverview = overview;
    }
  },
});

document.getElementById('sign-out-btn').addEventListener('click', () => {
  // ล้างก่อน signOut — เครื่องใช้ร่วม (แท็บเล็ตโรงเรียน) ต้องไม่เหลือข้อมูลคนเก่า
  clearAll();
  signOut(auth);
});
