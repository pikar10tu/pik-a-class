import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { fetchStages } from './stage-io.js';

export async function fetchStudentReportData(db, uid) {
  const [userSnap, clearsSnap, subsSnap, stages] = await Promise.all([
    getDoc(doc(db, 'users', uid)),
    getDocs(query(collection(db, 'stageClears'), where('uid', '==', uid))),
    getDocs(query(collection(db, 'submissions'), where('uid', '==', uid))),
    fetchStages(db, { publishedOnly: true, tier: 'full' }),
  ]);

  if (!userSnap.exists()) {
    throw new Error('ไม่พบข้อมูลผู้เรียนในระบบ');
  }

  const student = { uid: userSnap.id, ...userSnap.data() };
  const stageClears = clearsSnap.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
  const submissions = subsSnap.docs.map((snap) => ({ id: snap.id, ...snap.data() }));

  return { student, stageClears, submissions, stages };
}

export async function fetchPlatformStats(db) {
  const [
    studentCountSnap,
    stageClearsCountSnap,
    submissionsCountSnap,
    exercisesCountSnap,
    stagesCountSnap,
    clearsSnap,
  ] = await Promise.all([
    getCountFromServer(query(collection(db, 'users'), where('role', '==', 'student'))),
    getCountFromServer(collection(db, 'stageClears')),
    getCountFromServer(collection(db, 'submissions')),
    getCountFromServer(query(collection(db, 'exercises'), where('reviewStatus', '==', 'published'))),
    getCountFromServer(query(collection(db, 'stages'), where('reviewStatus', '==', 'published'))),
    getDocs(collection(db, 'stageClears')),
  ]);

  let totalStarsPlatform = 0;
  let totalStagePlaysPlatform = 0;
  let totalQuestionsAnsweredPlatform = 0;
  const clearsByLevel = { A1: 0, A2: 0, B1: 0, B2: 0 };

  for (const docSnap of clearsSnap.docs) {
    const data = docSnap.data();
    totalStarsPlatform += data.bestStars ?? 0;
    totalStagePlaysPlatform += data.attemptCount ?? 1;
    totalQuestionsAnsweredPlatform += data.totalQuestionsAnswered ?? 0;
    if (data.level && clearsByLevel[data.level] !== undefined) {
      clearsByLevel[data.level] += 1;
    }
  }

  return {
    studentCount: studentCountSnap.data().count,
    stageClearCount: stageClearsCountSnap.data().count,
    submissionCount: submissionsCountSnap.data().count,
    publishedExercisesCount: exercisesCountSnap.data().count,
    publishedStagesCount: stagesCountSnap.data().count,
    totalStarsPlatform,
    totalStagePlaysPlatform,
    totalQuestionsAnsweredPlatform: Math.max(submissionsCountSnap.data().count, totalQuestionsAnsweredPlatform),
    clearsByLevel,
  };
}
