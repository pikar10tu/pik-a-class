import { collection, query, where, orderBy } from 'firebase/firestore';

export function bankExerciseConstraints({ skill, level, tier }) {
  const constraints = [
    ['reviewStatus', '==', 'published'],
    ['visibility', '==', 'bank'],
    ['skill', '==', skill],
    ['level', '==', level],
  ];
  // ระดับ A1 เปิดให้เข้าถึงได้ครบทุกข้อเป็นค่าเริ่มต้น ส่วนระดับอื่นๆ หากไม่ใช่ full tier จะเห็นเฉพาะข้อ preview
  if (tier !== 'full' && level !== 'A1') constraints.push(['isPreview', '==', true]);
  return constraints;
}

export function assignedExerciseConstraints(uid) {
  return [['assignedUids', 'array-contains', uid]];
}

export function myAssignmentConstraints(uid) {
  return [['assignedTo', 'array-contains', uid]];
}

export function myHistoryConstraints(uid) {
  return [['uid', '==', uid]];
}

export function gradingQueueConstraints() {
  return [['status', '==', 'pending']];
}

export function studentListConstraints() {
  return [['role', '==', 'student']];
}

export function contentLibraryConstraints({ reviewStatus, skill, level } = {}) {
  const constraints = [];
  if (reviewStatus) constraints.push(['reviewStatus', '==', reviewStatus]);
  if (skill) constraints.push(['skill', '==', skill]);
  if (level) constraints.push(['level', '==', level]);
  return constraints;
}

// แอดมินอ่าน stages/exercises ได้ทุกใบเพราะ rules เช็ก isAdmin() ก่อนเงื่อนไข preview/tier
// จึงยิง query ได้เหมือน tier "full" ไม่ต้องใส่ตัวกรอง isPreview
// ไม่มี userDoc หรือไม่มี tier ให้ถือว่า free ไว้ก่อน (ปลอดภัยกว่า เพราะ query จะแคบลงไม่ใช่กว้างขึ้น)
export function readTier(userDoc) {
  if (userDoc?.role === 'admin') return 'full';
  return userDoc?.tier ?? 'free';
}

// rules ของ /stages อ่าน resource.data.get('isPreview', false) ผ่าน publishedAndAllowed()
// บน list query ทุกฟิลด์ที่ rule แตะต้องถูกล็อกค่าด้วยตัว query เอง ไม่งั้น Firestore จะ
// ประเมิน rule ไม่ได้และปฏิเสธทั้งชุด (permission-denied: evaluation error) ไม่ใช่แค่กรองบางใบทิ้ง
// เกณฑ์เดียวกับ bankExerciseConstraints ด้านบน เพื่อให้สองที่ไม่เพี้ยนกัน
export function stageConstraints({ skill, level, publishedOnly = true, tier } = {}) {
  const constraints = [];
  if (publishedOnly) {
    constraints.push(['reviewStatus', '==', 'published']);
    if (tier !== 'full' && level !== 'A1') constraints.push(['isPreview', '==', true]);
  }
  if (skill) constraints.push(['skill', '==', skill]);
  if (level) constraints.push(['level', '==', level]);
  return constraints;
}

// คลังของด่าน: นิยามด้วยแท็ก ไม่ใช่รายชื่อข้อ
// เงื่อนไขชุดนี้ตั้งใจให้ตรงกับ bankExerciseConstraints ด้านบน บวกเงื่อนไขแท็ก เพื่อให้สองที่ไม่เพี้ยนกัน
// ข้อดีที่สำคัญกว่าความสะดวก: การกรองสิทธิ์อยู่ใน query เอง เด็กจึงได้เฉพาะข้อที่ตัวเองอ่านได้
// ต่างจากการอ่านด้วย documentId() in [...] ที่ถ้าอ่านข้อใดข้อหนึ่งไม่ได้จะโดนปฏิเสธทั้งชุด
export function stagePoolConstraints({ skill, level, tags, tier }) {
  const constraints = [
    ['reviewStatus', '==', 'published'],
    ['visibility', '==', 'bank'],
    ['skill', '==', skill],
    ['level', '==', level],
    ['tags', 'array-contains-any', tags],
  ];
  if (tier !== 'full' && level !== 'A1') constraints.push(['isPreview', '==', true]);
  return constraints;
}

export function myClearConstraints(uid) {
  return [['uid', '==', uid]];
}

export function buildQuery(db, collectionName, constraints, orderBySpec = null) {
  const parts = constraints.map(([field, op, value]) => where(field, op, value));
  if (orderBySpec) parts.push(orderBy(orderBySpec.field, orderBySpec.direction ?? 'asc'));
  return query(collection(db, collectionName), ...parts);
}
