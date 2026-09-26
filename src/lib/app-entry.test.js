import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { SESSION_KEY, MAX_AGE_MS } from './local-cache.js';

// index.html ไม่มี JS bundle จึง import ไม่ได้ — ค่าที่ copy ไว้ต้องตรงกับ local-cache.js
describe('src/index.html fast entry', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  it('uses the same session key and max age as local-cache.js', () => {
    expect(html).toContain(`'${SESSION_KEY}'`);
    expect(html).toContain(String(MAX_AGE_MS));
  });
  it('runs the redirect script before the meta refresh', () => {
    expect(html.indexOf(SESSION_KEY)).toBeLessThan(html.indexOf('http-equiv="refresh"'));
  });
});
