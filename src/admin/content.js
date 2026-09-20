import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { contentLibraryConstraints } from '../lib/queries.js';
import { fetchContent, updateContentItem, publishItems } from '../lib/admin-content-io.js';
import { buildContentUpdate, previewLines } from '../lib/admin-content.js';
import { LEVELS } from '../lib/schema/taxonomy.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/content.html', import.meta.env.BASE_URL);

const list = document.getElementById('content-list');
const status = document.getElementById('content-status');
const skillFilter = document.getElementById('filter-skill');
const levelFilter = document.getElementById('filter-level');
const statusFilter = document.getElementById('filter-status');
const publishAllButton = document.getElementById('publish-all');

let items = [];

for (const skill of ['grammar', 'vocab', 'writing', 'dialogue']) {
  skillFilter.appendChild(new Option(skill, skill));
}
for (const level of LEVELS) {
  levelFilter.appendChild(new Option(level, level));
}

function headingText(item) {
  return `${item.skill} ${item.level} · ${item.type} — ${item.reviewStatus}`;
}

function renderItem(item) {
  const li = document.createElement('li');
  li.className = 'content-item';

  const heading = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = headingText(item);
  heading.appendChild(strong);
  li.appendChild(heading);

  const preview = document.createElement('div');
  preview.className = 'content-preview';
  for (const line of previewLines(item)) {
    const p = document.createElement('p');
    p.textContent = line;
    preview.appendChild(p);
  }
  li.appendChild(preview);

  const form = document.createElement('form');
  form.innerHTML = `
    <label>โจทย์ <textarea name="prompt" rows="2"></textarea></label>
    <label>ตัวเลือก (คั่นด้วยจุลภาค) <input name="choices" type="text" /></label>
    <label>เฉลย (คั่นด้วยจุลภาค) <input name="answerKey" type="text" /></label>
    <label>เกณฑ์ให้คะแนน <input name="rubric" type="text" /></label>
    <label>tags (คั่นด้วยจุลภาค) <input name="tags" type="text" /></label>
    <label><input name="isPreview" type="checkbox" /> ให้คนที่ยังไม่จ่ายเห็นเป็นตัวอย่าง</label>
    <p>
      <button type="submit">บันทึกการแก้ไข</button>
      <button type="button" data-action="publish">อนุมัติ (published)</button>
      <button type="button" data-action="unpublish">ตีกลับเป็น draft</button>
    </p>
    <p class="field-error" data-role="error" aria-live="polite"></p>
  `;

  form.elements.prompt.value = item.prompt ?? '';
  form.elements.choices.value = (item.choices ?? []).join(', ');
  form.elements.answerKey.value = (item.answerKey ?? []).join(', ');
  form.elements.rubric.value = item.rubric ?? '';
  form.elements.tags.value = (item.tags ?? []).join(', ');
  form.elements.isPreview.checked = Boolean(item.isPreview);

  const errorBox = form.querySelector('[data-role="error"]');

  function refreshPreview() {
    preview.replaceChildren();
    for (const line of previewLines(item)) {
      const p = document.createElement('p');
      p.textContent = line;
      preview.appendChild(p);
    }
    strong.textContent = headingText(item);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const result = buildContentUpdate(item, {
      prompt: form.elements.prompt.value,
      choices: form.elements.choices.value,
      answerKey: form.elements.answerKey.value,
      rubric: form.elements.rubric.value,
      tags: form.elements.tags.value,
      isPreview: form.elements.isPreview.checked,
    });

    if (!result.ok) {
      errorBox.textContent = result.errors.map((error) => `${error.field}: ${error.message}`).join(' • ');
      return;
    }

    try {
      await updateContentItem(db, 'exercises', item.id, result.update);
      Object.assign(item, result.update);
      refreshPreview();
      errorBox.textContent = 'บันทึกแล้ว';
    } catch (error) {
      console.error(error);
      errorBox.textContent = 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง';
    }
  });

  form.addEventListener('click', async (event) => {
    const action = event.target.dataset?.action;
    if (!action) return;
    const reviewStatus = action === 'publish' ? 'published' : 'draft';
    try {
      await updateContentItem(db, 'exercises', item.id, { reviewStatus });
      item.reviewStatus = reviewStatus;
      refreshPreview();
      errorBox.textContent = `เปลี่ยนสถานะเป็น ${reviewStatus} แล้ว`;
    } catch (error) {
      console.error(error);
      errorBox.textContent = 'เปลี่ยนสถานะไม่สำเร็จ';
    }
  });

  li.appendChild(form);
  return li;
}

async function load() {
  status.textContent = 'กำลังโหลด…';
  list.replaceChildren();
  try {
    items = await fetchContent(
      db,
      'exercises',
      contentLibraryConstraints({
        reviewStatus: statusFilter.value,
        skill: skillFilter.value,
        level: levelFilter.value,
      }),
    );
    status.textContent = `พบ ${items.length} ข้อ`;
    publishAllButton.disabled = items.length === 0 || statusFilter.value === 'published';
    for (const item of items) list.appendChild(renderItem(item));
  } catch (error) {
    console.error(error);
    showPageError('โหลดคลังเนื้อหาไม่สำเร็จ — ถ้าเพิ่งเพิ่ม index ใหม่ รอสักครู่แล้วลองอีกครั้ง');
  }
}

publishAllButton.addEventListener('click', async () => {
  publishAllButton.disabled = true;
  try {
    await publishItems(
      db,
      'exercises',
      items.map((item) => item.id),
    );
    status.textContent = `อนุมัติแล้ว ${items.length} ข้อ`;
    await load();
  } catch (error) {
    console.error(error);
    status.textContent = 'อนุมัติไม่สำเร็จ ลองใหม่อีกครั้ง';
    publishAllButton.disabled = false;
  }
});

document.getElementById('filter-apply').addEventListener('click', load);

requireAdmin(() => {
  load();
});
