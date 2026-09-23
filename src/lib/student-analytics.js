import { starsFor } from './grading.js';

export function calculateStudentOverview({ submissions = [], stageClears = [], stages = [] } = {}) {
  // คำนวณจำนวนข้อที่ทำทั้งหมด (รวมทำซ้ำ)
  const submissionsTotalAttempts = submissions.reduce((sum, s) => sum + (s.attemptCount ?? 1), 0);
  const stageClearsTotalQuestions = stageClears.reduce((sum, c) => sum + (c.totalQuestionsAnswered ?? 0), 0);
  const totalQuestionsAnswered = Math.max(submissionsTotalAttempts, stageClearsTotalQuestions);

  const totalWrongAnswers = submissions.reduce((sum, s) => sum + (s.wrongCount ?? 0), 0);
  const totalCorrectAnswers = Math.max(0, submissionsTotalAttempts - totalWrongAnswers);
  const overallAccuracy = submissionsTotalAttempts > 0
    ? Math.round((totalCorrectAnswers / submissionsTotalAttempts) * 100)
    : 0;

  // ดาวรวมคิดจากคะแนนสูงสุดของแต่ละด่าน (เพดาน 3 ดาวต่อด่าน ไม่เฟ้อ)
  const totalStars = stageClears.reduce((sum, c) => sum + (c.bestStars ?? starsFor(c.score ?? 0)), 0);
  const maxPossibleStars = stages.length > 0 ? stages.length * 3 : 0;

  const totalStagesAttempted = stageClears.length;
  const totalStagesCleared = stageClears.filter((c) => {
    return (c.clearCount ?? 0) > 0 || (c.score ?? 0) >= 0.7;
  }).length;

  const totalStagePlays = stageClears.reduce((sum, c) => sum + (c.attemptCount ?? 1), 0);
  const averageRepetitionsPerStage = totalStagesAttempted > 0
    ? +(totalStagePlays / totalStagesAttempted).toFixed(1)
    : 0;

  return {
    totalQuestionsAnswered,
    totalCorrectAnswers,
    totalWrongAnswers,
    overallAccuracy,
    totalStars,
    maxPossibleStars,
    totalStagesAttempted,
    totalStagesCleared,
    totalStagePlays,
    averageRepetitionsPerStage,
    masteredStagesCount: stageClears.filter((c) => (c.bestStars ?? starsFor(c.score ?? 0)) === 3).length,
  };
}

export function calculateSkillBreakdown(submissions = []) {
  const skills = {
    vocab: { skill: 'vocab', label: 'คำศัพท์ (Vocabulary)', practicedCount: 0, correctCount: 0, wrongCount: 0, uniqueCount: 0 },
    grammar: { skill: 'grammar', label: 'ไวยากรณ์ (Grammar)', practicedCount: 0, correctCount: 0, wrongCount: 0, uniqueCount: 0 },
    dialogue: { skill: 'dialogue', label: 'บทสนทนา (Dialogue)', practicedCount: 0, correctCount: 0, wrongCount: 0, uniqueCount: 0 },
  };

  for (const sub of submissions) {
    const target = skills[sub.skill];
    if (!target) continue;
    const attempts = sub.attemptCount ?? 1;
    const wrongs = sub.wrongCount ?? 0;
    target.practicedCount += attempts;
    target.wrongCount += wrongs;
    target.correctCount += Math.max(0, attempts - wrongs);
    target.uniqueCount += 1;
  }

  for (const key of Object.keys(skills)) {
    const item = skills[key];
    item.accuracy = item.practicedCount > 0
      ? Math.round((item.correctCount / item.practicedCount) * 100)
      : 0;
  }

  return skills;
}

export function calculateVocabByLevel(submissions = []) {
  const levels = {
    A1: { level: 'A1', label: 'A1 Beginner', practicedCount: 0, correctCount: 0, wrongCount: 0, uniqueCount: 0 },
    A2: { level: 'A2', label: 'A2 Elementary', practicedCount: 0, correctCount: 0, wrongCount: 0, uniqueCount: 0 },
    B1: { level: 'B1', label: 'B1 Intermediate', practicedCount: 0, correctCount: 0, wrongCount: 0, uniqueCount: 0 },
    B2: { level: 'B2', label: 'B2 Upper-Inter', practicedCount: 0, correctCount: 0, wrongCount: 0, uniqueCount: 0 },
  };

  let totalVocabPracticed = 0;

  for (const sub of submissions) {
    if (sub.skill !== 'vocab') continue;
    const target = levels[sub.level];
    if (!target) continue;
    const attempts = sub.attemptCount ?? 1;
    const wrongs = sub.wrongCount ?? 0;
    target.practicedCount += attempts;
    target.wrongCount += wrongs;
    target.correctCount += Math.max(0, attempts - wrongs);
    target.uniqueCount += 1;
    totalVocabPracticed += attempts;
  }

  for (const lvl of Object.keys(levels)) {
    const item = levels[lvl];
    item.accuracy = item.practicedCount > 0
      ? Math.round((item.correctCount / item.practicedCount) * 100)
      : 0;
  }

  return { levels, totalVocabPracticed };
}

export function calculateStageRepetitions({ stageClears = [], stages = [] } = {}) {
  const clearByStageId = new Map(stageClears.map((c) => [c.stageId, c]));

  return stages.map((stage) => {
    const clear = clearByStageId.get(stage.id) ?? null;
    const threshold = stage.passThreshold ?? 0.7;
    const attemptCount = clear?.attemptCount ?? (clear ? 1 : 0);
    const clearCount = clear?.clearCount ?? ((clear?.score ?? 0) >= threshold ? 1 : 0);
    const bestScore = clear?.score ?? 0;
    const bestStars = clear?.bestStars ?? (clear ? starsFor(bestScore) : 0);
    const lastScore = clear?.lastScore ?? clear?.score ?? null;
    const totalQuestionsAnswered = clear?.totalQuestionsAnswered ?? (attemptCount * (stage.drawCount ?? 10));
    const lastPlayedAt = clear?.lastPlayedAt ?? clear?.clearedAt ?? null;

    let status = 'unplayed';
    let statusLabel = 'ยังไม่ได้เริ่ม';
    if (bestStars === 3) {
      status = 'mastered';
      statusLabel = 'เชี่ยวชาญ ⭐⭐⭐';
    } else if (clearCount > 0) {
      status = 'passed';
      statusLabel = 'ผ่านแล้ว';
    } else if (attemptCount > 0) {
      status = 'practicing';
      statusLabel = 'กำลังฝึกฝน';
    }

    return {
      stageId: stage.id,
      title: stage.title,
      skill: stage.skill,
      level: stage.level,
      order: stage.order,
      passThreshold: threshold,
      attemptCount,
      clearCount,
      bestScore,
      bestStars,
      lastScore,
      totalQuestionsAnswered,
      lastPlayedAt,
      status,
      statusLabel,
    };
  });
}

export function calculateTopicStrengthsAndWeaknesses(submissions = []) {
  const tagMap = new Map();

  for (const sub of submissions) {
    const tags = Array.isArray(sub.tags) ? sub.tags : [];
    const attempts = sub.attemptCount ?? 1;
    const wrongs = sub.wrongCount ?? 0;
    const corrects = Math.max(0, attempts - wrongs);

    for (const tag of tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, { tag, attempts: 0, wrongs: 0, corrects: 0 });
      }
      const item = tagMap.get(tag);
      item.attempts += attempts;
      item.wrongs += wrongs;
      item.corrects += corrects;
    }
  }

  const topicList = Array.from(tagMap.values()).map((item) => ({
    tag: item.tag,
    label: formatTagLabel(item.tag),
    attempts: item.attempts,
    wrongs: item.wrongs,
    corrects: item.corrects,
    accuracy: item.attempts > 0 ? Math.round((item.corrects / item.attempts) * 100) : 0,
  }));

  // จุดแข็ง: ทำอย่างน้อย 2 ครั้ง และความแม่นยำ >= 75%
  const strengths = topicList
    .filter((t) => t.attempts >= 2 && t.accuracy >= 75)
    .sort((a, b) => b.accuracy - a.accuracy || b.attempts - a.attempts)
    .slice(0, 5);

  // จุดที่ควรฝึกเสริม: มีข้อที่ตอบผิดอย่างน้อย 1 ครั้ง และความแม่นยำ < 75%
  const weaknesses = topicList
    .filter((t) => t.wrongs >= 1 && t.accuracy < 75)
    .sort((a, b) => b.wrongs - a.wrongs || a.accuracy - b.accuracy)
    .slice(0, 5);

  return { strengths, weaknesses, allTopics: topicList };
}

export function formatTagLabel(tag) {
  if (!tag) return '';
  const withoutPrefix = tag.replace(/^(grammar|vocab|dialogue):/, '');
  return withoutPrefix
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatLineSummary({ student, overview, vocabStats, strengthsAndWeaknesses, teacherNote }) {
  const name = student?.callName || student?.nickname || student?.fullName || 'ผู้เรียน';
  const grade = student?.grade ? `(${student.grade})` : '';

  const vocabLines = Object.values(vocabStats?.levels ?? {})
    .filter((lvl) => lvl.practicedCount > 0)
    .map((lvl) => `   • ${lvl.level}: ${lvl.practicedCount} ข้อ (แม่นยำ ${lvl.accuracy}%)`)
    .join('\n');

  const strengthText = strengthsAndWeaknesses?.strengths?.length > 0
    ? strengthsAndWeaknesses.strengths.map((s) => s.label).join(', ')
    : 'กำลังสะสมข้อมูลหัวข้อเด่น';

  const weaknessText = strengthsAndWeaknesses?.weaknesses?.length > 0
    ? strengthsAndWeaknesses.weaknesses.map((w) => w.label).join(', ')
    : 'ไม่มีหัวข้อที่น่ากังวล ทบทวนได้ต่อเนื่อง';

  const note = teacherNote?.trim()
    ? `\n💬 ข้อเสนอแนะจากครูพี่ปิ๊ก:\n${teacherNote.trim()}\n`
    : '';

  return `📊 รายงานพัฒนาการภาษาอังกฤษ: ${name} ${grade}
🌟 แพลตฟอร์ม Pik a Class
━━━━━━━━━━━━━━━━━━━━━━
📝 แบบฝึกหัดที่ฝึกไปแล้ว: ${overview.totalQuestionsAnswered} ข้อ (รวมฝึกซ้ำ)
🔄 ดัชนีความพยายาม: เฉลี่ยทำซ้ำ ${overview.averageRepetitionsPerStage} ครั้ง/ด่าน
⭐ ดาวสะสม: ${overview.totalStars} / ${overview.maxPossibleStars} ดาว
🎯 ความแม่นยำรวม: ${overview.overallAccuracy}%
🏆 ด่านที่ผ่านแล้ว: ${overview.totalStagesCleared} ด่าน (ระดับ Mastered ${overview.masteredStagesCount} ด่าน)

📚 คลังคำศัพท์ที่ฝึกซ้อม (Vocab): ${vocabStats?.totalVocabPracticed ?? 0} ข้อ
${vocabLines || '   • ยังไม่มีประวัติการฝึกศัพท์'}

✨ จุดเด่นที่เชี่ยวชาญ: ${strengthText}
📌 จุดที่ครูแนะนำให้ฝึกซ้ำ: ${weaknessText}
━━━━━━━━━━━━━━━━━━━━━━${note}
สู้ๆ ไปด้วยกันครับ เก่งขึ้นทุกวันแน่นอน! 🚀`;
}
