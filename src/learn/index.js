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

function openLockDialog(level, { userDoc, clearedLevels = [], clearedStages = 0, totalStages = 20, prevLevel = '', prevCleared = 0, prevTotal = 20 } = {}) {
  if (!lockDialog) return;

  const isFull = userDoc?.tier === 'full';
  const isA1Cleared = clearedLevels.includes('A1');
  const isA2Cleared = clearedLevels.includes('A2');

  if (level === 'A2' && isA1Cleared && !isFull) {
    // Free tier cleared A1: Prompts to screenshot and contact teacher for free A2 unlock!
    lockTitle.textContent = '🎉 ยินดีด้วยที่พิชิตเกาะ A1 ครบ 20 ด่าน!';
    lockBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 0.75rem;">
        <span style="font-size: 2.75rem;">🏆📸</span>
      </div>
      <p>คุณเก่งมากที่ผ่านด่านปูพื้นฐาน A1 ครบทั้ง <strong>20 ด่าน</strong> แล้วครับ! 👏</p>
      <div style="background: #ecfdf5; border: 2px dashed #10b981; border-radius: 12px; padding: 12px 16px; margin: 12px 0;">
        <p style="margin: 0; font-weight: 700; color: #065f46; font-size: 0.95rem;">
          🎁 สิทธิ์พิเศษ: ปลดล็อกระดับ A2 ให้เรียนฟรีต่อทันที!
        </p>
        <p style="margin: 6px 0 0; font-size: 0.875rem; color: #047857; line-height: 1.5;">
          1. แคปภาพหน้าจอนี้ (ที่มีสถิติผ่าน A1 ครบ 20 ด่าน)<br/>
          2. ส่งรูปให้พี่ปิ๊กทาง LINE หรือช่องทางที่ติดต่อเรียน<br/>
          3. พี่ปิ๊กจะตรวจสอบและกดเปิดระดับ A2 ในระบบให้ฟรีทันทีครับ!
        </p>
      </div>
    `;
  } else if ((level === 'B1' || level === 'B2') && isA2Cleared && !isFull) {
    // Free tier finished A2: Pitch Full Tier for high-school & university entrance (Option 1)
    lockTitle.textContent = '🎓 ก้าวสู่ระดับ B1 & B2 กับ Full Tier';
    lockBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 0.75rem;">
        <span style="font-size: 2.75rem;">🌟💎</span>
      </div>
      <p>คุณพิชิตหลักสูตรพื้นฐาน (A1 + A2) ครบถ้วน <strong>40 ด่าน</strong> แล้ว พื้นฐานภาษาอังกฤษของคุณแน่นระดับสื่อสารคล่องแล้วครับ! 👏</p>
      <div style="background: #fdf4ff; border: 2px solid #d946ef; border-radius: 12px; padding: 12px 16px; margin: 12px 0;">
        <p style="margin: 0; font-weight: 700; color: #86198f; font-size: 0.95rem;">
          ⭐ สมัครเรียนต่อระดับ B1 & B2 (Full Tier)
        </p>
        <p style="margin: 6px 0 0; font-size: 0.875rem; color: #701a75; line-height: 1.5;">
          • ตะลุยโจทย์เตรียมสอบแข่งขัน ม.ปลาย, TCAS, TGAT 1, A-Level<br/>
          • สรุปเทคนิคไวยากรณ์เชิงลึกและข้อสอบวิเคราะห์ 40 ด่านจัดเต็ม<br/>
          • ปลดล็อกคำศัพท์ระดับสูงสำหรับเตรียมสอบเข้ามหาวิทยาลัย
        </p>
      </div>
      <p style="font-size: 0.875rem; color: #64748b; margin-top: 8px;">
        👉 สนใจสมัครเรียนติวเข้มต่อกับพี่ปิ๊ก ทัก LINE เพื่อสอบถามคอร์สเรียนหรืออัปเกรดเป็น Full Tier ได้เลยครับ!
      </p>
    `;
  } else if (isFull && prevLevel) {
    // Full tier but sequential progression requires prior level
    lockTitle.textContent = `ระดับ ${level} แนะนำให้พิชิตระดับ ${prevLevel} ก่อนครับ`;
    lockBody.innerHTML = `
      <p>คุณเป็นสมาชิกระดับ <strong>Full Tier</strong> แล้วครับ เพื่อให้การเรียนรู้ไวยากรณ์ต่อเนื่องและเห็นผลสูงสุด แนะนำลุยด่านในระดับ <strong>${prevLevel}</strong> ให้ครบก่อนนะ (ตอนนี้ผ่านแล้ว ${prevCleared}/${prevTotal} ด่าน)</p>
      <p style="font-size: 0.875rem; color: #64748b; margin-top: 8px;">
        💡 หากต้องการข้ามระดับเพื่อติวสอบทันที สามารถแจ้งพี่ปิ๊กให้ติ๊กเปิดในโปรไฟล์ได้ตลอดเวลาครับ
      </p>
    `;
  } else {
    // General locked
    lockTitle.textContent = `ระดับ ${level} ยังล็อกอยู่ครับ`;
    lockBody.innerHTML = `
      <p>ต้องพิชิตระดับ <strong>${prevLevel || 'ก่อนหน้า'}</strong> ให้ครบทุกด่านก่อนนะครับ ถึงจะสามารถปลดล็อกเข้าสู่ระดับนี้ได้ (ตอนนี้ระดับ ${prevLevel} ผ่านแล้ว ${prevCleared}/${prevTotal} ด่าน) สู้ๆ นะครับ! ✨</p>
      <p style="font-size: 0.875rem; color: #64748b;">(หรือสามารถทักหาพี่ปิ๊กเพื่อสอบถามข้อมูลเพิ่มเติมได้ตลอดเวลาครับ)</p>
    `;
  }

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

  // คำนวณระดับที่ผู้เรียนผ่านสมบูรณ์ครบทุกด่าน
  const clearedLevels = [];
  for (const lvl of LEVEL_ORDER) {
    const key = `${skill}|${lvl}`;
    const total = groups.get(key) || 20;
    const cleared = clearsByLevel.get(lvl) ?? 0;
    if (cleared >= total && total > 0) {
      clearedLevels.push(lvl);
    }
  }

  for (let i = 0; i < LEVEL_ORDER.length; i += 1) {
    const level = LEVEL_ORDER[i];
    const prevLevel = i > 0 ? LEVEL_ORDER[i - 1] : null;
    const meta = ISLAND_METADATA[level];
    const key = `${skill}|${level}`;
    const totalStages = groups.get(key) || 20;
    const clearedStages = clearsByLevel.get(level) ?? 0;
    const stars = starsByLevel.get(level) ?? 0;
    const maxStars = totalStages * 3;
    const progressPct = Math.min(100, Math.round((clearedStages / totalStages) * 100));

    const prevKey = prevLevel ? `${skill}|${prevLevel}` : '';
    const prevTotal = prevLevel ? (groups.get(prevKey) || 20) : 0;
    const prevCleared = prevLevel ? (clearsByLevel.get(prevLevel) ?? 0) : 0;

    const allowed = isLevelAllowed(userDoc, level, clearedLevels);
    const isFree = userDoc?.tier !== 'full' && userDoc?.role !== 'admin';

    let pillMarkup = '';
    if (allowed) {
      if (level === 'A1' && isFree) {
        pillMarkup = '<span class="island-free-pill">ทดลองเล่นฟรี ✨</span>';
      }
    } else {
      if (level === 'A2' && clearedLevels.includes('A1') && isFree) {
        pillMarkup = '<span class="island-free-pill" style="background: #fef08a; color: #854d0e; border: 1px solid #facc15;">🎁 แคปส่งครูปลดฟรี!</span>';
      } else if ((level === 'B1' || level === 'B2') && clearedLevels.includes('A2') && isFree) {
        pillMarkup = '<span class="island-free-pill" style="background: #f3e8ff; color: #7e22ce; border: 1px solid #d8b4fe;">⭐ Full Tier สมัครเรียน</span>';
      }
    }

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
        ${pillMarkup}
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
              : (level === 'A2' && clearedLevels.includes('A1') && isFree)
                ? `<button type="button" class="btn-chunky island-btn" style="background: #eab308; border-bottom-color: #ca8a04;">🎁 แคปหน้าจอปลดล็อก A2 ฟรี</button>`
                : (level === 'B1' && clearedLevels.includes('A2') && isFree)
                  ? `<button type="button" class="btn-chunky island-btn" style="background: #9333ea; border-bottom-color: #7e22ce;">⭐ สมัคร Full Tier ลุยต่อ</button>`
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
        openLockDialog(level, {
          userDoc,
          clearedLevels,
          clearedStages,
          totalStages,
          prevLevel,
          prevCleared,
          prevTotal,
        });
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
