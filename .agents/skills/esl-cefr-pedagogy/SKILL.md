---
name: esl-cefr-pedagogy
description: >-
  CEFR curriculum alignment, English grammar taxonomy, pedagogical rules,
  and anti-guessing question distractor design for Pik a Class.
  Use when writing, auditing, or generating grammar notes, quiz questions, vocabulary exercises, or curriculum modules.
---

# ESL & CEFR Pedagogy Guidelines (Pik a Class)

This skill enforces pedagogical standards, CEFR taxonomy accuracy, spiral learning structure, and the Anti-Guessing Guard for all English exercises and reference materials in **Pik a Class**.

---

## 1. Anti-Guessing Guard (Rules for Distractors & Vocabulary)
1. **Single Crisp Meaning:**
   - Every `thai:` translation and all distractor choices in `alternatives:` must be a concise, single translation.
2. **Strict Symbol Ban (No Clues!):**
   - NEVER use commas (`,`), parenthetical notes `(...)`, or slashes (`/`) in `thai:` or `alternatives:`.
   - Distractors and the correct answer must have balanced length and belong to the same Part of Speech (POS).
   - In quiz engines (like `cafe-engine.js`), always pass choices through `sanitizeChoiceText()` before UI display.
3. **Automated Unit Test Verification:**
   - Ensure `npm test` checks that no vocabulary or distractor item in `src/lib/vocab-data.js` or `src/lib/word-bank.js` contains clue commas or parentheses.

---

## 2. Spiral Learning Architecture (Duolingo-style Progression)
1. **Item Pool Budget:**
   - Every grammar topic requires a pool of **15 exercises** (Sentence Builder 4, Fill-in-the-Blank 5-6, MCQ 5-6).
2. **Paired Stages per Topic:**
   - **Part 1 (Familiarization):** Randomly draws 7 questions (guarantees at least 1 sentence builder).
   - **Part 2 (Challenge):** Randomly draws 7 questions (guarantees at least 2 sentence builders).
3. **Milestone Stages:**
   - **Mini-Boss (Stage 10):** Cumulative review testing all topics covered in Stages 1–9.
   - **Final Boss (Stage 20):** 10-question master challenge testing all topics across the entire level.
4. **All-in-One Package Rule:**
   - Whenever introducing a new level, always supply all three pillars simultaneously:
     1. Grammar Notes in `src/lib/grammar-notes/`
     2. Exercises Pool (150 items)
     3. Stages definition (20 stages)

---

## 3. CEFR Taxonomy Standard
- **A1 (Beginner):** Present Simple (be/do), Articles, Pronouns, Nouns, there is/are, Prepositions of place/time, Present Continuous, can/can't, Imperatives, was/were.
- **A2 (Elementary):** Past Simple (regular+irregular), Past Continuous & when/while, Present Perfect (experience), Future Forms (will / going to / pres cont), Quantifiers, Comparatives/Superlatives, Modals (must/have to/should), Gerunds/Infinitives, Conditionals 0 & 1.
- **B1 (Intermediate):** Present Perfect Continuous vs Simple, Past Perfect, Past Habits (used to vs be used to), Passive Voice, Second Conditional & Wishes, Modals of Deduction (present), Defining Relative Clauses, Reported Speech, Discourse Connectors.
- **B2 (Upper-Intermediate):** Participle Clauses, Third & Mixed Conditionals, Unreal Past & Subjunctive, Past Modals of Deduction & Regret, Advanced Passive & Causatives, Non-defining Relative Clauses, Future Aspects, Inversion for Emphasis, Cleft Sentences, Academic Hedging.
