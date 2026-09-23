import { str, enumOf, bool, arrayOfStr, isoDate } from './field-types.js';
import { LEVELS, checkTagsForLevel } from './taxonomy.js';

export const EXERCISE_TYPES = ['mcq', 'fill_blank', 'sentence_builder', 'matching', 'short_answer', 'paragraph', 'shadowing'];
export const REVIEW_STATUSES = ['draft', 'reviewed', 'published'];
export const BLANK_MARKER = '___';

const TYPES_WITH_CHOICES = ['mcq', 'matching', 'sentence_builder'];
const TYPES_WITH_ANSWER_KEY = ['mcq', 'fill_blank', 'sentence_builder', 'matching'];
const TYPES_WITH_RUBRIC = ['short_answer', 'paragraph'];

function typeShapeRule(data) {
  const errors = [];
  const { type, choices, answerKey, rubric } = data;
  if (!EXERCISE_TYPES.includes(type)) return errors;

  if (TYPES_WITH_CHOICES.includes(type)) {
    if (!choices || choices.length < 2) {
      errors.push({ field: 'choices', message: `ข้อชนิด ${type} ต้องมีตัวเลือกอย่างน้อย 2 ตัว` });
    } else if (type !== 'sentence_builder' && new Set(choices).size !== choices.length) {
      errors.push({ field: 'choices', message: 'ตัวเลือกห้ามซ้ำกัน' });
    }
  } else if (choices !== undefined) {
    errors.push({ field: 'choices', message: `ข้อชนิด ${type} ห้ามมีตัวเลือก` });
  }

  if (TYPES_WITH_ANSWER_KEY.includes(type)) {
    if (!answerKey || answerKey.length === 0) {
      errors.push({ field: 'answerKey', message: `ข้อชนิด ${type} ต้องมีเฉลย` });
    } else if (type === 'mcq') {
      if (answerKey.length !== 1) {
        errors.push({ field: 'answerKey', message: 'MCQ ต้องมีคำตอบถูกข้อเดียว' });
      } else if (choices && !choices.includes(answerKey[0])) {
        errors.push({ field: 'answerKey', message: `คำตอบ "${answerKey[0]}" ไม่มีอยู่ในตัวเลือก` });
      }
    } else if (type === 'matching' && choices && answerKey.length !== choices.length) {
      errors.push({ field: 'answerKey', message: 'ข้อจับคู่ต้องมีเฉลยเท่ากับจำนวนตัวเลือก' });
    } else if (type === 'sentence_builder' && choices && Array.isArray(answerKey) && typeof answerKey[0] === 'string') {
      const choiceCounts = {};
      for (const c of choices) {
        const k = String(c).trim().toLowerCase().replace(/[.,!?;:]/g, '');
        choiceCounts[k] = (choiceCounts[k] || 0) + 1;
      }
      const primaryAnswer = answerKey[0];
      const answerWords = primaryAnswer.trim().split(/\s+/).map((w) => w.toLowerCase().replace(/[.,!?;:]/g, ''));
      const neededCounts = {};
      for (const w of answerWords) {
        if (!w) continue;
        neededCounts[w] = (neededCounts[w] || 0) + 1;
      }
      for (const [w, needed] of Object.entries(neededCounts)) {
        const available = choiceCounts[w] || 0;
        if (available < needed) {
          errors.push({
            field: 'choices',
            message: `คำว่า "${w}" มีในตัวเลือกไม่พอสำหรับเฉลย (ต้องใช้ ${needed} คำ แต่มี ${available} คำ)`,
          });
        }
      }
    }
  } else if (answerKey !== undefined) {
    errors.push({ field: 'answerKey', message: `ข้อชนิด ${type} ห้ามมีเฉลย` });
  }

  if (TYPES_WITH_RUBRIC.includes(type)) {
    if (!rubric || rubric.trim() === '') {
      errors.push({ field: 'rubric', message: 'ข้อเขียนตอบต้องมีเกณฑ์ให้คะแนน (rubric)' });
    }
  } else if (rubric !== undefined) {
    errors.push({ field: 'rubric', message: `ข้อชนิด ${type} ห้ามมีเกณฑ์ให้คะแนน` });
  }

  if (type === 'fill_blank' && typeof data.prompt === 'string') {
    const blanks = data.prompt.split(BLANK_MARKER).length - 1;
    if (blanks !== 1) {
      errors.push({
        field: 'prompt',
        message: `ข้อเติมคำต้องมีช่องว่าง ${BLANK_MARKER} พอดี 1 ช่อง (พบ ${blanks} ช่อง)`,
      });
    }
  }

  return errors;
}

export function tagsRule(data) {
  if (!Array.isArray(data.tags) || !LEVELS.includes(data.level)) return null;
  return checkTagsForLevel(data.tags, data.level).map((message) => ({ field: 'tags', message }));
}

export const exercisesSchema = {
  fields: {
    skill: enumOf(['grammar', 'vocab', 'writing', 'dialogue']),
    level: enumOf(LEVELS),
    type: enumOf(EXERCISE_TYPES),
    prompt: str({ maxLength: 4000 }),
    choices: arrayOfStr({ required: false, maxItems: 20 }),
    answerKey: arrayOfStr({ required: false, maxItems: 10 }),
    rubric: str({ required: false, maxLength: 2000 }),
    tags: arrayOfStr({ minItems: 1, maxItems: 10 }),
    visibility: enumOf(['bank', 'assignmentOnly']),
    isPreview: bool(),
    reviewStatus: enumOf(REVIEW_STATUSES),
    assignedUids: arrayOfStr({ required: false, maxItems: 200 }),
    source: str({ required: false }),
    sourceUrl: str({ required: false }),
    reviewNotes: str({ required: false, maxLength: 4000 }),
    contentHash: str(),
    importBatchId: str({ required: false }),
    deletedAt: isoDate({ required: false }),
    createdAt: isoDate(),
    updatedAt: isoDate(),
    createdBy: str(),
  },
  rules: [typeShapeRule, tagsRule],
};
