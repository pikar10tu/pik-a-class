---
name: frontend-ui-craft
description: >-
  Expert guidelines for UI/UX engineering, micro-interactions, mobile-first design,
  responsive layouts, touch accessibility, and 60fps animations in Pik a Class.
  Use when creating or updating frontend pages, styling components, or fixing mobile UX issues.
---

# Frontend UI & Craft Guidelines (Pik a Class)

This skill provides design system rules, mobile touch guidelines, stacking context best practices, and performance-first CSS rules for **Pik a Class**.

---

## 1. Mobile-First Touch & Layout Rules
1. **Minimum Touch Target Size:**
   - Every interactive element (buttons, cards, icons, nodes) MUST have a minimum clickable area of **44x44px** (Apple HIG & WCAG standards).
   - Use `padding` to expand clickable areas without visually bloating elements.
2. **Safe Area & iPhone Notch:**
   - Account for iPhone home indicators and safe area insets:
     ```css
     padding-bottom: max(var(--space-3), env(safe-area-inset-bottom));
     ```
3. **Prevent Touch Glitches:**
   - Use `touch-action: manipulation;` and `-webkit-tap-highlight-color: transparent;` on all interactive buttons, cards, and avatars to prevent 300ms click delay and blue flash boxes on iOS.
4. **Prevent Sticky `:hover` on Touchscreens:**
   - On iOS/Android, tapping an element applies `:hover` permanently until tapped elsewhere.
   - ALWAYS wrap hover styles inside:
     ```css
     @media (hover: hover) and (pointer: fine) {
       .element:hover {
         transform: translateY(-4px);
       }
     }
     ```

---

## 2. Stacking Context & Modal / Backdrop Hierarchy
- Never use arbitrary `z-index`. Follow this strict stacking scale:
  - Base document flow: `z-index: 0`
  - Floating content / canvases: `z-index: 1`
  - Sticky Headers & Bottom Navbars: `z-index: 100`
  - Floating Action Buttons (FAB): `z-index: 200`
  - Modal Backdrops / Sheets: `z-index: 1000` (must have solid/semi-trans background)
  - Modal Card Content: `z-index: 1001` (must have solid surface `background: #ffffff;`)
- Avoid placing `backdrop-filter` or `transform` on ancestor containers of sticky elements, as they create a new stacking context that breaks `position: sticky`.
- Avoid `overflow-x: hidden` on `html` or `body` as it breaks `position: sticky`. Use `overflow-x: clip;` instead.

---

## 3. High Performance 60fps Animations
1. **Compositor-Only Animations:**
   - ONLY animate `transform` and `opacity`.
   - NEVER animate `width`, `height`, `top`, `left`, `margin`, or `padding` as they force full layout reflow and paint cycles, causing frame drops on budget smartphones.
2. **Animation Cleanup & WebKit Bug Prevention:**
   - Do NOT use `animation-fill-mode: forwards !important;` on reusable micro-interactions (like mascot jumps or button bounces).
   - Cleanly remove reaction classes on `animationend` (with a safety timeout fallback) to ensure subsequent taps immediately re-trigger without freezing.
3. **Reduced Motion Support:**
   - Respect user accessibility preferences:
     ```css
     @media (prefers-reduced-motion: reduce) {
       *, *::before, *::after {
         animation-duration: 0.01ms !important;
         transition-duration: 0.01ms !important;
       }
     }
     ```

---

## 4. Visual Contrast & Color Philosophy
1. **Saturated Pastels:**
   - Never use pastels with lightness > 95% for backgrounds, or they wash out to pure white on mobile displays.
   - Ensure a clear border or distinct shadow on white card surfaces (`border: 2px solid #e2e8f0;`).
2. **Chunky 3D Duolingo Button Style:**
   - Primary Action buttons should use the "chunky bottom border" pattern:
     ```css
     background: var(--color-primary);
     border: none;
     border-bottom: 5px solid var(--color-primary-shadow);
     border-radius: var(--radius-lg);
     ```
   - On `:active`, translate down by `2px` and reduce border to `3px` to give satisfying tactile feedback.
