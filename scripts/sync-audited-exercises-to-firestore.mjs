import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { contentHash } from '../src/lib/schema/content-checks.js';

async function getAccessToken() {
  let currentCfg = JSON.parse(readFileSync('C:/Users/winusr/.config/configstore/firebase-tools.json', 'utf8'));
  let token = currentCfg.tokens.access_token;
  try {
    const test = await fetch('https://firestore.googleapis.com/v1/projects/pik-a-class/databases/(default)/documents/users?pageSize=1', {
      headers: { Authorization: 'Bearer ' + token }
    });
    if (test.ok) return token;
  } catch (e) {
    // fallback
  }

  console.log('Refreshing OAuth token via firebase-tools...');
  execSync('npx -y firebase-tools@latest projects:list', { stdio: 'ignore' });
  currentCfg = JSON.parse(readFileSync('C:/Users/winusr/.config/configstore/firebase-tools.json', 'utf8'));
  return currentCfg.tokens.access_token;
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

async function syncSeeds(token, seedFiles, isDryRun = false) {
  console.log(`\nFetching existing exercises from Firestore...`);
  const existingDocs = await fetchAllDocuments('exercises', token);
  console.log(`Loaded ${existingDocs.length} exercises from Firestore.`);

  // Map by normalized prompt
  const docByPrompt = new Map();
  for (const doc of existingDocs) {
    const p = doc.fields?.prompt?.stringValue;
    if (p) {
      docByPrompt.set(p.trim().toLowerCase(), doc);
    }
  }

  let totalUpdated = 0;
  let totalUpToDate = 0;
  let totalNotFound = 0;

  for (const file of seedFiles) {
    const seeds = JSON.parse(readFileSync(file, 'utf8'));
    console.log(`\nProcessing ${file} (${seeds.length} items)...`);

    for (const item of seeds) {
      const pKey = (item.prompt || '').trim().toLowerCase();
      const targetHash = contentHash(item);
      const existingDoc = docByPrompt.get(pKey);

      if (!existingDoc) {
        totalNotFound++;
        continue;
      }

      const currentHash = existingDoc.fields?.contentHash?.stringValue;
      if (currentHash === targetHash) {
        totalUpToDate++;
        continue;
      }

      // Needs update!
      totalUpdated++;
      if (isDryRun) {
        console.log(`[DRY-RUN] Will update: "${item.prompt.substring(0, 45)}..." (${existingDoc.fields?.type?.stringValue} -> ${item.type})`);
        continue;
      }

      const updateFields = {
        type: toFirestoreValue(item.type),
        choices: toFirestoreValue(item.choices),
        answerKey: toFirestoreValue(item.answerKey),
        contentHash: toFirestoreValue(targetHash),
        updatedAt: toFirestoreValue(new Date().toISOString()),
      };

      const docName = existingDoc.name;
      const mask = 'updateMask.fieldPaths=type&updateMask.fieldPaths=choices&updateMask.fieldPaths=answerKey&updateMask.fieldPaths=contentHash&updateMask.fieldPaths=updatedAt';
      const patchUrl = `https://firestore.googleapis.com/v1/${docName}?${mask}`;

      const patchRes = await fetch(patchUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: updateFields }),
      });

      if (!patchRes.ok) {
        const err = await patchRes.text();
        console.error(`Failed to patch ${item.prompt.substring(0, 30)}:`, err);
      } else {
        process.stdout.write(`\rUpdated ${totalUpdated} exercises in Firestore...`);
      }
    }
  }

  console.log(`\n\nSync Summary:`);
  console.log(`- Already up to date: ${totalUpToDate}`);
  console.log(`- Updated: ${totalUpdated}`);
  console.log(`- Not found in Firestore: ${totalNotFound}`);
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const token = await getAccessToken();
  const seedFiles = [
    'docs/seeds/b2-full-exercises.json',
    'docs/seeds/b1-full-exercises.json',
    'docs/seeds/a2-full-exercises.json',
    'docs/seeds/a2-tenses-saga-exercises.json'
  ];

  await syncSeeds(token, seedFiles, isDryRun);
}

main().catch(console.error);
