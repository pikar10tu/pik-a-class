import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { foodDrinkVocab } from './vocab-builder/data-food-drink.js';
import { travelTransportVocab } from './vocab-builder/data-travel-transport.js';
import { healthBodyVocab } from './vocab-builder/data-health-body.js';
import { jobsWorkVocab } from './vocab-builder/data-jobs-work.js';
import { hobbiesSportsVocab } from './vocab-builder/data-hobbies-sports.js';
import { techMediaVocab } from './vocab-builder/data-tech-media.js';
import { natureWeatherVocab } from './vocab-builder/data-nature-weather.js';
import { shoppingMoneyVocab } from './vocab-builder/data-shopping-money.js';
import { feelingsPersonalityVocab } from './vocab-builder/data-feelings-personality.js';
import { educationSchoolVocab } from './vocab-builder/data-education-school.js';
import { homeDailyVocab } from './vocab-builder/data-home-daily.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CATEGORIES = [
  { id: 'food-drink', label: 'อาหาร & เครื่องดื่ม', icon: '🍕' },
  { id: 'travel-transport', label: 'การเดินทาง & คมนาคม', icon: '✈️' },
  { id: 'health-body', label: 'สุขภาพ & ร่างกาย', icon: '🏥' },
  { id: 'jobs-work', label: 'อาชีพ & การทำงาน', icon: '💼' },
  { id: 'hobbies-sports', label: 'งานอดิเรก & กีฬา', icon: '🎨' },
  { id: 'tech-media', label: 'เทคโนโลยี & สื่อ', icon: '📱' },
  { id: 'nature-weather', label: 'ธรรมชาติ & ดินฟ้าอากาศ', icon: '🌦️' },
  { id: 'shopping-money', label: 'ซื้อของ & การเงิน', icon: '🛍️' },
  { id: 'feelings-personality', label: 'อารมณ์ & บุคลิก', icon: '😊' },
  { id: 'education-school', label: 'การศึกษา & โรงเรียน', icon: '🎓' },
  { id: 'home-daily', label: 'บ้าน & กิจวัตรประจำวัน', icon: '🏠' },
];

const categoryMap = new Map(CATEGORIES.map((c) => [c.id, c.label]));

const allLists = [
  foodDrinkVocab,
  travelTransportVocab,
  healthBodyVocab,
  jobsWorkVocab,
  hobbiesSportsVocab,
  techMediaVocab,
  natureWeatherVocab,
  shoppingMoneyVocab,
  feelingsPersonalityVocab,
  educationSchoolVocab,
  homeDailyVocab,
];

const allItems = allLists.flat();

console.log(`\n========================================`);
console.log(`🔍 AUDITING VOCABULARY DATASET (${allItems.length} WORDS)...`);
console.log(`========================================\n`);

const seenIds = new Set();
const errors = [];
const validLevels = ['A1', 'A2', 'B1', 'B2'];
const hintCharRegex = /[,()\/]/;

for (let i = 0; i < allItems.length; i++) {
  const item = allItems[i];
  const ref = `[Item #${i + 1} (${item.id || 'no-id'} / "${item.word || 'no-word'}")]`;

  // 1. ID check
  if (!item.id || typeof item.id !== 'string') {
    errors.push(`${ref}: Missing or invalid id`);
  } else if (seenIds.has(item.id)) {
    errors.push(`${ref}: Duplicate id "${item.id}"`);
  } else {
    seenIds.add(item.id);
  }

  // 2. Word check
  if (!item.word || typeof item.word !== 'string' || item.word.trim() === '') {
    errors.push(`${ref}: Missing word`);
  }

  // 3. POS check
  if (!item.pos || typeof item.pos !== 'string') {
    errors.push(`${ref}: Missing part of speech (pos)`);
  }

  // 4. Level check
  if (!validLevels.includes(item.level)) {
    errors.push(`${ref}: Invalid CEFR level "${item.level}"`);
  }

  // 5. Category check
  if (!categoryMap.has(item.category)) {
    errors.push(`${ref}: Unknown category "${item.category}"`);
  }

  // 6. Category label check
  if (categoryMap.has(item.category) && item.categoryLabel !== categoryMap.get(item.category)) {
    errors.push(
      `${ref}: CategoryLabel mismatch: got "${item.categoryLabel}", expected "${categoryMap.get(item.category)}"`,
    );
  }

  // 7. Thai translation check
  if (!item.thai || typeof item.thai !== 'string' || item.thai.trim() === '') {
    errors.push(`${ref}: Missing thai translation`);
  } else if (hintCharRegex.test(item.thai)) {
    errors.push(`${ref}: Thai translation contains hint characters (, / ( )): "${item.thai}"`);
  }

  // 8. Alternatives check
  if (!Array.isArray(item.alternatives) || item.alternatives.length !== 3) {
    errors.push(
      `${ref}: Alternatives must be an array of exactly 3 distractors, got ${item.alternatives?.length}`,
    );
  } else {
    if (item.alternatives.includes(item.thai)) {
      errors.push(`${ref}: Alternatives contain the correct answer "${item.thai}"`);
    }
    const altSet = new Set(item.alternatives);
    if (altSet.size !== 3) {
      errors.push(`${ref}: Alternatives contain duplicates: ${JSON.stringify(item.alternatives)}`);
    }
    for (const alt of item.alternatives) {
      if (typeof alt !== 'string' || alt.trim() === '') {
        errors.push(`${ref}: Alternative is empty or not string`);
      } else if (hintCharRegex.test(alt)) {
        errors.push(`${ref}: Alternative contains hint characters: "${alt}"`);
      }
    }
  }

  // 9. Example sentences check
  if (!item.example || typeof item.example !== 'string' || item.example.trim() === '') {
    errors.push(`${ref}: Missing English example sentence`);
  }
  if (!item.exampleThai || typeof item.exampleThai !== 'string' || item.exampleThai.trim() === '') {
    errors.push(`${ref}: Missing Thai example sentence`);
  }
}

// 10. ID lock — ID ถูกเก็บถาวรใน Firestore (คำโปรด favoriteVocab และ submissions รายคำ)
// ID เดิมจึงห้ามชี้ไปคำอื่นเด็ดขาด ถ้าจะเปลี่ยนคำให้สร้าง ID ใหม่ แล้วปล่อย ID เก่าเลิกใช้ไป
const lockPath = path.resolve(__dirname, 'vocab-builder/vocab-ids.lock.json');
const idLock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, 'utf8')) : {};
for (const item of allItems) {
  const lockedWord = idLock[item.id];
  if (lockedWord !== undefined && lockedWord !== item.word) {
    errors.push(
      `[${item.id}]: ID นี้เคยเป็นคำ "${lockedWord}" ห้ามนำมาใช้กับ "${item.word}" — ตั้ง ID ใหม่ เช่น "${item.id.replace(/_[^_]+$/, '')}_${item.word.toLowerCase().replace(/[^a-z0-9]+/g, '-')}"`,
    );
  }
}

if (errors.length > 0) {
  console.error(`❌ FOUND ${errors.length} VALIDATION ERRORS:\n`);
  errors.slice(0, 30).forEach((err) => console.error('  - ' + err));
  if (errors.length > 30) {
    console.error(`  ... and ${errors.length - 30} more errors.`);
  }
  process.exit(1);
}

console.log(`✅ 100% OF ${allItems.length} WORDS PASSED STRICT QUALITY & SYNTAX VALIDATION!`);

// Statistics
const levelStats = {};
const categoryStats = {};
for (const item of allItems) {
  levelStats[item.level] = (levelStats[item.level] || 0) + 1;
  categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
}

console.log('\n📊 DISTRIBUTION BY CEFR LEVEL:');
for (const lvl of validLevels) {
  const count = levelStats[lvl] || 0;
  const pct = ((count / allItems.length) * 100).toFixed(1);
  console.log(`  - ${lvl}: ${count} words (${pct}%)`);
}

console.log('\n📚 DISTRIBUTION BY THEMATIC CATEGORY:');
for (const cat of CATEGORIES) {
  const count = categoryStats[cat.id] || 0;
  console.log(`  - ${cat.icon} ${cat.label} (${cat.id}): ${count} words`);
}

// สร้างไฟล์ข้อมูลล้วน — ฟังก์ชันค้นหา/สุ่มอยู่ใน src/lib/vocab-data.js (แก้ด้วยมือได้ตามปกติ)
const targetPath = path.resolve(__dirname, '../src/lib/vocab-items.js');

const output = `// ⚠️ ไฟล์นี้สร้างอัตโนมัติจาก scripts/vocab-builder/data-*.js — ห้ามแก้ตรงนี้
// แก้คำศัพท์ที่ scripts/vocab-builder/ แล้วรัน: npm run build:vocab

export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export const VOCAB_ITEMS = ${JSON.stringify(allItems, null, 2)};
`;

// ล็อก ID ใหม่ต่อท้าย (append-only — ID ที่เลิกใช้แล้วยังคงอยู่ในล็อกตลอดไป)
const nextLock = { ...idLock };
for (const item of allItems) nextLock[item.id] = item.word;
const lockOutput = `${JSON.stringify(nextLock, null, 2)}\n`;

if (process.argv.includes('--check')) {
  // ใช้ใน CI: ถ้าลืมรัน build:vocab หลังแก้คำศัพท์ ให้ fail
  const current = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, 'utf8') : '';
  const currentLock = fs.existsSync(lockPath) ? fs.readFileSync(lockPath, 'utf8') : '';
  const norm = (s) => s.replace(/\r\n/g, '\n');
  if (norm(current) !== output || norm(currentLock) !== lockOutput) {
    console.error('\n❌ src/lib/vocab-items.js หรือ vocab-ids.lock.json ไม่ตรงกับ scripts/vocab-builder — รัน npm run build:vocab แล้ว commit');
    process.exit(1);
  }
  console.log('\n✅ vocab-items.js ตรงกับข้อมูลต้นทางแล้ว');
} else {
  fs.writeFileSync(targetPath, output, 'utf8');
  fs.writeFileSync(lockPath, lockOutput, 'utf8');
  console.log(`\n🎉 SUCCESSFULLY COMPILED VOCAB DATA TO: ${targetPath}`);
  console.log(`Total words: ${allItems.length}\n`);
}
