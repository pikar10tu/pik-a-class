import { describe, it, expect } from 'vitest';
import { evaluateBadges, BADGE_DEFINITIONS } from './badges.js';

describe('Badges System', () => {
  it('defines 12 badges covering exploration, stars, mastery, and effort', () => {
    expect(BADGE_DEFINITIONS).toHaveLength(12);
    const ids = BADGE_DEFINITIONS.map((b) => b.id);
    expect(new Set(ids).size).toBe(12);
  });

  it('contains NO streak-related badges (strictly respecting project guidelines)', () => {
    for (const b of BADGE_DEFINITIONS) {
      expect(b.id).not.toMatch(/streak/i);
      expect(b.title).not.toMatch(/streak|วันติด|ล็อกอิน/i);
      expect(b.description).not.toMatch(/streak|วันติด|ล็อกอินทุกวัน/i);
    }
  });

  it('evaluates all badges as locked for a brand new student', () => {
    const badges = evaluateBadges();
    expect(badges).toHaveLength(12);
    expect(badges.every((b) => !b.unlocked)).toBe(true);
    expect(badges.every((b) => b.current === 0)).toBe(true);
  });

  it('unlocks first_step when 1 stage is cleared', () => {
    const badges = evaluateBadges({ totalStagesCleared: 1 });
    const firstStep = badges.find((b) => b.id === 'first_step');
    expect(firstStep.unlocked).toBe(true);
    expect(firstStep.current).toBe(1);
    expect(firstStep.percent).toBe(100);
  });

  it('correctly tracks star collector milestones', () => {
    const badges10 = evaluateBadges({ totalStars: 10 });
    expect(badges10.find((b) => b.id === 'star_collector_15').unlocked).toBe(false);
    expect(badges10.find((b) => b.id === 'star_collector_15').current).toBe(10);
    expect(badges10.find((b) => b.id === 'star_collector_15').progressText).toBe('10/15 ดาว');

    const badges45 = evaluateBadges({ totalStars: 45 });
    expect(badges45.find((b) => b.id === 'star_collector_15').unlocked).toBe(true);
    expect(badges45.find((b) => b.id === 'star_collector_40').unlocked).toBe(true);
    expect(badges45.find((b) => b.id === 'star_collector_80').unlocked).toBe(false);
    expect(badges45.find((b) => b.id === 'star_collector_80').current).toBe(45);
  });

  it('unlocks island conqueror badges when boss stage 20 is cleared', () => {
    const stageClears = [
      { level: 'A1', order: 10, clearCount: 1, score: 0.8 },
      { level: 'A1', order: 20, clearCount: 1, score: 1.0 },
      { level: 'B1', order: 20, clearCount: 0, score: 0.5 }, // Not cleared
    ];

    const badges = evaluateBadges({ stageClears });
    expect(badges.find((b) => b.id === 'island_a1').unlocked).toBe(true);
    expect(badges.find((b) => b.id === 'island_a2').unlocked).toBe(false);
    expect(badges.find((b) => b.id === 'island_b1').unlocked).toBe(false);
    expect(badges.find((b) => b.id === 'island_b2').unlocked).toBe(false);
  });

  it('unlocks effort champion when 50 questions are answered', () => {
    const badges30 = evaluateBadges({ totalQuestionsAnswered: 30 });
    expect(badges30.find((b) => b.id === 'effort_champion').unlocked).toBe(false);
    expect(badges30.find((b) => b.id === 'effort_champion').percent).toBe(60);

    const badges60 = evaluateBadges({ totalQuestionsAnswered: 60 });
    expect(badges60.find((b) => b.id === 'effort_champion').unlocked).toBe(true);
    expect(badges60.find((b) => b.id === 'effort_champion').current).toBe(50);
  });

  it('unlocks speed barista and grammar scholar', () => {
    const badges = evaluateBadges({
      cafeMaxCombo: 12,
      hasReadHandbook: true,
    });
    expect(badges.find((b) => b.id === 'speed_barista').unlocked).toBe(true);
    expect(badges.find((b) => b.id === 'grammar_scholar').unlocked).toBe(true);
  });
});
