# Pik a Class

เว็บทบทวนภาษาอังกฤษ (ไวยากรณ์ + คำศัพท์) สำหรับนักเรียนและผู้เรียนวัยทำงาน ครอบคลุมเลเวล CEFR A1–B2 (โครงสร้างรองรับ C1)
มีโซนตะลุยด่านสไตล์ Duolingo, แบบฝึกหัดอิสระ, การบ้านรายบุคคล/กลุ่ม, ระบบดาว/streak และตรวจงานเขียนย้อนหลังได้

**สเปกเต็ม: ดู [`PLAN.md`](./PLAN.md)**

## Stack
- Frontend: static HTML/JS/CSS, deploy บน GitHub Pages
- Backend: Firebase (Authentication + Firestore)

## คำสั่งที่ใช้บ่อย

```bash
npm run dev            # dev server (ต้องมี .env.local — ดู .env.example)
npm test               # unit test (schema/validator/query builder)
npm run test:rules     # ทดสอบ Firestore security rules บน emulator (ต้องมี Java บนเครื่อง)
npm run build          # build ขึ้น dist/
npm run build:vocab    # สร้างคลังคำศัพท์จาก scripts/vocab-builder
npm run check:content  # ตรวจเนื้อหาใน docs/seeds ทั้งหมด
npm run content:sync   # ดูแผน sync เนื้อหาขึ้น Firestore (เพิ่ม -- --apply เพื่อเขียนจริง)
npm run content:pull   # ดึงของที่แก้ผ่านหน้า admin ลงมาที่ docs/seeds
npm run content:health # ตรวจเนื้อหาบน production (อ่านอย่างเดียว)
```

## การตั้งผู้ดูแลระบบ (admin)

ไม่มี UI สมัคร admin โดยตั้งใจ — ตั้งด้วยการแก้ฟิลด์ `role` เป็น `"admin"` ที่เอกสาร `users/{uid}` ใน Firebase console โดยตรง (ทำครั้งเดียวต่อบัญชี)

## การเพิ่ม/แก้เนื้อหา

ทำตาม [`docs/content-pipeline.md`](./docs/content-pipeline.md) — คู่มือทีละขั้นสำหรับคำศัพท์ สรุปไวยากรณ์ ข้อสอบและด่าน

## Status
ใช้งานจริงแล้ว — A1–B2 ครบ 80 ด่าน, คลังคำศัพท์ 1,012 คำ, Animal Cafe, คู่มือไวยากรณ์, รายงานผู้ปกครอง
