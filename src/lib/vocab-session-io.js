import { collection, doc, documentId, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { submissionId } from './schema/doc-ids.js';

export async function saveVocabSessionResults(db, { uid, history = [], now = new Date().toISOString() }) {
  if (!uid || history.length === 0) return;

  const exerciseIds = history.map((item) => item.word.id);
  const ids = exerciseIds.map((exId) => submissionId(uid, exId));

  // 1. อ่านข้อมูล submissions เดิมของผู้เรียน
  const snapshot = await getDocs(
    query(collection(db, 'submissions'), where(documentId(), 'in', ids)),
  );
  const existingMap = Object.fromEntries(snapshot.docs.map((snap) => [snap.id, snap.data()]));

  // 2. สร้าง Batch เขียนผลลัพธ์
  const batch = writeBatch(db);

  for (const item of history) {
    const id = submissionId(uid, item.word.id);
    const previous = existingMap[id] ?? null;
    const isCorrect = item.correct === true;
    const stars = isCorrect ? 3 : 0;

    batch.set(doc(db, 'submissions', id), {
      uid,
      exerciseId: item.word.id,
      skill: 'vocab',
      level: item.word.level || 'A1',
      type: 'mcq',
      tags: [`vocab:${item.word.category}`],
      answer: item.selectedAnswer || (item.timedOut ? 'timeout' : 'none'),
      autoGraded: true,
      score: isCorrect ? 1 : 0,
      bestStars: Math.max(stars, previous?.bestStars ?? 0),
      attemptCount: (previous?.attemptCount ?? 0) + 1,
      wrongCount: (previous?.wrongCount ?? 0) + (isCorrect ? 0 : 1),
      lastAnsweredAt: now,
      status: 'completed',
      createdAt: previous?.createdAt ?? now,
    });
  }

  await batch.commit();
}
