import { describe, it, expect } from 'vitest';
import {
  buildNewUserDoc,
  getPostLoginRedirect,
  isLevelAllowed,
  getClearedLevels,
  clearedLevelsFromClears,
  getUnlockedLevels,
  AVATAR_LIST,
  DEFAULT_AVATAR,
  getAvatarSrc,
  validateProfileData,
} from './user-profile.js';

describe('buildNewUserDoc', () => {
  it('builds a stub doc defaulting role, tier, and onboarding state', () => {
    const firebaseUser = { uid: 'abc123', email: 'a@b.com', displayName: 'Aum' };
    const doc = buildNewUserDoc(firebaseUser);

    expect(doc.uid).toBe('abc123');
    expect(doc.email).toBe('a@b.com');
    expect(doc.fullName).toBe('Aum');
    expect(doc.nickname).toBe('');
    expect(doc.avatarId).toBe('avatar-1');
    expect(doc.role).toBe('student');
    expect(doc.tier).toBe('free');
    expect(doc.onboardingComplete).toBe(false);
    expect(typeof doc.createdAt).toBe('string');
  });

  it('falls back to an empty fullName when displayName is missing', () => {
    const doc = buildNewUserDoc({ uid: 'abc123', email: 'a@b.com', displayName: null });
    expect(doc.fullName).toBe('');
  });
});

describe('getPostLoginRedirect', () => {
  it('sends brand-new users (no doc) to onboarding', () => {
    expect(getPostLoginRedirect(null)).toBe('onboarding');
  });

  it('sends users with an incomplete onboarding flag to onboarding', () => {
    expect(getPostLoginRedirect({ onboardingComplete: false })).toBe('onboarding');
  });

  it('sends fully onboarded users to the dashboard', () => {
    expect(getPostLoginRedirect({ onboardingComplete: true })).toBe('dashboard');
  });
});

describe('isLevelAllowed and progression helpers', () => {
  it('always allows admins full access to any level', () => {
    expect(isLevelAllowed({ role: 'admin' }, 'A1')).toBe(true);
    expect(isLevelAllowed({ role: 'admin' }, 'B2')).toBe(true);
    expect(getUnlockedLevels({ role: 'admin' })).toEqual(['A1', 'A2', 'B1', 'B2']);
  });

  it('allows full tier users A1 by default, and unlocks subsequent levels progressively upon clear', () => {
    const fullStudent = { role: 'student', tier: 'full' };
    expect(isLevelAllowed(fullStudent, 'A1')).toBe(true);
    // When A1 is not cleared yet, A2, B1, B2 are locked
    expect(isLevelAllowed(fullStudent, 'A2', [])).toBe(false);
    expect(isLevelAllowed(fullStudent, 'B1', [])).toBe(false);

    // When A1 is cleared, A2 unlocks!
    expect(isLevelAllowed(fullStudent, 'A2', ['A1'])).toBe(true);
    expect(isLevelAllowed(fullStudent, 'B1', ['A1'])).toBe(false);

    // When A2 is cleared, B1 unlocks!
    expect(isLevelAllowed(fullStudent, 'B1', ['A1', 'A2'])).toBe(true);
    expect(isLevelAllowed(fullStudent, 'B2', ['A1', 'A2'])).toBe(false);

    // When B1 is cleared, B2 unlocks!
    expect(isLevelAllowed(fullStudent, 'B2', ['A1', 'A2', 'B1'])).toBe(true);
    expect(getUnlockedLevels(fullStudent, ['A1', 'A2'])).toEqual(['A1', 'A2', 'B1']);
  });

  it('allows teacher to override progression via allowedLevels for both full and free tiers', () => {
    const customStudent = { role: 'student', tier: 'full', allowedLevels: ['B2'] };
    // Teacher granted B2 directly: B2 is open immediately even with 0 clears
    expect(isLevelAllowed(customStudent, 'B2', [])).toBe(true);
    expect(isLevelAllowed(customStudent, 'A1', [])).toBe(false); // only allowedLevels is active
  });

  it('allows A1 by default for free tier users, but keeps A2-B2 locked unless granted by teacher', () => {
    expect(isLevelAllowed({ role: 'student', tier: 'free' }, 'A1')).toBe(true);
    // Even if A1 is cleared, free tier cannot access A2 automatically (must submit screenshot to teacher)
    expect(isLevelAllowed({ role: 'student', tier: 'free' }, 'A2', ['A1'])).toBe(false);
    expect(isLevelAllowed({ role: 'student', tier: 'free' }, 'B1', ['A1', 'A2'])).toBe(false);

    // When teacher grants A2 via allowedLevels
    const freeWithA2 = { role: 'student', tier: 'free', allowedLevels: ['A1', 'A2'] };
    expect(isLevelAllowed(freeWithA2, 'A2', [])).toBe(true);
    expect(isLevelAllowed(freeWithA2, 'B1', [])).toBe(false);
  });

  it('calculates cleared levels correctly via getClearedLevels', () => {
    const clearsMap = new Map([
      ['A1', 20],
      ['A2', 19],
      ['B1', 0],
    ]);
    expect(getClearedLevels(clearsMap, 20)).toEqual(['A1']);

    clearsMap.set('A2', 20);
    expect(getClearedLevels(clearsMap, 20)).toEqual(['A1', 'A2']);
  });

  it('returns false when userDoc is null or undefined', () => {
    expect(isLevelAllowed(null, 'A1')).toBe(false);
    expect(getUnlockedLevels(null)).toEqual(['A1']);
  });
});

describe('avatar helpers', () => {
  it('defines 12 distinct themed rabbit avatars', () => {
    expect(AVATAR_LIST).toHaveLength(12);
    expect(DEFAULT_AVATAR).toBe('avatar-1');
  });

  it('resolves correct avatar image path and falls back to default on invalid id', () => {
    expect(getAvatarSrc('avatar-1')).toBe('avatars/avatar-1.png');
    expect(getAvatarSrc('avatar-5', '/base/')).toBe('/base/avatars/avatar-5.png');
    expect(getAvatarSrc('avatar-12', '/base/')).toBe('/base/avatars/avatar-12.png');
    expect(getAvatarSrc('unknown-avatar')).toBe('avatars/avatar-1.png');
    expect(getAvatarSrc(null)).toBe('avatars/avatar-1.png');
    expect(getAvatarSrc('avatar-3', '/base/', 'webp')).toBe('/base/avatars/avatar-3.webp');
  });
});

describe('validateProfileData', () => {
  it('accepts valid profile payload and trims strings', () => {
    const input = {
      fullName: '  สมชาย ดีมาก  ',
      nickname: ' นิค ',
      grade: ' ม.2 ',
      school: ' สาธิต ',
      phone: ' 0812345678 ',
      lineId: ' somchai_line ',
      avatarId: 'avatar-4',
    };

    const res = validateProfileData(input);
    expect(res.valid).toBe(true);
    expect(res.cleaned.fullName).toBe('สมชาย ดีมาก');
    expect(res.cleaned.nickname).toBe('นิค');
    expect(res.cleaned.grade).toBe('ม.2');
    expect(res.cleaned.school).toBe('สาธิต');
    expect(res.cleaned.phone).toBe('0812345678');
    expect(res.cleaned.lineId).toBe('somchai_line');
    expect(res.cleaned.avatarId).toBe('avatar-4');
  });

  it('rejects empty nickname', () => {
    const res = validateProfileData({ nickname: '   ' });
    expect(res.valid).toBe(false);
    expect(res.errors.nickname).toBeDefined();
  });

  it('falls back to default avatar when invalid avatar is given', () => {
    const res = validateProfileData({ nickname: 'บ็อบ', avatarId: 'invalid-id' });
    expect(res.valid).toBe(true);
    expect(res.cleaned.avatarId).toBe('avatar-1');
  });
});


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
