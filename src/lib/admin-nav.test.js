import { describe, it, expect, beforeEach } from 'vitest';
import { ADMIN_PAGES, renderAdminNav } from './admin-nav.js';

// ไฟล์นี้รันบน jsdom ผ่าน environmentMatchGlobs ใน vitest.config.js

describe('renderAdminNav', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="nav"></div>';
  });

  it('renders one link per admin page with the base url prefix', () => {
    renderAdminNav(document.getElementById('nav'), 'admin/users.html', '/pik-a-class/');
    const links = [...document.querySelectorAll('#nav a')];

    expect(links).toHaveLength(ADMIN_PAGES.length);
    expect(links.map((a) => a.getAttribute('href'))).toContain('/pik-a-class/admin/users.html');
    expect(links.map((a) => a.getAttribute('href'))).toContain('/pik-a-class/admin/stages.html');
  });

  it('marks the current page for screen readers', () => {
    renderAdminNav(document.getElementById('nav'), 'admin/users.html', '/pik-a-class/');
    const current = document.querySelector('#nav a[aria-current="page"]');
    expect(current.getAttribute('href')).toBe('/pik-a-class/admin/users.html');
  });
});
