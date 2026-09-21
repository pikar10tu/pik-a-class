import { DEFAULT_PASS_THRESHOLD } from './schema/stages.js';
import { distractorPool, WORD_BANK_SIZE } from './word-bank.js';

export const STAGE_ITEM_TYPES = ['mcq', 'fill_blank'];
const MAX_ITEMS = 20;

export function emptyStageState(overrides = {}) {
  return {
    skill: 'grammar',
    level: 'A1',
    order: 1,
    title: '',
    itemIds: [],
    passThreshold: DEFAULT_PASS_THRESHOLD,
    isPreview: false,
    reviewStatus: 'draft',
    ...overrides,
  };
}

export function stageStateFromDoc(doc) {
  return emptyStageState({
    skill: doc.skill,
    level: doc.level,
    order: doc.order,
    title: doc.title ?? '',
    itemIds: [...(doc.itemIds ?? [])],
    passThreshold: doc.passThreshold ?? DEFAULT_PASS_THRESHOLD,
    isPreview: Boolean(doc.isPreview),
    reviewStatus: doc.reviewStatus ?? 'draft',
  });
}

export function toggleItem(state, exerciseId) {
  const itemIds = state.itemIds.includes(exerciseId)
    ? state.itemIds.filter((id) => id !== exerciseId)
    : [...state.itemIds, exerciseId];
  return { ...state, itemIds };
}

export function moveItem(state, index, delta) {
  const itemIds = state.itemIds;
  // ปฏิเสธ index ที่ไม่มีอยู่จริงก่อน ไม่งั้น bracket assignment กับ index ติดลบ
  // จะไปสร้าง property แปลกๆ บน array แทนที่จะสลับตำแหน่งจริง
  if (index < 0 || index >= itemIds.length) return state;
  const target = index + delta;
  if (target < 0 || target >= itemIds.length) return state;

  const nextItemIds = [...itemIds];
  [nextItemIds[index], nextItemIds[target]] = [nextItemIds[target], nextItemIds[index]];
  return { ...state, itemIds: nextItemIds };
}

export function validateStage(state, exercisesById) {
  const errors = {};
  const warnings = [];
  const items = state.itemIds.map((id) => exercisesById[id]).filter(Boolean);
  const missingCount = state.itemIds.length - items.length;

  if (!state.title.trim()) errors.title = 'กรุณาตั้งชื่อด่าน';

  if (state.itemIds.length === 0) {
    errors.itemIds = 'ด่านต้องมีโจทย์อย่างน้อย 1 ข้อ';
  } else if (state.itemIds.length > MAX_ITEMS) {
    errors.itemIds = `ด่านมีโจทย์ได้ไม่เกิน ${MAX_ITEMS} ข้อ`;
  } else if (missingCount > 0) {
    // อ้างถึงข้อที่ถูกลบไปแล้ว (เช่น ถูกทิ้งลงถังขยะ) — ต้องให้ครูเอาออกก่อน ไม่ใช่เงียบๆ ตัดทิ้งให้เอง
    errors.itemIds = 'มีโจทย์บางข้อในด่านนี้ถูกลบไปแล้ว กรุณาเอาออก';
  } else if (items.some((item) => !STAGE_ITEM_TYPES.includes(item.type))) {
    errors.itemIds = 'ด่านรับเฉพาะข้อปรนัยและข้อเติมคำเท่านั้น';
  }

  if (state.passThreshold < 0 || state.passThreshold > 1) {
    errors.passThreshold = 'เกณฑ์ผ่านด่านต้องอยู่ระหว่าง 0% ถึง 100%';
  }

  // ถ้าอนุมัติด่านทั้งที่ข้อยังไม่อนุมัติ rules จะไม่คืนข้อนั้นให้เด็ก ได้ด่านแหว่งทันที
  if (state.reviewStatus === 'published' && items.some((item) => item.reviewStatus !== 'published')) {
    errors.reviewStatus = 'อนุมัติด่านไม่ได้ เพราะยังมีโจทย์ที่ยังไม่อนุมัติอยู่ในด่าน';
  }

  // เปิดด่านให้ tier free แต่ข้อข้างในยังไม่เปิด = เด็ก free เห็นด่านแต่กดเข้าไปแล้วโหลดไม่ขึ้นเลย
  // (การอ่านข้อใช้ documentId() in [...] ซึ่งถ้าอ่านข้อใดข้อหนึ่งไม่ได้ จะโดนปฏิเสธทั้ง query
  //  ไม่ใช่คืนมาแค่บางข้อ) ต้องบอกครูตั้งแต่ตอนสร้างด่าน ไม่ใช่ให้ไปเจอตอนเด็กเล่นไม่ได้
  if (state.isPreview) {
    const notPreview = items.filter((item) => item.isPreview !== true).length;
    if (notPreview > 0) {
      errors.isPreview =
        `เปิดด่านนี้ให้ผู้ใช้ทั่วไปไม่ได้ เพราะมีโจทย์ ${notPreview} ข้อที่ยังไม่เปิดให้ผู้ใช้ทั่วไป ` +
        'ต้องไปเปิดโจทย์เหล่านั้นในคลังเนื้อหาก่อน หรือเอาออกจากด่าน';
    }
  }

  items.forEach((item, index) => {
    if (item.level !== state.level) {
      warnings.push(`โจทย์ข้อที่ ${index + 1} เป็นระดับ ${item.level} ไม่ตรงกับด่าน (${state.level})`);
    }
    if (item.skill !== state.skill) {
      warnings.push(`โจทย์ข้อที่ ${index + 1} เป็นสกิล ${item.skill} ไม่ตรงกับด่าน (${state.skill})`);
    }
    if (item.type === 'fill_blank' && distractorPool(item, items).length < WORD_BANK_SIZE - 1) {
      warnings.push(
        `ข้อเติมคำข้อที่ ${index + 1} หาตัวเลือกลวงได้ไม่ครบ ${WORD_BANK_SIZE - 1} ตัว เด็กจะเดาง่ายเกินไป`,
      );
    }
  });

  return { valid: Object.keys(errors).length === 0, errors, warnings };
}

export function buildStageDoc(state, { existing = null, adminUid, now = new Date().toISOString() } = {}) {
  return {
    skill: state.skill,
    level: state.level,
    order: state.order,
    title: state.title.trim(),
    itemIds: [...state.itemIds],
    passThreshold: state.passThreshold,
    isPreview: state.isPreview,
    reviewStatus: state.reviewStatus,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    createdBy: existing?.createdBy ?? adminUid,
  };
}
