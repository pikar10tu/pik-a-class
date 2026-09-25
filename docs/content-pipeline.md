# คู่มือเพิ่ม/แก้เนื้อหา (Content Playbook)

> เขียนให้ทั้งคนและ AI chatbot ทำตามได้ทีละขั้น — ถ้าทำตามนี้ เนื้อหาเปลี่ยนได้โดยไม่ทำโค้ดพัง
> หลักใหญ่: **ไฟล์ใน git คือต้นฉบับ** ทุกคำสั่งมีโหมด "ดูก่อน" และไม่มีคำสั่งไหนลบข้อมูลบน production

## เนื้อหาอยู่ที่ไหน

| เนื้อหา | แก้ที่ | ขึ้นเว็บยังไง |
|---|---|---|
| คำศัพท์ (Animal Cafe, คลังคำศัพท์) | `scripts/vocab-builder/data-*.js` | `npm run build:vocab` แล้ว push |
| สรุปไวยากรณ์ (Handbook, การ์ดก่อนด่าน) | `src/lib/grammar-notes/notes-*.js` | push |
| ข้อสอบและด่าน (ตะลุยด่าน) | `docs/seeds/*.json` | `npm run content:sync -- --apply` (ไม่ต้อง push ก็ขึ้น) |
| หมวด/หัวข้อ (tag) ที่ใช้ได้ | `src/lib/schema/taxonomy.js` | push |

ห้ามแก้ `src/lib/vocab-items.js` ตรงๆ (สร้างอัตโนมัติ) และห้ามแก้ไฟล์ใน `docs/seeds/archive/` (เลิกใช้แล้ว)

---

## A. คำศัพท์

1. แก้/เพิ่มใน `scripts/vocab-builder/data-<หมวด>.js`
2. `npm run build:vocab` — ตรวจทุกคำแล้วสร้าง `src/lib/vocab-items.js` ถ้ามีจุดผิดจะบอกเป็นข้อๆ
3. `npm test` แล้ว commit ทั้ง data file, `vocab-items.js` และ `vocab-ids.lock.json`

**กติกา ID (สำคัญที่สุด):** `id` ของคำถูกเก็บถาวรในข้อมูลนักเรียน (คำโปรด + สถิติรายคำ)
- ห้ามเปลี่ยน `word` ของ id เดิมเป็นคำอื่น — ถ้าจะเปลี่ยนคำ ให้ **ตั้ง id ใหม่** (เช่น `v_b2_food_nourish`) แล้วลบรายการเก่าออก
- ห้ามนำ id ที่เลิกใช้แล้วกลับมาใช้กับคำอื่น
- `vocab-ids.lock.json` จำไว้ทุก id ที่เคยมี — ถ้าทำผิดกติกา `build:vocab` และ `npm test` จะ fail พร้อมบอก id ที่ควรใช้แทน

**กติกาคำแปล (กันเดาคำตอบ):** `thai` และ `alternatives` ห้ามมี `,` `(` `)` `/` · ตัวเลือกหลอก 3 ตัวต้องไม่ซ้ำกันและไม่ซ้ำคำตอบ · ความยาวและชนิดของคำใกล้เคียงกัน

## B. สรุปไวยากรณ์

แก้ใน `src/lib/grammar-notes/notes-<level>.js` · key ต้องตรงกับ tag ใน taxonomy (เช่น `grammar:present-perfect`) · `npm test` จะตรวจให้ว่า tag มีจริง

## C. ข้อสอบและด่าน (Firestore)

### ลำดับที่ปลอดภัย

```
npm run content:pull            # 1. ดึงของที่มีคนแก้ผ่านหน้า admin ลงมาก่อน → ดู git diff docs/seeds แล้ว commit
# 2. แก้ไฟล์ใน docs/seeds/
npm run check:content           # 3. ต้องขึ้น ✅ ก่อนไปต่อ
npm run content:sync            # 4. ดูแผน (dry-run) ว่าจะสร้าง/แก้อะไรบ้าง — ยังไม่เขียน
npm run content:sync -- --apply # 5. เขียนจริง
npm run content:health          # 6. ตรวจ production ซ้ำ
```

ต้องล็อกอิน Firebase CLI ก่อน (ครั้งเดียวต่อเครื่อง): `npx firebase login`

### กติกาไฟล์ seed

- **ทุกรายการต้องมี `id`** = รหัสเอกสารบน Firestore · ห้ามเปลี่ยน id ของรายการเดิม
- รายการใหม่: ตั้ง id เอง สั้นและไม่ซ้ำ ใช้ได้เฉพาะ `A-Z a-z 0-9 _ -` เช่น `b1-pp-021`
- จะเลิกใช้ข้อไหน: **อย่าลบออกจากไฟล์** ให้เปลี่ยน `"reviewStatus": "draft"` แล้ว sync (sync ไม่ลบเอกสารบน production)
- ไฟล์ด่าน (stages) ดูจากการมี `drawCount` · ด่านดึงข้อจาก `skill` + `level` + `tags` ที่ตรงกัน
- ถ้าเปลี่ยน tag ของด่าน ต้องเปลี่ยน tag ของข้อในคลังให้ตรงด้วยในรอบเดียวกัน — `check:content` และ `content:sync` จะไม่ยอมถ้าด่านไหนมีข้อไม่พอ `drawCount`
- `from-production-exercises.json` คือข้อที่เคยสร้างผ่านหน้า admin — แก้ได้เหมือนไฟล์อื่น

### สิ่งที่ `check:content` ตรวจ

ฟิลด์ครบและชนิดถูกตาม schema · MCQ มีคำตอบถูกข้อเดียวและอยู่ในตัวเลือก · ตัวเลือกไม่ซ้ำ · `fill_blank` มี `___` พอดี 1 ช่อง · ข้อเขียนมี `rubric` · tag มีจริงและไม่สูงกว่าเลเวล · ข้อความไม่ซ้ำในไฟล์ · id ถูกรูปแบบและไม่ซ้ำข้ามไฟล์ · ทุกด่านมีข้อพอ
(เพิ่ม `-- --coverage` เพื่อดูว่าแต่ละเลเวลยังขาดหัวข้อไหน)

### ตรวจคุณภาพโดย AI ก่อน sync

ให้ AI ตรวจซ้ำด้วย checklist นี้ทุกครั้ง:
1. คำตอบถูกข้อเดียวจริงไหม มีตัวเลือกอื่นที่ก็ถูกด้วยหรือเปล่า
2. โจทย์กำกวมไหม · ไม่มีคำใบ้ในวงเล็บที่เผยคำตอบ (เช่น `(run)`) ในข้อ MCQ
3. ยากง่ายตรงเลเวล CEFR ไหม · ภาษาเป็นธรรมชาติไหม · บริบทเหมาะกับผู้เรียนไทยไหม
4. ข้อเรียงประโยค (`sentence_builder`) ใส่ `answerKey` ทุกรูปที่ถูก เช่นทั้ง `do not` และ `don't`

**ลิขสิทธิ์:** ห้ามคัดลอกข้อสอบจากเว็บมาตรงๆ แต่งใหม่เสมอ และใส่ที่มาใน `source` / `sourceUrl`

### อีกช่องทาง: หน้า admin

`admin/import.html` นำเข้าไฟล์ JSON ได้ (ถ้าไฟล์มี `id` จะใช้เป็นรหัสเอกสาร) และ `admin/content.html` แก้/อนุมัติทีละข้อได้
ถ้าแก้ผ่านหน้า admin อย่าลืม `npm run content:pull` ก่อนแก้ seed รอบถัดไป ไม่งั้น sync จะเขียนทับของที่แก้ไว้

## D. หลังเปลี่ยน rules/indexes

ถ้าแก้ `firestore.rules` หรือ `firestore.indexes.json` ต้องรัน `npm run test:rules` และ deploy ตาม `docs/deploy.md`
