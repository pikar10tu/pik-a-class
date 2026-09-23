export const ADMIN_PAGES = [
  { href: 'admin/index.html', label: 'ภาพรวม' },
  { href: 'admin/users.html', label: 'จัดการผู้ใช้' },
  { href: 'admin/content.html', label: 'คลังเนื้อหา' },
  { href: 'admin/stages.html', label: 'ด่าน' },
  { href: 'admin/import.html', label: 'นำเข้า JSON' },
  { href: 'dashboard.html', label: '← กลับหน้าหลัก' },
];

export function renderAdminNav(container, currentHref, baseUrl) {
  const nav = document.createElement('nav');
  nav.className = 'admin-nav';
  nav.setAttribute('aria-label', 'เมนูผู้ดูแลระบบ');

  for (const page of ADMIN_PAGES) {
    const link = document.createElement('a');
    link.href = `${baseUrl}${page.href}`;
    link.textContent = page.label;
    if (page.href === currentHref) link.setAttribute('aria-current', 'page');
    nav.appendChild(link);
  }

  container.replaceChildren(nav);
}
