// คลังของด่านกับการสุ่มข้อมาเล่นหนึ่งรอบ — ตรรกะบริสุทธิ์ ไม่แตะ Firestore
// เงื่อนไขที่นี่ต้องสะท้อน stagePoolConstraints ใน queries.js ให้ตรงกัน
// ที่โน่นใช้กรองฝั่งเซิร์ฟเวอร์ ที่นี่ใช้ตรวจฝั่งเราเองตอนหาข้อกำพร้า

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

// Fisher-Yates บนสำเนา แล้วตัดเอาเท่าที่ขอ — สุ่มทั้งว่าได้ข้อไหนและได้เรียงยังไงในคราวเดียว
// รับ random เข้ามาเพื่อให้เทสตรึงผลได้ ห้ามเรียก Math.random ตรงๆ ข้างใน
export function pickRound(pool, drawCount, random = Math.random) {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.max(0, drawCount));
}
