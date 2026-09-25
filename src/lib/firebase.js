import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { buildFirebaseConfig } from './env.js';

const app = initializeApp(buildFirebaseConfig(import.meta.env));

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

function createFirestoreDb() {
  if (typeof window !== 'undefined' && window.indexedDB) {
    try {
      return initializeFirestore(app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      });
    } catch {
      return getFirestore(app);
    }
  }
  return getFirestore(app);
}

export const db = createFirestoreDb();
