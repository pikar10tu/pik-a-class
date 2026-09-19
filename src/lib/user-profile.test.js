import { describe, it, expect } from 'vitest';
import { buildNewUserDoc, getPostLoginRedirect } from './user-profile.js';

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
