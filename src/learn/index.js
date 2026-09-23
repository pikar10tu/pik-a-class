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
  if (level === 'B1' || level === 'B2') {
    lockTitle.textContent = `ระดับ ${level} กำลังเตรียมเนื้อหาครับ`;
    lockBody.innerHTML = `
      <p>เนื้อหาและแบบฝึกหัดระดับ <strong>${level}</strong> กำลังอยู่ระหว่างการจัดทำครับ</p>
      <p>แนะนำให้ฝึกฝนระดับ <strong>A1 และ A2</strong> ให้คล่องก่อนได้เลยครับ รอติดตามได้เร็วๆ นี้!</p>
    `;
  } else {
    lockTitle.textContent = `ระดับ ${level} ยังไม่ได้เปิดนะครับ`;
    lockBody.innerHTML = `
      <p>ตอนนี้ระบบเปิดให้ลองเล่นระดับ <strong>A1 ได้ฟรีครบทุกด่าน</strong> เลยครับ</p>
      <p>ถ้าเล่นจบ A1 แล้ว หรืออยากปลดล็อกระดับ ${level} ลุยต่อ ทักหาพี่ปิ๊กได้เลยครับ เดี๋ยวเปิดให้!</p>
    `;
  }
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

  const isEmpty = groups.size === 0;
  const emptyBox = document.getElementById('empty-box');
  const emptyNote = document.getElementById('empty-note');
  const adminDraftHint = document.getElementById('admin-draft-hint');
  const goAdminStages = document.getElementById('go-admin-stages');

  if (emptyBox) emptyBox.hidden = !isEmpty;
  if (emptyNote) {
    emptyNote.hidden = !isEmpty;
    if (isEmpty) {
      emptyNote.textContent = tier === 'full' ? EMPTY_MESSAGE_FULL : EMPTY_MESSAGE_FREE;
    }
  }

  if (isEmpty && isUserAdmin && adminDraftHint && goAdminStages) {
    goAdminStages.href = `${base}admin/stages.html`;
    adminDraftHint.hidden = false;
  }

  // 1. ระดับที่มีอยู่ในระบบ (เช่น A1, A2)
  for (const [key, count] of groups) {
    const [skill, level] = key.split('|');
    const allowed = isLevelAllowed(userDoc, level);
    const button = document.createElement('button');
    button.type = 'button';
    if (allowed) {
      button.className = 'btn-chunky';
      const freeBadge = level === 'A1' && userDoc?.tier !== 'full' && userDoc?.role !== 'admin' ? ' (เล่นฟรี ✨)' : '';
      button.textContent = `${SKILL_LABELS[skill] ?? skill} · ระดับ ${level} — ${count} ด่าน${freeBadge}`;
      button.addEventListener('click', () => {
        window.location.href = `${base}learn/path.html?skill=${skill}&level=${level}`;
      });
    } else {
      button.className = 'btn-ghost';
      button.style.opacity = '0.9';
      button.textContent = `🔒 ${SKILL_LABELS[skill] ?? skill} · ระดับ ${level} (ติดต่อผู้สอนเพื่อปลดล็อก)`;
      button.addEventListener('click', () => {
        openLockDialog(level, skill);
      });
    }
    container.appendChild(button);
  }

  // 2. ป้ายสำหรับระดับ B1 และ B2 (เตรียมพร้อมไว้ ล็อกไว้ก่อน)
  const existingLevels = new Set([...groups.keys()].map(k => k.split('|')[1]));
  for (const futureLevel of ['B1', 'B2']) {
    if (!existingLevels.has(futureLevel)) {
      const futureBtn = document.createElement('button');
      futureBtn.type = 'button';
      futureBtn.className = 'btn-ghost';
      futureBtn.style.opacity = '0.75';
      futureBtn.textContent = `🔒 ไวยากรณ์ · ระดับ ${futureLevel} (เร็วๆ นี้)`;
      futureBtn.addEventListener('click', () => {
        openLockDialog(futureLevel, 'grammar');
      });
      container.appendChild(futureBtn);
    }
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
      // ผู้เรียนทั่วไป / สมาชิกใหม่: ดึงด่าน A1 ครบ 20 ด่าน และด่าน A2 (หากได้รับสิทธิ์ใน allowedLevels หรือด่านตัวอย่าง)
      const [a1Stages, a2Stages] = await Promise.all([
        fetchStages(db, { skill: 'grammar', level: 'A1', tier: 'free', allowedLevels }),
        fetchStages(db, { skill: 'grammar', level: 'A2', tier: 'free', allowedLevels })
      ]);
      stages = [...a1Stages, ...a2Stages];
    }
    loadingNote.hidden = true;
    render(stages, tier, isUserAdmin, userDoc);
  } catch (error) {
    loadingNote.hidden = true;
    showPageError('โหลดบทเรียนไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
