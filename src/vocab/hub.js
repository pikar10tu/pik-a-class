import { requireLogin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { CATEGORIES, getVocabList } from '../lib/vocab-data.js';
import {
  getFavoriteIds,
  isFavorite,
  toggleFavorite,
  sortVocabWithFavoritesFirst,
  filterFavorites,
} from '../lib/vocab-favorites.js';
import { fetchMyClears } from '../lib/stage-io.js';
import { clearedLevelsFromClears, getUnlockedLevels } from '../lib/user-profile.js';
import { readCache, writeCache, isSameData } from '../lib/local-cache.js';
import { readTier } from '../lib/queries.js';

let currentUid = null;
let currentUserDoc = null;
let favoriteIds = [];
let currentLevel = 'all';
let currentCategory = 'all';
let currentSearch = '';
let currentDeck = [];
let deckIndex = 0;
let isFlipped = false;
let unlockedLevels = ['A1'];
let clearedLevels = [];

// DOM Elements
const userPill = document.getElementById('user-pill');
const categoryFilterRow = document.getElementById('category-filter-row');
const favFilterCount = document.getElementById('fav-filter-count');
const searchInput = document.getElementById('vocab-search');
const flashcardScene = document.getElementById('flashcard-scene');
const flashcardInner = document.getElementById('flashcard-inner');

const cardWord = document.getElementById('card-word');
const cardPos = document.getElementById('card-pos');
const cardCatBadge = document.getElementById('card-cat-badge');
const cardCatBadgeBack = document.getElementById('card-cat-badge-back');
const cardLvlBadge = document.getElementById('card-lvl-badge');
const cardThai = document.getElementById('card-thai');
const cardExampleEn = document.getElementById('card-example-en');
const cardExampleTh = document.getElementById('card-example-th');
const cardCounter = document.getElementById('card-counter');
const btnFavFront = document.getElementById('btn-fav-card-front');
const btnFavBack = document.getElementById('btn-fav-card-back');

const btnPrevCard = document.getElementById('btn-prev-card');
const btnNextCard = document.getElementById('btn-next-card');
const btnShuffleDeck = document.getElementById('btn-shuffle-deck');
const btnAudioFront = document.getElementById('btn-audio-front');
const totalWordsCount = document.getElementById('total-words-count');
const vocabGrid = document.getElementById('vocab-grid');

// Web Speech API for Pronunciation
export function speakWord(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

let eventsBound = false;

function applyUser(user, userDoc, clears) {
  currentUid = user.uid;
  currentUserDoc = userDoc;
  favoriteIds = getFavoriteIds(userDoc, currentUid);
  userPill.textContent = userDoc?.callName || userDoc?.nickname || user.email;
  if (favFilterCount) favFilterCount.textContent = `(${favoriteIds.length})`;

  clearedLevels = clears ? clearedLevelsFromClears(clears) : [];
  unlockedLevels = getUnlockedLevels(userDoc, clearedLevels);

  renderLevelFilterButtons();
  if (!eventsBound) {
    // ผูกครั้งเดียว — applyUser ถูกเรียกสองรอบ (cache แล้ว server)
    setupCategoryFilters();
    setupLockDialog();
    setupEventListeners();
    eventsBound = true;
  }
  updateDeck();
}

let shownState = null;

requireLogin(async (firebaseUser, userDoc) => {
  let clears = null;
  try {
    clears = await fetchMyClears(db, firebaseUser.uid);
    writeCache(firebaseUser.uid, 'clears', clears);
  } catch (err) {
    console.warn('Could not fetch clears for vocab unlock:', err);
    clears = readCache(firebaseUser.uid, 'clears');
  }
  const state = { userDoc, levels: getUnlockedLevels(userDoc, clearedLevelsFromClears(clears ?? [])) };
  if (!isSameData(state, shownState)) applyUser(firebaseUser, userDoc, clears);
  shownState = state;
}, {
  onCached(user, userDoc) {
    const clears = readCache(user.uid, 'clears');
    applyUser(user, userDoc, clears);
    shownState = { userDoc, levels: getUnlockedLevels(userDoc, clearedLevelsFromClears(clears ?? [])) };
  },
});

function renderLevelFilterButtons() {
  const levelBtns = document.querySelectorAll('[data-level]');
  levelBtns.forEach((btn) => {
    const lvl = btn.getAttribute('data-level');
    if (lvl === 'all') return;
    const isUnlocked = unlockedLevels.includes(lvl);
    if (!isUnlocked) {
      btn.textContent = `${lvl} 🔒`;
      btn.classList.add('chip-btn--locked');
      btn.title = `ระดับ ${lvl} ยังไม่ปลดล็อก (คลิกเพื่อดูวิธีปลดล็อก)`;
    } else {
      btn.textContent = lvl;
      btn.classList.remove('chip-btn--locked');
      btn.title = `ระดับ ${lvl}`;
    }
  });
}

function openVocabLockDialog(targetLevel) {
  const dialog = document.getElementById('lock-dialog');
  const badge = document.getElementById('lock-dialog-badge');
  const title = document.getElementById('lock-dialog-title');
  const text = document.getElementById('lock-dialog-text');
  const icon = document.getElementById('lock-dialog-icon');
  if (!dialog) return;

  if (targetLevel === 'A2') {
    if (clearedLevels.includes('A1')) {
      if (badge) badge.textContent = '🎁 ปลดล็อกฟรี!';
      if (icon) icon.textContent = '🎉✨';
      if (title) title.textContent = 'พิชิตด่าน A1 ครบแล้ว! ขอปลดศัพท์ A2 ฟรี';
      if (text) {
        text.innerHTML = `
          เก่งมากเลยครับ! คุณเล่นผ่านด่าน A1 ครบ 20 ด่านแล้ว<br>
          แคปภาพหน้าจอสรุปหรือด่านที่ผ่านส่งมาทาง LINE หาพี่ปิ๊ก แล้วพี่ปิ๊กจะเปิดทั้ง<strong>เกาะ A2 และคลังคำศัพท์ระดับ A2 ให้เรียนฟรี</strong> ทันทีเลยครับ! 🚀
        `;
      }
    } else {
      if (badge) badge.textContent = '🔒 ระดับ A2';
      if (icon) icon.textContent = '🔒📖';
      if (title) title.textContent = 'คำศัพท์ระดับ A2 ยังล็อกอยู่ครับ';
      if (text) {
        text.innerHTML = `
          คลังคำศัพท์และด่านระดับ A2 จะปลดล็อกหลังจากคุณเล่นผ่าน<strong>ด่านระดับ A1 ครบ 20 ด่าน</strong><br>
          ตอนนี้ลุยด่าน A1 ให้ชำนาญก่อนนะค้าบ เก่งขึ้นแน่นอน! 💪
        `;
      }
    }
  } else {
    // B1 or B2
    if (badge) badge.textContent = `⭐ ระดับ ${targetLevel} (Full Tier)`;
    if (icon) icon.textContent = '👑💎';
    if (title) title.textContent = `คำศัพท์ระดับ ${targetLevel} สำหรับ Full Tier`;
    if (text) {
      text.innerHTML = `
        คลังคำศัพท์และบทเรียนระดับ ${targetLevel} เป็นเนื้อหาระดับเข้มข้นสำหรับผู้เรียนแบบ <strong>Full Tier</strong> หรือคอร์สเรียนกับพี่ปิ๊ก<br>
        หากสนใจสมัครเรียนหรือสอบถามรายละเอียด ทัก LINE สอบถามพี่ปิ๊กได้เลยครับ ยินดีดูแลเสมอครับ! 😊
      `;
    }
  }

  dialog.showModal();
}

function setupLockDialog() {
  const dialog = document.getElementById('lock-dialog');
  const closeX = document.getElementById('lock-dialog-close-x');
  const closeBtn = document.getElementById('lock-dialog-close');
  closeX?.addEventListener('click', () => dialog?.close());
  closeBtn?.addEventListener('click', () => dialog?.close());
}

function setupCategoryFilters() {
  for (const cat of CATEGORIES) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip-btn';
    btn.setAttribute('data-category', cat.id);
    btn.textContent = `${cat.icon} ${cat.label}`;
    categoryFilterRow.appendChild(btn);
  }
}

function updateDeck({ shuffle = false } = {}) {
  if (currentCategory === 'favorites') {
    const baseList = getVocabList({
      level: currentLevel,
      allowedLevels: unlockedLevels,
      search: currentSearch,
    });
    currentDeck = filterFavorites(baseList, favoriteIds);
  } else {
    currentDeck = getVocabList({
      level: currentLevel,
      allowedLevels: unlockedLevels,
      category: currentCategory,
      search: currentSearch,
      shuffle,
    });
    // หากไม่ได้สุ่ม ให้จัดคำที่ fav ขึ้นมาอยู่อันดับแรกเสมอ
    if (!shuffle) {
      currentDeck = sortVocabWithFavoritesFirst(currentDeck, favoriteIds);
    }
  }

  deckIndex = 0;
  resetFlipInstantly();

  totalWordsCount.textContent = currentDeck.length;
  renderCurrentCard();
  renderGrid();
}

// เปลี่ยนการ์ดขณะเปิดคำแปลค้างไว้: พลิกกลับหน้าหน้าแบบทันที (ไม่มีแอนิเมชัน) ก่อนเปลี่ยนคำ
// ถ้าพลิกกลับช้าๆ 0.6 วิ ตามปกติ จะเห็นคำแปลของคำถัดไปที่หลังการ์ดแวบหนึ่ง = เฉลยก่อนเดา
function resetFlipInstantly() {
  if (!isFlipped && !flashcardInner.classList.contains('flipped')) return;
  isFlipped = false;
  flashcardInner.style.transition = 'none';
  flashcardInner.classList.remove('flipped');
  void flashcardInner.offsetWidth; // บังคับ reflow ให้สถานะไม่มี transition มีผลก่อนคืนค่า
  flashcardInner.style.transition = '';
}

function renderCurrentCard() {
  if (currentDeck.length === 0) {
    cardWord.textContent = 'ไม่พบคำศัพท์';
    cardPos.textContent = '';
    cardCatBadge.textContent = '—';
    cardCatBadgeBack.textContent = '—';
    cardLvlBadge.textContent = '—';
    cardThai.textContent = currentCategory === 'favorites' ? 'ยังไม่มีคำศัพท์ที่บันทึกไว้ในหมวดนี้' : 'ลองเปลี่ยนตัวกรองหรือคำค้นหา';
    cardExampleEn.textContent = '';
    cardExampleTh.textContent = '';
    cardCounter.textContent = '0 / 0';
    updateFlashcardFavButton(false);
    return;
  }

  const item = currentDeck[deckIndex];
  cardWord.textContent = item.word;
  cardPos.textContent = item.pos;
  cardCatBadge.textContent = item.categoryLabel;
  cardCatBadgeBack.textContent = item.categoryLabel;
  cardLvlBadge.textContent = item.level;
  cardThai.textContent = item.thai;
  cardExampleEn.textContent = item.example;
  cardExampleTh.textContent = item.exampleThai;

  cardCounter.textContent = `${deckIndex + 1} / ${currentDeck.length} คำ`;

  const fav = isFavorite(favoriteIds, item.id);
  updateFlashcardFavButton(fav);
}

function updateFlashcardFavButton(fav) {
  const updateBtn = (btn) => {
    if (!btn) return;
    btn.classList.toggle('active', fav);
    btn.setAttribute('aria-pressed', fav ? 'true' : 'false');
    btn.title = fav ? 'ถอนออกจากคำที่บันทึกไว้' : 'บันทึกคำที่ชอบ / ทบทวน';
    const icon = btn.querySelector('.fav-star-icon');
    if (icon) icon.textContent = fav ? '⭐' : '☆';
  };
  updateBtn(btnFavFront);
  updateBtn(btnFavBack);
}

async function handleToggleFavorite(vocabId) {
  if (!vocabId) return;
  favoriteIds = await toggleFavorite(db, currentUid, vocabId, favoriteIds);
  if (favFilterCount) {
    favFilterCount.textContent = `(${favoriteIds.length})`;
  }
  if (currentCategory === 'favorites') {
    updateDeck();
  } else {
    renderCurrentCard();
    renderGrid();
  }
}

function renderGrid() {
  vocabGrid.replaceChildren();

  if (currentDeck.length === 0) {
    const p = document.createElement('p');
    p.style.cssText = 'grid-column: 1 / -1; text-align: center; color: var(--color-muted); padding: 20px;';
    p.textContent = currentCategory === 'favorites' ? 'ยังไม่มีคำศัพท์ที่บันทึกไว้' : 'ไม่พบคำศัพท์ที่ตรงกับเงื่อนไข';
    vocabGrid.appendChild(p);
    return;
  }

  for (const item of currentDeck) {
    const fav = isFavorite(favoriteIds, item.id);
    const card = document.createElement('div');
    card.className = `vocab-grid-card ${fav ? 'is-fav' : ''}`;
    card.innerHTML = `
      <div class="vocab-grid-header">
        <span class="vocab-grid-word">${item.word}</span>
        <div class="grid-card-meta-right">
          <span style="font-size: 0.75rem; color: #64748b;">${item.pos} • ${item.level}</span>
          <button type="button" class="grid-card-fav-btn ${fav ? 'active' : ''}" data-id="${item.id}" title="${fav ? 'ถอนคำที่บันทึก' : 'บันทึกคำโปรด'}" aria-label="Favorite ${item.word}">
            ${fav ? '⭐' : '☆'}
          </button>
        </div>
      </div>
      <div class="vocab-grid-thai">${item.thai}</div>
      <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">${item.example}</div>
    `;

    // Click favorite star button on grid card
    const favBtn = card.querySelector('.grid-card-fav-btn');
    if (favBtn) {
      favBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await handleToggleFavorite(item.id);
      });
    }

    // Click on item in grid loads it into flashcard
    card.addEventListener('click', () => {
      const idx = currentDeck.findIndex((w) => w.id === item.id);
      if (idx !== -1) {
        deckIndex = idx;
        resetFlipInstantly();
        renderCurrentCard();
        flashcardScene.scrollIntoView({ behavior: 'smooth', block: 'center' });
        speakWord(item.word);
      }
    });

    vocabGrid.appendChild(card);
  }
}

function setupEventListeners() {
  // Flip Card on Click (Ignore if clicked audio or fav buttons)
  flashcardScene.addEventListener('click', (e) => {
    if (e.target.closest('#btn-audio-front') || e.target.closest('.btn-fav-card')) return;
    isFlipped = !isFlipped;
    flashcardInner.classList.toggle('flipped', isFlipped);
  });

  // Favorite button on flashcard front and back
  const onFlashcardFavClick = async (e) => {
    e.stopPropagation();
    if (currentDeck.length === 0) return;
    const currentItem = currentDeck[deckIndex];
    if (currentItem) {
      await handleToggleFavorite(currentItem.id);
    }
  };

  if (btnFavFront) btnFavFront.addEventListener('click', onFlashcardFavClick);
  if (btnFavBack) btnFavBack.addEventListener('click', onFlashcardFavClick);

  // Audio Button
  btnAudioFront.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentDeck.length > 0) {
      speakWord(currentDeck[deckIndex].word);
    }
  });

  // Navigation
  btnPrevCard.addEventListener('click', () => {
    if (currentDeck.length === 0) return;
    deckIndex = (deckIndex - 1 + currentDeck.length) % currentDeck.length;
    resetFlipInstantly();
    renderCurrentCard();
  });

  btnNextCard.addEventListener('click', () => {
    if (currentDeck.length === 0) return;
    deckIndex = (deckIndex + 1) % currentDeck.length;
    resetFlipInstantly();
    renderCurrentCard();
  });

  btnShuffleDeck.addEventListener('click', () => {
    updateDeck({ shuffle: true });
  });

  // Search input
  let searchTimeout = null;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearch = e.target.value;
      updateDeck();
    }, 250);
  });

  // Level Filters
  document.querySelectorAll('[data-level]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lvl = btn.getAttribute('data-level');
      if (lvl !== 'all' && !unlockedLevels.includes(lvl)) {
        openVocabLockDialog(lvl);
        return;
      }
      document.querySelectorAll('[data-level]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentLevel = lvl;
      updateDeck();
    });
  });

  // Category Filters (including Favorites)
  categoryFilterRow.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-category]');
    if (!btn) return;
    categoryFilterRow.querySelectorAll('[data-category]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.getAttribute('data-category');
    updateDeck();
  });

  // Listen for favorite events broadcasted from other tabs or components
  window.addEventListener('vocab-favorites-changed', (e) => {
    if (e.detail?.favoriteIds) {
      favoriteIds = e.detail.favoriteIds;
      if (favFilterCount) {
        favFilterCount.textContent = `(${favoriteIds.length})`;
      }
      renderCurrentCard();
      renderGrid();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight') {
      btnNextCard.click();
    } else if (e.key === 'ArrowLeft') {
      btnPrevCard.click();
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      flashcardScene.click();
    }
  });
}
