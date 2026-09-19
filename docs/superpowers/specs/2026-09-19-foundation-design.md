# Foundation — Design Spec

> Sub-project แรกตาม `PLAN.md` section 15 ข้อ 1 (Build workflow) — บันทึกวันที่ 2026-09-19

## 1. ขอบเขต (Scope)

Foundation = ทำให้ **login (Google) → onboarding form (กรอกครั้งแรก) → dashboard เปล่า (มี layout/nav shell แล้ว)** ทำงานได้จริงบน GitHub Pages จริง เชื่อม Firebase project จริง พร้อม security rules ตั้งต้นที่บล็อกช่องโหว่ตาม `PLAN.md` ข้อ 12

**ยังไม่มี**ในขอบเขตนี้: เนื้อหาโจทย์/ด่าน/การบ้าน/มินิเกม, หน้า admin ที่ใช้งานได้จริง (มีแค่ placeholder ที่เข้าถึงได้เฉพาะ role=admin), visual style/mood direction (ยังไม่มีสเปก — ดูข้อ 10), automated Firestore rules test suite, LINE notification, `groupTags` UI

## 2. การตัดสินใจที่ยืนยันแล้ว (จาก PLAN.md section 14 + คำถามเพิ่มเติม)

จาก `PLAN.md` section 14 (สิ่งที่ควร confirm ก่อนเริ่มโค้ดจริง) — เฉพาะข้อที่บล็อก Foundation:

| ข้อ | เรื่อง | มติ |
|---|---|---|
| 14.1 | Security rules approach | ยืนยันตามร่าง section 12 — บล็อก `tier`/`role`/`totalStars`/`stageProgress` ตั้งแต่ต้น + login-gate การอ่านเนื้อหาทั้งหมด, ยอมรับความเสี่ยง client-side grading/`answerKey` ไว้ก่อนใน v1 |
| 14.3 | Wording ตัวเลือก dropdown ช่วงชั้น | ใช้ "วัยทำงาน/บุคคลทั่วไป" ตามร่างเดิม |
| 14.4 | field โรงเรียน/หน่วยงาน | **บังคับกรอกเฉพาะกลุ่มนักเรียน (ม.1–ม.6), optional สำหรับกลุ่มวัยทำงาน/บุคคลทั่วไป** — ต่างจากร่างเดิมที่จะให้ optional ทั้งหมด |
| 14.5 | `groupTags` แท็กอิสระ | กันสคีมาไว้เฉยๆ (`groupTags?: string[]`) ยังไม่ทำ UI กรอก/แก้ — รอถึง sub-project การบ้าน (ข้อ 7) |

ข้อ 14 อื่น (2, 6, 7, 8, 9) ไม่กระทบ Foundation — ตัดสินใจตอนถึง sub-project ที่เกี่ยวข้อง

**การตัดสินใจสถาปัตยกรรมเพิ่มเติม (ไม่อยู่ใน PLAN.md เดิม):**

| เรื่อง | มติ | เหตุผล |
|---|---|---|
| Build tooling | **Vite** | dev server/hot-reload, จัดการ env vars สะอาดกว่า vanilla ล้วน, deploy ผ่าน GitHub Actions build step |
| โครงสร้างหน้าจอ | **Multi-page** (ไฟล์ `.html` จริงต่อหน้าจอ) | ตรงกับหลักการ nav เรียบง่ายของ PLAN.md โดยตรง, back/refresh ทำงานถูกต้องโดยไม่ต้องเขียน router เอง |
| Firebase environment | **Project เดียว** (dev+prod) ใช้ Firebase Local Emulator Suite ตอนเทส | ขนาดโครงการตอนนี้ (คนเดียว) ไม่คุ้มจัดการ 2 project/2 config |
| Firestore region | **asia-southeast1 (Singapore)** | ใกล้ผู้ใช้ในไทยที่สุดใน region หลักของ Firestore — **เปลี่ยนทีหลังไม่ได้** |
| Styling | **Plain CSS + design tokens** (`tokens.css`) | ไม่ต้องเรียนรู้ framework เพิ่ม, คุมง่ายเมื่อ style จริงยังไม่นิ่ง (รอ visual direction — ข้อ 10) |
| Google Sign-In | **popup** (`signInWithPopup`) | ง่ายกว่า redirect, ความเสี่ยงถูกบล็อกต่ำเพราะ user กดปุ่มเอง ไม่ใช่ auto-trigger — สลับเป็น redirect ทีหลังได้โดยไม่กระทบโครงสร้างอื่น |

## 3. โครงสร้าง repo

```
pik-a-class/
  PLAN.md, README.md
  package.json, vite.config.js
  firebase.json, firestore.rules, firestore.indexes.json
  .env.example          (คีย์ตัวอย่าง, commit ได้)
  .env.local             (คีย์จริง, .gitignore)
  src/
    login.html      + login.js
    onboarding.html  + onboarding.js
    dashboard.html   + dashboard.js
    admin/
      index.html     (placeholder โล่งๆ, เข้าได้เฉพาะ role=admin)
    lib/
      firebase.js        // init app, export auth, db
      auth-guard.js       // requireLogin(), requireAdmin(), redirect helpers
      user-profile.js     // getUserDoc(), createUserDoc(), isOnboarded()
    styles/
      tokens.css    // สี/spacing/font เป็น CSS custom properties
      base.css
  .github/workflows/deploy.yml
```

Vite multi-page config ชี้ entry เป็นแต่ละ `.html` ใน `src/` — build ออกมาเป็น static files ธรรมดา deploy ขึ้น GitHub Pages ได้ตรงๆ

## 4. Firebase setup

- 1 project ใหม่ (ตั้งชื่อตอนสร้างจริง เช่น `pik-a-class`)
- เปิด **Authentication → Google provider** อย่างเดียวพอ
- สร้าง **Firestore (production mode)** ที่ region **asia-southeast1**
- ยังไม่เปิด Firebase Hosting — deploy จริงผ่าน GitHub Pages, Firebase ใช้แค่ Auth + Firestore

## 5. Auth + Onboarding flow

```
login.html → กดปุ่ม "เข้าสู่ระบบด้วย Google" → signInWithPopup
  → เช็ค users/{uid} ผ่าน auth-guard.js
    → ไม่มี doc / onboardingComplete=false → onboarding.html
    → onboardingComplete=true → dashboard.html
onboarding.html → กรอกฟอร์ม → submit → update users/{uid} (onboardingComplete:true + ข้อมูลฟอร์ม) → dashboard.html
dashboard.html / admin/* → auth-guard เช็ค login ทุกครั้งที่โหลดหน้า (ไม่ login → เด้งกลับ login.html)
```

หลัง sign-in สำเร็จทุกครั้ง เช็ค `users/{uid}` doc: ถ้ายังไม่มี doc → เขียน stub เอกสาร (`uid, email, role:"student", tier:"free", onboardingComplete:false, createdAt`) แล้ว redirect ไป onboarding; ถ้ามี doc แล้วแต่ `onboardingComplete` ไม่ true → redirect ไป onboarding เหมือนกัน (กันเคสกรอกฟอร์มไม่จบกลางคัน)

**Admin bootstrap:** ปิ๊กแก้ `role: "admin"` เองตรงๆ ใน Firebase Console ครั้งเดียวหลังสมัครบัญชีตัวเองเสร็จ ไม่ต้องมี UI สมัคร admin (ตาม PLAN.md ข้อ 15.2)

## 6. Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    function lockedFieldsUnchanged() {
      return request.resource.data.get('role', null) == resource.data.get('role', null) &&
        request.resource.data.get('tier', null) == resource.data.get('tier', null) &&
        request.resource.data.get('totalStars', null) == resource.data.get('totalStars', null) &&
        request.resource.data.get('stageProgress', null) == resource.data.get('stageProgress', null);
    }

    match /users/{uid} {
      allow read: if request.auth != null && (request.auth.uid == uid || isAdmin());

      allow create: if request.auth != null && request.auth.uid == uid &&
        request.resource.data.role == "student" &&
        request.resource.data.tier == "free" &&
        !('totalStars' in request.resource.data) &&
        !('stageProgress' in request.resource.data);

      allow update: if request.auth != null &&
        ((request.auth.uid == uid && lockedFieldsUnchanged()) || isAdmin());
    }

    // ปิดทุกอย่างอื่นไว้ก่อน — sub-project ถัดไปค่อยเปิด rule เฉพาะ collection ตอนสร้างจริง (exercises, stages, ...)
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

ตรงตามข้อ 12: user แก้ `role`/`tier`/`totalStars`/`stageProgress` ตัวเองไม่ได้ (ต้อง admin เท่านั้น), field อื่นแก้ได้ปกติ, ต้อง login เสมอถึงจะอ่าน/เขียน

**แก้ไข (พบระหว่าง code review ของ Task 12):** เดิม `allow create` เช็คแค่ `role`/`tier` แต่ไม่ได้ห้ามใส่ `totalStars`/`stageProgress` ตอนสร้างเอกสารใหม่ — ผู้ใช้เรียก `setDoc` ตรงๆ ได้และปลอมค่า 2 field นี้ตั้งแต่ตอนสมัครได้เลย ทั้งที่ตั้งใจให้แก้ได้เฉพาะ admin เพิ่มเงื่อนไข `!('totalStars' in request.resource.data) && !('stageProgress' in request.resource.data)` เข้าไปใน `allow create` เพื่อปิดช่องนี้ (เอกสาร stub ตอนสมัครจริงตาม `buildNewUserDoc` ก็ไม่มี 2 field นี้อยู่แล้ว จึงไม่กระทบ flow ปกติ)

**แก้ไข (พบระหว่างทดสอบจริงด้วย Firebase emulator, Task 12):** `lockedFieldsUnchanged()` เดิมเขียน `locked.hasAny(request.resource.data.diff(resource.data).affectedKeys())` ซึ่งเป็น type error ในภาษา Firestore rules จริง — ยืนยันจาก error ตรงๆ ตอนรัน emulator: `Unsupported operation error. Received: list.hasAny(set). Expected: list.hasAny(list)` เมื่อ rule function evaluate error จะถูกตีเป็น `false` (deny) เสมอ ผลคือ **`allow update` ปฏิเสธการแก้ไขทุกกรณีของเจ้าของเอกสารเอง แม้แต่ field ธรรมดาอย่าง `nickname`** — กระทบ flow onboarding จริงทั้งหมด (เพราะ `completeOnboarding()` เรียก `updateDoc` แล้วจะโดนบล็อกเสมอ)

ลองสลับด้านเป็น `affectedKeys().hasAny(locked)` แล้วก็ยัง error เดิมทุกประการ (ยืนยันด้วย emulator ว่า `.hasAny()` บน `set` ที่ได้จาก `affectedKeys()` ใช้ไม่ได้เลยไม่ว่าจะส่ง list ตัวแปรหรือ literal เข้าไปก็ตาม ในเอ็นจิ้น rules เวอร์ชันนี้) จึงเปลี่ยนวิธีทั้งหมดเป็นเทียบค่าทีละ field ตรงๆ ด้วย `.get(field, null)` (รูปแบบนี้ไม่พึ่ง `affectedKeys()/hasAny()` เลย จึงชัวร์กว่า) ทดสอบผ่านครบทั้ง 5 เคสบน emulator แล้ว: บล็อก `create` ที่แอบใส่ `totalStars`, อนุญาต `create` เอกสาร stub ปกติ, บล็อก `read` ข้ามคน, บล็อก `update` ที่แก้ `tier`, และอนุญาต `update` ที่แก้ `nickname`

**บันทึกเพิ่มเติม:** ระหว่างดีบัก เจอด้วยว่า local emulator มี bug เรื่อง hot-reload — log ขึ้นว่า "Rules updated" แต่บางครั้งยังรันไฟล์เก่าอยู่จริง ต้อง restart emulator process ใหม่ทั้งตัวถึงจะ compile rules ที่แก้ล่าสุดจริงๆ (ไม่ใช่บั๊กของโค้ดเรา แต่เป็นพฤติกรรมของ Firebase CLI/emulator เวอร์ชันที่ใช้ตอนนี้ — ควรจำไว้เวลาแก้ rules แล้วเทสไม่ผ่านทั้งที่โค้ดถูกแล้ว)

## 7. Data model (เฉพาะที่ Foundation แตะ)

```
users/{uid}
  uid, email, fullName, nickname
  grade: "ม.1".."ม.6" | "วัยทำงาน/บุคคลทั่วไป"
  school?           // required ถ้า grade เป็นกลุ่มนักเรียน, optional ถ้าเป็นวัยทำงาน
  phone, lineId
  role: "student"   // ค่าเริ่มต้นเสมอ, เปลี่ยนเป็น admin ผ่าน console เท่านั้น
  tier: "free"
  groupTags?: string[]      // กันสคีมาไว้ ยังไม่มี UI กรอก
  onboardingComplete: bool  // field ใหม่ที่เพิ่มจาก PLAN.md เดิม เพื่อกันเคสกรอกฟอร์มค้าง
  createdAt
```

field อื่นในสเปกเต็ม (`stageProgress`, `streak`, `totalStars`) จะถูกเพิ่มตอน sub-project ที่ใช้งานจริงเท่านั้น (YAGNI — ไม่สร้าง field ที่ยังไม่มีใครอ่าน/เขียน)

## 8. Deployment

- `.github/workflows/deploy.yml` — push เข้า `main` → `npm ci && npm run build` → deploy `dist/` ไป GitHub Pages (ใช้ `actions/deploy-pages`)
- Firebase web config (apiKey ฯลฯ) ไม่ใช่ความลับตามเอกสาร Firebase เอง (ความปลอดภัยอยู่ที่ security rules ไม่ใช่การซ่อนคีย์) — แต่ยังเก็บเป็น env var ผ่าน GitHub Actions secrets เพื่อไม่ hardcode ในซอร์ส จะได้สลับ project ง่ายถ้าจำเป็น

## 9. Testing approach (เฉพาะ Foundation)

Manual เท่านั้นในขั้นนี้: รัน Firebase emulator (`firebase emulators:start`) เทส flow login → onboarding → dashboard และเทส rules ด้วยมือ (ลอง edit `tier` เป็น user ธรรมดาแล้วดูว่าถูกบล็อกจริง) — automated rules test suite แบบเป็นระบบทำตามที่ PLAN.md วางไว้ใน **ข้อ 15.11** (ตอนรู้ query จริงทั้งหมดของแอปแล้ว)

## 10. หมายเหตุ: Visual style / mood direction ยังไม่มีสเปก

commit `5829ea6` ในประวัติ git ชื่อ "Add visual style / mood direction" แต่ diff จริงมีเนื้อหาซ้ำกับ commit ก่อนหน้า (grammar notes + taxonomy) — ไม่มีเนื้อหาเรื่อง visual/mood อยู่ใน `PLAN.md` จริง (commit message น่าจะพิมพ์ผิด) ไม่กระทบ Foundation เพราะยังไม่ต้องมี UI สวยงามสมบูรณ์ แต่ควร brainstorm แยกเป็นหัวข้อของตัวเองก่อนเริ่ม sub-project ที่แตะ UI จริงจัง (build workflow ข้อ 3 เป็นต้นไป)

## 11. Out of scope (เจตนา ไม่ทำใน Foundation)

โจทย์/ด่าน/การบ้าน/มินิเกม, หน้า admin ที่ใช้งานได้จริง (มีแค่ placeholder), visual style/mood (ดูข้อ 10), automated rules tests, LINE notification, `groupTags` UI
