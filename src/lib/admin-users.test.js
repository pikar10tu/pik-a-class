import { describe, it, expect } from 'vitest';
import { filterStudents, parseGroupTags } from './admin-users.js';

const students = [
  { id: 'a', nickname: 'ชาย', fullName: 'สมชาย ใจดี', grade: 'ม.3', groupTags: ['เสาร์บ่าย'], phone: '0811111111' },
  { id: 'b', nickname: 'หญิง', fullName: 'สมหญิง ตั้งใจ', grade: 'ม.6', groupTags: [], phone: '0822222222' },
  {
    id: 'c',
    nickname: 'โก้',
    callName: 'พี่โก้',
    fullName: 'ประวิทย์ ทำงาน',
    grade: 'วัยทำงาน/บุคคลทั่วไป',
    groupTags: ['เสาร์บ่าย'],
    phone: '0833333333',
    allowedLevels: ['A1', 'A2'],
  },
  {
    id: 'd',
    nickname: 'มินท์',
    callName: 'คุณแม่น้องมินท์',
    fullName: 'รัตนา นารี',
    grade: 'วัยทำงาน/บุคคลทั่วไป',
    groupTags: [],
    phone: '0844444444',
  },
];

describe('filterStudents', () => {
  it('returns everybody when no filter is set', () => {
    expect(filterStudents(students, {})).toHaveLength(4);
  });

  it('filters by grade and by group tag', () => {
    expect(filterStudents(students, { grade: 'ม.3' }).map((s) => s.id)).toEqual(['a']);
    expect(filterStudents(students, { groupTag: 'เสาร์บ่าย' }).map((s) => s.id)).toEqual(['a', 'c']);
  });

  it('searches nickname, callName, full name, phone, and allowedLevels', () => {
    expect(filterStudents(students, { search: 'สมหญิง' }).map((s) => s.id)).toEqual(['b']);
    expect(filterStudents(students, { search: 'โก้' }).map((s) => s.id)).toEqual(['c']);
    expect(filterStudents(students, { search: 'พี่โก้' }).map((s) => s.id)).toEqual(['c']);
    expect(filterStudents(students, { search: 'คุณแม่' }).map((s) => s.id)).toEqual(['d']);
    expect(filterStudents(students, { search: '0822' }).map((s) => s.id)).toEqual(['b']);
    expect(filterStudents(students, { search: 'A2' }).map((s) => s.id)).toEqual(['c']);
    expect(filterStudents(students, { search: 'ไม่มีจริง' })).toEqual([]);
  });

  it('combines filters', () => {
    expect(filterStudents(students, { groupTag: 'เสาร์บ่าย', grade: 'ม.3' }).map((s) => s.id)).toEqual(['a']);
  });
});

describe('parseGroupTags', () => {
  it('splits on commas, trims, and drops blanks and duplicates', () => {
    expect(parseGroupTags(' เสาร์บ่าย , อาทิตย์เช้า ,, เสาร์บ่าย ')).toEqual(['เสาร์บ่าย', 'อาทิตย์เช้า']);
    expect(parseGroupTags('')).toEqual([]);
  });
});
