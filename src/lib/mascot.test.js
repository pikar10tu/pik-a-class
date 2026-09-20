import { describe, it, expect } from 'vitest';
import { MASCOT_MOODS, mascotSrc } from './mascot.js';

describe('mascotSrc', () => {
  it('maps each mood to a file under the base url', () => {
    expect(mascotSrc('correct', '/pik-a-class/')).toBe('/pik-a-class/mascot/correct.png');
  });

  it('falls back to the normal pose for an unknown mood', () => {
    expect(mascotSrc('confused', '/pik-a-class/')).toBe('/pik-a-class/mascot/normal.png');
  });

  it('lists every mood the app uses', () => {
    expect(MASCOT_MOODS).toEqual(['normal', 'correct', 'wrong', 'clear']);
  });
});
