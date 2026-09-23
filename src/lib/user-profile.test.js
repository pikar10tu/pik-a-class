import { describe, it, expect } from 'vitest';
import {
  buildNewUserDoc,
  getPostLoginRedirect,
  isLevelAllowed,
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

describe('isLevelAllowed', () => {
  it('always allows admins full access to any level', () => {
    expect(isLevelAllowed({ role: 'admin' }, 'A1')).toBe(true);
    expect(isLevelAllowed({ role: 'admin' }, 'B2')).toBe(true);
  });

  it('allows full tier users all levels if allowedLevels is empty or not set', () => {
    expect(isLevelAllowed({ role: 'student', tier: 'full' }, 'A1')).toBe(true);
    expect(isLevelAllowed({ role: 'student', tier: 'full', allowedLevels: [] }, 'B2')).toBe(true);
  });

  it('restricts full tier users to explicitly ticked allowedLevels', () => {
    const student = { role: 'student', tier: 'full', allowedLevels: ['A1', 'A2'] };
    expect(isLevelAllowed(student, 'A1')).toBe(true);
    expect(isLevelAllowed(student, 'A2')).toBe(true);
    expect(isLevelAllowed(student, 'B1')).toBe(false);
    expect(isLevelAllowed(student, 'B2')).toBe(false);
  });

  it('allows A1 by default for free tier users, but locks A2 and above', () => {
    expect(isLevelAllowed({ role: 'student', tier: 'free' }, 'A1')).toBe(true);
    expect(isLevelAllowed({ role: 'student', tier: 'free' }, 'A2')).toBe(false);
    expect(isLevelAllowed({ role: 'student', tier: 'free' }, 'B1')).toBe(false);
  });

  it('allows free tier user if specific level is granted in allowedLevels', () => {
    expect(isLevelAllowed({ role: 'student', tier: 'free', allowedLevels: ['A1'] }, 'A1')).toBe(true);
    expect(isLevelAllowed({ role: 'student', tier: 'free', allowedLevels: ['A1'] }, 'A2')).toBe(false);
  });

  it('returns false when userDoc is null or undefined', () => {
    expect(isLevelAllowed(null, 'A1')).toBe(false);
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

