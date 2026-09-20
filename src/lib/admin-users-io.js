import { doc, getDocs, updateDoc } from 'firebase/firestore';
import { buildQuery, studentListConstraints } from './queries.js';

export async function fetchStudents(db) {
  const snapshot = await getDocs(
    buildQuery(db, 'users', studentListConstraints(), { field: 'createdAt', direction: 'desc' }),
  );
  return snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
}

export async function updateStudentAdminFields(db, uid, fields) {
  await updateDoc(doc(db, 'users', uid), { ...fields, updatedAt: new Date().toISOString() });
}
