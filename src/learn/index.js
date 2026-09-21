import { requireLogin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStages } from '../lib/stage-io.js';
import { readTier } from '../lib/queries.js';
import { mascotSrc } from '../lib/mascot.js';
import { showPageError } from '../lib/page-error.js';

const base = import.meta.env.BASE_URL;
const SKILL_LABELS = { grammar: 'ไวยากรณ์', vocab: 'คำศัพท์', dialogue: 'บทสนทนา' };

// สองสาเหตุที่ลิสต์ว่างต่างกันโดยสิ้นเชิง: tier full/แอดมินว่าง = ยังไม่มีบทเรียนจริง ๆ
// ส่วน tier free ว่าง = query ถูกล็อกด้วย isPreview จึงมักว่างเพราะบัญชีนี้ยังไม่มีสิทธิ์เห็น
// ไม่ใช่เพราะไม่มีบทเรียน หน้านี้ไม่รู้ว่าบทเรียนมีจริงไหม จึงห้ามฟันธงทั้งสองทาง
const EMPTY_MESSAGE_FULL = 'ยังไม่มีบทเรียนที่เปิดให้เล่นตอนนี้ครับ';
const EMPTY_MESSAGE_FREE = 'บัญชีนี้ยังไม่ได้รับสิทธิ์ดูบทเรียนตอนนี้ครับ ลองทักครูเพื่อขอสิทธิ์เพิ่มดูนะครับ';

document.getElementById('back-link').href = `${base}dashboard.html`;
document.getElementById('mascot').src = mascotSrc('normal', base);

function render(stages, tier) {
  const groups = new Map();
  for (const stage of stages) {
    const key = `${stage.skill}|${stage.level}`;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }

  const container = document.getElementById('choices');
  container.replaceChildren();

  const isEmpty = groups.size === 0;
  const emptyNote = document.getElementById('empty-note');
  emptyNote.hidden = !isEmpty;
  if (isEmpty) {
    emptyNote.textContent = tier === 'full' ? EMPTY_MESSAGE_FULL : EMPTY_MESSAGE_FREE;
  }

  for (const [key, count] of groups) {
    const [skill, level] = key.split('|');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-chunky';
    button.textContent = `${SKILL_LABELS[skill] ?? skill} · ระดับ ${level} — ${count} ด่าน`;
    // skill/level เดินทางต่อผ่าน query string ของ path.html เอง — หน้านี้ไม่ต้องจำค่าที่เลือกไว้
    // เพราะหน้าที่ของหน้านี้คือเสนอเมนูล่าสุดทุกครั้งที่กลับเข้ามา (ด่านอาจถูกเปิด/ปิดใหม่ระหว่างนั้น)
    button.addEventListener('click', () => {
      window.location.href = `${base}learn/path.html?skill=${skill}&level=${level}`;
    });
    container.appendChild(button);
  }
}

requireLogin(async (firebaseUser, userDoc) => {
  const loadingNote = document.getElementById('loading-note');
  try {
    // ต้องส่ง tier ไปด้วยเสมอ ไม่งั้น query จะไม่ล็อก isPreview และ rules ปฏิเสธทั้งชุด
    const tier = readTier(userDoc);
    const stages = await fetchStages(db, { tier });
    loadingNote.hidden = true;
    render(stages, tier);
  } catch (error) {
    loadingNote.hidden = true;
    showPageError('โหลดบทเรียนไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
