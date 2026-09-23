import sharp from 'sharp';
import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const BRAIN_DIR = 'C:/Users/winusr/.gemini/antigravity/brain/1ed83273-8c2d-4279-bee5-894a666a9040';
const OUT_DIR = resolve('src/public/avatars');

const MAPPINGS = [
  { id: 'avatar-2', source: `${BRAIN_DIR}/avatar_pink_bunny_1790188892324.jpg` },
  { id: 'avatar-3', source: `${BRAIN_DIR}/avatar_sky_bunny_1790188919198.jpg` },
  { id: 'avatar-4', source: `${BRAIN_DIR}/avatar_wizard_bunny_1790188861976.jpg` },
  { id: 'avatar-5', source: `${BRAIN_DIR}/avatar_knight_bunny_1790188947473.jpg` },
  { id: 'avatar-6', source: `${BRAIN_DIR}/avatar_dragon_bunny_1790188974930.jpg` },
  { id: 'avatar-7', source: `${BRAIN_DIR}/avatar_angel_bunny_1790189002788.jpg` },
  { id: 'avatar-8', source: `${BRAIN_DIR}/avatar_barista_bunny_1790189032539.jpg` },
  { id: 'avatar-9', source: `${BRAIN_DIR}/avatar_king_bunny_1790189149640.jpg` },
  { id: 'avatar-10', source: `${BRAIN_DIR}/avatar_gamer_bunny_1790189178713.jpg` },
];

const WHITE = 238;

function clearOutsideBackground(data, width, height) {
  const seen = new Uint8Array(width * height);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (seen[i]) return;
    const p = i * 4;
    // Check if pixel is light/white
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

async function processAvatar(id, sourcePath) {
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  clearOutsideBackground(data, info.width, info.height);

  const trimmed = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 5 })
    .resize({
      width: 230,
      height: 230,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  const left = Math.round((256 - meta.width) / 2);
  const top = Math.round((256 - meta.height) / 2);

  // Composite onto 256x256 transparent square
  const squareBuffer = await sharp({
    create: {
      width: 256,
      height: 256,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: trimmed, left, top }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  // Save PNG
  await sharp(squareBuffer).png().toFile(`${OUT_DIR}/${id}.png`);

  // Save WebP
  await sharp(squareBuffer).webp({ quality: 85, effort: 6 }).toFile(`${OUT_DIR}/${id}.webp`);

  console.log(`Saved ${id}.png and ${id}.webp`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // 1. Preserve original avatar-3 (power cheer) -> avatar-11 and avatar-6 (heart love) -> avatar-12
  await copyFile(`${OUT_DIR}/avatar-3.png`, `${OUT_DIR}/avatar-11.png`).catch(() => {});
  await copyFile(`${OUT_DIR}/avatar-3.webp`, `${OUT_DIR}/avatar-11.webp`).catch(() => {});
  await copyFile(`${OUT_DIR}/avatar-6.png`, `${OUT_DIR}/avatar-12.png`).catch(() => {});
  await copyFile(`${OUT_DIR}/avatar-6.webp`, `${OUT_DIR}/avatar-12.webp`).catch(() => {});

  // 2. Process new themed avatars
  for (const item of MAPPINGS) {
    await processAvatar(item.id, item.source);
  }

  console.log('All 12 avatars ready in src/public/avatars/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
