import { validate } from './validate.js';
import { LEVELS, TAGS, getTag } from './taxonomy.js';

const KEEP_PATTERN = /[^\p{Letter}\p{Number}_\s]/gu;

export function normalizeContent(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(KEEP_PATTERN, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function fnv1a(input, seed) {
  let hash = seed;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

export function contentHash(item) {
  const body = normalizeContent(item.prompt ?? item.summary ?? item.title ?? '');
  const choices = Array.isArray(item.choices)
    ? [...item.choices].map(normalizeContent).sort().join('|')
    : '';
  const extra = item.order !== undefined ? `#${item.order}` : '';
  const material = `${body}##${choices}${extra}`;
  return fnv1a(material, 0x811c9dc5) + fnv1a(material, 0x1000193);
}

export function checkBatch(collectionName, items, existingHashes = new Set()) {
  const valid = [];
  const invalid = [];
  const seenInBatch = new Set();

  items.forEach((rawItem, index) => {
    const hash = contentHash(rawItem);
    const item = { ...rawItem, contentHash: hash };
    const { errors } = validate(collectionName, item, 'create');

    if (existingHashes.has(hash)) {
      errors.push({ field: 'prompt', message: 'ข้อนี้ซ้ำกับข้อที่มีอยู่แล้วในคลัง' });
    } else if (seenInBatch.has(hash)) {
      errors.push({ field: 'prompt', message: 'ข้อนี้ซ้ำกับข้ออื่นในไฟล์เดียวกัน' });
    }

    if (errors.length > 0) {
      invalid.push({ index, errors });
      return;
    }
    seenInBatch.add(hash);
    valid.push({ index, item });
  });

  return { valid, invalid };
}

export function coverageReport(items) {
  return LEVELS.map((level) => {
    const atLevel = items.filter((item) => item.level === level);
    const counts = new Map();
    for (const item of atLevel) {
      for (const tagId of item.tags ?? []) {
        counts.set(tagId, (counts.get(tagId) ?? 0) + 1);
      }
    }
    const byTag = [...counts.entries()].map(([id, count]) => ({
      id,
      label: getTag(id)?.label ?? id,
      count,
    }));
    const missingTagIds = TAGS.filter((tag) => tag.level === level && !counts.has(tag.id)).map((tag) => tag.id);
    return { level, total: atLevel.length, byTag, missingTagIds };
  });
}
