import { describe, it, expect } from 'vitest';
import { buildFirebaseConfig } from './env.js';

describe('buildFirebaseConfig', () => {
  const validEnv = {
    VITE_FIREBASE_API_KEY: 'key123',
    VITE_FIREBASE_AUTH_DOMAIN: 'proj.firebaseapp.com',
    VITE_FIREBASE_PROJECT_ID: 'proj',
    VITE_FIREBASE_APP_ID: 'app123',
  };

  it('maps VITE_ env vars to a firebase config object', () => {
    expect(buildFirebaseConfig(validEnv)).toEqual({
      apiKey: 'key123',
      authDomain: 'proj.firebaseapp.com',
      projectId: 'proj',
      appId: 'app123',
    });
  });

  it('throws listing every missing required key', () => {
    expect(() => buildFirebaseConfig({})).toThrow(
      'Missing required Firebase env vars: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID'
    );
  });

  it('throws when only some required keys are missing', () => {
    const { VITE_FIREBASE_APP_ID, ...partial } = validEnv;
    expect(() => buildFirebaseConfig(partial)).toThrow(
      'Missing required Firebase env vars: VITE_FIREBASE_APP_ID'
    );
  });
});
