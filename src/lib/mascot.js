// ไฟล์ภาพอยู่ใน src/public/mascot/ ซึ่ง Vite เสิร์ฟตรงๆ ที่ราก base url
// จึงไม่ต้อง import ผ่าน bundler และทดสอบได้ด้วยสตริงล้วน
export const MASCOT_MOODS = ['normal', 'correct', 'wrong', 'clear'];

export function mascotSrc(mood, baseUrl) {
  const name = MASCOT_MOODS.includes(mood) ? mood : 'normal';
  return `${baseUrl}mascot/${name}.png`;
}
