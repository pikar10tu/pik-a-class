import { describe, it, expect } from 'vitest';
import {
  bankExerciseConstraints,
  assignedExerciseConstraints,
  myAssignmentConstraints,
  myHistoryConstraints,
  gradingQueueConstraints,
  studentListConstraints,
  contentLibraryConstraints,
  stageConstraints,
  stagePoolConstraints,
  myClearConstraints,
  readTier,
} from './queries.js';

describe('query constraints', () => {
  it('asks only for published bank exercises of one skill and level', () => {
    expect(bankExerciseConstraints({ skill: 'grammar', level: 'A1', tier: 'full' })).toEqual([
      ['reviewStatus', '==', 'published'],
      ['visibility', '==', 'bank'],
      ['skill', '==', 'grammar'],
      ['level', '==', 'A1'],
    ]);
  });

  it('adds the preview filter for free users on A2+ so the rules can allow the query', () => {
    expect(bankExerciseConstraints({ skill: 'grammar', level: 'A2', tier: 'free' })).toContainEqual([
      'isPreview',
      '==',
      true,
    ]);
  });

  it('allows all bank exercises for A1 even on free tier', () => {
    expect(bankExerciseConstraints({ skill: 'grammar', level: 'A1', tier: 'free' }).some(([f]) => f === 'isPreview')).toBe(false);
  });

  it('builds the remaining documented queries', () => {
    expect(assignedExerciseConstraints('u1')).toEqual([['assignedUids', 'array-contains', 'u1']]);
    expect(myAssignmentConstraints('u1')).toEqual([['assignedTo', 'array-contains', 'u1']]);
    expect(myHistoryConstraints('u1')).toEqual([['uid', '==', 'u1']]);
    expect(gradingQueueConstraints()).toEqual([['status', '==', 'pending']]);
    expect(studentListConstraints()).toEqual([['role', '==', 'student']]);
  });

  it('filters the admin content library only by the fields that were given', () => {
    expect(contentLibraryConstraints({ reviewStatus: 'draft' })).toEqual([['reviewStatus', '==', 'draft']]);
    expect(contentLibraryConstraints({ reviewStatus: 'draft', skill: 'vocab', level: 'B1' })).toEqual([
      ['reviewStatus', '==', 'draft'],
      ['skill', '==', 'vocab'],
      ['level', '==', 'B1'],
    ]);
    expect(contentLibraryConstraints({})).toEqual([]);
  });
});

describe('stageConstraints', () => {
  it('asks only for published stages of one skill and level', () => {
    expect(stageConstraints({ skill: 'grammar', level: 'A2', tier: 'full' })).toEqual([
      ['reviewStatus', '==', 'published'],
      ['skill', '==', 'grammar'],
      ['level', '==', 'A2'],
    ]);
  });

  it('adds the preview filter for free users so the rules can evaluate the list query', () => {
    expect(stageConstraints({ tier: 'free' })).toEqual([
      ['reviewStatus', '==', 'published'],
      ['isPreview', '==', true],
    ]);
    expect(stageConstraints({ skill: 'grammar', level: 'A2', tier: 'free' })).toEqual([
      ['reviewStatus', '==', 'published'],
      ['isPreview', '==', true],
      ['skill', '==', 'grammar'],
      ['level', '==', 'A2'],
    ]);
  });

  it('leaves the preview filter out for full-tier users', () => {
    expect(stageConstraints({ tier: 'full' })).toEqual([['reviewStatus', '==', 'published']]);
  });

  it('treats a missing tier as free, exactly like bankExerciseConstraints does', () => {
    const stageTiers = stageConstraints({});
    expect(stageTiers).toContainEqual(['isPreview', '==', true]);
    expect(bankExerciseConstraints({ skill: 'grammar', level: 'A2' })).toContainEqual([
      'isPreview',
      '==',
      true,
    ]);
  });

  it('has no admin special case — like bankExerciseConstraints only tier decides', () => {
    // แอดมินถูกแปลงเป็น tier "full" ที่ฝั่งหน้าเว็บด้วย readTier() ก่อนเรียกตรงนี้
    expect(stageConstraints({ tier: readTier({ role: 'admin', tier: 'free' }) })).toEqual(
      stageConstraints({ tier: 'full' }),
    );
    expect(bankExerciseConstraints({ skill: 'grammar', level: 'A2', tier: readTier({ role: 'admin', tier: 'free' }) })).toEqual(
      bankExerciseConstraints({ skill: 'grammar', level: 'A2', tier: 'full' }),
    );
  });

  it('lets an admin ask for drafts too, with no preview filter in the way', () => {
    expect(stageConstraints({ publishedOnly: false })).toEqual([]);
    expect(stageConstraints({ publishedOnly: false, skill: 'vocab' })).toEqual([
      ['skill', '==', 'vocab'],
    ]);
  });
});

describe('stagePoolConstraints', () => {
  const base = { skill: 'grammar', level: 'A2', tags: ['grammar:past-simple'] };

  it('กรองตามสถานะ คลัง สกิล ระดับ และแท็ก', () => {
    expect(stagePoolConstraints({ ...base, tier: 'full' })).toEqual([
      ['reviewStatus', '==', 'published'],
      ['visibility', '==', 'bank'],
      ['skill', '==', 'grammar'],
      ['level', '==', 'A2'],
      ['tags', 'array-contains-any', ['grammar:past-simple']],
    ]);
  });

  it('เด็ก tier free ต้องถูกจำกัดเฉพาะข้อ preview', () => {
    const constraints = stagePoolConstraints({ ...base, tier: 'free' });
    expect(constraints).toContainEqual(['isPreview', '==', true]);
  });

  it('tier full ไม่ต้องมีเงื่อนไข isPreview', () => {
    const constraints = stagePoolConstraints({ ...base, tier: 'full' });
    expect(constraints.some(([field]) => field === 'isPreview')).toBe(false);
  });

  it('รับหลายแท็กสำหรับด่านทบทวนรวม', () => {
    const tags = ['grammar:past-simple', 'grammar:present-perfect'];
    expect(stagePoolConstraints({ ...base, tags, tier: 'full' })).toContainEqual([
      'tags',
      'array-contains-any',
      tags,
    ]);
  });
});

describe('readTier', () => {
  it('reads an admin as full tier because the rules short-circuit on isAdmin()', () => {
    expect(readTier({ role: 'admin', tier: 'free' })).toBe('full');
  });

  it('keeps a student on their own tier', () => {
    expect(readTier({ role: 'student', tier: 'full' })).toBe('full');
    expect(readTier({ role: 'student', tier: 'free' })).toBe('free');
  });

  it('falls back to free when the user doc or tier is missing', () => {
    expect(readTier(null)).toBe('free');
    expect(readTier(undefined)).toBe('free');
    expect(readTier({ role: 'student' })).toBe('free');
  });
});

describe('myClearConstraints', () => {
  it('filters clears down to one student', () => {
    expect(myClearConstraints('student1')).toEqual([['uid', '==', 'student1']]);
  });
});
