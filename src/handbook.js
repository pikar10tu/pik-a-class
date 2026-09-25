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
if (mascotEl) {
  mascotEl.onerror = () => {
    mascotEl.src = mascotSrc('smile', base, 'png');
  };
  mascotEl.src = mascotSrc('smile', base, 'webp');
}

const backLink = document.getElementById('back-link');
if (backLink) backLink.href = `${base}dashboard.html`;

attachUiSounds();
try {
  localStorage.setItem('pik_handbook_visited', 'true');
} catch {}

const searchInput = document.getElementById('handbook-search');
const topicsContainer = document.getElementById('topics-container');
const quickJumpBar = document.getElementById('quick-jump-bar');
const handbookCount = document.getElementById('handbook-count');
const btnToggleAll = document.getElementById('btn-toggle-all');
const toggleAllText = document.getElementById('toggle-all-text');
const toggleAllIcon = document.getElementById('toggle-all-icon');
const btnBackToTop = document.getElementById('btn-back-to-top');
const emptyState = document.getElementById('handbook-empty');
const emptyMsg = document.getElementById('handbook-empty-msg');
const metaTitle = document.getElementById('level-meta-title');
const metaDesc = document.getElementById('level-meta-desc');
const playBtn = document.getElementById('btn-play-level');
const tabButtons = document.querySelectorAll('.level-tab-btn');

let allExpanded = false;

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

function getShortTopicLabel(note, index) {
  // Extract a brief label for quick-jump pill (e.g. "1. Pres Simple")
  const rawTitle = note.title || '';
  const englishPart = rawTitle.split('(')[0].trim();
  const shortTitle = englishPart.length > 18 ? englishPart.slice(0, 16) + '…' : englishPart;
  return `${index}. ${shortTitle}`;
}

function renderTopicCard(note, number, isOpen) {
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
    <article class="topic-card ${isOpen ? 'is-open' : ''}" id="topic-${number}">
      <header class="topic-card-header" data-toggle="topic-${number}">
        <div class="topic-header-main">
          <span class="topic-number-badge">${number}</span>
          <h3 class="topic-title">${escapeHtml(note.title)}</h3>
        </div>
        <div class="topic-header-actions">
          <span class="topic-badge">${escapeHtml(note.badge || '')}</span>
          <span class="topic-chevron" aria-hidden="true">▼</span>
        </div>
      </header>

      ${note.formula ? `
        <div class="topic-formula-box" data-toggle="topic-${number}" title="แตะเพื่อเปิด/ปิดเนื้อหา">
          <span class="formula-icon">💡</span>
          <code>${escapeHtml(note.formula)}</code>
        </div>
      ` : ''}

      <div class="topic-card-body">
        <p class="topic-concept">${escapeHtml(note.concept)}</p>
        ${negQuestionHtml}
        ${examplesHtml}
        ${tipHtml}
      </div>
    </article>
  `;
}

function renderBossCard(note, index, isOpen) {
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
    <article class="topic-card card-boss ${isOpen ? 'is-open' : ''}" id="boss-${index}">
      <header class="topic-card-header" data-toggle="boss-${index}">
        <div class="topic-header-main">
          <span class="topic-number-badge" style="background: #9333ea;">👑</span>
          <h3 class="topic-title">${escapeHtml(note.title)}</h3>
        </div>
        <div class="topic-header-actions">
          <span class="topic-badge">${escapeHtml(note.badge || 'บททดสอบ')}</span>
          <span class="topic-chevron" aria-hidden="true">▼</span>
        </div>
      </header>

      ${note.formula ? `
        <div class="topic-formula-box" data-toggle="boss-${index}" title="แตะเพื่อเปิด/ปิดเนื้อหา">
          <span class="formula-icon">🎯</span>
          <code>${escapeHtml(note.formula)}</code>
        </div>
      ` : ''}

      <div class="topic-card-body">
        <p class="topic-concept">${escapeHtml(note.concept)}</p>
        ${negQuestionHtml}
        ${examplesHtml}
        ${tipHtml}
      </div>
    </article>
  `;
}

function renderQuickJumpPills(coreEntries, bossEntries) {
  if (!quickJumpBar) return;
  let pillsHtml = '';

  coreEntries.forEach((item, idx) => {
    const num = idx + 1;
    const label = getShortTopicLabel(item.note, num);
    pillsHtml += `<button type="button" class="quick-jump-pill" data-target="topic-${num}">${escapeHtml(label)}</button>`;
  });

  bossEntries.forEach((item, idx) => {
    const label = item.note.title?.includes('มินิ') ? '⚔️ Mini-Boss' : '👑 Final Boss';
    pillsHtml += `<button type="button" class="quick-jump-pill is-boss" data-target="boss-${idx}">${escapeHtml(label)}</button>`;
  });

  quickJumpBar.innerHTML = pillsHtml;

  // Add click handlers
  quickJumpBar.querySelectorAll('.quick-jump-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      // Ensure open
      targetEl.classList.add('is-open');

      // Scroll smoothly
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Highlight animation
      targetEl.classList.remove('is-highlighted');
      void targetEl.offsetWidth; // trigger reflow
      targetEl.classList.add('is-highlighted');
      setTimeout(() => {
        targetEl.classList.remove('is-highlighted');
      }, 1600);
    });
  });
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

  // Populate quick jump bar (using all entries in level)
  renderQuickJumpPills(coreEntries, bossEntries);

  const matchingCore = coreEntries.filter(item => noteMatchesQuery(item.note, query));
  const matchingBoss = bossEntries.filter(item => noteMatchesQuery(item.note, query));

  const totalMatches = matchingCore.length + matchingBoss.length;

  if (totalMatches === 0) {
    topicsContainer.innerHTML = '';
    if (handbookCount) handbookCount.textContent = 'ไม่พบผลลัพธ์';
    if (emptyState) {
      emptyState.hidden = false;
      if (emptyMsg) {
        emptyMsg.textContent = `ไม่พบหัวข้อไวยากรณ์ที่ตรงกับคำค้นหา "${query}" ในระดับ ${currentLevel}`;
      }
    }
    return;
  }

  if (emptyState) emptyState.hidden = true;

  if (handbookCount) {
    if (query) {
      handbookCount.textContent = `พบ ${totalMatches} รายการที่ตรงกับ "${query}"`;
    } else {
      handbookCount.textContent = `แสดง ${matchingCore.length} หัวข้อ + ${matchingBoss.length} ด่านบอส`;
    }
  }

  // If user searched, auto-expand all matching cards for instant viewing; otherwise respect allExpanded
  const shouldOpen = Boolean(query) || allExpanded;

  let html = '';

  // Render core topics
  matchingCore.forEach((item) => {
    const originalNumber = coreEntries.findIndex(e => e.key === item.key) + 1;
    html += renderTopicCard(item.note, originalNumber, shouldOpen);
  });

  // Render boss reviews if any match
  if (matchingBoss.length > 0) {
    html += `<h2 class="reviews-section-title">⚔️ ด่านประลองบอส & ทบทวนรวบยอด (${currentLevel})</h2>`;
    matchingBoss.forEach((item, idx) => {
      html += renderBossCard(item.note, idx, shouldOpen);
    });
  }

  topicsContainer.innerHTML = html;

  // Wire up accordion toggle handlers on all cards
  topicsContainer.querySelectorAll('[data-toggle]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Don't toggle if user clicked on a link or button inside header
      if (e.target.closest('a, button')) return;
      const cardId = trigger.dataset.toggle;
      const cardEl = document.getElementById(cardId);
      if (cardEl) {
        cardEl.classList.toggle('is-open');
      }
    });
  });
}

// Switch level handler
function setLevel(newLevel) {
  if (!LEVEL_DATA[newLevel]) return;
  currentLevel = newLevel;
  allExpanded = false;
  if (toggleAllText) toggleAllText.textContent = 'ขยายทั้งหมด';
  if (toggleAllIcon) toggleAllIcon.textContent = '▾';
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('level', currentLevel);
  window.history.replaceState(null, '', newUrl);
  updateView();
}

// Toggle all cards open/collapsed
if (btnToggleAll) {
  btnToggleAll.addEventListener('click', () => {
    allExpanded = !allExpanded;
    if (toggleAllText) toggleAllText.textContent = allExpanded ? 'ยุบทั้งหมด' : 'ขยายทั้งหมด';
    if (toggleAllIcon) toggleAllIcon.textContent = allExpanded ? '▴' : '▾';

    topicsContainer.querySelectorAll('.topic-card').forEach(card => {
      card.classList.toggle('is-open', allExpanded);
    });
  });
}

// Floating back-to-top handler
if (btnBackToTop) {
  window.addEventListener('scroll', () => {
    btnBackToTop.hidden = window.scrollY < 300;
  });

  btnBackToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Tab button event listeners
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setLevel(btn.dataset.level);
  });
});

// Search input listener
if (searchInput) {
  searchInput.addEventListener('input', () => {
    updateView();
  });
}

// Initial render
updateView();
