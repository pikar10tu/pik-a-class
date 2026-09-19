# Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Foundation sub-project — a working Google Sign-In → onboarding form → empty dashboard flow, deployed to GitHub Pages, backed by a real Firebase project with baseline Firestore security rules.

**Architecture:** Static multi-page site built with Vite (one `.html` entry per screen, no client-side router). Firebase JS SDK (modular v10+) handles Google Sign-In (Auth) and the `users` collection (Firestore). Pure decision logic (redirect targets, form validation, admin check) is extracted into small testable modules; Firebase I/O and DOM wiring stay thin and untested-by-unit-test (verified manually against a real project / the Firebase emulator).

**Tech Stack:** Vite 5, vanilla JS (ES modules), Firebase JS SDK v10 (Auth + Firestore), Vitest for unit tests, plain CSS with custom-property tokens, GitHub Actions → GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-19-foundation-design.md`

## Global Constraints

- Firestore database region is **asia-southeast1** — set once when the database is created, cannot be changed later.
- No CSS framework — plain CSS only, using tokens defined in `src/styles/tokens.css`.
- No client-side router / SPA framework — every screen is its own `.html` file.
- `role`, `tier`, `totalStars`, `stageProgress` on a `users/{uid}` doc may only be changed by an admin (enforced in Firestore rules, not just the UI).
- A user must be authenticated to read or write any Firestore document — no anonymous access anywhere.
- The grade dropdown's non-school option must read exactly **"วัยทำงาน/บุคคลทั่วไป"**.
- The `school` form field is required when `grade` is one of `ม.1`–`ม.6`, optional when `grade` is `วัยทำงาน/บุคคลทั่วไป`.
- Firebase web config values (`apiKey` etc.) are not secret per Firebase's own docs, but are still injected via env vars (`.env.local` locally, GitHub Actions secrets in CI) rather than hardcoded, so the project can be repointed without editing source.
- No automated Firestore rules test suite in this plan — deferred to `PLAN.md` section 15.11 (per the Foundation design spec, section 9). Rules are verified manually against the emulator (Task 12).

---

## Prerequisites (manual, one-time, done by Pik before Task 5 can be exercised for real)

These are Google Cloud/Firebase console actions — no code, not doable by an agent:

1. Go to https://console.firebase.google.com → **Add project** → name it (e.g. `pik-a-class`).
2. **Build → Authentication → Get started → Sign-in method → Google → Enable.**
3. **Build → Firestore Database → Create database → Production mode → Location: `asia-southeast1 (Singapore)`.** Double-check the region before confirming — it cannot be changed later without recreating the whole database.
4. **Project settings (gear icon) → General → Your apps → Add app → Web (`</>`).** Register an app (nickname anything, e.g. "pik-a-class-web"). Copy the resulting `apiKey`, `authDomain`, `projectId`, `appId` — these go into `.env.local` in Task 1.
5. Install the Firebase CLI if not already present: `npm install -g firebase-tools`, then `firebase login`.

---

### Task 1: Project scaffolding

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `vitest.config.js`
- Create: `.env.example`
- Modify: `.gitignore`
- Create: `src/index.html`
- Create: `src/login.html`
- Create: `src/onboarding.html`
- Create: `src/dashboard.html`
- Create: `src/admin/index.html`
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`

**Interfaces:**
- Produces: five Vite build entry points (`index`, `login`, `onboarding`, `dashboard`, `admin`) that later tasks attach `<script type="module">` tags and logic to.
- Produces: CSS custom properties in `tokens.css` (`--color-bg`, `--color-text`, `--color-primary`, `--color-primary-text`, `--color-border`, `--color-error`, `--space-1`..`--space-5`, `--font-base`, `--font-size-base`, `--radius`) that every later page's markup relies on.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "pik-a-class",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "vitest": "^2.1.0"
  },
  "dependencies": {
    "firebase": "^10.14.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, `package-lock.json` created, no errors.

- [ ] **Step 3: Create `vite.config.js`**

Uses `root: 'src'` so every page lives under `src/`, builds to `dist/` at the repo root. `base` is set to `/pik-a-class/` because GitHub Pages project sites serve from `https://<user>.github.io/<repo-name>/` — **if the GitHub repo ends up with a different name than `pik-a-class`, this value must be updated to match before deploying** (Task 13 revisits this).

```js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: '/pik-a-class/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/login.html'),
        onboarding: resolve(__dirname, 'src/onboarding.html'),
        dashboard: resolve(__dirname, 'src/dashboard.html'),
        admin: resolve(__dirname, 'src/admin/index.html'),
      },
    },
  },
});
```

- [ ] **Step 4: Create `vitest.config.js`**

A separate config (not reusing `vite.config.js`'s `root: 'src'`) so test discovery stays rooted at the repo root regardless of the build config.

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
```

- [ ] **Step 5: Create `.env.example`**

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your-app-id
```

Copy this file to `.env.local` (repo root) and fill in real values from Prerequisites step 4. `.env.local` is already covered by `.gitignore`.

- [ ] **Step 6: Add `dist/` to `.gitignore`**

Append to the existing `.gitignore`:

```
dist/
```

- [ ] **Step 7: Create `src/styles/tokens.css`**

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-primary: #2563eb;
  --color-primary-text: #ffffff;
  --color-border: #d1d5db;
  --color-error: #dc2626;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --font-base: system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-size-base: 16px;
  --radius: 8px;
}
```

- [ ] **Step 8: Create `src/styles/base.css`**

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-base);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background: var(--color-bg);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-primary-text);
  border: none;
  border-radius: var(--radius);
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-base);
  cursor: pointer;
}

.form-group {
  margin-bottom: var(--space-3);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-1);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: var(--font-size-base);
}

.field-error {
  display: block;
  min-height: 1.2em;
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: var(--space-1);
}
```

- [ ] **Step 9: Create `src/index.html`** (redirects to the login screen — this is what loads at the site root on GitHub Pages)

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>Pik a Class</title>
  <meta http-equiv="refresh" content="0; url=./login.html" />
</head>
<body></body>
</html>
```

- [ ] **Step 10: Create `src/login.html`** (placeholder body — Task 8 wires the button)

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>เข้าสู่ระบบ — Pik a Class</title>
  <link rel="stylesheet" href="./styles/tokens.css" />
  <link rel="stylesheet" href="./styles/base.css" />
</head>
<body>
  <main>
    <h1>Pik a Class</h1>
    <button id="google-signin-btn" class="btn-primary">เข้าสู่ระบบด้วย Google</button>
  </main>
</body>
</html>
```

- [ ] **Step 11: Create `src/onboarding.html`** (placeholder body — Task 9 wires the form)

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>กรอกโปรไฟล์ — Pik a Class</title>
  <link rel="stylesheet" href="./styles/tokens.css" />
  <link rel="stylesheet" href="./styles/base.css" />
</head>
<body>
  <main>
    <h1>กรอกโปรไฟล์ครั้งแรก</h1>
    <form id="onboarding-form">
      <div class="form-group">
        <label for="fullName">ชื่อจริง</label>
        <input type="text" id="fullName" name="fullName" />
        <span class="field-error" data-error-for="fullName"></span>
      </div>
      <div class="form-group">
        <label for="nickname">ชื่อเล่น</label>
        <input type="text" id="nickname" name="nickname" />
        <span class="field-error" data-error-for="nickname"></span>
      </div>
      <div class="form-group">
        <label for="grade">ช่วงชั้น/กลุ่มผู้เรียน</label>
        <select id="grade" name="grade">
          <option value="">-- เลือก --</option>
          <option value="ม.1">ม.1</option>
          <option value="ม.2">ม.2</option>
          <option value="ม.3">ม.3</option>
          <option value="ม.4">ม.4</option>
          <option value="ม.5">ม.5</option>
          <option value="ม.6">ม.6</option>
          <option value="วัยทำงาน/บุคคลทั่วไป">วัยทำงาน/บุคคลทั่วไป</option>
        </select>
        <span class="field-error" data-error-for="grade"></span>
      </div>
      <div class="form-group">
        <label for="school">โรงเรียน/หน่วยงาน</label>
        <input type="text" id="school" name="school" />
        <span class="field-error" data-error-for="school"></span>
      </div>
      <div class="form-group">
        <label for="phone">เบอร์โทร</label>
        <input type="text" id="phone" name="phone" />
        <span class="field-error" data-error-for="phone"></span>
      </div>
      <div class="form-group">
        <label for="lineId">LINE ID</label>
        <input type="text" id="lineId" name="lineId" />
      </div>
      <button type="submit" class="btn-primary">บันทึกและเริ่มใช้งาน</button>
    </form>
  </main>
</body>
</html>
```

- [ ] **Step 12: Create `src/dashboard.html`** (placeholder body — Task 10 wires it)

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>แดชบอร์ด — Pik a Class</title>
  <link rel="stylesheet" href="./styles/tokens.css" />
  <link rel="stylesheet" href="./styles/base.css" />
</head>
<body>
  <main>
    <p id="welcome-message"></p>
    <button id="sign-out-btn" class="btn-primary">ออกจากระบบ</button>
  </main>
</body>
</html>
```

- [ ] **Step 13: Create `src/admin/index.html`** (placeholder body — Task 11 wires it; note the `../` prefix on stylesheet paths since this file is one directory deeper)

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>Admin — Pik a Class</title>
  <link rel="stylesheet" href="../styles/tokens.css" />
  <link rel="stylesheet" href="../styles/base.css" />
</head>
<body>
  <main>
    <h1>Admin</h1>
    <p id="admin-welcome"></p>
  </main>
</body>
</html>
```

- [ ] **Step 14: Verify the build produces all five pages**

Run: `npm run build`
Expected: exit code 0, and `dist/index.html`, `dist/login.html`, `dist/onboarding.html`, `dist/dashboard.html`, `dist/admin/index.html` all exist.

- [ ] **Step 15: Commit**

```bash
git add package.json package-lock.json vite.config.js vitest.config.js .env.example .gitignore src/
git commit -m "chore: scaffold Vite multi-page project structure"
```

---

### Task 2: Firebase config builder (pure, tested)

**Files:**
- Create: `src/lib/env.js`
- Test: `src/lib/env.test.js`

**Interfaces:**
- Produces: `buildFirebaseConfig(env)` — takes an object with `VITE_FIREBASE_*` keys, returns `{ apiKey, authDomain, projectId, appId }`, throws `Error` if any required key is missing. Used by Task 5's `src/lib/firebase.js`.

- [ ] **Step 1: Write the failing tests**

```js
// src/lib/env.test.js
import { describe, it, expect } from 'vitest';
import { buildFirebaseConfig } from './env.js';

describe('buildFirebaseConfig', () => {
  const validEnv = {
    VITE_FIREBASE_API_KEY: 'key123',
    VITE_FIREBASE_AUTH_DOMAIN: 'proj.firebaseapp.com',
    VITE_FIREBASE_PROJECT_ID: 'proj',
    VITE_FIREBASE_APP_ID: 'app123',
  };

  it('maps VITE_ env vars to a firebase config object', () => {
    expect(buildFirebaseConfig(validEnv)).toEqual({
      apiKey: 'key123',
      authDomain: 'proj.firebaseapp.com',
      projectId: 'proj',
      appId: 'app123',
    });
  });

  it('throws listing every missing required key', () => {
    expect(() => buildFirebaseConfig({})).toThrow(
      'Missing required Firebase env vars: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID'
    );
  });

  it('throws when only some required keys are missing', () => {
    const { VITE_FIREBASE_APP_ID, ...partial } = validEnv;
    expect(() => buildFirebaseConfig(partial)).toThrow(
      'Missing required Firebase env vars: VITE_FIREBASE_APP_ID'
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/env.test.js`
Expected: FAIL with "Cannot find module './env.js'" (or similar import error).

- [ ] **Step 3: Write the implementation**

```js
// src/lib/env.js
const REQUIRED_KEYS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
];

export function buildFirebaseConfig(env) {
  const missing = REQUIRED_KEYS.filter((key) => !env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required Firebase env vars: ${missing.join(', ')}`);
  }
  return {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/env.test.js`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/env.js src/lib/env.test.js
git commit -m "feat: add pure Firebase config builder with tests"
```

---

### Task 3: User profile pure logic (tested)

**Files:**
- Create: `src/lib/user-profile.js`
- Test: `src/lib/user-profile.test.js`

**Interfaces:**
- Consumes: nothing (pure).
- Produces: `buildNewUserDoc(firebaseUser)` → plain object matching the `users/{uid}` schema stub (used by Task 8's `login.js`). `getPostLoginRedirect(userDocData)` → `'onboarding' | 'dashboard'` (used by Task 8's `login.js` and Task 7's `auth-guard.js`). `firebaseUser` here means an object with `{ uid, email, displayName }` (the shape of Firebase Auth's `User`).

- [ ] **Step 1: Write the failing tests**

```js
// src/lib/user-profile.test.js
import { describe, it, expect } from 'vitest';
import { buildNewUserDoc, getPostLoginRedirect } from './user-profile.js';

describe('buildNewUserDoc', () => {
  it('builds a stub doc defaulting role, tier, and onboarding state', () => {
    const firebaseUser = { uid: 'abc123', email: 'a@b.com', displayName: 'Aum' };
    const doc = buildNewUserDoc(firebaseUser);

    expect(doc.uid).toBe('abc123');
    expect(doc.email).toBe('a@b.com');
    expect(doc.fullName).toBe('Aum');
    expect(doc.nickname).toBe('');
    expect(doc.role).toBe('student');
    expect(doc.tier).toBe('free');
    expect(doc.onboardingComplete).toBe(false);
    expect(typeof doc.createdAt).toBe('string');
  });

  it('falls back to an empty fullName when displayName is missing', () => {
    const doc = buildNewUserDoc({ uid: 'abc123', email: 'a@b.com', displayName: null });
    expect(doc.fullName).toBe('');
  });
});

describe('getPostLoginRedirect', () => {
  it('sends brand-new users (no doc) to onboarding', () => {
    expect(getPostLoginRedirect(null)).toBe('onboarding');
  });

  it('sends users with an incomplete onboarding flag to onboarding', () => {
    expect(getPostLoginRedirect({ onboardingComplete: false })).toBe('onboarding');
  });

  it('sends fully onboarded users to the dashboard', () => {
    expect(getPostLoginRedirect({ onboardingComplete: true })).toBe('dashboard');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/user-profile.test.js`
Expected: FAIL with "Cannot find module './user-profile.js'".

- [ ] **Step 3: Write the implementation**

```js
// src/lib/user-profile.js
export function buildNewUserDoc(firebaseUser) {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    fullName: firebaseUser.displayName || '',
    nickname: '',
    role: 'student',
    tier: 'free',
    onboardingComplete: false,
    createdAt: new Date().toISOString(),
  };
}

export function getPostLoginRedirect(userDocData) {
  if (!userDocData) return 'onboarding';
  if (!userDocData.onboardingComplete) return 'onboarding';
  return 'dashboard';
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/user-profile.test.js`
Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/user-profile.js src/lib/user-profile.test.js
git commit -m "feat: add user profile stub builder and redirect logic with tests"
```

---

### Task 4: Onboarding form validation (pure, tested)

**Files:**
- Create: `src/lib/onboarding-validation.js`
- Test: `src/lib/onboarding-validation.test.js`

**Interfaces:**
- Produces: `SCHOOL_GRADES` (array of the 6 school grade strings), `validateOnboardingForm(formData)` → `{ valid: boolean, errors: Record<string, string> }`. `formData` is a plain object with string values keyed `fullName`, `nickname`, `grade`, `school`, `phone`, `lineId`. Used by Task 9's `onboarding.js`.

- [ ] **Step 1: Write the failing tests**

```js
// src/lib/onboarding-validation.test.js
import { describe, it, expect } from 'vitest';
import { validateOnboardingForm } from './onboarding-validation.js';

const validSchoolStudent = {
  fullName: 'Somchai Dee',
  nickname: 'Chai',
  grade: 'ม.3',
  school: 'Bangkok School',
  phone: '0812345678',
  lineId: 'somchai',
};

describe('validateOnboardingForm', () => {
  it('accepts a fully filled school-student form', () => {
    expect(validateOnboardingForm(validSchoolStudent)).toEqual({ valid: true, errors: {} });
  });

  it('accepts a working-adult form with no school', () => {
    const form = { ...validSchoolStudent, grade: 'วัยทำงาน/บุคคลทั่วไป', school: '' };
    expect(validateOnboardingForm(form)).toEqual({ valid: true, errors: {} });
  });

  it('requires school when grade is a school grade', () => {
    const form = { ...validSchoolStudent, school: '' };
    const result = validateOnboardingForm(form);
    expect(result.valid).toBe(false);
    expect(result.errors.school).toBe('กรุณากรอกชื่อโรงเรียน');
  });

  it('requires fullName, nickname, grade, and phone', () => {
    const result = validateOnboardingForm({ fullName: '', nickname: '', grade: '', school: '', phone: '', lineId: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.fullName).toBe('กรุณากรอกชื่อจริง');
    expect(result.errors.nickname).toBe('กรุณากรอกชื่อเล่น');
    expect(result.errors.grade).toBe('กรุณาเลือกช่วงชั้น/กลุ่มผู้เรียน');
    expect(result.errors.phone).toBe('กรุณากรอกเบอร์โทร');
  });

  it('treats whitespace-only values as missing', () => {
    const form = { ...validSchoolStudent, fullName: '   ' };
    const result = validateOnboardingForm(form);
    expect(result.errors.fullName).toBe('กรุณากรอกชื่อจริง');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/onboarding-validation.test.js`
Expected: FAIL with "Cannot find module './onboarding-validation.js'".

- [ ] **Step 3: Write the implementation**

```js
// src/lib/onboarding-validation.js
export const SCHOOL_GRADES = ['ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6'];

export function validateOnboardingForm(formData) {
  const errors = {};

  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = 'กรุณากรอกชื่อจริง';
  }
  if (!formData.nickname || !formData.nickname.trim()) {
    errors.nickname = 'กรุณากรอกชื่อเล่น';
  }
  if (!formData.grade) {
    errors.grade = 'กรุณาเลือกช่วงชั้น/กลุ่มผู้เรียน';
  }
  if (SCHOOL_GRADES.includes(formData.grade) && (!formData.school || !formData.school.trim())) {
    errors.school = 'กรุณากรอกชื่อโรงเรียน';
  }
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = 'กรุณากรอกเบอร์โทร';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/onboarding-validation.test.js`
Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/onboarding-validation.js src/lib/onboarding-validation.test.js
git commit -m "feat: add onboarding form validation with conditional school rule"
```

---

### Task 5: Firebase client init

**Files:**
- Create: `src/lib/firebase.js`

**Interfaces:**
- Consumes: `buildFirebaseConfig` from Task 2 (`src/lib/env.js`).
- Produces: `auth` (Firebase `Auth` instance), `googleProvider` (`GoogleAuthProvider` instance), `db` (Firestore instance). Used by every page's JS from Task 8 onward.

This module is impure (calls `initializeApp` against real Firebase) — no unit test. It is exercised for real in Task 8's manual dev-server check.

- [ ] **Step 1: Write the implementation**

```js
// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { buildFirebaseConfig } from './env.js';

const app = initializeApp(buildFirebaseConfig(import.meta.env));

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: exit code 0. (This only checks the module parses and imports resolve — it does not exercise Firebase itself, since no `.env.local` is required at build time for static analysis. If it fails with a Firebase-related runtime error, that's fine at this stage; only bundler/syntax errors here are a problem.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/firebase.js
git commit -m "feat: add Firebase app/auth/firestore client init"
```

---

### Task 6: User profile Firestore I/O

**Files:**
- Create: `src/lib/user-profile-io.js`

**Interfaces:**
- Consumes: `db` from Task 5 (`src/lib/firebase.js`), passed in as a parameter (not imported directly) so the functions stay easy to reason about in isolation.
- Produces: `fetchUserDoc(db, uid)` → `Promise<object|null>`. `createUserDoc(db, uid, data)` → `Promise<void>`. `completeOnboarding(db, uid, formData)` → `Promise<void>` (merges `formData` into the doc and sets `onboardingComplete: true`). Used by Task 8 (`login.js`) and Task 9 (`onboarding.js`).

No unit test — these are thin wrappers around the Firestore SDK with no branching logic of their own; verified manually against the real project / emulator in Task 12 and Task 14.

- [ ] **Step 1: Write the implementation**

```js
// src/lib/user-profile-io.js
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function fetchUserDoc(db, uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function createUserDoc(db, uid, data) {
  await setDoc(doc(db, 'users', uid), data);
}

export async function completeOnboarding(db, uid, formData) {
  await updateDoc(doc(db, 'users', uid), { ...formData, onboardingComplete: true });
}
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add src/lib/user-profile-io.js
git commit -m "feat: add Firestore I/O wrappers for the users collection"
```

---

### Task 7: Auth guard

**Files:**
- Create: `src/lib/auth-guard.js`
- Test: `src/lib/auth-guard.test.js`

**Interfaces:**
- Consumes: `auth`, `db` from Task 5, `fetchUserDoc` from Task 6.
- Produces: `isAdmin(userDocData)` → `boolean` (pure, tested). `requireLogin(onReady)` → subscribes to `onAuthStateChanged`, redirects to `/login.html` if signed out, otherwise calls `onReady(firebaseUser, userDocData)`. `requireAdmin(onReady)` → same but also redirects non-admins to `/dashboard.html`. Used by Task 9, 10, 11.

- [ ] **Step 1: Write the failing test for the pure part**

```js
// src/lib/auth-guard.test.js
import { describe, it, expect } from 'vitest';
import { isAdmin } from './auth-guard.js';

describe('isAdmin', () => {
  it('returns false when there is no user doc', () => {
    expect(isAdmin(null)).toBe(false);
  });

  it('returns false for a student', () => {
    expect(isAdmin({ role: 'student' })).toBe(false);
  });

  it('returns true for an admin', () => {
    expect(isAdmin({ role: 'admin' })).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/auth-guard.test.js`
Expected: FAIL with "Cannot find module './auth-guard.js'".

- [ ] **Step 3: Write the implementation**

```js
// src/lib/auth-guard.js
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase.js';
import { fetchUserDoc } from './user-profile-io.js';

export function isAdmin(userDocData) {
  return !!userDocData && userDocData.role === 'admin';
}

export function requireLogin(onReady) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      window.location.href = '/login.html';
      return;
    }
    const userDoc = await fetchUserDoc(db, firebaseUser.uid);
    onReady(firebaseUser, userDoc);
  });
}

export function requireAdmin(onReady) {
  return requireLogin((firebaseUser, userDoc) => {
    if (!isAdmin(userDoc)) {
      window.location.href = '/dashboard.html';
      return;
    }
    onReady(firebaseUser, userDoc);
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/auth-guard.test.js`
Expected: 3 passed.

Note: importing `auth-guard.js` in a test also imports `firebase.js`, which calls `initializeApp` at module-load time. Vitest runs in `node` environment without `import.meta.env` populated, so this import could throw if `buildFirebaseConfig` runs eagerly. If the test fails with a "Missing required Firebase env vars" error instead of the expected assertion results, add a `.env.test` file at the repo root with dummy values for the four `VITE_FIREBASE_*` keys, and confirm Vitest picks it up (Vite/Vitest load `.env.test` automatically in `test` mode) — if it still fails, add `envDir: '.'` alongside `test.include` in `vitest.config.js` to point it at the repo root where `.env.test` lives.

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth-guard.js src/lib/auth-guard.test.js
git commit -m "feat: add auth guard with admin check"
```

---

### Task 8: Login page

**Files:**
- Create: `src/login.js`
- Modify: `src/login.html` (add `<script type="module" src="./login.js"></script>` before `</body>`)

**Interfaces:**
- Consumes: `auth`, `googleProvider`, `db` from Task 5; `fetchUserDoc`, `createUserDoc` from Task 6; `buildNewUserDoc`, `getPostLoginRedirect` from Task 3.
- Produces: click handler on `#google-signin-btn` (id defined in Task 1's `login.html`).

- [ ] **Step 1: Write the implementation**

```js
// src/login.js
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from './lib/firebase.js';
import { fetchUserDoc, createUserDoc } from './lib/user-profile-io.js';
import { buildNewUserDoc, getPostLoginRedirect } from './lib/user-profile.js';

document.getElementById('google-signin-btn').addEventListener('click', async () => {
  const result = await signInWithPopup(auth, googleProvider);
  let userDoc = await fetchUserDoc(db, result.user.uid);
  if (!userDoc) {
    userDoc = buildNewUserDoc(result.user);
    await createUserDoc(db, result.user.uid, userDoc);
  }
  const target = getPostLoginRedirect(userDoc) === 'onboarding' ? './onboarding.html' : './dashboard.html';
  window.location.href = target;
});
```

- [ ] **Step 2: Wire the script into the HTML**

In `src/login.html`, add immediately before `</body>`:

```html
  <script type="module" src="./login.js"></script>
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: exit code 0, `dist/login.html` references a bundled JS file.

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, open the printed URL, navigate to `/login.html`. Expected: page renders the "เข้าสู่ระบบด้วย Google" button (clicking it will fail without real `.env.local` values and a live Firebase project — that full flow is verified in Task 14).

- [ ] **Step 5: Commit**

```bash
git add src/login.js src/login.html
git commit -m "feat: wire Google sign-in on the login page"
```

---

### Task 9: Onboarding page

**Files:**
- Create: `src/onboarding.js`
- Modify: `src/onboarding.html` (add `<script type="module" src="./onboarding.js"></script>` before `</body>`)

**Interfaces:**
- Consumes: `requireLogin` from Task 7; `db` from Task 5; `completeOnboarding` from Task 6; `validateOnboardingForm` from Task 4. Relies on the form field ids/names and `[data-error-for]` spans defined in Task 1's `onboarding.html`.

- [ ] **Step 1: Write the implementation**

```js
// src/onboarding.js
import { requireLogin } from './lib/auth-guard.js';
import { db } from './lib/firebase.js';
import { completeOnboarding } from './lib/user-profile-io.js';
import { validateOnboardingForm } from './lib/onboarding-validation.js';

let currentUid = null;

requireLogin((firebaseUser) => {
  currentUid = firebaseUser.uid;
});

function renderErrors(errors) {
  document.querySelectorAll('.field-error').forEach((el) => {
    el.textContent = '';
  });
  for (const [field, message] of Object.entries(errors)) {
    const el = document.querySelector(`[data-error-for="${field}"]`);
    if (el) el.textContent = message;
  }
}

document.getElementById('onboarding-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target).entries());
  const { valid, errors } = validateOnboardingForm(formData);
  renderErrors(errors);
  if (!valid) return;
  await completeOnboarding(db, currentUid, formData);
  window.location.href = './dashboard.html';
});
```

- [ ] **Step 2: Wire the script into the HTML**

In `src/onboarding.html`, add immediately before `</body>`:

```html
  <script type="module" src="./onboarding.js"></script>
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, navigate to `/onboarding.html`. Expected: form renders with all fields; submitting it without a real signed-in session will hang on `requireLogin`'s redirect logic (fine — real flow verified in Task 14).

- [ ] **Step 5: Commit**

```bash
git add src/onboarding.js src/onboarding.html
git commit -m "feat: wire onboarding form submission and validation"
```

---

### Task 10: Dashboard page

**Files:**
- Create: `src/dashboard.js`
- Modify: `src/dashboard.html` (add `<script type="module" src="./dashboard.js"></script>` before `</body>`)

**Interfaces:**
- Consumes: `requireLogin` from Task 7; `auth` from Task 5; `signOut` from `firebase/auth`. Relies on `#welcome-message` and `#sign-out-btn` ids from Task 1's `dashboard.html`.

- [ ] **Step 1: Write the implementation**

```js
// src/dashboard.js
import { signOut } from 'firebase/auth';
import { requireLogin } from './lib/auth-guard.js';
import { auth } from './lib/firebase.js';

requireLogin((firebaseUser, userDoc) => {
  const name = userDoc?.nickname || firebaseUser.displayName || firebaseUser.email;
  document.getElementById('welcome-message').textContent = `สวัสดี ${name}`;
});

document.getElementById('sign-out-btn').addEventListener('click', () => {
  signOut(auth);
});
```

- [ ] **Step 2: Wire the script into the HTML**

In `src/dashboard.html`, add immediately before `</body>`:

```html
  <script type="module" src="./dashboard.js"></script>
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 4: Commit**

```bash
git add src/dashboard.js src/dashboard.html
git commit -m "feat: wire dashboard welcome message and sign-out"
```

---

### Task 11: Admin placeholder page

**Files:**
- Create: `src/admin/index.js`
- Modify: `src/admin/index.html` (add `<script type="module" src="./index.js"></script>` before `</body>`)

**Interfaces:**
- Consumes: `requireAdmin` from Task 7 (imported as `../lib/auth-guard.js` since this file lives one directory deeper). Relies on `#admin-welcome` id from Task 1's `admin/index.html`.

- [ ] **Step 1: Write the implementation**

```js
// src/admin/index.js
import { requireAdmin } from '../lib/auth-guard.js';

requireAdmin((firebaseUser) => {
  document.getElementById('admin-welcome').textContent = `Admin: ${firebaseUser.email}`;
});
```

- [ ] **Step 2: Wire the script into the HTML**

In `src/admin/index.html`, add immediately before `</body>`:

```html
  <script type="module" src="./index.js"></script>
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: exit code 0, `dist/admin/index.html` exists and references a bundled JS file.

- [ ] **Step 4: Commit**

```bash
git add src/admin/index.js src/admin/index.html
git commit -m "feat: wire admin placeholder page behind requireAdmin guard"
```

---

### Task 12: Firestore rules + emulator verification

**Files:**
- Create: `firebase.json`
- Create: `firestore.rules`
- Create: `firestore.indexes.json`

**Interfaces:**
- No code interface — this task configures the Firebase project's rules, which every earlier task's Firestore calls run against.

- [ ] **Step 1: Create `firebase.json`**

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "ui": { "enabled": true, "port": 4000 }
  }
}
```

- [ ] **Step 2: Create `firestore.indexes.json`**

```json
{
  "indexes": [],
  "fieldOverrides": []
}
```

- [ ] **Step 3: Create `firestore.rules`**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    function lockedFieldsUnchanged() {
      return request.resource.data.get('role', null) == resource.data.get('role', null) &&
        request.resource.data.get('tier', null) == resource.data.get('tier', null) &&
        request.resource.data.get('totalStars', null) == resource.data.get('totalStars', null) &&
        request.resource.data.get('stageProgress', null) == resource.data.get('stageProgress', null);
    }

    match /users/{uid} {
      allow read: if request.auth != null && (request.auth.uid == uid || isAdmin());

      allow create: if request.auth != null && request.auth.uid == uid &&
        request.resource.data.role == "student" &&
        request.resource.data.tier == "free" &&
        !('totalStars' in request.resource.data) &&
        !('stageProgress' in request.resource.data);

      allow update: if request.auth != null &&
        ((request.auth.uid == uid && lockedFieldsUnchanged()) || isAdmin());
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

- [ ] **Step 4: Link this local repo to the real Firebase project**

Run: `firebase use --add`, select the project created in Prerequisites step 1, give it the alias `default`. This creates `.firebaserc` — commit it too.

- [ ] **Step 5: Start the emulator**

Run: `firebase emulators:start --only auth,firestore`
Expected: terminal prints emulator UI running at `http://localhost:4000`, Auth on `9099`, Firestore on `8080`.

- [ ] **Step 6: Manually verify the rules block a non-owner read**

With the emulator running, open a second terminal and run `node`, then paste:

```js
const { initializeApp } = require('firebase/app');
const { getFirestore, connectFirestoreEmulator, doc, setDoc, getDoc } = require('firebase/firestore');
const { getAuth, connectAuthEmulator, signInAnonymously } = require('firebase/auth');

(async () => {
  const app = initializeApp({ projectId: 'demo-test' });
  const auth = getAuth(app);
  const db = getFirestore(app);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);

  const userA = await signInAnonymously(auth);
  await setDoc(doc(db, 'users', userA.user.uid), { role: 'student', tier: 'free', onboardingComplete: true });

  // Sign in as a second anonymous user and try to read user A's doc — should be denied.
  const userB = await signInAnonymously(auth);
  try {
    await getDoc(doc(db, 'users', userA.user.uid));
    console.log('FAIL: read should have been denied');
  } catch (e) {
    console.log('PASS: read denied as expected —', e.code);
  }
})();
```

Expected output: `PASS: read denied as expected — permission-denied`. (This script is a one-off manual check, not part of the codebase — do not commit it.)

- [ ] **Step 7: Manually verify a user cannot self-promote `tier`**

In the same node session, as `userA` (re-sign-in if needed via a fresh token), attempt:

```js
const { updateDoc } = require('firebase/firestore');
try {
  await updateDoc(doc(db, 'users', userA.user.uid), { tier: 'full' });
  console.log('FAIL: update should have been denied');
} catch (e) {
  console.log('PASS: update denied as expected —', e.code);
}
```

Expected output: `PASS: update denied as expected — permission-denied`.

- [ ] **Step 8: Deploy the rules to the real project**

Run: `firebase deploy --only firestore:rules`
Expected: CLI reports successful deploy.

- [ ] **Step 9: Commit**

```bash
git add firebase.json firestore.rules firestore.indexes.json .firebaserc
git commit -m "feat: add baseline Firestore security rules"
```

---

### Task 13: GitHub repository, Pages, and CI deploy

⚠️ **Creating the repository and pushing code makes it visible outside this machine. Confirm the repo name and visibility (public/private) with Pik before running the `gh repo create` / `git push` steps.**

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- No code interface — this task wires CI to the `npm run build` output from Task 1.

- [ ] **Step 1: Rename the local branch to `main`** (GitHub's modern default; current branch is `master`)

Run: `git branch -M main`
Expected: `git branch` now shows `* main`.

- [ ] **Step 2: Create the GitHub repository** (after confirming name/visibility with Pik)

Run: `gh repo create pik-a-class --source=. --remote=origin --private` (swap `--private` for `--public` per Pik's answer)
Expected: repo created, `origin` remote added.

If the repo name differs from `pik-a-class`, update `base: '/pik-a-class/'` in `vite.config.js` (Task 1, Step 3) to match before continuing.

- [ ] **Step 3: Push**

Run: `git push -u origin main`
Expected: push succeeds.

- [ ] **Step 4: Enable GitHub Pages with GitHub Actions as the source**

Run: `gh api -X PUT repos/{owner}/pik-a-class/pages -f build_type=workflow` (or via the GitHub UI: Settings → Pages → Source → GitHub Actions)
Expected: Pages is enabled for the repo, no branch-based source configured (the workflow below handles publishing).

- [ ] **Step 5: Add the four Firebase config values as repo secrets**

Run for each of the four `.env.local` values from Prerequisites step 4:

```bash
gh secret set VITE_FIREBASE_API_KEY --body "<value>"
gh secret set VITE_FIREBASE_AUTH_DOMAIN --body "<value>"
gh secret set VITE_FIREBASE_PROJECT_ID --body "<value>"
gh secret set VITE_FIREBASE_APP_ID --body "<value>"
```

Expected: `gh secret list` shows all four.

- [ ] **Step 6: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 7: Commit and push**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy to GitHub Pages on push to main"
git push
```

- [ ] **Step 8: Watch the workflow run and verify the live URL**

Run: `gh run watch` (or check the Actions tab in the GitHub UI)
Expected: both `build` and `deploy` jobs succeed. Visit `https://<owner>.github.io/pik-a-class/` — the login page should load (styled, button visible). Also add this project's Google Sign-In authorized domain: in the Firebase Console → Authentication → Settings → Authorized domains → add `<owner>.github.io`.

---

### Task 14: End-to-end manual QA (done by Pik — cannot be automated by an agent, since it requires a real Google account interactively signing in)

- [ ] Visit the deployed `https://<owner>.github.io/pik-a-class/` URL (or `npm run dev` locally with real `.env.local` values).
- [ ] Click "เข้าสู่ระบบด้วย Google", sign in with a Google account never used on this app before.
- [ ] Confirm you land on `onboarding.html` (new user, `onboardingComplete` is `false`).
- [ ] Try submitting the onboarding form empty — confirm every required field shows its Thai error message under the field, and the page does not navigate away.
- [ ] Pick grade `ม.3`, leave `school` empty, submit — confirm only the school error shows.
- [ ] Fill in `school`, submit — confirm you land on `dashboard.html` and it greets you by nickname.
- [ ] Refresh `dashboard.html` directly — confirm you stay on the dashboard (not bounced to onboarding again).
- [ ] Click "ออกจากระบบ" — confirm you're signed out and redirected to `login.html` on next protected-page visit.
- [ ] Sign back in with the same account — confirm you land directly on `dashboard.html` (onboarding is skipped).
- [ ] In the Firebase Console, manually edit your own `users/{uid}` doc, set `role: "admin"`.
- [ ] Visit `/admin/index.html` — confirm it now loads and shows your email; sign in as a different (student) account and visit `/admin/index.html` — confirm it redirects to `dashboard.html`.
- [ ] Repeat the onboarding flow with grade `วัยทำงาน/บุคคลทั่วไป` and an empty `school` field — confirm it submits successfully (school is optional for this grade).

---

## Self-Review Notes

- **Spec coverage:** every numbered section of `2026-09-19-foundation-design.md` maps to a task — §2/§3 build tooling and page structure → Task 1; §4 Firebase setup → Prerequisites + Task 12; §5 auth/onboarding flow → Tasks 3, 6, 7, 8, 9; §6 security rules → Task 12; §7 data model → Tasks 3, 4 (the `onboardingComplete` field is threaded through both); §8 deployment → Task 13; §9 testing approach (manual, no automated rules suite) → Task 12 steps 6-7 and Task 14; §11 out-of-scope items are simply absent from every task, as intended.
- **Placeholder scan:** no TBD/TODO markers; every step carries literal code or literal shell commands.
- **Type/name consistency check:** `getPostLoginRedirect` (Task 3) is used identically in Task 8; `fetchUserDoc`/`createUserDoc`/`completeOnboarding` (Task 6) match their call sites in Tasks 7-9 exactly; `isAdmin`/`requireLogin`/`requireAdmin` (Task 7) match Tasks 9-11; DOM ids (`google-signin-btn`, `onboarding-form`, `[data-error-for]`, `welcome-message`, `sign-out-btn`, `admin-welcome`) are defined once in Task 1's HTML and referenced with the same spelling in Tasks 8-11.
