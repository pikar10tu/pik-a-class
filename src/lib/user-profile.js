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

export function getAvatarSrc(avatarId, base = '', ext = 'png') {
  const valid = AVATAR_LIST.some((a) => a.id === avatarId);
  const id = valid ? avatarId : DEFAULT_AVATAR;
  return `${base}avatars/${id}.${ext}`;
}

export function validateProfileData(data) {
  const errors = {};
  const cleaned = {};

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: { general: 'ข้อมูลไม่ถูกต้อง' }, cleaned: {} };
  }

  const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';
  cleaned.fullName = fullName;

  const prefix = data.prefix === 'พี่' ? 'พี่' : 'น้อง';
  cleaned.prefix = prefix;

  const nickname = typeof data.nickname === 'string' ? data.nickname.trim() : '';
  if (!nickname) {
    errors.nickname = 'กรุณาระบุชื่อเล่น';
  } else if (nickname.length > 30) {
    errors.nickname = 'ชื่อเล่นต้องไม่เกิน 30 ตัวอักษร';
  } else {
    cleaned.nickname = nickname;
    cleaned.callName = `${prefix}${nickname}`;
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

export const LEVEL_SEQUENCE = ['A1', 'A2', 'B1', 'B2'];

/**
 * คำนวณระดับที่ผู้เรียนผ่านสมบูรณ์แล้ว (clearedLevels)
 * จากจำนวนด่านที่ผ่านในแต่ละระดับ (เช่น ผ่านครบ 20 ด่าน)
 */
export function getClearedLevels(clearsByLevel = new Map(), totalStagesPerLevel = 20) {
  const cleared = [];
  for (const lvl of LEVEL_SEQUENCE) {
    const count = clearsByLevel instanceof Map ? (clearsByLevel.get(lvl) ?? 0) : (clearsByLevel[lvl] ?? 0);
    if (count >= totalStagesPerLevel) {
      cleared.push(lvl);
    }
  }
  return cleared;
}

// ด่านนับว่า "ผ่าน" เมื่อเคยผ่าน (clearCount > 0) หรือคะแนนดีที่สุด ≥ 70%
export function clearedLevelsFromClears(clears = []) {
  const clearsByLevel = new Map();
  for (const clear of clears) {
    const level = clear?.level;
    if (!level) continue;
    if ((clear.clearCount ?? 0) > 0 || (clear.score ?? 0) >= 0.7) {
      clearsByLevel.set(level, (clearsByLevel.get(level) ?? 0) + 1);
    }
  }
  return getClearedLevels(clearsByLevel, 20);
}

/**
 * ตรวจสอบสิทธิ์การเข้าถึงด่านในระดับ (level: A1, A2, B1, B2) ของผู้ใช้
 *
 * กฎการปลดล็อก:
 * 1. Admin: ปลดล็อกทุกระดับเสมอ
 * 2. ครูปิ๊กติ๊กใน Allowed Levels ใน Admin: ปลดล็อกระดับที่ติ๊กเสมอ (Override ข้ามลำดับได้)
 * 3. ระดับ A1: ปลดล็อกให้ทุกคนเสมอ (เริ่มต้นที่ A1)
 * 4. ระดับ A2 / B1 / B2:
 *    - Full Tier: ปลดล็อกตามลำดับเมื่อระดับก่อนหน้าผ่านครบทุกด่าน (A1 -> A2 -> B1 -> B2)
 *    - Free Tier:
 *      * A2: ปลดล็อกเมื่อครูปิ๊กติ๊ก Allowed Levels ให้ (หลังจากนักเรียนแคปหน้าจอจบ A1 มาขอสิทธิ์)
 *      * B1, B2: ปลดล็อกเฉพาะเมื่ออัปเกรดเป็น Full Tier หรือครูปิ๊กติ๊ก Allowed Levels ให้
 */
export function isLevelAllowed(userDoc, level, clearedLevels = []) {
  if (!userDoc) return false;
  if (userDoc.role === 'admin') return true;

  // 1. ติ๊กใน Allowed Levels โดยครูปิ๊ก (Override ได้ทันที)
  if (Array.isArray(userDoc.allowedLevels) && userDoc.allowedLevels.length > 0) {
    return userDoc.allowedLevels.includes(level);
  }

  // 2. A1 เปิดให้ทุกคนเริ่มต้นเสมอ
  if (level === 'A1') {
    return true;
  }

  const prevLevel = level === 'A2' ? 'A1' : level === 'B1' ? 'A2' : level === 'B2' ? 'B1' : null;
  const isPrevCleared = prevLevel ? clearedLevels.includes(prevLevel) : false;

  // 3. Full Tier: ปลดล็อกอัตโนมัติตามลำดับเมื่อระดับก่อนหน้าเคลียร์สำเร็จ
  if (userDoc.tier === 'full') {
    return isPrevCleared;
  }

  // 4. Free Tier: ระดับ A2, B1, B2 จะถูกล็อกไว้ จนกว่าครูปิ๊กจะติ๊กให้ใน allowedLevels
  return false;
}

export function isLevelUnlocked(userDoc, level, clearedLevels = []) {
  return isLevelAllowed(userDoc, level, clearedLevels);
}

/**
 * ดึงรายการระดับทั้งหมดที่ผู้เรียนคนนี้ปลดล็อกแล้ว (เช่น ['A1'] หรือ ['A1', 'A2'])
 * ใช้สำหรับคลังคำศัพท์ (Vocab Hub) และ Animal Cafe
 */
export function getUnlockedLevels(userDoc, clearedLevels = []) {
  if (!userDoc) return ['A1'];
  if (userDoc.role === 'admin') return [...LEVEL_SEQUENCE];

  return LEVEL_SEQUENCE.filter((lvl) => isLevelAllowed(userDoc, lvl, clearedLevels));
}
