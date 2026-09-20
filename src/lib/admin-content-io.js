import { collection, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
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
