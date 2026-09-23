import { describe, it, expect, vi } from 'vitest';
import { fetchStudentReportData, fetchPlatformStats } from './student-report-io.js';

vi.mock('firebase/firestore', () => {
  return {
    collection: vi.fn((db, name) => ({ type: 'collection', name })),
    doc: vi.fn((db, name, id) => ({ type: 'doc', name, id })),
    getDoc: vi.fn(async (docRef) => {
      if (docRef.id === 'student1') {
        return {
          exists: () => true,
          id: 'student1',
          data: () => ({ fullName: 'Student One', role: 'student', tier: 'full' }),
        };
      }
      return { exists: () => false };
    }),
    getDocs: vi.fn(async (q) => {
      if (q?.name === 'stageClears' || q?.coll?.name === 'stageClears') {
        return {
          docs: [
            { id: 'sc1', data: () => ({ bestStars: 3, attemptCount: 2, totalQuestionsAnswered: 20 }) },
          ],
        };
      }
      return { docs: [] };
    }),
    getCountFromServer: vi.fn(async (q) => {
      return { data: () => ({ count: 42 }) };
    }),
    query: vi.fn((coll, ...clauses) => ({ type: 'query', coll, clauses })),
    where: vi.fn((f, op, v) => ({ f, op, v })),
    orderBy: vi.fn((f, dir) => ({ f, dir })),
  };
});

vi.mock('./stage-io.js', () => ({
  fetchStages: vi.fn(async (db, options) => {
    return [
      { id: 'st1', title: 'Stage 1', optionsReceived: options },
    ];
  }),
}));

describe('student-report-io', () => {
  it('fetchStudentReportData queries stages with tier: full so all stages are returned', async () => {
    const data = await fetchStudentReportData({}, 'student1');
    expect(data.student).toBeDefined();
    expect(data.student.uid).toBe('student1');
    expect(data.stages).toHaveLength(1);
    expect(data.stages[0].optionsReceived).toEqual({ publishedOnly: true, tier: 'full' });
  });

  it('fetchStudentReportData throws error if user not found', async () => {
    await expect(fetchStudentReportData({}, 'unknown-uid')).rejects.toThrow('ไม่พบข้อมูลผู้เรียนในระบบ');
  });

  it('fetchPlatformStats calculates platform KPIs correctly', async () => {
    const stats = await fetchPlatformStats({});
    expect(stats.studentCount).toBe(42);
    expect(stats.stageClearCount).toBe(42);
    expect(stats.totalStarsPlatform).toBe(3);
    expect(stats.totalStagePlaysPlatform).toBe(2);
  });
});
