import { validate } from './schema/validate.js';
import { contentHash } from './schema/content-checks.js';
import { TAGS, levelRank } from './schema/taxonomy.js';

export const FORM_TYPES = ['mcq', 'fill_blank', 'short_answer', 'paragraph'];

export const TYPE_LABELS = {
  mcq: 'ปรนัย (เลือกตอบ)',
  fill_blank: 'เติมคำในช่องว่าง',
  short_answer: 'เขียนตอบสั้น',
  paragraph: 'เขียนตอบเป็นย่อหน้า',
};

const CLEAN = (value) => String(value ?? '').trim();
const nonEmpty = (list) => (list ?? []).map(CLEAN).filter((item) => item !== '');

export function emptyFormState(overrides = {}) {
  return {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '',
    choices: ['', ''],
    correctIndex: 0,
    answers: [''],
    rubric: '',
    tags: [],
    isPreview: false,
    visibility: 'bank',
    reviewStatus: 'draft',
    ...overrides,
  };
}

export function formStateFromExercise(doc) {
  const choices = doc.choices ?? [];
  const answerKey = doc.answerKey ?? [];
  return emptyFormState({
    skill: doc.skill,
    level: doc.level,
    type: doc.type,
    prompt: doc.prompt ?? '',
    choices: doc.type === 'mcq' ? [...choices] : [],
    correctIndex: doc.type === 'mcq' ? Math.max(0, choices.indexOf(answerKey[0])) : 0,
    answers: doc.type === 'fill_blank' ? [...answerKey] : [],
    rubric: doc.rubric ?? '',
    tags: [...(doc.tags ?? [])],
    isPreview: Boolean(doc.isPreview),
    visibility: doc.visibility ?? 'bank',
    reviewStatus: doc.reviewStatus ?? 'draft',
  });
}

export function changeType(state, nextType) {
  return {
    ...state,
    type: nextType,
    choices: nextType === 'mcq' ? ['', ''] : [],
    correctIndex: 0,
    answers: nextType === 'fill_blank' ? [''] : [],
    rubric: nextType === 'short_answer' || nextType === 'paragraph' ? state.rubric : '',
  };
}

export function availableTags(level) {
  return TAGS.filter((tag) => levelRank(tag.level) <= levelRank(level)).map((tag) => ({
    ...tag,
    skill: tag.id.split(':')[0],
  }));
}

export function changeLevel(state, nextLevel) {
  const allowed = new Set(availableTags(nextLevel).map((tag) => tag.id));
  const kept = state.tags.filter((id) => allowed.has(id));
  const droppedTags = state.tags.filter((id) => !allowed.has(id));
  return { state: { ...state, level: nextLevel, tags: kept }, droppedTags };
}

export function buildExerciseDoc(state, { existing = null, adminUid, now = new Date().toISOString() } = {}) {
  const doc = {
    skill: state.skill,
    level: state.level,
    type: state.type,
    prompt: CLEAN(state.prompt),
    tags: [...state.tags],
    visibility: state.visibility,
    isPreview: Boolean(state.isPreview),
    reviewStatus: state.reviewStatus,
    assignedUids: existing?.assignedUids ?? [],
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    createdBy: existing?.createdBy ?? adminUid,
  };

  if (existing?.importBatchId) doc.importBatchId = existing.importBatchId;
  if (existing?.source) doc.source = existing.source;
  if (existing?.sourceUrl) doc.sourceUrl = existing.sourceUrl;
  if (existing?.reviewNotes) doc.reviewNotes = existing.reviewNotes;

  if (state.type === 'mcq') {
    const chosenText = CLEAN(state.choices[state.correctIndex]);
    doc.choices = nonEmpty(state.choices);
    if (chosenText !== '') doc.answerKey = [chosenText];
  } else if (state.type === 'fill_blank') {
    doc.answerKey = nonEmpty(state.answers);
  } else {
    doc.rubric = CLEAN(state.rubric);
  }

  doc.contentHash = contentHash(doc);

  const { ok, errors } = validate('exercises', doc, 'create');
  if (!ok) return { ok: false, errors, doc: null };
  return { ok: true, errors: [], doc };
}

export function previewLines(item) {
  const type = item.type;
  const lines = [`โจทย์: ${CLEAN(item.prompt)}`];

  if (type === 'mcq') {
    const choices = nonEmpty(item.choices);
    if (choices.length) lines.push(`ตัวเลือก: ${choices.join(' / ')}`);
    const answer = item.answerKey?.[0] ?? CLEAN(item.choices?.[item.correctIndex]);
    if (answer) lines.push(`เฉลย: ${answer}`);
  } else if (type === 'fill_blank') {
    const answers = nonEmpty(item.answerKey ?? item.answers);
    if (answers.length) lines.push(`เฉลย: ${answers.join(' / ')}`);
  } else if (item.rubric) {
    lines.push(`เกณฑ์ให้คะแนน: ${CLEAN(item.rubric)}`);
  }

  return lines;
}
