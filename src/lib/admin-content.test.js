import { describe, it, expect } from 'vitest';
import { buildContentUpdate, previewLines } from './admin-content.js';
import { contentHash } from './schema/content-checks.js';

function item(overrides = {}) {
  return {
    id: 'ex1',
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She ___ to school.',
    choices: ['go', 'goes'],
    answerKey: ['goes'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'draft',
    assignedUids: [],
    contentHash: 'old-hash',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin1',
    ...overrides,
  };
}

describe('buildContentUpdate', () => {
  it('accepts a valid edit and recomputes the content hash', () => {
    const result = buildContentUpdate(item(), {
      prompt: 'He ___ to school.',
      choices: 'go, goes',
      answerKey: 'goes',
      tags: 'grammar:present-simple',
      isPreview: true,
    });

    expect(result.ok).toBe(true);
    expect(result.update.prompt).toBe('He ___ to school.');
    expect(result.update.choices).toEqual(['go', 'goes']);
    expect(result.update.isPreview).toBe(true);
    expect(result.update.contentHash).toBe(contentHash({ prompt: 'He ___ to school.', choices: ['go', 'goes'] }));
    expect(result.update.contentHash).not.toBe('old-hash');
  });

  it('reports validation errors instead of producing an update', () => {
    const result = buildContentUpdate(item(), {
      prompt: 'He ___ to school.',
      choices: 'go, goes',
      answerKey: 'went',
      tags: 'grammar:present-simple',
      isPreview: false,
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({ field: 'answerKey', message: 'คำตอบ "went" ไม่มีอยู่ในตัวเลือก' });
    expect(result.update).toBeNull();
  });

  it('rejects a tag that is above the level', () => {
    const result = buildContentUpdate(item(), {
      prompt: 'She ___ to school.',
      choices: 'go, goes',
      answerKey: 'goes',
      tags: 'grammar:past-perfect',
      isPreview: false,
    });
    expect(result.ok).toBe(false);
    expect(result.errors[0].field).toBe('tags');
  });
});

describe('previewLines', () => {
  it('shows what the student would see plus the answer key', () => {
    expect(previewLines(item())).toEqual([
      'โจทย์: She ___ to school.',
      'ตัวเลือก: go / goes',
      'เฉลย: goes',
    ]);
  });

  it('shows the rubric for written answers', () => {
    const written = item({ type: 'paragraph', choices: undefined, answerKey: undefined, rubric: 'เกณฑ์ให้ดาว' });
    expect(previewLines(written)).toEqual(['โจทย์: She ___ to school.', 'เกณฑ์ให้คะแนน: เกณฑ์ให้ดาว']);
  });
});
