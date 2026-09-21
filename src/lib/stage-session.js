import { gradeAnswer, scoreOf, starsFor } from './grading.js';

export function createSession(exercises) {
  return { exercises, index: 0, results: [], finished: exercises.length === 0 };
}

export function currentExercise(session) {
  if (session.finished) return null;
  return session.exercises[session.index] ?? null;
}

export function answerCurrent(session, answer) {
  const exercise = currentExercise(session);
  if (!exercise) return session;
  // Ignore a repeat submission for a question already answered: the first answer stands.
  if (session.results.some((result) => result.exerciseId === exercise.id)) return session;

  const { correct } = gradeAnswer(exercise, answer);
  return {
    ...session,
    results: [...session.results, { exerciseId: exercise.id, answer: String(answer ?? ''), correct }],
  };
}

export function advance(session) {
  const nextIndex = session.index + 1;
  return { ...session, index: nextIndex, finished: nextIndex >= session.exercises.length };
}

export function summarize(session, passThreshold) {
  const score = scoreOf(session.results);
  return {
    correctCount: session.results.filter((result) => result.correct).length,
    total: session.exercises.length,
    score,
    stars: starsFor(score),
    passed: score >= passThreshold,
  };
}
