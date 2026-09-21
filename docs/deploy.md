# การ deploy (เว็บ + Firestore rules + indexes)

> **ต้องทำตอนนี้:** repository secret `FIREBASE_SERVICE_ACCOUNT` ยังไม่ได้ตั้ง จึงทำให้ job `firestore`
> ใน CI **ล้มเหลว (FAIL) ทุกครั้งที่ push เข้า `main`** — ตั้งใจให้เป็นแบบนี้ เพราะ CI ที่ขึ้นเขียวทั้งที่
> rules/index ไม่ได้ขึ้นจริงคือบั๊กที่เคยเกิดมาแล้ว **แต่ job `deploy` (เว็บ) ยังรันต่อและปล่อยเว็บตามปกติ**
> เมื่อสาเหตุที่ `firestore` แดงคือ secret ยังไม่มี (ไม่ใช่ `firebase deploy` รันแล้วพังจริง) — เห็น run
> สีแดงแล้วอย่าเข้าใจว่าเว็บติดค้างไม่ออก มันไม่ค้าง แค่ rules/index ยังต้องรันมือ (ดูด้านล่าง)
> วิธีแก้ถาวร: ตั้ง secret ตามหัวข้อ "ทำให้อัตโนมัติ" ด้านล่าง หรือจะรันมือไปพลาง ๆ ก่อนก็ได้ (หัวข้อถัดไป)

การ deploy มี **สองฝั่ง** และทั้งสองฝั่งต้องขึ้นพร้อมกันเสมอ โดย **Firestore ต้องขึ้นก่อนเว็บเสมอเมื่อ
Firestore deploy ได้จริง** (ไม่ใช่รันขนานกัน — job `deploy` ของเว็บรอ job `firestore` เสร็จก่อนเริ่ม):

| ฝั่ง | สิ่งที่ขึ้น | ใครทำ |
| --- | --- | --- |
| Firestore | `firestore.rules` + `firestore.indexes.json` | job `firestore` (รันหลัง `build`, ก่อน `deploy`) ถ้ามี secret ไม่งั้น job นี้ **FAIL** ต้อง **รันมือ** ตามด้านล่าง |
| GitHub Pages | ไฟล์เว็บใน `dist/` | อัตโนมัติ — job `build` → `firestore` → `deploy` ใน `.github/workflows/deploy.yml` |

**สองแบบของ "firestore ล้มเหลว" ที่ job `deploy` แยกออกจากกัน (ดู `if:` ของ job `deploy` ใน
`.github/workflows/deploy.yml`):**

- **secret ยังไม่มี** (ช่องโหว่โครงสร้างที่รู้อยู่แล้ว มีทางแก้แบบรันมือ) — `firestore` แดง แต่ `deploy`
  (เว็บ) **รันต่อตามปกติ ไม่ถูกบล็อก** เพราะบล็อกเว็บทั้งเว็บไว้ไม่ได้ป้องกันอะไรเพิ่ม ในเมื่อทางแก้คือ
  รันมืออยู่แล้ว
- **secret มีแต่ `npx firebase deploy` รันแล้วพังจริง** (เช่น credential หมดอายุ, project id ผิด) —
  ของพังจริง `deploy` (เว็บ) **ถูกบล็อกไว้เหมือนเดิม** จนกว่าจะแก้ `firestore` ให้ผ่าน

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
repository secret ชื่อ **`FIREBASE_SERVICE_ACCOUNT`** ถ้ายังไม่มี job นี้จะ **FAIL** (error
"Firestore rules/indexes NOT deployed" พร้อมลิงก์กลับมาที่เอกสารนี้และคำสั่งรันมือ) — ไม่ใช่แค่เตือนแล้วผ่านเหมือนเดิม
เพราะ CI เขียวทั้งที่ rules/index ไม่ได้ขึ้นจริงคือสถานะที่หลอกคนอ่าน **แต่ job `deploy` (เว็บ) ยังรันต่อ
ตามปกติ** เมื่อสาเหตุคือ secret ไม่มี (ไม่บล็อกเว็บทั้งเว็บเพื่อรอ secret ที่อาจใช้เวลาหลายวันกว่าจะได้จาก
Firebase console) — แปลว่าจนกว่าจะตั้ง secret นี้ จะต้องรันมือตามด้านบนทุกครั้งที่แก้ `firestore.rules`
หรือ `firestore.indexes.json`, **เว็บจะ deploy ต่อไปเรื่อย ๆ โดยไม่รอ** ส่วนถ้า secret มีอยู่แล้วแต่
`firebase deploy` เองพังจริง (ไม่ใช่เพราะ secret หาย) กรณีนั้น `deploy` (เว็บ) จะถูกบล็อกไว้ เพราะเป็น
สัญญาณว่ามีอะไรพังจริงที่ต้องแก้ก่อน ไม่ใช่ช่องโหว่ที่รู้อยู่แล้ว

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
