import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const exercises = [
  // ==========================================
  // TOPIC 1: PAST SIMPLE (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เมื่อวานนี้พวกเขาเล่นฟุตบอลในสวนสาธารณะ',
    choices: ['They', 'played', 'football', 'in', 'the', 'park', 'yesterday', 'play', 'were', 'at'],
    answerKey: [
      'They played football in the park yesterday',
      'Yesterday they played football in the park'
    ],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันไม่ได้ไปโรงเรียนเมื่อวานนี้เพราะฉันป่วย',
    choices: ['I', "didn't", 'go', 'to', 'school', 'yesterday', 'because', 'was', 'sick', 'went', 'am'],
    answerKey: [
      "I didn't go to school yesterday because I was sick",
      "Yesterday I didn't go to school because I was sick"
    ],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณเจอกุญแจของคุณเมื่อเช้านี้ใช่ไหม',
    choices: ['Did', 'you', 'find', 'your', 'keys', 'this', 'morning', 'Do', 'found', 'are'],
    answerKey: [
      'Did you find your keys this morning'
    ],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เมื่อคืนนี้แม่ทำอาหารเย็นแสนอร่อยให้พวกเรา',
    choices: ['Mom', 'cooked', 'a', 'delicious', 'dinner', 'for', 'us', 'last', 'night', 'cooks', 'cooking'],
    answerKey: [
      'Mom cooked a delicious dinner for us last night',
      'Last night Mom cooked a delicious dinner for us'
    ],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'Last night, my brother ___ fried rice for the whole family.',
    answerKey: ['cooked'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'We ___ go to the beach last weekend because it rained all day.',
    answerKey: ["didn't", 'did not'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: "Two years ago, my family ___ to Bangkok because of my father's new job.",
    answerKey: ['moved'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'When I was ten years old, I ___ my arm while playing football.',
    answerKey: ['broke'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: "She ___ buy that expensive bag yesterday because she didn't have enough cash.",
    answerKey: ["didn't", 'did not'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'Yesterday, Ploy ___ her homework before dinner.',
    choices: ['finish', 'finished', 'finishing', 'finishes'],
    answerKey: ['finished'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: '___ you see the football match on TV last night?',
    choices: ['Do', 'Did', 'Was', 'Have'],
    answerKey: ['Did'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: "They didn't ___ to the concert yesterday because all tickets were sold out.",
    choices: ['went', 'go', 'gone', 'going'],
    answerKey: ['go'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'Last Saturday, Tom ___ a new bicycle with his own savings.',
    choices: ['buy', 'bought', 'buys', 'buying'],
    answerKey: ['bought'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'Where did you ___ your summer holiday last year?',
    choices: ['spend', 'spent', 'spending', 'spends'],
    answerKey: ['spend'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'I ___ my wallet on the bus this morning, but a kind stranger found it.',
    choices: ['lose', 'lost', 'losing', 'loses'],
    answerKey: ['lost'],
    tags: ['grammar:past-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // ==========================================
  // TOPIC 2: PAST CONTINUOUS (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันกำลังอ่านหนังสืออยู่ตอนที่โทรศัพท์ดังขึ้น',
    choices: ['I', 'was', 'reading', 'a', 'book', 'when', 'the', 'phone', 'rang', 'read', 'is', 'ring'],
    answerKey: [
      'I was reading a book when the phone rang'
    ],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ขณะที่แม่กำลังทำอาหาร พ่อก็กำลังล้างจาน',
    choices: ['While', 'mom', 'was', 'cooking', 'dad', 'was', 'washing', 'dishes', 'is', 'cooked', 'cook'],
    answerKey: [
      'While mom was cooking dad was washing dishes'
    ],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เมื่อวานนี้ตอนสองทุ่ม พวกเขากำลังดูภาพยนตร์ด้วยกัน',
    choices: ['They', 'were', 'watching', 'a', 'movie', 'together', 'at', 'eight', 'yesterday', 'watched', 'are', 'was'],
    answerKey: [
      'They were watching a movie together at eight yesterday',
      'At eight yesterday they were watching a movie together'
    ],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณกำลังทำอะไรอยู่ตอนที่ฝนเริ่มตก',
    choices: ['What', 'were', 'you', 'doing', 'when', 'it', 'started', 'raining', 'did', 'do', 'was'],
    answerKey: [
      'What were you doing when it started raining'
    ],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'At 8 PM yesterday, I ___ watching TV in the living room.',
    answerKey: ['was'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'While we were having lunch, a little stray cat ___ into the room.',
    answerKey: ['ran', 'came'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'The students ___ sleeping when the fire alarm suddenly rang.',
    answerKey: ['were'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'What ___ you doing at this exact time yesterday evening?',
    answerKey: ['were'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'While Anna was studying in her bedroom, her brother ___ listening to loud music.',
    answerKey: ['was'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'I was taking a shower when someone ___ on the front door.',
    choices: ['knock', 'knocked', 'was knocking', 'knocking'],
    answerKey: ['knocked'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'While my parents were cooking dinner, we ___ the living room.',
    choices: ['cleaned', 'were cleaning', 'clean', 'are cleaning'],
    answerKey: ['were cleaning'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'The children ___ football in the garden when the storm suddenly began.',
    choices: ['played', 'were playing', 'are playing', 'play'],
    answerKey: ['were playing'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'What were you doing when the lights ___ out last night?',
    choices: ['go', 'went', 'were going', 'gone'],
    answerKey: ['went'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'He was driving home when he ___ an accident on the highway.',
    choices: ['saw', 'was seeing', 'sees', 'had seen'],
    answerKey: ['saw'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'Why ___ she crying when you walked into the classroom?',
    choices: ['was', 'were', 'did', 'is'],
    answerKey: ['was'],
    tags: ['grammar:past-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // ==========================================
  // TOPIC 3: PRESENT PERFECT (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันเคยไปเที่ยวประเทศญี่ปุ่นมาสองครั้งแล้ว',
    choices: ['I', 'have', 'visited', 'Japan', 'two', 'times', 'already', 'has', 'visit', 'am'],
    answerKey: [
      'I have visited Japan two times already'
    ],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณเคยลองกินอาหารเม็กซิกันไหม',
    choices: ['Have', 'you', 'ever', 'tried', 'Mexican', 'food', 'Did', 'try', 'has', 'are'],
    answerKey: [
      'Have you ever tried Mexican food'
    ],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เขาอาศัยอยู่ในเชียงใหม่มาเป็นเวลาห้าปีแล้ว',
    choices: ['He', 'has', 'lived', 'in', 'Chiang', 'Mai', 'for', 'five', 'years', 'have', 'since', 'live'],
    answerKey: [
      'He has lived in Chiang Mai for five years'
    ],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: พวกเรายังทำการบ้านภาษาอังกฤษไม่เสร็จเลย',
    choices: ['We', "haven't", 'finished', 'our', 'English', 'homework', 'yet', 'hasn’t', 'finish', 'already'],
    answerKey: [
      "We haven't finished our English homework yet"
    ],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'I have lived in this city ___ 2018.',
    answerKey: ['since'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'She has studied English at this school ___ three years.',
    answerKey: ['for'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'Have you ___ eaten raw fish or sashimi before?',
    answerKey: ['ever'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: "The flight hasn't arrived at the airport ___.",
    answerKey: ['yet'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'He ___ already finished his science project before anyone else.',
    answerKey: ['has', "'s"],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: "I ___ that famous action movie three times; it's so good!",
    choices: ['saw', 'have seen', 'see', 'am seeing'],
    answerKey: ['have seen'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'She has lived in London ___ ten years.',
    choices: ['since', 'for', 'during', 'ago'],
    answerKey: ['for'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'Have you ever ___ an elephant in real life?',
    choices: ['ride', 'rode', 'ridden', 'riding'],
    answerKey: ['ridden'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'They have ___ returned home from their exciting trip to Europe.',
    choices: ['just', 'yet', 'since', 'ever'],
    answerKey: ['just'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: "Peter can't open his front door because he has ___ his keys.",
    choices: ['lost', 'lose', 'losing', 'loosed'],
    answerKey: ['lost'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: "We haven't received any reply from Teacher Pik ___.",
    choices: ['already', 'yet', 'since', 'just'],
    answerKey: ['yet'],
    tags: ['grammar:present-perfect'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // ==========================================
  // TOPIC 4: FUTURE FORMS (15 ข้อ)
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันกำลังจะไปเยี่ยมคุณยายสุดสัปดาห์นี้',
    choices: ['I', 'am', 'going', 'to', 'visit', 'my', 'grandmother', 'this', 'weekend', 'will', 'visited', 'go'],
    answerKey: [
      'I am going to visit my grandmother this weekend',
      'This weekend I am going to visit my grandmother'
    ],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ดูเมฆดำพวกนั้นสิ ฝนกำลังจะตกแล้ว',
    choices: ['Look', 'at', 'those', 'dark', 'clouds', 'it', 'is', 'going', 'to', 'rain', 'will', 'rained', 'rains'],
    answerKey: [
      'Look at those dark clouds it is going to rain'
    ],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: โทรศัพท์กำลังดังอยู่ เดี๋ยวฉันจะรับสายเอง',
    choices: ['The', 'phone', 'is', 'ringing', 'I', 'will', 'answer', 'it', 'am', 'answered', 'going'],
    answerKey: [
      'The phone is ringing I will answer it'
    ],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันสัญญาว่าฉันจะไม่บอกความลับนี้กับใครเลย',
    choices: ['I', 'promise', 'I', 'will', 'not', 'tell', 'this', 'secret', 'to', 'anyone', 'told', 'am', 'do'],
    answerKey: [
      'I promise I will not tell this secret to anyone',
      "I promise I won't tell this secret to anyone"
    ],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'That box looks very heavy! I ___ help you carry it upstairs.',
    answerKey: ['will', "'ll"],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'Look at that careless driver! He is ___ to crash into that tree!',
    answerKey: ['going'],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: "Don't worry, Mom. I ___ not be late for school tomorrow morning.",
    answerKey: ['will'],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'We are ___ to travel to Chiang Mai during the long holiday next month.',
    answerKey: ['going'],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'fill_blank',
    prompt: 'Scientists believe that humans ___ live on Mars in the year 2080.',
    answerKey: ['will'],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'Look at those dark grey clouds in the sky! It ___ rain very soon.',
    choices: ['will', 'is going to', 'rains', 'rained'],
    answerKey: ['is going to'],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: "A: 'The doorbell is ringing.' B: 'Don't get up, I ___ open it.'",
    choices: ['will', 'am going to', 'am opening', 'opened'],
    answerKey: ['will'],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'We have already booked our hotel rooms. We ___ stay by the beach for three days.',
    choices: ['are going to', 'will', 'would', 'shall'],
    answerKey: ['are going to'],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'I promise I ___ forget to bring your English textbook tomorrow.',
    choices: ["won't", 'am not', "don't", "haven't"],
    answerKey: ["won't"],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'What are your plans for tonight? What ___ do after dinner?',
    choices: ['are you going to', 'will you', 'do you', 'did you'],
    answerKey: ['are you going to'],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  },
  {
    skill: 'grammar',
    level: 'A2',
    type: 'mcq',
    prompt: 'In my opinion, robots ___ do all repetitive household chores in the future.',
    choices: ['will', 'are going to', 'going to', 'are doing'],
    answerKey: ['will'],
    tags: ['grammar:future-going-to-will'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A2 Tenses Saga'
  }
];

const stages = [
  {
    skill: 'grammar',
    level: 'A2',
    order: 1,
    title: 'Past Simple ภาค 1: เรื่องเล่าวันวาน',
    tags: ['grammar:past-simple'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: true,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A2',
    order: 2,
    title: 'Past Simple ภาค 2: ปฏิเสธและซักถาม',
    tags: ['grammar:past-simple'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A2',
    order: 3,
    title: 'Past Continuous ภาค 1: ขณะนั้นกำลังทำ',
    tags: ['grammar:past-continuous'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A2',
    order: 4,
    title: 'Past Continuous ภาค 2: เหตุการณ์ซ้อนตัด',
    tags: ['grammar:past-continuous'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A2',
    order: 5,
    title: 'Present Perfect ภาค 1: ประสบการณ์ชีวิต',
    tags: ['grammar:present-perfect'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A2',
    order: 6,
    title: 'Present Perfect ภาค 2: ผลลัพธ์ถึงปัจจุบัน',
    tags: ['grammar:present-perfect'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A2',
    order: 7,
    title: 'Future Forms ภาค 1: วางแผนล่วงหน้า',
    tags: ['grammar:future-going-to-will'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A2',
    order: 8,
    title: 'Future Forms ภาค 2: สัญญาและทำนาย',
    tags: ['grammar:future-going-to-will'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A2',
    order: 9,
    title: '⚔️ มินิบอส Part 1: ประลองยุทธ์ 4 กาลเวลา',
    tags: [
      'grammar:past-simple',
      'grammar:past-continuous',
      'grammar:present-perfect',
      'grammar:future-going-to-will'
    ],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A2',
    order: 10,
    title: '👑 มินิบอส Part 2: ศึกตัดสินจ้าวแห่ง Tenses',
    tags: [
      'grammar:past-simple',
      'grammar:past-continuous',
      'grammar:present-perfect',
      'grammar:future-going-to-will'
    ],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  }
];

const now = '2026-09-23T00:00:00.000Z';
const seededExercises = exercises.map(ex => ({
  ...ex,
  createdAt: now,
  updatedAt: now,
  createdBy: 'curriculum-auditor',
}));

const seededStages = stages.map(st => ({
  ...st,
  createdAt: now,
  updatedAt: now,
  createdBy: 'curriculum-auditor',
}));

mkdirSync('docs/seeds', { recursive: true });
writeFileSync('docs/seeds/a2-tenses-saga-exercises.json', JSON.stringify(seededExercises, null, 2), 'utf8');
writeFileSync('docs/seeds/a2-tenses-saga-stages.json', JSON.stringify(seededStages, null, 2), 'utf8');
console.log(`Generated ${seededExercises.length} exercises and ${seededStages.length} stages!`);
