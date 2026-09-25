// ซิงก์เนื้อหาจาก docs/seeds/*.json ขึ้น Firestore production
//   npm run content:sync              ดูอย่างเดียว (dry-run) ว่าจะสร้าง/แก้อะไรบ้าง — ไม่เขียนอะไร
//   npm run content:sync -- --apply   เขียนจริง
//   เพิ่ม --verbose เพื่อดูทุกรายการที่ต่าง
//
// กติกา:
//   - ทุกรายการใน seed ต้องมี "id" = document ID บน Firestore (ห้ามเปลี่ยน id ของรายการเดิม)
//     รายการใหม่ให้ตั้ง id ใหม่เอง (เช่น "b1-pp-021") หรือรัน check:content แล้วดูคำแนะนำ
//   - อัปเดตเฉพาะฟิลด์เนื้อหา (SYNC_FIELDS) ฟิลด์อื่น เช่น createdAt/reviewNotes บน production ไม่ถูกแตะ
//   - ไม่ลบเอกสารใดๆ ทั้งสิ้น — ถ้าจะเลิกใช้ข้อไหน ให้ตั้ง "reviewStatus": "draft" ใน seed แล้ว sync
//   - ก่อนเขียนจะจำลองผลลัพธ์ ถ้าทำให้ด่านไหนมีข้อไม่พอ drawCount จะไม่ยอมเขียน
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { getAccessToken, listAll, patchDoc } from './lib/firestore-rest.mjs';
import { contentHash } from '../src/lib/schema/content-checks.js';
import { matchesStagePool } from '../src/lib/stage-pool.js';

const SEED_DIR = 'docs/seeds';
const APPLY = process.argv.includes('--apply');
const VERBOSE = process.argv.includes('--verbose');

const SYNC_FIELDS = {
  exercises: ['skill', 'level', 'type', 'prompt', 'choices', 'answerKey', 'rubric', 'tags',
    'visibility', 'isPreview', 'reviewStatus', 'source', 'sourceUrl'],
  stages: ['skill', 'level', 'order', 'title', 'tags', 'drawCount', 'passThreshold', 'isPreview', 'reviewStatus'],
};
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
const short = (v) => {
  const s = JSON.stringify(v);
  return s && s.length > 60 ? `${s.slice(0, 57)}...` : s;
};

// 1. ตรวจไฟล์ก่อน — ไม่ผ่านไม่ sync
try {
  execFileSync(process.execPath, ['scripts/check-content.mjs'], { stdio: 'pipe' });
} catch (error) {
  console.error(error.stdout?.toString() ?? error.message);
  console.error('❌ npm run check:content ไม่ผ่าน — แก้ไฟล์ก่อนแล้วค่อย sync');
  process.exit(1);
}

// 2. โหลด seed
const seeds = { exercises: [], stages: [] };
for (const file of readdirSync(SEED_DIR).filter((f) => f.endsWith('.json')).sort()) {
  for (const item of JSON.parse(readFileSync(`${SEED_DIR}/${file}`, 'utf8'))) {
    if (!item.id) {
      console.error(`❌ ${file}: มีรายการที่ไม่มี "id" — ${item.prompt ?? item.title}`);
      process.exit(1);
    }
    seeds['drawCount' in item ? 'stages' : 'exercises'].push({ ...item, _file: file });
  }
}

// 3. เทียบกับ production
const token = await getAccessToken();
const prod = {
  exercises: new Map((await listAll('exercises', token)).map((d) => [d.id, d])),
  stages: new Map((await listAll('stages', token)).map((d) => [d.id, d])),
};

const now = new Date().toISOString();
const plan = [];
for (const collection of ['exercises', 'stages']) {
  for (const seed of seeds[collection]) {
    const { id, _file, ...item } = seed;
    const current = prod[collection].get(id);
    const fields = SYNC_FIELDS[collection];
    if (!current) {
      const data = { ...item, contentHash: contentHash(item), createdAt: item.createdAt ?? now, updatedAt: now };
      if (collection === 'exercises') {
        data.visibility = item.visibility ?? 'bank';
        data.assignedUids = item.assignedUids ?? [];
      }
      plan.push({ kind: 'create', collection, id, file: _file, data, deleteFields: [], changes: [] });
      continue;
    }
    const data = {};
    const deleteFields = [];
    const changes = [];
    for (const f of fields) {
      if (f in item) {
        if (!same(item[f], current[f])) {
          data[f] = item[f];
          changes.push(`${f}: ${short(current[f])} → ${short(item[f])}`);
        }
      } else if (current[f] !== undefined) {
        deleteFields.push(f);
        changes.push(`${f}: ${short(current[f])} → (ลบ)`);
      }
    }
    if (changes.length) {
      data.contentHash = contentHash(item);
      data.updatedAt = now;
      plan.push({ kind: 'update', collection, id, file: _file, data, deleteFields, changes });
    }
  }
}

// 4. จำลองผลหลัง sync แล้วตรวจว่าทุกด่านยังมีข้อพอ
const after = {};
for (const collection of ['exercises', 'stages']) {
  after[collection] = new Map([...prod[collection]].map(([id, d]) => [id, { ...d }]));
  for (const p of plan.filter((x) => x.collection === collection)) {
    const doc = { ...(after[collection].get(p.id) ?? {}), ...p.data };
    for (const f of p.deleteFields) delete doc[f];
    after[collection].set(p.id, doc);
  }
}
const liveExercises = [...after.exercises.values()].filter((e) => !e.deletedAt);
const shortStages = [...after.stages.values()]
  .filter((s) => s.reviewStatus === 'published')
  .map((s) => ({ s, n: liveExercises.filter((e) => matchesStagePool(s, e)).length }))
  .filter(({ s, n }) => n < (s.drawCount ?? 0));

// 5. รายงาน
const count = (kind, collection) => plan.filter((p) => p.kind === kind && p.collection === collection).length;
console.log(`แผน sync → ${APPLY ? 'เขียนจริง' : 'dry-run (ยังไม่เขียน)'}`);
console.log(`  exercises: สร้างใหม่ ${count('create', 'exercises')} · แก้ ${count('update', 'exercises')}`);
console.log(`  stages:    สร้างใหม่ ${count('create', 'stages')} · แก้ ${count('update', 'stages')}`);

const fieldTotals = {};
for (const p of plan) for (const c of p.changes) {
  const f = c.split(':')[0];
  fieldTotals[`${p.collection}.${f}`] = (fieldTotals[`${p.collection}.${f}`] ?? 0) + 1;
}
if (Object.keys(fieldTotals).length) {
  console.log(`  ฟิลด์ที่เปลี่ยน: ${Object.entries(fieldTotals).map(([f, n]) => `${f}×${n}`).join(', ')}`);
}
for (const p of VERBOSE ? plan : plan.slice(0, 15)) {
  const label = p.data.prompt ?? p.data.title ?? prod[p.collection].get(p.id)?.prompt ?? prod[p.collection].get(p.id)?.title ?? '';
  console.log(`\n  [${p.kind}] ${p.collection}/${p.id} (${p.file}) ${String(label).slice(0, 60)}`);
  for (const c of p.changes) console.log(`      ${c}`);
}
if (!VERBOSE && plan.length > 15) console.log(`\n  ... อีก ${plan.length - 15} รายการ (ดูทั้งหมดด้วย --verbose)`);

const seedIds = { exercises: new Set(seeds.exercises.map((s) => s.id)), stages: new Set(seeds.stages.map((s) => s.id)) };
const prodOnly = [...prod.exercises.values()].filter((d) => !seedIds.exercises.has(d.id) && !d.deletedAt);
if (prodOnly.length) {
  console.log(`\nหมายเหตุ: มี ${prodOnly.length} ข้อบน production ที่ไม่อยู่ใน seed (เช่น สร้างจากหน้า admin) — sync จะไม่แตะ`);
}

if (shortStages.length) {
  console.log('\n❌ ถ้า sync แล้วด่านเหล่านี้จะมีข้อไม่พอ — ไม่เขียนอะไรทั้งนั้น:');
  for (const { s, n } of shortStages) console.log(`   ${s.level} #${s.order} "${s.title}" มี ${n} ต้องการ ${s.drawCount}`);
  process.exit(1);
}
console.log('\n✓ จำลองแล้ว ทุกด่านยังมีข้อพอหลัง sync');

if (!plan.length) {
  console.log('✓ production ตรงกับ seed แล้ว ไม่มีอะไรต้องทำ');
  process.exit(0);
}
if (!APPLY) {
  console.log('\nยังไม่ได้เขียนอะไร — ถ้าแผนถูกต้อง รัน: npm run content:sync -- --apply');
  process.exit(0);
}

let done = 0;
for (const p of plan) {
  await patchDoc(p.collection, p.id, p.data, token, { deleteFields: p.deleteFields });
  done++;
  process.stdout.write(`\rเขียนแล้ว ${done}/${plan.length}`);
}
console.log('\n✅ sync เสร็จ — รัน npm run content:health เพื่อตรวจซ้ำ');
