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
        admin: resolve(__dirname, 'src/admin/index.html'),
      },
    },
  },
});
