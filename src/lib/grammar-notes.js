export const GRAMMAR_NOTES = {
  'grammar:past-simple': {
    title: 'Past Simple (อดีตกาลธรรมดา)',
    badge: 'จบลงแล้วในอดีต',
    concept: 'ใช้เล่าเหตุการณ์ที่เกิดขึ้นและจบลงไปแล้วในอดีต มักมีคำบอกเวลา เช่น yesterday, last night, 2 days ago, in 2020',
    formula: 'S + V.2',
    negQuestion: 'ปฏิเสธ: S + didn’t + V.1 | คำถาม: Did + S + V.1?',
    examples: [
      'I went to school yesterday.',
      'She didn’t buy that shirt.',
      'Did you see the movie last night?'
    ],
    tips: 'เมื่อมี did หรือ didn’t แล้ว กริยาแท้ต้องกลับเป็นรูปเดิม (V.1 ไม่ผัน/ไม่เติม -ed)'
  },
  'grammar:past-continuous': {
    title: 'Past Continuous (กำลังทำในอดีต)',
    badge: 'กำลังดำเนินอยู่ในอดีต',
    concept: 'ใช้บอกเหตุการณ์ที่กำลังเกิดขึ้นอยู่ในอดีต ณ จุดเวลาที่ระบุ หรือใช้คู่กับ Past Simple เมื่อมีเหตุการณ์แทรกเข้ามา',
    formula: 'S + was/were + V.ing',
    negQuestion: 'was ใช้กับ I/He/She/It/เอกพจน์ | were ใช้กับ You/We/They/พหูพจน์',
    examples: [
      'I was sleeping at 9 PM yesterday.',
      'While she was cooking, the phone rang.',
      'What were you doing when I called?'
    ],
    tips: 'เหตุการณ์ที่กำลังดำเนินอยู่ใช้ Past Con (was/were + V.ing) ส่วนเหตุการณ์ที่เข้ามาแทรกใช้ Past Sim (V.2)'
  },
  'grammar:present-perfect': {
    title: 'Present Perfect (อดีตสู่ปัจจุบัน)',
    badge: 'อดีตส่งผลถึงปัจจุบัน / ประสบการณ์',
    concept: 'ใช้กับเหตุการณ์ที่เกิดขึ้นในอดีตแต่ส่งผลถึงปัจจุบัน, การเล่าประสบการณ์ชีวิต (เคย/ไม่เคย), หรือสิ่งที่เพิ่งทำเสร็จ/ยังไม่เสร็จ',
    formula: 'S + have/has + V.3',
    negQuestion: 'has ใช้กับ He/She/It/เอกพจน์ | have ใช้กับ I/You/We/They/พหูพจน์',
    examples: [
      'I have lived here since 2015.',
      'Have you ever tried Japanese food?',
      'He hasn’t finished his homework yet.'
    ],
    tips: 'คำสังเกต: since (ตั้งแต่), for (เป็นเวลา), already (แล้ว), yet (ยัง), ever/never (เคย/ไม่เคย)'
  },
  'review:past-tenses': {
    title: 'ทบทวนเปรียบเทียบ 3 Tenses',
    badge: 'เปรียบเทียบการเลือกใช้',
    concept: 'เลือกใช้ Tense ให้ตรงกับจังหวะเวลาและลักษณะของเหตุการณ์',
    formula: 'Past Sim: V.2 | Past Con: was/were+V.ing | Present Perfect: have/has+V.3',
    negQuestion: 'Past Sim = จบแล้วในอดีต | Past Con = กำลังทำตอนนั้น | Present Perfect = อดีตถึงปัจจุบัน',
    examples: [
      'I played football yesterday. (Past Sim)',
      'I was playing football when it rained. (Past Con)',
      'I have played football for two hours. (Present Perfect)'
    ],
    tips: 'สังเกตคำบอกเวลา (yesterday vs while/when vs since/for) เพื่อเลือกรูปกริยาที่ถูกต้อง'
  }
};

export function getGrammarNote(tags = []) {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  // If stage has multiple grammar tags (like Stage 4 Review)
  const grammarTags = tags.filter(t => t.startsWith('grammar:'));
  if (grammarTags.length > 1) {
    return GRAMMAR_NOTES['review:past-tenses'];
  }

  for (const tag of tags) {
    if (GRAMMAR_NOTES[tag]) {
      return GRAMMAR_NOTES[tag];
    }
  }

  return null;
}
