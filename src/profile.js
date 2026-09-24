import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { requireLogin, isAdmin } from './lib/auth-guard.js';
import { db } from './lib/firebase.js';
import {
  AVATAR_LIST,
  DEFAULT_AVATAR,
  getAvatarSrc,
  validateProfileData,
} from './lib/user-profile.js';
import { calculateStudentOverview } from './lib/student-analytics.js';
import { evaluateBadges } from './lib/badges.js';
import { attachUiSounds } from './lib/ui-sound.js';
import { showPageError } from './lib/page-error.js';
import {
  getFavoriteIds,
  getFavoriteVocabItems,
  toggleFavorite,
} from './lib/vocab-favorites.js';

const base = import.meta.env.BASE_URL;

// Back link
const backLink = document.getElementById('back-link');
if (backLink) backLink.href = `${base}dashboard.html`;

attachUiSounds();

let currentUid = null;
let selectedAvatarId = DEFAULT_AVATAR;

// Elements
const heroAvatarImg = document.getElementById('hero-avatar-img');
const heroDisplayName = document.getElementById('hero-display-name');
const heroEmail = document.getElementById('hero-email');
const heroTierBadge = document.getElementById('hero-tier-badge');
const openAvatarPickerBtn = document.getElementById('open-avatar-picker-btn');
const btnChangeAvatarText = document.getElementById('btn-change-avatar-text');

// Avatar Modal Elements
const avatarDialog = document.getElementById('avatar-dialog');
const avatarDialogCloseX = document.getElementById('avatar-dialog-close-x');
const avatarDialogCancel = document.getElementById('avatar-dialog-cancel');
const avatarDialogConfirm = document.getElementById('avatar-dialog-confirm');
const avatarPickerModal = document.getElementById('avatar-picker-modal');

const profileForm = document.getElementById('profile-form');
const inputNickname = document.getElementById('input-nickname');
const inputFullName = document.getElementById('input-fullname');
const inputGrade = document.getElementById('input-grade');
const inputSchool = document.getElementById('input-school');
const inputPhone = document.getElementById('input-phone');
const inputLineId = document.getElementById('input-lineid');
const errNickname = document.getElementById('err-nickname');
const saveBtn = document.getElementById('save-profile-btn');
const toastEl = document.getElementById('profile-toast');

// Badge Dialog Elements
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

let modalSelectedAvatarId = DEFAULT_AVATAR;

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2600);
}

function updateHeroAvatar(avatarId) {
  if (heroAvatarImg) {
    heroAvatarImg.src = getAvatarSrc(avatarId, base);
  }
}

function renderAvatarPickerModal(activeId) {
  if (!avatarPickerModal) return;
  avatarPickerModal.replaceChildren();

  for (const av of AVATAR_LIST) {
    const isSelected = av.id === activeId;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'avatar-option-btn';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    btn.setAttribute('data-id', av.id);
    btn.title = `${av.title} (${av.en})`;

    btn.innerHTML = `
      <img class="avatar-thumb" src="${base}avatars/${av.id}.webp" alt="${av.title}" width="56" height="56" onerror="this.onerror=null; this.src='${base}avatars/${av.id}.png'" loading="lazy" />
      <span class="avatar-name">${av.title}</span>
    `;

    btn.addEventListener('click', () => {
      modalSelectedAvatarId = av.id;
      avatarPickerModal.querySelectorAll('.avatar-option-btn').forEach((b) => {
        b.setAttribute('aria-checked', b.getAttribute('data-id') === av.id ? 'true' : 'false');
      });
    });

    avatarPickerModal.appendChild(btn);
  }
}

function openAvatarPicker() {
  if (!avatarDialog) return;
  modalSelectedAvatarId = selectedAvatarId;
  renderAvatarPickerModal(modalSelectedAvatarId);
  avatarDialog.showModal();
}

if (openAvatarPickerBtn) openAvatarPickerBtn.addEventListener('click', openAvatarPicker);
if (btnChangeAvatarText) btnChangeAvatarText.addEventListener('click', openAvatarPicker);
if (avatarDialogCloseX) avatarDialogCloseX.addEventListener('click', () => avatarDialog?.close());
if (avatarDialogCancel) avatarDialogCancel.addEventListener('click', () => avatarDialog?.close());

if (avatarDialogConfirm) {
  avatarDialogConfirm.addEventListener('click', async () => {
    selectedAvatarId = modalSelectedAvatarId;
    updateHeroAvatar(selectedAvatarId);
    avatarDialog?.close();

    // Auto-save avatar choice if user is logged in
    if (currentUid) {
      try {
        await setDoc(
          doc(db, 'users', currentUid),
          { avatarId: selectedAvatarId, updatedAt: new Date().toISOString() },
          { merge: true }
        );
        showToast('เปลี่ยนอวตารเรียบร้อยแล้ว ✨');
      } catch (err) {
        console.error('Failed to auto-save avatar:', err);
        showToast('เลือกอวตารแล้ว (อย่าลืมกดบันทึกข้อมูล)');
      }
    }
  });
}

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

    item.addEventListener('click', () => openBadgeModal(badge));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBadgeModal(badge);
      }
    });

    trophyGrid.appendChild(item);
  }
}

const favWordsCounter = document.getElementById('fav-words-counter');
const favVocabEmpty = document.getElementById('fav-vocab-empty');
const favVocabGrid = document.getElementById('fav-vocab-grid');
let profileFavoriteIds = [];

function speakWord(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function renderFavoriteVocab(favIds) {
  if (!favVocabGrid) return;
  profileFavoriteIds = favIds || [];
  const items = getFavoriteVocabItems(profileFavoriteIds);

  if (favWordsCounter) {
    favWordsCounter.textContent = `${items.length} คำ`;
  }

  if (items.length === 0) {
    if (favVocabEmpty) favVocabEmpty.hidden = false;
    favVocabGrid.replaceChildren();
    return;
  }

  if (favVocabEmpty) favVocabEmpty.hidden = true;
  favVocabGrid.replaceChildren();

  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'fav-card';
    card.id = `fav-card-${item.id}`;
    card.innerHTML = `
      <div class="fav-card-header">
        <div class="fav-card-word-wrap">
          <h3 class="fav-card-word">${item.word}</h3>
          <span class="fav-card-pos">${item.pos}</span>
        </div>
        <div class="fav-card-actions">
          <button type="button" class="btn-fav-audio" title="ฟังเสียงอ่าน" aria-label="Listen to ${item.word}">
            🔊
          </button>
          <button type="button" class="btn-fav-unstar" title="ถอนคำศัพท์นี้ออกจากรายการที่บันทึกไว้" aria-label="Remove ${item.word} from favorites">
            ⭐
          </button>
        </div>
      </div>
      <p class="fav-card-thai">${item.thai}</p>
      <p class="fav-card-example">${item.example}</p>
      <div class="fav-card-meta">
        <span class="fav-level-tag" data-lvl="${item.level}">${item.level}</span>
        <span class="fav-category-tag">${item.categoryLabel || item.category}</span>
      </div>
    `;

    const audioBtn = card.querySelector('.btn-fav-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speakWord(item.word);
      });
    }

    const unstarBtn = card.querySelector('.btn-fav-unstar');
    if (unstarBtn) {
      unstarBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        card.classList.add('removing');
        setTimeout(async () => {
          profileFavoriteIds = await toggleFavorite(db, currentUid, item.id, profileFavoriteIds);
          renderFavoriteVocab(profileFavoriteIds);
          showToast(`ถอนคำว่า "${item.word}" เรียบร้อยแล้ว`);
        }, 200);
      });
    }

    favVocabGrid.appendChild(card);
  }
}

requireLogin(async (firebaseUser, userDoc) => {
  currentUid = firebaseUser.uid;

  // Load Favorite Vocabulary
  profileFavoriteIds = getFavoriteIds(userDoc, currentUid);
  renderFavoriteVocab(profileFavoriteIds);

  // Admin link
  if (isAdmin(userDoc)) {
    const navAdminLink = document.getElementById('nav-admin-link');
    if (navAdminLink) {
      navAdminLink.href = `${base}admin/index.html`;
      navAdminLink.hidden = false;
    }
  }

  // Populate hero
  selectedAvatarId = userDoc?.avatarId || DEFAULT_AVATAR;
  updateHeroAvatar(selectedAvatarId);

  const nickname = userDoc?.nickname || '';
  const fullName = userDoc?.fullName || firebaseUser.displayName || '';
  const displayName = nickname || fullName || 'เพื่อนๆ ผู้เรียน';

  if (heroDisplayName) heroDisplayName.textContent = displayName;
  if (heroEmail) heroEmail.textContent = firebaseUser.email || '';

  if (heroTierBadge) {
    if (userDoc?.role === 'admin') {
      heroTierBadge.textContent = '⚙️ ผู้ดูแลระบบ (Admin)';
      heroTierBadge.className = 'profile-tier-badge profile-tier-badge--admin';
    } else if (userDoc?.tier === 'full') {
      heroTierBadge.textContent = '⭐ สมาชิกระดับ Full Tier';
      heroTierBadge.className = 'profile-tier-badge profile-tier-badge--full';
    } else {
      heroTierBadge.textContent = '🌱 สมาชิกระดับ Free Tier';
      heroTierBadge.className = 'profile-tier-badge';
    }
  }

  // Populate form
  if (inputNickname) inputNickname.value = nickname;
  if (inputFullName) inputFullName.value = userDoc?.fullName || '';
  if (inputGrade) inputGrade.value = userDoc?.grade || '';
  if (inputSchool) inputSchool.value = userDoc?.school || '';
  if (inputPhone) inputPhone.value = userDoc?.phone || '';
  if (inputLineId) inputLineId.value = userDoc?.lineId || '';

  // Form submission
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (errNickname) errNickname.hidden = true;

      const raw = {
        fullName: inputFullName?.value,
        nickname: inputNickname?.value,
        grade: inputGrade?.value,
        school: inputSchool?.value,
        phone: inputPhone?.value,
        lineId: inputLineId?.value,
        avatarId: selectedAvatarId,
      };

      const { valid, errors, cleaned } = validateProfileData(raw);

      if (!valid) {
        if (errors.nickname && errNickname) {
          errNickname.textContent = errors.nickname;
          errNickname.hidden = false;
          inputNickname?.focus();
        }
        return;
      }

      saveBtn.disabled = true;
      saveBtn.textContent = 'กำลังบันทึก…';

      try {
        const updatePayload = {
          ...cleaned,
          updatedAt: new Date().toISOString(),
        };

        await setDoc(doc(db, 'users', currentUid), updatePayload, { merge: true });

        // Update local hero display
        if (heroDisplayName) heroDisplayName.textContent = cleaned.nickname || cleaned.fullName;
        showToast('บันทึกข้อมูลเรียบร้อยแล้ว ✨');
      } catch (err) {
        console.error('Profile update failed:', err);
        showPageError('ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'บันทึกข้อมูล ✨';
      }
    });
  }

  // Fetch stats and badges
  try {
    const [clearsSnap, subsSnap] = await Promise.all([
      getDocs(query(collection(db, 'stageClears'), where('uid', '==', currentUid))),
      getDocs(query(collection(db, 'submissions'), where('uid', '==', currentUid))),
    ]);

    const stageClears = clearsSnap.docs.map((d) => d.data());
    const submissions = subsSnap.docs.map((d) => d.data());

    const overview = calculateStudentOverview({ submissions, stageClears });

    // Update Stats Card
    const statStars = document.getElementById('stat-total-stars');
    const statClears = document.getElementById('stat-total-clears');
    const statAttempts = document.getElementById('stat-total-attempts');
    const statCafeScore = document.getElementById('stat-cafe-score');

    if (statStars) statStars.textContent = overview.totalStars;
    if (statClears) statClears.textContent = overview.totalClears;
    if (statAttempts) statAttempts.textContent = overview.totalPracticed;

    const cafeHighScore = userDoc?.speedCafeStats?.highScore || 0;
    if (statCafeScore) statCafeScore.textContent = cafeHighScore.toLocaleString();

    // Read client-side metrics for badges
    let cafeMaxCombo = userDoc?.speedCafeStats?.maxCombo || 0;
    let hasReadHandbook = false;
    try {
      if (!cafeMaxCombo) {
        cafeMaxCombo = parseInt(localStorage.getItem('pik_cafe_max_combo') || '0', 10);
      }
      hasReadHandbook = localStorage.getItem('pik_handbook_visited') === 'true';
    } catch {}

    // Evaluate 12 Badges with flattened metrics
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
  } catch (err) {
    console.error('Failed to load profile stats:', err);
  }
});
