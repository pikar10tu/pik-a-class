import { starsFor } from './grading.js';

export function clearsByStageId(clearDocs) {
  const map = {};
  for (const clear of clearDocs) {
    map[clear.stageId] = { score: clear.score };
  }
  return map;
}

export function buildStagePath(stages, clearsMap) {
  const ordered = [...stages].sort((a, b) => a.order - b.order);
  let previous = null;

  return ordered.map((stage) => {
    const attempted = clearsMap[stage.id] !== undefined;
    const score = clearsMap[stage.id]?.score ?? 0;
    const cleared = attempted && score >= stage.passThreshold;
    const unlocked = previous === null ? true : previous.cleared;
    const entry = {
      id: stage.id,
      order: stage.order,
      title: stage.title,
      tags: stage.tags ?? [],
      // ด่านไม่ได้เก็บรายชื่อข้อแล้ว จำนวนที่เด็กจะได้เล่นคือจำนวนที่สุ่มต่อรอบ
      // ชื่อฟิลด์ยังเป็น itemCount เพื่อไม่ให้ต้องแก้หน้าเส้นทางที่แสดง "N ข้อ" อยู่แล้ว
      itemCount: stage.drawCount ?? 0,
      passThreshold: stage.passThreshold,
      score,
      stars: attempted ? starsFor(score) : 0,
      cleared,
      attempted,
      unlocked,
      lockedReason: unlocked
        ? null
        : `ผ่านด่าน ${previous.order} ที่ ${Math.round(previous.passThreshold * 100)}% ก่อน`,
    };
    previous = { order: stage.order, cleared, passThreshold: stage.passThreshold };
    return entry;
  });
}

export function totalStars(path) {
  return path.reduce((sum, stage) => sum + stage.stars, 0);
}
