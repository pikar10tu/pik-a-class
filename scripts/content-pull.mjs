// ดึงเนื้อหาจาก Firestore production ลงมาอัปเดต docs/seeds (ฝั่ง production ชนะ)
// ใช้เมื่อมีคนแก้/เพิ่มเนื้อหาผ่านหน้า admin แล้วอยากให้ seed ใน git ตามทัน
//   npm run content:pull                       ดึงทุกฟิลด์เนื้อหา + เพิ่มข้อที่มีแต่บน production
//   npm run content:pull -- --fields=answerKey,isPreview   ดึงเฉพาะบางฟิลด์
//   npm run content:pull -- --ids=abc,def      ดึงเฉพาะบางเอกสาร
//   npm run content:pull -- --new              แค่เพิ่มข้อที่มีแต่บน production (ไม่แก้ของเดิม)
// ไม่เขียนอะไรลง Firestore · ดูผลด้วย git diff docs/seeds แล้วค่อย commit
//
// ลำดับที่ปลอดภัย: content:pull → แก้ seed → check:content → content:sync
// (ถ้ามีการแก้ seed ที่ยังไม่ได้ sync อยู่ ให้ใช้ --fields/--ids เพื่อไม่ให้ทับงานนั้น)
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { getAccessToken, listAll } from './lib/firestore-rest.mjs';

const SEED_DIR = 'docs/seeds';
const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]?.split(',');
const onlyFields = arg('fields');
const onlyIds = arg('ids') ? new Set(arg('ids')) : null;
const newOnly = process.argv.includes('--new');

const SYNC_FIELDS = {
  exercises: ['skill', 'level', 'type', 'prompt', 'choices', 'answerKey', 'rubric', 'tags',
    'visibility', 'isPreview', 'reviewStatus', 'source', 'sourceUrl'],
  stages: ['skill', 'level', 'order', 'title', 'tags', 'drawCount', 'passThreshold', 'isPreview', 'reviewStatus'],
};
const NEW_FILES = { exercises: 'from-production-exercises.json', stages: 'from-production-stages.json' };

const token = await getAccessToken();
const prod = {
  exercises: new Map((await listAll('exercises', token)).map((d) => [d.id, d])),
  stages: new Map((await listAll('stages', token)).map((d) => [d.id, d])),
};

const seen = new Set();
let changedItems = 0;
for (const file of readdirSync(SEED_DIR).filter((f) => f.endsWith('.json')).sort()) {
  const items = JSON.parse(readFileSync(`${SEED_DIR}/${file}`, 'utf8'));
  let dirty = false;
  for (const item of items) {
    const collection = 'drawCount' in item ? 'stages' : 'exercises';
    seen.add(item.id);
    const current = prod[collection].get(item.id);
    if (newOnly || !current || (onlyIds && !onlyIds.has(item.id))) continue;
    let touched = false;
    for (const f of SYNC_FIELDS[collection]) {
      if (onlyFields && !onlyFields.includes(f)) continue;
      if (JSON.stringify(current[f] ?? null) === JSON.stringify(item[f] ?? null)) continue;
      if (current[f] === undefined) delete item[f];
      else item[f] = current[f];
      touched = true;
    }
    if (touched) {
      changedItems++;
      dirty = true;
    }
  }
  if (dirty) writeFileSync(`${SEED_DIR}/${file}`, `${JSON.stringify(items, null, 2)}\n`);
}

// ข้อที่มีแต่บน production (ไม่ได้อยู่ใน seed ไฟล์ไหนเลย) → เก็บไว้ในไฟล์แยก
let added = 0;
if (!onlyIds && !onlyFields) {
  for (const collection of ['exercises', 'stages']) {
    const extra = [...prod[collection].values()].filter((d) => !seen.has(d.id) && !d.deletedAt);
    if (!extra.length) continue;
    const path = `${SEED_DIR}/${NEW_FILES[collection]}`;
    const existing = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : [];
    for (const d of extra) {
      const out = { id: d.id };
      for (const f of [...SYNC_FIELDS[collection], 'createdAt', 'updatedAt', 'createdBy']) if (d[f] !== undefined) out[f] = d[f];
      existing.push(out);
    }
    writeFileSync(path, `${JSON.stringify(existing, null, 2)}\n`);
    added += extra.length;
  }
}

console.log(`อัปเดตจาก production ${changedItems} รายการ · เพิ่มรายการที่มีแต่บน production ${added} รายการ`);
console.log('ตรวจความเปลี่ยนแปลงด้วย: git diff docs/seeds');
