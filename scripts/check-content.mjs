#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { checkBatch, coverageReport } from '../src/lib/schema/content-checks.js';
import { formatCheckReport, formatCoverage } from '../src/lib/schema/report-format.js';

const [, , filePath, collectionName = 'exercises'] = process.argv;

if (!filePath) {
  console.error('วิธีใช้: npm run check:content -- <ไฟล์.json> [ชื่อ collection]');
  process.exit(2);
}

let items;
try {
  items = JSON.parse(readFileSync(filePath, 'utf8'));
} catch (error) {
  console.error(`อ่านไฟล์ไม่สำเร็จ: ${error.message}`);
  process.exit(2);
}

if (!Array.isArray(items)) {
  console.error('ไฟล์ต้องเป็น JSON array ของข้อ');
  process.exit(2);
}

const result = checkBatch(collectionName, items, new Set());
console.log(formatCheckReport(result));
console.log('');
console.log(formatCoverage(coverageReport(items)));

process.exit(result.invalid.length > 0 ? 1 : 0);
