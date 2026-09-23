import { getCountFromServer } from 'firebase/firestore';
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { buildQuery, contentLibraryConstraints } from '../lib/queries.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { fetchPlatformStats } from '../lib/student-report-io.js';
import { fetchStudents } from '../lib/admin-users-io.js';
import {
  calculateTierStats,
  getTopCafeLearners,
  getRecentStudents,
} from '../lib/macro-dashboard.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/index.html', import.meta.env.BASE_URL);

requireAdmin(async (firebaseUser) => {
  const welcomeEl = document.getElementById('admin-welcome');
  if (welcomeEl) {
    welcomeEl.textContent = `เข้าสู่ระบบในฐานะผู้ดูแล: ${firebaseUser.email}`;
  }

  try {
    const [pendingSnap, platformStats, students] = await Promise.all([
      getCountFromServer(buildQuery(db, 'exercises', contentLibraryConstraints({ reviewStatus: 'draft' }))),
      fetchPlatformStats(db),
      fetchStudents(db),
    ]);

    // 1. User & Tier Health
    const { total, full, free, fullPercent } = calculateTierStats(students);
    const summaryStudentsEl = document.getElementById('summary-students');
    const summaryTierFullEl = document.getElementById('summary-tier-full');
    const summaryTierFreeEl = document.getElementById('summary-tier-free');
    const tierRatioPercentEl = document.getElementById('tier-ratio-percent');
    const tierBarFullEl = document.getElementById('tier-bar-full');
    const tierBarFreeEl = document.getElementById('tier-bar-free');

    if (summaryStudentsEl) summaryStudentsEl.textContent = `${total.toLocaleString()} คน`;
    if (summaryTierFullEl) summaryTierFullEl.textContent = `${full.toLocaleString()} คน`;
    if (summaryTierFreeEl) summaryTierFreeEl.textContent = `${free.toLocaleString()} คน`;
    if (tierRatioPercentEl) tierRatioPercentEl.textContent = `${fullPercent}% (${full}/${total})`;
    if (tierBarFullEl) tierBarFullEl.style.width = `${fullPercent}%`;
    if (tierBarFreeEl) tierBarFreeEl.style.width = `${100 - fullPercent}%`;

    // 2. Global Learning Stats
    const totalQuestionsEl = document.getElementById('summary-total-questions');
    const totalSessionsEl = document.getElementById('summary-total-sessions');
    const totalStarsEl = document.getElementById('summary-total-stars');
    const totalClearsEl = document.getElementById('summary-total-clears');

    if (totalQuestionsEl) totalQuestionsEl.textContent = `${platformStats.totalQuestionsAnsweredPlatform.toLocaleString()} ข้อ`;
    if (totalSessionsEl) totalSessionsEl.textContent = `${platformStats.totalStagePlaysPlatform.toLocaleString()} ครั้ง`;
    if (totalStarsEl) totalStarsEl.textContent = `${platformStats.totalStarsPlatform.toLocaleString()} ดวง`;
    if (totalClearsEl) totalClearsEl.textContent = `${platformStats.stageClearCount.toLocaleString()} ครั้ง`;

    // 3. CEFR Breakdown & Content
    const pendingEl = document.getElementById('summary-pending-content');
    const contentReadyEl = document.getElementById('summary-content-ready');
    if (pendingEl) pendingEl.textContent = `${pendingSnap.data().count.toLocaleString()} ข้อ`;
    if (contentReadyEl) {
      contentReadyEl.textContent = `${platformStats.publishedStagesCount} ด่าน (${platformStats.publishedExercisesCount} ข้อ)`;
    }

    const clearsByLevel = platformStats.clearsByLevel || { A1: 0, A2: 0, B1: 0, B2: 0 };
    const a1El = document.getElementById('cefr-a1-clears');
    const a2El = document.getElementById('cefr-a2-clears');
    const b1El = document.getElementById('cefr-b1-clears');
    const b2El = document.getElementById('cefr-b2-clears');

    if (a1El) a1El.textContent = (clearsByLevel.A1 || 0).toLocaleString();
    if (a2El) a2El.textContent = (clearsByLevel.A2 || 0).toLocaleString();
    if (b1El) b1El.textContent = (clearsByLevel.B1 || 0).toLocaleString();
    if (b2El) b2El.textContent = (clearsByLevel.B2 || 0).toLocaleString();

    // 4. Animal Cafe Leaderboard (Top 5)
    renderCafeLeaderboard(students);

    // 5. Recent Registered Students (5 most recent)
    renderRecentStudents(students);
  } catch (error) {
    console.error(error);
    showPageError('โหลดข้อมูลภาพรวมไม่สำเร็จ กรุณาลองรีเฟรชหน้าอีกครั้ง');
  }
});

function renderCafeLeaderboard(students) {
  const tbody = document.getElementById('cafe-leaderboard-rows');
  if (!tbody) return;
  tbody.replaceChildren();

  const topLearners = getTopCafeLearners(students, 5);

  if (topLearners.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="5" style="text-align: center; color: var(--color-muted); padding: 24px;">ยังไม่มีข้อมูลการเล่น Animal Cafe ในระบบ</td>';
    tbody.appendChild(tr);
    return;
  }

  const medals = ['🥇', '🥈', '🥉', '4', '5'];
  topLearners.forEach((player, idx) => {
    const tr = document.createElement('tr');
    const name = player.nickname || player.fullName || 'ผู้เรียน';
    const grade = player.grade || '—';
    const score = (player.speedCafeStats?.highScore || 0).toLocaleString();
    const combo = player.speedCafeStats?.maxCombo ? `${player.speedCafeStats.maxCombo}x` : '—';

    tr.innerHTML = `
      <td style="text-align: center; font-size: 1.125rem;">${medals[idx] || idx + 1}</td>
      <td>
        <strong style="color: #0f172a;">${escapeHtml(name)}</strong>
        ${player.fullName && player.fullName !== player.nickname ? `<div style="font-size: 0.75rem; color: #64748b;">${escapeHtml(player.fullName)}</div>` : ''}
      </td>
      <td style="font-size: 0.8125rem; color: #475569;">${escapeHtml(grade)}</td>
      <td style="text-align: right; font-weight: 700; color: #b45309;">🪙 ${score}</td>
      <td style="text-align: right; font-weight: 600; color: #059669;">⚡ ${combo}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderRecentStudents(students) {
  const tbody = document.getElementById('recent-students-rows');
  if (!tbody) return;
  tbody.replaceChildren();

  const recent = getRecentStudents(students, 5);

  if (recent.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="4" style="text-align: center; color: var(--color-muted); padding: 24px;">ยังไม่มีนักเรียนลงทะเบียนในระบบ</td>';
    tbody.appendChild(tr);
    return;
  }

  for (const s of recent) {
    const tr = document.createElement('tr');
    const name = s.nickname || s.fullName || 'ผู้เรียน';
    const schoolInfo = [s.grade, s.school].filter(Boolean).join(' • ') || '—';
    const isFull = s.tier === 'full';
    const tierBadge = isFull
      ? '<span class="badge-tier-full">Full</span>'
      : '<span class="badge-tier-free">Free</span>';
    const uid = s.id || s.uid;

    tr.innerHTML = `
      <td>
        <strong style="color: #0f172a;">${escapeHtml(name)}</strong>
        ${s.fullName && s.fullName !== s.nickname ? `<div style="font-size: 0.75rem; color: #64748b;">${escapeHtml(s.fullName)}</div>` : ''}
      </td>
      <td style="font-size: 0.8125rem; color: #475569;">${escapeHtml(schoolInfo)}</td>
      <td>${tierBadge}</td>
      <td>
        <a href="./student-report.html?uid=${encodeURIComponent(uid)}" class="btn-ghost" style="padding: 3px 8px; font-size: 0.75rem; white-space: nowrap;">
          ดูรายงาน ➔
        </a>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
