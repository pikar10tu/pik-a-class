import { requireLogin, isAdmin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStages } from '../lib/stage-io.js';
import { readTier } from '../lib/queries.js';
import { mascotSrc } from '../lib/mascot.js';
import { showPageError } from '../lib/page-error.js';

const base = import.meta.env.BASE_URL;
const SKILL_LABELS = { grammar: 'ไวยากรณ์', vocab: 'คำศัพท์', dialogue: 'บทสนทนา' };

const EMPTY_MESSAGE_FULL = 'ยังไม่มีบทเรียนที่เปิดให้เล่นตอนนี้ครับ';
const EMPTY_MESSAGE_FREE = 'บัญชีนี้ยังไม่ได้รับสิทธิ์ดูบทเรียนตอนนี้ครับ ลองทักครูเพื่อขอสิทธิ์เพิ่มดูนะครับ';

document.getElementById('back-link').href = `${base}dashboard.html`;
document.getElementById('mascot').src = mascotSrc('normal', base);

function render(stages, tier, isUserAdmin) {
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

  for (const [key, count] of groups) {
    const [skill, level] = key.split('|');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-chunky';
    button.textContent = `${SKILL_LABELS[skill] ?? skill} · ระดับ ${level} — ${count} ด่าน`;
    button.addEventListener('click', () => {
      window.location.href = `${base}learn/path.html?skill=${skill}&level=${level}`;
    });
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
    const stages = await fetchStages(db, { tier });
    loadingNote.hidden = true;
    render(stages, tier, isUserAdmin);
  } catch (error) {
    loadingNote.hidden = true;
    showPageError('โหลดบทเรียนไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
