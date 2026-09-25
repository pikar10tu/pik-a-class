import { requireLogin } from './lib/auth-guard.js';
import { db } from './lib/firebase.js';
import { completeOnboarding } from './lib/user-profile-io.js';
import { validateOnboardingForm, GRADES, SCHOOL_GRADES } from './lib/onboarding-validation.js';
import { showPageError } from './lib/page-error.js';
import { CONSENT_TITLE, CONSENT_SECTIONS, CONSENT_CHECKBOX_LABEL } from './lib/consent.js';
import { mascotSrc } from './lib/mascot.js';
import { initPwaUpdate } from './lib/pwa-update.js';

initPwaUpdate();

const base = import.meta.env.BASE_URL;
const mascotEl = document.getElementById('mascot');
if (mascotEl) {
  mascotEl.onerror = () => {
    mascotEl.src = mascotSrc('normal', base, 'png');
  };
  mascotEl.src = mascotSrc('normal', base, 'webp');
}

const gradeSelect = document.getElementById('grade');
const schoolRequiredMark = document.getElementById('school-required-mark');

for (const grade of GRADES) {
  const option = document.createElement('option');
  option.value = grade;
  option.textContent = grade;
  gradeSelect.appendChild(option);
}

gradeSelect.addEventListener('change', () => {
  if (schoolRequiredMark) {
    schoolRequiredMark.hidden = !SCHOOL_GRADES.includes(gradeSelect.value);
  }
});

const consentBox = document.getElementById('consent-box');
const heading = document.createElement('h2');
heading.textContent = CONSENT_TITLE;
consentBox.appendChild(heading);
for (const section of CONSENT_SECTIONS) {
  const p = document.createElement('p');
  if (section.heading) {
    const strong = document.createElement('strong');
    strong.textContent = `${section.heading}: `;
    p.appendChild(strong);
  }
  p.appendChild(document.createTextNode(section.body));
  consentBox.appendChild(p);
}
document.getElementById('consent-label').textContent = CONSENT_CHECKBOX_LABEL;

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
  const prefix = formData.prefix === 'พี่' ? 'พี่' : 'น้อง';
  formData.prefix = prefix;
  if (formData.nickname) {
    formData.callName = `${prefix}${formData.nickname.trim()}`;
  }
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
