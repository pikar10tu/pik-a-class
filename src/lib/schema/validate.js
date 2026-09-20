import { checkValue } from './field-types.js';
import { collectionSchemas } from './index.js';

export function validate(collectionName, data, mode = 'create') {
  const schema = collectionSchemas[collectionName];
  if (!schema) throw new Error(`ไม่รู้จัก collection: ${collectionName}`);

  const errors = [];

  for (const [name, spec] of Object.entries(schema.fields)) {
    const value = data[name];
    if (value === undefined) {
      if (mode === 'create' && spec.required) {
        errors.push({ field: name, message: 'จำเป็นต้องมี' });
      }
      continue;
    }
    const message = checkValue(spec, value);
    if (message) errors.push({ field: name, message });
  }

  for (const key of Object.keys(data)) {
    if (data[key] === undefined) continue;
    if (!schema.fields[key]) errors.push({ field: key, message: 'ฟิลด์นี้ไม่มีใน schema' });
  }

  for (const rule of schema.rules ?? []) {
    const ruleErrors = rule(data, mode);
    if (ruleErrors) errors.push(...ruleErrors);
  }

  return { ok: errors.length === 0, errors };
}
