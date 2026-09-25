#!/usr/bin/env node
// ตรวจไฟล์เนื้อหาก่อนนำเข้า/sync (ไม่แตะ Firestore)
//   npm run check:content                      ตรวจทุกไฟล์ใน docs/seeds พร้อมตรวจข้ามไฟล์
//   npm run check:content -- <ไฟล์.json> ...    ตรวจเฉพาะไฟล์ที่ระบุ
//   เพิ่ม --coverage เพื่อดูว่าแต่ละเลเวลยังขาดหัวข้อไหน
// ชนิดไฟล์ดูจากเนื้อใน: มี drawCount = stages, มี summary = grammarNotes, นอกนั้น = exercises
import { readFileSync, readdirSync } from 'node:fs';
import { checkBatch, coverageReport } from '../src/lib/schema/content-checks.js';
import { formatCheckReport, formatCoverage } from '../src/lib/schema/report-format.js';
import { matchesStagePool } from '../src/lib/stage-pool.js';

const SEED_DIR = 'docs/seeds';
const args = process.argv.slice(2);
const showCoverage = args.includes('--coverage');
const fileArgs = args.filter((a) => !a.startsWith('--'));
const files = fileArgs.length
  ? fileArgs
  : readdirSync(SEED_DIR).filter((f) => f.endsWith('.json')).sort().map((f) => `${SEED_DIR}/${f}`);

function detectCollection(items) {
  if (items.some((i) => 'drawCount' in i)) return 'stages';
  if (items.some((i) => 'summary' in i)) return 'grammarNotes';
  return 'exercises';
}

let failed = false;
const allExercises = [];
const allStages = [];
const idOwner = new Map();

for (const file of files) {
  let items;
  try {
    items = JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    console.error(`✗ ${file}: อ่านไฟล์ไม่สำเร็จ — ${error.message}`);
    failed = true;
    continue;
  }
  if (!Array.isArray(items)) {
    console.error(`✗ ${file}: ไฟล์ต้องเป็น JSON array`);
    failed = true;
    continue;
  }

  const collectionName = detectCollection(items);
  const result = checkBatch(collectionName, items, new Set());
  const mark = result.invalid.length ? '✗' : '✓';
  console.log(`${mark} ${file} (${collectionName}): ผ่าน ${result.valid.length} / ไม่ผ่าน ${result.invalid.length}`);
  if (result.invalid.length) {
    console.log(formatCheckReport(result));
    failed = true;
  }

  for (const item of items) {
    if (item.id) {
      if (idOwner.has(item.id)) {
        console.log(`  ✗ id "${item.id}" ซ้ำกับใน ${idOwner.get(item.id)}`);
        failed = true;
      }
      idOwner.set(item.id, file);
    }
  }
  if (collectionName === 'exercises') allExercises.push(...items);
  if (collectionName === 'stages') allStages.push(...items);
}

// ตรวจข้ามไฟล์: ด่านที่อนุมัติแล้วต้องมีข้อในคลัง (จาก seed ทั้งหมด) พอกับ drawCount
// ไม่งั้นพอ sync ขึ้นไปนักเรียนจะเจอด่านว่าง
if (allStages.length && allExercises.length) {
  const shortStages = allStages
    .filter((s) => s.reviewStatus === 'published')
    .map((s) => ({ s, n: allExercises.filter((e) => matchesStagePool(s, e)).length }))
    .filter(({ s, n }) => n < (s.drawCount ?? 0));
  for (const { s, n } of shortStages) {
    console.log(`  ✗ ด่าน ${s.level} #${s.order} "${s.title}" มีข้อ ${n} ต้องการ ${s.drawCount} (tags: ${s.tags.join(', ')})`);
    failed = true;
  }
  if (!shortStages.length) console.log(`✓ ทุกด่าน (${allStages.length}) มีข้อในคลังพอ`);
}

if (showCoverage) {
  console.log('');
  console.log(formatCoverage(coverageReport(allExercises)));
}

console.log(failed ? '\n❌ มีจุดต้องแก้ก่อน sync' : '\n✅ เนื้อหาพร้อม sync');
process.exit(failed ? 1 : 0);
