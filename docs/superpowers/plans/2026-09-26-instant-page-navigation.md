# Instant Page Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** หน้านักเรียนที่เคยเปิดแล้วแสดงเนื้อหาภายใน ~0.3s และเปิดแอปถึงหน้าหลักภายใน ~0.5s โดย render จาก cache ในเครื่องก่อน แล้วค่อยยืนยันกับ Firebase

**Architecture:** `local-cache.js` ห่อ localStorage (ผูก uid, มีเวอร์ชัน, อายุ 7 วัน) `requireLogin(onReady, { onCached })` เรียก `onCached` ทันทีจาก session ในเครื่อง แล้วเรียก `onReady` เมื่อ Auth + Firestore ตอบ แต่ละหน้า render จาก cache → render ซ้ำเมื่อข้อมูลจริงต่าง → บันทึก cache จุดที่เขียน Firestore อัปเดต cache ตาม (write-through)

**Tech Stack:** Vanilla JS ES modules, Vite MPA, Firebase v10 (Auth, Firestore), Vitest (node env, inject storage แทน localStorage)

**Spec:** `docs/superpowers/specs/2026-09-26-instant-page-navigation-design.md`

## Global Constraints

- Cache key prefix `pik_cache_`, version `v1`, session key `pik_cache_v1:session`, max age `604800000` ms (7 วัน)
- `clearAll()` ลบเฉพาะ key ที่ขึ้นต้น `pik_cache_` — ห้ามลบ `pik_fav_vocab_*`, `pik_cafe_max_combo`, `pik_handbook_visited`, prefs เสียง
- ทุก read/write storage ห่อ try/catch ไม่ throw ออกไป
- ข้อความที่ผู้ใช้กรอก (ชื่อเล่น, ชื่อเรียก, ชื่อจริง) ใส่ DOM ด้วย `textContent` เท่านั้น
- `requireAdmin` ไม่รับ `onCached` — หน้า admin รอ server เสมอ
- ปุ่มแอดมิน (`#nav-admin-link`, `#admin-entry`) ต้องตั้ง `hidden` ทั้งสองทางใน render (เปิดและปิด)
- `npm test` ต้องผ่านก่อนทุก commit; commit message ลงท้ายด้วย `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
- ไม่แตะ `src/learn/play.js` ยกเว้นไม่มีเลย (write-through อยู่ใน `stage-result-io.js`), ไม่แตะหน้า admin

---

### Task 1: `local-cache.js` — ที่เก็บข้อมูลในเครื่อง

**Files:**
- Create: `src/lib/local-cache.js`
- Test: `src/lib/local-cache.test.js`

**Interfaces:**
- Produces:
  - consts `CACHE_PREFIX = 'pik_cache_'`, `CACHE_VERSION = 'v1'`, `SESSION_KEY = 'pik_cache_v1:session'`, `MAX_AGE_MS = 604800000`
  - `readSession({ storage?, now? }) → { uid, displayName, email, userDoc } | null`
  - `readReadySession(opts?) → same | null` (null ถ้า `userDoc?.onboardingComplete !== true`)
  - `writeSession({ uid, displayName, email, userDoc }, { storage?, now? })`
  - `readCache(uid, name, opts?) → data | null`, `writeCache(uid, name, data, opts?)`, `removeCache(uid, name, opts?)`
  - `clearAll({ storage? })`, `isSameData(a, b) → boolean`

- [ ] **Step 1: Write the failing tests** — `src/lib/local-cache.test.js`

```js
import { describe, it, expect } from 'vitest';
import {
  SESSION_KEY, MAX_AGE_MS,
  readSession, readReadySession, writeSession,
  readCache, writeCache, removeCache, clearAll, isSameData,
} from './local-cache.js';

function makeStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    key: (i) => [...map.keys()][i] ?? null,
    get length() { return map.size; },
    _map: map,
  };
}

const throwing = {
  getItem() { throw new Error('blocked'); },
  setItem() { throw new Error('quota'); },
  removeItem() { throw new Error('blocked'); },
  key() { throw new Error('blocked'); },
  get length() { throw new Error('blocked'); },
};

describe('session', () => {
  it('round-trips a session', () => {
    const storage = makeStorage();
    writeSession({ uid: 'u1', displayName: 'A', email: 'a@x', userDoc: { onboardingComplete: true } }, { storage, now: 1000 });
    expect(readSession({ storage, now: 2000 })).toEqual({
      uid: 'u1', displayName: 'A', email: 'a@x', userDoc: { onboardingComplete: true },
    });
    expect(storage._map.has(SESSION_KEY)).toBe(true);
  });

  it('expires after MAX_AGE_MS', () => {
    const storage = makeStorage();
    writeSession({ uid: 'u1', userDoc: {} }, { storage, now: 0 });
    expect(readSession({ storage, now: MAX_AGE_MS })).not.toBeNull();
    expect(readSession({ storage, now: MAX_AGE_MS + 1 })).toBeNull();
  });

  it('readReadySession requires onboardingComplete', () => {
    const storage = makeStorage();
    writeSession({ uid: 'u1', userDoc: { onboardingComplete: false } }, { storage, now: 0 });
    expect(readReadySession({ storage, now: 1 })).toBeNull();
    writeSession({ uid: 'u1', userDoc: { onboardingComplete: true } }, { storage, now: 0 });
    expect(readReadySession({ storage, now: 1 })?.uid).toBe('u1');
  });

  it('ignores a write without uid', () => {
    const storage = makeStorage();
    writeSession({ uid: '', userDoc: {} }, { storage });
    expect(storage.length).toBe(0);
  });

  it('returns null on corrupt JSON', () => {
    const storage = makeStorage({ [SESSION_KEY]: '{not json' });
    expect(readSession({ storage })).toBeNull();
  });
});

describe('per-user cache', () => {
  it('keeps data per uid', () => {
    const storage = makeStorage();
    writeCache('u1', 'clears', [1], { storage, now: 0 });
    writeCache('u2', 'clears', [2], { storage, now: 0 });
    expect(readCache('u1', 'clears', { storage, now: 1 })).toEqual([1]);
    expect(readCache('u2', 'clears', { storage, now: 1 })).toEqual([2]);
  });

  it('expires and removes', () => {
    const storage = makeStorage();
    writeCache('u1', 'x', 1, { storage, now: 0 });
    expect(readCache('u1', 'x', { storage, now: MAX_AGE_MS + 1 })).toBeNull();
    writeCache('u1', 'y', 1, { storage, now: 0 });
    removeCache('u1', 'y', { storage });
    expect(readCache('u1', 'y', { storage, now: 1 })).toBeNull();
  });

  it('does not read an older cache version', () => {
    const storage = makeStorage({ 'pik_cache_v0:u1:x': JSON.stringify({ savedAt: 0, data: 1 }) });
    expect(readCache('u1', 'x', { storage, now: 1 })).toBeNull();
  });

  it('returns null without uid', () => {
    expect(readCache('', 'x', { storage: makeStorage() })).toBeNull();
  });
});

describe('clearAll', () => {
  it('removes only pik_cache_ keys, including old versions', () => {
    const storage = makeStorage({
      'pik_cache_v0:u1:x': '1',
      'pik_fav_vocab_u1': '[]',
      pik_handbook_visited: 'true',
    });
    writeSession({ uid: 'u1', userDoc: {} }, { storage });
    writeCache('u1', 'clears', [], { storage });
    clearAll({ storage });
    expect([...storage._map.keys()].sort()).toEqual(['pik_fav_vocab_u1', 'pik_handbook_visited']);
  });
});

describe('storage failures', () => {
  it('never throws', () => {
    expect(() => writeSession({ uid: 'u1', userDoc: {} }, { storage: throwing })).not.toThrow();
    expect(readSession({ storage: throwing })).toBeNull();
    expect(() => writeCache('u1', 'x', 1, { storage: throwing })).not.toThrow();
    expect(readCache('u1', 'x', { storage: throwing })).toBeNull();
    expect(() => removeCache('u1', 'x', { storage: throwing })).not.toThrow();
    expect(() => clearAll({ storage: throwing })).not.toThrow();
  });
});

describe('isSameData', () => {
  it('compares by value', () => {
    expect(isSameData({ a: [1] }, { a: [1] })).toBe(true);
    expect(isSameData({ a: [1] }, { a: [2] })).toBe(false);
    expect(isSameData(null, { a: 1 })).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/local-cache.test.js`
Expected: FAIL — cannot find module `./local-cache.js`

- [ ] **Step 3: Implement** — `src/lib/local-cache.js`

```js
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
```

- [ ] **Step 4: Run to verify it passes** — `npx vitest run src/lib/local-cache.test.js` → PASS

- [ ] **Step 5: Commit** — `git add src/lib/local-cache.js src/lib/local-cache.test.js && git commit -m "feat(cache): local render cache scoped by uid with expiry"`

---

### Task 2: Write-through helpers + `clearedLevelsFromClears`

**Files:**
- Create: `src/lib/cache-writes.js`, `src/lib/cache-writes.test.js`
- Modify: `src/lib/stage-result-io.js` (หลัง `batch.commit()`)
- Modify: `src/lib/user-profile.js` (เพิ่ม `clearedLevelsFromClears`), `src/lib/user-profile.test.js`

**Interfaces:**
- Consumes: `readCache`, `writeCache`, `removeCache`, `readSession`, `writeSession` (Task 1)
- Produces:
  - `recordStageClear(uid, clearData, opts?)` — แทน/เพิ่มใน cache `clears` จับคู่ `stageId`; ลบ `overview`
  - `patchSessionUserDoc(uid, patch, opts?)` — merge `patch` เข้า `session.userDoc` เฉพาะเมื่อ `session.uid === uid`
  - `invalidateOverview(uid, opts?)`
  - `clearedLevelsFromClears(clears) → string[]` (ใน `user-profile.js`) = `getClearedLevels(<Map level→จำนวนด่านที่ผ่าน>, 20)`

- [ ] **Step 1: Write failing tests** — `src/lib/cache-writes.test.js`

```js
import { describe, it, expect } from 'vitest';
import { recordStageClear, patchSessionUserDoc, invalidateOverview } from './cache-writes.js';
import { readCache, writeCache, readSession, writeSession } from './local-cache.js';

function makeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    key: (i) => [...map.keys()][i] ?? null,
    get length() { return map.size; },
  };
}

describe('recordStageClear', () => {
  it('replaces an existing clear for the same stage and drops overview', () => {
    const storage = makeStorage();
    writeCache('u1', 'clears', [{ stageId: 's1', score: 0.5 }, { stageId: 's2', score: 1 }], { storage });
    writeCache('u1', 'overview', { totalStars: 3 }, { storage });
    recordStageClear('u1', { stageId: 's1', score: 0.9 }, { storage });
    expect(readCache('u1', 'clears', { storage })).toEqual([{ stageId: 's1', score: 0.9 }, { stageId: 's2', score: 1 }]);
    expect(readCache('u1', 'overview', { storage })).toBeNull();
  });

  it('appends a new clear, even with no cache yet', () => {
    const storage = makeStorage();
    recordStageClear('u1', { stageId: 's9', score: 1 }, { storage });
    expect(readCache('u1', 'clears', { storage })).toEqual([{ stageId: 's9', score: 1 }]);
  });

  it('ignores missing data', () => {
    const storage = makeStorage();
    recordStageClear('u1', null, { storage });
    expect(readCache('u1', 'clears', { storage })).toBeNull();
  });
});

describe('patchSessionUserDoc', () => {
  it('merges into the matching session', () => {
    const storage = makeStorage();
    writeSession({ uid: 'u1', userDoc: { nickname: 'a', onboardingComplete: true } }, { storage });
    patchSessionUserDoc('u1', { nickname: 'b' }, { storage });
    expect(readSession({ storage }).userDoc).toEqual({ nickname: 'b', onboardingComplete: true });
  });

  it('does nothing for a different uid', () => {
    const storage = makeStorage();
    writeSession({ uid: 'u1', userDoc: { nickname: 'a' } }, { storage });
    patchSessionUserDoc('u2', { nickname: 'b' }, { storage });
    expect(readSession({ storage }).userDoc).toEqual({ nickname: 'a' });
  });
});

describe('invalidateOverview', () => {
  it('removes overview', () => {
    const storage = makeStorage();
    writeCache('u1', 'overview', { x: 1 }, { storage });
    invalidateOverview('u1', { storage });
    expect(readCache('u1', 'overview', { storage })).toBeNull();
  });
});
```

Add to `src/lib/user-profile.test.js` (import `clearedLevelsFromClears` beside existing imports):

```js
describe('clearedLevelsFromClears', () => {
  it('counts cleared stages per level and returns fully cleared levels', () => {
    const clears = [
      ...Array.from({ length: 20 }, (_, i) => ({ level: 'A1', clearCount: 1, stageId: `a${i}` })),
      { level: 'A2', score: 0.9 },
      { level: 'A2', score: 0.2, clearCount: 0 },
      { score: 1 },
    ];
    expect(clearedLevelsFromClears(clears)).toEqual(getClearedLevels(new Map([['A1', 20], ['A2', 1]]), 20));
    expect(clearedLevelsFromClears(clears)).toContain('A1');
  });

  it('handles empty input', () => {
    expect(clearedLevelsFromClears([])).toEqual(getClearedLevels(new Map(), 20));
  });
});
```

- [ ] **Step 2: Run** `npx vitest run src/lib/cache-writes.test.js src/lib/user-profile.test.js` → FAIL (missing module / export)

- [ ] **Step 3: Implement** `src/lib/cache-writes.js`

```js
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
```

Add to `src/lib/user-profile.js` directly below `getClearedLevels`:

```js
// ด่านนับว่า "ผ่าน" เมื่อเคยผ่าน (clearCount > 0) หรือคะแนนดีที่สุด ≥ 70%
export function clearedLevelsFromClears(clears = []) {
  const clearsByLevel = new Map();
  for (const clear of clears) {
    const level = clear?.level;
    if (!level) continue;
    if ((clear.clearCount ?? 0) > 0 || (clear.score ?? 0) >= 0.7) {
      clearsByLevel.set(level, (clearsByLevel.get(level) ?? 0) + 1);
    }
  }
  return getClearedLevels(clearsByLevel, 20);
}
```

In `src/lib/stage-result-io.js` add import `import { recordStageClear } from './cache-writes.js';` and after `await batch.commit();`:

```js
  // commit สำเร็จแล้วเท่านั้น — ถ้าล้ม cache ไม่เปลี่ยน
  if (writes.stageClear) recordStageClear(uid, writes.stageClear.data);
```

- [ ] **Step 4: Run** `npm test` → PASS
- [ ] **Step 5: Commit** — `git commit -m "feat(cache): write-through for stage clears and session profile"`

---

### Task 3: `requireLogin(onReady, { onCached })` + ล้าง cache ตอนออกจากระบบ

**Files:**
- Modify: `src/lib/auth-guard.js`, `src/lib/auth-guard.test.js`, `src/dashboard.js:107-109`

**Interfaces:**
- Consumes: `readReadySession`, `writeSession`, `clearAll` (Task 1)
- Produces: `requireLogin(onReady, { onCached } = {})` — `onCached(cachedUser: { uid, displayName, email }, userDoc)` sync ก่อน Firebase; `onReady(firebaseUser, userDoc)` เหมือนเดิม

- [ ] **Step 1: Replace `src/lib/auth-guard.test.js`**

```js
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('firebase/auth', () => ({ onAuthStateChanged: vi.fn() }));
vi.mock('./firebase.js', () => ({ auth: {}, db: {} }));
vi.mock('./user-profile-io.js', () => ({ fetchUserDoc: vi.fn() }));

const { onAuthStateChanged } = await import('firebase/auth');
const { fetchUserDoc } = await import('./user-profile-io.js');
const { isAdmin, requireLogin } = await import('./auth-guard.js');
const { writeSession, readSession, writeCache, readCache } = await import('./local-cache.js');

function makeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    key: (i) => [...map.keys()][i] ?? null,
    get length() { return map.size; },
  };
}

let authCallback;
beforeEach(() => {
  globalThis.localStorage = makeStorage();
  globalThis.window = { location: { href: '' } };
  vi.mocked(onAuthStateChanged).mockReset().mockImplementation((_auth, cb) => {
    authCallback = cb;
    return () => {};
  });
  vi.mocked(fetchUserDoc).mockReset();
});

const READY_DOC = { onboardingComplete: true, nickname: 'ปิ๊ก' };

describe('isAdmin', () => {
  it('returns false when there is no user doc', () => expect(isAdmin(null)).toBe(false));
  it('returns false for a student', () => expect(isAdmin({ role: 'student' })).toBe(false));
  it('returns true for an admin', () => expect(isAdmin({ role: 'admin' })).toBe(true));
});

describe('requireLogin', () => {
  it('calls onCached synchronously, then onReady and saves the session', async () => {
    writeSession({ uid: 'u1', displayName: 'P', email: 'p@x', userDoc: READY_DOC });
    const calls = [];
    requireLogin((user, doc) => calls.push(['ready', user.uid, doc.nickname]), {
      onCached: (user, doc) => calls.push(['cached', user.uid, doc.nickname]),
    });
    expect(calls).toEqual([['cached', 'u1', 'ปิ๊ก']]);
    vi.mocked(fetchUserDoc).mockResolvedValue({ ...READY_DOC, nickname: 'ใหม่' });
    await authCallback({ uid: 'u1', displayName: 'P', email: 'p@x' });
    expect(calls[1]).toEqual(['ready', 'u1', 'ใหม่']);
    expect(readSession().userDoc.nickname).toBe('ใหม่');
  });

  it('skips onCached without a session or before onboarding', () => {
    const onCached = vi.fn();
    requireLogin(() => {}, { onCached });
    writeSession({ uid: 'u1', userDoc: { onboardingComplete: false } });
    requireLogin(() => {}, { onCached });
    expect(onCached).not.toHaveBeenCalled();
  });

  it('clears the cache and redirects when signed out', async () => {
    writeSession({ uid: 'u1', userDoc: READY_DOC });
    writeCache('u1', 'clears', [1]);
    requireLogin(() => {}, { onCached: () => {} });
    await authCallback(null);
    expect(readSession()).toBeNull();
    expect(readCache('u1', 'clears')).toBeNull();
    expect(window.location.href).toBe('/login.html');
  });

  it('clears the previous user cache when the uid differs', async () => {
    writeSession({ uid: 'old', userDoc: READY_DOC });
    writeCache('old', 'clears', [1]);
    vi.mocked(fetchUserDoc).mockResolvedValue(READY_DOC);
    const onReady = vi.fn();
    requireLogin(onReady, { onCached: () => {} });
    await authCallback({ uid: 'new', displayName: '', email: '' });
    expect(readCache('old', 'clears')).toBeNull();
    expect(readSession().uid).toBe('new');
    expect(onReady).toHaveBeenCalledTimes(1);
  });

  it('keeps the cached screen when the profile fetch fails after onCached', async () => {
    writeSession({ uid: 'u1', userDoc: READY_DOC });
    vi.mocked(fetchUserDoc).mockRejectedValue(new Error('offline'));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onReady = vi.fn();
    requireLogin(onReady, { onCached: () => {} });
    await authCallback({ uid: 'u1' });
    expect(onReady).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
    errorSpy.mockRestore();
  });

  it('redirects on fetch failure when nothing was shown from cache', async () => {
    vi.mocked(fetchUserDoc).mockRejectedValue(new Error('x'));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    requireLogin(() => {});
    await authCallback({ uid: 'u1' });
    expect(window.location.href).toBe('/login.html');
    errorSpy.mockRestore();
  });

  it('without onCached behaves as before but still saves the session', async () => {
    vi.mocked(fetchUserDoc).mockResolvedValue(READY_DOC);
    const onReady = vi.fn();
    requireLogin(onReady);
    await authCallback({ uid: 'u1', displayName: 'P', email: 'p@x' });
    expect(onReady).toHaveBeenCalledWith(expect.objectContaining({ uid: 'u1' }), READY_DOC);
    expect(readSession().uid).toBe('u1');
  });
});
```

- [ ] **Step 2: Run** `npx vitest run src/lib/auth-guard.test.js` → FAIL (onCached never called)

- [ ] **Step 3: Replace `requireLogin` in `src/lib/auth-guard.js`**

```js
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase.js';
import { fetchUserDoc } from './user-profile-io.js';
import { readReadySession, writeSession, clearAll } from './local-cache.js';

export function isAdmin(userDocData) {
  return !!userDocData && userDocData.role === 'admin';
}

function goToLogin() {
  window.location.href = `${import.meta.env.BASE_URL}login.html`;
}

// onCached (ถ้าส่งมา) ถูกเรียกทันทีจาก session ในเครื่อง เพื่อให้หน้าขึ้นก่อนรอ Firebase (~0.5–1 วินาที)
// onReady ถูกเรียกเมื่อ Auth + โปรไฟล์จาก server พร้อม เหมือนเดิม — หน้าต้อง render ซ้ำได้ปลอดภัย
export function requireLogin(onReady, { onCached } = {}) {
  const cached = onCached ? readReadySession() : null;
  let shownFromCache = false;
  if (cached) {
    try {
      onCached({ uid: cached.uid, displayName: cached.displayName, email: cached.email }, cached.userDoc);
      shownFromCache = true;
    } catch (error) {
      console.error(error);
    }
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      clearAll();
      goToLogin();
      return;
    }
    const sameUserAsCache = !!cached && cached.uid === firebaseUser.uid;
    if (cached && !sameUserAsCache) clearAll();

    let userDoc;
    try {
      userDoc = await fetchUserDoc(db, firebaseUser.uid);
    } catch (error) {
      console.error(error);
      // เน็ตหลุดแต่แสดงจาก cache ของคนเดิมไปแล้ว — คงหน้าจอไว้ ไม่เด้งเด็กออก
      if (shownFromCache && sameUserAsCache) return;
      goToLogin();
      return;
    }
    writeSession({
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName ?? '',
      email: firebaseUser.email ?? '',
      userDoc,
    });
    onReady(firebaseUser, userDoc);
  });
}
```

(`requireAdmin` unchanged — it calls `requireLogin` without `onCached`.)

In `src/dashboard.js` add `import { clearAll } from './lib/local-cache.js';` and change the sign-out handler:

```js
document.getElementById('sign-out-btn').addEventListener('click', () => {
  // ล้างก่อน signOut — เครื่องใช้ร่วม (แท็บเล็ตโรงเรียน) ต้องไม่เหลือข้อมูลคนเก่า
  clearAll();
  signOut(auth);
});
```

- [ ] **Step 4: Run** `npm test` → PASS
- [ ] **Step 5: Commit** — `git commit -m "feat(auth): render from cached session before Firebase resolves"`

---

### Task 4: เปิดแอปเร็ว — `index.html` และ `login.js`

**Files:**
- Modify: `src/index.html` (head), `src/login.js` (บนสุดหลัง imports)
- Create: `src/lib/app-entry.test.js`

**Interfaces:**
- Consumes: `SESSION_KEY`, `MAX_AGE_MS`, `readReadySession` (Task 1)

- [ ] **Step 1: Write failing test** — `src/lib/app-entry.test.js`

```js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { SESSION_KEY, MAX_AGE_MS } from './local-cache.js';

// index.html ไม่มี JS bundle จึง import ไม่ได้ — ค่าที่ copy ไว้ต้องตรงกับ local-cache.js
describe('src/index.html fast entry', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  it('uses the same session key and max age as local-cache.js', () => {
    expect(html).toContain(`'${SESSION_KEY}'`);
    expect(html).toContain(String(MAX_AGE_MS));
  });
  it('runs the redirect script before the meta refresh', () => {
    expect(html.indexOf(SESSION_KEY)).toBeLessThan(html.indexOf('http-equiv="refresh"'));
  });
});
```

- [ ] **Step 2: Run** `npx vitest run src/lib/app-entry.test.js` → FAIL

- [ ] **Step 3: Implement.** In `src/index.html`, insert immediately before `<meta http-equiv="refresh" ...>`:

```html
  <script>
    // มี session ที่ onboarding แล้วในเครื่อง → ข้ามหน้า login ไปหน้าหลักเลย (หน้าหลักจะตรวจ Auth เอง)
    // ค่า key และอายุต้องตรงกับ src/lib/local-cache.js (มี test ตรวจ)
    try {
      var raw = localStorage.getItem('pik_cache_v1:session');
      var s = raw && JSON.parse(raw);
      if (s && s.uid && s.userDoc && s.userDoc.onboardingComplete === true &&
          typeof s.savedAt === 'number' && Date.now() - s.savedAt <= 604800000) {
        location.replace('./dashboard.html');
      }
    } catch (e) {}
  </script>
```

In `src/login.js`, add `import { readReadySession } from './lib/local-cache.js';` and directly after the imports:

```js
// เคยล็อกอินและ onboarding แล้ว → ไปหน้าหลักทันที ไม่ต้องรอ Firebase
// ถ้า session หมดจริง หน้าหลักจะล้าง cache แล้วส่งกลับมาที่นี่ (ไม่วน เพราะ cache ถูกล้างแล้ว)
if (readReadySession()) {
  window.location.replace('./dashboard.html');
}
```

- [ ] **Step 4: Run** `npm test` → PASS
- [ ] **Step 5: Commit** — `git commit -m "perf(entry): skip login page when a cached session exists"`

---

### Task 5: Skeleton CSS

**Files:**
- Modify: `src/styles/base.css` (ต่อท้ายไฟล์)

- [ ] **Step 1: Append to `src/styles/base.css`**

```css
/* ==========================================================================
   Skeleton — โครงร่างระหว่างรอข้อมูลครั้งแรก (ครั้งต่อไปใช้ cache แทน)
   ========================================================================== */
.skeleton {
  display: block;
  background: linear-gradient(90deg, #eef1f4 25%, #f7f9fa 50%, #eef1f4 75%);
  background-size: 200% 100%;
  border-radius: var(--radius);
  animation: skeleton-shimmer 1.2s ease-in-out infinite;
}

.skeleton-text {
  height: 1em;
  margin: 0.35em 0;
  border-radius: var(--radius-sm);
}

.skeleton-pill {
  display: inline-block;
  width: 88px;
  height: 28px;
  border-radius: var(--radius-full);
  vertical-align: middle;
}

.skeleton-card {
  min-height: 180px;
  border-radius: var(--radius-lg);
}

.skeleton-row {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

@keyframes skeleton-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}
```

- [ ] **Step 2: Run** `npm run build` → success
- [ ] **Step 3: Commit** — `git commit -m "style: skeleton placeholders for first load"`

---

### Task 6: หน้าหลัก (`dashboard.js`, `dashboard.html`)

**Files:**
- Modify: `src/dashboard.js` (block `requireLogin(...)` ทั้งก้อน), `src/dashboard.html:26` และ `#hero-stats`

**Interfaces:**
- Consumes: `requireLogin(onReady, { onCached })`, `readCache/writeCache/isSameData`

- [ ] **Step 1: HTML.** `src/dashboard.html`:
  - line 26 `<span id="user-pill">กำลังโหลด…</span>` → `<span id="user-pill" aria-busy="true"><span class="skeleton skeleton-pill" aria-hidden="true"></span></span>`
  - right after the `#hero-stats` div add:

```html
        <div id="hero-stats-skeleton" class="hero-stats-row skeleton-row" aria-hidden="true">
          <span class="skeleton skeleton-pill"></span>
          <span class="skeleton skeleton-pill"></span>
          <span class="skeleton skeleton-pill"></span>
        </div>
```

- [ ] **Step 2: JS.** Replace the whole `requireLogin(async (firebaseUser, userDoc) => { ... });` block in `src/dashboard.js` with:

```js
function renderProfile(user, userDoc) {
  const callName = userDoc?.callName?.trim();
  const nickname = userDoc?.nickname?.trim();
  const displayName = nickname || user.displayName || 'เพื่อนๆ';

  const avatarId = userDoc?.avatarId || 'avatar-1';
  const avatarSrc = getAvatarSrc(avatarId, base, 'webp');

  const mascotEl = document.getElementById('dashboard-mascot');
  if (mascotEl) {
    mascotEl.onerror = () => {
      mascotEl.src = getAvatarSrc(avatarId, base, 'png');
    };
    if (mascotEl.getAttribute('src') !== avatarSrc) mascotEl.src = avatarSrc;
    mascotEl.alt = 'น้องหยกอวตาร';
  }

  const greetingTarget = callName ? callName : `คุณ ${displayName}`;
  const welcomeEl = document.getElementById('welcome-message');
  if (welcomeEl) welcomeEl.textContent = `สวัสดี${greetingTarget}!`;

  const userPill = document.getElementById('user-pill');
  if (userPill) {
    userPill.innerHTML = `
      <span class="user-pill-avatar-wrap">
        <img class="user-pill-avatar" alt="Avatar" width="22" height="22" />
      </span>
      <span class="user-pill-name"></span>
    `;
    // ชื่อมาจากผู้ใช้กรอกเอง — ใส่ผ่าน textContent เสมอ ห้ามแทรกลง innerHTML
    userPill.querySelector('.user-pill-avatar').src = avatarSrc;
    userPill.querySelector('.user-pill-name').textContent = callName || displayName;
    userPill.removeAttribute('aria-busy');
  }

  // ตั้งทั้งสองทาง: cache อาจบอกว่าเป็นแอดมิน แต่ server บอกว่าไม่ใช่แล้ว
  const admin = isAdmin(userDoc);
  const adminLink = document.getElementById('admin-link');
  if (adminLink) adminLink.href = `${base}admin/index.html`;
  const adminEntry = document.getElementById('admin-entry');
  if (adminEntry) adminEntry.hidden = !admin;
  const navAdminLink = document.getElementById('nav-admin-link');
  if (navAdminLink) {
    navAdminLink.href = `${base}admin/index.html`;
    navAdminLink.hidden = !admin;
  }
}

function renderStats(overview) {
  const statStars = document.getElementById('stat-stars');
  const statStages = document.getElementById('stat-stages');
  const statQuestions = document.getElementById('stat-questions');
  if (statStars) statStars.textContent = overview.totalStars;
  if (statStages) statStages.textContent = overview.totalStagesCleared;
  if (statQuestions) statQuestions.textContent = overview.totalQuestionsAnswered;
  const heroStats = document.getElementById('hero-stats');
  if (heroStats) heroStats.hidden = false;
  const skeleton = document.getElementById('hero-stats-skeleton');
  if (skeleton) skeleton.hidden = true;
}

let shownOverview = null;

requireLogin(async (firebaseUser, userDoc) => {
  renderProfile(firebaseUser, userDoc);

  try {
    const [clearsSnap, subsSnap] = await Promise.all([
      getDocs(query(collection(db, 'stageClears'), where('uid', '==', firebaseUser.uid))),
      getDocs(query(collection(db, 'submissions'), where('uid', '==', firebaseUser.uid))),
    ]);
    const stageClears = clearsSnap.docs.map((d) => d.data());
    const submissions = subsSnap.docs.map((d) => d.data());
    // เก็บเฉพาะตัวเลขที่คำนวณแล้ว submissions ดิบโตเรื่อยๆ ไม่เก็บลงเครื่อง
    const overview = calculateStudentOverview({ submissions, stageClears });

    if (!isSameData(overview, shownOverview)) renderStats(overview);
    shownOverview = overview;
    writeCache(firebaseUser.uid, 'overview', overview);
    writeCache(firebaseUser.uid, 'clears', stageClears);
  } catch (error) {
    console.error('Failed to load student progress:', error);
  }
}, {
  onCached(user, userDoc) {
    renderProfile(user, userDoc);
    const overview = readCache(user.uid, 'overview');
    if (overview) {
      renderStats(overview);
      shownOverview = overview;
    }
  },
});
```

Add imports: `import { readCache, writeCache, isSameData, clearAll } from './lib/local-cache.js';` (merge with Task 3's `clearAll` import).

- [ ] **Step 3: Run** `npm test && npm run build` → PASS
- [ ] **Step 4: Commit** — `git commit -m "perf(dashboard): render profile and stats from cache first"`

---

### Task 7: ตะลุยด่าน (`learn/index.js`, `learn/index.html`)

**Files:**
- Modify: `src/learn/index.html:35`, `src/learn/index.js` (block `requireLogin` ท้ายไฟล์)

- [ ] **Step 1: HTML.** Replace `<p id="loading-note" class="hint">กำลังสำรวจเกาะต่างๆ…</p>` with:

```html
    <div id="loading-note" class="island-grid" aria-hidden="true">
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    </div>
```

(`#loading-note` id is kept so the existing `loadingNote.hidden = true` lines keep working. Also check `src/styles/learn.css:119` — if `#loading-note` has text styles there, leave it; it only affects the removed `<p>`.)

- [ ] **Step 2: JS.** Replace the `requireLogin(async (firebaseUser, userDoc) => { ... });` block at the end of `src/learn/index.js` with:

```js
function stagesCacheName(tier, isUserAdmin) {
  return `stages:index:${isUserAdmin ? 'admin' : tier}`;
}

async function loadStages(tier, isUserAdmin, allowedLevels) {
  if (tier === 'full' || isUserAdmin) {
    return fetchStages(db, { tier, allowedLevels });
  }
  const perLevel = await Promise.all(
    ['A1', 'A2', 'B1', 'B2'].map((level) =>
      fetchStages(db, { skill: 'grammar', level, tier: 'free', allowedLevels })),
  );
  return perLevel.flat();
}

let shownModel = null;

function show(model, userDoc) {
  const isUserAdmin = isAdmin(userDoc);
  const navAdminLink = document.getElementById('nav-admin-link');
  if (navAdminLink) {
    navAdminLink.href = `${base}admin/index.html`;
    navAdminLink.hidden = !isUserAdmin;
  }
  document.getElementById('loading-note').hidden = true;
  render(model.stages, readTier(userDoc), isUserAdmin, userDoc, model.clears);
  shownModel = model;
}

requireLogin(async (firebaseUser, userDoc) => {
  const isUserAdmin = isAdmin(userDoc);
  const tier = readTier(userDoc);
  try {
    const [stages, clears] = await Promise.all([
      loadStages(tier, isUserAdmin, userDoc?.allowedLevels),
      fetchMyClears(db, firebaseUser.uid).catch(() => null),
    ]);
    // clears โหลดไม่ได้ → ใช้ของเดิมใน cache ดีกว่าแสดงว่ายังไม่ผ่านอะไรเลย
    const safeClears = clears ?? readCache(firebaseUser.uid, 'clears') ?? [];
    const model = { stages, clears: safeClears, userDoc };
    if (!isSameData(model, shownModel)) show(model, userDoc);
    writeCache(firebaseUser.uid, stagesCacheName(tier, isUserAdmin), stages);
    if (clears) writeCache(firebaseUser.uid, 'clears', clears);
  } catch (error) {
    console.error(error);
    if (shownModel) return; // แสดงจาก cache อยู่แล้ว คงไว้
    document.getElementById('loading-note').hidden = true;
    showPageError('โหลดบทเรียนไม่สำเร็จ กรุณาลองใหม่');
  }
}, {
  onCached(user, userDoc) {
    const stages = readCache(user.uid, stagesCacheName(readTier(userDoc), isAdmin(userDoc)));
    if (!stages) return;
    const clears = readCache(user.uid, 'clears') ?? [];
    show({ stages, clears, userDoc }, userDoc);
  },
});
```

Add import: `import { readCache, writeCache, isSameData } from '../lib/local-cache.js';`

Note: `render()` already calls `container.replaceChildren()` and creates buttons (with their listeners) fresh each call, so calling it twice is safe.

- [ ] **Step 3: Run** `npm test && npm run build` → PASS
- [ ] **Step 4: Commit** — `git commit -m "perf(learn): render islands from cache first"`

---

### Task 8: เส้นทางด่าน (`learn/path.js`, `learn/path.html`)

**Files:**
- Modify: `src/learn/path.html:33`, `src/learn/path.js` (the `requireLogin(async ...)` in the `else` branch)

- [ ] **Step 1: HTML.** Replace `<p id="loading-note" class="hint">กำลังโหลด…</p>` with:

```html
    <div id="loading-note" aria-hidden="true">
      <div class="skeleton skeleton-text" style="width: 60%; margin: 0 auto;"></div>
      <div class="skeleton skeleton-card" style="margin-top: var(--space-3);"></div>
      <div class="skeleton skeleton-card" style="margin-top: var(--space-3);"></div>
    </div>
```

- [ ] **Step 2: JS.** In `src/learn/path.js`, replace the second `requireLogin(async (firebaseUser, userDoc) => { ... });` (inside `else`) with:

```js
  const stagesName = (userDoc) => `stages:${skill}:${level}:${isAdmin(userDoc) ? 'admin' : readTier(userDoc)}`;
  let shownModel = null;

  // คืน true เมื่อวาดเส้นทางได้ / false เมื่อต้องแสดงหน้าว่าง (ไม่เก็บ cache ในกรณีนั้น)
  function showPath({ stages, clears }, userDoc) {
    const clearedLevels = clearedLevelsFromClears(clears);
    if (!isLevelAllowed(userDoc, level, clearedLevels)) {
      showEmpty(`ระดับ ${level} ยังไม่เปิดสำหรับบัญชีของคุณ ติดต่อผู้สอนเพื่อขอเปิดด่านระดับนี้ได้เลยครับ`, `${base}learn/index.html`);
      return false;
    }
    if (stages.length === 0) {
      const msg = isAdmin(userDoc)
        ? `ยังไม่มีด่านที่อนุมัติสำหรับระดับ ${level} (คุณล็อกอินเป็นแอดมิน สามารถไปตรวจสอบและอนุมัติด่านฉบับร่างได้ที่หน้าจัดการด่านครับ)`
        : `ยังไม่มีด่านสำหรับระดับ ${level} ในหมวดนี้ ลองเลือกบทเรียนอื่นดูก่อนนะครับ`;
      showEmpty(msg, `${base}learn/index.html`);
      if (isAdmin(userDoc)) {
        const emptyBack = document.getElementById('empty-back');
        if (emptyBack) {
          emptyBack.textContent = 'ไปหน้าจัดการด่าน (Admin Stages) →';
          emptyBack.href = `${base}admin/stages.html`;
        }
      }
      return false;
    }
    document.getElementById('empty-state').hidden = true;
    const path = buildStagePath(stages, clearsByStageId(clears));
    const cleared = path.filter((stage) => stage.cleared).length;
    document.getElementById('loading-note').hidden = true;
    document.getElementById('path-summary').textContent =
      `ระดับ ${level} · ผ่านแล้ว ${cleared} จาก ${path.length} ด่าน`;
    document.getElementById('total-stars').textContent = `★ ${totalStars(path)} ดาว`;
    renderPath(path);
    return true;
  }

  requireLogin(async (firebaseUser, userDoc) => {
    try {
      const fetched = await fetchMyClears(db, firebaseUser.uid).catch(() => null);
      const clears = fetched ?? readCache(firebaseUser.uid, 'clears') ?? [];
      const allowed = isLevelAllowed(userDoc, level, clearedLevelsFromClears(clears));
      const stages = allowed
        ? await fetchStages(db, { skill, level, tier: readTier(userDoc), allowedLevels: userDoc?.allowedLevels })
        : [];
      const model = { stages, clears };
      if (!isSameData(model, shownModel)) {
        shownModel = model;
        if (showPath(model, userDoc) && stages.length > 0) {
          writeCache(firebaseUser.uid, stagesName(userDoc), stages);
        }
      } else if (stages.length > 0) {
        writeCache(firebaseUser.uid, stagesName(userDoc), stages);
      }
      if (fetched) writeCache(firebaseUser.uid, 'clears', fetched);
    } catch (error) {
      console.error(error);
      if (shownModel) return; // แสดงจาก cache อยู่แล้ว คงไว้
      // ปุ่ม "← กลับ" ที่หัวหน้ายังกดได้เสมอ นักเรียนจึงไม่ตันแม้โหลดล้มเหลว
      document.getElementById('loading-note').hidden = true;
      showPageError('โหลดเส้นทางด่านไม่สำเร็จ กรุณาลองใหม่');
    }
  }, {
    onCached(user, userDoc) {
      const stages = readCache(user.uid, stagesName(userDoc));
      if (!stages || stages.length === 0) return;
      const model = { stages, clears: readCache(user.uid, 'clears') ?? [] };
      if (showPath(model, userDoc)) shownModel = model;
    },
  });
```

Imports: add `import { readCache, writeCache, isSameData } from '../lib/local-cache.js';` and add `clearedLevelsFromClears` to the existing `../lib/user-profile.js` import (keep `isLevelAllowed`; remove `getClearedLevels` from the import if no longer used in this file — check with `grep -n getClearedLevels src/learn/path.js`).

Note: `showEmpty` hides `#path-canvas`; `renderPath` sets `canvas.hidden = false` and calls `replaceChildren()`, so switching between them on re-render is safe. `showPath` explicitly hides `#empty-state` when drawing.

- [ ] **Step 3: Run** `npm test && npm run build` → PASS
- [ ] **Step 4: Commit** — `git commit -m "perf(path): render stage path from cache first"`

---

### Task 9: คลังคำศัพท์ (`vocab/hub.js`, `vocab/index.html`)

**Files:**
- Modify: `src/vocab/index.html:26`, `src/vocab/hub.js` (block `requireLogin` at line ~64)

- [ ] **Step 1: HTML.** `<span id="user-pill" class="user-pill">ผู้เรียน</span>` → `<span id="user-pill" class="user-pill"><span class="skeleton skeleton-text" style="width: 64px; margin: 0;" aria-hidden="true"></span></span>`

- [ ] **Step 2: JS.** Replace the `requireLogin(async (firebaseUser, userDoc) => { ... });` block with:

```js
let eventsBound = false;

function applyUser(user, userDoc, clears) {
  currentUid = user.uid;
  currentUserDoc = userDoc;
  favoriteIds = getFavoriteIds(userDoc, currentUid);
  userPill.textContent = userDoc?.callName || userDoc?.nickname || user.email;
  if (favFilterCount) favFilterCount.textContent = `(${favoriteIds.length})`;

  clearedLevels = clears ? clearedLevelsFromClears(clears) : [];
  unlockedLevels = getUnlockedLevels(userDoc, clearedLevels);

  renderLevelFilterButtons();
  if (!eventsBound) {
    // ผูกครั้งเดียว — applyUser ถูกเรียกสองรอบ (cache แล้ว server)
    setupCategoryFilters();
    setupLockDialog();
    setupEventListeners();
    eventsBound = true;
  }
  updateDeck();
}

let shownState = null;

requireLogin(async (firebaseUser, userDoc) => {
  let clears = null;
  try {
    clears = await fetchMyClears(db, firebaseUser.uid);
    writeCache(firebaseUser.uid, 'clears', clears);
  } catch (err) {
    console.warn('Could not fetch clears for vocab unlock:', err);
    clears = readCache(firebaseUser.uid, 'clears');
  }
  const state = { userDoc, levels: getUnlockedLevels(userDoc, clearedLevelsFromClears(clears ?? [])) };
  if (!isSameData(state, shownState)) applyUser(firebaseUser, userDoc, clears);
  shownState = state;
}, {
  onCached(user, userDoc) {
    const clears = readCache(user.uid, 'clears');
    applyUser(user, userDoc, clears);
    shownState = { userDoc, levels: getUnlockedLevels(userDoc, clearedLevelsFromClears(clears ?? [])) };
  },
});
```

Imports: add `import { readCache, writeCache, isSameData } from '../lib/local-cache.js';`; change `import { getClearedLevels, getUnlockedLevels } from '../lib/user-profile.js';` to `import { clearedLevelsFromClears, getUnlockedLevels } from '../lib/user-profile.js';`.

Before editing, read `setupCategoryFilters`, `setupLockDialog`, `setupEventListeners` (lines ~165–360) and confirm they only bind listeners / static setup. If `updateDeck` resets the current card index, that is acceptable: the second call only happens when data differs.

- [ ] **Step 3: Run** `npm test && npm run build` → PASS
- [ ] **Step 4: Commit** — `git commit -m "perf(vocab): render vocab hub from cache first"`

---

### Task 10: Animal Cafe (`vocab/cafe.js`, `vocab/cafe.html`)

**Files:**
- Modify: `src/vocab/cafe.html:27`, `src/vocab/cafe.js` (block `requireLogin` line ~82, save stats ~390, session save ~449)

- [ ] **Step 1: HTML.** Same pill change as Task 9 Step 1 in `src/vocab/cafe.html`.

- [ ] **Step 2: JS.** Replace the `requireLogin(async (firebaseUser, userDoc) => { ... });` block with:

```js
let eventsBound = false;

function applyUser(user, userDoc, clears) {
  currentStudent = { uid: user.uid, ...userDoc };
  favoriteIds = getFavoriteIds(userDoc, user.uid);
  userPill.textContent = userDoc?.callName || userDoc?.nickname || user.email;
  clearedLevels = clears ? clearedLevelsFromClears(clears) : [];
  unlockedLevels = getUnlockedLevels(userDoc, clearedLevels);
  updateLevelSelectOptions();
  if (!eventsBound) {
    setupEvents();
    eventsBound = true;
  }
}

let shownState = null;

requireLogin(async (firebaseUser, userDoc) => {
  let clears = null;
  try {
    clears = await fetchMyClears(db, firebaseUser.uid);
    writeCache(firebaseUser.uid, 'clears', clears);
  } catch (err) {
    console.warn('Could not fetch clears for cafe level unlock:', err);
    clears = readCache(firebaseUser.uid, 'clears');
  }
  const state = { userDoc, levels: getUnlockedLevels(userDoc, clearedLevelsFromClears(clears ?? [])) };
  // ระหว่างเล่นเกมอยู่ ห้ามแตะ currentStudent — เกมอ้างอิงสถิติเดิมอยู่
  if (!isSameData(state, shownState) && !isGameRunning()) applyUser(firebaseUser, userDoc, clears);
  shownState = state;
}, {
  onCached(user, userDoc) {
    const clears = readCache(user.uid, 'clears');
    applyUser(user, userDoc, clears);
    shownState = { userDoc, levels: getUnlockedLevels(userDoc, clearedLevelsFromClears(clears ?? [])) };
  },
});
```

`isGameRunning()`: before writing it, find how cafe.js tracks an active game (`grep -n "session\b\|let session\|gameActive\|isPlaying\|screen" src/vocab/cafe.js` and check `src/lib/pwa-update.js` `isBusy`). Implement as a small function in cafe.js returning that existing flag, e.g.:

```js
function isGameRunning() {
  return !!session && !session.finished;
}
```

adapted to the real variable names found. If the student could not have started a game before `onReady` (menu only), this guard still prevents surprises on slow networks.

Write-through — after the successful `await setDoc(doc(db, 'users', currentStudent.uid), { speedCafeStats: updatedStats }, { merge: true });` add:

```js
      patchSessionUserDoc(currentStudent.uid, { speedCafeStats: updatedStats });
```

After the successful `await saveVocabSessionResults(db, {...});` add:

```js
      invalidateOverview(currentStudent.uid);
```

Imports: `import { readCache, writeCache, isSameData } from '../lib/local-cache.js';`, `import { patchSessionUserDoc, invalidateOverview } from '../lib/cache-writes.js';`, change `getClearedLevels` → `clearedLevelsFromClears` in the `user-profile.js` import.

- [ ] **Step 3: Run** `npm test && npm run build` → PASS
- [ ] **Step 4: Commit** — `git commit -m "perf(cafe): render menu from cache first; keep cache in sync after games"`

---

### Task 11: โปรไฟล์ (`profile.js`, `profile.html`)

**Files:**
- Modify: `src/profile.html:42`, `src/profile.js` (block `requireLogin` line ~299)

- [ ] **Step 1: HTML.** `<h1 id="hero-display-name" class="profile-hero-name">กำลังโหลด…</h1>` → `<h1 id="hero-display-name" class="profile-hero-name"><span class="skeleton skeleton-text" style="width: 160px;" aria-hidden="true"></span></h1>`

- [ ] **Step 2: JS.** Restructure the `requireLogin` block into these pieces (keep every existing statement; only move them):

```js
let formDirty = false;
let shownStats = null;

function renderIdentity(user, userDoc) {
  currentUid = user.uid;
  profileFavoriteIds = getFavoriteIds(userDoc, currentUid);
  renderFavoriteVocab(profileFavoriteIds);

  const navAdminLink = document.getElementById('nav-admin-link');
  if (navAdminLink) {
    navAdminLink.href = `${base}admin/index.html`;
    navAdminLink.hidden = !isAdmin(userDoc);
  }

  // ... existing hero code unchanged (selectedAvatarId, updateHeroAvatar, nickname/fullName/displayName,
  //     heroDisplayName, heroEmail (use user.email), heroTierBadge) ...

  // ห้ามทับสิ่งที่ผู้ใช้กำลังพิมพ์อยู่ตอนข้อมูลจาก server มาถึง
  if (!formDirty) {
    // ... existing "Populate form" code unchanged (prefix radios + input values) ...
  }
}

function renderStats(overview, stageClears, userDoc) {
  // ... existing code from "Update Stats Card" through renderBadges(badges) unchanged,
  //     using the parameters instead of local variables ...
}

if (profileForm) {
  profileForm.addEventListener('input', () => { formDirty = true; });
  profileForm.addEventListener('submit', async (e) => {
    // ... existing submit handler body unchanged, plus after the successful setDoc:
    //   patchSessionUserDoc(currentUid, updatePayload);
    //   formDirty = false;
  });
}

requireLogin(async (firebaseUser, userDoc) => {
  renderIdentity(firebaseUser, userDoc);
  try {
    const [clearsSnap, subsSnap] = await Promise.all([
      getDocs(query(collection(db, 'stageClears'), where('uid', '==', firebaseUser.uid))),
      getDocs(query(collection(db, 'submissions'), where('uid', '==', firebaseUser.uid))),
    ]);
    const stageClears = clearsSnap.docs.map((d) => d.data());
    const submissions = subsSnap.docs.map((d) => d.data());
    const overview = calculateStudentOverview({ submissions, stageClears });
    const stats = { overview, stageClears, cafe: userDoc?.speedCafeStats ?? null };
    if (!isSameData(stats, shownStats)) renderStats(overview, stageClears, userDoc);
    shownStats = stats;
    writeCache(firebaseUser.uid, 'overview', overview);
    writeCache(firebaseUser.uid, 'clears', stageClears);
  } catch (err) {
    console.error('Failed to load profile stats:', err);
  }
}, {
  onCached(user, userDoc) {
    renderIdentity(user, userDoc);
    const overview = readCache(user.uid, 'overview');
    const stageClears = readCache(user.uid, 'clears');
    if (overview && stageClears) {
      renderStats(overview, stageClears, userDoc);
      shownStats = { overview, stageClears, cafe: userDoc?.speedCafeStats ?? null };
    }
  },
});
```

The submit listener moves **out** of the `requireLogin` callback (today it is bound inside it; a second callback would bind it twice). It reads `currentUid` / `selectedAvatarId` at submit time, which are module-level and set by `renderIdentity`. The existing `if (heroDisplayName) heroDisplayName.textContent = ...` inside submit stays.

Imports: `import { readCache, writeCache, isSameData } from './lib/local-cache.js';`, `import { patchSessionUserDoc } from './lib/cache-writes.js';`

- [ ] **Step 3: Run** `npm test && npm run build` → PASS
- [ ] **Step 4: Commit** — `git commit -m "perf(profile): render from cache first; bind form once"`

---

### Task 12: Verify, deploy, measure

- [ ] **Step 1:** `npm test && npm run check:vocab && npm run check:content && npm run build` → all pass
- [ ] **Step 2:** `npm run preview`, open `http://localhost:4173/pik-a-class/` in Chrome (Claude in Chrome), sign in is done by the user; click through dashboard → learn → path → back → vocab → cafe → profile → sign out. Check console has no errors, sign-out clears `pik_cache_*` in localStorage (`Object.keys(localStorage)`), admin button state correct.
- [ ] **Step 3:** Ask Pik before `git push origin master:main` (deploys to students).
- [ ] **Step 4:** After deploy, re-run the timing script from the spec §6 on every page (second visit) and on `/pik-a-class/` entry; record results in the spec's §1 table as an "after" column and commit.
