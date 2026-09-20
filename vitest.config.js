import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    environmentMatchGlobs: [['src/lib/admin-*.test.js', 'jsdom']],
    include: ['src/**/*.test.js'],
  },
});
