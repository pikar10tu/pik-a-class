import { requireAdmin } from '../lib/auth-guard.js';

requireAdmin((firebaseUser) => {
  document.getElementById('admin-welcome').textContent = `Admin: ${firebaseUser.email}`;
});
