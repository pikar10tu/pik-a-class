import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'src', 'public');
const ISLANDS_DIR = path.join(PUBLIC_DIR, 'islands');
const MASCOT_DIR = path.join(PUBLIC_DIR, 'mascot');
const AVATARS_DIR = path.join(PUBLIC_DIR, 'avatars');
const DOCS_DESIGN = path.join(PROJECT_ROOT, 'docs', 'design');

if (!fs.existsSync(AVATARS_DIR)) {
  fs.mkdirSync(AVATARS_DIR, { recursive: true });
}

// 1. Optimize Islands
async function optimizeIslands() {
  console.log('--- 1. Optimizing Island Artworks ---');
  const islandFiles = ['island-a1.jpg', 'island-a2.jpg', 'island-b1.jpg', 'island-b2.jpg'];
  const backupDir = path.join(DOCS_DESIGN, 'islands');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  for (const file of islandFiles) {
    const srcPath = path.join(backupDir, file);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source full-res not found: ${srcPath}`);
      continue;
    }
    const baseName = path.basename(file, '.jpg');

    // Generate WebP (720px width, quality 80)
    const webpPath = path.join(ISLANDS_DIR, `${baseName}.webp`);
    await sharp(srcPath)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;

    // Generate Compressed JPG (720px width, quality 80)
    const jpgPath = path.join(ISLANDS_DIR, file);
    await sharp(srcPath)
      .resize({ width: 720, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(jpgPath);
    const jpgSize = fs.statSync(jpgPath).size;

    console.log(`✓ ${file} -> webp: ${(webpSize / 1024).toFixed(1)} KB, jpg: ${(jpgSize / 1024).toFixed(1)} KB`);
  }
}

// 2. Flood Fill helper to remove outer white/off-white background
function removeOuterWhite(data, w, h) {
  const visited = new Uint8Array(w * h);
  const queue = [];

  // Seed boundary pixels
  for (let x = 0; x < w; x++) {
    queue.push([x, 0]);
    queue.push([x, h - 1]);
    visited[x] = 1;
    visited[(h - 1) * w + x] = 1;
  }
  for (let y = 1; y < h - 1; y++) {
    queue.push([0, y]);
    queue.push([w - 1, y]);
    visited[y * w] = 1;
    visited[y * w + (w - 1)] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const [x, y] = queue[head++];
    const idx = (y * w + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    if (r >= 238 && g >= 238 && b >= 238) {
      data[idx + 3] = 0; // Transparent

      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
      ];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const nIdx = ny * w + nx;
          if (!visited[nIdx]) {
            visited[nIdx] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }
}

// 3. Extract Avatars
async function extractAvatars() {
  console.log('--- 2. Extracting & Optimizing Avatars ---');
  const sheetPath = path.join(DOCS_DESIGN, 'mascot-poses-sheet.jpg');
  if (!fs.existsSync(sheetPath)) {
    console.warn('Mascot poses sheet not found!');
    return;
  }

  const avatars = [
    { id: 'avatar-1', title: 'น้องหยกสดใส', en: 'Classic Happy', left: 70, top: 40, width: 380, height: 480 },
    { id: 'avatar-2', title: 'น้องหยกชัยชนะ', en: 'Victory Peace', left: 2360, top: 40, width: 420, height: 480 },
    { id: 'avatar-3', title: 'น้องหยกพลังใจ', en: 'Champion Power', left: 520, top: 570, width: 420, height: 460 },
    { id: 'avatar-4', title: 'น้องหยกตาประกาย', en: 'Star Dreamer', left: 2330, top: 570, width: 450, height: 460 },
    { id: 'avatar-5', title: 'น้องหยกเยี่ยมยอด', en: 'Double Thumbs Up', left: 540, top: 1060, width: 400, height: 460 },
    { id: 'avatar-6', title: 'น้องหยกส่งรัก', en: 'Heart Love', left: 980, top: 1060, width: 410, height: 460 }
  ];

  for (const av of avatars) {
    // 1. Extract region
    const rawBuffer = await sharp(sheetPath)
      .extract({ left: av.left, top: av.top, width: av.width, height: av.height })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // 2. Clear background
    removeOuterWhite(rawBuffer.data, rawBuffer.info.width, rawBuffer.info.height);

    // 3. Trim transparent edges & fit into 256x256 square with padding
    const pngPath = path.join(AVATARS_DIR, `${av.id}.png`);
    const webpPath = path.join(AVATARS_DIR, `${av.id}.webp`);

    const processed = await sharp(rawBuffer.data, {
      raw: {
        width: rawBuffer.info.width,
        height: rawBuffer.info.height,
        channels: 4
      }
    })
      .trim()
      .resize(240, 240, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      });

    await processed.clone().png().toFile(pngPath);
    await processed.clone().webp({ quality: 85 }).toFile(webpPath);

    const sizePng = fs.statSync(pngPath).size;
    const sizeWebp = fs.statSync(webpPath).size;
    console.log(`✓ ${av.id} (${av.title}): PNG ${(sizePng / 1024).toFixed(1)} KB, WebP ${(sizeWebp / 1024).toFixed(1)} KB`);
  }
}

// 4. Optimize Mascot Assets
async function optimizeMascots() {
  console.log('--- 3. Optimizing Mascot Assets ---');
  const mascots = ['normal.png', 'correct.png', 'wrong.png', 'clear.png'];
  for (const m of mascots) {
    const src = path.join(MASCOT_DIR, m);
    if (!fs.existsSync(src)) continue;
    const base = path.basename(m, '.png');
    const webp = path.join(MASCOT_DIR, `${base}.webp`);
    await sharp(src)
      .webp({ quality: 85 })
      .toFile(webp);
    console.log(`✓ Generated ${base}.webp (${(fs.statSync(webp).size / 1024).toFixed(1)} KB)`);
  }
}

async function run() {
  await optimizeIslands();
  await extractAvatars();
  await optimizeMascots();
  console.log('All assets successfully optimized!');
}

run().catch(console.error);
