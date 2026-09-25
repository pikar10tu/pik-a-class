# Pik a Class - Agent Guidelines & Project Memory

This document contains critical project rules, architectural constraints, and lessons learned for AI agents working on the **Pik a Class** codebase.

---

## 1. Project Overview & Architecture
* **Stack**: Vanilla JS (ES Modules) + Vite (MPA) + Firebase (Auth, Cloud Firestore) + Vitest.
* **Hosting**: GitHub Pages via GitHub Actions (`https://pikar10tu.github.io/pik-a-class/`).
* **Offline / PWA**: `vite-plugin-pwa` with Workbox Service Worker caching.

---

## 2. Vite MPA Routing Rule
* Every single HTML file created in subdirectories (e.g., `src/vocab/index.html`, `src/vocab/cafe.html`, `src/admin/student-report.html`) **MUST be registered** under `rollupOptions.input` in [`vite.config.js`](file:///d:/WEBPROJECT/pik-a-class/vite.config.js).
* Always run `npm run build` after adding new pages to ensure chunks and service worker precache lists include the new page.

---

## 3. Quiz & Vocabulary Choice Design (Anti-Guessing Guard)
* **Single Crisp Meaning**: The `thai:` field and each distractor in `alternatives:` must be a concise, single translation.
* **No Clue Symbols**: Never use commas (`,`), parenthetical notes `(...)`, or slashes (`/`) in `thai:` or `alternatives:`. Distractors and the correct answer must have balanced length and match the Part of Speech.
* **Engine Defensive Guard**: Any quiz engine (such as [`src/lib/cafe-engine.js`](file:///d:/WEBPROJECT/pik-a-class/src/lib/cafe-engine.js)) must sanitize choice texts using `sanitizeChoiceText()` to guarantee no clue commas leak onto UI buttons.
* **Dataset Size & Balance**: 11 categories × ~92 words (A1: 30, A2: 27, B1: 18, B2: 17) = 1,012 words. Keep new categories on the same per-level split; `npm test` requires ≥ 50 words per category.

---

## 3.1 Content Editing Rules (read before touching any content)
* **Full playbook: [`docs/content-pipeline.md`](file:///d:/WEBPROJECT/pik-a-class/docs/content-pipeline.md).** Follow it step by step.
* **Vocab**: edit `scripts/vocab-builder/data-*.js` → `npm run build:vocab`. Never edit the generated `src/lib/vocab-items.js`. Helpers live in `src/lib/vocab-data.js`.
* **Vocab IDs are permanent** (stored in students' `favoriteVocab` and per-word `submissions`). Never point an existing `id` at a different word; a new word gets a new `id`. `scripts/vocab-builder/vocab-ids.lock.json` enforces this.
* **Exercises & stages**: source of truth is `docs/seeds/*.json`; every item has a permanent `id` = Firestore doc ID. Flow: `content:pull` → edit → `check:content` → `content:sync` (dry-run) → `content:sync -- --apply` → `content:health`.
* Never delete seed items to retire them — set `"reviewStatus": "draft"`. Never edit `docs/seeds/archive/`.
* Changing a stage's `tags` requires the matching exercises to carry that tag in the same change; `check:content` fails if any published stage has fewer exercises than `drawCount`.
* Do not write ad-hoc import scripts against production. Extend `scripts/content-sync.mjs` / `scripts/lib/firestore-rest.mjs` instead.

---

## 4. Student Repetition Tracking & Analytics Architecture
* Student progress is measured by **repetitions and effort**, not just one-off clears.
* Every practice session (stage play, vocab cafe game) writes into Firestore `submissions`:
  - `attemptCount`: Total attempts on this item/stage.
  - `wrongCount`: Number of incorrect attempts.
  - `skill`: `'vocab' | 'grammar' | 'dialogue'`.
  - `level`: CEFR level (`A1` - `B2`).
* Parent Report Card ([`src/admin/student-report.html`](file:///d:/WEBPROJECT/pik-a-class/src/admin/student-report.html)) queries these submissions to compute total questions answered, accuracy, repetition rate, and CEFR-level vocab mastery, with 1-click export options (PNG image via `html2canvas`, LINE-ready text, PDF/Print).

---

## 5. UI, Modals & Stacking Context
* All Modals, Bottom Sheets, and Backdrops must specify `z-index: 1000+` (sheet content at `1001`, backdrop at `1000`) and solid surface backgrounds (`#ffffff`) to prevent elements from bleeding through.
* In stage completion summary screens:
  - If passed (`summary.passed === true`): Top primary button is "ไปต่อ" (`btn-chunky`), secondary is "เล่นด่านนี้อีกครั้ง" (`btn-ghost`).
  - If failed (`summary.passed === false`): Primary button is "ลองอีกครั้ง", secondary is "กลับเส้นทางด่าน".

---

## 6. Testing & CI/CD Integrity
* Always run `npm test` before committing. CI also runs `npm run check:vocab` and `npm run check:content`.
* Never insert user-entered text (names, comments) with `innerHTML`; use `textContent`.
* Firestore `in` / `documentId() in` queries accept max 30 values — chunk them.
* Pages that must not auto-reload on a service-worker update are detected in `src/lib/pwa-update.js` (`isBusy`); add new in-progress views there.
* When updating Firestore security rules, run `npm run test:rules`.
* GitHub branch mapping: Local `master` pushes to remote `main` (`git push origin master:main`).

---

## 7. UI/UX Design Standards & Kid-Friendly Guidelines
* **Kid-Friendly Lexicon**: Never use technical terms like "Dashboard", "Repository", or "Aggregation" on student-facing screens. Always use "หน้าหลัก" (Home), "คลังบทเรียน", "คลังคำศัพท์", and "ห้องถ้วยรางวัล".
* **4-Zone Home Structure**: The home page must feature 4 distinct activity cards in fixed order:
  1. 🚀 **ตะลุยด่านภาษาอังกฤษ** (Adventure Mode, `#37c871`)
  2. ☕ **Animal Cafe** (Vocab minigame & endless mode, `#ea580c`)
  3. 📖 **คู่มือสรุปไวยากรณ์** (Grammar Handbook, `#2563eb`)
  4. 🗂️ **คลังคำศัพท์** (Vocab Hub & Flashcards, `#7c3aed`)
* **High-Visibility Back Navigation**: Every sub-page must feature a prominent `.btn-nav-back` button (minimum touch target $44\times 44\text{px}$, WCAG 2.2 AA compliant, 3D chunky style with `←` arrow and clear destination label).
* **3D Tactile Buttons**: Use chunky 3D buttons (`border-bottom: 3px-4px`), `:active` translates `2px` with audio feedback, wrapped with `@media (hover: hover) and (pointer: fine)` to prevent mobile hover stickiness.
* **Skill Reference**: See `.agents/skills/pik-ui-standards/SKILL.md` and `docs/design/ui-standards.md` for full design tokens and rules.

