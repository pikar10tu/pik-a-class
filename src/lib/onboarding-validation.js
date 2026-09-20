import { GRADES, SCHOOL_GRADES } from './schema/users.js';

export { GRADES, SCHOOL_GRADES };

export function validateOnboardingForm(formData) {
  const errors = {};

  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = 'กรุณากรอกชื่อจริง';
  }
  if (!formData.nickname || !formData.nickname.trim()) {
    errors.nickname = 'กรุณากรอกชื่อเล่น';
  }
  if (!formData.grade) {
    errors.grade = 'กรุณาเลือกช่วงชั้น/กลุ่มผู้เรียน';
  }
  if (SCHOOL_GRADES.includes(formData.grade) && (!formData.school || !formData.school.trim())) {
    errors.school = 'กรุณากรอกชื่อโรงเรียน';
  }
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = 'กรุณากรอกเบอร์โทร';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
