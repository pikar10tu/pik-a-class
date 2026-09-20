import { getCountFromServer } from 'firebase/firestore';
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { buildQuery, studentListConstraints, contentLibraryConstraints } from '../lib/queries.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/index.html', import.meta.env.BASE_URL);

requireAdmin(async (firebaseUser) => {
  document.getElementById('admin-welcome').textContent = `เข้าสู่ระบบในฐานะผู้ดูแล: ${firebaseUser.email}`;
  try {
    const students = await getCountFromServer(buildQuery(db, 'users', studentListConstraints()));
    document.getElementById('summary-students').textContent = students.data().count;

    const pending = await getCountFromServer(
      buildQuery(db, 'exercises', contentLibraryConstraints({ reviewStatus: 'draft' })),
    );
    document.getElementById('summary-pending-content').textContent = pending.data().count;
  } catch (error) {
    console.error(error);
    showPageError('โหลดสรุปตัวเลขไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง');
  }
});
