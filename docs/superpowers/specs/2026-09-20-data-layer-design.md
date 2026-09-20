# Data Layer + Admin Bootstrap — Design Spec

> Sub-project ที่ 2 ตาม `PLAN.md` section 15 (Build workflow) — บันทึกวันที่ 2026-09-20
> ต่อจาก Foundation (`docs/superpowers/specs/2026-09-19-foundation-design.md`)

## 1. ขอบเขต (Scope)

สร้าง **ชั้นข้อมูลจริงทั้งหมดของ Phase 1** (schema + security rules + การทดสอบ) และ **เครื่องมือฝั่ง admin ที่ทำให้เนื้อหาเข้าระบบได้จริงอย่างมีการตรวจสอบคุณภาพ**

จบ sub-project นี้แล้วต้องทำสิ่งเหล่านี้ได้จริงบนเว็บที่ deploy อยู่:

1. ปิ๊กเปิดหน้า admin → เห็นรายชื่อนักเรียนทั้งหมด กรอง/ค้นหาได้ สลับ `tier` ให้นักเรียนได้ ใส่โน้ต/`groupTags` ได้
2. ปิ๊กวางไฟล์ JSON ของโจทย์ → ระบบตรวจทุกข้อและบอกว่าข้อไหนผิดอะไร → นำเข้าเฉพาะข้อที่ผ่านเป็น `draft`
3. ปิ๊กเปิดคลังเนื้อหา → ดู/แก้/อนุมัติ (`published`) หรือตีกลับเป็น `draft`
4. นักเรียนอ่านได้เฉพาะเนื้อหาที่ `published` และตรงกับ tier ของตัวเอง — **บังคับที่ security rules ไม่ใช่แค่ที่หน้าเว็บ** และมี automated test พิสูจน์

**ไม่อยู่ในขอบเขตนี้:** UI ฝั่งนักเรียนสำหรับทำโจทย์/ด่าน/การบ้าน (step 3, 5, 6, 7), เนื้อหาจริง (step 4), consent notice (เลื่อนตามมติข้อ 2), ตัวเลขสถิติบน dashboard นักเรียน (ยังไม่มี submission ให้นับ), มินิเกม/leaderboard/ระบบชำระเงิน

## 2. การตัดสินใจที่ยืนยันแล้วในรอบนี้

**บริบทที่เปลี่ยนภาพผลิตภัณฑ์ (สำคัญกับทุก session ต่อจากนี้):** ผู้ใช้จริงคือ **นักเรียนที่ปิ๊กสอนอยู่** (รู้จักตัวตน จำนวนหลักสิบ) คนนอกที่มาขอใช้เป็นเคสรอง เก็บเงินนอกระบบแล้วปิ๊กกดปลดล็อกเอง เป้าหมายของระบบคือ "เครื่องมือทบทวนไวยากรณ์และคำศัพท์" ไม่ใช่ผลิตภัณฑ์ที่ต้องแข่งในตลาดเปิด — กลไกที่ออกแบบไว้เผื่อคนแปลกหน้าจึงถูกตัดทอนลง

| เรื่อง | มติ | ผลที่ตามมา |
|---|---|---|
| ขอบเขต sub-project | schema ครบทุก collection ของ Phase 1 + rules + rules test + admin shell | rules ไม่ต้องรื้อทุกครั้งที่เพิ่มฟีเจอร์ |
| การบังคับ schema | **แนวทาง A**: schema module ใน JS + rules เขียนมือแบบ allowlist + rules test บน emulator เป็นตาข่ายกันเพี้ยน | validator ให้ error รายฟิลด์ที่ UI ใช้ได้ (rules ทำไม่ได้ — คืนแค่ `permission-denied`) |
| Taxonomy ของ `tags` | ล็อกเป็นรายการคงที่ในโค้ด (`schema/taxonomy.js`) + validate ทุก tag | version อยู่ใน git, แก้ต้อง deploy (นานๆ ครั้ง) |
| ช่องทางนำเข้าเนื้อหา | หน้า admin "นำเข้า JSON" ในเบราว์เซอร์ | ไม่ต้องมี service account key ในเครื่อง, เดินผ่าน security rules จริง |
| Free tier | **สวิตช์เดียว**: `full` เห็นทุกอย่าง / `free` เห็นเฉพาะที่ติด `isPreview` | **ตัด `config/freeTierLimits` และลิมิตคำศัพท์รายเลเวลใน `PLAN.md` §5 ออก** |
| คำศัพท์ | สำคัญเท่าไวยากรณ์ — กันที่ใน schema ตั้งแต่รอบนี้ | `submissions` พก `tags`/`wrongCount`/`lastAnsweredAt` ติดตัว ทำ spaced repetition ทีหลังได้โดยไม่ต้อง migrate |
| ดาว/ความคืบหน้า | **เป็นค่าที่คำนวณ ไม่ใช่ค่าที่เก็บ** (ดูข้อ 4) | ตัด `totalStars`/`stageProgress` ออกจาก `users` |
| consent notice | เลื่อนไว้ก่อน (ยังทดสอบภายใน) | ยังเป็น follow-up ที่ต้องทำก่อนเปิดให้นักเรียนจริงสมัคร |
| โฟลวตรวจคุณภาพเนื้อหา | ทำครบ 4 ชั้นในรอบนี้ (ดูข้อ 8) | sub-project ใหญ่ขึ้น แต่ step 4 (เนื้อหานำร่อง) เริ่มได้ทันที |

**จุดที่ spec นี้ต่างจาก `PLAN.md` — spec นี้ถือเป็นข้อยุติ และต้องแก้ `PLAN.md` ให้ตรงกันในขั้น implement:**

- ตัด `config/freeTierLimits` + ลิมิต free tier รายเลเวล (§5) ออกทั้งหมด
- ตัด `totalStars`, `stageProgress` ออกจาก `users` (§9) — เปลี่ยนเป็นค่าที่คำนวณจาก `submissions`/`stageClears`
- เพิ่ม `reviewStatus` ให้ `stages` (§8) เพื่อให้กฎ "นักเรียนเห็นเฉพาะ published" ใช้ได้กับทั้ง 3 collection เนื้อหาโดยไม่มีข้อยกเว้น
- เพิ่ม `assignedUids` ใน `exercises` เพื่อให้กติกา "การบ้านไม่ผ่าน free-tier gate" (§5) บังคับได้ที่ rules
- เพิ่ม collection `stageClears` (ไม่มีใน §9)
- ตัด `gradeTag` ออกจาก `exercises` (§9) — ซ้ำซ้อนกับ `level` + `grade` ของผู้ใช้ ยังไม่มีอะไรเรียกใช้
- เพิ่มฟิลด์สายตรวจสอบคุณภาพใน `exercises`: `source`, `sourceUrl`, `reviewNotes`, `contentHash`, `importBatchId`

## 3. Collection inventory

| Collection | สถานะ | หน้าที่ |
|---|---|---|
| `users/{uid}` | มีอยู่แล้ว → เข้มขึ้น | โปรไฟล์ + role + tier |
| `exercises/{id}` | ใหม่ | คลังโจทย์ (ไวยากรณ์และคำศัพท์) + โจทย์การบ้านเฉพาะกิจ |
| `stages/{id}` | ใหม่ | เส้นทางด่าน อ้าง `itemIds` ไปที่ `exercises` |
| `grammarNotes/{id}` | ใหม่ | สรุปไวยากรณ์แบบ cheat sheet |
| `assignments/{id}` | ใหม่ | การบ้านรายคน/กลุ่ม |
| `submissions/{id}` | ใหม่ | คำตอบ + ดาว + คิวตรวจ + ฐานของสถิติทั้งหมด |
| `stageClears/{id}` | ใหม่ | บันทึกว่าผ่านด่านไหนแล้ว |

## 4. ดาวและความคืบหน้า: ค่าที่คำนวณ ไม่ใช่ค่าที่เก็บ

`PLAN.md` ขัดกันเองในจุดนี้: §12 ห้ามนักเรียนเขียน `totalStars`/`stageProgress` ของตัวเอง แต่ §2 ไม่ใช้ Cloud Functions (ต้องขึ้น Blaze) และตรวจคำตอบฝั่ง client → ถ้าห้ามทั้งสองฝั่ง จะไม่มีใครเขียนดาวได้เลย

**ข้อยุติ:**

- `submissions` เก็บ **1 เอกสารต่อ (นักเรียน × โจทย์ × บริบท)** doc id ตายตัว = `{uid}__{assignmentId|"bank"}__{exerciseId}` ไม่ append ใหม่ทุกครั้งที่ตอบ → กติกา "เก็บดาวสูงสุดที่เคยได้ ไม่บวกซ้ำ" (`PLAN.md` §6) เป็นจริงโดยโครงสร้าง ไม่ต้องพึ่ง logic ฝั่ง client
- **ดาวรวม** = `getAggregateFromServer(sum('bestStars'))` ของ `submissions` ที่ `uid == me` (Firestore aggregation query ใช้ได้บน Spark plan ไม่ต้องอ่านทุกเอกสาร)
- doc id เป็น **ข้อตกลงฝั่งแอป** เพื่อกันเอกสารซ้ำ ไม่ใช่สิ่งที่ rules บังคับ — rules บังคับที่ฟิลด์ `uid == request.auth.uid` (นักเรียนสร้าง id มั่วได้ แต่ได้แค่ในชื่อตัวเอง กระทบสถิติตัวเองเท่านั้น)
- **ความคืบหน้าด่าน** = อ่านจาก `stageClears` ของตัวเอง (ด่านที่ผ่านสูงสุดต่อ skill+level) ไม่ต้องคำนวณย้อนจากทุกข้อ
- `users` ไม่มีฟิลด์ `totalStars`/`stageProgress` อีกต่อไป → ไม่เหลือช่องให้ยกระดับสิทธิ์ผ่านเอกสารผู้ใช้เลยนอกจาก `role`/`tier` ที่ล็อกแน่นอยู่แล้ว

**ความเสี่ยงที่ยอมรับ:** นักเรียนที่ตั้งใจเปิด devtools ยังปลอมดาว/ความคืบหน้าของตัวเองได้ (เขียน `bestStars` หรือ `stageClears` ตรงๆ) — เป็นความเสี่ยงระดับเดียวกับการตรวจคำตอบฝั่ง client ที่ `PLAN.md` §12 ยอมรับไว้แล้ว และไม่แตะเส้นเงินเพราะ `tier` ถูกล็อกแยก ถ้าวันหนึ่งย้ายไป Cloud Functions ปิดช่องนี้ได้โดยไม่ต้องเปลี่ยน schema

## 5. Schema module

```
src/lib/schema/
  field-types.js     ตัวประกอบพื้นฐาน: str() enum() bool() int() arrayOf() isoDate()
  users.js  exercises.js  stages.js  grammar-notes.js
  assignments.js  submissions.js  stage-clears.js
  taxonomy.js        รายการ tag ที่อนุญาต (ไวยากรณ์ + คำศัพท์) ต่อเลเวล
  index.js           registry: ชื่อ collection -> นิยาม
  validate.js        validate(collection, data, mode) -> { ok, errors: [{ field, message }] }
```

- `mode` = `'create' | 'update'` — `create` บังคับ required ครบ, `update` ตรวจเฉพาะฟิลด์ที่ส่งมา
- ข้อความ error เป็นภาษาไทยรายฟิลด์ เพราะปลายทางคือหน้านำเข้า JSON ที่ปิ๊กอ่านเอง
- โมดูลนี้เป็น JS ล้วน ไม่ import Firebase → unit test ด้วย vitest ได้เร็วโดยไม่ต้องพึ่ง emulator
- **ใช้ร่วมกัน 3 ที่:** หน้านำเข้า JSON, หน้าคลังเนื้อหา (ตอนแก้), และสคริปต์ `npm run check:content`

### นิยามฟิลด์

```
users/{uid}
  uid, email, fullName, nickname
  grade: ม.1|ม.2|ม.3|ม.4|ม.5|ม.6|วัยทำงาน/บุคคลทั่วไป
  school?, phone, lineId?
  role: student|admin                          เฉพาะ admin แก้
  tier: free|full, tierNote?                   เฉพาะ admin แก้
  groupTags: string[]                          เฉพาะ admin แก้
  streak: { current, longest, lastActiveDate } เจ้าของแก้ได้
  onboardingComplete: bool, createdAt, updatedAt

exercises/{id}
  skill: grammar|vocab|writing|dialogue
  level: A1|A2|B1|B2|C1
  type: mcq|fill_blank|matching|short_answer|paragraph|shadowing
  prompt: string
  choices?: string[]           บังคับสำหรับ mcq, matching — type อื่นห้ามมี
  answerKey?: string|string[]  บังคับสำหรับ mcq, fill_blank, matching — short_answer/paragraph/shadowing ห้ามมี
  rubric?: string              บังคับสำหรับ short_answer, paragraph — type อื่นห้ามมี
  tags: string[]               ต้องอยู่ใน taxonomy ทุกตัว และเลเวลของ tag ต้องไม่สูงกว่าเลเวลของข้อ
  visibility: bank|assignmentOnly
  isPreview: bool
  reviewStatus: draft|reviewed|published
  assignedUids: string[]       ให้ผู้ถูก assign อ่านได้แม้ tier=free
  source?, sourceUrl?, reviewNotes?
  contentHash: string          ระบบคำนวณเองจาก normalize(prompt + choices) ตอนนำเข้า/บันทึก
                               ไม่ใช่ฟิลด์ที่คนเขียน JSON ต้องใส่มา
  importBatchId?: string
  createdAt, updatedAt, createdBy

stages/{id}
  skill, level, order: int, title, itemIds: string[]
  passThreshold: number (0-1, ค่าเริ่มต้น 0.7)
  isPreview: bool, reviewStatus, createdAt, updatedAt, createdBy

grammarNotes/{id}
  level, topic, tags: string[], summary
  isPreview: bool, reviewStatus, source?, sourceUrl?, reviewNotes?
  contentHash, importBatchId?, createdAt, updatedAt, createdBy

assignments/{id}
  createdBy, title, note?, exerciseIds: string[], assignedTo: string[]
  dueDate?, createdAt, updatedAt

submissions/{uid}__{assignmentId|"bank"}__{exerciseId}
  uid, exerciseId, assignmentId?
  skill, level, type, tags: string[]     คัดลอกจากโจทย์ตอนส่ง (สถิติไม่ต้อง join)
  answer, autoGraded: bool, score?: number
  bestStars: 0|1|2|3
  attemptCount: int, wrongCount: int, lastAnsweredAt
  status: pending|graded|completed
  feedback?, gradedBy?, gradedAt?        เฉพาะ admin เขียน
  createdAt

stageClears/{uid}__{stageId}
  uid, stageId, skill, level, order: int, score: number, clearedAt
```

## 6. Taxonomy

`schema/taxonomy.js` เก็บรายการ tag เป็น `{ id, label, level }` โดย `id` คือค่าที่บันทึกจริง (เสถียร ห้ามแก้ย้อนหลัง — เพราะข้อที่ติด tag ไว้แล้วจะกำพร้า) และ `label` คือข้อความที่คนอ่าน รูปแบบ id = `<skill>:<ชื่อหัวข้อแบบ kebab-case ภาษาอังกฤษ>`

- **ไวยากรณ์** (`grammar:present-perfect` ฯลฯ) — ยกร่างจาก `PLAN.md` §8.1 มาตรงๆ
- **คำศัพท์** (`vocab:food-drink` ฯลฯ) — `PLAN.md` ไม่เคยร่างไว้ spec นี้ยกร่างตั้งต้นให้ ปิ๊กในฐานะคนสอนจริงแก้ทับได้:
  - A1: ครอบครัว/คน, อาหาร-เครื่องดื่ม, ตัวเลข-เวลา-วันที่, โรงเรียน-ห้องเรียน, บ้าน-ของใช้, เสื้อผ้า-สี, สัตว์, กิจวัตรประจำวัน, สถานที่ในเมือง
  - A2: ซื้อของ-เงิน, เดินทาง-ขนส่ง, สุขภาพ-ร่างกาย, งานอดิเรก-เวลาว่าง, อาชีพพื้นฐาน, เทศกาล-วันหยุด, บอกทาง, อารมณ์พื้นฐาน, ลักษณะคน-หน้าตา-นิสัย, ดินฟ้าอากาศ-ฤดูกาล
  - B1: การงาน-อาชีพ, การศึกษา, เทคโนโลยี-อินเทอร์เน็ต, สิ่งแวดล้อม-ธรรมชาติ, สื่อ-บันเทิง, ความสัมพันธ์, กีฬา-การออกกำลังกาย, การเงิน-ธนาคาร, ชีวิตเมือง-ชนบท, ประสบการณ์การเดินทาง
  - B2: ธุรกิจ-เศรษฐกิจ, วิทยาศาสตร์-งานวิจัย, สังคม-วัฒนธรรม, ข่าว-การเมืองพื้นฐาน, ศิลปะ-วรรณกรรม, ประเด็นระดับโลก, จิตวิทยา-อารมณ์เชิงลึก, สมัครงาน-ทักษะการทำงาน, โฆษณา-การบริโภค, กฎหมาย-อาชญากรรมพื้นฐาน
  - C1: ภาษาวิชาการ, สำนวน-collocation ขั้นสูง, ทะเบียนภาษาทางการ/ไม่ทางการ, การเจรจาต่อรอง, ภาษาเชิงข้อมูล-สถิติ, จริยธรรม-ปรัชญา, การวิเคราะห์สื่อ-อคติ, ภาษาเชิงเปรียบเทียบ-อุปมา

**กฎ validate:** ทุก tag ต้องมีใน taxonomy และ `level` ของ tag ต้องไม่สูงกว่า `level` ของเอกสาร (ข้อ B1 ติด tag ของ A1 ได้ = ทบทวนของเก่า, ข้อ A1 ติด tag ของ C1 ไม่ได้)

## 7. Security rules + สัญญาการ query

### ตารางสิทธิ์

| Collection | นักเรียนอ่าน | นักเรียนเขียน | admin |
|---|---|---|---|
| `users` | เฉพาะของตัวเอง | เฉพาะฟิลด์โปรไฟล์ + `streak` ของตัวเอง | อ่าน/แก้ได้หมดรวม `tier`, list ได้ |
| `exercises` `stages` `grammarNotes` | `published` + (`isPreview` หรือ `tier=="full"` หรือ uid อยู่ใน `assignedUids`) | ✗ | ทุกอย่าง (เห็น `draft` ด้วย) |
| `assignments` | เฉพาะที่ตัวเองอยู่ใน `assignedTo` | ✗ | ทุกอย่าง |
| `submissions` | ของตัวเอง | สร้าง/แก้ของตัวเอง แต่แตะ `feedback`/`gradedBy`/`gradedAt`/`status=="graded"` ไม่ได้ | อ่านทั้งหมด + ให้คะแนน |
| `stageClears` | ของตัวเอง | สร้าง/แก้ของตัวเอง | อ่านทั้งหมด |

- ทุก `create`/`update` ใช้ **allowlist** `request.resource.data.keys().hasOnly([...])` ไม่ใช่ denylist แบบปัจจุบัน — เก็บของค้างจาก Foundation spec §12 ไปในตัว และปิดช่องเขียนฟิลด์แปลกปลอม/ทับ `email`/`createdAt`/`onboardingComplete`
- `delete`: ไม่อนุญาตทุก collection ยกเว้น admin ลบ `exercises`/`stages`/`grammarNotes`/`assignments`
- ไม่มีใครอ่านอะไรได้เลยถ้ายังไม่ล็อกอิน (คง catch-all `allow read, write: if false` ท้ายไฟล์ไว้)

### สัญญาการ query (ต้องเขียนคู่กับ rules เสมอ)

Firestore rules **ไม่ใช่ตัวกรอง** — ถ้า query ไม่ได้ใส่เงื่อนไขที่พิสูจน์ได้ว่าทุกแถวผ่าน rules มันจะปฏิเสธทั้ง query เช่น `getDocs(collection('exercises'))` เปล่าๆ พังเสมอ query ที่แอปใช้จริงจึงต้องอยู่ในรายการนี้เท่านั้น:

```js
// นักเรียน tier=full เปิดคลัง
where('reviewStatus','==','published'), where('visibility','==','bank'),
where('skill','==',s), where('level','==',l)

// นักเรียน tier=free เปิดคลัง — ต้องเติมเงื่อนไข isPreview
+ where('isPreview','==',true)

// โจทย์ของการบ้านที่ถูก assign
where('assignedUids','array-contains',uid)

// การบ้านของฉัน
where('assignedTo','array-contains',uid), orderBy('dueDate')

// ประวัติ/สถิติของฉัน
where('uid','==',uid), orderBy('lastAnsweredAt','desc')

// คิวตรวจงานของ admin
where('status','==','pending'), orderBy('createdAt')

// รายชื่อนักเรียนของ admin
where('role','==','student'), orderBy('createdAt','desc')
```

Composite index ที่ต้องประกาศใน `firestore.indexes.json` (emulator ไม่บังคับ index — ถ้าไม่ประกาศจะไปพังเอาตอนขึ้น production): `exercises(reviewStatus, visibility, skill, level)`, `exercises(reviewStatus, visibility, skill, level, isPreview)`, `exercises(reviewStatus, skill, level, updatedAt)` สำหรับหน้าคลังเนื้อหา, `assignments(assignedTo, dueDate)`, `submissions(uid, lastAnsweredAt)`, `submissions(status, createdAt)`, `users(role, createdAt)`

**ต้นทุนที่ยอมรับ:** rules ต้อง `get()` เอกสาร `users/{uid}` เพื่อเช็ก tier ทุกครั้งที่อ่านเนื้อหา = +1 read ต่อคำขอ (cache ภายในคำขอเดียว) ที่สเกลหลักสิบคนไม่มีนัยสำคัญ

## 8. โฟลวตรวจคุณภาพเนื้อหา (4 ชั้น)

**ข้อจำกัดที่ต้องรู้ก่อน:** แอปเป็น static site ไม่มี backend — การเสิร์ช/ดึงข้อมูลจากเว็บจึงเกิดตอน *แต่งเนื้อหา* ใน Claude Code session เท่านั้น ไม่ใช่ตอนนักเรียนใช้งาน (ถ้าให้ browser ยิง search API คีย์จะรั่วและมีค่าใช้จ่ายต่อครั้ง)

**ชั้น 1 — ตอนแต่ง (นอกแอป):** ล็อกขอบเขต level + skill + tag ก่อน แล้วใช้ web search ดึงวัตถุดิบ — คลังคำศัพท์ตามความถี่จริง (Oxford 3000/5000, CEFR wordlist), ประโยค/บริบทร่วมสมัยจากแหล่งจริง, สถานการณ์ที่คนใช้จริง เพื่อไม่ให้โจทย์วนซ้ำแนวเดิม

> **กติกาลิขสิทธิ์:** ห้ามคัดลอกข้อสอบหรือข้อความยาวจากเว็บมาตรงๆ ใช้เป็นวัตถุดิบแล้วแต่งใหม่เสมอ ทุกข้อบันทึก `source`/`sourceUrl` ไว้ตรวจย้อนได้

**ชั้น 2 — สคริปต์ตรวจอัตโนมัติ `npm run check:content <file.json>`** (ใช้ validator ชุดเดียวกับหน้านำเข้า):

- MCQ มีคำตอบถูกข้อเดียวจริงไหม, `answerKey` อยู่ใน `choices` ไหม, ตัวเลือกซ้ำกันไหม
- `fill_blank` มีช่องว่างพอดี 1 ช่องไหม, `short_answer`/`paragraph` ต้องมี `rubric`
- tag อยู่ใน taxonomy และเลเวลสอดคล้องไหม
- **`contentHash` ซ้ำกับข้อที่มีอยู่แล้วไหม** (normalize ข้อความก่อน hash) — ตัวนี้คือสิ่งที่บังคับความหลากหลายได้จริง ไม่ใช่แค่หวังว่า AI จะไม่ซ้ำ
- **รายงานความครอบคลุม:** จำนวนข้อต่อ tag ต่อเลเวล + tag ที่ยังไม่มีข้อเลย → เห็นรูโหว่ก่อนสั่ง generate รอบถัดไป

**ชั้น 3 — AI ตรวจทานรอบสอง** ด้วย checklist ตายตัวทุกครั้ง: คำตอบถูกข้อเดียวจริงไหม / กำกวมไหม / ยากง่ายตรงเลเวลไหม / ภาษาเป็นธรรมชาติไหม / บริบทเหมาะกับผู้เรียนไทยไหม → ผลบันทึกใน `reviewNotes` แล้วเลื่อนเป็น `reviewStatus: reviewed`

**ชั้น 4 — ปิ๊กอนุมัติในแอป** ที่หน้าคลังเนื้อหา → `reviewStatus: published` เท่านั้นที่นักเรียนเห็น (บังคับที่ rules)

เอกสารโฟลวนี้เขียนไว้ที่ `docs/content-pipeline.md` เพื่อให้ session ถัดไปทำซ้ำได้เหมือนเดิมทุกครั้ง

## 9. หน้าจอฝั่ง admin

```
src/admin/index.html     hub + สรุปตัวเลข (นักเรียนกี่คน, เนื้อหารออนุมัติกี่ข้อ)
src/admin/users.html     จัดการผู้ใช้
src/admin/content.html   คลังเนื้อหา (ตรวจ/แก้/publish)
src/admin/import.html    นำเข้า JSON
src/lib/admin-nav.js     แถบเมนู admin ใช้ร่วมกันทุกหน้า
```

ทุกหน้าอยู่หลัง `requireAdmin` ที่ Foundation ทำไว้ และไม่โผล่ในเมนูฝั่งนักเรียนเลย

- **จัดการผู้ใช้** — ตาราง (ชื่อเล่น/ชื่อจริง, ช่วงชั้น, tier, เบอร์/LINE, วันที่สมัคร), กรองตามช่วงชั้น/`groupTags`, ค้นชื่อในเครื่อง (คนหลักสิบ ไม่ต้องพึ่ง index), กดแถวเพื่อแก้ `tier`/`tierNote`/`groupTags`
- **นำเข้า JSON** — วางไฟล์/ข้อความ → ตรวจทุกข้อ → สรุป "ผ่าน N / ไม่ผ่าน M" พร้อมบอกว่าข้อไหนผิดฟิลด์อะไร → นำเข้าเฉพาะข้อที่ผ่านเป็น `draft` ติด `importBatchId` เดียวกัน (เขียน batch ละ 400 ข้อ) → ข้อที่ `contentHash` ซ้ำถูกตีกลับ ไม่นำเข้า
- **คลังเนื้อหา** — กรองตาม reviewStatus/skill/level/tag → ดูตัวอย่างข้อแบบที่นักเรียนจะเห็น → แก้ข้อความรายข้อ → publish ทีละข้อหรือทั้ง batch → ตีกลับเป็น draft

## 10. การทดสอบ

**ชั้นที่ 1 — unit test (vitest, รันทุกครั้ง):** validator ทุก collection (เคสผ่าน/ไม่ผ่านรายฟิลด์), taxonomy (tag เกินเลเวล, tag ไม่มีจริง), content checks (MCQ คำตอบถูกสองข้อ, `answerKey` ไม่อยู่ใน choices, ข้อความซ้ำ), ตัวสร้าง doc id, ตัวสร้าง query

**ชั้นที่ 2 — rules test จริงบน emulator (`@firebase/rules-unit-testing`):** ไล่ทีละช่องของตารางสิทธิ์ข้อ 7 โดยเฉพาะเคสที่ห้ามพัง — นักเรียน `free` อ่านเนื้อหาที่ไม่ใช่ preview ไม่ได้ / นักเรียนแก้ `tier`, `role` ตัวเองไม่ได้ / นักเรียนเขียน `exercises` ไม่ได้ / นักเรียนเขียน `feedback`/`gradedBy` ให้ตัวเองไม่ได้ / นักเรียนอ่าน `submissions` ของคนอื่นไม่ได้ / นักเรียน `free` ที่ถูก assign อ่านข้อนั้นได้ / ผู้ใช้ที่ยังไม่ล็อกอินอ่านอะไรไม่ได้เลย / admin ทำได้ทุกอย่างที่ตารางระบุ / เขียนฟิลด์นอก allowlist ไม่ได้

ทั้งสองชั้นรันใน GitHub Actions เพื่อไม่ให้ rules ถอยหลังเงียบๆ ในอนาคต — ติดตั้ง `firebase-tools` ใน workflow และใช้ Java ที่ ubuntu runner มีติดมาอยู่แล้ว (ถ้าเวอร์ชันไม่พอสำหรับ emulator ให้เติม `actions/setup-java`)

**การตรวจด้วยมือก่อนปิดงาน:** ปิ๊กล็อกอินจริงบนเว็บที่ deploy แล้ว → นำเข้าไฟล์ JSON ตัวอย่าง 5 ข้อ (มีข้อที่ตั้งใจให้ผิด 1 ข้อ) → เห็น error ตรงข้อนั้น → publish → สลับ tier ของบัญชีทดสอบ 1 บัญชี แล้วยืนยันว่ามองเห็น/ไม่เห็นเนื้อหาตามที่ควร

## 11. Admin bootstrap

บัญชีปิ๊กถูกตั้ง `role: admin` ไว้แล้วตั้งแต่ Foundation — รอบนี้เพียงต้องพิสูจน์ด้วย rules test ว่ากติกา allowlist ใหม่ไม่ทำให้สิทธิ์ admin หลุด

วิธีตั้ง admin คนถัดไป (ถ้ามี): แก้ `role` เป็น `"admin"` ที่เอกสาร `users/{uid}` ใน Firebase console โดยตรง — ไม่มีและจะไม่มี UI สมัคร admin ตาม `PLAN.md` §15 ข้อ 2

## 12. ลำดับการทำ

sub-project นี้ใหญ่กว่า Foundation แบ่งเป็น 5 ช่วงที่แต่ละช่วงจบแล้วมีของที่ใช้ได้จริง (ถ้าต้องหยุดกลางทางก็หยุดได้ตรงรอยต่อ):

1. **Schema module + taxonomy + unit test** — ยังไม่แตะ Firestore เลย
2. **Security rules + rules test บน emulator + indexes + CI** — ชั้นความปลอดภัยเสร็จก่อนมีข้อมูลจริงเข้าระบบ
3. **หน้าจัดการผู้ใช้** — ปิ๊กสลับ tier เองได้ (เลิกต้องเข้า Firebase console)
4. **สคริปต์ `check:content` + หน้านำเข้า JSON** — เนื้อหาเข้าระบบได้
5. **หน้าคลังเนื้อหา + `docs/content-pipeline.md`** — วงจรตรวจ-อนุมัติครบ

## 13. ความเสี่ยงที่ยอมรับ + ของค้าง

**ยอมรับใน v1:**

- ตรวจคำตอบฝั่ง client และ `answerKey` อยู่ในเอกสารที่นักเรียนอ่านได้ (`PLAN.md` §12 ยอมรับไว้แล้ว)
- นักเรียนปลอมดาว/`stageClears` ของตัวเองได้ (ข้อ 4) — ไม่แตะเส้นเงิน
- นิยาม schema อยู่ 2 ที่ (JS + rules) — rules test คือตัวจับไม่ให้เพี้ยน

**ของค้างที่ยังไม่ทำและต้องไม่ลืม:**

- **Privacy/consent notice ในฟอร์ม onboarding** — ต้องมีก่อนเปิดให้นักเรียนจริงสมัคร ต้องใช้ wording จากปิ๊ก
- `auth-guard.js` `requireLogin` แสดงข้อความผิดเมื่อ Firestore ล่มชั่วคราว (Foundation spec §12) — ยังไม่แก้
- รายการ minor อื่นจาก Foundation spec §12 ที่ยังไม่แตะ
