import { playButtonSound, playMascotSound } from './answer-audio.js';
import { loadMuted } from './sound-prefs.js';

export function attachUiSounds() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  document.addEventListener('click', (event) => {
    try {
      if (loadMuted(window.localStorage)) return;

      const mascot = event.target.closest('.learn-mascot, .dashboard-mascot, .login-mascot');
      if (mascot) {
        playMascotSound();
        mascot.classList.remove('mascot-react');
        void mascot.offsetWidth;
        mascot.classList.add('mascot-react');
        return;
      }

      const interactive = event.target.closest(
        'button, .btn-primary, .btn-chunky, .btn-google, .btn-ghost, .dashboard-card, .stage-node, .admin-nav a, .app-nav-link'
      );
      if (!interactive) return;

      if (interactive.closest('#answers') || interactive.id === 'mute-toggle') return;

      playButtonSound();
    } catch {
      // Audio failures are ignored safely
    }
  }, { passive: true });
}
