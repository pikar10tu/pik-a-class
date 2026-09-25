import { describe, it, expect } from 'vitest';
import { normalizeContent, contentHash, checkBatch, coverageReport } from './content-checks.js';

function mcq(overrides = {}) {
  return {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She ___ to school every day.',
    choices: ['go', 'goes', 'going'],
    answerKey: ['goes'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'draft',
    assignedUids: [],
    contentHash: 'placeholder',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin-uid',
    ...overrides,
  };
}

describe('normalizeContent', () => {
  it('ignores case, extra spaces, and punctuation', () => {
    expect(normalizeContent('  She   ___ to SCHOOL, every day!  ')).toBe('she ___ to school every day');
  });
});

describe('contentHash', () => {
  it('is stable for the same content and differs for different content', () => {
    expect(contentHash(mcq())).toBe(contentHash(mcq({ prompt: 'she ___ TO   school every day!' })));
    expect(contentHash(mcq())).not.toBe(contentHash(mcq({ prompt: 'He ___ to work every day.' })));
  });

  it('takes choices into account, ignoring their order', () => {
    expect(contentHash(mcq())).toBe(contentHash(mcq({ choices: ['going', 'goes', 'go'] })));
    expect(contentHash(mcq())).not.toBe(contentHash(mcq({ choices: ['go', 'goes', 'gone'] })));
  });

  it('returns a 16-character hex string', () => {
    expect(contentHash(mcq())).toMatch(/^[0-9a-f]{16}$/);
  });
});

describe('checkBatch', () => {
  it('separates valid items from invalid ones and reports why', () => {
    const result = checkBatch('exercises', [mcq(), mcq({ prompt: 'He ___ tea.', answerKey: ['drinks'] })], new Set());
    expect(result.valid).toHaveLength(1);
    expect(result.invalid[0].index).toBe(1);
    expect(result.invalid[0].errors).toContainEqual({
      field: 'answerKey',
      message: 'คำตอบ "drinks" ไม่มีอยู่ในตัวเลือก',
    });
  });

  it('fills in contentHash on valid items', () => {
    const result = checkBatch('exercises', [mcq()], new Set());
    expect(result.valid[0].item.contentHash).toBe(contentHash(mcq()));
  });

  it('rejects an item whose hash already exists in the bank', () => {
    const result = checkBatch('exercises', [mcq()], new Set([contentHash(mcq())]));
    expect(result.valid).toHaveLength(0);
    expect(result.invalid[0].errors).toContainEqual({
      field: 'prompt',
      message: 'ข้อนี้ซ้ำกับข้อที่มีอยู่แล้วในคลัง',
    });
  });

  it('rejects an item that repeats another item inside the same batch', () => {
    const result = checkBatch('exercises', [mcq(), mcq()], new Set());
    expect(result.valid).toHaveLength(1);
    expect(result.invalid[0].errors).toContainEqual({
      field: 'prompt',
      message: 'ข้อนี้ซ้ำกับข้ออื่นในไฟล์เดียวกัน',
    });
  });
});

describe('coverageReport', () => {
  it('counts items per tag and lists tags with no items at that level', () => {
    const report = coverageReport([mcq(), mcq({ prompt: 'He ___ tea.', answerKey: ['goes'] })]);
    const a1 = report.find((row) => row.level === 'A1');

    expect(a1.total).toBe(2);
    expect(a1.byTag).toContainEqual({ id: 'grammar:present-simple', label: 'Present Simple (be/do)', count: 2 });
    expect(a1.missingTagIds).toContain('grammar:there-is-are');
    expect(a1.missingTagIds).not.toContain('grammar:present-simple');

    const c1 = report.find((row) => row.level === 'C1');
    expect(c1.total).toBe(0);
  });
});

describe('checkBatch document ids', () => {
  it('accepts an id as the document id without treating it as a field', () => {
    const { valid, invalid } = checkBatch('exercises', [mcq({ id: 'ex_a1_be_001' })]);
    expect(invalid).toEqual([]);
    expect(valid[0].item.id).toBe('ex_a1_be_001');
  });

  it('rejects ids that Firestore cannot use as a document id', () => {
    const { invalid } = checkBatch('exercises', [mcq({ id: 'bad/id' })]);
    expect(invalid[0].errors.map((e) => e.field)).toContain('id');
  });
});
