import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { buildQuery } from './queries.js';
import { chunk } from './schema/import-prep.js';

const WRITE_CHUNK_SIZE = 400;

export async function fetchExistingHashes(db, collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return new Set(snapshot.docs.map((snap) => snap.data().contentHash).filter(Boolean));
}

export async function importItems(db, collectionName, items) {
  let written = 0;
  for (const group of chunk(items, WRITE_CHUNK_SIZE)) {
    const batch = writeBatch(db);
    for (const item of group) {
      batch.set(doc(collection(db, collectionName)), item);
    }
    await batch.commit();
    written += group.length;
  }
  return written;
}

export async function fetchContent(db, collectionName, constraints) {
  const snapshot = await getDocs(
    buildQuery(db, collectionName, constraints, { field: 'updatedAt', direction: 'desc' }),
  );
  return snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
}

export async function updateContentItem(db, collectionName, id, fields) {
  await updateDoc(doc(db, collectionName, id), { ...fields, updatedAt: new Date().toISOString() });
}

export async function publishItems(db, collectionName, ids) {
  const now = new Date().toISOString();
  for (const group of chunk(ids, WRITE_CHUNK_SIZE)) {
    const batch = writeBatch(db);
    for (const id of group) {
      batch.update(doc(db, collectionName, id), { reviewStatus: 'published', updatedAt: now });
    }
    await batch.commit();
  }
}

export async function fetchExercise(db, id) {
  const snap = await getDoc(doc(db, 'exercises', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createExercise(db, item) {
  const ref = doc(collection(db, 'exercises'));
  await setDoc(ref, item);
  return ref.id;
}

export async function saveExercise(db, id, item) {
  await setDoc(doc(db, 'exercises', id), item);
}

// ทิ้งลงถัง: ต้องบังคับ reviewStatus กลับเป็น draft ด้วย ไม่งั้นข้อที่ published อยู่
// จะยังโผล่ให้นักเรียนเห็น เพราะ security rules ตัดสินจาก reviewStatus อย่างเดียว
export async function trashExercise(db, id) {
  const now = new Date().toISOString();
  await updateDoc(doc(db, 'exercises', id), {
    deletedAt: now,
    reviewStatus: 'draft',
    updatedAt: now,
  });
}

export async function restoreExercise(db, id) {
  await updateDoc(doc(db, 'exercises', id), {
    deletedAt: deleteField(),
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteExercise(db, id) {
  await deleteDoc(doc(db, 'exercises', id));
}

export async function fetchTrashedExercises(db) {
  const snapshot = await getDocs(
    query(collection(db, 'exercises'), where('deletedAt', '!=', null), orderBy('deletedAt', 'desc')),
  );
  return snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
}
