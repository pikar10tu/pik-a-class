# Pik a Class

เว็บทบทวนภาษาอังกฤษ (ไวยากรณ์ + คำศัพท์) สำหรับนักเรียนและผู้เรียนวัยทำงาน ครอบคลุมเลเวล CEFR A1–C1
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
npm run check:content -- <ไฟล์.json>   # ตรวจไฟล์เนื้อหาก่อนนำเข้า
```

## การตั้งผู้ดูแลระบบ (admin)

ไม่มี UI สมัคร admin โดยตั้งใจ — ตั้งด้วยการแก้ฟิลด์ `role` เป็น `"admin"` ที่เอกสาร `users/{uid}` ใน Firebase console โดยตรง (ทำครั้งเดียวต่อบัญชี)

## การเพิ่มเนื้อหา

ทำตาม [`docs/content-pipeline.md`](./docs/content-pipeline.md) — generate → `npm run check:content` → นำเข้าที่หน้า `admin/import.html` → ตรวจและอนุมัติที่ `admin/content.html`

## Status
🚧 อยู่ระหว่างพัฒนา — ดูลำดับขั้นตอนใน PLAN.md section 15 (Build workflow)
เสร็จแล้ว: ข้อ 1 Foundation, ข้อ 2 Data layer + admin bootstrap
