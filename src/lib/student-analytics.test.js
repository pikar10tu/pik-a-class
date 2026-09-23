import { describe, it, expect } from 'vitest';
import {
  calculateStudentOverview,
  calculateSkillBreakdown,
  calculateVocabByLevel,
  calculateStageRepetitions,
  calculateTopicStrengthsAndWeaknesses,
  formatTagLabel,
  formatLineSummary,
} from './student-analytics.js';

describe('student-analytics', () => {
  const dummyStages = [
    { id: 'st1', title: 'Nouns & Articles', skill: 'grammar', level: 'A1', order: 1, passThreshold: 0.7, drawCount: 10 },
    { id: 'st2', title: 'Daily Routines', skill: 'vocab', level: 'A1', order: 2, passThreshold: 0.7, drawCount: 10 },
    { id: 'st3', title: 'Past Tense Stories', skill: 'grammar', level: 'A2', order: 3, passThreshold: 0.7, drawCount: 10 },
  ];

  const dummySubmissions = [
    { exerciseId: 'ex1', skill: 'vocab', level: 'A1', tags: ['vocab:daily-routines'], attemptCount: 3, wrongCount: 0 },
    { exerciseId: 'ex2', skill: 'vocab', level: 'A1', tags: ['vocab:daily-routines'], attemptCount: 2, wrongCount: 1 },
    { exerciseId: 'ex3', skill: 'vocab', level: 'A2', tags: ['vocab:travel'], attemptCount: 4, wrongCount: 0 },
    { exerciseId: 'ex4', skill: 'grammar', level: 'A1', tags: ['grammar:nouns'], attemptCount: 5, wrongCount: 0 },
    { exerciseId: 'ex5', skill: 'grammar', level: 'A2', tags: ['grammar:past-simple'], attemptCount: 4, wrongCount: 3 },
  ];

  const dummyClears = [
    {
      stageId: 'st1',
      score: 1.0,
      bestStars: 3,
      attemptCount: 3,
      clearCount: 3,
      totalQuestionsAnswered: 30,
    },
    {
      stageId: 'st2',
      score: 0.8,
      bestStars: 2,
      attemptCount: 2,
      clearCount: 1,
      totalQuestionsAnswered: 20,
    },
    {
      stageId: 'st3',
      score: 0.5,
      bestStars: 1,
      attemptCount: 1,
      clearCount: 0,
      totalQuestionsAnswered: 10,
    },
  ];

  describe('calculateStudentOverview', () => {
    it('handles empty input gracefully', () => {
      const result = calculateStudentOverview();
      expect(result.totalQuestionsAnswered).toBe(0);
      expect(result.overallAccuracy).toBe(0);
      expect(result.totalStars).toBe(0);
      expect(result.totalStagesAttempted).toBe(0);
      expect(result.averageRepetitionsPerStage).toBe(0);
    });

    it('calculates totals, accuracy, and average repetitions correctly', () => {
      const result = calculateStudentOverview({
        submissions: dummySubmissions,
        stageClears: dummyClears,
        stages: dummyStages,
      });

      // dummyClears totalQuestions = 30 + 20 + 10 = 60
      // dummySubmissions totalAttempts = 3 + 2 + 4 + 5 + 4 = 18
      // Math.max(18, 60) = 60
      expect(result.totalQuestionsAnswered).toBe(60);
      expect(result.totalWrongAnswers).toBe(4); // 0 + 1 + 0 + 0 + 3
      // Submissions accuracy: (18 - 4) / 18 = 14 / 18 = 78%
      expect(result.overallAccuracy).toBe(78);
      // Total stars: 3 + 2 + 1 = 6
      expect(result.totalStars).toBe(6);
      expect(result.maxPossibleStars).toBe(9); // 3 stages * 3
      expect(result.totalStagesAttempted).toBe(3);
      expect(result.totalStagesCleared).toBe(2); // st1 (3 clears), st2 (1 clear)
      expect(result.totalStagePlays).toBe(6); // 3 + 2 + 1
      expect(result.averageRepetitionsPerStage).toBe(2.0); // 6 / 3
      expect(result.masteredStagesCount).toBe(1); // st1 with 3 stars
    });
  });

  describe('calculateSkillBreakdown', () => {
    it('groups attempts and calculates accuracy per skill', () => {
      const result = calculateSkillBreakdown(dummySubmissions);
      expect(result.vocab.practicedCount).toBe(9); // 3 + 2 + 4
      expect(result.vocab.wrongCount).toBe(1);
      expect(result.vocab.accuracy).toBe(89); // 8/9 = 89%

      expect(result.grammar.practicedCount).toBe(9); // 5 + 4
      expect(result.grammar.wrongCount).toBe(3);
      expect(result.grammar.accuracy).toBe(67); // 6/9 = 67%

      expect(result.dialogue.practicedCount).toBe(0);
    });
  });

  describe('calculateVocabByLevel', () => {
    it('groups vocab submissions by CEFR level', () => {
      const { levels, totalVocabPracticed } = calculateVocabByLevel(dummySubmissions);
      expect(totalVocabPracticed).toBe(9);
      expect(levels.A1.practicedCount).toBe(5); // ex1 (3) + ex2 (2)
      expect(levels.A1.wrongCount).toBe(1);
      expect(levels.A1.accuracy).toBe(80); // 4/5 = 80%
      expect(levels.A2.practicedCount).toBe(4); // ex3 (4)
      expect(levels.A2.accuracy).toBe(100);
      expect(levels.B1.practicedCount).toBe(0);
      expect(levels.B2.practicedCount).toBe(0);
    });
  });

  describe('calculateStageRepetitions', () => {
    it('maps stages with clear records and generates status labels', () => {
      const result = calculateStageRepetitions({
        stageClears: dummyClears,
        stages: dummyStages,
      });

      expect(result).toHaveLength(3);
      expect(result[0]).toMatchObject({
        stageId: 'st1',
        title: 'Nouns & Articles',
        attemptCount: 3,
        clearCount: 3,
        bestStars: 3,
        status: 'mastered',
        statusLabel: 'เชี่ยวชาญ ⭐⭐⭐',
      });
      expect(result[1]).toMatchObject({
        stageId: 'st2',
        attemptCount: 2,
        clearCount: 1,
        bestStars: 2,
        status: 'passed',
      });
      expect(result[2]).toMatchObject({
        stageId: 'st3',
        attemptCount: 1,
        clearCount: 0,
        bestStars: 1,
        status: 'practicing',
      });
    });
  });

  describe('calculateTopicStrengthsAndWeaknesses', () => {
    it('identifies top strengths and areas for focus', () => {
      const result = calculateTopicStrengthsAndWeaknesses(dummySubmissions);
      expect(result.strengths.length).toBeGreaterThan(0);
      // Nouns has 5 attempts, 0 wrongs -> 100%
      expect(result.strengths.some((s) => s.label.includes('Nouns'))).toBe(true);

      expect(result.weaknesses.length).toBeGreaterThan(0);
      // Past simple has 4 attempts, 3 wrongs -> 25% accuracy
      expect(result.weaknesses.some((w) => w.label.includes('Past Simple'))).toBe(true);
    });
  });

  describe('formatTagLabel', () => {
    it('cleans and formats tag strings', () => {
      expect(formatTagLabel('grammar:present-simple')).toBe('Present Simple');
      expect(formatTagLabel('vocab:daily-routines')).toBe('Daily Routines');
    });
  });

  describe('formatLineSummary', () => {
    it('creates a complete LINE message with stats', () => {
      const student = { callName: 'น้องบีน', grade: 'ม.2' };
      const overview = calculateStudentOverview({
        submissions: dummySubmissions,
        stageClears: dummyClears,
        stages: dummyStages,
      });
      const vocabStats = calculateVocabByLevel(dummySubmissions);
      const strengthsAndWeaknesses = calculateTopicStrengthsAndWeaknesses(dummySubmissions);

      const text = formatLineSummary({
        student,
        overview,
        vocabStats,
        strengthsAndWeaknesses,
        teacherNote: 'สัปดาห์นี้น้องขยันมากครับ!',
      });

      expect(text).toContain('น้องบีน (ม.2)');
      expect(text).toContain('สัปดาห์นี้น้องขยันมากครับ!');
      expect(text).toContain('ดาวสะสม: 6 / 9 ดาว');
      expect(text).toContain('ดัชนีความพยายาม: เฉลี่ยทำซ้ำ 2 ครั้ง/ด่าน');
      expect(text).toContain('A1: 5 ข้อ (แม่นยำ 80%)');
    });
  });
});
