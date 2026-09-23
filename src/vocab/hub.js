import { requireLogin } from '../lib/auth-guard.js';
import { CATEGORIES, getVocabList } from '../lib/vocab-data.js';

let currentLevel = 'all';
let currentCategory = 'all';
let currentSearch = '';
let currentDeck = [];
let deckIndex = 0;
let isFlipped = false;

// DOM Elements
const userPill = document.getElementById('user-pill');
const categoryFilterRow = document.getElementById('category-filter-row');
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

requireLogin(async (firebaseUser, userDoc) => {
  const name = userDoc?.callName || userDoc?.nickname || firebaseUser.email;
  userPill.textContent = name;

  setupCategoryFilters();
  setupEventListeners();
  updateDeck();
});

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
  currentDeck = getVocabList({
    level: currentLevel,
    category: currentCategory,
    search: currentSearch,
    shuffle,
  });

  deckIndex = 0;
  isFlipped = false;
  flashcardInner.classList.remove('flipped');

  totalWordsCount.textContent = currentDeck.length;
  renderCurrentCard();
  renderGrid();
}

function renderCurrentCard() {
  if (currentDeck.length === 0) {
    cardWord.textContent = 'ไม่พบคำศัพท์';
    cardPos.textContent = '';
    cardCatBadge.textContent = '—';
    cardCatBadgeBack.textContent = '—';
    cardLvlBadge.textContent = '—';
    cardThai.textContent = 'ลองเปลี่ยนตัวกรองหรือคำค้นหา';
    cardExampleEn.textContent = '';
    cardExampleTh.textContent = '';
    cardCounter.textContent = '0 / 0';
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
}

function renderGrid() {
  vocabGrid.replaceChildren();

  if (currentDeck.length === 0) {
    const p = document.createElement('p');
    p.style.cssText = 'grid-column: 1 / -1; text-align: center; color: var(--color-muted); padding: 20px;';
    p.textContent = 'ไม่พบคำศัพท์ที่ตรงกับเงื่อนไข';
    vocabGrid.appendChild(p);
    return;
  }

  for (const item of currentDeck) {
    const card = document.createElement('div');
    card.className = 'vocab-grid-card';
    card.innerHTML = `
      <div class="vocab-grid-header">
        <span class="vocab-grid-word">${item.word}</span>
        <span style="font-size: 0.75rem; color: #64748b;">${item.pos} • ${item.level}</span>
      </div>
      <div class="vocab-grid-thai">${item.thai}</div>
      <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">${item.example}</div>
    `;

    // Click on item in grid loads it into flashcard
    card.addEventListener('click', () => {
      const idx = currentDeck.findIndex((w) => w.id === item.id);
      if (idx !== -1) {
        deckIndex = idx;
        isFlipped = false;
        flashcardInner.classList.remove('flipped');
        renderCurrentCard();
        flashcardScene.scrollIntoView({ behavior: 'smooth', block: 'center' });
        speakWord(item.word);
      }
    });

    vocabGrid.appendChild(card);
  }
}

function setupEventListeners() {
  // Flip Card on Click
  flashcardScene.addEventListener('click', (e) => {
    // Don't flip if clicked audio button
    if (e.target.closest('#btn-audio-front')) return;
    isFlipped = !isFlipped;
    flashcardInner.classList.toggle('flipped', isFlipped);
  });

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
    isFlipped = false;
    flashcardInner.classList.remove('flipped');
    renderCurrentCard();
  });

  btnNextCard.addEventListener('click', () => {
    if (currentDeck.length === 0) return;
    deckIndex = (deckIndex + 1) % currentDeck.length;
    isFlipped = false;
    flashcardInner.classList.remove('flipped');
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
      document.querySelectorAll('[data-level]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentLevel = btn.getAttribute('data-level');
      updateDeck();
    });
  });

  // Category Filters
  categoryFilterRow.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-category]');
    if (!btn) return;
    categoryFilterRow.querySelectorAll('[data-category]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.getAttribute('data-category');
    updateDeck();
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
