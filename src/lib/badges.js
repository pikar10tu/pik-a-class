/**
 * Badges & Achievements System
 * 
 * NOTE: Strictly NO STREAK requirements!
 * Progress is driven by effort, repetitions, stars, boss clears, and exploration.
 */

export const BADGE_DEFINITIONS = [
  {
    id: 'first_step',
    title: 'ก้าวแรกสู่นักผจญภัย',
    description: 'ผ่านด่านทดสอบใดก็ได้ 1 ด่านแรก',
    icon: '🎓',
    category: 'adventure',
    rarity: 'common',
    target: 1,
    unit: 'ด่าน',
    evaluator: ({ totalStagesCleared = 0 }) => totalStagesCleared,
  },
  {
    id: 'star_collector_15',
    title: 'นักสะสมดาว',
    description: 'สะสมดาวผ่านด่านครบ 15 ดวง',
    icon: '⭐',
    category: 'stars',
    rarity: 'common',
    target: 15,
    unit: 'ดาว',
    evaluator: ({ totalStars = 0 }) => totalStars,
  },
  {
    id: 'star_collector_40',
    title: 'คลังดวงดาว',
    description: 'สะสมดาวผ่านด่านครบ 40 ดวง',
    icon: '🌟',
    category: 'stars',
    rarity: 'rare',
    target: 40,
    unit: 'ดาว',
    evaluator: ({ totalStars = 0 }) => totalStars,
  },
  {
    id: 'star_collector_80',
    title: 'ราชาแห่งดวงดาว',
    description: 'สะสมดาวผ่านด่านครบ 80 ดวง',
    icon: '👑',
    category: 'stars',
    rarity: 'epic',
    target: 80,
    unit: 'ดาว',
    evaluator: ({ totalStars = 0 }) => totalStars,
  },
  {
    id: 'perfect_mastery_5',
    title: 'ยอดฝีมือ 3 ดาว',
    description: 'ทำคะแนน 3 ดาวเต็มได้อย่างน้อย 5 ด่าน',
    icon: '💎',
    category: 'mastery',
    rarity: 'rare',
    target: 5,
    unit: 'ด่าน',
    evaluator: ({ masteredStagesCount = 0 }) => masteredStagesCount,
  },
  {
    id: 'island_a1',
    title: 'ผู้พิชิตเกาะทุ่งหญ้า A1',
    description: 'ผ่านบอสใหญ่ประจำเกาะทุ่งหญ้า (ด่าน 20)',
    icon: '🏝️',
    category: 'adventure',
    rarity: 'rare',
    target: 1,
    unit: 'ด่าน',
    evaluator: ({ stageClears = [] }) => {
      const boss = stageClears.find(
        (c) => c.level === 'A1' && c.order === 20 && ((c.clearCount ?? 0) > 0 || (c.score ?? 0) >= 0.7),
      );
      return boss ? 1 : 0;
    },
  },
  {
    id: 'island_a2',
    title: 'ผู้พิชิตเกาะชายหาด A2',
    description: 'ผ่านบอสใหญ่ประจำเกาะชายหาด (ด่าน 20)',
    icon: '🌊',
    category: 'adventure',
    rarity: 'rare',
    target: 1,
    unit: 'ด่าน',
    evaluator: ({ stageClears = [] }) => {
      const boss = stageClears.find(
        (c) => c.level === 'A2' && c.order === 20 && ((c.clearCount ?? 0) > 0 || (c.score ?? 0) >= 0.7),
      );
      return boss ? 1 : 0;
    },
  },
  {
    id: 'island_b1',
    title: 'ผู้พิชิตนครเวทมนตร์ B1',
    description: 'ผ่านบอสใหญ่ประจำนครเวทมนตร์ (ด่าน 20)',
    icon: '🔮',
    category: 'adventure',
    rarity: 'epic',
    target: 1,
    unit: 'ด่าน',
    evaluator: ({ stageClears = [] }) => {
      const boss = stageClears.find(
        (c) => c.level === 'B1' && c.order === 20 && ((c.clearCount ?? 0) > 0 || (c.score ?? 0) >= 0.7),
      );
      return boss ? 1 : 0;
    },
  },
  {
    id: 'island_b2',
    title: 'ผู้พิชิตปราสาทสวรรค์ B2',
    description: 'ผ่านบอสใหญ่ประจำปราสาทสวรรค์ (ด่าน 20)',
    icon: '⚡',
    category: 'adventure',
    rarity: 'legendary',
    target: 1,
    unit: 'ด่าน',
    evaluator: ({ stageClears = [] }) => {
      const boss = stageClears.find(
        (c) => c.level === 'B2' && c.order === 20 && ((c.clearCount ?? 0) > 0 || (c.score ?? 0) >= 0.7),
      );
      return boss ? 1 : 0;
    },
  },
  {
    id: 'effort_champion',
    title: 'จอมขยันประจำคลาส',
    description: 'ฝึกทำแบบฝึกหัดสะสมครบ 50 ข้อ (นับรวมทุกข้อที่พยายาม)',
    icon: '🔁',
    category: 'effort',
    rarity: 'rare',
    target: 50,
    unit: 'ข้อ',
    evaluator: ({ totalQuestionsAnswered = 0 }) => totalQuestionsAnswered,
  },
  {
    id: 'speed_barista',
    title: 'บาริสต้าความเร็วแสง',
    description: 'ทำคอมโบได้ 10x ขึ้นไปในเกม Animal Cafe',
    icon: '☕',
    category: 'speed',
    rarity: 'rare',
    target: 10,
    unit: 'คอมโบ',
    evaluator: ({ cafeMaxCombo = 0 }) => cafeMaxCombo,
  },
  {
    id: 'grammar_scholar',
    title: 'หนอนหนังสือไวยากรณ์',
    description: 'เปิดอ่านสรุปในคู่มือไวยากรณ์ (Handbook)',
    icon: '📖',
    category: 'research',
    rarity: 'common',
    target: 1,
    unit: 'ครั้ง',
    evaluator: ({ hasReadHandbook = false }) => (hasReadHandbook ? 1 : 0),
  },
];

/**
 * Calculates badge status for a student given their current progress metrics.
 * 
 * @param {Object} params
 * @param {number} [params.totalStars]
 * @param {number} [params.totalStagesCleared]
 * @param {number} [params.masteredStagesCount]
 * @param {number} [params.totalQuestionsAnswered]
 * @param {Array}  [params.stageClears]
 * @param {number} [params.cafeMaxCombo]
 * @param {boolean} [params.hasReadHandbook]
 * @returns {Array<Object>} List of evaluated badges with unlocked status and progress
 */
export function evaluateBadges({
  totalStars = 0,
  totalStagesCleared = 0,
  masteredStagesCount = 0,
  totalQuestionsAnswered = 0,
  stageClears = [],
  cafeMaxCombo = 0,
  hasReadHandbook = false,
} = {}) {
  const context = {
    totalStars,
    totalStagesCleared,
    masteredStagesCount,
    totalQuestionsAnswered,
    stageClears,
    cafeMaxCombo,
    hasReadHandbook,
  };

  return BADGE_DEFINITIONS.map((def) => {
    const rawVal = def.evaluator(context);
    const current = Math.max(0, Math.min(def.target, rawVal));
    const unlocked = rawVal >= def.target;
    const percent = Math.min(100, Math.round((rawVal / def.target) * 100));

    return {
      id: def.id,
      title: def.title,
      description: def.description,
      icon: def.icon,
      category: def.category,
      rarity: def.rarity,
      target: def.target,
      current,
      unit: def.unit,
      unlocked,
      percent,
      progressText: `${current}/${def.target} ${def.unit}`,
    };
  });
}
