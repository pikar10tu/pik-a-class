/**
 * Helper functions for Admin Macro Dashboard aggregations and displays
 */

/**
 * Calculate user tier distribution
 * @param {Array<Object>} students
 * @returns {{ total: number, full: number, free: number, fullPercent: number }}
 */
export function calculateTierStats(students = []) {
  const total = students.length;
  const full = students.filter((s) => s.tier === 'full').length;
  const free = total - full;
  const fullPercent = total > 0 ? Math.round((full / total) * 100) : 0;

  return {
    total,
    full,
    free,
    fullPercent,
  };
}

/**
 * Get top learners in Animal Cafe sorted by high score then max combo
 * @param {Array<Object>} students
 * @param {number} limit
 * @returns {Array<Object>}
 */
export function getTopCafeLearners(students = [], limit = 5) {
  return [...students]
    .filter((s) => (s.speedCafeStats?.highScore || 0) > 0)
    .sort((a, b) => {
      const scoreDiff = (b.speedCafeStats?.highScore || 0) - (a.speedCafeStats?.highScore || 0);
      if (scoreDiff !== 0) return scoreDiff;
      return (b.speedCafeStats?.maxCombo || 0) - (a.speedCafeStats?.maxCombo || 0);
    })
    .slice(0, limit);
}

/**
 * Get most recently registered students
 * @param {Array<Object>} students
 * @param {number} limit
 * @returns {Array<Object>}
 */
export function getRecentStudents(students = [], limit = 5) {
  return [...students].slice(0, limit);
}
