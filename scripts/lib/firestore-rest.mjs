// ตัวช่วยคุยกับ Firestore ของ production ผ่าน REST API โดยใช้บัญชีที่ล็อกอิน Firebase CLI ไว้
// (npx firebase login) — ไม่ต้องมี service account key บนเครื่อง
// ใช้ร่วมกันโดย scripts/content-health.mjs และ scripts/content-sync.mjs
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const PROJECT_ID = process.env.FIREBASE_PROJECT || 'pik-a-class';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;
const CLI_CONFIG = join(homedir(), '.config', 'configstore', 'firebase-tools.json');

function readCliToken() {
  if (!existsSync(CLI_CONFIG)) {
    throw new Error('ยังไม่ได้ล็อกอิน Firebase CLI — รัน: npx firebase login');
  }
  return JSON.parse(readFileSync(CLI_CONFIG, 'utf8')).tokens?.access_token;
}

async function tokenWorks(token) {
  if (!token) return false;
  const res = await fetch(`${BASE}/stages?pageSize=1`, { headers: { Authorization: `Bearer ${token}` } });
  return res.ok;
}

export async function getAccessToken() {
  let token = readCliToken();
  if (await tokenWorks(token)) return token;
  // token หมดอายุ — ให้ Firebase CLI refresh ให้เอง (คำสั่งใดก็ได้ที่ต้องยืนยันตัวตน)
  execSync(`npx firebase projects:list`, { stdio: 'ignore' });
  token = readCliToken();
  if (!(await tokenWorks(token))) {
    throw new Error('token ใช้ไม่ได้ — รัน: npx firebase login --reauth');
  }
  return token;
}

export function toValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'string') return { stringValue: val };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (typeof val === 'number') {
    return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
  }
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toValue) } };
  if (typeof val === 'object') {
    return { mapValue: { fields: Object.fromEntries(Object.entries(val).map(([k, v]) => [k, toValue(v)])) } };
  }
  return { stringValue: String(val) };
}

export function fromValue(v) {
  if (!v) return undefined;
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) return (v.arrayValue.values ?? []).map(fromValue);
  if ('mapValue' in v) {
    return Object.fromEntries(Object.entries(v.mapValue.fields ?? {}).map(([k, x]) => [k, fromValue(x)]));
  }
  return undefined;
}

export function fromDoc(doc) {
  const id = doc.name.split('/').pop();
  return { id, ...Object.fromEntries(Object.entries(doc.fields ?? {}).map(([k, v]) => [k, fromValue(v)])) };
}

export async function listAll(collection, token) {
  const out = [];
  let pageToken = '';
  do {
    const url = `${BASE}/${collection}?pageSize=300${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`อ่าน ${collection} ไม่สำเร็จ: ${res.status} ${await res.text()}`);
    const data = await res.json();
    out.push(...(data.documents ?? []).map(fromDoc));
    pageToken = data.nextPageToken ?? '';
  } while (pageToken);
  return out;
}

// อัปเดตเฉพาะฟิลด์ที่ส่งมา (updateMask) — ฟิลด์อื่นในเอกสารไม่ถูกแตะ
// ถ้ายังไม่มีเอกสาร Firestore จะสร้างให้ · ฟิลด์ใน deleteFields จะถูกลบออกจากเอกสาร
export async function patchDoc(collection, id, data, token, { deleteFields = [] } = {}) {
  const mask = [...Object.keys(data), ...deleteFields]
    .map((k) => `updateMask.fieldPaths=${encodeURIComponent(k)}`)
    .join('&');
  const res = await fetch(`${BASE}/${collection}/${id}?${mask}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, toValue(v)])) }),
  });
  if (!res.ok) throw new Error(`เขียน ${collection}/${id} ไม่สำเร็จ: ${res.status} ${await res.text()}`);
}
