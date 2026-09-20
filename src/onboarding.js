import { requireLogin } from './lib/auth-guard.js';
import { db } from './lib/firebase.js';
import { completeOnboarding } from './lib/user-profile-io.js';
import { validateOnboardingForm, GRADES } from './lib/onboarding-validation.js';
import { showPageError } from './lib/page-error.js';

const gradeSelect = document.getElementById('grade');
for (const grade of GRADES) {
  const option = document.createElement('option');
  option.value = grade;
  option.textContent = grade;
  gradeSelect.appendChild(option);
}

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
  if (!currentUid) {
    showPageError('กำลังโหลดข้อมูล กรุณารอสักครู่แล้วลองใหม่');
    return;
  }
  try {
    await completeOnboarding(db, currentUid, formData);
    window.location.href = './dashboard.html';
  } catch (error) {
    showPageError('บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    console.error(error);
  }
});
