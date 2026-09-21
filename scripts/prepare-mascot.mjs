// ตัด character sheet ของน้องหยกเป็นไฟล์ย่อยที่พื้นหลังโปร่ง
// รันมือครั้งเดียวแล้ว commit ผลลัพธ์ — ตอนรันเว็บจริงไม่ต้องพึ่ง sharp
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SHEET_1 = 'docs/design/mascot-poses-sheet.jpg';
const SHEET_2 = 'docs/design/mascot-poses-sheet-2.jpg';
const OUT_DIR = 'src/public/mascot';
const COLS = 6;
const ROWS = 3;

// แต่ละอารมณ์ระบุ [ไฟล์ชีต, แถว, คอลัมน์] นับจาก 0
// ชีตที่สองมีท่าอารมณ์ลบที่ชีตแรกไม่มีเลย จึงดึงท่าเสียใจจากชีตนั้น
const CELLS = {
  normal: [SHEET_1, 0, 0], // ยืนโบกมือทักทาย
  correct: [SHEET_1, 0, 1], // ชูสองมือดีใจ
  clear: [SHEET_1, 1, 5], // ตาเป็นดาว ดีใจมาก
  wrong: [SHEET_2, 0, 2], // หูตก หน้าเสียใจ
};

const WHITE = 240; // ค่าที่ถือว่าเป็นพื้นขาว (ต้นฉบับเป็น JPEG จึงมีขอบฟุ้ง ต้องเผื่อ)

// ลบพื้นขาวด้วย flood fill จากขอบภาพเท่านั้น
// ห้ามลบ "ทุกพิกเซลที่ขาว" เพราะตัวมาสคอตมีแสงวาวสีขาวอยู่ข้างใน จะทะลุเป็นรู
function clearOutsideBackground(data, width, height) {
  const seen = new Uint8Array(width * height);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (seen[i]) return;
    const p = i * 4;
    if (data[p] < WHITE || data[p + 1] < WHITE || data[p + 2] < WHITE) return;
    seen[i] = 1;
    stack.push(i);
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length > 0) {
    const i = stack.pop();
    data[i * 4 + 3] = 0;
    const x = i % width;
    const y = (i - x) / width;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
}

// หลัง flood fill แล้ว อาจยังเหลือชิ้นส่วนของท่าข้างเคียงที่ล้ำเข้ามาในกรอบ
// มันลอยอยู่เดี่ยวๆ ไม่ติดกับตัวละคร จึงลบได้ด้วยการเก็บเฉพาะก้อนที่ต่อกันใหญ่ที่สุด
function keepLargestComponent(data, width, height) {
  const label = new Int32Array(width * height).fill(-1);
  const sizes = [];

  for (let start = 0; start < width * height; start += 1) {
    if (label[start] !== -1 || data[start * 4 + 3] === 0) continue;
    const id = sizes.length;
    let size = 0;
    const stack = [start];
    label[start] = id;

    while (stack.length > 0) {
      const i = stack.pop();
      size += 1;
      const x = i % width;
      const y = (i - x) / width;
      const neighbours = [
        x + 1 < width ? i + 1 : -1,
        x - 1 >= 0 ? i - 1 : -1,
        y + 1 < height ? i + width : -1,
        y - 1 >= 0 ? i - width : -1,
      ];
      for (const n of neighbours) {
        if (n < 0 || label[n] !== -1 || data[n * 4 + 3] === 0) continue;
        label[n] = id;
        stack.push(n);
      }
    }
    sizes.push(size);
  }

  if (sizes.length <= 1) return sizes.length;

  let biggest = 0;
  for (let id = 1; id < sizes.length; id += 1) {
    if (sizes[id] > sizes[biggest]) biggest = id;
  }
  for (let i = 0; i < label.length; i += 1) {
    if (label[i] !== -1 && label[i] !== biggest) data[i * 4 + 3] = 0;
  }
  return sizes.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // รอบแรก: ตัดแต่ละท่าตามปกติ (trim + resize) แต่ยังไม่เขียนไฟล์ เพราะต้องรู้ขนาดของ
  // ทุกท่าก่อน ถึงจะคำนวณผืนผ้าใบร่วม (shared canvas) ที่ไม่ครอบตัด ไม่ขยายภาพใดเลยได้
  const processed = [];
  for (const [name, [source, row, col]] of Object.entries(CELLS)) {
    const meta = await sharp(source).metadata();
    const left = Math.round((col * meta.width) / COLS);
    const right = Math.round(((col + 1) * meta.width) / COLS);
    const top = Math.round((row * meta.height) / ROWS);
    const bottom = Math.round(((row + 1) * meta.height) / ROWS);

    const { data, info } = await sharp(source)
      .extract({ left, top, width: right - left, height: bottom - top })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    clearOutsideBackground(data, info.width, info.height);
    const blobs = keepLargestComponent(data, info.width, info.height);

    const trimmed = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim({ threshold: 1 })
      .resize({ height: 512, fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toBuffer();
    const trimmedMeta = await sharp(trimmed).metadata();

    processed.push({ name, buffer: trimmed, width: trimmedMeta.width, height: trimmedMeta.height, blobs });
  }

  // แต่ละท่ากว้าง/สูงไม่เท่ากัน (ท่ากางแขนกว้างกว่าท่ายืนตรง) แต่หน้าเว็บทุกหน้าวาง
  // มาสคอตเป็นกล่องเดียวกัน ผืนผ้าใบร่วมจึงต้องกว้าง/สูงพอสำหรับท่าที่กว้างสุด/สูงสุด
  // เพื่อไม่ครอบตัดท่าไหนเลย และห้ามขยายภาพใดเกินขนาดจริงของมันด้วย
  const canvasWidth = Math.max(...processed.map((p) => p.width));
  const canvasHeight = Math.max(...processed.map((p) => p.height));

  for (const { name, buffer, width, height, blobs } of processed) {
    const left = Math.round((canvasWidth - width) / 2);
    const top = Math.round((canvasHeight - height) / 2);

    const out = `${OUT_DIR}/${name}.png`;
    await sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: buffer, left, top }])
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(
      `เขียน ${out} (พบ ${blobs} ก้อน เก็บก้อนใหญ่สุด, วางกึ่งกลางบนผืนผ้าใบ ${canvasWidth}x${canvasHeight})`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
