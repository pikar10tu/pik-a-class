import { describe, it, expect } from 'vitest';
import { prepareItems, chunk } from './import-prep.js';

const now = '2026-09-20T12:00:00.000Z';

describe('prepareItems', () => {
  it('fills the fields an author should not have to type', () => {
    const [item] = prepareItems([{ prompt: 'x' }], { createdBy: 'admin1', batchId: 'batch-1', now });

    expect(item).toMatchObject({
      prompt: 'x',
      createdAt: now,
      updatedAt: now,
      createdBy: 'admin1',
      reviewStatus: 'draft',
      isPreview: false,
      visibility: 'bank',
      assignedUids: [],
      importBatchId: 'batch-1',
    });
  });

  it('keeps values the author did provide', () => {
    const [item] = prepareItems([{ prompt: 'x', isPreview: true, reviewStatus: 'reviewed' }], {
      createdBy: 'admin1',
      batchId: 'batch-1',
      now,
    });

    expect(item.isPreview).toBe(true);
    expect(item.reviewStatus).toBe('reviewed');
  });

  it('always stamps the batch id, even if the file had one', () => {
    const [item] = prepareItems([{ prompt: 'x', importBatchId: 'old' }], {
      createdBy: 'admin1',
      batchId: 'batch-2',
      now,
    });
    expect(item.importBatchId).toBe('batch-2');
  });

  it('does not add exercise-only defaults to grammar notes', () => {
    const [item] = prepareItems([{ topic: 'Present Perfect' }], {
      createdBy: 'admin1',
      batchId: 'b',
      now,
      collectionName: 'grammarNotes',
    });
    expect(item.visibility).toBeUndefined();
    expect(item.assignedUids).toBeUndefined();
    expect(item.reviewStatus).toBe('draft');
  });
});

describe('chunk', () => {
  it('splits an array into pieces of at most the given size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5],
    ]);
    expect(chunk([], 400)).toEqual([]);
  });
});
