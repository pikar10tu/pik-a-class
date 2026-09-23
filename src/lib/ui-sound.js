import { playButtonSound, playMascotSound } from './answer-audio.js';
import { loadMuted } from './sound-prefs.js';

export function triggerMascotReaction(mascot) {
  if (!mascot) return;
  playMascotSound();

  mascot.classList.remove('mascot-react');
  if (mascot._reactTimer) {
    clearTimeout(mascot._reactTimer);
    mascot._reactTimer = null;
  }

  // Force reflow
  void mascot.offsetWidth;
  mascot.classList.add('mascot-react');

  const onEnd = () => {
    mascot.classList.remove('mascot-react');
    mascot.removeEventListener('animationend', onEnd);
    if (mascot._reactTimer) {
      clearTimeout(mascot._reactTimer);
      mascot._reactTimer = null;
    }
  };

  mascot.addEventListener('animationend', onEnd, { once: true });
  mascot._reactTimer = setTimeout(onEnd, 600);
}

export function attachUiSounds() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  document.addEventListener('click', (event) => {
    try {
      if (loadMuted(window.localStorage)) return;

      const mascot = event.target.closest('.learn-mascot, .dashboard-mascot, .login-mascot');
      if (mascot) {
        triggerMascotReaction(mascot);
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
