# Stage Pools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** เปลี่ยนด่านจากรายชื่อข้อตายตัว เป็นคลังที่นิยามด้วยแท็ก แล้วสุ่มข้อมาเล่นรอบละ `drawCount` ข้อ

**Architecture:** `stages` เลิกเก็บ `itemIds` แล้วเก็บ `tags` + `drawCount` แทน · หน้าเล่นดึงคลังด้วย query เงื่อนไข (แทน `documentId() in [...]`) แล้วสุ่มด้วยตรรกะบริสุทธิ์ที่ฉีด `random` เข้าได้ · หน้าแอดมินเปลี่ยนจากติ๊กข้อเป็นเลือกแท็กพร้อมนับจำนวนข้อสด

**Tech Stack:** vanilla JS (ESM), Vite, Firebase JS SDK ^10.14, vitest, Firestore emulator

**Spec:** `docs/superpowers/specs/2026-09-21-stage-pools-design.md`

**หมายเหตุถึงผู้ลงมือและผู้รีวิว:** Task 7 และ 8 เขียนเป็นคำสั่งแบบบรรยาย ไม่ใช่โค้ดเต็มเหมือน task อื่น — ตั้งใจ เพราะทั้งสอง task แก้ไฟล์ HTML/DOM ที่มีโครงอยู่แล้วและต้องยึดรูปแบบของไฟล์พี่น้อง (`src/admin/exercise.js` / `exercise.html`) การเขียนโค้ดตายตัวลงไปโดยไม่ได้อ่านไฟล์จริงเสี่ยงจะขัดกับของที่มีอยู่ ให้ผู้ลงมืออ่านไฟล์พี่น้องก่อนแล้วทำให้เข้าชุดกัน

**สิ่งที่หายไปโดยตั้งใจ:** `validateStage` เดิมมีคำเตือนว่าข้อเติมคำหาตัวลวงได้ไม่ครบ คำเตือนนั้นถูกตัดออก เพราะตัวลวงมาจากข้ออื่น**ในรอบที่สุ่มได้** ซึ่งต่างกันทุกรอบ จึงรู้ล่วงหน้าตอนสร้างด่านไม่ได้อีกต่อไป

## Global Constraints

- **Node 24** เท่านั้น (jsdom 30 ในเทสต้องการ `^22.22` / `^24.15` ขึ้นไป)
- ห้ามอัป `firebase` ข้าม ^10.14 และห้ามอัป `@firebase/rules-unit-testing` ข้าม v3.x
- **ข้อความที่ผู้ใช้เห็นทั้งหมดเป็นภาษาไทย** เขียนเป็นตัวอักษรไทยจริง ไม่ใช่ `\uXXXX` · escape เฉพาะเครื่องหมายที่มีตัวคล้ายใน ASCII (curly quote/apostrophe U+2019, en/em dash) เพราะ save path บนเครื่องนี้แบนมันเป็นตัวตรงได้
- ทุกหน้า HTML ใหม่ต้องเพิ่ม entry ใน `vite.config.js` · ลิงก์ข้ามหน้าใช้ `import.meta.env.BASE_URL` เสมอ
- โมดูลตรรกะบริสุทธิ์ใน `src/lib/` **ห้าม import จาก `firebase/*`** — ถ้าต้องคุยฐานข้อมูลให้แยกเป็น `*-io.js`
- ชนิดข้อที่ด่านรับได้มีแค่ `mcq` และ `fill_blank`
- เกณฑ์ดาว: `= 1.0` → 3 · `>= 0.7` → 2 · `>= 0.4` → 1 · ต่ำกว่านั้น → 0
- ดาวรวมคิดจาก `stageClears` เท่านั้น ห้ามเอา `submissions.bestStars` มารวม
- `npm test` ต้องผ่านก่อน commit ทุกครั้ง · งานที่แตะ `firestore.rules` ต้องรัน `npm run test:rules`
- branch ท้องถิ่นคือ `master` remote คือ `main` → `git push origin master:main`
- **index ต้องเพิ่มลง `firestore.indexes.json` เสมอ** emulator สร้าง index ให้เอง เทสจึงเขียวทั้งที่ production จะตอบ `failed-precondition`

---

### Task 1: schema ของด่าน — `tags` + `drawCount`

**Files:**
- Modify: `src/lib/schema/stages.js`

**Interfaces:**
- Produces: `DEFAULT_DRAW_COUNT = 7` · `stagesSchema.fields` ที่มี `tags` และ `drawCount` แทน `itemIds`

- [ ] **Step 1: แก้ schema**

ใน `src/lib/schema/stages.js` เพิ่มค่าคงที่ต่อจาก `DEFAULT_PASS_THRESHOLD`:

```js
export const DEFAULT_DRAW_COUNT = 7;
export const MAX_DRAW_COUNT = 30;
export const MAX_STAGE_TAGS = 30;
```

แล้วใน `stagesSchema.fields` **ลบบรรทัด `itemIds`** ออก และเพิ่มสองบรรทัดนี้แทน:

```js
    tags: arrayOfStr({ minItems: 1, maxItems: MAX_STAGE_TAGS }),
    drawCount: int({ min: 1, max: MAX_DRAW_COUNT }),
```

เพดาน 30 ของ `tags` มาจากข้อจำกัดของ Firestore `array-contains-any`

- [ ] **Step 2: อย่า commit ที่นี่ — ไปทำ Task 4 ต่อทันที**

Run: `npm test`
Expected: เทสที่อ้าง `itemIds` ของ stages จะล้ม ซึ่งถูกต้องตามที่คาด

**Task 1 กับ Task 4 ต้องถูกส่งไปทำเป็นงานเดียวกัน** การแก้ schema เพียงลำพังทำให้ชุดเทสแดง และ Global Constraint ของแผนนี้ห้าม commit ตอนเทสแดง — ดังนั้น Task 1 ไม่มีขั้นตอน commit ของตัวเอง ให้ทำ Task 4 ต่อในงานเดียวกันแล้ว commit พร้อมกันที่ท้าย Task 4 (บรรทัด `git add` ของ Task 4 รวมไฟล์ schema ไว้ให้แล้ว)

ลำดับที่ถูกต้องคือ: **Task 2 → Task 3 → (Task 1 + Task 4 รวมกัน) → Task 5 → …** เพราะ Task 2 และ 3 ไม่พึ่ง schema ใหม่ จึงทำก่อนได้โดยชุดเทสยังเขียว

---

### Task 2: เงื่อนไขดึงคลังของด่าน

**Files:**
- Modify: `src/lib/queries.js`
- Modify: `src/lib/queries.test.js`

**Interfaces:**
- Consumes: `readTier` ที่มีอยู่แล้วใน `queries.js`
- Produces: `stagePoolConstraints({ skill, level, tags, tier })` คืน array ของ `[field, op, value]`

- [ ] **Step 1: เขียนเทสก่อน**

เพิ่มใน `src/lib/queries.test.js` (import `stagePoolConstraints` เพิ่มจากบรรทัด import เดิม):

```js
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
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/queries.test.js`
Expected: FAIL — `stagePoolConstraints is not a function`

- [ ] **Step 3: เขียนโค้ด**

เพิ่มใน `src/lib/queries.js` ต่อจาก `stageConstraints`:

```js
// คลังของด่าน: นิยามด้วยแท็ก ไม่ใช่รายชื่อข้อ
// เงื่อนไขชุดนี้ตั้งใจให้ตรงกับ bankExerciseConstraints ด้านบน บวกเงื่อนไขแท็ก เพื่อให้สองที่ไม่เพี้ยนกัน
// ข้อดีที่สำคัญกว่าความสะดวก: การกรองสิทธิ์อยู่ใน query เอง เด็กจึงได้เฉพาะข้อที่ตัวเองอ่านได้
// ต่างจากการอ่านด้วย documentId() in [...] ที่ถ้าอ่านข้อใดข้อหนึ่งไม่ได้จะโดนปฏิเสธทั้งชุด
export function stagePoolConstraints({ skill, level, tags, tier }) {
  const constraints = [
    ['reviewStatus', '==', 'published'],
    ['visibility', '==', 'bank'],
    ['skill', '==', skill],
    ['level', '==', level],
    ['tags', 'array-contains-any', tags],
  ];
  if (tier !== 'full') constraints.push(['isPreview', '==', true]);
  return constraints;
}
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/queries.test.js`
Expected: PASS ทุกเคส

- [ ] **Step 5: Commit**

```bash
git add src/lib/queries.js src/lib/queries.test.js
git commit -m "feat: build the exercise query for a stage pool"
```

---

### Task 3: ตรรกะสุ่มข้อและตัวจับข้อกำพร้า

**Files:**
- Create: `src/lib/stage-pool.js`
- Test: `src/lib/stage-pool.test.js`

**Interfaces:**
- Produces:
  - `pickRound(pool, drawCount, random = Math.random)` — คืน array ของข้อที่สุ่มแล้ว ไม่ซ้ำ ไม่เกิน `drawCount` ไม่แก้ `pool` เดิม
  - `matchesStagePool(stage, exercise)` — boolean
  - `findOrphanExercises(stages, exercises)` — คืนข้อที่อนุมัติแล้วแต่ไม่เข้าด่านไหนเลย

- [ ] **Step 1: เขียนเทสก่อน**

สร้าง `src/lib/stage-pool.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { pickRound, matchesStagePool, findOrphanExercises } from './stage-pool.js';

const ex = (id, overrides = {}) => ({
  id,
  skill: 'grammar',
  level: 'A2',
  tags: ['grammar:past-simple'],
  reviewStatus: 'published',
  visibility: 'bank',
  ...overrides,
});

const stage = (overrides = {}) => ({
  skill: 'grammar',
  level: 'A2',
  tags: ['grammar:past-simple'],
  drawCount: 7,
  ...overrides,
});

describe('pickRound', () => {
  const pool = [ex('a'), ex('b'), ex('c'), ex('d'), ex('e')];

  it('คืนข้อตามจำนวนที่ขอ', () => {
    expect(pickRound(pool, 3, () => 0)).toHaveLength(3);
  });

  it('ไม่มีข้อซ้ำในรอบเดียว', () => {
    let i = 0;
    const picked = pickRound(pool, 5, () => ((i += 1) % 7) / 7);
    expect(new Set(picked.map((item) => item.id)).size).toBe(5);
  });

  it('คลังน้อยกว่าที่ขอ ก็เล่นเท่าที่มี', () => {
    expect(pickRound([ex('a'), ex('b')], 7, () => 0)).toHaveLength(2);
  });

  it('คลังว่างคืน array ว่าง ไม่โยน error', () => {
    expect(pickRound([], 7, () => 0)).toEqual([]);
  });

  it('ผลลัพธ์คงที่เมื่อ random เหมือนเดิม', () => {
    const stub = () => 0.42;
    expect(pickRound(pool, 3, stub)).toEqual(pickRound(pool, 3, stub));
  });

  it('ไม่แก้ array ที่รับเข้ามา', () => {
    const snapshot = JSON.stringify(pool);
    pickRound(pool, 3, () => 0.5);
    expect(JSON.stringify(pool)).toBe(snapshot);
  });

  it('คืนข้อที่มาจากคลังจริงเท่านั้น', () => {
    const ids = new Set(pool.map((item) => item.id));
    for (const item of pickRound(pool, 4, () => 0.3)) expect(ids.has(item.id)).toBe(true);
  });
});

describe('matchesStagePool', () => {
  it('เข้าเงื่อนไขครบทุกด้าน', () => {
    expect(matchesStagePool(stage(), ex('a'))).toBe(true);
  });

  it('คนละระดับไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { level: 'B1' }))).toBe(false);
  });

  it('คนละสกิลไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { skill: 'vocab' }))).toBe(false);
  });

  it('ไม่มีแท็กที่ตรงกันเลยไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { tags: ['grammar:present-perfect'] }))).toBe(false);
  });

  it('มีแท็กตรงอย่างน้อยหนึ่งอันก็เข้า', () => {
    const wide = stage({ tags: ['grammar:past-simple', 'grammar:present-perfect'] });
    expect(matchesStagePool(wide, ex('a', { tags: ['grammar:present-perfect', 'x'] }))).toBe(true);
  });

  it('ข้อที่ยังไม่อนุมัติไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { reviewStatus: 'draft' }))).toBe(false);
  });

  it('ข้อที่ไม่ใช่ของคลังกลางไม่เข้า', () => {
    expect(matchesStagePool(stage(), ex('a', { visibility: 'assignmentOnly' }))).toBe(false);
  });
});

describe('findOrphanExercises', () => {
  it('คืนข้อที่อนุมัติแล้วแต่ไม่เข้าด่านไหนเลย', () => {
    const orphan = ex('lost', { tags: ['grammar:future-simple'] });
    const result = findOrphanExercises([stage()], [ex('a'), orphan]);
    expect(result.map((item) => item.id)).toEqual(['lost']);
  });

  it('ข้อที่ยังไม่อนุมัติไม่นับเป็นข้อกำพร้า', () => {
    const draft = ex('d', { tags: ['grammar:future-simple'], reviewStatus: 'draft' });
    expect(findOrphanExercises([stage()], [draft])).toEqual([]);
  });

  it('ไม่มีด่านเลย ข้อที่อนุมัติแล้วทุกข้อคือข้อกำพร้า', () => {
    expect(findOrphanExercises([], [ex('a'), ex('b')])).toHaveLength(2);
  });
});
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/stage-pool.test.js`
Expected: FAIL — หาโมดูลไม่เจอ

- [ ] **Step 3: เขียนโค้ด**

สร้าง `src/lib/stage-pool.js`:

```js
// คลังของด่านกับการสุ่มข้อมาเล่นหนึ่งรอบ — ตรรกะบริสุทธิ์ ไม่แตะ Firestore
// เงื่อนไขที่นี่ต้องสะท้อน stagePoolConstraints ใน queries.js ให้ตรงกัน
// ที่โน่นใช้กรองฝั่งเซิร์ฟเวอร์ ที่นี่ใช้ตรวจฝั่งเราเองตอนหาข้อกำพร้า

export function matchesStagePool(stage, exercise) {
  if (exercise.reviewStatus !== 'published') return false;
  if (exercise.visibility !== 'bank') return false;
  if (exercise.skill !== stage.skill) return false;
  if (exercise.level !== stage.level) return false;
  const tags = exercise.tags ?? [];
  return (stage.tags ?? []).some((tag) => tags.includes(tag));
}

export function findOrphanExercises(stages, exercises) {
  return exercises.filter((exercise) => {
    if (exercise.reviewStatus !== 'published') return false;
    if (exercise.visibility !== 'bank') return false;
    return !stages.some((stage) => matchesStagePool(stage, exercise));
  });
}

// Fisher-Yates บนสำเนา แล้วตัดเอาเท่าที่ขอ — สุ่มทั้งว่าได้ข้อไหนและได้เรียงยังไงในคราวเดียว
// รับ random เข้ามาเพื่อให้เทสตรึงผลได้ ห้ามเรียก Math.random ตรงๆ ข้างใน
export function pickRound(pool, drawCount, random = Math.random) {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.max(0, drawCount));
}
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/stage-pool.test.js`
Expected: PASS ทุกเคส

- [ ] **Step 5: Commit**

```bash
git add src/lib/stage-pool.js src/lib/stage-pool.test.js
git commit -m "feat: draw a round of questions from a stage pool"
```

---

### Task 4: ฟอร์มสร้างด่านฝั่งตรรกะ

**Files:**
- Modify: `src/lib/stage-form.js`
- Modify: `src/lib/stage-form.test.js`

**Interfaces:**
- Consumes: `DEFAULT_DRAW_COUNT`, `MAX_DRAW_COUNT`, `MAX_STAGE_TAGS` จาก `schema/stages.js`
- Produces: `emptyStageState` / `stageStateFromDoc` / `validateStage` / `buildStageDoc` ที่ทำงานกับ `tags` + `drawCount` · `toggleTag(state, tag)` แทน `toggleItem` · **ลบ `toggleItem` และ `moveItem` ออก** (ลำดับข้อมาจากการสุ่มแล้ว ไม่มีลำดับให้จัดอีก)

- [ ] **Step 1: แก้ state และตัวช่วย**

ใน `src/lib/stage-form.js`:

แก้ import บรรทัดแรกเป็น:

```js
import { DEFAULT_PASS_THRESHOLD, DEFAULT_DRAW_COUNT, MAX_DRAW_COUNT, MAX_STAGE_TAGS } from './schema/stages.js';
```

ลบ `const MAX_ITEMS = 20;` ทิ้ง

ใน `emptyStageState` ลบ `itemIds: [],` แล้วใส่แทน:

```js
    tags: [],
    drawCount: DEFAULT_DRAW_COUNT,
```

ใน `stageStateFromDoc` ลบ `itemIds: [...(doc.itemIds ?? [])],` แล้วใส่แทน:

```js
    tags: [...(doc.tags ?? [])],
    drawCount: doc.drawCount ?? DEFAULT_DRAW_COUNT,
```

**ลบฟังก์ชัน `toggleItem` และ `moveItem` ทั้งสองตัวทิ้ง** แล้วใส่ตัวนี้แทน:

```js
export function toggleTag(state, tag) {
  const tags = state.tags.includes(tag)
    ? state.tags.filter((item) => item !== tag)
    : [...state.tags, tag];
  return { ...state, tags };
}
```

- [ ] **Step 2: แก้ `validateStage`**

แทนที่เนื้อในของ `validateStage` ทั้งฟังก์ชันด้วย:

```js
export function validateStage(state, poolExercises = []) {
  const errors = {};
  const warnings = [];

  if (!state.title.trim()) errors.title = 'กรุณาตั้งชื่อด่าน';

  if (state.tags.length === 0) {
    errors.tags = 'เลือกแท็กอย่างน้อย 1 อัน เพื่อบอกว่าด่านนี้ดึงโจทย์จากไหน';
  } else if (state.tags.length > MAX_STAGE_TAGS) {
    errors.tags = `ด่านมีแท็กได้ไม่เกิน ${MAX_STAGE_TAGS} อัน`;
  }

  if (!Number.isInteger(state.drawCount) || state.drawCount < 1 || state.drawCount > MAX_DRAW_COUNT) {
    errors.drawCount = `จำนวนข้อต่อรอบต้องเป็นจำนวนเต็ม 1 ถึง ${MAX_DRAW_COUNT}`;
  }

  if (state.passThreshold < 0 || state.passThreshold > 1) {
    errors.passThreshold = 'เกณฑ์ผ่านด่านต้องอยู่ระหว่าง 0% ถึง 100%';
  }

  // คลังไม่พอไม่ใช่ความผิดพลาด เด็กยังเล่นได้เท่าที่มี แต่ครูควรรู้ว่ารอบหนึ่งจะสั้นกว่าที่ตั้งไว้
  if (state.tags.length > 0 && poolExercises.length < state.drawCount) {
    warnings.push(
      `คลังของด่านนี้มี ${poolExercises.length} ข้อ น้อยกว่าที่ตั้งไว้ ${state.drawCount} ข้อ ` +
        `เด็กจะได้เล่นรอบละ ${poolExercises.length} ข้อ`,
    );
  }

  if (poolExercises.some((item) => !STAGE_ITEM_TYPES.includes(item.type))) {
    warnings.push('มีโจทย์บางข้อในคลังเป็นชนิดที่ด่านเล่นไม่ได้ ระบบจะข้ามข้อเหล่านั้น');
  }

  // เปิดด่านให้ผู้ใช้ทั่วไปแต่คลังไม่มีข้อ preview เลย = เด็ก free เข้าด่านแล้วเจอด่านว่าง
  // (ต่างจากเดิมตรงที่ไม่พังทั้งด่านแล้ว เพราะ query กรองสิทธิ์ให้ในตัว จึงเป็นคำเตือน ไม่ใช่ error)
  if (state.isPreview) {
    const previewCount = poolExercises.filter((item) => item.isPreview === true).length;
    if (previewCount === 0) {
      warnings.push('เปิดด่านนี้ให้ผู้ใช้ทั่วไปแล้ว แต่ยังไม่มีโจทย์ที่เปิดให้ผู้ใช้ทั่วไปเลย เด็กกลุ่มนั้นจะเจอด่านว่าง');
    }
  }

  return { valid: Object.keys(errors).length === 0, errors, warnings };
}
```

- [ ] **Step 3: แก้ `buildStageDoc`**

ใน `buildStageDoc` ลบบรรทัด `itemIds: [...state.itemIds],` แล้วใส่แทน:

```js
    tags: [...state.tags],
    drawCount: state.drawCount,
```

- [ ] **Step 4: เขียนเทสใหม่**

ใน `src/lib/stage-form.test.js` แก้ import ให้เอา `toggleItem` กับ `moveItem` ออก ใส่ `toggleTag` เข้าไปแทน แล้ว**ลบ `describe` ของ `toggleItem` และ `moveItem` ทั้งสองบล็อกทิ้ง** พร้อมแก้เคสที่อ้าง `itemIds` ให้ใช้ `tags`/`drawCount` และเพิ่มบล็อกนี้:

```js
describe('toggleTag', () => {
  it('เพิ่มแท็กที่ยังไม่มี', () => {
    const next = toggleTag(emptyStageState(), 'grammar:past-simple');
    expect(next.tags).toEqual(['grammar:past-simple']);
  });

  it('เอาแท็กที่มีอยู่แล้วออก', () => {
    const state = emptyStageState({ tags: ['grammar:past-simple'] });
    expect(toggleTag(state, 'grammar:past-simple').tags).toEqual([]);
  });

  it('ไม่แก้ state เดิม', () => {
    const state = emptyStageState({ tags: ['a'] });
    const snapshot = JSON.stringify(state);
    toggleTag(state, 'b');
    expect(JSON.stringify(state)).toBe(snapshot);
  });
});

describe('validateStage กับคลังแบบแท็ก', () => {
  const ready = (overrides = {}) =>
    emptyStageState({ title: 'Past Simple', tags: ['grammar:past-simple'], ...overrides });
  const poolItem = (overrides = {}) => ({
    id: 'e1',
    type: 'mcq',
    level: 'A2',
    skill: 'grammar',
    isPreview: false,
    ...overrides,
  });
  const fullPool = Array.from({ length: 7 }, (_, i) => poolItem({ id: `e${i}` }));

  it('ผ่านเมื่อมีชื่อ แท็ก และคลังพอ', () => {
    expect(validateStage(ready(), fullPool).valid).toBe(true);
  });

  it('ไม่เลือกแท็กเลยถือว่าผิด', () => {
    const { valid, errors } = validateStage(ready({ tags: [] }), fullPool);
    expect(valid).toBe(false);
    expect(errors.tags).toBeTruthy();
  });

  it('จำนวนข้อต่อรอบนอกช่วงถือว่าผิด', () => {
    expect(validateStage(ready({ drawCount: 0 }), fullPool).errors.drawCount).toBeTruthy();
    expect(validateStage(ready({ drawCount: 99 }), fullPool).errors.drawCount).toBeTruthy();
  });

  it('คลังน้อยกว่าที่ตั้งไว้เป็นคำเตือน ไม่ใช่ error', () => {
    const { valid, warnings } = validateStage(ready(), [poolItem()]);
    expect(valid).toBe(true);
    expect(warnings.join(' ')).toContain('น้อยกว่าที่ตั้งไว้');
  });

  it('เปิดให้ผู้ใช้ทั่วไปแต่คลังไม่มีข้อ preview เลย เตือน', () => {
    const { valid, warnings } = validateStage(ready({ isPreview: true }), fullPool);
    expect(valid).toBe(true);
    expect(warnings.join(' ')).toContain('เด็กกลุ่มนั้นจะเจอด่านว่าง');
  });
});

describe('buildStageDoc กับคลังแบบแท็ก', () => {
  it('เก็บ tags และ drawCount ลงเอกสาร', () => {
    const doc = buildStageDoc(
      emptyStageState({ title: 'T', tags: ['grammar:past-simple'], drawCount: 5 }),
      { adminUid: 'admin1', now: '2026-09-21T00:00:00.000Z' },
    );
    expect(doc.tags).toEqual(['grammar:past-simple']);
    expect(doc.drawCount).toBe(5);
    expect(doc.itemIds).toBeUndefined();
  });
});
```

- [ ] **Step 5: รันเทสทั้งชุด**

Run: `npm test`
Expected: PASS ทั้งหมด ถ้ายังมีไฟล์อื่นอ้าง `toggleItem`/`moveItem`/`itemIds` ของด่านอยู่ ให้แก้ให้หมดในขั้นนี้

- [ ] **Step 6: Commit**

```bash
git add src/lib/schema/stages.js src/lib/stage-form.js src/lib/stage-form.test.js
git commit -m "feat: build stage pools from tags instead of hand-picked items"
```

commit นี้รวมไฟล์ schema จาก Task 1 ไว้ด้วย เพราะสองงานนี้ถูกทำเป็นงานเดียวกัน (ดู Task 1 Step 2)

---

### Task 5: ชั้น IO ดึงคลัง

**Files:**
- Modify: `src/lib/stage-io.js`

**Interfaces:**
- Consumes: `stagePoolConstraints` จาก `queries.js` · `buildQuery` เดิม
- Produces: `fetchStagePool(db, stage, tier)` — คืน `Array<{ id, ...doc }>` ของทุกข้อในคลัง · **ลบ `fetchStageExercises` ทิ้ง** ไม่มีใครใช้แล้วหลัง Task 6

- [ ] **Step 1: เขียนโค้ด**

ใน `src/lib/stage-io.js` **ลบฟังก์ชัน `fetchStageExercises` ทั้งตัว** แล้วใส่แทน:

```js
// ดึงคลังของด่านด้วยเงื่อนไข ไม่ใช่รายชื่อข้อ
// ไม่ใส่ limit เพราะ limit ที่ไม่มี orderBy จะได้ "ข้อแรกๆ ตาม document id" ซึ่งเป็นชุดเดิมทุกครั้ง
// กลายเป็นอคติถาวรที่มองไม่เห็น แทนที่จะสุ่มจริง — คลังโตเกินคาดค่อยกลับมาทำ paging
export async function fetchStagePool(db, stage, tier) {
  const snapshot = await getDocs(
    buildQuery(db, 'exercises', stagePoolConstraints({
      skill: stage.skill,
      level: stage.level,
      tags: stage.tags ?? [],
      tier,
    })),
  );
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}
```

แก้บรรทัด import ของ `queries.js` ให้ดึง `stagePoolConstraints` เพิ่มเข้ามาด้วย

- [ ] **Step 2: ตรวจว่าไม่มีใครเรียกของเก่าเหลืออยู่**

Run: `grep -rn "fetchStageExercises" src/`
Expected: เจอเฉพาะใน `src/learn/play.js` ซึ่งจะแก้ใน Task 6 — ถ้าเจอที่อื่นให้แก้ให้หมด

- [ ] **Step 3: Commit**

```bash
git add src/lib/stage-io.js
git commit -m "feat: read a stage pool by filter instead of by id list"
```

---

### Task 6: หน้าเล่นด่านสุ่มข้อ

**Files:**
- Modify: `src/learn/play.js`

**Interfaces:**
- Consumes: `fetchStagePool` จาก `stage-io.js` · `pickRound` จาก `stage-pool.js` · `readTier` จาก `queries.js`

- [ ] **Step 1: แก้การโหลด**

ใน `src/learn/play.js` แก้ import ให้เป็น `fetchStage, fetchStagePool` จาก `../lib/stage-io.js` และเพิ่มสองบรรทัดนี้:

```js
import { pickRound } from '../lib/stage-pool.js';
import { readTier } from '../lib/queries.js';
```

แล้วในส่วนที่เคยเรียก `fetchStageExercises(db, stage.itemIds)` เปลี่ยนเป็น:

```js
    const pool = await fetchStagePool(db, stage, readTier(userDoc));
    // กรองชนิดที่เล่นไม่ได้ทิ้งก่อนสุ่ม ไม่ใช่หลังสุ่ม ไม่งั้นรอบนั้นจะได้ข้อน้อยกว่า drawCount
    // โดยไม่มีเหตุผล ทั้งที่คลังมีข้อที่เล่นได้เหลืออยู่
    const playable = pool.filter((item) => STAGE_ITEM_TYPES.includes(item.type));
    const exercises = pickRound(playable, stage.drawCount ?? 1);
```

เพิ่ม `STAGE_ITEM_TYPES` เข้าไปใน import จาก `../lib/stage-form.js` — อย่า hardcode รายการชนิดซ้ำที่นี่ ไม่งั้นวันที่เพิ่มชนิดใหม่จะมีสองที่ให้ลืมแก้

`userDoc` มาจาก `requireLogin` เหมือนที่หน้า `learn/index.js` และ `learn/path.js` ใช้อยู่แล้ว — ดูวิธีรับค่าจากสองไฟล์นั้นแล้วทำให้เหมือนกัน

- [ ] **Step 2: ตรวจว่าข้อความคลังว่างยังทำงาน**

เงื่อนไข "ด่านนี้ยังไม่มีข้อเลย" ที่มีอยู่แล้วต้องยังยิงเมื่อ `exercises.length === 0` — อ่านโค้ดรอบๆ ให้แน่ใจว่ายังถูกต้องหลังเปลี่ยนที่มาของ `exercises`

- [ ] **Step 3: รันเทสและ build**

Run: `npm test && npm run build`
Expected: PASS และ build สำเร็จ

- [ ] **Step 4: Commit**

```bash
git add src/learn/play.js
git commit -m "feat: draw a fresh round of questions each time a stage is played"
```

---

### Task 7: หน้าสร้างด่านฝั่งแอดมิน

**Files:**
- Modify: `src/admin/stage.html`
- Modify: `src/admin/stage.js`

**Interfaces:**
- Consumes: `toggleTag`, `validateStage`, `buildStageDoc`, `emptyStageState`, `stageStateFromDoc` จาก `stage-form.js` · `fetchStagePool` จาก `stage-io.js`

- [ ] **Step 1: แก้ HTML**

ใน `src/admin/stage.html` แทนที่ส่วน "เลือกจากคลัง" และรายการข้อที่เลือก (`#chosen-list`) ด้วยกลุ่มฟิลด์ใหม่: checkbox แท็ก (`#tag-list`), ช่องจำนวนข้อต่อรอบ (`#drawCount` เป็น `<input type="number" min="1" max="30">`), และพื้นที่แสดงผลคลังสด (`#pool-summary`) พร้อม `<span class="field-error" data-error-for="tags">` และ `data-error-for="drawCount"`

ยึดโครง `.form-group` เดิมของไฟล์นี้ และรูปแบบ checkbox ให้เหมือน `src/admin/exercise.html` ที่ทำ checkbox แท็กไว้แล้ว

- [ ] **Step 2: แก้ JS**

ใน `src/admin/stage.js`:
- เปลี่ยนจากการ render รายการข้อที่เลือก เป็น render checkbox แท็กจาก taxonomy ของระดับที่เลือกอยู่ (ดูวิธีที่ `src/admin/exercise.js` ทำ แล้วทำให้เหมือน)
- ทุกครั้งที่ `skill`, `level` หรือ `tags` เปลี่ยน ให้เรียก `fetchStagePool(db, state, 'full')` แล้วแสดงใน `#pool-summary` ว่า **คลังนี้มีกี่ข้อ** และ **ตัวอย่างข้อ 3 ข้อแรก** (ใช้ `textContent` เท่านั้น)
- ส่งคลังที่ได้เข้า `validateStage(state, pool)` เพื่อให้คำเตือนเรื่องคลังไม่พอทำงาน
- ใช้ `'full'` เป็น tier ตอนนับในหน้าแอดมินเสมอ เพราะครูต้องเห็นคลังทั้งหมด ไม่ใช่เฉพาะข้อ preview

- [ ] **Step 3: ตรวจด้วยการ build**

Run: `npm test && npm run build`
Expected: PASS และ build สำเร็จ · เปิดไฟล์ที่ build แล้วยืนยันว่า `dist/admin/stage.html` ยังออกมา

- [ ] **Step 4: Commit**

```bash
git add src/admin/stage.html src/admin/stage.js
git commit -m "feat: pick a stage pool by tag in the admin editor"
```

---

### Task 8: ป้ายเตือนข้อกำพร้าในหน้าคลังเนื้อหา

**Files:**
- Modify: `src/admin/content.js`
- Modify: `src/admin/content.html`

**Interfaces:**
- Consumes: `findOrphanExercises` จาก `stage-pool.js` · `fetchStages` จาก `stage-io.js`

- [ ] **Step 1: แก้ HTML**

ใน `src/admin/content.html` เพิ่มพื้นที่ป้ายเตือนเหนือรายการ: `<p id="orphan-note" class="hint" hidden></p>`

- [ ] **Step 2: แก้ JS**

ใน `src/admin/content.js` หลังโหลดรายการเสร็จ ให้ดึงด่านทั้งหมดด้วย `fetchStages(db, { publishedOnly: false })` แล้วเรียก `findOrphanExercises(stages, items)` ถ้ามีข้อกำพร้าให้แสดงใน `#orphan-note` ว่ามีกี่ข้อและชื่อข้อ 3 ข้อแรก พร้อมบอกว่าให้ไปตรวจแท็ก — ถ้าไม่มีให้ซ่อนไว้ (`hidden = true`)

ใช้ `textContent` เท่านั้นในการแสดงข้อความที่มาจากฐานข้อมูล

- [ ] **Step 3: รันเทสและ build**

Run: `npm test && npm run build`
Expected: PASS และ build สำเร็จ

- [ ] **Step 4: Commit**

```bash
git add src/admin/content.js src/admin/content.html
git commit -m "feat: warn about published exercises no stage will ever draw"
```

---

### Task 9: Firestore index

**Files:**
- Modify: `firestore.indexes.json`

- [ ] **Step 1: เพิ่ม index**

เพิ่มสอง index นี้ลงใน array `indexes` ของ `firestore.indexes.json` (รูปแบบเดียวกับ index เดิมในไฟล์):

```json
{
  "collectionGroup": "exercises",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "reviewStatus", "order": "ASCENDING" },
    { "fieldPath": "visibility", "order": "ASCENDING" },
    { "fieldPath": "skill", "order": "ASCENDING" },
    { "fieldPath": "level", "order": "ASCENDING" },
    { "fieldPath": "tags", "arrayConfig": "CONTAINS" }
  ]
},
{
  "collectionGroup": "exercises",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "reviewStatus", "order": "ASCENDING" },
    { "fieldPath": "visibility", "order": "ASCENDING" },
    { "fieldPath": "skill", "order": "ASCENDING" },
    { "fieldPath": "level", "order": "ASCENDING" },
    { "fieldPath": "isPreview", "order": "ASCENDING" },
    { "fieldPath": "tags", "arrayConfig": "CONTAINS" }
  ]
}
```

ตัวแรกสำหรับ tier `full` ตัวที่สองสำหรับ tier `free` ที่มีเงื่อนไข `isPreview` เพิ่ม

- [ ] **Step 2: ตรวจว่า JSON ยังอ่านได้**

Run: `node -e "console.log(require('./firestore.indexes.json').indexes.length)"`
Expected: พิมพ์จำนวน index ออกมาโดยไม่ error

- [ ] **Step 3: Commit**

```bash
git add firestore.indexes.json
git commit -m "chore: index the stage pool query"
```

---

### Task 10: rules test ของ query ชุดใหม่

**Files:**
- Modify: `tests/rules/content.test.js`

- [ ] **Step 1: เขียนเทส**

เพิ่ม `describe` ใหม่ที่ seed ข้อ 3 ข้อ (preview 1 ข้อ, non-preview 1 ข้อ, ยังไม่อนุมัติ 1 ข้อ) แล้วยิง query ตามเงื่อนไขของ `stagePoolConstraints` จริง (ประกอบจาก `stagePoolConstraints` + `buildQuery` ไม่ใช่เขียน query ด้วยมือ) แล้วยืนยัน:
- นักเรียน **ที่ไม่ใช่ admin** tier `free` → query ผ่าน และได้เฉพาะข้อ preview ที่อนุมัติแล้ว
- นักเรียน tier `full` → ได้ทั้งข้อ preview และ non-preview ที่อนุมัติแล้ว แต่ไม่ได้ข้อที่ยังไม่อนุมัติ

**ต้องทดสอบด้วยบัญชีที่ไม่ใช่ admin เสมอ** เพราะ `isAdmin()` ลัดผ่านทุกเงื่อนไข และนั่นคือสาเหตุที่บั๊ก "นักเรียนเปิดรายการด่านไม่ได้" รอดมาถึงรีวิวรอบสุดท้ายในรอบก่อน

- [ ] **Step 2: รัน**

Run: `npm run test:rules`
Expected: PASS ทั้งหมด

- [ ] **Step 3: Commit**

```bash
git add tests/rules/content.test.js
git commit -m "test: cover the stage pool query for free and full students"
```

---

### Task 11: ย้ายด่านเดิม 4 ด่าน

**Files:** ไม่มีไฟล์ในโปรเจกต์ — เขียนสคริปต์ชั่วคราวนอก repo

- [ ] **Step 1: ตรวจก่อนว่าไม่มีใครเล่นไปแล้ว**

อ่าน collection `stageClears` ถ้ามีเอกสารอยู่ **ให้หยุดแล้วรายงาน** อย่าลบด่านทิ้ง เพราะการลบด่านจะทำให้ดาวของเด็กชี้ไปยังด่านที่ไม่มีอยู่

- [ ] **Step 2: ลบแล้วสร้างใหม่**

ด่านทั้ง 4 เป็นฉบับร่างที่สร้างด้วยสคริปต์และยังไม่มีใครเล่น จึงลบแล้วสร้างใหม่ตามโครงใหม่ได้:

| `order` | `title` | `tags` | `drawCount` |
|---|---|---|---|
| 1 | Past Simple | `["grammar:past-simple"]` | 7 |
| 2 | Past Continuous | `["grammar:past-continuous"]` | 7 |
| 3 | Present Perfect | `["grammar:present-perfect"]` | 6 |
| 4 | ทบทวนรวม — เลือก tense ให้ถูก | ทั้งสามแท็ก | 10 |

ฟิลด์อื่น: `skill: 'grammar'`, `level: 'A2'`, `passThreshold: 0.7`, `isPreview: false`, `reviewStatus: 'draft'`, `createdBy` = uid ของปิ๊ก

**ตรวจทุกเอกสารด้วย `validate('stages', doc, 'create')` ของโปรเจกต์เองก่อนเขียน** เพราะ Admin SDK ข้าม Firestore rules ทั้งหมด ไม่มีอะไรกันข้อมูลผิดรูป

- [ ] **Step 3: ยืนยันผล**

อ่าน `stages` กลับมาแล้วพิมพ์ `order`, `title`, `tags`, `drawCount`, `reviewStatus` ของทั้ง 4 ใบ

---

### Task 12: ตรวจรอบสุดท้ายและขึ้น production

- [ ] **Step 1:** `npm test` → PASS
- [ ] **Step 2:** `npm run test:rules` → PASS
- [ ] **Step 3:** `npm run build` → สำเร็จ และ `dist/` มีหน้าครบเหมือนเดิม
- [ ] **Step 4:** `git push origin master:main` แล้วดู CI ให้เขียวครบ 3 job (job `firestore` จะ deploy index ชุดใหม่ให้เอง)
- [ ] **Step 5:** **รอ index สร้างเสร็จบน production** แล้วยืนยันว่า query ใช้งานได้จริง ไม่ใช่เชื่อว่า deploy แล้วจะพร้อมทันที
- [ ] **Step 6:** เดินโฟลว์จริง **ด้วยบัญชีนักเรียนที่ไม่ใช่ admin** — เข้าด่าน 4 เล่นสองรอบ ยืนยันว่าได้ข้อไม่เหมือนกัน

> **อย่าใช้ด่าน 1–3 เป็นเกณฑ์ตรวจรับเรื่องการสุ่ม** คลังของสามด่านนั้นเท่ากับ `drawCount` พอดี (7/7/6) จึงสุ่มแล้วได้ทุกข้ออยู่ดี เปลี่ยนแค่ลำดับ — ดู spec §7.1 ด่าน 4 เท่านั้นที่พิสูจน์เรื่องนี้ได้
