import { requireAdmin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { fetchStages, saveStage } from '../lib/stage-io.js';
import { publishItems } from '../lib/admin-content-io.js';
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
const banner = document.getElementById('banner');

function showBanner(message) {
  banner.textContent = message;
  banner.hidden = false;
}

// อนุมัติด่านเดียว — ทำตามรูปแบบเดียวกับปุ่ม "อนุมัติ" ในคลังเนื้อหา (content.js):
// ป้ายเดียวกัน, disable เมื่ออนุมัติแล้ว, แสดง banner แล้วโหลดรายการใหม่ทั้งชุดให้เห็นสถานะล่าสุดทันที
async function publishStage(stageId) {
  try {
    await publishItems(db, 'stages', [stageId]);
    showBanner('อนุมัติแล้ว');
    await reload();
  } catch (error) {
    console.error(error);
    showBanner('ทำรายการไม่สำเร็จ ลองใหม่อีกครั้ง');
  }
}

// fetchStages เรียง order ให้แล้วผ่าน buildQuery (orderBy: 'order' asc) — ไม่ต้องเรียงซ้ำที่นี่
function render(stages, status, anyFilterActive) {
  const shown = status ? stages.filter((stage) => stage.reviewStatus === status) : stages;
  list.replaceChildren();

  if (shown.length === 0) {
    // skill/level กรองที่ fetchStages (server-side) ส่วน status กรองด้านบนนี้ — ต้องเช็กทั้งสามอย่าง
    // ไม่ใช่แค่ status ไม่งั้นเคส "มีด่านอยู่แต่กรองแล้วไม่ตรงสักด่าน" จะโชว์ข้อความ first-run ผิด ๆ
    count.textContent = anyFilterActive ? 'ไม่พบด่านที่ตรงกับตัวกรอง' : 'ยังไม่มีด่าน';
    const empty = document.createElement('li');
    empty.className = 'hint';
    empty.textContent = anyFilterActive
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
    const hasTags = Array.isArray(stage.tags) && stage.tags.length > 0;
    const tagNotice = hasTags ? ` · ${stage.tags.length} แท็ก` : ' · ⚠️ ยังไม่มีแท็ก (กดเพื่อเลือก)';
    meta.textContent = ` — ${stage.skill} ${stage.level} · ${stage.drawCount ?? 0} ข้อต่อรอบ${tagNotice} · ${stage.reviewStatus}`;
    if (!hasTags) meta.style.color = 'var(--color-error)';
    item.appendChild(meta);

    const actions = document.createElement('p');
    actions.className = 'content-actions';
    const publish = document.createElement('button');
    publish.type = 'button';
    publish.textContent = 'อนุมัติ';
    publish.disabled = stage.reviewStatus === 'published';
    publish.addEventListener('click', () => publishStage(stage.id));
    actions.appendChild(publish);
    item.appendChild(actions);

    list.appendChild(item);
  }
}

const PILOT_CONFIGS = [
  { order: 1, title: 'Past Simple (Part 1: สร้างความคุ้นเคย)', tags: ['grammar:past-simple'], drawCount: 7, minSentenceBuilders: 1 },
  { order: 2, title: 'Past Simple (Part 2: ท้าทายขึ้น)', tags: ['grammar:past-simple'], drawCount: 7, minSentenceBuilders: 2 },
  { order: 3, title: 'Past Continuous (Part 1: สร้างความคุ้นเคย)', tags: ['grammar:past-continuous'], drawCount: 7, minSentenceBuilders: 1 },
  { order: 4, title: 'Past Continuous (Part 2: ท้าทายขึ้น)', tags: ['grammar:past-continuous'], drawCount: 7, minSentenceBuilders: 2 },
  { order: 5, title: 'Present Perfect (Part 1: สร้างความคุ้นเคย)', tags: ['grammar:present-perfect'], drawCount: 7, minSentenceBuilders: 1 },
  { order: 6, title: 'Present Perfect (Part 2: ท้าทายขึ้น)', tags: ['grammar:present-perfect'], drawCount: 7, minSentenceBuilders: 2 },
  { order: 7, title: 'Future Forms (Part 1: สร้างความคุ้นเคย)', tags: ['grammar:future-going-to-will'], drawCount: 7, minSentenceBuilders: 1 },
  { order: 8, title: 'Future Forms (Part 2: ท้าทายขึ้น)', tags: ['grammar:future-going-to-will'], drawCount: 7, minSentenceBuilders: 2 },
  { order: 9, title: '⚔️ มินิบอสประลอง 4 Tenses (Part 1: ด่านวัดความแม่นยำ)', tags: ['grammar:past-simple', 'grammar:past-continuous', 'grammar:present-perfect', 'grammar:future-going-to-will'], drawCount: 7, minSentenceBuilders: 1 },
  { order: 10, title: '👑 มินิบอสประลอง 4 Tenses (Part 2: ศึกตัดสินจ้าวแห่งกาลเวลา)', tags: ['grammar:past-simple', 'grammar:past-continuous', 'grammar:present-perfect', 'grammar:future-going-to-will'], drawCount: 7, minSentenceBuilders: 2 },
];

const fixBtn = document.getElementById('fix-pilot-stages');
if (fixBtn) {
  fixBtn.addEventListener('click', async () => {
    fixBtn.disabled = true;
    showBanner('กำลังอัปเกรด 10 ด่าน Tenses Saga สู่ระบบ Pool...');
    try {
      const allStages = await fetchStages(db, { publishedOnly: false });
      for (const config of PILOT_CONFIGS) {
        const match = allStages.find((s) => s.order === config.order);
        const now = new Date().toISOString();
        const stageData = {
          skill: 'grammar',
          level: 'A2',
          order: config.order,
          title: config.title,
          tags: config.tags,
          drawCount: config.drawCount,
          minSentenceBuilders: config.minSentenceBuilders,
          passThreshold: 0.7,
          isPreview: false,
          reviewStatus: 'published',
          createdAt: match?.createdAt ?? now,
          updatedAt: now,
          createdBy: match?.createdBy ?? currentAdminUid ?? 'admin',
        };
        await saveStage(db, match?.id, stageData);
      }
      showBanner('✅ อัปเกรดและอนุมัติ 10 ด่าน Tenses Saga เรียบร้อยแล้ว! สามารถเข้าเล่นได้ทันที');
      await reload();
    } catch (err) {
      console.error(err);
      showBanner('❌ เกิดข้อผิดพลาดในการอัปเกรด: ' + (err.message ?? err));
    } finally {
      fixBtn.disabled = false;
    }
  });
}

let currentAdminUid = null;

async function reload() {
  count.textContent = 'กำลังโหลด…';
  list.replaceChildren();
  const skill = document.getElementById('filter-skill').value;
  const level = document.getElementById('filter-level').value;
  const status = document.getElementById('filter-status').value;
  try {
    const stages = await fetchStages(db, {
      skill: skill || undefined,
      level: level || undefined,
      publishedOnly: false,
    });
    render(stages, status, Boolean(skill || level || status));
  } catch (error) {
    count.textContent = '';
    showPageError('โหลดรายการด่านไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
}

for (const id of ['filter-skill', 'filter-level', 'filter-status']) {
  document.getElementById(id).addEventListener('change', reload);
}

requireAdmin((firebaseUser) => {
  currentAdminUid = firebaseUser?.uid;
  reload();
});
