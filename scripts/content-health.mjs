// ตรวจสุขภาพเนื้อหาบน production แบบอ่านอย่างเดียว (ไม่เขียนอะไรลง Firestore)
//   npm run content:health
// รายงาน:
//   1. ด่านที่อนุมัติแล้วแต่คลังข้อไม่พอ drawCount (นักเรียนกดเข้าไปจะเจอด่านว่าง/ข้อน้อย)
//   2. ข้อที่อนุมัติแล้วแต่ไม่มีด่านไหนดึงไปใช้ (ข้อกำพร้า)
//   3. tag ที่ใช้อยู่บน production แต่ไม่มีใน taxonomy
//   4. ความต่างระหว่างไฟล์ seed ใน docs/seeds กับของจริงบน production
import { readFileSync, readdirSync } from 'node:fs';
import { getAccessToken, listAll } from './lib/firestore-rest.mjs';
import { matchesStagePool, findOrphanExercises } from '../src/lib/stage-pool.js';
import { TAGS } from '../src/lib/schema/taxonomy.js';

const SEED_DIR = 'docs/seeds';
const COMPARE_FIELDS = ['skill', 'level', 'type', 'tags', 'choices', 'answerKey', 'isPreview'];
const norm = (s) => (s ?? '').trim().toLowerCase();
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

const token = await getAccessToken();
const [stages, exercises] = await Promise.all([listAll('stages', token), listAll('exercises', token)]);
const live = exercises.filter((e) => !e.deletedAt);
const published = live.filter((e) => e.reviewStatus === 'published');
const publishedStages = stages.filter((s) => s.reviewStatus === 'published');
let problems = 0;

console.log(`production: ด่าน ${stages.length} (อนุมัติ ${publishedStages.length}) · ข้อ ${live.length} (อนุมัติ ${published.length})\n`);

// 1. คลังของแต่ละด่าน
console.log('— 1. ด่านที่คลังข้อไม่พอ —');
const sorted = [...publishedStages].sort((a, b) => a.level.localeCompare(b.level) || a.order - b.order);
for (const stage of sorted) {
  const pool = published.filter((e) => matchesStagePool(stage, e));
  if (pool.length < (stage.drawCount ?? 0)) {
    problems++;
    console.log(`  ✗ ${stage.level} #${stage.order} "${stage.title}" — มี ${pool.length} ข้อ ต้องการ ${stage.drawCount} (tags: ${stage.tags?.join(', ')})`);
  }
}
if (!problems) console.log('  ✓ ทุกด่านมีข้อพอ');

// 2. ข้อกำพร้า
const orphans = findOrphanExercises(stages, published);
console.log(`\n— 2. ข้อที่อนุมัติแล้วแต่ไม่มีด่านไหนใช้: ${orphans.length} ข้อ —`);
const orphanTags = {};
for (const e of orphans) for (const t of e.tags ?? []) orphanTags[`${e.level} ${t}`] = (orphanTags[`${e.level} ${t}`] ?? 0) + 1;
for (const [k, n] of Object.entries(orphanTags)) console.log(`  · ${k}: ${n} ข้อ`);

// 3. tag ที่ไม่รู้จัก
const knownTags = new Set(TAGS.map((t) => t.id));
const unknown = new Set();
for (const x of [...live, ...stages]) for (const t of x.tags ?? []) if (!knownTags.has(t)) unknown.add(t);
console.log(`\n— 3. tag ที่ไม่มีใน taxonomy: ${unknown.size} —`);
for (const t of unknown) {
  problems++;
  console.log(`  ✗ ${t}`);
}

// 4. seed เทียบ production
console.log('\n— 4. seed (docs/seeds) เทียบ production —');
const byPrompt = new Map(live.map((e) => [norm(e.prompt), e]));
const stageKey = (s) => `${s.skill}|${s.level}|${s.order}`;
const stageByKey = new Map(stages.map((s) => [stageKey(s), s]));
for (const file of readdirSync(SEED_DIR).filter((f) => f.endsWith('.json')).sort()) {
  const seeds = JSON.parse(readFileSync(`${SEED_DIR}/${file}`, 'utf8'));
  let missing = 0;
  const diffs = {};
  for (const seed of seeds) {
    if ('prompt' in seed) {
      const prod = byPrompt.get(norm(seed.prompt));
      if (!prod) { missing++; continue; }
      for (const f of COMPARE_FIELDS) if (f in seed && !same(seed[f], prod[f])) diffs[f] = (diffs[f] ?? 0) + 1;
    } else {
      const prod = stageByKey.get(stageKey(seed));
      if (!prod) { missing++; continue; }
      for (const f of ['title', 'tags', 'drawCount', 'passThreshold', 'isPreview']) {
        if (f in seed && !same(seed[f], prod[f])) diffs[f] = (diffs[f] ?? 0) + 1;
      }
    }
  }
  const diffText = Object.entries(diffs).map(([f, n]) => `${f}×${n}`).join(', ');
  const ok = !missing && !diffText;
  console.log(`  ${ok ? '✓' : '△'} ${file}: ${seeds.length} รายการ${missing ? ` · ไม่พบบน production ${missing}` : ''}${diffText ? ` · ต่างกัน ${diffText}` : ''}`);
}

console.log(`\n${problems ? `พบปัญหาที่กระทบนักเรียน ${problems} จุด (ข้อ 1 และ 3)` : 'ไม่พบปัญหาที่กระทบนักเรียน'}`);
process.exit(problems ? 1 : 0);
