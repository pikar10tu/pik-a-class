import { describe, it, expect } from 'vitest';
import { formatCheckReport, formatCoverage } from './report-format.js';

describe('formatCheckReport', () => {
  it('summarises how many items passed and failed', () => {
    const text = formatCheckReport({
      valid: [{ index: 0 }],
      invalid: [{ index: 1, errors: [{ field: 'answerKey', message: 'MCQ ต้องมีคำตอบถูกข้อเดียว' }] }],
    });

    expect(text).toContain('ผ่าน 1 ข้อ / ไม่ผ่าน 1 ข้อ');
    expect(text).toContain('ข้อที่ 2');
    expect(text).toContain('answerKey: MCQ ต้องมีคำตอบถูกข้อเดียว');
  });

  it('says everything passed when there are no errors', () => {
    expect(formatCheckReport({ valid: [{ index: 0 }], invalid: [] })).toContain('ผ่านทั้งหมด');
  });
});

describe('formatCoverage', () => {
  it('lists counts per tag and flags tags with no items', () => {
    const text = formatCoverage([
      {
        level: 'A1',
        total: 2,
        byTag: [{ id: 'grammar:present-simple', label: 'Present Simple (be/do)', count: 2 }],
        missingTagIds: ['grammar:there-is-are'],
      },
      { level: 'A2', total: 0, byTag: [], missingTagIds: ['grammar:past-simple'] },
    ]);

    expect(text).toContain('A1 — 2 ข้อ');
    expect(text).toContain('Present Simple (be/do): 2');
    expect(text).toContain('ยังไม่มีข้อเลย: grammar:there-is-are');
    expect(text).toContain('A2 — 0 ข้อ');
  });
});
