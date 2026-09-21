import { requireAdmin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { fetchStages } from '../lib/stage-io.js';
import { showPageError } from '../lib/page-error.js';
import { LEVELS } from '../lib/schema/taxonomy.js';

const base = import.meta.env.BASE_URL;
renderAdminNav(document.getElementById('admin-nav'), 'admin/stages.html', base);
document.getElementById('new-stage').href = `${base}admin/stage.html`;

function fillSelect(id, options) {
  const select = document.getElementById(id);
  for (const [value, label] of options) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  }
}

fillSelect('filter-skill', [['', 'ทั้งหมด'], ['grammar', 'ไวยากรณ์'], ['vocab', 'คำศัพท์'], ['dialogue', 'บทสนทนา']]);
fillSelect('filter-level', [['', 'ทั้งหมด'], ...LEVELS.map((level) => [level, level])]);
fillSelect('filter-status', [['', 'ทั้งหมด'], ['published', 'อนุมัติแล้ว'], ['draft', 'ฉบับร่าง'], ['reviewed', 'ตรวจแล้ว']]);

const list = document.getElementById('stage-list');
const count = document.getElementById('stage-count');

// fetchStages เรียง order ให้แล้วผ่าน buildQuery (orderBy: 'order' asc) — ไม่ต้องเรียงซ้ำที่นี่
function render(stages, status) {
  const shown = status ? stages.filter((stage) => stage.reviewStatus === status) : stages;
  list.replaceChildren();

  if (shown.length === 0) {
    count.textContent = 'ยังไม่มีด่าน';
    const empty = document.createElement('li');
    empty.className = 'hint';
    empty.textContent = status
      ? 'ไม่มีด่านที่ตรงกับตัวกรองนี้ ลองเปลี่ยนตัวกรอง'
      : 'ยังไม่มีด่านเลย กด "+ สร้างด่านใหม่" เพื่อเริ่มสร้างด่านแรก';
    list.appendChild(empty);
    return;
  }

  count.textContent = `ทั้งหมด ${shown.length} ด่าน`;
  for (const stage of shown) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `${base}admin/stage.html?id=${stage.id}`;
    link.textContent = `ด่าน ${stage.order} · ${stage.title}`;
    item.appendChild(link);
    const meta = document.createElement('span');
    meta.textContent = ` — ${stage.skill} ${stage.level} · ${stage.itemIds.length} ข้อ · ${stage.reviewStatus}`;
    item.appendChild(meta);
    list.appendChild(item);
  }
}

async function reload() {
  count.textContent = 'กำลังโหลด…';
  list.replaceChildren();
  try {
    const stages = await fetchStages(db, {
      skill: document.getElementById('filter-skill').value || undefined,
      level: document.getElementById('filter-level').value || undefined,
      publishedOnly: false,
    });
    render(stages, document.getElementById('filter-status').value);
  } catch (error) {
    count.textContent = '';
    showPageError('โหลดรายการด่านไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
}

for (const id of ['filter-skill', 'filter-level', 'filter-status']) {
  document.getElementById(id).addEventListener('change', reload);
}

requireAdmin(() => {
  reload();
});
