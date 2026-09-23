import { requireLogin, isAdmin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStages } from '../lib/stage-io.js';
import { readTier } from '../lib/queries.js';
import { isLevelAllowed } from '../lib/user-profile.js';
import { mascotSrc } from '../lib/mascot.js';
import { showPageError } from '../lib/page-error.js';
import { attachUiSounds } from '../lib/ui-sound.js';

const base = import.meta.env.BASE_URL;
const SKILL_LABELS = { grammar: 'ไวยากรณ์', vocab: 'คำศัพท์', dialogue: 'บทสนทนา' };

const EMPTY_MESSAGE_FULL = 'ยังไม่มีบทเรียนที่เปิดให้เล่นตอนนี้ครับ';
const EMPTY_MESSAGE_FREE = 'บัญชีนี้ยังไม่ได้รับสิทธิ์ดูบทเรียนตอนนี้ครับ สามารถติดต่อผู้สอนเพื่อขอรับสิทธิ์ได้เลยครับ';

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

function openLockDialog(level, skill) {
  if (!lockDialog) return;
  lockTitle.textContent = `ระดับ ${level} เปิดให้ผู้เรียน Full Tier ครับ`;
  lockBody.innerHTML = `
    <p>ตอนนี้ระบบเปิดให้ทดลองเล่นระดับ <strong>A1 ฟรีครบทั้ง 20 ด่าน</strong> เลยครับ</p>
    <p>สำหรับเนื้อหาระดับ <strong>${level}</strong> (20 ด่าน พร้อมบทเรียนสรุปและบอสใหญ่) เปิดให้นักเรียนระดับ Full Tier หรือผู้ที่ได้รับสิทธิ์พิเศษ</p>
    <p>หากสนใจปลดล็อกระดับ ${level} เพื่อลุยต่อ ทักหาพี่ปิ๊กได้เลยครับ เดี๋ยวเปิดสิทธิ์ให้ทันที!</p>
  `;
  lockDialog.showModal();
}

function render(stages, tier, isUserAdmin, userDoc) {
  const groups = new Map();
  for (const stage of stages) {
    const key = `${stage.skill}|${stage.level}`;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }

  const container = document.getElementById('choices');
  container.replaceChildren();

  // จัดเรียงระดับมาตรฐาน CEFR อย่างแน่นอน: A1 -> A2 -> B1 -> B2
  const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2'];
  const skill = 'grammar';

  for (const level of LEVEL_ORDER) {
    const key = `${skill}|${level}`;
    const count = groups.get(key) || 20;
    const allowed = isLevelAllowed(userDoc, level);
    const button = document.createElement('button');
    button.type = 'button';

    if (allowed) {
      button.className = 'btn-chunky';
      const freeBadge = level === 'A1' && userDoc?.tier !== 'full' && userDoc?.role !== 'admin' ? ' (เล่นฟรี ✨)' : '';
      button.textContent = `${SKILL_LABELS[skill]} · ระดับ ${level} — ${count} ด่าน${freeBadge}`;
      button.addEventListener('click', () => {
        window.location.href = `${base}learn/path.html?skill=${skill}&level=${level}`;
      });
    } else {
      button.className = 'btn-ghost';
      button.style.opacity = '0.9';
      button.textContent = `🔒 ${SKILL_LABELS[skill]} · ระดับ ${level} (ติดต่อผู้สอนเพื่อปลดล็อก)`;
      button.addEventListener('click', () => {
        openLockDialog(level, skill);
      });
    }

    container.appendChild(button);
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
    if (tier === 'full' || isUserAdmin) {
      stages = await fetchStages(db, { tier, allowedLevels });
    } else {
      // ดึงข้อมูลด่านของทุกระดับ (A1–B2) สำหรับการแสดงผล
      const [a1Stages, a2Stages, b1Stages, b2Stages] = await Promise.all([
        fetchStages(db, { skill: 'grammar', level: 'A1', tier: 'free', allowedLevels }),
        fetchStages(db, { skill: 'grammar', level: 'A2', tier: 'free', allowedLevels }),
        fetchStages(db, { skill: 'grammar', level: 'B1', tier: 'free', allowedLevels }),
        fetchStages(db, { skill: 'grammar', level: 'B2', tier: 'free', allowedLevels }),
      ]);
      stages = [...a1Stages, ...a2Stages, ...b1Stages, ...b2Stages];
    }
    loadingNote.hidden = true;
    render(stages, tier, isUserAdmin, userDoc);
  } catch (error) {
    loadingNote.hidden = true;
    showPageError('โหลดบทเรียนไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
