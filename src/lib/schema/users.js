import { str, enumOf, bool, int, arrayOfStr, isoDate, obj } from './field-types.js';

export const GRADES = [
  'ประถมปลาย (ป.4–ป.6)',
  'ม.1',
  'ม.2',
  'ม.3',
  'ม.4',
  'ม.5',
  'ม.6',
  'วัยทำงาน/บุคคลทั่วไป',
];
export const SCHOOL_GRADES = GRADES.slice(0, 7);
export const ADMIN_ONLY_USER_FIELDS = ['role', 'tier', 'tierNote', 'groupTags'];

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

function profileCompleteRule(data) {
  if (data.onboardingComplete !== true) return null;
  const errors = [];
  for (const field of ['fullName', 'nickname', 'grade', 'phone']) {
    if (isBlank(data[field])) {
      errors.push({ field, message: 'จำเป็นต้องมีเมื่อกรอกโปรไฟล์เสร็จแล้ว' });
    }
  }
  if (SCHOOL_GRADES.includes(data.grade) && isBlank(data.school)) {
    errors.push({ field: 'school', message: 'กรุณากรอกชื่อโรงเรียน' });
  }
  return errors;
}

export const usersSchema = {
  fields: {
    uid: str(),
    email: str(),
    fullName: str({ required: false }),
    nickname: str({ required: false }),
    prefix: enumOf(['น้อง', 'พี่'], { required: false }),
    callName: str({ required: false }),
    avatarId: str({ required: false }),
    grade: enumOf(GRADES, { required: false }),
    school: str({ required: false }),
    phone: str({ required: false }),
    lineId: str({ required: false }),
    role: enumOf(['student', 'admin']),
    tier: enumOf(['free', 'full']),
    tierNote: str({ required: false, maxLength: 500 }),
    allowedLevels: arrayOfStr({ required: false, maxItems: 10 }),
    groupTags: arrayOfStr({ required: false, maxItems: 20 }),
    speedCafeStats: obj(
      {
        highScore: int({ min: 0 }),
        maxCombo: int({ min: 0 }),
        lastPlayedAt: str({ required: false }),
      },
      { required: false },
    ),
    favoriteVocab: arrayOfStr({ required: false, maxItems: 2000 }),
    favoriteVocabUpdatedAt: isoDate({ required: false }),
    hasReviewed: bool({ required: false }),
    reviewSubmittedAt: isoDate({ required: false }),
    streak: obj(
      { current: int({ min: 0 }), longest: int({ min: 0 }), lastActiveDate: str() },
      { required: false },
    ),
    onboardingComplete: bool(),
    consentAcceptedAt: isoDate({ required: false }),
    consentVersion: int({ required: false, min: 1 }),
    createdAt: isoDate(),
    updatedAt: isoDate({ required: false }),
  },
  rules: [profileCompleteRule],
};
