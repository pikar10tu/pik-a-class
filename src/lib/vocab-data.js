// คลังคำศัพท์ภาษาอังกฤษในชีวิตประจำวัน (Everyday English Vocabulary Bank)
// ข้อมูลคำศัพท์อยู่ที่ vocab-items.js (สร้างอัตโนมัติด้วย npm run build:vocab — ห้ามแก้ไฟล์นั้นตรงๆ)
// ไฟล์นี้เก็บเฉพาะฟังก์ชันค้นหา/กรอง/สุ่ม แก้ด้วยมือได้ตามปกติ
import { CATEGORIES, VOCAB_ITEMS } from './vocab-items.js';

export { CATEGORIES, VOCAB_ITEMS };

export function getCategories() {
  return CATEGORIES;
}

export function getLevels() {
  return ['A1', 'A2', 'B1', 'B2'];
}

export function getVocabList({ level = 'all', allowedLevels = null, category = 'all', search = '', shuffle = false } = {}) {
  let list = [...VOCAB_ITEMS];

  if (Array.isArray(allowedLevels) && allowedLevels.length > 0) {
    list = list.filter((item) => allowedLevels.includes(item.level));
  }

  if (level && level !== 'all') {
    list = list.filter((item) => item.level === level);
  }

  if (category && category !== 'all') {
    list = list.filter((item) => item.category === category);
  }

  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    list = list.filter(
      (item) =>
        item.word.toLowerCase().includes(q) ||
        item.thai.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q),
    );
  }

  if (shuffle) {
    list = shuffleArray(list);
  }

  return list;
}

export function getRandomWords(count = 10, filter = {}) {
  const pool = getVocabList({ ...filter, shuffle: true });
  return pool.slice(0, count);
}

export function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
