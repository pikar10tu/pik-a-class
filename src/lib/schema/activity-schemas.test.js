import { describe, it, expect } from 'vitest';
import { validate } from './validate.js';
import { submissionId, stageClearId } from './doc-ids.js';

function submission(overrides = {}) {
  return {
    uid: 'u1',
    exerciseId: 'ex1',
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    tags: ['grammar:present-simple'],
    answer: 'goes',
    autoGraded: true,
    score: 1,
    bestStars: 3,
    attemptCount: 1,
    wrongCount: 0,
    lastAnsweredAt: '2026-09-20T10:00:00.000Z',
    status: 'completed',
    createdAt: '2026-09-20T10:00:00.000Z',
    ...overrides,
  };
}

describe('doc ids', () => {
  it('builds a bank submission id when there is no assignment', () => {
    expect(submissionId('u1', 'ex1')).toBe('u1__bank__ex1');
    expect(submissionId('u1', 'ex1', null)).toBe('u1__bank__ex1');
  });

  it('builds an assignment-scoped submission id', () => {
    expect(submissionId('u1', 'ex1', 'as9')).toBe('u1__as9__ex1');
  });

  it('builds a stage clear id', () => {
    expect(stageClearId('u1', 'st3')).toBe('u1__st3');
  });

  it('refuses parts that would break the path', () => {
    expect(() => submissionId('u1', 'ex/1')).toThrow('ห้ามมีเครื่องหมาย / ในรหัสเอกสาร');
    expect(() => stageClearId('', 'st3')).toThrow('รหัสเอกสารห้ามว่าง');
  });
});

describe('submissions schema', () => {
  it('accepts a completed auto-graded submission', () => {
    expect(validate('submissions', submission())).toEqual({ ok: true, errors: [] });
  });

  it('rejects more than three stars', () => {
    expect(validate('submissions', submission({ bestStars: 4 })).errors).toContainEqual({
      field: 'bestStars',
      message: 'ต้องอยู่ระหว่าง 0 ถึง 3',
    });
  });

  it('requires grading metadata when status is graded', () => {
    const result = validate('submissions', submission({ status: 'graded' }));
    expect(result.errors).toContainEqual({ field: 'gradedBy', message: 'ต้องระบุผู้ตรวจเมื่อสถานะเป็น graded' });
    expect(result.errors).toContainEqual({ field: 'gradedAt', message: 'ต้องระบุเวลาที่ตรวจเมื่อสถานะเป็น graded' });
  });

  it('rejects a wrongCount larger than attemptCount', () => {
    const result = validate('submissions', submission({ attemptCount: 1, wrongCount: 2 }));
    expect(result.errors).toContainEqual({
      field: 'wrongCount',
      message: 'จำนวนครั้งที่ตอบผิดมากกว่าจำนวนครั้งที่ตอบทั้งหมดไม่ได้',
    });
  });
});

describe('assignments schema', () => {
  const assignment = {
    createdBy: 'admin-uid',
    title: 'การบ้านสัปดาห์ที่ 1',
    exerciseIds: ['ex1', 'ex2'],
    assignedTo: ['u1', 'u2'],
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
  };

  it('accepts a valid assignment', () => {
    expect(validate('assignments', assignment)).toEqual({ ok: true, errors: [] });
  });

  it('rejects an assignment with nobody assigned', () => {
    expect(validate('assignments', { ...assignment, assignedTo: [] }).errors).toContainEqual({
      field: 'assignedTo',
      message: 'ต้องมีอย่างน้อย 1 รายการ',
    });
  });
});

describe('stageClears schema', () => {
  it('accepts a valid stage clear', () => {
    const clear = {
      uid: 'u1',
      stageId: 'st1',
      skill: 'grammar',
      level: 'A1',
      order: 1,
      score: 0.8,
      clearedAt: '2026-09-20T10:00:00.000Z',
    };
    expect(validate('stageClears', clear)).toEqual({ ok: true, errors: [] });
  });
});
