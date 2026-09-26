# เปลี่ยนหน้าทันทีแบบแอปมือถือ (Instant page navigation) — Design

**วันที่:** 2026-09-26
**สถานะ:** ตกลงกับปิ๊กครบแล้ว รอเขียนแผน
**ขอบเขต:** หน้านักเรียน 6 หน้า + การเปิดแอป + skeleton ไม่รวมหน้า admin, หน้าเล่นด่าน, คู่มือไวยากรณ์ และไม่เปลี่ยนเป็น SPA

## 1. ปัญหา

ปิ๊กรายงานว่า "บางทียังหน่วงๆ ตอนเปลี่ยนหน้า" วัดจริงบน Chrome เดสก์ท็อป (เน็ตบ้าน, ไป-กลับ ~65ms, ล็อกอินแล้ว, SW cache อุ่นแล้ว) เมื่อ 2026-09-26:

| หน้า | หน้าเว็บขึ้นจอ (FCP) | Auth พร้อม (`accounts:lookup` จบ) | Firestore ตอบครบ |
|---|---|---|---|
| หน้าหลัก | 0.20s | 0.72s | ~1.30s |
| ตะลุยด่าน | 0.14s | 0.52s | ~1.34s (LCP 1.29s) |
| คลังคำศัพท์ | 0.23s | 0.54s | ~1.24s |
| Animal Cafe | 0.21s | 0.56s | ~1.02s |
| โปรไฟล์ | 0.23s | 0.53s | ~1.18s |
| คู่มือไวยากรณ์ | 0.24s | — | — |

JS ทุกไฟล์มาจาก Service Worker (transfer 0) ไฟล์ไม่ใช่ปัญหา **ปัญหาคือสายรอเครือข่ายต่อกันทุกหน้า:**

```
FCP 0.2s → Firebase Auth ยิง accounts:lookup (~0.4s) → Firestore เปิด WebChannel ไป-กลับ 4–5 รอบต่อกัน (~0.5s) → render
```

บน 4G (ไป-กลับ 150–300ms) ประมาณว่าเป็น 2.5–4 วินาทีต่อหน้า (ประมาณการ ยังไม่ได้วัดบนมือถือ)

**การเปิดแอปแย่กว่า:** `index.html` → meta refresh → `login.html` (รอ Firebase รอบหนึ่ง) → `dashboard.html` (รอ Firebase อีกรอบ) รวม ~2.5s+ บนเน็ตบ้าน

### 1.1 ข้อเท็จจริงจาก source ของ Firebase ที่กำหนดทางแก้

- **Auth ยิง `accounts:lookup` ทุกครั้งที่ init** (`AuthImpl.initializeCurrentUser` → `reloadAndSetCurrentUserOrClear` → `_reloadWithoutSaving`) ปิดไม่ได้ และ MPA ต้อง init ใหม่ทุกหน้า
- **Firestore รอ Auth ก่อนทำงานทุกอย่าง แม้แต่อ่าน cache** (`FirebaseAuthCredentialsProvider.start` → `awaitNextToken`) เพราะ persistent cache แยกตาม user ดังนั้น `getDocFromCache` **ไม่ช่วย** ยังต้องรอ ~0.5s

⇒ จะให้หน้าขึ้นทันทีได้ แอปต้องเก็บข้อมูลที่ใช้แสดงผลเอง นอก Firebase

## 2. การตัดสินใจ และทางที่ไม่เลือก

- **แต่ละหน้าจำภาพล่าสุดของตัวเอง (render จาก cache → โหลดจริง → render ซ้ำถ้าต่าง) — เลือก** ควบคุมได้ว่าเก็บอะไร เล็ก ทดสอบได้ ทำทีละหน้าได้
- **ใส่ cache ที่ชั้น fetch แล้วเรียก callback หน้าซ้ำ — ไม่เลือก** callback `requireLogin` ปัจจุบันผูก event ปนกับวาดจอ เรียกสองรอบจะเกิดบั๊กผูกซ้ำ และต้องเก็บ submissions ดิบก้อนใหญ่
- **เปลี่ยนเป็น SPA — เลื่อนไว้ก่อน** ประมาณ 4–6 รอบงาน เสี่ยงสูง (CSS ชนกัน, ต้องเก็บกวาด timer/เสียง/listener เอง, โค้ด top-level ทุกหน้า, routing บน GitHub Pages) ได้ผลเหนือกว่าทางที่เลือกเฉพาะ "เปิดหน้าครั้งแรกที่ยังไม่มี cache" การแยก `render`/`load` ในงานนี้เป็นขั้นแรกของ SPA อยู่แล้ว ถ้าวัดบนมือถือจริงแล้วยังไม่พอค่อยกลับมาคุย
- **Cache ขอบเขต: ทั้งโปรไฟล์และข้อมูลเฉพาะหน้า** (ปิ๊กเลือก ข) ไม่ใช่แค่โปรไฟล์
- **หลังบันทึกข้อมูล: อัปเดต cache ทันที (write-through)** (ปิ๊กเลือก 1) ไม่ใช่ล้าง cache และไม่ใช่ปล่อยให้เห็นข้อมูลเก่า เพราะเส้นทาง เล่นจบ → เส้นทางด่าน ใช้บ่อยที่สุด ต้องเห็นด่านใหม่ปลดล็อกทันที
- **Skeleton: กล่องเทาวิบวับเรียบๆ** (ปิ๊กเลือก 1) ไม่ใส่ mascot

## 3. ส่วนประกอบ

### 3.1 `src/lib/local-cache.js` (ใหม่)

ตัวห่อ localStorage ใช้ร่วมทุกหน้า รับ `storage` แบบ inject ได้เพื่อทดสอบ (แบบเดียวกับ `vocab-favorites.js`)

- key รูปแบบ `pik_cache_v1:<uid>:<name>` เปลี่ยน `v1` เมื่อรูปข้อมูลเปลี่ยน → cache เก่าไม่ถูกอ่าน และถูกลบตอน `clearAll`
- ค่าเก็บเป็น `{ savedAt, data }` อ่านแล้วถ้า `now - savedAt > 7 วัน` คืน `null`
- key พิเศษ `pik_cache_v1:session` = `{ uid, displayName, userDoc, savedAt }` (ไม่ผูก uid ใน key เพราะต้องอ่านก่อนรู้ uid)
- ทุก read/write ห่อ try/catch — JSON เสีย, storage ถูกบล็อก, quota เต็ม ⇒ ทำเหมือนไม่มี cache ไม่ throw
- API:
  - `readSession()` / `writeSession({ uid, displayName, userDoc })`
  - `readCache(uid, name)` / `writeCache(uid, name, data)` / `removeCache(uid, name)`
  - `clearAll()` — ลบทุก key ที่ขึ้นต้น `pik_cache_` (รวมเวอร์ชันเก่า)
- ชื่อ cache ที่ใช้: `clears`, `stages:<skill|*>:<level|*>:<tier>`, `overview`

### 3.2 `src/lib/auth-guard.js`

```js
requireLogin(onReady, { onCached } = {})
```

1. ถ้ามี `onCached` และ `readSession()` คืน session ที่ `userDoc.onboardingComplete === true` ⇒ เรียก `onCached({ uid, displayName }, userDoc)` ทันที (synchronous ก่อนรอ Firebase)
2. `onAuthStateChanged`:
   - ไม่มี user ⇒ `clearAll()` แล้วไปหน้า login (เหมือนเดิม + ล้าง cache)
   - uid ≠ session.uid ⇒ `clearAll()` ก่อนทำต่อ
   - `fetchUserDoc` สำเร็จ ⇒ `writeSession(...)` แล้ว `onReady(firebaseUser, userDoc)`
   - `fetchUserDoc` ล้มเหลว **และ** เคยเรียก `onCached` ไปแล้ว ⇒ คงหน้าจอเดิม `console.error` ไม่เด้ง login (ทำงานแบบออฟไลน์ได้) / ไม่เคยเรียก ⇒ ไปหน้า login เหมือนเดิม
3. หน้าที่ไม่ส่ง `onCached` ทำงานเหมือนเดิมทุกอย่าง (แต่ยังได้ `writeSession` และการล้าง cache)
4. `requireAdmin` ไม่รับ `onCached` — รอ server เสมอ

**ออกจากระบบ:** `dashboard.js` เรียก `clearAll()` ก่อน `signOut(auth)`

### 3.3 รูปแบบของแต่ละหน้า

```js
bindEventsOnce();                          // delegation บน container ครั้งเดียว
let shown = null;
requireLogin(async (user, userDoc) => {
  const model = await load(user, userDoc); // server
  if (!sameModel(model, shown)) render(model);
  shown = model;
  saveToCache(user.uid, model);            // หรือเก็บชิ้นข้อมูลดิบที่ใช้ร่วม
}, {
  onCached(user, userDoc) {
    const model = modelFromCache(user.uid, userDoc);
    if (model) { render(model); shown = model; }
  },
});
```

- `render(model)` แทนที่เนื้อหา container ทั้งก้อน (รวมกล่อง skeleton) เรียกซ้ำได้
- การประกอบ model แยกเป็น pure function ใน `src/lib/` เพื่อทดสอบ
- `sameModel` = เทียบ `JSON.stringify` ของ model — ถ้าเหมือนไม่วาดใหม่ จอไม่กระพริบ

| หน้า | ใช้ cache | เก็บอะไร |
|---|---|---|
| หน้าหลัก (`dashboard.js`) | session + `overview` | ผล `calculateStudentOverview` (ตัวเลข) ไม่เก็บ submissions ดิบ |
| ตะลุยด่าน (`learn/index.js`) | session + `stages:*` + `clears` | รายการด่านตาม tier/allowedLevels |
| เส้นทางด่าน (`learn/path.js`) | session + `stages:<skill>:<level>` + `clears` | |
| คลังคำศัพท์ (`vocab/hub.js`) | session + `clears` + คำโปรด (`pik_fav_vocab_<uid>` เดิม) | |
| Animal Cafe (`vocab/cafe.js`) | session + `clears` | เฉพาะเมนูก่อนเริ่มเกม ตัวเกมไม่เกี่ยว |
| โปรไฟล์ (`profile.js`) | session + `overview` + คำโปรด | |

`learn/path.js` กรณีลิงก์ไม่ถูกต้อง (`!isValidQuery`) ไม่ใช้ `onCached`

### 3.4 Write-through (อัปเดต cache ตอนบันทึก)

| จุดบันทึก | อัปเดต cache |
|---|---|
| `saveStageResult` (`stage-result-io.js`) หลัง batch commit สำเร็จ | แทน/เพิ่ม `writes.stageClear.data` ลง `clears` (จับคู่ด้วย `stageId`) และ `removeCache(uid, 'overview')` |
| `cafe.js` บันทึก `speedCafeStats` | อัปเดต `session.userDoc.speedCafeStats` |
| `cafe.js` `saveVocabSessionResults` | `removeCache(uid, 'overview')` |
| `profile.js` บันทึกโปรไฟล์ (`setDoc` merge) | merge payload เข้า `session.userDoc` |
| `onboarding.js` จบ onboarding | `writeSession` ด้วย userDoc ใหม่ |
| คำโปรด | ใช้ของเดิมใน `vocab-favorites.js` |

อัปเดตหลังเขียน server สำเร็จเท่านั้น ถ้าเขียนล้มเหลว cache ไม่เปลี่ยน

### 3.5 เปิดแอปเร็วขึ้น

- `index.html`: สคริปต์ inline สั้นๆ ก่อน meta refresh — `readSession` แบบย่อ (อ่าน key `pik_cache_v1:session`, parse, เช็คอายุ ≤ 7 วัน และ `onboardingComplete`) ถ้าผ่าน ⇒ `location.replace('./dashboard.html')` ไม่ผ่าน/throw ⇒ ปล่อย meta refresh ไป `login.html` เหมือนเดิม
  - ต้องไม่ import module (หน้า index ไม่มี JS bundle) ค่า key และอายุต้องตรงกับ `local-cache.js` — ใส่ test ที่อ่าน `src/index.html` แล้วยืนยันว่าชื่อ key ตรงกับค่าคงที่ใน `local-cache.js`
- `login.js`: ตอนโหลดหน้า ถ้ามี session ที่ onboarding แล้ว ⇒ `location.replace('./dashboard.html')` ทันที ไม่รอ `onAuthStateChanged` (dashboard ตรวจ Auth ต่อเอง ถ้าไม่ผ่านจะล้าง cache และเด้งกลับ login — ไม่วนเพราะ cache ถูกล้างแล้ว)

### 3.6 Skeleton

- `base.css`: `.skeleton` (พื้นเทาอ่อนจาก token, มุมโค้ง, แอนิเมชัน shimmer) และ `.skeleton-text`, `.skeleton-card` ตามรูปทรงที่ใช้ `@media (prefers-reduced-motion: reduce)` ปิดแอนิเมชัน
- HTML ของ 6 หน้า: ใส่กล่อง skeleton ใน container ที่ `render` จะแทนที่ ขนาดใกล้ของจริงเพื่อไม่ให้หน้ากระโดด (CLS)
- ลบข้อความ "กำลังโหลด…" เดิม (`#loading-note`, `#user-pill`, `#hero-display-name`, ข้อความในโปรไฟล์) — แทนด้วย skeleton
- skeleton ใส่ `aria-hidden="true"` และ container ใส่ `aria-busy="true"` จนกว่า render ครั้งแรก

## 4. ความปลอดภัย

- cache ไม่ให้สิทธิ์เพิ่ม สิทธิ์จริงอยู่ที่ Firestore rules แก้ localStorage ได้แค่จอเพี้ยนในเครื่องตัวเอง
- ปุ่มแอดมินอาจโผล่จาก cache ก่อน แต่หน้า admin ใช้ `requireAdmin` ที่รอ server เสมอ ถ้า `onReady` บอกว่าไม่ใช่แอดมิน ให้ซ่อนปุ่มกลับ (`render` ต้องตั้ง `hidden` ทั้งสองทาง ไม่ใช่แค่เปิด)
- เครื่องใช้ร่วม: ล้าง cache ตอนออกจากระบบ, ตอน Auth ไม่มี user, ตอน uid ไม่ตรง
- ข้อความที่ผู้ใช้กรอก (ชื่อเล่น, ชื่อเรียก) จาก cache ยังใส่ด้วย `textContent` เท่านั้น

## 5. การทดสอบ

Vitest (jsdom):

- `local-cache.test.js` — แยก uid, หมดอายุ 7 วัน, เปลี่ยนเวอร์ชันแล้วไม่อ่านของเก่า, JSON เสีย, storage throw ตอน get/set, `clearAll` ลบเฉพาะ `pik_cache_*` (ไม่ลบ `pik_fav_vocab_*` และ prefs เสียง)
- `auth-guard.test.js` (mock `onAuthStateChanged` + `fetchUserDoc`) — `onCached` ก่อน `onReady`; ไม่มี session ⇒ ไม่เรียก `onCached`; session ยังไม่ onboarding ⇒ ไม่เรียก; uid ไม่ตรง ⇒ ล้าง; ไม่มี user ⇒ ล้าง + redirect; fetch ล้มเหลวหลัง `onCached` ⇒ ไม่ redirect; ไม่ส่ง `onCached` ⇒ พฤติกรรมเดิม
- write-through ของ `saveStageResult` — `clears` มีรายการใหม่/แทนของเดิม, `overview` ถูกลบ, commit ล้มเหลว ⇒ cache ไม่เปลี่ยน
- ฟังก์ชันประกอบ model ของแต่ละหน้า (pure)
- key ใน `index.html` ตรงกับ `local-cache.js`

ก่อนจบ: `npm test`, `npm run build`, `npm run check:vocab`, `npm run check:content` ผ่าน

## 6. วัดผล

สคริปต์เดิม (Navigation/Resource/LCP timing ผ่าน Claude in Chrome) วัดทุกหน้าหลัง deploy เทียบกับตาราง §1

- หน้าที่เคยเข้าแล้ว: เนื้อหาหลักขึ้นภายใน **0.3s** (จาก 1.0–1.3s)
- เปิดแอป (`/pik-a-class/`) ถึงเห็นหน้าหลักพร้อมชื่อ: ภายใน **0.5s** เมื่อมี session (จาก ~2.5s+)
- ปิ๊กลองบนมือถือจริง 1 รอบ แล้วตัดสินใจเรื่อง SPA จากผลนั้น

## 7. ลำดับลงมือ (แต่ละช่วง deploy ได้เอง)

1. `local-cache.js`, `auth-guard.js`, ล้าง cache ตอนออกจากระบบ, `index.html`/`login.js` เปิดแอปเร็ว, `.skeleton` CSS
2. หน้าหลัก, ตะลุยด่าน, เส้นทางด่าน + write-through ของ `saveStageResult` และ onboarding
3. คลังคำศัพท์, Cafe, โปรไฟล์ + write-through ของ Cafe และโปรไฟล์

## 8. นอกขอบเขต

- หน้าเล่นด่าน (`learn/play.js`) ยังดึงโจทย์สดทุกครั้ง (ต้องสุ่มใหม่) — แค่เพิ่ม write-through
- หน้า admin ทั้งหมด, คู่มือไวยากรณ์ (เร็วอยู่แล้ว), หน้า login ส่วนปุ่มล็อกอิน
- Google Fonts runtime caching, แยก chunk `vocab-items` ออกจากหน้าโปรไฟล์, Firestore single-tab manager — เป็นงานแยกถ้าวัดแล้วยังจำเป็น
- เปลี่ยนเป็น SPA
