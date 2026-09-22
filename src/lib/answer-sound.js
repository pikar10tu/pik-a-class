// เสียงตอบคำถามสังเคราะห์ด้วย Web Audio API ล้วนๆ (ไม่มีไฟล์เสียง ไม่มี dependency ใหม่)
// ไฟล์นี้เก็บเฉพาะ "โน้ต" และคณิตศาสตร์ของ envelope ซึ่งเป็นข้อมูล/ฟังก์ชันล้วนๆ ทดสอบได้โดยไม่ต้องพึ่ง
// Web Audio จริง — ส่วนที่เรียก AudioContext จริงแยกไว้ที่ ./answer-audio.js (ทดสอบด้วย jsdom ไม่ได้ จึงไม่มีเทสต์)

// ถูก: โน้ตไล่ขึ้นสั้นๆ สดใส (C5-E5-G5) ให้ความรู้สึกน่ารักคล้ายเกมทายคำ ไม่ใช่เสียงแจ้งเตือนดัง
export const CORRECT_TONE = {
  waveform: 'sine',
  peakGain: 0.18,
  attack: 0.008,
  notes: [
    { freq: 523.25, duration: 0.08 }, // C5
    { freq: 659.25, duration: 0.08 }, // E5
    { freq: 783.99, duration: 0.12 }, // G5
  ],
};

// ผิด: โน้ตไล่ลงนุ่มๆ สองตัว เบาและต่ำกว่าเสียงถูก ให้ความรู้สึก "เอ๋~" เบาๆ ไม่ใช่เสียงบัซเซอร์ตกใจ
export const WRONG_TONE = {
  waveform: 'sine',
  peakGain: 0.12,
  attack: 0.015,
  notes: [
    { freq: 349.23, duration: 0.12 }, // F4
    { freq: 293.66, duration: 0.18 }, // D4
  ],
};

// กดปุ่ม: เสียงป๊อปฟองสบู่สั้นๆ น่ารักและสดใส (E5-A5) สั้นมาก (~0.09s) ไม่หน่วง ไม่น่ารำคาญ
export const BUTTON_POP_TONE = {
  waveform: 'sine',
  peakGain: 0.12,
  attack: 0.005,
  notes: [
    { freq: 659.25, duration: 0.04 }, // E5
    { freq: 880.00, duration: 0.05 }, // A5
  ],
};

// จิ้มน้องหยก: เสียงกระดิ่งกุ๊งกิ๊ง 3 ตัวโน้ต (D5-A5-D6) ให้ความรู้สึกกระตือรือร้น น่ารัก
export const MASCOT_CHIME_TONE = {
  waveform: 'sine',
  peakGain: 0.15,
  attack: 0.006,
  notes: [
    { freq: 587.33, duration: 0.06 }, // D5
    { freq: 880.00, duration: 0.08 }, // A5
    { freq: 1174.66, duration: 0.12 }, // D6
  ],
};

// ผ่านด่าน: เสียงแฟนแฟร์ฉลองชัยชนะ 5 ตัวโน้ต (C5-E5-G5-C6-E6) อบอุ่น สดใส ชวนภาคภูมิใจ
export const STAGE_CLEAR_FANFARE = {
  waveform: 'triangle',
  peakGain: 0.20,
  attack: 0.008,
  notes: [
    { freq: 523.25, duration: 0.10 }, // C5
    { freq: 659.25, duration: 0.10 }, // E5
    { freq: 783.99, duration: 0.10 }, // G5
    { freq: 1046.50, duration: 0.12 }, // C6
    { freq: 1318.51, duration: 0.35 }, // E6
  ],
};

// ดาวระยิบระยับ: เสียงกระดิ่งดาววิ้งๆ 3 ตัวโน้ตสูงใส (B5-E6-G#6)
export const STAR_CHIME = {
  waveform: 'sine',
  peakGain: 0.15,
  attack: 0.005,
  notes: [
    { freq: 987.77, duration: 0.08 }, // B5
    { freq: 1318.51, duration: 0.08 }, // E6
    { freq: 1661.22, duration: 0.18 }, // G#6
  ],
};

// ยังไม่ผ่านด่าน: เสียงนุ่มนวลให้กำลังใจ ไม่ลงโทษ (E4-G4-E4) อบอุ่น ฟังสบาย
export const STAGE_FAIL_GENTLE = {
  waveform: 'sine',
  peakGain: 0.12,
  attack: 0.015,
  notes: [
    { freq: 329.63, duration: 0.14 }, // E4
    { freq: 392.00, duration: 0.14 }, // G4
    { freq: 329.63, duration: 0.25 }, // E4
  ],
};

// แปลง tone เป็นรายการ event พร้อมเวลาเริ่ม (offset จากจุดเริ่มเล่น หน่วยวินาที) — เรียงโน้ตต่อกันโดยไม่ overlap
// แยกออกมาให้ทดสอบได้ล้วนๆ โดยไม่ต้องสร้าง AudioContext จริง
export function toneEvents(tone) {
  let offset = 0;
  const events = [];
  for (const note of tone.notes) {
    events.push({
      freq: note.freq,
      startOffset: offset,
      duration: note.duration,
      attack: tone.attack,
      peakGain: tone.peakGain,
      waveform: tone.waveform,
    });
    offset += note.duration;
  }
  return events;
}

// ความยาวรวมของ tone เป็นวินาที — ใช้เช็กว่าไม่เกิน ~350ms ตามที่ครูขอ (สั้น ไม่รบกวนจังหวะทำข้อสอบ)
export function toneDuration(tone) {
  return tone.notes.reduce((sum, note) => sum + note.duration, 0);
}
