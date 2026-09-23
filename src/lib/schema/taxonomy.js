export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

const GRAMMAR = {
  A1: [
    ['present-simple', 'Present Simple (be/do)'],
    ['articles-nouns', 'Articles (a/an/the) & คำนามเอกพจน์-พหูพจน์'],
    ['there-is-are', 'there is / there are & Prepositions of Place'],
    ['wh-questions-inversion', 'Wh- Questions & การกลับกริยาช่วย do/does/is/are'],
    ['adjectives-possessive-s', "คำคุณศัพท์, this/that & แสดงความเป็นเจ้าของ ('s)"],
    ['prepositions-time-frequency', 'Prepositions of Time (at/on/in) & Adverbs of Frequency'],
    ['present-continuous', 'Present Continuous (เหตุการณ์กำลังดำเนินอยู่)'],
    ['can-cant', "can / can't (ความสามารถ & ขออนุญาต)"],
    ['imperatives', 'ประโยคคำสั่ง / ข้อห้าม / คำแนะนำ (Imperatives)'],
    ['past-simple-be', 'Past Simple ของ Verb to be (was / were)'],
    // Backward compatibility aliases
    ['plural-nouns', 'คำนามพหูพจน์'],
    ['possessive-s', "แสดงความเป็นเจ้าของ ('s)"],
  ],
  A2: [
    ['past-simple', 'Past Simple (Regular & Irregular Verbs)'],
    ['past-continuous', 'Past Continuous & Interrupted Past (when/while)'],
    ['present-perfect', 'Present Perfect (Life Experience: ever/never/yet)'],
    ['future-going-to-will', 'Future Forms (going to / will / Pres Cont for future)'],
    ['some-any-countable', 'Countable & Uncountable Nouns + Quantifiers'],
    ['comparatives-superlatives', 'Comparatives & Superlatives + Equality (as...as)'],
    ['modals-obligation', 'Modals of Obligation & Advice (must/have to/should)'],
    ['verb-patterns-basic', 'Basic Verb Patterns (Gerunds & Infinitives)'],
    ['conjunctions-basic', 'Basic Conjunctions (and, but, so, because, although)'],
    ['zero-first-conditional', 'Zero & First Conditionals (Real & Future Conditions)'],
  ],
  B1: [
    ['present-perfect-continuous', 'Present Perfect Continuous vs Simple'],
    ['past-perfect', 'Past Perfect Simple (Narrative Sequencing)'],
    ['used-to-habits', "Past Habits ('used to' vs 'be used to' vs 'เคย')"],
    ['passive-basic', 'Passive Voice (Core Tenses & Modals)'],
    ['conditional-2', 'Second Conditional (Unreal Present/Future & Wishes)'],
    ['modals-deduction', 'Modals of Deduction (must / might / could)'],
    ['relative-clauses-defining', 'Defining Relative Clauses (who, which, that, whose)'],
    ['reported-speech-statements', 'Reported Speech & Indirect Questions'],
    ['verb-patterns-meaning-change', 'Intermediate Verb Patterns (Meaning Changes)'],
    ['discourse-connectors', 'Discourse Connectors (Contrast, Purpose & Cause)'],
    // Backward compatibility aliases
    ['conditional-1', 'First Conditional'],
    ['future-continuous', 'Future Continuous'],
  ],
  B2: [
    ['participle-clauses', 'Participle Clauses & Reduced Relatives'],
    ['conditional-3-mixed', 'Third & Mixed Conditionals (Past Regrets)'],
    ['unreal-past-subjunctive', 'Unreal Past, Wishes & Subjunctive Mood'],
    ['modals-deduction-past', 'Past Modals of Deduction & Regret (should/must have + V3)'],
    ['passive-advanced-causative', 'Advanced Passive & Causatives (have/get done)'],
    ['relative-clauses-non-defining', 'Non-defining Relative Clauses & Prepositions'],
    ['future-advanced', 'Advanced Future Aspects (Future Continuous & Future Perfect)'],
    ['inversion-negative', 'Inversion for Emphasis (Negative Adverbials)'],
    ['cleft-sentences-focusing', 'Cleft Sentences & Focusing Structures'],
    ['academic-hedging', 'Advanced Discourse Markers & Academic Hedging'],
    // Backward compatibility aliases
    ['conditional-3', 'Third Conditional'],
    ['mixed-conditionals', 'Mixed Conditionals'],
    ['passive-advanced', 'Passive (ครบทุก tense)'],
    ['causative', 'causative (have / get something done)'],
    ['future-perfect', 'Future Perfect'],
    ['past-perfect-continuous', 'Past Perfect Continuous'],
    ['reported-speech-questions', 'Reported Speech (คำถาม/คำสั่ง)'],
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
    ['introductions-classroom', 'ทักทาย - แนะนำตัว - ในห้องเรียน'],
    ['countries-nationalities', 'ประเทศ - สัญชาติ'],
    ['family-people', 'ครอบครัว / คน'],
    ['food-drink', 'อาหาร - เครื่องดื่ม'],
    ['numbers-time', 'ตัวเลข - เวลา - วันที่'],
    ['school', 'โรงเรียน - ห้องเรียน'],
    ['home-objects', 'บ้าน - ของใช้'],
    ['clothes-colors', 'เสื้อผ้า - สี'],
    ['animals', 'สัตว์'],
    ['daily-routines', 'กิจวัตรประจำวัน'],
    ['places-in-town', 'สถานที่ในเมือง'],
    // 11 Core Vocab Bank Categories (available at A1 foundation level)
    ['travel-transport', 'การเดินทาง & คมนาคม'],
    ['health-body', 'สุขภาพ & ร่างกาย'],
    ['jobs-work', 'อาชีพ & การทำงาน'],
    ['hobbies-sports', 'งานอดิเรก & กีฬา'],
    ['tech-media', 'เทคโนโลยี & สื่อ'],
    ['nature-weather', 'ธรรมชาติ & ดินฟ้าอากาศ'],
    ['shopping-money', 'ซื้อของ & การเงิน'],
    ['feelings-personality', 'อารมณ์ & บุคลิก'],
    ['education-school', 'การศึกษา & โรงเรียน'],
    ['home-daily', 'บ้าน & กิจวัตรประจำวัน'],
  ],
  A2: [
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
