export const DEFAULT_AVATAR = 'avatar-1';

export const AVATAR_LIST = [
  { id: 'avatar-1', title: 'น้องหยกสดใส', en: 'Classic Mint', icon: '🌱' },
  { id: 'avatar-2', title: 'น้องหยกซากุระ', en: 'Sakura Pink', icon: '🌸' },
  { id: 'avatar-3', title: 'น้องหยกท้องฟ้า', en: 'Sky Blue', icon: '☁️' },
  { id: 'avatar-4', title: 'จอมเวทน้อย', en: 'Magic Wizard', icon: '🧙' },
  { id: 'avatar-5', title: 'อัศวินผู้กล้า', en: 'Brave Knight', icon: '🛡️' },
  { id: 'avatar-6', title: 'คอสเพลย์มังกร', en: 'Dragon Cosplay', icon: '🐉' },
  { id: 'avatar-7', title: 'ภูตน้อยมีปีก', en: 'Angel Fairy', icon: '🪽' },
  { id: 'avatar-8', title: 'บาริสต้าต่าย', en: 'Speed Barista', icon: '☕' },
  { id: 'avatar-9', title: 'ราชาดวงดาว', en: 'Star King', icon: '👑' },
  { id: 'avatar-10', title: 'เกมเมอร์ไซเบอร์', en: 'Cyber Gamer', icon: '🎧' },
  { id: 'avatar-11', title: 'น้องหยกพลังใจ', en: 'Champion Power', icon: '💪' },
  { id: 'avatar-12', title: 'น้องหยกส่งรัก', en: 'Heart Love', icon: '💖' },
];

export function getAvatarSrc(avatarId, base = '') {
  const valid = AVATAR_LIST.some((a) => a.id === avatarId);
  const id = valid ? avatarId : DEFAULT_AVATAR;
  return `${base}avatars/${id}.png`;
}

export function validateProfileData(data) {
  const errors = {};
  const cleaned = {};

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: { general: 'ข้อมูลไม่ถูกต้อง' }, cleaned: {} };
  }

  const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';
  cleaned.fullName = fullName;

  const nickname = typeof data.nickname === 'string' ? data.nickname.trim() : '';
  if (!nickname) {
    errors.nickname = 'กรุณาระบุชื่อเล่น';
  } else if (nickname.length > 30) {
    errors.nickname = 'ชื่อเล่นต้องไม่เกิน 30 ตัวอักษร';
  } else {
    cleaned.nickname = nickname;
  }

  cleaned.grade = typeof data.grade === 'string' ? data.grade.trim() : '';
  cleaned.school = typeof data.school === 'string' ? data.school.trim() : '';
  cleaned.phone = typeof data.phone === 'string' ? data.phone.trim() : '';
  cleaned.lineId = typeof data.lineId === 'string' ? data.lineId.trim() : '';

  if (data.avatarId && AVATAR_LIST.some((a) => a.id === data.avatarId)) {
    cleaned.avatarId = data.avatarId;
  } else {
    cleaned.avatarId = DEFAULT_AVATAR;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    cleaned,
  };
}

export function buildNewUserDoc(firebaseUser) {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    fullName: firebaseUser.displayName || '',
    nickname: '',
    avatarId: DEFAULT_AVATAR,
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
