import { shuffleArray } from './vocab-data.js';

export const CUSTOMER_TYPES = [
  { emoji: '🐱', name: 'น้องแมว ส้มจี๊ด', greeting: 'ขอสั่งเมนูนี้หน่อยเมี๊ยว~' },
  { emoji: '🐻', name: 'คุณหมี โบโบ้', greeting: 'สวัสดีครับ ขอจานนี้ด่วนเลยนะ!' },
  { emoji: '🐰', name: 'น้องกระต่าย ปุ๊กปิ๊ก', greeting: 'หิวจังเลย ขอเสิร์ฟไวนะคะ~' },
  { emoji: '🦉', name: 'คุณนกฮูก ดร.ฮูก', greeting: 'ทดสอบความจำหน่อย เมนูนี้คืออะไร?' },
  { emoji: '🐶', name: 'น้องหมา ช็อกโก้', greeting: 'โฮ่ง! อยากกินเมนูนี้มากๆ เลย' },
  { emoji: '🐼', name: 'น้องแพนด้า เปาเปา', greeting: 'กำลังง่วงเลย ขอเติมพลังหน่อยนะ' },
];

export function createCafeSession({
  words = [],
  maxLives = 3,
  timeLimitSeconds = 8,
  mode = 'standard', // 'standard' | 'endless'
  wordPool = [],
} = {}) {
  if (!Array.isArray(words) || words.length === 0) {
    throw new Error('ต้องระบุรายการคำศัพท์อย่างน้อย 1 คำ');
  }

  const pool = Array.isArray(wordPool) && wordPool.length > 0 ? [...wordPool] : [...words];

  return {
    words: [...words],
    wordPool: pool,
    mode,
    currentIndex: 0,
    lives: maxLives,
    maxLives,
    timeLimitSeconds,
    score: 0,
    streak: 0,
    maxStreak: 0,
    history: [],
    state: 'playing', // 'playing' | 'won' | 'lost'
  };
}

export function sanitizeChoiceText(text) {
  if (!text || typeof text !== 'string') return '';
  return text.split(/[,(]/)[0].trim();
}

export function getCurrentOrder(session) {
  if (!session || session.state !== 'playing') {
    return null;
  }

  // In endless mode, seamlessly replenish words if nearing the end
  if (session.mode === 'endless' && session.currentIndex >= session.words.length - 3) {
    const replenish = shuffleArray([...session.wordPool]);
    session.words.push(...replenish);
  }

  if (session.currentIndex >= session.words.length) {
    return null;
  }

  const currentWord = session.words[session.currentIndex];
  // 4 ตัวเลือก: คำแปลที่ถูกต้อง 1 ข้อ + ตัวเลือกหลอก 3 ข้อ (ผ่านการคลีนข้อความให้กระชับ ไม่บอกใบ้)
  const cleanCorrect = sanitizeChoiceText(currentWord.thai);
  const cleanAlts = (currentWord.alternatives || []).slice(0, 3).map(sanitizeChoiceText);
  const choices = shuffleArray([cleanCorrect, ...cleanAlts]);
  const customer = CUSTOMER_TYPES[session.currentIndex % CUSTOMER_TYPES.length];

  return {
    word: currentWord,
    choices,
    customer,
    orderNumber: session.currentIndex + 1,
    totalOrders: session.mode === 'endless' ? '∞' : session.words.length,
    lives: session.lives,
    maxLives: session.maxLives,
    score: session.score,
    streak: session.streak,
    isRushHour: session.streak >= 10,
    mode: session.mode,
    timeLimitSeconds: session.timeLimitSeconds,
  };
}

export function submitAnswer(session, selectedAnswer) {
  if (session.state !== 'playing') {
    return { ok: false, reason: 'เกมสิ้นสุดแล้ว' };
  }

  const currentWord = session.words[session.currentIndex];
  const expectedAnswer = sanitizeChoiceText(currentWord.thai);
  const isCorrect = selectedAnswer === expectedAnswer || selectedAnswer === currentWord.thai;

  let pointsEarned = 0;
  if (isCorrect) {
    session.streak += 1;
    session.maxStreak = Math.max(session.maxStreak, session.streak);
    // Rush Hour: เมื่อคอมโบถึง 10x คะแนนจะได้รับคูณ 2!
    const isRushHour = session.streak >= 10;
    const multiplier = isRushHour ? 2 : 1;
    pointsEarned = (100 + (session.streak - 1) * 25) * multiplier;
    session.score += pointsEarned;
  } else {
    session.streak = 0;
    session.lives -= 1;
  }

  session.history.push({
    word: currentWord,
    selectedAnswer,
    correct: isCorrect,
    timedOut: false,
    pointsEarned,
  });

  // เช็คสถานะเกม
  if (session.lives <= 0) {
    session.state = 'lost';
  } else {
    session.currentIndex += 1;
    if (session.mode !== 'endless' && session.currentIndex >= session.words.length) {
      session.state = 'won';
    }
  }

  return {
    ok: true,
    correct: isCorrect,
    pointsEarned,
    lives: session.lives,
    streak: session.streak,
    isRushHour: session.streak >= 10,
    score: session.score,
    state: session.state,
    correctAnswer: currentWord.thai,
  };
}

export function timeoutOrder(session) {
  if (session.state !== 'playing') {
    return { ok: false, reason: 'เกมสิ้นสุดแล้ว' };
  }

  const currentWord = session.words[session.currentIndex];
  session.streak = 0;
  session.lives -= 1;

  session.history.push({
    word: currentWord,
    selectedAnswer: null,
    correct: false,
    timedOut: true,
    pointsEarned: 0,
  });

  if (session.lives <= 0) {
    session.state = 'lost';
  } else {
    session.currentIndex += 1;
    if (session.mode !== 'endless' && session.currentIndex >= session.words.length) {
      session.state = 'won';
    }
  }

  return {
    ok: true,
    correct: false,
    timedOut: true,
    lives: session.lives,
    streak: session.streak,
    isRushHour: false,
    score: session.score,
    state: session.state,
    correctAnswer: currentWord.thai,
  };
}

export function getCafeSummary(session) {
  const total = session.history.length;
  const servedOrders = session.history.filter((h) => h.correct).length;
  const accuracy = total > 0 ? Math.round((servedOrders / total) * 100) : 0;
  const missedWords = session.history.filter((h) => !h.correct).map((h) => h.word);

  let stars = 0;
  if (session.mode === 'endless') {
    if (servedOrders >= 30) stars = 3;
    else if (servedOrders >= 15) stars = 2;
    else if (servedOrders >= 5) stars = 1;
  } else if (session.state === 'won') {
    if (accuracy === 100 && session.lives === session.maxLives) {
      stars = 3;
    } else if (accuracy >= 70) {
      stars = 2;
    } else {
      stars = 1;
    }
  }

  return {
    mode: session.mode,
    score: session.score,
    lives: session.lives,
    maxLives: session.maxLives,
    totalOrders: session.mode === 'endless' ? total : session.words.length,
    servedOrders,
    accuracy,
    maxStreak: session.maxStreak,
    isRushHourAchieved: session.maxStreak >= 10,
    stars,
    missedWords,
    isVictory: session.mode === 'endless' ? servedOrders >= 15 : session.state === 'won',
    isGameOver: session.state === 'lost',
    history: session.history,
  };
}
