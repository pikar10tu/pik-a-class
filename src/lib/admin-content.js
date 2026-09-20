import { validate } from './schema/validate.js';
import { contentHash } from './schema/content-checks.js';

function splitList(text) {
  return String(text ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part !== '');
}

export function buildContentUpdate(item, formValues) {
  const { id, ...current } = item;
  const next = {
    ...current,
    prompt: formValues.prompt,
    tags: splitList(formValues.tags),
    isPreview: Boolean(formValues.isPreview),
    updatedAt: new Date().toISOString(),
  };

  if (current.choices !== undefined) next.choices = splitList(formValues.choices);
  if (current.answerKey !== undefined) next.answerKey = splitList(formValues.answerKey);
  if (current.rubric !== undefined) next.rubric = formValues.rubric;

  next.contentHash = contentHash(next);

  const { ok, errors } = validate('exercises', next, 'create');
  if (!ok) return { ok: false, errors, update: null };

  return { ok: true, errors: [], update: next };
}

export function previewLines(item) {
  const lines = [`โจทย์: ${item.prompt}`];
  if (item.choices?.length) lines.push(`ตัวเลือก: ${item.choices.join(' / ')}`);
  if (item.answerKey?.length) lines.push(`เฉลย: ${item.answerKey.join(' / ')}`);
  if (item.rubric) lines.push(`เกณฑ์ให้คะแนน: ${item.rubric}`);
  return lines;
}
