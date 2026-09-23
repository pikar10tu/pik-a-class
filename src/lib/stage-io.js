import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { buildQuery, stageConstraints, stagePoolConstraints, myClearConstraints } from './queries.js';

export async function fetchStages(db, options = {}) {
  const snapshot = await getDocs(
    buildQuery(db, 'stages', stageConstraints(options), { field: 'order', direction: 'asc' }),
  );
  return snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
}

export async function fetchStage(db, id) {
  const snap = await getDoc(doc(db, 'stages', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function saveStage(db, id, data) {
  const ref = id ? doc(db, 'stages', id) : doc(collection(db, 'stages'));
  await setDoc(ref, data);
  return ref.id;
}

// ดึงคลังของด่านด้วยเงื่อนไข ไม่ใช่รายชื่อข้อ
// ไม่ใส่ limit เพราะ limit ที่ไม่มี orderBy จะได้ "ข้อแรกๆ ตาม document id" ซึ่งเป็นชุดเดิมทุกครั้ง
// กลายเป็นอคติถาวรที่มองไม่เห็น แทนที่จะสุ่มจริง — คลังโตเกินคาดค่อยกลับมาทำ paging
export async function fetchStagePool(db, stage, tier, allowedLevels) {
  const tags = stage?.tags ?? [];
  if (!Array.isArray(tags) || tags.length === 0) {
    return [];
  }
  const snapshot = await getDocs(
    buildQuery(db, 'exercises', stagePoolConstraints({
      skill: stage.skill,
      level: stage.level,
      tags,
      tier,
      allowedLevels,
    })),
  );
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

export async function fetchMyClears(db, uid) {
  const snapshot = await getDocs(buildQuery(db, 'stageClears', myClearConstraints(uid)));
  return snapshot.docs.map((snap) => snap.data());
}
