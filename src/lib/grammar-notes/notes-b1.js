export const GRAMMAR_NOTES_B1 = {
  'grammar:present-perfect-continuous': {
    title: 'Present Perfect Continuous (ทำต่อเนื่องไม่หยุด)',
    badge: 'ทำต่อเนื่องถึงปัจจุบัน vs ผลลัพธ์',
    concept: 'ใช้กับเหตุการณ์ที่เริ่มต้นในอดีตและยังคงดำเนินต่อเนื่องมาเรื่อยๆ จนถึงขณะที่พูด หรือเพิ่งหยุดลงสดๆ ร้อนๆ โดยเน้นที่ "ระยะเวลา / ความต่อเนื่อง" (Duration) ของการกระทำ',
    formula: 'S + have/has been + V.ing',
    negQuestion: 'have/has been + V.ing (เน้นความต่อเนื่อง) vs have/has + V.3 (เน้นว่าเสร็จแล้ว/ได้กี่ชิ้น) | คำสังเกต: for, since, all day, how long',
    examples: [
      'I have been studying English for three hours. (อ่านมา 3 ชั่วโมงแล้วและยังอ่านอยู่)',
      'She is tired because she has been running. (เหนื่อยเพราะเพิ่งวิ่งเสร็จมาหมาดๆ)',
      'How long have you been waiting here?'
    ],
    tips: 'ถ้าเป็น State Verbs (กริยาบอกความรู้สึก/การรับรู้ เช่น know, like, understand, believe) ห้ามใช้ Continuous ให้ใช้ Present Perfect Simple แทน เช่น I have known him for years. (ไม่ใช่ have been knowing)'
  },
  'grammar:past-perfect': {
    title: 'Past Perfect Simple (อดีตก่อนอดีต)',
    badge: 'เกิดก่อนในอดีต had + V.3',
    concept: 'ใช้บอกเหตุการณ์ที่เกิดขึ้นและจบลง "ก่อน" อีกเหตุการณ์หนึ่งในอดีต เมื่อมี 2 เหตุการณ์ในอดีต: เหตุการณ์ที่เกิดก่อนใช้ Past Perfect (had + V.3), เหตุการณ์ที่เกิดทีหลังใช้ Past Simple (V.2)',
    formula: 'เกิดก่อน: S + had + V.3 | เกิดทีหลัง: S + V.2',
    negQuestion: 'ปฏิเสธ: had not (hadn’t) + V.3 | คำถาม: Had + S + V.3? | คำเชื่อมสำคัญ: before, after, by the time, when',
    examples: [
      'When I arrived at the station, the train had already left. (รถไฟออกไปก่อนที่ฉันจะไปถึง)',
      'She had finished her dinner before her friends arrived.',
      'By the time the movie started, we had bought the popcorn.'
    ],
    tips: 'จำสูตรง่ายๆ: "เกิดก่อนใช้ Had + V.3, เกิดทีหลังใช้ V.2" คำว่า By the time + Past Simple (V.2) อีกประโยคจะเป็น Had + V.3 เสมอ'
  },
  'grammar:used-to-habits': {
    title: 'Past Habits (used to vs be used to vs get used to)',
    badge: 'เคยทำ vs ชินแล้ว',
    concept: 'used to + V.1 = เคยทำเป็นประจำในอดีตแต่ปัจจุบันเลิกแล้ว | be used to + V.ing/Noun = เคยชิน/คุ้นเคยกับสิ่งนั้นแล้วในปัจจุบัน | get used to + V.ing/Noun = กำลังปรับตัวให้ชิน',
    formula: 'เคยทำในอดีต: used to + V.1 | ชินแล้ว: is/am/are used to + V.ing | กำลังปรับตัว: get used to + V.ing',
    negQuestion: 'ปฏิเสธของ used to: didn’t use to + V.1 (ตัด d ออก) | คำถาม: Did you use to + V.1?',
    examples: [
      'I used to live in Chiang Mai when I was young. (ตอนนี้ไม่ได้อยู่แล้ว)',
      'He didn’t use to like coffee, but now he drinks it every day.',
      'I am used to waking up early for work. (คุ้นชินกับการตื่นเช้าแล้ว)'
    ],
    tips: 'ข้อควรระวัง: ถ้าคนไทยบอก "ฉันเคยไปญี่ปุ่น" ในความหมายว่ามีประสบการณ์ ให้ใช้ Present Perfect (I have been to Japan.) ไม่ใช่ I used to go to Japan. (เพราะ used to แปลว่าเคยไปเป็นกิจวัตรแล้วปัจจุบันไม่ได้ไป)'
  },
  'grammar:passive-basic': {
    title: 'Passive Voice (ประธานถูกกระทำ)',
    badge: 'ประธานโดนกระทำ be + V.3',
    concept: 'ใช้เมื่อต้องการเน้น "ผู้ถูกกระทำ" หรือเมื่อไม่รู้/ไม่จำเป็นต้องบอกว่าใครเป็นคนทำ โครงสร้างหลักคือ Verb to be (ผันตาม Tense และประธาน) + V.3',
    formula: 'Present Sim: is/am/are + V.3 | Past Sim: was/were + V.3 | Future: will be + V.3 | Modals: can/must + be + V.3',
    negQuestion: 'ถ้าต้องการระบุผู้กระทำ ให้ใส่ by + ผู้กระทำ ไว้ท้ายประโยค',
    examples: [
      'The Mona Lisa was painted by Leonardo da Vinci.',
      'Millions of emails are sent every minute.',
      'This homework must be completed by Friday.'
    ],
    tips: 'จำหัวใจของ Passive Voice: "มี be + กริยาช่อง 3 เสมอ" ถ้าไม่มี be หรือไม่มี V.3 แสดงว่าไม่ใช่ Passive Voice แน่นอน'
  },
  'grammar:conditional-2': {
    title: 'Second Conditional (สมมุติสิ่งที่ไม่จริงในปัจจุบัน/อนาคต)',
    badge: 'มโน / จินตนาการ / If I were you',
    concept: 'ใช้สมมุติเหตุการณ์ที่เพ้อฝัน ไม่เป็นจริง หรือเป็นไปได้ยากมากในปัจจุบันและอนาคต รวมถึงการใช้ "If I were you, I would..." เพื่อให้คำแนะนำ',
    formula: 'If + S + V.2 (Past Simple), S + would/could/might + V.1',
    negQuestion: 'ในภาษาอังกฤษมาตรฐาน นิยมใช้ were กับประธานทุกตัวใน If-clause (รวมถึง I, he, she, it)',
    examples: [
      'If I won the lottery, I would travel around the world. (ตอนนี้ยังไม่ถูกหวย แค่จินตนาการ)',
      'If I were you, I would apologize to her. (ถ้าฉันเป็นเธอนะ ฉันจะไปขอโทษเขา)',
      'What would you do if you had superpowers?'
    ],
    tips: 'ใน If-clause ห้ามใส่ would เด็ดขาด! โครงสร้างต้องเป็น If + Past Simple (V.2) เท่านั้น และ would ไปอยู่ประโยคหลัก'
  },
  'grammar:modals-deduction': {
    title: 'Modals of Deduction (การคาดคะเนในปัจจุบัน)',
    badge: 'must / can’t / might / could',
    concept: 'ใช้คาดเดาความน่าจะเป็นจากหลักฐานที่เห็น: must = มั่นใจ 95-100% ว่าใช่แน่ๆ | can\'t = มั่นใจ 100% ว่าเป็นไปไม่ได้แน่ๆ | might / could = อาจจะ (ประมาณ 50%)',
    formula: 'S + must / can’t / might / could + V.1 (รูปเดิมไม่ผัน)',
    negQuestion: 'ในการคาดเดา ปฏิเสธของ must ไม่ใช่ mustn\'t แต่คือ can\'t! (must = ใช่แน่ๆ, can\'t = ไม่ใช่แน่ๆ)',
    examples: [
      'His light is on, so he must be at home. (เปิดไฟอยู่ ต้องอยู่บ้านแน่ๆ)',
      'She can’t be Thai; she doesn’t speak a word of Thai. (พูดไทยไม่ได้เลย ไม่ใช่คนไทยแน่ๆ)',
      'Take an umbrella. It might rain later. (ฟ้าครึ้ม อาจจะตกหรือไม่ตกก็ได้)'
    ],
    tips: 'ระวังข้อสอบหลอก: ถ้าเห็นประโยคบอกว่า "เขาเพิ่งกินข้าวเสร็จ เขา...หิวแน่ๆ" ต้องตอบ He can\'t be hungry! ไม่ใช่ mustn\'t'
  },
  'grammar:relative-clauses-defining': {
    title: 'Defining Relative Clauses (ประโยคย่อยขยายคำนามชี้เฉพาะ)',
    badge: 'who / which / that / whose',
    concept: 'ใช้ขยายคำนามเพื่อให้รู้ชัดเจนว่ากำลังพูดถึง "คนไหน" หรือ "สิ่งไหน" โดยไม่มีเครื่องหมาย comma (,) คั่น',
    formula: 'คน: who / that | สิ่งของ/สัตว์: which / that | สถานที่: where | แสดงความเป็นเจ้าของ: whose + นาม',
    negQuestion: 'เมื่อ relative pronoun ทำหน้าที่เป็น "กรรม" ของประโยคย่อย เราสามารถ "ละ" (omit) ทิ้งได้เลย เช่น The book (that) I bought is great.',
    examples: [
      'The teacher who taught me English was very kind.',
      'This is the laptop which/that I bought last week.',
      'I know a woman whose son is a doctor.'
    ],
    tips: 'ถ้า relative pronoun ตามหลังด้วยประธาน + กริยา (เช่น the movie which we watched) เราสามารถตัด which ทิ้งได้เลย แต่ถ้าตามหลังด้วยกริยาทันที (the man who called me) ห้ามตัดทิ้ง!'
  },
  'grammar:reported-speech-statements': {
    title: 'Reported Speech & Indirect Questions (การเล่าต่อทางอ้อม)',
    badge: 'เล่าต่อถอย tense & คำถามไม่สลับกริยา',
    concept: 'เมื่อนำคำพูดของคนอื่นมาเล่าต่อ โดยทั่วไปจะถอย Tense ไปอดีต 1 ขั้น (Present -> Past, will -> would, can -> could) และเปลี่ยนสรรพนาม/คำบอกเวลาให้เข้ากับบริบท',
    formula: 'เล่าบอกเล่า: S + said (that)... / S + told + me (that)... | ถามทางอ้อม: Can you tell me + Question Word + S + V?',
    negQuestion: 'ใน Indirect Questions ห้ามสลับกริยากลับหน้าประธาน! (ต้องเรียง Subject + Verb เหมือนบอกเล่า เช่น Can you tell me where the station is?)',
    examples: [
      'He said, "I am tired." -> He said that he was tired.',
      'She said, "I will call you tomorrow." -> She said she would call me the next day.',
      'Where does he live? -> Do you know where he lives?'
    ],
    tips: 'จำคู่ say vs tell: "say ไม่ต้องมีกรรม (said that...) แต่ tell ต้องมีกรรมคนฟังเสมอ (told me that...)"'
  },
  'grammar:verb-patterns-meaning-change': {
    title: 'Verb Patterns with Meaning Changes (กริยาเปลี่ยนความหมาย)',
    badge: 'to V.1 vs V.ing ความหมายเปลี่ยน',
    concept: 'กริยาบางตัวตามด้วย to + V.1 หรือ V.ing แล้วความหมายต่างกันอย่างสิ้นเชิง: remember, forget, stop, regret, try',
    formula: 'to + V.1 = คิดจะทำ/ยังไม่ได้ทำ (มุ่งไปข้างหน้า) | V.ing = ทำไปแล้ว/นึกถึงสิ่งที่ทำไปแล้วในอดีต',
    negQuestion: 'stop to do = หยุดเพื่อจะทำสิ่งนั้น | stop doing = เลิกทำสิ่งนั้นไปเลย',
    examples: [
      'Remember to lock the door! (อย่าลืมล็อคประตูก่อนออกจากบ้านนะ)',
      'I remember locking the door. (ฉันจำได้ว่าตอนนั้นล็อคไปแล้ว)',
      'He stopped smoking. (เขาเลิกสูบบุหรี่แล้ว) vs He stopped to smoke. (เขาหยุดพักเพื่อจะสูบบุหรี่)'
    ],
    tips: 'ทริคจำของพี่ปิ๊ก: "to = กำลังจะไปทำ (อนาคต), -ing = กำลังทำหรือเคยทำมาแล้ว (อดีต)"'
  },
  'grammar:discourse-connectors': {
    title: 'Discourse Connectors (คำเชื่อมระดับกลาง)',
    badge: 'ขัดแย้ง เหตุผล จุดประสงค์',
    concept: 'คำเชื่อมที่ช่วยให้ประโยคสละสลวยและเชื่อมโยงความคิด: ขัดแย้ง (however, although, despite), จุดประสงค์ (so that, in order to), ผลลัพธ์ (therefore, as a result)',
    formula: 'although + ประโยค (S+V) | despite / in spite of + Noun / V.ing | however / therefore + เครื่องหมาย (, )',
    negQuestion: 'ระวัง: despite ไม่มี of! (despite + Noun หรือ in spite of + Noun ความหมายเหมือนกัน)',
    examples: [
      'Although it was raining heavily, we went for a walk.',
      'Despite the heavy rain, we went for a walk.',
      'I woke up early so that I wouldn’t be late for the meeting.'
    ],
    tips: 'ดูว่าข้างหลังตามด้วย "ประโยค (S+V)" หรือ "กลุ่มคำนาม (Noun phrase)": Although + ประโยค, แต่ Despite / In spite of + คำนาม!'
  },
  'review:b1-midboss': {
    title: '⚔️ มินิบอสประลอง 4 โครงสร้าง B1 (Mid-Boss Checkpoint)',
    badge: 'ทบทวน 4 เสาหลัก B1',
    concept: 'รวม 4 หัวข้อสำคัญแรกของ B1: Present Perfect Con (ระยะเวลาต่อเนื่อง), Past Perfect (อดีตก่อนอดีต had+V.3), used to (ความเคยชิน), และ Passive Voice (be + V.3)',
    formula: 'ดูบริบทและคำบอกเวลาเป็นหลัก: since/for (Pres Perf Con), before/by the time (Past Perf), habit in past (used to), ประธานโดนทำ (Passive)',
    negQuestion: 'สังเกตตัวชี้วัดในประโยคก่อนตัดสินใจเลือกโครงสร้าง',
    examples: [
      'He had lived in Tokyo before he moved to Bangkok.',
      'They have been playing games since 10 AM.',
      'The new road will be built next year.'
    ],
    tips: 'ใจเย็นๆ อ่านทั้งประโยคให้จบ หาคำบอกเวลาและดูว่าประธานเป็นคนทำเองหรือถูกกระทำ'
  },
  'review:b1-finalboss': {
    title: '👑 มหาศึกผู้เชี่ยวชาญไวยากรณ์ B1 (Master of B1 Grammar)',
    badge: 'บอสใหญ่ B1 ครอบคลุม 10 หัวข้อ',
    concept: 'ด่านทดสอบความเป็นเลิศของระดับ B1 ผสมผสานโจทย์ทั้ง 10 หัวข้อ เพื่อวัดความแม่นยำในการเลือกใช้โครงสร้างทางไวยากรณ์ที่เหมาะสมกับทุกบริบท',
    formula: 'ครอบคลุมทุกโครงสร้าง: Tenses ขั้นกลาง, Passive, Conditionals, Modals of Deduction, Relative Clauses, Reported Speech, Verb Patterns, Connectors',
    negQuestion: 'วิเคราะห์ความหมาย บริบท และโครงสร้างประโยคอย่างละเอียด',
    examples: [
      'If she had known the truth, she would feel differently.',
      'The phone which was stolen has been recovered.',
      'He asked me where I was going.'
    ],
    tips: 'จำหลักสำคัญของแต่ละหัวข้อให้แม่นยำ และมองหา Keyword บอกบริบทเสมอ!'
  }
};
