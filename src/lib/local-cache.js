// เก็บภาพล่าสุดของแต่ละหน้าไว้ในเครื่อง เพื่อ render ได้ทันทีโดยไม่ต้องรอ Firebase
// (Firebase Auth ยิง accounts:lookup ทุกครั้งที่โหลดหน้า และ Firestore รอ Auth ก่อนอ่านแม้แต่ cache ของตัวเอง)
// cache นี้มีไว้แสดงผลเท่านั้น สิทธิ์จริงอยู่ที่ Firestore rules
export const CACHE_PREFIX = 'pik_cache_';
export const CACHE_VERSION = 'v1';
export const SESSION_KEY = `${CACHE_PREFIX}${CACHE_VERSION}:session`;
export const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function resolveStorage(storage) {
  if (storage) return storage;
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

function dataKey(uid, name) {
  return `${CACHE_PREFIX}${CACHE_VERSION}:${uid}:${name}`;
}

function readEntry(key, storage, now) {
  try {
    const store = resolveStorage(storage);
    if (!store) return null;
    const raw = store.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!entry || typeof entry.savedAt !== 'number') return null;
    if (now - entry.savedAt > MAX_AGE_MS) return null;
    return entry;
  } catch {
    return null;
  }
}

function writeEntry(key, entry, storage) {
  try {
    resolveStorage(storage)?.setItem(key, JSON.stringify(entry));
  } catch {
    // เต็มหรือถูกบล็อก — แอปยังทำงานได้ แค่ไม่เร็วขึ้น
  }
}

export function readSession({ storage, now = Date.now() } = {}) {
  const entry = readEntry(SESSION_KEY, storage, now);
  if (!entry || !entry.uid) return null;
  return {
    uid: entry.uid,
    displayName: entry.displayName ?? '',
    email: entry.email ?? '',
    userDoc: entry.userDoc ?? null,
  };
}

export function readReadySession(options = {}) {
  const session = readSession(options);
  return session?.userDoc?.onboardingComplete === true ? session : null;
}

export function writeSession({ uid, displayName = '', email = '', userDoc = null }, { storage, now = Date.now() } = {}) {
  if (!uid) return;
  writeEntry(SESSION_KEY, { savedAt: now, uid, displayName, email, userDoc }, storage);
}

export function readCache(uid, name, { storage, now = Date.now() } = {}) {
  if (!uid) return null;
  const entry = readEntry(dataKey(uid, name), storage, now);
  return entry ? entry.data ?? null : null;
}

export function writeCache(uid, name, data, { storage, now = Date.now() } = {}) {
  if (!uid) return;
  writeEntry(dataKey(uid, name), { savedAt: now, data }, storage);
}

export function removeCache(uid, name, { storage } = {}) {
  if (!uid) return;
  try {
    resolveStorage(storage)?.removeItem(dataKey(uid, name));
  } catch {
    // ignore
  }
}

export function clearAll({ storage } = {}) {
  try {
    const store = resolveStorage(storage);
    if (!store) return;
    const keys = [];
    for (let i = 0; i < store.length; i += 1) {
      const key = store.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) keys.push(key);
    }
    keys.forEach((key) => store.removeItem(key));
  } catch {
    // ignore
  }
}

export function isSameData(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}
