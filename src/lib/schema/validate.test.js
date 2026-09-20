import { describe, it, expect } from 'vitest';
import { validate } from './validate.js';
import { GRADES, SCHOOL_GRADES, ADMIN_ONLY_USER_FIELDS } from './users.js';

function validUserDoc(overrides = {}) {
  return {
    uid: 'u1',
    email: 'a@b.com',
    fullName: 'สมชาย ใจดี',
    nickname: 'ชาย',
    grade: 'ม.3',
    school: 'โรงเรียนตัวอย่าง',
    phone: '0812345678',
    role: 'student',
    tier: 'free',
    onboardingComplete: true,
    createdAt: '2026-09-20T10:00:00.000Z',
    ...overrides,
  };
}

describe('validate', () => {
  it('accepts a complete, valid user document', () => {
    expect(validate('users', validUserDoc())).toEqual({ ok: true, errors: [] });
  });

  it('rejects an unknown collection', () => {
    expect(() => validate('nope', {})).toThrow('ไม่รู้จัก collection: nope');
  });

  it('rejects fields that are not in the schema', () => {
    const result = validate('users', validUserDoc({ totalStars: 99 }));
    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({ field: 'totalStars', message: 'ฟิลด์นี้ไม่มีใน schema' });
  });

  it('reports the offending field for a bad enum value', () => {
    const result = validate('users', validUserDoc({ tier: 'premium' }));
    expect(result.errors).toContainEqual({ field: 'tier', message: 'ต้องเป็นหนึ่งใน: free, full' });
  });

  it('requires missing fields on create but ignores them on update', () => {
    const { createdAt, ...withoutCreatedAt } = validUserDoc();
    expect(validate('users', withoutCreatedAt, 'create').errors).toContainEqual({
      field: 'createdAt',
      message: 'จำเป็นต้องมี',
    });
    expect(validate('users', { nickname: 'ใหม่' }, 'update')).toEqual({ ok: true, errors: [] });
  });

  it('allows a half-filled doc before onboarding is complete', () => {
    const stub = {
      uid: 'u1',
      email: 'a@b.com',
      fullName: '',
      nickname: '',
      role: 'student',
      tier: 'free',
      onboardingComplete: false,
      createdAt: '2026-09-20T10:00:00.000Z',
    };
    expect(validate('users', stub)).toEqual({ ok: true, errors: [] });
  });

  it('requires profile fields once onboarding is marked complete', () => {
    const result = validate('users', validUserDoc({ nickname: '', grade: undefined, phone: '' }));
    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({ field: 'nickname', message: 'จำเป็นต้องมีเมื่อกรอกโปรไฟล์เสร็จแล้ว' });
    expect(result.errors).toContainEqual({ field: 'grade', message: 'จำเป็นต้องมีเมื่อกรอกโปรไฟล์เสร็จแล้ว' });
    expect(result.errors).toContainEqual({ field: 'phone', message: 'จำเป็นต้องมีเมื่อกรอกโปรไฟล์เสร็จแล้ว' });
  });

  it('requires a school for school grades but not for the working-adult group', () => {
    const noSchool = validate('users', validUserDoc({ grade: 'ม.3', school: '' }));
    expect(noSchool.errors).toContainEqual({ field: 'school', message: 'กรุณากรอกชื่อโรงเรียน' });

    const adult = validate('users', validUserDoc({ grade: 'วัยทำงาน/บุคคลทั่วไป', school: '' }));
    expect(adult).toEqual({ ok: true, errors: [] });
  });

  it('exposes the grade lists and the admin-only field list', () => {
    expect(GRADES).toHaveLength(7);
    expect(SCHOOL_GRADES).toEqual(['ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6']);
    expect(ADMIN_ONLY_USER_FIELDS).toEqual(['role', 'tier', 'tierNote', 'groupTags']);
  });
});
