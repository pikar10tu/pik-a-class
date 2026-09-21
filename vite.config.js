import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: '/pik-a-class/',
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
