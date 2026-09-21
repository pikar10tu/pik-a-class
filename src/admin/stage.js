import { requireAdmin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { fetchStage, saveStage, fetchStagePool } from '../lib/stage-io.js';
import { showPageError } from '../lib/page-error.js';
import { LEVELS } from '../lib/schema/taxonomy.js';
import { availableTags, changeLevel } from '../lib/exercise-form.js';
import {
  emptyStageState,
  stageStateFromDoc,
  toggleTag,
  validateStage,
  buildStageDoc,
} from '../lib/stage-form.js';

const base = import.meta.env.BASE_URL;
renderAdminNav(document.getElementById('admin-nav'), 'admin/stages.html', base);
document.getElementById('back-link').href = `${base}admin/stages.html`;

const params = new URLSearchParams(window.location.search);
const stageId = params.get('id');
document.getElementById('play').hidden = !stageId;

let state = emptyStageState();
let existing = null;
let adminUid = null;
// คลังสดของด่านนี้ (ผลของ fetchStagePool ด้วยตัวกรองปัจจุบัน) — ใช้ทั้งแสดงจำนวน/ตัวอย่าง และส่งเข้า validateStage
let pool = [];
// กัน race condition: ถ้าครูสลับแท็ก/สกิล/ระดับเร็วๆ คำขอเก่าที่ตอบกลับมาช้าต้องไม่ทับผลของคำขอล่าสุด
let poolRequestId = 0;
// สแนปช็อตของ state ล่าสุดที่บันทึกสำเร็จ (หรือ state เริ่มต้นตอนโหลดหน้า) ใช้เทียบว่ามีอะไรแก้ค้างไว้
// ที่ยังไม่บันทึกหรือไม่ — ถ้ามี ต้องเตือนก่อนออกจากหน้า ไม่ให้ครูเสียงานที่แก้ไปโดยไม่รู้ตัว
let savedSnapshot = JSON.stringify(state);

const saveButton = document.getElementById('save');
const saveStatus = document.getElementById('save-status');
const formError = document.getElementById('form-error');
const banner = document.getElementById('banner');
const modeBadge = document.getElementById('mode-badge');
const stageEditor = document.getElementById('stage-editor');

function isDirty() {
  return JSON.stringify(state) !== savedSnapshot;
}

// เตือนก่อนออกจากหน้าเฉพาะตอนมีการแก้ไขที่ยังไม่บันทึก ข้อความจริงที่เห็นเป็นข้อความมาตรฐาน
// ของเบราว์เซอร์ (กำหนดเองไม่ได้แล้วในเบราว์เซอร์สมัยใหม่) แต่การเรียก preventDefault ก็เพียงพอให้เด้งเตือน
window.addEventListener('beforeunload', (event) => {
  if (!isDirty()) return;
  event.preventDefault();
  event.returnValue = '';
});

function updateModeBadge() {
  if (stageId) {
    document.title = 'แก้ด่าน — Pik a Class';
    modeBadge.textContent = 'กำลังแก้ไขด่านที่มีอยู่แล้ว — กดบันทึกเพื่อเขียนทับด่านนี้';
  } else {
    document.title = 'สร้างด่านใหม่ — Pik a Class';
    modeBadge.textContent = 'กำลังสร้างด่านใหม่ — ยังไม่ถูกบันทึกจนกว่าจะกดบันทึก';
  }
}
updateModeBadge();

if (params.get('saved') === '1') {
  banner.textContent = 'บันทึกด่านนี้แล้ว';
  banner.hidden = false;
}

function fillSelect(id, options) {
  const select = document.getElementById(id);
  for (const [value, label] of options) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  }
}

// รายชื่อสกิลนี้คือ enum ของ stagesSchema (src/lib/schema/stages.js) ซึ่งแคบกว่าของ exercise
// (ไม่มี 'writing' เพราะข้อเขียนเรียงความให้คะแนนอัตโนมัติไม่ได้ จึงเข้าด่านไม่ได้อยู่แล้ว)
fillSelect('skill', [
  ['grammar', 'ไวยากรณ์'],
  ['vocab', 'คำศัพท์'],
  ['dialogue', 'บทสนทนา'],
]);
fillSelect('level', LEVELS.map((level) => [level, level]));
fillSelect('reviewStatus', [
  ['draft', 'ฉบับร่าง'],
  ['reviewed', 'ตรวจแล้ว'],
  ['published', 'อนุมัติแล้ว'],
]);

function shortPrompt(item) {
  return item.prompt.length > 60 ? `${item.prompt.slice(0, 60)}…` : item.prompt;
}

// เหมือน renderTagPicker ใน src/admin/exercise.js ทุกประการ (กลุ่มไวยากรณ์/คำศัพท์ กรองด้วยระดับ)
// ตั้งใจให้เหมือนกัน เพราะเป็นชุดแท็กเดียวกันจาก taxonomy เดียวกัน ครูไม่ต้องเรียนรู้ UI สองแบบ
function renderTagList() {
  const container = document.getElementById('tag-list');
  container.replaceChildren();
  const tags = availableTags(state.level);

  for (const skill of ['grammar', 'vocab']) {
    const group = tags.filter((tag) => tag.skill === skill);
    if (group.length === 0) continue;

    const box = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = skill === 'grammar' ? 'ไวยากรณ์' : 'คำศัพท์';
    box.appendChild(heading);

    for (const tag of group) {
      const label = document.createElement('label');
      label.className = 'tag-option';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = state.tags.includes(tag.id);
      input.addEventListener('change', () => {
        state = toggleTag(state, tag.id);
        renderValidation();
        void refreshPool();
      });
      label.append(input, document.createTextNode(` ${tag.label} (${tag.level})`));
      box.appendChild(label);
    }
    container.appendChild(box);
  }

  if (container.children.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'hint';
    empty.textContent = `ยังไม่มีแท็กสำหรับระดับ "${state.level}" ในระบบ`;
    container.appendChild(empty);
  }
}

function renderPoolSummary() {
  const summary = document.getElementById('pool-summary');
  summary.replaceChildren();

  if (state.tags.length === 0) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'ยังไม่ได้เลือกแท็ก — เลือกอย่างน้อย 1 อันเพื่อดูว่าคลังมีโจทย์กี่ข้อ';
    summary.appendChild(hint);
    return;
  }

  const count = document.createElement('p');
  count.textContent = `คลังนี้ตอนนี้มีโจทย์ที่ใช้ในด่านได้ ${pool.length} ข้อ`;
  summary.appendChild(count);

  if (pool.length > 0) {
    const examples = document.createElement('ul');
    examples.className = 'admin-summary';
    for (const item of pool.slice(0, 3)) {
      const li = document.createElement('li');
      li.textContent = `[${item.type}] ${shortPrompt(item)}`;
      examples.appendChild(li);
    }
    summary.appendChild(examples);
  }
}

// ทุกครั้งที่ skill, level หรือ tags เปลี่ยน ต้องเรียกฟังก์ชันนี้ใหม่ — คลังของด่านนิยามด้วยตัวกรองสามตัวนี้
// ใช้ tier 'full' เสมอในหน้าแอดมิน เพราะครูต้องเห็นคลังทั้งหมดที่ด่านจะสุ่มได้ ไม่ใช่เฉพาะข้อ preview
async function refreshPool() {
  const requestId = ++poolRequestId;
  try {
    const result = await fetchStagePool(db, state, 'full');
    if (requestId !== poolRequestId) return; // มีการเปลี่ยนตัวกรองใหม่ระหว่างรอ ผลนี้เก่าแล้ว ทิ้งไป
    pool = result;
  } catch (error) {
    if (requestId !== poolRequestId) return;
    console.error(error);
    pool = [];
  }
  renderPoolSummary();
  renderValidation();
}

function renderValidation() {
  const { errors, warnings } = validateStage(state, pool);
  document.querySelectorAll('.field-error').forEach((el) => {
    el.textContent = '';
  });

  const leftovers = [];
  for (const [field, message] of Object.entries(errors)) {
    const el = document.querySelector(`[data-error-for="${field}"]`);
    if (el) el.textContent = message;
    else leftovers.push(message);
  }
  // เผื่อไว้เฉยๆ: ทุก key ของ errors ตอนนี้มีช่องของตัวเองในหน้าแล้ว (title, tags, drawCount, passThreshold)
  // ถ้าวันหน้า stage-form.js เพิ่ม error key ใหม่ที่หน้านี้ยังไม่มีช่องรองรับ อย่างน้อยข้อความจะไม่หายเงียบๆ
  formError.textContent = leftovers.join(' • ');

  const list = document.getElementById('warning-list');
  list.replaceChildren();
  for (const warning of warnings) {
    const item = document.createElement('li');
    item.textContent = `⚠️ ${warning}`;
    list.appendChild(item);
  }

  return errors;
}

function renderAll() {
  document.getElementById('title').value = state.title;
  document.getElementById('skill').value = state.skill;
  document.getElementById('level').value = state.level;
  document.getElementById('order').value = state.order;
  document.getElementById('drawCount').value = state.drawCount;
  document.getElementById('threshold').value = Math.round(state.passThreshold * 100);
  document.getElementById('isPreview').checked = state.isPreview;
  document.getElementById('reviewStatus').value = state.reviewStatus;
  renderTagList();
  renderValidation();
  renderPoolSummary();
  document.getElementById('play').hidden = !stageId;
}

document.getElementById('title').addEventListener('input', (event) => {
  state = { ...state, title: event.target.value };
  renderValidation();
});
document.getElementById('order').addEventListener('input', (event) => {
  state = { ...state, order: Number(event.target.value) || 1 };
});
document.getElementById('drawCount').addEventListener('input', (event) => {
  state = { ...state, drawCount: Number(event.target.value) || 0 };
  renderValidation();
});
document.getElementById('threshold').addEventListener('input', (event) => {
  state = { ...state, passThreshold: (Number(event.target.value) || 0) / 100 };
  renderValidation();
});
document.getElementById('isPreview').addEventListener('change', (event) => {
  state = { ...state, isPreview: event.target.checked };
  // ติ๊กช่องนี้ทั้งที่คลังยังไม่มีโจทย์ preview เลย = ด่านพังเงียบๆ สำหรับผู้ใช้ทั่วไป ต้องเตือนทันทีที่ติ๊ก
  renderValidation();
});
document.getElementById('reviewStatus').addEventListener('change', (event) => {
  state = { ...state, reviewStatus: event.target.value };
  renderValidation();
});
document.getElementById('skill').addEventListener('change', async (event) => {
  state = { ...state, skill: event.target.value };
  renderValidation();
  await refreshPool();
});
document.getElementById('level').addEventListener('change', async (event) => {
  // เหมือนที่ exercise.js ทำตอนเปลี่ยนระดับ: ตัดแท็กที่สูงกว่าระดับใหม่ทิ้ง ไม่งั้นจะเหลือแท็กที่มองไม่เห็น
  // ในรายการ (เพราะ renderTagList กรองด้วยระดับ) แต่ยังติดอยู่ใน state และถูกบันทึกไปกับด่าน
  const result = changeLevel(state, event.target.value);
  state = result.state;
  renderTagList();
  renderValidation();
  await refreshPool();
});

document.getElementById('play').addEventListener('click', () => {
  // ?from=admin บอกหน้าเล่นด่านว่าเปิดมาจากหน้าแก้ด่าน (พรีวิว) — ให้ทุกทางออกพากลับมาที่นี่
  // แทนที่จะพาครูหลุดไปหน้าเส้นทางของนักเรียนแบบย้อนกลับไม่ได้ (ดู src/learn/play.js)
  window.location.href = `${base}learn/play.html?stage=${stageId}&from=admin`;
});

saveButton.addEventListener('click', async () => {
  const errors = renderValidation();
  const valid = Object.keys(errors).length === 0;
  if (!valid) {
    saveStatus.textContent = 'ยังบันทึกไม่ได้ กรุณาแก้ไขตามข้อความที่แจ้งไว้ข้างบนก่อน';
    return;
  }

  saveStatus.textContent = 'กำลังบันทึก…';
  saveButton.disabled = true;
  try {
    const nextDoc = buildStageDoc(state, { existing, adminUid });
    const id = await saveStage(db, stageId, nextDoc);
    // อัปเดตสแนปช็อตก่อน navigate เพื่อไม่ให้ beforeunload เด้งเตือน "มีการแก้ไขค้างอยู่"
    // ทั้งที่เพิ่งบันทึกสำเร็จไปหมาดๆ
    savedSnapshot = JSON.stringify(state);
    window.location.href = `${base}admin/stage.html?id=${id}&saved=1`;
  } catch (error) {
    console.error(error);
    saveStatus.textContent = '';
    saveButton.disabled = false;
    showPageError('บันทึกด่านไม่สำเร็จ (เครือข่ายขัดข้องหรือไม่มีสิทธิ์) กรุณาลองใหม่ ข้อมูลที่กรอกไว้ยังอยู่ในหน้านี้');
  }
});

requireAdmin(async (firebaseUser) => {
  adminUid = firebaseUser.uid;
  try {
    if (stageId) {
      existing = await fetchStage(db, stageId);
      if (!existing) {
        // id ใน URL ไม่มีอยู่จริง (ลบไปแล้ว/พิมพ์ผิด) — ต้องหยุดตรงนี้ ไม่ปล่อยให้ฟอร์มเปล่าๆ
        // ทำงานต่อ เพราะกดบันทึกจะกลายเป็นสร้างด่านใหม่ที่ไม่เกี่ยวข้องโดยไม่มีใครตั้งใจ
        document.getElementById('page-title').textContent = 'ไม่พบด่านนี้';
        modeBadge.textContent = '';
        stageEditor.hidden = true;
        showPageError('ไม่พบด่านนี้ในระบบ (อาจถูกลบไปแล้ว) กลับไปหน้ารายการด่านแล้วลองใหม่');
        return;
      }
      state = stageStateFromDoc(existing);
      savedSnapshot = JSON.stringify(state);
      document.getElementById('page-title').textContent = `แก้ด่าน: ${existing.title}`;
    }
    renderAll();
    await refreshPool();
  } catch (error) {
    console.error(error);
    showPageError('โหลดข้อมูลด่านไม่สำเร็จ กรุณาลองใหม่');
  }
});
