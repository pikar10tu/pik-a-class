---
name: web-perf-pwa
description: >-
  Performance optimization, image compression pipeline, PWA caching, and runtime memory management.
  Use when optimizing load times, handling large media assets, improving Lighthouse scores, or configuring Service Worker caching.
---

# Web Performance & PWA Guidelines (Pik a Class)

This skill provides procedures for maintaining sub-second load times, lightweight asset pipelines, offline PWA stability, and preventing memory leaks on mobile devices.

---

## 1. Asset Optimization Pipeline (Sharp & WebP)
1. **Target Asset Budgets:**
   - Hero / Level Banners: **< 60 KB** each (720px width, WebP or 80% JPEG).
   - Mascots / Avatars: **< 30 KB** each (PNG/WebP with alpha transparency).
   - Icons / Small Badges: **< 10 KB** each.
   - Total initial page weight budget: **< 500 KB** (excluding Firebase scripts).
2. **Sharp Image Processing Procedure:**
   - Keep high-resolution master art in `docs/design/` or `assets_raw/`.
   - Never serve multi-megabyte images directly to the browser.
   - When importing new illustrations:
     ```javascript
     import sharp from 'sharp';
     await sharp(inputPath)
       .resize({ width: 720, withoutEnlargement: true })
       .webp({ quality: 80, effort: 6 })
       .toFile(outputPath);
     ```
3. **HTML Image Attributes:**
   - Always specify explicit `width` and `height` attributes on `<img>` tags to eliminate Cumulative Layout Shift (CLS).
   - Use `loading="lazy"` on below-the-fold images (such as cards, gallery items, and secondary badges).

---

## 2. Progressive Web App (PWA) & Workbox Caching
1. **Multi-Page Application (MPA) Registration:**
   - In `vite.config.js`, every HTML file in subdirectories must be registered in `rollupOptions.input`.
   - Set `navigateFallback: null` to avoid SPA single-page fallback routing breaking MPA links.
2. **Precache List Maintenance:**
   - Configure `globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg}']` in `vite-plugin-pwa`.
   - Run `npm run build` after adding new static pages or images to verify that precache manifests are updated.
3. **Audio Context Autoplay Protection:**
   - Web Audio `AudioContext` must NEVER be instantiated or resumed on page load.
   - Always defer `AudioContext.resume()` to explicit user interactions (button tap, answer click).

---

## 3. Runtime Memory & Game Loop Protection (Speed Cafe & Endless Mode)
1. **Interval & Timer Cleanup:**
   - Always clear `setInterval` and `requestAnimationFrame` on screen transitions or game over:
     ```javascript
     if (timerInterval) {
       clearInterval(timerInterval);
       timerInterval = null;
     }
     ```
2. **Event Listener Hygiene:**
   - Avoid creating new anonymous event listeners inside render loops.
   - Use event delegation on parent containers (`closest()`) or `{ once: true }` where appropriate.
3. **SpeechSynthesis Garbage Collection:**
   - On iOS Safari, `window.speechSynthesis` can freeze if previous utterances are cancelled mid-speech.
   - Always call `window.speechSynthesis.cancel()` before creating a new `SpeechSynthesisUtterance`.
