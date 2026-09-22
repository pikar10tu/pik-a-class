export function normalizeAnswer(value) {
  return String(value ?? '')
    .replace(/['\u2019']/g, "'")
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

export function normalizeSentence(value) {
  if (Array.isArray(value)) {
    value = value.join(' ');
  }
  return String(value ?? '')
    .replace(/['\u2019']/g, "'")
    .replace(/[.,!?;:]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

export function gradeAnswer(exercise, answer) {
  if (exercise.type === 'sentence_builder') {
    const given = normalizeSentence(answer);
    const accepted = (exercise.answerKey ?? []).map(normalizeSentence);
    const correct = given !== '' && accepted.includes(given);
    return { correct, score: correct ? 1 : 0 };
  }
  const given = normalizeAnswer(answer);
  const accepted = (exercise.answerKey ?? []).map(normalizeAnswer);
  const correct = given !== '' && accepted.includes(given);
  return { correct, score: correct ? 1 : 0 };
}

export function starsFor(score) {
  if (score === 1.0) return 3;
  if (score >= 0.7) return 2;
  if (score >= 0.4) return 1;
  return 0;
}

export function scoreOf(results) {
  if (results.length === 0) return 0;
  const correct = results.filter((result) => result.correct).length;
  return correct / results.length;
}

