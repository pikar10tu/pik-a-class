import { describe, it, expect } from 'vitest';
import {
  CORRECT_TONE,
  WRONG_TONE,
  BUTTON_POP_TONE,
  MASCOT_CHIME_TONE,
  STAGE_CLEAR_FANFARE,
  STAR_CHIME,
  STAGE_FAIL_GENTLE,
  toneEvents,
  toneDuration,
} from './answer-sound.js';

describe('toneDuration', () => {
  it('keeps the correct-answer tone short, under the ~350ms budget', () => {
    expect(toneDuration(CORRECT_TONE)).toBeLessThan(0.35);
  });

  it('keeps the wrong-answer tone short, under the ~350ms budget', () => {
    expect(toneDuration(WRONG_TONE)).toBeLessThan(0.35);
  });

  it('keeps the button-pop tone very short, under 150ms', () => {
    expect(toneDuration(BUTTON_POP_TONE)).toBeLessThan(0.15);
  });

  it('keeps the mascot chime pleasant and under 300ms', () => {
    expect(toneDuration(MASCOT_CHIME_TONE)).toBeLessThan(0.30);
  });

  it('keeps the stage clear fanfare uplifting and under 1 second', () => {
    expect(toneDuration(STAGE_CLEAR_FANFARE)).toBeGreaterThan(0.5);
    expect(toneDuration(STAGE_CLEAR_FANFARE)).toBeLessThan(1.0);
  });

  it('keeps star chime short and sparkly under 400ms', () => {
    expect(toneDuration(STAR_CHIME)).toBeLessThan(0.40);
  });

  it('keeps stage fail gentle sound under 700ms', () => {
    expect(toneDuration(STAGE_FAIL_GENTLE)).toBeLessThan(0.70);
  });
});

describe('CORRECT_TONE', () => {
  it('rises — each note is higher than the last, for a bright feel', () => {
    const freqs = CORRECT_TONE.notes.map((note) => note.freq);
    for (let i = 1; i < freqs.length; i += 1) {
      expect(freqs[i]).toBeGreaterThan(freqs[i - 1]);
    }
  });

  it('has a short attack so there is no click at the start', () => {
    expect(CORRECT_TONE.attack).toBeGreaterThan(0);
    expect(CORRECT_TONE.attack).toBeLessThan(0.02);
  });
});

describe('WRONG_TONE', () => {
  it('falls — each note is lower than the last, for a gentle "aw" feel', () => {
    const freqs = WRONG_TONE.notes.map((note) => note.freq);
    for (let i = 1; i < freqs.length; i += 1) {
      expect(freqs[i]).toBeLessThan(freqs[i - 1]);
    }
  });

  it('sits lower in pitch than the correct tone, so it reads as gentle rather than alarming', () => {
    const correctAvg = CORRECT_TONE.notes.reduce((sum, n) => sum + n.freq, 0) / CORRECT_TONE.notes.length;
    const wrongAvg = WRONG_TONE.notes.reduce((sum, n) => sum + n.freq, 0) / WRONG_TONE.notes.length;
    expect(wrongAvg).toBeLessThan(correctAvg);
  });

  it('is quieter than the correct tone — a soft "aw", never a buzzer', () => {
    expect(WRONG_TONE.peakGain).toBeLessThan(CORRECT_TONE.peakGain);
  });

  it('keeps peak gain modest for a classroom (never near full volume)', () => {
    expect(CORRECT_TONE.peakGain).toBeLessThanOrEqual(0.25);
    expect(WRONG_TONE.peakGain).toBeLessThanOrEqual(0.25);
  });
});

describe('toneEvents', () => {
  it('lays notes back-to-back with no gaps or overlaps', () => {
    const events = toneEvents(CORRECT_TONE);
    expect(events[0].startOffset).toBe(0);
    expect(events[1].startOffset).toBe(CORRECT_TONE.notes[0].duration);
    expect(events[2].startOffset).toBe(CORRECT_TONE.notes[0].duration + CORRECT_TONE.notes[1].duration);
  });

  it('carries the envelope and waveform onto every event', () => {
    for (const event of toneEvents(WRONG_TONE)) {
      expect(event.attack).toBe(WRONG_TONE.attack);
      expect(event.peakGain).toBe(WRONG_TONE.peakGain);
      expect(event.waveform).toBe(WRONG_TONE.waveform);
    }
  });

  it('produces one event per note', () => {
    expect(toneEvents(CORRECT_TONE)).toHaveLength(CORRECT_TONE.notes.length);
    expect(toneEvents(WRONG_TONE)).toHaveLength(WRONG_TONE.notes.length);
    expect(toneEvents(STAGE_CLEAR_FANFARE)).toHaveLength(STAGE_CLEAR_FANFARE.notes.length);
  });
});

describe('STAGE_CLEAR_FANFARE', () => {
  it('rises across its notes as a victory arpeggio', () => {
    const freqs = STAGE_CLEAR_FANFARE.notes.map((n) => n.freq);
    for (let i = 1; i < freqs.length; i += 1) {
      expect(freqs[i]).toBeGreaterThan(freqs[i - 1]);
    }
  });

  it('uses triangle waveform for bright, warm fanfare timbre', () => {
    expect(STAGE_CLEAR_FANFARE.waveform).toBe('triangle');
  });

  it('keeps peak volume modest', () => {
    expect(STAGE_CLEAR_FANFARE.peakGain).toBeLessThanOrEqual(0.25);
  });
});

describe('STAR_CHIME', () => {
  it('sits in high bell register above 900Hz', () => {
    for (const note of STAR_CHIME.notes) {
      expect(note.freq).toBeGreaterThan(900);
    }
  });

  it('uses sine wave for pure chime effect', () => {
    expect(STAR_CHIME.waveform).toBe('sine');
  });
});

describe('STAGE_FAIL_GENTLE', () => {
  it('keeps peak volume soft and gentle', () => {
    expect(STAGE_FAIL_GENTLE.peakGain).toBeLessThan(STAGE_CLEAR_FANFARE.peakGain);
  });

  it('uses sine wave for smooth comforting tone', () => {
    expect(STAGE_FAIL_GENTLE.waveform).toBe('sine');
  });
});
