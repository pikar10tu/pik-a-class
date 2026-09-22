import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { contentLibraryConstraints } from '../lib/queries.js';
import {
  fetchContent,
  publishItems,
  trashExercise,
  restoreExercise,
  deleteExercise,
  fetchTrashedExercises,
} from '../lib/admin-content-io.js';
import { previewLines, TYPE_LABELS } from '../lib/exercise-form.js';
import { LEVELS } from '../lib/schema/taxonomy.js';
import { findOrphanExercises } from '../lib/stage-pool.js';
import { fetchStages } from '../lib/stage-io.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/content.html', import.meta.env.BASE_URL);

const base = import.meta.env.BASE_URL;
const params = new URLSearchParams(window.location.search);
let showingTrash = params.get('trash') === '1';
let visibleIds = [];

const list = document.getElementById('content-list');
const status = document.getElementById('content-status');
const heading = document.getElementById('content-heading');
const banner = document.getElementById('banner');
const filters = document.getElementById('content-filters');
const skillFilter = document.getElementById('filter-skill');
const levelFilter = document.getElementById('filter-level');
const statusFilter = document.getElementById('filter-status');
const publishAllButton = document.getElementById('publish-all');
const toggleTrashButton = document.getElementById('toggle-trash');
const dialog = document.getElementById('confirm-dialog');
const orphanNote = document.getElementById('orphan-note');

document.getElementById('new-link').href = `${base}admin/exercise.html`;

for (const skill of ['grammar', 'vocab', 'writing', 'dialogue']) {
  skillFilter.appendChild(new Option(skill, skill));
}
for (const level of LEVELS) {
  levelFilter.appendChild(new Option(level, level));
}

function showBanner(message) {
  banner.textContent = message;
  banner.hidden = false;
}

if (params.get('saved') === '1') showBanner('บันทึกโจทย์ใหม่แล้ว (สถานะ draft)');
if (params.get('trashed') === '1') showBanner('ทิ้งข้อนั้นลงถังขยะแล้ว');

function confirmAction({ title, body, okLabel }) {
  return new Promise((resolve) => {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-body').textContent = body;
    const okButton = document.getElementById('confirm-ok');
    const cancelButton = document.getElementById('confirm-cancel');
    okButton.textContent = okLabel;

    function close(result) {
      okButton.removeEventListener('click', onOk);
      cancelButton.removeEventListener('click', onCancel);
      dialog.close();
      resolve(result);
    }
    function onOk() {
      close(true);
    }
    function onCancel() {
      close(false);
    }

    okButton.addEventListener('click', onOk);
    cancelButton.addEventListener('click', onCancel);
    dialog.showModal();
  });
}

async function run(action, successMessage) {
  try {
    await action();
    showBanner(successMessage);
    await load();
  } catch (error) {
    console.error(error);
    showBanner('ทำรายการไม่สำเร็จ ลองใหม่อีกครั้ง');
  }
}

function renderItem(item) {
  const li = document.createElement('li');
  li.className = 'content-item';

  const meta = document.createElement('p');
  meta.className = 'content-meta';
  meta.textContent = `${item.reviewStatus} · ${item.skill} ${item.level} · ${TYPE_LABELS[item.type] ?? item.type}`;
  li.appendChild(meta);

  const promptLine = document.createElement('p');
  promptLine.className = 'content-prompt';
  const text = item.prompt ?? '';
  promptLine.textContent = text.length > 120 ? `${text.slice(0, 120)}…` : text;
  li.appendChild(promptLine);

  const answerLine = document.createElement('p');
  answerLine.className = 'hint';
  answerLine.textContent = previewLines(item).slice(1).join(' · ');
  li.appendChild(answerLine);

  const tagLine = document.createElement('p');
  tagLine.className = 'hint';
  tagLine.textContent = (item.tags ?? []).join(', ');
  li.appendChild(tagLine);

  const actions = document.createElement('p');
  actions.className = 'content-actions';

  if (showingTrash) {
    const restore = document.createElement('button');
    restore.type = 'button';
    restore.textContent = 'กู้คืน';
    restore.addEventListener('click', () =>
      run(() => restoreExercise(db, item.id), 'กู้คืนแล้ว ข้อนี้กลับไปอยู่ในคลังสถานะ draft'),
    );

    const purge = document.createElement('button');
    purge.type = 'button';
    purge.textContent = 'ลบถาวร';
    purge.addEventListener('click', async () => {
      const ok = await confirmAction({
        title: 'ลบถาวร',
        body: `"${item.prompt}" — ลบแล้วกู้คืนไม่ได้อีก`,
        okLabel: 'ลบถาวร',
      });
      if (!ok) return;
      await run(() => deleteExercise(db, item.id), 'ลบถาวรแล้ว');
    });

    actions.append(restore, purge);
    li.appendChild(actions);
    return li;
  }

  const edit = document.createElement('a');
  edit.href = `${base}admin/exercise.html?id=${item.id}`;
  edit.textContent = 'แก้ไข';

  const publish = document.createElement('button');
  publish.type = 'button';
  publish.textContent = 'อนุมัติ';
  publish.disabled = item.reviewStatus === 'published';
  publish.addEventListener('click', () => run(() => publishItems(db, 'exercises', [item.id]), 'อนุมัติแล้ว'));

  const trash = document.createElement('button');
  trash.type = 'button';
  trash.textContent = 'ทิ้ง';
  trash.addEventListener('click', async () => {
    const ok = await confirmAction({
      title: 'ทิ้งข้อนี้ลงถังขยะ',
      body: `"${item.prompt}" — จะหายจากคลังและนักเรียนจะไม่เห็น กู้คืนได้จากถังขยะ`,
      okLabel: 'ทิ้งลงถังขยะ',
    });
    if (!ok) return;
    await run(() => trashExercise(db, item.id), 'ทิ้งลงถังขยะแล้ว');
  });

  actions.append(edit, publish, trash);
  li.appendChild(actions);
  return li;
}

async function load() {
  status.textContent = 'กำลังโหลด…';
  if (orphanNote) orphanNote.hidden = true;
  list.replaceChildren();

  try {
    const items = showingTrash
      ? await fetchTrashedExercises(db)
      : (
          await fetchContent(
            db,
            'exercises',
            contentLibraryConstraints({
              reviewStatus: statusFilter.value,
              skill: skillFilter.value,
              level: levelFilter.value,
            }),
          )
        ).filter((item) => !item.deletedAt);

    visibleIds = items.map((item) => item.id);
    status.textContent = showingTrash ? `ในถังขยะ ${items.length} ข้อ` : `พบ ${items.length} ข้อ`;
    publishAllButton.disabled = showingTrash || items.length === 0 || statusFilter.value === 'published';

    for (const item of items) list.appendChild(renderItem(item));

    if (!showingTrash) {
      const stages = await fetchStages(db, { publishedOnly: false });
      const orphans = findOrphanExercises(stages, items);
      if (orphans.length > 0) {
        const sampleNames = orphans
          .slice(0, 3)
          .map((item) => `"${item.prompt.length > 60 ? `${item.prompt.slice(0, 60)}…` : item.prompt}"`)
          .join(', ');
        orphanNote.textContent = `พบข้อที่อนุมัติแล้วแต่ไม่มีด่านใดสุ่มได้ ${orphans.length} ข้อ (เช่น ${sampleNames}) — โปรดตรวจแท็กของข้อเหล่านี้หรือของด่าน`;
        orphanNote.hidden = false;
      } else {
        orphanNote.hidden = true;
      }
    }
  } catch (error) {
    console.error(error);
    showPageError('โหลดคลังเนื้อหาไม่สำเร็จ — ถ้าเพิ่งเพิ่ม index ใหม่ รอสักครู่แล้วลองอีกครั้ง');
  }
}

function applyView() {
  heading.textContent = showingTrash ? 'ถังขยะ' : 'คลังเนื้อหา';
  toggleTrashButton.textContent = showingTrash ? '← กลับไปคลังเนื้อหา' : 'ดูถังขยะ';
  filters.hidden = showingTrash;
  publishAllButton.hidden = showingTrash;
  if (showingTrash && orphanNote) orphanNote.hidden = true;
}

toggleTrashButton.addEventListener('click', () => {
  showingTrash = !showingTrash;
  applyView();
  load();
});

for (const input of [statusFilter, skillFilter, levelFilter]) {
  input.addEventListener('change', load);
}

publishAllButton.addEventListener('click', async () => {
  if (visibleIds.length === 0) return;
  publishAllButton.disabled = true;
  const count = visibleIds.length;
  await run(() => publishItems(db, 'exercises', visibleIds), `อนุมัติแล้ว ${count} ข้อ`);
});

requireAdmin(() => {
  applyView();
  load();
});
