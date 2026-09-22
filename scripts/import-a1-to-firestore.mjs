import { readFileSync } from 'node:fs';
import { contentHash } from '../src/lib/schema/content-checks.js';

const cfg = JSON.parse(readFileSync('C:/Users/winusr/.config/configstore/firebase-tools.json', 'utf8'));

async function getAccessToken() {
  let token = cfg.tokens.access_token;
  try {
    const test = await fetch('https://firestore.googleapis.com/v1/projects/pik-a-class/databases/(default)/documents/users?pageSize=1', {
      headers: { Authorization: 'Bearer ' + token }
    });
    if (test.ok) return token;
  } catch (e) {
    // fallback to refresh
  }

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

async function fetchAllDocuments(collectionName, token) {
  let documents = [];
  let pageToken = '';
  do {
    const url = `https://firestore.googleapis.com/v1/projects/pik-a-class/databases/(default)/documents/${collectionName}?pageSize=100${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Fetch error on ${collectionName}: ${res.statusText}`);
    const data = await res.json();
    if (data.documents) documents.push(...data.documents);
    pageToken = data.nextPageToken;
  } while (pageToken);
  return documents;
}

async function main() {
  console.log('Connecting to Firestore as prawich.aum@dome.tu.ac.th...');
  const token = await getAccessToken();

  // 1. IMPORT EXERCISES
  console.log('\n--- 1. IMPORTING A1 EXERCISES ---');
  const existingExercises = await fetchAllDocuments('exercises', token);
  console.log(`Found ${existingExercises.length} existing exercises in Firestore.`);

  const existingPrompts = new Set();
  const existingHashes = new Set();
  for (const d of existingExercises) {
    const p = d.fields?.prompt?.stringValue;
    if (p) existingPrompts.add(p.trim().toLowerCase());
    const h = d.fields?.contentHash?.stringValue;
    if (h) existingHashes.add(h);
  }

  const rawExercises = JSON.parse(readFileSync('docs/seeds/a1-foundation-exercises.json', 'utf8'));
  console.log(`Read ${rawExercises.length} exercises from a1-foundation-exercises.json.`);

  let insertedEx = 0;
  let skippedEx = 0;

  for (const seed of rawExercises) {
    const hash = contentHash(seed);
    const pKey = (seed.prompt || '').trim().toLowerCase();

    if (existingHashes.has(hash) || existingPrompts.has(pKey)) {
      skippedEx++;
      continue;
    }

    const docBody = {
      ...seed,
      contentHash: hash,
      reviewStatus: 'published',
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
      insertedEx++;
      existingHashes.add(hash);
      existingPrompts.add(pKey);
      process.stdout.write(`\rImported exercises: ${insertedEx} / ${rawExercises.length}`);
    }
  }

  console.log(`\nExercises Import: ${insertedEx} newly imported, ${skippedEx} skipped.`);

  // 2. IMPORT STAGES
  console.log('\n--- 2. IMPORTING A1 STAGES ---');
  const existingStages = await fetchAllDocuments('stages', token);
  console.log(`Found ${existingStages.length} existing stages in Firestore.`);

  const existingStageKeys = new Set();
  for (const s of existingStages) {
    const lvl = s.fields?.level?.stringValue;
    const ord = s.fields?.order?.integerValue;
    if (lvl && ord !== undefined) existingStageKeys.add(`${lvl}-${ord}`);
  }

  const rawStages = JSON.parse(readFileSync('docs/seeds/a1-foundation-stages.json', 'utf8'));
  console.log(`Read ${rawStages.length} stages from a1-foundation-stages.json.`);

  let insertedStages = 0;
  let skippedStages = 0;

  for (const stage of rawStages) {
    const key = `${stage.level}-${stage.order}`;
    if (existingStageKeys.has(key)) {
      skippedStages++;
      continue;
    }

    const docBody = {
      ...stage,
      reviewStatus: 'published',
      createdBy: 'prawich.aum@dome.tu.ac.th'
    };

    const fields = {};
    for (const [k, v] of Object.entries(docBody)) {
      fields[k] = toFirestoreValue(v);
    }

    const postRes = await fetch('https://firestore.googleapis.com/v1/projects/pik-a-class/databases/(default)/documents/stages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });

    if (!postRes.ok) {
      const errText = await postRes.text();
      console.error(`Error inserting stage "${stage.title}":`, errText);
    } else {
      insertedStages++;
      existingStageKeys.add(key);
      process.stdout.write(`\rImported stages: ${insertedStages} / ${rawStages.length}`);
    }
  }

  console.log(`\nStages Import: ${insertedStages} newly imported, ${skippedStages} skipped.`);

  console.log('\n========================================');
  console.log('All A1 content successfully deployed and published in Firestore!');
  console.log(`Total exercises now: ${existingExercises.length + insertedEx}`);
  console.log(`Total stages now: ${existingStages.length + insertedStages}`);
  console.log('========================================');
}

main().catch(err => {
  console.error('Fatal error during import:', err);
  process.exit(1);
});
