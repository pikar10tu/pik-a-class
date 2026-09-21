import { collection, doc, documentId, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { buildQuery, stageConstraints, myClearConstraints } from './queries.js';

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

// itemIds มีได้ไม่เกิน 20 ตาม schema ส่วนลิมิตของ `in` คือ 30 จึงจบใน query เดียวเสมอ
export async function fetchStageExercises(db, itemIds) {
  if (itemIds.length === 0) return [];
  const snapshot = await getDocs(
    query(collection(db, 'exercises'), where(documentId(), 'in', itemIds)),
  );
  const byId = new Map(snapshot.docs.map((snap) => [snap.id, { id: snap.id, ...snap.data() }]));
  // Firestore ไม่รับประกันลำดับผลลัพธ์ ต้องเรียงกลับตาม itemIds เอง
  return itemIds.map((id) => byId.get(id)).filter(Boolean);
}

export async function fetchMyClears(db, uid) {
  const snapshot = await getDocs(buildQuery(db, 'stageClears', myClearConstraints(uid)));
  return snapshot.docs.map((snap) => snap.data());
}
