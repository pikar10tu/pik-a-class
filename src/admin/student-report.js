import html2canvas from 'html2canvas';
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { fetchStudentReportData } from '../lib/student-report-io.js';
import {
  calculateStudentOverview,
  calculateSkillBreakdown,
  calculateVocabByLevel,
  calculateStageRepetitions,
  calculateTopicStrengthsAndWeaknesses,
  formatLineSummary,
} from '../lib/student-analytics.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/users.html', import.meta.env.BASE_URL);

const loadingEl = document.getElementById('loading-state');
const errorEl = document.getElementById('error-state');
const errorMessageEl = document.getElementById('error-message');
const contentEl = document.getElementById('report-content');

const studentNameText = document.getElementById('student-name-text');
const studentGradeBadge = document.getElementById('student-grade-badge');
const reportDateText = document.getElementById('report-date-text');
const studentUidText = document.getElementById('student-uid-text');

const kpiTotalQuestions = document.getElementById('kpi-total-questions');
const kpiRepIndex = document.getElementById('kpi-rep-index');
const kpiStars = document.getElementById('kpi-stars');
const kpiStarsSub = document.getElementById('kpi-stars-sub');
const kpiAccuracy = document.getElementById('kpi-accuracy');

const skillRowsContainer = document.getElementById('skill-rows-container');
const vocabLevelsContainer = document.getElementById('vocab-levels-container');
const strengthTagsContainer = document.getElementById('strength-tags');
const weaknessTagsContainer = document.getElementById('weakness-tags');
const stageRowsTbody = document.getElementById('stage-rows-tbody');
const stagesFilterBar = document.getElementById('stages-filter-bar');

const teacherNoteInput = document.getElementById('teacher-note-input');
const btnSaveImage = document.getElementById('btn-save-image');
const btnCopyLine = document.getElementById('btn-copy-line');
const btnPrint = document.getElementById('btn-print');

let currentStudent = null;
let currentOverview = null;
let currentVocabStats = null;
let currentStrengthsAndWeaknesses = null;
let allStageRepetitions = [];
let activeFilter = 'all';

function formatThaiDate(date) {
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ];
  const d = date.getDate();
  const m = months[date.getMonth()];
  const y = date.getFullYear() + 543;
  return `${d} ${m} ${y}`;
}

requireAdmin(async () => {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid');

  if (!uid) {
    showError('ไม่ได้ระบุรหัสผู้เรียน (Missing uid parameter)');
    return;
  }

  try {
    const data = await fetchStudentReportData(db, uid);
    renderReport(data);
  } catch (err) {
    console.error(err);
    showError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
  }
});

function showError(msg) {
  loadingEl.hidden = true;
  contentEl.hidden = true;
  errorEl.hidden = false;
  errorMessageEl.textContent = msg;
}

function renderReport({ student, stageClears, submissions, stages }) {
  currentStudent = student;
  loadingEl.hidden = true;
  contentEl.hidden = false;

  const displayName = student.callName || student.nickname || student.fullName || 'ผู้เรียน';
  studentNameText.textContent = displayName;
  if (student.grade) {
    studentGradeBadge.textContent = student.grade;
  } else {
    studentGradeBadge.hidden = true;
  }
  reportDateText.textContent = `วันที่ออกรายงาน: ${formatThaiDate(new Date())}`;
  studentUidText.textContent = student.uid.slice(0, 8);

  // 1. Calculate Analytics
  currentOverview = calculateStudentOverview({ submissions, stageClears, stages });
  const skills = calculateSkillBreakdown(submissions);
  currentVocabStats = calculateVocabByLevel(submissions);
  currentStrengthsAndWeaknesses = calculateTopicStrengthsAndWeaknesses(submissions);
  allStageRepetitions = calculateStageRepetitions({ stageClears, stages });

  // 2. Render KPIs
  kpiTotalQuestions.textContent = currentOverview.totalQuestionsAnswered.toLocaleString();
  kpiRepIndex.textContent = currentOverview.averageRepetitionsPerStage;
  kpiStars.textContent = currentOverview.totalStars;
  kpiStarsSub.textContent = `จาก ${currentOverview.maxPossibleStars} ดาว (สะสมจริง)`;
  kpiAccuracy.textContent = `${currentOverview.overallAccuracy}%`;

  // 3. Render Skill Breakdown
  skillRowsContainer.replaceChildren();
  for (const key of ['vocab', 'grammar', 'dialogue']) {
    const s = skills[key];
    const row = document.createElement('div');
    row.className = 'skill-row';

    const info = document.createElement('div');
    info.className = 'skill-info';
    info.innerHTML = `
      <span class="skill-name">${s.label}</span>
      <span class="skill-stats">ฝึก ${s.practicedCount} ครั้ง (จากคลัง ${s.uniqueCount} ข้อ)</span>
    `;

    const pill = document.createElement('span');
    pill.className = `skill-pill ${s.accuracy >= 75 ? 'good' : ''}`;
    pill.textContent = `${s.accuracy}% ความแม่นยำ`;

    row.appendChild(info);
    row.appendChild(pill);
    skillRowsContainer.appendChild(row);
  }

  // 4. Render Vocab by Level
  vocabLevelsContainer.replaceChildren();
  const maxVocabAttempts = Math.max(
    1,
    ...Object.values(currentVocabStats.levels).map((l) => l.practicedCount),
  );

  for (const lvlKey of ['A1', 'A2', 'B1', 'B2']) {
    const lvl = currentVocabStats.levels[lvlKey];
    const item = document.createElement('div');
    item.className = 'vocab-level-item';

    const percentOfMax = Math.round((lvl.practicedCount / maxVocabAttempts) * 100);
    item.innerHTML = `
      <div class="vocab-level-header">
        <span>${lvl.label}</span>
        <span style="color: #64748b;">${lvl.practicedCount} ข้อ (แม่นยำ ${lvl.accuracy}%)</span>
      </div>
      <div class="vocab-bar-track">
        <div class="vocab-bar-fill" style="width: ${percentOfMax}%;"></div>
      </div>
    `;
    vocabLevelsContainer.appendChild(item);
  }

  // 5. Render Strengths & Weaknesses
  strengthTagsContainer.replaceChildren();
  if (currentStrengthsAndWeaknesses.strengths.length === 0) {
    strengthTagsContainer.innerHTML = '<span style="font-size: 0.8125rem; color: #15803d;">ยังไม่มีข้อมูลจุดเด่น (ฝึกฝนเพิ่มขึ้นเพื่อปลดล็อก)</span>';
  } else {
    for (const item of currentStrengthsAndWeaknesses.strengths) {
      const tag = document.createElement('span');
      tag.className = 'insight-tag';
      tag.textContent = `✓ ${item.label} (${item.accuracy}%)`;
      strengthTagsContainer.appendChild(tag);
    }
  }

  weaknessTagsContainer.replaceChildren();
  if (currentStrengthsAndWeaknesses.weaknesses.length === 0) {
    weaknessTagsContainer.innerHTML = '<span style="font-size: 0.8125rem; color: #b45309;">ยอดเยี่ยมมาก! ไม่มีหัวข้อที่ทำผิดซ้ำ</span>';
  } else {
    for (const item of currentStrengthsAndWeaknesses.weaknesses) {
      const tag = document.createElement('span');
      tag.className = 'insight-tag';
      tag.textContent = `! ${item.label} (ผิด ${item.wrongs} ครั้ง)`;
      weaknessTagsContainer.appendChild(tag);
    }
  }

  // 6. Render Stage Repetitions Table
  renderStageTable();

  // 7. Setup Teacher Presets
  const chips = document.querySelectorAll('.preset-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-preset');
      teacherNoteInput.value = text;
      teacherNoteInput.focus();
    });
  });
}

function renderStageTable() {
  stageRowsTbody.replaceChildren();

  const filtered = allStageRepetitions.filter((st) => {
    if (activeFilter === 'all') return true;
    if (['grammar', 'vocab', 'dialogue'].includes(activeFilter)) {
      return st.skill === activeFilter;
    }
    if (['A1', 'A2', 'B1', 'B2'].includes(activeFilter)) {
      return st.level === activeFilter;
    }
    return true;
  });

  if (filtered.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="6" style="text-align: center; color: var(--color-muted); padding: 20px;">ไม่มีข้อมูลด่านในหมวดหมู่นี้</td>';
    stageRowsTbody.appendChild(tr);
    return;
  }

  for (const item of filtered) {
    const tr = document.createElement('tr');

    const badgeClass = {
      mastered: 'stage-badge-mastered',
      passed: 'stage-badge-passed',
      practicing: 'stage-badge-practicing',
      unplayed: 'stage-badge-unplayed',
    }[item.status] || 'stage-badge-unplayed';

    const starsDisplay = '⭐'.repeat(item.bestStars) || '—';
    const scoreDisplay = item.bestScore > 0 ? `${Math.round(item.bestScore * 100)}%` : '0%';

    tr.innerHTML = `
      <td>
        <strong style="color: #0f172a;">${item.title}</strong>
      </td>
      <td>
        <span style="font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; background: #f1f5f9; color: #475569; font-weight: 500;">
          ${item.skill} • ${item.level}
        </span>
      </td>
      <td style="text-align: center; font-weight: 600;">
        ${item.attemptCount > 0 ? `${item.attemptCount} ครั้ง` : '—'}
      </td>
      <td style="text-align: center; color: #059669; font-weight: 600;">
        ${item.clearCount > 0 ? `${item.clearCount} ครั้ง` : '—'}
      </td>
      <td style="text-align: center;">
        <span>${scoreDisplay}</span>
        <span style="margin-left: 4px; font-size: 0.8125rem;">${starsDisplay}</span>
      </td>
      <td>
        <span class="${badgeClass}">${item.statusLabel}</span>
      </td>
    `;
    stageRowsTbody.appendChild(tr);
  }
}

// Stage Table Filters
stagesFilterBar?.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  stagesFilterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.getAttribute('data-filter') || btn.getAttribute('data-level') || 'all';
  renderStageTable();
});

// Action: Save as Image (PNG)
btnSaveImage?.addEventListener('click', async () => {
  const reportCard = document.getElementById('report-card');
  if (!reportCard) return;

  const originalText = btnSaveImage.textContent;
  btnSaveImage.disabled = true;
  btnSaveImage.textContent = '⏳ กำลังประมวลผลรูปภาพ...';

  try {
    const canvas = await html2canvas(reportCard, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const link = document.createElement('a');
    const name = currentStudent?.callName || currentStudent?.nickname || 'student';
    link.download = `pik-a-class-report-${name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Error generating image:', err);
    alert('เกิดข้อผิดพลาดในการสร้างรูปภาพ กรุณาลองใช้ฟังก์ชันพิมพ์ หรือถ่ายภาพหน้าจอ');
  } finally {
    btnSaveImage.disabled = false;
    btnSaveImage.textContent = originalText;
  }
});

// Action: Copy LINE Text
btnCopyLine?.addEventListener('click', async () => {
  if (!currentStudent || !currentOverview) return;

  const text = formatLineSummary({
    student: currentStudent,
    overview: currentOverview,
    vocabStats: currentVocabStats,
    strengthsAndWeaknesses: currentStrengthsAndWeaknesses,
    teacherNote: teacherNoteInput.value,
  });

  try {
    await navigator.clipboard.writeText(text);
    const originalText = btnCopyLine.textContent;
    btnCopyLine.textContent = '✅ คัดลอกสำเร็จ!';
    setTimeout(() => {
      btnCopyLine.textContent = originalText;
    }, 2000);
  } catch (err) {
    console.error('Clipboard write failed:', err);
    alert(text);
  }
});

// Action: Print
btnPrint?.addEventListener('click', () => {
  window.print();
});
