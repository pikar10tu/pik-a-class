import { describe, it, expect } from 'vitest';
import { isAdmin } from './auth-guard.js';

describe('isAdmin', () => {
  it('returns false when there is no user doc', () => {
    expect(isAdmin(null)).toBe(false);
  });

  it('returns false for a student', () => {
    expect(isAdmin({ role: 'student' })).toBe(false);
  });

  it('returns true for an admin', () => {
    expect(isAdmin({ role: 'admin' })).toBe(true);
  });
});
