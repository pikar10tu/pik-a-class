# การ deploy (เว็บ + Firestore rules + indexes)

การ deploy มี **สองฝั่ง** และทั้งสองฝั่งต้องขึ้นพร้อมกันเสมอ:

| ฝั่ง | สิ่งที่ขึ้น | ใครทำ |
| --- | --- | --- |
| GitHub Pages | ไฟล์เว็บใน `dist/` | อัตโนมัติ — job `build` + `deploy` ใน `.github/workflows/deploy.yml` |
| Firestore | `firestore.rules` + `firestore.indexes.json` | job `firestore` ถ้ามี secret ไม่งั้น **รันมือ** ตามด้านล่าง |

> **ทำไมต้องแยก:** GitHub Pages เสิร์ฟแค่ไฟล์ static เปลี่ยนกฎความปลอดภัยหรือ index ของฐานข้อมูลไม่ได้
> ถ้า deploy แต่เว็บ กฎเก่าจะยังบังคับใช้อยู่ใน production (เช่น กฎเจ้าของ `stageClears`, กฎห้ามคะแนนด่านลดลง,
> allowlist ฟิลด์ consent) และ query ที่ต้องใช้ composite index ใหม่จะพังด้วย `failed-precondition`
> ทั้งที่บนเครื่อง (Firestore emulator) ผ่านหมด เพราะ emulator สร้าง index ให้เองอัตโนมัติ

## รันมือ (ทำได้ทันที ไม่ต้องรอ secret)

```
npx firebase login
npx firebase deploy --only firestore:rules,firestore:indexes --project pik-a-class
```

ต้องมี:

- Node + `npm ci` ในโฟลเดอร์โปรเจกต์ (`firebase-tools` อยู่ใน devDependencies แล้ว ไม่ต้องลง global)
- บัญชี Google ที่เป็น **Owner / Editor** ของโปรเจกต์ `pik-a-class` (หรืออย่างน้อยมี role
  `Firebase Rules Admin` + `Cloud Datastore Index Admin`)
- `firebase login` ครั้งแรกจะเปิดเบราว์เซอร์ให้ยืนยันสิทธิ์ ครั้งต่อไปจำไว้ให้แล้ว

**ต้องรันเมื่อไหร่:** ทุกครั้งที่แก้ `firestore.rules` หรือ `firestore.indexes.json` — ให้รัน **ก่อน**
ปล่อยเว็บรุ่นใหม่ให้นักเรียนใช้ เพราะเว็บรุ่นใหม่มักพึ่ง index ใหม่

**index ใช้เวลาสร้าง:** Firestore จะ build index ในพื้นหลัง (หลักนาทีถึงสิบกว่านาทีถ้ามีข้อมูลเยอะ)
ระหว่างนั้น query ที่ต้องใช้ index นั้นยังคืน `failed-precondition` อยู่ — ดูสถานะได้ที่
Firebase Console → Firestore Database → Indexes

## ทำให้อัตโนมัติ (job `firestore` ใน CI)

job `firestore` ใน `.github/workflows/deploy.yml` รันคำสั่งเดียวกันให้อัตโนมัติ แต่จะทำงานก็ต่อเมื่อมี
repository secret ชื่อ **`FIREBASE_SERVICE_ACCOUNT`** ถ้ายังไม่มี job จะขึ้น warning ว่า
"Firestore rules/indexes not deployed" แล้วข้ามไป (ไม่ทำให้ build ล้ม) — แปลว่าต้องรันมือตามด้านบน

วิธีตั้ง secret:

1. Firebase Console → ⚙️ Project settings → Service accounts → Generate new private key
   (หรือ Google Cloud Console → IAM & Admin → Service Accounts → สร้างใหม่แล้วให้ role
   `Firebase Rules Admin` + `Cloud Datastore Index Admin` เท่านั้น ปลอดภัยกว่าการใช้ key ของ Owner)
2. เปิดไฟล์ JSON ที่ได้ คัดลอก **ทั้งไฟล์**
3. GitHub → repo → Settings → Secrets and variables → Actions → New repository secret
   ชื่อ `FIREBASE_SERVICE_ACCOUNT` ค่าคือ JSON ทั้งก้อน
4. push เข้า `main` อีกครั้ง แล้วดูว่า job `firestore` ขึ้นเขียว

job อ่าน project id จาก secret `VITE_FIREBASE_PROJECT_ID` ที่มีอยู่แล้ว ถ้าไม่มีจะ fallback เป็น `pik-a-class`

## index ที่มีอยู่ และมาจาก query ไหน

`firestore.indexes.json` ไม่ใช่ไฟล์ที่เดาเอาได้ — ทุกบรรทัดผูกกับ query จริงในโค้ด
ถ้าเพิ่ม/แก้ query ที่มี `where` หลายตัวหรือมี `orderBy` คนละฟิลด์กับ `where` ต้องเพิ่ม index ตามด้วย

| collection | fields | query ที่ใช้ |
| --- | --- | --- |
| `stages` | `reviewStatus`, `order` | `src/learn/index.js` — นักเรียน tier `full` / แอดมิน |
| `stages` | `reviewStatus`, `isPreview`, `order` | `src/learn/index.js` — นักเรียน tier `free` |
| `stages` | `reviewStatus`, `skill`, `level`, `order` | `src/learn/path.js` — tier `full` / แอดมิน |
| `stages` | `reviewStatus`, `isPreview`, `skill`, `level`, `order` | `src/learn/path.js` — tier `free` |
| `stages` | `skill`, `level`, `order` | `src/admin/stages.js` — กรองทั้งสกิลและเลเวล |
| `stages` | `skill`, `order` | `src/admin/stages.js` — กรองสกิลอย่างเดียว |
| `stages` | `level`, `order` | `src/admin/stages.js` — กรองเลเวลอย่างเดียว |
| `exercises` | `skill`, `level`, `updatedAt` desc | `src/admin/stage.js` — คลังโจทย์ในหน้าแก้ด่าน (ไม่มี `reviewStatus`) |
| `exercises` | `reviewStatus`, `skill`, `updatedAt` desc | `src/admin/content.js` — กรองสถานะ + สกิล |
| `exercises` | `reviewStatus`, `level`, `updatedAt` desc | `src/admin/content.js` — กรองสถานะ + เลเวล |
| `exercises` | `skill`, `updatedAt` desc | `src/admin/content.js` — กรองสกิลอย่างเดียว |
| `exercises` | `level`, `updatedAt` desc | `src/admin/content.js` — กรองเลเวลอย่างเดียว |

(ที่เหลือใน `firestore.indexes.json` เป็นของเดิมจากชั้นข้อมูล — คลังโจทย์, assignments, submissions, users)

**เช็กก่อนปล่อยของทุกครั้ง:** กรองไม่ครบทุกคู่ = เปิดหน้าแล้วเจอ "โหลดข้อมูลไม่สำเร็จ" เฉพาะบางตัวกรอง
ซึ่งเป็นบั๊กที่เทสจับไม่ได้เลย เพราะ emulator สร้าง index ให้เองทุกครั้ง
