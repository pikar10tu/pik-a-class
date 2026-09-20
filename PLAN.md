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

เส้นทางด่านต่อ 1 สกิล+เลเวล เรียงลำดับ ปลดล็อกด่านถัดไปเมื่อผ่านเกณฑ์ แต่ละด่าน = ชุดข้อเติมคำ (fill_blank) 5–10 ข้อ อาจแทรก shadowing prompt (อ่านออกเสียงตามเอง ไม่อัดเสียง ไม่ประเมิน แค่กด "ลองแล้ว")

**`stages`**
```
id, skill: grammar|vocab|dialogue, level: A1|A2|B1|B2|C1, order,
title, itemIds: string[], passThreshold: number, isPreview: bool,
reviewStatus: draft|reviewed|published,   // เพิ่มตาม spec 2026-09-20 — กันด่านที่สร้างค้างครึ่งทางโผล่ให้นักเรียนเห็น
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

### Taxonomy ร่าง: หัวข้อไวยากรณ์/tense ต่อเลเวล (ปรับตามที่ปิ๊กสอนจริงได้)

- **A1:** Present Simple (be/do), there is/are, Present Continuous (พื้นฐาน), can/can't, imperatives, plural nouns, possessive 's, Past Simple (be, verbs regular พื้นฐาน)
- **A2:** Past Simple (regular+irregular ครบ), Past Continuous, Present Perfect (experience พื้นฐาน), Future (going to / will), comparatives/superlatives, must/have to/should, some/any + countable-uncountable
- **B1:** Present Perfect Continuous, Past Perfect, Future Continuous, First & Second Conditional, Passive Voice (พื้นฐาน), Reported Speech (statements), modals of deduction (must/might/could), relative clauses (defining)
- **B2:** Past Perfect Continuous, Future Perfect, Third Conditional, Mixed Conditionals, Passive (ครบ tense), Reported Speech (questions/commands), relative clauses (non-defining), causative (have/get something done)
- **C1:** Advanced conditionals/inversion, subjunctive, advanced passive/reporting, cleft sentences, discourse markers ขั้นสูง, nuanced modal usage

> รายการนี้เป็น draft อิงมาตรฐาน CEFR ทั่วไป ไม่ใช่คำแนะนำทางวิชาการตายตัว — ปิ๊กในฐานะคนสอนจริงปรับลำดับ/เพิ่มลดหัวข้อตามที่เจอกับนักเรียนจริงได้เลย ก่อน generate เนื้อหาแนะนำ finalize รายการนี้ก่อน เพราะ `tags` ในทุก exercise/stage/grammarNotes จะอิงตามชื่อหัวข้อในนี้ (เพื่อให้ "จุดอ่อนที่ควรทบทวน" ทำงานถูกต้องด้วย)

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

## 13. ไอเดียฟีเจอร์เพิ่มเติม (ยังไม่ตัดสินใจ — เลือกได้)

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
