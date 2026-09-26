import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: 'src',
  // root เป็น src/ แต่ไฟล์ .env* อยู่ที่รากโปรเจกต์ — ไม่ชี้ตรงนี้ dev/preview บนเครื่องจะไม่มีค่า Firebase
  envDir: resolve(__dirname),
  base: '/pik-a-class/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon.png',
        'apple-touch-icon.png',
        'mascot/*.webp',
        'islands/*.webp',
        'avatars/*.webp',
      ],
      manifest: {
        name: 'Pik a Class — ห้องเรียนภาษาอังกฤษตะลุยด่าน',
        short_name: 'Pik a Class',
        description: 'เว็บทบทวนและฝึกฝนภาษาอังกฤษแบบตะลุยด่าน สนุก เข้าใจง่าย',
        theme_color: '#37c871',
        background_color: '#f8faf9',
        display: 'standalone',
        start_url: '/pik-a-class/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp}'],
        // ภาพ .png/.jpg ของ mascot/avatars/islands เป็นแค่ตัวสำรอง (onerror) ของ .webp
        // ไม่ต้อง precache ลงมือถือนักเรียน — ประหยัดราว 1.4 MB ต่อเครื่อง
        globIgnores: ['mascot/*.png', 'avatars/*.png', 'islands/*.jpg'],
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/login.html'),
        onboarding: resolve(__dirname, 'src/onboarding.html'),
        dashboard: resolve(__dirname, 'src/dashboard.html'),
        profile: resolve(__dirname, 'src/profile.html'),
        handbook: resolve(__dirname, 'src/handbook.html'),
        learn: resolve(__dirname, 'src/learn/index.html'),
        learnPath: resolve(__dirname, 'src/learn/path.html'),
        learnPlay: resolve(__dirname, 'src/learn/play.html'),
        admin: resolve(__dirname, 'src/admin/index.html'),
        adminUsers: resolve(__dirname, 'src/admin/users.html'),
        adminContent: resolve(__dirname, 'src/admin/content.html'),
        adminStages: resolve(__dirname, 'src/admin/stages.html'),
        adminImport: resolve(__dirname, 'src/admin/import.html'),
        adminExercise: resolve(__dirname, 'src/admin/exercise.html'),
        adminStage: resolve(__dirname, 'src/admin/stage.html'),
        adminStudentReport: resolve(__dirname, 'src/admin/student-report.html'),
        vocabHub: resolve(__dirname, 'src/vocab/index.html'),
        vocabCafe: resolve(__dirname, 'src/vocab/cafe.html'),
        notFound: resolve(__dirname, 'src/404.html'),
      },
    },
  },
});
