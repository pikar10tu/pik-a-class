import { readFileSync } from 'node:fs';
import { contentHash } from '../src/lib/schema/content-checks.js';

const cfg = JSON.parse(readFileSync('C:/Users/winusr/.config/configstore/firebase-tools.json', 'utf8'));

async function getAccessToken() {
  let token = cfg.tokens.access_token;
  const test = await fetch('https://firestore.googleapis.com/v1/projects/pik-a-class/databases/(default)/documents/users?pageSize=1', {
    headers: { Authorization: 'Bearer ' + token }
  });
  if (test.ok) return token;

  console.log('Refreshing OAuth token...');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho85qd6.apps.googleusercontent.com',
      grant_type: 'refresh_token',
      refresh_token: cfg.tokens.refresh_token
    })
  });
  const data = await res.json();
  if (!data.access_token) {
    throw new Error('Failed to refresh token: ' + JSON.stringify(data));
  }
  return data.access_token;
}

function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) return { timestampValue: val };
    return { stringValue: val };
  }
  if (typeof val === 'boolean') return { booleanValue: val };
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return { integerValue: String(val) };
    return { doubleValue: val };
  }
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

async function fetchAllExercises(token) {
  let documents = [];
  let pageToken = '';
  do {
    const url = `https://firestore.googleapis.com/v1/projects/pik-a-class/databases/(default)/documents/exercises?pageSize=100${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Fetch error: ${res.statusText}`);
    const data = await res.json();
    if (data.documents) documents.push(...data.documents);
    pageToken = data.nextPageToken;
  } while (pageToken);
  return documents;
}

async function main() {
  console.log('Connecting to Firestore as prawich.aum@dome.tu.ac.th...');
  const token = await getAccessToken();

  const existingDocs = await fetchAllExercises(token);
  console.log(`Found ${existingDocs.length} existing exercises in Firestore.`);

  const existingPrompts = new Set();
  const existingHashes = new Set();
  for (const d of existingDocs) {
    const p = d.fields?.prompt?.stringValue;
    if (p) existingPrompts.add(p.trim().toLowerCase());
    const h = d.fields?.contentHash?.stringValue;
    if (h) existingHashes.add(h);
  }

  const rawSeeds = JSON.parse(readFileSync('docs/seeds/a2-tenses-saga-exercises.json', 'utf8'));
  console.log(`Read ${rawSeeds.length} exercises from a2-tenses-saga-exercises.json.`);

  let inserted = 0;
  let skipped = 0;

  for (const seed of rawSeeds) {
    const hash = contentHash(seed);
    const pKey = (seed.prompt || '').trim().toLowerCase();

    if (existingHashes.has(hash) || existingPrompts.has(pKey)) {
      skipped++;
      continue;
    }

    const docBody = {
      ...seed,
      contentHash: hash,
      reviewStatus: 'published', // ครูปิ๊กต้องการให้นำเข้าและอนุมัติ (published) ทันที
      createdBy: 'prawich.aum@dome.tu.ac.th'
    };

    const fields = {};
    for (const [k, v] of Object.entries(docBody)) {
      fields[k] = toFirestoreValue(v);
    }

    const postRes = await fetch('https://firestore.googleapis.com/v1/projects/pik-a-class/databases/(default)/documents/exercises', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });

    if (!postRes.ok) {
      const errText = await postRes.text();
      console.error(`Error inserting prompt "${seed.prompt.substring(0, 30)}...":`, errText);
    } else {
      inserted++;
      existingHashes.add(hash);
      existingPrompts.add(pKey);
      process.stdout.write(`\rImported & approved: ${inserted} / ${rawSeeds.length}`);
    }
  }

  console.log('\n----------------------------------------');
  console.log(`Import completed successfully!`);
  console.log(`Newly imported & published: ${inserted}`);
  console.log(`Already existed (skipped): ${skipped}`);
  console.log(`Total exercises now in Firestore: ${existingDocs.length + inserted}`);
}

main().catch(err => {
  console.error('Fatal error during import:', err);
  process.exit(1);
});
