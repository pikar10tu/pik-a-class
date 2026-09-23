import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'src/public/mascot/normal.png';
const OUT_DIR = 'src/public';

async function createIcon(size, paddingRatio = 0.12, bg = { r: 248, g: 250, b: 249, alpha: 1 }) {
  const innerSize = Math.round(size * (1 - paddingRatio * 2));
  const mascotBuffer = await sharp(SOURCE)
    .resize({ width: innerSize, height: innerSize, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const meta = await sharp(mascotBuffer).metadata();
  const left = Math.round((size - meta.width) / 2);
  const top = Math.round((size - meta.height) / 2);

  // สร้างไอคอนที่มีพื้นหลังทรงนุ่มนวลและน้องหยกอยู่ตรงกลาง
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg,
    },
  })
    .composite([{ input: mascotBuffer, left, top }])
    .png({ compressionLevel: 9 });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // 1. PWA 512x512
  await (await createIcon(512, 0.1, { r: 240, g: 253, b: 244, alpha: 1 }))
    .toFile(`${OUT_DIR}/pwa-512x512.png`);
  console.log('Created pwa-512x512.png');

  // 2. PWA 192x192
  await (await createIcon(192, 0.1, { r: 240, g: 253, b: 244, alpha: 1 }))
    .toFile(`${OUT_DIR}/pwa-192x192.png`);
  console.log('Created pwa-192x192.png');

  // 3. Apple Touch Icon 180x180 (iOS requires solid background)
  await (await createIcon(180, 0.1, { r: 240, g: 253, b: 244, alpha: 1 }))
    .toFile(`${OUT_DIR}/apple-touch-icon.png`);
  console.log('Created apple-touch-icon.png');

  // 4. Favicon 48x48 / 32x32
  await (await createIcon(48, 0.05, { r: 0, g: 0, b: 0, alpha: 0 }))
    .toFile(`${OUT_DIR}/favicon.png`);
  console.log('Created favicon.png');

  // 5. Favicon 32x32 for ico
  await (await createIcon(32, 0.05, { r: 0, g: 0, b: 0, alpha: 0 }))
    .toFile(`${OUT_DIR}/favicon.ico`);
  console.log('Created favicon.ico');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
