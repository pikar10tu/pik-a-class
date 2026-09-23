import { readFileSync, writeFileSync } from 'node:fs';
import { contentHash } from '../src/lib/schema/content-checks.js';
import { validate } from '../src/lib/schema/validate.js';

// 1. Fix Sentence Builders by ensuring all required tokens exist in choices
export function fixSentenceBuilder(item) {
  if (item.type !== 'sentence_builder') return item;
  const answer = (item.answerKey ?? [])[0] ?? '';
  const answerTokens = answer.trim().split(/\s+/).map((w) => w.replace(/[.,!?;:]/g, ''));
  const currentChoices = [...(item.choices ?? [])];

  const choiceCounts = {};
  for (const c of currentChoices) {
    const k = c.toLowerCase().trim().replace(/[.,!?;:]/g, '');
    choiceCounts[k] = (choiceCounts[k] || 0) + 1;
  }

  const neededCounts = {};
  for (const w of answerTokens) {
    const k = w.toLowerCase();
    neededCounts[k] = (neededCounts[k] || 0) + 1;
  }

  for (const w of answerTokens) {
    const k = w.toLowerCase();
    const needed = neededCounts[k] || 0;
    const available = choiceCounts[k] || 0;
    if (available < needed) {
      const diff = needed - available;
      for (let i = 0; i < diff; i++) {
        currentChoices.push(w);
      }
      choiceCounts[k] = needed;
    }
  }

  return {
    ...item,
    choices: currentChoices,
  };
}

// 2. Curated MCQ choices for B2
export const B2_MCQ_UPGRADES = [
  { prompt: "___ (hear) the loud explosion, everyone ran out of the building into the street.", choices: ["Hearing", "Heard", "Having heard", "To hear"], answerKey: ["Hearing"] },
  { prompt: "The laptop ___ (damage) during the storm has now been completely repaired.", choices: ["damaged", "damaging", "was damaged", "to damage"], answerKey: ["damaged"] },
  { prompt: "___ (live) in Rome for ten years, Marco speaks Italian fluently.", choices: ["Having lived", "Lived", "To live", "Had lived"], answerKey: ["Having lived"] },
  { prompt: "The passengers ___ (wait) in the departure lounge were growing impatient.", choices: ["waiting", "waited", "to wait", "were waiting"], answerKey: ["waiting"] },
  { prompt: "___ (see) from the sky, the coral reef looks like a glittering jewel.", choices: ["Seen", "Seeing", "Having seen", "To see"], answerKey: ["Seen"] },
  { prompt: "Not ___ (want) to wake up his sick daughter, David walked on tiptoe.", choices: ["wanting", "wanted", "having wanted", "to want"], answerKey: ["wanting"] },
  { prompt: "If you had told me about the meeting, I ___ (attend) it without hesitation.", choices: ["would have attended", "would attend", "had attended", "will attend"], answerKey: ["would have attended"] },
  { prompt: "If she ___ (not forget) her passport, she wouldn't have missed her international flight.", choices: ["hadn't forgotten", "didn't forget", "doesn't forget", "wouldn't forget"], answerKey: ["hadn't forgotten"] },
  { prompt: "If he had taken his medicine yesterday, he ___ feel much healthier today.", choices: ["would", "would have", "had", "will"], answerKey: ["would"] },
  { prompt: "What would you have ___ (do) if you had been in my position?", choices: ["done", "do", "did", "doing"], answerKey: ["done"] },
  { prompt: "If we ___ (book) the flight tickets earlier, we could have saved a lot of money.", choices: ["had booked", "booked", "would book", "have booked"], answerKey: ["had booked"] },
  { prompt: "If I were fluent in German, I ___ have accepted the job in Berlin last year.", choices: ["would", "will", "had", "must"], answerKey: ["would"] },
  { prompt: "It's about time we ___ (go) home; it is well past midnight.", choices: ["went", "go", "gone", "have gone"], answerKey: ["went"] },
  { prompt: "The director insists that every employee ___ (be) punctual for the briefing.", choices: ["be", "is", "was", "are"], answerKey: ["be"] },
  { prompt: "I'd rather you ___ (not smoke) inside the conference room.", choices: ["didn't smoke", "don't smoke", "not smoke", "not to smoke"], answerKey: ["didn't smoke"] },
  { prompt: "It is essential that he ___ (submit) the scholarship application before Friday.", choices: ["submit", "submits", "submitted", "is submitting"], answerKey: ["submit"] },
  { prompt: "I wish I ___ (know) the truth before I signed that risky contract.", choices: ["had known", "knew", "know", "have known"], answerKey: ["had known"] },
  { prompt: "The court ordered that the prisoner ___ (release) immediately due to lack of evidence.", choices: ["be released", "is released", "was released", "releases"], answerKey: ["be released"] },
  { prompt: "The window was smashed. The mischievous boys must ___ (kick) the football through it.", choices: ["have kicked", "kick", "had kicked", "kicked"], answerKey: ["have kicked"] },
  { prompt: "You ___ have informed me you were coming; I would have prepared lunch!", choices: ["should", "must", "can", "will"], answerKey: ["should"] },
  { prompt: "He ___ have passed that difficult medical board exam; he didn't revise at all!", choices: ["can't", "must", "should", "might"], answerKey: ["can't"] },
  { prompt: "I am not positive where Diana went. She ___ have caught the express train.", choices: ["might", "must", "should", "can't"], answerKey: ["might"] },
  { prompt: "We ___ (not / buy) so many fresh groceries; more than half spoiled.", choices: ["shouldn't have bought", "mustn't have bought", "couldn't buy", "didn't buy"], answerKey: ["shouldn't have bought"] },
  { prompt: "Arthur looks overjoyed today. He must have ___ (receive) his dream job offer.", choices: ["received", "receive", "receiving", "been received"], answerKey: ["received"] },
  { prompt: "We need to ___ (have / get) our damaged roof repaired before the torrential monsoon starts.", choices: ["have", "make", "let", "do"], answerKey: ["have"] },
  { prompt: "The instructor had the students ___ (write) a 500-word essay in silence.", choices: ["write", "to write", "writing", "written"], answerKey: ["write"] },
  { prompt: "I managed to get the technician ___ (install) the security patch on my device.", choices: ["to install", "install", "installed", "installing"], answerKey: ["to install"] },
  { prompt: "It is commonly ___ (say) that daily meditation enhances cognitive clarity.", choices: ["said", "saying", "say", "to say"], answerKey: ["said"] },
  { prompt: "The billionaire is rumored to ___ (own) multiple private islands in the Caribbean.", choices: ["own", "owns", "owned", "owning"], answerKey: ["own"] },
  { prompt: "I must have my passport ___ (renew) before traveling abroad next autumn.", choices: ["renewed", "renew", "renewing", "to renew"], answerKey: ["renewed"] },
  { prompt: "Mount Everest, ___ is the highest peak above sea level, attracts veteran mountaineers.", choices: ["which", "that", "where", "whose"], answerKey: ["which"] },
  { prompt: "My mentor, ___ daughter is a renowned concert violinist, invited us to the recital.", choices: ["whose", "who", "whom", "which"], answerKey: ["whose"] },
  { prompt: "The research project ___ which we dedicated two years has finally yielded breakthroughs.", choices: ["to", "on", "in", "at"], answerKey: ["to"] },
  { prompt: "He arrived late and unprepared for the interview, ___ irritated the hiring manager.", choices: ["which", "that", "what", "where"], answerKey: ["which"] },
  { prompt: "The scientist, ___ groundbreaking discovery won the Nobel Prize, presented a keynote.", choices: ["whose", "who", "whom", "that"], answerKey: ["whose"] },
  { prompt: "The scholar to ___ the honor was presented expressed heartfelt gratitude.", choices: ["whom", "who", "which", "whose"], answerKey: ["whom"] },
  { prompt: "By 2030, engineers will ___ (develop) commercial electric aircraft.", choices: ["have developed", "be developing", "develop", "developed"], answerKey: ["have developed"] },
  { prompt: "This time next month, we will be ___ (relax) on the sunlit beaches of Bali.", choices: ["relaxing", "relaxed", "relax", "have relaxed"], answerKey: ["relaxing"] },
  { prompt: "By the time you wake up tomorrow, the courier will ___ (deliver) the package.", choices: ["have delivered", "deliver", "be delivering", "delivered"], answerKey: ["have delivered"] },
  { prompt: "Will you be ___ (use) the projector this afternoon, or may I reserve it?", choices: ["using", "used", "use", "have used"], answerKey: ["using"] },
  { prompt: "By next spring, Arthur will have ___ (work) at this institute for twenty years.", choices: ["worked", "work", "working", "be working"], answerKey: ["worked"] },
  { prompt: "Don't visit their headquarters at 3 PM; the committee will be ___ (conduct) an audit.", choices: ["conducting", "conducted", "conduct", "have conducted"], answerKey: ["conducting"] },
  { prompt: "Seldom ___ (have / do) they seen such astonishing bravery under pressure.", choices: ["have", "do", "did", "are"], answerKey: ["have"] },
  { prompt: "No sooner had she entered the cabin ___ the blizzard broke out.", choices: ["than", "when", "then", "that"], answerKey: ["than"] },
  { prompt: "Hardly had the keynote begun ___ the auditorium lights went out.", choices: ["when", "than", "then", "while"], answerKey: ["when"] },
  { prompt: "Under no circumstances ___ you share this confidential key with unauthorized personnel.", choices: ["should", "you should", "will", "you will"], answerKey: ["should"] },
  { prompt: "Little ___ he know about the surprise celebration his peers had orchestrated.", choices: ["did", "does", "had", "was"], answerKey: ["did"] },
  { prompt: "Not until yesterday ___ she realize that her boarding pass had fallen.", choices: ["did", "does", "had", "has"], answerKey: ["did"] },
  { prompt: "It was John ___ brought the mouthwatering homemade pastries.", choices: ["who", "which", "whose", "whom"], answerKey: ["who"] },
  { prompt: "What astonished everyone ___ her sudden resignation.", choices: ["was", "were", "are", "being"], answerKey: ["was"] },
  { prompt: "All I am asking ___ is an honest evaluation of my performance.", choices: ["for", "to", "with", "about"], answerKey: ["for"] },
  { prompt: "It was not until yesterday evening ___ the committee disclosed the findings.", choices: ["that", "when", "which", "where"], answerKey: ["that"] },
  { prompt: "What you need most right now ___ forty-eight hours of genuine rest.", choices: ["is", "are", "were", "being"], answerKey: ["is"] },
  { prompt: "The primary reason ___ he stepped down was health concerns.", choices: ["why", "which", "where", "how"], answerKey: ["why"] },
  { prompt: "The newly proposed model appears ___ (be) viable according to the pilot study.", choices: ["to be", "being", "been", "be"], answerKey: ["to be"] },
  { prompt: "He is naturally reserved, ___ his twin brother is remarkably extroverted.", choices: ["whereas", "despite", "although", "because"], answerKey: ["whereas"] },
  { prompt: "The clinical trial faced regulatory hurdles; ___, the researchers persevered.", choices: ["nevertheless", "furthermore", "consequently", "otherwise"], answerKey: ["nevertheless"] },
  { prompt: "Experienced investors ___ to exercise prudence during volatile market cycles.", choices: ["tend", "tends", "tending", "tended"], answerKey: ["tend"] },
  { prompt: "It is commonly ___ (believe) that regular aerobic activity sharpens mental focus.", choices: ["believed", "believing", "believe", "to believe"], answerKey: ["believed"] },
  { prompt: "Preliminary evidence seems to ___ (suggest) that the fiscal reform has succeeded.", choices: ["suggest", "suggests", "suggesting", "suggested"], answerKey: ["suggest"] }
];

// 3. Curated MCQ choices for B1
export const B1_MCQ_UPGRADES = [
  { prompt: "Sarah looks tired because she has been ___ (run) in the park for an hour.", choices: ["running", "ran", "run", "to run"], answerKey: ["running"] },
  { prompt: "How long ___ you been learning to play the piano?", choices: ["have", "has", "had", "are"], answerKey: ["have"] },
  { prompt: "He has ___ living in this apartment since last December.", choices: ["been", "being", "be", "was"], answerKey: ["been"] },
  { prompt: "We have been waiting for the bus ___ forty minutes.", choices: ["for", "since", "during", "in"], answerKey: ["for"] },
  { prompt: "It has been snowing heavily ___ yesterday afternoon.", choices: ["since", "for", "from", "at"], answerKey: ["since"] },
  { prompt: "My eyes hurt because I have been ___ (read) on my tablet all evening.", choices: ["reading", "read", "reads", "to read"], answerKey: ["reading"] },
  { prompt: "After Tom ___ (eat) his breakfast, he went to work.", choices: ["had eaten", "eats", "has eaten", "was eating"], answerKey: ["had eaten"] },
  { prompt: "The teacher was angry because Alex ___ not done his homework.", choices: ["had", "has", "did", "was"], answerKey: ["had"] },
  { prompt: "By the time the police arrived, the thief had already ___ (escape).", choices: ["escaped", "escape", "escapes", "escaping"], answerKey: ["escaped"] },
  { prompt: "I couldn't enter the house because I had ___ (lose) my key.", choices: ["lost", "lose", "losing", "been lost"], answerKey: ["lost"] },
  { prompt: "She realized that she ___ forgotten her passport at home.", choices: ["had", "has", "was", "did"], answerKey: ["had"] },
  { prompt: "Before she moved to London, she had ___ (live) in Manchester for ten years.", choices: ["lived", "live", "living", "lives"], answerKey: ["lived"] },
  { prompt: "My grandfather ___ to walk five kilometers to school every day when he was a boy.", choices: ["used", "use", "uses", "using"], answerKey: ["used"] },
  { prompt: "Did they ___ to have long hair when they were at university?", choices: ["use", "used", "using", "uses"], answerKey: ["use"] },
  { prompt: "We didn't ___ to eat spicy food, but now we love som tam.", choices: ["use", "used", "using", "uses"], answerKey: ["use"] },
  { prompt: "Living in London is noisy, but I am getting used to ___ (hear) the sirens.", choices: ["hearing", "hear", "heard", "to hear"], answerKey: ["hearing"] },
  { prompt: "He is a professional chef, so he is used to ___ (cook) for hundreds of guests.", choices: ["cooking", "cook", "cooked", "to cook"], answerKey: ["cooking"] },
  { prompt: "There ___ to be a quiet park here before the mall was built.", choices: ["used", "use", "was used", "using"], answerKey: ["used"] },
  { prompt: "English is ___ (speak) in many countries around the world.", choices: ["spoken", "speak", "spoke", "speaking"], answerKey: ["spoken"] },
  { prompt: "The telephone was ___ (invent) by Alexander Graham Bell.", choices: ["invented", "invent", "invents", "inventing"], answerKey: ["invented"] },
  { prompt: "All smartphones must ___ turned off during the exam.", choices: ["be", "been", "being", "is"], answerKey: ["be"] },
  { prompt: "These sports cars are ___ (make) in Germany.", choices: ["made", "make", "makes", "making"], answerKey: ["made"] },
  { prompt: "The stolen bicycles were ___ (find) by the police yesterday.", choices: ["found", "find", "finds", "finding"], answerKey: ["found"] },
  { prompt: "A brand-new shopping mall will be ___ (open) next month.", choices: ["opened", "open", "opening", "opens"], answerKey: ["opened"] },
  { prompt: "If I had more free time, I ___ learn how to play the guitar.", choices: ["would", "will", "did", "have"], answerKey: ["would"] },
  { prompt: "If she ___ (know) the answer, she would tell us immediately.", choices: ["knew", "knows", "know", "has known"], answerKey: ["knew"] },
  { prompt: "If I ___ (be) you, I would take that great job offer.", choices: ["were", "am", "will be", "have been"], answerKey: ["were"] },
  { prompt: "They would travel more often if plane tickets ___ (be) cheaper.", choices: ["were", "are", "will be", "have been"], answerKey: ["were"] },
  { prompt: "What ___ you do if you found a lost dog in the street?", choices: ["would", "will", "did", "do"], answerKey: ["would"] },
  { prompt: "I live in a small room. I wish I ___ (have) a bigger room.", choices: ["had", "have", "has", "am having"], answerKey: ["had"] },
  { prompt: "He has won three international math awards. He ___ be a genius.", choices: ["must", "can't", "should", "will"], answerKey: ["must"] },
  { prompt: "You have been running for two straight hours! You ___ be exhausted.", choices: ["must", "can't", "might not", "won't"], answerKey: ["must"] },
  { prompt: "That woman speaks only Japanese; she ___ be from Spain.", choices: ["can't", "must", "should", "might"], answerKey: ["can't"] },
  { prompt: "I am not sure where Peter is right now. He ___ be in the library studying.", choices: ["might", "must", "can't", "will"], answerKey: ["might"] },
  { prompt: "It ___ be true! It's completely impossible!", choices: ["can't", "must", "might", "should"], answerKey: ["can't"] },
  { prompt: "Don't call him now. He might ___ sleeping after his night shift.", choices: ["be", "been", "being", "is"], answerKey: ["be"] },
  { prompt: "The woman ___ lives next door is an architect.", choices: ["who", "which", "whose", "where"], answerKey: ["who"] },
  { prompt: "I lost the watch ___ my father gave me for my birthday.", choices: ["which", "who", "whose", "where"], answerKey: ["which"] },
  { prompt: "Do you know anyone ___ speaks fluent German?", choices: ["who", "which", "where", "whose"], answerKey: ["who"] },
  { prompt: "A bakery is a shop ___ you can buy fresh bread and pastries.", choices: ["where", "which", "who", "whose"], answerKey: ["where"] },
  { prompt: "The boy ___ dog ran away was crying in the park.", choices: ["whose", "who", "which", "where"], answerKey: ["whose"] },
  { prompt: "The hotel ___ we stayed during our holiday had a lovely swimming pool.", choices: ["where", "which", "who", "whose"], answerKey: ["where"] },
  { prompt: "Direct: \"I want some water.\" -> Reported: He said that he ___ (want) some water.", choices: ["wanted", "wants", "want", "wanting"], answerKey: ["wanted"] },
  { prompt: "Direct: \"I can swim across the river.\" -> Reported: She said that she ___ swim across the river.", choices: ["could", "can", "may", "will"], answerKey: ["could"] },
  { prompt: "Direct: \"We will arrive soon.\" -> Reported: They told us that they ___ arrive soon.", choices: ["would", "will", "can", "shall"], answerKey: ["would"] },
  { prompt: "Do you know what time the supermarket ___ (close) on Sundays?", choices: ["closes", "close", "closed", "closing"], answerKey: ["closes"] },
  { prompt: "Could you tell me how much this backpack ___ (cost)?", choices: ["costs", "cost", "costed", "costing"], answerKey: ["costs"] },
  { prompt: "He ___ (said / told) me that he had already finished his assignment.", choices: ["told", "said", "spoke", "talked"], answerKey: ["told"] },
  { prompt: "Don't forget ___ (turn) off the air conditioner before leaving the classroom.", choices: ["to turn", "turning", "turned", "turn"], answerKey: ["to turn"] },
  { prompt: "I will never forget ___ (see) the Grand Canyon for the very first time.", choices: ["seeing", "to see", "seen", "saw"], answerKey: ["seeing"] },
  { prompt: "While driving home, Dad stopped ___ (buy) some fresh bread at the bakery.", choices: ["to buy", "buying", "bought", "buy"], answerKey: ["to buy"] },
  { prompt: "Please stop ___ (make) so much noise; the baby is sleeping.", choices: ["making", "to make", "made", "make"], answerKey: ["making"] },
  { prompt: "I tried ___ (open) the tight lid with a spoon, but it was still stuck.", choices: ["to open", "opening", "opened", "open"], answerKey: ["to open"] },
  { prompt: "If you have trouble falling asleep, try ___ (drink) a warm cup of milk.", choices: ["drinking", "to drink", "drank", "drunk"], answerKey: ["drinking"] },
  { prompt: "___ it was freezing cold outside, she refused to wear a jacket.", choices: ["Although", "Despite", "In spite of", "Because"], answerKey: ["Although"] },
  { prompt: "In ___ of the heavy traffic, we arrived at the airport on time.", choices: ["spite", "because", "order", "case"], answerKey: ["spite"] },
  { prompt: "He exercised every single day in ___ to stay healthy and fit.", choices: ["order", "case", "spite", "view"], answerKey: ["order"] },
  { prompt: "She studied diligently; as a ___, she received top marks in all her exams.", choices: ["result", "reason", "cause", "purpose"], answerKey: ["result"] },
  { prompt: "The outdoor concert was cancelled ___ of the severe thunderstorm.", choices: ["because", "due", "in spite", "instead"], answerKey: ["because"] },
  { prompt: "She saved money for two whole years ___ that she could buy a new laptop.", choices: ["so", "in order", "because", "as"], answerKey: ["so"] }
];

function processDataset(filePath, mcqUpgrades = []) {
  const items = JSON.parse(readFileSync(filePath, 'utf8'));
  const mcqMap = new Map();
  for (const up of mcqUpgrades) {
    mcqMap.set(up.prompt.trim().toLowerCase(), up);
  }

  let sbFixed = 0;
  let mcqConverted = 0;

  const upgraded = items.map((item) => {
    // 1. Fix Sentence Builders
    if (item.type === 'sentence_builder') {
      const fixed = fixSentenceBuilder(item);
      if (fixed.choices.length !== item.choices.length) {
        sbFixed++;
      }
      const hash = contentHash(fixed);
      return { ...fixed, contentHash: hash };
    }

    // 2. Convert Fill Blanks to MCQ
    const key = (item.prompt || '').trim().toLowerCase();
    if (item.type === 'fill_blank' && mcqMap.has(key)) {
      const up = mcqMap.get(key);
      const converted = {
        ...item,
        type: 'mcq',
        choices: up.choices,
        answerKey: up.answerKey,
      };
      mcqConverted++;
      const hash = contentHash(converted);
      return { ...converted, contentHash: hash };
    }

    const hash = contentHash(item);
    return { ...item, contentHash: hash };
  });

  // Validate all items
  const invalid = [];
  upgraded.forEach((item, index) => {
    const { errors } = validate('exercises', item, 'create');
    if (errors.length > 0) {
      invalid.push({ index, prompt: item.prompt, errors });
    }
  });

  if (invalid.length > 0) {
    console.error(`Validation failed on ${filePath}:`, invalid);
    throw new Error(`Validation failed for ${invalid.length} items`);
  }

  writeFileSync(filePath, JSON.stringify(upgraded, null, 2) + '\n');
  console.log(`Processed ${filePath}: Fixed ${sbFixed} sentence builders, converted ${mcqConverted} to MCQ. 100% Validated!`);
}

if (process.argv[1] && (process.argv[1].endsWith('audit-and-fix-seeds.mjs') || process.argv[1].endsWith('audit-and-fix-seeds'))) {
  // Process B2
  processDataset('docs/seeds/b2-full-exercises.json', B2_MCQ_UPGRADES);

  // Process B1
  processDataset('docs/seeds/b1-full-exercises.json', B1_MCQ_UPGRADES);

  // Process A2 seeds sentence builder fixes
  processDataset('docs/seeds/a2-full-exercises.json', []);
  processDataset('docs/seeds/a2-tenses-saga-exercises.json', []);
}
