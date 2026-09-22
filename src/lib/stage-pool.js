// คลังของด่านกับการสุ่มข้อมาเล่นหนึ่งรอบ — ตรรกะบริสุทธิ์ ไม่แตะ Firestore
// เงื่อนไขที่นี่ต้องสะท้อน stagePoolConstraints ใน queries.js ให้ตรงกัน
// ที่โน่นใช้กรองฝั่งเซิร์ฟเวอร์ ที่นี่ใช้ตรวจฝั่งเราเองตอนหาข้อกำพร้า
// ข้อยกเว้น: isPreview ไม่รวมใน findOrphanExercises เพราะหาข้อกำพร้าถามยาว
// "ข้อใดที่อนุมัติแล้วแต่ไม่มีด่านไหนลากได้" (มุมมอง full-tier สูงสุด) ไม่ใช่ "ข้อที่ผู้ใช้ปัจจุบันสามารถหาได้"

export function matchesStagePool(stage, exercise) {
  if (exercise.reviewStatus !== 'published') return false;
  if (exercise.visibility !== 'bank') return false;
  if (exercise.skill !== stage.skill) return false;
  if (exercise.level !== stage.level) return false;
  const tags = exercise.tags ?? [];
  return (stage.tags ?? []).some((tag) => tags.includes(tag));
}

export function findOrphanExercises(stages, exercises) {
  return exercises.filter((exercise) => {
    if (exercise.reviewStatus !== 'published') return false;
    if (exercise.visibility !== 'bank') return false;
    return !stages.some((stage) => matchesStagePool(stage, exercise));
  });
}

function shuffle(array, random) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Fisher-Yates บนสำเนา แล้วตัดเอาเท่าที่ขอ — สุ่มทั้งว่าได้ข้อไหนและได้เรียงยังไงในคราวเดียว
// รองรับ options.minSentenceBuilders หรือ options.stageOrder (คี่=1, คู่=2) เพื่อการันตีชนิดข้อสอบในระบบคู่ด่าน
// รับ random เข้ามาเพื่อให้เทสตรึงผลได้ ห้ามเรียก Math.random ตรงๆ ข้างใน
export function pickRound(pool, drawCount, random = Math.random, options = {}) {
  const targetCount = Math.max(0, drawCount);
  if (!Array.isArray(pool) || pool.length === 0 || targetCount === 0) return [];

  let minSb = options.minSentenceBuilders;
  if (minSb === undefined && typeof options.stageOrder === 'number') {
    minSb = options.stageOrder % 2 === 0 ? 2 : 1;
  }

  if (typeof minSb === 'number' && minSb > 0) {
    const sbList = pool.filter((item) => item.type === 'sentence_builder');
    if (sbList.length > 0) {
      const takeSbCount = Math.min(sbList.length, Math.min(targetCount, minSb));
      const shuffledSb = shuffle(sbList, random);
      const chosenSb = shuffledSb.slice(0, takeSbCount);
      const chosenIds = new Set(chosenSb.map((item) => item.id));

      const remainingPool = pool.filter((item) => !chosenIds.has(item.id));
      const remainingNeeded = targetCount - chosenSb.length;
      const shuffledRemaining = shuffle(remainingPool, random);
      const chosenRemaining = shuffledRemaining.slice(0, remainingNeeded);

      const combined = [...chosenSb, ...chosenRemaining];
      return shuffle(combined, random);
    }
  }

  const copy = shuffle(pool, random);
  return copy.slice(0, targetCount);
}
