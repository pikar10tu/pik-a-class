// อัปเดต cache ทันทีหลังเขียน Firestore สำเร็จ เพื่อให้หน้าถัดไปเห็นของใหม่ทันที (ไม่เห็นด่านยังล็อกแวบหนึ่ง)
import { readCache, writeCache, removeCache, readSession, writeSession } from './local-cache.js';

export function invalidateOverview(uid, options = {}) {
  removeCache(uid, 'overview', options);
}

export function recordStageClear(uid, clearData, options = {}) {
  if (!uid || !clearData?.stageId) return;
  const current = readCache(uid, 'clears', options);
  const list = Array.isArray(current) ? current : [];
  const index = list.findIndex((clear) => clear.stageId === clearData.stageId);
  const next = index >= 0
    ? list.map((clear, i) => (i === index ? clearData : clear))
    : [...list, clearData];
  writeCache(uid, 'clears', next, options);
  invalidateOverview(uid, options);
}

export function patchSessionUserDoc(uid, patch, options = {}) {
  const session = readSession(options);
  if (!session || session.uid !== uid) return;
  writeSession({ ...session, userDoc: { ...(session.userDoc ?? {}), ...patch } }, options);
}
