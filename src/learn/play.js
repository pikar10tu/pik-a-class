import { requireLogin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStage, fetchStageExercises } from '../lib/stage-io.js';
import { saveStageResult } from '../lib/stage-result-io.js';
import { createSession, currentExercise, answerCurrent, advance, summarize } from '../lib/stage-session.js';
import { buildWordBank } from '../lib/word-bank.js';
import { mascotSrc } from '../lib/mascot.js';
import { playAnswerSound } from '../lib/answer-audio.js';
import { loadMuted, saveMuted } from '../lib/sound-prefs.js';

const base = import.meta.env.BASE_URL;
const stageId = new URLSearchParams(window.location.search).get('stage');

let stage = null;
let exercises = [];
let session = null;
let uid = null;
let answered = false;
// จริงๆ แล้วเก็บสถานะ "กำลังเล่นด่านอยู่ ยังไม่จบ" ไว้กันหลุดหน้าโดยไม่เตือน (ปิดแท็บ/รีเฟรช/ย้อนกลับ)
// ต่างจากปุ่ม "ออก" ที่ถามยืนยันเฉพาะตอนกดเอง — อันนี้ครอบคลุมทางออกอื่นๆ ที่ JS ดักไม่ได้ตรงๆ ด้วย beforeunload
let midStage = false;
// กันกดปุ่ม "ต่อไป" รัว/แตะซ้ำจนเรียก finish()/บันทึกผลซ้ำสอง — บันทึกจริงเกิดที่ save() แต่กันไว้สองชั้น
let saveInFlight = false;

const TYPE_LABELS = { mcq: 'เลือกคำตอบที่ถูก', fill_blank: 'เติมคำให้ถูก' };

// เข้าถึง localStorage แบบกันพัง — บาง browser mode (private mode บางยี่ห้อ) throw ตอนแตะ window.localStorage เลย
function safeLocalStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

// สถานะปิดเสียงตอบคำถาม (ปุ่ม mute-toggle) — อ่านค่าที่เคยตั้งไว้จาก localStorage ตอนเปิดหน้า
// นี่เป็นการตั้งค่าที่นักเรียนต้องกดปิดเองได้ เพราะเสียงที่ปิดไม่ได้ไม่เหมาะกับห้องเรียน
let soundMuted = loadMuted(safeLocalStorage());

const muteButton = document.getElementById('mute-toggle');

function renderMuteButton() {
  muteButton.textContent = soundMuted ? 'เปิดเสียง' : 'ปิดเสียง';
  muteButton.setAttribute('aria-pressed', String(soundMuted));
  muteButton.setAttribute('aria-label', soundMuted ? 'เปิดเสียงตอบคำถาม' : 'ปิดเสียงตอบคำถาม');
  muteButton.classList.toggle('is-muted', soundMuted);
}

muteButton.addEventListener('click', () => {
  soundMuted = !soundMuted;
  saveMuted(safeLocalStorage(), soundMuted);
  renderMuteButton();
});

renderMuteButton();

function pathHref() {
  return `${base}learn/path.html?skill=${stage.skill}&level=${stage.level}`;
}

function showEmpty(message, backHref) {
  midStage = false;
  document.getElementById('play-view').hidden = true;
  document.getElementById('result-view').hidden = true;
  document.getElementById('empty-mascot').src = mascotSrc('normal', base);
  document.getElementById('empty-message').textContent = message;
  document.getElementById('empty-back').href = backHref;
  document.getElementById('empty-state').hidden = false;
}

function optionsFor(exercise) {
  return exercise.type === 'mcq' ? exercise.choices ?? [] : buildWordBank(exercise, exercises);
}

function renderQuestion() {
  const exercise = currentExercise(session);
  if (!exercise) {
    finish();
    return;
  }
  answered = false;

  document.getElementById('progress-text').textContent = `${session.index + 1}/${exercises.length}`;
  document.getElementById('progress-fill').style.width = `${(session.index / exercises.length) * 100}%`;
  document.getElementById('question-label').textContent = TYPE_LABELS[exercise.type] ?? '';
  document.getElementById('question-prompt').textContent = exercise.prompt;
  document.getElementById('verdict').hidden = true;

  const nextButton = document.getElementById('next');
  nextButton.disabled = false;

  const answers = document.getElementById('answers');
  answers.replaceChildren();
  for (const option of optionsFor(exercise)) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'answer-card';
    card.textContent = option;
    card.addEventListener('click', () => pick(card, option));
    answers.appendChild(card);
  }
}

function pick(card, option) {
  // สัญญาของ stage-session: คำตอบแรกต่อข้อเท่านั้นที่ถูกบันทึก ส่วนหน้านี้ปิดปุ่มตั้งแต่ตอบครั้งแรก
  // จึงไม่มีทางแตะซ้ำแล้วเห็นสถานะเปลี่ยน — กันสับสนว่าคำตอบที่สองถูกรับไปด้วย
  if (answered) return;
  answered = true;

  const exercise = currentExercise(session);
  session = answerCurrent(session, option);
  const result = session.results[session.results.length - 1];
  const accepted = (exercise.answerKey ?? []).map((value) => String(value));

  for (const button of document.querySelectorAll('.answer-card')) {
    button.disabled = true;
    if (accepted.includes(button.textContent)) button.dataset.state = 'correct';
  }
  if (!result.correct) card.dataset.state = 'wrong';

  document.getElementById('verdict-text').textContent = result.correct
    ? 'เก่งมาก! ถูกต้อง'
    : `ยังไม่ถูก — คำตอบคือ "${accepted[0]}"`;
  document.getElementById('verdict').hidden = false;

  // เล่นเสียงหลังอัปเดตหน้าจอเสร็จแล้วเท่านั้น (visual feedback ต้องมาก่อนเสมอ ไม่รอเสียง)
  // และสร้าง/ปลุก AudioContext จาก gesture การแตะคำตอบตรงนี้เอง — ห้ามมีที่ไหนเรียกก่อนหน้านี้
  if (!soundMuted) playAnswerSound(result.correct ? 'correct' : 'wrong');
}

async function finish() {
  midStage = false;
  const summary = summarize(session, stage.passThreshold);
  document.getElementById('play-view').hidden = true;
  document.getElementById('result-view').hidden = false;
  document.getElementById('result-mascot').src = mascotSrc(summary.passed ? 'clear' : 'wrong', base);
  document.getElementById('result-title').textContent = summary.passed
    ? 'ผ่านด่านแล้ว!'
    : 'ยังไม่ผ่าน ลองอีกครั้งนะ';
  document.getElementById('result-stars').innerHTML =
    '★'.repeat(summary.stars) + `<span class="off">${'★'.repeat(3 - summary.stars)}</span>`;
  document.getElementById('result-score').textContent =
    `ตอบถูก ${summary.correctCount} จาก ${summary.total} ข้อ (${Math.round(summary.score * 100)}%)`;
  await save();
}

async function save() {
  // ชั้นป้องกันการบันทึกซ้ำ: ต่อให้ finish() ถูกเรียกซ้อนกันจากการแตะ "ต่อไป" รัวๆ
  // ตัวจริงที่ยิง batch.commit() มีทางเข้าทางเดียวคือฟังก์ชันนี้ และมันเรียกซ้อนกันเองไม่ได้
  if (saveInFlight) return;
  saveInFlight = true;
  const note = document.getElementById('save-state');
  note.textContent = 'กำลังบันทึกผล…';
  try {
    // results มาจาก session.results เท่านั้น ซึ่งสร้างจาก session.exercises ที่ผูกกับ stage.itemIds
    // (ไม่เกิน 20 รายการตาม schema) เสมอ — ไม่มีทางกว้างกว่าด่านนี้
    await saveStageResult(db, { uid, stage, exercises, results: session.results });
    note.textContent = 'บันทึกผลแล้ว';
  } catch (error) {
    console.error(error);
    note.replaceChildren();
    note.appendChild(document.createTextNode('ยังบันทึกผลไม่ได้ (เน็ตอาจมีปัญหา) '));
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'btn-ghost';
    retry.textContent = 'ลองบันทึกอีกครั้ง';
    retry.addEventListener('click', save);
    note.appendChild(retry);
  } finally {
    saveInFlight = false;
  }
}

document.getElementById('next').addEventListener('click', (event) => {
  // ปิดปุ่มทันทีเป็นบรรทัดแรกแบบ sync กันแตะซ้ำเร็วๆ ทำให้ advance() ยิงสองที (ข้ามคำถามไปเฉยๆ)
  event.currentTarget.disabled = true;
  session = advance(session);
  if (session.finished) finish();
  else renderQuestion();
});

document.getElementById('quit').addEventListener('click', () => {
  if (window.confirm('ออกตอนนี้ความคืบหน้าจะหาย ออกเลยไหม?')) {
    midStage = false;
    window.location.href = pathHref();
  }
});

document.getElementById('retry').addEventListener('click', () => {
  window.location.reload();
});

document.getElementById('back-to-path').addEventListener('click', () => {
  window.location.href = pathHref();
});

// กันปิดแท็บ/รีเฟรช/กดย้อนกลับเบราว์เซอร์กลางด่านโดยไม่เตือน — เสริมจากปุ่ม "ออก" ที่ถามยืนยันอยู่แล้ว
// (ข้อความจริงที่เห็นเป็นข้อความมาตรฐานของเบราว์เซอร์ กำหนดเองไม่ได้แล้วในเบราว์เซอร์สมัยใหม่)
window.addEventListener('beforeunload', (event) => {
  if (!midStage) return;
  event.preventDefault();
  event.returnValue = '';
});

requireLogin(async (firebaseUser) => {
  uid = firebaseUser.uid;
  try {
    stage = await fetchStage(db, stageId);
    if (!stage) {
      showEmpty('ไม่พบด่านนี้', `${base}learn/index.html`);
      return;
    }
    exercises = await fetchStageExercises(db, stage.itemIds);

    // เผื่อกรณีที่ข้อหายไปบางข้อแบบไม่ error (เช่น ข้อถูกลบทิ้งไปแล้ว)
    // ส่วนกรณี "ไม่มีสิทธิ์อ่านบางข้อ" จะโยน permission-denied ทั้งชุด ดักไว้ที่ catch ด้านล่าง
    if (exercises.length < stage.itemIds.length) {
      showEmpty('ด่านนี้ยังไม่เปิดสำหรับบัญชีของคุณ ลองทักปิ๊กเพื่อขอเปิดได้ครับ', pathHref());
      return;
    }

    // ด่านที่ยังไม่มีข้อเลย (ตั้งค่าไว้แต่ยังไม่ใส่ข้อ) — เล่นไม่ได้จริง อย่าให้ session จบทันทีจนไปบันทึกผล 0/0
    if (exercises.length === 0) {
      showEmpty('ด่านนี้ยังไม่มีข้อเลย ลองด่านอื่นก่อนนะครับ', pathHref());
      return;
    }

    session = createSession(exercises);
    midStage = true;
    document.getElementById('play-view').hidden = false;
    renderQuestion();
  } catch (error) {
    const backHref = stage ? pathHref() : `${base}learn/index.html`;
    // การอ่านข้อในด่านใช้ documentId() in [...] — ถ้าบัญชีนี้อ่านข้อใดข้อหนึ่งไม่ได้
    // Firestore ปฏิเสธทั้ง query ไม่ใช่คืนมาแค่บางข้อ เด็กจึงต้องเห็นเหตุผลจริง
    // ไม่ใช่ "โหลดไม่สำเร็จ กรุณาลองใหม่" ที่ชวนให้กดซ้ำไปเรื่อยๆ ทั้งที่ลองอีกกี่ครั้งก็ไม่ขึ้น
    if (error?.code === 'permission-denied') {
      showEmpty('ด่านนี้ยังไม่เปิดสำหรับบัญชีของคุณ ลองทักปิ๊กเพื่อขอเปิดได้ครับ', backHref);
    } else {
      showEmpty('โหลดด่านไม่สำเร็จ กรุณาลองใหม่', backHref);
    }
    console.error(error);
  }
});
