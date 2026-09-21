import { requireAdmin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { fetchStage, saveStage } from '../lib/stage-io.js';
import { fetchContent } from '../lib/admin-content-io.js';
import { contentLibraryConstraints } from '../lib/queries.js';
import { showPageError } from '../lib/page-error.js';
import { LEVELS } from '../lib/schema/taxonomy.js';
import {
  STAGE_ITEM_TYPES,
  emptyStageState,
  stageStateFromDoc,
  toggleItem,
  moveItem,
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
let library = [];
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

function libraryById() {
  return Object.fromEntries(library.map((item) => [item.id, item]));
}

function shortPrompt(item) {
  return item.prompt.length > 60 ? `${item.prompt.slice(0, 60)}…` : item.prompt;
}

function renderChosen() {
  const byId = libraryById();
  const list = document.getElementById('chosen-list');
  list.replaceChildren();

  if (state.itemIds.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'hint';
    empty.textContent = 'ยังไม่มีโจทย์ในด่านนี้ เลือกจากคลังด้านล่างเพื่อเพิ่ม';
    list.appendChild(empty);
    return;
  }

  state.itemIds.forEach((id, index) => {
    const item = document.createElement('li');
    item.className = 'chosen-item';
    const found = byId[id];
    const label = document.createElement('span');

    if (!found) {
      // อ้างถึงข้อที่ถูกลบไปแล้ว — ต้องบอกว่าเป็นข้อไหน (id) ไม่ใช่แค่บอกว่า "มีปัญหา" เฉยๆ
      label.textContent = `⚠ ไม่พบโจทย์นี้แล้ว (อาจถูกลบไปแล้ว) — id: ${id} — กด "เอาออก" เพื่อแก้`;
      label.classList.add('chosen-item-warning');
    } else if (!STAGE_ITEM_TYPES.includes(found.type)) {
      // ข้อที่ชนิดไม่ใช่ mcq/fill_blank (เช่น ถูกเปลี่ยนชนิดหลังถูกเพิ่มเข้าด่านไปแล้ว)
      label.textContent = `⚠ [${found.type}] ${shortPrompt(found)} — ชนิดนี้ใช้ในด่านไม่ได้ กด "เอาออก" เพื่อแก้`;
      label.classList.add('chosen-item-warning');
    } else {
      label.textContent = `[${found.type}] ${shortPrompt(found)}`;
    }
    item.appendChild(label);

    for (const [glyph, delta, verb] of [
      ['↑', -1, 'ขึ้น'],
      ['↓', 1, 'ลง'],
    ]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = glyph;
      button.setAttribute('aria-label', `เลื่อนข้อที่ ${index + 1} ${verb}`);
      button.disabled = index + delta < 0 || index + delta >= state.itemIds.length;
      button.addEventListener('click', () => {
        state = moveItem(state, index, delta);
        renderAll();
      });
      item.appendChild(button);
    }

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'เอาออก';
    remove.setAttribute('aria-label', `เอาข้อที่ ${index + 1} ออกจากด่าน`);
    remove.addEventListener('click', () => {
      state = toggleItem(state, id);
      renderAll();
    });
    item.appendChild(remove);
    list.appendChild(item);
  });
}

function renderLibrary() {
  const list = document.getElementById('library-list');
  list.replaceChildren();

  const pickable = library.filter((item) => STAGE_ITEM_TYPES.includes(item.type));

  if (pickable.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'hint';
    if (library.length === 0) {
      empty.append(
        `ยังไม่มีโจทย์ในคลังสำหรับสกิล "${state.skill}" ระดับ "${state.level}" เลย — `,
      );
      const link = document.createElement('a');
      link.href = `${base}admin/content.html`;
      link.textContent = 'ไปสร้างโจทย์ในคลังเนื้อหาก่อน';
      empty.appendChild(link);
    } else {
      empty.textContent =
        `มีโจทย์ในคลังสำหรับสกิล "${state.skill}" ระดับ "${state.level}" อยู่ ${library.length} ข้อ ` +
        'แต่ไม่มีข้อที่เป็นปรนัยหรือเติมคำเลย (ด่านรับได้เฉพาะสองชนิดนี้)';
    }
    list.appendChild(empty);
    return;
  }

  for (const item of pickable) {
    const row = document.createElement('li');
    const label = document.createElement('label');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = state.itemIds.includes(item.id);
    check.addEventListener('change', () => {
      state = toggleItem(state, item.id);
      renderAll();
    });
    label.appendChild(check);
    label.appendChild(
      document.createTextNode(` [${item.type}] ${shortPrompt(item)} — ${item.reviewStatus}`),
    );
    row.appendChild(label);
    list.appendChild(row);
  }
}

function renderValidation() {
  const { errors, warnings } = validateStage(state, libraryById());
  document.querySelectorAll('.field-error').forEach((el) => {
    el.textContent = '';
  });

  const leftovers = [];
  for (const [field, message] of Object.entries(errors)) {
    const el = document.querySelector(`[data-error-for="${field}"]`);
    if (el) el.textContent = message;
    else leftovers.push(message);
  }
  // เผื่อไว้เฉยๆ: ทุก key ของ errors ตอนนี้มีช่องของตัวเองในหน้าแล้ว (title, itemIds, passThreshold, reviewStatus, isPreview)
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
  document.getElementById('threshold').value = Math.round(state.passThreshold * 100);
  document.getElementById('isPreview').checked = state.isPreview;
  document.getElementById('reviewStatus').value = state.reviewStatus;
  renderChosen();
  renderLibrary();
  renderValidation();
  document.getElementById('play').hidden = !stageId;
}

async function reloadLibrary() {
  library = await fetchContent(
    db,
    'exercises',
    contentLibraryConstraints({ skill: state.skill, level: state.level }),
  );
  library = library.filter((item) => !item.deletedAt);
  renderAll();
}

document.getElementById('title').addEventListener('input', (event) => {
  state = { ...state, title: event.target.value };
  renderValidation();
});
document.getElementById('order').addEventListener('input', (event) => {
  state = { ...state, order: Number(event.target.value) || 1 };
});
document.getElementById('threshold').addEventListener('input', (event) => {
  state = { ...state, passThreshold: (Number(event.target.value) || 0) / 100 };
  renderValidation();
});
document.getElementById('isPreview').addEventListener('change', (event) => {
  state = { ...state, isPreview: event.target.checked };
  // ติ๊กช่องนี้ทั้งที่โจทย์ในด่านยังไม่เปิดให้ tier free = ด่านพังเงียบๆ ต้องเตือนทันทีที่ติ๊ก
  renderValidation();
});
document.getElementById('reviewStatus').addEventListener('change', (event) => {
  state = { ...state, reviewStatus: event.target.value };
  renderValidation();
});
for (const id of ['skill', 'level']) {
  document.getElementById(id).addEventListener('change', async (event) => {
    state = { ...state, [id]: event.target.value };
    await reloadLibrary();
  });
}

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
    await reloadLibrary();
  } catch (error) {
    console.error(error);
    showPageError('โหลดข้อมูลด่านไม่สำเร็จ กรุณาลองใหม่');
  }
});
