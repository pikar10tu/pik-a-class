import { describe, it, expect } from 'vitest';
import { str, enumOf, bool, int, num, arrayOfStr, isoDate, obj, checkValue } from './field-types.js';

describe('checkValue', () => {
  it('accepts a normal string and rejects non-strings', () => {
    expect(checkValue(str(), 'hello')).toBeNull();
    expect(checkValue(str(), 42)).toBe('ต้องเป็นข้อความ');
  });

  it('rejects an empty string for a required field but allows it when optional', () => {
    expect(checkValue(str(), '   ')).toBe('ห้ามเว้นว่าง');
    expect(checkValue(str({ required: false }), '')).toBeNull();
  });

  it('rejects a string longer than maxLength', () => {
    expect(checkValue(str({ maxLength: 3 }), 'abcd')).toBe('ยาวเกิน 3 ตัวอักษร');
  });

  it('accepts only listed values for an enum', () => {
    const spec = enumOf(['a', 'b']);
    expect(checkValue(spec, 'a')).toBeNull();
    expect(checkValue(spec, 'c')).toBe('ต้องเป็นหนึ่งใน: a, b');
  });

  it('checks booleans, integers, and numeric ranges', () => {
    expect(checkValue(bool(), true)).toBeNull();
    expect(checkValue(bool(), 'true')).toBe('ต้องเป็น true หรือ false');
    expect(checkValue(int(), 1.5)).toBe('ต้องเป็นจำนวนเต็ม');
    expect(checkValue(int({ min: 0, max: 3 }), 4)).toBe('ต้องอยู่ระหว่าง 0 ถึง 3');
    expect(checkValue(num({ min: 0, max: 1 }), 0.7)).toBeNull();
  });

  it('checks string arrays', () => {
    expect(checkValue(arrayOfStr(), ['a', 'b'])).toBeNull();
    expect(checkValue(arrayOfStr(), 'a')).toBe('ต้องเป็นรายการ (array)');
    expect(checkValue(arrayOfStr(), ['a', 2])).toBe('ทุกสมาชิกต้องเป็นข้อความ');
    expect(checkValue(arrayOfStr({ minItems: 1 }), [])).toBe('ต้องมีอย่างน้อย 1 รายการ');
  });

  it('checks nested objects against a shape', () => {
    const spec = obj({ current: int({ min: 0 }), lastActiveDate: str() });
    expect(checkValue(spec, { current: 3, lastActiveDate: '2026-09-20' })).toBeNull();
    expect(checkValue(spec, { current: 3 })).toBe('lastActiveDate: จำเป็นต้องมี');
    expect(checkValue(spec, { current: -1, lastActiveDate: 'x' })).toBe('current: ต้องไม่น้อยกว่า 0');
    expect(checkValue(spec, { current: 3, lastActiveDate: 'x', extra: 1 })).toBe('extra: ฟิลด์นี้ไม่มีใน schema');
    expect(checkValue(spec, 'nope')).toBe('ต้องเป็นข้อมูลแบบ object');
  });

  it('checks ISO date strings', () => {
    expect(checkValue(isoDate(), '2026-09-20T10:00:00.000Z')).toBeNull();
    expect(checkValue(isoDate(), '20/09/2026')).toBe('ต้องเป็นวันที่รูปแบบ ISO (เช่น 2026-09-20T10:00:00.000Z)');
  });
});
