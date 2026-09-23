// คลังคำศัพท์ภาษาอังกฤษในชีวิตประจำวัน (Everyday English Vocabulary Bank)
// ครอบคลุมระดับ CEFR A1 - B2 พร้อมคำแปล ชนิดของคำ ตัวอย่างประโยค และตัวเลือกหลอกสำหรับเกม

export const CATEGORIES = [
  { id: 'food-drink', label: 'อาหาร & เครื่องดื่ม', icon: '🍕' },
  { id: 'travel-transport', label: 'การเดินทาง & คมนาคม', icon: '✈️' },
  { id: 'health-body', label: 'สุขภาพ & ร่างกาย', icon: '🏥' },
  { id: 'jobs-work', label: 'อาชีพ & การทำงาน', icon: '💼' },
  { id: 'hobbies-sports', label: 'งานอดิเรก & กีฬา', icon: '🎨' },
  { id: 'tech-media', label: 'เทคโนโลยี & สื่อ', icon: '📱' },
  { id: 'nature-weather', label: 'ธรรมชาติ & ดินฟ้าอากาศ', icon: '🌦️' },
  { id: 'shopping-money', label: 'ซื้อของ & การเงิน', icon: '🛍️' },
  { id: 'feelings-personality', label: 'อารมณ์ & บุคลิก', icon: '😊' },
];

export const VOCAB_ITEMS = [
  // === A1: อาหาร & เครื่องดื่ม ===
  {
    id: 'v_a1_food_01',
    word: 'breakfast',
    pos: 'n.',
    level: 'A1',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'อาหารเช้า',
    alternatives: ['อาหารกลางวัน', 'อาหารเย็น', 'ของว่าง'],
    example: 'I usually eat eggs and toast for breakfast.',
    exampleThai: 'ฉันมักจะกินไข่และขนมปังปิ้งเป็นอาหารเช้า',
  },
  {
    id: 'v_a1_food_02',
    word: 'delicious',
    pos: 'adj.',
    level: 'A1',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'อร่อย',
    alternatives: ['เผ็ดร้อน', 'ขม', 'เค็ม'],
    example: 'This homemade soup is very delicious.',
    exampleThai: 'ซุปทำเองถ้วยนี้อร่อยมาก',
  },
  {
    id: 'v_a1_food_03',
    word: 'vegetable',
    pos: 'n.',
    level: 'A1',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'ผัก',
    alternatives: ['ผลไม้', 'เนื้อสัตว์', 'เครื่องเทศ'],
    example: 'Eating fresh vegetables is good for your health.',
    exampleThai: 'การกินผักสดดีต่อสุขภาพของคุณ',
  },
  {
    id: 'v_a1_food_04',
    word: 'thirsty',
    pos: 'adj.',
    level: 'A1',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'กระหายน้ำ, หิวน้ำ',
    alternatives: ['หิวข้าว', 'ง่วงนอน', 'อิ่ม'],
    example: 'After running in the sun, I was very thirsty.',
    exampleThai: 'หลังจากวิ่งกลางแดด ฉันรู้สึกหิวน้ำมาก',
  },

  // === A2: อาหาร & เครื่องดื่ม ===
  {
    id: 'v_a2_food_01',
    word: 'ingredient',
    pos: 'n.',
    level: 'A2',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'ส่วนผสม, วัตถุดิบ',
    alternatives: ['สูตรอาหาร', 'เครื่องปรุงรส', 'จานหลัก'],
    example: 'Fresh ingredients make a big difference in cooking.',
    exampleThai: 'วัตถุดิบที่สดใหม่สร้างความแตกต่างอย่างมากในการทำอาหาร',
  },
  {
    id: 'v_a2_food_02',
    word: 'recipe',
    pos: 'n.',
    level: 'A2',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'สูตรอาหาร, ตำรับอาหาร',
    alternatives: ['รายการสั่งซื้อ', 'ใบเสร็จ', 'สมุดบันทึก'],
    example: 'She followed her grandmother’s cake recipe.',
    exampleThai: 'เธอทำตามสูตรเค้กของคุณยาย',
  },
  {
    id: 'v_a2_food_03',
    word: 'dessert',
    pos: 'n.',
    level: 'A2',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'ของหวาน',
    alternatives: ['อาหารจานหลัก', 'อาหารเรียกน้ำย่อย', 'เครื่องดื่ม'],
    example: 'Would you like some ice cream for dessert?',
    exampleThai: 'คุณอยากรับไอศกรีมเป็นของหวานไหมครับ?',
  },

  // === B1: อาหาร & เครื่องดื่ม ===
  {
    id: 'v_b1_food_01',
    word: 'nutrition',
    pos: 'n.',
    level: 'B1',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'โภชนาการ, สารอาหาร',
    alternatives: ['สุขอนามัย', 'ระบบย่อยอาหาร', 'การควบคุมน้ำหนัก'],
    example: 'Good nutrition is essential for growing children.',
    exampleThai: 'โภชนาการที่ดีเป็นสิ่งสำคัญสำหรับเด็กที่กำลังเจริญเติบโต',
  },
  {
    id: 'v_b1_food_02',
    word: 'cuisine',
    pos: 'n.',
    level: 'B1',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'ประเภทอาหาร, อาหารประจำชาติ',
    alternatives: ['ห้องครัว', 'เชฟใหญ่', 'ร้านอาหารริมทาง'],
    example: 'Italian cuisine is famous around the world for its pasta.',
    exampleThai: 'อาหารอิตาเลียนมีชื่อเสียงไปทั่วโลกในเรื่องพาสต้า',
  },

  // === B2: อาหาร & เครื่องดื่ม ===
  {
    id: 'v_b2_food_01',
    word: 'delicacy',
    pos: 'n.',
    level: 'B2',
    category: 'food-drink',
    categoryLabel: 'อาหาร & เครื่องดื่ม',
    thai: 'อาหารเลิศรส, ของหายากราคาแพง',
    alternatives: ['อาหารจานด่วน', 'อาหารสำเร็จรูป', 'เครื่องปรุงพื้นฐาน'],
    example: 'Truffles are considered a luxury delicacy in France.',
    exampleThai: 'เห็ดทรัฟเฟิลถือเป็นอาหารเลิศรสสุดหรูหราในประเทศฝรั่งเศส',
  },

  // === A1: การเดินทาง & คมนาคม ===
  {
    id: 'v_a1_travel_01',
    word: 'airport',
    pos: 'n.',
    level: 'A1',
    category: 'travel-transport',
    categoryLabel: 'การเดินทาง & คมนาคม',
    thai: 'สนามบิน',
    alternatives: ['สถานีรถไฟ', 'ท่าเรือ', 'ป้ายรถเมล์'],
    example: 'We arrived at the airport two hours before our flight.',
    exampleThai: 'พวกเรามาถึงสนามบินสองชั่วโมงก่อนเวลาบิน',
  },
  {
    id: 'v_a1_travel_02',
    word: 'ticket',
    pos: 'n.',
    level: 'A1',
    category: 'travel-transport',
    categoryLabel: 'การเดินทาง & คมนาคม',
    thai: 'ตั๋ว, บัตรโดยสาร',
    alternatives: ['หนังสือเดินทาง', 'กระเป๋าเดินทาง', 'แผนที่'],
    example: 'Don’t forget to show your train ticket.',
    exampleThai: 'อย่าลืมแสดงตั๋วรถไฟของคุณนะ',
  },
  {
    id: 'v_a1_travel_03',
    word: 'luggage',
    pos: 'n.',
    level: 'A1',
    category: 'travel-transport',
    categoryLabel: 'การเดินทาง & คมนาคม',
    thai: 'สัมภาระ, กระเป๋าเดินทาง',
    alternatives: ['ของฝาก', 'เสื้อกันหนาว', 'เอกสาร'],
    example: 'He packed his luggage the night before the trip.',
    exampleThai: 'เขาจัดกระเป๋าสัมภาระในคืนก่อนออกเดินทาง',
  },

  // === A2: การเดินทาง & คมนาคม ===
  {
    id: 'v_a2_travel_01',
    word: 'departure',
    pos: 'n.',
    level: 'A2',
    category: 'travel-transport',
    categoryLabel: 'การเดินทาง & คมนาคม',
    thai: 'การออกเดินทาง, เที่ยวบินขาออก',
    alternatives: ['การมาถึง', 'การยกเลิก', 'การเปลี่ยนเครื่อง'],
    example: 'Please check the departure board for your gate number.',
    exampleThai: 'โปรดตรวจสอบกระดานเที่ยวบินขาออกเพื่อดูหมายเลขประตูขึ้นเครื่อง',
  },
  {
    id: 'v_a2_travel_02',
    word: 'passenger',
    pos: 'n.',
    level: 'A2',
    category: 'travel-transport',
    categoryLabel: 'การเดินทาง & คมนาคม',
    thai: 'ผู้โดยสาร',
    alternatives: ['คนขับรถ', 'พนักงานต้อนรับ', 'กัปตัน'],
    example: 'All passengers must fasten their seat belts.',
    exampleThai: 'ผู้โดยสารทุกคนต้องรัดเข็มขัดนิรภัย',
  },
  {
    id: 'v_a2_travel_03',
    word: 'journey',
    pos: 'n.',
    level: 'A2',
    category: 'travel-transport',
    categoryLabel: 'การเดินทาง & คมนาคม',
    thai: 'การเดินทาง, ระยะเวลาเดินทาง',
    alternatives: ['ปลายทาง', 'ที่พัก', 'การผจญภัย'],
    example: 'Have a safe journey home!',
    exampleThai: 'ขอให้เดินทางกลับบ้านอย่างปลอดภัยนะ!',
  },

  // === B1: การเดินทาง & คมนาคม ===
  {
    id: 'v_b1_travel_01',
    word: 'destination',
    pos: 'n.',
    level: 'B1',
    category: 'travel-transport',
    categoryLabel: 'การเดินทาง & คมนาคม',
    thai: 'จุดหมายปลายทาง',
    alternatives: ['จุดเริ่มต้น', 'เส้นทางสำรอง', 'ตารางเวลา'],
    example: 'Chiang Mai is a popular tourist destination in winter.',
    exampleThai: 'เชียงใหม่เป็นจุดหมายปลายทางยอดนิยมของนักท่องเที่ยวในฤดูหนาว',
  },
  {
    id: 'v_b1_travel_02',
    word: 'commute',
    pos: 'v.',
    level: 'B1',
    category: 'travel-transport',
    categoryLabel: 'การเดินทาง & คมนาคม',
    thai: 'เดินทางไป-กลับที่ทำงานหรือเรียน',
    alternatives: ['ย้ายที่อยู่', 'ท่องเที่ยวพักผ่อน', 'เดินทางไกลต่างแดน'],
    example: 'Many people commute to Bangkok by electric train every day.',
    exampleThai: 'ผู้คนจำนวนมากเดินทางไปทำงานในกรุงเทพฯ ด้วยรถไฟฟ้าทุกวัน',
  },

  // === B2: การเดินทาง & คมนาคม ===
  {
    id: 'v_b2_travel_01',
    word: 'itinerary',
    pos: 'n.',
    level: 'B2',
    category: 'travel-transport',
    categoryLabel: 'การเดินทาง & คมนาคม',
    thai: 'กำหนดการเดินทาง, แผนการท่องเที่ยว',
    alternatives: ['คู่มือท่องเที่ยว', 'วีซ่าเข้าเมือง', 'ประกันการเดินทาง'],
    example: 'Our travel agent provided a detailed seven-day itinerary.',
    exampleThai: 'ตัวแทนท่องเที่ยวได้จัดทำกำหนดการเดินทางอย่างละเอียดสำหรับ 7 วัน',
  },

  // === A1: สุขภาพ & ร่างกาย ===
  {
    id: 'v_a1_health_01',
    word: 'stomach',
    pos: 'n.',
    level: 'A1',
    category: 'health-body',
    categoryLabel: 'สุขภาพ & ร่างกาย',
    thai: 'กระเพาะอาหาร, ท้อง',
    alternatives: ['หน้าอก', 'แผ่นหลัง', 'ลำคอ'],
    example: 'My stomach hurts because I skipped lunch.',
    exampleThai: 'ฉันปวดท้องเพราะไม่ได้กินข้าวเที่ยง',
  },
  {
    id: 'v_a1_health_02',
    word: 'medicine',
    pos: 'n.',
    level: 'A1',
    category: 'health-body',
    categoryLabel: 'สุขภาพ & ร่างกาย',
    thai: 'ยา, เวชภัณฑ์',
    alternatives: ['วิตามิน', 'เครื่องสำอาง', 'ผ้าพันแผล'],
    example: 'Take this medicine twice a day after meals.',
    exampleThai: 'ทานยานี้วันละสองครั้งหลังอาหารนะครับ',
  },

  // === A2: สุขภาพ & ร่างกาย ===
  {
    id: 'v_a2_health_01',
    word: 'headache',
    pos: 'n.',
    level: 'A2',
    category: 'health-body',
    categoryLabel: 'สุขภาพ & ร่างกาย',
    thai: 'อาการปวดหัว',
    alternatives: ['อาการเจ็บคอ', 'อาการปวดฟัน', 'อาการเป็นไข้'],
    example: 'I have a terrible headache from staring at the screen all day.',
    exampleThai: 'ฉันปวดหัวมากเพราะจ้องหน้าจอมาทั้งวัน',
  },
  {
    id: 'v_a2_health_02',
    word: 'recover',
    pos: 'v.',
    level: 'A2',
    category: 'health-body',
    categoryLabel: 'สุขภาพ & ร่างกาย',
    thai: 'ฟื้นตัว, หายป่วย',
    alternatives: ['ทรุดหนักลง', 'ติดเชื้อ', 'เข้ารับการผ่าตัด'],
    example: 'It took him two weeks to recover from the flu.',
    exampleThai: 'เขาใช้เวลาสองสัปดาห์กว่าจะฟื้นตัวจากไข้หวัดใหญ่',
  },

  // === B1: สุขภาพ & ร่างกาย ===
  {
    id: 'v_b1_health_01',
    word: 'symptom',
    pos: 'n.',
    level: 'B1',
    category: 'health-body',
    categoryLabel: 'สุขภาพ & ร่างกาย',
    thai: 'อาการของโรค',
    alternatives: ['การรักษา', 'สาเหตุของโรค', 'การวินิจฉัย'],
    example: 'A high fever is a common symptom of infection.',
    exampleThai: 'ไข้สูงเป็นอาการทั่วไปของการติดเชื้อ',
  },
  {
    id: 'v_b1_health_02',
    word: 'prescription',
    pos: 'n.',
    level: 'B1',
    category: 'health-body',
    categoryLabel: 'สุขภาพ & ร่างกาย',
    thai: 'ใบสั่งยา',
    alternatives: ['ใบรับรองแพทย์', 'ประวัติคนไข้', 'ใบเสร็จค่ารักษา'],
    example: 'You need a doctor’s prescription to buy this antibiotic.',
    exampleThai: 'คุณต้องใช้ใบสั่งยาจากแพทย์เพื่อซื้อยาปฏิชีวนะตัวนี้',
  },

  // === B2: สุขภาพ & ร่างกาย ===
  {
    id: 'v_b2_health_01',
    word: 'chronic',
    pos: 'adj.',
    level: 'B2',
    category: 'health-body',
    categoryLabel: 'สุขภาพ & ร่างกาย',
    thai: 'เรื้อรัง (เป็นเวลานาน)',
    alternatives: ['เฉียบพลัน', 'ติดต่อได้', 'รักษาไม่หาย'],
    example: 'Regular exercise can help manage chronic back pain.',
    exampleThai: 'การออกกำลังกายสม่ำเสมอสามารถช่วยบรรเทาอาการปวดหลังเรื้อรังได้',
  },

  // === A1: อาชีพ & การทำงาน ===
  {
    id: 'v_a1_jobs_01',
    word: 'teacher',
    pos: 'n.',
    level: 'A1',
    category: 'jobs-work',
    categoryLabel: 'อาชีพ & การทำงาน',
    thai: 'ครู, อาจารย์',
    alternatives: ['นักเรียน', 'แพทย์', 'วิศวกร'],
    example: 'Our English teacher is kind and funny.',
    exampleThai: 'ครูสอนภาษาอังกฤษของเราใจดีและตลกมาก',
  },
  {
    id: 'v_a1_jobs_02',
    word: 'office',
    pos: 'n.',
    level: 'A1',
    category: 'jobs-work',
    categoryLabel: 'อาชีพ & การทำงาน',
    thai: 'ที่ทำงาน, สำนักงาน',
    alternatives: ['โรงงาน', 'ร้านค้า', 'ห้องสมุด'],
    example: 'She works in an office in the city center.',
    exampleThai: 'เธอทำงานในสำนักงานใจกลางเมือง',
  },

  // === A2: อาชีพ & การทำงาน ===
  {
    id: 'v_a2_jobs_01',
    word: 'colleague',
    pos: 'n.',
    level: 'A2',
    category: 'jobs-work',
    categoryLabel: 'อาชีพ & การทำงาน',
    thai: 'เพื่อนร่วมงาน',
    alternatives: ['หัวหน้างาน', 'ลูกค้า', 'ลูกจ้าง'],
    example: 'I had lunch with my new colleagues today.',
    exampleThai: 'วันนี้ฉันทานอาหารกลางวันกับเพื่อนร่วมงานใหม่',
  },
  {
    id: 'v_a2_jobs_02',
    word: 'interview',
    pos: 'n.',
    level: 'A2',
    category: 'jobs-work',
    categoryLabel: 'อาชีพ & การทำงาน',
    thai: 'การสัมภาษณ์งาน',
    alternatives: ['การประชุม', 'การฝึกอบรม', 'การประเมินผล'],
    example: 'He wore a smart suit for his job interview.',
    exampleThai: 'เขาสวมสูทสุภาพสำหรับการสัมภาษณ์งาน',
  },

  // === B1: อาชีพ & การทำงาน ===
  {
    id: 'v_b1_jobs_01',
    word: 'deadline',
    pos: 'n.',
    level: 'B1',
    category: 'jobs-work',
    categoryLabel: 'อาชีพ & การทำงาน',
    thai: 'กำหนดส่งงาน, วันครบกำหนด',
    alternatives: ['ตารางนัดหมาย', 'เป้าหมายประจำปี', 'เวลาเลิกงาน'],
    example: 'We worked overtime to meet the project deadline.',
    exampleThai: 'พวกเราทำงานล่วงเวลาเพื่อให้ทันกำหนดส่งโครงงาน',
  },
  {
    id: 'v_b1_jobs_02',
    word: 'promote',
    pos: 'v.',
    level: 'B1',
    category: 'jobs-work',
    categoryLabel: 'อาชีพ & การทำงาน',
    thai: 'เลื่อนตำแหน่ง, เลื่อนขั้น',
    alternatives: ['ปลดออก', 'ย้ายแผนก', 'ลดเงินเดือน'],
    example: 'She was promoted to team leader after just one year.',
    exampleThai: 'เธอได้รับการเลื่อนตำแหน่งเป็นหัวหน้าทีมหลังจากทำงานเพียงปีเดียว',
  },

  // === B2: อาชีพ & การทำงาน ===
  {
    id: 'v_b2_jobs_01',
    word: 'entrepreneur',
    pos: 'n.',
    level: 'B2',
    category: 'jobs-work',
    categoryLabel: 'อาชีพ & การทำงาน',
    thai: 'ผู้ประกอบการ, เจ้าของธุรกิจ',
    alternatives: ['ผู้จัดการฝ่ายขาย', 'นักลงทุนสถาบัน', 'ที่ปรึกษาภาษี'],
    example: 'The young entrepreneur started a tech company from her garage.',
    exampleThai: 'ผู้ประกอบการรุ่นใหม่ได้เริ่มต้นก่อตั้งบริษัทเทคโนโลยีจากโรงรถของเธอ',
  },

  // === A1: เทคโนโลยี & สื่อ ===
  {
    id: 'v_a1_tech_01',
    word: 'computer',
    pos: 'n.',
    level: 'A1',
    category: 'tech-media',
    categoryLabel: 'เทคโนโลยี & สื่อ',
    thai: 'คอมพิวเตอร์',
    alternatives: ['โทรทัศน์', 'เครื่องพิมพ์', 'กล้องถ่ายรูป'],
    example: 'He uses a laptop computer for his school projects.',
    exampleThai: 'เขาใช้คอมพิวเตอร์แล็ปท็อปสำหรับทำรายงานโรงเรียน',
  },
  {
    id: 'v_a1_tech_02',
    word: 'password',
    pos: 'n.',
    level: 'A1',
    category: 'tech-media',
    categoryLabel: 'เทคโนโลยี & สื่อ',
    thai: 'รหัสผ่าน',
    alternatives: ['ชื่อผู้ใช้', 'อีเมล', 'เบอร์โทรศัพท์'],
    example: 'Always keep your online password safe and private.',
    exampleThai: 'เก็บรหัสผ่านออนไลน์ของคุณให้ปลอดภัยและเป็นความลับเสมอ',
  },

  // === A2: เทคโนโลยี & สื่อ ===
  {
    id: 'v_a2_tech_01',
    word: 'download',
    pos: 'v.',
    level: 'A2',
    category: 'tech-media',
    categoryLabel: 'เทคโนโลยี & สื่อ',
    thai: 'ดาวน์โหลด, บันทึกข้อมูลลงเครื่อง',
    alternatives: ['อัปโหลด', 'ลบข้อมูล', 'รีสตาร์ท'],
    example: 'You can download the course materials from this link.',
    exampleThai: 'คุณสามารถดาวน์โหลดเอกสารประกอบการเรียนได้จากลิงก์นี้',
  },
  {
    id: 'v_a2_tech_02',
    word: 'device',
    pos: 'n.',
    level: 'A2',
    category: 'tech-media',
    categoryLabel: 'เทคโนโลยี & สื่อ',
    thai: 'อุปกรณ์, เครื่องมืออิเล็กทรอนิกส์',
    alternatives: ['โปรแกรม', 'สัญญาณไร้สาย', 'สายเคเบิล'],
    example: 'Turn off all electronic devices during the exam.',
    exampleThai: 'กรุณาปิดอุปกรณ์อิเล็กทรอนิกส์ทุกชนิดระหว่างการสอบ',
  },

  // === B1: เทคโนโลยี & สื่อ ===
  {
    id: 'v_b1_tech_01',
    word: 'artificial',
    pos: 'adj.',
    level: 'B1',
    category: 'tech-media',
    categoryLabel: 'เทคโนโลยี & สื่อ',
    thai: 'ประดิษฐ์ขึ้น, เทียม (ไม่ใช่ธรรมชาติ)',
    alternatives: ['อัจฉริยะ', 'อัตโนมัติ', 'ดิจิทัล'],
    example: 'Artificial intelligence is changing how we learn languages.',
    exampleThai: 'ปัญญาประดิษฐ์กำลังเปลี่ยนแปลงวิธีที่พวกเราเรียนรู้ภาษา',
  },
  {
    id: 'v_b1_tech_02',
    word: 'streaming',
    pos: 'n.',
    level: 'B1',
    category: 'tech-media',
    categoryLabel: 'เทคโนโลยี & สื่อ',
    thai: 'การรับชม/ฟังออนไลน์แบบเรียลไทม์',
    alternatives: ['การดาวน์โหลดถาวร', 'การบันทึกเทป', 'การถ่ายทอดสัญญาณวิทยุ'],
    example: 'Music streaming platforms have replaced physical CDs.',
    exampleThai: 'แพลตฟอร์มสตรีมมิ่งเพลงได้เข้ามาแทนที่แผ่นซีดีแล้ว',
  },

  // === B2: เทคโนโลยี & สื่อ ===
  {
    id: 'v_b2_tech_01',
    word: 'cybersecurity',
    pos: 'n.',
    level: 'B2',
    category: 'tech-media',
    categoryLabel: 'เทคโนโลยี & สื่อ',
    thai: 'ความมั่นคงปลอดภัยทางไซเบอร์',
    alternatives: ['การจัดเก็บข้อมูลบนคลาวด์', 'โครงข่ายคอมพิวเตอร์', 'การเขียนโปรแกรม'],
    example: 'Companies invest heavily in cybersecurity to protect customer data.',
    exampleThai: 'บริษัทต่างๆ ลงทุนมหาศาลในด้านความปลอดภัยทางไซเบอร์เพื่อปกป้องข้อมูลลูกค้า',
  },

  // === A1: ซื้อของ & การเงิน ===
  {
    id: 'v_a1_shop_01',
    word: 'cheap',
    pos: 'adj.',
    level: 'A1',
    category: 'shopping-money',
    categoryLabel: 'ซื้อของ & การเงิน',
    thai: 'ราคาถูก',
    alternatives: ['แพงหูฉี่', 'สวยงาม', 'ของแท้'],
    example: 'Street food in Thailand is tasty and cheap.',
    exampleThai: 'อาหารริมทางในประเทศไทยอร่อยและราคาถูก',
  },
  {
    id: 'v_a1_shop_02',
    word: 'expensive',
    pos: 'adj.',
    level: 'A1',
    category: 'shopping-money',
    categoryLabel: 'ซื้อของ & การเงิน',
    thai: 'ราคาแพง',
    alternatives: ['ราคาถูก', 'คุ้มค่า', 'มือสอง'],
    example: 'Designer watches can be very expensive.',
    exampleThai: 'นาฬิกาแบรนด์เนมอาจมีราคาแพงมาก',
  },

  // === A2: ซื้อของ & การเงิน ===
  {
    id: 'v_a2_shop_01',
    word: 'discount',
    pos: 'n.',
    level: 'A2',
    category: 'shopping-money',
    categoryLabel: 'ซื้อของ & การเงิน',
    thai: 'ส่วนลด',
    alternatives: ['ภาษีมูลค่าเพิ่ม', 'ค่าบริการ', 'เงินทอน'],
    example: 'Students get a 10% discount on books at this store.',
    exampleThai: 'นักเรียนจะได้รับส่วนลด 10% เมื่อซื้อหนังสือที่ร้านนี้',
  },
  {
    id: 'v_a2_shop_02',
    word: 'receipt',
    pos: 'n.',
    level: 'A2',
    category: 'shopping-money',
    categoryLabel: 'ซื้อของ & การเงิน',
    thai: 'ใบเสร็จรับเงิน',
    alternatives: ['ใบสั่งซื้อ', 'คูปองลดราคา', 'บัตรเครดิต'],
    example: 'Please keep your receipt in case you want an exchange.',
    exampleThai: 'กรุณาเก็บใบเสร็จไว้เผื่อคุณต้องการเปลี่ยนสินค้า',
  },

  // === B1: ซื้อของ & การเงิน ===
  {
    id: 'v_b1_shop_01',
    word: 'bargain',
    pos: 'n.',
    level: 'B1',
    category: 'shopping-money',
    categoryLabel: 'ซื้อของ & การเงิน',
    thai: 'ของราคาคุ้มค่ามาก, สินค้าราคาพิเศษ',
    alternatives: ['สินค้าชำรุด', 'สินค้าฟุ่มเฟือย', 'ของค้างสต็อก'],
    example: 'At only 200 baht, this jacket was a real bargain.',
    exampleThai: 'ราคาเพียง 200 บาท เสื้อแจ็คเก็ตตัวนี้ถือว่าคุ้มค่ามากจริงๆ',
  },
  {
    id: 'v_b1_shop_02',
    word: 'currency',
    pos: 'n.',
    level: 'B1',
    category: 'shopping-money',
    categoryLabel: 'ซื้อของ & การเงิน',
    thai: 'สกุลเงินตรา',
    alternatives: ['อัตราดอกเบี้ย', 'เงินฝากประจำ', 'กองทุนรวม'],
    example: 'The local currency of Japan is the yen.',
    exampleThai: 'สกุลเงินท้องถิ่นของประเทศญี่ปุ่นคือเงินเยน',
  },

  // === B2: ซื้อของ & การเงิน ===
  {
    id: 'v_b2_shop_01',
    word: 'inflation',
    pos: 'n.',
    level: 'B2',
    category: 'shopping-money',
    categoryLabel: 'ซื้อของ & การเงิน',
    thai: 'ภาวะเงินเฟ้อ (ของแพงขึ้น)',
    alternatives: ['ภาวะเศรษฐกิจถดถอย', 'การกระจายรายได้', 'การล้มละลาย'],
    example: 'High inflation increases the cost of living for everyday families.',
    exampleThai: 'ภาวะเงินเฟ้อที่สูงทำให้ค่าครองชีพของครอบครัวทั่วไปเพิ่มสูงขึ้น',
  },

  // === A1: อารมณ์ & บุคลิก ===
  {
    id: 'v_a1_feel_01',
    word: 'happy',
    pos: 'adj.',
    level: 'A1',
    category: 'feelings-personality',
    categoryLabel: 'อารมณ์ & บุคลิก',
    thai: 'มีความสุข, ดีใจ',
    alternatives: ['เศร้าโศก', 'โกรธเคือง', 'เหน็ดเหนื่อย'],
    example: 'The children were happy to play in the park.',
    exampleThai: 'เด็กๆ รู้สึกมีความสุขที่ได้วิ่งเล่นในสวนสาธารณะ',
  },
  {
    id: 'v_a1_feel_02',
    word: 'tired',
    pos: 'adj.',
    level: 'A1',
    category: 'feelings-personality',
    categoryLabel: 'อารมณ์ & บุคลิก',
    thai: 'เหนื่อยล้า, อ่อนเพลีย',
    alternatives: ['สดชื่นกระปรี้กระเปร่า', 'กระตือรือร้น', 'ตื่นเต้น'],
    example: 'I feel tired after a long day of studying.',
    exampleThai: 'ฉันรู้สึกเหนื่อยหลังจากเรียนมาทั้งวัน',
  },

  // === A2: อารมณ์ & บุคลิก ===
  {
    id: 'v_a2_feel_01',
    word: 'anxious',
    pos: 'adj.',
    level: 'A2',
    category: 'feelings-personality',
    categoryLabel: 'อารมณ์ & บุคลิก',
    thai: 'กังวล, ประหม่า',
    alternatives: ['มั่นใจ', 'ผ่อนคลาย', 'เพลิดเพลิน'],
    example: 'He felt anxious before giving his speech.',
    exampleThai: 'เขารู้สึกกังวลก่อนขึ้นกล่าวสุนทรพจน์',
  },
  {
    id: 'v_a2_feel_02',
    word: 'generous',
    pos: 'adj.',
    level: 'A2',
    category: 'feelings-personality',
    categoryLabel: 'อารมณ์ & บุคลิก',
    thai: 'ใจกว้าง, เอื้อเฟื้อเผื่อแผ่',
    alternatives: ['ตระหนี่ถี่เหนียว', 'เห็นแก่ตัว', 'ขี้อาย'],
    example: 'Thank you for your generous gift.',
    exampleThai: 'ขอบคุณสำหรับของขวัญอันเอื้อเฟื้อของคุณนะครับ',
  },

  // === B1: อารมณ์ & บุคลิก ===
  {
    id: 'v_b1_feel_01',
    word: 'confident',
    pos: 'adj.',
    level: 'B1',
    category: 'feelings-personality',
    categoryLabel: 'อารมณ์ & บุคลิก',
    thai: 'มั่นใจในตัวเอง',
    alternatives: ['ลังเลใจ', 'หวาดระแวง', 'ขาดสมาธิ'],
    example: 'Practicing English daily will make you feel confident.',
    exampleThai: 'การฝึกภาษาอังกฤษทุกวันจะทำให้คุณรู้สึกมั่นใจในตัวเอง',
  },
  {
    id: 'v_b1_feel_02',
    word: 'stubborn',
    pos: 'adj.',
    level: 'B1',
    category: 'feelings-personality',
    categoryLabel: 'อารมณ์ & บุคลิก',
    thai: 'ดื้อรั้น, ไม่ยอมฟังใคร',
    alternatives: ['โอนอ่อนผ่อนตาม', 'เข้ากับคนง่าย', 'อ่อนน้อมถ่อมตน'],
    example: 'He is too stubborn to admit that he made a mistake.',
    exampleThai: 'เขาดื้อเกินกว่าจะยอมรับว่าตัวเองทำผิดพลาด',
  },

  // === B2: อารมณ์ & บุคลิก ===
  {
    id: 'v_b2_feel_01',
    word: 'empathy',
    pos: 'n.',
    level: 'B2',
    category: 'feelings-personality',
    categoryLabel: 'อารมณ์ & บุคลิก',
    thai: 'ความเห็นอกเห็นใจ, ความเข้าใจความรู้สึกผู้อื่น',
    alternatives: ['ความเมินเฉย', 'ความหยิ่งยโส', 'ความสงสารแบบดูแคลน'],
    example: 'Showing empathy is a key trait of an effective leader.',
    exampleThai: 'การแสดงความเห็นอกเห็นใจเป็นคุณลักษณะสำคัญของผู้นำที่มีประสิทธิภาพ',
  },

  // === A1: ธรรมชาติ & ดินฟ้าอากาศ ===
  {
    id: 'v_a1_nature_01',
    word: 'sunny',
    pos: 'adj.',
    level: 'A1',
    category: 'nature-weather',
    categoryLabel: 'ธรรมชาติ & ดินฟ้าอากาศ',
    thai: 'แดดออก, ท้องฟ้าแจ่มใส',
    alternatives: ['ฝนตกหนัก', 'มีหมอกหนา', 'ลมพายุแรง'],
    example: 'It’s a beautiful sunny day for a picnic.',
    exampleThai: 'วันนี้เป็นวันที่แดดออกสดใสเหมาะกับการไปปิกนิกมาก',
  },
  {
    id: 'v_a1_nature_02',
    word: 'rainy',
    pos: 'adj.',
    level: 'A1',
    category: 'nature-weather',
    categoryLabel: 'ธรรมชาติ & ดินฟ้าอากาศ',
    thai: 'ฝนตก',
    alternatives: ['หิมะตก', 'แห้งแล้ง', 'แดดจ้า'],
    example: 'Remember to take an umbrella on a rainy afternoon.',
    exampleThai: 'อย่าลืมพกร่มไปด้วยนะในบ่ายที่มีฝนตก',
  },

  // === A2: ธรรมชาติ & ดินฟ้าอากาศ ===
  {
    id: 'v_a2_nature_01',
    word: 'forecast',
    pos: 'n.',
    level: 'A2',
    category: 'nature-weather',
    categoryLabel: 'ธรรมชาติ & ดินฟ้าอากาศ',
    thai: 'การพยากรณ์อากาศ',
    alternatives: ['บันทึกประวัติศาสตร์', 'สถิติประจำปี', 'คำทำนายดวง'],
    example: 'According to the weather forecast, it will rain tomorrow.',
    exampleThai: 'ตามการพยากรณ์อากาศ พรุ่งนี้จะมีฝนตก',
  },

  // === B1: ธรรมชาติ & ดินฟ้าอากาศ ===
  {
    id: 'v_b1_nature_01',
    word: 'pollution',
    pos: 'n.',
    level: 'B1',
    category: 'nature-weather',
    categoryLabel: 'ธรรมชาติ & ดินฟ้าอากาศ',
    thai: 'มลพิษ, ภาวะมลพิษ',
    alternatives: ['การอนุรักษ์', 'พลังงานสะอาด', 'ความหลากหลายทางชีวภาพ'],
    example: 'Air pollution is a major environmental problem in big cities.',
    exampleThai: 'มลพิษทางอากาศเป็นปัญหาสิ่งแวดล้อมที่สำคัญในเมืองใหญ่',
  },

  // === B2: ธรรมชาติ & ดินฟ้าอากาศ ===
  {
    id: 'v_b2_nature_01',
    word: 'biodiversity',
    pos: 'n.',
    level: 'B2',
    category: 'nature-weather',
    categoryLabel: 'ธรรมชาติ & ดินฟ้าอากาศ',
    thai: 'ความหลากหลายทางชีวภาพ',
    alternatives: ['การเปลี่ยนแปลงสภาพภูมิอากาศ', 'การตัดไม้ทำลายป่า', 'การพัฒนาอย่างยั่งยืน'],
    example: 'Tropical rainforests have the richest biodiversity on Earth.',
    exampleThai: 'ป่าฝนเขตร้อนมีความหลากหลายทางชีวภาพที่อุดมสมบูรณ์ที่สุดบนโลก',
  },

  // === A1: งานอดิเรก & กีฬา ===
  {
    id: 'v_a1_hobby_01',
    word: 'music',
    pos: 'n.',
    level: 'A1',
    category: 'hobbies-sports',
    categoryLabel: 'งานอดิเรก & กีฬา',
    thai: 'ดนตรี, เสียงเพลง',
    alternatives: ['ภาพวาด', 'วรรณกรรม', 'การแสดงละคร'],
    example: 'She loves listening to pop music while relaxing.',
    exampleThai: 'เธอชอบฟังเพลงป็อปขณะพักผ่อน',
  },

  // === A2: งานอดิเรก & กีฬา ===
  {
    id: 'v_a2_hobby_01',
    word: 'tournament',
    pos: 'n.',
    level: 'A2',
    category: 'hobbies-sports',
    categoryLabel: 'งานอดิเรก & กีฬา',
    thai: 'การแข่งขันชิงชนะเลิศ',
    alternatives: ['การฝึกซ้อม', 'การแสดงนิทรรศการ', 'งานเลี้ยงสังสรรค์'],
    example: 'Our school football team won the annual tournament.',
    exampleThai: 'ทีมฟุตบอลของโรงเรียนเราชนะการแข่งขันชิงชนะเลิศประจำปี',
  },

  // === B1: งานอดิเรก & กีฬา ===
  {
    id: 'v_b1_hobby_01',
    word: 'leisure',
    pos: 'n.',
    level: 'B1',
    category: 'hobbies-sports',
    categoryLabel: 'งานอดิเรก & กีฬา',
    thai: 'เวลาว่าง, การพักผ่อนหย่อนใจ',
    alternatives: ['หน้าที่การงาน', 'ตารางสอน', 'งานบ้าน'],
    example: 'What do you enjoy doing in your leisure time?',
    exampleThai: 'คุณชอบทำอะไรในเวลาว่างเหรอครับ?',
  },

  // === B2: งานอดิเรก & กีฬา ===
  {
    id: 'v_b2_hobby_01',
    word: 'enthusiast',
    pos: 'n.',
    level: 'B2',
    category: 'hobbies-sports',
    categoryLabel: 'งานอดิเรก & กีฬา',
    thai: 'ผู้คลั่งไคล้, ผู้หลงใหลในสิ่งใดสิ่งหนึ่ง',
    alternatives: ['ผู้เชี่ยวชาญมืออาชีพ', 'ผู้ชมทั่วไป', 'ผู้ตัดสิน'],
    example: 'As a fitness enthusiast, he exercises at the gym five days a week.',
    exampleThai: 'ในฐานะผู้หลงใหลในการออกกำลังกาย เขาไปฟิตเนสสัปดาห์ละ 5 วัน',
  },
];

export function getCategories() {
  return CATEGORIES;
}

export function getLevels() {
  return ['A1', 'A2', 'B1', 'B2'];
}

export function getVocabList({ level = 'all', category = 'all', search = '', shuffle = false } = {}) {
  let list = [...VOCAB_ITEMS];

  if (level && level !== 'all') {
    list = list.filter((item) => item.level === level);
  }

  if (category && category !== 'all') {
    list = list.filter((item) => item.category === category);
  }

  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    list = list.filter(
      (item) =>
        item.word.toLowerCase().includes(q) ||
        item.thai.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q),
    );
  }

  if (shuffle) {
    list = shuffleArray(list);
  }

  return list;
}

export function getRandomWords(count = 10, filter = {}) {
  const pool = getVocabList({ ...filter, shuffle: true });
  return pool.slice(0, count);
}

export function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
