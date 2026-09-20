import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/users.html', import.meta.env.BASE_URL);
requireAdmin(() => {});
