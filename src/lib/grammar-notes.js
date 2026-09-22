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
  'grammar:future-going-to-will': {
    title: 'Future Forms (รูปอนาคต: will vs be going to)',
    badge: 'วางแผนไว้ vs ตัดสินใจทันที',
    concept: 'ใช้พูดถึงเรื่องที่จะเกิดขึ้นในอนาคต โดย "be going to" ใช้กับสิ่งที่วางแผนหรือตั้งใจไว้ล่วงหน้า ส่วน "will" ใช้กับการตัดสินใจเดี๋ยวนั้น คำสัญญา หรือการคาดการณ์',
    formula: 'be going to: S + is/am/are + going to + V.1 | will: S + will + V.1',
    negQuestion: 'be going to: isn’t/aren’t going to + V.1 | will: won’t + V.1',
    examples: [
      'I am going to visit my grandparents this weekend. (วางแผนไว้แล้ว)',
      'The phone is ringing. I will answer it! (ตัดสินใจเดี๋ยวนั้น)',
      'Look at those dark clouds! It is going to rain. (มีหลักฐานชัดเจน)'
    ],
    tips: 'ถ้ามีหลักฐานเห็นชัดเจนตรงหน้า (เช่น เมฆดำ) ให้ใช้ be going to แทน will'
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
  },
  'review:tenses-miniboss': {
    title: 'มินิบอสประลอง 4 Tenses',
    badge: 'ศึกวัดระดับ Past & Future',
    concept: 'วัดความแม่นยำในการแยกแยะ Past Simple, Past Continuous, Present Perfect และ Future Forms ในสถานการณ์จริง',
    formula: 'Past Sim (V.2) | Past Con (was/were+ing) | Pres Perf (have/has+V.3) | Future (will / be going to)',
    negQuestion: 'ตั้งสติอ่านคำบอกเวลา (Time Expressions) และบริบทการกระทำของประโยคก่อนเลือกตอบ',
    examples: [
      'I lost my keys yesterday. (Past Sim)',
      'I was cooking when he arrived. (Past Con)',
      'I have never eaten sushi before. (Present Perfect)',
      'We are going to travel next month. (Future)'
    ],
    tips: 'ระวังหลุมพรางคำว่า "เคย" ในภาษาไทย: ถ้าบอกเวลาอดีตชัดเจนใช้ Past Sim, ถ้าเป็นประสบการณ์ชีวิตใช้ Present Perfect!'
  },
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
  },
  'grammar:some-any-countable': {
    title: 'Countable & Uncountable Nouns + Quantifiers',
    badge: 'นับได้ vs นับไม่ได้ & some/any',
    concept: 'คำนามนับได้มีรูปเอกพจน์และพหูพจน์ (a cat / two cats) คำนามนับไม่ได้ไม่มีรูปพหูพจน์ (water, sugar, money, homework) some ใช้ในบอกเล่า, any ใช้ในปฏิเสธและคำถาม',
    formula: 'some + นามพหูพจน์/นับไม่ได้ (บอกเล่า) | any + นามพหูพจน์/นับไม่ได้ (ปฏิเสธ/คำถาม) | much + นับไม่ได้ | many + นับได้พหูพจน์',
    negQuestion: 'ข้อยกเว้น: some ใช้ในคำถามได้เมื่อเป็นการ "ยื่นข้อเสนอ" หรือ "ขอร้อง" เช่น Would you like some tea? / Can I have some water?',
    examples: [
      'There is some milk in the fridge.',
      'We don’t have any apples left.',
      'How many students are in the room?',
      'How much money do you need?'
    ],
    tips: 'คำว่า money, advice, information, furniture, homework ในภาษาอังกฤษเป็น "นามนับไม่ได้" เสมอ ห้ามเติม s เด็ดขาด!'
  },
  'grammar:comparatives-superlatives': {
    title: 'ขั้นกว่า & ขั้นสุด (Comparatives & Superlatives)',
    badge: 'เปรียบเทียบ -er / more vs -est / most',
    concept: 'ขั้นกว่าใช้เปรียบเทียบของ 2 สิ่ง (-er than หรือ more ... than) ขั้นสุดใช้เปรียบเทียบ 3 สิ่งขึ้นไป (the -est หรือ the most ...) และ as...as ใช้บอกความเท่ากัน',
    formula: 'ขั้นกว่า: Adj+er than หรือ more + Adj + than | ขั้นสุด: the + Adj+est หรือ the most + Adj | เท่ากัน: as + Adj + as',
    negQuestion: 'คำ 1 พยางค์เติม -er/-est (tall -> taller -> tallest) | คำ 2 พยางค์ขึ้นไปใช้ more/most (more beautiful -> most beautiful)',
    examples: [
      'A plane is faster than a train.',
      'This is the most expensive watch in the shop.',
      'He is as tall as his father.'
    ],
    tips: 'ระวังคำเปลี่ยนรูปพิเศษ: good -> better -> the best, bad -> worse -> the worst, far -> further -> the furthest'
  },
  'grammar:modals-obligation': {
    title: 'Modals of Obligation & Advice (must / have to / should)',
    badge: 'หน้าที่ กฎหมาย & คำแนะนำ',
    concept: 'must = จำเป็นต้องทำอย่างยิ่ง (กฎหมาย/ความรู้สึกตนเอง), have to = จำเป็นต้องทำ (กฎระเบียบภายนอก), should = ควรทำ (คำแนะนำ), mustn’t = ห้ามทำเด็ดขาด, don’t have to = ไม่จำเป็นต้องทำ',
    formula: 'S + must / have to / should + V.1 (รูปแท้ไม่ผัน)',
    negQuestion: 'ระวังความหมายต่างกันสิ้นเชิง: mustn’t (ห้ามทำเด็ดขาด/ผิดกฎ) vs don’t have to (ไม่จำเป็นต้องทำ/จะทำหรือไม่ก็ได้)',
    examples: [
      'You must stop at the red traffic light.',
      'I have to wear a school uniform on Mondays.',
      'You should drink plenty of water every day.',
      'You mustn’t smoke inside the hospital.'
    ],
    tips: 'หลัง modal verbs ทุกตัว (must, should, can) กริยาต้องเป็น V.1 รูปเดิมเสมอ ห้ามเติม to, -s, -ed, -ing'
  },
  'grammar:verb-patterns-basic': {
    title: 'Basic Verb Patterns (Gerunds & Infinitives)',
    badge: 'V.ing vs to + V.1',
    concept: 'เมื่อมีกริยา 2 ตัวติดกัน กริยาตัวหลังจะอยู่ในรูป V.ing (Gerund) หรือ to + V.1 (Infinitive) ขึ้นอยู่กับกริยาตัวหน้า',
    formula: 'Verb + V.ing (เช่น enjoy, like, mind, finish, practice) | Verb + to V.1 (เช่น want, hope, decide, plan, need)',
    negQuestion: 'หลังบุพบท (prepositions: in, on, at, about, for) ต้องตามด้วย V.ing เสมอ เช่น He is good at swimming.',
    examples: [
      'She enjoys reading fantasy novels before bed.',
      'I want to travel to Japan next summer.',
      'Thank you for helping me with this project.'
    ],
    tips: 'จำกลุ่มยอดฮิต: want to, hope to, decide to, need to | enjoy -ing, finish -ing, practice -ing'
  },
  'grammar:conjunctions-basic': {
    title: 'Basic Conjunctions (คำเชื่อมประโยค)',
    badge: 'and, but, so, because, although',
    concept: 'ใช้เชื่อมประโยคหรือความคิดเข้าด้วยกัน: and (และ - เสริมกัน), but (แต่ - ขัดแย้ง), so (ดังนั้น - ผลลัพธ์), because (เพราะว่า - สาเหตุ), although (แม้ว่า - ขัดแย้ง)',
    formula: 'เหตุ + so + ผล | ผล + because + เหตุ | although + ประโยคขัดแย้ง, ประโยคหลัก',
    negQuestion: 'ภาษาไทยชอบพูด "เพราะว่า...ดังนั้น..." แต่ภาษาอังกฤษเลือกใช้อย่างใดอย่างหนึ่ง ห้ามใช้ because คู่กับ so ในประโยคเดียวกันเด็ดขาด!',
    examples: [
      'It was raining heavily, so we stayed indoors.',
      'We stayed indoors because it was raining heavily.',
      'Although he was exhausted, he finished the marathon.'
    ],
    tips: 'จำคู่ผล-เหตุ: so ตามด้วย "ผลลัพธ์", because ตามด้วย "เหตุผล"'
  },
  'grammar:zero-first-conditional': {
    title: 'Zero & First Conditionals (ประโยคเงื่อนไข)',
    badge: 'ความจริงทั่วไป vs อนาคตที่เป็นไปได้',
    concept: 'Zero Conditional ใช้กับความจริงทางวิทยาศาสตร์หรือกฎธรรมชาติ (ถ้า...จะเกิดขึ้นแน่นอน), First Conditional ใช้กับเหตุการณ์ที่เป็นไปได้ในอนาคต (ถ้าทำสิ่งนี้...สิ่งนั้นจะเกิดขึ้น)',
    formula: 'Zero: If + Present Simple, Present Simple | First: If + Present Simple, will + V.1',
    negQuestion: 'ในประโยค First Conditional ท่อนหลัง if ห้ามใส่ will เด็ดขาด! (พูด If it rains... ห้ามพูด If it will rain...)',
    examples: [
      'If you freeze water, it turns into ice. (Zero)',
      'If it rains tomorrow, we will stay at home. (First)',
      'If you practice every day, you will improve. (First)'
    ],
    tips: 'สูตรลับ: ท่อน if เป็น Present Sim (V.1) ส่วนอีกท่อนถ้าเป็นอนาคตใส่ will + V.1'
  },
  'review:a2-finalboss': {
    title: '👑 บอสใหญ่ผู้พิทักษ์ไวยากรณ์ A2 (Master of A2 Grammar)',
    badge: 'ศึกตัดสินจ้าวแห่ง A2 สู่ระดับ B1',
    concept: 'บททดสอบรวบยอดไวยากรณ์ A2 ครบทั้ง 10 หัวข้อ ตั้งแต่ 4 Tenses, คำนามนับได้-นับไม่ได้, ขั้นกว่าขั้นสุด, Modals, Verb patterns, คำเชื่อม จนถึง Conditionals เพื่อก้าวสู่ระดับ B1 อย่างเต็มภาคภูมิ',
    formula: 'รวมทุกโครงสร้างไวยากรณ์หลักสูตร A2 ทั้งหมด',
    negQuestion: 'อ่านโจทย์อย่างมีสมาธิ จับโครงสร้างประโยคและบริบทให้แม่นยำ',
    examples: [
      'While I was studying, my phone rang. (Past Con + Sim)',
      'Have you ever traveled to another country? (Present Perfect)',
      'Mount Everest is higher than any other mountain. (Comparative)',
      'If you leave now, you will catch the train. (First Conditional)'
    ],
    tips: 'ขอให้พลังแห่งความมุ่งมั่นนำพาทุกคนพิชิตบอสใหญ่ A2 ได้สำเร็จครับ!'
  }
};

export function getGrammarNote(tags = []) {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  const grammarTags = tags.filter(t => t.startsWith('grammar:'));

  // A2 Final Boss: เมื่อมีแท็กของเงื่อนไข (zero-first-conditional) หรือมีแท็ก A2 ครบ
  if (tags.includes('review:a2-finalboss') || (grammarTags.length >= 8 && tags.includes('grammar:zero-first-conditional'))) {
    return GRAMMAR_NOTES['review:a2-finalboss'];
  }
  // A1 Final Boss: เมื่อมีแท็กของ A1 (present-simple & past-simple-be)
  if (tags.includes('review:a1-finalboss') || (grammarTags.length >= 8 && tags.includes('grammar:present-simple'))) {
    return GRAMMAR_NOTES['review:a1-finalboss'];
  }
  // A1 Mid-Boss (5 โมดูลแรกของ A1)
  if (tags.includes('review:a1-midboss') || (grammarTags.length === 5 && tags.includes('grammar:present-simple'))) {
    return GRAMMAR_NOTES['review:a1-midboss'];
  }
  // A2 Mid-Boss / Tenses Review (4 Tenses ของ A2)
  if (tags.includes('review:tenses-miniboss') || (grammarTags.length >= 4 && tags.includes('grammar:past-simple'))) {
    return GRAMMAR_NOTES['review:tenses-miniboss'];
  }
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
