import { getCountFromServer } from 'firebase/firestore';
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { buildQuery, studentListConstraints, contentLibraryConstraints } from '../lib/queries.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { fetchPlatformStats } from '../lib/student-report-io.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/index.html', import.meta.env.BASE_URL);

requireAdmin(async (firebaseUser) => {
  document.getElementById('admin-welcome').textContent = `เข้าสู่ระบบในฐานะผู้ดูแล: ${firebaseUser.email}`;
  try {
    const [students, pending, platformStats] = await Promise.all([
      getCountFromServer(buildQuery(db, 'users', studentListConstraints())),
      getCountFromServer(buildQuery(db, 'exercises', contentLibraryConstraints({ reviewStatus: 'draft' }))),
      fetchPlatformStats(db),
    ]);

    document.getElementById('summary-students').textContent = students.data().count.toLocaleString();
    document.getElementById('summary-pending-content').textContent = pending.data().count.toLocaleString();

    // Global Learning Stats
    document.getElementById('summary-total-questions').textContent = platformStats.totalQuestionsAnsweredPlatform.toLocaleString();
    document.getElementById('summary-total-sessions').textContent = platformStats.totalStagePlaysPlatform.toLocaleString();
    document.getElementById('summary-total-stars').textContent = platformStats.totalStarsPlatform.toLocaleString();
    document.getElementById('summary-total-clears').textContent = platformStats.stageClearCount.toLocaleString();
    document.getElementById('summary-content-ready').textContent = `${platformStats.publishedStagesCount} ด่าน (${platformStats.publishedExercisesCount} ข้อ)`;
  } catch (error) {
    console.error(error);
    showPageError('โหลดสรุปตัวเลขไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง');
  }
});
