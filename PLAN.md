# Pik a Class — PLAN.md

> English Tutoring Practice Platform — ชื่อโปรเจกต์: **Pik a Class** (เล่นคำจาก "Pick a class" + ชื่อเล่น "ปิ๊ก")
> Spec สำหรับส่งต่อให้ Claude Code / มือ implement ครับ ยังมีจุดที่ควร confirm ก่อนเริ่มโค้ด (ดูท้ายไฟล์)

## 1. ภาพรวม

เว็บทบทวนภาษาอังกฤษ (ไวยากรณ์ + คำศัพท์) เปิดกว้างทั้งนักเรียนโรงเรียน (ม.1–ม.6) และผู้เรียนวัยทำงาน/บุคคลทั่วไป แมปกับเลเวล CEFR A1–C1 มีโซน "ตะลุยด่าน" แบบเกม (เติมคำ + shadowing), โซนแบบฝึกหัดอิสระ (MCQ/จับคู่/เขียนตอบ), และการบ้านที่ปิ๊กสร้าง/มอบหมายเป็นรายคนหรือเป็นกลุ่มได้ ที่ปิ๊กตรวจย้อนหลังได้ เก็บสถิติ/ดาว/streak เป็นรายคน ดีพลอยผ่าน GitHub Pages

เปิดให้ใครก็สมัครเข้ามาได้เลย (self-signup) ทุกคนเริ่มที่ free tier แล้วปิ๊กปลดล็อก full access เองทีหลังในหน้า admin

**หลักการสำคัญที่ยึดตลอดการออกแบบ:** แม้เนื้อหาข้างในจะเยอะมาก (เป้าหมายระดับ Duolingo ต่อเลเวล) หน้าตาที่นักเรียนเจอต้องเรียบง่าย ไม่ซับซ้อน — nav หลักไม่เกิน 3–4 เมนู, แต่ละหน้าจอโฟกัสแอ็กชันเดียว (เช่นปุ่ม "ทำต่อ" เด่นสุด), ฟีเจอร์เสริม/แอดมินไม่โผล่กวนสายตาคนทั่วไป

## 2. Stack

- **Frontend:** static HTML/JS/CSS, deploy บน GitHub Pages
- **Backend:** Firebase — โปรเจกต์แยกใหม่
  - Firebase Authentication — Google Sign-In
  - Firestore — user, exercise, stage, assignment, submission, config
- **เนื้อหาคลังหลัก (bank):** ใช้ generative AI (Claude Code) ช่วย "แต่ง" แบบฝึกหัด/คำศัพท์เป็นชุดใหญ่ตามเลเวล CEFR + สกิล เพื่อให้ได้ปริมาณระดับ Duolingo เร็วขึ้นมาก — ผ่าน pipeline ตรวจสอบก่อนเผยแพร่จริง ไม่ใช่ generate แล้วขึ้นเว็บทันที:
  1. Generate เป็นไฟล์ JSON ตาม schema เป็นชุดตามเลเวล+สกิล (ระบุขอบเขตหัวข้อไวยากรณ์/คำศัพท์ที่เหมาะกับเลเวลนั้นให้ชัดก่อน generate)
  2. ตรวจเชิงโครงสร้างอัตโนมัติด้วยสคริปต์ (MCQ ต้องมีคำตอบถูกข้อเดียว, answerKey ตรงกับ choices ที่มีจริง, field ครบตาม schema)
  3. ให้ AI ตรวจทานซ้ำอีกรอบ (second-pass) เช็กความถูกต้อง/ความกำกวมของคำตอบ — แบบเดียวกับที่เคยเจอตอนทำ placement test (บางข้อรับได้ทั้ง "must" กับ "can")
  4. ปิ๊กสุ่มตรวจเองรอบสุดท้ายก่อน publish โดยเฉพาะข้อที่ auto-grade เข้มงวด
  - เนื้อหาที่ยัง audit ไม่ผ่านจะไม่โผล่ให้นักเรียนเห็น (ดู `reviewStatus` ในข้อ 9)
- **เนื้อหาการบ้านเฉพาะบุคคล/กลุ่ม:** พิมพ์ผ่านหน้า admin ได้โดยตรง (ดูข้อ 7)

## 3. Signup / Onboarding

1. Google Sign-In
2. กรอกโปรไฟล์ครั้งแรก:
   - ชื่อจริง, ชื่อเล่น
   - **ช่วงชั้น/กลุ่มผู้เรียน** — dropdown: ม.1, ม.2, ม.3, ม.4, ม.5, ม.6, **วัยทำงาน/บุคคลทั่วไป** *(ใหม่ — ครอบคลุมคนแบบพี่โก้ที่ไม่ใช่นักเรียนโรงเรียน)*
   - โรงเรียน/หน่วยงาน (ถ้ามี — optional เพราะกลุ่มวัยทำงานอาจไม่มี)
   - เบอร์โทร, LINE ID
3. บันทึกเป็น user ใหม่ด้วย `role: student`, `tier: free`

> เรื่อง wording "วัยทำงาน/บุคคลทั่วไป" — ลองใส่ให้ก่อน ถ้าไม่ชอบคำนี้เปลี่ยนได้ง่าย (ทางเลือกอื่นที่คิดไว้: "ผู้ใหญ่", "บุคคลทั่วไป" เดี่ยวๆ)

## 4. User roles & account model

| Role | tier | หมายเหตุ |
|---|---|---|
| Student | `free` → `full` | free เป็นค่าเริ่มต้น, ปิ๊กปลดล็อกเป็น full เองในหน้า admin |
| Admin (ปิ๊ก) | `full` (fixed) | เห็น/เล่นฝั่งนักเรียนแบบปกติเพื่อทดสอบ + มีเมนู Admin เพิ่ม |

ทุก query ฝั่ง admin filter ด้วย `role == "student"` เสมอ

## 5. Free-tier access rules

> **ปรับแล้วตาม `docs/superpowers/specs/2026-09-20-data-layer-design.md`** — เดิมร่างไว้เป็นลิมิตรายเลเวล + `config/freeTierLimits` ซึ่งเป็นกลไกสำหรับผู้ใช้สาธารณะ แต่ผู้ใช้จริงคือนักเรียนที่ปิ๊กสอนอยู่ (ได้ `full` ตั้งแต่แรก) จึงเหลือสวิตช์เดียว **`config/freeTierLimits` ถูกยกเลิก ไม่ต้องสร้าง collection นี้**

**กฎเดียวใช้กับเนื้อหาทุกชนิด (`exercises` / `stages` / `grammarNotes`):** นักเรียนเห็นข้อที่ `reviewStatus == "published"` และ (`isPreview == true` **หรือ** `tier == "full"`) — บังคับที่ Firestore security rules

- `tier: full` — เห็นเนื้อหาทั้งหมดที่อนุมัติแล้ว (ค่าที่ปิ๊กกดให้นักเรียนในคลาสเอง)
- `tier: free` — เห็นเฉพาะข้อที่ติด `isPreview: true` (ไว้ให้คนนอกที่มาลอง)
- **การบ้านรายบุคคล/กลุ่ม:** ไม่ผ่าน free-tier gate — คนที่อยู่ใน `assignedUids` ของข้อนั้นอ่านได้เสมอไม่ว่า tier ไหน และข้อที่ `visibility: assignmentOnly` อ่านได้เฉพาะคนที่ถูก assign เท่านั้น (คนอื่นแม้ tier `full` ก็ไม่เห็น)
- **มินิเกมคำศัพท์ (Phase 2):** ลิมิตรายเลเวลยังไม่ตัดสิน — ค่อยออกแบบตอนทำ Phase 2 จริง

## 6. ระบบดาว (Star system)

- **โจทย์ auto-grade:** 100%=3, ≥70%=2, ≥40%=1, ต่ำกว่า=0 ดาว (เก็บดาวสูงสุดที่เคยได้ ไม่บวกซ้ำ)
- **โจทย์เขียนตอบ:** ปิ๊กให้ดาว 1–3 เองตอนตรวจ
- **Shadowing:** ไม่ประเมิน ไม่ให้ดาว แค่ mark "ลองแล้ว"
- รวมดาวโชว์ที่ dashboard

## 7. การบ้านรายบุคคล/กลุ่ม (Assignments)

ปิ๊กสร้างโจทย์ (MCQ หรือเขียนตอบ) แล้วมอบหมายให้นักเรียน**คนเดียว หรือหลายคนพร้อมกันเป็นกลุ่มได้** แยกจากคลังแบบฝึกหัดทั่วไป — คนที่ไม่ได้ถูก assign จะไม่เห็น

**การเลือกคนรับมอบหมาย (ในหน้า admin):**
- เลือกทีละคน หรือ
- filter แบบเร็วตาม **ช่วงชั้น/กลุ่มผู้เรียน** (เช่น "มอบหมายให้ทุกคนในกลุ่มวัยทำงาน" หรือ "ม.3 ทั้งหมด") แล้วติ๊กเลือกจากผลลัพธ์ที่กรองมา → บันทึกเป็นรายชื่อ uid คงที่ตอนสร้าง (เปลี่ยนกลุ่มทีหลังไม่กระทบการบ้านที่มอบไปแล้ว)
- (ถ้าต้องการละเอียดกว่านั้น) แท็กกลุ่มเองอิสระผ่าน `groupTags` ต่อ user เช่น "เสาร์บ่าย" เพื่อกรองได้ยืดหยุ่นกว่าช่วงชั้นอย่างเดียว

**การสร้างโจทย์สำหรับการบ้าน** ทำได้ 2 ทาง:
1. เลือกจากคลัง exercises ที่มีอยู่แล้ว
2. พิมพ์โจทย์ใหม่เฉพาะกิจผ่านฟอร์มเร็วๆ ในหน้า admin — บันทึกเป็น `visibility: assignmentOnly`

**`assignments`**
```
id, createdBy: adminUid, title, note?,
exerciseIds: string[],
assignedTo: string[],        // uid ของนักเรียน (คนเดียวหรือหลายคน — resolve เป็น list ตอนสร้าง)
dueDate?, createdAt
```

**`exercises` เพิ่ม field:** `visibility: "bank" | "assignmentOnly"`
**`submissions` เพิ่ม field:** `assignmentId?: string`

**ฝั่งนักเรียน:** หน้า "การบ้านของฉัน" — รายการที่ถูก assign, สถานะ, due date
**ฝั่งแอดมิน:** หน้า "การบ้านทั้งหมด" — สร้างใหม่ (เลือกทีละคน/filter เป็นกลุ่ม) + ดูสถานะของทุกคนในชุดนั้น

## 8. โซนตะลุยด่าน (Duolingo-style stage path)

เส้นทางด่านต่อ 1 สกิล+เลเวล เรียงลำดับ ปลดล็อกด่านถัดไปเมื่อผ่านเกณฑ์ (70% หรือ 2 ดาวขึ้นไป)

**สถาปัตยกรรมการจัดด่าน & คลังโจทย์ (อัปเดต 2026-09-22):**
1. **คลังโจทย์ (Item Pool):** แต่ละหัวข้อไวยากรณ์มีคลัง **15 ข้อ** (ผสม Sentence Builder 4 ข้อ, เติมคำ 5-6 ข้อ, MCQ 5-6 ข้อ)
2. **คู่ด่าน (Paired Stages — Two-Stage Spiral Learning):** จัด 2 ด่านต่อ 1 หัวข้อไวยากรณ์ เพื่อเน้นการทำซ้ำสร้างความเข้าใจคงทน:
   - **ด่านที่ 1 ของคู่ (Part 1 - สร้างความคุ้นเคย):** สุ่ม 7 ข้อ โดยการันตีมีข้อเรียงคำ (sentence_builder) 1 ข้อ + ข้ออื่นๆ 6 ข้อ
   - **ด่านที่ 2 ของคู่ (Part 2 - ท้าทายขึ้น):** สุ่ม 7 ข้อจากคลังเดิม โดยการันตีมีข้อเรียงคำ 2 ข้อ + ข้ออื่นๆ 5 ข้อ
3. **ด่านมินิบอส (Mini-Boss Checkpoint):** จุดตัดสำคัญ (เช่น หลังจบบท Tenses) มีคู่ด่านมินิบอสที่สุ่มจากคลังโจทย์ทุกหัวข้อก่อนหน้า
4. **ด่านบอสใหญ่ประจำเลเวล (Master Review Final Boss):** ด่านปิดท้ายของเลเวล สุ่ม 10 ข้อรวมทุกหัวข้อในเลเวล โดย **ปลดล็อกเฉพาะเมื่อนักเรียนเก็บ 3 ดาวได้ครบทุกด่านก่อนหน้าในเลเวลนั้น**

**`stages`**
```
id, skill: grammar|vocab|dialogue, level: A1|A2|B1|B2|C1, order,
title, tags: string[], drawCount: number, passThreshold: number, isPreview: bool,
reviewStatus: draft|reviewed|published,
createdAt, updatedAt, createdBy
```

**ความคืบหน้าด่าน:** เก็บเป็นเอกสารใน `stageClears` (ดูข้อ 9) ไม่ใช่ฟิลด์ `stageProgress` ใน `users` อย่างที่ร่างไว้เดิม

ด่าน / แบบฝึกหัดอิสระ / การบ้าน — สามระบบแยกกันอยู่คู่กัน (confirmed)

## 8.1 สรุปไวยากรณ์ (Grammar reference notes)

กลับมาเพิ่มเนื้อหาให้อ่านแยกอีกครั้ง — แต่ทำแบบสั้นกระชับ (สรุป/cheat sheet ไม่ใช่บทความยาว) และ**ไม่เพิ่มเมนูใหม่**เพื่อรักษาหลักการ nav เรียบง่าย: โผล่เป็นปุ่ม "ℹ️ ดูสรุป" แบบ contextual ในหน้าเลือกเลเวล+สกิล (ก่อนเข้าโจทย์) และในหน้าเล่นด่าน/ทำโจทย์ (เปิดเป็น modal สั้นๆ อ่านจบกดปิดกลับไปทำต่อได้เลย ไม่ตัดจังหวะเกม)

**`grammarNotes`**
```
id, level: A1|A2|B1|B2|C1,
topic: string,             // เช่น "Present Perfect"
tags: string[],             // ผูกกับ tag เดียวกับ exercises/stages เพื่อลิงก์ถึงกัน
summary: string,            // สั้น: รูปประโยค + การใช้ + ตัวอย่าง 2-3 ประโยค
isPreview?: bool,
reviewStatus: draft|reviewed|published   // ใช้ audit pipeline เดียวกับ exercises (ข้อ 2)
```

เฉพาะ**สกิลไวยากรณ์**ก่อน (vocab/dialogue ยังเน้นทำโจทย์อย่างเดียวตามเดิม ไม่ต้องมีสรุปแยก เพราะเป็นคำ/บทสนทนาไม่ใช่กฎที่ต้องอธิบาย)

### Taxonomy มาตรฐาน 10 หัวข้อต่อระดับ (Finalized จาก Curriculum Audit อิง CEFR 2020 & ข้อสอบ TGAT/A-Level)

- **A1 (✅ ผลิตและเผยแพร่บน Cloud Firestore แล้ว 150 ข้อ + 20 ด่าน):** Present Simple (be/do), Articles & Nouns, there is/are & Prepositions of Place, Wh- Questions & Inversion, Adjectives & Possessive ('s), Prepositions of Time & Frequency, Present Continuous, can/can't, Imperatives, Past Simple of 'be' (was/were)
- **A2 (✅ ผลิตและเผยแพร่บน Cloud Firestore แล้ว 150 ข้อ + 20 ด่าน):** Past Simple (regular+irregular), Past Continuous & When/While, Present Perfect (Experience), Future Forms (going to / will / Pres Cont), Countable/Uncountable & Quantifiers, Comparatives & Superlatives, Modals of Obligation & Advice (must/have to/should), Basic Verb Patterns (Gerunds/Infinitives), Conjunctions & Sentence Connectors, Zero & First Conditionals
- **B1 (✅ ผลิตและเผยแพร่บน Cloud Firestore แล้ว 150 ข้อ + 20 ด่าน):** Present Perfect Continuous vs Simple, Past Perfect Simple (Sequencing), Past Habits ('used to' vs 'be used to' vs 'เคย'), Passive Voice (Core), Second Conditional & Wishes, Modals of Deduction (Present), Defining Relative Clauses, Reported Speech & Indirect Questions, Verb Patterns (Meaning Changes), Discourse Connectors
- **B2 (✅ ผลิตและเผยแพร่บน Cloud Firestore แล้ว 150 ข้อ + 20 ด่าน):** Participle Clauses & Reduced Relatives, Third & Mixed Conditionals, Unreal Past, Wishes & Subjunctive, Past Modals of Deduction & Regret, Advanced Passive & Causatives, Non-defining Relative Clauses & Prepositions, Advanced Future Aspects (Future Cont & Future Perfect), Inversion for Emphasis (Negative Adverbials), Cleft Sentences & Focusing, Advanced Discourse Markers & Academic Hedging
- **C1:** Advanced conditionals/inversion, subjunctive, advanced passive/reporting, cleft sentences, discourse markers ขั้นสูง, nuanced modal usage

> 💡 **จุดขายและการสื่อสารการตลาด:** ดูรายละเอียดการวางตำแหน่งการตลาด จุดขาย 5 ประการ และชุดคำเคลมพร้อมใช้ใน [`docs/marketing-positioning.md`](file:///D:/WEBPROJECT/pik-a-class/docs/marketing-positioning.md) ครอบคลุมผู้เรียนตั้งแต่ประถมปลาย ม.ต้น จนถึงติวสอบเข้ามหาวิทยาลัย TCAS (TGAT 1 / A-Level)

## 9. Data model (Firestore, สรุปรวม)

**`users`**
```
uid, email, fullName, nickname,
grade: "ม.1"|"ม.2"|"ม.3"|"ม.4"|"ม.5"|"ม.6"|"วัยทำงาน/บุคคลทั่วไป",
school?, phone, lineId,
role: student|admin, tier: free|full, tierNote?,
groupTags?: string[],          // เผื่อ filter/assign แบบยืดหยุ่นกว่า grade
streak: { current, longest, lastActiveDate },
onboardingComplete: bool, createdAt, updatedAt?
```
> **ปรับแล้ว:** ตัด `totalStars` และ `stageProgress` ออกจาก `users` — เป็น **ค่าที่คำนวณ** จาก `submissions` (`sum(bestStars)` ผ่าน aggregation query) และ `stageClears` แทน เหตุผลเต็มอยู่ใน spec 2026-09-20 ข้อ 4 (PLAN เดิมห้ามนักเรียนเขียนสองฟิลด์นี้ แต่ก็ไม่ใช้ Cloud Functions จึงไม่มีใครเขียนได้เลย)

**`exercises`**
```
id, skill: grammar|vocab|writing|dialogue,
level: A1|A2|B1|B2|C1,
type: mcq|fill_blank|matching|short_answer|paragraph|shadowing,
prompt, choices?, answerKey?: string[], rubric?,
tags: string[],                          // ต้องมาจาก src/lib/schema/taxonomy.js
visibility: bank|assignmentOnly, isPreview: bool,
reviewStatus: draft|reviewed|published,  // นักเรียนเห็นเฉพาะ published เท่านั้น
assignedUids: string[],                  // ให้ผู้ถูก assign อ่านได้แม้ tier=free
source?, sourceUrl?, reviewNotes?,       // สายตรวจคุณภาพเนื้อหา (ดู docs/content-pipeline.md)
contentHash, importBatchId?,             // ระบบเติมให้ตอนนำเข้า ใช้กันเนื้อหาซ้ำ
createdAt, updatedAt, createdBy
```
> **ปรับแล้ว:** ตัด `gradeTag` (ซ้ำซ้อนกับ `level`), `answerKey` เป็น `string[]` เสมอเพื่อรองรับคำตอบที่รับได้หลายแบบใน `fill_blank`

**`stages`** — ดูข้อ 8 (เพิ่ม `reviewStatus` ให้เหมือน `exercises`/`grammarNotes`)
**`assignments`** — ดูข้อ 7

**`submissions`** — doc id คงที่ `{uid}__{assignmentId|"bank"}__{exerciseId}` (1 เอกสารต่อนักเรียน×โจทย์×บริบท ทำให้กติกา "เก็บดาวสูงสุด ไม่บวกซ้ำ" เป็นจริงโดยโครงสร้าง)
```
uid, exerciseId, assignmentId?,
skill, level, type, tags: string[],      // คัดลอกจากโจทย์ตอนส่ง เพื่อทำสถิติ/จุดอ่อนได้โดยไม่ต้อง join
answer?, autoGraded: bool, score?,
bestStars: 0|1|2|3,                      // เดิมชื่อ starsAwarded — ห้ามลดลง บังคับที่ rules
attemptCount, wrongCount, lastAnsweredAt,
status: pending|graded|completed,
feedback?, gradedBy?, gradedAt?,         // เฉพาะ admin เขียนได้
createdAt
```

**`stageClears`** (ใหม่) — doc id `{uid}__{stageId}`
```
uid, stageId, skill, level, order, score, clearedAt
```

## 10. หน้าจอทั้งหมด (screen inventory)

**A. สาธารณะ**
- Landing page

**B. สมัคร/เข้าระบบ**
- Google Sign-In + ฟอร์มโปรไฟล์ครั้งแรก (รวมช่วงชั้น/กลุ่มผู้เรียนแบบใหม่)

**C. โซนนักเรียน**
- Dashboard หลัก — progress, streak, ดาวรวม, tier badge
- เส้นทางด่าน + หน้าเล่นด่าน (มีปุ่ม "ℹ️ ดูสรุป" เปิด grammar notes แบบ modal ระหว่างเล่นได้)
- หน้าเลือกเลเวล+สกิล → หน้าทำโจทย์ (แบบฝึกหัดอิสระ, มีปุ่ม "ℹ️ ดูสรุป" ก่อนเข้าโจทย์เช่นกัน)
- การบ้านของฉัน — รายการที่ถูก assign, สถานะ, due date
- หน้าผลลัพธ์ทันที + ดาวที่ได้
- ประวัติ/สถิติ
- หน้า "ล็อกไว้" เมื่อชน free-tier limit
- (Phase 2) มินิเกมคำศัพท์แบบต่อสู้

**D. โซนแอดมิน (ปิ๊ก)**
- คิวตรวจงานเขียน (จากแบบฝึกหัดอิสระ+การบ้าน) → ให้คะแนน+ดาว+คอมเมนต์
- การบ้านทั้งหมด — สร้างใหม่ (เลือกทีละคน/filter เป็นกลุ่มตามช่วงชั้นหรือ groupTag) + ดูสถานะ
- จัดการผู้ใช้ — รายชื่อ, filter ตามช่วงชั้น/กลุ่ม, เบอร์/LINE, สลับ tier, โน้ตส่วนตัว, ตั้ง groupTags
- ภาพรวมรายนักเรียน

## 11. Feature phases

**Phase 1 (MVP):** โซน A/B/C (ยกเว้นมินิเกม)/D ทั้งหมด รวมด่าน + shadowing + ดาว + การบ้านรายบุคคล/กลุ่ม + free-tier gating + ช่วงชั้นวัยทำงาน
**Phase 2:** มินิเกมคำศัพท์แบบต่อสู้
**Phase 3 (ถ้าจำเป็น):** ระบบชำระเงินอัตโนมัติ

## 12. Security & Data Integrity (จาก architecture review)

**Must-fix ก่อน launch (ถูก ไม่ต้องเพิ่ม cost):**
- ✅ **ทำแล้ว** (rules แบบ allowlist + rules test บน emulator, 2026-09-20) — หมายเหตุ: `totalStars`/`stageProgress` ไม่มีอยู่ใน `users` แล้ว (เป็นค่าคำนวณ ดูข้อ 9) ที่เหลือบล็อกจริงคือ `role`, `tier`, `tierNote`, `groupTags`
- Firestore Security Rules ต้องบล็อกไม่ให้ user ทั่วไปเขียน field `tier`, `role`, `totalStars`, `stageProgress` ใน `users/{uid}` เอง (แก้ได้เฉพาะ admin/backend) — ไม่งั้นนักเรียนแก้ `tier` เป็น `full` เองผ่าน devtools ได้ ข้ามระบบปลดล็อกทั้งหมด ส่วน field โปรไฟล์อื่น (ชื่อ, streak ฯลฯ) ยังให้เจ้าของ doc แก้ได้ตามปกติ
- ต้อง design security rules ให้ครบก่อนเริ่มโค้ด ไม่ใช่แค่ gate ฝั่ง client (mock free-tier limit ด้วย JS อย่างเดียวไม่พอ ต้องกันที่ rules ด้วยไม่งั้น query ตรง Firestore ข้ามการ gate ได้)
- **ป้องกันเนื้อหาไม่ให้ถูกดูดง่ายๆ:** (1) ห้าม anonymous/ยังไม่ login อ่าน `exercises`/`stages` ได้เลย ต้อง login ก่อนเสมอ (2) rules เช็ก tier ของผู้ขอ (lookup `users/{uid}.tier` ผ่าน `get()`) ก่อนคืนข้อมูลข้อ `full`-only — free user จะ query ไม่เจอเนื้อหา full ตั้งแต่ระดับ database เลย ไม่ใช่แค่ซ่อนที่หน้าเว็บ (3) ฝั่ง frontend ให้โหลดเนื้อหาทีละด่าน/ทีละหน้าตามที่ใช้จริง (ไม่ query ทั้งคลังมาเก็บไว้ในเครื่องครั้งเดียว) ช่วยทั้งเรื่อง performance และลดโอกาสโดนสคริปต์ดูดรวดเดียวทั้งชุด — ข้อควรรู้ไว้ตรงๆ: ป้องกัน 100% จากคนที่จ่ายเงิน/ล็อกอินถูกต้องแล้วจงใจเขียนสคริปต์ดูดเป็นไปไม่ได้ในสถาปัตยกรรมแบบนี้ (client-rendered), 3 ข้อนี้กันได้แค่การดูดแบบสุ่ม/ไม่ล็อกอิน/ข้าม tier ซึ่งเป็นเคสที่พบจริงส่วนใหญ่

**ยอมรับความเสี่ยงใน v1 (ทางเลือก ไม่บังคับแก้ตอนนี้):**
- `answerKey` อยู่ในเอกสาร exercises ที่ client อ่านได้ และคะแนน auto-grade คำนวณฝั่ง client แล้วค่อยบันทึก — ทางที่รัดกุมกว่าคือย้ายไปตรวจผ่าน Cloud Function แต่ต้องใช้ Firebase Blaze plan (ผูกบัตร) แนะนำปล่อยแบบ client-grade ไปก่อนเพราะความเสี่ยงต่ำ (โกงได้แค่คะแนน/ดาวตัวเอง ไม่ได้ข้ามการจ่ายเงินเพราะ tier ถูกกันแยกแล้ว) ย้ายไป Cloud Functions ทีหลังได้ถ้าจำเป็น

**จุดเล็กๆ ที่ควรระวัง:**
- `streak.lastActiveDate` คำนวณวันตาม timezone Asia/Bangkok ไม่ใช่ UTC ตรงๆ กันปัญหา streak เพี้ยนช่วงเที่ยงคืน
- เก็บเบอร์โทร/LINE/โรงเรียนของผู้เยาว์แบบเปิดสมัครสาธารณะ ควรมี consent/privacy notice สั้นๆ ตอนสมัคร (ไม่ใช่คำแนะนำทางกฎหมาย แนะนำเช็ก PDPA คร่าวๆ ถ้าจะเปิดสู่สาธารณะจริงจัง)

### ลำดับความสำคัญในการพัฒนา (Roadmap Priorities — ปรับปรุง 2026-09-23)
1. **เสร็จสิ้นเนื้อหาและด่านหลักสูตรระดับแกนนำ (Core Curriculum Engine):**
   - **A2 Completion:** ✅ เสร็จสมบูรณ์แล้ว 100% (150 ข้อ, ด่าน 1-20 พร้อม Grammar Notes และบอสใหญ่ ครบถ้วนบน Firestore)
   - **B1 Full Syllabus:** 10 โมดูล, 150 ข้อ, ด่าน 1-20 พร้อม Grammar Notes ครบ 3 เสาหลัก
   - **B2 Full Syllabus:** 10 โมดูล, 150 ข้อ, ด่าน 1-20 พร้อม Grammar Notes ครบ 3 เสาหลัก
   > **กฎเหล็กการผลิตเนื้อหา:** ต้องทำสรุปไวยากรณ์ (Grammar Notes) ใน `src/lib/grammar-notes.js` ควบคู่ไปพร้อมกับคลังข้อสอบและด่านเสมอ (All-in-One Package)
2. **งานอาร์ตและระบบเกม (Art & Gamification):**
   - **ภาพแบนเนอร์และไอคอนประจำระดับ (AI Level Banners & Art)** — ภาพเกาะลอยฟ้าและอาร์ตเวิร์กน่ารักประจำ A1, A2, B1, B2 ในหน้าเลือกบทเรียนและหัวด่าน
   - **ระบบเหรียญรางวัล / ตราสัญลักษณ์ (Badges & Achievements)** — ปลดล็อกเหรียญตราความสำเร็จพร้อมตู้โชว์บน Dashboard
3. **คลังสรุปไวยากรณ์แยกหมวด (Grammar Handbook / Reference Library):**
   - เมนู/หน้าเฉพาะสำหรับเปิดอ่านสรุปไวยากรณ์แยกรายหัวข้อได้โดยตรงจากหน้าหลัก เพื่อให้นักเรียนใช้อ่านทบทวนค้นคว้าได้สะดวกรวดเร็ว
- **Spaced repetition คำศัพท์** — เอาคำที่เคยตอบผิดวนกลับมาถามอีกหลังผ่านไปสองสามวัน
- **จุดอ่อนที่ควรทบทวน** — ไล่ tag ข้อที่ตอบผิดบ่อย แนะนำหัวข้อทบทวนบน dashboard
- **แจ้งเตือนผ่าน LINE** — ใช้ LINE ID ที่เก็บไว้อยู่แล้ว เตือน streak ใกล้ขาด/มีการบ้านใหม่/ตรวจงานเสร็จแล้ว
- **Export CSV** รายชื่อ+สถิตินักเรียนให้แอดมิน
- **Leaderboard แบบ opt-in** เท่านั้น (ไม่บังคับ กันความกดดัน)
- **PWA/offline cache**

## 14. สิ่งที่ควร confirm ก่อนเริ่มโค้ดจริง

1. เห็นด้วยกับแนวทาง security rules (บล็อก tier/role/stageProgress) เป็น must-fix, client-grade answerKey ยอมรับความเสี่ยงไว้ก่อนใน v1 ตามข้อ 12 ไหม
2. ไอเดียฟีเจอร์เสริมข้อ 13 อยากเอาอันไหนเข้า Phase 1 บ้าง (หรือทั้งหมดพักไว้เป็น Phase หลังๆ)
3. wording "วัยทำงาน/บุคคลทั่วไป" ใช้คำนี้ไหม หรืออยากเปลี่ยน
4. โรงเรียน/หน่วยงาน ทำเป็น optional ตามที่ร่างไว้ (เพราะกลุ่มวัยทำงานอาจไม่มี) โอเคไหม
5. อยากได้ `groupTags` แบบแท็กอิสระด้วยจริงไหม หรือกรองแค่ตามช่วงชั้นก็พอสำหรับตอนนี้
6. due date ของการบ้าน แค่โชว์ในรายการพอ หรืออยากมี reminder/แจ้งเตือนด้วย
7. pass threshold ของด่าน (ร่างไว้ 70%) และเกณฑ์ดาว (100/70/40%) โอเคไหม
8. มี worksheet/placement test เดิมที่อยากแปลงเป็น seed content ไหม
9. Taxonomy หัวข้อไวยากรณ์/tense ต่อเลเวลในข้อ 8.1 ตรงกับที่ปิ๊กสอนจริงไหม อยากปรับ/เพิ่ม/ตัดหัวข้อไหนก่อน finalize

## 15. แนะนำโฟลว์การพัฒนา (Build workflow)

เรียงตามลำดับที่ทำแล้วเห็นผลเร็ว ลดความเสี่ยงเรื่อง schema เปลี่ยนทีหลัง แนะนำให้ทำเป็น session/task แยกทีละอย่างใน Claude Code ไม่ยัดทุกอย่างในครั้งเดียว (ยิ่งขอบเขตแคบ AI ยิ่งทำได้แม่นและ review ง่าย):

1. **Foundation** — ตั้ง Firebase project ใหม่, GitHub repo + Pages, Google Sign-In + ฟอร์ม onboarding, วาง Firestore Security Rules โครงหลัก (บล็อก tier/role) ตั้งแต่ต้น — ให้ครบ login → onboarding → dashboard เปล่าๆ ทำงานได้ก่อนแตะเนื้อหา
2. ~~**Data layer + admin bootstrap**~~ — ✅ **เสร็จแล้ว 2026-09-20** (spec: `docs/superpowers/specs/2026-09-20-data-layer-design.md`, plan: `docs/superpowers/plans/2026-09-20-data-layer-implementation.md`) — schema ครบทุก collection ของ Phase 1 + security rules แบบ allowlist พร้อม automated rules test บน emulator + หน้า admin: จัดการผู้ใช้ (สลับ tier/โน้ต/groupTags), นำเข้า JSON, คลังเนื้อหา (ตรวจ/แก้/อนุมัติ) + สคริปต์ `npm run check:content` และโฟลวตรวจเนื้อหาใน `docs/content-pipeline.md`
3. **Core loop 1 — แบบฝึกหัดอิสระ (auto-grade):** MCQ/เติมคำ/จับคู่ ครบวงจร ถาม→ตอบ→ตรวจ→ให้ดาว→บันทึก ทำ type เดียวให้สมบูรณ์ก่อนค่อยเพิ่ม type อื่น
4. **นำร่องเนื้อหา (ขนาดเล็ก):** generate 1 เลเวล x 1 สกิล x ~20 ข้อ ด้วย AI ผ่าน pipeline (ข้อ 2) ก่อน เพื่อเช็คว่า schema เข้ากับ UI จริงไหม ก่อนจะ generate เนื้อหาจำนวนมาก — เจอปัญหาตอนนี้แก้ถูกกว่าเจอตอนมีเนื้อหาเป็นพันข้อแล้ว
5. **Core loop 2 — เขียนตอบ + คิวตรวจงาน:** ฝั่งนักเรียนส่งคำตอบ, ฝั่งแอดมินตรวจให้คะแนน/ดาว/คอมเมนต์
6. **โซนตะลุยด่าน** — ต่อยอดจาก core loop 1 (ใช้ fill_blank เดิม) + shadowing prompt
7. **การบ้านรายบุคคล/กลุ่ม** — ต่อยอดจาก core loop 1+2
8. **Dashboard/สถิติ/streak** — แทรกเพิ่มไปพร้อมแต่ละ loop ด้านบนได้เลย ไม่ต้องรอทำทีเดียวท้ายสุด
9. **Admin: จัดการผู้ใช้ + สร้างการบ้าน** — เมื่อ core loop ฝั่งนักเรียนนิ่งแล้ว
10. **Generate เนื้อหาจริงจำนวนมาก** — รันตาม pipeline เดิมทีละเลเวล/สกิล ทำเป็นขั้นตอนที่ทำซ้ำได้ (สคริปต์ตรวจ schema + prompt ตรวจทานรอบสอง) ไม่ต้องทำมือทุกรอบ
11. **ปิด Security Rules ให้แน่น** — ตอนนี้รู้แล้วว่าแอปจริง query อะไรบ้าง เขียน/เทส rules ให้ตรงเป๊ะ แนะนำใช้ Firebase Local Emulator Suite เทสก่อนขึ้น production จะได้ไม่ต้องแก้ rules บน live
12. **Polish + ทดสอบกับนักเรียนกลุ่มเล็กก่อน** — เช็ค mobile responsive, ลอง flow จริงกับนักเรียน 2–3 คนก่อนเปิดกว้าง
13. Phase 2 (มินิเกม) และ Phase 3 (ชำระเงินอัตโนมัติ) — ทำทีหลังตามที่วางไว้

**เคล็ดลับใช้ AI ให้มีประสิทธิภาพ:**
- ให้ Claude Code อ่าน PLAN.md นี้เป็น context ตั้งแต่ต้น session ก่อนเริ่มเขียนโค้ดทุกครั้ง
- แยก session ระหว่าง "เขียนโค้ดฟีเจอร์" กับ "generate เนื้อหา" — สองงานนี้ธรรมชาติต่างกัน ปนกันแล้ว AI จะสลับโหมดไม่นิ่ง
- ตอนสั่งตรวจทานเนื้อหารอบสอง ให้ระบุ checklist ชัดเจนทุกครั้ง (คำตอบถูกข้อเดียวไหม, ยากง่ายตรงเลเวลไหม, มีคำถามกำกวมไหม) ไม่ใช่แค่บอกว่า "ช่วยเช็กให้หน่อย"
- Commit code เป็นก้อนเล็กๆ ทุกครั้งที่ฟีเจอร์หนึ่งทำงานได้จริง จะได้ rollback ง่ายถ้ารอบหลังพัง


---

# Part 2: กฎเหล็กและข้อกำหนดของระบบ (Core Constraints & Commitments)

## 16. กฎเหล็กประจำโปรเจกต์ (Non-Negotiable Rules)
1. **STRICTLY NO STREAK SYSTEM (ยกเลิกระบบ Streak ถาวร):**
   - ห้ามใส่ระบบนับวันล็อกอินต่อเนื่อง (Consecutive Day Streak) หรือระบบที่ลงโทษผู้เรียนเมื่อหยุดพัก (แม้จะมีในร่าง Data Model ข้อ 9 เดิม แต่ถูกยกเลิกอย่างเป็นทางการแล้ว)
   - แรงจูงใจต้องขับเคลื่อนด้วยความพยายาม (Effort), การสะสมดาว (Stars), การพิชิตด่าน/บอส (Clears), ถ้วยรางวัล (Trophies/Badges), และความสนุกเท่านั้น
2. **Visual Consistency & Mascot Art Direction:**
   - งานกราฟิกและมาสคอตต้องคงสัดส่วน Chibi ลายเส้นขอบหนาสะอาดตา ไฮไลต์ผิวนุ่มนวล สไตล์สติกเกอร์เวกเตอร์ 100% สอดคล้องกับน้องหยก (น้องต่ายเขียวมรกต)
3. **Mobile-First Touch & Web Accessibility (WCAG 2.2 AA):**
   - ขนาดพื้นที่กดสัมผัสขั้นต่ำ $ge 44 \times 44\text{px}$ ตามเกณฑ์ Apple HIG และ WCAG
   - ใช้ `touch-action: manipulation;` และ `-webkit-tap-highlight-color: transparent;`
   - ป้องกันปัญหาค้างสถานะบนมือถือ: ห้ามใช้ hover ปกติ ให้ครอบด้วย `@media (hover: hover) and (pointer: fine)` เสมอ
   - Modal หรือ Dialog ต้องใช้ Native `<dialog>` มี focus trapping, รองรับการกดปุ่ม `Escape`, มี `aria-labelledby` และปุ่มปิดชัดเจน
4. **Asset Optimization & Web Performance:**
   - รูปภาพประกอบและอวตารทุกรูปต้องผ่านการบีบอัดเป็น `.webp` (ขนาด < 20 KB) และคู่ขนานด้วย Transparent `.png`
   - ป้องกัน Broken Image Flash: ต้องใส่ default `src` ใน HTML และมี CSS ป้องกัน `img:not([src]), img[src=""] { visibility: hidden; }` เสมอ
5. **Quality Gate & Precache Verification:**
   - ก่อนส่งมอบงานทุกครั้ง ต้องรัน `npx vitest run` (ต้องผ่าน 100%) และ `npm run build` ตรวจสอบความถูกต้องของ PWA Precache ทุกครั้ง
6. **UI/UX Design Standards, Kid-Friendly Lexicon & High-Visibility Navigation:**
   - **ห้ามใช้ศัพท์เทคนิคในหน้าจอนักเรียน:** ให้ใช้คำว่า "หน้าหลัก" (Home) แทน "แดชบอร์ด (Dashboard)", "คลังบทเรียน/คลังคำศัพท์" แทน "Repository/Bank", "ห้องถ้วยรางวัล" แทน "Trophy Gallery"
   - **โครงสร้าง 4 โซนกิจกรรมหน้าหลัก:** 1. ตะลุยด่าน (Adventure Mode), 2. Animal Cafe (มินิเกมเสิร์ฟคำศัพท์), 3. คู่มือสรุปไวยากรณ์ (Handbook), 4. คลังคำศัพท์ (Vocab Hub)
   - **ปุ่มย้อนกลับต้องชัดเจน (High-Visibility Back Nav):** ทุกหน้าย่อยต้องมีปุ่ม `.btn-nav-back` สไตล์ Chunky 3D เด่นชัด มองเห็นได้ใน 1 วินาที ขนาดแตะสัมผัสขั้นต่ำ $\ge 44 \times 44\text{px}$ ตามเกณฑ์ WCAG 2.2 AA
   - **Custom Project Skill:** รายละเอียดและ Design Tokens ทั้งหมดถูกจัดเก็บไว้ใน `.agents/skills/pik-ui-standards/SKILL.md` และ `docs/design/ui-standards.md`

---

# Part 3: แพทเทิร์นมาตรฐานสำหรับการส่งต่องาน (Session Handover Framework)

> 💡 **คู่มือสำหรับ AI และนักพัฒนาในทุกๆ เซสชั่นถัดไป:**
> 1. **ห้ามเขียนทับ (Overwrite) เอกสาร `PLAN.md` ทั้งหมดเด็ดขาด!**
> 2. พิมพ์เขียวสถาปัตยกรรมใน **Part 1 (ข้อ 1–15)** เป็น Single Source of Truth หากมีการเปลี่ยนแปลงสเปก ให้แก้ไขเฉพาะหัวข้อย่อยที่เกี่ยวข้อง
> 3. เมื่อจบแต่ละเซสชั่น ให้อัปเดตสถานะล่าสุดใน **Part 4 (Session Handover Logs)** ตามโครงสร้าง Template ด้านล่างเสมอ

### โครงสร้าง Template สำหรับบันทึกส่งต่องาน (Handover Template):
```markdown
## [Session YYYY-MM-DD]: <ชื่อหัวข้อหรือธีมงานของเซสชั่น>
- **สถานะการทดสอบ:** Vitest tests ผ่าน X/X (100%), Build PWA สำเร็จ
- **Commit Hash ล่าสุด:** `<commit-hash>`
- **สิ่งที่ทำเสร็จสมบูรณ์:**
  - ...
- **ไฟล์สำคัญที่มีการเปลี่ยนแปลง:**
  - ...
- **ข้อควรระวังหรือการตัดสินใจทางเทคนิค (Technical Decisions):**
  - ...
- **แผนงานสำหรับเซสชั่นถัดไป (Next Session Roadmap):**
  - 1. ...
  - 2. ...
```

---

# Part 4: บันทึกประวัติการส่งต่องาน (Session Handover Logs)

## [Session 2026-09-24 Part 2]: ยกเครื่อง UI หน้าหลัก 4 โซน (Animal Cafe อันดับ 2), ติดตั้งปุ่มกลับความชัดเจนสูงทุกหน้า, และสร้าง Custom Skill (pik-ui-standards)

- **สถานะการทดสอบ:** Vitest ผ่านครบ 33 ไฟล์ 345/345 tests (100%), Build PWA สำเร็จ (162 precache entries)
- **Commit Hash ล่าสุด:** `9b2faec` (ซิงก์กับ `origin/main` บน GitHub เรียบร้อย)
- **สิ่งที่ทำเสร็จสมบูรณ์:**
  1. **สร้าง Custom Project Skill (`.agents/skills/pik-ui-standards/SKILL.md`):** บันทึกมาตรฐาน UI/UX, Kid-Friendly Lexicon, การ์ด 4 โซน, และปุ่มกลับเด่นชัดเป็นสกิลถาวรประจำโปรเจกต์
  2. **สร้างเอกสารมาตรฐาน [`docs/design/ui-standards.md`](file:///d:/WEBPROJECT/pik-a-class/docs/design/ui-standards.md):** สรุปข้อกำหนด Design System ประจำระบบ
  3. **ยกเครื่องหน้าแรกเป็น "หน้าหลัก" (Home) 4 โซน:**
     - โซน 1: 🚀 **ตะลุยด่านภาษาอังกฤษ** (Adventure Mode A1–B2)
     - โซน 2: ☕ **Animal Cafe** (เปลี่ยนชื่อจาก Pik Speed Cafe ย้ายขึ้นมาอยู่อันดับ 2)
     - โซน 3: 📖 **คู่มือสรุปไวยากรณ์ (Handbook)** (40 หัวข้อหลัก A1–B2)
     - โซน 4: 🗂️ **คลังคำศัพท์** (Vocab Hub & Flashcards 3D)
  4. **ระบบปุ่มกลับความชัดเจนสูง (`.btn-nav-back`):**
     - ออกแบบปุ่ม Chunky 3D นูนหนา ขนาดกดง่าย $\ge 44 \times 44\text{px}$ ตามมาตรฐาน WCAG 2.2 AA
     - ติดตั้งในทุกหน้าย่อย: `learn/index.html`, `learn/path.html`, `handbook.html`, `profile.html`, `vocab/index.html`, `vocab/cafe.html`, และเมนูแอดมิน
  5. **เปลี่ยนคำเรียกทั้งระบบ:** เปลี่ยน "แดชบอร์ด" เป็น "หน้าหลัก" และเปลี่ยนชื่อมินิเกมเป็น "Animal Cafe" 100%
- **ไฟล์สำคัญที่มีการเปลี่ยนแปลง:**
  - `.agents/skills/pik-ui-standards/SKILL.md` & `docs/design/ui-standards.md`
  - `AGENTS.md` & `PLAN.md`
  - `src/styles/base.css` (`.btn-nav-back`, `.card-cafe`, `.card-vocab`, `.btn-cafe`, `.btn-vocab`, `.btn-handbook`)
  - `src/dashboard.html` & `src/dashboard.js`
  - `src/vocab/cafe.html` & `src/vocab/index.html`
  - `src/handbook.html`, `src/profile.html`, `src/learn/index.html`, `src/learn/path.html`
  - `src/lib/badges.js` & `src/lib/admin-nav.js`

## [Session 2026-09-24]: อัปเกรดระบบอวตารมาสคอต 12 ธีม, ปรับปรุง Profile, และแก้ไข UI/UX พื้นฐาน

- **สถานะการทดสอบ:** Vitest ผ่านครบ 33 ไฟล์ 345/345 tests (100%), Build PWA สำเร็จ (162 precache entries)
- **Commit Hash ล่าสุด:** `cd05b1a` (ซิงก์กับ `origin/main` บน GitHub เรียบร้อย)

### 1. สิ่งที่ทำเสร็จสมบูรณ์ในเซสชั่นนี้:
1. **ระบบเลือกอวตารแบบ Modal Dialog (Avatar Picker):**
   - เปลี่ยนจากการแสดงรูปทั้งหมดบนหน้าจอ เป็นหน้าต่างป๊อปอัป (`<dialog id="avatar-dialog">`) กดเลือกจากรูปโปรไฟล์หรือปุ่ม "เปลี่ยนอวตาร 🎨"
   - ออกแบบ Accessible Radio Group พร้อมไอคอนติ๊กถูกสีเขียวบนรูปที่ถูกเลือก
   - บันทึกลง Firestore อัตโนมัติทันทีที่กดเลือกอวตาร
2. **สร้างคลังอวตารมาสคอตกระต่าย Chibi 12 รูปแบบ:**
   - `avatar-1`: **น้องหยกสดใส (Classic Mint)** 🌱 (มาสคอตดั้งเดิม)
   - `avatar-2`: **น้องหยกซากุระ (Sakura Pink)** 🌸 (ชมพูพาสเทล ดอกไม้ประดับหู)
   - `avatar-3`: **น้องหยกท้องฟ้า (Sky Blue)** ☁️ (ฟ้าพาสเทล ตาประกายดาว)
   - `avatar-4`: **จอมเวทน้อย (Magic Wizard)** 🧙 (หมวกพ่อมดม่วง-ทอง คทาเวทมนตร์)
   - `avatar-5`: **อัศวินผู้กล้า (Brave Knight)** 🛡️ (หมวกเกราะอัศวินขนนกแดง โล่ผู้กล้า)
   - `avatar-6`: **คอสเพลย์มังกร (Dragon Cosplay)** 🐉 (ฮู้ดมังกรเขียว เขาจิ๋วและปีกมังกร)
   - `avatar-7`: **ภูตน้อยมีปีก (Angel Fairy)** 🪽 (ปีกนางฟ้าเรืองแสง วงแหวนประกายดาว)
   - `avatar-8`: **บาริสต้าต่าย (Speed Barista)** ☕ (ผ้ากันเปื้อนคาเฟ่ แก้วกาแฟลาเต้อาร์ต)
   - `avatar-9`: **ราชาดวงดาว (Star King)** 👑 (มงกุฎทองคำประดับอัญมณี ผ้าคลุมกำมะหยี่)
   - `avatar-10`: **เกมเมอร์ไซเบอร์ (Cyber Gamer)** 🎧 (หูฟังเกมมิ่งเรืองแสงนีออน พร้อมจอยเกม)
   - `avatar-11`: **น้องหยกพลังใจ (Champion Power)** 💪 (ท่าเบ่งกล้ามส่งพลังใจ)
   - `avatar-12`: **น้องหยกส่งรัก (Heart Love)** 💖 (ท่าทำมือรูปหัวใจ)
   - บันทึกทั้งไฟล์ Transparent `.png` และบีบอัดเป็น `.webp` ขนาดเพียง 10–19 KB ต่อรูป
3. **แก้ไขบั๊ก Trophy Room หน้า Profile แสดง 0/12:**
   - แก้ไข `src/profile.js` ให้ดึงประวัติความคืบหน้าจริงจาก Firestore และประเมินเหรียญรางวัลครบถ้วนถูกต้อง
4. **ลบ Trophy Banner ซ้ำซ้อนที่ Dashboard:**
   - นำแบนเนอร์ถ้วยรางวัลออกจาก `src/dashboard.html` และคลีนโค้ดใน `src/dashboard.js` ให้เหลือเฉพาะที่หน้า Profile
5. **แก้ปัญหาพื้นหลังหน้า Profile ซ้อนทับเนื้อหา:**
   - ปลดการเชื่อมโยง `learn.css` ออกจาก `src/profile.html` เพื่อตัดก้อนเมฆลอยและพื้นหญ้าที่กวนสายตา จัดเลเยอร์ `z-index: 1` ชัดเจน
6. **ย้ายสไตล์ปุ่ม 3D Chunky เข้าสู่ `src/styles/base.css`:**
   - ย้ายคลาส `.btn-chunky`, `.btn-ghost`, `.btn-close-circle` มาเป็นสไตล์กลาง ทำให้ปุ่มทุกหน้า (Profile, Dialog, Dashboard, Handbook) แสดงผลปุ่ม 3D นูนหนาสวยงามสม่ำเสมอ ไม่กลายเป็นปุ่มเทาของบราวเซอร์
7. **ป้องกันไอคอนภาพเสียชั่วคราวขณะโหลด (Broken Image Flash):**
   - ใส่ `src` เริ่มต้นใน HTML และเพิ่ม CSS กฎป้องกัน `img:not([src]), img[src=""] { visibility: hidden; }` ใน `base.css`

### 2. ไฟล์สำคัญที่มีการเปลี่ยนแปลง:
- `src/profile.html` & `src/profile.js` (Avatar dialog, real-time sync, badge evaluation)
- `src/dashboard.html` & `src/dashboard.js` (Cleaned trophy banner, default mascot src)
- `src/styles/base.css` (Global 3D chunky buttons, broken image fix)
- `src/styles/profile.css` (Modal dialog, avatar grid, backdrop blur)
- `src/lib/user-profile.js` & `src/lib/user-profile.test.js` (Expanded avatar catalog)
- `src/public/avatars/` (12 transparent PNG + WebP mascots)

### 3. แผนงานสำหรับเซสชั่นถัดไป (Next Session Roadmap):
1. **ระบบสถิติผู้เรียนสำหรับครู/ผู้ดูแลระบบ (Admin Student Analytics & Monitoring):**
   - พัฒนาต่อยอดหน้า `src/admin/student-report.html` และ `src/lib/student-analytics.js`
   - แดชบอร์ดสรุปภาพรวมผู้เรียน (Total Students, Active Learners)
   - รายงานความก้าวหน้ารายบุคคล (ด่านที่ผ่าน, ดาวสะสม, ระดับ CEFR ปัจจุบัน)
   - สถิติคะแนนโหมด Endless ของเกม Pik Speed Cafe
   - การวิเคราะห์ข้อที่นักเรียนมักตอบผิดบ่อย (Common Misconceptions) เพื่อให้ครูนำไปใช้วางแผนการสอนในห้องเรียนได้ตรงจุด
2. **การเปิดรับผู้เรียนและทดสอบการใช้งานจริง (User Testing & Onboarding):**
   - ตรวจสอบ Flow การสมัครสมาชิก การเข้าสู่ระบบด้วย Google Account
   - ทดสอบความเร็วและการแสดงผลบนสมาร์ตโฟนระบบ iOS (Safari) และ Android (Chrome / LINE In-App Browser)
   - รวบรวมฟีดแบ็กความเข้าใจของเนื้อหาและคำอธิบายโจทย์ในด่าน A1–B2
3. **การขยายคลังโจทย์และเนื้อหาบทเรียน:**
   - ตรวจสอบด่านในระดับ A1, A2, B1, B2 ว่ามีความหลากหลายของประเภทโจทย์เพียงพอหรือไม่ (Sentence Ordering, Multiple Choice, Word Matching ฯลฯ)
   - อัปเดตคลังคำศัพท์ Flashcards และมินิเกม Speed Cafe ให้มีชุดคำศัพท์ใหม่ๆ รองรับการฝึกฝนอย่างต่อเนื่อง
