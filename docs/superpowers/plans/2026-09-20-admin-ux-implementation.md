# Admin Usability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ทำให้ปิ๊กสร้าง/แก้/ทิ้งโจทย์ได้จากในเว็บโดยไม่ต้องจำรูปแบบข้อมูล ไม่ต้องพิมพ์ JSON และไม่ต้องพิมพ์ tag เอง

**Architecture:** ตรรกะฟอร์มทั้งหมดอยู่ใน `src/lib/exercise-form.js` เป็นฟังก์ชันล้วน (ไม่แตะ DOM/Firebase) ที่แปลงสถานะฟอร์ม ↔ เอกสาร Firestore แล้วส่งเข้า `validate()` ตัวเดิม หน้าเว็บเป็นเปลือกบางๆ ที่ผูก DOM เข้ากับฟังก์ชันพวกนั้น — หน้าคลังเนื้อหาเหลือแค่รายการ ส่วนฟอร์มย้ายไปหน้าใหม่

**Tech Stack:** Vanilla JS + Vite (multi-page), Firebase v10 Web SDK, vitest (+ jsdom), `@firebase/rules-unit-testing` + emulator

**Spec:** `docs/superpowers/specs/2026-09-20-admin-ux-design.md` — อ่านก่อนเริ่ม

## Global Constraints

- **ภาษาใน UI และข้อความ error เป็นภาษาไทย** (โค้ด/commit เป็นอังกฤษ)
- **ห้ามตั้งสี/ฟอนต์/visual direction ใหม่** — ใช้ token ที่มีใน `src/styles/tokens.css` เท่านั้น ปิ๊กเลือกพักเรื่องดีไซน์ไว้
- **`src/lib/exercise-form.js` ห้าม import อะไรจาก `firebase/*` และห้ามแตะ `document`** — เพื่อให้ unit test รันเร็วโดยไม่ต้องมี jsdom
- **ชนิดโจทย์ที่ฟอร์มรองรับรอบนี้: `mcq`, `fill_blank`, `short_answer`, `paragraph`** เท่านั้น (ไม่มี `matching`, `shadowing`)
- **ทุกหน้า HTML ต้องมี** `<meta name="viewport" content="width=device-width, initial-scale=1" />` + link `../styles/tokens.css` และ `../styles/base.css`
- **redirect/ลิงก์ต้องใช้ `import.meta.env.BASE_URL`** (deploy ใต้ subpath `/pik-a-class/`)
- **หน้า admin ทุกหน้าอยู่หลัง `requireAdmin()`**
- **commit ทุกครั้งที่จบ task** ขึ้นต้นด้วย `feat:` / `test:` / `fix:` / `docs:` / `ci:`

## File Structure

**สร้างใหม่:**
- `src/lib/exercise-form.js` — ตรรกะฟอร์มล้วน (state ↔ doc, สลับชนิด, กรอง tag ตามเลเวล, พรีวิว)
- `src/lib/exercise-form.test.js`
- `src/admin/exercise.html` + `src/admin/exercise.js` — หน้าฟอร์ม (สร้างใหม่/แก้ไข)

**แก้ของเดิม:**
- `src/lib/schema/exercises.js` — เพิ่มฟิลด์ `deletedAt`
- `firestore.rules` — เพิ่ม `deletedAt` เข้า allowlist ของ `exercises`
- `tests/rules/content.test.js` — เพิ่มเคสถังขยะ
- `src/lib/admin-content-io.js` — เพิ่ม `fetchExercise`, `createExercise`, `trashExercise`, `restoreExercise`, `deleteExercise`, `fetchTrashedExercises`
- `src/lib/admin-content.js` + `.test.js` — ย้าย `previewLines()` ไป `exercise-form.js`, ลบ `buildContentUpdate()` ที่ถูกแทนแล้ว
- `src/admin/content.html` + `content.js` — เหลือรายการ + ถังขยะ
- `vite.config.js` — เพิ่ม entry `adminExercise`
- `src/styles/base.css` — คลาสของรายการ/ฟอร์ม (token เดิม)

---

### Task 1: ฟิลด์ `deletedAt` ใน schema + rules + rules test

**Files:**
- Modify: `src/lib/schema/exercises.js`, `firestore.rules`, `tests/rules/content.test.js`
- Modify: `src/lib/schema/content-schemas.test.js`

**Interfaces:**
- Consumes: schema/rules ที่มีอยู่จาก sub-project 2
- Produces: `exercises` รับฟิลด์ `deletedAt` (ISO date, optional) ได้ทั้งฝั่ง validator และฝั่ง rules

- [ ] **Step 1: Write the failing test**

เพิ่มใน `src/lib/schema/content-schemas.test.js` ท้าย `describe('exercises schema', ...)`:

```js
  it('accepts an optional deletedAt timestamp', () => {
    expect(validate('exercises', mcq({ deletedAt: '2026-09-21T10:00:00.000Z' }))).toEqual({
      ok: true,
      errors: [],
    });
    expect(validate('exercises', mcq({ deletedAt: 'เมื่อวาน' })).errors).toContainEqual({
      field: 'deletedAt',
      message: 'ต้องเป็นวันที่รูปแบบ ISO (เช่น 2026-09-20T10:00:00.000Z)',
    });
  });
```

เพิ่มใน `tests/rules/content.test.js` ท้าย `describe('exercises rules', ...)`:

```js
  it('lets an admin move an exercise to the trash but keeps students out of it', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        ...baseWorld,
        'exercises/trashed1': exercise({
          reviewStatus: 'draft',
          deletedAt: '2026-09-21T10:00:00.000Z',
          contentHash: 'h-trashed',
        }),
      });

      await assertSucceeds(
        authedDb(env, 'admin1')
          .collection('exercises')
          .doc('preview1')
          .update({ deletedAt: '2026-09-21T10:00:00.000Z', reviewStatus: 'draft' }),
      );
      await assertSucceeds(authedDb(env, 'admin1').collection('exercises').doc('trashed1').get());
      await assertFails(authedDb(env, 'paid1').collection('exercises').doc('trashed1').get());
      await assertFails(
        authedDb(env, 'student1')
          .collection('exercises')
          .doc('preview1')
          .update({ deletedAt: '2026-09-21T10:00:00.000Z' }),
      );
    });
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/schema/content-schemas.test.js`
Expected: FAIL — `deletedAt: ฟิลด์นี้ไม่มีใน schema`

Run: `npm run test:rules`
Expected: FAIL — admin เขียน `deletedAt` ไม่ผ่าน allowlist

- [ ] **Step 3: Write minimal implementation**

ใน `src/lib/schema/exercises.js` เพิ่มบรรทัดนี้ใน `fields` (วางต่อจาก `importBatchId`):

```js
    deletedAt: isoDate({ required: false }),
```

ใน `firestore.rules` แก้ `exerciseFields()` ให้มี `'deletedAt'` ต่อท้าย:

```
        return ['skill', 'level', 'type', 'prompt', 'choices', 'answerKey', 'rubric', 'tags',
                'visibility', 'isPreview', 'reviewStatus', 'assignedUids', 'source', 'sourceUrl',
                'reviewNotes', 'contentHash', 'importBatchId', 'deletedAt',
                'createdAt', 'updatedAt', 'createdBy'];
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/schema/content-schemas.test.js` → PASS (13 tests)
Run: `npm run test:rules` → PASS (26 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema/exercises.js src/lib/schema/content-schemas.test.js firestore.rules tests/rules/content.test.js
git commit -m "feat: allow a deletedAt timestamp on exercises for the trash flow"
```

---

### Task 2: ตรรกะฟอร์ม (`exercise-form.js`)

**Files:**
- Create: `src/lib/exercise-form.js`, `src/lib/exercise-form.test.js`

**Interfaces:**
- Consumes: `validate` (`./schema/validate.js`), `contentHash` (`./schema/content-checks.js`), `TAGS`, `LEVELS`, `levelRank` (`./schema/taxonomy.js`), `EXERCISE_TYPES` (`./schema/exercises.js`)
- Produces:
  - `FORM_TYPES` = `['mcq','fill_blank','short_answer','paragraph']`
  - `TYPE_LABELS` — map ชนิด → ชื่อไทย
  - `emptyFormState(overrides)` → state object
  - `formStateFromExercise(doc)` → state object
  - `changeType(state, nextType)` → state ใหม่ (ล้างฟิลด์ที่ไม่เกี่ยว)
  - `changeLevel(state, nextLevel)` → `{ state, droppedTags: string[] }`
  - `availableTags(level)` → `Array<{ id, label, level, skill }>`
  - `buildExerciseDoc(state, { existing, adminUid, now })` → `{ ok, errors, doc }`
  - `previewLines(docOrState)` → `string[]` (ย้ายมาจาก `admin-content.js`)

**สัญญาของ state object:**

```js
{
  skill: 'grammar', level: 'A1', type: 'mcq',
  prompt: '',
  choices: ['', ''],      // mcq เท่านั้น
  correctIndex: 0,        // mcq เท่านั้น — ชี้ไปที่ choices
  answers: [''],          // fill_blank เท่านั้น — คำตอบที่รับได้
  rubric: '',             // short_answer/paragraph เท่านั้น
  tags: [], isPreview: false, visibility: 'bank', reviewStatus: 'draft',
}
```

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/exercise-form.test.js`:

```js
import { describe, it, expect } from 'vitest';
import {
  FORM_TYPES,
  emptyFormState,
  formStateFromExercise,
  changeType,
  changeLevel,
  availableTags,
  buildExerciseDoc,
  previewLines,
} from './exercise-form.js';
import { contentHash } from './schema/content-checks.js';

const now = '2026-09-21T10:00:00.000Z';

function mcqState(overrides = {}) {
  return emptyFormState({
    prompt: 'She ___ to school.',
    choices: ['go', 'goes'],
    correctIndex: 1,
    tags: ['grammar:present-simple'],
    ...overrides,
  });
}

describe('emptyFormState', () => {
  it('starts as a blank A1 grammar MCQ with two empty choices', () => {
    const state = emptyFormState();
    expect(state).toMatchObject({ skill: 'grammar', level: 'A1', type: 'mcq', reviewStatus: 'draft' });
    expect(state.choices).toEqual(['', '']);
    expect(state.correctIndex).toBe(0);
    expect(state.tags).toEqual([]);
  });

  it('only offers the four supported types', () => {
    expect(FORM_TYPES).toEqual(['mcq', 'fill_blank', 'short_answer', 'paragraph']);
  });
});

describe('buildExerciseDoc', () => {
  it('turns MCQ form state into a valid document with the answer taken from the choices', () => {
    const { ok, errors, doc } = buildExerciseDoc(mcqState(), { adminUid: 'admin1', now });

    expect(errors).toEqual([]);
    expect(ok).toBe(true);
    expect(doc.answerKey).toEqual(['goes']);
    expect(doc.choices).toEqual(['go', 'goes']);
    expect(doc.rubric).toBeUndefined();
    expect(doc.createdBy).toBe('admin1');
    expect(doc.createdAt).toBe(now);
    expect(doc.reviewStatus).toBe('draft');
    expect(doc.assignedUids).toEqual([]);
    expect(doc.contentHash).toBe(contentHash({ prompt: 'She ___ to school.', choices: ['go', 'goes'] }));
  });

  it('drops blank choices and keeps the right answer pointing at the same text', () => {
    const state = mcqState({ choices: ['go', 'goes', '  ', ''], correctIndex: 1 });
    const { doc } = buildExerciseDoc(state, { adminUid: 'admin1', now });
    expect(doc.choices).toEqual(['go', 'goes']);
    expect(doc.answerKey).toEqual(['goes']);
  });

  it('reports a validation error instead of a document when the form is incomplete', () => {
    const { ok, errors, doc } = buildExerciseDoc(mcqState({ prompt: '' }), { adminUid: 'admin1', now });
    expect(ok).toBe(false);
    expect(doc).toBeNull();
    expect(errors).toContainEqual({ field: 'prompt', message: 'ห้ามเว้นว่าง' });
  });

  it('builds a fill_blank document from the accepted-answers list', () => {
    const state = emptyFormState({
      type: 'fill_blank',
      prompt: 'I ___ to work by bus.',
      answers: ['go', 'travel', ''],
      tags: ['grammar:present-simple'],
    });
    const { ok, doc } = buildExerciseDoc(state, { adminUid: 'admin1', now });

    expect(ok).toBe(true);
    expect(doc.answerKey).toEqual(['go', 'travel']);
    expect(doc.choices).toBeUndefined();
  });

  it('builds a written-answer document with only a rubric', () => {
    const state = emptyFormState({
      type: 'paragraph',
      level: 'A2',
      prompt: 'เขียนเล่าวันหยุดที่ผ่านมา',
      rubric: 'ให้ 3 ดาวเมื่อใช้ Past Simple ถูกเกือบทั้งหมด',
      tags: ['grammar:past-simple'],
    });
    const { ok, doc } = buildExerciseDoc(state, { adminUid: 'admin1', now });

    expect(ok).toBe(true);
    expect(doc.rubric).toBe('ให้ 3 ดาวเมื่อใช้ Past Simple ถูกเกือบทั้งหมด');
    expect(doc.choices).toBeUndefined();
    expect(doc.answerKey).toBeUndefined();
  });

  it('keeps createdAt and createdBy of an existing document when editing', () => {
    const existing = {
      createdAt: '2026-09-01T00:00:00.000Z',
      createdBy: 'someone-else',
      importBatchId: 'batch-9',
      assignedUids: ['student1'],
    };
    const { doc } = buildExerciseDoc(mcqState(), { existing, adminUid: 'admin1', now });

    expect(doc.createdAt).toBe('2026-09-01T00:00:00.000Z');
    expect(doc.createdBy).toBe('someone-else');
    expect(doc.importBatchId).toBe('batch-9');
    expect(doc.assignedUids).toEqual(['student1']);
    expect(doc.updatedAt).toBe(now);
  });
});

describe('formStateFromExercise', () => {
  it('round-trips an MCQ document back into form state', () => {
    const { doc } = buildExerciseDoc(mcqState(), { adminUid: 'admin1', now });
    const state = formStateFromExercise(doc);

    expect(state.type).toBe('mcq');
    expect(state.choices).toEqual(['go', 'goes']);
    expect(state.correctIndex).toBe(1);
    expect(state.tags).toEqual(['grammar:present-simple']);
  });

  it('round-trips a fill_blank document into the answers list', () => {
    const state = formStateFromExercise({
      skill: 'grammar',
      level: 'A1',
      type: 'fill_blank',
      prompt: 'I ___ tea.',
      answerKey: ['drink', 'like'],
      tags: ['grammar:present-simple'],
      isPreview: false,
      visibility: 'bank',
      reviewStatus: 'published',
    });

    expect(state.answers).toEqual(['drink', 'like']);
    expect(state.reviewStatus).toBe('published');
  });
});

describe('changeType', () => {
  it('clears choices and the answer when moving from MCQ to a written answer', () => {
    const next = changeType(mcqState(), 'paragraph');
    expect(next.type).toBe('paragraph');
    expect(next.choices).toEqual([]);
    expect(next.answers).toEqual([]);
  });

  it('gives MCQ two blank choices when coming from another type', () => {
    const written = emptyFormState({ type: 'paragraph', rubric: 'เกณฑ์' });
    const next = changeType(written, 'mcq');
    expect(next.choices).toEqual(['', '']);
    expect(next.correctIndex).toBe(0);
    expect(next.rubric).toBe('');
  });

  it('keeps the prompt, tags, level, and skill across a type change', () => {
    const next = changeType(mcqState({ level: 'B1' }), 'fill_blank');
    expect(next.prompt).toBe('She ___ to school.');
    expect(next.tags).toEqual(['grammar:present-simple']);
    expect(next.level).toBe('B1');
    expect(next.skill).toBe('grammar');
  });
});

describe('changeLevel and availableTags', () => {
  it('offers only tags at or below the chosen level', () => {
    const ids = availableTags('A1').map((tag) => tag.id);
    expect(ids).toContain('grammar:present-simple');
    expect(ids).not.toContain('grammar:past-perfect');
    expect(availableTags('B1').map((tag) => tag.id)).toContain('grammar:past-perfect');
  });

  it('drops tags that are now too advanced when the level goes down, and says which', () => {
    const state = emptyFormState({ level: 'B1', tags: ['grammar:present-simple', 'grammar:past-perfect'] });
    const result = changeLevel(state, 'A1');

    expect(result.state.level).toBe('A1');
    expect(result.state.tags).toEqual(['grammar:present-simple']);
    expect(result.droppedTags).toEqual(['grammar:past-perfect']);
  });

  it('keeps every tag when the level goes up', () => {
    const state = emptyFormState({ level: 'A1', tags: ['grammar:present-simple'] });
    const result = changeLevel(state, 'B2');
    expect(result.droppedTags).toEqual([]);
    expect(result.state.tags).toEqual(['grammar:present-simple']);
  });
});

describe('previewLines', () => {
  it('shows the student-facing view of the current form state', () => {
    expect(previewLines(mcqState())).toEqual([
      'โจทย์: She ___ to school.',
      'ตัวเลือก: go / goes',
      'เฉลย: goes',
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/exercise-form.test.js`
Expected: FAIL — `Failed to resolve import "./exercise-form.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/exercise-form.js`:

```js
import { validate } from './schema/validate.js';
import { contentHash } from './schema/content-checks.js';
import { TAGS, levelRank } from './schema/taxonomy.js';

export const FORM_TYPES = ['mcq', 'fill_blank', 'short_answer', 'paragraph'];

export const TYPE_LABELS = {
  mcq: 'ปรนัย (เลือกตอบ)',
  fill_blank: 'เติมคำในช่องว่าง',
  short_answer: 'เขียนตอบสั้น',
  paragraph: 'เขียนตอบเป็นย่อหน้า',
};

const CLEAN = (value) => String(value ?? '').trim();
const nonEmpty = (list) => (list ?? []).map(CLEAN).filter((item) => item !== '');

export function emptyFormState(overrides = {}) {
  return {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '',
    choices: ['', ''],
    correctIndex: 0,
    answers: [''],
    rubric: '',
    tags: [],
    isPreview: false,
    visibility: 'bank',
    reviewStatus: 'draft',
    ...overrides,
  };
}

export function formStateFromExercise(doc) {
  const choices = doc.choices ?? [];
  const answerKey = doc.answerKey ?? [];
  return emptyFormState({
    skill: doc.skill,
    level: doc.level,
    type: doc.type,
    prompt: doc.prompt ?? '',
    choices: doc.type === 'mcq' ? [...choices] : [],
    correctIndex: doc.type === 'mcq' ? Math.max(0, choices.indexOf(answerKey[0])) : 0,
    answers: doc.type === 'fill_blank' ? [...answerKey] : [],
    rubric: doc.rubric ?? '',
    tags: [...(doc.tags ?? [])],
    isPreview: Boolean(doc.isPreview),
    visibility: doc.visibility ?? 'bank',
    reviewStatus: doc.reviewStatus ?? 'draft',
  });
}

export function changeType(state, nextType) {
  return {
    ...state,
    type: nextType,
    choices: nextType === 'mcq' ? ['', ''] : [],
    correctIndex: 0,
    answers: nextType === 'fill_blank' ? [''] : [],
    rubric: nextType === 'short_answer' || nextType === 'paragraph' ? state.rubric : '',
  };
}

export function availableTags(level) {
  return TAGS.filter((tag) => levelRank(tag.level) <= levelRank(level)).map((tag) => ({
    ...tag,
    skill: tag.id.split(':')[0],
  }));
}

export function changeLevel(state, nextLevel) {
  const allowed = new Set(availableTags(nextLevel).map((tag) => tag.id));
  const kept = state.tags.filter((id) => allowed.has(id));
  const droppedTags = state.tags.filter((id) => !allowed.has(id));
  return { state: { ...state, level: nextLevel, tags: kept }, droppedTags };
}

export function buildExerciseDoc(state, { existing = null, adminUid, now = new Date().toISOString() } = {}) {
  const doc = {
    skill: state.skill,
    level: state.level,
    type: state.type,
    prompt: CLEAN(state.prompt),
    tags: [...state.tags],
    visibility: state.visibility,
    isPreview: Boolean(state.isPreview),
    reviewStatus: state.reviewStatus,
    assignedUids: existing?.assignedUids ?? [],
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    createdBy: existing?.createdBy ?? adminUid,
  };

  if (existing?.importBatchId) doc.importBatchId = existing.importBatchId;
  if (existing?.source) doc.source = existing.source;
  if (existing?.sourceUrl) doc.sourceUrl = existing.sourceUrl;
  if (existing?.reviewNotes) doc.reviewNotes = existing.reviewNotes;

  if (state.type === 'mcq') {
    const chosenText = CLEAN(state.choices[state.correctIndex]);
    doc.choices = nonEmpty(state.choices);
    if (chosenText !== '') doc.answerKey = [chosenText];
  } else if (state.type === 'fill_blank') {
    doc.answerKey = nonEmpty(state.answers);
  } else {
    doc.rubric = CLEAN(state.rubric);
  }

  doc.contentHash = contentHash(doc);

  const { ok, errors } = validate('exercises', doc, 'create');
  if (!ok) return { ok: false, errors, doc: null };
  return { ok: true, errors: [], doc };
}

export function previewLines(item) {
  const type = item.type;
  const lines = [`โจทย์: ${CLEAN(item.prompt)}`];

  if (type === 'mcq') {
    const choices = nonEmpty(item.choices);
    if (choices.length) lines.push(`ตัวเลือก: ${choices.join(' / ')}`);
    const answer = item.answerKey?.[0] ?? CLEAN(item.choices?.[item.correctIndex]);
    if (answer) lines.push(`เฉลย: ${answer}`);
  } else if (type === 'fill_blank') {
    const answers = nonEmpty(item.answerKey ?? item.answers);
    if (answers.length) lines.push(`เฉลย: ${answers.join(' / ')}`);
  } else if (item.rubric) {
    lines.push(`เกณฑ์ให้คะแนน: ${CLEAN(item.rubric)}`);
  }

  return lines;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/exercise-form.test.js`
Expected: PASS (15 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/exercise-form.js src/lib/exercise-form.test.js
git commit -m "feat: add pure form logic for creating and editing exercises"
```

---

### Task 3: ฟังก์ชันอ่าน/เขียน Firestore ที่หน้าใหม่ต้องใช้

**Files:**
- Modify: `src/lib/admin-content-io.js`

**Interfaces:**
- Consumes: `db` ที่ถูกส่งเข้ามาเป็นพารามิเตอร์ (ไม่ import เอง), `collection`, `doc`, `getDoc`, `getDocs`, `setDoc`, `updateDoc`, `deleteDoc`, `query`, `where`, `orderBy`, `deleteField` จาก `firebase/firestore`
- Produces (เพิ่มจากของเดิม):
  - `fetchExercise(db, id)` → `Promise<{ id, ...data } | null>`
  - `createExercise(db, item)` → `Promise<string>` (คืน doc id ใหม่)
  - `saveExercise(db, id, item)` → `Promise<void>` (เขียนทับทั้งเอกสาร)
  - `trashExercise(db, id)` → `Promise<void>` (ตั้ง `deletedAt` + `reviewStatus: 'draft'`)
  - `restoreExercise(db, id)` → `Promise<void>` (ลบฟิลด์ `deletedAt` ทิ้ง)
  - `deleteExercise(db, id)` → `Promise<void>` (ลบถาวร)
  - `fetchTrashedExercises(db)` → `Promise<Array<{ id, ...data }>>`

- [ ] **Step 1: เพิ่มฟังก์ชัน**

แก้บรรทัด import บนสุดของ `src/lib/admin-content-io.js` เป็น:

```js
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
```

แล้วเพิ่มฟังก์ชันเหล่านี้ท้ายไฟล์:

```js
export async function fetchExercise(db, id) {
  const snap = await getDoc(doc(db, 'exercises', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createExercise(db, item) {
  const ref = doc(collection(db, 'exercises'));
  await setDoc(ref, item);
  return ref.id;
}

export async function saveExercise(db, id, item) {
  await setDoc(doc(db, 'exercises', id), item);
}

// ทิ้งลงถัง: ต้องบังคับ reviewStatus กลับเป็น draft ด้วย ไม่งั้นข้อที่ published อยู่
// จะยังโผล่ให้นักเรียนเห็น เพราะ security rules ตัดสินจาก reviewStatus อย่างเดียว
export async function trashExercise(db, id) {
  await updateDoc(doc(db, 'exercises', id), {
    deletedAt: new Date().toISOString(),
    reviewStatus: 'draft',
    updatedAt: new Date().toISOString(),
  });
}

export async function restoreExercise(db, id) {
  await updateDoc(doc(db, 'exercises', id), {
    deletedAt: deleteField(),
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteExercise(db, id) {
  await deleteDoc(doc(db, 'exercises', id));
}

export async function fetchTrashedExercises(db) {
  const snapshot = await getDocs(
    query(collection(db, 'exercises'), where('deletedAt', '!=', null), orderBy('deletedAt', 'desc')),
  );
  return snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
}
```

- [ ] **Step 2: ตรวจว่าไม่พังของเดิม**

Run: `npm test`
Expected: PASS ทั้งหมด (ไฟล์นี้ไม่มี unit test โดยตรง — เป็นเปลือกบางๆ ของ Firebase SDK จะถูกพิสูจน์ตอนตรวจด้วยมือใน Task 6)

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin-content-io.js
git commit -m "feat: add exercise read, create, trash, restore, and delete helpers"
```

---

### Task 4: หน้าสร้าง/แก้โจทย์

**Files:**
- Create: `src/admin/exercise.html`, `src/admin/exercise.js`
- Modify: `vite.config.js`, `src/styles/base.css`

**Interfaces:**
- Consumes: ทุก export จาก `src/lib/exercise-form.js` (Task 2), `fetchExercise`/`createExercise`/`saveExercise`/`trashExercise` (Task 3), `requireAdmin`, `renderAdminNav`, `showPageError`, `LEVELS` จาก `./lib/schema/taxonomy.js`
- Produces: หน้าที่เข้าได้ 2 โหมด — `exercise.html` (สร้างใหม่) และ `exercise.html?id=<docId>` (แก้ไข)

- [ ] **Step 1: สร้างหน้า HTML**

สร้าง `src/admin/exercise.html`:

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>โจทย์ — Admin Pik a Class</title>
  <link rel="stylesheet" href="../styles/tokens.css" />
  <link rel="stylesheet" href="../styles/base.css" />
</head>
<body>
  <div id="admin-nav"></div>
  <main>
    <p><a id="back-link" href="#">← กลับไปคลังเนื้อหา</a></p>
    <h1 id="page-title">สร้างโจทย์ใหม่</h1>

    <form id="exercise-form" class="exercise-form">
      <fieldset>
        <legend>โจทย์นี้เกี่ยวกับอะไร</legend>
        <label>สกิล
          <select name="skill"></select>
        </label>
        <label>เลเวล
          <select name="level"></select>
        </label>
        <label>ชนิดโจทย์
          <select name="type"></select>
        </label>
        <p id="type-error" class="field-error" aria-live="polite"></p>
      </fieldset>

      <fieldset>
        <legend>เนื้อโจทย์</legend>
        <label>คำถาม / ประโยค
          <textarea name="prompt" rows="3"></textarea>
        </label>
        <p data-error-for="prompt" class="field-error"></p>
        <p id="blank-tools" hidden>
          <button type="button" id="insert-blank">แทรกช่องว่าง ___ ตรงตำแหน่งเคอร์เซอร์</button>
        </p>
        <div id="type-fields"></div>
      </fieldset>

      <fieldset>
        <legend>หัวข้อ (tag)</legend>
        <p class="hint">แสดงเฉพาะหัวข้อที่ใช้กับเลเวลนี้ได้</p>
        <div id="tag-picker" class="tag-picker"></div>
        <p data-error-for="tags" class="field-error"></p>
      </fieldset>

      <fieldset>
        <legend>การมองเห็น</legend>
        <label><input type="checkbox" name="isPreview" /> ให้คนที่ยังไม่จ่าย (tier free) เห็นเป็นตัวอย่าง</label>
        <label>ใช้ที่ไหน
          <select name="visibility">
            <option value="bank">คลังแบบฝึกหัดทั่วไป</option>
            <option value="assignmentOnly">เฉพาะการบ้านที่มอบหมาย</option>
          </select>
        </label>
        <label>สถานะ
          <select name="reviewStatus">
            <option value="draft">draft — ยังไม่ตรวจ</option>
            <option value="reviewed">reviewed — ตรวจแล้ว รออนุมัติ</option>
            <option value="published">published — นักเรียนเห็นแล้ว</option>
          </select>
        </label>
      </fieldset>

      <section class="preview-box">
        <h2>สิ่งที่นักเรียนจะเห็น</h2>
        <div id="preview"></div>
      </section>

      <p id="form-error" class="field-error" aria-live="polite"></p>
      <p id="form-status" aria-live="polite"></p>
      <p>
        <button type="submit" class="btn-primary">บันทึก</button>
        <button type="button" id="trash-btn" hidden>ทิ้งลงถังขยะ</button>
      </p>
    </form>

    <dialog id="confirm-dialog">
      <h2 id="confirm-title"></h2>
      <p id="confirm-body"></p>
      <p>
        <button type="button" id="confirm-cancel">ยกเลิก</button>
        <button type="button" id="confirm-ok"></button>
      </p>
    </dialog>
  </main>
  <script type="module" src="./exercise.js"></script>
</body>
</html>
```

- [ ] **Step 2: เขียน `src/admin/exercise.js`**

```js
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { LEVELS } from '../lib/schema/taxonomy.js';
import {
  FORM_TYPES,
  TYPE_LABELS,
  emptyFormState,
  formStateFromExercise,
  changeType,
  changeLevel,
  availableTags,
  buildExerciseDoc,
  previewLines,
} from '../lib/exercise-form.js';
import { fetchExercise, createExercise, saveExercise, trashExercise } from '../lib/admin-content-io.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/content.html', import.meta.env.BASE_URL);

const base = import.meta.env.BASE_URL;
const contentUrl = `${base}admin/content.html`;
document.getElementById('back-link').href = contentUrl;

const params = new URLSearchParams(window.location.search);
const editingId = params.get('id');

const form = document.getElementById('exercise-form');
const typeFields = document.getElementById('type-fields');
const tagPicker = document.getElementById('tag-picker');
const preview = document.getElementById('preview');
const formError = document.getElementById('form-error');
const formStatus = document.getElementById('form-status');
const trashButton = document.getElementById('trash-btn');
const dialog = document.getElementById('confirm-dialog');

let state = emptyFormState();
let existing = null;
let adminUid = null;

for (const skill of ['grammar', 'vocab', 'writing', 'dialogue']) {
  form.elements.skill.appendChild(new Option(skill, skill));
}
for (const level of LEVELS) {
  form.elements.level.appendChild(new Option(level, level));
}
for (const type of FORM_TYPES) {
  form.elements.type.appendChild(new Option(TYPE_LABELS[type], type));
}

function confirmAction({ title, body, okLabel }) {
  return new Promise((resolve) => {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-body').textContent = body;
    const okButton = document.getElementById('confirm-ok');
    okButton.textContent = okLabel;

    function close(result) {
      okButton.removeEventListener('click', onOk);
      document.getElementById('confirm-cancel').removeEventListener('click', onCancel);
      dialog.close();
      resolve(result);
    }
    function onOk() {
      close(true);
    }
    function onCancel() {
      close(false);
    }

    okButton.addEventListener('click', onOk);
    document.getElementById('confirm-cancel').addEventListener('click', onCancel);
    dialog.showModal();
  });
}

function renderTypeFields() {
  typeFields.replaceChildren();
  document.getElementById('blank-tools').hidden = state.type !== 'fill_blank';

  if (state.type === 'mcq') {
    const list = document.createElement('div');
    state.choices.forEach((choice, index) => {
      const row = document.createElement('p');
      row.className = 'choice-row';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'correct';
      radio.checked = state.correctIndex === index;
      radio.setAttribute('aria-label', `ข้อที่ ${index + 1} เป็นคำตอบที่ถูก`);
      radio.addEventListener('change', () => {
        state.correctIndex = index;
        renderPreview();
      });

      const input = document.createElement('input');
      input.type = 'text';
      input.value = choice;
      input.placeholder = `ตัวเลือกที่ ${index + 1}`;
      input.addEventListener('input', () => {
        state.choices[index] = input.value;
        renderPreview();
      });

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'ลบ';
      remove.disabled = state.choices.length <= 2;
      remove.addEventListener('click', () => {
        state.choices.splice(index, 1);
        if (state.correctIndex >= state.choices.length) state.correctIndex = 0;
        renderTypeFields();
        renderPreview();
      });

      row.append(radio, input, remove);
      list.appendChild(row);
    });

    const add = document.createElement('button');
    add.type = 'button';
    add.textContent = 'เพิ่มตัวเลือก';
    add.addEventListener('click', () => {
      state.choices.push('');
      renderTypeFields();
    });

    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'ติ๊กวงกลมหน้าตัวเลือกที่เป็นคำตอบที่ถูก';

    typeFields.append(hint, list, add);
    return;
  }

  if (state.type === 'fill_blank') {
    const list = document.createElement('div');
    state.answers.forEach((answer, index) => {
      const row = document.createElement('p');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = answer;
      input.placeholder = 'คำตอบที่รับได้';
      input.addEventListener('input', () => {
        state.answers[index] = input.value;
        renderPreview();
      });

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'ลบ';
      remove.disabled = state.answers.length <= 1;
      remove.addEventListener('click', () => {
        state.answers.splice(index, 1);
        renderTypeFields();
        renderPreview();
      });

      row.append(input, remove);
      list.appendChild(row);
    });

    const add = document.createElement('button');
    add.type = 'button';
    add.textContent = 'เพิ่มคำตอบที่รับได้';
    add.addEventListener('click', () => {
      state.answers.push('');
      renderTypeFields();
    });

    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'ใส่ได้หลายคำตอบ เช่น must กับ have to ระบบจะถือว่าถูกทั้งคู่';

    typeFields.append(hint, list, add);
    return;
  }

  const label = document.createElement('label');
  label.textContent = 'เกณฑ์ให้คะแนน (rubric)';
  const textarea = document.createElement('textarea');
  textarea.rows = 3;
  textarea.value = state.rubric;
  textarea.addEventListener('input', () => {
    state.rubric = textarea.value;
    renderPreview();
  });
  label.appendChild(textarea);

  const error = document.createElement('p');
  error.className = 'field-error';
  error.dataset.errorFor = 'rubric';

  typeFields.append(label, error);
}

function renderTagPicker() {
  tagPicker.replaceChildren();
  const tags = availableTags(state.level);

  for (const skill of ['grammar', 'vocab']) {
    const group = tags.filter((tag) => tag.skill === skill);
    if (group.length === 0) continue;

    const box = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = skill === 'grammar' ? 'ไวยากรณ์' : 'คำศัพท์';
    box.appendChild(heading);

    for (const tag of group) {
      const label = document.createElement('label');
      label.className = 'tag-option';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = state.tags.includes(tag.id);
      input.addEventListener('change', () => {
        state.tags = input.checked
          ? [...state.tags, tag.id]
          : state.tags.filter((id) => id !== tag.id);
      });
      label.append(input, document.createTextNode(` ${tag.label} (${tag.level})`));
      box.appendChild(label);
    }
    tagPicker.appendChild(box);
  }
}

function renderPreview() {
  preview.replaceChildren();
  for (const line of previewLines(state)) {
    const p = document.createElement('p');
    p.textContent = line;
    preview.appendChild(p);
  }
}

function renderAll() {
  form.elements.skill.value = state.skill;
  form.elements.level.value = state.level;
  form.elements.type.value = state.type;
  form.elements.prompt.value = state.prompt;
  form.elements.isPreview.checked = state.isPreview;
  form.elements.visibility.value = state.visibility;
  form.elements.reviewStatus.value = state.reviewStatus;
  renderTypeFields();
  renderTagPicker();
  renderPreview();
}

function clearErrors() {
  formError.textContent = '';
  for (const el of document.querySelectorAll('[data-error-for]')) el.textContent = '';
}

function showErrors(errors) {
  clearErrors();
  const leftovers = [];
  for (const error of errors) {
    const target = document.querySelector(`[data-error-for="${error.field}"]`);
    if (target) target.textContent = error.message;
    else leftovers.push(`${error.field}: ${error.message}`);
  }
  formError.textContent = leftovers.join(' • ');
}

form.elements.skill.addEventListener('change', () => {
  state.skill = form.elements.skill.value;
});

form.elements.level.addEventListener('change', () => {
  const result = changeLevel(state, form.elements.level.value);
  state = result.state;
  renderTagPicker();
  if (result.droppedTags.length > 0) {
    formStatus.textContent = `ถอด tag ที่สูงกว่าเลเวลนี้ออกแล้ว: ${result.droppedTags.join(', ')}`;
  }
});

form.elements.type.addEventListener('change', async () => {
  const nextType = form.elements.type.value;
  const hasContent =
    state.choices.some((choice) => choice.trim() !== '') ||
    state.answers.some((answer) => answer.trim() !== '') ||
    state.rubric.trim() !== '';

  if (hasContent) {
    const ok = await confirmAction({
      title: 'เปลี่ยนชนิดโจทย์',
      body: 'ตัวเลือก เฉลย และเกณฑ์ให้คะแนนที่กรอกไว้จะถูกล้างทิ้ง ยืนยันไหม',
      okLabel: 'เปลี่ยนชนิดและล้างข้อมูล',
    });
    if (!ok) {
      form.elements.type.value = state.type;
      return;
    }
  }

  state = changeType(state, nextType);
  renderAll();
});

form.elements.prompt.addEventListener('input', () => {
  state.prompt = form.elements.prompt.value;
  renderPreview();
});

form.elements.isPreview.addEventListener('change', () => {
  state.isPreview = form.elements.isPreview.checked;
});
form.elements.visibility.addEventListener('change', () => {
  state.visibility = form.elements.visibility.value;
});
form.elements.reviewStatus.addEventListener('change', () => {
  state.reviewStatus = form.elements.reviewStatus.value;
});

document.getElementById('insert-blank').addEventListener('click', () => {
  const input = form.elements.prompt;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  input.value = `${input.value.slice(0, start)}___${input.value.slice(end)}`;
  state.prompt = input.value;
  input.focus();
  input.setSelectionRange(start + 3, start + 3);
  renderPreview();
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.textContent = '';

  const result = buildExerciseDoc(state, { existing, adminUid });
  if (!result.ok) {
    showErrors(result.errors);
    return;
  }
  clearErrors();

  try {
    if (editingId) {
      await saveExercise(db, editingId, result.doc);
      existing = result.doc;
      formStatus.textContent = 'บันทึกแล้ว';
    } else {
      await createExercise(db, result.doc);
      window.location.href = `${contentUrl}?saved=1`;
    }
  } catch (error) {
    console.error(error);
    formError.textContent = 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง';
  }
});

trashButton.addEventListener('click', async () => {
  const ok = await confirmAction({
    title: 'ทิ้งข้อนี้ลงถังขยะ',
    body: `"${state.prompt}" — จะหายจากคลังและนักเรียนจะไม่เห็น กู้คืนได้จากถังขยะ`,
    okLabel: 'ทิ้งลงถังขยะ',
  });
  if (!ok) return;

  try {
    await trashExercise(db, editingId);
    window.location.href = `${contentUrl}?trashed=1`;
  } catch (error) {
    console.error(error);
    formError.textContent = 'ทิ้งไม่สำเร็จ ลองใหม่อีกครั้ง';
  }
});

requireAdmin(async (firebaseUser) => {
  adminUid = firebaseUser.uid;

  if (!editingId) {
    renderAll();
    return;
  }

  document.getElementById('page-title').textContent = 'แก้ไขโจทย์';
  trashButton.hidden = false;

  try {
    const item = await fetchExercise(db, editingId);
    if (!item) {
      showPageError('ไม่พบข้อนี้ในคลัง (อาจถูกลบไปแล้ว)');
      return;
    }
    existing = item;
    state = formStateFromExercise(item);
    renderAll();
  } catch (error) {
    console.error(error);
    showPageError('โหลดข้อนี้ไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง');
  }
});
```

- [ ] **Step 3: เพิ่ม entry และสไตล์**

ใน `vite.config.js` เพิ่มใน `rollupOptions.input`:

```js
        adminExercise: resolve(__dirname, 'src/admin/exercise.html'),
```

เพิ่มท้าย `src/styles/base.css`:

```css
.exercise-form fieldset {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-3);
  margin-bottom: var(--space-4);
  display: grid;
  gap: var(--space-2);
}

.exercise-form legend {
  font-weight: 700;
  padding: 0 var(--space-2);
}

.choice-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.choice-row input[type='text'] {
  flex: 1;
}

.tag-picker {
  display: grid;
  gap: var(--space-3);
}

.tag-option {
  display: block;
}

.hint {
  color: var(--color-text);
  opacity: 0.7;
  font-size: 0.9em;
}

.preview-box {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-3);
  margin-bottom: var(--space-4);
}
```

- [ ] **Step 4: ตรวจว่า build ผ่าน**

Run: `npm test` แล้ว `npm run build`
Expected: PASS ทั้งคู่

- [ ] **Step 5: Commit**

```bash
git add src/admin/exercise.html src/admin/exercise.js vite.config.js src/styles/base.css
git commit -m "feat: add a dedicated page for creating and editing exercises"
```

---

### Task 5: หน้าคลังเนื้อหาใหม่ + ถังขยะ

**Files:**
- Modify: `src/admin/content.html`, `src/admin/content.js`, `src/styles/base.css`
- Delete: `src/lib/admin-content.js`, `src/lib/admin-content.test.js`

**เหตุผลที่ลบสองไฟล์:** `previewLines()` ย้ายไปอยู่ใน `exercise-form.js` แล้ว (มีเทสครอบคลุมอยู่ที่นั่น) ส่วน `buildContentUpdate()` ถูกแทนที่ด้วย `buildExerciseDoc()` ทั้งก้อน — เหลือไว้จะกลายเป็นโค้ดสองชุดที่ทำเรื่องเดียวกันแล้วเพี้ยนจากกันภายหลัง

**Interfaces:**
- Consumes: `previewLines` (จาก `../lib/exercise-form.js`), `fetchContent`, `publishItems`, `trashExercise`, `restoreExercise`, `deleteExercise`, `fetchTrashedExercises`, `contentLibraryConstraints`
- Produces: หน้าเดียวที่มี 2 มุมมอง — คลังปกติ และถังขยะ (`?trash=1`)

- [ ] **Step 1: แทนที่ `<main>` ใน `src/admin/content.html`**

```html
  <main>
    <h1 id="content-heading">คลังเนื้อหา</h1>
    <p id="banner" class="banner" hidden></p>

    <p class="content-actions">
      <a id="new-link" class="btn-primary" href="#">+ สร้างโจทย์ใหม่</a>
      <button id="toggle-trash" type="button">ดูถังขยะ</button>
    </p>

    <form id="content-filters" class="admin-filters">
      <label>สถานะ
        <select id="filter-status">
          <option value="draft">draft — ยังไม่ตรวจ</option>
          <option value="reviewed">reviewed — ตรวจแล้ว รออนุมัติ</option>
          <option value="published">published — นักเรียนเห็นแล้ว</option>
        </select>
      </label>
      <label>สกิล
        <select id="filter-skill"><option value="">ทั้งหมด</option></select>
      </label>
      <label>เลเวล
        <select id="filter-level"><option value="">ทั้งหมด</option></select>
      </label>
    </form>

    <p id="content-status" aria-live="polite"></p>
    <p><button id="publish-all" type="button" disabled>อนุมัติทั้งหมดที่แสดงอยู่</button></p>
    <ul id="content-list" class="content-list"></ul>

    <dialog id="confirm-dialog">
      <h2 id="confirm-title"></h2>
      <p id="confirm-body"></p>
      <p>
        <button type="button" id="confirm-cancel">ยกเลิก</button>
        <button type="button" id="confirm-ok"></button>
      </p>
    </dialog>
  </main>
```

- [ ] **Step 2: เขียน `src/admin/content.js` ใหม่ทั้งไฟล์**

```js
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { contentLibraryConstraints } from '../lib/queries.js';
import {
  fetchContent,
  publishItems,
  trashExercise,
  restoreExercise,
  deleteExercise,
  fetchTrashedExercises,
} from '../lib/admin-content-io.js';
import { previewLines, TYPE_LABELS } from '../lib/exercise-form.js';
import { LEVELS } from '../lib/schema/taxonomy.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/content.html', import.meta.env.BASE_URL);

const base = import.meta.env.BASE_URL;
const params = new URLSearchParams(window.location.search);
let showingTrash = params.get('trash') === '1';

const list = document.getElementById('content-list');
const status = document.getElementById('content-status');
const heading = document.getElementById('content-heading');
const banner = document.getElementById('banner');
const filters = document.getElementById('content-filters');
const skillFilter = document.getElementById('filter-skill');
const levelFilter = document.getElementById('filter-level');
const statusFilter = document.getElementById('filter-status');
const publishAllButton = document.getElementById('publish-all');
const toggleTrashButton = document.getElementById('toggle-trash');
const dialog = document.getElementById('confirm-dialog');

document.getElementById('new-link').href = `${base}admin/exercise.html`;

for (const skill of ['grammar', 'vocab', 'writing', 'dialogue']) {
  skillFilter.appendChild(new Option(skill, skill));
}
for (const level of LEVELS) {
  levelFilter.appendChild(new Option(level, level));
}

if (params.get('saved') === '1') showBanner('บันทึกโจทย์ใหม่แล้ว (สถานะ draft)');
if (params.get('trashed') === '1') showBanner('ทิ้งข้อนั้นลงถังขยะแล้ว');

function showBanner(message) {
  banner.textContent = message;
  banner.hidden = false;
}

function confirmAction({ title, body, okLabel }) {
  return new Promise((resolve) => {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-body').textContent = body;
    const okButton = document.getElementById('confirm-ok');
    okButton.textContent = okLabel;

    function close(result) {
      okButton.removeEventListener('click', onOk);
      document.getElementById('confirm-cancel').removeEventListener('click', onCancel);
      dialog.close();
      resolve(result);
    }
    const onOk = () => close(true);
    const onCancel = () => close(false);

    okButton.addEventListener('click', onOk);
    document.getElementById('confirm-cancel').addEventListener('click', onCancel);
    dialog.showModal();
  });
}

function renderItem(item) {
  const li = document.createElement('li');
  li.className = 'content-item';

  const meta = document.createElement('p');
  meta.className = 'content-meta';
  meta.textContent = `${item.reviewStatus} · ${item.skill} ${item.level} · ${TYPE_LABELS[item.type] ?? item.type}`;
  li.appendChild(meta);

  const promptLine = document.createElement('p');
  promptLine.className = 'content-prompt';
  const text = item.prompt ?? '';
  promptLine.textContent = text.length > 120 ? `${text.slice(0, 120)}…` : text;
  li.appendChild(promptLine);

  const answerLine = document.createElement('p');
  answerLine.className = 'hint';
  answerLine.textContent = previewLines(item).slice(1).join(' · ');
  li.appendChild(answerLine);

  const tagLine = document.createElement('p');
  tagLine.className = 'hint';
  tagLine.textContent = (item.tags ?? []).join(', ');
  li.appendChild(tagLine);

  const actions = document.createElement('p');
  actions.className = 'content-actions';

  if (showingTrash) {
    const restore = document.createElement('button');
    restore.type = 'button';
    restore.textContent = 'กู้คืน';
    restore.addEventListener('click', async () => {
      await run(() => restoreExercise(db, item.id), 'กู้คืนแล้ว ข้อนี้กลับไปอยู่ในคลังสถานะ draft');
    });

    const purge = document.createElement('button');
    purge.type = 'button';
    purge.textContent = 'ลบถาวร';
    purge.addEventListener('click', async () => {
      const ok = await confirmAction({
        title: 'ลบถาวร',
        body: `"${item.prompt}" — ลบแล้วกู้คืนไม่ได้อีก`,
        okLabel: 'ลบถาวร',
      });
      if (!ok) return;
      await run(() => deleteExercise(db, item.id), 'ลบถาวรแล้ว');
    });

    actions.append(restore, purge);
    li.appendChild(actions);
    return li;
  }

  const edit = document.createElement('a');
  edit.href = `${base}admin/exercise.html?id=${item.id}`;
  edit.textContent = 'แก้ไข';

  const publish = document.createElement('button');
  publish.type = 'button';
  publish.textContent = 'อนุมัติ';
  publish.disabled = item.reviewStatus === 'published';
  publish.addEventListener('click', async () => {
    await run(() => publishItems(db, 'exercises', [item.id]), 'อนุมัติแล้ว');
  });

  const trash = document.createElement('button');
  trash.type = 'button';
  trash.textContent = 'ทิ้ง';
  trash.addEventListener('click', async () => {
    const ok = await confirmAction({
      title: 'ทิ้งข้อนี้ลงถังขยะ',
      body: `"${item.prompt}" — จะหายจากคลังและนักเรียนจะไม่เห็น กู้คืนได้จากถังขยะ`,
      okLabel: 'ทิ้งลงถังขยะ',
    });
    if (!ok) return;
    await run(() => trashExercise(db, item.id), 'ทิ้งลงถังขยะแล้ว');
  });

  actions.append(edit, publish, trash);
  li.appendChild(actions);
  return li;
}

async function run(action, successMessage) {
  try {
    await action();
    showBanner(successMessage);
    await load();
  } catch (error) {
    console.error(error);
    showBanner('ทำรายการไม่สำเร็จ ลองใหม่อีกครั้ง');
  }
}

async function load() {
  status.textContent = 'กำลังโหลด…';
  list.replaceChildren();

  try {
    const items = showingTrash
      ? await fetchTrashedExercises(db)
      : (
          await fetchContent(
            db,
            'exercises',
            contentLibraryConstraints({
              reviewStatus: statusFilter.value,
              skill: skillFilter.value,
              level: levelFilter.value,
            }),
          )
        ).filter((item) => !item.deletedAt);

    status.textContent = showingTrash ? `ในถังขยะ ${items.length} ข้อ` : `พบ ${items.length} ข้อ`;
    publishAllButton.disabled = showingTrash || items.length === 0 || statusFilter.value === 'published';

    for (const item of items) list.appendChild(renderItem(item));

    publishAllButton.dataset.ids = items.map((item) => item.id).join(',');
  } catch (error) {
    console.error(error);
    showPageError('โหลดคลังเนื้อหาไม่สำเร็จ — ถ้าเพิ่งเพิ่ม index ใหม่ รอสักครู่แล้วลองอีกครั้ง');
  }
}

function applyView() {
  heading.textContent = showingTrash ? 'ถังขยะ' : 'คลังเนื้อหา';
  toggleTrashButton.textContent = showingTrash ? '← กลับไปคลังเนื้อหา' : 'ดูถังขยะ';
  filters.hidden = showingTrash;
  publishAllButton.hidden = showingTrash;
}

toggleTrashButton.addEventListener('click', () => {
  showingTrash = !showingTrash;
  applyView();
  load();
});

for (const input of [statusFilter, skillFilter, levelFilter]) {
  input.addEventListener('change', load);
}

publishAllButton.addEventListener('click', async () => {
  const ids = (publishAllButton.dataset.ids ?? '').split(',').filter(Boolean);
  if (ids.length === 0) return;
  publishAllButton.disabled = true;
  await run(() => publishItems(db, 'exercises', ids), `อนุมัติแล้ว ${ids.length} ข้อ`);
});

requireAdmin(() => {
  applyView();
  load();
});
```

- [ ] **Step 3: ลบไฟล์ที่ถูกแทนที่แล้ว**

```bash
git rm src/lib/admin-content.js src/lib/admin-content.test.js
```

- [ ] **Step 4: เพิ่มสไตล์ท้าย `src/styles/base.css`**

```css
.content-meta {
  font-weight: 700;
  margin-bottom: var(--space-1);
}

.content-prompt {
  margin: 0 0 var(--space-1);
}

.content-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
}

.banner {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-2) var(--space-3);
}
```

- [ ] **Step 5: Run tests and build**

Run: `npm test` แล้ว `npm run build`
Expected: PASS ทั้งคู่ — ถ้า `npm test` ฟ้องว่าหา `admin-content.js` ไม่เจอ แปลว่ายังมีไฟล์ไหน import อยู่ ให้ไล่แก้ให้ชี้ไป `exercise-form.js`

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: turn the content library into a scannable list with a trash view"
```

---

### Task 6: ตรวจทั้งหมด + deploy

**Files:** ไม่มีไฟล์ใหม่ — เป็นขั้นตอนปฏิบัติการ

- [ ] **Step 1: รันเทสครบทุกชุด**

Run: `npm test` → PASS, `npm run test:rules` → PASS (26 เคส), `npm run build` → สำเร็จ
ถ้ามีอันใดตก **ห้ามไปต่อ**

- [ ] **Step 2: deploy rules ที่แก้ใน Task 1**

Run: `npx firebase deploy --only firestore --project pik-a-class`
Expected: `Deploy complete!` — จำเป็นก่อน ไม่งั้นการทิ้งลงถังจะโดน rules ปฏิเสธเพราะ `deletedAt` ไม่อยู่ใน allowlist บน production

- [ ] **Step 3: push ให้ CI deploy เว็บ**

```bash
git push origin master:main
```

Run: `gh run watch $(gh run list --limit 1 --json databaseId --jq '.[0].databaseId') --exit-status`
Expected: workflow ผ่านทุกขั้น

- [ ] **Step 4: ตรวจด้วยมือบนเว็บจริง (ปิ๊กทำ)**

1. คลังเนื้อหา → กด "+ สร้างโจทย์ใหม่" → เลือกปรนัย พิมพ์โจทย์ ใส่ 3 ตัวเลือก ติ๊กข้อที่ถูก เลือก tag → บันทึก → เด้งกลับรายการพร้อมข้อความยืนยัน
2. กด "แก้ไข" ข้อนั้น → เปลี่ยนชนิดเป็น "เขียนตอบเป็นย่อหน้า" → ต้องมีกล่องเตือนว่าตัวเลือกจะถูกล้าง
3. ลองเปลี่ยนเลเวลเป็น A1 ทั้งที่ติด tag ระดับ B1 ไว้ → ต้องมีข้อความบอกว่าถอด tag ไหนออก
4. กด "ทิ้ง" → ยืนยัน → เปิด "ดูถังขยะ" ต้องเห็นข้อนั้น → กด "กู้คืน" → กลับมาอยู่ในคลังสถานะ draft
5. ทิ้งอีกครั้งแล้ว "ลบถาวร" → หายจากถัง

- [ ] **Step 5: Commit บันทึกผล**

อัปเดต `docs/superpowers/specs/2026-09-20-admin-ux-design.md` เพิ่มหัวข้อท้ายไฟล์ว่าอะไรผ่าน/ไม่ผ่านตอนตรวจมือ แล้ว commit + push

---

### Task 7: ดราฟต์ภาพรวมทั้งเว็บให้ปิ๊กรีวิว

**Files:**
- Create: ไฟล์ HTML ใน scratchpad แล้วเผยแพร่เป็น Artifact (ไม่ commit ลง repo)

**Interfaces:**
- Consumes: `PLAN.md` §10 (screen inventory), §15 (build workflow), spec ทั้งสองฉบับของ sub-project 2 และ 3

- [ ] **Step 1: รวบรวมเนื้อหา**

ไล่จาก `PLAN.md` §10 + สิ่งที่ทำไปแล้วจริง สรุปเป็น 3 ส่วน:
1. **ฝั่งนักเรียน** — ทุกหน้าจอตามแผน (dashboard, เส้นทางด่าน, เลือกเลเวล/สกิล, หน้าทำโจทย์, การบ้านของฉัน, ผลลัพธ์+ดาว, ประวัติ/สถิติ) พร้อมระบุว่าแต่ละหน้ากดอะไรได้
2. **ฝั่งปิ๊ก (admin)** — ภาพรวม, จัดการผู้ใช้, คลังเนื้อหา + ถังขยะ, สร้าง/แก้โจทย์, นำเข้า JSON และที่ยังไม่ได้ทำ (คิวตรวจงานเขียน, สร้างการบ้าน, ภาพรวมรายนักเรียน)
3. **สถานะ** — อะไรใช้ได้จริงแล้ววันนี้ / อะไรยังไม่ได้เริ่ม / ลำดับที่จะทำต่อ

- [ ] **Step 2: เขียนหน้าและเผยแพร่**

ทำเป็นหน้าเดียว มีแผนผังการเชื่อมหน้าจอ (diagram) + wireframe หยาบๆ ต่อหน้าจอ + ป้ายบอกสถานะ (ทำแล้ว / กำลังทำ / ยังไม่เริ่ม) แล้วเผยแพร่ด้วย Artifact เพื่อให้ปิ๊กเปิดดูและคอมเมนต์ได้

> โหลด skill `artifact-design` ก่อนเขียนหน้า และ `artifact-diagramming` สำหรับแผนผัง

- [ ] **Step 3: ส่งลิงก์ให้ปิ๊กพร้อมคำถามที่ต้องการคำตอบ**

ชี้จุดที่ยังไม่ตัดสินใจให้ชัด อย่างน้อย: visual direction ของฝั่งนักเรียน, consent notice, และลำดับความสำคัญของหน้าจอฝั่งนักเรียนใน sub-project 3

---

## Self-Review Checklist (ผู้เขียนแผนตรวจเองแล้ว)

- **ครอบคลุม spec:** ข้อ 3 (โครงหน้าจอ) → Task 4, 5; ข้อ 4 (ฟอร์ม) → Task 2, 4; ข้อ 5 (ถังขยะ) → Task 1, 3, 5; ข้อ 6 (ไฟล์) → ครบทุก task; ข้อ 7 (เทส) → Task 1, 2, 6; ข้อ 8 (ดราฟต์ภาพรวม) → Task 7
- **จุดที่ต้องระวังตอนทำ:** `previewLines()` ถูกใช้ทั้งในหน้าฟอร์ม (รับ state) และหน้ารายการ (รับ doc) — เทสใน Task 2 ครอบคลุมเคส state แล้ว ส่วนเคส doc มาจาก `formStateFromExercise` round-trip ถ้าเจอบั๊กให้เพิ่มเคสที่ `exercise-form.test.js`
- **ไม่อยู่ในแผนนี้โดยตั้งใจ:** ดีไซน์/สี, `matching`/`shadowing`, ฟอร์มของ `stages`/`grammarNotes`, การล้างถังขยะอัตโนมัติ
