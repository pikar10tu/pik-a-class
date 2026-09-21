import { requireLogin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStages, fetchMyClears } from '../lib/stage-io.js';
import { buildStagePath, totalStars, clearsByStageId } from '../lib/stage-progress.js';
import { showPageError } from '../lib/page-error.js';
import { mascotSrc } from '../lib/mascot.js';
import { LEVELS } from '../lib/schema/taxonomy.js';

const base = import.meta.env.BASE_URL;
const params = new URLSearchParams(window.location.search);
const skill = params.get('skill');
const level = params.get('level');
const SKILL_LABELS = { grammar: 'ไวยากรณ์', vocab: 'คำศัพท์', dialogue: 'บทสนทนา' };
const isValidQuery = Object.hasOwn(SKILL_LABELS, skill ?? '') && LEVELS.includes(level ?? '');

// พิกัดเส้นทางซิกแซก — วงกลมด่านสลับซ้าย/ขวาไล่ลงมา เส้นโค้งลากผ่านศูนย์กลางทุกวง
const NODE = 64;
const STEP = 118;
const LEFT = 76;
const RIGHT = 216;
const CANVAS_WIDTH = 292;

document.getElementById('back-link').href = `${base}learn/index.html`;
document.getElementById('empty-back').href = `${base}learn/index.html`;
document.getElementById('empty-mascot').src = mascotSrc('normal', base);

function starMarkup(stars) {
  const filled = '★'.repeat(stars);
  const empty = '☆'.repeat(3 - stars);
  return `<span aria-hidden="true">${filled}<span class="off">${empty}</span></span><span class="sr-only">ได้ ${stars} จาก 3 ดาว</span>`;
}

function centerOf(index) {
  return { x: index % 2 === 0 ? LEFT : RIGHT, y: 60 + index * STEP };
}

// เส้นทางโค้งลากผ่านทุกด่านจริง ไม่ใช่เส้นตรงหลังวงกลม
function curveThrough(points, upTo = points.length) {
  if (points.length === 0) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < Math.min(upTo, points.length); i += 1) {
    const from = points[i - 1];
    const to = points[i];
    const mid = (from.y + to.y) / 2;
    d += ` C ${from.x} ${mid}, ${to.x} ${mid}, ${to.x} ${to.y}`;
  }
  return d;
}

function nodeState(stage) {
  if (!stage.unlocked) return 'locked';
  if (stage.cleared) return 'cleared';
  if (stage.stars > 0) return 'attempted';
  return 'open';
}

function nodeLabel(stage, state) {
  if (state === 'locked') return '🔒';
  if (state === 'cleared') return '✓';
  return String(stage.order);
}

function nodeAriaLabel(stage, state) {
  const prefix = `ด่าน ${stage.order} ${stage.title}`;
  if (state === 'locked') return `${prefix} — ยังล็อกอยู่`;
  if (state === 'cleared') return `${prefix} — ผ่านแล้ว ได้ ${stage.stars} จาก 3 ดาว`;
  if (state === 'attempted') return `${prefix} — เล่นได้ เคยได้ ${stage.stars} จาก 3 ดาว ยังไม่ผ่าน`;
  return `${prefix} — เล่นได้ ยังไม่เคยเล่น`;
}

function renderPath(path) {
  const canvas = document.getElementById('path-canvas');
  canvas.replaceChildren();
  canvas.hidden = false;

  const points = path.map((_, index) => centerOf(index));
  const height = 60 + Math.max(0, path.length - 1) * STEP + 96;

  const svgNs = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNs, 'svg');
  svg.setAttribute('viewBox', `0 0 ${CANVAS_WIDTH} ${height}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.display = 'block';

  const clearedCount = path.filter((stage) => stage.cleared).length;
  for (const [d, className] of [
    [curveThrough(points), 'path-track'],
    [curveThrough(points, clearedCount + 1), 'path-track-done'],
  ]) {
    if (!d) continue;
    const line = document.createElementNS(svgNs, 'path');
    line.setAttribute('d', d);
    line.setAttribute('class', className);
    svg.appendChild(line);
  }
  canvas.appendChild(svg);

  path.forEach((stage, index) => {
    const point = points[index];
    const state = nodeState(stage);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `path-node path-node-${state}`;
    button.textContent = nodeLabel(stage, state);
    button.setAttribute('aria-label', nodeAriaLabel(stage, state));
    button.style.left = `calc(${(point.x / CANVAS_WIDTH) * 100}% - ${NODE / 2}px)`;
    button.style.top = `calc(${(point.y / height) * 100}% - ${NODE / 2}px)`;
    button.addEventListener('click', () => openSheet(stage, state));
    canvas.appendChild(button);

    if (stage.stars > 0) {
      const badge = document.createElement('span');
      badge.className = 'stars path-star-badge';
      badge.innerHTML = starMarkup(stage.stars);
      badge.style.left = `${(point.x / CANVAS_WIDTH) * 100}%`;
      badge.style.top = `calc(${(point.y / height) * 100}% + ${NODE / 2 - 2}px)`;
      canvas.appendChild(badge);
    }
  });
}

function openSheet(stage, state) {
  document.getElementById('sheet-badge').textContent =
    state === 'locked' ? `ด่าน ${stage.order} · ยังล็อกอยู่` : `ด่าน ${stage.order} · เล่นได้`;
  document.getElementById('sheet-title').textContent = stage.title;
  document.getElementById('sheet-meta').textContent =
    `${stage.itemCount} ข้อ · ผ่านที่ ${Math.round(stage.passThreshold * 100)}%`;

  const bestEl = document.getElementById('sheet-best');
  if (state === 'locked') {
    bestEl.textContent = stage.lockedReason;
  } else if (stage.stars > 0) {
    bestEl.innerHTML = `ดาวที่เคยได้ <span class="stars">${starMarkup(stage.stars)}</span>${
      state === 'attempted' ? ' — ยังไม่ผ่าน ลองอีกครั้งได้เลย' : ''
    }`;
  } else {
    bestEl.textContent = 'ยังไม่เคยเล่นด่านนี้ — ตอบถูกหมดได้ 3 ดาว';
  }

  const start = document.getElementById('sheet-start');
  start.hidden = state === 'locked';
  start.onclick = () => {
    window.location.href = `${base}learn/play.html?stage=${stage.id}`;
  };
  document.getElementById('sheet-backdrop').hidden = false;
}

document.getElementById('sheet-close').addEventListener('click', () => {
  document.getElementById('sheet-backdrop').hidden = true;
});

function showEmpty(message) {
  document.getElementById('loading-note').hidden = true;
  document.getElementById('path-canvas').hidden = true;
  document.getElementById('empty-message').textContent = message;
  document.getElementById('empty-state').hidden = false;
}

if (!isValidQuery) {
  document.getElementById('path-title').textContent = 'เส้นทางด่าน';
  requireLogin(() => {
    showEmpty('ลิงก์นี้ใช้ไม่ได้ ลองเลือกบทเรียนใหม่อีกครั้งนะครับ');
  });
} else {
  document.getElementById('path-title').textContent = SKILL_LABELS[skill];

  requireLogin(async (firebaseUser) => {
    try {
      const [stages, clears] = await Promise.all([
        fetchStages(db, { skill, level }),
        fetchMyClears(db, firebaseUser.uid),
      ]);

      if (stages.length === 0) {
        showEmpty(`ยังไม่มีด่านสำหรับระดับ ${level} ในหมวดนี้ ลองเลือกบทเรียนอื่นดูก่อนนะครับ`);
        return;
      }

      const path = buildStagePath(stages, clearsByStageId(clears));
      const cleared = path.filter((stage) => stage.cleared).length;
      document.getElementById('loading-note').hidden = true;
      document.getElementById('path-summary').textContent =
        `ระดับ ${level} · ผ่านแล้ว ${cleared} จาก ${path.length} ด่าน`;
      document.getElementById('total-stars').textContent = `★ ${totalStars(path)} ดาว`;
      renderPath(path);
    } catch (error) {
      // ปุ่ม "← กลับ" ที่หัวหน้ายังกดได้เสมอ นักเรียนจึงไม่ตันแม้โหลดล้มเหลว
      document.getElementById('loading-note').hidden = true;
      showPageError('โหลดเส้นทางด่านไม่สำเร็จ กรุณาลองใหม่');
      console.error(error);
    }
  });
}
