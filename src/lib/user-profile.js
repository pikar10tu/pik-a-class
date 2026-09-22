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

/**
 * ตรวจสอบสิทธิ์การเข้าถึงด่านในระดับ (level: A1, A2, B1, B2) ของผู้ใช้
 * - Admin เข้าได้ทุกระดับเสมอ
 * - หากมี allowedLevels กำหนดไว้ จะเข้าได้เฉพาะระดับที่ระบุในรายการ
 * - หากเป็น tier full และไม่มีการจำกัด allowedLevels จะเข้าได้ทุกระดับ
 * - tier free (โดยไม่มี allowedLevels) เข้าไม่ได้ (เล่นได้เฉพาะด่าน preview ผ่าน query tier)
 */
export function isLevelAllowed(userDoc, level) {
  if (!userDoc) return false;
  if (userDoc.role === 'admin') return true;

  if (Array.isArray(userDoc.allowedLevels) && userDoc.allowedLevels.length > 0) {
    return userDoc.allowedLevels.includes(level);
  }

  if (userDoc.tier === 'full') {
    return true;
  }

  // ผู้เรียนทุกคนรวมทั้งสมาชิกใหม่ ได้รับสิทธิ์เรียนระดับ A1 ฟรีครบทุกด่านเป็นค่าเริ่มต้น
  if (level === 'A1') {
    return true;
  }

  return false;
}
