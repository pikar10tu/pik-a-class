import { collection, doc, documentId, getDoc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { submissionId, stageClearId } from './schema/doc-ids.js';
import { buildStageWrites } from './stage-writes.js';
import { recordStageClear } from './cache-writes.js';

// ต้องอ่านของเดิมก่อนเสมอ: rules ห้าม bestStars ลดลงและห้ามแก้ createdAt
// ถ้าเขียนทับดื้อๆ แล้วโดนปฏิเสธ batch จะล้มทั้งชุด เด็กเสียผลทั้งด่าน
async function fetchExistingSubmissions(db, uid, exerciseIds) {
  if (exerciseIds.length === 0) return {};
  const ids = exerciseIds.map((exerciseId) => submissionId(uid, exerciseId));
  // ไม่ต้องกรอง uid เพิ่ม เพราะ uid ฝังอยู่ใน doc id อยู่แล้ว
  const snapshot = await getDocs(
    query(collection(db, 'submissions'), where(documentId(), 'in', ids)),
  );
  return Object.fromEntries(snapshot.docs.map((snap) => [snap.id, snap.data()]));
}

export async function saveStageResult(db, { uid, stage, exercises, results, now = new Date().toISOString() }) {
  const existingSubmissions = await fetchExistingSubmissions(
    db,
    uid,
    results.map((result) => result.exerciseId),
  );
  const clearSnap = await getDoc(doc(db, 'stageClears', stageClearId(uid, stage.id)));
  const existingClear = clearSnap.exists() ? clearSnap.data() : null;

  const writes = buildStageWrites({ uid, stage, exercises, results, existingSubmissions, existingClear, now });

  const batch = writeBatch(db);
  for (const write of writes.submissions) {
    batch.set(doc(db, 'submissions', write.id), write.data);
  }
  if (writes.stageClear) {
    batch.set(doc(db, 'stageClears', writes.stageClear.id), writes.stageClear.data);
  }
  await batch.commit();
  // commit สำเร็จแล้วเท่านั้น — ถ้าล้ม cache ไม่เปลี่ยน
  if (writes.stageClear) recordStageClear(uid, writes.stageClear.data);
}
