// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { triggerMascotReaction } from './ui-sound.js';

describe('triggerMascotReaction', () => {
  let element;

  beforeEach(() => {
    vi.useFakeTimers();
    element = document.createElement('div');
    element.className = 'dashboard-mascot';
    document.body.appendChild(element);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    element.remove();
  });

  it('adds mascot-react class when triggered', () => {
    triggerMascotReaction(element);
    expect(element.classList.contains('mascot-react')).toBe(true);
  });

  it('removes mascot-react class on animationend event', () => {
    triggerMascotReaction(element);
    expect(element.classList.contains('mascot-react')).toBe(true);

    element.dispatchEvent(new Event('animationend'));
    expect(element.classList.contains('mascot-react')).toBe(false);
  });

  it('removes mascot-react class automatically after safety timeout (600ms)', () => {
    triggerMascotReaction(element);
    expect(element.classList.contains('mascot-react')).toBe(true);

    vi.advanceTimersByTime(650);
    expect(element.classList.contains('mascot-react')).toBe(false);
  });

  it('allows immediate subsequent triggers without getting stuck', () => {
    triggerMascotReaction(element);
    expect(element.classList.contains('mascot-react')).toBe(true);

    // Fast tap 100ms later
    vi.advanceTimersByTime(100);
    triggerMascotReaction(element);
    expect(element.classList.contains('mascot-react')).toBe(true);

    vi.advanceTimersByTime(650);
    expect(element.classList.contains('mascot-react')).toBe(false);
  });
});
