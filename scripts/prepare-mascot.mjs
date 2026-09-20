// ตัด character sheet ของน้องหยกเป็นไฟล์ย่อยที่พื้นหลังโปร่ง
// รันมือครั้งเดียวแล้ว commit ผลลัพธ์ — ตอนรันเว็บจริงไม่ต้องพึ่ง sharp
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'docs/design/mascot-poses-sheet.jpg';
const OUT_DIR = 'src/public/mascot';
const COLS = 6;
const ROWS = 3;

// [แถว, คอลัมน์] นับจาก 0 — เลือกจากชีต 18 ท่า ข้ามท่าที่มีตัวหนังสืออังกฤษบนภาพ
const CELLS = {
  normal: [0, 0], // ยืนโบกมือทักทาย
  correct: [0, 1], // ชูสองมือดีใจ
  clear: [1, 5], // ตาเป็นดาว ดีใจมาก
  wrong: [2, 3], // ยืนมือประสาน ท่าเสียดาย
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

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const meta = await sharp(SOURCE).metadata();

  for (const [name, [row, col]] of Object.entries(CELLS)) {
    const left = Math.round((col * meta.width) / COLS);
    const right = Math.round(((col + 1) * meta.width) / COLS);
    const top = Math.round((row * meta.height) / ROWS);
    const bottom = Math.round(((row + 1) * meta.height) / ROWS);

    const { data, info } = await sharp(SOURCE)
      .extract({ left, top, width: right - left, height: bottom - top })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    clearOutsideBackground(data, info.width, info.height);

    const out = `${OUT_DIR}/${name}.png`;
    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim({ threshold: 1 })
      .resize({ height: 512, fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`เขียน ${out}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
