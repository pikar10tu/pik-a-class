import { mascotSrc } from './lib/mascot.js';
import { attachUiSounds } from './lib/ui-sound.js';
import { GRAMMAR_NOTES_A1 } from './lib/grammar-notes/notes-a1.js';
import { GRAMMAR_NOTES_A2 } from './lib/grammar-notes/notes-a2.js';
import { GRAMMAR_NOTES_B1 } from './lib/grammar-notes/notes-b1.js';
import { GRAMMAR_NOTES_B2 } from './lib/grammar-notes/notes-b2.js';

const base = import.meta.env.BASE_URL;

const LEVEL_DATA = {
  A1: {
    title: 'ระดับ A1 — Beginner (ประถมปลาย ป.4–ป.6 & ติวสอบเข้า ม.1)',
    desc: 'ไวยากรณ์แกนกลาง 10 หัวข้อรากฐานสำคัญ เน้นเรื่องรูปกาลพื้นฐาน (Present Simple / Continuous), การใช้ Articles (a/an/the), การตั้งคำถาม Wh- และกริยาช่วย can',
    notes: GRAMMAR_NOTES_A1,
    stagesUrl: 'learn/path.html?level=A1&skill=grammar',
  },
  A2: {
    title: 'ระดับ A2 — Elementary (มัธยมต้น ม.1–ม.3 & ติวสอบเข้า ม.4 ทั่วไป)',
    desc: 'ไวยากรณ์ 10 หัวข้อเพื่อการสื่อสารเชื่อมโยง เน้น 4 Tenses สำคัญ (Past Simple, Past Continuous, Present Perfect, Future), Modals, การเปรียบเทียบ และเงื่อนไข Zero/First Conditionals',
    notes: GRAMMAR_NOTES_A2,
    stagesUrl: 'learn/path.html?level=A2&skill=grammar',
  },
  B1: {
    title: 'ระดับ B1 — Intermediate (ม.3 สอบเข้าเตรียมอุดม/กำเนิดวิทย์ & ม.ปลาย ม.4–ม.5)',
    desc: 'ไวยากรณ์ 10 หัวข้อระดับกลาง จุดตัดคะแนนสอบแข่งขัน: Present Perfect Continuous, Past Perfect, Passive Voice, Second & Third Conditionals, Reported Speech และคำเชื่อมข้อความ',
    notes: GRAMMAR_NOTES_B1,
    stagesUrl: 'learn/path.html?level=B1&skill=grammar',
  },
  B2: {
    title: 'ระดับ B2 — Upper-Intermediate (ม.5–ม.6 เตรียมสอบ TCAS, TGAT 1, A-Level & มหาวิทยาลัย)',
    desc: 'ไวยากรณ์ 10 หัวข้อระดับสูงเพื่อพิชิตข้อสอบเข้ามหาวิทยาลัยและระดับสากล: Participle Clauses, Inversion, Unreal Past/Subjunctive, Cleft Sentences, Passive ขั้นสูง และ Academic Hedging',
    notes: GRAMMAR_NOTES_B2,
    stagesUrl: 'learn/path.html?level=B2&skill=grammar',
  },
};

// Elements
const mascotEl = document.getElementById('handbook-mascot');
if (mascotEl) mascotEl.src = mascotSrc('smile', base);

const backLink = document.getElementById('back-link');
if (backLink) backLink.href = `${base}dashboard.html`;

attachUiSounds();

const searchInput = document.getElementById('handbook-search');
const topicsContainer = document.getElementById('topics-container');
const emptyState = document.getElementById('handbook-empty');
const emptyMsg = document.getElementById('handbook-empty-msg');
const metaTitle = document.getElementById('level-meta-title');
const metaDesc = document.getElementById('level-meta-desc');
const playBtn = document.getElementById('btn-play-level');
const tabButtons = document.querySelectorAll('.level-tab-btn');

// Initial level from URL query or fallback to A1
const urlParams = new URLSearchParams(window.location.search);
let currentLevel = urlParams.get('level')?.toUpperCase() || 'A1';
if (!LEVEL_DATA[currentLevel]) currentLevel = 'A1';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function noteMatchesQuery(note, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const searchPool = [
    note.title,
    note.badge,
    note.concept,
    note.formula,
    note.negQuestion,
    note.tips,
    ...(Array.isArray(note.examples) ? note.examples : []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return searchPool.includes(q);
}

function renderTopicCard(note, number) {
  const examplesHtml = Array.isArray(note.examples) && note.examples.length > 0
    ? `
      <div class="topic-examples-title">ตัวอย่างประโยค</div>
      <ul class="topic-examples-list">
        ${note.examples.map(ex => `<li>${escapeHtml(ex)}</li>`).join('')}
      </ul>
    `
    : '';

  const negQuestionHtml = note.negQuestion
    ? `<div class="topic-neg-question"><strong>⚠️ ข้อสังเกต / ปฏิเสธ-คำถาม:</strong> ${escapeHtml(note.negQuestion)}</div>`
    : '';

  const tipHtml = note.tips
    ? `
      <div class="topic-tip-box">
        <span class="topic-tip-label">🌟 ทริคจากพี่ปิ๊ก:</span> ${escapeHtml(note.tips)}
      </div>
    `
    : '';

  return `
    <article class="topic-card" id="topic-${number}">
      <header class="topic-card-header">
        <div class="topic-header-main">
          <span class="topic-number-badge">${number}</span>
          <h3 class="topic-title">${escapeHtml(note.title)}</h3>
        </div>
        <span class="topic-badge">${escapeHtml(note.badge || '')}</span>
      </header>

      ${note.formula ? `
        <div class="topic-formula-box">
          <span class="formula-icon">💡</span>
          <code>${escapeHtml(note.formula)}</code>
        </div>
      ` : ''}

      <p class="topic-concept">${escapeHtml(note.concept)}</p>

      ${negQuestionHtml}
      ${examplesHtml}
      ${tipHtml}
    </article>
  `;
}

function renderBossCard(note) {
  const examplesHtml = Array.isArray(note.examples) && note.examples.length > 0
    ? `
      <div class="topic-examples-title">ตัวอย่างประโยคสำคัญ</div>
      <ul class="topic-examples-list">
        ${note.examples.map(ex => `<li>${escapeHtml(ex)}</li>`).join('')}
      </ul>
    `
    : '';

  const negQuestionHtml = note.negQuestion
    ? `<div class="topic-neg-question"><strong>⚠️ จุดที่ต้องระวัง:</strong> ${escapeHtml(note.negQuestion)}</div>`
    : '';

  const tipHtml = note.tips
    ? `
      <div class="topic-tip-box">
        <span class="topic-tip-label">👑 คำแนะนำจากพี่ปิ๊ก:</span> ${escapeHtml(note.tips)}
      </div>
    `
    : '';

  return `
    <article class="topic-card card-boss">
      <header class="topic-card-header">
        <div class="topic-header-main">
          <span class="topic-number-badge" style="background: #9333ea;">👑</span>
          <h3 class="topic-title">${escapeHtml(note.title)}</h3>
        </div>
        <span class="topic-badge">${escapeHtml(note.badge || 'บททดสอบ')}</span>
      </header>

      ${note.formula ? `
        <div class="topic-formula-box" style="background: #faf5ff; border-color: #e9d5ff; color: #6b21a8;">
          <span class="formula-icon">🎯</span>
          <code>${escapeHtml(note.formula)}</code>
        </div>
      ` : ''}

      <p class="topic-concept">${escapeHtml(note.concept)}</p>

      ${negQuestionHtml}
      ${examplesHtml}
      ${tipHtml}
    </article>
  `;
}

function updateView() {
  const levelInfo = LEVEL_DATA[currentLevel];
  if (!levelInfo) return;

  // Update tabs
  tabButtons.forEach(btn => {
    const isCurrent = btn.dataset.level === currentLevel;
    btn.classList.toggle('is-active', isCurrent);
    btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
  });

  // Update meta box
  if (metaTitle) metaTitle.textContent = levelInfo.title;
  if (metaDesc) metaDesc.textContent = levelInfo.desc;
  if (playBtn) playBtn.href = `${base}${levelInfo.stagesUrl}`;

  // Filter notes by search
  const query = searchInput?.value?.trim() || '';
  const notesObj = levelInfo.notes;

  // Separate regular grammar topics vs review/boss notes
  const coreEntries = [];
  const bossEntries = [];

  for (const [key, note] of Object.entries(notesObj)) {
    if (key.startsWith('review:')) {
      bossEntries.push({ key, note });
    } else {
      coreEntries.push({ key, note });
    }
  }

  const matchingCore = coreEntries.filter(item => noteMatchesQuery(item.note, query));
  const matchingBoss = bossEntries.filter(item => noteMatchesQuery(item.note, query));

  const totalMatches = matchingCore.length + matchingBoss.length;

  if (totalMatches === 0) {
    topicsContainer.innerHTML = '';
    if (emptyState) {
      emptyState.hidden = false;
      if (emptyMsg) {
        emptyMsg.textContent = `ไม่พบหัวข้อไวยากรณ์ที่ตรงกับคำค้นหา "${query}" ในระดับ ${currentLevel}`;
      }
    }
    return;
  }

  if (emptyState) emptyState.hidden = true;

  let html = '';

  // Render core topics
  matchingCore.forEach((item, idx) => {
    // Original index 1..10
    const originalNumber = coreEntries.findIndex(e => e.key === item.key) + 1;
    html += renderTopicCard(item.note, originalNumber);
  });

  // Render boss reviews if any match
  if (matchingBoss.length > 0) {
    html += `<h2 class="reviews-section-title">⚔️ ด่านประลองบอส & ทบทวนรวบยอด (${currentLevel})</h2>`;
    matchingBoss.forEach(item => {
      html += renderBossCard(item.note);
    });
  }

  topicsContainer.innerHTML = html;
}

// Switch level handler
function setLevel(newLevel) {
  if (!LEVEL_DATA[newLevel]) return;
  currentLevel = newLevel;
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('level', currentLevel);
  window.history.replaceState(null, '', newUrl);
  updateView();
}

// Event Listeners
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setLevel(btn.dataset.level);
  });
});

if (searchInput) {
  searchInput.addEventListener('input', () => {
    updateView();
  });
}

// Initial render
updateView();
