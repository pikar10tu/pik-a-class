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
