import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: 'src',
  base: '/pik-a-class/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.png', 'apple-touch-icon.png', 'mascot/*.png'],
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
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
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
      },
    },
  },
});
