import { requireLogin, isAdmin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStages, fetchMyClears } from '../lib/stage-io.js';
import { readTier } from '../lib/queries.js';
import { isLevelAllowed } from '../lib/user-profile.js';
import { mascotSrc } from '../lib/mascot.js';
import { showPageError } from '../lib/page-error.js';
import { attachUiSounds } from '../lib/ui-sound.js';

const base = import.meta.env.BASE_URL;

export const ISLAND_METADATA = {
  A1: {
    level: 'A1',
    name: 'พื้นฐานภาษาอังกฤษเริ่มต้น',
    englishName: 'Starter Meadow',
    badge: 'A1 · Beginner',
    target: 'นักเรียน ป.5 – ม.1 หรือผู้เริ่มต้นปูพื้นฐานใหม่',
    themeColor: '#10b981',
    borderColor: '#a7f3d0',
    btnColor: '#10b981',
    btnShadow: '#059669',
    image: 'islands/island-a1.jpg',
    imageWebp: 'islands/island-a1.webp',
    topics: 'Present Simple, Articles, Pronouns, Nouns, can/can\'t',
    description: 'ปูพื้นฐานไวยากรณ์ คำนาม คำสรรพนาม และประโยคถาม-ตอบพื้นฐาน เข้าใจโครงสร้างภาษาอังกฤษอย่างมั่นใจ',
  },
  A2: {
    level: 'A2',
    name: 'สื่อสารในชีวิตประจำวัน',
    englishName: 'Explorer Coast',
    badge: 'A2 · Elementary',
    target: 'นักเรียน ม.1 – ม.3 หรือผู้ที่ต้องการสื่อสารคล่องขึ้น',
    themeColor: '#0284c7',
    borderColor: '#bae6fd',
    btnColor: '#0284c7',
    btnShadow: '#0369a1',
    image: 'islands/island-a2.jpg',
    imageWebp: 'islands/island-a2.webp',
    topics: 'Past Simple, Future Forms, Quantifiers, Comparatives',
    description: 'ฝึกเล่าเรื่องราวในอดีต วางแผนอนาคต และเปรียบเทียบสิ่งต่างๆ เพื่อการสื่อสารในชีวิตประจำวัน',
  },
  B1: {
    level: 'B1',
    name: 'ไวยากรณ์ระดับกลาง & ม.ปลาย',
    englishName: 'Mystic Citadel',
    badge: 'B1 · Intermediate',
    target: 'นักเรียน ม.4 – ม.5 หรือเตรียมสอบวัดระดับสากล',
    themeColor: '#7c3aed',
    borderColor: '#ddd6fe',
    btnColor: '#7c3aed',
    btnShadow: '#6d28d9',
    image: 'islands/island-b1.jpg',
    imageWebp: 'islands/island-b1.webp',
    topics: 'Present Perfect, Passive Voice, Conditionals, Relative Clauses',
    description: 'พัฒนาการเชื่อมโยงประโยคซับซ้อน โครงสร้าง Passive Voice และประโยคเงื่อนไขเพื่อการสื่อสารเชิงวิชาการ',
  },
  B2: {
    level: 'B2',
    name: 'ไวยากรณ์ขั้นสูง & เตรียมสอบมหาวิทยาลัย',
    englishName: 'Sky Palace',
    badge: 'B2 · Upper-Inter',
    target: 'นักเรียน ม.5 – ม.6 เตรียมสอบ TCAS, TGAT 1, A-Level',
    themeColor: '#d97706',
    borderColor: '#fde68a',
    btnColor: '#d97706',
    btnShadow: '#b45309',
    image: 'islands/island-b2.jpg',
    imageWebp: 'islands/island-b2.webp',
    topics: 'Participle Clauses, Inversion, Unreal Past, Cleft Sentences',
    description: 'โครงสร้างไวยากรณ์ชั้นสูง สำนวนภาษาทางการ และเทคนิคการวิเคราะห์ประโยคเพื่อการสอบแข่งขันระดับสูง',
  },
};

document.getElementById('back-link').href = `${base}dashboard.html`;
document.getElementById('mascot').src = mascotSrc('normal', base);
attachUiSounds();

const lockDialog = document.getElementById('lock-dialog');
const lockTitle = document.getElementById('lock-dialog-title');
const lockBody = document.getElementById('lock-dialog-body');
const lockClose = document.getElementById('lock-dialog-close');
const lockCloseX = document.getElementById('lock-dialog-close-x');

if (lockClose) lockClose.addEventListener('click', () => lockDialog?.close());
if (lockCloseX) lockCloseX.addEventListener('click', () => lockDialog?.close());

function openLockDialog(level) {
  if (!lockDialog) return;
  lockTitle.textContent = `ระดับ ${level} เปิดให้ผู้เรียน Full Tier ครับ`;
  lockBody.innerHTML = `
    <p>ตอนนี้ระบบเปิดให้ทดลองเล่นระดับ <strong>A1 ฟรีครบทั้ง 20 ด่าน</strong> เลยครับ</p>
    <p>สำหรับเนื้อหาระดับ <strong>${level}</strong> (20 ด่าน พร้อมบทเรียนสรุปและบอสใหญ่) เปิดให้นักเรียนระดับ Full Tier หรือผู้ที่ได้รับสิทธิ์พิเศษ</p>
    <p>หากสนใจปลดล็อกระดับ ${level} เพื่อลุยต่อ ทักหาพี่ปิ๊กได้เลยครับ เดี๋ยวเปิดสิทธิ์ให้ทันที!</p>
  `;
  lockDialog.showModal();
}

function render(stages, tier, isUserAdmin, userDoc, myClears = []) {
  const groups = new Map();
  for (const stage of stages) {
    const key = `${stage.skill}|${stage.level}`;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }

  const clearsByLevel = new Map();
  const starsByLevel = new Map();
  for (const clear of myClears) {
    const lvl = clear.level;
    if (!lvl) continue;
    const isCleared = (clear.clearCount ?? 0) > 0 || (clear.score ?? 0) >= 0.7;
    if (isCleared) {
      clearsByLevel.set(lvl, (clearsByLevel.get(lvl) ?? 0) + 1);
    }
    starsByLevel.set(lvl, (starsByLevel.get(lvl) ?? 0) + (clear.bestStars ?? 0));
  }

  const container = document.getElementById('choices');
  container.replaceChildren();

  const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2'];
  const skill = 'grammar';

  for (const level of LEVEL_ORDER) {
    const meta = ISLAND_METADATA[level];
    const key = `${skill}|${level}`;
    const totalStages = groups.get(key) || 20;
    const clearedStages = clearsByLevel.get(level) ?? 0;
    const stars = starsByLevel.get(level) ?? 0;
    const maxStars = totalStages * 3;
    const progressPct = Math.min(100, Math.round((clearedStages / totalStages) * 100));
    const allowed = isLevelAllowed(userDoc, level);
    const isFreeA1 = level === 'A1' && userDoc?.tier !== 'full' && userDoc?.role !== 'admin';

    const card = document.createElement('article');
    card.className = `island-card${allowed ? '' : ' island-card--locked'}`;
    card.style.setProperty('--island-border', meta.borderColor);

    card.innerHTML = `
      <div class="island-banner-wrap">
        <picture>
          <source srcset="${base}${meta.imageWebp}" type="image/webp">
          <img class="island-banner-img" src="${base}${meta.image}" alt="${meta.name}" loading="lazy" />
        </picture>
        <span class="island-overlay-badge" style="color: ${meta.themeColor};">
          🏝️ ${meta.badge}
        </span>
        ${isFreeA1 ? '<span class="island-free-pill">ทดลองเล่นฟรี ✨</span>' : ''}
        ${!allowed ? '<div class="island-lock-overlay"><span class="island-lock-icon">🔒 ล็อกไว้</span></div>' : ''}
      </div>
      <div class="island-body">
        <div class="island-header">
          <h2 class="island-title">${meta.name}</h2>
          <span class="island-subname">${meta.englishName}</span>
        </div>
        <div class="island-target-box">
          <span class="island-target-badge">🎯 เหมาะสำหรับ</span>
          <span class="island-target-text">${meta.target}</span>
        </div>
        <p class="island-desc">${meta.description}</p>
        <div class="island-topics-box">
          <span class="island-topics-icon">📖</span>
          <span class="island-topics-text"><strong>ไวยากรณ์หลัก:</strong> ${meta.topics}</span>
        </div>
        <div class="island-progress-section">
          <div class="island-stats-row">
            <span>⛳ ผ่านแล้ว ${clearedStages}/${totalStages} ด่าน</span>
            <span class="island-stars-val">⭐ ${stars}/${maxStars}</span>
          </div>
          <div class="island-progress-track">
            <div class="island-progress-bar" style="width: ${progressPct}%; background: ${meta.themeColor};"></div>
          </div>
          ${
            allowed
              ? `<button type="button" class="btn-chunky island-btn" style="background: ${meta.btnColor}; border-bottom-color: ${meta.btnShadow};">เข้าสู่บทเรียน ${level} ✨</button>`
              : `<button type="button" class="btn-ghost island-btn island-btn--locked">🔒 ติดต่อผู้สอนเพื่อปลดล็อก</button>`
          }
        </div>
      </div>
    `;

    const actionBtn = card.querySelector('button');
    if (allowed) {
      actionBtn.addEventListener('click', () => {
        window.location.href = `${base}learn/path.html?skill=${skill}&level=${level}`;
      });
    } else {
      actionBtn.addEventListener('click', () => {
        openLockDialog(level);
      });
    }

    container.appendChild(card);
  }
}

requireLogin(async (firebaseUser, userDoc) => {
  const loadingNote = document.getElementById('loading-note');
  const isUserAdmin = isAdmin(userDoc);

  const navAdminLink = document.getElementById('nav-admin-link');
  if (navAdminLink && isUserAdmin) {
    navAdminLink.href = `${base}admin/index.html`;
    navAdminLink.hidden = false;
  }

  try {
    const tier = readTier(userDoc);
    const allowedLevels = userDoc?.allowedLevels;
    let stages = [];
    let myClears = [];

    const fetchClearsPromise = fetchMyClears(db, firebaseUser.uid).catch(() => []);

    if (tier === 'full' || isUserAdmin) {
      const [fetchedStages, fetchedClears] = await Promise.all([
        fetchStages(db, { tier, allowedLevels }),
        fetchClearsPromise,
      ]);
      stages = fetchedStages;
      myClears = fetchedClears;
    } else {
      const [a1Stages, a2Stages, b1Stages, b2Stages, fetchedClears] = await Promise.all([
        fetchStages(db, { skill: 'grammar', level: 'A1', tier: 'free', allowedLevels }),
        fetchStages(db, { skill: 'grammar', level: 'A2', tier: 'free', allowedLevels }),
        fetchStages(db, { skill: 'grammar', level: 'B1', tier: 'free', allowedLevels }),
        fetchStages(db, { skill: 'grammar', level: 'B2', tier: 'free', allowedLevels }),
        fetchClearsPromise,
      ]);
      stages = [...a1Stages, ...a2Stages, ...b1Stages, ...b2Stages];
      myClears = fetchedClears;
    }

    loadingNote.hidden = true;
    render(stages, tier, isUserAdmin, userDoc, myClears);
  } catch (error) {
    loadingNote.hidden = true;
    showPageError('โหลดบทเรียนไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
