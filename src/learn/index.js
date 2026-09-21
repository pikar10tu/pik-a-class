import { requireLogin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStages } from '../lib/stage-io.js';
import { mascotSrc } from '../lib/mascot.js';
import { showPageError } from '../lib/page-error.js';

const base = import.meta.env.BASE_URL;
const SKILL_LABELS = { grammar: 'ไวยากรณ์', vocab: 'คำศัพท์', dialogue: 'บทสนทนา' };

document.getElementById('back-link').href = `${base}dashboard.html`;
document.getElementById('mascot').src = mascotSrc('normal', base);

function render(stages) {
  const groups = new Map();
  for (const stage of stages) {
    const key = `${stage.skill}|${stage.level}`;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }

  const container = document.getElementById('choices');
  container.replaceChildren();
  document.getElementById('empty-note').hidden = groups.size > 0;

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

requireLogin(async () => {
  const loadingNote = document.getElementById('loading-note');
  try {
    const stages = await fetchStages(db);
    loadingNote.hidden = true;
    render(stages);
  } catch (error) {
    loadingNote.hidden = true;
    showPageError('โหลดบทเรียนไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
