import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { requireLogin, isAdmin } from './lib/auth-guard.js';
import { auth, db } from './lib/firebase.js';
import { mascotSrc } from './lib/mascot.js';
import { attachUiSounds } from './lib/ui-sound.js';
import { calculateStudentOverview } from './lib/student-analytics.js';
import { evaluateBadges } from './lib/badges.js';

const base = import.meta.env.BASE_URL;
const learnLink = document.getElementById('learn-link');
if (learnLink) learnLink.href = `${base}learn/index.html`;

const handbookLink = document.getElementById('handbook-link');
if (handbookLink) handbookLink.href = `${base}handbook.html`;

const vocabLink = document.getElementById('vocab-link');
if (vocabLink) vocabLink.href = `${base}vocab/index.html`;

const mascotEl = document.getElementById('dashboard-mascot');
if (mascotEl) mascotEl.src = mascotSrc('normal', base);

attachUiSounds();

// Badge Dialog elements
const badgeDialog = document.getElementById('badge-dialog');
const badgeDialogRarity = document.getElementById('badge-dialog-rarity');
const badgeDialogIcon = document.getElementById('badge-dialog-icon');
const badgeDialogTitle = document.getElementById('badge-dialog-title');
const badgeDialogDesc = document.getElementById('badge-dialog-desc');
const badgeDialogStatusText = document.getElementById('badge-dialog-status-text');
const badgeDialogProgressVal = document.getElementById('badge-dialog-progress-val');
const badgeDialogProgressBar = document.getElementById('badge-dialog-progress-bar');
const badgeDialogClose = document.getElementById('badge-dialog-close');
const badgeDialogCloseX = document.getElementById('badge-dialog-close-x');

if (badgeDialogClose) badgeDialogClose.addEventListener('click', () => badgeDialog?.close());
if (badgeDialogCloseX) badgeDialogCloseX.addEventListener('click', () => badgeDialog?.close());

function openBadgeModal(badge) {
  if (!badgeDialog) return;
  badgeDialogRarity.textContent = badge.rarity.toUpperCase();
  badgeDialogRarity.style.color = badge.unlocked ? '#b45309' : '#64748b';
  badgeDialogRarity.style.background = badge.unlocked ? '#fef3c7' : '#f1f5f9';

  badgeDialogIcon.textContent = badge.icon;
  badgeDialogTitle.textContent = badge.title;
  badgeDialogDesc.textContent = badge.description;

  badgeDialogStatusText.textContent = badge.unlocked ? '✅ ปลดล็อกสำเร็จแล้ว!' : '⏳ กำลังสะสมความคืบหน้า';
  badgeDialogStatusText.style.color = badge.unlocked ? '#10b981' : '#64748b';

  badgeDialogProgressVal.textContent = badge.progressText;
  badgeDialogProgressBar.style.width = `${badge.percent}%`;
  badgeDialogProgressBar.style.background = badge.unlocked ? '#10b981' : '#f59e0b';

  badgeDialog.showModal();
}

function renderBadges(badges) {
  const trophyGrid = document.getElementById('trophy-grid');
  const unlockedCountEl = document.getElementById('unlocked-count');
  if (!trophyGrid) return;

  trophyGrid.replaceChildren();

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  if (unlockedCountEl) {
    unlockedCountEl.textContent = unlockedCount;
  }

  for (const badge of badges) {
    const item = document.createElement('div');
    item.className = `trophy-item ${badge.unlocked ? 'trophy-item--unlocked' : 'trophy-item--locked'}`;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('title', `${badge.title}: ${badge.description}`);

    item.innerHTML = `
      <span class="trophy-icon">${badge.icon}</span>
      <span class="trophy-name">${badge.title}</span>
      <span class="trophy-progress-mini">${badge.unlocked ? 'สำเร็จ ✨' : `${badge.current}/${badge.target}`}</span>
      ${!badge.unlocked ? '<span class="trophy-lock-badge">🔒</span>' : ''}
    `;

    item.addEventListener('click', () => {
      openBadgeModal(badge);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBadgeModal(badge);
      }
    });

    trophyGrid.appendChild(item);
  }
}

requireLogin(async (firebaseUser, userDoc) => {
  const callName = userDoc?.callName?.trim();
  const nickname = userDoc?.nickname?.trim();
  const displayName = nickname || firebaseUser.displayName || 'เพื่อนๆ';

  const greetingTarget = callName ? callName : `คุณ ${displayName}`;
  const welcomeEl = document.getElementById('welcome-message');
  if (welcomeEl) welcomeEl.textContent = `สวัสดี${greetingTarget}!`;

  const userPill = document.getElementById('user-pill');
  if (userPill) userPill.textContent = `👤 ${callName || displayName}`;

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

  // Fetch student submissions & clears for stats and badges
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

    // Read client-side metrics
    let cafeMaxCombo = 0;
    let hasReadHandbook = false;
    try {
      cafeMaxCombo = parseInt(localStorage.getItem('pik_cafe_max_combo') || '0', 10);
      hasReadHandbook = localStorage.getItem('pik_handbook_visited') === 'true';
    } catch {}

    const badges = evaluateBadges({
      totalStars: overview.totalStars,
      totalStagesCleared: overview.totalStagesCleared,
      masteredStagesCount: overview.masteredStagesCount,
      totalQuestionsAnswered: overview.totalQuestionsAnswered,
      stageClears,
      cafeMaxCombo,
      hasReadHandbook,
    });

    renderBadges(badges);
  } catch (error) {
    console.error('Failed to load student progress or badges:', error);
    const trophyGrid = document.getElementById('trophy-grid');
    if (trophyGrid) {
      trophyGrid.innerHTML = '<p class="hint" style="grid-column: 1 / -1; text-align: center;">โหลดเหรียญรางวัลไม่สำเร็จ</p>';
    }
  }
});

document.getElementById('sign-out-btn').addEventListener('click', () => {
  signOut(auth);
});
