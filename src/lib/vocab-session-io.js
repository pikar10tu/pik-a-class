import { collection, doc, documentId, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { submissionId } from './schema/doc-ids.js';

// Firestore รับค่าในเงื่อนไข 'in' ได้ไม่เกิน 30 ตัว และ batch หนึ่งเขียนได้ไม่เกิน 500 รายการ
const IN_QUERY_LIMIT = 30;
const BATCH_LIMIT = 400;

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

export async function saveVocabSessionResults(db, { uid, history = [], now = new Date().toISOString() }) {
  if (!uid || history.length === 0) return;

  // 1. รวมคำตอบของคำเดียวกันเข้าด้วยกัน (โหมด endless อาจวนคำเดิมซ้ำ)
  //    ถ้าเขียนแยกกัน รายการหลังจะทับรายการแรกและจำนวนครั้งที่ตอบจะหายไป
  const byId = new Map();
  for (const item of history) {
    const id = submissionId(uid, item.word.id);
    const entry = byId.get(id) ?? { word: item.word, attempts: 0, wrongs: 0, anyCorrect: false, last: item };
    entry.attempts += 1;
    if (item.correct === true) entry.anyCorrect = true;
    else entry.wrongs += 1;
    entry.last = item;
    byId.set(id, entry);
  }
  const ids = [...byId.keys()];

  // 2. อ่านข้อมูล submissions เดิมของผู้เรียน (แบ่งทีละ 30)
  const existingMap = {};
  for (const part of chunk(ids, IN_QUERY_LIMIT)) {
    const snapshot = await getDocs(query(collection(db, 'submissions'), where(documentId(), 'in', part)));
    for (const snap of snapshot.docs) existingMap[snap.id] = snap.data();
  }

  // 3. เขียนผลลัพธ์
  for (const part of chunk(ids, BATCH_LIMIT)) {
    const batch = writeBatch(db);
    for (const id of part) {
      const { word, attempts, wrongs, anyCorrect, last } = byId.get(id);
      const previous = existingMap[id] ?? null;
      const lastCorrect = last.correct === true;

      batch.set(doc(db, 'submissions', id), {
        uid,
        exerciseId: word.id,
        skill: 'vocab',
        level: word.level || 'A1',
        type: 'mcq',
        tags: [`vocab:${word.category}`],
        answer: last.selectedAnswer || (last.timedOut ? 'timeout' : 'none'),
        autoGraded: true,
        score: lastCorrect ? 1 : 0,
        bestStars: Math.max(anyCorrect ? 3 : 0, previous?.bestStars ?? 0),
        attemptCount: (previous?.attemptCount ?? 0) + attempts,
        wrongCount: (previous?.wrongCount ?? 0) + wrongs,
        lastAnsweredAt: now,
        status: 'completed',
        createdAt: previous?.createdAt ?? now,
      });
    }
    await batch.commit();
  }
}
