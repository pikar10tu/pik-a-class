export const GRAMMAR_NOTES_A1 = {
  'grammar:present-simple': {
    title: 'Present Simple (ปัจจุบันกาลธรรมดา)',
    badge: 'กิจวัตร / ความจริงทั่วไป',
    concept: 'ใช้บอกสิ่งที่เป็นจริงเสมอ กิจวัตรประจำวัน หรือนิสัย ประธานเอกพจน์กริยาเติม s/es',
    formula: 'S(He/She/It) + V.1(s/es) | S(I/You/We/They) + V.1',
    negQuestion: 'ปฏิเสธ: don’t / doesn’t + V.1 | คำถาม: Do / Does + S + V.1?',
    examples: [
      'He plays football every day.',
      'They don’t like spicy food.',
      'Does she live in Bangkok?'
    ],
    tips: 'เมื่อมี do หรือ does แล้ว กริยาแท้ต้องกลับเป็นรูปเดิมเสมอ (ตัด s/es ออก)'
  },
  'grammar:articles-nouns': {
    title: 'Articles (a / an / the) & คำนาม',
    badge: 'ชี้เฉพาะ vs ไม่ชี้เฉพาะ',
    concept: 'ภาษาไทยไม่มี article แต่ภาษาอังกฤษนามนับได้เอกพจน์ต้องมีคำนำหน้าเสมอ! a ใช้หน้าเสียงพยัญชนะ, an ใช้หน้าเสียงสระ (a, e, i, o, u), the ใช้เมื่อทั้งสองฝ่ายรู้กันว่าอันไหน',
    formula: 'a/an + นามเอกพจน์ทั่วไป | the + นามเจาะจง',
    negQuestion: 'นามพหูพจน์ทั่วไป (เช่น Cats are cute.) ไม่ต้องใส่ a/an/the',
    examples: [
      'I saw an elephant yesterday.',
      'She bought a new car.',
      'Can you close the door? (รู้กันว่าประตูบานไหน)'
    ],
    tips: 'ระวัง: เด็กไทยมักลืมใส่ a เช่น "I am student" ที่ถูกต้องคือ "I am a student"'
  },
  'grammar:there-is-are': {
    title: 'There is / There are (มี...อยู่ที่ไหน)',
    badge: 'บอกการมีอยู่ของสิ่งของ',
    concept: 'ใช้บอกว่า "มี" อะไรอยู่ที่ไหน (ห้ามใช้ Have ขึ้นต้นประโยคแทน There is/are เด็ดขาด!) There is ใช้นามเอกพจน์/นับไม่ได้, There are ใช้นามพหูพจน์',
    formula: 'There is + เอกพจน์/นับไม่ได้ | There are + พหูพจน์',
    negQuestion: 'ปฏิเสธ: There isn’t / There aren’t | คำถาม: Is there...? / Are there...?',
    examples: [
      'There is a book on the desk.',
      'There are three dogs in the garden.',
      'Is there any milk in the fridge?'
    ],
    tips: 'คำบอกตำแหน่งสำคัญ: in (ใน), on (บน), under (ใต้), behind (หลัง), next to (ข้างๆ)'
  },
  'grammar:wh-questions-inversion': {
    title: 'Wh- Questions (การตั้งคำถาม)',
    badge: 'สลับกริยาช่วย do/does/is/are',
    concept: 'คำถามที่ขึ้นต้นด้วย What, Where, When, Who, Why, How ต้องมีกริยาช่วย (do/does/is/are) สลับมาหน้าประธานเสมอ',
    formula: 'Wh-word + do/does + S + V.1? หรือ Wh-word + is/am/are + S?',
    negQuestion: 'ห้ามพูดเรียงแบบไทย เช่น "Where you go?" ที่ถูกต้องคือ "Where do you go?"',
    examples: [
      'Where do you live?',
      'What is your favorite color?',
      'Why are you sad?'
    ],
    tips: 'สังเกต: ถ้ามีกริยาแท้ใช้ do/does, ถ้าไม่มีกริยาการกระทำใช้ is/am/are'
  },
  'grammar:adjectives-possessive-s': {
    title: 'Adjectives & แสดงความเป็นเจ้าของ (\'s)',
    badge: 'คุณศัพท์วางหน้าคำนาม',
    concept: 'คำคุณศัพท์ (Adjective) บอกลักษณะต้องวาง "หน้า" คำนามเสมอ ส่วนการแสดงความเป็นเจ้าของของคนใช้ \'s หลังชื่อ',
    formula: 'a/an + Adj + Noun (เช่น a red car) | Owner\'s + Noun (เช่น Tom\'s bag)',
    negQuestion: 'this (นี่/เอกพจน์ใกล้), that (นั่น/เอกพจน์ไกล), these (เหล่านี้/พหูพจน์ใกล้), those (เหล่านั้น/พหูพจน์ไกล)',
    examples: [
      'She has a red bicycle.',
      'This is my brother’s computer.',
      'Those shoes are very expensive.'
    ],
    tips: 'ภาษาไทยพูด "รถสีแดง" แต่ภาษาอังกฤษต้องสลับเป็น "a red car"'
  },
  'grammar:prepositions-time-frequency': {
    title: 'Prepositions of Time & Frequency',
    badge: 'at, on, in & ความถี่',
    concept: 'at ใช้กับจุดเวลา (at 7:00), on ใช้กับวัน/วันที่ (on Monday), in ใช้กับเดือน/ปี/ฤดู (in July, in 2024)',
    formula: 'at + เวลา | on + วัน | in + เดือน/ปี/ช่วงเวลา',
    negQuestion: 'Adverbs of frequency (always, usually, often, sometimes, never) วาง "หน้ากริยาแท้" แต่วาง "หลัง Verb to be"',
    examples: [
      'The class starts at 9 AM.',
      'He was born in 2010.',
      'I always brush my teeth before bed.'
    ],
    tips: 'จำง่ายๆ: at จุดเวลา -> on วัน -> in เดือนปี'
  },
  'grammar:present-continuous': {
    title: 'Present Continuous (กำลังกระทำอยู่ในขณะนี้)',
    badge: 'กำลังเกิดขึ้นตอนนี้',
    concept: 'ใช้บอกการกระทำที่กำลังดำเนินอยู่ในขณะที่พูด มักมีคำบอกเวลา เช่น now, right now, at the moment, Listen!, Look!',
    formula: 'S + is/am/are + V.ing',
    negQuestion: 'ปฏิเสธ: isn’t / aren’t / am not + V.ing | คำถาม: Is / Am / Are + S + V.ing?',
    examples: [
      'He is reading a comic book right now.',
      'Look! It is raining outside.',
      'Are they playing football in the garden?'
    ],
    tips: 'ระวังหลุมพรางเด็กไทย: ห้ามลืม Verb to be เด็ดขาด! เช่น "He sleeping" (ผิด) ต้องเป็น "He is sleeping" (ถูก)'
  },
  'grammar:can-cant': {
    title: 'can / can\'t (ความสามารถ & ขออนุญาต)',
    badge: 'ทำได้ vs ทำไม่ได้',
    concept: 'ใช้บอกความสามารถว่าทำอะไรได้หรือไม่ได้ หรือใช้ในการขออนุญาตอย่างสุภาพ',
    formula: 'S + can + V.1 | S + can\'t + V.1',
    negQuestion: 'คำถาม: Can + S + V.1? (เช่น Can you help me?)',
    examples: [
      'I can speak two languages.',
      'He can\'t swim.',
      'Can I borrow your pen, please?'
    ],
    tips: 'หลัง can / can\'t กริยาต้องเป็นรูปเดิมเสมอ ห้ามเติม -s, -ed หรือ -ing เด็ดขาด'
  },
  'grammar:imperatives': {
    title: 'ประโยคคำสั่ง & ขอร้อง (Imperatives)',
    badge: 'คำสั่ง / ข้อห้าม / คำแนะนำ',
    concept: 'ใช้สั่ง ห้าม หรือแนะนำ โดยขึ้นต้นประโยคด้วยกริยาแท้ V.1 ได้ทันที (ไม่มีประธาน)',
    formula: 'V.1 + ...! (บอกให้ทำ) | Don’t + V.1 + ...! (ห้ามทำ)',
    negQuestion: 'เพื่อความสุภาพ ให้เติมคำว่า "Please" ไว้หน้าหรือท้ายประโยค',
    examples: [
      'Open your book to page 10.',
      'Don’t touch that hot pan!',
      'Please listen carefully.'
    ],
    tips: 'เมื่อต้องการห้าม ให้ใช้ "Don\'t" เสมอ ไม่ใช้ No หรือ Not'
  },
  'grammar:past-simple-be': {
    title: 'Past Simple ของ be: was / were',
    badge: 'อดีตของ Verb to be',
    concept: 'รูปอดีตของ is/am คือ was, รูปอดีตของ are คือ were ใช้บอกสภาพหรือสถานะในอดีต',
    formula: 'I/He/She/It + was | You/We/They + were',
    negQuestion: 'ปฏิเสธ: wasn’t / weren’t | คำถาม: Was / Were + S ...?',
    examples: [
      'I was at home yesterday.',
      'They were very tired last night.',
      'Was she happy with the gift?'
    ],
    tips: 'I ใช้คู่กับ was เช่นเดียวกับ He/She/It'
  },
  'review:a1-midboss': {
    title: 'มินิบอสประลองพื้นฐาน A1 (โมดูล 1–5)',
    badge: 'ทดสอบครึ่งทาง A1',
    concept: 'วัดความแม่นยำของ Present Simple, Articles, There is/are, Wh- Questions และ Adjectives',
    formula: 'ทบทวนโครงสร้างประธาน กริยา คำนำหน้า และคำถาม',
    negQuestion: 'สังเกตประธานเอกพจน์/พหูพจน์ และระวังการลืมกริยาช่วย',
    examples: [
      'She is a teacher.',
      'Where does he live?',
      'There are two cats under the table.'
    ],
    tips: 'มีสมาธิเช็กทุกจุด: a/an ครบไหม, กริยาผันตามประธานหรือยัง'
  },
  'review:a1-finalboss': {
    title: '👑 บอสใหญ่ผู้พิทักษ์ไวยากรณ์ A1 (Master of A1)',
    badge: 'บททดสอบสู่ระดับ A2',
    concept: 'บททดสอบรวบยอดไวยากรณ์พื้นฐาน A1 ทั้ง 10 หัวข้อ เพื่อก้าวสู่ระดับ A2 อย่างมั่นใจ',
    formula: 'รวมทุกโครงสร้างไวยากรณ์พื้นฐาน A1',
    negQuestion: 'อ่านโจทย์อย่างรอบคอบ จับคำบอกเวลาและบริบทของแต่ละข้อ',
    examples: [
      'Look! It is raining.',
      'I can ride a bicycle.',
      'They were happy yesterday.'
    ],
    tips: 'ขอให้โชคดีในการประลองกับบอสใหญ่ประจำระดับ A1 ครับ!'
  }
};
