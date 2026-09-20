import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { checkBatch } from '../lib/schema/content-checks.js';
import { prepareItems } from '../lib/schema/import-prep.js';
import { fetchExistingHashes, importItems } from '../lib/admin-content-io.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/import.html', import.meta.env.BASE_URL);

let adminUid = null;
let readyToImport = [];

const collectionSelect = document.getElementById('import-collection');
const fileInput = document.getElementById('import-file');
const textInput = document.getElementById('import-text');
const status = document.getElementById('import-status');
const errorList = document.getElementById('import-errors');
const runButton = document.getElementById('import-run');

fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (file) textInput.value = await file.text();
});

document.getElementById('import-check').addEventListener('click', async () => {
  readyToImport = [];
  runButton.disabled = true;
  errorList.replaceChildren();
  status.textContent = 'กำลังตรวจ…';

  let items;
  try {
    items = JSON.parse(textInput.value);
  } catch (error) {
    status.textContent = `อ่าน JSON ไม่สำเร็จ: ${error.message}`;
    return;
  }
  if (!Array.isArray(items)) {
    status.textContent = 'ไฟล์ต้องเป็น JSON array ของข้อ';
    return;
  }

  const collectionName = collectionSelect.value;

  try {
    const existingHashes = await fetchExistingHashes(db, collectionName);
    const prepared = prepareItems(items, {
      createdBy: adminUid,
      batchId: `batch-${Date.now()}`,
      collectionName,
    });
    const result = checkBatch(collectionName, prepared, existingHashes);

    readyToImport = result.valid.map((entry) => entry.item);
    status.textContent = `ผ่าน ${result.valid.length} ข้อ / ไม่ผ่าน ${result.invalid.length} ข้อ`;

    for (const bad of result.invalid) {
      const li = document.createElement('li');
      const errors = bad.errors.map((error) => `${error.field}: ${error.message}`).join(' • ');
      li.textContent = `ข้อที่ ${bad.index + 1} — ${errors}`;
      errorList.appendChild(li);
    }

    runButton.disabled = readyToImport.length === 0;
  } catch (error) {
    console.error(error);
    status.textContent = 'ตรวจไฟล์ไม่สำเร็จ (โหลดข้อมูลเดิมจากคลังไม่ได้)';
  }
});

runButton.addEventListener('click', async () => {
  runButton.disabled = true;
  status.textContent = 'กำลังนำเข้า…';
  try {
    const written = await importItems(db, collectionSelect.value, readyToImport);
    status.textContent = `นำเข้าสำเร็จ ${written} ข้อ (สถานะ draft) ไปตรวจต่อที่หน้าคลังเนื้อหาได้เลย`;
    readyToImport = [];
  } catch (error) {
    console.error(error);
    status.textContent = 'นำเข้าไม่สำเร็จ ลองใหม่อีกครั้ง';
    runButton.disabled = false;
  }
});

requireAdmin((firebaseUser) => {
  adminUid = firebaseUser.uid;
});
