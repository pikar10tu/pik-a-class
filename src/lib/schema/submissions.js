import { str, enumOf, bool, int, num, arrayOfStr, isoDate } from './field-types.js';
import { LEVELS } from './taxonomy.js';
import { EXERCISE_TYPES } from './exercises.js';

export const SUBMISSION_STATUSES = ['pending', 'graded', 'completed'];

function gradedMetadataRule(data) {
  const errors = [];
  if (data.status === 'graded') {
    if (!data.gradedBy) errors.push({ field: 'gradedBy', message: 'ต้องระบุผู้ตรวจเมื่อสถานะเป็น graded' });
    if (!data.gradedAt) errors.push({ field: 'gradedAt', message: 'ต้องระบุเวลาที่ตรวจเมื่อสถานะเป็น graded' });
  }
  if (
    typeof data.attemptCount === 'number' &&
    typeof data.wrongCount === 'number' &&
    data.wrongCount > data.attemptCount
  ) {
    errors.push({
      field: 'wrongCount',
      message: 'จำนวนครั้งที่ตอบผิดมากกว่าจำนวนครั้งที่ตอบทั้งหมดไม่ได้',
    });
  }
  return errors;
}

export const submissionsSchema = {
  fields: {
    uid: str(),
    exerciseId: str(),
    assignmentId: str({ required: false }),
    skill: enumOf(['grammar', 'vocab', 'writing', 'dialogue']),
    level: enumOf(LEVELS),
    type: enumOf(EXERCISE_TYPES),
    tags: arrayOfStr({ maxItems: 10 }),
    answer: str({ required: false, maxLength: 8000 }),
    autoGraded: bool(),
    score: num({ required: false, min: 0, max: 1 }),
    bestStars: int({ min: 0, max: 3 }),
    attemptCount: int({ min: 1 }),
    wrongCount: int({ min: 0 }),
    lastAnsweredAt: isoDate(),
    status: enumOf(SUBMISSION_STATUSES),
    feedback: str({ required: false, maxLength: 4000 }),
    gradedBy: str({ required: false }),
    gradedAt: isoDate({ required: false }),
    createdAt: isoDate(),
  },
  rules: [gradedMetadataRule],
};
