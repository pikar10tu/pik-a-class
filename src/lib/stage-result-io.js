import { collection, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { stageClearId } from './schema/doc-ids.js';
import { buildStageWrites } from './stage-writes.js';
import { recordStageClear } from './cache-writes.js';

// ต้องอ่านของเดิมก่อนเสมอ: rules ห้าม bestStars ลดลงและห้ามแก้ createdAt
// ถ้าเขียนทับดื้อๆ แล้วโดนปฏิเสธ batch จะล้มทั้งชุด เด็กเสียผลทั้งด่าน
async function fetchExistingSubmissions(db, uid, exerciseIds) {
  if (exerciseIds.length === 0) return {};
  // ต้องกรองด้วย uid เสมอ — rules ไม่ใช่ตัวกรอง ถ้า query ไม่มี where uid
  // rules จะพิสูจน์ไม่ได้ว่าทุกเอกสารเป็นของเรา แล้วปฏิเสธทั้ง query (เด็กบันทึกผลไม่ได้เลย)
  // และห้ามใช้ documentId() 'in' เพราะเอกสารที่ยังไม่มี (เล่นครั้งแรก) ทำให้ rules error เช่นกัน
  // ทั้งสองเงื่อนไขเป็น equality จึงใช้ single-field index อัตโนมัติได้ ไม่ต้องสร้าง composite index
  const snapshot = await getDocs(
    query(
      collection(db, 'submissions'),
      where('uid', '==', uid),
      where('exerciseId', 'in', exerciseIds),
    ),
  );
  return Object.fromEntries(snapshot.docs.map((snap) => [snap.id, snap.data()]));
}

export async function saveStageResult(db, { uid, stage, exercises, results, now = new Date().toISOString() }) {
  const existingSubmissions = await fetchExistingSubmissions(
    db,
    uid,
    results.map((result) => result.exerciseId),
  );
  // ใช้ query แทน getDoc: ถ้าเป็นการผ่านด่านครั้งแรก เอกสารยังไม่มี
  // getDoc จะทำให้ rules (resource.data.uid) error แล้วโดนปฏิเสธ ส่วน query ที่กรอง uid ได้ผลว่างตามปกติ
  const clearSnapshot = await getDocs(
    query(collection(db, 'stageClears'), where('uid', '==', uid), where('stageId', '==', stage.id)),
  );
  const clearDoc = clearSnapshot.docs.find((snap) => snap.id === stageClearId(uid, stage.id));
  const existingClear = clearDoc ? clearDoc.data() : null;

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
