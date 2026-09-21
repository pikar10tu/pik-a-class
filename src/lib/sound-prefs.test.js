import { describe, it, expect } from 'vitest';
import { loadMuted, saveMuted, SOUND_MUTED_STORAGE_KEY } from './sound-prefs.js';

// fake storage เพื่อทดสอบ logic ล้วนๆ โดยไม่ต้องพึ่ง localStorage ของเบราว์เซอร์จริงหรือ jsdom
function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
    data,
  };
}

describe('loadMuted', () => {
  it('defaults to unmuted when nothing is stored', () => {
    expect(loadMuted(fakeStorage())).toBe(false);
  });

  it('reads a previously saved muted state', () => {
    expect(loadMuted(fakeStorage({ [SOUND_MUTED_STORAGE_KEY]: '1' }))).toBe(true);
  });

  it('reads a previously saved unmuted state', () => {
    expect(loadMuted(fakeStorage({ [SOUND_MUTED_STORAGE_KEY]: '0' }))).toBe(false);
  });

  it('falls back to unmuted (never throws) when storage is unavailable', () => {
    const throwing = {
      getItem: () => {
        throw new Error('storage disabled');
      },
    };
    expect(() => loadMuted(throwing)).not.toThrow();
    expect(loadMuted(throwing)).toBe(false);
  });

  it('falls back to unmuted when there is no storage at all', () => {
    expect(loadMuted(undefined)).toBe(false);
    expect(loadMuted(null)).toBe(false);
  });
});

describe('saveMuted', () => {
  it('persists a muted state that loadMuted reads back', () => {
    const storage = fakeStorage();
    saveMuted(storage, true);
    expect(loadMuted(storage)).toBe(true);
  });

  it('persists an unmuted state that loadMuted reads back', () => {
    const storage = fakeStorage({ [SOUND_MUTED_STORAGE_KEY]: '1' });
    saveMuted(storage, false);
    expect(loadMuted(storage)).toBe(false);
  });

  it('never throws even when storage rejects the write (e.g. full or disabled)', () => {
    const throwing = {
      setItem: () => {
        throw new Error('quota exceeded');
      },
    };
    expect(() => saveMuted(throwing, true)).not.toThrow();
  });

  it('never throws when there is no storage at all', () => {
    expect(() => saveMuted(undefined, true)).not.toThrow();
  });
});
