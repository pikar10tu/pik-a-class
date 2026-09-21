// สถานะ "ปิดเสียง" ของนักเรียน แยกจากส่วนที่เล่นเสียงจริง (./answer-audio.js) เพื่อให้ทดสอบได้โดยไม่ต้อง
// พึ่ง localStorage ของเบราว์เซอร์จริงหรือ jsdom — รับ storage เข้ามาเป็นพารามิเตอร์เสมอ
// (หน้าเว็บส่ง window.localStorage เข้ามา ส่วนเทสต์ส่ง fake storage ที่ทำแค่ getItem/setItem)
const STORAGE_KEY = 'pik-a-class:sound-muted';

export function loadMuted(storage) {
  try {
    return storage?.getItem(STORAGE_KEY) === '1';
  } catch {
    // เช่น localStorage ถูกปิดใช้งาน (private mode บางเบราว์เซอร์) — ถือว่ายังไม่ปิดเสียง
    return false;
  }
}

export function saveMuted(storage, muted) {
  try {
    storage?.setItem(STORAGE_KEY, muted ? '1' : '0');
  } catch {
    // พื้นที่เก็บข้อมูลเต็มหรือถูกปิดใช้งาน — ปล่อยผ่านเงียบๆ ไม่ทำให้หน้าเล่นด่านพัง
  }
}

export const SOUND_MUTED_STORAGE_KEY = STORAGE_KEY;
