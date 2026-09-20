import { requireAdmin } from '../lib/auth-guard.js';
import { renderAdminNav } from '../lib/admin-nav.js';
import { db } from '../lib/firebase.js';
import { showPageError } from '../lib/page-error.js';
import { LEVELS } from '../lib/schema/taxonomy.js';
import {
  FORM_TYPES,
  TYPE_LABELS,
  emptyFormState,
  formStateFromExercise,
  changeType,
  changeLevel,
  availableTags,
  buildExerciseDoc,
  previewLines,
} from '../lib/exercise-form.js';
import { fetchExercise, createExercise, saveExercise, trashExercise } from '../lib/admin-content-io.js';

renderAdminNav(document.getElementById('admin-nav'), 'admin/content.html', import.meta.env.BASE_URL);

const base = import.meta.env.BASE_URL;
const contentUrl = `${base}admin/content.html`;
document.getElementById('back-link').href = contentUrl;

const params = new URLSearchParams(window.location.search);
const editingId = params.get('id');

const form = document.getElementById('exercise-form');
const typeFields = document.getElementById('type-fields');
const tagPicker = document.getElementById('tag-picker');
const preview = document.getElementById('preview');
const formError = document.getElementById('form-error');
const formStatus = document.getElementById('form-status');
const trashButton = document.getElementById('trash-btn');
const dialog = document.getElementById('confirm-dialog');

let state = emptyFormState();
let existing = null;
let adminUid = null;

for (const skill of ['grammar', 'vocab', 'writing', 'dialogue']) {
  form.elements.skill.appendChild(new Option(skill, skill));
}
for (const level of LEVELS) {
  form.elements.level.appendChild(new Option(level, level));
}
for (const type of FORM_TYPES) {
  form.elements.type.appendChild(new Option(TYPE_LABELS[type], type));
}

function confirmAction({ title, body, okLabel }) {
  return new Promise((resolve) => {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-body').textContent = body;
    const okButton = document.getElementById('confirm-ok');
    const cancelButton = document.getElementById('confirm-cancel');
    okButton.textContent = okLabel;

    function close(result) {
      okButton.removeEventListener('click', onOk);
      cancelButton.removeEventListener('click', onCancel);
      dialog.close();
      resolve(result);
    }
    function onOk() {
      close(true);
    }
    function onCancel() {
      close(false);
    }

    okButton.addEventListener('click', onOk);
    cancelButton.addEventListener('click', onCancel);
    dialog.showModal();
  });
}

function renderTypeFields() {
  typeFields.replaceChildren();
  document.getElementById('blank-tools').hidden = state.type !== 'fill_blank';

  if (state.type === 'mcq') {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'ติ๊กวงกลมหน้าตัวเลือกที่เป็นคำตอบที่ถูก';

    const list = document.createElement('div');
    state.choices.forEach((choice, index) => {
      const row = document.createElement('p');
      row.className = 'choice-row';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'correct';
      radio.checked = state.correctIndex === index;
      radio.setAttribute('aria-label', `ตัวเลือกที่ ${index + 1} เป็นคำตอบที่ถูก`);
      radio.addEventListener('change', () => {
        state.correctIndex = index;
        renderPreview();
      });

      const input = document.createElement('input');
      input.type = 'text';
      input.value = choice;
      input.placeholder = `ตัวเลือกที่ ${index + 1}`;
      input.addEventListener('input', () => {
        state.choices[index] = input.value;
        renderPreview();
      });

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'ลบ';
      remove.disabled = state.choices.length <= 2;
      remove.addEventListener('click', () => {
        state.choices.splice(index, 1);
        if (state.correctIndex >= state.choices.length) state.correctIndex = 0;
        renderTypeFields();
        renderPreview();
      });

      row.append(radio, input, remove);
      list.appendChild(row);
    });

    const add = document.createElement('button');
    add.type = 'button';
    add.textContent = 'เพิ่มตัวเลือก';
    add.addEventListener('click', () => {
      state.choices.push('');
      renderTypeFields();
    });

    const error = document.createElement('p');
    error.className = 'field-error';
    error.dataset.errorFor = 'choices';
    const answerError = document.createElement('p');
    answerError.className = 'field-error';
    answerError.dataset.errorFor = 'answerKey';

    typeFields.append(hint, list, add, error, answerError);
    return;
  }

  if (state.type === 'fill_blank') {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'ใส่ได้หลายคำตอบ เช่น must กับ have to ระบบจะถือว่าถูกทั้งคู่';

    const list = document.createElement('div');
    state.answers.forEach((answer, index) => {
      const row = document.createElement('p');
      row.className = 'choice-row';

      const input = document.createElement('input');
      input.type = 'text';
      input.value = answer;
      input.placeholder = 'คำตอบที่รับได้';
      input.addEventListener('input', () => {
        state.answers[index] = input.value;
        renderPreview();
      });

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'ลบ';
      remove.disabled = state.answers.length <= 1;
      remove.addEventListener('click', () => {
        state.answers.splice(index, 1);
        renderTypeFields();
        renderPreview();
      });

      row.append(input, remove);
      list.appendChild(row);
    });

    const add = document.createElement('button');
    add.type = 'button';
    add.textContent = 'เพิ่มคำตอบที่รับได้';
    add.addEventListener('click', () => {
      state.answers.push('');
      renderTypeFields();
    });

    const error = document.createElement('p');
    error.className = 'field-error';
    error.dataset.errorFor = 'answerKey';

    typeFields.append(hint, list, add, error);
    return;
  }

  const label = document.createElement('label');
  label.textContent = 'เกณฑ์ให้คะแนน (rubric)';
  const textarea = document.createElement('textarea');
  textarea.rows = 3;
  textarea.value = state.rubric;
  textarea.addEventListener('input', () => {
    state.rubric = textarea.value;
    renderPreview();
  });
  label.appendChild(textarea);

  const error = document.createElement('p');
  error.className = 'field-error';
  error.dataset.errorFor = 'rubric';

  typeFields.append(label, error);
}

function renderTagPicker() {
  tagPicker.replaceChildren();
  const tags = availableTags(state.level);

  for (const skill of ['grammar', 'vocab']) {
    const group = tags.filter((tag) => tag.skill === skill);
    if (group.length === 0) continue;

    const box = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = skill === 'grammar' ? 'ไวยากรณ์' : 'คำศัพท์';
    box.appendChild(heading);

    for (const tag of group) {
      const label = document.createElement('label');
      label.className = 'tag-option';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = state.tags.includes(tag.id);
      input.addEventListener('change', () => {
        state.tags = input.checked ? [...state.tags, tag.id] : state.tags.filter((id) => id !== tag.id);
      });
      label.append(input, document.createTextNode(` ${tag.label} (${tag.level})`));
      box.appendChild(label);
    }
    tagPicker.appendChild(box);
  }
}

function renderPreview() {
  preview.replaceChildren();
  for (const line of previewLines(state)) {
    const p = document.createElement('p');
    p.textContent = line;
    preview.appendChild(p);
  }
}

function renderAll() {
  form.elements.skill.value = state.skill;
  form.elements.level.value = state.level;
  form.elements.type.value = state.type;
  form.elements.prompt.value = state.prompt;
  form.elements.isPreview.checked = state.isPreview;
  form.elements.visibility.value = state.visibility;
  form.elements.reviewStatus.value = state.reviewStatus;
  renderTypeFields();
  renderTagPicker();
  renderPreview();
}

function clearErrors() {
  formError.textContent = '';
  for (const el of document.querySelectorAll('[data-error-for]')) el.textContent = '';
}

function showErrors(errors) {
  clearErrors();
  const leftovers = [];
  for (const error of errors) {
    const target = document.querySelector(`[data-error-for="${error.field}"]`);
    if (target) target.textContent = error.message;
    else leftovers.push(`${error.field}: ${error.message}`);
  }
  formError.textContent = leftovers.join(' • ');
}

form.elements.skill.addEventListener('change', () => {
  state.skill = form.elements.skill.value;
});

form.elements.level.addEventListener('change', () => {
  const result = changeLevel(state, form.elements.level.value);
  state = result.state;
  renderTagPicker();
  formStatus.textContent =
    result.droppedTags.length > 0 ? `ถอด tag ที่สูงกว่าเลเวลนี้ออกแล้ว: ${result.droppedTags.join(', ')}` : '';
});

form.elements.type.addEventListener('change', async () => {
  const nextType = form.elements.type.value;
  const hasContent =
    state.choices.some((choice) => choice.trim() !== '') ||
    state.answers.some((answer) => answer.trim() !== '') ||
    state.rubric.trim() !== '';

  if (hasContent) {
    const ok = await confirmAction({
      title: 'เปลี่ยนชนิดโจทย์',
      body: 'ตัวเลือก เฉลย และเกณฑ์ให้คะแนนที่กรอกไว้จะถูกล้างทิ้ง ยืนยันไหม',
      okLabel: 'เปลี่ยนชนิดและล้างข้อมูล',
    });
    if (!ok) {
      form.elements.type.value = state.type;
      return;
    }
  }

  state = changeType(state, nextType);
  renderAll();
});

form.elements.prompt.addEventListener('input', () => {
  state.prompt = form.elements.prompt.value;
  renderPreview();
});

form.elements.isPreview.addEventListener('change', () => {
  state.isPreview = form.elements.isPreview.checked;
});
form.elements.visibility.addEventListener('change', () => {
  state.visibility = form.elements.visibility.value;
});
form.elements.reviewStatus.addEventListener('change', () => {
  state.reviewStatus = form.elements.reviewStatus.value;
});

document.getElementById('insert-blank').addEventListener('click', () => {
  const input = form.elements.prompt;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  input.value = `${input.value.slice(0, start)}___${input.value.slice(end)}`;
  state.prompt = input.value;
  input.focus();
  input.setSelectionRange(start + 3, start + 3);
  renderPreview();
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.textContent = '';

  const result = buildExerciseDoc(state, { existing, adminUid });
  if (!result.ok) {
    showErrors(result.errors);
    return;
  }
  clearErrors();

  try {
    if (editingId) {
      await saveExercise(db, editingId, result.doc);
      existing = result.doc;
      formStatus.textContent = 'บันทึกแล้ว';
    } else {
      await createExercise(db, result.doc);
      window.location.href = `${contentUrl}?saved=1`;
    }
  } catch (error) {
    console.error(error);
    formError.textContent = 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง';
  }
});

trashButton.addEventListener('click', async () => {
  const ok = await confirmAction({
    title: 'ทิ้งข้อนี้ลงถังขยะ',
    body: `"${state.prompt}" — จะหายจากคลังและนักเรียนจะไม่เห็น กู้คืนได้จากถังขยะ`,
    okLabel: 'ทิ้งลงถังขยะ',
  });
  if (!ok) return;

  try {
    await trashExercise(db, editingId);
    window.location.href = `${contentUrl}?trashed=1`;
  } catch (error) {
    console.error(error);
    formError.textContent = 'ทิ้งไม่สำเร็จ ลองใหม่อีกครั้ง';
  }
});

requireAdmin(async (firebaseUser) => {
  adminUid = firebaseUser.uid;

  if (!editingId) {
    renderAll();
    return;
  }

  document.getElementById('page-title').textContent = 'แก้ไขโจทย์';
  trashButton.hidden = false;

  try {
    const item = await fetchExercise(db, editingId);
    if (!item) {
      showPageError('ไม่พบข้อนี้ในคลัง (อาจถูกลบไปแล้ว)');
      return;
    }
    existing = item;
    state = formStateFromExercise(item);
    renderAll();
  } catch (error) {
    console.error(error);
    showPageError('โหลดข้อนี้ไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง');
  }
});
