import { writeFileSync, mkdirSync } from 'node:fs';

const exercises = [
  // ==========================================
  // TOPIC 1: PRESENT SIMPLE (15 ข้อ)
  // Tag: grammar:present-simple
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: น้องสาวของฉันดื่มนมอุ่นทุกเช้า',
    choices: ['My', 'sister', 'drinks', 'warm', 'milk', 'every', 'morning', 'drink', 'is', 'a'],
    answerKey: [
      'My sister drinks warm milk every morning',
      'Every morning my sister drinks warm milk'
    ],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เขาไม่ชอบอาหารรสเผ็ด',
    choices: ['He', 'does', 'not', 'like', 'spicy', 'food', "doesn't", 'do', 'likes', 'is'],
    answerKey: [
      'He does not like spicy food',
      "He doesn't like spicy food"
    ],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณอาศัยอยู่ในกรุงเทพฯ กับพ่อแม่ใช่ไหม',
    choices: ['Do', 'you', 'live', 'in', 'Bangkok', 'with', 'your', 'parents', 'Does', 'living', 'are'],
    answerKey: [
      'Do you live in Bangkok with your parents'
    ],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ดวงอาทิตย์ขึ้นทางทิศตะวันออกเสมอ',
    choices: ['The', 'sun', 'always', 'rises', 'in', 'the', 'east', 'rise', 'rising', 'on'],
    answerKey: [
      'The sun always rises in the east',
      'Always the sun rises in the east'
    ],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Peter ___ English every Monday and Wednesday.',
    answerKey: ['studies', 'learns'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'She ___ not drink coffee in the evening.',
    answerKey: ['does'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'My grandparents ___ in a quiet village near the mountains.',
    answerKey: ['live', 'stay'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ your brother play the guitar?',
    answerKey: ['Does'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Cats ___ warm places to take a nap.',
    answerKey: ['like', 'love', 'prefer'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She ___ to school by bus every weekday.',
    choices: ['go', 'goes', 'going', 'is go'],
    answerKey: ['goes'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'My brother ___ like raw onions.',
    choices: ["doesn't", "don't", "isn't", "not"],
    answerKey: ["doesn't"],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ they practice badminton after class?',
    choices: ['Do', 'Does', 'Are', 'Is'],
    answerKey: ['Do'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'The little baby ___ whenever she is hungry.',
    choices: ['cry', 'cries', 'crying', 'is cry'],
    answerKey: ['cries'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'We ___ breakfast together at 7 o’clock every morning.',
    choices: ['have', 'has', 'having', 'are have'],
    answerKey: ['have'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Pure water ___ at 100 degrees Celsius.',
    choices: ['boil', 'boils', 'boiling', 'is boil'],
    answerKey: ['boils'],
    tags: ['grammar:present-simple'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // ==========================================
  // TOPIC 2: ARTICLES & NOUNS (15 ข้อ)
  // Tag: grammar:articles-nouns
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: มีแอปเปิลหนึ่งผลวางอยู่บนโต๊ะในครัว',
    choices: ['There', 'is', 'an', 'apple', 'on', 'the', 'kitchen', 'table', 'a', 'are'],
    answerKey: [
      'There is an apple on the kitchen table',
      'On the kitchen table there is an apple'
    ],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณพ่อของฉันเป็นหมอที่โรงพยาบาลแห่งหนึ่ง',
    choices: ['My', 'father', 'is', 'a', 'doctor', 'at', 'a', 'hospital', 'an', 'the'],
    answerKey: [
      'My father is a doctor at a hospital'
    ],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เด็กๆ กำลังเล่นอยู่ในสวนอย่างมีความสุข',
    choices: ['The', 'children', 'are', 'playing', 'happily', 'in', 'the', 'garden', 'child', 'is'],
    answerKey: [
      'The children are playing happily in the garden',
      'In the garden the children are playing happily'
    ],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เธอซื้อสตรอว์เบอร์รีสามกล่องเมื่อวานนี้',
    choices: ['She', 'bought', 'three', 'boxes', 'of', 'strawberries', 'yesterday', 'box', 'strawberry', 'a'],
    answerKey: [
      'She bought three boxes of strawberries yesterday',
      'Yesterday she bought three boxes of strawberries'
    ],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'He wants to become ___ electrical engineer in the future.',
    answerKey: ['an'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'My sister has two ___ and one fluffy cat.',
    answerKey: ['dogs', 'puppies'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'I eat ___ orange after lunch every day.',
    answerKey: ['an'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'There are five ___ waiting patiently at the bus stop.',
    answerKey: ['people', 'women', 'men', 'children'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Bangkok is ___ capital city of Thailand.',
    answerKey: ['the'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She is reading ___ interesting book about marine animals.',
    choices: ['a', 'an', 'the', 'no article'],
    answerKey: ['an'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'My uncle works as ___ pilot for an international airline.',
    choices: ['a', 'an', 'the', 'some'],
    answerKey: ['a'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'You must brush your ___ before going to bed.',
    choices: ['tooth', 'teeth', 'tooths', 'teethes'],
    answerKey: ['teeth'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Can you see ___ bright moon shining in the night sky?',
    choices: ['a', 'an', 'the', 'any'],
    answerKey: ['the'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'There are three sharp ___ on the wooden kitchen counter.',
    choices: ['knife', 'knifes', 'knives', 'knive'],
    answerKey: ['knives'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'We need to wait for ___ hour before the gates open.',
    choices: ['a', 'an', 'the', 'some'],
    answerKey: ['an'],
    tags: ['grammar:articles-nouns'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // ==========================================
  // TOPIC 3: THERE IS / THERE ARE & PREPOSITIONS OF PLACE (15 ข้อ)
  // Tag: grammar:there-is-are
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: มีหนังสือสองเล่มวางอยู่บนโต๊ะทำงาน',
    choices: ['There', 'are', 'two', 'books', 'on', 'the', 'desk', 'is', 'have', 'has'],
    answerKey: [
      'There are two books on the desk',
      'On the desk there are two books'
    ],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: มีแมวนอนหลับอยู่ใต้เก้าอี้หนึ่งตัว',
    choices: ['There', 'is', 'a', 'cat', 'sleeping', 'under', 'the', 'chair', 'are', 'have'],
    answerKey: [
      'There is a cat sleeping under the chair',
      'Under the chair there is a cat sleeping'
    ],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: มีนมเหลืออยู่ในตู้เย็นบ้างไหม',
    choices: ['Is', 'there', 'any', 'milk', 'left', 'in', 'the', 'fridge', 'Are', 'have', 'has'],
    answerKey: [
      'Is there any milk left in the fridge'
    ],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: วันนี้ไม่มีรถยนต์บนถนนมากนัก',
    choices: ['There', "aren't", 'many', 'cars', 'on', 'the', 'road', 'today', "isn't", 'have'],
    answerKey: [
      "There aren't many cars on the road today",
      "Today there aren't many cars on the road"
    ],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ is a blue pen next to my notebook.',
    answerKey: ['There'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'There ___ thirty students sitting in this classroom.',
    answerKey: ['are'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ there any cold water in the bottle?',
    answerKey: ['Is'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'The frightened puppy is hiding ___ the bed.',
    answerKey: ['under', 'behind'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'There ___ not any chairs left in this empty meeting room.',
    answerKey: ['are'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ three ripe mangoes on the kitchen table.',
    choices: ['There is', 'There are', 'Have', 'Has'],
    answerKey: ['There are'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ a modern science laboratory in your school?',
    choices: ['Is there', 'Are there', 'Has there', 'There is'],
    answerKey: ['Is there'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'The cat likes to sleep peacefully ___ the shade of the big tree.',
    choices: ['under', 'between', 'on', 'into'],
    answerKey: ['under'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Be careful! ___ some spilled water on the slippery floor.',
    choices: ['There is', 'There are', 'Have', 'They are'],
    answerKey: ['There is'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'The quiet bookstore is located ___ the bank and the coffee shop.',
    choices: ['between', 'under', 'among', 'behind'],
    answerKey: ['between'],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'There ___ any tall trees in front of our modern apartment building.',
    choices: ["aren't", "isn't", "hasn't", "not have"],
    answerKey: ["aren't"],
    tags: ['grammar:there-is-are'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // ==========================================
  // TOPIC 4: WH- QUESTIONS & INVERSION (15 ข้อ)
  // Tag: grammar:wh-questions-inversion
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณอาศัยอยู่กับครอบครัวที่ไหน',
    choices: ['Where', 'do', 'you', 'live', 'with', 'your', 'family', 'does', 'are', 'living'],
    answerKey: [
      'Where do you live with your family'
    ],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ภาพยนตร์เริ่มฉายคืนนี้กี่โมง',
    choices: ['What', 'time', 'does', 'the', 'movie', 'start', 'tonight', 'do', 'is', 'starts'],
    answerKey: [
      'What time does the movie start tonight'
    ],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ทำไมวันนี้คุณถึงมาโรงเรียนสาย',
    choices: ['Why', 'are', 'you', 'late', 'for', 'school', 'today', 'do', 'is', 'being'],
    answerKey: [
      'Why are you late for school today'
    ],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: พวกเขาซ้อมฟุตบอลบ่อยแค่ไหน',
    choices: ['How', 'often', 'do', 'they', 'practice', 'football', 'does', 'are', 'practicing'],
    answerKey: [
      'How often do they practice football'
    ],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ does your father travel to work? - By subway train.',
    answerKey: ['How'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Where ___ your older brother study computer science?',
    answerKey: ['does'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ is your favorite English teacher? - Teacher Pik.',
    answerKey: ['Who'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Why ___ they so excited about the school trip today?',
    answerKey: ['are'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'When ___ the morning train leave the central station?',
    answerKey: ['does'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ do you usually do in your free time on weekends?',
    choices: ['What', 'Who', 'Where', 'Why'],
    answerKey: ['What'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Where ___ your cousin work during the summer?',
    choices: ['does', 'do', 'is', 'are'],
    answerKey: ['does'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ is that cheerful girl standing by the door? - That is Lisa.',
    choices: ['Who', 'What', 'When', 'Where'],
    answerKey: ['Who'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Why ___ the children laughing so loud in the classroom?',
    choices: ['are', 'is', 'do', 'does'],
    answerKey: ['are'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ old is your youngest puppy?',
    choices: ['How', 'What', 'Where', 'Who'],
    answerKey: ['How'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'When ___ the local library close on Saturdays?',
    choices: ['does', 'do', 'is', 'are'],
    answerKey: ['does'],
    tags: ['grammar:wh-questions-inversion'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // ==========================================
  // TOPIC 5: ADJECTIVES, THIS/THAT & 'S (15 ข้อ)
  // Tag: grammar:adjectives-possessive-s
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: นี่คือรถจักรยานคันใหม่ของพี่ชายฉัน',
    choices: ['This', 'is', 'my', "brother's", 'new', 'bicycle', 'brother', 'a', 'are', 'that'],
    answerKey: [
      "This is my brother's new bicycle"
    ],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เธอมีสุนัขสีน้ำตาลที่เป็นมิตรตัวหนึ่ง',
    choices: ['She', 'has', 'a', 'friendly', 'brown', 'dog', 'have', "dog's", 'the', 'an'],
    answerKey: [
      'She has a friendly brown dog'
    ],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: รองเท้าเหล่านั้นใต้โต๊ะราคาแพงมาก',
    choices: ['Those', 'shoes', 'under', 'the', 'table', 'are', 'very', 'expensive', 'That', 'is', 'shoe'],
    answerKey: [
      'Those shoes under the table are very expensive'
    ],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: โต๊ะของคุณครูอยู่ใกล้กับหน้าต่าง',
    choices: ['The', "teacher's", 'desk', 'is', 'near', 'the', 'window', 'teacher', 'are', 'a'],
    answerKey: [
      "The teacher's desk is near the window"
    ],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Look at ___ shiny red sports car parked across the street!',
    answerKey: ['that'],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'These colorful building blocks belong to the children; they are the ___ toys.',
    answerKey: ["children's"],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'This is my mother___ favourite gardening hat.',
    answerKey: ["'s"],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'They live in a ___ wooden cottage surrounded by tall trees.',
    answerKey: ['small', 'beautiful', 'cosy', 'cozy', 'nice'],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Are ___ reading glasses in my hand yours?',
    answerKey: ['these'],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She bought a ___ dress for the graduation party.',
    choices: ['beautiful blue', 'blue beautiful', 'dress beautiful', 'beautiful of blue'],
    answerKey: ['beautiful blue'],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'This is ___ new smartphone lying on the sofa.',
    choices: ["Tom's", "Tom", "Toms'", "of Tom"],
    answerKey: ["Tom's"],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ fresh apples in this basket are sweet and juicy.',
    choices: ['These', 'This', 'That', 'There'],
    answerKey: ['These'],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Look at ___ small bird sitting at the very top of that tall pine tree!',
    choices: ['that', 'this', 'these', 'those'],
    answerKey: ['that'],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'My ___ bedroom is always tidy and nicely decorated.',
    choices: ["sister's", "sister", "sisters", "of sister"],
    answerKey: ["sister's"],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'He lives in a ___ flat right in the city center.',
    choices: ['small modern', 'modern small', 'flat small', 'flat modern'],
    answerKey: ['small modern'],
    tags: ['grammar:adjectives-possessive-s'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // ==========================================
  // TOPIC 6: PREPOSITIONS OF TIME & FREQUENCY (15 ข้อ)
  // Tag: grammar:prepositions-time-frequency
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันตื่นนอนแต่เช้าเสมอในเช้าวันจันทร์',
    choices: ['I', 'always', 'wake', 'up', 'early', 'on', 'Monday', 'morning', 'at', 'in'],
    answerKey: [
      'I always wake up early on Monday morning',
      'On Monday morning I always wake up early'
    ],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: รถไฟออกเดินทางเวลาหกโมงตรงในตอนเย็น',
    choices: ['The', 'train', 'leaves', 'at', 'six', "o'clock", 'in', 'the', 'evening', 'on', 'to'],
    answerKey: [
      "The train leaves at six o'clock in the evening"
    ],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เธอชอบดื่มชาเขียวเป็นประจำหลังมื้อกลางวัน',
    choices: ['She', 'usually', 'drinks', 'green', 'tea', 'after', 'lunch', 'drink', 'is', 'on'],
    answerKey: [
      'She usually drinks green tea after lunch',
      'After lunch she usually drinks green tea'
    ],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: พวกเขาไม่เคยไปโรงภาพยนตร์ในวันธรรมดาเลย',
    choices: ['They', 'never', 'go', 'to', 'the', 'cinema', 'on', 'weekdays', 'goes', 'at', 'in'],
    answerKey: [
      'They never go to the cinema on weekdays',
      'On weekdays they never go to the cinema'
    ],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'The evening concert starts promptly ___ 8:00 PM.',
    answerKey: ['at'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Her birthday celebration is ___ May 15th.',
    answerKey: ['on'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'The weather in Thailand is extremely hot ___ April.',
    answerKey: ['in'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'My father ___ drinks sweet soda because he cares about his health (0% frequency).',
    answerKey: ['never'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'We have English grammar class ___ Tuesdays and Thursdays.',
    answerKey: ['on'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'We usually gather to have lunch ___ noon.',
    choices: ['at', 'on', 'in', 'to'],
    answerKey: ['at'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'The new school term begins ___ July every year.',
    choices: ['in', 'at', 'on', 'by'],
    answerKey: ['in'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'The twins were born ___ a sunny Friday morning.',
    choices: ['on', 'at', 'in', 'of'],
    answerKey: ['on'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She ___ eats fast food; she strictly eats home-cooked organic meals.',
    choices: ['never', 'always', 'often', 'usually'],
    answerKey: ['never'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'David is ___ on time for meetings; he is never late.',
    choices: ['always', 'seldom', 'never', 'rarely'],
    answerKey: ['always'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Many families travel to the north of Thailand ___ winter.',
    choices: ['in', 'at', 'on', 'to'],
    answerKey: ['in'],
    tags: ['grammar:prepositions-time-frequency'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // ==========================================
  // TOPIC 7: PRESENT CONTINUOUS (15 ข้อ)
  // Tag: grammar:present-continuous
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ดูสิ เด็กๆ กำลังเล่นอยู่ในสวนสาธารณะ',
    choices: ['Look', 'the', 'children', 'are', 'playing', 'in', 'the', 'park', 'is', 'play'],
    answerKey: [
      'Look the children are playing in the park',
      'The children are playing in the park look'
    ],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: น้องชายของฉันกำลังทำการบ้านอยู่ตอนนี้',
    choices: ['My', 'brother', 'is', 'doing', 'his', 'homework', 'right', 'now', 'are', 'does'],
    answerKey: [
      'My brother is doing his homework right now',
      'Right now my brother is doing his homework'
    ],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณกำลังดูอะไรในโทรทัศน์คืนนี้',
    choices: ['What', 'are', 'you', 'watching', 'on', 'television', 'tonight', 'do', 'watch', 'is'],
    answerKey: [
      'What are you watching on television tonight'
    ],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ในขณะนี้เธอไม่ได้ฟังเพลงอยู่',
    choices: ['She', 'is', 'not', 'listening', 'to', 'music', 'at', 'the', 'moment', 'does', 'are'],
    answerKey: [
      'She is not listening to music at the moment',
      'At the moment she is not listening to music'
    ],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Listen! The little birds ___ singing sweetly outside the window.',
    answerKey: ['are'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'He is ___ for his lost car keys under the living room sofa.',
    answerKey: ['looking', 'searching'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Please speak quietly! The little baby is ___ in the next room.',
    answerKey: ['sleeping'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Why ___ you wearing a thick winter coat on such a warm day?',
    answerKey: ['are'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'We are ___ dinner together as a family right now.',
    answerKey: ['eating', 'having', 'cooking'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Look! It ___ heavily outside right now.',
    choices: ['is raining', 'rains', 'raining', 'is rain'],
    answerKey: ['is raining'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'The students ___ their group presentation at this moment.',
    choices: ['are preparing', 'is preparing', 'prepares', 'prepare'],
    answerKey: ['are preparing'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Where is Tony? - He ___ a hot shower in the bathroom.',
    choices: ['is taking', 'takes', 'taking', 'take'],
    answerKey: ['is taking'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'I ___ my messy room at the moment so I cannot go out.',
    choices: ['am cleaning', 'clean', 'cleaning', 'is cleaning'],
    answerKey: ['am cleaning'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Why ___ she crying all alone in the hallway?',
    choices: ['is', 'does', 'are', 'do'],
    answerKey: ['is'],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'They ___ sleeping; they are quietly reading comic books in bed.',
    choices: ["aren't", "don't", "isn't", "not"],
    answerKey: ["aren't"],
    tags: ['grammar:present-continuous'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // ==========================================
  // TOPIC 8: CAN / CAN'T (15 ข้อ)
  // Tag: grammar:can-cant
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เขาสามารถพูดภาษาต่างประเทศได้สามภาษาอย่างคล่องแคล่ว',
    choices: ['He', 'can', 'speak', 'three', 'foreign', 'languages', 'fluently', 'speaks', 'to', 'is'],
    answerKey: [
      'He can speak three foreign languages fluently'
    ],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ฉันขอยืมหนังสือเรียนภาษาอังกฤษของคุณได้ไหม',
    choices: ['Can', 'I', 'borrow', 'your', 'English', 'textbook', 'please', 'to', 'am', 'borrows'],
    answerKey: [
      'Can I borrow your English textbook please',
      'Can I please borrow your English textbook'
    ],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เธอว่ายน้ำข้ามแม่น้ำที่ลึกไม่ได้',
    choices: ['She', 'cannot', 'swim', 'across', 'the', 'deep', 'river', 'swims', 'to', 'is'],
    answerKey: [
      'She cannot swim across the deep river'
    ],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: คุณจอดรถหน้าประตูบ้านไม่ได้นะ',
    choices: ['You', 'cannot', 'park', 'your', 'car', 'in', 'front', 'of', 'the', 'gate', 'parks', 'to'],
    answerKey: [
      'You cannot park your car in front of the gate'
    ],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'He can ___ the acoustic guitar exceptionally well.',
    answerKey: ['play'],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Excuse me, ___ I open the classroom window, please?',
    answerKey: ['can', 'may'],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Goldfish can swim underwater, but they ___ fly in the open sky.',
    answerKey: ["can't", 'cannot'],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ you please help me carry this heavy box upstairs?',
    answerKey: ['Can', 'Could'],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'She is only two years old, so she cannot ___ yet.',
    answerKey: ['read', 'write', 'swim'],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'My older sister can ___ authentic Thai food.',
    choices: ['cook', 'cooks', 'cooking', 'to cook'],
    answerKey: ['cook'],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'I am so sorry, but I ___ join your birthday party tomorrow.',
    choices: ["can't", "don't can", "am not", "not can"],
    answerKey: ["can't"],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ you speak Japanese? - Yes, I can speak a little.',
    choices: ['Can', 'Do', 'Are', 'Is'],
    answerKey: ['Can'],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Most birds can fly, but penguins and ostriches ___ fly.',
    choices: ["can't", "don't", "aren't", "cannot to"],
    answerKey: ["can't"],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Can Sarah ___ a bicycle safely on the road?',
    choices: ['ride', 'rides', 'riding', 'to ride'],
    answerKey: ['ride'],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Students ___ use smartphones during the formal examination.',
    choices: ["cannot", "are not", "do not can", "not must"],
    answerKey: ["cannot"],
    tags: ['grammar:can-cant'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // ==========================================
  // TOPIC 9: IMPERATIVES & POLITE REQUESTS (15 ข้อ)
  // Tag: grammar:imperatives
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: กรุณาปิดหน้าต่างก่อนออกจากห้อง',
    choices: ['Please', 'close', 'the', 'window', 'before', 'you', 'leave', 'the', 'room', 'closing', 'to'],
    answerKey: [
      'Please close the window before you leave the room',
      'Before you leave the room please close the window'
    ],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: อย่าสัมผัสเตาร้อนด้วยมือเปล่า',
    choices: ["Don't", 'touch', 'that', 'hot', 'stove', 'with', 'your', 'bare', 'hands', 'No', 'not', 'touching'],
    answerKey: [
      "Don't touch that hot stove with your bare hands"
    ],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: กรุณาปิดเสียงโทรศัพท์มือถือระหว่างชมภาพยนตร์',
    choices: ['Turn', 'off', 'your', 'mobile', 'phones', 'during', 'the', 'movie', 'Turning', 'to', 'you'],
    answerKey: [
      'Turn off your mobile phones during the movie'
    ],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: ล้างมือของคุณให้สะอาดก่อนรับประทานอาหารเย็น',
    choices: ['Wash', 'your', 'hands', 'thoroughly', 'before', 'eating', 'dinner', 'Washing', 'to', 'you'],
    answerKey: [
      'Wash your hands thoroughly before eating dinner',
      'Before eating dinner wash your hands thoroughly'
    ],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Please ___ quiet while patients are resting in the hospital ward.',
    answerKey: ['be'],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ forget to lock the front door when you go out.',
    answerKey: ["Don't", 'Do not'],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ the door, please; it is getting very chilly outside.',
    answerKey: ['Close', 'Shut'],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ run near the slippery swimming pool, children!',
    answerKey: ["Don't", 'Do not'],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ this cough syrup after meals three times a day.',
    answerKey: ['Take', 'Drink'],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ carefully to the flight attendant’s safety instructions.',
    choices: ['Listen', 'Listens', 'Listening', 'To listen'],
    answerKey: ['Listen'],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ take photos inside this art gallery; it is strictly prohibited.',
    choices: ["Don't", "No", "Not", "Doesn't"],
    answerKey: ["Don't"],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Please ___ your shoes before stepping onto the traditional wooden floor.',
    choices: ['take off', 'takes off', 'taking off', 'to take off'],
    answerKey: ['take off'],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ late for the final exam tomorrow morning!',
    choices: ["Don't be", "Not be", "No be", "Aren't"],
    answerKey: ["Don't be"],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Always ___ your seatbelt fastened while seated on the airplane.',
    choices: ['keep', 'keeps', 'keeping', 'to keep'],
    answerKey: ['keep'],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ enter this laboratory room without wearing protective goggles.',
    choices: ["Do not", "No", "Not", "Does not"],
    answerKey: ["Do not"],
    tags: ['grammar:imperatives'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // ==========================================
  // TOPIC 10: PAST SIMPLE OF 'BE' (WAS / WERE) (15 ข้อ)
  // Tag: grammar:past-simple-be
  // ==========================================
  // Sentence Builder (4 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เมื่อวานนี้ฉันอยู่ที่บ้านกับครอบครัว',
    choices: ['I', 'was', 'at', 'home', 'with', 'my', 'family', 'yesterday', 'were', 'am', 'is'],
    answerKey: [
      'I was at home with my family yesterday',
      'Yesterday I was at home with my family'
    ],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: พวกเขาเหนื่อยมากหลังจากการเดินทางอันยาวไกล',
    choices: ['They', 'were', 'very', 'tired', 'after', 'the', 'long', 'journey', 'was', 'are', 'been'],
    answerKey: [
      'They were very tired after the long journey',
      'After the long journey they were very tired'
    ],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: พี่ชายของคุณมีความสุขกับของขวัญวันเกิดไหม',
    choices: ['Was', 'your', 'brother', 'happy', 'with', 'his', 'birthday', 'gift', 'Were', 'Is', 'did'],
    answerKey: [
      'Was your brother happy with his birthday gift'
    ],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'sentence_builder',
    prompt: 'จงเรียงคำให้เป็นประโยค: เมื่อบ่ายวันศุกร์ที่แล้วพวกเราไม่ได้อยู่ที่โรงเรียน',
    choices: ['We', "weren't", 'at', 'school', 'last', 'Friday', 'afternoon', "wasn't", "aren't", "didn't"],
    answerKey: [
      "We weren't at school last Friday afternoon",
      "Last Friday afternoon we weren't at school"
    ],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // Fill in the Blank (5 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'I ___ feeling unwell yesterday, so I stayed in bed all day.',
    answerKey: ['was'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Where ___ you and your brother last Sunday afternoon?',
    answerKey: ['were'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'The weather ___ delightfully cool and pleasant yesterday.',
    answerKey: ['was'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: 'Our classmates ___ not present at the rehearsal last night.',
    answerKey: ['were'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'fill_blank',
    prompt: '___ she pleased with her examination score yesterday?',
    answerKey: ['Was'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },

  // MCQ (6 ข้อ)
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Yesterday afternoon, the wind ___ very strong and cold.',
    choices: ['was', 'were', 'is', 'did'],
    answerKey: ['was'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: true,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Where ___ you yesterday morning at nine o’clock?',
    choices: ['were', 'was', 'are', 'did'],
    answerKey: ['were'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'Tom and Jerry ___ cheerful to see their old teacher yesterday.',
    choices: ['were', 'was', 'is', 'are'],
    answerKey: ['were'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'She ___ at work yesterday because she caught a bad cold.',
    choices: ["wasn't", "weren't", "isn't", "didn't"],
    answerKey: ["wasn't"],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: '___ the students excited about the field trip yesterday?',
    choices: ['Were', 'Was', 'Did', 'Are'],
    answerKey: ['Were'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  },
  {
    skill: 'grammar',
    level: 'A1',
    type: 'mcq',
    prompt: 'I ___ late for my doctor appointment yesterday due to heavy rain.',
    choices: ['was', 'were', 'am', 'did'],
    answerKey: ['was'],
    tags: ['grammar:past-simple-be'],
    visibility: 'bank',
    isPreview: false,
    reviewStatus: 'published',
    assignedUids: [],
    source: 'Pik a Class Curriculum A1 Foundation'
  }
];

const stages = [
  {
    skill: 'grammar',
    level: 'A1',
    order: 1,
    title: 'Present Simple ภาค 1: ประธานและกริยา',
    tags: ['grammar:present-simple'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: true,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 2,
    title: 'Present Simple ภาค 2: ปฏิเสธและตั้งคำถาม',
    tags: ['grammar:present-simple'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 3,
    title: 'Articles & Nouns ภาค 1: a, an และคำนาม',
    tags: ['grammar:articles-nouns'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 4,
    title: 'Articles & Nouns ภาค 2: the และพหูพจน์',
    tags: ['grammar:articles-nouns'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 5,
    title: 'There is / There are ภาค 1: มีสิ่งของรอบตัว',
    tags: ['grammar:there-is-are'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 6,
    title: 'There is / There are ภาค 2: ตำแหน่งแห่งที่',
    tags: ['grammar:there-is-are'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 7,
    title: 'Wh- Questions ภาค 1: ถามหาข้อมูล',
    tags: ['grammar:wh-questions-inversion'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 8,
    title: 'Wh- Questions ภาค 2: สลับกริยาช่วย do/does',
    tags: ['grammar:wh-questions-inversion'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 9,
    title: "Adjectives & 's: คุณศัพท์และความเป็นเจ้าของ",
    tags: ['grammar:adjectives-possessive-s'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 10,
    title: '⚔️ มินิบอส Part 1: ประลองพื้นฐาน 5 บทแรก',
    tags: [
      'grammar:present-simple',
      'grammar:articles-nouns',
      'grammar:there-is-are',
      'grammar:wh-questions-inversion',
      'grammar:adjectives-possessive-s'
    ],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 11,
    title: 'Prepositions of Time ภาค 1: at, on, in บอกเวลา',
    tags: ['grammar:prepositions-time-frequency'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 12,
    title: 'Prepositions & Frequency ภาค 2: ความถี่ในชีวิตประจำวัน',
    tags: ['grammar:prepositions-time-frequency'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 13,
    title: 'Present Continuous ภาค 1: ตอนนี้กำลังทำ',
    tags: ['grammar:present-continuous'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 14,
    title: 'Present Continuous ภาค 2: คำถามและปฏิเสธ',
    tags: ['grammar:present-continuous'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 15,
    title: "can / can't ภาค 1: ความสามารถและทักษะ",
    tags: ['grammar:can-cant'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 16,
    title: "can / can't ภาค 2: ขอร้องและขออนุญาต",
    tags: ['grammar:can-cant'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 17,
    title: 'Imperatives: คำสั่ง ข้อห้าม และคำแนะนำ',
    tags: ['grammar:imperatives'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 18,
    title: "Past Simple of 'be' ภาค 1: was กับ were ในอดีต",
    tags: ['grammar:past-simple-be'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 19,
    title: "Past Simple of 'be' ภาค 2: ปฏิเสธและถามหาอดีต",
    tags: ['grammar:past-simple-be'],
    drawCount: 7,
    passThreshold: 0.7,
    isPreview: false,
    reviewStatus: 'published'
  },
  {
    skill: 'grammar',
    level: 'A1',
    order: 20,
    title: '👑 บอสใหญ่: ศึกผู้พิทักษ์ไวยากรณ์ A1 (Master of A1)',
    tags: [
      'grammar:present-simple',
      'grammar:articles-nouns',
      'grammar:there-is-are',
      'grammar:wh-questions-inversion',
      'grammar:adjectives-possessive-s',
      'grammar:prepositions-time-frequency',
      'grammar:present-continuous',
      'grammar:can-cant',
      'grammar:imperatives',
      'grammar:past-simple-be'
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
writeFileSync('docs/seeds/a1-foundation-exercises.json', JSON.stringify(seededExercises, null, 2), 'utf8');
writeFileSync('docs/seeds/a1-foundation-stages.json', JSON.stringify(seededStages, null, 2), 'utf8');
console.log(`Successfully generated ${seededExercises.length} A1 exercises and ${seededStages.length} A1 stages!`);
