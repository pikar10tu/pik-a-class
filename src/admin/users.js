import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { fetchStudents, updateStudentAdminFields } from '../lib/admin-users-io.js';
import { filterStudents, parseGroupTags } from '../lib/admin-users.js';
import { GRADES } from '../lib/schema/users.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/users.html', import.meta.env.BASE_URL);

let allStudents = [];
let editingUid = null;

const rows = document.getElementById('student-rows');
const countLabel = document.getElementById('student-count');
const gradeFilter = document.getElementById('filter-grade');
const groupFilter = document.getElementById('filter-group');
const searchFilter = document.getElementById('filter-search');
const dialog = document.getElementById('edit-dialog');

for (const grade of GRADES) {
  gradeFilter.appendChild(new Option(grade, grade));
}

function currentFilters() {
  return { grade: gradeFilter.value, groupTag: groupFilter.value, search: searchFilter.value };
}

function render() {
  const visible = filterStudents(allStudents, currentFilters());
  countLabel.textContent = `แสดง ${visible.length} คน จากทั้งหมด ${allStudents.length} คน`;
  rows.replaceChildren();

  for (const student of visible) {
    const tr = document.createElement('tr');
    const nicknameTd = document.createElement('td');
    nicknameTd.textContent = student.nickname ?? '';
    if (student.callName) {
      const badge = document.createElement('span');
      badge.style.cssText = 'display: inline-block; margin-left: 6px; font-size: 0.75rem; padding: 2px 7px; border-radius: 999px; background: #e0f2fe; color: #0284c7; font-weight: 500;';
      badge.textContent = student.callName;
      nicknameTd.appendChild(badge);
    }
    tr.appendChild(nicknameTd);

    const fullNameTd = document.createElement('td');
    fullNameTd.textContent = student.fullName ?? '';
    tr.appendChild(fullNameTd);

    const gradeTd = document.createElement('td');
    gradeTd.textContent = student.grade ?? '';
    tr.appendChild(gradeTd);

    const tierTd = document.createElement('td');
    tierTd.textContent = student.tier ?? '';
    tr.appendChild(tierTd);

    const levelsTd = document.createElement('td');
    const levels = student.allowedLevels ?? [];
    if (levels.length > 0) {
      for (const lvl of levels) {
        const pill = document.createElement('span');
        pill.style.cssText = 'display: inline-block; margin-right: 4px; font-size: 0.75rem; padding: 1px 6px; border-radius: 4px; background: #ecfdf5; color: #059669; font-weight: 600; border: 1px solid #a7f3d0;';
        pill.textContent = lvl;
        levelsTd.appendChild(pill);
      }
    } else if (student.tier === 'full') {
      const allPill = document.createElement('span');
      allPill.style.cssText = 'display: inline-block; font-size: 0.75rem; padding: 1px 6px; border-radius: 4px; background: #f0fdf4; color: #166534; font-weight: 500;';
      allPill.textContent = 'ทุกระดับ (All)';
      levelsTd.appendChild(allPill);
    } else {
      const freeSpan = document.createElement('span');
      freeSpan.style.cssText = 'color: var(--color-muted); font-size: 0.8125rem;';
      freeSpan.textContent = 'ฟรี (ตัวอย่าง)';
      levelsTd.appendChild(freeSpan);
    }
    tr.appendChild(levelsTd);

    const contactTd = document.createElement('td');
    contactTd.textContent = [student.phone, student.lineId].filter(Boolean).join(' / ');
    tr.appendChild(contactTd);

    const groupTd = document.createElement('td');
    groupTd.textContent = (student.groupTags ?? []).join(', ');
    tr.appendChild(groupTd);

    const actionCell = document.createElement('td');
    actionCell.style.cssText = 'white-space: nowrap;';

    const reportLink = document.createElement('a');
    reportLink.href = `./student-report.html?uid=${encodeURIComponent(student.uid)}`;
    reportLink.style.cssText = 'display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; margin-right: 6px; font-size: 0.8125rem; font-weight: 500; border-radius: 6px; background: #6366f1; color: white; text-decoration: none;';
    reportLink.textContent = '📊 รายงาน';
    actionCell.appendChild(reportLink);

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'แก้ไข';
    button.addEventListener('click', () => openEditor(student));
    actionCell.appendChild(button);
    tr.appendChild(actionCell);
    rows.appendChild(tr);
  }
}

function refreshGroupOptions() {
  const selected = groupFilter.value;
  const tags = [...new Set(allStudents.flatMap((student) => student.groupTags ?? []))].sort();
  groupFilter.replaceChildren(new Option('ทั้งหมด', ''));
  for (const tag of tags) groupFilter.appendChild(new Option(tag, tag));
  if (tags.includes(selected)) groupFilter.value = selected;
}

function openEditor(student) {
  editingUid = student.id;
  document.getElementById('edit-title').textContent = `${student.nickname || student.fullName} (${student.email})`;
  document.getElementById('edit-tier').value = student.tier;
  document.getElementById('edit-call-name').value = student.callName ?? '';
  const allowed = student.allowedLevels ?? [];
  for (const cb of document.querySelectorAll('input[name="allowed-level"]')) {
    cb.checked = allowed.includes(cb.value);
  }
  document.getElementById('edit-tier-note').value = student.tierNote ?? '';
  document.getElementById('edit-group-tags').value = (student.groupTags ?? []).join(', ');
  document.getElementById('edit-error').textContent = '';
  dialog.showModal();
}

document.getElementById('edit-form').addEventListener('submit', async (event) => {
  if (event.submitter?.value !== 'save') return;
  event.preventDefault();

  const checkedLevels = Array.from(document.querySelectorAll('input[name="allowed-level"]:checked')).map((cb) => cb.value);

  const fields = {
    tier: document.getElementById('edit-tier').value,
    callName: document.getElementById('edit-call-name').value.trim(),
    allowedLevels: checkedLevels,
    tierNote: document.getElementById('edit-tier-note').value.trim(),
    groupTags: parseGroupTags(document.getElementById('edit-group-tags').value),
  };

  try {
    await updateStudentAdminFields(db, editingUid, fields);
    const student = allStudents.find((item) => item.id === editingUid);
    Object.assign(student, fields);
    refreshGroupOptions();
    render();
    dialog.close();
  } catch (error) {
    console.error(error);
    document.getElementById('edit-error').textContent = 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง';
  }
});

for (const input of [gradeFilter, groupFilter, searchFilter]) {
  input.addEventListener('input', render);
}

requireAdmin(async () => {
  try {
    allStudents = await fetchStudents(db);
    refreshGroupOptions();
    render();
  } catch (error) {
    console.error(error);
    showPageError('โหลดรายชื่อนักเรียนไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง');
  }
});
