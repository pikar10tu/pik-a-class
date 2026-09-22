import { DEFAULT_PASS_THRESHOLD, DEFAULT_DRAW_COUNT, MAX_DRAW_COUNT, MAX_STAGE_TAGS } from './schema/stages.js';
import { distractorPool, WORD_BANK_SIZE } from './word-bank.js';

export const STAGE_ITEM_TYPES = ['mcq', 'fill_blank', 'sentence_builder'];

export function emptyStageState(overrides = {}) {
  return {
    skill: 'grammar',
    level: 'A1',
    order: 1,
    title: '',
    tags: [],
    drawCount: DEFAULT_DRAW_COUNT,
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
    tags: [...(doc.tags ?? [])],
    drawCount: doc.drawCount ?? DEFAULT_DRAW_COUNT,
    passThreshold: doc.passThreshold ?? DEFAULT_PASS_THRESHOLD,
    isPreview: Boolean(doc.isPreview),
    reviewStatus: doc.reviewStatus ?? 'draft',
  });
}

export function toggleTag(state, tag) {
  const tags = state.tags.includes(tag)
    ? state.tags.filter((item) => item !== tag)
    : [...state.tags, tag];
  return { ...state, tags };
}

export function validateStage(state, poolExercises = []) {
  const errors = {};
  const warnings = [];

  if (!state.title.trim()) errors.title = 'กรุณาตั้งชื่อด่าน';

  if (state.tags.length === 0) {
    errors.tags = 'เลือกแท็กอย่างน้อย 1 อัน เพื่อบอกว่าด่านนี้ดึงโจทย์จากไหน';
  } else if (state.tags.length > MAX_STAGE_TAGS) {
    errors.tags = `ด่านมีแท็กได้ไม่เกิน ${MAX_STAGE_TAGS} อัน`;
  }

  if (!Number.isInteger(state.drawCount) || state.drawCount < 1 || state.drawCount > MAX_DRAW_COUNT) {
    errors.drawCount = `จำนวนข้อต่อรอบต้องเป็นจำนวนเต็ม 1 ถึง ${MAX_DRAW_COUNT}`;
  }

  if (state.passThreshold < 0 || state.passThreshold > 1) {
    errors.passThreshold = 'เกณฑ์ผ่านด่านต้องอยู่ระหว่าง 0% ถึง 100%';
  }

  // คลังไม่พอไม่ใช่ความผิดพลาด เด็กยังเล่นได้เท่าที่มี แต่ครูควรรู้ว่ารอบหนึ่งจะสั้นกว่าที่ตั้งไว้
  if (state.tags.length > 0 && poolExercises.length < state.drawCount) {
    warnings.push(
      `คลังของด่านนี้มี ${poolExercises.length} ข้อ น้อยกว่าที่ตั้งไว้ ${state.drawCount} ข้อ ` +
        `เด็กจะได้เล่นรอบละ ${poolExercises.length} ข้อ`,
    );
  }

  if (poolExercises.some((item) => !STAGE_ITEM_TYPES.includes(item.type))) {
    warnings.push('มีโจทย์บางข้อในคลังเป็นชนิดที่ด่านเล่นไม่ได้ ระบบจะข้ามข้อเหล่านั้น');
  }

  // เปิดด่านให้ผู้ใช้ทั่วไปแต่คลังไม่มีข้อ preview เลย = เด็ก free เข้าด่านแล้วเจอด่านว่าง
  // (ต่างจากเดิมตรงที่ไม่พังทั้งด่านแล้ว เพราะ query กรองสิทธิ์ให้ในตัว จึงเป็นคำเตือน ไม่ใช่ error)
  if (state.isPreview) {
    const previewCount = poolExercises.filter((item) => item.isPreview === true).length;
    if (previewCount === 0) {
      warnings.push('เปิดด่านนี้ให้ผู้ใช้ทั่วไปแล้ว แต่ยังไม่มีโจทย์ที่เปิดให้ผู้ใช้ทั่วไปเลย เด็กกลุ่มนั้นจะเจอด่านว่าง');
    }
  }

  return { valid: Object.keys(errors).length === 0, errors, warnings };
}

export function buildStageDoc(state, { existing = null, adminUid, now = new Date().toISOString() } = {}) {
  return {
    skill: state.skill,
    level: state.level,
    order: state.order,
    title: state.title.trim(),
    tags: [...state.tags],
    drawCount: state.drawCount,
    passThreshold: state.passThreshold,
    isPreview: state.isPreview,
    reviewStatus: state.reviewStatus,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    createdBy: existing?.createdBy ?? adminUid,
  };
}
