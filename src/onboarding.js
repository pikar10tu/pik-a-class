import { requireLogin } from './lib/auth-guard.js';
import { db } from './lib/firebase.js';
import { completeOnboarding } from './lib/user-profile-io.js';
import { validateOnboardingForm } from './lib/onboarding-validation.js';

let currentUid = null;

requireLogin((firebaseUser) => {
  currentUid = firebaseUser.uid;
});

function renderErrors(errors) {
  document.querySelectorAll('.field-error').forEach((el) => {
    el.textContent = '';
  });
  for (const [field, message] of Object.entries(errors)) {
    const el = document.querySelector(`[data-error-for="${field}"]`);
    if (el) el.textContent = message;
  }
}

document.getElementById('onboarding-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target).entries());
  const { valid, errors } = validateOnboardingForm(formData);
  renderErrors(errors);
  if (!valid) return;
  await completeOnboarding(db, currentUid, formData);
  window.location.href = './dashboard.html';
});
