import { describe, it, expect } from 'vitest';
import { buildNewUserDoc, getPostLoginRedirect, isLevelAllowed } from './user-profile.js';

describe('buildNewUserDoc', () => {
  it('builds a stub doc defaulting role, tier, and onboarding state', () => {
    const firebaseUser = { uid: 'abc123', email: 'a@b.com', displayName: 'Aum' };
    const doc = buildNewUserDoc(firebaseUser);

    expect(doc.uid).toBe('abc123');
    expect(doc.email).toBe('a@b.com');
    expect(doc.fullName).toBe('Aum');
    expect(doc.nickname).toBe('');
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

  it('denies free tier users by default', () => {
    expect(isLevelAllowed({ role: 'student', tier: 'free' }, 'A1')).toBe(false);
  });

  it('allows free tier user if specific level is granted in allowedLevels', () => {
    expect(isLevelAllowed({ role: 'student', tier: 'free', allowedLevels: ['A1'] }, 'A1')).toBe(true);
    expect(isLevelAllowed({ role: 'student', tier: 'free', allowedLevels: ['A1'] }, 'A2')).toBe(false);
  });

  it('returns false when userDoc is null or undefined', () => {
    expect(isLevelAllowed(null, 'A1')).toBe(false);
  });
});

