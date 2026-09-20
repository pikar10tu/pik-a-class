export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

const GRAMMAR = {
  A1: [
    ['present-simple', 'Present Simple (be/do)'],
    ['there-is-are', 'there is / there are'],
    ['present-continuous', 'Present Continuous (พื้นฐาน)'],
    ['can-cant', "can / can't"],
    ['imperatives', 'ประโยคคำสั่ง (imperatives)'],
    ['plural-nouns', 'คำนามพหูพจน์'],
    ['possessive-s', "แสดงความเป็นเจ้าของ ('s)"],
    ['past-simple-be', 'Past Simple (be + กริยาปกติพื้นฐาน)'],
  ],
  A2: [
    ['past-simple', 'Past Simple (regular + irregular)'],
    ['past-continuous', 'Past Continuous'],
    ['present-perfect', 'Present Perfect (ประสบการณ์)'],
    ['future-going-to-will', 'Future (going to / will)'],
    ['comparatives-superlatives', 'ขั้นกว่า / ขั้นสุด'],
    ['modals-obligation', 'must / have to / should'],
    ['some-any-countable', 'some / any + นับได้-นับไม่ได้'],
  ],
  B1: [
    ['present-perfect-continuous', 'Present Perfect Continuous'],
    ['past-perfect', 'Past Perfect'],
    ['future-continuous', 'Future Continuous'],
    ['conditional-1', 'First Conditional'],
    ['conditional-2', 'Second Conditional'],
    ['passive-basic', 'Passive Voice (พื้นฐาน)'],
    ['reported-speech-statements', 'Reported Speech (ประโยคบอกเล่า)'],
    ['modals-deduction', 'modals of deduction (must / might / could)'],
    ['relative-clauses-defining', 'relative clauses (defining)'],
  ],
  B2: [
    ['past-perfect-continuous', 'Past Perfect Continuous'],
    ['future-perfect', 'Future Perfect'],
    ['conditional-3', 'Third Conditional'],
    ['mixed-conditionals', 'Mixed Conditionals'],
    ['passive-advanced', 'Passive (ครบทุก tense)'],
    ['reported-speech-questions', 'Reported Speech (คำถาม/คำสั่ง)'],
    ['relative-clauses-non-defining', 'relative clauses (non-defining)'],
    ['causative', 'causative (have / get something done)'],
  ],
  C1: [
    ['advanced-conditionals-inversion', 'conditionals ขั้นสูง / inversion'],
    ['subjunctive', 'subjunctive'],
    ['advanced-passive-reporting', 'passive / reporting ขั้นสูง'],
    ['cleft-sentences', 'cleft sentences'],
    ['discourse-markers', 'discourse markers ขั้นสูง'],
    ['nuanced-modals', 'modal ที่มีนัยละเอียด'],
  ],
};

const VOCAB = {
  A1: [
    ['family-people', 'ครอบครัว / คน'],
    ['food-drink', 'อาหาร - เครื่องดื่ม'],
    ['numbers-time', 'ตัวเลข - เวลา - วันที่'],
    ['school', 'โรงเรียน - ห้องเรียน'],
    ['home-objects', 'บ้าน - ของใช้'],
    ['clothes-colors', 'เสื้อผ้า - สี'],
    ['animals', 'สัตว์'],
    ['daily-routines', 'กิจวัตรประจำวัน'],
    ['places-in-town', 'สถานที่ในเมือง'],
  ],
  A2: [
    ['shopping-money', 'ซื้อของ - เงิน'],
    ['travel-transport', 'เดินทาง - ขนส่ง'],
    ['health-body', 'สุขภาพ - ร่างกาย'],
    ['hobbies', 'งานอดิเรก - เวลาว่าง'],
    ['jobs-basic', 'อาชีพพื้นฐาน'],
    ['festivals-holidays', 'เทศกาล - วันหยุด'],
    ['directions', 'บอกทาง'],
    ['feelings-basic', 'อารมณ์พื้นฐาน'],
    ['appearance-personality', 'ลักษณะคน - หน้าตา - นิสัย'],
    ['weather-seasons', 'ดินฟ้าอากาศ - ฤดูกาล'],
  ],
  B1: [
    ['work-careers', 'การงาน - อาชีพ'],
    ['education', 'การศึกษา'],
    ['technology-internet', 'เทคโนโลยี - อินเทอร์เน็ต'],
    ['environment-nature', 'สิ่งแวดล้อม - ธรรมชาติ'],
    ['media-entertainment', 'สื่อ - บันเทิง'],
    ['relationships', 'ความสัมพันธ์'],
    ['sports-fitness', 'กีฬา - การออกกำลังกาย'],
    ['money-banking', 'การเงิน - ธนาคาร'],
    ['city-countryside', 'ชีวิตเมือง - ชนบท'],
    ['travel-experiences', 'ประสบการณ์การเดินทาง'],
  ],
  B2: [
    ['business-economy', 'ธุรกิจ - เศรษฐกิจ'],
    ['science-research', 'วิทยาศาสตร์ - งานวิจัย'],
    ['society-culture', 'สังคม - วัฒนธรรม'],
    ['news-politics', 'ข่าว - การเมืองพื้นฐาน'],
    ['art-literature', 'ศิลปะ - วรรณกรรม'],
    ['global-issues', 'ประเด็นระดับโลก'],
    ['psychology-emotions', 'จิตวิทยา - อารมณ์เชิงลึก'],
    ['job-applications', 'สมัครงาน - ทักษะการทำงาน'],
    ['advertising-consumerism', 'โฆษณา - การบริโภค'],
    ['law-crime-basic', 'กฎหมาย - อาชญากรรมพื้นฐาน'],
  ],
  C1: [
    ['academic-language', 'ภาษาวิชาการ'],
    ['idioms-collocations', 'สำนวน - collocation ขั้นสูง'],
    ['register-formality', 'ทะเบียนภาษาทางการ / ไม่ทางการ'],
    ['negotiation', 'การเจรจาต่อรอง'],
    ['data-statistics-language', 'ภาษาเชิงข้อมูล - สถิติ'],
    ['ethics-philosophy', 'จริยธรรม - ปรัชญา'],
    ['media-analysis', 'การวิเคราะห์สื่อ - อคติ'],
    ['figurative-language', 'ภาษาเชิงเปรียบเทียบ - อุปมา'],
  ],
};

function buildTags(skill, byLevel) {
  return Object.entries(byLevel).flatMap(([level, entries]) =>
    entries.map(([slug, label]) => ({ id: `${skill}:${slug}`, label, level })),
  );
}

export const TAGS = [...buildTags('grammar', GRAMMAR), ...buildTags('vocab', VOCAB)];

const TAGS_BY_ID = new Map(TAGS.map((tag) => [tag.id, tag]));

export function getTag(id) {
  return TAGS_BY_ID.get(id);
}

export function levelRank(level) {
  return LEVELS.indexOf(level);
}

export function checkTagsForLevel(tags, level) {
  const errors = [];
  for (const id of tags) {
    const tag = getTag(id);
    if (!tag) {
      errors.push(`tag "${id}" ไม่มีอยู่ใน taxonomy`);
      continue;
    }
    if (levelRank(tag.level) > levelRank(level)) {
      errors.push(`tag "${id}" เป็นของเลเวล ${tag.level} ซึ่งสูงกว่าเลเวลของข้อนี้ (${level})`);
    }
  }
  return errors;
}
