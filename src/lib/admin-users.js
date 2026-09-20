export function filterStudents(students, { grade = '', groupTag = '', search = '' } = {}) {
  const needle = search.trim().toLowerCase();
  return students.filter((student) => {
    if (grade && student.grade !== grade) return false;
    if (groupTag && !(student.groupTags ?? []).includes(groupTag)) return false;
    if (!needle) return true;
    const haystack = [student.nickname, student.fullName, student.phone, student.lineId]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function parseGroupTags(text) {
  const tags = String(text ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
  return [...new Set(tags)];
}
