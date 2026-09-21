import { submissionId, stageClearId } from './schema/doc-ids.js';
import { starsFor, scoreOf } from './grading.js';

export function buildStageWrites({
  uid,
  stage,
  exercises,
  results,
  existingSubmissions = {},
  existingClear = null,
  now = new Date().toISOString(),
}) {
  const resultByExercise = new Map(results.map((result) => [result.exerciseId, result]));

  const submissions = exercises
    .filter((exercise) => resultByExercise.has(exercise.id))
    .map((exercise) => {
      const result = resultByExercise.get(exercise.id);
      const id = submissionId(uid, exercise.id);
      const previous = existingSubmissions[id] ?? null;
      const stars = starsFor(result.correct ? 1 : 0);

      return {
        id,
        data: {
          uid,
          exerciseId: exercise.id,
          skill: exercise.skill,
          level: exercise.level,
          type: exercise.type,
          tags: exercise.tags ?? [],
          answer: result.answer,
          autoGraded: true,
          score: result.correct ? 1 : 0,
          // ห้ามต่ำกว่าค่าเดิมเด็ดขาด — rules ปฏิเสธแล้ว batch จะล้มทั้งชุด
          bestStars: Math.max(stars, previous?.bestStars ?? 0),
          attemptCount: (previous?.attemptCount ?? 0) + 1,
          wrongCount: (previous?.wrongCount ?? 0) + (result.correct ? 0 : 1),
          lastAnsweredAt: now,
          status: 'completed',
          createdAt: previous?.createdAt ?? now,
        },
      };
    });

  const score = scoreOf(results);
  const keepExisting = existingClear !== null && existingClear.score >= score;

  return {
    submissions,
    stageClear: keepExisting
      ? null
      : {
          id: stageClearId(uid, stage.id),
          data: {
            uid,
            stageId: stage.id,
            skill: stage.skill,
            level: stage.level,
            order: stage.order,
            score,
            clearedAt: now,
          },
        },
  };
}
