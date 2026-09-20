import { GRADES as schemaGrades, SCHOOL_GRADES as schemaSchoolGrades } from './schema/users.js';
import { describe, it, expect } from 'vitest';
import { validateOnboardingForm, SCHOOL_GRADES, GRADES } from './onboarding-validation.js';

const validSchoolStudent = {
  fullName: 'Somchai Dee',
  nickname: 'Chai',
  grade: 'ม.3',
  school: 'Bangkok School',
  phone: '0812345678',
  lineId: 'somchai',
};

describe('validateOnboardingForm', () => {
  it('accepts a fully filled school-student form', () => {
    expect(validateOnboardingForm(validSchoolStudent)).toEqual({ valid: true, errors: {} });
  });

  it('accepts a working-adult form with no school', () => {
    const form = { ...validSchoolStudent, grade: 'วัยทำงาน/บุคคลทั่วไป', school: '' };
    expect(validateOnboardingForm(form)).toEqual({ valid: true, errors: {} });
  });

  it('requires school when grade is a school grade', () => {
    const form = { ...validSchoolStudent, school: '' };
    const result = validateOnboardingForm(form);
    expect(result.valid).toBe(false);
    expect(result.errors.school).toBe('กรุณากรอกชื่อโรงเรียน');
  });

  it('requires fullName, nickname, grade, and phone', () => {
    const result = validateOnboardingForm({ fullName: '', nickname: '', grade: '', school: '', phone: '', lineId: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.fullName).toBe('กรุณากรอกชื่อจริง');
    expect(result.errors.nickname).toBe('กรุณากรอกชื่อเล่น');
    expect(result.errors.grade).toBe('กรุณาเลือกช่วงชั้น/กลุ่มผู้เรียน');
    expect(result.errors.phone).toBe('กรุณากรอกเบอร์โทร');
  });

  it('treats whitespace-only values as missing', () => {
    const form = { ...validSchoolStudent, fullName: '   ' };
    const result = validateOnboardingForm(form);
    expect(result.errors.fullName).toBe('กรุณากรอกชื่อจริง');
  });
});

describe('grade list wiring', () => {
  it('re-exports the schema grade lists instead of keeping a second copy', () => {
    expect(GRADES).toEqual(schemaGrades);
    expect(SCHOOL_GRADES).toEqual(schemaSchoolGrades);
    expect(GRADES).toHaveLength(7);
  });
});
