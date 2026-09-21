import { normalizeAnswer } from './grading.js';

export const WORD_BANK_SIZE = 4;

function collect(words, seen, out) {
  for (const word of words) {
    const key = normalizeAnswer(word);
    if (key === '' || seen.has(key)) continue;
    seen.add(key);
    out.push(word);
  }
}

export function distractorPool(exercise, stageExercises) {
  const seen = new Set((exercise.answerKey ?? []).map(normalizeAnswer));
  const others = stageExercises.filter((item) => item.id !== exercise.id);
  const pool = [];

  collect(
    others.filter((item) => item.type === 'fill_blank').flatMap((item) => item.answerKey ?? []),
    seen,
    pool,
  );

  if (pool.length < WORD_BANK_SIZE - 1) {
    collect(
      others.filter((item) => item.type === 'mcq').flatMap((item) => item.choices ?? []),
      seen,
      pool,
    );
  }

  return pool;
}

function shuffle(items, random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildWordBank(exercise, stageExercises, { size = WORD_BANK_SIZE, random = Math.random } = {}) {
  const answer = (exercise.answerKey ?? [])[0];
  const distractors = shuffle(distractorPool(exercise, stageExercises), random).slice(0, size - 1);
  return shuffle([answer, ...distractors], random);
}
