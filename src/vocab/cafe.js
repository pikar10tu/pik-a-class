import { doc, setDoc } from 'firebase/firestore';
import { requireLogin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { getRandomWords, VOCAB_ITEMS } from '../lib/vocab-data.js';
import {
  createCafeSession,
  getCurrentOrder,
  submitAnswer,
  timeoutOrder,
  getCafeSummary,
} from '../lib/cafe-engine.js';
import { playAnswerSound, playStageClearSound, playStageFailedSound } from '../lib/answer-audio.js';
import { saveVocabSessionResults } from '../lib/vocab-session-io.js';
import {
  getFavoriteIds,
  isFavorite,
  toggleFavorite,
  getVocabIdByWord,
} from '../lib/vocab-favorites.js';
import { fetchMyClears } from '../lib/stage-io.js';
import { clearedLevelsFromClears, getUnlockedLevels } from '../lib/user-profile.js';
import { readCache, writeCache, isSameData } from '../lib/local-cache.js';
import { patchSessionUserDoc, invalidateOverview } from '../lib/cache-writes.js';

// DOM Elements
const userPill = document.getElementById('user-pill');
const lobbyScreen = document.getElementById('cafe-lobby');
const gameStageScreen = document.getElementById('cafe-game-stage');
const summaryScreen = document.getElementById('cafe-summary');

const selectMode = document.getElementById('select-mode');
const orderCountWrapper = document.getElementById('order-count-wrapper');
const selectLevel = document.getElementById('select-level');
const selectCount = document.getElementById('select-count');
const btnStartGame = document.getElementById('btn-start-game');

const hudRushHour = document.getElementById('hud-rush-hour');
const hudLives = document.getElementById('hud-lives');
const hudStreak = document.getElementById('hud-streak');
const hudScore = document.getElementById('hud-score');
const orderNumberText = document.getElementById('order-number-text');
const orderLevelTag = document.getElementById('order-level-tag');

const customerAvatar = document.getElementById('customer-avatar');
const customerGreeting = document.getElementById('customer-greeting');
const orderWord = document.getElementById('order-word');
const btnOrderAudio = document.getElementById('btn-order-audio');
const patienceBar = document.getElementById('patience-bar');
const dishesContainer = document.getElementById('dishes-container');

const summaryIcon = document.getElementById('summary-icon');
const newHighScoreBadge = document.getElementById('new-high-score-badge');
const summaryTitle = document.getElementById('summary-title');
const summaryStars = document.getElementById('summary-stars');
const sumScore = document.getElementById('sum-score');
const sumAccuracy = document.getElementById('sum-accuracy');
const sumCombo = document.getElementById('sum-combo');
const missedWordsBox = document.getElementById('missed-words-box');
const missedWordsList = document.getElementById('missed-words-list');
const btnReplay = document.getElementById('btn-replay');
const btnReviewMissed = document.getElementById('btn-review-missed');

let currentStudent = null;
let session = null;
let timerInterval = null;
let remainingMs = 0;
let totalTimeMs = 8000;
let isSubmitting = false;
let missedWordsInLastGame = [];

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

let favoriteIds = [];
let unlockedLevels = ['A1'];
let clearedLevels = [];

let eventsBound = false;

function applyUser(user, userDoc, clears) {
  currentStudent = { uid: user.uid, ...userDoc };
  favoriteIds = getFavoriteIds(userDoc, user.uid);
  userPill.textContent = userDoc?.callName || userDoc?.nickname || user.email;
  clearedLevels = clears ? clearedLevelsFromClears(clears) : [];
  unlockedLevels = getUnlockedLevels(userDoc, clearedLevels);
  updateLevelSelectOptions();
  if (!eventsBound) {
    setupEvents();
    eventsBound = true;
  }
}

let shownState = null;

requireLogin(async (firebaseUser, userDoc) => {
  let clears = null;
  try {
    clears = await fetchMyClears(db, firebaseUser.uid);
    writeCache(firebaseUser.uid, 'clears', clears);
  } catch (err) {
    console.warn('Could not fetch clears for cafe level unlock:', err);
    clears = readCache(firebaseUser.uid, 'clears');
  }
  const state = { userDoc, levels: getUnlockedLevels(userDoc, clearedLevelsFromClears(clears ?? [])) };
  // ระหว่างเล่นเกมอยู่ ห้ามแตะ currentStudent — เกมอ้างอิงสถิติเดิมอยู่
  if (!isSameData(state, shownState) && !isGameRunning()) applyUser(firebaseUser, userDoc, clears);
  shownState = state;
}, {
  onCached(user, userDoc) {
    const clears = readCache(user.uid, 'clears');
    applyUser(user, userDoc, clears);
    shownState = { userDoc, levels: getUnlockedLevels(userDoc, clearedLevelsFromClears(clears ?? [])) };
  },
});

// อยู่ในเกมหรือหน้าสรุปผล = ห้ามเปลี่ยน currentStudent กลางคัน (เกมอ้างอิงสถิติเดิมอยู่)
function isGameRunning() {
  return Boolean(gameStageScreen && !gameStageScreen.hidden) || Boolean(summaryScreen && !summaryScreen.hidden);
}

function updateLevelSelectOptions() {
  if (!selectLevel) return;
  const options = selectLevel.querySelectorAll('option');
  options.forEach((opt) => {
    const val = opt.value;
    if (val === 'all') return;
    if (!unlockedLevels.includes(val)) {
      opt.disabled = true;
      if (!opt.textContent.includes('🔒')) {
        opt.textContent += ' 🔒 (ยังไม่ปลดล็อก)';
      }
    } else {
      opt.disabled = false;
      opt.textContent = opt.textContent.replace(' 🔒 (ยังไม่ปลดล็อก)', '');
    }
  });
}

function setupEvents() {
  if (selectMode && orderCountWrapper) {
    selectMode.addEventListener('change', () => {
      orderCountWrapper.hidden = selectMode.value === 'endless';
    });
  }

  btnStartGame.addEventListener('click', () => {
    const level = selectLevel.value;
    const mode = selectMode ? selectMode.value : 'standard';

    if (level !== 'all' && !unlockedLevels.includes(level)) {
      alert(`ระดับ ${level} ยังไม่ปลดล็อกสำหรับบัญชีของคุณครับ เล่นผ่านด่านเพื่อปลดล็อกก่อนนะค้าบ`);
      return;
    }

    if (mode === 'endless') {
      const allWords = getRandomWords(100, { level, allowedLevels: unlockedLevels });
      if (allWords.length === 0) {
        alert('ไม่พบคำศัพท์ในระดับที่เลือก กรุณาเลือกใหม่');
        return;
      }
      startNewGame(allWords.slice(0, 10), mode, allWords);
    } else {
      const count = parseInt(selectCount.value, 10) || 10;
      const words = getRandomWords(count, { level, allowedLevels: unlockedLevels });
      if (words.length === 0) {
        alert('ไม่พบคำศัพท์ในระดับที่เลือก กรุณาเลือกใหม่');
        return;
      }
      startNewGame(words, mode);
    }
  });

  btnOrderAudio.addEventListener('click', () => {
    const order = getCurrentOrder(session);
    if (order) {
      speak(order.word.word);
    }
  });

  btnReplay.addEventListener('click', () => {
    lobbyScreen.hidden = false;
    gameStageScreen.hidden = true;
    summaryScreen.hidden = true;
  });

  btnReviewMissed.addEventListener('click', () => {
    if (missedWordsInLastGame.length > 0) {
      startNewGame(missedWordsInLastGame, 'standard');
    }
  });
}

function startNewGame(words, mode = 'standard', wordPool = []) {
  session = createCafeSession({ words, mode, wordPool, maxLives: 3, timeLimitSeconds: 8 });
  totalTimeMs = 8000;
  isSubmitting = false;

  lobbyScreen.hidden = true;
  summaryScreen.hidden = true;
  gameStageScreen.hidden = false;

  renderOrder();
}

function renderOrder() {
  clearInterval(timerInterval);
  isSubmitting = false;

  const order = getCurrentOrder(session);
  if (!order) {
    finishGame();
    return;
  }

  // Update HUD
  hudLives.textContent = '❤️'.repeat(order.lives) + '🖤'.repeat(order.maxLives - order.lives);
  hudScore.textContent = `🪙 ${order.score.toLocaleString()}`;

  // Rush Hour banner
  if (hudRushHour) {
    hudRushHour.hidden = !order.isRushHour;
  }

  if (order.isRushHour) {
    hudStreak.className = 'cafe-streak-badge fire';
    hudStreak.textContent = `🔥 ${order.streak}x RUSH HOUR!`;
  } else if (order.streak >= 3) {
    hudStreak.className = 'cafe-streak-badge fire';
    hudStreak.textContent = `🔥 ${order.streak}x คอมโบ!`;
  } else {
    hudStreak.className = 'cafe-streak-badge';
    hudStreak.textContent = `⚡ ${order.streak}x คอมโบ`;
  }

  orderNumberText.textContent =
    order.mode === 'endless'
      ? `ออเดอร์ที่ ${order.orderNumber} (โหมดไม่รู้จบ)`
      : `ออเดอร์ที่ ${order.orderNumber} / ${order.totalOrders}`;
  orderLevelTag.textContent = order.word.level;

  customerAvatar.textContent = order.customer.emoji;
  customerGreeting.textContent = order.customer.greeting;
  orderWord.textContent = order.word.word;

  // Render Dishes (4 choices)
  dishesContainer.replaceChildren();
  for (const choice of order.choices) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dish-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleChoice(choice, btn));
    dishesContainer.appendChild(btn);
  }

  // Speak word automatically
  speak(order.word.word);

  // Start Patience Timer (8s countdown)
  startPatienceTimer();
}

function startPatienceTimer() {
  remainingMs = totalTimeMs;
  updatePatienceBar(1);

  const stepMs = 50;
  timerInterval = setInterval(() => {
    remainingMs -= stepMs;
    const progress = Math.max(0, remainingMs / totalTimeMs);
    updatePatienceBar(progress);

    if (remainingMs <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, stepMs);
}

function updatePatienceBar(progress) {
  patienceBar.style.width = `${progress * 100}%`;
  if (progress > 0.5) {
    patienceBar.style.backgroundColor = '#10b981';
  } else if (progress > 0.25) {
    patienceBar.style.backgroundColor = '#f59e0b';
  } else {
    patienceBar.style.backgroundColor = '#ef4444';
  }
}

function handleChoice(selectedAnswer, btn) {
  if (isSubmitting) return;
  isSubmitting = true;
  clearInterval(timerInterval);

  const result = submitAnswer(session, selectedAnswer);

  if (result.correct) {
    playAnswerSound('correct');
    btn.classList.add('correct');
  } else {
    playAnswerSound('wrong');
    btn.classList.add('wrong');
    // Highlight the correct answer
    dishesContainer.querySelectorAll('.dish-btn').forEach((b) => {
      if (b.textContent === result.correctAnswer) {
        b.classList.add('correct');
      }
    });
  }

  setTimeout(() => {
    if (result.state === 'playing') {
      renderOrder();
    } else {
      finishGame();
    }
  }, 750);
}

function handleTimeout() {
  if (isSubmitting) return;
  isSubmitting = true;

  playAnswerSound('wrong');
  const result = timeoutOrder(session);

  // Highlight correct answer
  dishesContainer.querySelectorAll('.dish-btn').forEach((b) => {
    if (b.textContent === result.correctAnswer) {
      b.classList.add('correct');
    }
  });

  setTimeout(() => {
    if (result.state === 'playing') {
      renderOrder();
    } else {
      finishGame();
    }
  }, 850);
}

async function finishGame() {
  clearInterval(timerInterval);
  if (hudRushHour) hudRushHour.hidden = true;

  const summary = getCafeSummary(session);
  missedWordsInLastGame = summary.missedWords;

  gameStageScreen.hidden = true;
  summaryScreen.hidden = false;

  // Sound & Icon
  if (summary.isVictory) {
    playStageClearSound();
    summaryIcon.textContent = '🎉';
    summaryTitle.textContent =
      summary.mode === 'endless'
        ? `สุดยอดนักเสิร์ฟ! ทำได้ถึง ${summary.servedOrders} ออเดอร์`
        : 'ยอดเยี่ยมมาก! เสิร์ฟครบทุกออเดอร์';
  } else {
    playStageFailedSound();
    summaryIcon.textContent = '🥺';
    summaryTitle.textContent =
      summary.mode === 'endless'
        ? `จบเกม! คุณเสิร์ฟไปได้ ${summary.servedOrders} ออเดอร์`
        : 'ลูกค้าหนีหมดร้านแล้ว! ไว้ลองใหม่อีกทีนะ';
  }

  summaryStars.textContent = '⭐'.repeat(summary.stars) || '—';
  sumScore.textContent = summary.score.toLocaleString();
  sumAccuracy.textContent = `${summary.accuracy}%`;
  sumCombo.textContent = `${summary.maxStreak}x`;

  // Local storage cache for badges
  try {
    const prevMax = parseInt(localStorage.getItem('pik_cafe_max_combo') || '0', 10);
    if ((summary.maxStreak || 0) > prevMax) {
      localStorage.setItem('pik_cafe_max_combo', String(summary.maxStreak || 0));
    }
  } catch {}

  // High score tracking & saving to Firestore
  const prevHighScore = currentStudent?.speedCafeStats?.highScore || 0;
  const prevMaxCombo = currentStudent?.speedCafeStats?.maxCombo || 0;
  const isNewHighScore = summary.score > prevHighScore && summary.score > 0;

  if (newHighScoreBadge) {
    newHighScoreBadge.hidden = !isNewHighScore;
  }

  if (currentStudent?.uid && (isNewHighScore || summary.maxStreak > prevMaxCombo)) {
    const updatedStats = {
      highScore: Math.max(summary.score, prevHighScore),
      maxCombo: Math.max(summary.maxStreak, prevMaxCombo),
      lastPlayedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'users', currentStudent.uid), { speedCafeStats: updatedStats }, { merge: true });
      patchSessionUserDoc(currentStudent.uid, { speedCafeStats: updatedStats });
      if (currentStudent.speedCafeStats) {
        Object.assign(currentStudent.speedCafeStats, updatedStats);
      } else {
        currentStudent.speedCafeStats = updatedStats;
      }
    } catch (e) {
      console.warn('Could not save speed cafe high score to Firestore:', e);
    }
  }

  // Render missed words review
  if (summary.missedWords.length > 0) {
    missedWordsBox.hidden = false;
    btnReviewMissed.hidden = false;
    missedWordsList.replaceChildren();

    for (const w of summary.missedWords) {
      const vocabId = w.id || getVocabIdByWord(w.word);
      const isFav = isFavorite(favoriteIds, vocabId);

      const tag = document.createElement('span');
      tag.className = 'missed-word-tag';
      tag.innerHTML = `
        <span class="missed-word-text" title="คลิกเพื่อฟังเสียงอ่าน">🔊 ${w.word} (${w.thai})</span>
        <button type="button" class="btn-missed-fav ${isFav ? 'active' : ''}" title="${isFav ? 'ถอนคำโปรด' : 'บันทึกคำที่จำไม่ได้'}" aria-label="Favorite ${w.word}">
          ${isFav ? '⭐' : '☆'}
        </button>
      `;

      const textEl = tag.querySelector('.missed-word-text');
      if (textEl) {
        textEl.addEventListener('click', () => speak(w.word));
      }

      const favBtn = tag.querySelector('.btn-missed-fav');
      if (favBtn) {
        favBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          if (vocabId && currentStudent?.uid) {
            favoriteIds = await toggleFavorite(db, currentStudent.uid, vocabId, favoriteIds);
            const nextFav = isFavorite(favoriteIds, vocabId);
            favBtn.classList.toggle('active', nextFav);
            favBtn.textContent = nextFav ? '⭐' : '☆';
            favBtn.title = nextFav ? 'ถอนคำโปรด' : 'บันทึกคำที่จำไม่ได้';
          }
        });
      }

      missedWordsList.appendChild(tag);
    }
  } else {
    missedWordsBox.hidden = true;
    btnReviewMissed.hidden = true;
  }

  // Save session progress to Firestore submissions
  if (currentStudent?.uid && session?.history?.length > 0) {
    try {
      await saveVocabSessionResults(db, {
        uid: currentStudent.uid,
        history: session.history,
      });
      invalidateOverview(currentStudent.uid);
    } catch (err) {
      console.error('Failed to save vocab session progress:', err);
    }
  }
}
