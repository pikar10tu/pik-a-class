---
name: web-accessibility-a11y
description: >-
  Accessibility standards, WCAG 2.1 AA compliance, keyboard navigation, screen reader support,
  and color contrast auditing for educational platforms.
  Use when creating interactive UI, dialogs, forms, or ensuring accessible question solving.
---

# Web Accessibility & Inclusivity Guidelines (Pik a Class)

This skill ensures **Pik a Class** remains accessible to all learners, including students using external keyboards, tablets, or assistive technologies.

---

## 1. Keyboard Navigation & Focus Management
1. **Interactive Elements:**
   - Any custom clickable element (cards, badge nodes, options) MUST have `role="button"` and `tabindex="0"`.
   - Add both `click` and `keydown` handlers (listening for `Enter` and `Space`).
2. **Focus Visibility:**
   - Never use `outline: none;` without providing a high-contrast replacement.
   - Use `:focus-visible` with a distinct outline:
     ```css
     :focus-visible {
       outline: 3px solid var(--color-primary);
       outline-offset: 2px;
     }
     ```
3. **Modal Dialog Focus Trapping:**
   - Use standard HTML `<dialog>` element wherever possible.
   - When calling `.showModal()`, focus is automatically trapped within the dialog. Ensure pressing `Escape` closes the dialog.

---

## 2. Screen Reader & ARIA Support
1. **Live Regions for Feedback:**
   - Use `aria-live="polite"` or `role="status"` for dynamic feedback messages (e.g. "ถูกต้อง!", "ยังไม่ถูกครับ", "กำลังโหลด…").
2. **Descriptive Labels:**
   - Icon-only buttons (like `✕` close buttons) MUST have `aria-label="ปิด"` or `aria-label="ย้อนกลับ"`.
   - Star ratings must include hidden text for screen readers:
     ```html
     <span class="sr-only">ได้ 3 จาก 3 ดาว</span>
     ```

---

## 3. Color Contrast & Readability
1. **WCAG 2.1 AA Thresholds:**
   - Normal text: contrast ratio at least **4.5:1** against the background.
   - Large text (bold 18px+): contrast ratio at least **3:1**.
   - UI components and borders: at least **3:1** against adjacent colors.
2. **Never Convey Information by Color Alone:**
   - Always pair color cues with icons, text, or shapes (e.g. green checkmark `✓` for correct, red cross `✕` for incorrect, not just green/red backgrounds).
