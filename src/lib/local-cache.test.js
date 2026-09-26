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
