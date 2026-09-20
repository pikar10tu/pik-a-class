export function str({ required = true, maxLength = 2000 } = {}) {
  return { kind: 'str', required, maxLength };
}

export function enumOf(values, { required = true } = {}) {
  return { kind: 'enum', required, values };
}

export function bool({ required = true } = {}) {
  return { kind: 'bool', required };
}

export function int({ required = true, min = null, max = null } = {}) {
  return { kind: 'int', required, min, max };
}

export function num({ required = true, min = null, max = null } = {}) {
  return { kind: 'num', required, min, max };
}

export function arrayOfStr({ required = true, minItems = 0, maxItems = 500 } = {}) {
  return { kind: 'arrayOfStr', required, minItems, maxItems };
}

export function isoDate({ required = true } = {}) {
  return { kind: 'isoDate', required };
}

export function obj(shape, { required = true } = {}) {
  return { kind: 'obj', required, shape };
}

const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

export function checkValue(spec, value) {
  switch (spec.kind) {
    case 'str': {
      if (typeof value !== 'string') return 'ต้องเป็นข้อความ';
      if (spec.required && value.trim() === '') return 'ห้ามเว้นว่าง';
      if (value.length > spec.maxLength) return `ยาวเกิน ${spec.maxLength} ตัวอักษร`;
      return null;
    }
    case 'enum':
      if (!spec.values.includes(value)) return `ต้องเป็นหนึ่งใน: ${spec.values.join(', ')}`;
      return null;
    case 'bool':
      if (typeof value !== 'boolean') return 'ต้องเป็น true หรือ false';
      return null;
    case 'int':
      if (typeof value !== 'number' || !Number.isInteger(value)) return 'ต้องเป็นจำนวนเต็ม';
      return rangeError(spec, value);
    case 'num':
      if (typeof value !== 'number' || Number.isNaN(value)) return 'ต้องเป็นตัวเลข';
      return rangeError(spec, value);
    case 'arrayOfStr': {
      if (!Array.isArray(value)) return 'ต้องเป็นรายการ (array)';
      if (value.length < spec.minItems) return `ต้องมีอย่างน้อย ${spec.minItems} รายการ`;
      if (value.length > spec.maxItems) return `มีได้ไม่เกิน ${spec.maxItems} รายการ`;
      if (value.some((item) => typeof item !== 'string')) return 'ทุกสมาชิกต้องเป็นข้อความ';
      return null;
    }
    case 'isoDate':
      if (typeof value !== 'string' || !ISO_PATTERN.test(value)) {
        return 'ต้องเป็นวันที่รูปแบบ ISO (เช่น 2026-09-20T10:00:00.000Z)';
      }
      return null;
    case 'obj': {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return 'ต้องเป็นข้อมูลแบบ object';
      }
      for (const [key, childSpec] of Object.entries(spec.shape)) {
        if (!Object.prototype.hasOwnProperty.call(value, key)) {
          if (childSpec.required) return `${key}: จำเป็นต้องมี`;
          continue;
        }
        const childError = checkValue(childSpec, value[key]);
        if (childError) return `${key}: ${childError}`;
      }
      for (const key of Object.keys(value)) {
        if (!spec.shape[key]) return `${key}: ฟิลด์นี้ไม่มีใน schema`;
      }
      return null;
    }
    default:
      return `ชนิดฟิลด์ไม่รู้จัก: ${spec.kind}`;
  }
}

function rangeError(spec, value) {
  if (spec.min !== null && value < spec.min) return boundMessage(spec);
  if (spec.max !== null && value > spec.max) return boundMessage(spec);
  return null;
}

function boundMessage(spec) {
  if (spec.min !== null && spec.max !== null) return `ต้องอยู่ระหว่าง ${spec.min} ถึง ${spec.max}`;
  if (spec.min !== null) return `ต้องไม่น้อยกว่า ${spec.min}`;
  return `ต้องไม่เกิน ${spec.max}`;
}
