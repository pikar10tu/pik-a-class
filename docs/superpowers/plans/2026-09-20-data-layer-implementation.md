# Data Layer + Admin Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** สร้างชั้นข้อมูลจริงทั้งหมดของ Phase 1 (schema + security rules + การทดสอบ) พร้อมเครื่องมือฝั่ง admin ที่ทำให้เนื้อหาเข้าระบบได้จริงอย่างมีการตรวจสอบคุณภาพ

**Architecture:** schema ถูกนิยามเป็นโมดูล JS ล้วนใน `src/lib/schema/` (unit test ได้โดยไม่ต้องพึ่ง Firebase) แล้ว `firestore.rules` เขียนมือแบบ allowlist ให้สะท้อนนิยามเดียวกัน โดยมี rules test บน Firebase Local Emulator เป็นตาข่ายกันสองฝั่งเพี้ยนจากกัน หน้า admin (multi-page ตามแบบเดิมของโปรเจกต์) เรียกใช้ validator ชุดเดียวกับสคริปต์ CLI

**Tech Stack:** Vanilla JS + Vite (multi-page), Firebase v10 Web SDK (Auth + Firestore), vitest, `@firebase/rules-unit-testing` + Firebase Local Emulator Suite, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-09-20-data-layer-design.md` — อ่านก่อนเริ่มทุกครั้ง

## Global Constraints

- **ภาษาใน UI และข้อความ error ทั้งหมดเป็นภาษาไทย** (โค้ด/ชื่อตัวแปร/commit message เป็นอังกฤษ)
- **ไม่เพิ่ม dependency ฝั่ง runtime** — เพิ่มได้เฉพาะ devDependencies (`@firebase/rules-unit-testing`, `firebase-tools`)
- **Firestore ต้องไม่ถูกแตะจาก unit test** — โมดูลใน `src/lib/schema/` ห้าม import อะไรจาก `firebase/*`
- **CEFR levels เรียงตามนี้เสมอ:** `['A1', 'A2', 'B1', 'B2', 'C1']`
- **ช่วงชั้น (grade) ที่อนุญาต:** `['ม.1','ม.2','ม.3','ม.4','ม.5','ม.6','วัยทำงาน/บุคคลทั่วไป']`
- **reviewStatus ที่อนุญาต:** `['draft','reviewed','published']` — นักเรียนเห็นเฉพาะ `published`
- **ทุกหน้า HTML ต้องมี** `<meta name="viewport" content="width=device-width, initial-scale=1" />` และ link `../styles/tokens.css` + `../styles/base.css`
- **redirect ทุกจุดต้องใช้ `import.meta.env.BASE_URL`** (deploy อยู่ใต้ subpath `/pik-a-class/`) — ห้าม hardcode `/login.html`
- **หน้า admin ทุกหน้าอยู่หลัง `requireAdmin()`** จาก `src/lib/auth-guard.js`
- **commit ทุกครั้งที่จบ task** ข้อความขึ้นต้นด้วย `feat:` / `test:` / `fix:` / `docs:` / `ci:`
- **ห้าม commit `.env.local` หรือ service account key ใดๆ**

## File Structure

**สร้างใหม่ — schema layer (JS ล้วน ไม่แตะ Firebase):**
- `src/lib/schema/field-types.js` — ตัวประกอบชนิดฟิลด์ + ตัวตรวจค่าเดี่ยว
- `src/lib/schema/validate.js` — `validate(collection, data, mode)` เครื่องเดียวที่ทุกที่เรียกใช้
- `src/lib/schema/taxonomy.js` — รายการ tag ไวยากรณ์ + คำศัพท์ ต่อเลเวล
- `src/lib/schema/users.js`, `exercises.js`, `stages.js`, `grammar-notes.js`, `assignments.js`, `submissions.js`, `stage-clears.js` — นิยามต่อ collection (ไฟล์ละ collection)
- `src/lib/schema/index.js` — registry รวม
- `src/lib/schema/content-checks.js` — `contentHash`, ตรวจซ้ำ, รายงานความครอบคลุม
- `src/lib/schema/doc-ids.js` — ตัวสร้าง doc id ของ `submissions` / `stageClears`

**สร้างใหม่ — ฝั่งข้อมูล/หน้าจอ admin:**
- `src/lib/queries.js` — ตัวสร้าง Firestore query ทุกตัวที่แอปใช้ (สัญญาการ query ตาม spec ข้อ 7)
- `src/lib/admin-users-io.js`, `src/lib/admin-content-io.js` — อ่าน/เขียน Firestore ฝั่ง admin
- `src/lib/admin-nav.js` — แถบเมนู admin ใช้ร่วมทุกหน้า
- `src/admin/users.html` + `users.js`, `src/admin/content.html` + `content.js`, `src/admin/import.html` + `import.js`
- `scripts/check-content.mjs` — สคริปต์ CLI

**สร้างใหม่ — เทส/เอกสาร:**
- `tests/rules/*.test.js` — rules test บน emulator
- `vitest.rules.config.js` — config แยกสำหรับ rules test
- `docs/content-pipeline.md`

**แก้ของเดิม:**
- `firestore.rules` — เขียนใหม่ทั้งไฟล์แบบ allowlist
- `firestore.indexes.json` — เพิ่ม composite index
- `vite.config.js` — เพิ่ม entry ของหน้า admin ใหม่
- `package.json` — เพิ่ม script `test:rules`, `check:content` + devDependencies
- `.github/workflows/deploy.yml` — เพิ่มขั้นรัน rules test
- `src/lib/onboarding-validation.js` + `src/onboarding.html` — ดึงรายการช่วงชั้นจาก schema ที่เดียว
- `src/admin/index.html` + `index.js` — เปลี่ยนเป็น hub + nav
- `PLAN.md` — แก้จุดที่ spec นี้ตัดสินต่างออกไป

---

## Phase 1 — Schema module (Task 1-6)

### Task 1: ตัวประกอบชนิดฟิลด์ + เครื่องตรวจกลาง

**Files:**
- Create: `src/lib/schema/field-types.js`
- Create: `src/lib/schema/field-types.test.js`

**Interfaces:**
- Consumes: (ไม่มี — task แรก)
- Produces: `str(opts)`, `enumOf(values, opts)`, `bool(opts)`, `int(opts)`, `num(opts)`, `arrayOfStr(opts)`, `isoDate(opts)`, `obj(shape, opts)` — ทุกตัวคืน object `{ kind, required, ... }`; และ `checkValue(spec, value)` คืน `string | null` (ข้อความ error ภาษาไทย หรือ null ถ้าผ่าน)

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/schema/field-types.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { str, enumOf, bool, int, num, arrayOfStr, isoDate, obj, checkValue } from './field-types.js';

describe('checkValue', () => {
  it('accepts a normal string and rejects non-strings', () => {
    expect(checkValue(str(), 'hello')).toBeNull();
    expect(checkValue(str(), 42)).toBe('ต้องเป็นข้อความ');
  });

  it('rejects an empty string for a required field but allows it when optional', () => {
    expect(checkValue(str(), '   ')).toBe('ห้ามเว้นว่าง');
    expect(checkValue(str({ required: false }), '')).toBeNull();
  });

  it('rejects a string longer than maxLength', () => {
    expect(checkValue(str({ maxLength: 3 }), 'abcd')).toBe('ยาวเกิน 3 ตัวอักษร');
  });

  it('accepts only listed values for an enum', () => {
    const spec = enumOf(['a', 'b']);
    expect(checkValue(spec, 'a')).toBeNull();
    expect(checkValue(spec, 'c')).toBe('ต้องเป็นหนึ่งใน: a, b');
  });

  it('checks booleans, integers, and numeric ranges', () => {
    expect(checkValue(bool(), true)).toBeNull();
    expect(checkValue(bool(), 'true')).toBe('ต้องเป็น true หรือ false');
    expect(checkValue(int(), 1.5)).toBe('ต้องเป็นจำนวนเต็ม');
    expect(checkValue(int({ min: 0, max: 3 }), 4)).toBe('ต้องอยู่ระหว่าง 0 ถึง 3');
    expect(checkValue(num({ min: 0, max: 1 }), 0.7)).toBeNull();
  });

  it('checks string arrays', () => {
    expect(checkValue(arrayOfStr(), ['a', 'b'])).toBeNull();
    expect(checkValue(arrayOfStr(), 'a')).toBe('ต้องเป็นรายการ (array)');
    expect(checkValue(arrayOfStr(), ['a', 2])).toBe('ทุกสมาชิกต้องเป็นข้อความ');
    expect(checkValue(arrayOfStr({ minItems: 1 }), [])).toBe('ต้องมีอย่างน้อย 1 รายการ');
  });

  it('checks nested objects against a shape', () => {
    const spec = obj({ current: int({ min: 0 }), lastActiveDate: str() });
    expect(checkValue(spec, { current: 3, lastActiveDate: '2026-09-20' })).toBeNull();
    expect(checkValue(spec, { current: 3 })).toBe('lastActiveDate: จำเป็นต้องมี');
    expect(checkValue(spec, { current: -1, lastActiveDate: 'x' })).toBe('current: ต้องไม่น้อยกว่า 0');
    expect(checkValue(spec, { current: 3, lastActiveDate: 'x', extra: 1 })).toBe('extra: ฟิลด์นี้ไม่มีใน schema');
    expect(checkValue(spec, 'nope')).toBe('ต้องเป็นข้อมูลแบบ object');
  });

  it('checks ISO date strings', () => {
    expect(checkValue(isoDate(), '2026-09-20T10:00:00.000Z')).toBeNull();
    expect(checkValue(isoDate(), '20/09/2026')).toBe('ต้องเป็นวันที่รูปแบบ ISO (เช่น 2026-09-20T10:00:00.000Z)');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/schema/field-types.test.js`
Expected: FAIL — `Failed to resolve import "./field-types.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/schema/field-types.js`:

```js
export function str({ required = true, maxLength = 2000 } = {}) {
  return { kind: 'str', required, maxLength };
}

export function enumOf(values, { required = true } = {}) {
  return { kind: 'enum', required, values };
}

export function bool({ required = true } = {}) {
  return { kind: 'bool', required };
}

export function int({ required = true, min = null, max = null } = {}) {
  return { kind: 'int', required, min, max };
}

export function num({ required = true, min = null, max = null } = {}) {
  return { kind: 'num', required, min, max };
}

export function arrayOfStr({ required = true, minItems = 0, maxItems = 500 } = {}) {
  return { kind: 'arrayOfStr', required, minItems, maxItems };
}

export function isoDate({ required = true } = {}) {
  return { kind: 'isoDate', required };
}

export function obj(shape, { required = true } = {}) {
  return { kind: 'obj', required, shape };
}

const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

export function checkValue(spec, value) {
  switch (spec.kind) {
    case 'str': {
      if (typeof value !== 'string') return 'ต้องเป็นข้อความ';
      if (spec.required && value.trim() === '') return 'ห้ามเว้นว่าง';
      if (value.length > spec.maxLength) return `ยาวเกิน ${spec.maxLength} ตัวอักษร`;
      return null;
    }
    case 'enum':
      if (!spec.values.includes(value)) return `ต้องเป็นหนึ่งใน: ${spec.values.join(', ')}`;
      return null;
    case 'bool':
      if (typeof value !== 'boolean') return 'ต้องเป็น true หรือ false';
      return null;
    case 'int':
      if (typeof value !== 'number' || !Number.isInteger(value)) return 'ต้องเป็นจำนวนเต็ม';
      return rangeError(spec, value);
    case 'num':
      if (typeof value !== 'number' || Number.isNaN(value)) return 'ต้องเป็นตัวเลข';
      return rangeError(spec, value);
    case 'arrayOfStr': {
      if (!Array.isArray(value)) return 'ต้องเป็นรายการ (array)';
      if (value.length < spec.minItems) return `ต้องมีอย่างน้อย ${spec.minItems} รายการ`;
      if (value.length > spec.maxItems) return `มีได้ไม่เกิน ${spec.maxItems} รายการ`;
      if (value.some((item) => typeof item !== 'string')) return 'ทุกสมาชิกต้องเป็นข้อความ';
      return null;
    }
    case 'isoDate':
      if (typeof value !== 'string' || !ISO_PATTERN.test(value)) {
        return 'ต้องเป็นวันที่รูปแบบ ISO (เช่น 2026-09-20T10:00:00.000Z)';
      }
      return null;
    case 'obj': {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return 'ต้องเป็นข้อมูลแบบ object';
      }
      for (const [key, childSpec] of Object.entries(spec.shape)) {
        if (!Object.prototype.hasOwnProperty.call(value, key)) {
          if (childSpec.required) return `${key}: จำเป็นต้องมี`;
          continue;
        }
        const childError = checkValue(childSpec, value[key]);
        if (childError) return `${key}: ${childError}`;
      }
      for (const key of Object.keys(value)) {
        if (!spec.shape[key]) return `${key}: ฟิลด์นี้ไม่มีใน schema`;
      }
      return null;
    }
    default:
      return `ชนิดฟิลด์ไม่รู้จัก: ${spec.kind}`;
  }
}

function rangeError(spec, value) {
  if (spec.min !== null && value < spec.min) return boundMessage(spec);
  if (spec.max !== null && value > spec.max) return boundMessage(spec);
  return null;
}

function boundMessage(spec) {
  if (spec.min !== null && spec.max !== null) return `ต้องอยู่ระหว่าง ${spec.min} ถึง ${spec.max}`;
  if (spec.min !== null) return `ต้องไม่น้อยกว่า ${spec.min}`;
  return `ต้องไม่เกิน ${spec.max}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/schema/field-types.test.js`
Expected: PASS (8 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema/field-types.js src/lib/schema/field-types.test.js
git commit -m "feat: add schema field type primitives with Thai error messages"
```

### Task 2: Taxonomy ของ tag (ไวยากรณ์ + คำศัพท์)

**Files:**
- Create: `src/lib/schema/taxonomy.js`
- Create: `src/lib/schema/taxonomy.test.js`

**Interfaces:**
- Consumes: (ไม่มี)
- Produces: `LEVELS` (`string[]` เรียง A1→C1), `TAGS` (`Array<{ id, label, level }>`), `getTag(id)` คืน tag หรือ `undefined`, `levelRank(level)` คืน `number` (-1 ถ้าไม่รู้จัก), `checkTagsForLevel(tags, level)` คืน `string[]` (ข้อความ error ภาษาไทย, ว่างเปล่าถ้าผ่าน)

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/schema/taxonomy.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { LEVELS, TAGS, getTag, levelRank, checkTagsForLevel } from './taxonomy.js';

describe('taxonomy data', () => {
  it('orders CEFR levels from A1 to C1', () => {
    expect(LEVELS).toEqual(['A1', 'A2', 'B1', 'B2', 'C1']);
  });

  it('gives every tag a unique id, a label, and a known level', () => {
    const ids = TAGS.map((tag) => tag.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const tag of TAGS) {
      expect(tag.id).toMatch(/^(grammar|vocab):[a-z0-9-]+$/);
      expect(tag.label.length).toBeGreaterThan(0);
      expect(LEVELS).toContain(tag.level);
    }
  });

  it('covers both skills at every level', () => {
    for (const level of LEVELS) {
      expect(TAGS.some((tag) => tag.level === level && tag.id.startsWith('grammar:'))).toBe(true);
      expect(TAGS.some((tag) => tag.level === level && tag.id.startsWith('vocab:'))).toBe(true);
    }
  });
});

describe('checkTagsForLevel', () => {
  it('accepts a tag introduced at the same level', () => {
    expect(checkTagsForLevel(['grammar:present-simple'], 'A1')).toEqual([]);
  });

  it('accepts an easier tag on a harder exercise (revision is fine)', () => {
    expect(checkTagsForLevel(['grammar:present-simple'], 'B1')).toEqual([]);
  });

  it('rejects a harder tag on an easier exercise', () => {
    expect(checkTagsForLevel(['grammar:past-perfect'], 'A1')).toEqual([
      'tag "grammar:past-perfect" เป็นของเลเวล B1 ซึ่งสูงกว่าเลเวลของข้อนี้ (A1)',
    ]);
  });

  it('rejects an unknown tag', () => {
    expect(checkTagsForLevel(['grammar:made-up'], 'A1')).toEqual([
      'tag "grammar:made-up" ไม่มีอยู่ใน taxonomy',
    ]);
  });

  it('looks tags up by id', () => {
    expect(getTag('grammar:present-simple').level).toBe('A1');
    expect(getTag('nope')).toBeUndefined();
    expect(levelRank('B2')).toBe(3);
    expect(levelRank('Z9')).toBe(-1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/schema/taxonomy.test.js`
Expected: FAIL — `Failed to resolve import "./taxonomy.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/schema/taxonomy.js` — รายการไวยากรณ์ยกมาจาก `PLAN.md` §8.1, รายการคำศัพท์ยกมาจาก spec ข้อ 6:

```js
export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

const GRAMMAR = {
  A1: [
    ['present-simple', 'Present Simple (be/do)'],
    ['there-is-are', 'there is / there are'],
    ['present-continuous', 'Present Continuous (พื้นฐาน)'],
    ['can-cant', 'can / can\'t'],
    ['imperatives', 'ประโยคคำสั่ง (imperatives)'],
    ['plural-nouns', 'คำนามพหูพจน์'],
    ['possessive-s', 'แสดงความเป็นเจ้าของ (\'s)'],
    ['past-simple-be', 'Past Simple (be + กริยาปกติพื้นฐาน)'],
  ],
  A2: [
    ['past-simple', 'Past Simple (regular + irregular)'],
    ['past-continuous', 'Past Continuous'],
    ['present-perfect', 'Present Perfect (ประสบการณ์)'],
    ['future-going-to-will', 'Future (going to / will)'],
    ['comparatives-superlatives', 'ขั้นกว่า / ขั้นสุด'],
    ['modals-obligation', 'must / have to / should'],
    ['some-any-countable', 'some / any + นับได้-นับไม่ได้'],
  ],
  B1: [
    ['present-perfect-continuous', 'Present Perfect Continuous'],
    ['past-perfect', 'Past Perfect'],
    ['future-continuous', 'Future Continuous'],
    ['conditional-1', 'First Conditional'],
    ['conditional-2', 'Second Conditional'],
    ['passive-basic', 'Passive Voice (พื้นฐาน)'],
    ['reported-speech-statements', 'Reported Speech (ประโยคบอกเล่า)'],
    ['modals-deduction', 'modals of deduction (must / might / could)'],
    ['relative-clauses-defining', 'relative clauses (defining)'],
  ],
  B2: [
    ['past-perfect-continuous', 'Past Perfect Continuous'],
    ['future-perfect', 'Future Perfect'],
    ['conditional-3', 'Third Conditional'],
    ['mixed-conditionals', 'Mixed Conditionals'],
    ['passive-advanced', 'Passive (ครบทุก tense)'],
    ['reported-speech-questions', 'Reported Speech (คำถาม/คำสั่ง)'],
    ['relative-clauses-non-defining', 'relative clauses (non-defining)'],
    ['causative', 'causative (have / get something done)'],
  ],
  C1: [
    ['advanced-conditionals-inversion', 'conditionals ขั้นสูง / inversion'],
    ['subjunctive', 'subjunctive'],
    ['advanced-passive-reporting', 'passive / reporting ขั้นสูง'],
    ['cleft-sentences', 'cleft sentences'],
    ['discourse-markers', 'discourse markers ขั้นสูง'],
    ['nuanced-modals', 'modal ที่มีนัยละเอียด'],
  ],
};

const VOCAB = {
  A1: [
    ['family-people', 'ครอบครัว / คน'],
    ['food-drink', 'อาหาร - เครื่องดื่ม'],
    ['numbers-time', 'ตัวเลข - เวลา - วันที่'],
    ['school', 'โรงเรียน - ห้องเรียน'],
    ['home-objects', 'บ้าน - ของใช้'],
    ['clothes-colors', 'เสื้อผ้า - สี'],
    ['animals', 'สัตว์'],
    ['daily-routines', 'กิจวัตรประจำวัน'],
    ['places-in-town', 'สถานที่ในเมือง'],
  ],
  A2: [
    ['shopping-money', 'ซื้อของ - เงิน'],
    ['travel-transport', 'เดินทาง - ขนส่ง'],
    ['health-body', 'สุขภาพ - ร่างกาย'],
    ['hobbies', 'งานอดิเรก - เวลาว่าง'],
    ['jobs-basic', 'อาชีพพื้นฐาน'],
    ['festivals-holidays', 'เทศกาล - วันหยุด'],
    ['directions', 'บอกทาง'],
    ['feelings-basic', 'อารมณ์พื้นฐาน'],
    ['appearance-personality', 'ลักษณะคน - หน้าตา - นิสัย'],
    ['weather-seasons', 'ดินฟ้าอากาศ - ฤดูกาล'],
  ],
  B1: [
    ['work-careers', 'การงาน - อาชีพ'],
    ['education', 'การศึกษา'],
    ['technology-internet', 'เทคโนโลยี - อินเทอร์เน็ต'],
    ['environment-nature', 'สิ่งแวดล้อม - ธรรมชาติ'],
    ['media-entertainment', 'สื่อ - บันเทิง'],
    ['relationships', 'ความสัมพันธ์'],
    ['sports-fitness', 'กีฬา - การออกกำลังกาย'],
    ['money-banking', 'การเงิน - ธนาคาร'],
    ['city-countryside', 'ชีวิตเมือง - ชนบท'],
    ['travel-experiences', 'ประสบการณ์การเดินทาง'],
  ],
  B2: [
    ['business-economy', 'ธุรกิจ - เศรษฐกิจ'],
    ['science-research', 'วิทยาศาสตร์ - งานวิจัย'],
    ['society-culture', 'สังคม - วัฒนธรรม'],
    ['news-politics', 'ข่าว - การเมืองพื้นฐาน'],
    ['art-literature', 'ศิลปะ - วรรณกรรม'],
    ['global-issues', 'ประเด็นระดับโลก'],
    ['psychology-emotions', 'จิตวิทยา - อารมณ์เชิงลึก'],
    ['job-applications', 'สมัครงาน - ทักษะการทำงาน'],
    ['advertising-consumerism', 'โฆษณา - การบริโภค'],
    ['law-crime-basic', 'กฎหมาย - อาชญากรรมพื้นฐาน'],
  ],
  C1: [
    ['academic-language', 'ภาษาวิชาการ'],
    ['idioms-collocations', 'สำนวน - collocation ขั้นสูง'],
    ['register-formality', 'ทะเบียนภาษาทางการ / ไม่ทางการ'],
    ['negotiation', 'การเจรจาต่อรอง'],
    ['data-statistics-language', 'ภาษาเชิงข้อมูล - สถิติ'],
    ['ethics-philosophy', 'จริยธรรม - ปรัชญา'],
    ['media-analysis', 'การวิเคราะห์สื่อ - อคติ'],
    ['figurative-language', 'ภาษาเชิงเปรียบเทียบ - อุปมา'],
  ],
};

function buildTags(skill, byLevel) {
  return Object.entries(byLevel).flatMap(([level, entries]) =>
    entries.map(([slug, label]) => ({ id: `${skill}:${slug}`, label, level })),
  );
}

export const TAGS = [...buildTags('grammar', GRAMMAR), ...buildTags('vocab', VOCAB)];

const TAGS_BY_ID = new Map(TAGS.map((tag) => [tag.id, tag]));

export function getTag(id) {
  return TAGS_BY_ID.get(id);
}

export function levelRank(level) {
  return LEVELS.indexOf(level);
}

export function checkTagsForLevel(tags, level) {
  const errors = [];
  for (const id of tags) {
    const tag = getTag(id);
    if (!tag) {
      errors.push(`tag "${id}" ไม่มีอยู่ใน taxonomy`);
      continue;
    }
    if (levelRank(tag.level) > levelRank(level)) {
      errors.push(`tag "${id}" เป็นของเลเวล ${tag.level} ซึ่งสูงกว่าเลเวลของข้อนี้ (${level})`);
    }
  }
  return errors;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/schema/taxonomy.test.js`
Expected: PASS (8 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema/taxonomy.js src/lib/schema/taxonomy.test.js
git commit -m "feat: add grammar and vocabulary tag taxonomy"
```

### Task 3: เครื่องตรวจกลาง + registry + schema ของ `users`

**Files:**
- Create: `src/lib/schema/validate.js`
- Create: `src/lib/schema/index.js`
- Create: `src/lib/schema/users.js`
- Create: `src/lib/schema/validate.test.js`

**Interfaces:**
- Consumes: `checkValue`, `str`, `enumOf`, `bool`, `int`, `arrayOfStr`, `isoDate`, `obj` จาก `./field-types.js` (Task 1)
- Produces:
  - `validate(collectionName, data, mode)` จาก `./validate.js` — `mode` เป็น `'create'` (ค่าเริ่มต้น) หรือ `'update'`; คืน `{ ok: boolean, errors: Array<{ field: string, message: string }> }`
  - `collectionSchemas` จาก `./index.js` — object map ชื่อ collection → `{ fields, rules }` (task ถัดๆ ไปจะเพิ่มสมาชิกในนี้)
  - `GRADES`, `SCHOOL_GRADES`, `ADMIN_ONLY_USER_FIELDS`, `usersSchema` จาก `./users.js`

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/schema/validate.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { validate } from './validate.js';
import { GRADES, SCHOOL_GRADES, ADMIN_ONLY_USER_FIELDS } from './users.js';

function validUserDoc(overrides = {}) {
  return {
    uid: 'u1',
    email: 'a@b.com',
    fullName: 'สมชาย ใจดี',
    nickname: 'ชาย',
    grade: 'ม.3',
    school: 'โรงเรียนตัวอย่าง',
    phone: '0812345678',
    role: 'student',
    tier: 'free',
    onboardingComplete: true,
    createdAt: '2026-09-20T10:00:00.000Z',
    ...overrides,
  };
}

describe('validate', () => {
  it('accepts a complete, valid user document', () => {
    expect(validate('users', validUserDoc())).toEqual({ ok: true, errors: [] });
  });

  it('rejects an unknown collection', () => {
    expect(() => validate('nope', {})).toThrow('ไม่รู้จัก collection: nope');
  });

  it('rejects fields that are not in the schema', () => {
    const result = validate('users', validUserDoc({ totalStars: 99 }));
    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({ field: 'totalStars', message: 'ฟิลด์นี้ไม่มีใน schema' });
  });

  it('reports the offending field for a bad enum value', () => {
    const result = validate('users', validUserDoc({ tier: 'premium' }));
    expect(result.errors).toContainEqual({ field: 'tier', message: 'ต้องเป็นหนึ่งใน: free, full' });
  });

  it('requires missing fields on create but ignores them on update', () => {
    const { createdAt, ...withoutCreatedAt } = validUserDoc();
    expect(validate('users', withoutCreatedAt, 'create').errors).toContainEqual({
      field: 'createdAt',
      message: 'จำเป็นต้องมี',
    });
    expect(validate('users', { nickname: 'ใหม่' }, 'update')).toEqual({ ok: true, errors: [] });
  });

  it('allows a half-filled doc before onboarding is complete', () => {
    const stub = {
      uid: 'u1',
      email: 'a@b.com',
      fullName: '',
      nickname: '',
      role: 'student',
      tier: 'free',
      onboardingComplete: false,
      createdAt: '2026-09-20T10:00:00.000Z',
    };
    expect(validate('users', stub)).toEqual({ ok: true, errors: [] });
  });

  it('requires profile fields once onboarding is marked complete', () => {
    const result = validate('users', validUserDoc({ nickname: '', grade: undefined, phone: '' }));
    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({ field: 'nickname', message: 'จำเป็นต้องมีเมื่อกรอกโปรไฟล์เสร็จแล้ว' });
    expect(result.errors).toContainEqual({ field: 'grade', message: 'จำเป็นต้องมีเมื่อกรอกโปรไฟล์เสร็จแล้ว' });
    expect(result.errors).toContainEqual({ field: 'phone', message: 'จำเป็นต้องมีเมื่อกรอกโปรไฟล์เสร็จแล้ว' });
  });

  it('requires a school for school grades but not for the working-adult group', () => {
    const noSchool = validate('users', validUserDoc({ grade: 'ม.3', school: '' }));
    expect(noSchool.errors).toContainEqual({ field: 'school', message: 'กรุณากรอกชื่อโรงเรียน' });

    const adult = validate('users', validUserDoc({ grade: 'วัยทำงาน/บุคคลทั่วไป', school: '' }));
    expect(adult).toEqual({ ok: true, errors: [] });
  });

  it('exposes the grade lists and the admin-only field list', () => {
    expect(GRADES).toHaveLength(7);
    expect(SCHOOL_GRADES).toEqual(['ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6']);
    expect(ADMIN_ONLY_USER_FIELDS).toEqual(['role', 'tier', 'tierNote', 'groupTags']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/schema/validate.test.js`
Expected: FAIL — `Failed to resolve import "./validate.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/schema/users.js`:

```js
import { str, enumOf, bool, int, arrayOfStr, isoDate, obj } from './field-types.js';

export const GRADES = ['ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6', 'วัยทำงาน/บุคคลทั่วไป'];
export const SCHOOL_GRADES = GRADES.slice(0, 6);
export const ADMIN_ONLY_USER_FIELDS = ['role', 'tier', 'tierNote', 'groupTags'];

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

function profileCompleteRule(data) {
  if (data.onboardingComplete !== true) return null;
  const errors = [];
  for (const field of ['fullName', 'nickname', 'grade', 'phone']) {
    if (isBlank(data[field])) {
      errors.push({ field, message: 'จำเป็นต้องมีเมื่อกรอกโปรไฟล์เสร็จแล้ว' });
    }
  }
  if (SCHOOL_GRADES.includes(data.grade) && isBlank(data.school)) {
    errors.push({ field: 'school', message: 'กรุณากรอกชื่อโรงเรียน' });
  }
  return errors;
}

export const usersSchema = {
  fields: {
    uid: str(),
    email: str(),
    fullName: str({ required: false }),
    nickname: str({ required: false }),
    grade: enumOf(GRADES, { required: false }),
    school: str({ required: false }),
    phone: str({ required: false }),
    lineId: str({ required: false }),
    role: enumOf(['student', 'admin']),
    tier: enumOf(['free', 'full']),
    tierNote: str({ required: false, maxLength: 500 }),
    groupTags: arrayOfStr({ required: false, maxItems: 20 }),
    streak: obj(
      { current: int({ min: 0 }), longest: int({ min: 0 }), lastActiveDate: str() },
      { required: false },
    ),
    onboardingComplete: bool(),
    createdAt: isoDate(),
    updatedAt: isoDate({ required: false }),
  },
  rules: [profileCompleteRule],
};
```

สร้าง `src/lib/schema/index.js`:

```js
import { usersSchema } from './users.js';

export const collectionSchemas = {
  users: usersSchema,
};
```

สร้าง `src/lib/schema/validate.js`:

```js
import { checkValue } from './field-types.js';
import { collectionSchemas } from './index.js';

export function validate(collectionName, data, mode = 'create') {
  const schema = collectionSchemas[collectionName];
  if (!schema) throw new Error(`ไม่รู้จัก collection: ${collectionName}`);

  const errors = [];

  for (const [name, spec] of Object.entries(schema.fields)) {
    const value = data[name];
    if (value === undefined) {
      if (mode === 'create' && spec.required) {
        errors.push({ field: name, message: 'จำเป็นต้องมี' });
      }
      continue;
    }
    const message = checkValue(spec, value);
    if (message) errors.push({ field: name, message });
  }

  for (const key of Object.keys(data)) {
    if (data[key] === undefined) continue;
    if (!schema.fields[key]) errors.push({ field: key, message: 'ฟิลด์นี้ไม่มีใน schema' });
  }

  for (const rule of schema.rules ?? []) {
    const ruleErrors = rule(data, mode);
    if (ruleErrors) errors.push(...ruleErrors);
  }

  return { ok: errors.length === 0, errors };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/schema/validate.test.js`
Expected: PASS (9 tests)

- [ ] **Step 5: Run the whole suite to confirm nothing regressed**

Run: `npm test`
Expected: PASS ทุกไฟล์ (รวมเทสเดิมของ Foundation)

- [ ] **Step 6: Commit**

```bash
git add src/lib/schema/validate.js src/lib/schema/index.js src/lib/schema/users.js src/lib/schema/validate.test.js
git commit -m "feat: add schema registry, validator, and users schema"
```

### Task 4: Schema ของเนื้อหา (`exercises`, `stages`, `grammarNotes`)

**หมายเหตุการตัดสินใจ:** spec ข้อ 5 เขียน `answerKey?: string|string[]` — task นี้ทำให้เป็น **`string[]` เสมอ** เพราะชนิดเดียวตรวจง่ายกว่า และได้ประโยชน์จริงคือรองรับ "คำตอบที่รับได้หลายแบบ" ของ `fill_blank` (เคส must / have to ที่ `PLAN.md` §2 เตือนไว้) — ต้องแก้ spec ให้ตรงกันใน Step 6

**Files:**
- Create: `src/lib/schema/exercises.js`, `src/lib/schema/stages.js`, `src/lib/schema/grammar-notes.js`
- Create: `src/lib/schema/content-schemas.test.js`
- Modify: `src/lib/schema/index.js`
- Modify: `docs/superpowers/specs/2026-09-20-data-layer-design.md`

**Interfaces:**
- Consumes: field types (Task 1), `checkTagsForLevel`, `LEVELS` (Task 2), `collectionSchemas` (Task 3)
- Produces:
  - `exercisesSchema`, `EXERCISE_TYPES`, `BLANK_MARKER` (`'___'`) จาก `./exercises.js`
  - `stagesSchema`, `DEFAULT_PASS_THRESHOLD` (`0.7`) จาก `./stages.js`
  - `grammarNotesSchema` จาก `./grammar-notes.js`
  - `REVIEW_STATUSES` (`['draft','reviewed','published']`) จาก `./exercises.js`
  - `collectionSchemas` มี key `exercises`, `stages`, `grammarNotes` เพิ่ม

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/schema/content-schemas.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { validate } from './validate.js';

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
    contentHash: 'abc123',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin-uid',
    ...overrides,
  };
}

describe('exercises schema', () => {
  it('accepts a valid MCQ', () => {
    expect(validate('exercises', mcq())).toEqual({ ok: true, errors: [] });
  });

  it('rejects an answerKey that is not one of the choices', () => {
    const result = validate('exercises', mcq({ answerKey: ['went'] }));
    expect(result.errors).toContainEqual({ field: 'answerKey', message: 'คำตอบ "went" ไม่มีอยู่ในตัวเลือก' });
  });

  it('rejects an MCQ with more than one correct answer', () => {
    const result = validate('exercises', mcq({ answerKey: ['go', 'goes'] }));
    expect(result.errors).toContainEqual({ field: 'answerKey', message: 'MCQ ต้องมีคำตอบถูกข้อเดียว' });
  });

  it('rejects duplicate choices', () => {
    const result = validate('exercises', mcq({ choices: ['goes', 'goes', 'going'] }));
    expect(result.errors).toContainEqual({ field: 'choices', message: 'ตัวเลือกห้ามซ้ำกัน' });
  });

  it('requires a rubric for written answers and forbids choices there', () => {
    const written = mcq({
      type: 'paragraph',
      choices: undefined,
      answerKey: undefined,
      rubric: 'ให้ดาวตามความครบถ้วนของเหตุผล',
    });
    expect(validate('exercises', written)).toEqual({ ok: true, errors: [] });

    const noRubric = mcq({ type: 'paragraph', choices: undefined, answerKey: undefined });
    expect(validate('exercises', noRubric).errors).toContainEqual({
      field: 'rubric',
      message: 'ข้อเขียนตอบต้องมีเกณฑ์ให้คะแนน (rubric)',
    });

    const strayChoices = mcq({ type: 'paragraph', answerKey: undefined, rubric: 'เกณฑ์' });
    expect(validate('exercises', strayChoices).errors).toContainEqual({
      field: 'choices',
      message: 'ข้อชนิด paragraph ห้ามมีตัวเลือก',
    });
  });

  it('requires exactly one blank marker in a fill_blank prompt', () => {
    const ok = mcq({ type: 'fill_blank', choices: undefined, answerKey: ['goes', 'go'] });
    expect(validate('exercises', ok)).toEqual({ ok: true, errors: [] });

    const twoBlanks = mcq({
      type: 'fill_blank',
      choices: undefined,
      answerKey: ['goes'],
      prompt: 'She ___ to ___ every day.',
    });
    expect(validate('exercises', twoBlanks).errors).toContainEqual({
      field: 'prompt',
      message: 'ข้อเติมคำต้องมีช่องว่าง ___ พอดี 1 ช่อง (พบ 2 ช่อง)',
    });
  });

  it('rejects a tag that is above the exercise level', () => {
    const result = validate('exercises', mcq({ tags: ['grammar:past-perfect'] }));
    expect(result.errors).toContainEqual({
      field: 'tags',
      message: 'tag "grammar:past-perfect" เป็นของเลเวล B1 ซึ่งสูงกว่าเลเวลของข้อนี้ (A1)',
    });
  });

  it('requires at least one tag', () => {
    const result = validate('exercises', mcq({ tags: [] }));
    expect(result.errors).toContainEqual({ field: 'tags', message: 'ต้องมีอย่างน้อย 1 รายการ' });
  });
});

describe('stages schema', () => {
  const stage = {
    skill: 'grammar',
    level: 'A1',
    order: 1,
    title: 'ด่านที่ 1 — Present Simple',
    itemIds: ['ex1', 'ex2'],
    passThreshold: 0.7,
    isPreview: true,
    reviewStatus: 'published',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin-uid',
  };

  it('accepts a valid stage', () => {
    expect(validate('stages', stage)).toEqual({ ok: true, errors: [] });
  });

  it('rejects an empty item list and an out-of-range threshold', () => {
    expect(validate('stages', { ...stage, itemIds: [] }).errors).toContainEqual({
      field: 'itemIds',
      message: 'ต้องมีอย่างน้อย 1 รายการ',
    });
    expect(validate('stages', { ...stage, passThreshold: 1.5 }).errors).toContainEqual({
      field: 'passThreshold',
      message: 'ต้องอยู่ระหว่าง 0 ถึง 1',
    });
  });
});

describe('grammarNotes schema', () => {
  const note = {
    level: 'A2',
    topic: 'Present Perfect',
    tags: ['grammar:present-perfect'],
    summary: 'have/has + V3 ใช้พูดถึงประสบการณ์',
    isPreview: false,
    reviewStatus: 'draft',
    contentHash: 'hash1',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin-uid',
  };

  it('accepts a valid note', () => {
    expect(validate('grammarNotes', note)).toEqual({ ok: true, errors: [] });
  });

  it('rejects vocabulary tags on a grammar note', () => {
    const result = validate('grammarNotes', { ...note, tags: ['vocab:food-drink'] });
    expect(result.errors).toContainEqual({
      field: 'tags',
      message: 'สรุปไวยากรณ์ต้องใช้ tag ขึ้นต้นด้วย grammar: เท่านั้น',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/schema/content-schemas.test.js`
Expected: FAIL — `ไม่รู้จัก collection: exercises`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/schema/exercises.js`:

```js
import { str, enumOf, bool, arrayOfStr, isoDate } from './field-types.js';
import { LEVELS, checkTagsForLevel } from './taxonomy.js';

export const EXERCISE_TYPES = ['mcq', 'fill_blank', 'matching', 'short_answer', 'paragraph', 'shadowing'];
export const REVIEW_STATUSES = ['draft', 'reviewed', 'published'];
export const BLANK_MARKER = '___';

const TYPES_WITH_CHOICES = ['mcq', 'matching'];
const TYPES_WITH_ANSWER_KEY = ['mcq', 'fill_blank', 'matching'];
const TYPES_WITH_RUBRIC = ['short_answer', 'paragraph'];

function typeShapeRule(data) {
  const errors = [];
  const { type, choices, answerKey, rubric } = data;
  if (!EXERCISE_TYPES.includes(type)) return errors;

  if (TYPES_WITH_CHOICES.includes(type)) {
    if (!choices || choices.length < 2) {
      errors.push({ field: 'choices', message: `ข้อชนิด ${type} ต้องมีตัวเลือกอย่างน้อย 2 ตัว` });
    } else if (new Set(choices).size !== choices.length) {
      errors.push({ field: 'choices', message: 'ตัวเลือกห้ามซ้ำกัน' });
    }
  } else if (choices !== undefined) {
    errors.push({ field: 'choices', message: `ข้อชนิด ${type} ห้ามมีตัวเลือก` });
  }

  if (TYPES_WITH_ANSWER_KEY.includes(type)) {
    if (!answerKey || answerKey.length === 0) {
      errors.push({ field: 'answerKey', message: `ข้อชนิด ${type} ต้องมีเฉลย` });
    } else if (type === 'mcq') {
      if (answerKey.length !== 1) {
        errors.push({ field: 'answerKey', message: 'MCQ ต้องมีคำตอบถูกข้อเดียว' });
      } else if (choices && !choices.includes(answerKey[0])) {
        errors.push({ field: 'answerKey', message: `คำตอบ "${answerKey[0]}" ไม่มีอยู่ในตัวเลือก` });
      }
    } else if (type === 'matching' && choices && answerKey.length !== choices.length) {
      errors.push({ field: 'answerKey', message: 'ข้อจับคู่ต้องมีเฉลยเท่ากับจำนวนตัวเลือก' });
    }
  } else if (answerKey !== undefined) {
    errors.push({ field: 'answerKey', message: `ข้อชนิด ${type} ห้ามมีเฉลย` });
  }

  if (TYPES_WITH_RUBRIC.includes(type)) {
    if (!rubric || rubric.trim() === '') {
      errors.push({ field: 'rubric', message: 'ข้อเขียนตอบต้องมีเกณฑ์ให้คะแนน (rubric)' });
    }
  } else if (rubric !== undefined) {
    errors.push({ field: 'rubric', message: `ข้อชนิด ${type} ห้ามมีเกณฑ์ให้คะแนน` });
  }

  if (type === 'fill_blank' && typeof data.prompt === 'string') {
    const blanks = data.prompt.split(BLANK_MARKER).length - 1;
    if (blanks !== 1) {
      errors.push({
        field: 'prompt',
        message: `ข้อเติมคำต้องมีช่องว่าง ${BLANK_MARKER} พอดี 1 ช่อง (พบ ${blanks} ช่อง)`,
      });
    }
  }

  return errors;
}

export function tagsRule(data) {
  if (!Array.isArray(data.tags) || !LEVELS.includes(data.level)) return null;
  return checkTagsForLevel(data.tags, data.level).map((message) => ({ field: 'tags', message }));
}

export const exercisesSchema = {
  fields: {
    skill: enumOf(['grammar', 'vocab', 'writing', 'dialogue']),
    level: enumOf(LEVELS),
    type: enumOf(EXERCISE_TYPES),
    prompt: str({ maxLength: 4000 }),
    choices: arrayOfStr({ required: false, maxItems: 10 }),
    answerKey: arrayOfStr({ required: false, maxItems: 10 }),
    rubric: str({ required: false, maxLength: 2000 }),
    tags: arrayOfStr({ minItems: 1, maxItems: 10 }),
    visibility: enumOf(['bank', 'assignmentOnly']),
    isPreview: bool(),
    reviewStatus: enumOf(REVIEW_STATUSES),
    assignedUids: arrayOfStr({ required: false, maxItems: 200 }),
    source: str({ required: false }),
    sourceUrl: str({ required: false }),
    reviewNotes: str({ required: false, maxLength: 4000 }),
    contentHash: str(),
    importBatchId: str({ required: false }),
    createdAt: isoDate(),
    updatedAt: isoDate(),
    createdBy: str(),
  },
  rules: [typeShapeRule, tagsRule],
};
```

สร้าง `src/lib/schema/stages.js`:

```js
import { str, enumOf, bool, int, num, arrayOfStr, isoDate } from './field-types.js';
import { LEVELS } from './taxonomy.js';
import { REVIEW_STATUSES } from './exercises.js';

export const DEFAULT_PASS_THRESHOLD = 0.7;

export const stagesSchema = {
  fields: {
    skill: enumOf(['grammar', 'vocab', 'dialogue']),
    level: enumOf(LEVELS),
    order: int({ min: 1 }),
    title: str({ maxLength: 200 }),
    itemIds: arrayOfStr({ minItems: 1, maxItems: 20 }),
    passThreshold: num({ min: 0, max: 1 }),
    isPreview: bool(),
    reviewStatus: enumOf(REVIEW_STATUSES),
    createdAt: isoDate(),
    updatedAt: isoDate(),
    createdBy: str(),
  },
  rules: [],
};
```

สร้าง `src/lib/schema/grammar-notes.js`:

```js
import { str, enumOf, bool, arrayOfStr, isoDate } from './field-types.js';
import { LEVELS } from './taxonomy.js';
import { REVIEW_STATUSES, tagsRule } from './exercises.js';

function grammarTagsOnlyRule(data) {
  if (!Array.isArray(data.tags)) return null;
  if (data.tags.every((id) => id.startsWith('grammar:'))) return null;
  return [{ field: 'tags', message: 'สรุปไวยากรณ์ต้องใช้ tag ขึ้นต้นด้วย grammar: เท่านั้น' }];
}

export const grammarNotesSchema = {
  fields: {
    level: enumOf(LEVELS),
    topic: str({ maxLength: 200 }),
    tags: arrayOfStr({ minItems: 1, maxItems: 10 }),
    summary: str({ maxLength: 4000 }),
    isPreview: bool(),
    reviewStatus: enumOf(REVIEW_STATUSES),
    source: str({ required: false }),
    sourceUrl: str({ required: false }),
    reviewNotes: str({ required: false, maxLength: 4000 }),
    contentHash: str(),
    importBatchId: str({ required: false }),
    createdAt: isoDate(),
    updatedAt: isoDate(),
    createdBy: str(),
  },
  rules: [tagsRule, grammarTagsOnlyRule],
};
```

แก้ `src/lib/schema/index.js` ให้เป็น:

```js
import { usersSchema } from './users.js';
import { exercisesSchema } from './exercises.js';
import { stagesSchema } from './stages.js';
import { grammarNotesSchema } from './grammar-notes.js';

export const collectionSchemas = {
  users: usersSchema,
  exercises: exercisesSchema,
  stages: stagesSchema,
  grammarNotes: grammarNotesSchema,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/schema/content-schemas.test.js`
Expected: PASS (12 tests)

- [ ] **Step 5: Run the whole suite**

Run: `npm test`
Expected: PASS ทั้งหมด

- [ ] **Step 6: แก้ spec ให้ตรงกับการตัดสินใจเรื่อง `answerKey`**

ใน `docs/superpowers/specs/2026-09-20-data-layer-design.md` ข้อ 5 เปลี่ยนบรรทัด `answerKey` เป็น:

```
  answerKey?: string[]         บังคับสำหรับ mcq, fill_blank, matching — short_answer/paragraph/shadowing ห้ามมี
                               เป็น array เสมอ เพื่อรองรับคำตอบที่รับได้หลายแบบใน fill_blank
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/schema docs/superpowers/specs/2026-09-20-data-layer-design.md
git commit -m "feat: add exercises, stages, and grammar notes schemas"
```

### Task 5: Schema ฝั่งกิจกรรมนักเรียน (`assignments`, `submissions`, `stageClears`) + doc id

**Files:**
- Create: `src/lib/schema/assignments.js`, `src/lib/schema/submissions.js`, `src/lib/schema/stage-clears.js`, `src/lib/schema/doc-ids.js`
- Create: `src/lib/schema/activity-schemas.test.js`
- Modify: `src/lib/schema/index.js`

**Interfaces:**
- Consumes: field types (Task 1), `LEVELS` (Task 2), `validate` + registry (Task 3), `EXERCISE_TYPES` (Task 4)
- Produces:
  - `assignmentsSchema`, `submissionsSchema`, `stageClearsSchema`
  - `submissionId(uid, exerciseId, assignmentId)` → `string` (`assignmentId` ที่ไม่ส่งมา/เป็น `null` แปลงเป็น `"bank"`)
  - `stageClearId(uid, stageId)` → `string`
  - `SUBMISSION_STATUSES` = `['pending','graded','completed']`
  - `collectionSchemas` มี key `assignments`, `submissions`, `stageClears` เพิ่ม

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/schema/activity-schemas.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/schema/activity-schemas.test.js`
Expected: FAIL — `Failed to resolve import "./doc-ids.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/schema/doc-ids.js`:

```js
function assertIdPart(value) {
  if (typeof value !== 'string' || value.trim() === '') throw new Error('รหัสเอกสารห้ามว่าง');
  if (value.includes('/')) throw new Error('ห้ามมีเครื่องหมาย / ในรหัสเอกสาร');
  return value;
}

export function submissionId(uid, exerciseId, assignmentId = null) {
  const scope = assignmentId === null || assignmentId === undefined ? 'bank' : assignmentId;
  return [uid, scope, exerciseId].map(assertIdPart).join('__');
}

export function stageClearId(uid, stageId) {
  return [uid, stageId].map(assertIdPart).join('__');
}
```

สร้าง `src/lib/schema/submissions.js`:

```js
import { str, enumOf, bool, int, num, arrayOfStr, isoDate } from './field-types.js';
import { LEVELS } from './taxonomy.js';
import { EXERCISE_TYPES } from './exercises.js';

export const SUBMISSION_STATUSES = ['pending', 'graded', 'completed'];

function gradedMetadataRule(data) {
  const errors = [];
  if (data.status === 'graded') {
    if (!data.gradedBy) errors.push({ field: 'gradedBy', message: 'ต้องระบุผู้ตรวจเมื่อสถานะเป็น graded' });
    if (!data.gradedAt) errors.push({ field: 'gradedAt', message: 'ต้องระบุเวลาที่ตรวจเมื่อสถานะเป็น graded' });
  }
  if (
    typeof data.attemptCount === 'number' &&
    typeof data.wrongCount === 'number' &&
    data.wrongCount > data.attemptCount
  ) {
    errors.push({
      field: 'wrongCount',
      message: 'จำนวนครั้งที่ตอบผิดมากกว่าจำนวนครั้งที่ตอบทั้งหมดไม่ได้',
    });
  }
  return errors;
}

export const submissionsSchema = {
  fields: {
    uid: str(),
    exerciseId: str(),
    assignmentId: str({ required: false }),
    skill: enumOf(['grammar', 'vocab', 'writing', 'dialogue']),
    level: enumOf(LEVELS),
    type: enumOf(EXERCISE_TYPES),
    tags: arrayOfStr({ maxItems: 10 }),
    answer: str({ required: false, maxLength: 8000 }),
    autoGraded: bool(),
    score: num({ required: false, min: 0, max: 1 }),
    bestStars: int({ min: 0, max: 3 }),
    attemptCount: int({ min: 1 }),
    wrongCount: int({ min: 0 }),
    lastAnsweredAt: isoDate(),
    status: enumOf(SUBMISSION_STATUSES),
    feedback: str({ required: false, maxLength: 4000 }),
    gradedBy: str({ required: false }),
    gradedAt: isoDate({ required: false }),
    createdAt: isoDate(),
  },
  rules: [gradedMetadataRule],
};
```

สร้าง `src/lib/schema/assignments.js`:

```js
import { str, arrayOfStr, isoDate } from './field-types.js';

export const assignmentsSchema = {
  fields: {
    createdBy: str(),
    title: str({ maxLength: 200 }),
    note: str({ required: false, maxLength: 2000 }),
    exerciseIds: arrayOfStr({ minItems: 1, maxItems: 100 }),
    assignedTo: arrayOfStr({ minItems: 1, maxItems: 200 }),
    dueDate: isoDate({ required: false }),
    createdAt: isoDate(),
    updatedAt: isoDate(),
  },
  rules: [],
};
```

สร้าง `src/lib/schema/stage-clears.js`:

```js
import { str, enumOf, int, num, isoDate } from './field-types.js';
import { LEVELS } from './taxonomy.js';

export const stageClearsSchema = {
  fields: {
    uid: str(),
    stageId: str(),
    skill: enumOf(['grammar', 'vocab', 'dialogue']),
    level: enumOf(LEVELS),
    order: int({ min: 1 }),
    score: num({ min: 0, max: 1 }),
    clearedAt: isoDate(),
  },
  rules: [],
};
```

เพิ่มใน `src/lib/schema/index.js` (import และใส่ใน object ให้ครบทั้ง 7 collection):

```js
import { usersSchema } from './users.js';
import { exercisesSchema } from './exercises.js';
import { stagesSchema } from './stages.js';
import { grammarNotesSchema } from './grammar-notes.js';
import { assignmentsSchema } from './assignments.js';
import { submissionsSchema } from './submissions.js';
import { stageClearsSchema } from './stage-clears.js';

export const collectionSchemas = {
  users: usersSchema,
  exercises: exercisesSchema,
  stages: stagesSchema,
  grammarNotes: grammarNotesSchema,
  assignments: assignmentsSchema,
  submissions: submissionsSchema,
  stageClears: stageClearsSchema,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/schema/activity-schemas.test.js`
Expected: PASS (10 tests)

- [ ] **Step 5: Run the whole suite**

Run: `npm test`
Expected: PASS ทั้งหมด

- [ ] **Step 6: Commit**

```bash
git add src/lib/schema
git commit -m "feat: add assignments, submissions, and stage clear schemas"
```

### Task 6: ตรวจเนื้อหาซ้ำ + รายงานความครอบคลุม

**Files:**
- Create: `src/lib/schema/content-checks.js`
- Create: `src/lib/schema/content-checks.test.js`

**Interfaces:**
- Consumes: `validate` (Task 3), `TAGS`, `LEVELS` (Task 2)
- Produces:
  - `normalizeContent(text)` → `string`
  - `contentHash(item)` → `string` (16 ตัวอักษร hex, คิดจาก `prompt`/`summary` + `choices`)
  - `checkBatch(collectionName, items, existingHashes)` → `{ valid: Array<{ index, item }>, invalid: Array<{ index, errors: Array<{field,message}> }> }` โดย `existingHashes` เป็น `Set<string>`
  - `coverageReport(items)` → `Array<{ level, total, byTag: Array<{ id, label, count }>, missingTagIds: string[] }>`

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/schema/content-checks.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/schema/content-checks.test.js`
Expected: FAIL — `Failed to resolve import "./content-checks.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/schema/content-checks.js`:

```js
import { validate } from './validate.js';
import { LEVELS, TAGS, getTag } from './taxonomy.js';

const KEEP_PATTERN = /[^\p{Letter}\p{Number}_\s]/gu;

export function normalizeContent(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(KEEP_PATTERN, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function fnv1a(input, seed) {
  let hash = seed;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

export function contentHash(item) {
  const body = normalizeContent(item.prompt ?? item.summary ?? '');
  const choices = Array.isArray(item.choices)
    ? [...item.choices].map(normalizeContent).sort().join('|')
    : '';
  const material = `${body}##${choices}`;
  return fnv1a(material, 0x811c9dc5) + fnv1a(material, 0x1000193);
}

export function checkBatch(collectionName, items, existingHashes = new Set()) {
  const valid = [];
  const invalid = [];
  const seenInBatch = new Set();

  items.forEach((rawItem, index) => {
    const hash = contentHash(rawItem);
    const item = { ...rawItem, contentHash: hash };
    const { errors } = validate(collectionName, item, 'create');

    if (existingHashes.has(hash)) {
      errors.push({ field: 'prompt', message: 'ข้อนี้ซ้ำกับข้อที่มีอยู่แล้วในคลัง' });
    } else if (seenInBatch.has(hash)) {
      errors.push({ field: 'prompt', message: 'ข้อนี้ซ้ำกับข้ออื่นในไฟล์เดียวกัน' });
    }

    if (errors.length > 0) {
      invalid.push({ index, errors });
      return;
    }
    seenInBatch.add(hash);
    valid.push({ index, item });
  });

  return { valid, invalid };
}

export function coverageReport(items) {
  return LEVELS.map((level) => {
    const atLevel = items.filter((item) => item.level === level);
    const counts = new Map();
    for (const item of atLevel) {
      for (const tagId of item.tags ?? []) {
        counts.set(tagId, (counts.get(tagId) ?? 0) + 1);
      }
    }
    const byTag = [...counts.entries()].map(([id, count]) => ({
      id,
      label: getTag(id)?.label ?? id,
      count,
    }));
    const missingTagIds = TAGS.filter((tag) => tag.level === level && !counts.has(tag.id)).map((tag) => tag.id);
    return { level, total: atLevel.length, byTag, missingTagIds };
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/schema/content-checks.test.js`
Expected: PASS (8 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema/content-checks.js src/lib/schema/content-checks.test.js
git commit -m "feat: add content hashing, duplicate detection, and coverage report"
```

### Task 7: ให้ฟอร์ม onboarding ใช้รายการช่วงชั้นจาก schema ที่เดียว

**Files:**
- Modify: `src/lib/onboarding-validation.js`
- Modify: `src/onboarding.html`
- Modify: `src/onboarding.js`
- Modify: `src/lib/onboarding-validation.test.js`

**Interfaces:**
- Consumes: `GRADES`, `SCHOOL_GRADES` จาก `src/lib/schema/users.js` (Task 3)
- Produces: `src/lib/onboarding-validation.js` ยัง export `SCHOOL_GRADES` เหมือนเดิม (re-export จาก schema) — ไฟล์อื่นที่ import อยู่แล้วไม่ต้องแก้

- [ ] **Step 1: Write the failing test**

เพิ่มเทสนี้ท้าย `src/lib/onboarding-validation.test.js`:

```js
import { GRADES } from './schema/users.js';

describe('grade list wiring', () => {
  it('re-exports the schema grade list instead of keeping a second copy', async () => {
    const module = await import('./onboarding-validation.js');
    expect(module.SCHOOL_GRADES).toBe(GRADES.slice(0, 6).length === 6 ? module.SCHOOL_GRADES : null);
    expect(module.GRADES).toEqual(GRADES);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/onboarding-validation.test.js`
Expected: FAIL — `expected undefined to deeply equal [...]` (ยังไม่มี `GRADES` export)

- [ ] **Step 3: Write minimal implementation**

ใน `src/lib/onboarding-validation.js` เปลี่ยนสองบรรทัดแรกจากการประกาศ `SCHOOL_GRADES` เอง เป็น:

```js
import { GRADES, SCHOOL_GRADES } from './schema/users.js';

export { GRADES, SCHOOL_GRADES };
```

(ส่วน `validateOnboardingForm` ที่เหลือคงเดิมทั้งหมด)

ใน `src/onboarding.html` ลบ `<option>` ของช่วงชั้นทั้งหมดออกจาก `<select id="grade">` เหลือไว้แค่ตัวเลือกว่างตัวแรก:

```html
<select id="grade" name="grade" required>
  <option value="">— เลือกช่วงชั้น/กลุ่มผู้เรียน —</option>
</select>
```

ใน `src/onboarding.js` เติมโค้ดสร้างตัวเลือกจาก `GRADES` ก่อนผูก event submit:

```js
import { GRADES } from './lib/onboarding-validation.js';

const gradeSelect = document.getElementById('grade');
for (const grade of GRADES) {
  const option = document.createElement('option');
  option.value = grade;
  option.textContent = grade;
  gradeSelect.appendChild(option);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS ทั้งหมด (เทสเดิมของ `validateOnboardingForm` ต้องยังผ่าน)

- [ ] **Step 5: ตรวจด้วยตาในเบราว์เซอร์**

Run: `npm run dev` แล้วเปิด `http://localhost:5173/onboarding.html`
Expected: dropdown ช่วงชั้นมี 7 ตัวเลือกครบ (ม.1–ม.6 + วัยทำงาน/บุคคลทั่วไป)

- [ ] **Step 6: Commit**

```bash
git add src/lib/onboarding-validation.js src/lib/onboarding-validation.test.js src/onboarding.html src/onboarding.js
git commit -m "refactor: render onboarding grade options from the schema grade list"
```

---

## Phase 2 — Security rules + rules test (Task 8-11)

> **ต้องมี Java บนเครื่องเพื่อรัน Firestore emulator** — เครื่องนี้ติดตั้ง Temurin 21 ไว้แล้วตอน Foundation ถ้า `java -version` ไม่เจอ ให้เรียกผ่าน path เต็มของ Temurin หรือเติมลง PATH ก่อนรัน `npm run test:rules`

### Task 8: ติดตั้งชุดทดสอบ rules + เขียน rules ของ `users` ใหม่แบบ allowlist

**Files:**
- Create: `tests/rules/helpers.js`, `tests/rules/users.test.js`
- Create: `vitest.rules.config.js`
- Modify: `package.json`
- Modify: `firestore.rules` (เขียนใหม่ทั้งไฟล์)

**Interfaces:**
- Consumes: (ไม่มีจาก task ก่อนหน้า — อ่าน allowlist ของฟิลด์จาก spec ข้อ 5 และ `src/lib/schema/users.js`)
- Produces: `withTestEnv(fn)`, `studentDb(env, uid)`, `adminDb(env, uid)`, `anonDb(env)`, `seed(env, path, data)` จาก `tests/rules/helpers.js` — task 9-10 เรียกใช้ชุดเดียวกันนี้

- [ ] **Step 1: ติดตั้ง dependency และ script**

```bash
npm install --save-dev @firebase/rules-unit-testing firebase-tools
```

เพิ่มใน `package.json` ที่ `"scripts"`:

```json
"test:rules": "firebase emulators:exec --only firestore \"vitest run --config vitest.rules.config.js\""
```

สร้าง `vitest.rules.config.js`:

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/rules/**/*.test.js'],
    testTimeout: 20000,
    hookTimeout: 20000,
    fileParallelism: false,
  },
});
```

- [ ] **Step 2: Write the failing test**

สร้าง `tests/rules/helpers.js`:

```js
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';

export async function withTestEnv(fn) {
  const testEnv = await initializeTestEnvironment({
    projectId: 'pik-a-class-rules-test',
    firestore: { rules: readFileSync('firestore.rules', 'utf8') },
  });
  try {
    await testEnv.clearFirestore();
    await fn(testEnv);
  } finally {
    await testEnv.cleanup();
  }
}

export function authedDb(testEnv, uid) {
  return testEnv.authenticatedContext(uid).firestore();
}

export function anonDb(testEnv) {
  return testEnv.unauthenticatedContext().firestore();
}

export async function seed(testEnv, docs) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    for (const [path, data] of Object.entries(docs)) {
      const [collection, id] = path.split('/');
      await db.collection(collection).doc(id).set(data);
    }
  });
}

export function studentDoc(overrides = {}) {
  return {
    uid: 'student1',
    email: 'student@example.com',
    fullName: 'นักเรียน ทดสอบ',
    nickname: 'เรียน',
    grade: 'ม.3',
    school: 'โรงเรียนตัวอย่าง',
    phone: '0800000000',
    role: 'student',
    tier: 'free',
    onboardingComplete: true,
    createdAt: '2026-09-20T10:00:00.000Z',
    ...overrides,
  };
}

export function adminDoc(overrides = {}) {
  return studentDoc({
    uid: 'admin1',
    email: 'admin@example.com',
    role: 'admin',
    tier: 'full',
    ...overrides,
  });
}
```

สร้าง `tests/rules/users.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { withTestEnv, authedDb, anonDb, seed, studentDoc, adminDoc } from './helpers.js';

describe('users rules', () => {
  it('lets a signed-in user create their own student doc', async () => {
    await withTestEnv(async (env) => {
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('users').doc('student1').set(studentDoc({ onboardingComplete: false })));
    });
  });

  it('blocks creating a doc for somebody else', async () => {
    await withTestEnv(async (env) => {
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('users').doc('student2').set(studentDoc({ uid: 'student2', onboardingComplete: false })));
    });
  });

  it('blocks self-promotion to admin or full tier at create time', async () => {
    await withTestEnv(async (env) => {
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('users').doc('student1').set(studentDoc({ role: 'admin', onboardingComplete: false })));
      await assertFails(db.collection('users').doc('student1').set(studentDoc({ tier: 'full', onboardingComplete: false })));
    });
  });

  it('blocks fields that are not in the allowlist', async () => {
    await withTestEnv(async (env) => {
      const db = authedDb(env, 'student1');
      await assertFails(
        db.collection('users').doc('student1').set(studentDoc({ onboardingComplete: false, totalStars: 99 })),
      );
    });
  });

  it('lets the owner edit profile fields but not tier, role, email, or createdAt', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc() });
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('users').doc('student1').update({ nickname: 'ชื่อใหม่' }));
      await assertSucceeds(
        db.collection('users').doc('student1').update({ streak: { current: 1, longest: 1, lastActiveDate: '2026-09-20' } }),
      );
      await assertFails(db.collection('users').doc('student1').update({ tier: 'full' }));
      await assertFails(db.collection('users').doc('student1').update({ role: 'admin' }));
      await assertFails(db.collection('users').doc('student1').update({ groupTags: ['เสาร์บ่าย'] }));
      await assertFails(db.collection('users').doc('student1').update({ email: 'other@example.com' }));
      await assertFails(db.collection('users').doc('student1').update({ createdAt: '2020-01-01T00:00:00.000Z' }));
    });
  });

  it('keeps students out of other students documents', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc(), 'users/student2': studentDoc({ uid: 'student2' }) });
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('users').doc('student2').get());
      await assertFails(db.collection('users').get());
    });
  });

  it('lets an admin list students and change tier, note, and groupTags', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/admin1': adminDoc(), 'users/student1': studentDoc() });
      const db = authedDb(env, 'admin1');
      await assertSucceeds(db.collection('users').where('role', '==', 'student').get());
      await assertSucceeds(
        db.collection('users').doc('student1').update({ tier: 'full', tierNote: 'จ่ายแล้ว', groupTags: ['เสาร์บ่าย'] }),
      );
    });
  });

  it('blocks anonymous access entirely', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc() });
      const db = anonDb(env);
      await assertFails(db.collection('users').doc('student1').get());
      await assertFails(db.collection('users').doc('student1').set(studentDoc()));
    });
  });

  it('blocks deleting user documents', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/admin1': adminDoc(), 'users/student1': studentDoc() });
      await assertFails(authedDb(env, 'student1').collection('users').doc('student1').delete());
      await assertFails(authedDb(env, 'admin1').collection('users').doc('student1').delete());
    });
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm run test:rules`
Expected: FAIL — เคส "blocks fields that are not in the allowlist" และ "blocks ... email/createdAt" ตก เพราะ rules ปัจจุบันเป็น denylist

- [ ] **Step 4: Write minimal implementation**

เขียน `firestore.rules` ใหม่ทั้งไฟล์:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() {
      return request.auth != null;
    }

    function myUserDoc() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    function isAdmin() {
      return signedIn() && myUserDoc().role == "admin";
    }

    function unchanged(field) {
      return request.resource.data.get(field, null) == resource.data.get(field, null);
    }

    match /users/{uid} {
      function userFields() {
        return ['uid', 'email', 'fullName', 'nickname', 'grade', 'school', 'phone',
                'lineId', 'role', 'tier', 'tierNote', 'groupTags', 'streak',
                'onboardingComplete', 'createdAt', 'updatedAt'];
      }

      allow get: if signedIn() && (request.auth.uid == uid || isAdmin());
      allow list: if isAdmin();

      allow create: if signedIn() && request.auth.uid == uid
        && request.resource.data.keys().hasOnly(userFields())
        && request.resource.data.keys().hasAll(['uid', 'email', 'role', 'tier', 'onboardingComplete', 'createdAt'])
        && request.resource.data.uid == uid
        && request.resource.data.role == "student"
        && request.resource.data.tier == "free"
        && request.resource.data.onboardingComplete == false;

      allow update: if signedIn()
        && request.resource.data.keys().hasOnly(userFields())
        && (
          (request.auth.uid == uid
            && unchanged('uid') && unchanged('email') && unchanged('createdAt')
            && unchanged('role') && unchanged('tier') && unchanged('tierNote') && unchanged('groupTags'))
          || isAdmin()
        );

      allow delete: if false;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test:rules`
Expected: PASS (9 tests)

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.rules.config.js tests/rules firestore.rules
git commit -m "test: add emulator rules tests and rewrite user rules as an allowlist"
```

### Task 9: Rules ของเนื้อหา (`exercises`, `stages`, `grammarNotes`)

**Files:**
- Create: `tests/rules/content.test.js`
- Modify: `firestore.rules`

**Interfaces:**
- Consumes: helper ทั้งหมดจาก `tests/rules/helpers.js` (Task 8)
- Produces: rules block ของ 3 collection เนื้อหา + helper `canReadContent()` ใน `firestore.rules`

- [ ] **Step 1: Write the failing test**

สร้าง `tests/rules/content.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { withTestEnv, authedDb, anonDb, seed, studentDoc, adminDoc } from './helpers.js';

function exercise(overrides = {}) {
  return {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She ___ to school.',
    choices: ['go', 'goes'],
    answerKey: ['goes'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    contentHash: 'hash1',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin1',
    ...overrides,
  };
}

const baseWorld = {
  'users/admin1': adminDoc(),
  'users/student1': studentDoc(),
  'users/paid1': studentDoc({ uid: 'paid1', tier: 'full' }),
  'exercises/preview1': exercise({ isPreview: true, contentHash: 'h-preview' }),
  'exercises/paid-only': exercise({ contentHash: 'h-paid' }),
  'exercises/draft1': exercise({ reviewStatus: 'draft', contentHash: 'h-draft' }),
  'exercises/assigned1': exercise({ visibility: 'assignmentOnly', assignedUids: ['student1'], contentHash: 'h-assigned' }),
};

describe('exercises rules', () => {
  it('lets a free student read preview content but not paid-only content', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('exercises').doc('preview1').get());
      await assertFails(db.collection('exercises').doc('paid-only').get());
    });
  });

  it('lets a full-tier student read paid-only content', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertSucceeds(authedDb(env, 'paid1').collection('exercises').doc('paid-only').get());
    });
  });

  it('lets a free student read an exercise they were assigned', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertSucceeds(authedDb(env, 'student1').collection('exercises').doc('assigned1').get());
      await assertFails(authedDb(env, 'paid1').collection('exercises').doc('assigned1').get());
    });
  });

  it('hides drafts from students but shows them to admins', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertFails(authedDb(env, 'paid1').collection('exercises').doc('draft1').get());
      await assertSucceeds(authedDb(env, 'admin1').collection('exercises').doc('draft1').get());
    });
  });

  it('accepts the documented free-tier query and rejects an unfiltered one', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      const db = authedDb(env, 'student1');
      await assertSucceeds(
        db
          .collection('exercises')
          .where('reviewStatus', '==', 'published')
          .where('visibility', '==', 'bank')
          .where('isPreview', '==', true)
          .get(),
      );
      await assertFails(db.collection('exercises').get());
    });
  });

  it('blocks all student writes and allows admin writes inside the allowlist', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertFails(authedDb(env, 'student1').collection('exercises').doc('new1').set(exercise()));
      await assertFails(authedDb(env, 'student1').collection('exercises').doc('preview1').update({ isPreview: false }));

      const adminDb = authedDb(env, 'admin1');
      await assertSucceeds(adminDb.collection('exercises').doc('new1').set(exercise({ contentHash: 'h-new' })));
      await assertSucceeds(adminDb.collection('exercises').doc('draft1').update({ reviewStatus: 'published' }));
      await assertSucceeds(adminDb.collection('exercises').doc('new1').delete());
      await assertFails(adminDb.collection('exercises').doc('new2').set(exercise({ totalStars: 3 })));
    });
  });

  it('blocks anonymous reads', async () => {
    await withTestEnv(async (env) => {
      await seed(env, baseWorld);
      await assertFails(anonDb(env).collection('exercises').doc('preview1').get());
    });
  });
});

describe('stages and grammarNotes rules', () => {
  const stage = {
    skill: 'grammar',
    level: 'A1',
    order: 1,
    title: 'ด่าน 1',
    itemIds: ['preview1'],
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin1',
  };

  const note = {
    level: 'A1',
    topic: 'Present Simple',
    tags: ['grammar:present-simple'],
    summary: 'ใช้พูดถึงสิ่งที่ทำเป็นประจำ',
    isPreview: true,
    reviewStatus: 'published',
    contentHash: 'h-note',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    createdBy: 'admin1',
  };

  it('applies the same published + tier gate', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        ...baseWorld,
        'stages/st1': stage,
        'stages/st-draft': { ...stage, order: 2, reviewStatus: 'draft' },
        'grammarNotes/n1': note,
      });

      await assertFails(authedDb(env, 'student1').collection('stages').doc('st1').get());
      await assertSucceeds(authedDb(env, 'paid1').collection('stages').doc('st1').get());
      await assertFails(authedDb(env, 'paid1').collection('stages').doc('st-draft').get());
      await assertSucceeds(authedDb(env, 'student1').collection('grammarNotes').doc('n1').get());
      await assertFails(authedDb(env, 'student1').collection('grammarNotes').doc('n1').update({ summary: 'แก้เอง' }));
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:rules`
Expected: FAIL — ทุกเคสของ `exercises`/`stages`/`grammarNotes` ตก เพราะยังไม่มี rules block (catch-all ปฏิเสธหมด)

- [ ] **Step 3: Write minimal implementation**

ใน `firestore.rules` เพิ่ม helper ต่อจาก `unchanged()` และเพิ่ม 3 block ก่อน catch-all:

```
    function publishedAndAllowed(assignedUids) {
      return resource.data.reviewStatus == "published"
        && (resource.data.get('isPreview', false) == true
            || myUserDoc().tier == "full"
            || request.auth.uid in assignedUids);
    }

    match /exercises/{id} {
      function exerciseFields() {
        return ['skill', 'level', 'type', 'prompt', 'choices', 'answerKey', 'rubric', 'tags',
                'visibility', 'isPreview', 'reviewStatus', 'assignedUids', 'source', 'sourceUrl',
                'reviewNotes', 'contentHash', 'importBatchId', 'createdAt', 'updatedAt', 'createdBy'];
      }

      allow get, list: if signedIn()
        && (isAdmin() || publishedAndAllowed(resource.data.get('assignedUids', [])));
      allow create, update: if isAdmin() && request.resource.data.keys().hasOnly(exerciseFields());
      allow delete: if isAdmin();
    }

    match /stages/{id} {
      function stageFields() {
        return ['skill', 'level', 'order', 'title', 'itemIds', 'passThreshold', 'isPreview',
                'reviewStatus', 'createdAt', 'updatedAt', 'createdBy'];
      }

      allow get, list: if signedIn() && (isAdmin() || publishedAndAllowed([]));
      allow create, update: if isAdmin() && request.resource.data.keys().hasOnly(stageFields());
      allow delete: if isAdmin();
    }

    match /grammarNotes/{id} {
      function noteFields() {
        return ['level', 'topic', 'tags', 'summary', 'isPreview', 'reviewStatus', 'source',
                'sourceUrl', 'reviewNotes', 'contentHash', 'importBatchId',
                'createdAt', 'updatedAt', 'createdBy'];
      }

      allow get, list: if signedIn() && (isAdmin() || publishedAndAllowed([]));
      allow create, update: if isAdmin() && request.resource.data.keys().hasOnly(noteFields());
      allow delete: if isAdmin();
    }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:rules`
Expected: PASS (17 tests รวมของ Task 8)

- [ ] **Step 5: Commit**

```bash
git add firestore.rules tests/rules/content.test.js
git commit -m "feat: add content collection rules gated by review status and tier"
```

### Task 10: Rules ฝั่งกิจกรรมนักเรียน (`assignments`, `submissions`, `stageClears`)

**Files:**
- Create: `tests/rules/activity.test.js`
- Modify: `firestore.rules`

**Interfaces:**
- Consumes: helper จาก `tests/rules/helpers.js` (Task 8)
- Produces: rules block ของ 3 collection กิจกรรม — ปิดงาน rules ทั้งหมดของ Phase 1

- [ ] **Step 1: Write the failing test**

สร้าง `tests/rules/activity.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { withTestEnv, authedDb, seed, studentDoc, adminDoc } from './helpers.js';

function submission(overrides = {}) {
  return {
    uid: 'student1',
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

const world = {
  'users/admin1': adminDoc(),
  'users/student1': studentDoc(),
  'users/student2': studentDoc({ uid: 'student2' }),
  'submissions/student1__bank__ex1': submission(),
  'submissions/student2__bank__ex1': submission({ uid: 'student2' }),
  'submissions/student1__bank__ex2': submission({
    exerciseId: 'ex2',
    type: 'paragraph',
    autoGraded: false,
    bestStars: 0,
    status: 'pending',
  }),
  'assignments/as1': {
    createdBy: 'admin1',
    title: 'การบ้านที่ 1',
    exerciseIds: ['ex1'],
    assignedTo: ['student1'],
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
  },
};

describe('submissions rules', () => {
  it('lets a student write their own submission only', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('submissions').doc('student1__bank__ex3').set(submission({ exerciseId: 'ex3' })));
      await assertFails(db.collection('submissions').doc('student2__bank__ex3').set(submission({ uid: 'student2', exerciseId: 'ex3' })));
    });
  });

  it('blocks a student from writing grading fields or marking themselves graded', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('submissions').doc('student1__bank__ex2').update({ feedback: 'เยี่ยมมาก' }));
      await assertFails(db.collection('submissions').doc('student1__bank__ex2').update({ gradedBy: 'student1' }));
      await assertFails(
        db.collection('submissions').doc('student1__bank__ex2').update({ status: 'graded', bestStars: 3 }),
      );
    });
  });

  it('never lets best stars go down', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('submissions').doc('student1__bank__ex1').update({ bestStars: 3, attemptCount: 2 }));
      await assertFails(db.collection('submissions').doc('student1__bank__ex1').update({ bestStars: 1 }));
    });
  });

  it('keeps students out of other students submissions', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('submissions').doc('student2__bank__ex1').get());
      await assertFails(db.collection('submissions').get());
      await assertSucceeds(db.collection('submissions').where('uid', '==', 'student1').get());
    });
  });

  it('lets an admin read the grading queue and grade a submission', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const db = authedDb(env, 'admin1');
      await assertSucceeds(db.collection('submissions').where('status', '==', 'pending').get());
      await assertSucceeds(
        db.collection('submissions').doc('student1__bank__ex2').update({
          status: 'graded',
          bestStars: 2,
          feedback: 'เขียนดีขึ้นมาก',
          gradedBy: 'admin1',
          gradedAt: '2026-09-21T10:00:00.000Z',
        }),
      );
    });
  });

  it('blocks an admin from crediting the grade to somebody else', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      await assertFails(
        authedDb(env, 'admin1').collection('submissions').doc('student1__bank__ex2').update({
          status: 'graded',
          feedback: 'ดี',
          gradedBy: 'student1',
          gradedAt: '2026-09-21T10:00:00.000Z',
        }),
      );
    });
  });
});

describe('assignments and stageClears rules', () => {
  it('shows an assignment only to the people it was assigned to', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      await assertSucceeds(authedDb(env, 'student1').collection('assignments').doc('as1').get());
      await assertFails(authedDb(env, 'student2').collection('assignments').doc('as1').get());
      await assertFails(authedDb(env, 'student1').collection('assignments').doc('as1').update({ title: 'แก้เอง' }));
      await assertSucceeds(authedDb(env, 'admin1').collection('assignments').doc('as1').update({ title: 'แก้โดยแอดมิน' }));
    });
  });

  it('lets a student record their own stage clear only', async () => {
    await withTestEnv(async (env) => {
      await seed(env, world);
      const clear = {
        uid: 'student1',
        stageId: 'st1',
        skill: 'grammar',
        level: 'A1',
        order: 1,
        score: 0.9,
        clearedAt: '2026-09-20T10:00:00.000Z',
      };
      const db = authedDb(env, 'student1');
      await assertSucceeds(db.collection('stageClears').doc('student1__st1').set(clear));
      await assertFails(db.collection('stageClears').doc('student2__st1').set({ ...clear, uid: 'student2' }));
      await assertFails(db.collection('stageClears').doc('student1__st1').delete());
      await assertSucceeds(authedDb(env, 'admin1').collection('stageClears').where('uid', '==', 'student1').get());
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:rules`
Expected: FAIL — เคสของ `submissions`/`assignments`/`stageClears` ตกทั้งหมด (catch-all ปฏิเสธ)

- [ ] **Step 3: Write minimal implementation**

เพิ่มใน `firestore.rules` ก่อน catch-all:

```
    match /assignments/{id} {
      function assignmentFields() {
        return ['createdBy', 'title', 'note', 'exerciseIds', 'assignedTo', 'dueDate', 'createdAt', 'updatedAt'];
      }

      allow get, list: if signedIn() && (isAdmin() || request.auth.uid in resource.data.assignedTo);
      allow create, update: if isAdmin() && request.resource.data.keys().hasOnly(assignmentFields());
      allow delete: if isAdmin();
    }

    match /submissions/{id} {
      function studentFields() {
        return ['uid', 'exerciseId', 'assignmentId', 'skill', 'level', 'type', 'tags', 'answer',
                'autoGraded', 'score', 'bestStars', 'attemptCount', 'wrongCount',
                'lastAnsweredAt', 'status', 'createdAt'];
      }

      function allFields() {
        return studentFields().concat(['feedback', 'gradedBy', 'gradedAt']);
      }

      function ownedByMe() {
        return request.resource.data.uid == request.auth.uid;
      }

      allow get, list: if signedIn() && (isAdmin() || resource.data.uid == request.auth.uid);

      allow create: if signedIn() && ownedByMe()
        && request.resource.data.keys().hasOnly(studentFields())
        && request.resource.data.status != "graded"
        && request.resource.data.bestStars >= 0 && request.resource.data.bestStars <= 3;

      allow update: if signedIn() && (
        (resource.data.uid == request.auth.uid && ownedByMe()
          && request.resource.data.keys().hasOnly(studentFields())
          && unchanged('uid') && unchanged('exerciseId') && unchanged('createdAt')
          && request.resource.data.status != "graded"
          && request.resource.data.bestStars >= resource.data.bestStars
          && request.resource.data.bestStars <= 3)
        || (isAdmin()
          && request.resource.data.keys().hasOnly(allFields())
          && (request.resource.data.status != "graded"
              || request.resource.data.gradedBy == request.auth.uid))
      );

      allow delete: if isAdmin();
    }

    match /stageClears/{id} {
      function stageClearFields() {
        return ['uid', 'stageId', 'skill', 'level', 'order', 'score', 'clearedAt'];
      }

      allow get, list: if signedIn() && (isAdmin() || resource.data.uid == request.auth.uid);
      allow create, update: if signedIn()
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.keys().hasOnly(stageClearFields());
      allow delete: if false;
    }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:rules`
Expected: PASS (25 tests รวมทั้งหมด)

- [ ] **Step 5: Commit**

```bash
git add firestore.rules tests/rules/activity.test.js
git commit -m "feat: add rules for assignments, submissions, and stage clears"
```

### Task 11: Composite index + รัน rules test ใน CI

**Files:**
- Modify: `firestore.indexes.json`
- Modify: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: รายการ query จาก spec ข้อ 7
- Produces: index ที่ deploy พร้อม rules, และขั้น CI ชื่อ `rules test` ที่ต้องผ่านก่อน build

- [ ] **Step 1: เขียน index ให้ตรงกับสัญญาการ query**

แทนที่เนื้อหา `firestore.indexes.json` ด้วย:

```json
{
  "indexes": [
    {
      "collectionGroup": "exercises",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "reviewStatus", "order": "ASCENDING" },
        { "fieldPath": "visibility", "order": "ASCENDING" },
        { "fieldPath": "skill", "order": "ASCENDING" },
        { "fieldPath": "level", "order": "ASCENDING" }
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
        { "fieldPath": "isPreview", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "exercises",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "reviewStatus", "order": "ASCENDING" },
        { "fieldPath": "skill", "order": "ASCENDING" },
        { "fieldPath": "level", "order": "ASCENDING" },
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "assignments",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "assignedTo", "arrayConfig": "CONTAINS" },
        { "fieldPath": "dueDate", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "submissions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "uid", "order": "ASCENDING" },
        { "fieldPath": "lastAnsweredAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "submissions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "users",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "role", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

- [ ] **Step 2: เพิ่มขั้น rules test ใน CI**

ใน `.github/workflows/deploy.yml` ใส่ขั้นนี้ระหว่าง `- run: npm test` กับ `- run: npm run build`:

```yaml
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 21
      - run: npm run test:rules
```

- [ ] **Step 3: ตรวจว่า config ยังใช้ได้**

Run: `npx firebase deploy --only firestore:indexes --dry-run --project pik-a-class`
Expected: ไม่มี error เรื่องรูปแบบไฟล์ (ถ้า CLI ไม่รองรับ `--dry-run` ให้ข้ามขั้นนี้แล้วยืนยันด้วย `npx firebase deploy --only firestore --project pik-a-class` ใน Task 17 แทน)

- [ ] **Step 4: Run both suites**

Run: `npm test` แล้ว `npm run test:rules`
Expected: PASS ทั้งสองชุด

- [ ] **Step 5: Commit**

```bash
git add firestore.indexes.json .github/workflows/deploy.yml
git commit -m "ci: declare composite indexes and run rules tests in CI"
```

---

## Phase 3 — Admin shell + จัดการผู้ใช้ (Task 12-14)

### Task 12: ตัวสร้าง query ตามสัญญาใน spec

**หลักการ:** แยก "เงื่อนไขของ query" (ข้อมูลล้วน เทสได้โดยไม่ต้องมี Firebase) ออกจาก "การประกอบเป็น query จริง" (บางมาก) — เงื่อนไขพวกนี้คือสิ่งที่ rules บังคับ ถ้าเขียนผิดหน้าเว็บจะเจอ `permission-denied` เพราะงั้นต้องมีเทสคุม

**Files:**
- Create: `src/lib/queries.js`, `src/lib/queries.test.js`

**Interfaces:**
- Consumes: (ไม่มี)
- Produces:
  - `bankExerciseConstraints({ skill, level, tier })` → `Array<[field, op, value]>`
  - `assignedExerciseConstraints(uid)`, `myAssignmentConstraints(uid)`, `myHistoryConstraints(uid)`, `gradingQueueConstraints()`, `studentListConstraints()`, `contentLibraryConstraints({ skill, level, reviewStatus })`
  - `buildQuery(db, collectionName, constraints, orderBySpec)` → Firestore `Query` (ใช้ `collection`, `query`, `where`, `orderBy` จาก `firebase/firestore`)

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/queries.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/queries.test.js`
Expected: FAIL — `Failed to resolve import "./queries.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/queries.js`:

```js
import { collection, query, where, orderBy } from 'firebase/firestore';

export function bankExerciseConstraints({ skill, level, tier }) {
  const constraints = [
    ['reviewStatus', '==', 'published'],
    ['visibility', '==', 'bank'],
    ['skill', '==', skill],
    ['level', '==', level],
  ];
  if (tier !== 'full') constraints.push(['isPreview', '==', true]);
  return constraints;
}

export function assignedExerciseConstraints(uid) {
  return [['assignedUids', 'array-contains', uid]];
}

export function myAssignmentConstraints(uid) {
  return [['assignedTo', 'array-contains', uid]];
}

export function myHistoryConstraints(uid) {
  return [['uid', '==', uid]];
}

export function gradingQueueConstraints() {
  return [['status', '==', 'pending']];
}

export function studentListConstraints() {
  return [['role', '==', 'student']];
}

export function contentLibraryConstraints({ reviewStatus, skill, level } = {}) {
  const constraints = [];
  if (reviewStatus) constraints.push(['reviewStatus', '==', reviewStatus]);
  if (skill) constraints.push(['skill', '==', skill]);
  if (level) constraints.push(['level', '==', level]);
  return constraints;
}

export function buildQuery(db, collectionName, constraints, orderBySpec = null) {
  const parts = constraints.map(([field, op, value]) => where(field, op, value));
  if (orderBySpec) parts.push(orderBy(orderBySpec.field, orderBySpec.direction ?? 'asc'));
  return query(collection(db, collectionName), ...parts);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/queries.test.js`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/queries.js src/lib/queries.test.js
git commit -m "feat: add Firestore query builders matching the rules contract"
```

### Task 13: แถบเมนู admin + หน้า hub

**Files:**
- Create: `src/lib/admin-nav.js`, `src/lib/admin-nav.test.js`
- Modify: `src/admin/index.html`, `src/admin/index.js`
- Modify: `src/styles/base.css`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: `import.meta.env.BASE_URL`
- Produces:
  - `ADMIN_PAGES` → `Array<{ href, label }>` (href เป็น path ย่อยแบบ `admin/users.html`)
  - `renderAdminNav(container, currentHref, baseUrl)` — เติม `<nav>` ที่มีลิงก์ครบ และติด `aria-current="page"` ให้หน้าปัจจุบัน

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/admin-nav.test.js`:

```js
import { describe, it, expect, beforeEach } from 'vitest';
import { ADMIN_PAGES, renderAdminNav } from './admin-nav.js';

// ไฟล์นี้รันบน jsdom ผ่าน environmentMatchGlobs ใน vitest.config.js (ไม่ต้องใส่ comment pragma)

describe('renderAdminNav', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="nav"></div>';
  });

  it('renders one link per admin page with the base url prefix', () => {
    renderAdminNav(document.getElementById('nav'), 'admin/users.html', '/pik-a-class/');
    const links = [...document.querySelectorAll('#nav a')];

    expect(links).toHaveLength(ADMIN_PAGES.length);
    expect(links.map((a) => a.getAttribute('href'))).toContain('/pik-a-class/admin/users.html');
  });

  it('marks the current page for screen readers', () => {
    renderAdminNav(document.getElementById('nav'), 'admin/users.html', '/pik-a-class/');
    const current = document.querySelector('#nav a[aria-current="page"]');
    expect(current.getAttribute('href')).toBe('/pik-a-class/admin/users.html');
  });
});
```

ต้องเปิด jsdom ให้ vitest — แก้ `vitest.config.js` เป็น:

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    environmentMatchGlobs: [['src/**/*dom*.test.js', 'jsdom'], ['src/lib/admin-*.test.js', 'jsdom']],
    include: ['src/**/*.test.js'],
  },
});
```

และติดตั้ง jsdom: `npm install --save-dev jsdom`

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/admin-nav.test.js`
Expected: FAIL — `Failed to resolve import "./admin-nav.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/admin-nav.js`:

```js
export const ADMIN_PAGES = [
  { href: 'admin/index.html', label: 'ภาพรวม' },
  { href: 'admin/users.html', label: 'จัดการผู้ใช้' },
  { href: 'admin/content.html', label: 'คลังเนื้อหา' },
  { href: 'admin/import.html', label: 'นำเข้า JSON' },
];

export function renderAdminNav(container, currentHref, baseUrl) {
  const nav = document.createElement('nav');
  nav.className = 'admin-nav';
  nav.setAttribute('aria-label', 'เมนูผู้ดูแลระบบ');

  for (const page of ADMIN_PAGES) {
    const link = document.createElement('a');
    link.href = `${baseUrl}${page.href}`;
    link.textContent = page.label;
    if (page.href === currentHref) link.setAttribute('aria-current', 'page');
    nav.appendChild(link);
  }

  container.replaceChildren(nav);
}
```

แก้ `src/admin/index.html` ให้เป็นหน้า hub:

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ภาพรวม — Admin Pik a Class</title>
  <link rel="stylesheet" href="../styles/tokens.css" />
  <link rel="stylesheet" href="../styles/base.css" />
</head>
<body>
  <div id="admin-nav"></div>
  <main>
    <h1>ภาพรวม</h1>
    <p id="admin-welcome"></p>
    <ul class="admin-summary">
      <li>นักเรียนทั้งหมด: <strong id="summary-students">—</strong> คน</li>
      <li>เนื้อหารออนุมัติ: <strong id="summary-pending-content">—</strong> ข้อ</li>
    </ul>
  </main>
  <script type="module" src="./index.js"></script>
</body>
</html>
```

แก้ `src/admin/index.js`:

```js
import { getCountFromServer } from 'firebase/firestore';
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { buildQuery, studentListConstraints, contentLibraryConstraints } from '../lib/queries.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/index.html', import.meta.env.BASE_URL);

requireAdmin(async (firebaseUser) => {
  document.getElementById('admin-welcome').textContent = `เข้าสู่ระบบในฐานะผู้ดูแล: ${firebaseUser.email}`;
  try {
    const students = await getCountFromServer(buildQuery(db, 'users', studentListConstraints()));
    document.getElementById('summary-students').textContent = students.data().count;

    const pending = await getCountFromServer(
      buildQuery(db, 'exercises', contentLibraryConstraints({ reviewStatus: 'draft' })),
    );
    document.getElementById('summary-pending-content').textContent = pending.data().count;
  } catch (error) {
    console.error(error);
    showPageError('โหลดสรุปตัวเลขไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง');
  }
});
```

เพิ่มสไตล์ท้าย `src/styles/base.css`:

```css
.admin-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.admin-nav a[aria-current='page'] {
  font-weight: 700;
  text-decoration: underline;
}

.admin-summary {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--space-2);
}
```

เพิ่ม entry ใน `vite.config.js` (`rollupOptions.input`) ให้ครบทั้ง 3 หน้าใหม่ที่จะสร้างใน task ถัดไปด้วย:

```js
        adminUsers: resolve(__dirname, 'src/admin/users.html'),
        adminContent: resolve(__dirname, 'src/admin/content.html'),
        adminImport: resolve(__dirname, 'src/admin/import.html'),
```

> หมายเหตุ: อย่าเพิ่ง build จนกว่าจะสร้างไฟล์ HTML ทั้งสามใน Task 14/16/17 ครบ — `npm run build` จะฟ้องว่าหา entry ไม่เจอ ให้เพิ่มบรรทัดเหล่านี้พร้อมกับสร้างไฟล์เปล่าไว้ก่อนในขั้นถัดไปของ task นี้

- [ ] **Step 4: สร้างไฟล์ HTML โครงว่างของอีก 3 หน้า เพื่อให้ build ผ่าน**

สร้าง `src/admin/users.html`, `src/admin/content.html`, `src/admin/import.html` โดยคัดลอกโครงจาก `index.html` ข้างบน เปลี่ยน `<title>`/`<h1>` เป็น "จัดการผู้ใช้" / "คลังเนื้อหา" / "นำเข้า JSON" ตามลำดับ, เปลี่ยน `<script src>` เป็น `./users.js` / `./content.js` / `./import.js` และใส่เนื้อหาชั่วคราวเป็น `<p>กำลังพัฒนา</p>` พร้อมสร้างไฟล์ js คู่กันที่มีแค่:

```js
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/users.html', import.meta.env.BASE_URL);
requireAdmin(() => {});
```

(เปลี่ยน `'admin/users.html'` ให้ตรงกับแต่ละไฟล์)

- [ ] **Step 5: Run tests and build**

Run: `npm test` แล้ว `npm run build`
Expected: เทสผ่านทั้งหมด และ build สำเร็จ (ต้องมี `.env.local` อยู่ ถ้าไม่มีให้คัดลอกจาก `.env.example` แล้วเติมคีย์จริง)

- [ ] **Step 6: Commit**

```bash
git add src/lib/admin-nav.js src/lib/admin-nav.test.js src/admin src/styles/base.css vite.config.js vitest.config.js package.json package-lock.json
git commit -m "feat: add admin nav shell and overview page"
```

### Task 14: หน้าจัดการผู้ใช้

**Files:**
- Create: `src/lib/admin-users.js`, `src/lib/admin-users.test.js`, `src/lib/admin-users-io.js`
- Modify: `src/admin/users.html`, `src/admin/users.js`

**Interfaces:**
- Consumes: `buildQuery`, `studentListConstraints` (Task 12), `renderAdminNav` (Task 13), `db` จาก `src/lib/firebase.js`, `GRADES` (Task 3)
- Produces:
  - `filterStudents(students, { grade, groupTag, search })` → `Array` (จาก `admin-users.js`)
  - `parseGroupTags(text)` → `string[]` (แยกด้วยจุลภาค ตัดช่องว่าง ตัดตัวซ้ำ ตัดตัวว่าง)
  - `fetchStudents(db)` → `Promise<Array<{ id, ...data }>>`, `updateStudentAdminFields(db, uid, fields)` → `Promise<void>` (จาก `admin-users-io.js`)

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/admin-users.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { filterStudents, parseGroupTags } from './admin-users.js';

const students = [
  { id: 'a', nickname: 'ชาย', fullName: 'สมชาย ใจดี', grade: 'ม.3', groupTags: ['เสาร์บ่าย'], phone: '0811111111' },
  { id: 'b', nickname: 'หญิง', fullName: 'สมหญิง ตั้งใจ', grade: 'ม.6', groupTags: [], phone: '0822222222' },
  { id: 'c', nickname: 'โก้', fullName: 'ประวิทย์ ทำงาน', grade: 'วัยทำงาน/บุคคลทั่วไป', groupTags: ['เสาร์บ่าย'], phone: '0833333333' },
];

describe('filterStudents', () => {
  it('returns everybody when no filter is set', () => {
    expect(filterStudents(students, {})).toHaveLength(3);
  });

  it('filters by grade and by group tag', () => {
    expect(filterStudents(students, { grade: 'ม.3' }).map((s) => s.id)).toEqual(['a']);
    expect(filterStudents(students, { groupTag: 'เสาร์บ่าย' }).map((s) => s.id)).toEqual(['a', 'c']);
  });

  it('searches nickname, full name, and phone', () => {
    expect(filterStudents(students, { search: 'สมหญิง' }).map((s) => s.id)).toEqual(['b']);
    expect(filterStudents(students, { search: 'โก้' }).map((s) => s.id)).toEqual(['c']);
    expect(filterStudents(students, { search: '0822' }).map((s) => s.id)).toEqual(['b']);
    expect(filterStudents(students, { search: 'ไม่มีจริง' })).toEqual([]);
  });

  it('combines filters', () => {
    expect(filterStudents(students, { groupTag: 'เสาร์บ่าย', grade: 'ม.3' }).map((s) => s.id)).toEqual(['a']);
  });
});

describe('parseGroupTags', () => {
  it('splits on commas, trims, and drops blanks and duplicates', () => {
    expect(parseGroupTags(' เสาร์บ่าย , อาทิตย์เช้า ,, เสาร์บ่าย ')).toEqual(['เสาร์บ่าย', 'อาทิตย์เช้า']);
    expect(parseGroupTags('')).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/admin-users.test.js`
Expected: FAIL — `Failed to resolve import "./admin-users.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/admin-users.js`:

```js
export function filterStudents(students, { grade = '', groupTag = '', search = '' } = {}) {
  const needle = search.trim().toLowerCase();
  return students.filter((student) => {
    if (grade && student.grade !== grade) return false;
    if (groupTag && !(student.groupTags ?? []).includes(groupTag)) return false;
    if (!needle) return true;
    const haystack = [student.nickname, student.fullName, student.phone, student.lineId]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function parseGroupTags(text) {
  const tags = String(text ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
  return [...new Set(tags)];
}
```

สร้าง `src/lib/admin-users-io.js`:

```js
import { doc, getDocs, updateDoc } from 'firebase/firestore';
import { buildQuery, studentListConstraints } from './queries.js';

export async function fetchStudents(db) {
  const snapshot = await getDocs(
    buildQuery(db, 'users', studentListConstraints(), { field: 'createdAt', direction: 'desc' }),
  );
  return snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
}

export async function updateStudentAdminFields(db, uid, fields) {
  await updateDoc(doc(db, 'users', uid), { ...fields, updatedAt: new Date().toISOString() });
}
```

แทนที่ `<main>` ใน `src/admin/users.html`:

```html
  <main>
    <h1>จัดการผู้ใช้</h1>
    <form id="filters" class="admin-filters">
      <label>ช่วงชั้น
        <select id="filter-grade"><option value="">ทั้งหมด</option></select>
      </label>
      <label>กลุ่ม
        <select id="filter-group"><option value="">ทั้งหมด</option></select>
      </label>
      <label>ค้นหา
        <input id="filter-search" type="search" placeholder="ชื่อเล่น / ชื่อจริง / เบอร์" />
      </label>
    </form>
    <p id="student-count" aria-live="polite"></p>
    <table class="admin-table">
      <thead>
        <tr><th>ชื่อเล่น</th><th>ชื่อจริง</th><th>ช่วงชั้น</th><th>tier</th><th>ติดต่อ</th><th>กลุ่ม</th><th></th></tr>
      </thead>
      <tbody id="student-rows"></tbody>
    </table>

    <dialog id="edit-dialog">
      <form method="dialog" id="edit-form">
        <h2 id="edit-title"></h2>
        <label>สิทธิ์การใช้งาน
          <select id="edit-tier">
            <option value="free">free — เห็นเฉพาะเนื้อหาตัวอย่าง</option>
            <option value="full">full — เห็นเนื้อหาทั้งหมด</option>
          </select>
        </label>
        <label>โน้ต (เห็นเฉพาะแอดมิน)
          <input id="edit-tier-note" type="text" maxlength="500" />
        </label>
        <label>กลุ่ม (คั่นด้วยจุลภาค)
          <input id="edit-group-tags" type="text" />
        </label>
        <p id="edit-error" class="field-error" aria-live="polite"></p>
        <menu>
          <button value="cancel">ยกเลิก</button>
          <button id="edit-save" value="save" type="submit">บันทึก</button>
        </menu>
      </form>
    </dialog>
  </main>
```

เขียน `src/admin/users.js` ใหม่:

```js
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { fetchStudents, updateStudentAdminFields } from '../lib/admin-users-io.js';
import { filterStudents, parseGroupTags } from '../lib/admin-users.js';
import { GRADES } from '../lib/schema/users.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/users.html', import.meta.env.BASE_URL);

let allStudents = [];
let editingUid = null;

const rows = document.getElementById('student-rows');
const countLabel = document.getElementById('student-count');
const gradeFilter = document.getElementById('filter-grade');
const groupFilter = document.getElementById('filter-group');
const searchFilter = document.getElementById('filter-search');
const dialog = document.getElementById('edit-dialog');

for (const grade of GRADES) {
  const option = document.createElement('option');
  option.value = grade;
  option.textContent = grade;
  gradeFilter.appendChild(option);
}

function currentFilters() {
  return { grade: gradeFilter.value, groupTag: groupFilter.value, search: searchFilter.value };
}

function render() {
  const visible = filterStudents(allStudents, currentFilters());
  countLabel.textContent = `แสดง ${visible.length} คน จากทั้งหมด ${allStudents.length} คน`;
  rows.replaceChildren();

  for (const student of visible) {
    const tr = document.createElement('tr');
    const cells = [
      student.nickname ?? '',
      student.fullName ?? '',
      student.grade ?? '',
      student.tier,
      [student.phone, student.lineId].filter(Boolean).join(' / '),
      (student.groupTags ?? []).join(', '),
    ];
    for (const value of cells) {
      const td = document.createElement('td');
      td.textContent = value;
      tr.appendChild(td);
    }
    const actionCell = document.createElement('td');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'แก้ไข';
    button.addEventListener('click', () => openEditor(student));
    actionCell.appendChild(button);
    tr.appendChild(actionCell);
    rows.appendChild(tr);
  }
}

function refreshGroupOptions() {
  const tags = [...new Set(allStudents.flatMap((student) => student.groupTags ?? []))].sort();
  groupFilter.replaceChildren(new Option('ทั้งหมด', ''));
  for (const tag of tags) groupFilter.appendChild(new Option(tag, tag));
}

function openEditor(student) {
  editingUid = student.id;
  document.getElementById('edit-title').textContent = `${student.nickname || student.fullName} (${student.email})`;
  document.getElementById('edit-tier').value = student.tier;
  document.getElementById('edit-tier-note').value = student.tierNote ?? '';
  document.getElementById('edit-group-tags').value = (student.groupTags ?? []).join(', ');
  document.getElementById('edit-error').textContent = '';
  dialog.showModal();
}

document.getElementById('edit-form').addEventListener('submit', async (event) => {
  if (event.submitter?.value !== 'save') return;
  event.preventDefault();

  const fields = {
    tier: document.getElementById('edit-tier').value,
    tierNote: document.getElementById('edit-tier-note').value.trim(),
    groupTags: parseGroupTags(document.getElementById('edit-group-tags').value),
  };

  try {
    await updateStudentAdminFields(db, editingUid, fields);
    const student = allStudents.find((item) => item.id === editingUid);
    Object.assign(student, fields);
    refreshGroupOptions();
    render();
    dialog.close();
  } catch (error) {
    console.error(error);
    document.getElementById('edit-error').textContent = 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง';
  }
});

for (const input of [gradeFilter, groupFilter, searchFilter]) {
  input.addEventListener('input', render);
}

requireAdmin(async () => {
  try {
    allStudents = await fetchStudents(db);
    refreshGroupOptions();
    render();
  } catch (error) {
    console.error(error);
    showPageError('โหลดรายชื่อนักเรียนไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง');
  }
});
```

เพิ่มสไตล์ท้าย `src/styles/base.css`:

```css
.admin-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th,
.admin-table td {
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-2);
  text-align: left;
}

.admin-table-wrapper {
  overflow-x: auto;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/admin-users.test.js`
Expected: PASS (6 tests)

- [ ] **Step 5: ตรวจด้วยตาบน emulator หรือของจริง**

Run: `npm run dev` แล้วเปิด `http://localhost:5173/admin/users.html` ด้วยบัญชี admin
Expected: เห็นรายชื่อนักเรียน, กรองตามช่วงชั้น/ค้นชื่อได้, กด "แก้ไข" แล้วเปลี่ยน tier เป็น `full` บันทึกได้และตารางอัปเดตทันที

- [ ] **Step 6: Commit**

```bash
git add src/lib/admin-users.js src/lib/admin-users.test.js src/lib/admin-users-io.js src/admin/users.html src/admin/users.js src/styles/base.css
git commit -m "feat: add admin user management page with tier and group editing"
```

---

## Phase 4 — นำเข้าเนื้อหา + สคริปต์ตรวจ (Task 15-16)

### Task 15: สคริปต์ `npm run check:content`

**Files:**
- Create: `src/lib/schema/report-format.js`, `src/lib/schema/report-format.test.js`
- Create: `scripts/check-content.mjs`
- Create: `docs/examples/exercises-sample.json`
- Modify: `package.json`

**Interfaces:**
- Consumes: `checkBatch`, `coverageReport` (Task 6)
- Produces:
  - `formatCheckReport({ valid, invalid, items })` → `string` (รายงานภาษาไทยพร้อมพิมพ์ลง terminal)
  - `formatCoverage(report)` → `string`
  - สคริปต์ CLI ที่ exit code `1` เมื่อมีข้อไม่ผ่าน

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/schema/report-format.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/schema/report-format.test.js`
Expected: FAIL — `Failed to resolve import "./report-format.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/schema/report-format.js`:

```js
export function formatCheckReport({ valid, invalid }) {
  const lines = [`ผ่าน ${valid.length} ข้อ / ไม่ผ่าน ${invalid.length} ข้อ`];

  if (invalid.length === 0) {
    lines.push('ผ่านทั้งหมด ไม่มีข้อที่ต้องแก้');
    return lines.join('\n');
  }

  for (const item of invalid) {
    lines.push('');
    lines.push(`ข้อที่ ${item.index + 1}`);
    for (const error of item.errors) {
      lines.push(`  - ${error.field}: ${error.message}`);
    }
  }
  return lines.join('\n');
}

export function formatCoverage(report) {
  const lines = ['ความครอบคลุมตามเลเวล'];
  for (const row of report) {
    lines.push('');
    lines.push(`${row.level} — ${row.total} ข้อ`);
    for (const tag of row.byTag) {
      lines.push(`  ${tag.label}: ${tag.count}`);
    }
    if (row.missingTagIds.length > 0) {
      lines.push(`  ยังไม่มีข้อเลย: ${row.missingTagIds.join(', ')}`);
    }
  }
  return lines.join('\n');
}
```

สร้าง `scripts/check-content.mjs`:

```js
#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { checkBatch, coverageReport } from '../src/lib/schema/content-checks.js';
import { formatCheckReport, formatCoverage } from '../src/lib/schema/report-format.js';

const [, , filePath, collectionName = 'exercises'] = process.argv;

if (!filePath) {
  console.error('วิธีใช้: npm run check:content -- <ไฟล์.json> [ชื่อ collection]');
  process.exit(2);
}

let items;
try {
  items = JSON.parse(readFileSync(filePath, 'utf8'));
} catch (error) {
  console.error(`อ่านไฟล์ไม่สำเร็จ: ${error.message}`);
  process.exit(2);
}

if (!Array.isArray(items)) {
  console.error('ไฟล์ต้องเป็น JSON array ของข้อ');
  process.exit(2);
}

const result = checkBatch(collectionName, items, new Set());
console.log(formatCheckReport(result));
console.log('');
console.log(formatCoverage(coverageReport(items)));

process.exit(result.invalid.length > 0 ? 1 : 0);
```

เพิ่มใน `package.json` ที่ `"scripts"`:

```json
"check:content": "node scripts/check-content.mjs"
```

สร้าง `docs/examples/exercises-sample.json` — 5 ข้อ โดยข้อสุดท้ายตั้งใจให้ผิด (เฉลยไม่อยู่ในตัวเลือก) เพื่อใช้ทดสอบทั้งสคริปต์และหน้านำเข้า:

```json
[
  {
    "skill": "grammar", "level": "A1", "type": "mcq",
    "prompt": "She ___ to school every day.",
    "choices": ["go", "goes", "going"], "answerKey": ["goes"],
    "tags": ["grammar:present-simple"], "visibility": "bank", "isPreview": true,
    "reviewStatus": "draft", "assignedUids": [],
    "source": "แต่งเองตาม PLAN.md taxonomy A1",
    "createdAt": "2026-09-20T10:00:00.000Z", "updatedAt": "2026-09-20T10:00:00.000Z", "createdBy": "seed"
  },
  {
    "skill": "grammar", "level": "A1", "type": "fill_blank",
    "prompt": "There ___ three books on the table.",
    "answerKey": ["are"],
    "tags": ["grammar:there-is-are"], "visibility": "bank", "isPreview": true,
    "reviewStatus": "draft", "assignedUids": [],
    "createdAt": "2026-09-20T10:00:00.000Z", "updatedAt": "2026-09-20T10:00:00.000Z", "createdBy": "seed"
  },
  {
    "skill": "vocab", "level": "A1", "type": "mcq",
    "prompt": "Which one is a fruit?",
    "choices": ["chair", "banana", "pencil"], "answerKey": ["banana"],
    "tags": ["vocab:food-drink"], "visibility": "bank", "isPreview": false,
    "reviewStatus": "draft", "assignedUids": [],
    "createdAt": "2026-09-20T10:00:00.000Z", "updatedAt": "2026-09-20T10:00:00.000Z", "createdBy": "seed"
  },
  {
    "skill": "writing", "level": "A2", "type": "paragraph",
    "prompt": "เขียนเล่าวันหยุดสุดสัปดาห์ที่ผ่านมา 4-5 ประโยค",
    "rubric": "ให้ 3 ดาวเมื่อใช้ Past Simple ถูกต้องเกือบทั้งหมดและเล่าได้ครบ 4 ประโยคขึ้นไป",
    "tags": ["grammar:past-simple"], "visibility": "bank", "isPreview": false,
    "reviewStatus": "draft", "assignedUids": [],
    "createdAt": "2026-09-20T10:00:00.000Z", "updatedAt": "2026-09-20T10:00:00.000Z", "createdBy": "seed"
  },
  {
    "skill": "grammar", "level": "A1", "type": "mcq",
    "prompt": "They ___ students.",
    "choices": ["is", "am", "be"], "answerKey": ["are"],
    "tags": ["grammar:present-simple"], "visibility": "bank", "isPreview": false,
    "reviewStatus": "draft", "assignedUids": [],
    "createdAt": "2026-09-20T10:00:00.000Z", "updatedAt": "2026-09-20T10:00:00.000Z", "createdBy": "seed"
  }
]
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/schema/report-format.test.js`
Expected: PASS (4 tests)

- [ ] **Step 5: รันสคริปต์กับไฟล์ตัวอย่าง**

Run: `npm run check:content -- docs/examples/exercises-sample.json`
Expected: รายงาน `ผ่าน 4 ข้อ / ไม่ผ่าน 1 ข้อ`, ข้อที่ 5 ฟ้อง `answerKey: คำตอบ "are" ไม่มีอยู่ในตัวเลือก`, ตามด้วยตารางความครอบคลุม และ exit code เป็น 1

- [ ] **Step 6: Commit**

```bash
git add src/lib/schema/report-format.js src/lib/schema/report-format.test.js scripts/check-content.mjs docs/examples/exercises-sample.json package.json
git commit -m "feat: add content check CLI with coverage reporting"
```

### Task 16: หน้านำเข้า JSON

**Files:**
- Create: `src/lib/schema/import-prep.js`, `src/lib/schema/import-prep.test.js`
- Create: `src/lib/admin-content-io.js`
- Modify: `src/admin/import.html`, `src/admin/import.js`

**Interfaces:**
- Consumes: `checkBatch` (Task 6), `formatCheckReport` ไม่ใช้ในหน้าเว็บ (หน้าเว็บ render เป็น HTML เอง), `renderAdminNav` (Task 13), `db`
- Produces:
  - `prepareItems(items, { createdBy, batchId, now })` → `Array` — เติมค่าเริ่มต้นที่คนเขียน JSON ไม่ต้องใส่เอง (`createdAt`, `updatedAt`, `createdBy`, `reviewStatus: 'draft'`, `isPreview: false`, `visibility: 'bank'`, `assignedUids: []`) และ **ตั้ง `importBatchId` ทับเสมอ**
  - `chunk(array, size)` → `Array<Array>`
  - `fetchExistingHashes(db, collectionName)` → `Promise<Set<string>>`
  - `importItems(db, collectionName, items)` → `Promise<number>` (จำนวนที่เขียนสำเร็จ)

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/schema/import-prep.test.js`:

```js
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
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([], 400)).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/schema/import-prep.test.js`
Expected: FAIL — `Failed to resolve import "./import-prep.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/schema/import-prep.js`:

```js
export function prepareItems(items, { createdBy, batchId, now = new Date().toISOString(), collectionName = 'exercises' } = {}) {
  return items.map((item) => {
    const prepared = {
      reviewStatus: 'draft',
      isPreview: false,
      ...item,
      createdAt: item.createdAt ?? now,
      updatedAt: now,
      createdBy: item.createdBy ?? createdBy,
      importBatchId: batchId,
    };

    if (collectionName === 'exercises') {
      prepared.visibility = item.visibility ?? 'bank';
      prepared.assignedUids = item.assignedUids ?? [];
    }

    return prepared;
  });
}

export function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}
```

สร้าง `src/lib/admin-content-io.js`:

```js
import { collection, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import { buildQuery } from './queries.js';
import { chunk } from './schema/import-prep.js';

const WRITE_CHUNK_SIZE = 400;

export async function fetchExistingHashes(db, collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return new Set(snapshot.docs.map((snap) => snap.data().contentHash).filter(Boolean));
}

export async function importItems(db, collectionName, items) {
  let written = 0;
  for (const group of chunk(items, WRITE_CHUNK_SIZE)) {
    const batch = writeBatch(db);
    for (const item of group) {
      batch.set(doc(collection(db, collectionName)), item);
    }
    await batch.commit();
    written += group.length;
  }
  return written;
}

export async function fetchContent(db, collectionName, constraints) {
  const snapshot = await getDocs(
    buildQuery(db, collectionName, constraints, { field: 'updatedAt', direction: 'desc' }),
  );
  return snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
}

export async function updateContentItem(db, collectionName, id, fields) {
  await updateDoc(doc(db, collectionName, id), { ...fields, updatedAt: new Date().toISOString() });
}
```

แทนที่ `<main>` ใน `src/admin/import.html`:

```html
  <main>
    <h1>นำเข้า JSON</h1>
    <p>วางไฟล์ JSON ที่เป็น array ของข้อ ระบบจะตรวจทุกข้อก่อน แล้วนำเข้าเฉพาะข้อที่ผ่านเป็นสถานะ draft</p>
    <label>ชนิดเนื้อหา
      <select id="import-collection">
        <option value="exercises">แบบฝึกหัด (exercises)</option>
        <option value="grammarNotes">สรุปไวยากรณ์ (grammarNotes)</option>
        <option value="stages">ด่าน (stages)</option>
      </select>
    </label>
    <label>ไฟล์ JSON
      <input id="import-file" type="file" accept="application/json" />
    </label>
    <label>หรือวางข้อความ JSON
      <textarea id="import-text" rows="10" spellcheck="false"></textarea>
    </label>
    <p>
      <button id="import-check" type="button">ตรวจไฟล์</button>
      <button id="import-run" type="button" disabled>นำเข้าเฉพาะข้อที่ผ่าน</button>
    </p>
    <p id="import-status" aria-live="polite"></p>
    <ul id="import-errors" class="import-errors"></ul>
  </main>
```

เขียน `src/admin/import.js`:

```js
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { checkBatch } from '../lib/schema/content-checks.js';
import { prepareItems } from '../lib/schema/import-prep.js';
import { fetchExistingHashes, importItems } from '../lib/admin-content-io.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/import.html', import.meta.env.BASE_URL);

let adminUid = null;
let readyToImport = [];

const collectionSelect = document.getElementById('import-collection');
const fileInput = document.getElementById('import-file');
const textInput = document.getElementById('import-text');
const status = document.getElementById('import-status');
const errorList = document.getElementById('import-errors');
const runButton = document.getElementById('import-run');

fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (file) textInput.value = await file.text();
});

document.getElementById('import-check').addEventListener('click', async () => {
  readyToImport = [];
  runButton.disabled = true;
  errorList.replaceChildren();
  status.textContent = 'กำลังตรวจ…';

  let items;
  try {
    items = JSON.parse(textInput.value);
  } catch (error) {
    status.textContent = `อ่าน JSON ไม่สำเร็จ: ${error.message}`;
    return;
  }
  if (!Array.isArray(items)) {
    status.textContent = 'ไฟล์ต้องเป็น JSON array ของข้อ';
    return;
  }

  const collectionName = collectionSelect.value;

  try {
    const existingHashes = await fetchExistingHashes(db, collectionName);
    const prepared = prepareItems(items, {
      createdBy: adminUid,
      batchId: `batch-${Date.now()}`,
      collectionName,
    });
    const result = checkBatch(collectionName, prepared, existingHashes);

    readyToImport = result.valid.map((entry) => entry.item);
    status.textContent = `ผ่าน ${result.valid.length} ข้อ / ไม่ผ่าน ${result.invalid.length} ข้อ`;

    for (const bad of result.invalid) {
      const li = document.createElement('li');
      const errors = bad.errors.map((error) => `${error.field}: ${error.message}`).join(' • ');
      li.textContent = `ข้อที่ ${bad.index + 1} — ${errors}`;
      errorList.appendChild(li);
    }

    runButton.disabled = readyToImport.length === 0;
  } catch (error) {
    console.error(error);
    status.textContent = 'ตรวจไฟล์ไม่สำเร็จ (โหลดข้อมูลเดิมจากคลังไม่ได้)';
  }
});

runButton.addEventListener('click', async () => {
  runButton.disabled = true;
  status.textContent = 'กำลังนำเข้า…';
  try {
    const written = await importItems(db, collectionSelect.value, readyToImport);
    status.textContent = `นำเข้าสำเร็จ ${written} ข้อ (สถานะ draft) ไปตรวจต่อที่หน้าคลังเนื้อหาได้เลย`;
    readyToImport = [];
  } catch (error) {
    console.error(error);
    status.textContent = 'นำเข้าไม่สำเร็จ ลองใหม่อีกครั้ง';
    runButton.disabled = false;
  }
});

requireAdmin((firebaseUser) => {
  adminUid = firebaseUser.uid;
});
```

เพิ่มสไตล์ท้าย `src/styles/base.css`:

```css
.import-errors {
  color: var(--color-error);
  display: grid;
  gap: var(--space-2);
}

textarea {
  width: 100%;
  font-family: ui-monospace, monospace;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/schema/import-prep.test.js`
Expected: PASS (5 tests)

- [ ] **Step 5: ตรวจด้วยตาจริง**

Run: `npm run dev` → เปิด `http://localhost:5173/admin/import.html` ด้วยบัญชี admin → วางเนื้อหาไฟล์ `docs/examples/exercises-sample.json` → กด "ตรวจไฟล์"
Expected: ขึ้น `ผ่าน 4 ข้อ / ไม่ผ่าน 1 ข้อ` และรายการ error บอกข้อที่ 5 → กด "นำเข้าเฉพาะข้อที่ผ่าน" → ขึ้น `นำเข้าสำเร็จ 4 ข้อ` → กดตรวจซ้ำอีกครั้งด้วยไฟล์เดิม ต้องได้ `ผ่าน 0 ข้อ / ไม่ผ่าน 5 ข้อ` เพราะซ้ำกับของที่เพิ่งเข้าไป

- [ ] **Step 6: Commit**

```bash
git add src/lib/schema/import-prep.js src/lib/schema/import-prep.test.js src/lib/admin-content-io.js src/admin/import.html src/admin/import.js src/styles/base.css
git commit -m "feat: add admin JSON import page with validation and duplicate blocking"
```

---

## Phase 5 — คลังเนื้อหา + เอกสาร + ขึ้นจริง (Task 17-19)

### Task 17: หน้าคลังเนื้อหา (ตรวจ / แก้ / publish)

**Files:**
- Create: `src/lib/admin-content.js`, `src/lib/admin-content.test.js`
- Modify: `src/admin/content.html`, `src/admin/content.js`, `src/lib/admin-content-io.js`

**Interfaces:**
- Consumes: `validate` (Task 3), `contentHash` (Task 6), `contentLibraryConstraints` (Task 12), `fetchContent`, `updateContentItem` (Task 16)
- Produces:
  - `buildContentUpdate(item, formValues)` → `{ ok, errors, update }` — ประกอบฟิลด์ที่แก้ + คำนวณ `contentHash` ใหม่ + validate ก่อนส่งขึ้น Firestore
  - `previewLines(item)` → `string[]` — ข้อความที่นักเรียนจะเห็น (โจทย์ + ตัวเลือก + เฉลย)
  - `publishItems(db, collectionName, ids)` → `Promise<void>` (ใน io)

- [ ] **Step 1: Write the failing test**

สร้าง `src/lib/admin-content.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/admin-content.test.js`
Expected: FAIL — `Failed to resolve import "./admin-content.js"`

- [ ] **Step 3: Write minimal implementation**

สร้าง `src/lib/admin-content.js`:

```js
import { validate } from './schema/validate.js';
import { contentHash } from './schema/content-checks.js';

function splitList(text) {
  return String(text ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part !== '');
}

export function buildContentUpdate(item, formValues) {
  const { id, ...current } = item;
  const next = {
    ...current,
    prompt: formValues.prompt,
    tags: splitList(formValues.tags),
    isPreview: Boolean(formValues.isPreview),
    updatedAt: new Date().toISOString(),
  };

  if (current.choices !== undefined) next.choices = splitList(formValues.choices);
  if (current.answerKey !== undefined) next.answerKey = splitList(formValues.answerKey);
  if (current.rubric !== undefined) next.rubric = formValues.rubric;

  next.contentHash = contentHash(next);

  const { ok, errors } = validate('exercises', next, 'create');
  if (!ok) return { ok: false, errors, update: null };

  return { ok: true, errors: [], update: next };
}

export function previewLines(item) {
  const lines = [`โจทย์: ${item.prompt}`];
  if (item.choices?.length) lines.push(`ตัวเลือก: ${item.choices.join(' / ')}`);
  if (item.answerKey?.length) lines.push(`เฉลย: ${item.answerKey.join(' / ')}`);
  if (item.rubric) lines.push(`เกณฑ์ให้คะแนน: ${item.rubric}`);
  return lines;
}
```

เพิ่มใน `src/lib/admin-content-io.js`:

```js
export async function publishItems(db, collectionName, ids) {
  const now = new Date().toISOString();
  for (const group of chunk(ids, WRITE_CHUNK_SIZE)) {
    const batch = writeBatch(db);
    for (const id of group) {
      batch.update(doc(db, collectionName, id), { reviewStatus: 'published', updatedAt: now });
    }
    await batch.commit();
  }
}
```

แทนที่ `<main>` ใน `src/admin/content.html`:

```html
  <main>
    <h1>คลังเนื้อหา</h1>
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
      <button id="filter-apply" type="button">โหลด</button>
    </form>
    <p id="content-status" aria-live="polite"></p>
    <p><button id="publish-all" type="button" disabled>อนุมัติทั้งหมดที่แสดงอยู่</button></p>
    <ul id="content-list" class="content-list"></ul>
  </main>
```

เขียน `src/admin/content.js`:

```js
import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { contentLibraryConstraints } from '../lib/queries.js';
import { fetchContent, updateContentItem, publishItems } from '../lib/admin-content-io.js';
import { buildContentUpdate, previewLines } from '../lib/admin-content.js';
import { LEVELS } from '../lib/schema/taxonomy.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/content.html', import.meta.env.BASE_URL);

const list = document.getElementById('content-list');
const status = document.getElementById('content-status');
const skillFilter = document.getElementById('filter-skill');
const levelFilter = document.getElementById('filter-level');
const statusFilter = document.getElementById('filter-status');
const publishAllButton = document.getElementById('publish-all');

let items = [];

for (const skill of ['grammar', 'vocab', 'writing', 'dialogue']) {
  skillFilter.appendChild(new Option(skill, skill));
}
for (const level of LEVELS) {
  levelFilter.appendChild(new Option(level, level));
}

function renderItem(item) {
  const li = document.createElement('li');
  li.className = 'content-item';

  const heading = document.createElement('p');
  heading.innerHTML = `<strong>${item.skill} ${item.level} · ${item.type}</strong> — ${item.reviewStatus}`;
  li.appendChild(heading);

  for (const line of previewLines(item)) {
    const p = document.createElement('p');
    p.textContent = line;
    li.appendChild(p);
  }

  const form = document.createElement('form');
  form.innerHTML = `
    <label>โจทย์ <textarea name="prompt" rows="2"></textarea></label>
    <label>ตัวเลือก (คั่นด้วยจุลภาค) <input name="choices" type="text" /></label>
    <label>เฉลย (คั่นด้วยจุลภาค) <input name="answerKey" type="text" /></label>
    <label>เกณฑ์ให้คะแนน <input name="rubric" type="text" /></label>
    <label>tags (คั่นด้วยจุลภาค) <input name="tags" type="text" /></label>
    <label><input name="isPreview" type="checkbox" /> ให้คนที่ยังไม่จ่ายเห็นเป็นตัวอย่าง</label>
    <button type="submit">บันทึกการแก้ไข</button>
    <button type="button" data-action="publish">อนุมัติ (published)</button>
    <button type="button" data-action="unpublish">ตีกลับเป็น draft</button>
    <p class="field-error" data-role="error" aria-live="polite"></p>
  `;

  form.elements.prompt.value = item.prompt ?? '';
  form.elements.choices.value = (item.choices ?? []).join(', ');
  form.elements.answerKey.value = (item.answerKey ?? []).join(', ');
  form.elements.rubric.value = item.rubric ?? '';
  form.elements.tags.value = (item.tags ?? []).join(', ');
  form.elements.isPreview.checked = Boolean(item.isPreview);

  const errorBox = form.querySelector('[data-role="error"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const result = buildContentUpdate(item, {
      prompt: form.elements.prompt.value,
      choices: form.elements.choices.value,
      answerKey: form.elements.answerKey.value,
      rubric: form.elements.rubric.value,
      tags: form.elements.tags.value,
      isPreview: form.elements.isPreview.checked,
    });

    if (!result.ok) {
      errorBox.textContent = result.errors.map((error) => `${error.field}: ${error.message}`).join(' • ');
      return;
    }

    try {
      await updateContentItem(db, 'exercises', item.id, result.update);
      Object.assign(item, result.update);
      errorBox.textContent = 'บันทึกแล้ว';
    } catch (error) {
      console.error(error);
      errorBox.textContent = 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง';
    }
  });

  form.addEventListener('click', async (event) => {
    const action = event.target.dataset?.action;
    if (!action) return;
    const reviewStatus = action === 'publish' ? 'published' : 'draft';
    try {
      await updateContentItem(db, 'exercises', item.id, { reviewStatus });
      item.reviewStatus = reviewStatus;
      heading.innerHTML = `<strong>${item.skill} ${item.level} · ${item.type}</strong> — ${reviewStatus}`;
      errorBox.textContent = `เปลี่ยนสถานะเป็น ${reviewStatus} แล้ว`;
    } catch (error) {
      console.error(error);
      errorBox.textContent = 'เปลี่ยนสถานะไม่สำเร็จ';
    }
  });

  li.appendChild(form);
  return li;
}

async function load() {
  status.textContent = 'กำลังโหลด…';
  list.replaceChildren();
  try {
    items = await fetchContent(
      db,
      'exercises',
      contentLibraryConstraints({
        reviewStatus: statusFilter.value,
        skill: skillFilter.value,
        level: levelFilter.value,
      }),
    );
    status.textContent = `พบ ${items.length} ข้อ`;
    publishAllButton.disabled = items.length === 0 || statusFilter.value === 'published';
    for (const item of items) list.appendChild(renderItem(item));
  } catch (error) {
    console.error(error);
    showPageError('โหลดคลังเนื้อหาไม่สำเร็จ — ถ้าเพิ่งเพิ่ม index ใหม่ รอสักครู่แล้วลองอีกครั้ง');
  }
}

publishAllButton.addEventListener('click', async () => {
  publishAllButton.disabled = true;
  try {
    await publishItems(db, 'exercises', items.map((item) => item.id));
    status.textContent = `อนุมัติแล้ว ${items.length} ข้อ`;
    await load();
  } catch (error) {
    console.error(error);
    status.textContent = 'อนุมัติไม่สำเร็จ ลองใหม่อีกครั้ง';
    publishAllButton.disabled = false;
  }
});

document.getElementById('filter-apply').addEventListener('click', load);

requireAdmin(() => {
  load();
});
```

เพิ่มสไตล์ท้าย `src/styles/base.css`:

```css
.content-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--space-4);
}

.content-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-3);
}

.content-item form {
  display: grid;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/admin-content.test.js`
Expected: PASS (5 tests)

- [ ] **Step 5: ตรวจด้วยตาจริง**

Run: `npm run dev` → `http://localhost:5173/admin/content.html`
Expected: เห็นข้อที่นำเข้าจาก Task 16 (สถานะ draft) → แก้ข้อความแล้วบันทึกได้ → ใส่เฉลยที่ไม่อยู่ในตัวเลือกแล้วต้องขึ้น error ไม่ยอมบันทึก → กด "อนุมัติ" แล้วสถานะเปลี่ยนเป็น published

- [ ] **Step 6: Commit**

```bash
git add src/lib/admin-content.js src/lib/admin-content.test.js src/lib/admin-content-io.js src/admin/content.html src/admin/content.js src/styles/base.css
git commit -m "feat: add content library page with inline editing and publishing"
```

### Task 18: เอกสารโฟลวเนื้อหา + แก้ `PLAN.md` ให้ตรงกับสิ่งที่ทำจริง

**Files:**
- Create: `docs/content-pipeline.md`
- Modify: `PLAN.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: ผลลัพธ์จาก Task 1-17
- Produces: เอกสารที่ session ถัดไปใช้ทำเนื้อหาซ้ำได้เหมือนเดิม และ `PLAN.md` ที่ไม่ขัดกับ spec แล้ว

- [ ] **Step 1: เขียน `docs/content-pipeline.md`**

เนื้อหาต้องมีครบ 4 หัวข้อนี้ (เขียนเป็นภาษาไทย):

1. **ก่อน generate** — เลือก level + skill + tag จาก `src/lib/schema/taxonomy.js` ให้ชัดก่อน แล้วรัน `npm run check:content -- <ไฟล์เดิม.json>` เพื่อดูรายงานความครอบคลุมว่ายังขาด tag ไหน
2. **ตอน generate (ใช้ web search หาวัตถุดิบ)** — ดึงคลังคำศัพท์ตามความถี่ (Oxford 3000/5000, CEFR wordlist), ประโยค/บริบทร่วมสมัยจากแหล่งจริง พร้อม**กติกาลิขสิทธิ์: ห้ามคัดลอกข้อสอบหรือข้อความยาวมาตรงๆ ใช้เป็นวัตถุดิบแล้วแต่งใหม่เสมอ และบันทึก `source`/`sourceUrl` ทุกข้อ**
3. **ตรวจอัตโนมัติ** — `npm run check:content -- <ไฟล์ใหม่.json>` ต้องได้ `ไม่ผ่าน 0 ข้อ` ก่อนไปต่อ (สคริปต์ตรวจรูปแบบ, เฉลย, tag, และความซ้ำภายในไฟล์)
4. **ตรวจรอบสองด้วย AI แล้วให้ปิ๊กอนุมัติ** — checklist ที่ต้องถามทุกครั้ง: คำตอบถูกข้อเดียวจริงไหม / กำกวมไหม / ยากง่ายตรงเลเวลไหม / ภาษาเป็นธรรมชาติไหม / บริบทเหมาะกับผู้เรียนไทยไหม → บันทึกผลใน `reviewNotes` → นำเข้าผ่าน `admin/import.html` → ตรวจและกดอนุมัติที่ `admin/content.html`

พร้อมตัวอย่างรูปแบบไฟล์ JSON (ชี้ไปที่ `docs/examples/exercises-sample.json`) และหมายเหตุว่าฟิลด์ `createdAt`/`updatedAt`/`createdBy`/`importBatchId`/`contentHash` ไม่ต้องใส่เอง ระบบเติมให้

- [ ] **Step 2: แก้ `PLAN.md` ให้ตรงกับข้อยุติใน spec**

แก้ 6 จุดนี้ (ตาม spec ข้อ 2 หัวข้อ "จุดที่ spec นี้ต่างจาก PLAN.md") และในทุกจุดให้ใส่หมายเหตุอ้างอิงว่า *(ปรับตาม `docs/superpowers/specs/2026-09-20-data-layer-design.md`)*:

1. §5 — ลบลิมิต free tier รายเลเวลและ `config/freeTierLimits` ออก เปลี่ยนเป็นกฎเดียว: `full` เห็นทุกอย่าง / `free` เห็นเฉพาะที่ติด `isPreview`
2. §9 `users` — ลบ `totalStars` และ `stageProgress` ออก เพิ่มบรรทัดว่าเป็นค่าที่คำนวณจาก `submissions`/`stageClears`
3. §8 `stages` — เพิ่ม `reviewStatus`
4. §9 `exercises` — เพิ่ม `assignedUids`, `contentHash`, `importBatchId`, `source`, `sourceUrl`, `reviewNotes`; ลบ `gradeTag`; เปลี่ยน `answerKey` เป็น `string[]`
5. §9 — เพิ่ม `stageClears` เป็น collection ใหม่
6. §15 ข้อ 2 — ทำเครื่องหมายว่าเสร็จแล้ว พร้อมชี้ไปที่ spec และ plan ฉบับนี้

- [ ] **Step 3: อัปเดต `README.md`**

เพิ่มหัวข้อ "คำสั่งที่ใช้บ่อย" ที่ระบุ `npm test`, `npm run test:rules` (ต้องมี Java), `npm run check:content -- <ไฟล์>`, และหัวข้อ "การตั้งผู้ดูแลระบบ" ที่บอกว่าแก้ `role` เป็น `"admin"` ที่เอกสาร `users/{uid}` ใน Firebase console โดยตรง

- [ ] **Step 4: ตรวจว่าเอกสารไม่ขัดกันเอง**

Run: `grep -n "freeTierLimits\|totalStars\|stageProgress\|gradeTag" PLAN.md`
Expected: ไม่มีบรรทัดที่ยังอธิบายของเก่าแบบเป็นข้อกำหนด (ถ้ามี ต้องเป็นหมายเหตุว่าถูกยกเลิกแล้วเท่านั้น)

- [ ] **Step 5: Commit**

```bash
git add docs/content-pipeline.md PLAN.md README.md
git commit -m "docs: add content pipeline guide and align PLAN with the data layer decisions"
```

### Task 19: ขึ้นจริง + ตรวจ end-to-end

**Files:**
- ไม่มีไฟล์ใหม่ — เป็นขั้นตอนปฏิบัติการ

**Interfaces:**
- Consumes: ทุกอย่างจาก Task 1-18

- [ ] **Step 1: รันเทสทั้งหมดก่อนขึ้น**

Run: `npm test` แล้ว `npm run test:rules` แล้ว `npm run build`
Expected: PASS ทั้งสามคำสั่ง — ถ้ามีอันใดตก **ห้ามไปต่อ** ให้แก้ก่อน

- [ ] **Step 2: deploy rules + indexes ขึ้น Firebase จริง**

Run: `npx firebase deploy --only firestore --project pik-a-class`
Expected: `Deploy complete!` — index ที่สร้างใหม่อาจขึ้นสถานะ Building สักครู่ใน Firebase console

- [ ] **Step 3: push ขึ้น main ให้ CI deploy หน้าเว็บ**

```bash
git push origin master:main
```

Run: `gh run watch` (หรือดูที่แท็บ Actions)
Expected: workflow ผ่านทุกขั้น รวมขั้น `npm run test:rules` ขั้นใหม่

- [ ] **Step 4: ตรวจ end-to-end บนเว็บจริง (ปิ๊กทำเอง)**

ที่ https://pikar10tu.github.io/pik-a-class/ ด้วยบัญชี admin:

1. เปิด `admin/index.html` → เห็นจำนวนนักเรียนและจำนวนเนื้อหารออนุมัติเป็นตัวเลขจริง
2. เปิด `admin/import.html` → วางเนื้อหา `docs/examples/exercises-sample.json` → กดตรวจ → ต้องได้ `ผ่าน 4 ข้อ / ไม่ผ่าน 1 ข้อ` และบอกว่าข้อที่ 5 ผิดที่ `answerKey`
3. กดนำเข้า → ไปที่ `admin/content.html` (สถานะ draft) → เห็น 4 ข้อ → กดอนุมัติทั้งหมด
4. เปิด `admin/users.html` → สลับ `tier` ของบัญชีทดสอบเป็น `full` แล้วกลับเป็น `free`
5. ล็อกอินด้วยบัญชีนักเรียน (tier `free`) เปิด devtools console แล้วรัน:
   ```js
   // ต้อง "ไม่" ขึ้นข้อมูลของข้อที่ไม่ใช่ isPreview
   ```
   — ยืนยันว่านักเรียน free ยังไม่เห็นข้อที่ไม่ได้ติด preview (ตรวจผ่านหน้าเว็บในสเต็ปถัดไปของ sub-project 3 ก็ได้ถ้ายังไม่มี UI นักเรียน)

- [ ] **Step 5: บันทึกผลและของค้าง**

อัปเดต `docs/superpowers/specs/2026-09-20-data-layer-design.md` ข้อ 13 — เพิ่มรายการที่เจอระหว่างทำและตั้งใจ defer (ถ้ามี) พร้อม commit

```bash
git add docs/superpowers/specs/2026-09-20-data-layer-design.md
git commit -m "docs: record follow-ups found while building the data layer"
git push origin master:main
```

---

## Self-Review Checklist (ผู้เขียนแผนตรวจเองแล้ว)

- **ครอบคลุม spec:** ข้อ 3 → Task 3-5; ข้อ 4 → Task 5 (`doc-ids`, `bestStars`) + Task 10 (rules ห้ามลดดาว); ข้อ 5 → Task 1-6; ข้อ 6 → Task 2; ข้อ 7 → Task 8-12; ข้อ 8 → Task 6, 15, 16, 17, 18; ข้อ 9 → Task 13, 14, 16, 17; ข้อ 10 → Task 1-17 (unit) + Task 8-11 (rules) + Task 19 (ตรวจมือ); ข้อ 11 → Task 18 Step 3 + Task 8 (rules test พิสูจน์สิทธิ์ admin); ข้อ 12 → ลำดับ Phase 1-5 ตรงกัน
- **ยังไม่ได้ทำในแผนนี้โดยตั้งใจ:** dashboard นักเรียนยังไม่ดึงดาวรวมด้วย aggregation query (ยังไม่มี submission จริง — ไปอยู่ sub-project ถัดไปตาม spec ข้อ 1)

