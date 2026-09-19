export function buildNewUserDoc(firebaseUser) {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    fullName: firebaseUser.displayName || '',
    nickname: '',
    role: 'student',
    tier: 'free',
    onboardingComplete: false,
    createdAt: new Date().toISOString(),
  };
}

export function getPostLoginRedirect(userDocData) {
  if (!userDocData) return 'onboarding';
  if (!userDocData.onboardingComplete) return 'onboarding';
  return 'dashboard';
}
