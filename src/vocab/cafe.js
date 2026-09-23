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

// DOM Elements
const userPill = document.getElementById('user-pill');
const lobbyScreen = document.getElementById('cafe-lobby');
const gameStageScreen = document.getElementById('cafe-game-stage');
const summaryScreen = document.getElementById('cafe-summary');

const selectLevel = document.getElementById('select-level');
const selectCount = document.getElementById('select-count');
const btnStartGame = document.getElementById('btn-start-game');

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

requireLogin(async (firebaseUser, userDoc) => {
  currentStudent = { uid: firebaseUser.uid, ...userDoc };
  const name = userDoc?.callName || userDoc?.nickname || firebaseUser.email;
  userPill.textContent = name;

  setupEvents();
});

function setupEvents() {
  btnStartGame.addEventListener('click', () => {
    const level = selectLevel.value;
    const count = parseInt(selectCount.value, 10) || 10;
    const words = getRandomWords(count, { level });

    if (words.length === 0) {
      alert('ไม่พบคำศัพท์ในระดับที่เลือก กรุณาเลือกใหม่');
      return;
    }

    startNewGame(words);
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
      startNewGame(missedWordsInLastGame);
    }
  });
}

function startNewGame(words) {
  session = createCafeSession({ words, maxLives: 3, timeLimitSeconds: 8 });
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
  if (order.streak >= 3) {
    hudStreak.className = 'cafe-streak-badge fire';
    hudStreak.textContent = `🔥 ${order.streak}x คอมโบ!`;
  } else {
    hudStreak.className = 'cafe-streak-badge';
    hudStreak.textContent = `⚡ ${order.streak}x คอมโบ`;
  }

  orderNumberText.textContent = `ออเดอร์ที่ ${order.orderNumber} / ${order.totalOrders}`;
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

  // Start Patience Timer
  remainingMs = totalTimeMs;
  updatePatienceBar();
  timerInterval = setInterval(() => {
    remainingMs -= 100;
    updatePatienceBar();

    if (remainingMs <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 100);
}

function updatePatienceBar() {
  const percent = Math.max(0, (remainingMs / totalTimeMs) * 100);
  patienceBar.style.width = `${percent}%`;

  if (percent > 50) {
    patienceBar.className = 'patience-bar-fill';
  } else if (percent > 25) {
    patienceBar.className = 'patience-bar-fill warning';
  } else {
    patienceBar.className = 'patience-bar-fill danger';
  }
}

function handleChoice(choice, btn) {
  if (isSubmitting) return;
  isSubmitting = true;
  clearInterval(timerInterval);

  const result = submitAnswer(session, choice);

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
  const summary = getCafeSummary(session);
  missedWordsInLastGame = summary.missedWords;

  gameStageScreen.hidden = true;
  summaryScreen.hidden = false;

  // Sound & Icon
  if (summary.isVictory) {
    playStageClearSound();
    summaryIcon.textContent = '🎉';
    summaryTitle.textContent = 'ยอดเยี่ยมมาก! เสิร์ฟครบทุกออเดอร์';
  } else {
    playStageFailedSound();
    summaryIcon.textContent = '🥺';
    summaryTitle.textContent = 'ลูกค้าหนีหมดร้านแล้ว! ไว้ลองใหม่อีกทีนะ';
  }

  summaryStars.textContent = '⭐'.repeat(summary.stars) || '—';
  sumScore.textContent = summary.score.toLocaleString();
  sumAccuracy.textContent = `${summary.accuracy}%`;
  sumCombo.textContent = `${summary.maxStreak}x`;

  try {
    const prevMax = parseInt(localStorage.getItem('pik_cafe_max_combo') || '0', 10);
    if ((summary.maxStreak || 0) > prevMax) {
      localStorage.setItem('pik_cafe_max_combo', String(summary.maxStreak || 0));
    }
  } catch {}

  // Render missed words review
  if (summary.missedWords.length > 0) {
    missedWordsBox.hidden = false;
    btnReviewMissed.hidden = false;
    missedWordsList.replaceChildren();

    for (const w of summary.missedWords) {
      const tag = document.createElement('span');
      tag.className = 'missed-word-tag';
      tag.textContent = `${w.word} (${w.thai})`;
      tag.style.cursor = 'pointer';
      tag.title = 'คลิกเพื่อฟังเสียงอ่าน';
      tag.addEventListener('click', () => speak(w.word));
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
    } catch (err) {
      console.error('Failed to save vocab session progress:', err);
    }
  }
}
