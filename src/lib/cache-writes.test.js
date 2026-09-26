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
