# Student Core Loop (โซนตะลุยด่าน) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ให้นักเรียนเข้าเว็บ เลือกสกิล+เลเวล เดินเส้นทางด่าน เล่นด่านที่เป็นข้อปรนัย/เติมคำ ตรวจทันที ได้ดาว และปลดล็อกด่านถัดไป พร้อมเครื่องมือฝั่งแอดมินสำหรับสร้างด่าน

**Architecture:** ตรรกะทั้งหมดอยู่ในโมดูลบริสุทธิ์ใน `src/lib/` ที่ไม่ import firebase เลย (ทดสอบด้วย vitest ตรงๆ) ส่วนการคุยกับ Firestore แยกไปอยู่ไฟล์ `*-io.js` และหน้า HTML ทำหน้าที่ต่อสายระหว่างสองอย่างนี้เท่านั้น — เป็นแพตเทิร์นเดียวกับ `exercise-form.js` / `admin-content-io.js` ที่มีอยู่แล้ว การบันทึกผลเล่นจบด่านเป็น **อ่านก่อน-แล้วค่อยเขียนแบบ batch** เพื่อไม่ให้ security rules ปฏิเสธทั้งชุด

**Tech Stack:** Vite (multi-page) · vanilla JS + ES modules · Firebase Web SDK ^10.14 (Auth + Firestore) · vitest · `@firebase/rules-unit-testing` v3.x + Firestore emulator · `sharp` (devDependency สำหรับเตรียมไฟล์ภาพมาสคอตเท่านั้น)

**Spec:** `docs/superpowers/specs/2026-09-20-student-core-loop-design.md`

## Global Constraints

- **Node 24** เท่านั้น (jsdom 30 ในเทสต้องการ `^22.22` / `^24.15` ขึ้นไป)
- ห้ามอัป `firebase` ข้าม ^10.14 และห้ามอัป `@firebase/rules-unit-testing` ข้าม v3.x (peer กันอยู่)
- **ข้อความที่ผู้ใช้เห็นทั้งหมดเป็นภาษาไทย**
- ทุกหน้า HTML ใหม่ **ต้องเพิ่ม entry ใน `vite.config.js`** ไม่งั้น build แล้วหน้านั้นหาย
- ลิงก์ข้ามหน้าใช้ `import.meta.env.BASE_URL` เสมอ (ไซต์อยู่ใต้ `/pik-a-class/`)
- โมดูลใน `src/lib/` ที่ลงท้ายด้วยตรรกะบริสุทธิ์ **ห้าม import จาก `firebase/*`** — ถ้าต้องคุยฐานข้อมูล ให้แยกเป็นไฟล์ `*-io.js`
- `npm test` ต้องผ่านก่อน commit ทุกครั้ง · งานที่แตะ `firestore.rules` ต้องรัน `npm run test:rules` ด้วย (ต้องมี Java — Temurin 21 ติดตั้งแล้ว)
- branch ท้องถิ่นคือ `master` แต่ remote คือ `main` → push ด้วย `git push origin master:main`
- ชนิดข้อที่ด่านรับได้มีแค่ `mcq` และ `fill_blank`
- เกณฑ์ดาว: `= 1.0` → 3 · `>= 0.7` → 2 · `>= 0.4` → 1 · ต่ำกว่านั้น → 0
- ดาวรวมคิดจาก `stageClears` เท่านั้น ห้ามเอา `submissions.bestStars` มารวมด้วย

---

## File Structure

**สร้างใหม่ — ตรรกะบริสุทธิ์**

| ไฟล์ | รับผิดชอบ |
|---|---|
| `src/lib/consent.js` | ข้อความ consent + เลขเวอร์ชัน (แหล่งเดียว) |
| `src/lib/grading.js` | ตรวจคำตอบต่อข้อ, เกณฑ์ดาว, คะแนนรวมของด่าน |
| `src/lib/word-bank.js` | สร้างตัวเลือกให้ข้อเติมคำ |
| `src/lib/stage-session.js` | state machine ของการเล่นด่าน |
| `src/lib/stage-progress.js` | ปลดล็อก / ดาวต่อด่าน / ดาวรวม |
| `src/lib/stage-form.js` | ตรรกะฟอร์มสร้างด่าน |
| `src/lib/stage-writes.js` | คำนวณเอกสารที่จะเขียนตอนจบด่าน (บริสุทธิ์ ไม่แตะ firebase) |
| `src/lib/mascot.js` | อารมณ์ → path ของไฟล์ภาพ |

**สร้างใหม่ — คุยกับ Firestore**

| ไฟล์ | รับผิดชอบ |
|---|---|
| `src/lib/stage-io.js` | อ่าน/เขียน `stages`, อ่านข้อของด่าน, อ่าน `stageClears` |
| `src/lib/stage-result-io.js` | อ่าน submissions เดิม + commit batch ตอนจบด่าน |

**สร้างใหม่ — หน้าเว็บ**

`src/learn/index.html` + `.js` · `src/learn/path.html` + `.js` · `src/learn/play.html` + `.js` · `src/admin/stages.html` + `.js` · `src/admin/stage.html` + `.js`

**แก้ของเดิม**

`src/lib/schema/users.js` (ฟิลด์ consent) · `firestore.rules` (allowlist) · `src/lib/onboarding-validation.js` · `src/onboarding.html` + `.js` · `src/styles/tokens.css` + `base.css` · `src/dashboard.html` + `.js` · `src/lib/admin-nav.js` · `vite.config.js` · `package.json`

---

# ส่วนที่ 1 — Consent notice (ทำก่อน เพราะบล็อกการให้นักเรียนจริงเข้าใช้)

## Task 1: เพิ่มฟิลด์ consent ใน schema และ security rules

**Files:**
- Create: `src/lib/consent.js`
- Modify: `src/lib/schema/users.js`
- Modify: `firestore.rules` (ฟังก์ชัน `userFields()`)
- Test: `tests/rules/users.test.js`

**Interfaces:**
- Produces: `CONSENT_VERSION: number`, `CONSENT_SECTIONS: Array<{ heading: string|null, body: string }>`, `CONSENT_CHECKBOX_LABEL: string` จาก `src/lib/consent.js` · ฟิลด์ `consentAcceptedAt` (ISO string) และ `consentVersion` (int ≥ 1) ใน `users`

- [ ] **Step 1: สร้างไฟล์ข้อความ consent**

สร้าง `src/lib/consent.js`:

```js
// ข้อความนี้ปิ๊กอนุมัติแล้ว (spec 2026-09-20 §12) — ถ้าแก้ข้อความต้องบวก CONSENT_VERSION ด้วย
// เพื่อให้รู้ย้อนหลังได้ว่าผู้ใช้แต่ละคนยินยอมข้อความฉบับไหน
export const CONSENT_VERSION = 1;

export const CONSENT_TITLE = 'ก่อนกดบันทึก — เรื่องข้อมูลของผู้เรียน';

export const CONSENT_SECTIONS = [
  {
    heading: null,
    body: 'ข้อมูลที่กรอกไว้จะถูกเก็บไว้ใช้ในการสอนเท่านั้นครับ — ให้รู้ว่าใครเป็นใคร ติดต่อกลับได้ และจัดบทเรียนให้เหมาะกับระดับของผู้เรียน',
  },
  {
    heading: 'ข้อมูลที่เก็บ',
    body: 'ชื่อจริง ชื่อเล่น ช่วงชั้น โรงเรียน เบอร์โทร LINE ID และอีเมลจากบัญชี Google ที่ใช้เข้าสู่ระบบ',
  },
  {
    heading: 'ใครเห็นบ้าง',
    body: 'มีปิ๊กคนเดียวครับ ไม่มีการขายหรือส่งต่อให้ใคร และไม่เอาไปใช้โฆษณา',
  },
  {
    heading: 'เปลี่ยนใจได้เสมอ',
    body: 'อยากแก้ไขหรือให้ลบข้อมูลออกเมื่อไหร่ ทักมาบอกได้ตลอดเลยครับ',
  },
  {
    heading: null,
    body: 'ถ้าผู้เรียนอายุยังไม่ถึง 20 ปี รบกวนให้ผู้ปกครองรับทราบด้วยนะครับ',
  },
];

export const CONSENT_CHECKBOX_LABEL = 'อ่านแล้ว และยินยอมให้เก็บข้อมูลตามนี้ครับ/ค่ะ';
```

- [ ] **Step 2: เพิ่มฟิลด์ใน schema**

ใน `src/lib/schema/users.js` เพิ่มสองบรรทัดนี้ใน `usersSchema.fields` ต่อจาก `onboardingComplete`:

```js
    consentAcceptedAt: isoDate({ required: false }),
    consentVersion: int({ required: false, min: 1 }),
```

(`isoDate` กับ `int` ถูก import อยู่แล้วที่บรรทัดแรกของไฟล์)

- [ ] **Step 3: เขียน rules test ที่ต้องล้มก่อน**

เพิ่มเข้าไปใน `describe('users rules', ...)` ใน `tests/rules/users.test.js`:

```js
  it('lets the owner record their consent', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc({ onboardingComplete: false }) });
      const db = authedDb(env, 'student1');
      await assertSucceeds(
        db.collection('users').doc('student1').update({
          onboardingComplete: true,
          consentAcceptedAt: '2026-09-21T03:00:00.000Z',
          consentVersion: 1,
        }),
      );
    });
  });

  it('still blocks unknown fields sneaking in with consent', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc({ onboardingComplete: false }) });
      const db = authedDb(env, 'student1');
      await assertFails(
        db.collection('users').doc('student1').update({
          consentAcceptedAt: '2026-09-21T03:00:00.000Z',
          consentVersion: 1,
          consent: 'on',
        }),
      );
    });
  });
```

- [ ] **Step 4: รันเทสให้เห็นว่าล้ม**

Run: `npm run test:rules`
Expected: เคส `lets the owner record their consent` ล้ม เพราะ `userFields()` ยังไม่มีสองฟิลด์นี้ rules จึงปฏิเสธด้วย `hasOnly`

- [ ] **Step 5: เพิ่มชื่อฟิลด์ใน allowlist ของ rules**

ใน `firestore.rules` แก้ฟังก์ชัน `userFields()` ใต้ `match /users/{uid}` ให้เป็น:

```
      function userFields() {
        return ['uid', 'email', 'fullName', 'nickname', 'grade', 'school', 'phone',
                'lineId', 'role', 'tier', 'tierNote', 'groupTags', 'streak',
                'onboardingComplete', 'consentAcceptedAt', 'consentVersion',
                'createdAt', 'updatedAt'];
      }
```

- [ ] **Step 6: รันเทสให้ผ่าน**

Run: `npm run test:rules`
Expected: PASS ทั้งสองเคสใหม่ และเคสเดิมทั้งหมดยังผ่าน

- [ ] **Step 7: Deploy rules ขึ้น production**

Run: `npx firebase deploy --only firestore --project pik-a-class`
Expected: `Deploy complete!` — จำเป็นเพราะ CI ไม่ได้ deploy rules ให้ ถ้าไม่ทำ ฟอร์ม onboarding บนเว็บจริงจะเขียนไม่ผ่าน

- [ ] **Step 8: Commit**

```bash
git add src/lib/consent.js src/lib/schema/users.js firestore.rules tests/rules/users.test.js
git commit -m "feat: allow storing consent acceptance on the user profile"
```

---

## Task 2: บังคับติ๊กยินยอมในฟอร์ม onboarding

**Files:**
- Modify: `src/lib/onboarding-validation.js`
- Test: `src/lib/onboarding-validation.test.js`
- Modify: `src/onboarding.html`
- Modify: `src/onboarding.js`
- Modify: `src/lib/user-profile-io.js`
- Modify: `src/styles/base.css`

**Interfaces:**
- Consumes: `CONSENT_VERSION`, `CONSENT_TITLE`, `CONSENT_SECTIONS`, `CONSENT_CHECKBOX_LABEL` จาก Task 1
- Produces: `completeOnboarding(db, uid, formData, { now })` ที่ตัดฟิลด์ `consent` ทิ้งและเติม `consentAcceptedAt` / `consentVersion` ให้เอง

- [ ] **Step 1: เขียนเทสที่ต้องล้มก่อน**

เพิ่มใน `src/lib/onboarding-validation.test.js`:

```js
describe('consent', () => {
  const filled = {
    fullName: 'สมชาย ใจดี',
    nickname: 'ชาย',
    grade: 'ม.3',
    school: 'โรงเรียนตัวอย่าง',
    phone: '0812345678',
  };

  it('rejects the form when the consent box is not ticked', () => {
    const { valid, errors } = validateOnboardingForm(filled);
    expect(valid).toBe(false);
    expect(errors.consent).toBe('กรุณาติ๊กยอมรับก่อนกดบันทึก');
  });

  it('accepts the form when the consent box is ticked', () => {
    const { valid, errors } = validateOnboardingForm({ ...filled, consent: 'on' });
    expect(valid).toBe(true);
    expect(errors.consent).toBeUndefined();
  });
});
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/onboarding-validation.test.js`
Expected: FAIL — `errors.consent` เป็น `undefined`

- [ ] **Step 3: เพิ่มกฎใน validator**

ใน `src/lib/onboarding-validation.js` เพิ่มก่อน `return`:

```js
  if (!formData.consent) {
    errors.consent = 'กรุณาติ๊กยอมรับก่อนกดบันทึก';
  }
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/onboarding-validation.test.js`
Expected: PASS

- [ ] **Step 5: ทำให้ `completeOnboarding` ไม่ส่งฟิลด์ `consent` ขึ้น Firestore**

นี่คือจุดที่พังง่ายที่สุดของงานนี้ — `Object.fromEntries(new FormData(form))` จะได้ `consent: 'on'` ติดมาด้วย ถ้าส่งตรงๆ rules จะปฏิเสธทั้งก้อนเพราะ `hasOnly(userFields())`

แทนที่ฟังก์ชันเดิมใน `src/lib/user-profile-io.js`:

```js
export async function completeOnboarding(db, uid, formData, { now = new Date().toISOString() } = {}) {
  const { consent, ...profile } = formData;
  await updateDoc(doc(db, 'users', uid), {
    ...profile,
    onboardingComplete: true,
    consentAcceptedAt: now,
    consentVersion: CONSENT_VERSION,
  });
}
```

และเพิ่ม import ที่หัวไฟล์:

```js
import { CONSENT_VERSION } from './consent.js';
```

- [ ] **Step 6: เพิ่มกล่อง consent ใน HTML**

ใน `src/onboarding.html` แทรกก่อนบรรทัด `<button type="submit" ...>`:

```html
      <section class="consent-box" id="consent-box"></section>
      <div class="form-group form-group-check">
        <label for="consent">
          <input type="checkbox" id="consent" name="consent" />
          <span id="consent-label"></span>
        </label>
        <span class="field-error" data-error-for="consent"></span>
      </div>
```

- [ ] **Step 7: เรนเดอร์ข้อความจากโมดูลเดียว**

ใน `src/onboarding.js` เพิ่ม import:

```js
import { CONSENT_TITLE, CONSENT_SECTIONS, CONSENT_CHECKBOX_LABEL } from './lib/consent.js';
```

และเพิ่มโค้ดนี้ต่อจากลูปที่เติม `<option>` ของ grade:

```js
const consentBox = document.getElementById('consent-box');
const heading = document.createElement('h2');
heading.textContent = CONSENT_TITLE;
consentBox.appendChild(heading);
for (const section of CONSENT_SECTIONS) {
  const p = document.createElement('p');
  if (section.heading) {
    const strong = document.createElement('strong');
    strong.textContent = `${section.heading}: `;
    p.appendChild(strong);
  }
  p.appendChild(document.createTextNode(section.body));
  consentBox.appendChild(p);
}
document.getElementById('consent-label').textContent = CONSENT_CHECKBOX_LABEL;
```

- [ ] **Step 8: ใส่สไตล์ให้กล่อง**

เพิ่มท้าย `src/styles/base.css`:

```css
.consent-box {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-3);
  margin-bottom: var(--space-3);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.consent-box h2 {
  font-size: 1rem;
  margin: 0 0 var(--space-2);
}

.consent-box p {
  margin: 0 0 var(--space-2);
}

.form-group-check label {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  cursor: pointer;
}

.form-group-check input {
  margin-top: 3px;
}
```

- [ ] **Step 9: รันเทสทั้งหมด**

Run: `npm test`
Expected: PASS ทั้งหมด

- [ ] **Step 10: ตรวจด้วยตาบน dev server**

Run: `npm run dev` แล้วเปิดหน้า onboarding
Expected: เห็นกล่องข้อความครบ 5 ย่อหน้า · กดบันทึกโดยไม่ติ๊กแล้วขึ้น "กรุณาติ๊กยอมรับก่อนกดบันทึก" · ติ๊กแล้วบันทึกผ่าน

- [ ] **Step 11: Commit**

```bash
git add src/lib/onboarding-validation.js src/lib/onboarding-validation.test.js src/lib/user-profile-io.js src/onboarding.html src/onboarding.js src/styles/base.css
git commit -m "feat: require a consent tick before finishing onboarding"
```

---

# ส่วนที่ 2 — ทิศทางภาพและมาสคอต

## Task 3: ชุดสีและฟอนต์ของโซนนักเรียน

**Files:**
- Modify: `src/styles/tokens.css`
- Create: `src/styles/learn.css`
- Modify: `src/index.html`, `src/login.html`, `src/onboarding.html`, `src/dashboard.html`, `src/admin/*.html` (เพิ่ม `<link>` ฟอนต์)

**Interfaces:**
- Produces: CSS custom properties `--color-primary`, `--color-primary-shadow`, `--color-correct-bg`, `--color-correct-text`, `--color-wrong-bg`, `--color-wrong-text`, `--color-star`, `--color-muted` และคลาส `.btn-chunky`, `.answer-card`, `.progress-bar`

- [ ] **Step 1: แก้ tokens**

แทนที่ `:root` ทั้งบล็อกใน `src/styles/tokens.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1f2933;
  --color-primary: #37c871;
  --color-primary-shadow: #26a058;
  --color-primary-text: #ffffff;
  --color-border: #dfe3e8;
  --color-error: #dc2626;
  --color-correct-bg: #e8f9ee;
  --color-correct-text: #17753c;
  --color-wrong-bg: #fdeaea;
  --color-wrong-text: #a3181c;
  --color-star: #f5b91d;
  --color-muted: #9aa5b1;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --font-base: 'Mitr', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-size-base: 16px;
  --radius: 8px;
  --radius-lg: 14px;
}
```

**หมายเหตุที่ตั้งใจ:** `--color-primary` เปลี่ยนจากน้ำเงินเป็นเขียว ปุ่ม `.btn-primary` ในหน้าแอดมินทุกหน้าจะเปลี่ยนสีตามด้วย — ตั้งใจให้เป็นแบบนั้น ทั้งเว็บใช้ชุดสีเดียว

- [ ] **Step 2: โหลดฟอนต์**

เพิ่มสองบรรทัดนี้ใน `<head>` ของ **ทุกไฟล์ HTML** (ก่อน `<link>` ของ tokens.css):

```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mitr:wght@400;500;600&display=swap" />
```

- [ ] **Step 3: สร้าง stylesheet ของโซนนักเรียน**

สร้าง `src/styles/learn.css`:

```css
.learn-main {
  max-width: 480px;
  margin: 0 auto;
  padding: var(--space-3);
}

.btn-chunky {
  display: block;
  width: 100%;
  padding: var(--space-3);
  border: none;
  border-radius: var(--radius-lg);
  border-bottom: 5px solid var(--color-primary-shadow);
  background: var(--color-primary);
  color: var(--color-primary-text);
  font-family: var(--font-base);
  font-size: 1.0625rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-chunky:disabled {
  background: var(--color-border);
  border-bottom-color: var(--color-muted);
  color: var(--color-muted);
  cursor: default;
}

.btn-ghost {
  display: block;
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 2px solid var(--color-border);
  border-bottom-width: 4px;
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-base);
  font-size: 0.9375rem;
  cursor: pointer;
}

.progress-bar {
  flex: 1;
  height: 12px;
  border-radius: 99px;
  background: var(--color-border);
  overflow: hidden;
}

.progress-bar > span {
  display: block;
  height: 100%;
  background: var(--color-primary);
  border-radius: 99px;
  transition: width 0.25s ease;
}

.answer-card {
  display: block;
  width: 100%;
  text-align: left;
  padding: var(--space-3);
  margin-bottom: var(--space-2);
  border: 2px solid var(--color-border);
  border-bottom-width: 5px;
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-base);
  font-size: 1.0625rem;
  cursor: pointer;
}

.answer-card[data-state='correct'] {
  background: var(--color-correct-bg);
  border-color: var(--color-primary);
  color: var(--color-correct-text);
}

.answer-card[data-state='wrong'] {
  background: var(--color-wrong-bg);
  border-color: var(--color-error);
  color: var(--color-wrong-text);
}

.answer-card:disabled {
  cursor: default;
}

.stars {
  color: var(--color-star);
  letter-spacing: 2px;
}

.stars .off {
  color: var(--color-border);
}

.sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20, 28, 24, 0.45);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.sheet-backdrop[hidden] {
  display: none;
}

.sheet {
  width: 100%;
  max-width: 480px;
  background: var(--color-bg);
  border-radius: 22px 22px 0 0;
  padding: var(--space-4) var(--space-3) var(--space-3);
}
```

- [ ] **Step 4: ดูด้วยตา**

Run: `npm run dev` แล้วเปิดหน้า dashboard และหน้าแอดมิน
Expected: ฟอนต์เป็น Mitr ทั้งเว็บ ปุ่มหลักเป็นสีเขียว ไม่มีหน้าไหนพัง

- [ ] **Step 5: Commit**

```bash
git add src/styles/ src/*.html src/admin/*.html
git commit -m "feat: switch the site palette to the green student direction"
```

---

## Task 4: เตรียมไฟล์ภาพมาสคอตและโมดูลเรียกใช้

**Files:**
- Create: `scripts/prepare-mascot.mjs`
- Create: `src/lib/mascot.js`
- Test: `src/lib/mascot.test.js`
- Modify: `package.json` (devDependency `sharp` + script `prepare:mascot`)
- Create (ผลลัพธ์จากสคริปต์): `src/public/mascot/normal.png`, `correct.png`, `wrong.png`, `clear.png`

**Interfaces:**
- Produces: `MASCOT_MOODS: string[]`, `mascotSrc(mood: string, baseUrl: string): string` — คืน path แบบ `"/pik-a-class/mascot/normal.png"`

- [ ] **Step 1: เขียนเทสของโมดูลก่อน**

สร้าง `src/lib/mascot.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { MASCOT_MOODS, mascotSrc } from './mascot.js';

describe('mascotSrc', () => {
  it('maps each mood to a file under the base url', () => {
    expect(mascotSrc('correct', '/pik-a-class/')).toBe('/pik-a-class/mascot/correct.png');
  });

  it('falls back to the normal pose for an unknown mood', () => {
    expect(mascotSrc('confused', '/pik-a-class/')).toBe('/pik-a-class/mascot/normal.png');
  });

  it('lists every mood the app uses', () => {
    expect(MASCOT_MOODS).toEqual(['normal', 'correct', 'wrong', 'clear']);
  });
});
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/mascot.test.js`
Expected: FAIL — ยังไม่มีไฟล์ `mascot.js`

- [ ] **Step 3: เขียนโมดูล**

สร้าง `src/lib/mascot.js`:

```js
// ไฟล์ภาพอยู่ใน src/public/mascot/ ซึ่ง Vite เสิร์ฟตรงๆ ที่ราก base url
// จึงไม่ต้อง import ผ่าน bundler และทดสอบได้ด้วยสตริงล้วน
export const MASCOT_MOODS = ['normal', 'correct', 'wrong', 'clear'];

export function mascotSrc(mood, baseUrl) {
  const name = MASCOT_MOODS.includes(mood) ? mood : 'normal';
  return `${baseUrl}mascot/${name}.png`;
}
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/mascot.test.js`
Expected: PASS

- [ ] **Step 5: ติดตั้ง sharp**

Run: `npm install --save-dev sharp`
Expected: ติดตั้งสำเร็จ (มี prebuilt binary สำหรับ Windows x64)

- [ ] **Step 6: เขียนสคริปต์ตัดภาพ**

สร้าง `scripts/prepare-mascot.mjs`:

```js
// ตัด character sheet ของน้องหยกเป็นไฟล์ย่อยที่พื้นหลังโปร่ง
// รันมือครั้งเดียวแล้ว commit ผลลัพธ์ — ตอนรันเว็บจริงไม่ต้องพึ่ง sharp
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'docs/design/mascot-poses-sheet.jpg';
const OUT_DIR = 'src/public/mascot';
const COLS = 6;
const ROWS = 3;

// [แถว, คอลัมน์] นับจาก 0 — เลือกจากชีต 18 ท่า ข้ามท่าที่มีตัวหนังสืออังกฤษบนภาพ
const CELLS = {
  normal: [0, 0], // ยืนโบกมือทักทาย
  correct: [0, 1], // ชูสองมือดีใจ
  clear: [1, 5], // ตาเป็นดาว ดีใจมาก
  wrong: [2, 3], // ยืนมือประสาน ท่าเสียดาย
};

const WHITE = 240; // ค่าที่ถือว่าเป็นพื้นขาว (ต้นฉบับเป็น JPEG จึงมีขอบฟุ้ง ต้องเผื่อ)

// ลบพื้นขาวด้วย flood fill จากขอบภาพเท่านั้น
// ห้ามลบ "ทุกพิกเซลที่ขาว" เพราะตัวมาสคอตมีแสงวาวสีขาวอยู่ข้างใน จะทะลุเป็นรู
function clearOutsideBackground(data, width, height) {
  const seen = new Uint8Array(width * height);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (seen[i]) return;
    const p = i * 4;
    if (data[p] < WHITE || data[p + 1] < WHITE || data[p + 2] < WHITE) return;
    seen[i] = 1;
    stack.push(i);
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length > 0) {
    const i = stack.pop();
    data[i * 4 + 3] = 0;
    const x = i % width;
    const y = (i - x) / width;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const meta = await sharp(SOURCE).metadata();

  for (const [name, [row, col]] of Object.entries(CELLS)) {
    const left = Math.round((col * meta.width) / COLS);
    const right = Math.round(((col + 1) * meta.width) / COLS);
    const top = Math.round((row * meta.height) / ROWS);
    const bottom = Math.round(((row + 1) * meta.height) / ROWS);

    const { data, info } = await sharp(SOURCE)
      .extract({ left, top, width: right - left, height: bottom - top })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    clearOutsideBackground(data, info.width, info.height);

    const out = `${OUT_DIR}/${name}.png`;
    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim({ threshold: 1 })
      .resize({ height: 512, fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`เขียน ${out}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

- [ ] **Step 7: เพิ่ม npm script**

ใน `package.json` เพิ่มใน `"scripts"`:

```json
    "prepare:mascot": "node scripts/prepare-mascot.mjs",
```

- [ ] **Step 8: รันสคริปต์**

Run: `npm run prepare:mascot`
Expected: ได้ไฟล์ 4 ไฟล์ใน `src/public/mascot/`

- [ ] **Step 9: ตรวจด้วยตาว่าพื้นโปร่งจริงและตัวไม่ทะลุ**

เปิดไฟล์ทั้ง 4 ในโปรแกรมดูรูปที่แสดงพื้นโปร่งเป็นตารางหมากรุก
Expected: พื้นรอบตัวโปร่ง · **แสงวาวสีขาวบนตัวและในหูยังอยู่ ไม่กลายเป็นรู** · ถ้าทะลุแปลว่า flood fill รั่วเข้าไปข้างใน ให้ลดค่า `WHITE` ลง (เช่น 250) แล้วรันใหม่

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json scripts/prepare-mascot.mjs src/lib/mascot.js src/lib/mascot.test.js src/public/mascot/
git commit -m "feat: slice the jade rabbit sheet into transparent mascot images"
```

---

# ส่วนที่ 3 — ตรรกะบริสุทธิ์

## Task 5: ตรวจคำตอบและเกณฑ์ดาว (`grading.js`)

**Files:**
- Create: `src/lib/grading.js`
- Test: `src/lib/grading.test.js`

**Interfaces:**
- Produces:
  - `normalizeAnswer(value: string): string`
  - `gradeAnswer(exercise: object, answer: string): { correct: boolean, score: 0 | 1 }`
  - `starsFor(score: number): 0 | 1 | 2 | 3`
  - `scoreOf(results: Array<{ correct: boolean }>): number` — คืนสัดส่วน 0–1

- [ ] **Step 1: เขียนเทส**

สร้าง `src/lib/grading.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { normalizeAnswer, gradeAnswer, starsFor, scoreOf } from './grading.js';

const mcq = { type: 'mcq', choices: ['go', 'goes'], answerKey: ['goes'] };
const blank = { type: 'fill_blank', prompt: 'She ___ home.', answerKey: ["doesn't", 'does not'] };

describe('normalizeAnswer', () => {
  it('trims, collapses spaces and ignores letter case', () => {
    expect(normalizeAnswer('  Does   NOT ')).toBe('does not');
  });

  it('treats both apostrophe shapes as the same character', () => {
    expect(normalizeAnswer("doesn't")).toBe(normalizeAnswer('doesn’t'));
  });

  it('keeps punctuation that carries meaning', () => {
    expect(normalizeAnswer('Yes, I do.')).toBe('yes, i do.');
  });
});

describe('gradeAnswer', () => {
  it('scores a correct multiple choice answer', () => {
    expect(gradeAnswer(mcq, 'goes')).toEqual({ correct: true, score: 1 });
  });

  it('scores a wrong multiple choice answer', () => {
    expect(gradeAnswer(mcq, 'go')).toEqual({ correct: false, score: 0 });
  });

  it('accepts any of the listed answers for a blank', () => {
    expect(gradeAnswer(blank, 'does not').correct).toBe(true);
    expect(gradeAnswer(blank, "DOESN'T").correct).toBe(true);
    expect(gradeAnswer(blank, 'did not').correct).toBe(false);
  });

  it('treats a missing answer as wrong instead of throwing', () => {
    expect(gradeAnswer(mcq, undefined)).toEqual({ correct: false, score: 0 });
  });
});

describe('starsFor', () => {
  it('gives three stars only for a perfect score', () => {
    expect(starsFor(1)).toBe(3);
    expect(starsFor(0.99)).toBe(2);
  });

  it('gives two stars from seventy percent', () => {
    expect(starsFor(0.7)).toBe(2);
    expect(starsFor(7 / 10)).toBe(2);
    expect(starsFor(0.69)).toBe(1);
  });

  it('gives one star from forty percent', () => {
    expect(starsFor(0.4)).toBe(1);
    expect(starsFor(0.39)).toBe(0);
  });

  it('gives no stars for zero', () => {
    expect(starsFor(0)).toBe(0);
  });
});

describe('scoreOf', () => {
  it('returns the share of correct answers', () => {
    expect(scoreOf([{ correct: true }, { correct: false }, { correct: true }, { correct: true }])).toBe(0.75);
  });

  it('returns zero for an empty list instead of dividing by zero', () => {
    expect(scoreOf([])).toBe(0);
  });
});
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/grading.test.js`
Expected: FAIL — ยังไม่มีไฟล์

- [ ] **Step 3: เขียนโมดูล**

สร้าง `src/lib/grading.js`:

```js
// ค่าเผื่อสำหรับเทียบทศนิยม — 7/10 ในจาวาสคริปต์คือ 0.6999999999999999
// ถ้าเทียบตรงๆ เด็กที่ตอบถูก 7 จาก 10 จะได้ 1 ดาวแทนที่จะได้ 2
const EPSILON = 1e-9;

export function normalizeAnswer(value) {
  return String(value ?? '')
    .replace(/’/g, "'")
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

export function gradeAnswer(exercise, answer) {
  const given = normalizeAnswer(answer);
  const accepted = (exercise.answerKey ?? []).map(normalizeAnswer);
  const correct = given !== '' && accepted.includes(given);
  return { correct, score: correct ? 1 : 0 };
}

export function starsFor(score) {
  if (score >= 1 - EPSILON) return 3;
  if (score >= 0.7 - EPSILON) return 2;
  if (score >= 0.4 - EPSILON) return 1;
  return 0;
}

export function scoreOf(results) {
  if (results.length === 0) return 0;
  const correct = results.filter((result) => result.correct).length;
  return correct / results.length;
}
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/grading.test.js`
Expected: PASS ทุกเคส

- [ ] **Step 5: Commit**

```bash
git add src/lib/grading.js src/lib/grading.test.js
git commit -m "feat: add answer grading and the star thresholds"
```

---

## Task 6: ตัวเลือกของข้อเติมคำ (`word-bank.js`)

**Files:**
- Create: `src/lib/word-bank.js`
- Test: `src/lib/word-bank.test.js`

**Interfaces:**
- Consumes: `normalizeAnswer` จาก `grading.js`
- Produces:
  - `distractorPool(exercise, stageExercises): string[]` — คำที่ใช้เป็นตัวลวงได้ ไม่ซ้ำ ไม่ชนคำตอบของข้อนั้น
  - `buildWordBank(exercise, stageExercises, { size = 4, random = Math.random }): string[]` — มีคำตอบที่ถูกอยู่ 1 ตัวเสมอ สับตำแหน่งแล้ว
  - `WORD_BANK_SIZE = 4`

- [ ] **Step 1: เขียนเทส**

สร้าง `src/lib/word-bank.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { distractorPool, buildWordBank, WORD_BANK_SIZE } from './word-bank.js';

const target = { id: 'e1', type: 'fill_blank', answerKey: ["doesn't", 'does not'] };

const stage = [
  target,
  { id: 'e2', type: 'fill_blank', answerKey: ['went'] },
  { id: 'e3', type: 'fill_blank', answerKey: ['was watching'] },
  { id: 'e4', type: 'fill_blank', answerKey: ['have been'] },
];

// ตัวสุ่มปลอมที่คืนค่าเดิมทุกครั้ง ทำให้ลำดับหลังสับคาดเดาได้ในเทส
const notRandom = () => 0;

describe('distractorPool', () => {
  it('collects the answers of the other blanks in the stage', () => {
    expect(distractorPool(target, stage).sort()).toEqual(['have been', 'was watching', 'went']);
  });

  it('never offers a word that would also be accepted for this question', () => {
    const tricky = [target, { id: 'e5', type: 'fill_blank', answerKey: ['does not'] }];
    expect(distractorPool(target, tricky)).toEqual([]);
  });

  it('falls back to multiple choice options when there are not enough blanks', () => {
    const thin = [
      target,
      { id: 'e6', type: 'mcq', choices: ['is', 'are', 'am'], answerKey: ['is'] },
    ];
    expect(distractorPool(target, thin).sort()).toEqual(['am', 'are', 'is']);
  });

  it('does not repeat the same word twice', () => {
    const duplicated = [
      target,
      { id: 'e7', type: 'fill_blank', answerKey: ['went'] },
      { id: 'e8', type: 'fill_blank', answerKey: ['Went'] },
    ];
    expect(distractorPool(target, duplicated)).toEqual(['went']);
  });
});

describe('buildWordBank', () => {
  it('always contains exactly one accepted answer', () => {
    const bank = buildWordBank(target, stage, { random: notRandom });
    expect(bank).toHaveLength(WORD_BANK_SIZE);
    expect(bank.filter((word) => target.answerKey.includes(word))).toHaveLength(1);
  });

  it('returns whatever it can when distractors run out, never fewer than two cards', () => {
    const thin = [target, { id: 'e9', type: 'fill_blank', answerKey: ['went'] }];
    const bank = buildWordBank(target, thin, { random: notRandom });
    expect(bank).toHaveLength(2);
    expect(bank).toContain('went');
  });

  it('returns just the answer when the stage has nothing else to offer', () => {
    const bank = buildWordBank(target, [target], { random: notRandom });
    expect(bank).toEqual(["doesn't"]);
  });
});
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/word-bank.test.js`
Expected: FAIL — ยังไม่มีไฟล์

- [ ] **Step 3: เขียนโมดูล**

สร้าง `src/lib/word-bank.js`:

```js
import { normalizeAnswer } from './grading.js';

export const WORD_BANK_SIZE = 4;

function collect(words, seen, out) {
  for (const word of words) {
    const key = normalizeAnswer(word);
    if (key === '' || seen.has(key)) continue;
    seen.add(key);
    out.push(word);
  }
}

export function distractorPool(exercise, stageExercises) {
  // คำตอบที่ยอมรับได้ของข้อนี้ต้องไม่โผล่มาเป็นตัวลวง ไม่งั้นเด็กกดถูกแล้วขึ้นว่าผิด
  const seen = new Set((exercise.answerKey ?? []).map(normalizeAnswer));
  const others = stageExercises.filter((item) => item.id !== exercise.id);
  const pool = [];

  collect(
    others.filter((item) => item.type === 'fill_blank').flatMap((item) => item.answerKey ?? []),
    seen,
    pool,
  );

  if (pool.length < WORD_BANK_SIZE - 1) {
    collect(
      others.filter((item) => item.type === 'mcq').flatMap((item) => item.choices ?? []),
      seen,
      pool,
    );
  }

  return pool;
}

function shuffle(items, random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildWordBank(exercise, stageExercises, { size = WORD_BANK_SIZE, random = Math.random } = {}) {
  const answer = (exercise.answerKey ?? [])[0];
  const distractors = shuffle(distractorPool(exercise, stageExercises), random).slice(0, size - 1);
  return shuffle([answer, ...distractors], random);
}
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/word-bank.test.js`
Expected: PASS ทุกเคส

- [ ] **Step 5: Commit**

```bash
git add src/lib/word-bank.js src/lib/word-bank.test.js
git commit -m "feat: build fill-in-the-blank word banks from the stage itself"
```

---

## Task 7: สถานะการเล่นด่าน (`stage-session.js`)

**Files:**
- Create: `src/lib/stage-session.js`
- Test: `src/lib/stage-session.test.js`

**Interfaces:**
- Consumes: `gradeAnswer`, `scoreOf`, `starsFor` จาก `grading.js`
- Produces:
  - `createSession(exercises): Session` — `{ exercises, index, results, finished }`
  - `currentExercise(session): object | null`
  - `answerCurrent(session, answer): Session` — คืน session ใหม่ (ไม่แก้ของเดิม) พร้อมผลของข้อปัจจุบัน
  - `advance(session): Session`
  - `summarize(session, passThreshold): { correctCount, total, score, stars, passed }`
  - `Result` = `{ exerciseId: string, answer: string, correct: boolean }`

- [ ] **Step 1: เขียนเทส**

สร้าง `src/lib/stage-session.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { createSession, currentExercise, answerCurrent, advance, summarize } from './stage-session.js';

const exercises = [
  { id: 'e1', type: 'mcq', choices: ['go', 'goes'], answerKey: ['goes'] },
  { id: 'e2', type: 'mcq', choices: ['was', 'were'], answerKey: ['were'] },
];

function playThrough(answers) {
  let session = createSession(exercises);
  for (const answer of answers) {
    session = advance(answerCurrent(session, answer));
  }
  return session;
}

describe('createSession', () => {
  it('starts on the first question with nothing answered', () => {
    const session = createSession(exercises);
    expect(session.index).toBe(0);
    expect(session.results).toEqual([]);
    expect(session.finished).toBe(false);
    expect(currentExercise(session).id).toBe('e1');
  });
});

describe('answerCurrent', () => {
  it('records the result without moving to the next question', () => {
    const session = answerCurrent(createSession(exercises), 'goes');
    expect(session.results).toEqual([{ exerciseId: 'e1', answer: 'goes', correct: true }]);
    expect(session.index).toBe(0);
  });

  it('does not mutate the session it was given', () => {
    const before = createSession(exercises);
    answerCurrent(before, 'goes');
    expect(before.results).toEqual([]);
  });

  it('ignores a second answer for the same question', () => {
    const once = answerCurrent(createSession(exercises), 'goes');
    const twice = answerCurrent(once, 'go');
    expect(twice.results).toEqual(once.results);
  });
});

describe('advance', () => {
  it('moves to the next question', () => {
    const session = advance(answerCurrent(createSession(exercises), 'goes'));
    expect(session.index).toBe(1);
    expect(session.finished).toBe(false);
  });

  it('marks the session finished after the last question', () => {
    const session = playThrough(['goes', 'were']);
    expect(session.finished).toBe(true);
    expect(currentExercise(session)).toBeNull();
  });
});

describe('summarize', () => {
  it('reports a perfect run as three stars and passed', () => {
    expect(summarize(playThrough(['goes', 'were']), 0.7)).toEqual({
      correctCount: 2,
      total: 2,
      score: 1,
      stars: 3,
      passed: true,
    });
  });

  it('reports a half run as one star and not passed at the default threshold', () => {
    expect(summarize(playThrough(['goes', 'was']), 0.7)).toEqual({
      correctCount: 1,
      total: 2,
      score: 0.5,
      stars: 1,
      passed: false,
    });
  });
});
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/stage-session.test.js`
Expected: FAIL — ยังไม่มีไฟล์

- [ ] **Step 3: เขียนโมดูล**

สร้าง `src/lib/stage-session.js`:

```js
import { gradeAnswer, scoreOf, starsFor } from './grading.js';

export function createSession(exercises) {
  return { exercises, index: 0, results: [], finished: exercises.length === 0 };
}

export function currentExercise(session) {
  if (session.finished) return null;
  return session.exercises[session.index] ?? null;
}

export function answerCurrent(session, answer) {
  const exercise = currentExercise(session);
  if (!exercise) return session;
  // กันกดซ้ำ: ถ้าข้อนี้มีผลแล้วให้ถือว่าคำตอบแรกเป็นคำตอบจริง
  if (session.results.some((result) => result.exerciseId === exercise.id)) return session;

  const { correct } = gradeAnswer(exercise, answer);
  return {
    ...session,
    results: [...session.results, { exerciseId: exercise.id, answer: String(answer ?? ''), correct }],
  };
}

export function advance(session) {
  const nextIndex = session.index + 1;
  return { ...session, index: nextIndex, finished: nextIndex >= session.exercises.length };
}

export function summarize(session, passThreshold) {
  const score = scoreOf(session.results);
  return {
    correctCount: session.results.filter((result) => result.correct).length,
    total: session.exercises.length,
    score,
    stars: starsFor(score),
    passed: score >= passThreshold,
  };
}
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/stage-session.test.js`
Expected: PASS ทุกเคส

- [ ] **Step 5: Commit**

```bash
git add src/lib/stage-session.js src/lib/stage-session.test.js
git commit -m "feat: track a stage play session as pure state"
```

---

## Task 8: ความคืบหน้าและการปลดล็อก (`stage-progress.js`)

**Files:**
- Create: `src/lib/stage-progress.js`
- Test: `src/lib/stage-progress.test.js`

**Interfaces:**
- Consumes: `starsFor` จาก `grading.js`, `stageClearId` จาก `schema/doc-ids.js`
- Produces:
  - `clearsByStageId(clearDocs): Record<string, { score: number }>`
  - `buildStagePath(stages, clearsMap): Array<{ id, order, title, itemCount, passThreshold, score, stars, cleared, unlocked, lockedReason }>`
  - `totalStars(path): number`

- [ ] **Step 1: เขียนเทส**

สร้าง `src/lib/stage-progress.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { buildStagePath, totalStars, clearsByStageId } from './stage-progress.js';

const stages = [
  { id: 's1', order: 1, title: 'Past Simple', itemIds: ['a', 'b'], passThreshold: 0.7 },
  { id: 's2', order: 2, title: 'Past Continuous', itemIds: ['c'], passThreshold: 0.7 },
  { id: 's3', order: 3, title: 'Present Perfect', itemIds: ['d'], passThreshold: 0.7 },
];

describe('clearsByStageId', () => {
  it('keys the clear documents by their stage', () => {
    const map = clearsByStageId([{ stageId: 's1', score: 0.5 }]);
    expect(map).toEqual({ s1: { score: 0.5 } });
  });
});

describe('buildStagePath', () => {
  it('unlocks the first stage even with no history', () => {
    const path = buildStagePath(stages, {});
    expect(path[0]).toMatchObject({ id: 's1', unlocked: true, cleared: false, stars: 0 });
    expect(path[1]).toMatchObject({ id: 's2', unlocked: false });
  });

  it('explains why a locked stage is locked', () => {
    const path = buildStagePath(stages, {});
    expect(path[1].lockedReason).toBe('ผ่านด่าน 1 ที่ 70% ก่อน');
  });

  it('unlocks the next stage once the threshold is met', () => {
    const path = buildStagePath(stages, { s1: { score: 0.7 } });
    expect(path[0]).toMatchObject({ cleared: true, stars: 2 });
    expect(path[1].unlocked).toBe(true);
    expect(path[2].unlocked).toBe(false);
  });

  it('keeps the next stage locked when the score is below the threshold', () => {
    const path = buildStagePath(stages, { s1: { score: 0.5 } });
    expect(path[0]).toMatchObject({ cleared: false, stars: 1 });
    expect(path[1].unlocked).toBe(false);
  });

  it('sorts by order even when the input is shuffled', () => {
    const path = buildStagePath([stages[2], stages[0], stages[1]], {});
    expect(path.map((stage) => stage.id)).toEqual(['s1', 's2', 's3']);
  });

  it('reports how many questions each stage has', () => {
    expect(buildStagePath(stages, {})[0].itemCount).toBe(2);
  });
});

describe('totalStars', () => {
  it('adds up the stars of every stage', () => {
    const path = buildStagePath(stages, { s1: { score: 1 }, s2: { score: 0.5 } });
    expect(totalStars(path)).toBe(4);
  });
});
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/stage-progress.test.js`
Expected: FAIL — ยังไม่มีไฟล์

- [ ] **Step 3: เขียนโมดูล**

สร้าง `src/lib/stage-progress.js`:

```js
import { starsFor } from './grading.js';

export function clearsByStageId(clearDocs) {
  const map = {};
  for (const clear of clearDocs) {
    map[clear.stageId] = { score: clear.score };
  }
  return map;
}

export function buildStagePath(stages, clearsMap) {
  const ordered = [...stages].sort((a, b) => a.order - b.order);
  let previous = null;

  return ordered.map((stage) => {
    const score = clearsMap[stage.id]?.score ?? 0;
    const cleared = clearsMap[stage.id] !== undefined && score >= stage.passThreshold;
    const unlocked = previous === null ? true : previous.cleared;
    const entry = {
      id: stage.id,
      order: stage.order,
      title: stage.title,
      itemCount: (stage.itemIds ?? []).length,
      passThreshold: stage.passThreshold,
      score,
      stars: clearsMap[stage.id] === undefined ? 0 : starsFor(score),
      cleared,
      unlocked,
      lockedReason: unlocked
        ? null
        : `ผ่านด่าน ${previous.order} ที่ ${Math.round(previous.passThreshold * 100)}% ก่อน`,
    };
    previous = { order: stage.order, cleared, passThreshold: stage.passThreshold };
    return entry;
  });
}

export function totalStars(path) {
  return path.reduce((sum, stage) => sum + stage.stars, 0);
}
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/stage-progress.test.js`
Expected: PASS ทุกเคส

- [ ] **Step 5: Commit**

```bash
git add src/lib/stage-progress.js src/lib/stage-progress.test.js
git commit -m "feat: derive stage unlocking and stars from clear records"
```

---

## Task 9: เอกสารที่ต้องเขียนตอนจบด่าน (`stage-writes.js`)

**Files:**
- Create: `src/lib/stage-writes.js`
- Test: `src/lib/stage-writes.test.js`

**Interfaces:**
- Consumes: `submissionId`, `stageClearId` จาก `schema/doc-ids.js` · `starsFor` จาก `grading.js`
- Produces: `buildStageWrites({ uid, stage, exercises, results, existingSubmissions, existingClear, now }): { submissions: Array<{ id, data }>, stageClear: { id, data } | null }`

- [ ] **Step 1: เขียนเทส**

สร้าง `src/lib/stage-writes.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { buildStageWrites } from './stage-writes.js';

const now = '2026-09-22T04:00:00.000Z';
const stage = { id: 'st1', skill: 'grammar', level: 'A2', order: 1, passThreshold: 0.7 };
const exercises = [
  { id: 'e1', skill: 'grammar', level: 'A2', type: 'mcq', tags: ['grammar:past-simple'] },
  { id: 'e2', skill: 'grammar', level: 'A2', type: 'fill_blank', tags: ['grammar:past-simple'] },
];
const results = [
  { exerciseId: 'e1', answer: 'went', correct: true },
  { exerciseId: 'e2', answer: 'goed', correct: false },
];

function build(overrides = {}) {
  return buildStageWrites({
    uid: 'student1',
    stage,
    exercises,
    results,
    existingSubmissions: {},
    existingClear: null,
    now,
    ...overrides,
  });
}

describe('buildStageWrites', () => {
  it('uses the stable submission id for every question', () => {
    expect(build().submissions.map((write) => write.id)).toEqual([
      'student1__bank__e1',
      'student1__bank__e2',
    ]);
  });

  it('writes a fresh submission with attempt one', () => {
    const [first] = build().submissions;
    expect(first.data).toMatchObject({
      uid: 'student1',
      exerciseId: 'e1',
      skill: 'grammar',
      level: 'A2',
      type: 'mcq',
      answer: 'went',
      autoGraded: true,
      score: 1,
      bestStars: 3,
      attemptCount: 1,
      wrongCount: 0,
      status: 'completed',
      lastAnsweredAt: now,
      createdAt: now,
    });
  });

  it('never lowers bestStars, because the rules reject it and the whole batch would fail', () => {
    const existing = {
      student1__bank__e2: { bestStars: 3, attemptCount: 2, wrongCount: 0, createdAt: '2026-09-01T00:00:00.000Z' },
    };
    const write = build({ existingSubmissions: existing }).submissions[1];
    expect(write.data.bestStars).toBe(3);
    expect(write.data.score).toBe(0);
  });

  it('keeps counting attempts and wrong answers on top of what is stored', () => {
    const existing = {
      student1__bank__e2: { bestStars: 0, attemptCount: 2, wrongCount: 1, createdAt: '2026-09-01T00:00:00.000Z' },
    };
    const write = build({ existingSubmissions: existing }).submissions[1];
    expect(write.data.attemptCount).toBe(3);
    expect(write.data.wrongCount).toBe(2);
  });

  it('preserves the original createdAt, which the rules forbid changing', () => {
    const existing = {
      student1__bank__e1: { bestStars: 3, attemptCount: 1, wrongCount: 0, createdAt: '2026-09-01T00:00:00.000Z' },
    };
    const write = build({ existingSubmissions: existing }).submissions[0];
    expect(write.data.createdAt).toBe('2026-09-01T00:00:00.000Z');
  });

  it('writes a stage clear that records the score even when the stage was not passed', () => {
    const { stageClear } = build();
    expect(stageClear.id).toBe('student1__st1');
    expect(stageClear.data).toEqual({
      uid: 'student1',
      stageId: 'st1',
      skill: 'grammar',
      level: 'A2',
      order: 1,
      score: 0.5,
      clearedAt: now,
    });
  });

  it('skips the stage clear when the stored score is already better', () => {
    expect(build({ existingClear: { score: 1 } }).stageClear).toBeNull();
  });

  it('replaces the stage clear when this run was better', () => {
    expect(build({ existingClear: { score: 0.25 } }).stageClear.data.score).toBe(0.5);
  });
});
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/stage-writes.test.js`
Expected: FAIL — ยังไม่มีไฟล์

- [ ] **Step 3: เขียนโมดูล**

สร้าง `src/lib/stage-writes.js`:

```js
import { submissionId, stageClearId } from './schema/doc-ids.js';
import { starsFor, scoreOf } from './grading.js';

export function buildStageWrites({
  uid,
  stage,
  exercises,
  results,
  existingSubmissions = {},
  existingClear = null,
  now = new Date().toISOString(),
}) {
  const resultByExercise = new Map(results.map((result) => [result.exerciseId, result]));

  const submissions = exercises
    .filter((exercise) => resultByExercise.has(exercise.id))
    .map((exercise) => {
      const result = resultByExercise.get(exercise.id);
      const id = submissionId(uid, exercise.id);
      const previous = existingSubmissions[id] ?? null;
      const stars = starsFor(result.correct ? 1 : 0);

      return {
        id,
        data: {
          uid,
          exerciseId: exercise.id,
          skill: exercise.skill,
          level: exercise.level,
          type: exercise.type,
          tags: exercise.tags ?? [],
          answer: result.answer,
          autoGraded: true,
          score: result.correct ? 1 : 0,
          // ห้ามต่ำกว่าค่าเดิมเด็ดขาด — rules ปฏิเสธแล้ว batch จะล้มทั้งชุด
          bestStars: Math.max(stars, previous?.bestStars ?? 0),
          attemptCount: (previous?.attemptCount ?? 0) + 1,
          wrongCount: (previous?.wrongCount ?? 0) + (result.correct ? 0 : 1),
          lastAnsweredAt: now,
          status: 'completed',
          createdAt: previous?.createdAt ?? now,
        },
      };
    });

  const score = scoreOf(results);
  const keepExisting = existingClear !== null && existingClear.score >= score;

  return {
    submissions,
    stageClear: keepExisting
      ? null
      : {
          id: stageClearId(uid, stage.id),
          data: {
            uid,
            stageId: stage.id,
            skill: stage.skill,
            level: stage.level,
            order: stage.order,
            score,
            clearedAt: now,
          },
        },
  };
}
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/stage-writes.test.js`
Expected: PASS ทุกเคส

- [ ] **Step 5: Commit**

```bash
git add src/lib/stage-writes.js src/lib/stage-writes.test.js
git commit -m "feat: compute the documents written when a stage ends"
```

---

## Task 10: ตรรกะฟอร์มสร้างด่าน (`stage-form.js`)

**Files:**
- Create: `src/lib/stage-form.js`
- Test: `src/lib/stage-form.test.js`

**Interfaces:**
- Consumes: `distractorPool`, `WORD_BANK_SIZE` จาก `word-bank.js` · `LEVELS` จาก `schema/taxonomy.js` · `DEFAULT_PASS_THRESHOLD` จาก `schema/stages.js`
- Produces:
  - `STAGE_ITEM_TYPES = ['mcq', 'fill_blank']`
  - `emptyStageState(overrides): StageState` — `{ skill, level, order, title, itemIds, passThreshold, isPreview, reviewStatus }`
  - `stageStateFromDoc(doc): StageState`
  - `toggleItem(state, exerciseId): StageState`
  - `moveItem(state, index, delta): StageState`
  - `validateStage(state, exercisesById): { valid, errors: Record<string,string>, warnings: string[] }`
  - `buildStageDoc(state, { existing, adminUid, now }): object`

- [ ] **Step 1: เขียนเทส**

สร้าง `src/lib/stage-form.test.js`:

```js
import { describe, it, expect } from 'vitest';
import {
  STAGE_ITEM_TYPES,
  emptyStageState,
  stageStateFromDoc,
  toggleItem,
  moveItem,
  validateStage,
  buildStageDoc,
} from './stage-form.js';

const now = '2026-09-22T04:00:00.000Z';

function exercise(id, overrides = {}) {
  return {
    id,
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    choices: ['a', 'b'],
    answerKey: ['a'],
    reviewStatus: 'published',
    ...overrides,
  };
}

const library = {
  e1: exercise('e1'),
  e2: exercise('e2'),
  e3: exercise('e3', { type: 'fill_blank', choices: undefined, answerKey: ['went'] }),
};

function readyState(overrides = {}) {
  return emptyStageState({ title: 'Past Simple', order: 1, itemIds: ['e1', 'e2'], ...overrides });
}

describe('emptyStageState', () => {
  it('starts as a draft A1 grammar stage with the default threshold', () => {
    expect(emptyStageState()).toMatchObject({
      skill: 'grammar',
      level: 'A1',
      order: 1,
      title: '',
      passThreshold: 0.7,
      isPreview: false,
      reviewStatus: 'draft',
    });
    expect(emptyStageState().itemIds).toEqual([]);
  });

  it('only allows auto-gradable question types in a stage', () => {
    expect(STAGE_ITEM_TYPES).toEqual(['mcq', 'fill_blank']);
  });
});

describe('toggleItem', () => {
  it('adds an id that is not in the stage yet', () => {
    expect(toggleItem(emptyStageState(), 'e1').itemIds).toEqual(['e1']);
  });

  it('removes an id that is already there', () => {
    expect(toggleItem(readyState(), 'e1').itemIds).toEqual(['e2']);
  });
});

describe('moveItem', () => {
  it('moves an item later in the list', () => {
    expect(moveItem(readyState(), 0, 1).itemIds).toEqual(['e2', 'e1']);
  });

  it('does nothing at the edges', () => {
    expect(moveItem(readyState(), 0, -1).itemIds).toEqual(['e1', 'e2']);
    expect(moveItem(readyState(), 1, 1).itemIds).toEqual(['e1', 'e2']);
  });
});

describe('validateStage', () => {
  it('accepts a complete stage', () => {
    expect(validateStage(readyState(), library).valid).toBe(true);
  });

  it('requires a title', () => {
    const { valid, errors } = validateStage(readyState({ title: '  ' }), library);
    expect(valid).toBe(false);
    expect(errors.title).toBe('กรุณาตั้งชื่อด่าน');
  });

  it('requires at least one question', () => {
    const { errors } = validateStage(readyState({ itemIds: [] }), library);
    expect(errors.itemIds).toBe('ด่านต้องมีโจทย์อย่างน้อย 1 ข้อ');
  });

  it('refuses more than twenty questions', () => {
    const many = Array.from({ length: 21 }, (_, i) => `x${i}`);
    const { errors } = validateStage(readyState({ itemIds: many }), library);
    expect(errors.itemIds).toBe('ด่านมีโจทย์ได้ไม่เกิน 20 ข้อ');
  });

  it('refuses question types that cannot be graded automatically', () => {
    const shelf = { ...library, e4: exercise('e4', { type: 'paragraph', choices: undefined, answerKey: undefined }) };
    const { errors } = validateStage(readyState({ itemIds: ['e1', 'e4'] }), shelf);
    expect(errors.itemIds).toBe('ด่านรับเฉพาะข้อปรนัยและข้อเติมคำเท่านั้น');
  });

  it('blocks publishing a stage that still holds unpublished questions', () => {
    const shelf = { ...library, e2: exercise('e2', { reviewStatus: 'draft' }) };
    const state = readyState({ reviewStatus: 'published' });
    const { errors } = validateStage(state, shelf);
    expect(errors.reviewStatus).toBe('อนุมัติด่านไม่ได้ เพราะยังมีโจทย์ที่ยังไม่อนุมัติอยู่ในด่าน');
  });

  it('allows an unpublished question while the stage is still a draft', () => {
    const shelf = { ...library, e2: exercise('e2', { reviewStatus: 'draft' }) };
    expect(validateStage(readyState(), shelf).valid).toBe(true);
  });

  it('warns when a question does not match the skill or level of the stage', () => {
    const shelf = { ...library, e2: exercise('e2', { level: 'B1' }) };
    const { valid, warnings } = validateStage(readyState(), shelf);
    expect(valid).toBe(true);
    expect(warnings).toContain('โจทย์ข้อที่ 2 เป็นระดับ B1 ไม่ตรงกับด่าน (A2)');
  });

  it('warns when a blank cannot get three distractors from the stage', () => {
    const { warnings } = validateStage(readyState({ itemIds: ['e3'] }), library);
    expect(warnings).toContain('ข้อเติมคำข้อที่ 1 หาตัวเลือกลวงได้ไม่ครบ 3 ตัว เด็กจะเดาง่ายเกินไป');
  });
});

describe('buildStageDoc', () => {
  it('builds a document ready for Firestore', () => {
    const doc = buildStageDoc(readyState(), { adminUid: 'admin1', now });
    expect(doc).toEqual({
      skill: 'grammar',
      level: 'A1',
      order: 1,
      title: 'Past Simple',
      itemIds: ['e1', 'e2'],
      passThreshold: 0.7,
      isPreview: false,
      reviewStatus: 'draft',
      createdAt: now,
      updatedAt: now,
      createdBy: 'admin1',
    });
  });

  it('keeps the original creator and creation time when editing', () => {
    const existing = { createdAt: '2026-09-01T00:00:00.000Z', createdBy: 'admin2' };
    const doc = buildStageDoc(readyState(), { existing, adminUid: 'admin1', now });
    expect(doc.createdAt).toBe('2026-09-01T00:00:00.000Z');
    expect(doc.createdBy).toBe('admin2');
    expect(doc.updatedAt).toBe(now);
  });
});
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/stage-form.test.js`
Expected: FAIL — ยังไม่มีไฟล์

- [ ] **Step 3: เขียนโมดูล**

สร้าง `src/lib/stage-form.js`:

```js
import { DEFAULT_PASS_THRESHOLD } from './schema/stages.js';
import { distractorPool, WORD_BANK_SIZE } from './word-bank.js';

export const STAGE_ITEM_TYPES = ['mcq', 'fill_blank'];
const MAX_ITEMS = 20;

export function emptyStageState(overrides = {}) {
  return {
    skill: 'grammar',
    level: 'A1',
    order: 1,
    title: '',
    itemIds: [],
    passThreshold: DEFAULT_PASS_THRESHOLD,
    isPreview: false,
    reviewStatus: 'draft',
    ...overrides,
  };
}

export function stageStateFromDoc(doc) {
  return emptyStageState({
    skill: doc.skill,
    level: doc.level,
    order: doc.order,
    title: doc.title ?? '',
    itemIds: [...(doc.itemIds ?? [])],
    passThreshold: doc.passThreshold ?? DEFAULT_PASS_THRESHOLD,
    isPreview: Boolean(doc.isPreview),
    reviewStatus: doc.reviewStatus ?? 'draft',
  });
}

export function toggleItem(state, exerciseId) {
  const itemIds = state.itemIds.includes(exerciseId)
    ? state.itemIds.filter((id) => id !== exerciseId)
    : [...state.itemIds, exerciseId];
  return { ...state, itemIds };
}

export function moveItem(state, index, delta) {
  const target = index + delta;
  if (target < 0 || target >= state.itemIds.length) return state;
  const itemIds = [...state.itemIds];
  [itemIds[index], itemIds[target]] = [itemIds[target], itemIds[index]];
  return { ...state, itemIds };
}

export function validateStage(state, exercisesById) {
  const errors = {};
  const warnings = [];
  const items = state.itemIds.map((id) => exercisesById[id]).filter(Boolean);

  if (!state.title.trim()) errors.title = 'กรุณาตั้งชื่อด่าน';
  if (state.itemIds.length === 0) errors.itemIds = 'ด่านต้องมีโจทย์อย่างน้อย 1 ข้อ';
  else if (state.itemIds.length > MAX_ITEMS) errors.itemIds = `ด่านมีโจทย์ได้ไม่เกิน ${MAX_ITEMS} ข้อ`;
  else if (items.some((item) => !STAGE_ITEM_TYPES.includes(item.type))) {
    errors.itemIds = 'ด่านรับเฉพาะข้อปรนัยและข้อเติมคำเท่านั้น';
  }

  // ถ้าอนุมัติด่านทั้งที่ข้อยังไม่อนุมัติ rules จะไม่คืนข้อนั้นให้เด็ก ได้ด่านแหว่งทันที
  if (state.reviewStatus === 'published' && items.some((item) => item.reviewStatus !== 'published')) {
    errors.reviewStatus = 'อนุมัติด่านไม่ได้ เพราะยังมีโจทย์ที่ยังไม่อนุมัติอยู่ในด่าน';
  }

  items.forEach((item, index) => {
    if (item.level !== state.level) {
      warnings.push(`โจทย์ข้อที่ ${index + 1} เป็นระดับ ${item.level} ไม่ตรงกับด่าน (${state.level})`);
    }
    if (item.skill !== state.skill) {
      warnings.push(`โจทย์ข้อที่ ${index + 1} เป็นสกิล ${item.skill} ไม่ตรงกับด่าน (${state.skill})`);
    }
    if (item.type === 'fill_blank' && distractorPool(item, items).length < WORD_BANK_SIZE - 1) {
      warnings.push(
        `ข้อเติมคำข้อที่ ${index + 1} หาตัวเลือกลวงได้ไม่ครบ ${WORD_BANK_SIZE - 1} ตัว เด็กจะเดาง่ายเกินไป`,
      );
    }
  });

  return { valid: Object.keys(errors).length === 0, errors, warnings };
}

export function buildStageDoc(state, { existing = null, adminUid, now = new Date().toISOString() } = {}) {
  return {
    skill: state.skill,
    level: state.level,
    order: state.order,
    title: state.title.trim(),
    itemIds: [...state.itemIds],
    passThreshold: state.passThreshold,
    isPreview: state.isPreview,
    reviewStatus: state.reviewStatus,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    createdBy: existing?.createdBy ?? adminUid,
  };
}
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/stage-form.test.js`
Expected: PASS ทุกเคส

- [ ] **Step 5: Commit**

```bash
git add src/lib/stage-form.js src/lib/stage-form.test.js
git commit -m "feat: add stage form logic with authoring-time guards"
```

---

# ส่วนที่ 4 — ชั้นที่คุยกับ Firestore

## Task 11: อ่านเขียนด่าน (`stage-io.js`, `stage-result-io.js`)

**Files:**
- Create: `src/lib/stage-io.js`
- Create: `src/lib/stage-result-io.js`
- Modify: `src/lib/queries.js`

**Interfaces:**
- Consumes: `buildQuery` จาก `queries.js` · `buildStageWrites` จาก `stage-writes.js` · `submissionId` จาก `schema/doc-ids.js`
- Produces:
  - `stageConstraints({ skill, level, publishedOnly }): Array` ใน `queries.js`
  - `fetchStages(db, options): Promise<Array<{ id, ...doc }>>`
  - `fetchStage(db, id): Promise<{ id, ...doc } | null>`
  - `saveStage(db, id | null, doc): Promise<string>` — คืน id
  - `fetchStageExercises(db, itemIds): Promise<Array<{ id, ...doc }>>` — เรียงตาม `itemIds`
  - `fetchMyClears(db, uid): Promise<Array<doc>>`
  - `saveStageResult(db, { uid, stage, exercises, results, now }): Promise<void>`

- [ ] **Step 1: เพิ่ม constraint builder และเขียนเทสของมัน**

เพิ่มใน `src/lib/queries.js`:

```js
export function stageConstraints({ skill, level, publishedOnly = true } = {}) {
  const constraints = [];
  if (publishedOnly) constraints.push(['reviewStatus', '==', 'published']);
  if (skill) constraints.push(['skill', '==', skill]);
  if (level) constraints.push(['level', '==', level]);
  return constraints;
}

export function myClearConstraints(uid) {
  return [['uid', '==', uid]];
}
```

เพิ่มใน `src/lib/queries.test.js`:

```js
describe('stageConstraints', () => {
  it('asks only for published stages of one skill and level', () => {
    expect(stageConstraints({ skill: 'grammar', level: 'A2' })).toEqual([
      ['reviewStatus', '==', 'published'],
      ['skill', '==', 'grammar'],
      ['level', '==', 'A2'],
    ]);
  });

  it('lets an admin ask for drafts too', () => {
    expect(stageConstraints({ publishedOnly: false })).toEqual([]);
  });
});

describe('myClearConstraints', () => {
  it('filters clears down to one student', () => {
    expect(myClearConstraints('student1')).toEqual([['uid', '==', 'student1']]);
  });
});
```

อย่าลืมเพิ่มสองชื่อนี้ในบรรทัด `import` ที่หัวไฟล์เทส

- [ ] **Step 2: รันเทส**

Run: `npx vitest run src/lib/queries.test.js`
Expected: PASS

- [ ] **Step 3: เขียน `stage-io.js`**

สร้าง `src/lib/stage-io.js`:

```js
import { collection, doc, documentId, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { buildQuery, stageConstraints, myClearConstraints } from './queries.js';

export async function fetchStages(db, options = {}) {
  const snapshot = await getDocs(
    buildQuery(db, 'stages', stageConstraints(options), { field: 'order', direction: 'asc' }),
  );
  return snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
}

export async function fetchStage(db, id) {
  const snap = await getDoc(doc(db, 'stages', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function saveStage(db, id, data) {
  const ref = id ? doc(db, 'stages', id) : doc(collection(db, 'stages'));
  await setDoc(ref, data);
  return ref.id;
}

// itemIds มีได้ไม่เกิน 20 ตาม schema ส่วนลิมิตของ `in` คือ 30 จึงจบใน query เดียวเสมอ
export async function fetchStageExercises(db, itemIds) {
  if (itemIds.length === 0) return [];
  const snapshot = await getDocs(
    query(collection(db, 'exercises'), where(documentId(), 'in', itemIds)),
  );
  const byId = new Map(snapshot.docs.map((snap) => [snap.id, { id: snap.id, ...snap.data() }]));
  // Firestore ไม่รับประกันลำดับผลลัพธ์ ต้องเรียงกลับตาม itemIds เอง
  return itemIds.map((id) => byId.get(id)).filter(Boolean);
}

export async function fetchMyClears(db, uid) {
  const snapshot = await getDocs(buildQuery(db, 'stageClears', myClearConstraints(uid)));
  return snapshot.docs.map((snap) => snap.data());
}
```

- [ ] **Step 4: เขียน `stage-result-io.js`**

สร้าง `src/lib/stage-result-io.js`:

```js
import { collection, doc, documentId, getDoc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { submissionId, stageClearId } from './schema/doc-ids.js';
import { buildStageWrites } from './stage-writes.js';

// ต้องอ่านของเดิมก่อนเสมอ: rules ห้าม bestStars ลดลงและห้ามแก้ createdAt
// ถ้าเขียนทับดื้อๆ แล้วโดนปฏิเสธ batch จะล้มทั้งชุด เด็กเสียผลทั้งด่าน
async function fetchExistingSubmissions(db, uid, exerciseIds) {
  if (exerciseIds.length === 0) return {};
  const ids = exerciseIds.map((exerciseId) => submissionId(uid, exerciseId));
  // ไม่ต้องกรอง uid เพิ่ม เพราะ uid ฝังอยู่ใน doc id อยู่แล้ว
  const snapshot = await getDocs(
    query(collection(db, 'submissions'), where(documentId(), 'in', ids)),
  );
  return Object.fromEntries(snapshot.docs.map((snap) => [snap.id, snap.data()]));
}

export async function saveStageResult(db, { uid, stage, exercises, results, now = new Date().toISOString() }) {
  const existingSubmissions = await fetchExistingSubmissions(
    db,
    uid,
    results.map((result) => result.exerciseId),
  );
  const clearSnap = await getDoc(doc(db, 'stageClears', stageClearId(uid, stage.id)));
  const existingClear = clearSnap.exists() ? clearSnap.data() : null;

  const writes = buildStageWrites({ uid, stage, exercises, results, existingSubmissions, existingClear, now });

  const batch = writeBatch(db);
  for (const write of writes.submissions) {
    batch.set(doc(db, 'submissions', write.id), write.data);
  }
  if (writes.stageClear) {
    batch.set(doc(db, 'stageClears', writes.stageClear.id), writes.stageClear.data);
  }
  await batch.commit();
}
```

- [ ] **Step 5: รันเทสทั้งหมด**

Run: `npm test`
Expected: PASS ทั้งหมด (ไฟล์ io ไม่มีเทสของตัวเอง — ตรรกะอยู่ใน `stage-writes.js` ที่เทสครบแล้ว และโฟลว์จริงจะถูกทดสอบด้วย rules test ใน Task 12)

- [ ] **Step 6: Commit**

```bash
git add src/lib/queries.js src/lib/queries.test.js src/lib/stage-io.js src/lib/stage-result-io.js
git commit -m "feat: read stages and commit stage results through Firestore"
```

---

## Task 12: rules test ของโฟลว์จบด่านจริง

**Files:**
- Test: `tests/rules/activity.test.js`

**Interfaces:**
- Consumes: helper `withTestEnv`, `authedDb`, `seed`, `studentDoc`, `adminDoc` ที่มีอยู่แล้ว

- [ ] **Step 1: เขียนเทสของโฟลว์ batch**

เพิ่ม `describe` ใหม่ท้าย `tests/rules/activity.test.js`:

```js
describe('finishing a stage', () => {
  const stageClear = (overrides = {}) => ({
    uid: 'student1',
    stageId: 'st1',
    skill: 'grammar',
    level: 'A2',
    order: 1,
    score: 0.5,
    clearedAt: '2026-09-22T04:00:00.000Z',
    ...overrides,
  });

  it('writes every submission and the stage clear in one batch', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc() });
      const db = authedDb(env, 'student1');
      const batch = db.batch();
      batch.set(db.collection('submissions').doc('student1__bank__e1'), submission({ exerciseId: 'e1' }));
      batch.set(db.collection('submissions').doc('student1__bank__e2'), submission({ exerciseId: 'e2' }));
      batch.set(db.collection('stageClears').doc('student1__st1'), stageClear());
      await assertSucceeds(batch.commit());
    });
  });

  it('rejects the whole batch when one submission lowers bestStars', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        'users/student1': studentDoc(),
        'submissions/student1__bank__e1': submission({ exerciseId: 'e1', bestStars: 3 }),
      });
      const db = authedDb(env, 'student1');
      const batch = db.batch();
      batch.set(db.collection('submissions').doc('student1__bank__e1'), submission({ exerciseId: 'e1', bestStars: 0 }));
      batch.set(db.collection('stageClears').doc('student1__st1'), stageClear());
      await assertFails(batch.commit());
    });
  });

  it('accepts the batch when bestStars stays the same', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        'users/student1': studentDoc(),
        'submissions/student1__bank__e1': submission({ exerciseId: 'e1', bestStars: 3 }),
      });
      const db = authedDb(env, 'student1');
      await assertSucceeds(
        db
          .collection('submissions')
          .doc('student1__bank__e1')
          .set(submission({ exerciseId: 'e1', bestStars: 3, attemptCount: 2, wrongCount: 1, score: 0 })),
      );
    });
  });

  it('blocks writing a stage clear that belongs to somebody else', async () => {
    await withTestEnv(async (env) => {
      await seed(env, { 'users/student1': studentDoc(), 'users/student2': studentDoc({ uid: 'student2' }) });
      const db = authedDb(env, 'student1');
      await assertFails(
        db.collection('stageClears').doc('student2__st1').set(stageClear({ uid: 'student2' })),
      );
    });
  });

  it('blocks a free-tier student from reading a stage that is not a preview', async () => {
    await withTestEnv(async (env) => {
      await seed(env, {
        'users/student1': studentDoc({ tier: 'free' }),
        'stages/st1': {
          skill: 'grammar',
          level: 'A2',
          order: 1,
          title: 'Past Simple',
          itemIds: ['e1'],
          passThreshold: 0.7,
          isPreview: false,
          reviewStatus: 'published',
          createdAt: '2026-09-22T04:00:00.000Z',
          updatedAt: '2026-09-22T04:00:00.000Z',
          createdBy: 'admin1',
        },
      });
      const db = authedDb(env, 'student1');
      await assertFails(db.collection('stages').doc('st1').get());
    });
  });
});
```

- [ ] **Step 2: รัน rules test**

Run: `npm run test:rules`
Expected: PASS ทุกเคส — ถ้าเคส `rejects the whole batch` กลับผ่าน (ไม่ล้ม) แปลว่า rules หลวมกว่าที่ spec เข้าใจ ให้หยุดแล้วรายงาน อย่าแก้เทสให้ผ่าน

- [ ] **Step 3: Commit**

```bash
git add tests/rules/activity.test.js
git commit -m "test: cover the end-of-stage batch against the security rules"
```

---

# ส่วนที่ 5 — หน้าแอดมินสำหรับด่าน

## Task 13: หน้ารายการด่าน

**Files:**
- Create: `src/admin/stages.html`
- Create: `src/admin/stages.js`
- Modify: `src/lib/admin-nav.js`
- Modify: `src/lib/admin-nav.test.js`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: `fetchStages` จาก `stage-io.js` · `requireAdmin` จาก `auth-guard.js` · `renderAdminNav` จาก `admin-nav.js`

- [ ] **Step 1: เพิ่มหน้าใหม่เข้าเมนูแอดมิน (เทสก่อน)**

แก้เคสใน `src/lib/admin-nav.test.js` ที่ตรวจรายการเมนู ให้คาดหวังลิงก์ใหม่ — เพิ่มบรรทัดนี้ในลิสต์ที่เทสเทียบ (ระหว่าง `admin/content.html` กับ `admin/import.html`):

```js
  'admin/stages.html',
```

- [ ] **Step 2: รันเทสให้เห็นว่าล้ม**

Run: `npx vitest run src/lib/admin-nav.test.js`
Expected: FAIL — รายการเมนูยังไม่มีหน้านี้

- [ ] **Step 3: เพิ่มเข้า `ADMIN_PAGES`**

ใน `src/lib/admin-nav.js` แทรกระหว่าง `content.html` กับ `import.html`:

```js
  { href: 'admin/stages.html', label: 'ด่าน' },
```

- [ ] **Step 4: รันเทสให้ผ่าน**

Run: `npx vitest run src/lib/admin-nav.test.js`
Expected: PASS

- [ ] **Step 5: สร้างหน้า HTML**

สร้าง `src/admin/stages.html`:

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ด่าน — Pik a Class</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mitr:wght@400;500;600&display=swap" />
  <link rel="stylesheet" href="../styles/tokens.css" />
  <link rel="stylesheet" href="../styles/base.css" />
</head>
<body>
  <div id="admin-nav"></div>
  <main>
    <h1>ด่าน</h1>
    <p><a id="new-stage" class="btn-primary" href="#">+ สร้างด่านใหม่</a></p>
    <div class="admin-filters">
      <label>สกิล <select id="filter-skill"></select></label>
      <label>ระดับ <select id="filter-level"></select></label>
      <label>สถานะ <select id="filter-status"></select></label>
    </div>
    <p id="stage-count"></p>
    <ul id="stage-list" class="admin-summary"></ul>
  </main>
  <script type="module" src="./stages.js"></script>
</body>
</html>
```

- [ ] **Step 6: เขียนสคริปต์ของหน้า**

สร้าง `src/admin/stages.js`:

```js
import { requireAdmin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { fetchStages } from '../lib/stage-io.js';
import { showPageError } from '../lib/page-error.js';
import { LEVELS } from '../lib/schema/taxonomy.js';

const base = import.meta.env.BASE_URL;
renderAdminNav(document.getElementById('admin-nav'), 'admin/stages.html', base);
document.getElementById('new-stage').href = `${base}admin/stage.html`;

function fillSelect(id, options) {
  const select = document.getElementById(id);
  for (const [value, label] of options) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  }
}

fillSelect('filter-skill', [['', 'ทั้งหมด'], ['grammar', 'ไวยากรณ์'], ['vocab', 'คำศัพท์'], ['dialogue', 'บทสนทนา']]);
fillSelect('filter-level', [['', 'ทั้งหมด'], ...LEVELS.map((level) => [level, level])]);
fillSelect('filter-status', [['', 'ทั้งหมด'], ['published', 'อนุมัติแล้ว'], ['draft', 'ฉบับร่าง'], ['reviewed', 'ตรวจแล้ว']]);

const list = document.getElementById('stage-list');
const count = document.getElementById('stage-count');

function render(stages, status) {
  const shown = status ? stages.filter((stage) => stage.reviewStatus === status) : stages;
  count.textContent = `ทั้งหมด ${shown.length} ด่าน`;
  list.replaceChildren();
  for (const stage of shown) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `${base}admin/stage.html?id=${stage.id}`;
    link.textContent = `ด่าน ${stage.order} · ${stage.title}`;
    item.appendChild(link);
    const meta = document.createElement('span');
    meta.textContent = ` — ${stage.skill} ${stage.level} · ${stage.itemIds.length} ข้อ · ${stage.reviewStatus}`;
    item.appendChild(meta);
    list.appendChild(item);
  }
}

async function reload() {
  try {
    const stages = await fetchStages(db, {
      skill: document.getElementById('filter-skill').value || undefined,
      level: document.getElementById('filter-level').value || undefined,
      publishedOnly: false,
    });
    render(stages, document.getElementById('filter-status').value);
  } catch (error) {
    showPageError('โหลดรายการด่านไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
}

for (const id of ['filter-skill', 'filter-level', 'filter-status']) {
  document.getElementById(id).addEventListener('change', reload);
}

requireAdmin(() => {
  reload();
});
```

- [ ] **Step 7: ลงทะเบียนหน้าใน vite**

ใน `vite.config.js` เพิ่มใน `rollupOptions.input`:

```js
        adminStages: resolve(__dirname, 'src/admin/stages.html'),
```

- [ ] **Step 8: รันเทสและดูหน้าจริง**

Run: `npm test` แล้ว `npm run dev`
Expected: เทสผ่าน · เปิด `/admin/stages.html` แล้วเห็นเมนู ตัวกรอง และข้อความ "ทั้งหมด 0 ด่าน"

- [ ] **Step 9: Commit**

```bash
git add src/admin/stages.html src/admin/stages.js src/lib/admin-nav.js src/lib/admin-nav.test.js vite.config.js
git commit -m "feat: list stages in the admin area"
```

---

## Task 14: หน้าสร้าง/แก้ด่าน

**Files:**
- Create: `src/admin/stage.html`
- Create: `src/admin/stage.js`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: ทุกฟังก์ชันจาก `stage-form.js` · `fetchStage`, `saveStage` จาก `stage-io.js` · `fetchContent` จาก `admin-content-io.js` · `contentLibraryConstraints` จาก `queries.js`

- [ ] **Step 1: สร้างหน้า HTML**

สร้าง `src/admin/stage.html`:

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>แก้ด่าน — Pik a Class</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mitr:wght@400;500;600&display=swap" />
  <link rel="stylesheet" href="../styles/tokens.css" />
  <link rel="stylesheet" href="../styles/base.css" />
</head>
<body>
  <div id="admin-nav"></div>
  <main>
    <h1 id="page-title">สร้างด่านใหม่</h1>

    <div class="form-group">
      <label for="title">ชื่อด่าน</label>
      <input type="text" id="title" />
      <span class="field-error" data-error-for="title"></span>
    </div>
    <div class="admin-filters">
      <label>สกิล <select id="skill"></select></label>
      <label>ระดับ <select id="level"></select></label>
      <label>ลำดับ <input type="number" id="order" min="1" value="1" /></label>
      <label>เกณฑ์ผ่าน (%) <input type="number" id="threshold" min="0" max="100" value="70" /></label>
    </div>
    <div class="form-group form-group-check">
      <label><input type="checkbox" id="isPreview" /> ให้ผู้ใช้ทั่วไป (tier free) เล่นได้</label>
    </div>
    <div class="form-group">
      <label for="reviewStatus">สถานะ</label>
      <select id="reviewStatus"></select>
      <span class="field-error" data-error-for="reviewStatus"></span>
    </div>

    <h2>โจทย์ในด่าน</h2>
    <ol id="chosen-list"></ol>
    <span class="field-error" data-error-for="itemIds"></span>
    <ul id="warning-list"></ul>

    <h2>เลือกจากคลัง</h2>
    <p>แสดงเฉพาะข้อปรนัยและข้อเติมคำที่อยู่ในสกิล/ระดับเดียวกับด่าน</p>
    <ul id="library-list" class="admin-summary"></ul>

    <p>
      <button type="button" id="save" class="btn-primary">บันทึก</button>
      <button type="button" id="play" class="btn-primary">ลองเล่นด่านนี้</button>
    </p>
  </main>
  <script type="module" src="./stage.js"></script>
</body>
</html>
```

- [ ] **Step 2: เขียนสคริปต์ของหน้า**

สร้าง `src/admin/stage.js`:

```js
import { requireAdmin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { fetchStage, saveStage } from '../lib/stage-io.js';
import { fetchContent } from '../lib/admin-content-io.js';
import { contentLibraryConstraints } from '../lib/queries.js';
import { showPageError } from '../lib/page-error.js';
import { LEVELS } from '../lib/schema/taxonomy.js';
import {
  STAGE_ITEM_TYPES,
  emptyStageState,
  stageStateFromDoc,
  toggleItem,
  moveItem,
  validateStage,
  buildStageDoc,
} from '../lib/stage-form.js';

const base = import.meta.env.BASE_URL;
renderAdminNav(document.getElementById('admin-nav'), 'admin/stages.html', base);

const stageId = new URLSearchParams(window.location.search).get('id');
let state = emptyStageState();
let existing = null;
let adminUid = null;
let library = [];

function fillSelect(id, options) {
  const select = document.getElementById(id);
  for (const [value, label] of options) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  }
}

fillSelect('skill', [['grammar', 'ไวยากรณ์'], ['vocab', 'คำศัพท์'], ['dialogue', 'บทสนทนา']]);
fillSelect('level', LEVELS.map((level) => [level, level]));
fillSelect('reviewStatus', [['draft', 'ฉบับร่าง'], ['reviewed', 'ตรวจแล้ว'], ['published', 'อนุมัติแล้ว']]);

function libraryById() {
  return Object.fromEntries(library.map((item) => [item.id, item]));
}

function shortPrompt(item) {
  return item.prompt.length > 60 ? `${item.prompt.slice(0, 60)}…` : item.prompt;
}

function renderChosen() {
  const byId = libraryById();
  const list = document.getElementById('chosen-list');
  list.replaceChildren();

  state.itemIds.forEach((id, index) => {
    const item = document.createElement('li');
    const found = byId[id];
    item.textContent = found ? shortPrompt(found) : `(ไม่พบโจทย์ ${id})`;

    for (const [label, delta] of [['↑', -1], ['↓', 1]]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => {
        state = moveItem(state, index, delta);
        renderAll();
      });
      item.appendChild(button);
    }

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'เอาออก';
    remove.addEventListener('click', () => {
      state = toggleItem(state, id);
      renderAll();
    });
    item.appendChild(remove);
    list.appendChild(item);
  });
}

function renderLibrary() {
  const list = document.getElementById('library-list');
  list.replaceChildren();

  for (const item of library) {
    if (!STAGE_ITEM_TYPES.includes(item.type)) continue;
    const row = document.createElement('li');
    const label = document.createElement('label');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = state.itemIds.includes(item.id);
    check.addEventListener('change', () => {
      state = toggleItem(state, item.id);
      renderAll();
    });
    label.appendChild(check);
    label.appendChild(
      document.createTextNode(` [${item.type}] ${shortPrompt(item)} — ${item.reviewStatus}`),
    );
    row.appendChild(label);
    list.appendChild(row);
  }
}

function renderValidation() {
  const { errors, warnings } = validateStage(state, libraryById());
  document.querySelectorAll('.field-error').forEach((el) => {
    el.textContent = '';
  });
  for (const [field, message] of Object.entries(errors)) {
    const el = document.querySelector(`[data-error-for="${field}"]`);
    if (el) el.textContent = message;
  }
  const list = document.getElementById('warning-list');
  list.replaceChildren();
  for (const warning of warnings) {
    const item = document.createElement('li');
    item.textContent = `⚠️ ${warning}`;
    list.appendChild(item);
  }
}

function renderAll() {
  document.getElementById('title').value = state.title;
  document.getElementById('skill').value = state.skill;
  document.getElementById('level').value = state.level;
  document.getElementById('order').value = state.order;
  document.getElementById('threshold').value = Math.round(state.passThreshold * 100);
  document.getElementById('isPreview').checked = state.isPreview;
  document.getElementById('reviewStatus').value = state.reviewStatus;
  renderChosen();
  renderLibrary();
  renderValidation();
  document.getElementById('play').hidden = !stageId;
}

async function reloadLibrary() {
  library = await fetchContent(
    db,
    'exercises',
    contentLibraryConstraints({ skill: state.skill, level: state.level }),
  );
  library = library.filter((item) => !item.deletedAt);
  renderAll();
}

document.getElementById('title').addEventListener('input', (event) => {
  state = { ...state, title: event.target.value };
  renderValidation();
});
document.getElementById('order').addEventListener('input', (event) => {
  state = { ...state, order: Number(event.target.value) || 1 };
});
document.getElementById('threshold').addEventListener('input', (event) => {
  state = { ...state, passThreshold: (Number(event.target.value) || 0) / 100 };
});
document.getElementById('isPreview').addEventListener('change', (event) => {
  state = { ...state, isPreview: event.target.checked };
});
document.getElementById('reviewStatus').addEventListener('change', (event) => {
  state = { ...state, reviewStatus: event.target.value };
  renderValidation();
});
for (const id of ['skill', 'level']) {
  document.getElementById(id).addEventListener('change', async (event) => {
    state = { ...state, [id]: event.target.value };
    await reloadLibrary();
  });
}

document.getElementById('play').addEventListener('click', () => {
  window.location.href = `${base}learn/play.html?stage=${stageId}`;
});

document.getElementById('save').addEventListener('click', async () => {
  const { valid } = validateStage(state, libraryById());
  renderValidation();
  if (!valid) return;
  try {
    const id = await saveStage(db, stageId, buildStageDoc(state, { existing, adminUid }));
    window.location.href = `${base}admin/stage.html?id=${id}`;
  } catch (error) {
    showPageError('บันทึกด่านไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});

requireAdmin(async (firebaseUser) => {
  adminUid = firebaseUser.uid;
  try {
    if (stageId) {
      existing = await fetchStage(db, stageId);
      if (existing) {
        state = stageStateFromDoc(existing);
        document.getElementById('page-title').textContent = `แก้ด่าน: ${existing.title}`;
      }
    }
    await reloadLibrary();
  } catch (error) {
    showPageError('โหลดข้อมูลด่านไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
```

- [ ] **Step 3: ลงทะเบียนหน้าใน vite**

ใน `vite.config.js` เพิ่ม:

```js
        adminStage: resolve(__dirname, 'src/admin/stage.html'),
```

- [ ] **Step 4: ดูหน้าจริง**

Run: `npm run dev` เปิด `/admin/stage.html`
Expected: เลือกโจทย์จากคลังได้ · จัดลำดับได้ · เปลี่ยนสถานะเป็น "อนุมัติแล้ว" ขณะที่ยังมีข้อ draft อยู่แล้วขึ้นข้อความห้าม · กดบันทึกแล้ว URL เปลี่ยนเป็นมี `?id=`

- [ ] **Step 5: Commit**

```bash
git add src/admin/stage.html src/admin/stage.js vite.config.js
git commit -m "feat: build and edit stages from the admin area"
```

---

# ส่วนที่ 6 — หน้าฝั่งนักเรียน

## Task 15: หน้าเลือกสกิลและระดับ

**Files:**
- Create: `src/learn/index.html`
- Create: `src/learn/index.js`
- Modify: `src/dashboard.html`
- Modify: `src/dashboard.js`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: `fetchStages` จาก `stage-io.js` · `requireLogin` จาก `auth-guard.js` · `mascotSrc` จาก `mascot.js`

- [ ] **Step 1: สร้างหน้า HTML**

สร้าง `src/learn/index.html`:

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>เลือกบทเรียน — Pik a Class</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mitr:wght@400;500;600&display=swap" />
  <link rel="stylesheet" href="../styles/tokens.css" />
  <link rel="stylesheet" href="../styles/base.css" />
  <link rel="stylesheet" href="../styles/learn.css" />
</head>
<body>
  <main class="learn-main">
    <p><a id="back-link" href="#">← กลับหน้าหลัก</a></p>
    <img id="mascot" width="96" height="96" alt="" />
    <h1>วันนี้อยากฝึกอะไรดี?</h1>
    <div id="choices"></div>
    <p id="empty-note" hidden>ยังไม่มีบทเรียนที่เปิดให้เล่นตอนนี้ครับ</p>
  </main>
  <script type="module" src="./index.js"></script>
</body>
</html>
```

- [ ] **Step 2: เขียนสคริปต์ของหน้า**

สร้าง `src/learn/index.js`:

```js
import { requireLogin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStages } from '../lib/stage-io.js';
import { mascotSrc } from '../lib/mascot.js';
import { showPageError } from '../lib/page-error.js';

const base = import.meta.env.BASE_URL;
const SKILL_LABELS = { grammar: 'ไวยากรณ์', vocab: 'คำศัพท์', dialogue: 'บทสนทนา' };

document.getElementById('back-link').href = `${base}dashboard.html`;
document.getElementById('mascot').src = mascotSrc('normal', base);

function render(stages) {
  const groups = new Map();
  for (const stage of stages) {
    const key = `${stage.skill}|${stage.level}`;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }

  const container = document.getElementById('choices');
  container.replaceChildren();
  document.getElementById('empty-note').hidden = groups.size > 0;

  for (const [key, count] of groups) {
    const [skill, level] = key.split('|');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-chunky';
    button.style.marginBottom = 'var(--space-2)';
    button.textContent = `${SKILL_LABELS[skill] ?? skill} · ระดับ ${level} — ${count} ด่าน`;
    button.addEventListener('click', () => {
      window.location.href = `${base}learn/path.html?skill=${skill}&level=${level}`;
    });
    container.appendChild(button);
  }
}

requireLogin(async () => {
  try {
    render(await fetchStages(db));
  } catch (error) {
    showPageError('โหลดบทเรียนไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
```

- [ ] **Step 3: เพิ่มทางเข้าบน dashboard**

ใน `src/dashboard.html` เพิ่มก่อนปุ่มออกจากระบบ:

```html
    <p><a id="learn-link" class="btn-primary" href="#">ไปฝึก</a></p>
```

ใน `src/dashboard.js` เพิ่มบรรทัดนี้ก่อน `requireLogin(...)`:

```js
document.getElementById('learn-link').href = `${import.meta.env.BASE_URL}learn/index.html`;
```

- [ ] **Step 4: ลงทะเบียนหน้าใน vite**

```js
        learn: resolve(__dirname, 'src/learn/index.html'),
```

- [ ] **Step 5: ดูหน้าจริง**

Run: `npm run dev`
Expected: จาก dashboard กด "ไปฝึก" แล้วมาหน้านี้ · ถ้ายังไม่มีด่านที่อนุมัติ จะเห็นข้อความว่ายังไม่มีบทเรียน

- [ ] **Step 6: Commit**

```bash
git add src/learn/index.html src/learn/index.js src/dashboard.html src/dashboard.js vite.config.js
git commit -m "feat: let students pick a skill and level to practise"
```

---

## Task 16: หน้าเส้นทางด่าน

**Files:**
- Create: `src/learn/path.html`
- Create: `src/learn/path.js`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: `fetchStages`, `fetchMyClears` จาก `stage-io.js` · `buildStagePath`, `totalStars`, `clearsByStageId` จาก `stage-progress.js`

- [ ] **Step 1: สร้างหน้า HTML**

สร้าง `src/learn/path.html`:

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>เส้นทางด่าน — Pik a Class</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mitr:wght@400;500;600&display=swap" />
  <link rel="stylesheet" href="../styles/tokens.css" />
  <link rel="stylesheet" href="../styles/base.css" />
  <link rel="stylesheet" href="../styles/learn.css" />
</head>
<body>
  <main class="learn-main">
    <header style="display: flex; align-items: center; justify-content: space-between;">
      <a id="back-link" href="#">←</a>
      <span id="total-stars" class="stars"></span>
    </header>
    <h1 id="path-title"></h1>
    <p id="path-summary"></p>
    <div id="path-canvas" style="position: relative;"></div>
  </main>

  <div class="sheet-backdrop" id="sheet-backdrop" hidden>
    <section class="sheet">
      <p id="sheet-badge"></p>
      <h2 id="sheet-title"></h2>
      <p id="sheet-meta"></p>
      <p id="sheet-best"></p>
      <button type="button" id="sheet-start" class="btn-chunky">เริ่มเล่น</button>
      <button type="button" id="sheet-close" class="btn-ghost" style="margin-top: var(--space-2);">ปิด</button>
    </section>
  </div>
  <script type="module" src="./path.js"></script>
</body>
</html>
```

- [ ] **Step 2: เขียนสคริปต์ของหน้า**

สร้าง `src/learn/path.js`:

```js
import { requireLogin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStages, fetchMyClears } from '../lib/stage-io.js';
import { buildStagePath, totalStars, clearsByStageId } from '../lib/stage-progress.js';
import { showPageError } from '../lib/page-error.js';

const base = import.meta.env.BASE_URL;
const params = new URLSearchParams(window.location.search);
const skill = params.get('skill');
const level = params.get('level');
const SKILL_LABELS = { grammar: 'ไวยากรณ์', vocab: 'คำศัพท์', dialogue: 'บทสนทนา' };

const NODE = 58;
const STEP = 112;
const LEFT = 80;
const RIGHT = 212;

document.getElementById('back-link').href = `${base}learn/index.html`;
document.getElementById('path-title').textContent = SKILL_LABELS[skill] ?? skill;

function starMarkup(stars) {
  return '★'.repeat(stars) + `<span class="off">${'★'.repeat(3 - stars)}</span>`;
}

function centerOf(index) {
  return { x: index % 2 === 0 ? LEFT : RIGHT, y: 52 + index * STEP };
}

// เส้นทางโค้งลากผ่านทุกด่านจริง ไม่ใช่เส้นตรงหลังวงกลม
function curveThrough(points, upTo = points.length) {
  if (points.length === 0) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < Math.min(upTo, points.length); i += 1) {
    const from = points[i - 1];
    const to = points[i];
    const mid = (from.y + to.y) / 2;
    d += ` C ${from.x} ${mid}, ${to.x} ${mid}, ${to.x} ${to.y}`;
  }
  return d;
}

function renderPath(path) {
  const canvas = document.getElementById('path-canvas');
  canvas.replaceChildren();
  const points = path.map((_, index) => centerOf(index));
  const height = 52 + Math.max(0, path.length - 1) * STEP + 90;

  const svgNs = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNs, 'svg');
  svg.setAttribute('viewBox', `0 0 292 ${height}`);
  svg.setAttribute('width', '100%');
  svg.style.display = 'block';

  const clearedCount = path.filter((stage) => stage.cleared).length;
  for (const [d, color] of [
    [curveThrough(points), '#e6e9ee'],
    [curveThrough(points, clearedCount + 1), '#a8e6bf'],
  ]) {
    if (!d) continue;
    const line = document.createElementNS(svgNs, 'path');
    line.setAttribute('d', d);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '12');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  }
  canvas.appendChild(svg);

  path.forEach((stage, index) => {
    const point = points[index];
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = stage.unlocked ? String(stage.order) : '🔒';
    button.setAttribute('aria-label', `ด่าน ${stage.order} ${stage.title}`);
    Object.assign(button.style, {
      position: 'absolute',
      width: `${NODE}px`,
      height: `${NODE}px`,
      borderRadius: '50%',
      fontFamily: 'var(--font-base)',
      fontSize: '20px',
      cursor: 'pointer',
      left: `calc(${(point.x / 292) * 100}% - ${NODE / 2}px)`,
      top: `calc(${(point.y / height) * 100}% - ${NODE / 2}px)`,
      background: stage.cleared ? 'var(--color-primary)' : 'var(--color-bg)',
      color: stage.cleared ? 'var(--color-primary-text)' : 'var(--color-text)',
      border: stage.unlocked ? '3px solid var(--color-primary)' : '3px solid var(--color-border)',
      borderBottomWidth: '6px',
    });
    button.addEventListener('click', () => openSheet(stage));
    canvas.appendChild(button);

    if (stage.stars > 0) {
      const badge = document.createElement('span');
      badge.className = 'stars';
      badge.innerHTML = starMarkup(stage.stars);
      Object.assign(badge.style, {
        position: 'absolute',
        fontSize: '12px',
        background: 'var(--color-bg)',
        borderRadius: '99px',
        padding: '1px 6px',
        transform: 'translateX(-50%)',
        left: `${(point.x / 292) * 100}%`,
        top: `calc(${(point.y / height) * 100}% + ${NODE / 2 - 4}px)`,
      });
      canvas.appendChild(badge);
    }
  });
}

function openSheet(stage) {
  document.getElementById('sheet-badge').textContent = stage.unlocked
    ? `ด่าน ${stage.order} · เล่นได้`
    : `ด่าน ${stage.order} · ยังล็อก`;
  document.getElementById('sheet-title').textContent = stage.title;
  document.getElementById('sheet-meta').textContent =
    `${stage.itemCount} ข้อ · ผ่านที่ ${Math.round(stage.passThreshold * 100)}%`;
  document.getElementById('sheet-best').innerHTML = stage.unlocked
    ? stage.stars > 0
      ? `ดาวที่เคยได้ <span class="stars">${starMarkup(stage.stars)}</span>`
      : 'ยังไม่เคยเล่นด่านนี้ — ตอบถูกหมดได้ 3 ดาว'
    : stage.lockedReason;

  const start = document.getElementById('sheet-start');
  start.hidden = !stage.unlocked;
  start.onclick = () => {
    window.location.href = `${base}learn/play.html?stage=${stage.id}`;
  };
  document.getElementById('sheet-backdrop').hidden = false;
}

document.getElementById('sheet-close').addEventListener('click', () => {
  document.getElementById('sheet-backdrop').hidden = true;
});

requireLogin(async (firebaseUser) => {
  try {
    const [stages, clears] = await Promise.all([
      fetchStages(db, { skill, level }),
      fetchMyClears(db, firebaseUser.uid),
    ]);
    const path = buildStagePath(stages, clearsByStageId(clears));
    const cleared = path.filter((stage) => stage.cleared).length;
    document.getElementById('path-summary').textContent =
      `ระดับ ${level} · ผ่านแล้ว ${cleared} จาก ${path.length} ด่าน`;
    document.getElementById('total-stars').textContent = `★ ${totalStars(path)} ดาว`;
    renderPath(path);
  } catch (error) {
    showPageError('โหลดเส้นทางด่านไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
```

- [ ] **Step 3: ลงทะเบียนหน้าใน vite**

```js
        learnPath: resolve(__dirname, 'src/learn/path.html'),
```

- [ ] **Step 4: ดูหน้าจริง**

Run: `npm run dev` แล้วเปิด `/learn/path.html?skill=grammar&level=A2`
Expected: เห็นเส้นโค้งลากผ่านวงกลมทุกด่าน · ด่านแรกกดได้ ด่านอื่นเป็นกุญแจ · แตะด่านที่ล็อกแล้วขึ้นเหตุผล ไม่มีปุ่มเริ่ม

- [ ] **Step 5: Commit**

```bash
git add src/learn/path.html src/learn/path.js vite.config.js
git commit -m "feat: draw the winding stage path with an info sheet"
```

---

## Task 17: หน้าเล่นด่านและหน้าสรุปผล

**Files:**
- Create: `src/learn/play.html`
- Create: `src/learn/play.js`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: `fetchStage`, `fetchStageExercises` จาก `stage-io.js` · `saveStageResult` จาก `stage-result-io.js` · ทุกฟังก์ชันจาก `stage-session.js` · `buildWordBank` จาก `word-bank.js` · `mascotSrc` จาก `mascot.js`

- [ ] **Step 1: สร้างหน้า HTML**

สร้าง `src/learn/play.html`:

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>เล่นด่าน — Pik a Class</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mitr:wght@400;500;600&display=swap" />
  <link rel="stylesheet" href="../styles/tokens.css" />
  <link rel="stylesheet" href="../styles/base.css" />
  <link rel="stylesheet" href="../styles/learn.css" />
</head>
<body>
  <main class="learn-main">
    <section id="play-view" hidden>
      <header style="display: flex; align-items: center; gap: var(--space-2);">
        <button type="button" id="quit" class="btn-ghost" style="width: auto;">✕</button>
        <span class="progress-bar"><span id="progress-fill" style="width: 0%"></span></span>
        <span id="progress-text"></span>
      </header>
      <p id="question-label" style="color: var(--color-muted); font-size: 0.8125rem;"></p>
      <h1 id="question-prompt" style="font-size: 1.3125rem; font-weight: 500;"></h1>
      <div id="answers"></div>
      <div id="verdict" hidden>
        <p id="verdict-text"></p>
        <button type="button" id="next" class="btn-chunky">ต่อไป</button>
      </div>
    </section>

    <section id="result-view" hidden style="text-align: center;">
      <img id="result-mascot" width="140" height="140" alt="" />
      <h1 id="result-title"></h1>
      <p id="result-stars" class="stars" style="font-size: 2rem;"></p>
      <p id="result-score"></p>
      <p id="save-state"></p>
      <button type="button" id="retry" class="btn-chunky">เล่นด่านนี้อีกครั้ง</button>
      <button type="button" id="back-to-path" class="btn-ghost" style="margin-top: var(--space-2);">กลับเส้นทางด่าน</button>
    </section>

    <p id="blocked-note" hidden></p>
  </main>
  <script type="module" src="./play.js"></script>
</body>
</html>
```

- [ ] **Step 2: เขียนสคริปต์ของหน้า**

สร้าง `src/learn/play.js`:

```js
import { requireLogin } from '../lib/auth-guard.js';
import { db } from '../lib/firebase.js';
import { fetchStage, fetchStageExercises } from '../lib/stage-io.js';
import { saveStageResult } from '../lib/stage-result-io.js';
import { createSession, currentExercise, answerCurrent, advance, summarize } from '../lib/stage-session.js';
import { buildWordBank } from '../lib/word-bank.js';
import { mascotSrc } from '../lib/mascot.js';
import { showPageError } from '../lib/page-error.js';

const base = import.meta.env.BASE_URL;
const stageId = new URLSearchParams(window.location.search).get('stage');

let stage = null;
let exercises = [];
let session = null;
let uid = null;
let answered = false;

const TYPE_LABELS = { mcq: 'เลือกคำตอบที่ถูก', fill_blank: 'เติมคำให้ถูก' };

function optionsFor(exercise) {
  return exercise.type === 'mcq' ? exercise.choices ?? [] : buildWordBank(exercise, exercises);
}

function renderQuestion() {
  const exercise = currentExercise(session);
  if (!exercise) {
    finish();
    return;
  }
  answered = false;

  document.getElementById('progress-text').textContent = `${session.index + 1}/${exercises.length}`;
  document.getElementById('progress-fill').style.width = `${(session.index / exercises.length) * 100}%`;
  document.getElementById('question-label').textContent = TYPE_LABELS[exercise.type] ?? '';
  document.getElementById('question-prompt').textContent = exercise.prompt;
  document.getElementById('verdict').hidden = true;

  const answers = document.getElementById('answers');
  answers.replaceChildren();
  for (const option of optionsFor(exercise)) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'answer-card';
    card.textContent = option;
    card.addEventListener('click', () => pick(card, option));
    answers.appendChild(card);
  }
}

function pick(card, option) {
  if (answered) return;
  answered = true;

  const exercise = currentExercise(session);
  session = answerCurrent(session, option);
  const result = session.results[session.results.length - 1];
  const accepted = (exercise.answerKey ?? []).map((value) => String(value));

  for (const button of document.querySelectorAll('.answer-card')) {
    button.disabled = true;
    if (accepted.includes(button.textContent)) button.dataset.state = 'correct';
  }
  if (!result.correct) card.dataset.state = 'wrong';

  document.getElementById('verdict-text').textContent = result.correct
    ? 'เก่งมาก! ถูกต้อง'
    : `ยังไม่ถูก — คำตอบคือ "${accepted[0]}"`;
  document.getElementById('verdict').hidden = false;
}

async function finish() {
  const summary = summarize(session, stage.passThreshold);
  document.getElementById('play-view').hidden = true;
  document.getElementById('result-view').hidden = false;
  document.getElementById('result-mascot').src = mascotSrc(summary.passed ? 'clear' : 'wrong', base);
  document.getElementById('result-title').textContent = summary.passed
    ? 'ผ่านด่านแล้ว!'
    : 'ยังไม่ผ่าน ลองอีกครั้งนะ';
  document.getElementById('result-stars').innerHTML =
    '★'.repeat(summary.stars) + `<span class="off">${'★'.repeat(3 - summary.stars)}</span>`;
  document.getElementById('result-score').textContent =
    `ตอบถูก ${summary.correctCount} จาก ${summary.total} ข้อ (${Math.round(summary.score * 100)}%)`;
  await save();
}

async function save() {
  const note = document.getElementById('save-state');
  note.textContent = 'กำลังบันทึกผล…';
  try {
    await saveStageResult(db, { uid, stage, exercises, results: session.results });
    note.textContent = 'บันทึกผลแล้ว';
  } catch (error) {
    console.error(error);
    note.replaceChildren();
    note.appendChild(document.createTextNode('ยังบันทึกผลไม่ได้ (เน็ตอาจมีปัญหา) '));
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'btn-ghost';
    retry.textContent = 'ลองบันทึกอีกครั้ง';
    retry.addEventListener('click', save);
    note.appendChild(retry);
  }
}

document.getElementById('next').addEventListener('click', () => {
  session = advance(session);
  if (session.finished) finish();
  else renderQuestion();
});

document.getElementById('quit').addEventListener('click', () => {
  if (window.confirm('ออกตอนนี้ความคืบหน้าจะหาย ออกเลยไหม?')) {
    window.location.href = `${base}learn/path.html?skill=${stage.skill}&level=${stage.level}`;
  }
});

document.getElementById('retry').addEventListener('click', () => {
  window.location.reload();
});

document.getElementById('back-to-path').addEventListener('click', () => {
  window.location.href = `${base}learn/path.html?skill=${stage.skill}&level=${stage.level}`;
});

requireLogin(async (firebaseUser) => {
  uid = firebaseUser.uid;
  try {
    stage = await fetchStage(db, stageId);
    if (!stage) {
      showPageError('ไม่พบด่านนี้');
      return;
    }
    exercises = await fetchStageExercises(db, stage.itemIds);

    // rules คืนข้อมาไม่ครบโดยไม่ error ได้ ถ้าบัญชีนี้ยังไม่มีสิทธิ์อ่านบางข้อ
    if (exercises.length < stage.itemIds.length) {
      const note = document.getElementById('blocked-note');
      note.textContent = 'ด่านนี้ยังไม่เปิดสำหรับบัญชีของคุณ ลองทักปิ๊กเพื่อขอเปิดได้ครับ';
      note.hidden = false;
      return;
    }

    session = createSession(exercises);
    document.getElementById('play-view').hidden = false;
    renderQuestion();
  } catch (error) {
    showPageError('โหลดด่านไม่สำเร็จ กรุณาลองใหม่');
    console.error(error);
  }
});
```

- [ ] **Step 3: ลงทะเบียนหน้าใน vite**

```js
        learnPlay: resolve(__dirname, 'src/learn/play.html'),
```

- [ ] **Step 4: รันเทสทั้งหมด**

Run: `npm test`
Expected: PASS ทั้งหมด

- [ ] **Step 5: ตรวจด้วยตา (ต้องมีด่านอย่างน้อย 1 ด่านจาก Task 14 ก่อน)**

Run: `npm run dev` แล้วเล่นด่านจนจบ
Expected: แถบความคืบหน้าขยับทุกข้อ · กดการ์ดแล้วเขียว/แดงทันที · จบแล้วเห็นดาวกับข้อความ "บันทึกผลแล้ว" · กดออกกลางคันแล้วมีกล่องถามยืนยัน

- [ ] **Step 6: Commit**

```bash
git add src/learn/play.html src/learn/play.js vite.config.js
git commit -m "feat: play a stage and show the result with stars"
```

---

# ส่วนที่ 7 — เนื้อหานำร่องและการตรวจรอบสุดท้าย

## Task 18: ร่างเนื้อหานำร่อง A2 20 ข้อ

**Files:**
- Create: `docs/examples/pilot-grammar-a2.json`

**Interfaces:**
- Consumes: รูปแบบไฟล์เดียวกับ `docs/examples/exercises-sample.json` และผ่าน `npm run check:content`

- [ ] **Step 1: อ่านรูปแบบไฟล์ตัวอย่างเดิม**

Run: `cat docs/examples/exercises-sample.json`
Expected: เห็นโครงสร้างที่หน้านำเข้า JSON รับได้ ให้ยึดรูปแบบเดียวกันเป๊ะ

- [ ] **Step 2: ร่างโจทย์**

สร้าง `docs/examples/pilot-grammar-a2.json` — 20 ข้อ แบ่งเป็น 3 กลุ่มตามแท็ก:

- 7 ข้อ `grammar:past-simple` (ผสม `mcq` กับ `fill_blank`)
- 7 ข้อ `grammar:past-continuous`
- 6 ข้อ `grammar:present-perfect`

กติกาที่ต้องทำตามทุกข้อ:
- `skill: "grammar"`, `level: "A2"`, `visibility: "bank"`, `isPreview: false`, `reviewStatus: "draft"`
- ข้อ `fill_blank` ต้องมี `___` ในช่อง `prompt` **พอดี 1 ช่อง** (schema บังคับ) และ `answerKey` ใส่ทุกรูปที่ยอมรับได้ เช่น `["didn't", "did not"]`
- ข้อ `mcq` ต้องมี `choices` 4 ตัว ไม่ซ้ำกัน และ `answerKey` มีตัวเดียวที่อยู่ใน `choices`
- **เฉลยของข้อเติมคำในกลุ่มเดียวกันต้องต่างกัน** เพราะมันจะถูกใช้เป็นตัวเลือกลวงของกันและกัน (ดู `word-bank.js`) — ถ้าซ้ำกัน ตัวเลือกจะเหลือน้อยและเด็กเดาง่าย
- ประโยคต้องเป็นบริบทที่นักเรียนไทยคุ้น (โรงเรียน ครอบครัว การเดินทาง) ไม่ใช้คำศัพท์เกินระดับ A2

- [ ] **Step 3: ตรวจไฟล์ด้วยสคริปต์**

Run: `npm run check:content docs/examples/pilot-grammar-a2.json`
Expected: ผ่านทั้ง 20 ข้อ ไม่มีข้อผิดพลาด — ถ้าไม่ผ่าน แก้ไฟล์จนผ่านก่อนไปต่อ

- [ ] **Step 4: ตรวจตัวเลือกลวงด้วยตา**

สำหรับแต่ละกลุ่มแท็ก ไล่ดูว่าข้อ `fill_blank` ในกลุ่มนั้นมีเฉลยต่างกันอย่างน้อย 4 แบบ
Expected: ทุกข้อเติมคำหาตัวลวงได้ครบ 3 ตัว — ถ้าไม่ครบ หน้าสร้างด่านจะเตือนตอนสร้างด่าน

- [ ] **Step 5: Commit**

```bash
git add docs/examples/pilot-grammar-a2.json
git commit -m "content: draft twenty A2 grammar questions for the pilot"
```

---

## Task 19: ตรวจรอบสุดท้ายและขึ้น production

**Files:** ไม่มีไฟล์ใหม่ — เป็นขั้นตอนตรวจและ deploy

- [ ] **Step 1: รันเทสทั้งหมด**

Run: `npm test`
Expected: PASS ทั้งหมด

- [ ] **Step 2: รัน rules test**

Run: `npm run test:rules`
Expected: PASS ทั้งหมด

- [ ] **Step 3: build ให้แน่ใจว่าทุกหน้าถูกรวมเข้า bundle**

Run: `npm run build`
Expected: สำเร็จ และใน `dist/` มี `learn/index.html`, `learn/path.html`, `learn/play.html`, `admin/stages.html`, `admin/stage.html` ครบ · ถ้าหน้าไหนหาย แปลว่าลืมเพิ่ม entry ใน `vite.config.js`

- [ ] **Step 4: push ขึ้น main**

```bash
git push origin master:main
```
Expected: GitHub Actions รันผ่านทั้ง 3 ขั้น (test → test:rules → deploy)

- [ ] **Step 5: ให้ปิ๊กนำเข้าเนื้อหานำร่องบนเว็บจริง**

บอกปิ๊กให้ทำตามลำดับนี้บน https://pikar10tu.github.io/pik-a-class/
1. หน้านำเข้า JSON → เลือก `docs/examples/pilot-grammar-a2.json` → กดตรวจไฟล์ → กดนำเข้า
2. หน้าคลังเนื้อหา → ตรวจโจทย์ → กดอนุมัติทั้ง 20 ข้อ
3. หน้าด่าน → สร้าง 3 ด่านตามหัวข้อ (ลำดับ 1, 2, 3) → กด "ลองเล่นด่านนี้" ตรวจก่อน → อนุมัติ

Expected: **นี่คือการเขียนข้อมูลลง Firestore production ครั้งแรกของโปรเจกต์** ถ้า batch write ติด permission ให้หยุดแล้วรายงาน อย่าแก้ rules ให้หลวมลงโดยไม่ตรวจสาเหตุ

- [ ] **Step 6: เล่นจริงจนจบด่าน**

เข้าเว็บจริงด้วยบัญชีปิ๊ก → ไปฝึก → เลือกไวยากรณ์ A2 → เล่นด่าน 1 จนจบ
Expected: ได้ดาว · ขึ้น "บันทึกผลแล้ว" · กลับมาหน้าเส้นทางแล้วเห็นดาวบนด่าน 1 และด่าน 2 ปลดล็อก

- [ ] **Step 7: เล่นซ้ำด้วยคะแนนแย่กว่าเดิม**

เล่นด่าน 1 ใหม่แล้วตั้งใจตอบผิดหลายข้อ
Expected: **ต้องบันทึกสำเร็จ ไม่ขึ้น error** (นี่คือการพิสูจน์ว่าโค้ดอ่านของเดิมก่อนเขียนจริง) · ดาวบนหน้าเส้นทาง **ต้องไม่ลดลง**

---

## Self-Review (ทำแล้ว)

**ครอบคลุม spec ครบไหม:** §1–§3 → Task 5–9 · §4 ทิศทางภาพ → Task 3–4 · §5 หน้าจอ → Task 13–17 · §6 โมดูล → Task 5–11 · §7 data flow + rules gotcha → Task 9, 11, 12 · §8 ตรวจคำตอบ/word bank → Task 5–6 · §9 หน้าสร้างด่าน → Task 10, 14 · §10 เนื้อหานำร่อง → Task 18 · §11 การทดสอบ → กระจายทุก task + Task 19 · §12 consent → Task 1–2 · §13 ความเสี่ยง → บันทึกไว้ใน spec ไม่มีงานตามมาในรอบนี้

**สิ่งที่ตรวจแล้วว่าชื่อตรงกันข้ามงาน:** `starsFor` / `scoreOf` (Task 5) ถูกใช้ชื่อเดิมใน Task 7, 8, 9 · `distractorPool` / `WORD_BANK_SIZE` (Task 6) ถูกใช้ชื่อเดิมใน Task 10 · `buildStageWrites` (Task 9) ถูกเรียกด้วย argument ชุดเดียวกันใน Task 11 · `submissionId` / `stageClearId` ใช้ของเดิมใน `schema/doc-ids.js` ไม่ได้สร้างใหม่

**ของที่ spec เขียนไว้แต่จงใจไม่มีในแผน:** ท่ามาสคอต "เสียใจ" ตัวจริง (Task 4 ใช้ท่าขออภัยจากชีตเดิมแทนตามที่ spec §13 ระบุ)
