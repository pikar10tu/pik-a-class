import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { contentHash } from '../src/lib/schema/content-checks.js';
import { fixSentenceBuilder, B1_MCQ_UPGRADES } from './audit-and-fix-seeds.mjs';

const exercises = [
  // ==========================================
  // TOPIC 1: PRESENT PERFECT CONTINUOUS (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันเรียนภาษาอังกฤษมาเป็นเวลาสามชั่วโมงแล้ว',
    choices: ['I', 'have', 'been', 'studying', 'English', 'for', 'three', 'hours', 'has', 'studied', 'since'],
    answerKey: [
      'I have been studying English for three hours'
    ],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฝนตกต่อเนื่องมาตั้งแต่เช้าตรู่',
    choices: ['It', 'has', 'been', 'raining', 'since', 'early', 'morning', 'have', 'rained', 'for'],
    answerKey: [
      'It has been raining since early morning'
    ],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณรออยู่ที่นี่นานแค่ไหนแล้ว',
    choices: ['How', 'long', 'have', 'you', 'been', 'waiting', 'here', 'has', 'waited', 'are'],
    answerKey: [
      'How long have you been waiting here'
    ],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: พวกเขากำลังทำงานในโครงการนี้มาตลอดทั้งสัปดาห์',
    choices: ['They', 'have', 'been', 'working', 'on', 'this', 'project', 'all', 'week', 'has', 'worked', 'at'],
    answerKey: [
      'They have been working on this project all week'
    ],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Sarah looks tired because she has been ___ (run) in the park for an hour.',
    answerKey: ['running'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'How long ___ you been learning to play the piano?',
    answerKey: ['have'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'He has ___ living in this apartment since last December.',
    answerKey: ['been'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'We have been waiting for the bus ___ forty minutes.',
    answerKey: ['for'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'It has been snowing heavily ___ yesterday afternoon.',
    answerKey: ['since'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'My eyes hurt because I have been ___ (read) on my tablet all evening.',
    answerKey: ['reading'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Why are your hands so dirty? - I ___ my bicycle in the garage.',
    choices: ['have been repairing', 'have repaired', 'am repair', 'had repair'],
    answerKey: ['have been repairing'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'John has ___ English since he was seven years old.',
    choices: ['been studying', 'studying', 'be studied', 'study'],
    answerKey: ['been studying'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'ประโยคใดเน้นว่า "กำลังนั่งเขียนจดหมายต่อเนื่องมาตลอดเช้า" โดยใช้ Present Perfect Continuous ได้ถูกต้อง?',
    choices: [
      'She has been writing letters all morning.',
      'She is write letters all morning.',
      'She has write letters all morning.',
      'She had been write letters all morning.'
    ],
    answerKey: ['She has been writing letters all morning.'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'State Verbs เช่น know, like ไม่นิยมใช้รูป Continuous ข้อใดถูกต้องตามหลักไวยากรณ์?',
    choices: [
      'I have known him for five years.',
      'I have been knowing him for five years.',
      'I am knowing him for five years.',
      'I knowed him for five years.'
    ],
    answerKey: ['I have known him for five years.'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'The grass is wet. It ___ raining recently.',
    choices: ['has been', 'have been', 'is being', 'was been'],
    answerKey: ['has been'],
    tags: ['grammar:present-perfect-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // ==========================================
  // TOPIC 2: PAST PERFECT (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เมื่อฉันไปถึงสถานี รถไฟก็ออกไปแล้ว',
    choices: ['When', 'I', 'arrived', 'at', 'the', 'station', 'the', 'train', 'had', 'already', 'left', 'has', 'leaves'],
    answerKey: [
      'When I arrived at the station the train had already left',
      'The train had already left when I arrived at the station'
    ],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เธอทำการบ้านเสร็จก่อนที่เพื่อนของเธอจะโทรมา',
    choices: ['She', 'had', 'finished', 'her', 'homework', 'before', 'friend', 'called', 'has', 'calling'],
    answerKey: [
      'She had finished her homework before her friend called',
      'Before her friend called she had finished her homework'
    ],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: พวกเขาไม่เคยเห็นหิมะมาก่อนจนกระทั่งพวกเขาไปเที่ยวญี่ปุ่น',
    choices: ['They', 'had', 'never', 'seen', 'snow', 'before', 'visited', 'Japan', 'have', 'saw'],
    answerKey: [
      'They had never seen snow before they visited Japan',
      'Before they visited Japan they had never seen snow'
    ],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เมื่อถึงเวลาที่หนังเริ่ม พวกเราก็ซื้อป๊อปคอร์นเรียบร้อยแล้ว',
    choices: ['By', 'the', 'time', 'movie', 'started', 'we', 'had', 'bought', 'popcorn', 'have', 'buy'],
    answerKey: [
      'By the time the movie started we had bought the popcorn',
      'We had bought the popcorn by the time the movie started'
    ],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'After Tom ___ (eat) his breakfast, he went to work.',
    answerKey: ['had eaten', 'had had'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'The teacher was angry because Alex ___ not done his homework.',
    answerKey: ['had'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'By the time the police arrived, the thief had already ___ (escape).',
    answerKey: ['escaped'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: "I couldn't enter the house because I had ___ (lose) my key.",
    answerKey: ['lost'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'She realized that she ___ forgotten her passport at home.',
    answerKey: ['had'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Before she moved to London, she had ___ (live) in Manchester for ten years.',
    answerKey: ['lived'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'When we got to the cinema, the film ___ already begun.',
    choices: ['had', 'has', 'was', 'is'],
    answerKey: ['had'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'He was very nervous during the flight because he ___ on an airplane before.',
    choices: ['had never flown', 'has never flown', 'never flew', 'had never fly'],
    answerKey: ['had never flown'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'By 10 PM last night, everyone ___ to sleep.',
    choices: ['had gone', 'have gone', 'was went', 'has went'],
    answerKey: ['had gone'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'ข้อใดเรียงลำดับเหตุการณ์ในอดีต (เกิดก่อนใช้ Had + V.3, เกิดทีหลังใช้ V.2) ได้ถูกต้อง?',
    choices: [
      'I had washed the dishes before Mom came home.',
      'I washed the dishes before Mom had come home.',
      'I had washed the dishes after Mom had come home.',
      'I was washing the dishes before Mom has come home.'
    ],
    answerKey: ['I had washed the dishes before Mom came home.'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: "Lisa didn't want to watch the movie because she ___ the book.",
    choices: ['had already read', 'has already read', 'already reads', 'was already read'],
    answerKey: ['had already read'],
    tags: ['grammar:past-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // ==========================================
  // TOPIC 3: PAST HABITS (used to) (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันเคยเล่นเปียโนตอนที่ฉันยังเด็ก',
    choices: ['I', 'used', 'to', 'play', 'the', 'piano', 'when', 'was', 'young', 'am', 'playing', 'use'],
    answerKey: [
      'I used to play the piano when I was young',
      'When I was young I used to play the piano'
    ],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เขาไม่เคยชอบกาแฟแต่ตอนนี้เขาดื่มมันทุกวัน',
    choices: ['He', "didn't", 'use', 'to', 'like', 'coffee', 'but', 'now', 'drinks', 'it', 'every', 'day', 'used', 'likes'],
    answerKey: [
      "He didn't use to like coffee but now he drinks it every day"
    ],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณเคยอาศัยอยู่ในกรุงเทพฯ ใช่ไหม',
    choices: ['Did', 'you', 'use', 'to', 'live', 'in', 'Bangkok', 'Do', 'used', 'living'],
    answerKey: [
      'Did you use to live in Bangkok'
    ],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันเคยชินกับการตื่นเช้าเพื่อไปทำงานแล้ว',
    choices: ['I', 'am', 'used', 'to', 'waking', 'up', 'early', 'for', 'work', 'wake', 'did'],
    answerKey: [
      'I am used to waking up early for work'
    ],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'My grandfather ___ to walk five kilometers to school every day when he was a boy.',
    answerKey: ['used'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Did they ___ to have long hair when they were at university?',
    answerKey: ['use'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: "We didn't ___ to eat spicy food, but now we love som tam.",
    answerKey: ['use'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Living in London is noisy, but I am getting used to ___ (hear) the sirens.',
    answerKey: ['hearing'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'He is a professional chef, so he is used to ___ (cook) for hundreds of guests.',
    answerKey: ['cooking'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'There ___ to be a quiet park here before the mall was built.',
    answerKey: ['used'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'I ___ live in a small village, but now I live in a big city.',
    choices: ['used to', 'am used to', 'got used to', 'use to'],
    answerKey: ['used to'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'โครงสร้าง "be used to" (คุ้นชินแล้ว) ต้องตามด้วยรูปใดเสมอ?',
    choices: ['V.ing หรือ คำนาม', 'V.1 infinitive ไม่ผัน', 'V.2 past tense', 'V.3 past participle'],
    answerKey: ['V.ing หรือ คำนาม'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: "She didn't ___ watch cartoons when she was younger.",
    choices: ['use to', 'used to', 'using to', 'used'],
    answerKey: ['use to'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'At first, driving on the left was difficult, but Jack soon got used to ___ on the left.',
    choices: ['driving', 'drive', 'drove', 'drives'],
    answerKey: ['driving'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'ประโยคใดแปลว่า "ฉันเคยชินกับการตื่นเช้าแล้วในปัจจุบัน"?',
    choices: [
      'I am used to waking up early.',
      'I used to wake up early.',
      'I use to wake up early.',
      "I didn't use to wake up early."
    ],
    answerKey: ['I am used to waking up early.'],
    tags: ['grammar:used-to-habits'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // ==========================================
  // TOPIC 4: PASSIVE VOICE (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ภาพวาดนี้ถูกวาดโดยศิลปินชื่อดัง',
    choices: ['This', 'painting', 'was', 'painted', 'by', 'a', 'famous', 'artist', 'is', 'paint', 'were'],
    answerKey: [
      'This painting was painted by a famous artist'
    ],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: อีเมลหลายล้านฉบับถูกส่งในทุกๆ นาที',
    choices: ['Millions', 'of', 'emails', 'are', 'sent', 'every', 'minute', 'is', 'send', 'were'],
    answerKey: [
      'Millions of emails are sent every minute'
    ],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: กฎข้อนี้จะต้องถูกปฏิบัติตามโดยทุกคน',
    choices: ['This', 'rule', 'must', 'be', 'followed', 'by', 'everyone', 'is', 'follow', 'been'],
    answerKey: [
      'This rule must be followed by everyone'
    ],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: สะพานแห่งใหม่จะถูกสร้างขึ้นในปีหน้า',
    choices: ['A', 'new', 'bridge', 'will', 'be', 'built', 'next', 'year', 'build', 'is', 'was'],
    answerKey: [
      'A new bridge will be built next year',
      'Next year a new bridge will be built'
    ],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'English is ___ (speak) in many countries around the world.',
    answerKey: ['spoken'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'The telephone was ___ (invent) by Alexander Graham Bell.',
    answerKey: ['invented'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'All smartphones must ___ turned off during the exam.',
    answerKey: ['be'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'These sports cars are ___ (make) in Germany.',
    answerKey: ['made'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'The stolen bicycles were ___ (find) by the police yesterday.',
    answerKey: ['found'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'A brand-new shopping mall will be ___ (open) next month.',
    answerKey: ['opened'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Romeo and Juliet was written ___ William Shakespeare.',
    choices: ['by', 'with', 'from', 'for'],
    answerKey: ['by'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Our classroom ___ cleaned every afternoon by the janitor.',
    choices: ['is', 'are', 'was been', 'has'],
    answerKey: ['is'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'แปลงประโยค Active เป็น Passive: "They cancelled the flight because of fog."',
    choices: [
      'The flight was cancelled because of fog.',
      'The flight is cancelled because of fog.',
      'The flight cancelled because of fog.',
      'The flight had cancelled because of fog.'
    ],
    answerKey: ['The flight was cancelled because of fog.'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Active: "Someone will deliver the parcel tomorrow." -> Passive: "The parcel ___ tomorrow."',
    choices: ['will be delivered', 'is delivered', 'was delivered', 'will deliver'],
    answerKey: ['will be delivered'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Can this math assignment ___ completed in twenty minutes?',
    choices: ['be', 'is', 'been', 'being'],
    answerKey: ['be'],
    tags: ['grammar:passive-basic'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // ==========================================
  // TOPIC 5: SECOND CONDITIONAL (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ถ้าฉันถูกลอตเตอรี่ ฉันจะเดินทางไปรอบโลก',
    choices: ['If', 'I', 'won', 'the', 'lottery', 'would', 'travel', 'around', 'world', 'win', 'will'],
    answerKey: [
      'If I won the lottery I would travel around the world',
      'I would travel around the world if I won the lottery'
    ],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ถ้าฉันเป็นคุณ ฉันจะบอกความจริงกับเขา',
    choices: ['If', 'I', 'were', 'you', 'would', 'tell', 'him', 'the', 'truth', 'am', 'will', 'told'],
    answerKey: [
      'If I were you I would tell him the truth',
      'I would tell him the truth if I were you'
    ],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณจะทำอย่างไรถ้าคุณมีพลังวิเศษ',
    choices: ['What', 'would', 'you', 'do', 'if', 'had', 'superpowers', 'will', 'have', 'did'],
    answerKey: [
      'What would you do if you had superpowers',
      'If you had superpowers what would you do'
    ],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เธอจะซื้อรถคันนั้นถ้าเธอมีเงินเพียงพอ',
    choices: ['She', 'would', 'buy', 'that', 'car', 'if', 'had', 'enough', 'money', 'will', 'has'],
    answerKey: [
      'She would buy that car if she had enough money',
      'If she had enough money she would buy that car'
    ],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'If I had more free time, I ___ learn how to play the guitar.',
    answerKey: ['would', 'could'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'If she ___ (know) the answer, she would tell us immediately.',
    answerKey: ['knew'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'If I ___ (be) you, I would take that great job offer.',
    answerKey: ['were', 'was'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'They would travel more often if plane tickets ___ (be) cheaper.',
    answerKey: ['were', 'was'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'What ___ you do if you found a lost dog in the street?',
    answerKey: ['would'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'I live in a small room. I wish I ___ (have) a bigger room.',
    answerKey: ['had'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'If I ___ his phone number, I would call him right now.',
    choices: ['had', 'have', 'will have', 'would have'],
    answerKey: ['had'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'If you could live anywhere in the world, where ___ you choose?',
    choices: ['would', 'will', 'did', 'do'],
    answerKey: ['would'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: "We ___ so stressed if our boss didn't give us so much work.",
    choices: ["wouldn't be", "won't be", "aren't", "hadn't be"],
    answerKey: ["wouldn't be"],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'ประโยคใดเป็นการใช้ Second Conditional เพื่อให้คำแนะนำ?',
    choices: [
      'If I were you, I would see a doctor.',
      'If it rains, take an umbrella.',
      'If you freeze water, it turns to ice.',
      'If you come early, you will meet him.'
    ],
    answerKey: ['If I were you, I would see a doctor.'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: "I can't play the guitar. I wish I ___ play the guitar.",
    choices: ['could', 'can', 'will', 'would can'],
    answerKey: ['could'],
    tags: ['grammar:conditional-2'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // ==========================================
  // TOPIC 6: MODALS OF DEDUCTION (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ไฟในห้องเปิดอยู่ เขาต้องอยู่บ้านแน่ๆ',
    choices: ['The', 'light', 'is', 'on', 'so', 'he', 'must', 'be', 'at', 'home', 'can', "can't", 'was'],
    answerKey: [
      'The light is on so he must be at home'
    ],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เธอเพิ่งกินอาหารเที่ยงไป เธอไม่มีทางหิวแน่ๆ',
    choices: ['She', 'just', 'ate', 'lunch', 'so', "can't", 'be', 'hungry', 'must', "isn't"],
    answerKey: [
      "She just ate lunch so she can't be hungry"
    ],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: พกร่มไปด้วยนะ ฝนอาจจะตกตอนบ่าย',
    choices: ['Take', 'an', 'umbrella', 'it', 'might', 'rain', 'this', 'afternoon', 'must', 'raining'],
    answerKey: [
      'Take an umbrella it might rain this afternoon'
    ],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: กุญแจนั้นอาจจะเป็นของทอมก็ได้',
    choices: ['That', 'key', 'could', 'belong', 'to', 'Tom', 'can', 'belongs', 'is'],
    answerKey: [
      'That key could belong to Tom'
    ],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'He has won three international math awards. He ___ be a genius.',
    answerKey: ['must'],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'You have been running for two straight hours! You ___ be exhausted.',
    answerKey: ['must'],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'That woman speaks only Japanese; she ___ be from Spain.',
    answerKey: ["can't", 'cannot'],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'I am not sure where Peter is right now. He ___ be in the library studying.',
    answerKey: ['might', 'could', 'may'],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: "It ___ be true! It's completely impossible!",
    answerKey: ["can't", 'cannot'],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: "Don't call him now. He might ___ sleeping after his night shift.",
    answerKey: ['be'],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Look at that huge mansion and three sports cars! The owner ___ be very wealthy.',
    choices: ['must', "can't", "shouldn't", "wouldn't"],
    answerKey: ['must'],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'John is in hospital with a broken leg, so that ___ be him playing football on the field!',
    choices: ["can't", 'must', 'might', 'should'],
    answerKey: ["can't"],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: "Where are my car keys? - I'm not certain. They ___ be on the kitchen table.",
    choices: ['might', 'must', "can't", 'should'],
    answerKey: ['might'],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'ในการคาดเดาความน่าจะเป็น (Deduction) คำปฏิเสธที่บอกว่า "เป็นไปไม่ได้แน่ๆ" ตรงข้ามกับ must คือข้อใด?',
    choices: ["can't be", "mustn't be", "don't have to be", "shouldn't be"],
    answerKey: ["can't be"],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'That tourist has been standing outside in the heavy snow without a coat. He ___ be freezing!',
    choices: ['must', "can't", 'may not', 'might not'],
    answerKey: ['must'],
    tags: ['grammar:modals-deduction'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // ==========================================
  // TOPIC 7: DEFINING RELATIVE CLAUSES (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: นี่คือหนังสือที่ฉันซื้อเมื่อวานนี้',
    choices: ['This', 'is', 'the', 'book', 'that', 'which', 'I', 'bought', 'yesterday', 'who', 'where'],
    answerKey: [
      'This is the book that I bought yesterday',
      'This is the book which I bought yesterday'
    ],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ครูผู้สอนวิชาภาษาอังกฤษแก่ฉันใจดีมาก',
    choices: ['The', 'teacher', 'who', 'taught', 'me', 'English', 'was', 'very', 'kind', 'which', 'whom'],
    answerKey: [
      'The teacher who taught me English was very kind'
    ],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันรู้จักผู้หญิงคนหนึ่งที่ลูกชายของเธอเป็นหมอ',
    choices: ['I', 'know', 'a', 'woman', 'whose', 'son', 'is', 'doctor', 'who', 'which', 'her'],
    answerKey: [
      'I know a woman whose son is a doctor'
    ],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: นั่นคือร้านอาหารที่พวกเราพบกันครั้งแรก',
    choices: ['That', 'is', 'the', 'restaurant', 'where', 'we', 'first', 'met', 'which', 'who', 'meet'],
    answerKey: [
      'That is the restaurant where we first met'
    ],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'The woman ___ lives next door is an architect.',
    answerKey: ['who', 'that'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'I lost the watch ___ my father gave me for my birthday.',
    answerKey: ['which', 'that'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Do you know anyone ___ speaks fluent German?',
    answerKey: ['who', 'that'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'A bakery is a shop ___ you can buy fresh bread and pastries.',
    answerKey: ['where'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'The boy ___ dog ran away was crying in the park.',
    answerKey: ['whose'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'The hotel ___ we stayed during our holiday had a lovely swimming pool.',
    answerKey: ['where'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: "The person ___ called you didn't leave a message.",
    choices: ['who', 'which', 'whose', 'where'],
    answerKey: ['who'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'ในประโยค "The movie (which) we watched last night was exciting" ทำไมจึงสามารถละคำว่า which ได้?',
    choices: [
      'เพราะ which ทำหน้าที่เป็นกรรมของประโยคย่อย',
      'เพราะ relative pronouns ละได้เสมอในทุกกรณี',
      'เพราะคำว่า movie เป็นคำนามไม่มีชีวิต',
      'เพราะมีกรรมซ้อนอยู่สองตัว'
    ],
    answerKey: ['เพราะ which ทำหน้าที่เป็นกรรมของประโยคย่อย'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'I met a writer ___ books have sold millions of copies worldwide.',
    choices: ['whose', 'who', 'which', 'whom'],
    answerKey: ['whose'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'This is the smart phone ___ has the best battery life on the market.',
    choices: ['that', 'who', 'whose', 'where'],
    answerKey: ['that'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Is there a quiet room in the library ___ I can prepare for my exam?',
    choices: ['where', 'which', 'who', 'whose'],
    answerKey: ['where'],
    tags: ['grammar:relative-clauses-defining'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // ==========================================
  // TOPIC 8: REPORTED SPEECH (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เขาบอกฉันว่าเขารู้สึกเหนื่อยมาก',
    choices: ['He', 'told', 'me', 'that', 'he', 'felt', 'very', 'tired', 'said', 'feels', 'is'],
    answerKey: [
      'He told me that he felt very tired'
    ],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เธอบอกว่าเธอจะโทรหาฉันในวันรุ่งขึ้น',
    choices: ['She', 'said', 'she', 'would', 'call', 'me', 'the', 'next', 'day', 'will', 'told', 'tomorrow'],
    answerKey: [
      'She said she would call me the next day'
    ],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณบอกได้ไหมว่าสถานีรถไฟอยู่ที่ไหน',
    choices: ['Can', 'you', 'tell', 'me', 'where', 'the', 'train', 'station', 'is', 'does', 'station'],
    answerKey: [
      'Can you tell me where the train station is'
    ],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เขาถามฉันว่าฉันอาศัยอยู่ที่ไหน',
    choices: ['He', 'asked', 'me', 'where', 'I', 'lived', 'do', 'live', 'did'],
    answerKey: [
      'He asked me where I lived'
    ],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Direct: "I want some water." -> Reported: He said that he ___ (want) some water.',
    answerKey: ['wanted'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Direct: "I can swim across the river." -> Reported: She said that she ___ swim across the river.',
    answerKey: ['could'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Direct: "We will arrive soon." -> Reported: They told us that they ___ arrive soon.',
    answerKey: ['would'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Do you know what time the supermarket ___ (close) on Sundays?',
    answerKey: ['closes'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Could you tell me how much this backpack ___ (cost)?',
    answerKey: ['costs'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'He ___ (said / told) me that he had already finished his assignment.',
    answerKey: ['told'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Direct: "I don\'t like spicy food." -> Reported: Anna said that she ___ spicy food.',
    choices: ["didn't like", "doesn't like", "hadn't like", 'not liked'],
    answerKey: ["didn't like"],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'ข้อใดเรียงประโยคคำถามทางอ้อม (Indirect Question) ได้ถูกต้องตามหลักไวยากรณ์?',
    choices: [
      'Can you tell me where the bank is?',
      'Can you tell me where is the bank?',
      'Can you tell me where does the bank be?',
      'Can you tell me where the bank does be?'
    ],
    answerKey: ['Can you tell me where the bank is?'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'He ___ that he was moving to Canada next month.',
    choices: ['said', 'told', 'asked to', 'spoke'],
    answerKey: ['said'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Direct: "Are you ready?" -> Indirect: She asked me if I ___ ready.',
    choices: ['was', 'am', 'were', 'had'],
    answerKey: ['was'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Direct: "I saw Jane yesterday." -> Reported: He said he had seen Jane ___.',
    choices: ['the day before', 'yesterday', 'the next day', 'tomorrow'],
    answerKey: ['the day before'],
    tags: ['grammar:reported-speech-statements'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // ==========================================
  // TOPIC 9: VERB PATTERNS (MEANING CHANGES) (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: อย่าลืมล็อคประตูก่อนที่คุณจะออกไปข้างนอก',
    choices: ['Remember', 'to', 'lock', 'the', 'door', 'before', 'you', 'go', 'out', 'locking', 'locked'],
    answerKey: [
      'Remember to lock the door before you go out'
    ],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันจำได้ว่าเคยพบเขาที่งานเลี้ยงเมื่อปีที่แล้ว',
    choices: ['I', 'remember', 'meeting', 'him', 'at', 'the', 'party', 'last', 'year', 'to', 'meet', 'met'],
    answerKey: [
      'I remember meeting him at the party last year'
    ],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เขาหยุดพักเพื่อคุยโทรศัพท์กับหัวหน้าของเขา',
    choices: ['He', 'stopped', 'to', 'talk', 'on', 'the', 'phone', 'with', 'his', 'boss', 'talking', 'talked'],
    answerKey: [
      'He stopped to talk on the phone with his boss'
    ],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณหมอบอกให้เขาเลิกสูบบุหรี่ทันที',
    choices: ['The', 'doctor', 'told', 'him', 'to', 'stop', 'smoking', 'immediately', 'smoke', 'smoked'],
    answerKey: [
      'The doctor told him to stop smoking immediately'
    ],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: "Don't forget ___ (turn) off the air conditioner before leaving the classroom.",
    answerKey: ['to turn'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'I will never forget ___ (see) the Grand Canyon for the very first time.',
    answerKey: ['seeing'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'While driving home, Dad stopped ___ (buy) some fresh bread at the bakery.',
    answerKey: ['to buy'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'Please stop ___ (make) so much noise; the baby is sleeping.',
    answerKey: ['making'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'I tried ___ (open) the tight lid with a spoon, but it was still stuck.',
    answerKey: ['to open'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'If you have trouble falling asleep, try ___ (drink) a warm cup of milk.',
    answerKey: ['drinking'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'He regrets ___ so much money on video games when he was younger.',
    choices: ['spending', 'to spend', 'spend', 'spends'],
    answerKey: ['spending'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: '"We regret ___ you that the flight has been cancelled due to bad weather."',
    choices: ['to inform', 'informing', 'informed', 'inform'],
    answerKey: ['to inform'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'ประโยค "He stopped to smoke." มีความหมายตรงกับข้อใด?',
    choices: [
      'เขาหยุดพักกิจกรรมที่ทำอยู่เพื่อที่จะสูบบุหรี่',
      'เขาเลิกสูบบุหรี่ถาวรแล้ว',
      'เขาห้ามไม่ให้คนอื่นสูบบุหรี่',
      'เขาไม่เคยสูบบุหรี่เลย'
    ],
    answerKey: ['เขาหยุดพักกิจกรรมที่ทำอยู่เพื่อที่จะสูบบุหรี่'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'Remember ___ your passport before leaving for the airport tomorrow morning.',
    choices: ['to bring', 'bringing', 'brought', 'bring'],
    answerKey: ['to bring'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'I clearly remember ___ my keys on this counter, but now they are gone!',
    choices: ['putting', 'to put', 'put', 'puts'],
    answerKey: ['putting'],
    tags: ['grammar:verb-patterns-meaning-change'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // ==========================================
  // TOPIC 10: DISCOURSE CONNECTORS (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: แม้ว่าฝนจะตกหนัก พวกเราก็ยังคงออกไปเดินเล่น',
    choices: ['Although', 'it', 'was', 'raining', 'heavily', 'we', 'went', 'for', 'a', 'walk', 'despite', 'in'],
    answerKey: [
      'Although it was raining heavily we went for a walk',
      'We went for a walk although it was raining heavily'
    ],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: แม้ว่าจะมีความยากลำบาก เขาก็สามารถผ่านการทดสอบได้',
    choices: ['Despite', 'the', 'difficulties', 'he', 'passed', 'the', 'test', 'although', 'of', 'in'],
    answerKey: [
      'Despite the difficulties he passed the test',
      'He passed the test despite the difficulties'
    ],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันตื่นแต่เช้าเพื่อที่จะไม่ไปทำงานสาย',
    choices: ['I', 'woke', 'up', 'early', 'so', 'that', 'would', 'not', 'be', 'late', 'for', 'work', 'in', 'order'],
    answerKey: [
      'I woke up early so that I would not be late for work'
    ],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เขาไม่ได้อ่านหนังสือ ดังนั้นเขาจึงสอบไม่ผ่าน',
    choices: ['He', "didn't", 'study', 'therefore', 'he', 'failed', 'the', 'exam', 'because', 'although'],
    answerKey: [
      "He didn't study therefore he failed the exam"
    ],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // Fill in the Blank (6 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: '___ it was freezing cold outside, she refused to wear a jacket.',
    answerKey: ['Although', 'Even though', 'Though'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'In ___ of the heavy traffic, we arrived at the airport on time.',
    answerKey: ['spite'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'He exercised every single day in ___ to stay healthy and fit.',
    answerKey: ['order'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'She studied diligently; as a ___, she received top marks in all her exams.',
    answerKey: ['result'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'The outdoor concert was cancelled ___ of the severe thunderstorm.',
    answerKey: ['because'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'fill_blank',
    prompt: 'She saved money for two whole years ___ that she could buy a new laptop.',
    answerKey: ['so'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },

  // MCQ (5 ข้อ)
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: '___ the bad weather, the football match continued until the end.',
    choices: ['Despite', 'Although', 'Even though', 'However'],
    answerKey: ['Despite'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'The team worked day and night. ___, they completed the project ahead of deadline.',
    choices: ['Therefore', 'Although', 'Despite', 'Because'],
    answerKey: ['Therefore'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: "We decided to take a taxi ___ we wouldn't be late for the meeting.",
    choices: ['so that', 'in order to', 'because of', 'despite'],
    answerKey: ['so that'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'คำเชื่อมใดตามหลังด้วย "ประโยคสมบูรณ์ (Clause: Subject + Verb)" โดยตรง?',
    choices: ['Although', 'Despite', 'In spite of', 'Because of'],
    answerKey: ['Although'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  },
  {
    skill: 'grammar',
    level: 'B1',
    type: 'mcq',
    prompt: 'He was feeling very tired. ___, he stayed up late to finish his report.',
    choices: ['However', 'Although', 'Because', 'Since'],
    answerKey: ['However'],
    tags: ['grammar:discourse-connectors'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum B1 Intermediate'
  }
];

// ==========================================
// 20 STAGES FOR LEVEL B1
// ==========================================
const stages = [
  {
    skill: 'grammar',
    level: 'B1',
    order: 1,
    title: 'Present Perfect Continuous (Part 1: สร้างความคุ้นเคย)',
    tags: ['grammar:present-perfect-continuous'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: true,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 2,
    title: 'Present Perfect Continuous (Part 2: ท้าทายขึ้น)',
    tags: ['grammar:present-perfect-continuous'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 3,
    title: 'Past Perfect Simple (Part 1: สร้างความคุ้นเคย)',
    tags: ['grammar:past-perfect'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 4,
    title: 'Past Perfect Simple (Part 2: ท้าทายขึ้น)',
    tags: ['grammar:past-perfect'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 5,
    title: 'ความเคยชินในอดีต: used to (Part 1: สร้างความคุ้นเคย)',
    tags: ['grammar:used-to-habits'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 6,
    title: 'ความเคยชินในอดีต: used to vs be used to (Part 2: ท้าทายขึ้น)',
    tags: ['grammar:used-to-habits'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 7,
    title: 'Passive Voice (Part 1: สร้างความคุ้นเคย)',
    tags: ['grammar:passive-basic'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 8,
    title: 'Passive Voice (Part 2: ท้าทายขึ้น)',
    tags: ['grammar:passive-basic'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 9,
    title: '⚔️ มินิบอสประลอง 4 โครงสร้าง B1 (Part 1: ด่านวัดความแม่นยำ)',
    tags: [
      'grammar:present-perfect-continuous',
      'grammar:past-perfect',
      'grammar:used-to-habits',
      'grammar:passive-basic'
    ],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 10,
    title: '👑 มินิบอสประลอง 4 โครงสร้าง B1 (Part 2: ศึกชิงไหวพริบ)',
    tags: [
      'grammar:present-perfect-continuous',
      'grammar:past-perfect',
      'grammar:used-to-habits',
      'grammar:passive-basic'
    ],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 11,
    title: 'Second Conditional (Part 1: สมมุติสิ่งที่ไม่จริง)',
    tags: ['grammar:conditional-2'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 12,
    title: 'Second Conditional & Wishes (Part 2: If I were you & ความปรารถนา)',
    tags: ['grammar:conditional-2'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 13,
    title: 'Modals of Deduction: must, can’t, might, could',
    tags: ['grammar:modals-deduction'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 14,
    title: 'Defining Relative Clauses (Part 1: who, which, that)',
    tags: ['grammar:relative-clauses-defining'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 15,
    title: 'Defining Relative Clauses (Part 2: whose, where และการละสรรพนาม)',
    tags: ['grammar:relative-clauses-defining'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 16,
    title: 'Reported Speech (Part 1: การเปลี่ยนคำพูดบอกเล่า)',
    tags: ['grammar:reported-speech-statements'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 17,
    title: 'Reported Speech & Indirect Questions (Part 2: คำถามทางอ้อม)',
    tags: ['grammar:reported-speech-statements'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 18,
    title: 'กริยาเปลี่ยนความหมาย: remember, stop, forget (to V.1 vs V.ing)',
    tags: ['grammar:verb-patterns-meaning-change'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 19,
    title: 'Discourse Connectors: although, despite, so that, therefore',
    tags: ['grammar:discourse-connectors'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  },
  {
    skill: 'grammar',
    level: 'B1',
    order: 20,
    title: '👑 บอสใหญ่: มหาศึกผู้เชี่ยวชาญไวยากรณ์ B1 (Master of B1 Grammar)',
    tags: [
      'grammar:present-perfect-continuous',
      'grammar:past-perfect',
      'grammar:used-to-habits',
      'grammar:passive-basic',
      'grammar:conditional-2',
      'grammar:modals-deduction',
      'grammar:relative-clauses-defining',
      'grammar:reported-speech-statements',
      'grammar:verb-patterns-meaning-change',
      'grammar:discourse-connectors'
    ],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
    createdBy: 'prawich.aum@dome.tu.ac.th'
  }
];

const defaultMeta = {
  createdAt: '2026-09-23T00:00:00.000Z',
  updatedAt: '2026-09-23T00:00:00.000Z',
  createdBy: 'prawich.aum@dome.tu.ac.th'
};

const b1McqMap = new Map();
for (const up of B1_MCQ_UPGRADES) {
  b1McqMap.set(up.prompt.trim().toLowerCase(), up);
}

const exercisesWithMeta = exercises.map(ex => {
  let item = { ...ex, ...defaultMeta };
  if (item.type === 'sentence_builder') {
    item = fixSentenceBuilder(item);
  } else if (item.type === 'fill_blank') {
    const key = (item.prompt || '').trim().toLowerCase();
    if (b1McqMap.has(key)) {
      const up = b1McqMap.get(key);
      item = {
        ...item,
        type: 'mcq',
        choices: up.choices,
        answerKey: up.answerKey,
      };
    }
  }
  return { ...item, contentHash: contentHash(item) };
});

mkdirSync('docs/seeds', { recursive: true });
writeFileSync('docs/seeds/b1-full-exercises.json', JSON.stringify(exercisesWithMeta, null, 2), 'utf8');
writeFileSync('docs/seeds/b1-full-stages.json', JSON.stringify(stages, null, 2), 'utf8');

console.log(`Generated ${exercisesWithMeta.length} B1 exercises in docs/seeds/b1-full-exercises.json`);
console.log(`Generated ${stages.length} B1 stages in docs/seeds/b1-full-stages.json`);

