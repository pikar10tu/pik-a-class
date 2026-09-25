import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { requireLogin, isAdmin } from './lib/auth-guard.js';
import { auth, db } from './lib/firebase.js';
import { getAvatarSrc } from './lib/user-profile.js';
import { attachUiSounds } from './lib/ui-sound.js';
import { calculateStudentOverview } from './lib/student-analytics.js';

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

requireLogin(async (firebaseUser, userDoc) => {
  const callName = userDoc?.callName?.trim();
  const nickname = userDoc?.nickname?.trim();
  const displayName = nickname || firebaseUser.displayName || 'เพื่อนๆ';

  const avatarId = userDoc?.avatarId || 'avatar-1';
  const avatarSrc = getAvatarSrc(avatarId, base, 'webp');

  // Update Hero mascot
  const mascotEl = document.getElementById('dashboard-mascot');
  if (mascotEl) {
    mascotEl.onerror = () => {
      mascotEl.src = getAvatarSrc(avatarId, base, 'png');
    };
    mascotEl.src = avatarSrc;
    mascotEl.alt = 'น้องหยกอวตาร';
  }

  // Greeting
  const greetingTarget = callName ? callName : `คุณ ${displayName}`;
  const welcomeEl = document.getElementById('welcome-message');
  if (welcomeEl) welcomeEl.textContent = `สวัสดี${greetingTarget}!`;

  // User Pill on Header
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
  }

  // Admin access
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

  // Fetch student submissions & clears for stats and badges count
  try {
    const [clearsSnap, subsSnap] = await Promise.all([
      getDocs(query(collection(db, 'stageClears'), where('uid', '==', firebaseUser.uid))),
      getDocs(query(collection(db, 'submissions'), where('uid', '==', firebaseUser.uid))),
    ]);

    const stageClears = clearsSnap.docs.map((d) => d.data());
    const submissions = subsSnap.docs.map((d) => d.data());

    const overview = calculateStudentOverview({ submissions, stageClears });

    // Update Quick Hero Stats
    const heroStats = document.getElementById('hero-stats');
    const statStars = document.getElementById('stat-stars');
    const statStages = document.getElementById('stat-stages');
    const statQuestions = document.getElementById('stat-questions');

    if (statStars) statStars.textContent = overview.totalStars;
    if (statStages) statStages.textContent = overview.totalStagesCleared;
    if (statQuestions) statQuestions.textContent = overview.totalQuestionsAnswered;
    if (heroStats) heroStats.hidden = false;

  } catch (error) {
    console.error('Failed to load student progress:', error);
  }
});

document.getElementById('sign-out-btn').addEventListener('click', () => {
  signOut(auth);
});
