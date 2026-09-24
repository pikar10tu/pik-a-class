import { doc, updateDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { VOCAB_ITEMS } from './vocab-data.js';

// สร้าง Map สำหรับค้นหาคำศัพท์ด้วย ID อย่างรวดเร็ว (O(1))
const VOCAB_MAP = new Map(VOCAB_ITEMS.map((item) => [item.id, item]));

function getStorage(customStorage) {
  if (customStorage) return customStorage;
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {}
  return null;
}

/**
 * ดึงรายการ ID ของคำศัพท์ที่ชอบ
 * ลำดับการอ่าน: userDoc -> storage cache -> อาเรย์ว่าง []
 */
export function getFavoriteIds(userDoc, uid = '', storage = null) {
  let list = [];
  if (Array.isArray(userDoc?.favoriteVocab)) {
    list = [...userDoc.favoriteVocab];
  } else if (uid) {
    try {
      const store = getStorage(storage);
      const cached = store ? store.getItem(`pik_fav_vocab_${uid}`) : null;
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) list = parsed;
      }
    } catch {}
  }
  // กรองเฉพาะค่าที่ไม่ซ้ำ
  return Array.from(new Set(list));
}

/**
 * ตรวจสอบว่าคำศัพท์นี้ถูกบันทึกเป็นคำโปรดหรือไม่
 */
export function isFavorite(favoriteIds, vocabId) {
  if (!Array.isArray(favoriteIds) || !vocabId) return false;
  return favoriteIds.includes(vocabId);
}

/**
 * แปลงรายการ ID คำโปรดให้เป็น Object คำศัพท์เต็มจาก VOCAB_ITEMS
 */
export function getFavoriteVocabItems(favoriteIds = []) {
  if (!Array.isArray(favoriteIds)) return [];
  const items = [];
  for (const id of favoriteIds) {
    const item = VOCAB_MAP.get(id);
    if (item) items.push(item);
  }
  return items;
}

/**
 * ค้นหา ID ของคำศัพท์จากชื่อคำ (word string)
 */
export function getVocabIdByWord(word = '') {
  if (!word) return null;
  const target = word.trim().toLowerCase();
  for (const item of VOCAB_ITEMS) {
    if (item.word.toLowerCase() === target) {
      return item.id;
    }
  }
  return null;
}

/**
 * จัดเรียงรายการคำศัพท์ โดยนำคำที่กด favorite ไว้ ขึ้นมาอยู่ด้านบนสุดเสมอ
 * ยังคงรักษาลำดับเดิมไว้ภายในกลุ่ม (Stable sort)
 */
export function sortVocabWithFavoritesFirst(vocabList = [], favoriteIds = []) {
  if (!Array.isArray(vocabList) || vocabList.length === 0) return [];
  if (!Array.isArray(favoriteIds) || favoriteIds.length === 0) return [...vocabList];

  const favSet = new Set(favoriteIds);
  const favItems = [];
  const normalItems = [];

  for (const item of vocabList) {
    if (favSet.has(item.id)) {
      favItems.push(item);
    } else {
      normalItems.push(item);
    }
  }

  return [...favItems, ...normalItems];
}

/**
 * กรองเฉพาะคำศัพท์ที่ถูกบันทึกเป็น favorite
 * พร้อมรองรับตัวกรอง level และ search เพิ่มเติม
 */
export function filterFavorites(vocabList = [], favoriteIds = [], { level = 'all', search = '' } = {}) {
  const favSet = new Set(favoriteIds);
  let list = vocabList.filter((item) => favSet.has(item.id));

  if (level && level !== 'all') {
    list = list.filter((item) => item.level === level);
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

  return list;
}

/**
 * สลับสถานะ favorite (Toggle)
 * - อัปเดตหน่วยความจำและ localStorage ทันที (Optimistic UI)
 * - Broadcast Event ให้ส่วนประกอบอื่นๆ ในหน้าจอเดียวกันทราบ
 * - บันทึกขึ้น Firestore เบื้องหลัง
 */
export async function toggleFavorite(db, uid, vocabId, currentFavorites = [], { storage = null } = {}) {
  if (!vocabId) return [...currentFavorites];

  const exists = currentFavorites.includes(vocabId);
  const nextFavorites = exists
    ? currentFavorites.filter((id) => id !== vocabId)
    : [...currentFavorites, vocabId];

  // 1. แคชลง storage ทันที
  if (uid) {
    try {
      const store = getStorage(storage);
      if (store) {
        store.setItem(`pik_fav_vocab_${uid}`, JSON.stringify(nextFavorites));
      }
    } catch {}
  }

  // 2. Broadcast Custom Event ในหน้าเว็บ
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('vocab-favorites-changed', {
        detail: {
          uid,
          vocabId,
          isFavorite: !exists,
          favoriteIds: nextFavorites,
        },
      }),
    );
  }

  // 3. ซิงค์ขึ้น Firestore
  if (db && uid) {
    try {
      const userRef = doc(db, 'users', uid);
      const updateData = {
        favoriteVocab: exists ? arrayRemove(vocabId) : arrayUnion(vocabId),
        favoriteVocabUpdatedAt: new Date().toISOString(),
      };
      await updateDoc(userRef, updateData).catch(async (err) => {
        // Fallback หากเอกสารผู้ใช้ยังไม่มีฟิลด์นี้ ให้ใช้ setDoc merge
        console.warn('updateDoc favoriteVocab fallback to merge:', err);
        await setDoc(userRef, { favoriteVocab: nextFavorites }, { merge: true });
      });
    } catch (err) {
      console.error('Failed to sync favoriteVocab to Firestore:', err);
    }
  }

  return nextFavorites;
}
