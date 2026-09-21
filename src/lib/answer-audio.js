// ส่วนที่เรียก Web Audio API จริง — ทดสอบด้วย jsdom ไม่ได้ (ไม่มี AudioContext) จึงตั้งใจไม่มีไฟล์เทสต์
// สำหรับไฟล์นี้ ส่วนที่ทดสอบได้ (โน้ต/envelope) แยกไว้ที่ ./answer-sound.js แล้ว มีเทสต์ครบที่นั่น
import { CORRECT_TONE, WRONG_TONE, toneEvents } from './answer-sound.js';

let sharedContext = null;

function resolveAudioContextClass() {
  if (typeof window === 'undefined') return null;
  return window.AudioContext || window.webkitAudioContext || null;
}

// สร้าง/ปลุก AudioContext — ต้องเรียกจาก user gesture เท่านั้น (pick() ใน src/learn/play.js ตอนแตะคำตอบ)
// ห้ามมีที่ไหนเรียกฟังก์ชันนี้ตอนโหลดหน้า ไม่งั้นเบราว์เซอร์จะบล็อก autoplay หรือ context จะค้าง suspended
function getContext() {
  const AudioContextClass = resolveAudioContextClass();
  if (!AudioContextClass) return null;
  if (!sharedContext) {
    try {
      sharedContext = new AudioContextClass();
    } catch {
      return null;
    }
  }
  if (sharedContext.state === 'suspended') {
    sharedContext.resume().catch(() => {});
  }
  return sharedContext;
}

// เล่นโน้ตเดียวพร้อม envelope attack/decay สั้นๆ กัน "คลิก" ตอนเริ่ม/จบเสียง
// (raw oscillator start/stop เปล่าๆ จะป๊อป ฟังดูแข็งกระด้างไม่ว่าจะเลือกโน้ตอะไร)
function scheduleEvent(context, destination, startTime, event) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = event.waveform;
  oscillator.frequency.setValueAtTime(event.freq, startTime);

  const attackEnd = startTime + event.attack;
  const noteEnd = startTime + event.duration;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(event.peakGain, attackEnd);
  gain.gain.linearRampToValueAtTime(0, noteEnd);

  oscillator.connect(gain).connect(destination);
  oscillator.start(startTime);
  oscillator.stop(noteEnd + 0.02);
}

// เล่นเสียง "ถูก" หรือ "ผิด" — แค่ "ตั้งเวลา" เล่นเสียงในอนาคตแล้วคืนค่าทันที ไม่ await อะไรเลย
// จึงไม่มีทางดีเลย์ visual feedback ที่หน้าเรียกก่อนหน้านี้ได้ — ห้าม throw ออกไปเด็ดขาด (ไม่มี Web Audio ก็ต้องเงียบ)
export function playAnswerSound(kind) {
  try {
    const context = getContext();
    if (!context) return;
    const tone = kind === 'correct' ? CORRECT_TONE : WRONG_TONE;
    const startTime = context.currentTime;
    for (const event of toneEvents(tone)) {
      scheduleEvent(context, context.destination, startTime + event.startOffset, event);
    }
  } catch (error) {
    console.error(error);
  }
}
