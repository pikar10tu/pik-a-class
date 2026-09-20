import { describe, it, expect } from 'vitest';
import {
  bankExerciseConstraints,
  assignedExerciseConstraints,
  myAssignmentConstraints,
  myHistoryConstraints,
  gradingQueueConstraints,
  studentListConstraints,
  contentLibraryConstraints,
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

  it('adds the preview filter for free users so the rules can allow the query', () => {
    expect(bankExerciseConstraints({ skill: 'grammar', level: 'A1', tier: 'free' })).toContainEqual([
      'isPreview',
      '==',
      true,
    ]);
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
