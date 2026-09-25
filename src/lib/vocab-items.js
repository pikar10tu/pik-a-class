// ⚠️ ไฟล์นี้สร้างอัตโนมัติจาก scripts/vocab-builder/data-*.js — ห้ามแก้ตรงนี้
// แก้คำศัพท์ที่ scripts/vocab-builder/ แล้วรัน: npm run build:vocab

export const CATEGORIES = [
  {
    "id": "food-drink",
    "label": "อาหาร & เครื่องดื่ม",
    "icon": "🍕"
  },
  {
    "id": "travel-transport",
    "label": "การเดินทาง & คมนาคม",
    "icon": "✈️"
  },
  {
    "id": "health-body",
    "label": "สุขภาพ & ร่างกาย",
    "icon": "🏥"
  },
  {
    "id": "jobs-work",
    "label": "อาชีพ & การทำงาน",
    "icon": "💼"
  },
  {
    "id": "hobbies-sports",
    "label": "งานอดิเรก & กีฬา",
    "icon": "🎨"
  },
  {
    "id": "tech-media",
    "label": "เทคโนโลยี & สื่อ",
    "icon": "📱"
  },
  {
    "id": "nature-weather",
    "label": "ธรรมชาติ & ดินฟ้าอากาศ",
    "icon": "🌦️"
  },
  {
    "id": "shopping-money",
    "label": "ซื้อของ & การเงิน",
    "icon": "🛍️"
  },
  {
    "id": "feelings-personality",
    "label": "อารมณ์ & บุคลิก",
    "icon": "😊"
  },
  {
    "id": "education-school",
    "label": "การศึกษา & โรงเรียน",
    "icon": "🎓"
  },
  {
    "id": "home-daily",
    "label": "บ้าน & กิจวัตรประจำวัน",
    "icon": "🏠"
  }
];

export const VOCAB_ITEMS = [
  {
    "id": "v_a1_food_01",
    "word": "breakfast",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อาหารเช้า",
    "alternatives": [
      "อาหารกลางวัน",
      "อาหารเย็น",
      "ของว่าง"
    ],
    "example": "I usually eat eggs and toast for breakfast.",
    "exampleThai": "ฉันมักจะกินไข่และขนมปังปิ้งเป็นอาหารเช้า"
  },
  {
    "id": "v_a1_food_02",
    "word": "delicious",
    "pos": "adj.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อร่อย",
    "alternatives": [
      "จืดชืด",
      "ขม",
      "เปรี้ยว"
    ],
    "example": "This homemade soup is very delicious.",
    "exampleThai": "ซุปทำเองถ้วยนี้อร่อยมาก"
  },
  {
    "id": "v_a1_food_03",
    "word": "vegetable",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ผัก",
    "alternatives": [
      "ผลไม้",
      "เนื้อสัตว์",
      "เครื่องเทศ"
    ],
    "example": "Eating fresh vegetables is good for your health.",
    "exampleThai": "การกินผักสดดีต่อสุขภาพของคุณ"
  },
  {
    "id": "v_a1_food_04",
    "word": "thirsty",
    "pos": "adj.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "กระหายน้ำ",
    "alternatives": [
      "หิวข้าว",
      "ง่วงนอน",
      "อิ่ม"
    ],
    "example": "After running in the sun, I felt very thirsty.",
    "exampleThai": "หลังจากวิ่งกลางแดด ฉันรู้สึกกระหายน้ำมาก"
  },
  {
    "id": "v_a1_food_05",
    "word": "water",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "น้ำดื่ม",
    "alternatives": [
      "ชาเขียว",
      "น้ำอัดลม",
      "นมสด"
    ],
    "example": "Please drink plenty of clean water every day.",
    "exampleThai": "กรุณาดื่มน้ำสะอาดมากๆ ในแต่ละวัน"
  },
  {
    "id": "v_a1_food_06",
    "word": "fruit",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ผลไม้",
    "alternatives": [
      "ผักใบเขียว",
      "ขนมปัง",
      "ธัญพืช"
    ],
    "example": "Mango is my favorite tropical fruit.",
    "exampleThai": "มะม่วงคือผลไม้เมืองร้อนที่ฉันชอบที่สุด"
  },
  {
    "id": "v_a1_food_07",
    "word": "hungry",
    "pos": "adj.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "หิวข้าว",
    "alternatives": [
      "อิ่ม",
      "ง่วงนอน",
      "กระหายน้ำ"
    ],
    "example": "The little children were hungry before lunch.",
    "exampleThai": "เด็กๆ รู้สึกหิวข้าวก่อนถึงเวลาอาหารกลางวัน"
  },
  {
    "id": "v_a1_food_08",
    "word": "bread",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ขนมปัง",
    "alternatives": [
      "ข้าวสวย",
      "ก๋วยเตี๋ยว",
      "เนื้อย่าง"
    ],
    "example": "He bought a warm loaf of bread from the bakery.",
    "exampleThai": "เขาซื้อขนมปังอบอุ่นๆ หนึ่งแถวจากร้านเบเกอรี่"
  },
  {
    "id": "v_a1_food_09",
    "word": "milk",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "นมสด",
    "alternatives": [
      "น้ำผลไม้",
      "กาแฟ",
      "ชาดำ"
    ],
    "example": "Cats and kittens love drinking fresh milk.",
    "exampleThai": "แมวและลูกแมวชอบดื่มนมสด"
  },
  {
    "id": "v_a1_food_10",
    "word": "egg",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ไข่ไก่",
    "alternatives": [
      "เต้าหู้",
      "เนื้อปลา",
      "ไส้กรอก"
    ],
    "example": "She fried two eggs for a quick morning meal.",
    "exampleThai": "เธอทอดไข่ไก่สองฟองเป็นอาหารเช้าจานด่วน"
  },
  {
    "id": "v_a1_food_11",
    "word": "cheese",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เนยแข็ง",
    "alternatives": [
      "เนยเหลว",
      "มายองเนส",
      "โยเกิร์ต"
    ],
    "example": "Melted cheese makes the pizza taste incredible.",
    "exampleThai": "เนยแข็งเยิ้มๆ ทำให้พิซซ่ามีรสชาติยอดเยี่ยมมาก"
  },
  {
    "id": "v_a1_food_12",
    "word": "chicken",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เนื้อไก่",
    "alternatives": [
      "เนื้อวัว",
      "เนื้อหมู",
      "เนื้อปลา"
    ],
    "example": "Crispy fried chicken is popular all over Thailand.",
    "exampleThai": "เนื้อไก่ทอดกรอบเป็นที่นิยมไปทั่วประเทศไทย"
  },
  {
    "id": "v_a1_food_13",
    "word": "rice",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ข้าวสวย",
    "alternatives": [
      "เส้นหมี่",
      "ขนมปัง",
      "มันฝรั่ง"
    ],
    "example": "Thai people eat steamed jasmine rice with almost every curry.",
    "exampleThai": "คนไทยรับประทานข้าวสวยหอมมะลิกับแกงแทบทุกชนิด"
  },
  {
    "id": "v_a1_food_14",
    "word": "soup",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "น้ำซุป",
    "alternatives": [
      "น้ำสลัด",
      "ซอสมะเขือเทศ",
      "น้ำจิ้ม"
    ],
    "example": "A bowl of hot chicken soup warms you up on a rainy day.",
    "exampleThai": "น้ำซุปไก่ร้อนๆ หนึ่งถ้วยช่วยให้คุณอบอุ่นในวันฝนตก"
  },
  {
    "id": "v_a1_food_15",
    "word": "apple",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ผลแอปเปิล",
    "alternatives": [
      "ผลส้ม",
      "ผลองุ่น",
      "ผลกล้วย"
    ],
    "example": "Eating an apple every afternoon gives you great vitamins.",
    "exampleThai": "การกินผลแอปเปิลทุกบ่ายทำให้คุณได้รับวิตามินที่ดี"
  },
  {
    "id": "v_a1_food_16",
    "word": "banana",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ผลกล้วย",
    "alternatives": [
      "ผลมะละกอ",
      "ผลแตงโม",
      "ผลมะม่วง"
    ],
    "example": "Athletes often eat a ripe yellow banana before a big match.",
    "exampleThai": "นักกีฬามักกินผลกล้วยสุกสีเหลืองก่อนการแข่งขันนัดสำคัญ"
  },
  {
    "id": "v_a1_food_17",
    "word": "orange",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ผลส้ม",
    "alternatives": [
      "ผลมะนาว",
      "ผลสับปะรด",
      "ผลฝรั่ง"
    ],
    "example": "This sweet orange is full of natural vitamin C.",
    "exampleThai": "ผลส้มรสหวานผลนี้อุดมไปด้วยวิตามินซีธรรมชาติ"
  },
  {
    "id": "v_a1_food_18",
    "word": "fish",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เนื้อปลา",
    "alternatives": [
      "เนื้อกุ้ง",
      "เนื้อปู",
      "เนื้อหมึก"
    ],
    "example": "Steamed fish with lime and chili is a healthy dinner.",
    "exampleThai": "เนื้อปลานึ่งมะนาวพริกสดเป็นอาหารเย็นที่ดีต่อสุขภาพ"
  },
  {
    "id": "v_a1_food_19",
    "word": "meat",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เนื้อสัตว์",
    "alternatives": [
      "ผักสด",
      "ผลไม้สุก",
      "แป้งสาลี"
    ],
    "example": "He decided to cut down on red meat for better health.",
    "exampleThai": "เขาตัดสินใจลดการกินเนื้อสัตว์สีแดงเพื่อสุขภาพที่ดีขึ้น"
  },
  {
    "id": "v_a1_food_20",
    "word": "tea",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "น้ำชา",
    "alternatives": [
      "กาแฟสด",
      "น้ำเปล่า",
      "น้ำอัดลม"
    ],
    "example": "My grandmother drinks hot green tea every afternoon.",
    "exampleThai": "คุณยายของฉันดื่มน้ำชาเขียวร้อนทุกบ่าย"
  },
  {
    "id": "v_a1_food_21",
    "word": "coffee",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "กาแฟ",
    "alternatives": [
      "ชาไทย",
      "โกโก้",
      "นมถั่วเหลือง"
    ],
    "example": "A fresh cup of black coffee helps wake him up early.",
    "exampleThai": "กาแฟดำแก้วสดใหม่ช่วยปลุกให้เขากระปรี้กระเปร่าแต่เช้า"
  },
  {
    "id": "v_a1_food_22",
    "word": "sugar",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "น้ำตาล",
    "alternatives": [
      "เกลือป่น",
      "พริกไทย",
      "ผงชูรส"
    ],
    "example": "Do you want one teaspoon of white sugar in your coffee?",
    "exampleThai": "คุณต้องการใส่น้ำตาลทรายขาวหนึ่งช้อนชาในกาแฟไหม"
  },
  {
    "id": "v_a1_food_23",
    "word": "salt",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เกลือ",
    "alternatives": [
      "น้ำตาล",
      "น้ำปลา",
      "ซีอิ๊ว"
    ],
    "example": "Just add a tiny pinch of salt to balance the flavor.",
    "exampleThai": "แค่เติมเกลือหยิบมือเล็กๆ เพื่อปรับสมดุลรสชาติ"
  },
  {
    "id": "v_a1_food_24",
    "word": "butter",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เนย",
    "alternatives": [
      "น้ำมันพืช",
      "กะทิ",
      "น้ำผึ้ง"
    ],
    "example": "Spread some cream butter on the warm pancakes.",
    "exampleThai": "ทาเนยบางๆ บนแพนเค้กอุ่นๆ"
  },
  {
    "id": "v_a1_food_25",
    "word": "cake",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ขนมเค้ก",
    "alternatives": [
      "คุกกี้",
      "พายผลไม้",
      "ไอศกรีม"
    ],
    "example": "They baked a chocolate cake for her tenth birthday.",
    "exampleThai": "พวกเขาอบขนมเค้กช็อกโกแลตสำหรับวันเกิดครบสิบปีของเธอ"
  },
  {
    "id": "v_a1_food_26",
    "word": "juice",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "น้ำผลไม้",
    "alternatives": [
      "น้ำแร่",
      "น้ำอัดลม",
      "ชามะนาว"
    ],
    "example": "Freshly squeezed apple juice is refreshing after a workout.",
    "exampleThai": "น้ำผลไม้แอปเปิลคั้นสดช่วยให้สดชื่นหลังออกกำลังกาย"
  },
  {
    "id": "v_a1_food_27",
    "word": "dinner",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อาหารค่ำ",
    "alternatives": [
      "อาหารเช้า",
      "อาหารกลางวัน",
      "ของว่างยามบ่าย"
    ],
    "example": "Our whole family gathers at six in the evening for dinner.",
    "exampleThai": "ครอบครัวของเราทุกคนมารวมตัวกันตอนหกโมงเย็นเพื่อรับประทานอาหารค่ำ"
  },
  {
    "id": "v_a1_food_28",
    "word": "lunch",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อาหารกลางวัน",
    "alternatives": [
      "อาหารเช้า",
      "อาหารค่ำ",
      "อาหารมื้อดึก"
    ],
    "example": "The school cafeteria serves delicious lunch to students.",
    "exampleThai": "โรงอาหารของโรงเรียนเสิร์ฟอาหารกลางวันแสนอร่อยแก่นักเรียน"
  },
  {
    "id": "v_a1_food_29",
    "word": "potato",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "มันฝรั่ง",
    "alternatives": [
      "ฟักทอง",
      "แครอท",
      "หัวหอม"
    ],
    "example": "Mashed potato goes wonderfully with grilled chicken steak.",
    "exampleThai": "มันฝรั่งบดเข้ากันได้ดีเยี่ยมกับสเต๊กไก่ย่าง"
  },
  {
    "id": "v_a1_food_30",
    "word": "tomato",
    "pos": "n.",
    "level": "A1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "มะเขือเทศ",
    "alternatives": [
      "แตงกวา",
      "ผักกาดหอม",
      "กะหล่ำปลี"
    ],
    "example": "She chopped ripe red tomatoes to make pasta sauce.",
    "exampleThai": "เธอหั่นมะเขือเทศสีแดงสุกเพื่อทำซอสพาสต้า"
  },
  {
    "id": "v_a2_food_01",
    "word": "ingredient",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "วัตถุดิบ",
    "alternatives": [
      "สูตรอาหาร",
      "เครื่องปรุงรส",
      "จานหลัก"
    ],
    "example": "Fresh basil is an essential ingredient in Thai green curry.",
    "exampleThai": "โหระพาสดเป็นวัตถุดิบสำคัญในแกงเขียวหวานไทย"
  },
  {
    "id": "v_a2_food_02",
    "word": "recipe",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "สูตรอาหาร",
    "alternatives": [
      "รายการสั่งซื้อ",
      "ใบเสร็จ",
      "สมุดบันทึก"
    ],
    "example": "My grandmother shared her secret pancake recipe with me.",
    "exampleThai": "คุณยายแบ่งปันสูตรอาหารทำแพนเค้กลับเฉพาะให้ฉัน"
  },
  {
    "id": "v_a2_food_03",
    "word": "dessert",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ของหวาน",
    "alternatives": [
      "อาหารจานหลัก",
      "อาหารเรียกน้ำย่อย",
      "เครื่องดื่ม"
    ],
    "example": "We enjoyed mango sticky rice as our special dessert.",
    "exampleThai": "พวกเราเพลิดเพลินกับข้าวเหนียวมะม่วงเป็นของหวานมื้อพิเศษ"
  },
  {
    "id": "v_a2_food_04",
    "word": "spicy",
    "pos": "adj.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสเผ็ด",
    "alternatives": [
      "รสหวาน",
      "รสเค็ม",
      "รสเปรี้ยว"
    ],
    "example": "Tom Yum soup has a wonderfully spicy and sour taste.",
    "exampleThai": "ต้มยำมีรสเผ็ดและเปรี้ยวที่ยอดเยี่ยมมาก"
  },
  {
    "id": "v_a2_food_05",
    "word": "sour",
    "pos": "adj.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสเปรี้ยว",
    "alternatives": [
      "รสหวาน",
      "รสเค็ม",
      "รสขม"
    ],
    "example": "Fresh yellow lemons have a sharp and sour flavor.",
    "exampleThai": "เลมอนสีเหลืองสดมีรสเปรี้ยวจี๊ดเด่นชัด"
  },
  {
    "id": "v_a2_food_06",
    "word": "bitter",
    "pos": "adj.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสขม",
    "alternatives": [
      "รสหวาน",
      "รสเปรี้ยว",
      "รสเค็ม"
    ],
    "example": "Pure dark chocolate without sugar has a rich bitter note.",
    "exampleThai": "ดาร์กช็อกโกแลตแท้ไม่ใส่น้ำตาลมีรสขมเข้มข้น"
  },
  {
    "id": "v_a2_food_07",
    "word": "sweet",
    "pos": "adj.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสหวาน",
    "alternatives": [
      "รสเค็ม",
      "รสเผ็ด",
      "รสเปรี้ยว"
    ],
    "example": "Ripe Thai mangoes taste naturally sweet and juicy.",
    "exampleThai": "มะม่วงสุกของไทยมีรสหวานและฉ่ำน้ำอย่างเป็นธรรมชาติ"
  },
  {
    "id": "v_a2_food_08",
    "word": "salty",
    "pos": "adj.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสเค็ม",
    "alternatives": [
      "รสหวาน",
      "รสเปรี้ยว",
      "รสจืด"
    ],
    "example": "Crispy potato chips are often too salty for small kids.",
    "exampleThai": "มันฝรั่งทอดกรอบมักมีรสเค็มเกินไปสำหรับเด็กเล็ก"
  },
  {
    "id": "v_a2_food_09",
    "word": "seafood",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อาหารทะเล",
    "alternatives": [
      "อาหารป่า",
      "อาหารเจ",
      "อาหารฟาสต์ฟู้ด"
    ],
    "example": "The coastal town is famous for fresh and affordable seafood.",
    "exampleThai": "เมืองชายทะเลแห่งนี้มีชื่อเสียงเรื่องอาหารทะเลสดและราคาย่อมเยา"
  },
  {
    "id": "v_a2_food_10",
    "word": "grill",
    "pos": "v.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ย่าง",
    "alternatives": [
      "ต้ม",
      "ทอด",
      "นึ่ง"
    ],
    "example": "We love to grill chicken skewers in the backyard on weekends.",
    "exampleThai": "พวกเราชอบย่างไก่เสียบไม้ที่สวนหลังบ้านในวันหยุดสุดสัปดาห์"
  },
  {
    "id": "v_a2_food_11",
    "word": "bake",
    "pos": "v.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อบขนม",
    "alternatives": [
      "ทอดกรอบ",
      "ต้มเดือด",
      "ผัดน้ำมัน"
    ],
    "example": "She loves to bake banana muffins on Sunday mornings.",
    "exampleThai": "เธอชอบอบขนมมัฟฟินกล้วยหอมในเช้าวันอาทิตย์"
  },
  {
    "id": "v_a2_food_12",
    "word": "boil",
    "pos": "v.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ต้ม",
    "alternatives": [
      "ย่าง",
      "อบ",
      "ทอด"
    ],
    "example": "Boil the noodles in bubbling water for three minutes.",
    "exampleThai": "ต้มเส้นบะหมี่ในน้ำเดือดพล่านเป็นเวลาสามนาที"
  },
  {
    "id": "v_a2_food_13",
    "word": "fry",
    "pos": "v.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ทอด",
    "alternatives": [
      "ต้ม",
      "นึ่ง",
      "ตุ๋น"
    ],
    "example": "Fry the garlic slices in hot oil until they turn golden.",
    "exampleThai": "ทอดกระเทียมซอยในน้ำมันร้อนจนกลายเป็นสีเหลืองทอง"
  },
  {
    "id": "v_a2_food_14",
    "word": "menu",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รายการอาหาร",
    "alternatives": [
      "ใบเสร็จรับเงิน",
      "ป้ายราคา",
      "บัตรสมาชิก"
    ],
    "example": "Could you please bring us the drink menu?",
    "exampleThai": "คุณช่วยนำรายการอาหารเครื่องดื่มมาให้เราได้ไหม"
  },
  {
    "id": "v_a2_food_15",
    "word": "order",
    "pos": "v.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "สั่งอาหาร",
    "alternatives": [
      "คิดเงิน",
      "ปรุงอาหาร",
      "ยกเลิกโต๊ะ"
    ],
    "example": "Are you ready to order your main course now?",
    "exampleThai": "คุณพร้อมที่จะสั่งอาหารจานหลักตอนนี้หรือยัง"
  },
  {
    "id": "v_a2_food_16",
    "word": "waiter",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "บริกรชาย",
    "alternatives": [
      "พ่อครัว",
      "ผู้จัดการร้าน",
      "แคชเชียร์"
    ],
    "example": "The friendly waiter recommended the grilled sea bass.",
    "exampleThai": "บริกรชายผู้เป็นมิตรแนะนำปลากะพงย่าง"
  },
  {
    "id": "v_a2_food_17",
    "word": "waitress",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "บริกรหญิง",
    "alternatives": [
      "แม่ครัว",
      "ลูกค้า",
      "คนส่งอาหาร"
    ],
    "example": "The attentive waitress brought cold water immediately.",
    "exampleThai": "บริกรหญิงผู้น่ารักนำน้ำเย็นมาเสิร์ฟทันที"
  },
  {
    "id": "v_a2_food_18",
    "word": "bill",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ใบเรียกเก็บเงิน",
    "alternatives": [
      "รายการอาหาร",
      "คูปองส่วนลด",
      "ตั๋วชมภาพยนตร์"
    ],
    "example": "Excuse me, could we please have the bill?",
    "exampleThai": "ขอโทษนะคะ ขอใบเรียกเก็บเงินด้วยค่ะ"
  },
  {
    "id": "v_a2_food_19",
    "word": "tip",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เงินทิป",
    "alternatives": [
      "ภาษี",
      "ค่าปรับ",
      "ส่วนลด"
    ],
    "example": "We left a generous cash tip for the excellent service.",
    "exampleThai": "พวกเราวางเงินทิปพิเศษไว้สำหรับการบริการที่ยอดเยี่ยม"
  },
  {
    "id": "v_a2_food_20",
    "word": "beverage",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เครื่องดื่ม",
    "alternatives": [
      "ขนมคบเคี้ยว",
      "อาหารจานด่วน",
      "ผลไม้สด"
    ],
    "example": "Hot tea and iced coffee are very popular morning beverages.",
    "exampleThai": "ชาร้อนและกาแฟเย็นเป็นเครื่องดื่มยามเช้าที่ได้รับความนิยมมาก"
  },
  {
    "id": "v_a2_food_21",
    "word": "salad",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "สลัดผัก",
    "alternatives": [
      "ซุปข้น",
      "สเต๊กเนื้อ",
      "พิซซ่า"
    ],
    "example": "A fresh green salad makes an ideal starter before steak.",
    "exampleThai": "สลัดผักใบเขียวสดเหมาะเป็นอาหารจานเริ่มต้นก่อนทานสเต๊ก"
  },
  {
    "id": "v_a2_food_22",
    "word": "snack",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ของว่าง",
    "alternatives": [
      "อาหารมื้อหลัก",
      "ยาบำรุง",
      "เครื่องปรุง"
    ],
    "example": "Nuts and dried fruits are healthy afternoon snacks.",
    "exampleThai": "ถั่วและผลไม้อบแห้งเป็นของว่างยามบ่ายที่ดีต่อสุขภาพ"
  },
  {
    "id": "v_a2_food_23",
    "word": "sauce",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "น้ำจิ้ม",
    "alternatives": [
      "แป้งทอด",
      "น้ำซุปใส",
      "น้ำมันพืช"
    ],
    "example": "Dip your crispy spring roll in sweet chili sauce.",
    "exampleThai": "จิ้มปอเปี๊ยะทอดกรอบลงในน้ำจิ้มไก่รสหวาน"
  },
  {
    "id": "v_a2_food_24",
    "word": "knife",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "มีดบนโต๊ะอาหาร",
    "alternatives": [
      "ช้อนตักซุป",
      "ส้อมสเต๊ก",
      "ตะเกียบ"
    ],
    "example": "Use the steak knife to slice your grilled beef smoothly.",
    "exampleThai": "ใช้มีดบนโต๊ะอาหารเพื่อหั่นเนื้อวัวย่างได้อย่างราบรื่น"
  },
  {
    "id": "v_a2_food_25",
    "word": "fork",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ส้อม",
    "alternatives": [
      "ช้อน",
      "มีด",
      "จานรอง"
    ],
    "example": "Hold your fork in the left hand while slicing the meat.",
    "exampleThai": "ถือส้อมไว้ในมือซ้ายขณะหั่นเนื้อสัตว์"
  },
  {
    "id": "v_a2_food_26",
    "word": "spoon",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ช้อน",
    "alternatives": [
      "ส้อม",
      "มีด",
      "แก้วน้ำ"
    ],
    "example": "He used a ceramic spoon to sip the hot noodles soup.",
    "exampleThai": "เขาใช้ช้อนเซรามิกเพื่อซดน้ำซุปก๋วยเตี๋ยวร้อนๆ"
  },
  {
    "id": "v_a2_food_27",
    "word": "napkin",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ผ้าเช็ดปาก",
    "alternatives": [
      "ผ้าปูโต๊ะ",
      "ผ้ากันเปื้อน",
      "ผ้าเช็ดจาน"
    ],
    "example": "Place the folded cloth napkin on your lap during dining.",
    "exampleThai": "วางผ้าเช็ดปากที่พับไว้บนตักของคุณระหว่างรับประทานอาหาร"
  },
  {
    "id": "v_b1_food_01",
    "word": "cuisine",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "สไตล์อาหารประจำชาติ",
    "alternatives": [
      "สูตรอาหารด่วน",
      "ร้านขายของชำ",
      "มารยาทบนโต๊ะอาหาร"
    ],
    "example": "Italian cuisine is internationally celebrated for pasta and pizza.",
    "exampleThai": "สไตล์อาหารประจำชาติอิตาลีมีชื่อเสียงระดับโลกเรื่องพาสต้าและพิซซ่า"
  },
  {
    "id": "v_b1_food_02",
    "word": "nutritious",
    "pos": "adj.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "มีคุณค่าทางโภชนาการ",
    "alternatives": [
      "ไร้ประโยชน์",
      "ปนเปื้อนสารเคมี",
      "ย่อยยาก"
    ],
    "example": "Whole grains and lentils are highly nutritious foods.",
    "exampleThai": "ธัญพืชเต็มเมล็ดและถั่วเลนทิลเป็นอาหารที่มีคุณค่าทางโภชนาการสูงมาก"
  },
  {
    "id": "v_b1_food_03",
    "word": "diet",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รูปแบบการกินอาหาร",
    "alternatives": [
      "การออกกำลังกาย",
      "การนอนหลับ",
      "การตรวจสุขภาพ"
    ],
    "example": "A balanced Mediterranean diet helps reduce heart disease risks.",
    "exampleThai": "รูปแบบการกินอาหารแบบเมดิเตอร์เรเนียนที่สมดุลช่วยลดความเสี่ยงโรคหัวใจ"
  },
  {
    "id": "v_b1_food_04",
    "word": "organic",
    "pos": "adj.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ปลอดสารเคมี",
    "alternatives": [
      "แต่งกลิ่นสังเคราะห์",
      "แปรรูปสูง",
      "ใส่สารกันบูด"
    ],
    "example": "Many shoppers prefer buying certified organic vegetables at local markets.",
    "exampleThai": "ผู้ซื้อจำนวนมากชอบซื้อผักปลอดสารเคมีที่ได้รับการรับรอง ณ ตลาดท้องถิ่น"
  },
  {
    "id": "v_b1_food_05",
    "word": "vegetarian",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ผู้กินมังสวิรัติ",
    "alternatives": [
      "ผู้กินเนื้อสัตว์",
      "นักโภชนาการ",
      "ผู้ตรวจสอบอาหาร"
    ],
    "example": "As a strict vegetarian, he does not consume any poultry or seafood.",
    "exampleThai": "ในฐานะผู้กินมังสวิรัติเคร่งครัด เขาไม่บริโภคเนื้อสัตว์ปีกหรืออาหารทะเลเลย"
  },
  {
    "id": "v_b1_food_06",
    "word": "appetite",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ความอยากอาหาร",
    "alternatives": [
      "ความเหนื่อยล้า",
      "ความง่วงซึม",
      "ความกระหายโชค"
    ],
    "example": "The aroma of fresh garlic bread stimulated everyone's appetite.",
    "exampleThai": "กลิ่นหอมของขนมปังกระเทียมสดช่วยกระตุ้นความอยากอาหารของทุกคน"
  },
  {
    "id": "v_b1_food_07",
    "word": "portion",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ปริมาณอาหารต่อจาน",
    "alternatives": [
      "ส่วนผสมลับ",
      "ราคาอาหาร",
      "เวลาในการปรุง"
    ],
    "example": "The restaurant serves generous portions that can be easily shared.",
    "exampleThai": "ร้านอาหารแห่งนี้เสิร์ฟปริมาณอาหารต่อจานที่เยอะมากจนแบ่งกันทานได้สบาย"
  },
  {
    "id": "v_b1_food_08",
    "word": "flavor",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสชาติเฉพาะตัว",
    "alternatives": [
      "สีผสมอาหาร",
      "กลิ่นควัน",
      "อุณหภูมิห้อง"
    ],
    "example": "Roasting fresh herbs releases a complex and rich flavor.",
    "exampleThai": "การคั่วสมุนไพรสดช่วยขับรสชาติเฉพาะตัวที่เข้มข้นและซับซ้อนออกมา"
  },
  {
    "id": "v_b1_food_09",
    "word": "digestion",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "การย่อยอาหาร",
    "alternatives": [
      "การไหลเวียนเลือด",
      "การหายใจลึก",
      "การดูดซึมวิตามิน"
    ],
    "example": "Drinking warm ginger tea can support smooth digestion after dinner.",
    "exampleThai": "การดื่มน้ำขิงอุ่นๆ สามารถช่วยส่งเสริมการย่อยอาหารที่ดีหลังอาหารเย็น"
  },
  {
    "id": "v_b1_food_10",
    "word": "calorie",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "หน่วยพลังงานอาหาร",
    "alternatives": [
      "ปริมาณโซเดียม",
      "คอเลสเตอรอล",
      "เปอร์เซ็นต์ไขมัน"
    ],
    "example": "Active runners need to monitor their daily calorie intake carefully.",
    "exampleThai": "นักวิ่งที่กระฉับกระเฉงจำเป็นต้องตรวจสอบหน่วยพลังงานอาหารในแต่ละวันอย่างรอบคอบ"
  },
  {
    "id": "v_b1_food_11",
    "word": "dairy",
    "pos": "adj.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เกี่ยวกับผลิตภัณฑ์นม",
    "alternatives": [
      "เกี่ยวกับเนื้อสัตว์",
      "เกี่ยวกับพืชตระกูลถั่ว",
      "เกี่ยวกับอาหารทะเล"
    ],
    "example": "People with lactose intolerance must avoid dairy products.",
    "exampleThai": "ผู้ที่แพ้น้ำตาลแล็กโทสจำเป็นต้องหลีกเลี่ยงผลิตภัณฑ์นม"
  },
  {
    "id": "v_b1_food_12",
    "word": "consume",
    "pos": "v.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "บริโภค",
    "alternatives": [
      "จัดจำหน่าย",
      "เก็บรักษา",
      "ผลิตขึ้น"
    ],
    "example": "Health experts suggest people consume less refined white sugar.",
    "exampleThai": "ผู้เชี่ยวชาญด้านสุขภาพแนะนำให้ผู้คนบริโภคน้ำตาลทรายขาวบริสุทธิ์ให้น้อยลง"
  },
  {
    "id": "v_b1_food_13",
    "word": "preservative",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "สารกันบูด",
    "alternatives": [
      "สารปรุงแต่งรส",
      "สารให้ความหวาน",
      "สีผสมอาหาร"
    ],
    "example": "This homemade strawberry jam contains zero artificial preservatives.",
    "exampleThai": "แยมสตรอว์เบอร์รีทำเองขวดนี้ไม่มีสารกันบูดสังเคราะห์เลยแม้แต่น้อย"
  },
  {
    "id": "v_b1_food_14",
    "word": "delicate",
    "pos": "adj.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสชาติละมุน",
    "alternatives": [
      "รสจัดจ้าน",
      "เหนียวเคี้ยวยาก",
      "ไหม้เกรียม"
    ],
    "example": "Steamed tofu has a delicate flavor that absorbs broth perfectly.",
    "exampleThai": "เต้าหู้นึ่งมีรสชาติละมุนที่ซึมซับน้ำซุปได้อย่างสมบูรณ์แบบ"
  },
  {
    "id": "v_b1_food_15",
    "word": "cutlery",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ชุดช้อนส้อมมีด",
    "alternatives": [
      "เครื่องแก้วหรูหรา",
      "ถ้วยชามเซรามิก",
      "ผ้าเช็ดโต๊ะ"
    ],
    "example": "Please polish the silver cutlery before setting the banquet table.",
    "exampleThai": "กรุณาขัดชุดช้อนส้อมมีดเงินให้เงาก่อนจัดโต๊ะงานเลี้ยง"
  },
  {
    "id": "v_b1_food_16",
    "word": "allergic",
    "pos": "adj.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "มีอาการแพ้อาหาร",
    "alternatives": [
      "ชื่นชอบอาหาร",
      "คุ้นเคยรสชาติ",
      "ติดใจของหวาน"
    ],
    "example": "Please check if any guests are allergic to peanuts before baking.",
    "exampleThai": "กรุณาตรวจสอบว่ามีแขกคนใดมีอาการแพ้อาหารประเภทถั่วลิสงก่อนลงมืออบขนม"
  },
  {
    "id": "v_b1_food_17",
    "word": "staple",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อาหารหลักประจำวัน",
    "alternatives": [
      "อาหารว่างตามเทศกาล",
      "เครื่องปรุงหายาก",
      "ขนมนำเข้า"
    ],
    "example": "Rice is the primary staple food for billions across Asia.",
    "exampleThai": "ข้าวคืออาหารหลักประจำวันอันดับหนึ่งของผู้คนหลายพันล้านคนทั่วเอเชีย"
  },
  {
    "id": "v_b1_food_18",
    "word": "hygiene",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "สุขอนามัยอาหาร",
    "alternatives": [
      "ราคาอาหาร",
      "ความเร็วในการเสิร์ฟ",
      "การตกแต่งจาน"
    ],
    "example": "Street food vendors must maintain strict hygiene to prevent illness.",
    "exampleThai": "ผู้ขายอาหารริมทางต้องรักษาสุขอนามัยอาหารอย่างเคร่งครัดเพื่อป้องกันความเจ็บป่วย"
  },
  {
    "id": "v_b2_food_01",
    "word": "nourishment",
    "pos": "n.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "สารอาหารบำรุงร่างกาย",
    "alternatives": [
      "สารพิษตกค้าง",
      "การขาดแคลนอาหาร",
      "ความหิวโหย"
    ],
    "example": "Young growing children require wholesome nourishment for mental and physical development.",
    "exampleThai": "เด็กวัยกำลังเจริญเติบโตต้องการสารอาหารบำรุงร่างกายที่ครบถ้วนเพื่อพัฒนาการทางสมองและร่างกาย"
  },
  {
    "id": "v_b2_food_02",
    "word": "delicacy",
    "pos": "n.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อาหารรสเลิศหายาก",
    "alternatives": [
      "อาหารสำเร็จรูป",
      "อาหารขยะราคาถูก",
      "วัตถุดิบทั่วไป"
    ],
    "example": "In northern Italy, white truffles are regarded as an expensive culinary delicacy.",
    "exampleThai": "ในตอนเหนือของอิตาลี เห็ดทรัฟเฟิลขาวถือเป็นอาหารรสเลิศหายากราคาแพงลิบลิ่ว"
  },
  {
    "id": "v_b2_food_03",
    "word": "culinary",
    "pos": "adj.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เกี่ยวกับการทำอาหาร",
    "alternatives": [
      "เกี่ยวกับเกษตรกรรม",
      "เกี่ยวกับการแพทย์",
      "เกี่ยวกับการท่องเที่ยว"
    ],
    "example": "The aspiring young chef enrolled in a renowned French culinary academy.",
    "exampleThai": "เชฟหนุ่มผู้มีความมุ่งมั่นสมัครเข้าเรียนในสถาบันเกี่ยวกับการทำอาหารฝรั่งเศสชื่อดัง"
  },
  {
    "id": "v_b2_food_04",
    "word": "ravenous",
    "pos": "adj.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "หิวโซอย่างยิ่ง",
    "alternatives": [
      "อิ่มแน่น",
      "ไม่อยากอาหาร",
      "กระหายน้ำหวาน"
    ],
    "example": "After hiking eighteen miles up the steep mountain, the trekkers were ravenous.",
    "exampleThai": "หลังเดินป่าขึ้นภูเขาสูงชันเป็นระยะทางสิบแปดไมล์ เหล่านักเดินป่าก็หิวโซอย่างยิ่ง"
  },
  {
    "id": "v_b2_food_05",
    "word": "succulent",
    "pos": "adj.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ชุ่มฉ่ำรสเลิศ",
    "alternatives": [
      "แห้งกรัง",
      "แข็งกระด้าง",
      "ไหม้ดำ"
    ],
    "example": "The roast duck had a remarkably crispy skin and succulent tender meat.",
    "exampleThai": "เป็ดย่างมีหนังกรอบเป็นพิเศษและเนื้อสัมผัสนุ่มชุ่มฉ่ำรสเลิศ"
  },
  {
    "id": "v_b2_food_06",
    "word": "perishable",
    "pos": "adj.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เน่าเสียง่าย",
    "alternatives": [
      "คงทนถาวร",
      "แห้งสนิท",
      "เก็บได้นานนับปี"
    ],
    "example": "Fresh dairy and raw seafood are highly perishable items that need steady refrigeration.",
    "exampleThai": "ผลิตภัณฑ์นมสดและอาหารทะเลสดเป็นของเน่าเสียง่ายที่ต้องแช่เย็นอย่างสม่ำเสมอ"
  },
  {
    "id": "v_b2_food_07",
    "word": "palate",
    "pos": "n.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสนิยมการรับรส",
    "alternatives": [
      "ฟันกรามบดเคี้ยว",
      "หลอดอาหารส่วนบน",
      "กระเพาะอาหาร"
    ],
    "example": "Working as a professional wine taster requires a refined and sensitive palate.",
    "exampleThai": "การทำงานเป็นนักชิมไวน์มืออาชีพจำเป็นต้องมีรสนิยมการรับรสที่ประณีตและแม่นยำ"
  },
  {
    "id": "v_b2_food_08",
    "word": "savory",
    "pos": "adj.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสชาติกลมกล่อม",
    "alternatives": [
      "รสหวานเลี่ยน",
      "รสจืดสนิท",
      "รสขมปี๋"
    ],
    "example": "The chef prepared a rich savory pie filled with mushrooms and slow-cooked beef.",
    "exampleThai": "เชฟได้ปรุงพายรสชาติกลมกล่อมเข้มข้นที่สอดไส้เห็ดและเนื้อตุ๋นอย่างพิถีพิถัน"
  },
  {
    "id": "v_b2_food_09",
    "word": "replenish",
    "pos": "v.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เติมพลังงานทดแทน",
    "alternatives": [
      "เผาผลาญทิ้ง",
      "สะสมไขมัน",
      "ปล่อยให้หมดไป"
    ],
    "example": "Marathon runners consume electrolyte drinks to replenish lost fluids and minerals.",
    "exampleThai": "นักวิ่งมาราธอนดื่มเครื่องดื่มเกลือแร่เพื่อเติมพลังงานทดแทนของเหลวและแร่ธาตุที่สูญเสียไป"
  },
  {
    "id": "v_b2_food_10",
    "word": "abstain",
    "pos": "v.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ละเว้นการบริโภค",
    "alternatives": [
      "กินอย่างมูมมาม",
      "สั่งเพิ่มเป็นสองเท่า",
      "แนะนำให้ผู้อื่นลอง"
    ],
    "example": "Many religious traditions encourage followers to abstain from meat on special holy days.",
    "exampleThai": "ประเพณีทางศาสนามากมายสนับสนุนให้ศาสนิกชนละเว้นการบริโภคเนื้อสัตว์ในวันสำคัญทางศาสนา"
  },
  {
    "id": "v_b2_food_11",
    "word": "banquet",
    "pos": "n.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "งานเลี้ยงโต๊ะอาหาร",
    "alternatives": [
      "อาหารจานด่วน",
      "การอดอาหารประท้วง",
      "มื้ออาหารว่างยามบ่าย"
    ],
    "example": "Foreign dignitaries were invited to a lavish official banquet hosted at the palace.",
    "exampleThai": "บุคคลสำคัญจากต่างประเทศได้รับเชิญร่วมงานเลี้ยงโต๊ะอาหารมื้อใหญ่อย่างเป็นทางการ ณ พระราชวัง"
  },
  {
    "id": "v_b2_food_12",
    "word": "fermentation",
    "pos": "n.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "กระบวนการหมักบ่ม",
    "alternatives": [
      "การพาสเจอร์ไรซ์",
      "การต้มเดือดฆ่าเชื้อ",
      "การแช่แข็งอาหาร"
    ],
    "example": "The complex pungent tang of kimchi results from natural microbial fermentation.",
    "exampleThai": "รสเปรี้ยวอมเผ็ดอันซับซ้อนของกิมจิเกิดจากกระบวนการหมักบ่มตามธรรมชาติของจุลินทรีย์"
  },
  {
    "id": "v_b2_food_nourish",
    "word": "nourish",
    "pos": "v.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "บำรุงเลี้ยงร่างกาย",
    "alternatives": [
      "ทำให้อ่อนแอลง",
      "ทำลายสุขภาพ",
      "ปล่อยให้อดอยาก"
    ],
    "example": "A balanced diet with fresh greens and proteins helps nourish growing children.",
    "exampleThai": "อาหารที่สมดุลซึ่งประกอบด้วยผักสดและโปรตีนช่วยบำรุงเลี้ยงร่างกายของเด็กที่กำลังเจริญเติบโต"
  },
  {
    "id": "v_b2_food_digest",
    "word": "digest",
    "pos": "v.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ย่อยอาหาร",
    "alternatives": [
      "สำรอกอาหารออก",
      "ดูดซึมสารพิษ",
      "กักเก็บของเสีย"
    ],
    "example": "The human stomach produces specialized acids and enzymes to digest complex proteins efficiently.",
    "exampleThai": "กระเพาะอาหารของมนุษย์ผลิตกรดและเอนไซม์เฉพาะเพื่อย่อยอาหารจำพวกโปรตีนเชิงซ้อนได้อย่างมีประสิทธิภาพ"
  },
  {
    "id": "v_b2_food_preserve",
    "word": "preserve",
    "pos": "v.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ถนอมอาหาร",
    "alternatives": [
      "ปล่อยให้เน่าเสีย",
      "ทิ้งให้บูดเน่า",
      "ทำลายคุณค่าทางอาหาร"
    ],
    "example": "Traditional societies used salt and smoke to preserve meat for harsh winters.",
    "exampleThai": "สังคมดั้งเดิมใช้เกลือและควันไฟในการถนอมอาหารประเภทเนื้อสัตว์ไว้สำหรับช่วงฤดูหนาวที่ทารุณ"
  },
  {
    "id": "v_b2_food_contaminate",
    "word": "contaminate",
    "pos": "v.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ปนเปื้อนสิ่งสกปรก",
    "alternatives": [
      "ผ่านการฆ่าเชื้อ",
      "ทำความสะอาดบริสุทธิ์",
      "กรองสิ่งแปลกปลอม"
    ],
    "example": "Improper storage conditions can quickly contaminate raw seafood with hazardous bacteria.",
    "exampleThai": "สภาพการจัดเก็บที่ไม่เหมาะสมสามารถทำให้อาหารทะเลดิบปนเปื้อนสิ่งสกปรกและแบคทีเรียอันตรายได้อย่างรวดเร็ว"
  },
  {
    "id": "v_b2_food_17",
    "word": "binge",
    "pos": "v.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "กินดื่มมากเกินพิกัด",
    "alternatives": [
      "ควบคุมอาหารเคร่งครัด",
      "อดอาหารประท้วง",
      "ทานอาหารตามตาราง"
    ],
    "example": "Under intense exam pressure, stressed college students sometimes binge on junk food.",
    "exampleThai": "ภายใต้ความกดดันจากการสอบ นักศึกษามหาวิทยาลัยที่เครียดบางครั้งก็กินดื่มมากเกินพิกัดกับอาหารขยะ"
  },
  {
    "id": "v_a1_travel_01",
    "word": "bus",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "รถโดยสารประจำทาง",
    "alternatives": [
      "รถไฟใต้ดิน",
      "เครื่องบินโดยสาร",
      "เรือข้ามฟาก"
    ],
    "example": "The blue bus stops directly outside the school gates.",
    "exampleThai": "รถโดยสารประจำทางสีน้ำเงินจอดเทียบหน้าประตูโรงเรียนพอดี"
  },
  {
    "id": "v_a1_travel_02",
    "word": "train",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "รถไฟ",
    "alternatives": [
      "รถแท็กซี่",
      "เฮลิคอปเตอร์",
      "เรือพาย"
    ],
    "example": "Taking the morning train to Chiang Mai is very scenic.",
    "exampleThai": "การนั่งรถไฟเที่ยวเช้าไปเชียงใหม่มีวิวทิวทัศน์สวยงามมาก"
  },
  {
    "id": "v_a1_travel_03",
    "word": "car",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "รถยนต์",
    "alternatives": [
      "รถจักรยานยนต์",
      "รถบรรทุกสินค้า",
      "รถพยาบาล"
    ],
    "example": "His father drives an electric car to work every day.",
    "exampleThai": "พ่อของเขาขับรถยนต์ไฟฟ้าไปทำงานทุกวัน"
  },
  {
    "id": "v_a1_travel_04",
    "word": "bicycle",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "รถจักรยาน",
    "alternatives": [
      "สกู๊ตเตอร์ไฟฟ้า",
      "รถกระบะ",
      "รถสามล้อ"
    ],
    "example": "She rides her red bicycle around the quiet park in the evening.",
    "exampleThai": "เธอปั่นรถจักรยานสีแดงรอบสวนสาธารณะอันเงียบสงบในตอนเย็น"
  },
  {
    "id": "v_a1_travel_05",
    "word": "walk",
    "pos": "v.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เดินเท้า",
    "alternatives": [
      "วิ่งกระโดด",
      "ว่ายน้ำ",
      "พายเรือ"
    ],
    "example": "We prefer to walk to the grocery store when the weather is cool.",
    "exampleThai": "พวกเราชอบเดินเท้าไปร้านขายของชำเมื่ออากาศเย็นสบาย"
  },
  {
    "id": "v_a1_travel_06",
    "word": "fly",
    "pos": "v.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "บินข้ามฟากฟ้า",
    "alternatives": [
      "ล่องเรือ",
      "ดำน้ำ",
      "ปีนหน้าผา"
    ],
    "example": "Modern jumbo passenger planes fly above the clouds safely.",
    "exampleThai": "เครื่องบินโดยสารขนาดใหญ่สมัยใหม่บินข้ามฟากฟ้าเหนือเมฆได้อย่างปลอดภัย"
  },
  {
    "id": "v_a1_travel_07",
    "word": "station",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "สถานีรถไฟ",
    "alternatives": [
      "ท่าอากาศยาน",
      "อู่ซ่อมรถ",
      "ลานจอดเฮลิคอปเตอร์"
    ],
    "example": "Let us meet near the ticket counter inside the central station.",
    "exampleThai": "มาเจอกันใกล้เคาน์เตอร์ขายตั๋วภายในสถานีรถไฟกลางนะ"
  },
  {
    "id": "v_a1_travel_08",
    "word": "airport",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ท่าอากาศยาน",
    "alternatives": [
      "ท่าเทียบเรือ",
      "สถานีขนส่ง",
      "จุดพักรถ"
    ],
    "example": "We arrived at Suvarnabhumi Airport two hours before the flight.",
    "exampleThai": "พวกเรามาถึงท่าอากาศยานสุวรรณภูมิก่อนเวลาเดินทางสองชั่วโมง"
  },
  {
    "id": "v_a1_travel_09",
    "word": "ticket",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ตั๋วโดยสาร",
    "alternatives": [
      "ใบเสร็จชำระเงิน",
      "หนังสือเดินทาง",
      "บัตรประชาชน"
    ],
    "example": "Keep your bus ticket ready for the inspector to verify.",
    "exampleThai": "เตรียมตั๋วโดยสารของคุณให้พร้อมสำหรับพนักงานตรวจตั๋วเพื่อตรวจสอบ"
  },
  {
    "id": "v_a1_travel_10",
    "word": "stop",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ป้ายหยุดรถ",
    "alternatives": [
      "ทางม้าลาย",
      "ไฟสัญญาณจราจร",
      "สะพานลอยคนข้าม"
    ],
    "example": "There is a sheltered bus stop right in front of the supermarket.",
    "exampleThai": "มีป้ายหยุดรถประจำทางพร้อมที่บังแดดฝนอยู่ตรงหน้าซูเปอร์มาร์เก็ตพอดี"
  },
  {
    "id": "v_a1_travel_11",
    "word": "road",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ถนน",
    "alternatives": [
      "ทางรถไฟ",
      "แม่น้ำ",
      "รันเวย์"
    ],
    "example": "Workers are paving the main road through the rural village.",
    "exampleThai": "คนงานกำลังลาดยางถนนหนทางสายหลักที่ตัดผ่านหมู่บ้านชนบท"
  },
  {
    "id": "v_a1_travel_12",
    "word": "street",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ถนนในย่านชุมชน",
    "alternatives": [
      "ซอยเปลี่ยว",
      "ทางหลวงข้ามจังหวัด",
      "คลองลัด"
    ],
    "example": "The narrow street is lined with colorful souvenir shops.",
    "exampleThai": "ถนนในย่านชุมชนสายแคบๆ เรียงรายไปด้วยร้านขายของที่ระลึกสีสันสดใส"
  },
  {
    "id": "v_a1_travel_13",
    "word": "map",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "แผนที่นำทาง",
    "alternatives": [
      "เข็มทิศพกพา",
      "ตารางเวลาเดินรถ",
      "คู่มือนักท่องเที่ยว"
    ],
    "example": "The tourist opened a pocket map to locate the national museum.",
    "exampleThai": "นักท่องเที่ยวเปิดแผนที่นำทางฉบับพกพาเพื่อหาตำแหน่งพิพิธภัณฑ์แห่งชาติ"
  },
  {
    "id": "v_a1_travel_14",
    "word": "hotel",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "โรงแรมที่พัก",
    "alternatives": [
      "หอพักนักศึกษา",
      "บ้านเช่ารายเดือน",
      "แคมป์คนงาน"
    ],
    "example": "They booked a seaside hotel room overlooking the blue ocean.",
    "exampleThai": "พวกเขาจองห้องโรงแรมที่พักริมทะเลที่มองเห็นมหาสมุทรสีคราม"
  },
  {
    "id": "v_a1_travel_15",
    "word": "room",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ห้องพัก",
    "alternatives": [
      "ห้องโถงใหญ่",
      "ระเบียงกลางแจ้ง",
      "ลิฟต์โดยสาร"
    ],
    "example": "Our hotel room was clean and had two comfortable single beds.",
    "exampleThai": "ห้องพักโรงแรมของเราสะอาดและมีเตียงเดี่ยวแสนสบายสองเตียง"
  },
  {
    "id": "v_a1_travel_16",
    "word": "visit",
    "pos": "v.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ไปเยือน",
    "alternatives": [
      "ย้ายถิ่นฐาน",
      "อพยพหลบหนี",
      "เดินทางผ่าน"
    ],
    "example": "Many foreign tourists visit the Grand Palace in Bangkok each year.",
    "exampleThai": "นักท่องเที่ยวต่างชาติจำนวนมากไปเยือนวัดพระแก้วในกรุงเทพฯ ทุกปี"
  },
  {
    "id": "v_a1_travel_17",
    "word": "leave",
    "pos": "v.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ออกเดินทาง",
    "alternatives": [
      "มาถึงปลายทาง",
      "หยุดพักผ่อน",
      "จอดแวะ"
    ],
    "example": "The express coach will leave the station at precisely seven sharp.",
    "exampleThai": "รถทัวร์ด่วนจะออกเดินทางจากสถานีเวลาเจ็ดโมงเช้าตรงเป๊ะ"
  },
  {
    "id": "v_a1_travel_18",
    "word": "arrive",
    "pos": "v.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "มาถึงปลายทาง",
    "alternatives": [
      "ออกเดินทาง",
      "หลงทิศทาง",
      "แวะเติมน้ำมัน"
    ],
    "example": "What time did your night flight arrive in Singapore?",
    "exampleThai": "เที่ยวบินกลางคืนของคุณมาถึงปลายทางที่สิงคโปร์เวลากี่โมง"
  },
  {
    "id": "v_a1_travel_19",
    "word": "travel",
    "pos": "v.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ท่องเที่ยว",
    "alternatives": [
      "ทำงานประจำ",
      "อยู่บ้าน",
      "นอนหลับพัก"
    ],
    "example": "They plan to travel around southern Thailand during the school holidays.",
    "exampleThai": "พวกเขาวางแผนท่องเที่ยวรอบภาคใต้ของไทยช่วงปิดเทอม"
  },
  {
    "id": "v_a1_travel_20",
    "word": "trip",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ทริปท่องเที่ยว",
    "alternatives": [
      "งานสัมมนาวิชาการ",
      "การประชุมลับ",
      "การสอบวัดระดับ"
    ],
    "example": "Our weekend beach trip was filled with sunshine and swimming.",
    "exampleThai": "ทริปท่องเที่ยวชายหาดช่วงวันหยุดสุดสัปดาห์ของเราเต็มไปด้วยแสงแดดและการว่ายน้ำ"
  },
  {
    "id": "v_a1_travel_21",
    "word": "taxi",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "รถแท็กซี่",
    "alternatives": [
      "รถสามล้อถีบ",
      "รถบรรทุกเทรลเลอร์",
      "รถดับเพลิง"
    ],
    "example": "It was pouring rain so we flagged down a passing yellow taxi.",
    "exampleThai": "ฝนตกหนักมากพวกเราจึงโบกรถแท็กซี่สีเหลืองที่แล่นผ่านมา"
  },
  {
    "id": "v_a1_travel_22",
    "word": "plane",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เครื่องบิน",
    "alternatives": [
      "เรือเดินสมุทร",
      "รถไฟความเร็วสูง",
      "บอลลูน"
    ],
    "example": "The passenger plane touched down gently on the airport runway.",
    "exampleThai": "เครื่องบินโดยสารร่อนลงจอดอย่างนุ่มนวลบนรันเวย์สนามบิน"
  },
  {
    "id": "v_a1_travel_23",
    "word": "boat",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เรือพายโดยสาร",
    "alternatives": [
      "แพชูชีพ",
      "เรือดำน้ำรบ",
      "เรือบรรทุกน้ำมัน"
    ],
    "example": "We took a wooden longtail boat across the quiet river.",
    "exampleThai": "พวกเรานั่งเรือพายโดยสารหางยาวไม้ข้ามแม่น้ำอันเงียบสงบ"
  },
  {
    "id": "v_a1_travel_24",
    "word": "drive",
    "pos": "v.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ขับขี่ยานยนต์",
    "alternatives": [
      "เดินสำรวจ",
      "พายเรือเล่น",
      "กระโดดข้าม"
    ],
    "example": "Always wear your safety seatbelt whenever you drive a car.",
    "exampleThai": "คาดเข็มขัดนิรภัยเสมอทุกครั้งที่คุณขับขี่ยานยนต์"
  },
  {
    "id": "v_a1_travel_25",
    "word": "passport",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "หนังสือเดินทาง",
    "alternatives": [
      "ใบขับขี่สากล",
      "บัตรประชาชน",
      "วีซ่าท่องเที่ยว"
    ],
    "example": "You must present your valid passport at international immigration counters.",
    "exampleThai": "คุณต้องแสดงหนังสือเดินทางที่ยังไม่หมดอายุ ณ เคาน์เตอร์ตรวจคนเข้าเมืองระหว่างประเทศ"
  },
  {
    "id": "v_a1_travel_26",
    "word": "bag",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "กระเป๋าถือ",
    "alternatives": [
      "กล่องพัสดุ",
      "หีบไม้โบราณ",
      "ถุงพลาสติก"
    ],
    "example": "He slung his lightweight travel shoulder bag over his back.",
    "exampleThai": "เขาสะพายกระเป๋าถือสำหรับการเดินทางน้ำหนักเบาไว้ข้างหลัง"
  },
  {
    "id": "v_a1_travel_27",
    "word": "sea",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ท้องทะเล",
    "alternatives": [
      "แม่น้ำสายหลัก",
      "ทะเลสาบน้ำจืด",
      "น้ำตกจำลอง"
    ],
    "example": "The calm blue sea stretched out to the distant horizon.",
    "exampleThai": "ท้องทะเลสีฟ้าอันเงียบสงบทอดยาวไปจนสุดขอบฟ้าไกลโพ้น"
  },
  {
    "id": "v_a1_travel_28",
    "word": "beach",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ชายหาด",
    "alternatives": [
      "หน้าผาหิน",
      "ยอดเขา",
      "เกาะร้าง"
    ],
    "example": "Children were happily building sandcastles on the sunny white beach.",
    "exampleThai": "เด็กๆ กำลังก่อปราสาททรายอย่างสนุกสนานบนชายหาดสีขาวใต้แสงแดด"
  },
  {
    "id": "v_a1_travel_29",
    "word": "town",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เมืองขนาดเล็ก",
    "alternatives": [
      "มหานครใหญ่",
      "หมู่บ้านชนบท",
      "เขตอุตสาหกรรม"
    ],
    "example": "Hua Hin is a charming seaside town popular with local vacationers.",
    "exampleThai": "หัวหินเป็นเมืองขนาดเล็กริมทะเลที่มีเสน่ห์และเป็นที่นิยมของนักท่องเที่ยวในประเทศ"
  },
  {
    "id": "v_a1_travel_30",
    "word": "city",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "มหานคร",
    "alternatives": [
      "เมืองเล็ก",
      "ชนบทห่างไกล",
      "ป่าสงวน"
    ],
    "example": "Bangkok is a vibrant and bustling capital city full of historic temples.",
    "exampleThai": "กรุงเทพฯ เป็นมหานครหลวงที่มีชีวิตชีวาและคึกคัก เต็มไปด้วยวัดวาอารามเก่าแก่"
  },
  {
    "id": "v_a2_travel_01",
    "word": "luggage",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "สัมภาระเดินทาง",
    "alternatives": [
      "ตั๋วเครื่องบิน",
      "ใบเสร็จโรงแรม",
      "ของฝาก"
    ],
    "example": "Airport handlers loaded all passenger luggage onto the cargo trolley.",
    "exampleThai": "เจ้าหน้าที่สนามบินขนสัมภาระเดินทางของผู้โดยสารทุกคนขึ้นรถเข็นสัมภาระ"
  },
  {
    "id": "v_a2_travel_02",
    "word": "platform",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ชานชาลา",
    "alternatives": [
      "รางรถไฟ",
      "ห้องขายตั๋ว",
      "ทางเดินยกระดับ"
    ],
    "example": "The bullet train for Osaka will depart from platform number four.",
    "exampleThai": "รถไฟหัวกระสุนไปโอซาก้าจะออกจากชานชาลาหมายเลขสี่"
  },
  {
    "id": "v_a2_travel_03",
    "word": "passenger",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ผู้โดยสาร",
    "alternatives": [
      "คนขับรถ",
      "กระเป๋ารถเมล์",
      "ช่างเครื่อง"
    ],
    "example": "Every seated passenger must fasten their seatbelt before takeoff.",
    "exampleThai": "ผู้โดยสารทุกคนที่นั่งประจำที่ต้องรัดเข็มขัดนิรภัยก่อนเครื่องบินขึ้น"
  },
  {
    "id": "v_a2_travel_04",
    "word": "journey",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การเดินทางไกล",
    "alternatives": [
      "การแวะพัก",
      "การจองตั๋ว",
      "การเดินทางรอบเมือง"
    ],
    "example": "Our road journey across the countryside took roughly six peaceful hours.",
    "exampleThai": "การเดินทางไกลข้ามชนบทของเราใช้เวลาประมาณหกชั่วโมงอันแสนสงบ"
  },
  {
    "id": "v_a2_travel_05",
    "word": "suitcase",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "กระเป๋าเดินทางล้อลาก",
    "alternatives": [
      "เป้สะพายหลัง",
      "ถุงผ้าช้อปปิ้ง",
      "กระเป๋าสตางค์"
    ],
    "example": "She packed warm jackets and sturdy shoes into her large rolling suitcase.",
    "exampleThai": "เธอจัดเสื้อแจ็คเก็ตหนาและรองเท้าที่ทนทานลงในกระเป๋าเดินทางล้อลากใบใหญ่"
  },
  {
    "id": "v_a2_travel_06",
    "word": "delayed",
    "pos": "adj.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ล่าช้ากว่ากำหนด",
    "alternatives": [
      "ตรงต่อเวลา",
      "ยกเลิกถาวร",
      "มาถึงก่อนเวลา"
    ],
    "example": "Due to heavy thunderstorms, our morning flight was delayed by two hours.",
    "exampleThai": "เนื่องจากพายุฝนฟ้าคะนองรุนแรง เที่ยวบินเช้าของเราจึงล่าช้ากว่ากำหนดสองชั่วโมง"
  },
  {
    "id": "v_a2_travel_07",
    "word": "departure",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เที่ยวขาออก",
    "alternatives": [
      "เที่ยวขาเข้า",
      "การเปลี่ยนเครื่อง",
      "การยกเลิกไฟลต์"
    ],
    "example": "Passengers should check the digital departure board for final gate updates.",
    "exampleThai": "ผู้โดยสารควรตรวจดูหน้าจอดิจิทัลเที่ยวขาออกเพื่อทราบข้อมูลประตูล่าสุด"
  },
  {
    "id": "v_a2_travel_08",
    "word": "arrival",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เที่ยวขาเข้า",
    "alternatives": [
      "เที่ยวขาออก",
      "จุดเช็กอิน",
      "ด่านตรวจค้น"
    ],
    "example": "Families were waiting excitedly in the international arrival hall.",
    "exampleThai": "ครอบครัวต่างๆ กำลังรอคอยอย่างตื่นเต้นในห้องโถงเที่ยวขาเข้าระหว่างประเทศ"
  },
  {
    "id": "v_a2_travel_09",
    "word": "reservation",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การสำรองที่พัก",
    "alternatives": [
      "การยกเลิกห้อง",
      "การขอเงินคืน",
      "การชำระภาษี"
    ],
    "example": "We made an online reservation for a boutique hotel in historic Kyoto.",
    "exampleThai": "พวกเราทำการสำรองที่พักออนไลน์สำหรับโรงแรมบูทีคในเกียวโตเมืองประวัติศาสตร์"
  },
  {
    "id": "v_a2_travel_10",
    "word": "conductor",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "พนักงานตรวจตั๋ว",
    "alternatives": [
      "พนักงานขับรถไฟ",
      "เจ้าหน้าที่รักษาความปลอดภัย",
      "ช่างซ่อมบำรุง"
    ],
    "example": "The polite train conductor punched our tickets as we left the station.",
    "exampleThai": "พนักงานตรวจตั๋วรถไฟผู้สุภาพเจาะตั๋วของเราขณะที่รถไฟเคลื่อนออกจากสถานี"
  },
  {
    "id": "v_a2_travel_11",
    "word": "flight",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เที่ยวบิน",
    "alternatives": [
      "การเดินเรือ",
      "เส้นทางเดินรถ",
      "ขบวนรถไฟ"
    ],
    "example": "Our direct flight from Bangkok to Tokyo took roughly six smooth hours.",
    "exampleThai": "เที่ยวบินตรงจากกรุงเทพฯ ไปโตเกียวของเราใช้เวลาประมาณหกชั่วโมงอย่างราบรื่น"
  },
  {
    "id": "v_a2_travel_12",
    "word": "cancel",
    "pos": "v.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ยกเลิกการเดินทาง",
    "alternatives": [
      "เลื่อนการเดินทาง",
      "ยืนยันที่นั่ง",
      "เพิ่มเที่ยวบิน"
    ],
    "example": "The ferry company had to cancel all trips due to rough sea waves.",
    "exampleThai": "บริษัทเรือข้ามฟากต้องยกเลิกการเดินทางทุกเที่ยวเนื่องจากคลื่นลมทะเลแรงจัด"
  },
  {
    "id": "v_a2_travel_13",
    "word": "single",
    "pos": "adj.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ตั๋วเที่ยวเดียว",
    "alternatives": [
      "ตั๋วไปกลับ",
      "ตั๋วรายเดือน",
      "ตั๋วครอบครัว"
    ],
    "example": "I only need a single bus ticket since my friend will pick me up later.",
    "exampleThai": "ฉันต้องการเพียงตั๋วเที่ยวเดียวเพราะเพื่อนจะขับรถมารับฉันในภายหลัง"
  },
  {
    "id": "v_a2_travel_14",
    "word": "return",
    "pos": "adj.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ตั๋วไปกลับ",
    "alternatives": [
      "ตั๋วเที่ยวเดียว",
      "ตั๋วผ่านประตู",
      "ตั๋วลดราคา"
    ],
    "example": "Buying a return train ticket is generally cheaper than two separate singles.",
    "exampleThai": "การซื้อตั๋วไปกลับรถไฟโดยทั่วไปจะถูกกว่าตั๋วเที่ยวเดียวสองใบแยกกัน"
  },
  {
    "id": "v_a2_travel_15",
    "word": "gate",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ประตูทางออกขึ้นเครื่อง",
    "alternatives": [
      "สายพานรับกระเป๋า",
      "จุดตรวจสัมภาระ",
      "ด่านกักกันโรค"
    ],
    "example": "Please proceed immediately to boarding gate twelve for your flight.",
    "exampleThai": "กรุณาตรงไปยังประตูทางออกขึ้นเครื่องหมายเลขสิบสองสำหรับเที่ยวบินของคุณทันที"
  },
  {
    "id": "v_a2_travel_16",
    "word": "subway",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "รถไฟใต้ดิน",
    "alternatives": [
      "รถรางลอยฟ้า",
      "รถมินิบัส",
      "รถแท็กซี่มิเตอร์"
    ],
    "example": "The Tokyo subway network is exceptionally clean and punctual.",
    "exampleThai": "โครงข่ายรถไฟใต้ดินในโตเกียวสะอาดเป็นพิเศษและตรงต่อเวลาอย่างยิ่ง"
  },
  {
    "id": "v_a2_travel_17",
    "word": "timetable",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ตารางเวลาเดินรถ",
    "alternatives": [
      "แผนผังเส้นทาง",
      "ใบเสร็จค่าตั๋ว",
      "คู่มือท่องเที่ยว"
    ],
    "example": "Always check the weekend bus timetable before planning your day trip.",
    "exampleThai": "ตรวจดูตารางเวลาเดินรถโดยสารประจำทางช่วงวันหยุดสุดสัปดาห์เสมอก่อนวางแผนไปเที่ยว"
  },
  {
    "id": "v_a2_travel_18",
    "word": "tourist",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "นักท่องเที่ยว",
    "alternatives": [
      "ผู้อยู่อาศัยในพื้นที่",
      "เจ้าหน้าที่ตรวจคนเข้าเมือง",
      "พ่อค้าแม่ขาย"
    ],
    "example": "Millions of tourists visit famous historical temples in Ayutthaya annually.",
    "exampleThai": "นักท่องเที่ยวหลายล้านคนเดินทางมาชมวัดวาอารามประวัติศาสตร์ชื่อดังในอยุธยาทุกปี"
  },
  {
    "id": "v_a2_travel_19",
    "word": "sight",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "สถานที่น่าเที่ยวชม",
    "alternatives": [
      "โรงแรมหรูหรา",
      "ห้างสรรพสินค้า",
      "ย่านที่พักอาศัย"
    ],
    "example": "The Eiffel Tower is certainly the most iconic sight in Paris.",
    "exampleThai": "หอไอเฟลเป็นสถานที่น่าเที่ยวชมที่โดดเด่นและเป็นเอกลักษณ์ที่สุดในปารีสอย่างแน่นอน"
  },
  {
    "id": "v_a2_travel_20",
    "word": "guide",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "มัคคุเทศก์",
    "alternatives": [
      "คนขับเรือ",
      "ผู้จัดการโรงแรม",
      "คนขายของที่ระลึก"
    ],
    "example": "Our knowledgeable tour guide explained the history of Angkor Wat in detail.",
    "exampleThai": "มัคคุเทศก์ผู้มีความรู้ของเราอธิบายประวัติศาสตร์ของนครวัดอย่างละเอียดลึกซึ้ง"
  },
  {
    "id": "v_a2_travel_21",
    "word": "souvenir",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ของที่ระลึก",
    "alternatives": [
      "อาหารสด",
      "เอกสารเดินทาง",
      "เงินตราต่างประเทศ"
    ],
    "example": "I bought a small handcrafted wooden elephant as a souvenir from Chiang Mai.",
    "exampleThai": "ฉันซื้อช้างไม้แกะสลักทำมือตัวเล็กๆ เป็นของที่ระลึกจากเชียงใหม่"
  },
  {
    "id": "v_a2_travel_22",
    "word": "pack",
    "pos": "v.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "จัดกระเป๋า",
    "alternatives": [
      "รื้อค้นสิ่งของ",
      "ซื้อกระเป๋าใหม่",
      "ทำความสะอาดห้อง"
    ],
    "example": "Remember to pack sunscreen and swimming goggles for our island holiday.",
    "exampleThai": "อย่าลืมจัดกระเป๋าโดยใส่ครีมกันแดดและแว่นว่ายน้ำสำหรับวันหยุดบนเกาะของเรา"
  },
  {
    "id": "v_a2_travel_23",
    "word": "board",
    "pos": "v.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ขึ้นยานพาหนะ",
    "alternatives": [
      "ลงจากรถ",
      "จองที่นั่ง",
      "ยกเลิกตั๋ว"
    ],
    "example": "Passengers with infant children are invited to board the plane first.",
    "exampleThai": "ผู้โดยสารที่มีเด็กทารกได้รับเชิญให้ขึ้นยานพาหนะเครื่องบินเป็นกลุ่มแรก"
  },
  {
    "id": "v_a2_travel_24",
    "word": "highway",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ทางหลวงสายหลัก",
    "alternatives": [
      "ทางเดินเท้า",
      "ซอยในหมู่บ้าน",
      "เส้นทางเลียบคลอง"
    ],
    "example": "The toll highway cuts driving time between the two major cities in half.",
    "exampleThai": "ทางหลวงสายหลักที่มีด่านเก็บค่าผ่านทางช่วยลดเวลาขับรถระหว่างสองเมืองใหญ่ลงครึ่งหนึ่ง"
  },
  {
    "id": "v_a2_travel_25",
    "word": "traffic",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การจราจรบนท้องถนน",
    "alternatives": [
      "สภาพอากาศฝนตก",
      "มลพิษทางอากาศ",
      "ความเร็วลม"
    ],
    "example": "Heavy rush hour traffic delayed many commuters in downtown Bangkok.",
    "exampleThai": "การจราจรบนท้องถนนที่หนาแน่นช่วงชั่วโมงเร่งด่วนทำให้ผู้เดินทางในกรุงเทพฯ ช้าไปตามกัน"
  },
  {
    "id": "v_a2_travel_26",
    "word": "crossroad",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ทางแยกสี่แยก",
    "alternatives": [
      "วงเวียนจราจร",
      "ทางตัน",
      "สะพานลอย"
    ],
    "example": "Carefully look both ways before turning left at the busy crossroad.",
    "exampleThai": "มองซ้ายขวาอย่างรอบคอบก่อนเลี้ยวซ้ายตรงทางแยกสี่แยกที่พลุกพล่าน"
  },
  {
    "id": "v_a2_travel_27",
    "word": "bridge",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "สะพานข้ามแม่น้ำ",
    "alternatives": [
      "อุโมงค์ลอดใต้ดิน",
      "เขื่อนกักเก็บน้ำ",
      "ท่าเทียบเรือ"
    ],
    "example": "The suspension bridge provides breathtaking panoramic views of the river harbor.",
    "exampleThai": "สะพานข้ามแม่น้ำแบบแขวนให้ทัศนียภาพกว้างไกลอันตระการตาของท่าเรือริมแม่น้ำ"
  },
  {
    "id": "v_b1_travel_01",
    "word": "destination",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "จุดหมายปลายทาง",
    "alternatives": [
      "จุดเริ่มต้นเดินทาง",
      "จุดแวะพักเติมน้ำมัน",
      "ทางเลี่ยงเมือง"
    ],
    "example": "Phuket remains the top tropical destination for international holidaymakers.",
    "exampleThai": "ภูเก็ตยังคงเป็นจุดหมายปลายทางเมืองร้อนยอดนิยมอันดับหนึ่งสำหรับนักท่องเที่ยวทั่วโลก"
  },
  {
    "id": "v_b1_travel_02",
    "word": "commute",
    "pos": "v.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เดินทางไปกลับที่ทำงาน",
    "alternatives": [
      "ย้ายที่อยู่อาศัย",
      "ไปท่องเที่ยวต่างแดน",
      "ทำงานจากที่บ้าน"
    ],
    "example": "Thousands of office workers commute into central London by train daily.",
    "exampleThai": "พนักงานออฟฟิศหลายพันคนเดินทางไปกลับที่ทำงานในใจกลางลอนดอนด้วยรถไฟทุกวัน"
  },
  {
    "id": "v_b1_travel_03",
    "word": "itinerary",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "กำหนดการเดินทาง",
    "alternatives": [
      "ใบเสร็จค่าใช้จ่าย",
      "บัตรโดยสารรถไฟ",
      "สมุดคู่มือภาษา"
    ],
    "example": "Our travel agency drafted an exciting ten-day European tour itinerary.",
    "exampleThai": "บริษัททัวร์ของเราได้ร่างกำหนดการเดินทางท่องเที่ยวทั่วยุโรปสิบวันที่น่าตื่นเต้น"
  },
  {
    "id": "v_b1_travel_04",
    "word": "transportation",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ระบบขนส่งมวลชน",
    "alternatives": [
      "การสื่อสารโทรคมนาคม",
      "การจัดส่งสินค้าด่วน",
      "การบำรุงรักษาถนน"
    ],
    "example": "Public transportation in Singapore is extraordinarily efficient and affordable.",
    "exampleThai": "ระบบขนส่งมวลชนสาธารณะในสิงคโปร์มีประสิทธิภาพสูงเป็นพิเศษและราคาย่อมเยา"
  },
  {
    "id": "v_b1_travel_05",
    "word": "accommodation",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ที่พักแรม",
    "alternatives": [
      "การเดินทางท่องเที่ยว",
      "ตั๋วโดยสารรวม",
      "ร้านอาหารท้องถิ่น"
    ],
    "example": "Finding budget accommodation during peak holiday seasons can be challenging.",
    "exampleThai": "การหาที่พักแรมราคาย่อมเยาในช่วงฤดูท่องเที่ยวหนาแน่นอาจเป็นเรื่องท้าทาย"
  },
  {
    "id": "v_b1_travel_06",
    "word": "vehicle",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ยานพาหนะ",
    "alternatives": [
      "เครื่องกำเนิดไฟฟ้า",
      "อุปกรณ์สื่อสาร",
      "เครื่องมือช่าง"
    ],
    "example": "Zero-emission electric vehicles are replacing older diesel buses across capital cities.",
    "exampleThai": "ยานพาหนะไฟฟ้าที่ไร้มลพิษกำลังเข้ามาแทนที่รถบัสดีเซลรุ่นเก่าทั่วเมืองหลวงต่างๆ"
  },
  {
    "id": "v_b1_travel_07",
    "word": "border",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "พรมแดนประเทศ",
    "alternatives": [
      "ใจกลางเมือง",
      "ท่าเรือน้ำลึก",
      "เขตการค้าเสรี"
    ],
    "example": "Trucks queued up for customs inspection at the international land border.",
    "exampleThai": "รถบรรทุกเข้าแถวรอการตรวจศุลกากร ณ ด่านพรมแดนประเทศทางบกระหว่างประเทศ"
  },
  {
    "id": "v_b1_travel_08",
    "word": "terminal",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "อาคารผู้โดยสาร",
    "alternatives": [
      "หอบังคับการบิน",
      "ลานจอดเครื่องบิน",
      "ศูนย์ซ่อมเครื่องยนต์"
    ],
    "example": "Terminal 2 handles domestic departures for budget airline carriers.",
    "exampleThai": "อาคารผู้โดยสารหลังที่สองรองรับเที่ยวบินขาออกภายในประเทศสำหรับสายการบินต้นทุนต่ำ"
  },
  {
    "id": "v_b1_travel_09",
    "word": "domestic",
    "pos": "adj.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ภายในประเทศ",
    "alternatives": [
      "ระหว่างประเทศ",
      "ข้ามทวีป",
      "นอกเขตแดน"
    ],
    "example": "Domestic flights do not require passengers to clear passport customs gates.",
    "exampleThai": "เที่ยวบินภายในประเทศไม่กำหนดให้ผู้โดยสารต้องผ่านด่านศุลกากรตรวจคนเข้าเมือง"
  },
  {
    "id": "v_b1_travel_10",
    "word": "international",
    "pos": "adj.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ระหว่างประเทศ",
    "alternatives": [
      "ภายในท้องถิ่น",
      "ระดับจังหวัด",
      "เฉพาะภูมิภาค"
    ],
    "example": "All international passengers must carry an unexpired passport and valid entry visa.",
    "exampleThai": "ผู้โดยสารระหว่างประเทศทุกคนต้องพกหนังสือเดินทางที่ยังไม่หมดอายุและวีซ่าเข้าเมืองที่ถูกต้อง"
  },
  {
    "id": "v_b1_travel_11",
    "word": "cruise",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การล่องเรือสำราญ",
    "alternatives": [
      "การเดินทางด้วยรถไฟ",
      "การปีนเขาผจญภัย",
      "การตั้งแคมป์กลางป่า"
    ],
    "example": "The luxury Mediterranean cruise stopped at historic ports in Greece and Italy.",
    "exampleThai": "การล่องเรือสำราญสุดหรูในแถบเมดิเตอร์เรเนียนแวะจอดเทียบท่าประวัติศาสตร์ในกรีซและอิตาลี"
  },
  {
    "id": "v_b1_travel_12",
    "word": "congestion",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การจราจรติดขัดสะสม",
    "alternatives": [
      "การเดินทางที่คล่องตัว",
      "ถนนที่ว่างเปล่า",
      "การก่อสร้างสะพาน"
    ],
    "example": "The city council implemented congestion charges to discourage peak-hour driving.",
    "exampleThai": "สภาเทศบาลเมืองเรียกเก็บค่าธรรมเนียมการจราจรติดขัดสะสมเพื่อลดการขับรถช่วงเวลาเร่งด่วน"
  },
  {
    "id": "v_b1_travel_13",
    "word": "transfer",
    "pos": "v.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เปลี่ยนขบวนเดินทาง",
    "alternatives": [
      "สิ้นสุดการเดินทาง",
      "จองตั๋วเพิ่ม",
      "พักค้างคืน"
    ],
    "example": "Commuters must transfer from the blue subway line to the skytrain at Siam station.",
    "exampleThai": "ผู้เดินทางต้องเปลี่ยนขบวนเดินทางจากรถไฟใต้ดินสายสีน้ำเงินไปยังรถไฟฟ้าที่สถานีสยาม"
  },
  {
    "id": "v_b1_travel_14",
    "word": "route",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เส้นทางสัญจร",
    "alternatives": [
      "จุดจอดรถฉุกเฉิน",
      "อัตราค่าโดยสาร",
      "ชนิดยานพาหนะ"
    ],
    "example": "The scenic coastal driving route offers stunning panoramic cliffs and sandy coves.",
    "exampleThai": "เส้นทางสัญจรเลียบชายฝั่งอันงดงามให้ทิวทัศน์หน้าผาตระการตาและเวิ้งอ่าวหาดทรายขาว"
  },
  {
    "id": "v_b1_travel_15",
    "word": "customs",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ด่านศุลกากร",
    "alternatives": [
      "จุดประชาสัมพันธ์",
      "ห้องรับรองพิเศษ",
      "จุดแลกเปลี่ยนเงินตรา"
    ],
    "example": "Officers at airport customs examined imported luxury goods thoroughly.",
    "exampleThai": "เจ้าหน้าที่ ณ ด่านศุลกากรตรวจคนเข้าเมืองของสนามบินตรวจสอบสินค้านำเข้าหรูหราอย่างละเอียด"
  },
  {
    "id": "v_b1_travel_16",
    "word": "declare",
    "pos": "v.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "สำแดงของเสียภาษี",
    "alternatives": [
      "ซุกซ่อนสัมภาระ",
      "ทิ้งสิ่งของลงถัง",
      "ส่งพัสดุล่วงหน้า"
    ],
    "example": "Travelers must declare agricultural plant products upon landing in Australia.",
    "exampleThai": "นักเดินทางต้องสำแดงสิ่งของต้องห้ามประเภทพืชผลทางการเกษตรเมื่อเดินทางถึงออสเตรเลีย"
  },
  {
    "id": "v_b1_travel_17",
    "word": "expedition",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การเดินทางสำรวจพื้นที่",
    "alternatives": [
      "การพักผ่อนชายทะเล",
      "การช้อปปิ้งในเมือง",
      "การสัมมนาธุรกิจ"
    ],
    "example": "The scientific polar expedition collected crucial ice core samples in Antarctica.",
    "exampleThai": "การเดินทางสำรวจพื้นที่แถบขั้วโลกทางวิทยาศาสตร์ได้เก็บตัวอย่างแกนน้ำแข็งสำคัญในแอนตาร์กติกา"
  },
  {
    "id": "v_b1_travel_18",
    "word": "shortcut",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เส้นทางลัด",
    "alternatives": [
      "ทางอ้อมรอบนอก",
      "ทางปิดปรับปรุง",
      "ทางหลวงเก็บค่าผ่านทาง"
    ],
    "example": "The experienced taxi driver took a quiet back-alley shortcut to avoid the gridlock.",
    "exampleThai": "คนขับแท็กซี่ผู้มีประสบการณ์ใช้เส้นทางลัดในซอยสงบเพื่อหลีกเลี่ยงรถติดขัดสาหัส"
  },
  {
    "id": "v_b2_travel_01",
    "word": "layover",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การหยุดพักรอต่อเครื่อง",
    "alternatives": [
      "เที่ยวบินตรงดิ่ง",
      "การยกเลิกการเดินทาง",
      "การตกเครื่องบิน"
    ],
    "example": "During our eight-hour Doha layover, we toured the famous Museum of Islamic Art.",
    "exampleThai": "ระหว่างการหยุดพักรอต่อเครื่องแปดชั่วโมงที่โดฮา พวกเราได้เที่ยวชมพิพิธภัณฑ์ศิลปะอิสลามชื่อดัง"
  },
  {
    "id": "v_b2_travel_02",
    "word": "wanderlust",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ความหลงใหลในการท่องโลก",
    "alternatives": [
      "ความกลัวการเดินทาง",
      "ความคิดถึงบ้าน",
      "ความเกลียดชังความแปลกใหม่"
    ],
    "example": "Her intense wanderlust drove her to quit her corporate job and backpack across South America.",
    "exampleThai": "ความหลงใหลในการท่องโลกอันแรงกล้าผลักดันให้เธอลาออกจากงานบริษัทแล้วสะพายเป้เที่ยวทั่วอเมริกาใต้"
  },
  {
    "id": "v_b2_travel_03",
    "word": "excursion",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การทัศนศึกษาระยะสั้น",
    "alternatives": [
      "การย้ายถิ่นฐาน",
      "การกักตัว",
      "การเดินทางรอบโลก"
    ],
    "example": "The biology university students took a weekend excursion to study mangrove ecosystems.",
    "exampleThai": "นักศึกษามหาวิทยาลัยภาควิชาชีววิทยาไปร่วมการทัศนศึกษาท่องเที่ยวระยะสั้นเพื่อศึกษาระบบนิเวศป่าชายเลน"
  },
  {
    "id": "v_b2_travel_04",
    "word": "transit",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การเดินทางผ่านแดน",
    "alternatives": [
      "การตั้งถิ่นฐานถาวร",
      "การยื่นขอสัญชาติ",
      "การพักร้อนระยะยาว"
    ],
    "example": "Passengers staying strictly in transit do not need to apply for a standard tourist entry visa.",
    "exampleThai": "ผู้โดยสารที่อยู่เฉพาะในเขตการเดินทางผ่านแดนไม่จำเป็นต้องยื่นขอวีซ่าเข้าเมืองประเภทนักท่องเที่ยวทั่วไป"
  },
  {
    "id": "v_b2_travel_05",
    "word": "embark",
    "pos": "v.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ขึ้นยานพาหนะเดินทาง",
    "alternatives": [
      "ลงจากยานพาหนะ",
      "ยกเลิกการเดินทาง",
      "พักค้างคืน"
    ],
    "example": "Eager passengers prepared to embark on the transatlantic ocean voyage across the sea.",
    "exampleThai": "ผู้โดยสารผู้กระตือรือร้นเตรียมตัวขึ้นยานพาหนะเริ่มต้นการเดินทางข้ามมหาสมุทรแอตแลนติก"
  },
  {
    "id": "v_b2_travel_divert",
    "word": "divert",
    "pos": "v.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เปลี่ยนเส้นทางชั่วคราว",
    "alternatives": [
      "เดินทางตามกำหนดการเดิม",
      "ลงจอดฉุกเฉิน",
      "บินตรงสู่จุดหมาย"
    ],
    "example": "Heavy fog forced air traffic control to divert several incoming flights to a nearby airport.",
    "exampleThai": "หมอกหนาจัดบีบให้เจ้าหน้าที่ควบคุมการจราจรทางอากาศต้องเปลี่ยนเส้นทางชั่วคราวของหลายเที่ยวบินไปยังสนามบินใกล้เคียง"
  },
  {
    "id": "v_b2_travel_07",
    "word": "navigation",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การนำทางและกำหนดทิศทาง",
    "alternatives": [
      "การคาดเดาสภาพอากาศ",
      "การสื่อสารทางวิทยุ",
      "การจัดการสัมภาระ"
    ],
    "example": "Modern marine satellite navigation enables giant cargo ships to cross turbulent oceans safely.",
    "exampleThai": "ระบบการนำทางและกำหนดทิศทางผ่านดาวเทียมทางทะเลสมัยใหม่ช่วยให้เรือสินค้าขนาดใหญ่ข้ามมหาสมุทรได้อย่างปลอดภัย"
  },
  {
    "id": "v_b2_travel_08",
    "word": "stranded",
    "pos": "adj.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ตกค้างไร้ยานพาหนะเดินทาง",
    "alternatives": [
      "เดินทางราบรื่น",
      "ถึงที่หมายล่วงหน้า",
      "ได้รับการอำนวยความสะดวก"
    ],
    "example": "Hundreds of holidaymakers were stranded at the mountain terminal following a severe snow blizzard.",
    "exampleThai": "นักท่องเที่ยวหลายร้อยคนต้องตกค้างไร้ยานพาหนะเดินทาง ณ ท่ารถบนภูเขาหลังเกิดพายุหิมะรุนแรง"
  },
  {
    "id": "v_b2_travel_09",
    "word": "uncharted",
    "pos": "adj.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ที่ยังไม่เคยสำรวจ",
    "alternatives": [
      "ที่มีคนพลุกพล่าน",
      "ที่พัฒนาแล้ว",
      "ที่มีชื่อเสียงระดับโลก"
    ],
    "example": "Pioneering deep-sea ocean explorers sailed through perilous and uncharted polar waters.",
    "exampleThai": "นักสำรวจใต้ทะเลลึกผู้บุกเบิกได้ล่องเรือผ่านน่านน้ำขั้วโลกที่อันตรายและยังไม่เคยปรากฏในแผนที่สำรวจ"
  },
  {
    "id": "v_b2_travel_10",
    "word": "disembark",
    "pos": "v.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ลงจากยานพาหนะ",
    "alternatives": [
      "ขึ้นสู่ยานพาหนะ",
      "จองตั๋วโดยสาร",
      "เปลี่ยนที่นั่ง"
    ],
    "example": "Cruise ship passengers queued on deck five to disembark onto the sunny Greek island.",
    "exampleThai": "ผู้โดยสารเรือสำราญเข้าแถวบนดาดฟ้าชั้นห้าเพื่อลงจากยานพาหนะสู่เกาะกรีซอันอบอุ่นด้วยแสงแดด"
  },
  {
    "id": "v_b2_travel_11",
    "word": "bypass",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ถนนเลี่ยงเมือง",
    "alternatives": [
      "ถนนใจกลางย่านการค้า",
      "ซอยตันในชุมชน",
      "ถนนคนเดินวันหยุด"
    ],
    "example": "Constructing the four-lane western bypass relieved intense truck traffic through the old town.",
    "exampleThai": "การสร้างถนนเลี่ยงเมืองฝั่งตะวันตกขนาดสี่ช่องจราจรช่วยบรรเทาการจราจรของรถบรรทุกผ่านเขตเมืองเก่า"
  },
  {
    "id": "v_b2_travel_12",
    "word": "freight",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "สินค้าขนส่งเชิงพาณิชย์",
    "alternatives": [
      "สัมภาระติดตัวผู้โดยสาร",
      "กระเป๋าถือส่วนบุคคล",
      "ของฝากนักท่องเที่ยว"
    ],
    "example": "Heavy railway locomotives haul tons of industrial freight across the North American continent.",
    "exampleThai": "หัวรถจักรขบวนรถไฟขนาดใหญ่ลากจูงสินค้าขนส่งเชิงพาณิชย์ทางอุตสาหกรรมหลายตันข้ามทวีปอเมริกาเหนือ"
  },
  {
    "id": "v_b2_travel_13",
    "word": "logistics",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ระบบการจัดการขนส่งและห่วงโซ่อุปทาน",
    "alternatives": [
      "การทำการตลาดออนไลน์",
      "การออกแบบตกแต่งภายใน",
      "การประชาสัมพันธ์องค์กร"
    ],
    "example": "E-commerce giants invest billions into automated warehouses to optimize delivery logistics.",
    "exampleThai": "บริษัทยักษ์ใหญ่อีคอมเมิร์ซลงทุนหลายพันล้านในคลังสินค้าอัตโนมัติเพื่อเพิ่มประสิทธิภาพระบบการจัดการขนส่งและห่วงโซ่อุปทาน"
  },
  {
    "id": "v_b2_travel_14",
    "word": "bottleneck",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "จุดคอขวดกีดขวางการจราจร",
    "alternatives": [
      "ทางด่วนโล่งโปร่ง",
      "ลานจอดรถกว้างขวาง",
      "สะพานเชื่อมสองฝั่ง"
    ],
    "example": "The narrow one-lane suspension bridge creates a severe traffic bottleneck every evening.",
    "exampleThai": "สะพานแขวนช่องทางเดียวที่แคบสร้างจุดคอขวดกีดขวางการจราจรอย่างรุนแรงในทุกเย็น"
  },
  {
    "id": "v_b2_travel_navigate",
    "word": "navigate",
    "pos": "v.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "นำทางค้นหาเส้นทาง",
    "alternatives": [
      "หลงทางในป่า",
      "หยุดนิ่งอยู่กับที่",
      "ละทิ้งยานพาหนะ"
    ],
    "example": "Captains rely on advanced radar and sonar technology to navigate hazardous coastal reefs.",
    "exampleThai": "กัปตันพึ่งพาเทคโนโลยีเรดาร์และโซนาร์ขั้นสูงเพื่อนำทางค้นหาเส้นทางผ่านแนวปะการังชายฝั่งที่อันตราย"
  },
  {
    "id": "v_b2_travel_16",
    "word": "visa",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "วีซ่าเข้าเมือง",
    "alternatives": [
      "ตั๋วเครื่องบิน",
      "ใบขับขี่สากล",
      "บัตรเครดิต"
    ],
    "example": "Working professionals must secure a sponsored business visa before taking up overseas employment.",
    "exampleThai": "คนทำงานมืออาชีพต้องได้รับเอกสารตราประทับตรวจลงตราเข้าเมืองประเภทธุรกิจก่อนเริ่มทำงานในต่างประเทศ"
  },
  {
    "id": "v_b2_travel_17",
    "word": "maritime",
    "pos": "adj.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เกี่ยวกับการเดินเรือทางทะเล",
    "alternatives": [
      "เกี่ยวกับอวกาศ",
      "เกี่ยวกับทางรถไฟ",
      "เกี่ยวกับการบินพลเรือน"
    ],
    "example": "Singapore and Rotterdam serve as vital global hubs for international maritime trade.",
    "exampleThai": "สิงคโปร์และรอตเทอร์ดัมทำหน้าที่เป็นศูนย์กลางสำคัญระดับโลกสำหรับการค้าเกี่ยวกับการเดินเรือและการพาณิชย์ทางทะเล"
  },
  {
    "id": "v_a1_health_01",
    "word": "head",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ศีรษะ",
    "alternatives": [
      "หัวไหล่",
      "หัวเข่า",
      "ข้อศอก"
    ],
    "example": "Wear a protective helmet to safeguard your head while biking.",
    "exampleThai": "สวมหมวกนิรภัยเพื่อปกป้องศีรษะของคุณขณะปั่นจักรยาน"
  },
  {
    "id": "v_a1_health_02",
    "word": "eye",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ดวงตา",
    "alternatives": [
      "ใบหู",
      "จมูก",
      "ริมฝีปาก"
    ],
    "example": "She has bright brown eyes and wears reading glasses.",
    "exampleThai": "เธอมีดวงตาสีน้ำตาลสดใสและสวมแว่นอ่านหนังสือ"
  },
  {
    "id": "v_a1_health_03",
    "word": "ear",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ใบหู",
    "alternatives": [
      "ลำคอ",
      "จมูก",
      "แก้ม"
    ],
    "example": "Rabbits have long soft ears that turn toward sounds.",
    "exampleThai": "กระต่ายมีใบหูยาวนุ่มที่หันไปตามทิศทางของเสียง"
  },
  {
    "id": "v_a1_health_04",
    "word": "nose",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "จมูก",
    "alternatives": [
      "คาง",
      "หน้าผาก",
      "ริมฝีปาก"
    ],
    "example": "Dogs have an amazing nose that can smell distant scents.",
    "exampleThai": "สุนัขมีจมูกที่มหัศจรรย์ซึ่งสามารถดมกลิ่นได้จากระยะไกล"
  },
  {
    "id": "v_a1_health_05",
    "word": "mouth",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ริมฝีปากและช่องปาก",
    "alternatives": [
      "ดวงตา",
      "ใบหู",
      "ลำคอ"
    ],
    "example": "Open your mouth wide so the dentist can inspect your teeth.",
    "exampleThai": "อ้าปากให้กว้างเพื่อให้ทันตแพทย์สามารถตรวจดูฟันของคุณได้"
  },
  {
    "id": "v_a1_health_06",
    "word": "hand",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "มือ",
    "alternatives": [
      "เท้า",
      "หัวเข่า",
      "ข้อศอก"
    ],
    "example": "Wash your hands thoroughly with antibacterial soap before lunch.",
    "exampleThai": "ล้างมือของคุณให้สะอาดด้วยสบู่ฆ่าเชื้อแบคทีเรียก่อนอาหารกลางวัน"
  },
  {
    "id": "v_a1_health_07",
    "word": "foot",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เท้า",
    "alternatives": [
      "ฝ่ามือ",
      "หัวเข่า",
      "หน้าแข้ง"
    ],
    "example": "He stepped on a sharp pebble and hurt his bare foot.",
    "exampleThai": "เขาเหยียบลงบนกรวดแหลมคมจนเจ็บเท้าเปล่าของเขา"
  },
  {
    "id": "v_a1_health_08",
    "word": "leg",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เรียวขา",
    "alternatives": [
      "ท่อนแขน",
      "หัวไหล่",
      "แผ่นหลัง"
    ],
    "example": "Running five miles strengthens your leg muscles considerably.",
    "exampleThai": "การวิ่งห้าไมล์ช่วยเสริมสร้างกล้ามเนื้อเรียวขาของคุณได้อย่างมาก"
  },
  {
    "id": "v_a1_health_09",
    "word": "arm",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ท่อนแขน",
    "alternatives": [
      "เรียวขา",
      "ลำตัว",
      "ต้นคอ"
    ],
    "example": "The athlete raised his muscular arms in triumphant victory.",
    "exampleThai": "นักกีฬายกท่อนแขนอันเต็มไปด้วยกล้ามเนื้อขึ้นเพื่อฉลองชัยชนะ"
  },
  {
    "id": "v_a1_health_10",
    "word": "finger",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "นิ้วมือ",
    "alternatives": [
      "นิ้วเท้า",
      "ข้อมือ",
      "ข้อศอก"
    ],
    "example": "She wears a shining silver ring on her left ring finger.",
    "exampleThai": "เธอสวมแหวนเงินแวววาวบนนิ้วมือนางข้างซ้ายของเธอ"
  },
  {
    "id": "v_a1_health_11",
    "word": "doctor",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "แพทย์",
    "alternatives": [
      "พยาบาล",
      "เภสัชกร",
      "ผู้ช่วยพยาบาล"
    ],
    "example": "The doctor examined my throat and prescribed antibiotic syrup.",
    "exampleThai": "แพทย์ตรวจดูคอของฉันและสั่งยาน้ำปฏิชีวนะให้"
  },
  {
    "id": "v_a1_health_12",
    "word": "nurse",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "พยาบาล",
    "alternatives": [
      "แพทย์",
      "ทันตแพทย์",
      "นักกายภาพ"
    ],
    "example": "The kind hospital nurse gently bandaged the scraped knee.",
    "exampleThai": "พยาบาลโรงพยาบาลผู้ใจดีทำแผลและพันผ้าก๊อซที่หัวเข่าถลอกอย่างอ่อนโยน"
  },
  {
    "id": "v_a1_health_13",
    "word": "hospital",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "โรงพยาบาล",
    "alternatives": [
      "คลินิกทำฟัน",
      "ร้านขายยา",
      "สถานีอนามัย"
    ],
    "example": "The new community hospital offers round-the-clock emergency medical services.",
    "exampleThai": "โรงพยาบาลชุมชนแห่งใหม่ให้บริการทางการแพทย์ฉุกเฉินตลอด 24 ชั่วโมง"
  },
  {
    "id": "v_a1_health_14",
    "word": "sick",
    "pos": "adj.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ป่วยไข้",
    "alternatives": [
      "แข็งแรง",
      "กระปรี้กระเปร่า",
      "สดชื่น"
    ],
    "example": "He stayed home from school today because he felt sick.",
    "exampleThai": "เขาหยุดอยู่บ้านไม่ไปโรงเรียนวันนี้เพราะรู้สึกป่วยไข้"
  },
  {
    "id": "v_a1_health_15",
    "word": "hurt",
    "pos": "v.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เจ็บปวด",
    "alternatives": [
      "หายดี",
      "แข็งแรงขึ้น",
      "ผ่อนคลาย"
    ],
    "example": "My lower back really hurts after lifting those heavy boxes.",
    "exampleThai": "หลังส่วนล่างของฉันรู้สึกเจ็บปวดจริงๆ หลังจากยกกล่องหนักๆ เหล่านั้น"
  },
  {
    "id": "v_a1_health_16",
    "word": "body",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ร่างกายมนุษย์",
    "alternatives": [
      "จิตใจ",
      "เสื้อผ้า",
      "สิ่งแวดล้อม"
    ],
    "example": "Drinking pure water helps your body flush out toxins naturally.",
    "exampleThai": "การดื่มน้ำบริสุทธิ์ช่วยให้ร่างกายมนุษย์ขับสารพิษออกได้อย่างเป็นธรรมชาติ"
  },
  {
    "id": "v_a1_health_17",
    "word": "hair",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เส้นผม",
    "alternatives": [
      "ขนคิ้ว",
      "ขนตา",
      "หนวดเครา"
    ],
    "example": "She brushed her long black hair neatly before the job interview.",
    "exampleThai": "เธอหวีเส้นผมยาวสีดำของเธออย่างเรียบร้อยก่อนไปสัมภาษณ์งาน"
  },
  {
    "id": "v_a1_health_18",
    "word": "face",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ใบหน้า",
    "alternatives": [
      "แผ่นหลัง",
      "หน้าอก",
      "ลำคอ"
    ],
    "example": "A warm and radiant smile lit up her whole face.",
    "exampleThai": "รอยยิ้มอันอบอุ่นและเปล่งปลั่งสว่างขึ้นทั่วใบหน้าของเธอ"
  },
  {
    "id": "v_a1_health_19",
    "word": "tooth",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ฟัน",
    "alternatives": [
      "เหงือก",
      "ลิ้น",
      "กระพุ้งแก้ม"
    ],
    "example": "The little boy lost his first baby tooth yesterday evening.",
    "exampleThai": "เด็กชายตัวน้อยทำฟันน้ำนมซี่แรกหลุดเมื่อเย็นวานนี้"
  },
  {
    "id": "v_a1_health_20",
    "word": "sleep",
    "pos": "v.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "นอนหลับ",
    "alternatives": [
      "ตื่นนอน",
      "ออกกำลังกาย",
      "อ่านหนังสือ"
    ],
    "example": "Adults need to sleep at least seven peaceful hours each night.",
    "exampleThai": "ผู้ใหญ่จำเป็นต้องนอนหลับอย่างสงบอย่างน้อยเจ็ดชั่วโมงในแต่ละคืน"
  },
  {
    "id": "v_a1_health_21",
    "word": "rest",
    "pos": "v.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "พักผ่อนหย่อนใจ",
    "alternatives": [
      "ทำงานหนัก",
      "วิ่งมาราธอน",
      "ยกของหนัก"
    ],
    "example": "Sit down on this comfortable bench and rest your tired legs.",
    "exampleThai": "นั่งลงบนม้านั่งอันแสนสบายนี้และพักผ่อนหย่อนใจเรียวขาที่เมื่อยล้าของคุณ"
  },
  {
    "id": "v_a1_health_22",
    "word": "clean",
    "pos": "adj.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "สะอาดถูกสุขอนามัย",
    "alternatives": [
      "สกปรกเปรอะเปื้อน",
      "มีฝุ่นหนา",
      "มีกลิ่นอับ"
    ],
    "example": "Always dry your hands with a clean disposable paper towel.",
    "exampleThai": "เช็ดมือของคุณให้แห้งด้วยกระดาษเช็ดมือที่สะอาดถูกสุขอนามัยเสมอ"
  },
  {
    "id": "v_a1_health_23",
    "word": "wash",
    "pos": "v.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ชะล้างทำความสะอาด",
    "alternatives": [
      "ปนเปื้อน",
      "ทำให้เปียกชื้น",
      "ขยี้ตา"
    ],
    "example": "Remember to wash fresh apples thoroughly under running tap water.",
    "exampleThai": "อย่าลืมชะล้างทำความสะอาดผลแอปเปิลสดใต้ก๊อกน้ำไหลอย่างทั่วถึง"
  },
  {
    "id": "v_a1_health_24",
    "word": "cold",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "โรคหวัดธรรมดา",
    "alternatives": [
      "ไข้เลือดออก",
      "โรคหอบหืด",
      "โรคกระเพาะ"
    ],
    "example": "Drink lots of warm lemon water whenever you catch a common cold.",
    "exampleThai": "ดื่มน้ำมะนาวอุ่นมากๆ ทุกครั้งที่คุณเป็นโรคหวัดธรรมดา"
  },
  {
    "id": "v_a1_health_25",
    "word": "fever",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการตัวร้อนมีไข้",
    "alternatives": [
      "อาการหนาวสั่น",
      "อาการคันผิวหนัง",
      "อาการหูอื้อ"
    ],
    "example": "The digital thermometer showed that she had a mild fever.",
    "exampleThai": "ปรอทวัดไข้ดิจิทัลแสดงว่าเธอมีอาการตัวร้อนมีไข้ต่ำๆ"
  },
  {
    "id": "v_a1_health_26",
    "word": "pain",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ความเจ็บปวด",
    "alternatives": [
      "ความสุขสบาย",
      "ความผ่อนคลาย",
      "ความง่วงนอน"
    ],
    "example": "This pain reliever pill will help soothe your throbbing ankle.",
    "exampleThai": "ยาแก้ปวดเม็ดนี้จะช่วยบรรเทาความเจ็บปวดที่ข้อเท้าตุบๆ ของคุณ"
  },
  {
    "id": "v_a1_health_27",
    "word": "strong",
    "pos": "adj.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "แข็งแรงสมบูรณ์",
    "alternatives": [
      "อ่อนแอขี้โรค",
      "เหนื่อยง่าย",
      "ผอมโซ"
    ],
    "example": "Eating balanced meals and exercising keeps your muscles strong.",
    "exampleThai": "การกินอาหารครบหมวดหมู่และออกกำลังกายทำให้กล้ามเนื้อแข็งแรงสมบูรณ์"
  },
  {
    "id": "v_a1_health_28",
    "word": "tired",
    "pos": "adj.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เหน็ดเหนื่อย",
    "alternatives": [
      "สดชื่นกระปรี้กระเปร่า",
      "หิวโซ",
      "อิ่มเอมใจ"
    ],
    "example": "After working all afternoon in the garden, he was very tired.",
    "exampleThai": "หลังจากทำงานทั้งบ่ายในสวน เขาก็เหน็ดเหนื่อยเมื่อยล้ามาก"
  },
  {
    "id": "v_a1_health_29",
    "word": "well",
    "pos": "adj.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "มีสุขภาพดี",
    "alternatives": [
      "ล้มป่วย",
      "ซึมเศร้า",
      "ทรุดโทรม"
    ],
    "example": "I am feeling completely well again after resting over the weekend.",
    "exampleThai": "ฉันกลับมารู้สึกมีสุขภาพดีอย่างสมบูรณ์อีกครั้งหลังจากได้พักผ่อนช่วงสุดสัปดาห์"
  },
  {
    "id": "v_a1_health_30",
    "word": "medicine",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ยารักษาโรค",
    "alternatives": [
      "อาหารเสริม",
      "เครื่องสำอาง",
      "สารแต่งกลิ่น"
    ],
    "example": "Take this cough medicine twice daily after meals as directed.",
    "exampleThai": "รับประทานยารักษาโรคแก้ไอขนานนี้วันละสองครั้งหลังอาหารตามคำแนะนำ"
  },
  {
    "id": "v_a2_health_01",
    "word": "headache",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการปวดศีรษะ",
    "alternatives": [
      "อาการปวดท้อง",
      "อาการปวดฟัน",
      "อาการเจ็บคอ"
    ],
    "example": "Staring at the computer monitor all day gave him a throbbing headache.",
    "exampleThai": "การจ้องหน้าจอคอมพิวเตอร์ตลอดทั้งวันทำให้เขามีอาการปวดศีรษะตุบๆ"
  },
  {
    "id": "v_a2_health_02",
    "word": "stomachache",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการปวดท้อง",
    "alternatives": [
      "อาการปวดหู",
      "อาการเจ็บหน้าอก",
      "อาการปวดหลัง"
    ],
    "example": "Eating too much spicy street food caused an uncomfortable stomachache.",
    "exampleThai": "การกินอาหารริมทางรสเผ็ดจัดมากเกินไปทำให้เกิดอาการปวดท้องที่ไม่สบายตัว"
  },
  {
    "id": "v_a2_health_03",
    "word": "toothache",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการปวดฟัน",
    "alternatives": [
      "อาการเจ็บตา",
      "อาการปวดคอ",
      "อาการคันจมูก"
    ],
    "example": "She booked an emergency dental visit because of a severe toothache.",
    "exampleThai": "เธอจองคิวตรวจฟันฉุกเฉินเนื่องจากมีอาการปวดฟันรุนแรง"
  },
  {
    "id": "v_a2_health_04",
    "word": "cough",
    "pos": "v.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ส่งเสียงไอ",
    "alternatives": [
      "จาม",
      "สะอึก",
      "หาวนอน"
    ],
    "example": "Cover your mouth with your elbow whenever you cough.",
    "exampleThai": "ใช้ข้อศอกปิดปากของคุณเสมอทุกครั้งที่คุณส่งเสียงไอ"
  },
  {
    "id": "v_a2_health_05",
    "word": "sneeze",
    "pos": "v.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "จามจากละอองเกสร",
    "alternatives": [
      "ไอแห้ง",
      "สะอึก",
      "บ้วนปาก"
    ],
    "example": "Flower pollen floating in the breeze made him sneeze repeatedly.",
    "exampleThai": "ละอองเกสรดอกไม้ที่ลอยมาตามสายลมทำให้เขาจามจากละอองเกสรซ้ำๆ"
  },
  {
    "id": "v_a2_health_06",
    "word": "sore",
    "pos": "adj.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เจ็บระบม",
    "alternatives": [
      "ชาไร้ความรู้สึก",
      "ผ่อนคลาย",
      "แข็งแรง"
    ],
    "example": "My throat was sore and scratchy after singing for two hours.",
    "exampleThai": "คอของฉันรู้สึกเจ็บระบมและระคายเคืองหลังจากร้องเพลงสองชั่วโมง"
  },
  {
    "id": "v_a2_health_07",
    "word": "clinic",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "สถานพยาบาลคลินิก",
    "alternatives": [
      "ร้านขายแว่นตา",
      "ฟิตเนสเซ็นเตอร์",
      "สปานวดตัว"
    ],
    "example": "Our neighborhood medical clinic is open six days a week.",
    "exampleThai": "สถานพยาบาลคลินิกในละแวกบ้านเราเปิดให้บริการหกวันต่อสัปดาห์"
  },
  {
    "id": "v_a2_health_08",
    "word": "patient",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ผู้ป่วย",
    "alternatives": [
      "นายแพทย์ผู้เชี่ยวชาญ",
      "พยาบาลประจำห้องฉุกเฉิน",
      "เภสัชกรจ่ายยา"
    ],
    "example": "The compassionate physician listened carefully to each patient.",
    "exampleThai": "แพทย์ผู้เปี่ยมด้วยความเห็นอกเห็นใจรับฟังผู้ป่วยที่มารับการรักษาแต่ละคนอย่างตั้งใจ"
  },
  {
    "id": "v_a2_health_09",
    "word": "pharmacy",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ร้านขายยา",
    "alternatives": [
      "ร้านสะดวกซื้อ",
      "ร้านทำฟัน",
      "ห้องแล็บตรวจเลือด"
    ],
    "example": "Take your paper prescription to the licensed pharmacy across the street.",
    "exampleThai": "นำใบสั่งยาไปยื่นที่ร้านขายยาที่มีใบอนุญาตตรงข้ามถนน"
  },
  {
    "id": "v_a2_health_10",
    "word": "bandage",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ผ้าพันแผล",
    "alternatives": [
      "เข็มฉีดยา",
      "ปรอทวัดไข้",
      "หูฟังแพทย์"
    ],
    "example": "The nurse wrapped a clean sterile bandage snugly around the sprained wrist.",
    "exampleThai": "พยาบาลพันผ้าพันแผลปลอดเชื้อผืนสะอาดกระชับรอบข้อมือที่เคล็ด"
  },
  {
    "id": "v_a2_health_11",
    "word": "pill",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ยาเม็ด",
    "alternatives": [
      "เข็มฉีดยา",
      "พลาสเตอร์ปิดแผล",
      "ผ้าพันเคล็ด"
    ],
    "example": "Swallow one vitamin pill with a full glass of lukewarm water.",
    "exampleThai": "กลืนยาเม็ดสำหรับรับประทานวิตามินหนึ่งเม็ดพร้อมน้ำอุ่นเต็มแก้ว"
  },
  {
    "id": "v_a2_health_12",
    "word": "blood",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "โลหิต",
    "alternatives": [
      "น้ำเหลือง",
      "น้ำดี",
      "เหงื่อ"
    ],
    "example": "Donating healthy blood saves lives in critical hospital emergency rooms.",
    "exampleThai": "การบริจาคโลหิตที่แข็งแรงช่วยชีวิตคนในห้องฉุกเฉินของโรงพยาบาลได้มากมาย"
  },
  {
    "id": "v_a2_health_13",
    "word": "heart",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "หัวใจ",
    "alternatives": [
      "ปอด",
      "ตับ",
      "ไต"
    ],
    "example": "Cardio workouts like brisk jogging elevate your heart rate safely.",
    "exampleThai": "การออกกำลังกายแบบคาร์ดิโอเช่นการวิ่งเหยาะๆ ช่วยเพิ่มอัตราการเต้นของหัวใจอย่างปลอดภัย"
  },
  {
    "id": "v_a2_health_14",
    "word": "bone",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "กระดูก",
    "alternatives": [
      "เส้นเอ็น",
      "กล้ามเนื้อ",
      "ผิวหนัง"
    ],
    "example": "Dietary calcium found in milk builds strong and dense bones.",
    "exampleThai": "แคลเซียมจากอาหารที่มีในนมช่วยสร้างกระดูกที่แข็งแรงและแน่นหนา"
  },
  {
    "id": "v_a2_health_15",
    "word": "muscle",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "กล้ามเนื้อ",
    "alternatives": [
      "กระดูก",
      "ข้อต่อ",
      "ไขมันใต้ผิว"
    ],
    "example": "Weightlifting regularly stimulates lean muscle growth and strength.",
    "exampleThai": "การยกน้ำหนักสม่ำเสมอช่วยกระตุ้นการเจริญเติบโตและความแข็งแกร่งของกล้ามเนื้อ"
  },
  {
    "id": "v_a2_health_16",
    "word": "skin",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ผิวหนัง",
    "alternatives": [
      "กล้ามเนื้อชั้นใน",
      "เส้นประสาท",
      "หลอดเลือด"
    ],
    "example": "Apply protective moisturizing lotion to prevent dry cracking skin.",
    "exampleThai": "ทาโลชั่นบำรุงผิวเพื่อป้องกันผิวหนังแห้งแตกกร้าน"
  },
  {
    "id": "v_a2_health_17",
    "word": "dizzy",
    "pos": "adj.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "วิงเวียนศีรษะ",
    "alternatives": [
      "สายตาชัดเจน",
      "สดชื่นแจ่มใส",
      "ตื่นตัว"
    ],
    "example": "Standing up too abruptly caused her to feel temporarily dizzy.",
    "exampleThai": "การลุกขึ้นยืนเร็วเกินไปทำให้เธอรู้สึกวิงเวียนศีรษะชั่วขณะ"
  },
  {
    "id": "v_a2_health_18",
    "word": "bleed",
    "pos": "v.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "มีเลือดไหลออก",
    "alternatives": [
      "แผลสมานตัว",
      "แผลบวมเป่ง",
      "อาการคัน"
    ],
    "example": "Press a clean cotton cloth firmly if the shallow finger cut starts to bleed.",
    "exampleThai": "กดผ้าฝ้ายสะอาดให้แน่นหากรอยบาดตื้นๆ ที่นิ้วเริ่มมีเลือดไหลออก"
  },
  {
    "id": "v_a2_health_19",
    "word": "allergy",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "โรคภูมิแพ้",
    "alternatives": [
      "โรคติดต่อทางเดินหายใจ",
      "โรคความดันโลหิต",
      "โรคหัวใจ"
    ],
    "example": "He suffers from a seasonal pollen allergy every springtime.",
    "exampleThai": "เขาต้องทนทุกข์จากโรคภูมิแพ้ละอองเกสรตามฤดูกาลในทุกช่วงฤดูใบไม้ผลิ"
  },
  {
    "id": "v_a2_health_20",
    "word": "ambulance",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "รถพยาบาลฉุกเฉิน",
    "alternatives": [
      "รถดับเพลิง",
      "รถสายตรวจตำรวจ",
      "รถเก็บขยะ"
    ],
    "example": "The emergency ambulance rushed the accident victim to intensive care.",
    "exampleThai": "รถพยาบาลฉุกเฉินรีบนำตัวผู้ประสบอุบัติเหตุส่งห้องไอซียูอย่างเร่งด่วน"
  },
  {
    "id": "v_a2_health_21",
    "word": "emergency",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เหตุฉุกเฉิน",
    "alternatives": [
      "การนัดหมายตามปกติ",
      "การตรวจสุขภาพประจำปี",
      "การประชุมทั่วไป"
    ],
    "example": "Dial emergency medical dispatch immediately in life-threatening situations.",
    "exampleThai": "โทรหาศูนย์สั่งการเหตุฉุกเฉินทางการแพทย์ทันทีในสถานการณ์อันตรายถึงชีวิต"
  },
  {
    "id": "v_a2_health_22",
    "word": "checkup",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การตรวจสุขภาพประจำปี",
    "alternatives": [
      "การผ่าตัดด่วน",
      "การรักษาในห้องไอซียู",
      "การสั่งยาพิเศษ"
    ],
    "example": "Doctors advise adults to schedule an annual routine health checkup.",
    "exampleThai": "แพทย์แนะนำให้ผู้ใหญ่จัดตารางรับการตรวจสุขภาพประจำปีอย่างสม่ำเสมอ"
  },
  {
    "id": "v_a2_health_23",
    "word": "healthy",
    "pos": "adj.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "สุขภาพดีแข็งแรง",
    "alternatives": [
      "ขี้โรค",
      "อิดโรย",
      "ซูบผอม"
    ],
    "example": "Daily brisk walking and balanced meals promote a healthy long life.",
    "exampleThai": "การเดินเร็วทุกวันและมื้ออาหารที่สมดุลช่วยส่งเสริมชีวิตที่สุขภาพดีแข็งแรงและยืนยาว"
  },
  {
    "id": "v_a2_health_24",
    "word": "dentist",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ทันตแพทย์",
    "alternatives": [
      "จักษุแพทย์",
      "ศัลยแพทย์กระดูก",
      "กุมารแพทย์"
    ],
    "example": "Visit your licensed dentist every six months to clean tartar buildup.",
    "exampleThai": "ไปพบทันตแพทย์ที่มีใบอนุญาตทุกหกเดือนเพื่อขูดหินปูนสะสม"
  },
  {
    "id": "v_a2_health_25",
    "word": "recover",
    "pos": "v.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ฟื้นฟูสุขภาพจนหายดี",
    "alternatives": [
      "ทรุดหนักลง",
      "ติดเชื้อซ้ำซ้อน",
      "หมดสติ"
    ],
    "example": "With proper rest and medication, the patient will recover within a week.",
    "exampleThai": "ด้วยการพักผ่อนอย่างเพียงพอและยาที่เหมาะสม ผู้ป่วยจะฟื้นฟูสุขภาพจนหายดีภายในหนึ่งสัปดาห์"
  },
  {
    "id": "v_a2_health_26",
    "word": "wound",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "บาดแผลเปิด",
    "alternatives": [
      "รอยฟกช้ำ",
      "แผลเป็นเก่า",
      "ผื่นคัน"
    ],
    "example": "Clean the surface wound with antiseptic liquid to prevent nasty bacterial infection.",
    "exampleThai": "ล้างทำความสะอาดบาดแผลเปิดด้วยน้ำยาฆ่าเชื้อเพื่อป้องกันการติดเชื้อแบคทีเรีย"
  },
  {
    "id": "v_a2_health_27",
    "word": "crutch",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ไม้ค้ำยันช่วยพยุง",
    "alternatives": [
      "เก้าอี้รถเข็น",
      "เตียงผู้ป่วย",
      "เฝือกดามกระดูก"
    ],
    "example": "He used a pair of aluminum crutches to walk after twisting his knee.",
    "exampleThai": "เขาใช้ไม้ค้ำยันช่วยพยุงอะลูมิเนียมหนึ่งคู่ในการเดินหลังจากข้อเข่าบิด"
  },
  {
    "id": "v_b1_health_01",
    "word": "symptom",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการของโรค",
    "alternatives": [
      "สาเหตุของโรค",
      "การวินิจฉัยโรค",
      "ยาต้านไวรัส"
    ],
    "example": "A persistent dry cough is a common early symptom of respiratory viruses.",
    "exampleThai": "อาการไอแห้งต่อเนื่องเป็นอาการของโรคขั้นแรกที่พบบ่อยของไวรัสระบบทางเดินหายใจ"
  },
  {
    "id": "v_b1_health_02",
    "word": "diagnosis",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การวินิจฉัยโรค",
    "alternatives": [
      "การผ่าตัดด่วน",
      "การสั่งยาแก้ปวด",
      "การฉีดวัคซีน"
    ],
    "example": "The senior specialist confirmed the clinical diagnosis using advanced MRI scans.",
    "exampleThai": "แพทย์ผู้เชี่ยวชาญอาวุโสยืนยันการวินิจฉัยโรคทางคลินิกโดยใช้ผลการสแกนด้วยเครื่องเอ็มอาร์ไอชั้นสูง"
  },
  {
    "id": "v_b1_health_03",
    "word": "prescription",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ใบสั่งยาจากแพทย์",
    "alternatives": [
      "ใบรับรองแพทย์",
      "ใบเสร็จค่ารักษา",
      "บัตรนัดตรวจ"
    ],
    "example": "You cannot purchase strong antibiotics without an official doctor prescription.",
    "exampleThai": "คุณไม่สามารถซื้อยาปฏิชีวนะที่มีฤทธิ์แรงได้โดยไม่มีใบสั่งยาจากแพทย์อย่างเป็นทางการ"
  },
  {
    "id": "v_b1_health_04",
    "word": "infection",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การติดเชื้อโรค",
    "alternatives": [
      "การสมานแผล",
      "ภูมิแพ้ตามฤดูกาล",
      "ความดันโลหิต"
    ],
    "example": "Antiseptic creams help protect open surgical cuts from dangerous bacterial infection.",
    "exampleThai": "ครีมฆ่าเชื้อช่วยปกป้องรอยผ่าตัดเปิดจากการติดเชื้อโรคจากแบคทีเรียอันตราย"
  },
  {
    "id": "v_b1_health_05",
    "word": "immunity",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ระบบภูมิคุ้มกันร่างกาย",
    "alternatives": [
      "ระดับน้ำตาลในเลือด",
      "ความจุของปอด",
      "อัตราการเต้นหัวใจ"
    ],
    "example": "Nutritious foods and sound sleep strengthen natural immunity against seasonal flus.",
    "exampleThai": "อาหารที่มีคุณค่าทางโภชนาการและการนอนหลับสนิทช่วยเสริมสร้างระบบภูมิคุ้มกันร่างกายต้านไข้หวัดใหญ่ตามฤดูกาล"
  },
  {
    "id": "v_b1_health_06",
    "word": "treatment",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "กระบวนการรักษาทางการแพทย์",
    "alternatives": [
      "การเจ็บป่วยกะทันหัน",
      "การแพ้ยา",
      "การนัดหมายทั่วไป"
    ],
    "example": "Early cancer detection allows physicians to initiate targeted treatment promptly.",
    "exampleThai": "การตรวจพบมะเร็งในระยะแรกช่วยให้แพทย์สามารถเริ่มกระบวนการรักษาทางการแพทย์แบบตรงจุดได้อย่างทันท่วงที"
  },
  {
    "id": "v_b1_health_07",
    "word": "surgery",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การผ่าตัดศัลยกรรม",
    "alternatives": [
      "การตรวจเลือด",
      "การรับประทานยา",
      "การฝังเข็ม"
    ],
    "example": "The orthopedic surgeon performed knee replacement surgery with great precision.",
    "exampleThai": "ศัลยแพทย์กระดูกและข้อได้ทำการผ่าตัดศัลยกรรมเปลี่ยนข้อเข่าด้วยความแม่นยำสูงยิ่ง"
  },
  {
    "id": "v_b1_health_08",
    "word": "rehabilitation",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การฟื้นฟูสมรรถภาพทางกาย",
    "alternatives": [
      "การเจ็บป่วยซ้ำซ้อน",
      "การวินิจฉัยผิดพลาด",
      "การตรวจหาเชื้อ"
    ],
    "example": "Post-stroke patients undergo dedicated physical therapy during months of rehabilitation.",
    "exampleThai": "ผู้ป่วยหลังภาวะหลอดเลือดสมองเข้ารับกายภาพบำบัดเฉพาะทางตลอดช่วงหลายเดือนของการฟื้นฟูสมรรถภาพทางกาย"
  },
  {
    "id": "v_b1_health_09",
    "word": "epidemic",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "โรคระบาดในชุมชน",
    "alternatives": [
      "โรคทางพันธุกรรม",
      "โรคข้ออักเสบ",
      "โรคภูมิแพ้อาหาร"
    ],
    "example": "Public health agencies acted decisively to contain the local flu epidemic.",
    "exampleThai": "หน่วยงานสาธารณสุขดำเนินการอย่างเด็ดขาดเพื่อควบคุมโรคระบาดในชุมชนของไข้หวัดใหญ่"
  },
  {
    "id": "v_b1_health_10",
    "word": "physical",
    "pos": "adj.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ทางร่างกาย",
    "alternatives": [
      "ทางจิตใจ",
      "ทางอารมณ์",
      "ทางสังคม"
    ],
    "example": "Maintaining regular physical exercise lowers cardiovascular disease hazards.",
    "exampleThai": "การออกกำลังกายทางร่างกายอย่างสม่ำเสมอช่วยลดความเสี่ยงโรคหัวใจและหลอดเลือด"
  },
  {
    "id": "v_b1_health_11",
    "word": "chronic",
    "pos": "adj.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เรื้อรังยาวนาน",
    "alternatives": [
      "เฉียบพลันชั่วคราว",
      "รักษาหายขาดทันที",
      "ติดต่อทางอากาศ"
    ],
    "example": "Millions manage chronic back pain through guided daily stretching regimens.",
    "exampleThai": "ผู้คนหลายล้านคนจัดการกับอาการปวดหลังที่เรื้อรังยาวนานด้วยโปรแกรมการยืดเหยียดประจำวัน"
  },
  {
    "id": "v_b1_health_12",
    "word": "mental",
    "pos": "adj.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ทางสุขภาพจิต",
    "alternatives": [
      "ทางกล้ามเนื้อ",
      "ทางระบบย่อยอาหาร",
      "ทางโครงสร้างกระดูก"
    ],
    "example": "Workplace stress reduction seminars promote better employee mental health.",
    "exampleThai": "การสัมมนาลดความเครียดในที่ทำงานช่วยส่งเสริมทางสุขภาพจิตที่ดีขึ้นของพนักงาน"
  },
  {
    "id": "v_b1_health_13",
    "word": "fatigue",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ความเหนื่อยล้าสะสม",
    "alternatives": [
      "ความกระปรี้กระเปร่า",
      "ความตื่นเต้น",
      "ความอิ่มเอมใจ"
    ],
    "example": "Chronic sleep deprivation causes debilitating mental and physical fatigue.",
    "exampleThai": "การอดนอนเรื้อรังนำไปสู่ความเหนื่อยล้าสะสมทางจิตใจและร่างกายที่บั่นทอนกำลัง"
  },
  {
    "id": "v_b1_health_14",
    "word": "therapy",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การบำบัดรักษา",
    "alternatives": [
      "การผ่าตัดด่วน",
      "การฉีดวัคซีน",
      "การตรวจสุขภาพทั่วไป"
    ],
    "example": "Speech therapy helped the injured boy regain his natural speaking rhythm.",
    "exampleThai": "การบำบัดรักษาด้านการพูดช่วยให้เด็กชายที่บาดเจ็บกลับมาพูดได้ตามจังหวะธรรมชาติ"
  },
  {
    "id": "v_b1_health_15",
    "word": "fracture",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "กระดูกแตกร้าว",
    "alternatives": [
      "แผลถลอก",
      "อาการกล้ามเนื้อตึง",
      "รอยช้ำใต้ผิว"
    ],
    "example": "An X-ray scan revealed a hairline bone fracture in his left collarbone.",
    "exampleThai": "ภาพเอกซเรย์เผยให้เห็นกระดูกแตกร้าวเป็นรอยผมในกระดูกไหปลาร้าข้างซ้ายของเขา"
  },
  {
    "id": "v_b1_health_16",
    "word": "ward",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "หอผู้ป่วยในโรงพยาบาล",
    "alternatives": [
      "ห้องจ่ายยา",
      "ลานจอดรถพยาบาล",
      "ห้องประชุมแพทย์"
    ],
    "example": "Family visitors are admitted to the surgical pediatric ward in the late afternoon.",
    "exampleThai": "ญาติที่มาเยี่ยมได้รับอนุญาตให้เข้าหอผู้ป่วยในโรงพยาบาลแผนกศัลยกรรมเด็กในตอนบ่ายแก่ๆ"
  },
  {
    "id": "v_b1_health_17",
    "word": "hygiene",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การรักษาสุขอนามัยส่วนบุคคล",
    "alternatives": [
      "การออกกำลังกาย",
      "การรับประทานอาหารหรู",
      "การเลือกซื้อเสื้อผ้า"
    ],
    "example": "Thorough handwashing remains the cornerstone of personal hygiene in hospitals.",
    "exampleThai": "การล้างมืออย่างทั่วถึงยังคงเป็นเสาหลักสำคัญของการรักษาสุขอนามัยส่วนบุคคลในโรงพยาบาล"
  },
  {
    "id": "v_b1_health_18",
    "word": "vaccinate",
    "pos": "v.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ฉีดวัคซีนป้องกันโรค",
    "alternatives": [
      "ผ่าตัดศัลยกรรม",
      "ดมยาสลบ",
      "ตรวจคลื่นหัวใจ"
    ],
    "example": "Schools require pediatricians to vaccinate pupils against measles and rubella.",
    "exampleThai": "โรงเรียนกำหนดให้กุมารแพทย์ฉีดวัคซีนป้องกันโรคหัดและหัดเยอรมันให้แก่นักเรียน"
  },
  {
    "id": "v_b2_health_diagnose",
    "word": "diagnose",
    "pos": "v.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "วินิจฉัยโรค",
    "alternatives": [
      "คาดเดาตามอาการ",
      "ละเลยการรักษา",
      "มองข้ามสัญญาณเตือน"
    ],
    "example": "Specialist doctors used advanced MRI scans to diagnose the neurological disorder accurately.",
    "exampleThai": "แพทย์เฉพาะทางใช้การสแกนด้วยคลื่นแม่เหล็กไฟฟ้าขั้นสูงเพื่อวินิจฉัยโรคความผิดปกติทางระบบประสาทได้อย่างแม่นยำ"
  },
  {
    "id": "v_b2_health_02",
    "word": "prognosis",
    "pos": "n.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การคาดคะเนผลการรักษา",
    "alternatives": [
      "สาเหตุการเกิดโรค",
      "อัตราค่ารักษา",
      "ประวัติครอบครัว"
    ],
    "example": "Because the tumor was discovered early, the patient's long-term medical prognosis is excellent.",
    "exampleThai": "เนื่องจากตรวจพบเนื้องอกตั้งแต่ระยะแรกเริ่ม การคาดคะเนผลการรักษาในระยะยาวของผู้ป่วยจึงดีเยี่ยม"
  },
  {
    "id": "v_b2_health_03",
    "word": "cognitive",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เกี่ยวกับการรับรู้ของสมอง",
    "alternatives": [
      "เกี่ยวกับระบบย่อยอาหาร",
      "เกี่ยวกับกระดูกและข้อ",
      "เกี่ยวกับผิวหนังภายนอก"
    ],
    "example": "Solving complex puzzles aids elderly citizens in preserving vital cognitive function.",
    "exampleThai": "การเล่นเกมปริศนาที่ซับซ้อนช่วยให้ผู้สูงอายุรักษาเกี่ยวกับการรับรู้และการทำงานของสมองที่สำคัญไว้ได้"
  },
  {
    "id": "v_b2_health_04",
    "word": "cardiovascular",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เกี่ยวกับหัวใจและหลอดเลือด",
    "alternatives": [
      "เกี่ยวกับระบบประสาทส่วนกลาง",
      "เกี่ยวกับระบบทางเดินอาหาร",
      "เกี่ยวกับระบบสืบพันธุ์"
    ],
    "example": "Aerobic exercise reduces high blood pressure and enhances overall cardiovascular endurance.",
    "exampleThai": "การออกกำลังกายแบบแอโรบิกช่วยลดความดันโลหิตสูงและเสริมสร้างเกี่ยวกับหัวใจและหลอดเลือดโดยรวม"
  },
  {
    "id": "v_b2_health_05",
    "word": "contagious",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ติดต่อแพร่กระจายได้ง่าย",
    "alternatives": [
      "ไม่ติดต่อสู่ผู้อื่น",
      "รักษาให้หายในวันเดียว",
      "ถ่ายทอดเฉพาะยีน"
    ],
    "example": "Chickenpox is an exceptionally contagious airborne illness among unvaccinated youth.",
    "exampleThai": "โรคอีสุกอีใสเป็นโรคติดต่อแพร่กระจายได้ง่ายทางอากาศในหมู่เยาวชนที่ไม่ได้รับวัคซีน"
  },
  {
    "id": "v_b2_health_06",
    "word": "congenital",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เป็นมาตั้งแต่กำเนิด",
    "alternatives": [
      "เกิดจากอุบัติเหตุภายหลัง",
      "ติดต่อจากสิ่งแวดล้อม",
      "เกิดจากการติดเชื้อ"
    ],
    "example": "The infant was treated successfully for a minor congenital heart defect.",
    "exampleThai": "ทารกได้รับการรักษาจนหายดีจากความผิดปกติของหัวใจที่เป็นมาตั้งแต่กำเนิดระดับเล็กน้อย"
  },
  {
    "id": "v_b2_health_07",
    "word": "ailment",
    "pos": "n.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการเจ็บไข้ได้ป่วย",
    "alternatives": [
      "การมีสุขภาพสมบูรณ์",
      "การฟื้นตัวอย่างรวดเร็ว",
      "การมีภูมิต้านทาน"
    ],
    "example": "Herbal teas have been used for centuries to ease minor domestic ailments like stomach cramps.",
    "exampleThai": "ชาสมุนไพรถูกใช้มานานหลายศตวรรษเพื่อบรรเทาอาการเจ็บไข้ได้ป่วยเล็กๆ น้อยๆ เช่น อาการปวดเกร็งในท้อง"
  },
  {
    "id": "v_b2_health_prescribe",
    "word": "prescribe",
    "pos": "v.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "สั่งยาตามอาการ",
    "alternatives": [
      "ห้ามใช้ยา",
      "ซื้อยากินเอง",
      "เพิกเฉยต่อการรักษา"
    ],
    "example": "Physicians must be cautious not to prescribe strong antibiotics for simple viral infections.",
    "exampleThai": "แพทย์ต้องระมัดระวังไม่สั่งยาตามอาการที่เป็นยาปฏิชีวนะชนิดรุนแรงสำหรับการติดเชื้อไวรัสทั่วไป"
  },
  {
    "id": "v_b2_health_09",
    "word": "deterioration",
    "pos": "n.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การทรุดโทรมลงของสุขภาพ",
    "alternatives": [
      "การฟื้นตัวอย่างน่าอัศจรรย์",
      "การเสริมสร้างกล้ามเนื้อ",
      "การรักษาหายขาด"
    ],
    "example": "Doctors closely monitored the critical patient to forestall sudden respiratory deterioration.",
    "exampleThai": "แพทย์เฝ้าติดตามผู้ป่วยวิกฤตอย่างใกล้ชิดเพื่อป้องกันการทรุดโทรมลงของสุขภาพทางระบบหายใจอย่างกะทันหัน"
  },
  {
    "id": "v_b2_health_10",
    "word": "longevity",
    "pos": "n.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การมีอายุขัยยืนยาว",
    "alternatives": [
      "การเสียชีวิตก่อนวัยอันควร",
      "การเจ็บป่วยเรื้อรัง",
      "ความเหนื่อยล้าวัยทอง"
    ],
    "example": "Researchers examine traditional Okinawan diets to understand secrets of human longevity.",
    "exampleThai": "นักวิจัยตรวจสอบอาหารดั้งเดิมของชาวโอกินาวาเพื่อทำความเข้าใจเคล็ดลับของการมีอายุขัยยืนยาวของมนุษย์"
  },
  {
    "id": "v_b2_health_alleviate",
    "word": "alleviate",
    "pos": "v.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "บรรเทาความเจ็บปวด",
    "alternatives": [
      "ซ้ำเติมอาการป่วย",
      "เพิ่มความเจ็บปวด",
      "ก่อให้เกิดการอักเสบ"
    ],
    "example": "Gentle physical therapy helps alleviate chronic lower back pain in desk workers.",
    "exampleThai": "กายภาพบำบัดแบบนุ่มนวลช่วยบรรเทาความเจ็บปวดเรื้อรังบริเวณหลังส่วนล่างในคนทำงานออฟฟิศ"
  },
  {
    "id": "v_b2_health_transmit",
    "word": "transmit",
    "pos": "v.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "แพร่กระจายเชื้อโรค",
    "alternatives": [
      "กำจัดเชื้อหมดสิ้น",
      "รักษาให้หายขาด",
      "สกัดกั้นการระบาด"
    ],
    "example": "Infected mosquitoes can transmit tropical diseases such as dengue fever to humans.",
    "exampleThai": "ยุงที่มีเชื้อสามารถแพร่กระจายเชื้อโรคเขตร้อน เช่น ไข้เลือดออก ไปสู่มนุษย์ได้"
  },
  {
    "id": "v_b2_health_13",
    "word": "sedentary",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ที่ไม่ค่อยเคลื่อนไหว",
    "alternatives": [
      "ที่ชอบออกกำลังกายสม่ำเสมอ",
      "ที่ทำงานใช้แรงกาย",
      "ที่เดินทางบ่อยครั้ง"
    ],
    "example": "A sedentary desk lifestyle without exercise increases obesity and chronic metabolic risks.",
    "exampleThai": "วิถีชีวิตโต๊ะทำงานซึ่งนั่งอยู่กับที่เนือยนิ่งโดยไม่ออกกำลังกายเพิ่มความเสี่ยงโรคอ้วนและการเผาผลาญผิดปกติ"
  },
  {
    "id": "v_b2_health_14",
    "word": "sterile",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ปลอดเชื้อโรคจุลินทรีย์",
    "alternatives": [
      "ปนเปื้อนแบคทีเรีย",
      "มีคราบสกปรก",
      "ขึ้นรา"
    ],
    "example": "Surgeons must operate exclusively with sterile surgical instruments under filtered air.",
    "exampleThai": "ศัลยแพทย์ต้องผ่าตัดด้วยเครื่องมือแพทย์ที่ปลอดเชื้อโรคจุลินทรีย์เท่านั้นภายใต้ระบบอากาศที่ผ่านการกรอง"
  },
  {
    "id": "v_b2_health_15",
    "word": "quarantine",
    "pos": "n.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การกักกันโรคเพื่อสังเกตอาการ",
    "alternatives": [
      "การพบปะในที่สาธารณะ",
      "การปล่อยตัวสู่สังคม",
      "การจัดงานรื่นเริง"
    ],
    "example": "Incoming international voyagers completed mandatory quarantine to contain pandemic virus transmission.",
    "exampleThai": "ผู้เดินทางระหว่างประเทศขาเข้าได้ผ่านการกักกันโรคเพื่อสังเกตอาการภาคบังคับเพื่อควบคุมการแพร่ระบาดของไวรัส"
  },
  {
    "id": "v_b2_health_16",
    "word": "hereditary",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ซึ่งถ่ายทอดทางพันธุกรรม",
    "alternatives": [
      "ซึ่งติดต่อผ่านการสัมผัส",
      "ซึ่งเกิดจากมลพิษ",
      "ซึ่งป้องกันได้ด้วยยา"
    ],
    "example": "Certain forms of color blindness are hereditary traits passed from parents to offspring.",
    "exampleThai": "ภาวะตาบอดสีบางรูปแบบเป็นลักษณะซึ่งถ่ายทอดทางพันธุกรรมที่ส่งต่อจากพ่อแม่สู่ลูกหลาน"
  },
  {
    "id": "v_b2_health_17",
    "word": "immune",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "มีภูมิคุ้มกันต้านทานโรค",
    "alternatives": [
      "ไวต่อการติดเชื้อ",
      "ไม่มีเกราะป้องกัน",
      "มีอาการแพ้ง่าย"
    ],
    "example": "Individuals who have contracted and recovered from the illness become naturally immune.",
    "exampleThai": "บุคคลที่เคยติดเชื้อและหายดีจากการเจ็บป่วยจะกลายเป็นผู้มีภูมิคุ้มกันต้านทานโรคตามธรรมชาติ"
  },
  {
    "id": "v_a1_job_01",
    "word": "job",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "งานอาชีพ",
    "alternatives": [
      "งานอดิเรก",
      "วันหยุดยาว",
      "การพักผ่อน"
    ],
    "example": "She loves her creative new job as a graphic designer.",
    "exampleThai": "เธอรักงานอาชีพที่เต็มไปด้วยความคิดสร้างสรรค์ใหม่ของเธอในฐานะนักออกแบบกราฟิก"
  },
  {
    "id": "v_a1_job_02",
    "word": "work",
    "pos": "v.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ทำงาน",
    "alternatives": [
      "นอนหลับ",
      "เล่นเกม",
      "ท่องเที่ยว"
    ],
    "example": "My parents work at a busy international bank downtown.",
    "exampleThai": "พ่อแม่ของฉันทำงานที่ธนาคารระหว่างประเทศอันคึกคักใจกลางเมือง"
  },
  {
    "id": "v_a1_job_03",
    "word": "teacher",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ครูอาจารย์",
    "alternatives": [
      "นักเรียน",
      "ภารโรง",
      "คนขับรถโรงเรียน"
    ],
    "example": "Our English teacher explains difficult grammar with clear examples.",
    "exampleThai": "ครูอาจารย์สอนภาษาอังกฤษของเราอธิบายไวยากรณ์ยากๆ ด้วยตัวอย่างที่ชัดเจน"
  },
  {
    "id": "v_a1_job_04",
    "word": "student",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "นักเรียนนักศึกษา",
    "alternatives": [
      "ครูผู้สอน",
      "ผู้อำนวยการ",
      "ผู้ปกครอง"
    ],
    "example": "Every diligent student listened attentively to the morning lecture.",
    "exampleThai": "นักเรียนนักศึกษาที่ขยันทุกคนตั้งใจฟังการบรรยายช่วงเช้าอย่างจดจ่อ"
  },
  {
    "id": "v_a1_job_05",
    "word": "farmer",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เกษตรกรชาวนา",
    "alternatives": [
      "พ่อค้าคนกลาง",
      "ช่างก่อสร้าง",
      "คนขับรถบรรทุก"
    ],
    "example": "The hardworking farmer harvests golden paddy fields in November.",
    "exampleThai": "เกษตรกรชาวนาผู้ขยันขันแข็งเก็บเกี่ยวรวงข้าวสีทองในเดือนพฤศจิกายน"
  },
  {
    "id": "v_a1_job_06",
    "word": "driver",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "พนักงานขับรถ",
    "alternatives": [
      "ผู้โดยสาร",
      "ช่างซ่อมถนน",
      "พนักงานตรวจตั๋ว"
    ],
    "example": "The experienced bus driver navigated the heavy rain safely.",
    "exampleThai": "พนักงานขับรถโดยสารประจำทางผู้มีประสบการณ์ขับฝ่าสายฝนหนักได้อย่างปลอดภัย"
  },
  {
    "id": "v_a1_job_07",
    "word": "cook",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "พ่อครัวแม่ครัว",
    "alternatives": [
      "บริกรเสิร์ฟ",
      "ลูกค้า",
      "คนล้างจาน"
    ],
    "example": "The head cook prepared three delicious signature noodle bowls.",
    "exampleThai": "พ่อครัวแม่ครัวหัวหน้าแผนกปรุงก๋วยเตี๋ยวชามเด็ดแสนอร่อยสามชาม"
  },
  {
    "id": "v_a1_job_08",
    "word": "worker",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "คนงานฝ่ายผลิต",
    "alternatives": [
      "ผู้จัดการใหญ่",
      "เจ้าของกิจการ",
      "ผู้ตรวจสอบบัญชี"
    ],
    "example": "Factory workers assemble electronic appliances with great speed.",
    "exampleThai": "คนงานฝ่ายผลิตในโรงงานประกอบเครื่องใช้ไฟฟ้าด้วยความรวดเร็วอย่างยิ่ง"
  },
  {
    "id": "v_a1_job_09",
    "word": "office",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "สำนักงาน",
    "alternatives": [
      "โรงงานผลิต",
      "โกดังเก็บของ",
      "ร้านค้าปลีก"
    ],
    "example": "Our modern office is located on the twentieth floor of the glass tower.",
    "exampleThai": "สำนักงานอันทันสมัยของเราตั้งอยู่บนชั้นยี่สิบของอาคารกระจก"
  },
  {
    "id": "v_a1_job_10",
    "word": "shop",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ร้านค้าปลีก",
    "alternatives": [
      "โรงเรียน",
      "โรงพยาบาล",
      "สนามบิน"
    ],
    "example": "My uncle runs a small flower shop near the bustling train station.",
    "exampleThai": "ลุงของฉันเปิดร้านค้าปลีกดอกไม้เล็กๆ ใกล้สถานีรถไฟอันคึกคัก"
  },
  {
    "id": "v_a1_job_11",
    "word": "desk",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "โต๊ะทำงาน",
    "alternatives": [
      "ตู้เอกสาร",
      "เก้าอี้หมุน",
      "กระดานไวท์บอร์ด"
    ],
    "example": "Keep your computer desk organized and free of clutter.",
    "exampleThai": "จัดโต๊ะทำงานคอมพิวเตอร์ของคุณให้เป็นระเบียบและไม่มีของเกะกะ"
  },
  {
    "id": "v_a1_job_12",
    "word": "pen",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ปากกาเขียนหนังสือ",
    "alternatives": [
      "ดินสอดำ",
      "ไม้บรรทัด",
      "ยางลบ"
    ],
    "example": "Sign the official contract using a blue ink pen.",
    "exampleThai": "ลงนามในสัญญาทางการโดยใช้ปากกาเขียนหนังสือหมึกสีน้ำเงิน"
  },
  {
    "id": "v_a1_job_13",
    "word": "computer",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เครื่องคอมพิวเตอร์",
    "alternatives": [
      "เครื่องพิมพ์เอกสาร",
      "โทรศัพท์ตั้งโต๊ะ",
      "เครื่องสแกน"
    ],
    "example": "She uses her laptop computer to analyze quarterly sales spreadsheets.",
    "exampleThai": "เธอใช้เครื่องคอมพิวเตอร์โน้ตบุ๊กเพื่อวิเคราะห์ตารางคำนวณยอดขายประจำไตรมาส"
  },
  {
    "id": "v_a1_job_14",
    "word": "police",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เจ้าหน้าที่ตำรวจ",
    "alternatives": [
      "ทหารผ่านศึก",
      "เจ้าหน้าที่ดับเพลิง",
      "รปภประจำอาคาร"
    ],
    "example": "The traffic police officer directed cars safely through the intersection.",
    "exampleThai": "เจ้าหน้าที่ตำรวจจราจรโบกรถให้ผ่านสี่แยกได้อย่างปลอดภัย"
  },
  {
    "id": "v_a1_job_15",
    "word": "singer",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "นักร้องอาชีพ",
    "alternatives": [
      "นักเต้นรำ",
      "นักดนตรีเบื้องหลัง",
      "โปรดิวเซอร์"
    ],
    "example": "The talented singer performed a popular pop ballad on stage.",
    "exampleThai": "นักร้องอาชีพผู้มีความสามารถร้องเพลงป๊อปบัลลาดยอดนิยมบนเวที"
  },
  {
    "id": "v_a1_job_16",
    "word": "dancer",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "นักเต้นระบำ",
    "alternatives": [
      "นักแสดงละคร",
      "ผู้กำกับเวที",
      "คนออกแบบฉาก"
    ],
    "example": "Graceful traditional dancers wore magnificent golden headdresses.",
    "exampleThai": "เหล่านักเต้นระบำตามแบบประเพณีอันสง่างามสวมชฎาสีทองอันวิจิตรงดงาม"
  },
  {
    "id": "v_a1_job_17",
    "word": "help",
    "pos": "v.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ช่วยเหลือเกื้อกูล",
    "alternatives": [
      "ขัดขวาง",
      "เพิกเฉย",
      "ปฏิเสธ"
    ],
    "example": "Good teammates always help one another finish pressing tasks.",
    "exampleThai": "เพื่อนร่วมทีมที่ดีจะคอยช่วยเหลือเกื้อกูลกันทำงานด่วนให้เสร็จเสมอ"
  },
  {
    "id": "v_a1_job_18",
    "word": "write",
    "pos": "v.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เขียนบันทึก",
    "alternatives": [
      "อ่านออกเสียง",
      "พิมพ์ดีด",
      "วาดภาพร่าง"
    ],
    "example": "Please write a concise project summary for our afternoon meeting.",
    "exampleThai": "กรุณาเขียนบันทึกสรุปโครงการแบบกระชับสำหรับการประชุมช่วงบ่ายของเรา"
  },
  {
    "id": "v_a1_job_19",
    "word": "read",
    "pos": "v.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "อ่านเอกสาร",
    "alternatives": [
      "เขียนตอบ",
      "ฉีกทำลาย",
      "จัดเก็บ"
    ],
    "example": "Take fifteen minutes to carefully read the employment guidelines.",
    "exampleThai": "สละเวลาสิบห้านาทีเพื่ออ่านเอกสารแนวทางการจ้างงานอย่างรอบคอบ"
  },
  {
    "id": "v_a1_job_20",
    "word": "make",
    "pos": "v.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ประดิษฐ์สร้าง",
    "alternatives": [
      "ทำลายทิ้ง",
      "ซื้อหามา",
      "เช่าใช้"
    ],
    "example": "Artisans make traditional bamboo baskets with incredible skill.",
    "exampleThai": "ช่างฝีมือประดิษฐ์สร้างตะกร้าไม้ไผ่แบบดั้งเดิมด้วยทักษะอันน่าทึ่ง"
  },
  {
    "id": "v_a1_job_21",
    "word": "build",
    "pos": "v.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ก่อสร้างอาคาร",
    "alternatives": [
      "รื้อถอน",
      "ทาสีใหม่",
      "ขายทอดตลาด"
    ],
    "example": "Engineers plan to build an eco-friendly community center.",
    "exampleThai": "วิศวกรวางแผนที่จะก่อสร้างอาคารศูนย์ชุมชนที่เป็นมิตรต่อสิ่งแวดล้อม"
  },
  {
    "id": "v_a1_job_22",
    "word": "company",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "บริษัทห้างร้าน",
    "alternatives": [
      "หน่วยงานรัฐ",
      "มูลนิธิการกุศล",
      "สหกรณ์ออมทรัพย์"
    ],
    "example": "The software company employs over five hundred developers worldwide.",
    "exampleThai": "บริษัทห้างร้านด้านซอฟต์แวร์แห่งนี้จ้างนักพัฒนามากกว่าห้าร้อยคนทั่วโลก"
  },
  {
    "id": "v_a1_job_23",
    "word": "team",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ทีมงาน",
    "alternatives": [
      "บุคคลเดี่ยว",
      "คู่แข่งทางการค้า",
      "คณะกรรมการกลาง"
    ],
    "example": "Our marketing team launched a creative nationwide social media campaign.",
    "exampleThai": "ทีมงานฝ่ายการตลาดของเราได้เปิดตัวแคมเปญโซเชียลมีเดียสุดสร้างสรรค์ระดับประเทศ"
  },
  {
    "id": "v_a1_job_24",
    "word": "money",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เงินค่าตอบแทน",
    "alternatives": [
      "หนี้สินค้างชำระ",
      "ภาษีโรงเรือน",
      "ค่าธรรมเนียมปรับ"
    ],
    "example": "He saves money every month to support his younger sister's schooling.",
    "exampleThai": "เขาเก็บออมเงินค่าตอบแทนทุกเดือนเพื่อสนับสนุนการศึกษาของน้องสาว"
  },
  {
    "id": "v_a1_job_25",
    "word": "busy",
    "pos": "adj.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ยุ่งกับภารกิจ",
    "alternatives": [
      "ว่างงาน",
      "เกียจคร้าน",
      "ผ่อนคลาย"
    ],
    "example": "The accounting department is exceptionally busy during annual audit week.",
    "exampleThai": "แผนกบัญชียุ่งกับภารกิจเป็นพิเศษในช่วงสัปดาห์การตรวจสอบบัญชีประจำปี"
  },
  {
    "id": "v_a1_job_26",
    "word": "easy",
    "pos": "adj.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ง่ายดายไม่ซับซ้อน",
    "alternatives": [
      "ยากลำบาก",
      "สับสนวุ่นวาย",
      "อันตราย"
    ],
    "example": "Entering basic data into the database is a very easy job.",
    "exampleThai": "การกรอกข้อมูลพื้นฐานลงในฐานข้อมูลเป็นงานที่ง่ายดายไม่ซับซ้อนมาก"
  },
  {
    "id": "v_a1_job_27",
    "word": "hard",
    "pos": "adj.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ยากลำบากท้าทาย",
    "alternatives": [
      "ง่ายดาย",
      "น่าเบื่อหน่าย",
      "ธรรมดา"
    ],
    "example": "Physical construction work in the tropical heat is extremely hard.",
    "exampleThai": "งานก่อสร้างที่ต้องใช้แรงกายท่ามกลางความร้อนของแดดเมืองร้อนนั้นยากลำบากท้าทายอย่างยิ่ง"
  },
  {
    "id": "v_a1_job_28",
    "word": "start",
    "pos": "v.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เริ่มต้นเข้างาน",
    "alternatives": [
      "เลิกงานกลับบ้าน",
      "ลาพักผ่อน",
      "หยุดพักกลางวัน"
    ],
    "example": "We start work at eight-thirty every Monday morning sharp.",
    "exampleThai": "พวกเราเริ่มต้นเข้างานเวลาแปดโมงครึ่งตรงในทุกเช้าวันจันทร์"
  },
  {
    "id": "v_a1_job_29",
    "word": "finish",
    "pos": "v.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ทำงานเสร็จสิ้น",
    "alternatives": [
      "เพิ่งเริ่มต้น",
      "เลื่อนเวลาออกไป",
      "หยุดชะงัก"
    ],
    "example": "She aims to finish the monthly report before heading home tonight.",
    "exampleThai": "เธอตั้งเป้าที่จะทำงานเสร็จสิ้นรายงานประจำเดือนก่อนกลับบ้านในคืนนี้"
  },
  {
    "id": "v_a1_job_30",
    "word": "meet",
    "pos": "v.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "พบปะหารือ",
    "alternatives": [
      "แยกย้ายกลับ",
      "หลบหน้า",
      "สื่อสารทางอีเมล"
    ],
    "example": "The project managers meet every Friday to track milestone progress.",
    "exampleThai": "เหล่าผู้จัดการโครงการพบปะหารือกันทุกวันศุกร์เพื่อติดตามความคืบหน้าของงาน"
  },
  {
    "id": "v_a2_job_01",
    "word": "manager",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ผู้จัดการแผนก",
    "alternatives": [
      "พนักงานฝึกงาน",
      "ผู้ช่วยทั่วไป",
      "รปภประจำตึก"
    ],
    "example": "The store manager solved the customer's return issue efficiently.",
    "exampleThai": "ผู้จัดการแผนกร้านค้าแก้ปัญหาการคืนสินค้าของลูกค้าได้อย่างมีประสิทธิภาพ"
  },
  {
    "id": "v_a2_job_02",
    "word": "engineer",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "วิศวกรผู้เชี่ยวชาญ",
    "alternatives": [
      "สถาปนิกออกแบบ",
      "ช่างไม้",
      "คนขับรถเครน"
    ],
    "example": "A civil engineer inspects the structural integrity of the highway bridge.",
    "exampleThai": "วิศวกรผู้เชี่ยวชาญโยธาตรวจสอบความสมบูรณ์เชิงโครงสร้างของสะพานทางหลวง"
  },
  {
    "id": "v_a2_job_03",
    "word": "lawyer",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ทนายความว่าความ",
    "alternatives": [
      "ผู้พิพากษาศาล",
      "พยานในคดี",
      "เจ้าหน้าที่ตำรวจ"
    ],
    "example": "The corporate lawyer drafted the partnership agreement carefully.",
    "exampleThai": "ทนายความว่าความด้านบรรษัทได้ร่างข้อตกลงการเป็นหุ้นส่วนอย่างรอบคอบ"
  },
  {
    "id": "v_a2_job_04",
    "word": "accountant",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "นักบัญชี",
    "alternatives": [
      "พนักงานขาย",
      "นายหน้าอสังหา",
      "นักการตลาด"
    ],
    "example": "Our certified accountant files the firm's business taxes each April.",
    "exampleThai": "นักบัญชีผู้ได้รับใบอนุญาตของเรายื่นแบบภาษีธุรกิจของบริษัทในทุกเดือนเมษายน"
  },
  {
    "id": "v_a2_job_05",
    "word": "architect",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "สถาปนิกผู้ออกแบบ",
    "alternatives": [
      "วิศวกรโยธา",
      "ช่างก่ออิฐ",
      "มัณฑนากรตกแต่ง"
    ],
    "example": "The architect drew innovative blueprints for the sustainable wooden villa.",
    "exampleThai": "สถาปนิกผู้ออกแบบได้เขียนพิมพ์เขียวอันล้ำสมัยสำหรับวิลล่าไม้ยั่งยืน"
  },
  {
    "id": "v_a2_job_06",
    "word": "mechanic",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ช่างซ่อมเครื่องยนต์",
    "alternatives": [
      "พนักงานขายรถ",
      "คนขับแท็กซี่",
      "พนักงานเติมน้ำมัน"
    ],
    "example": "The skilled auto mechanic repaired the sputtering truck engine in two hours.",
    "exampleThai": "ช่างซ่อมเครื่องยนต์ยานยนต์ผู้ชำนาญซ่อมเครื่องยนต์รถบรรทุกที่กระตุกเสร็จในสองชั่วโมง"
  },
  {
    "id": "v_a2_job_07",
    "word": "electrician",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ช่างติดตั้งระบบไฟฟ้า",
    "alternatives": [
      "ช่างประปา",
      "ช่างเชื่อมโลหะ",
      "ช่างทาสี"
    ],
    "example": "Call a licensed electrician immediately if household wiring sparks.",
    "exampleThai": "โทรหาช่างติดตั้งระบบไฟฟ้าที่มีใบอนุญาตทันทีหากสายไฟในบ้านเกิดประกายไฟ"
  },
  {
    "id": "v_a2_job_08",
    "word": "plumber",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ช่างประปา",
    "alternatives": [
      "ช่างไม้",
      "ช่างกระจก",
      "ช่างปูกระเบื้อง"
    ],
    "example": "The emergency plumber tightened the leaking brass pipe under the kitchen sink.",
    "exampleThai": "ช่างประปาฉุกเฉินได้ขันข้อต่อท่อทองเหลืองที่รั่วซึมใต้ซิงก์ครัวให้แน่น"
  },
  {
    "id": "v_a2_job_09",
    "word": "journalist",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "นักข่าวสื่อมวลชน",
    "alternatives": [
      "โฆษกประจำรายการ",
      "นักเขียนนิยาย",
      "ช่างพิมพ์หนังสือ"
    ],
    "example": "An investigative journalist exposed environmental dumping in the local river.",
    "exampleThai": "นักข่าวสื่อมวลชนสายสืบสวนได้เปิดโปงการลักลอบทิ้งกากมลพิษลงในแม่น้ำท้องถิ่น"
  },
  {
    "id": "v_a2_job_10",
    "word": "photographer",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ช่างภาพอาชีพ",
    "alternatives": [
      "จิตรกรวาดภาพ",
      "นักออกแบบเสื้อผ้า",
      "นางแบบ"
    ],
    "example": "The wildlife photographer waited patiently for hours to snap the rare bird.",
    "exampleThai": "ช่างภาพอาชีพสายสัตว์ป่ารอคอยอย่างอดทนนานหลายชั่วโมงเพื่อถ่ายภาพนกหายาก"
  },
  {
    "id": "v_a2_job_11",
    "word": "salary",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เงินเดือนประจำ",
    "alternatives": [
      "เงินทิป",
      "เงินรางวัลพิเศษ",
      "ค่าเดินทาง"
    ],
    "example": "The company deposits every employee's monthly salary on the twenty-fifth.",
    "exampleThai": "บริษัทโอนเงินเดือนประจำของพนักงานทุกคนเข้าบัญชีในวันที่ยี่สิบห้าของทุกเดือน"
  },
  {
    "id": "v_a2_job_12",
    "word": "interview",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การสัมภาษณ์งาน",
    "alternatives": [
      "การปฐมนิเทศ",
      "การเซ็นสัญญา",
      "การอบรมพนักงาน"
    ],
    "example": "Dress professionally and arrive ten minutes early for your job interview.",
    "exampleThai": "แต่งกายอย่างเป็นมืออาชีพและมาถึงก่อนเวลาสิบนาทีสำหรับการสัมภาษณ์งานของคุณ"
  },
  {
    "id": "v_a2_job_13",
    "word": "career",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เส้นทางอาชีพ",
    "alternatives": [
      "งานอดิเรกยามว่าง",
      "การศึกษาขั้นพื้นฐาน",
      "การเกษียณล่วงหน้า"
    ],
    "example": "She built a stellar twenty-year career in international diplomatic trade.",
    "exampleThai": "เธอได้สร้างเส้นทางอาชีพอันโดดเด่นยาวนานยี่สิบปีในการค้าทางการทูตระหว่างประเทศ"
  },
  {
    "id": "v_a2_job_14",
    "word": "resume",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ประวัติย่อสมัครงาน",
    "alternatives": [
      "จดหมายแนะนำตัว",
      "ใบประกาศนียบัตร",
      "สำเนาทะเบียนบ้าน"
    ],
    "example": "Highlight your key technical achievements on the first page of your resume.",
    "exampleThai": "เน้นย้ำความสำเร็จทางเทคนิคที่สำคัญในหน้าแรกของประวัติย่อสมัครงานของคุณ"
  },
  {
    "id": "v_a2_job_15",
    "word": "colleague",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เพื่อนร่วมงาน",
    "alternatives": [
      "หัวหน้าฝ่าย",
      "ลูกค้าประจำ",
      "หุ้นส่วนใหญ่"
    ],
    "example": "My colleagues and I grab quick lunch together at the noodle stall.",
    "exampleThai": "เพื่อนร่วมงานของฉันและฉันแวะไปทานมื้อเที่ยงด่วนด้วยกันที่ร้านก๋วยเตี๋ยว"
  },
  {
    "id": "v_a2_job_16",
    "word": "boss",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เจ้านายหัวหน้างาน",
    "alternatives": [
      "เพื่อนร่วมงาน",
      "พนักงานใหม่",
      "ลูกค้าทั่วไป"
    ],
    "example": "Our department boss is supportive and encourages continuing education.",
    "exampleThai": "เจ้านายหัวหน้างานแผนกของเราคอยสนับสนุนและส่งเสริมการศึกษาต่อเนื่อง"
  },
  {
    "id": "v_a2_job_17",
    "word": "employee",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "พนักงานลูกจ้าง",
    "alternatives": [
      "นายจ้าง",
      "ผู้ถือหุ้น",
      "ที่ปรึกษาภายนอก"
    ],
    "example": "Every full-time employee receives health coverage and paid vacation days.",
    "exampleThai": "พนักงานลูกจ้างประจำทุกคนจะได้รับประกันสุขภาพและวันลาพักร้อนที่ได้รับค่าจ้าง"
  },
  {
    "id": "v_a2_job_18",
    "word": "employer",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "นายจ้างผู้ประกอบการ",
    "alternatives": [
      "ลูกจ้างประจำ",
      "นักศึกษาฝึกงาน",
      "ผู้สมัครงาน"
    ],
    "example": "Fair employers provide safe working conditions and equitable compensation.",
    "exampleThai": "นายจ้างผู้ประกอบการที่มีความยุติธรรมจะจัดให้มีสภาพการทำงานที่ปลอดภัยและค่าตอบแทนที่เป็นธรรม"
  },
  {
    "id": "v_a2_job_19",
    "word": "customer",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ลูกค้าผู้ซื้อ",
    "alternatives": [
      "ผู้ผลิตสินค้า",
      "คนส่งพัสดุ",
      "ผู้จัดการร้าน"
    ],
    "example": "Attentive customer service builds lifelong brand loyalty and trust.",
    "exampleThai": "การบริการลูกค้าผู้ซื้อด้วยความเอาใจใส่ช่วยสร้างความภักดีและความเชื่อมั่นต่อแบรนด์ในระยะยาว"
  },
  {
    "id": "v_a2_job_20",
    "word": "hire",
    "pos": "v.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ว่าจ้างเข้าทำงาน",
    "alternatives": [
      "เลิกจ้าง",
      "พักงานชั่วคราว",
      "โยกย้ายตำแหน่ง"
    ],
    "example": "The booming technology startup plans to hire thirty software engineers.",
    "exampleThai": "สตาร์ทอัพเทคโนโลยีที่กำลังเติบโตวางแผนที่จะว่าจ้างเข้าทำงานวิศวกรซอฟต์แวร์สามสิบตำแหน่ง"
  },
  {
    "id": "v_a2_job_21",
    "word": "fire",
    "pos": "v.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เลิกจ้างให้ออกจากงาน",
    "alternatives": [
      "ปรับขึ้นเงินเดือน",
      "เลื่อนขั้น",
      "ให้โบนัส"
    ],
    "example": "The firm had to fire the dishonest accountant who stole company funds.",
    "exampleThai": "บริษัทต้องเลิกจ้างให้ออกจากงานนักบัญชีที่ไม่ซื่อสัตย์ซึ่งขโมยเงินทุนของบริษัท"
  },
  {
    "id": "v_a2_job_22",
    "word": "retire",
    "pos": "v.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เกษียณอายุการทำงาน",
    "alternatives": [
      "เริ่มทำงานใหม่",
      "สมัครงานเสริม",
      "เพิ่มชั่วโมงงาน"
    ],
    "example": "After forty dedicated years of teaching, Professor Somchai will retire.",
    "exampleThai": "หลังจากทุ่มเทสอนหนังสือมายาวนานสี่สิบปี อาจารย์สมชัยจะเกษียณอายุการทำงาน"
  },
  {
    "id": "v_a2_job_23",
    "word": "uniform",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เครื่องแบบพนักงาน",
    "alternatives": [
      "ชุดลำลอง",
      "ชุดกีฬา",
      "เสื้อกันหนาว"
    ],
    "example": "Security officers look sharp and identifiable in their crisp navy blue uniform.",
    "exampleThai": "เจ้าหน้าที่รักษาความปลอดภัยดูสง่างามและจำแนกได้ชัดเจนในเครื่องแบบพนักงานสีกรมท่า"
  },
  {
    "id": "v_a2_job_24",
    "word": "meeting",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การประชุมหารือ",
    "alternatives": [
      "งานเลี้ยงสังสรรค์",
      "การทัศนศึกษา",
      "การอบรมวิชาชีพ"
    ],
    "example": "We scheduled a virtual team meeting via video conference at two o'clock.",
    "exampleThai": "พวกเราจัดตารางการประชุมหารือทีมแบบเสมือนจริงผ่านวิดีโอคอนเฟอเรนซ์ตอนบ่ายสองโมง"
  },
  {
    "id": "v_a2_job_25",
    "word": "presentation",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การนำเสนอข้อมูล",
    "alternatives": [
      "การเจรจาลับ",
      "การเซ็นเอกสาร",
      "การตรวจรับพัสดุ"
    ],
    "example": "Her slide presentation impressed the prospective corporate investors immensely.",
    "exampleThai": "การนำเสนอข้อมูลผ่านสไลด์ของเธอสร้างความประทับใจแก่นักลงทุนองค์กรเป็นอย่างยิ่ง"
  },
  {
    "id": "v_a2_job_26",
    "word": "project",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "โครงการดำเนินงาน",
    "alternatives": [
      "งบประมาณค้างท่อ",
      "ภาษีสรรพสามิต",
      "ระเบียบปฏิบัติ"
    ],
    "example": "Managing the smart solar installation project took eight months of effort.",
    "exampleThai": "การบริหารโครงการดำเนินงานติดตั้งพลังงานแสงอาทิตย์อัจฉริยะใช้ความพยายามนานถึงแปดเดือน"
  },
  {
    "id": "v_a2_job_27",
    "word": "contract",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "สัญญาจ้างงาน",
    "alternatives": [
      "ใบเสร็จค่าจ้าง",
      "จดหมายเตือน",
      "แบบประเมินผล"
    ],
    "example": "Review all legal clauses thoroughly before putting your signature on the employment contract.",
    "exampleThai": "ทบทวนข้อกำหนดทางกฎหมายทั้งหมดอย่างละเอียดก่อนลงลายมือชื่อในสัญญาจ้างงาน"
  },
  {
    "id": "v_b1_job_01",
    "word": "profession",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "วิชาชีพเฉพาะทาง",
    "alternatives": [
      "งานอดิเรกเสริม",
      "งานอาสาสมัคร",
      "การค้าขายทั่วไป"
    ],
    "example": "Practicing medicine is widely considered a highly respected profession worldwide.",
    "exampleThai": "การประกอบวิชาชีพเฉพาะทางแพทย์ได้รับการยอมรับอย่างกว้างขวางว่าเป็นอาชีพที่ได้รับความเคารพสูงทั่วโลก"
  },
  {
    "id": "v_b1_job_02",
    "word": "occupation",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "อาชีพหลัก",
    "alternatives": [
      "สัญชาติเกิด",
      "สถานะการสมรส",
      "ระดับการศึกษา"
    ],
    "example": "Please state your current occupation clearly on the visa application form.",
    "exampleThai": "กรุณาระบุอาชีพหลักปัจจุบันของคุณให้ชัดเจนลงในแบบฟอร์มขอวีซ่า"
  },
  {
    "id": "v_b1_job_03",
    "word": "promotion",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การเลื่อนตำแหน่งหน้าที่",
    "alternatives": [
      "การปรับลดเงินเดือน",
      "การตักเตือนทางวินัย",
      "การโยกย้ายสาขา"
    ],
    "example": "Her exceptional leadership earned her a well-deserved promotion to senior manager.",
    "exampleThai": "ความเป็นผู้นำที่ยอดเยี่ยมของเธอทำให้เธอได้รับรางวัลเป็นการเลื่อนตำแหน่งหน้าที่เป็นผู้จัดการอาวุโส"
  },
  {
    "id": "v_b1_job_04",
    "word": "qualification",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "คุณสมบัติและวุฒิการศึกษา",
    "alternatives": [
      "ประวัติอาชญากรรม",
      "ความชอบส่วนตัว",
      "สถานะทางการเงิน"
    ],
    "example": "Candidates must possess relevant academic qualifications and fluent English communication.",
    "exampleThai": "ผู้สมัครต้องมีคุณสมบัติและวุฒิการศึกษาที่เกี่ยวข้องและทักษะการสื่อสารภาษาอังกฤษที่คล่องแคล่ว"
  },
  {
    "id": "v_b1_job_05",
    "word": "applicant",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ผู้สมัครงาน",
    "alternatives": [
      "คณะกรรมการคัดเลือก",
      "เจ้าหน้าที่ฝ่ายบุคคล",
      "หัวหน้าแผนก"
    ],
    "example": "Over three hundred applicants submitted online resumes for the marketing trainee role.",
    "exampleThai": "ผู้สมัครงานมากกว่าสามร้อยคนส่งประวัติย่อสมัครงานออนไลน์สำหรับบทบาทพนักงานฝึกหัดการตลาด"
  },
  {
    "id": "v_b1_job_06",
    "word": "vacancy",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ตำแหน่งงานที่ว่าง",
    "alternatives": [
      "การเลิกจ้างพนักงาน",
      "การลาออกกะทันหัน",
      "การปรับโครงสร้าง"
    ],
    "example": "The IT division announced an immediate vacancy for an experienced database administrator.",
    "exampleThai": "ฝ่ายไอทีประกาศตำแหน่งงานที่ว่างทันทีสำหรับผู้ดูแลระบบฐานข้อมูลที่มีประสบการณ์"
  },
  {
    "id": "v_b1_job_07",
    "word": "overtime",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การทำงานล่วงเวลา",
    "alternatives": [
      "การลากิจส่วนตัว",
      "การพักร้อนประจำปี",
      "การเข้างานสาย"
    ],
    "example": "Factory staff receive one-and-a-half times their normal wage for working overtime.",
    "exampleThai": "พนักงานโรงงานได้รับค่าจ้างหนึ่งเท่าครึ่งของค่าจ้างปกติสำหรับการทำงานล่วงเวลา"
  },
  {
    "id": "v_b1_job_08",
    "word": "deadline",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "กำหนดเวลาส่งงาน",
    "alternatives": [
      "เวลาเริ่มงาน",
      "ช่วงพักกลางวัน",
      "วันประกาศผล"
    ],
    "example": "The entire team pulled together to deliver the final prototype before the strict deadline.",
    "exampleThai": "ทั้งทีมร่วมแรงร่วมใจกันเพื่อส่งมอบผลงานต้นแบบชิ้นสุดท้ายก่อนถึงกำหนดเวลาส่งงานที่เข้มงวด"
  },
  {
    "id": "v_b1_job_09",
    "word": "client",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ผู้ว่าจ้างหรือลูกค้าองค์กร",
    "alternatives": [
      "พนักงานฝึกงาน",
      "ผู้ช่วยงานทั่วไป",
      "คู่แข่งทางการค้า"
    ],
    "example": "The architectural consultancy always tailors designs to suit each client's specific aesthetic.",
    "exampleThai": "บริษัทที่ปรึกษาด้านสถาปัตยกรรมปรับแต่งการออกแบบให้ตรงใจผู้ว่าจ้างหรือลูกค้าองค์กรแต่ละรายเสมอ"
  },
  {
    "id": "v_b1_job_10",
    "word": "collaborate",
    "pos": "v.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ร่วมมือประสานงานกัน",
    "alternatives": [
      "แข่งขันเอาชนะ",
      "ทำงานแยกเดี่ยว",
      "ขัดขวางการทำงาน"
    ],
    "example": "Software developers and UX designers collaborate closely to refine the mobile application.",
    "exampleThai": "นักพัฒนาซอฟต์แวร์และนักออกแบบประสบการณ์ผู้ใช้ร่วมมือประสานงานกันอย่างใกล้ชิดเพื่อปรับปรุงแอป"
  },
  {
    "id": "v_b1_job_11",
    "word": "negotiate",
    "pos": "v.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เจรจาต่อรองเงื่อนไข",
    "alternatives": [
      "ยอมจำนนทันที",
      "ปฏิเสธไม่รับฟัง",
      "ยกเลิกข้อตกลง"
    ],
    "example": "The union representative met management to negotiate fair annual wage increases.",
    "exampleThai": "ตัวแทนสหภาพแรงงานเข้าพบฝ่ายบริหารเพื่อเจรจาต่อรองเงื่อนไขการปรับขึ้นค่าจ้างประจำปีที่เป็นธรรม"
  },
  {
    "id": "v_b1_job_12",
    "word": "supervision",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การควบคุมดูแลการทำงาน",
    "alternatives": [
      "การปล่อยปละละเลย",
      "การทำงานตามลำพัง",
      "การหยุดงานประท้วง"
    ],
    "example": "Junior lab apprentices work under the direct supervision of an experienced chemist.",
    "exampleThai": "เด็กฝึกงานห้องแล็บรุ่นเยาว์ทำงานภายใต้การควบคุมดูแลการทำงานโดยตรงของนักเคมีผู้มีประสบการณ์"
  },
  {
    "id": "v_b1_job_13",
    "word": "executive",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ผู้บริหารระดับสูง",
    "alternatives": [
      "พนักงานระดับปฏิบัติการ",
      "พนักงานธุรการ",
      "คนขับรถประจำองค์กร"
    ],
    "example": "Chief corporate executives convened in Singapore to finalize the global merger deal.",
    "exampleThai": "ผู้บริหารระดับสูงขององค์กรประชุมร่วมกันในสิงคโปร์เพื่อสรุปข้อตกลงการควบรวมกิจการระดับโลก"
  },
  {
    "id": "v_b1_job_14",
    "word": "pension",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เงินบำนาญยังชีพ",
    "alternatives": [
      "เงินเดือนทดลองงาน",
      "เงินกู้ยืมเพื่อการศึกษา",
      "เงินชดเชยค่าเดินทาง"
    ],
    "example": "Government civil servants receive a stable monthly pension upon reaching retirement age.",
    "exampleThai": "ข้าราชการพลเรือนได้รับเงินบำนาญยังชีพรายเดือนที่มั่นคงเมื่อถึงวัยเกษียณอายุ"
  },
  {
    "id": "v_b1_job_15",
    "word": "redundancy",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การเลิกจ้างเนื่องจากลดขนาด",
    "alternatives": [
      "การรับพนักงานเพิ่ม",
      "การขยายสาขาใหม่",
      "การเลื่อนขั้นพนักงาน"
    ],
    "example": "Following the bank merger, several branch employees faced involuntary redundancy.",
    "exampleThai": "หลังการควบรวมกิจการธนาคาร พนักงานประจำสาขาหลายคนต้องเผชิญกับการเลิกจ้างเนื่องจากลดขนาด"
  },
  {
    "id": "v_b1_job_16",
    "word": "freelance",
    "pos": "adj.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ประกอบอาชีพอิสระ",
    "alternatives": [
      "บรรจุเป็นข้าราชการ",
      "ทำงานประจำในออฟฟิศ",
      "รับมรดกกิจการ"
    ],
    "example": "Many freelance copywriters enjoy flexible working hours from remote co-working spaces.",
    "exampleThai": "นักเขียนคำโฆษณาที่ประกอบอาชีพอิสระจำนวนมากเพลิดเพลินกับเวลาทำงานที่ยืดหยุ่นจากโคเวิร์กกิ้งสเปซ"
  },
  {
    "id": "v_b1_job_17",
    "word": "entrepreneur",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ผู้ประกอบการธุรกิจ",
    "alternatives": [
      "ผู้จัดการฝ่ายบุคคล",
      "พนักงานเงินเดือนประจำ",
      "ผู้ตรวจสอบภาษี"
    ],
    "example": "The ambitious young entrepreneur launched an innovative organic beverage startup.",
    "exampleThai": "ผู้ประกอบการธุรกิจรุ่นใหม่ผู้มีความทะเยอทะยานได้เปิดตัวสตาร์ทอัพเครื่องดื่มออร์แกนิกอันล้ำสมัย"
  },
  {
    "id": "v_b1_job_18",
    "word": "productivity",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ผลิตภาพและประสิทธิภาพการทำงาน",
    "alternatives": [
      "ความเฉื่อยชาในองค์กร",
      "การขาดงานของพนักงาน",
      "ค่าใช้จ่ายสิ้นเปลือง"
    ],
    "example": "Ergonomic chairs and dual monitors significantly improve software team productivity.",
    "exampleThai": "เก้าอี้เพื่อสุขภาพและจอภาพคู่ช่วยเพิ่มผลิตภาพและประสิทธิภาพการทำงานของทีมนักพัฒนาอย่างมาก"
  },
  {
    "id": "v_b2_job_01",
    "word": "remuneration",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ค่าตอบแทนรวมจากการทำงาน",
    "alternatives": [
      "การลงโทษทางวินัย",
      "การประเมินผลงานล้มเหลว",
      "การถูกหักเงินประกัน"
    ],
    "example": "Executive remuneration packages often combine base salary, performance bonuses, and stock options.",
    "exampleThai": "แพ็กเกจค่าตอบแทนรวมจากการทำงานของผู้บริหารมักรวมเงินเดือนพื้นฐาน โบนัสตามผลงาน และหุ้นบริษัท"
  },
  {
    "id": "v_b2_job_02",
    "word": "probation",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ระยะเวลาทดลองงาน",
    "alternatives": [
      "การเกษียณอายุถาวร",
      "การลาหยุดพักผ่อน",
      "การเลิกจ้างทันที"
    ],
    "example": "Newly hired engineers must complete a ninety-day probation before receiving permanent benefits.",
    "exampleThai": "วิศวกรที่ได้รับการว่าจ้างใหม่ต้องผ่านระยะเวลาทดลองงานเก้าสิบวันก่อนที่จะได้รับสวัสดิการพนักงานประจำ"
  },
  {
    "id": "v_b2_job_03",
    "word": "appraisal",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การประเมินผลการปฏิบัติงาน",
    "alternatives": [
      "การสัมภาษณ์รอบแรก",
      "การปฐมนิเทศพนักงาน",
      "การจัดเลี้ยงประจำปี"
    ],
    "example": "Constructive feedback during the annual performance appraisal helps employees set career goals.",
    "exampleThai": "ข้อเสนอแนะเชิงสร้างสรรค์ระหว่างการประเมินผลการปฏิบัติงานประจำปีช่วยให้พนักงานตั้งเป้าหมายในอาชีพได้ดี"
  },
  {
    "id": "v_b2_job_04",
    "word": "portfolio",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "แฟ้มสะสมผลงานชิ้นเอก",
    "alternatives": [
      "สำเนาบัตรประชาชน",
      "ใบเสร็จค่าธรรมเนียม",
      "แบบทดสอบสุขภาพจิต"
    ],
    "example": "The graphic artist curated a digital portfolio showcasing her high-profile branding campaigns.",
    "exampleThai": "นักออกแบบกราฟิกได้คัดสรรแฟ้มสะสมผลงานชิ้นเอกดิจิทัลที่แสดงผลงานแคมเปญสร้างแบรนด์ชื่อดังของเธอ"
  },
  {
    "id": "v_b2_job_05",
    "word": "severance",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เงินชดเชยการเลิกจ้าง",
    "alternatives": [
      "เงินโบนัสประจำปี",
      "เงินสะสมกองทุน",
      "ค่าเบี้ยเลี้ยงรายวัน"
    ],
    "example": "Laid-off factory technicians were granted six months of severance pay under labor union deals.",
    "exampleThai": "ช่างเทคนิคโรงงานที่ถูกเลิกจ้างได้รับเงินชดเชยการเลิกจ้างเป็นเวลาหกเดือนตามข้อตกลงของสหภาพแรงงาน"
  },
  {
    "id": "v_b2_job_implement",
    "word": "implement",
    "pos": "v.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "นำไปปฏิบัติจริง",
    "alternatives": [
      "ละทิ้งแผนงาน",
      "ระงับโครงการไว้ก่อน",
      "คัดค้านนโยบาย"
    ],
    "example": "The management team worked closely to implement the new environmental policy across all branches.",
    "exampleThai": "ทีมผู้บริหารทำงานร่วมกันอย่างใกล้ชิดเพื่อนำนโยบายสิ่งแวดล้อมใหม่ไปปฏิบัติจริงในทุกสาขา"
  },
  {
    "id": "v_b2_job_07",
    "word": "grievance",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ข้อร้องทุกข์เกี่ยวกับความเป็นธรรม",
    "alternatives": [
      "คำชื่นชมจากผู้บริหาร",
      "ข้อเสนอแนะการเพิ่มยอดขาย",
      "การประกาศรางวัลพนักงานดีเด่น"
    ],
    "example": "The human resources panel investigated the formal grievance regarding unfair workplace discrimination.",
    "exampleThai": "คณะกรรมการฝ่ายทรัพยากรบุคคลได้ตรวจสอบข้อร้องทุกข์เกี่ยวกับความเป็นธรรมอย่างเป็นทางการเรื่องการเลือกปฏิบัติ"
  },
  {
    "id": "v_b2_job_08",
    "word": "bureaucracy",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ระบบขั้นตอนที่ซับซ้อนล่าช้า",
    "alternatives": [
      "การตัดสินใจที่รวดเร็ว",
      "ความคล่องตัวขององค์กร",
      "การบริหารแบบโปร่งใส"
    ],
    "example": "Excessive corporate bureaucracy frustrates innovative employees and delays vital tech launches.",
    "exampleThai": "ระบบขั้นตอนที่ซับซ้อนล่าช้าที่มากเกินไปสร้างความอึดอัดแก่พนักงานผู้มีความคิดสร้างสรรค์และทำให้โครงการเทคโนโลยีล่าช้า"
  },
  {
    "id": "v_b2_job_09",
    "word": "delegate",
    "pos": "v.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "กระจายงานให้ผู้อื่นทำแทน",
    "alternatives": [
      "รวบอำนาจตัดสินใจคนเดียว",
      "ปฏิเสธความรับผิดชอบ",
      "ละเลยหน้าที่"
    ],
    "example": "Effective managers know how to delegate routine tasks so they can focus on long-term strategy.",
    "exampleThai": "ผู้จัดการที่มีประสิทธิภาพย่อมรู้วิธีการกระจายงานให้ผู้อื่นทำแทนเพื่องานประจำ เพื่อตนเองจะได้มุ่งเน้นกลยุทธ์ระยะยาว"
  },
  {
    "id": "v_b2_job_10",
    "word": "consensus",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ฉันทามติความเห็นพ้องต้องกัน",
    "alternatives": [
      "ความขัดแย้งรุนแรง",
      "การโต้เถียงไม่รู้จบ",
      "การใช้อำนาจเผด็จการ"
    ],
    "example": "After lengthy discussions, the board reached a broad consensus on expanding into Asian markets.",
    "exampleThai": "หลังจากการอภิปรายอย่างยาวนาน คณะกรรมการได้บรรลุฉันทามติความเห็นพ้องต้องกันในการขยายสู่ตลาดเอเชีย"
  },
  {
    "id": "v_b2_job_11",
    "word": "expertise",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ความเชี่ยวชาญชำนาญการขั้นสูง",
    "alternatives": [
      "ความรู้ผิวเผินเบื้องต้น",
      "การคาดเดาอย่างไร้หลักการ",
      "ความไร้ประสบการณ์"
    ],
    "example": "The engineering consultancy is recognized globally for its technical expertise in seismic design.",
    "exampleThai": "บริษัทที่ปรึกษาด้านวิศวกรรมได้รับการยอมรับทั่วโลกในด้านความเชี่ยวชาญชำนาญการขั้นสูงในการออกแบบต้านแผ่นดินไหว"
  },
  {
    "id": "v_b2_job_12",
    "word": "hierarchy",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ลำดับขั้นการบังคับบัญชา",
    "alternatives": [
      "ความเท่าเทียมกันทุกคน",
      "การไม่มีผู้นำ",
      "การรวมกลุ่มอิสระ"
    ],
    "example": "Military organizations enforce a strict chain of command and rigid institutional hierarchy.",
    "exampleThai": "องค์กรทางทหารบังคับใช้สายการบังคับบัญชาที่เคร่งครัดและลำดับขั้นการบังคับบัญชาของสถาบันที่ตายตัว"
  },
  {
    "id": "v_b2_job_13",
    "word": "headhunt",
    "pos": "v.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ทาบทามดึงตัวผู้บริหารที่มีฝีมือ",
    "alternatives": [
      "ประกาศรับสมัครทั่วไป",
      "ปลดพนักงานออกจากตำแหน่ง",
      "ลดเงินเดือนผู้บริหาร"
    ],
    "example": "Recruiting specialists were hired to headhunt a seasoned chief financial officer from competitors.",
    "exampleThai": "ผู้เชี่ยวชาญด้านการสรรหาบุคลากรได้รับการว่าจ้างเพื่อทาบทามดึงตัวผู้บริหารที่มีฝีมือในตำแหน่งประธานเจ้าหน้าที่ฝ่ายการเงินจากคู่แข่ง"
  },
  {
    "id": "v_b2_job_coordinate",
    "word": "coordinate",
    "pos": "v.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ประสานงานร่วมมือ",
    "alternatives": [
      "ขัดขวางการทำงาน",
      "ทำงานแบบแยกส่วน",
      "ตัดขาดการสื่อสาร"
    ],
    "example": "The project manager must coordinate with different departments to ensure timely delivery.",
    "exampleThai": "ผู้จัดการโครงการต้องประสานงานร่วมมือกับแผนกต่างๆ เพื่อให้มั่นใจว่าจะส่งมอบงานได้ตรงเวลา"
  },
  {
    "id": "v_b2_job_facilitate",
    "word": "facilitate",
    "pos": "v.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "อำนวยความสะดวก",
    "alternatives": [
      "สร้างอุปสรรคกีดขวาง",
      "ทำให้ล่าช้าซับซ้อน",
      "ปฏิเสธการช่วยเหลือ"
    ],
    "example": "Modern digital tools help facilitate communication between remote team members.",
    "exampleThai": "เครื่องมือดิจิทัลสมัยใหม่ช่วยอำนวยความสะดวกในการสื่อสารระหว่างสมาชิกในทีมที่ทำงานจากระยะไกล"
  },
  {
    "id": "v_b2_job_16",
    "word": "whistleblowing",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การแจ้งเบาะแสการทุจริตในองค์กร",
    "alternatives": [
      "การปกปิดความผิด",
      "การสมรู้ร่วมคิด",
      "การทำลายหลักฐาน"
    ],
    "example": "Courageous whistleblowing by internal accountants revealed massive accounting fraud to federal regulators.",
    "exampleThai": "การแจ้งเบาะแสการทุจริตในองค์กรอย่างกล้าหาญโดยนักบัญชีภายในได้เปิดเผยการทุจริตทางบัญชีครั้งใหญ่ต่อหน่วยงานกำกับดูแล"
  },
  {
    "id": "v_b2_job_17",
    "word": "sabbatical",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การลาพักงานเพื่อทำวิจัยหรือศึกษาต่อ",
    "alternatives": [
      "การถูกพักงานลงโทษ",
      "การลาออกถาวร",
      "การลาป่วยเรื้อรัง"
    ],
    "example": "Professor Davis took a one-year sabbatical in Florence to complete his research monograph.",
    "exampleThai": "ศาสตราจารย์เดวิสได้รับอนุมัติการลาพักงานเพื่อทำวิจัยหรือศึกษาต่อเป็นเวลาหนึ่งปีในเมืองฟลอเรนซ์เพื่อเขียนตำราวิจัย"
  },
  {
    "id": "v_a1_hobby_01",
    "word": "sport",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กีฬาเพื่อสุขภาพ",
    "alternatives": [
      "งานฝีมือ",
      "การอ่านหนังสือ",
      "การทำสวน"
    ],
    "example": "Playing a team sport like basketball teaches youngsters collaboration.",
    "exampleThai": "การเล่นกีฬาเพื่อสุขภาพเป็นทีมอย่างบาสเกตบอลสอนให้เยาวชนรู้จักการร่วมมือกัน"
  },
  {
    "id": "v_a1_hobby_02",
    "word": "game",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เกมการละเล่น",
    "alternatives": [
      "การบ้านวิชาการ",
      "การทำความสะอาด",
      "การทดสอบความรู้"
    ],
    "example": "Children gathered on the grass to play a cheerful board game.",
    "exampleThai": "เด็กๆ มารวมตัวกันบนสนามหญ้าเพื่อเล่นเกมการละเล่นกระดานอันแสนสนุกสนาน"
  },
  {
    "id": "v_a1_hobby_03",
    "word": "play",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เล่นสนุกสนาน",
    "alternatives": [
      "ทำงานบ้าน",
      "อ่านหนังสือสอบ",
      "นอนหลับพัก"
    ],
    "example": "The neighborhood boys love to play football in the empty lot.",
    "exampleThai": "เด็กผู้ชายในละแวกบ้านชอบเล่นสนุกสนานเตะฟุตบอลในลานกว้างว่างเปล่า"
  },
  {
    "id": "v_a1_hobby_04",
    "word": "run",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "วิ่งออกกำลังกาย",
    "alternatives": [
      "เดินเล่นช้าๆ",
      "นั่งสมาธิ",
      "นอนพักผ่อน"
    ],
    "example": "She gets up at six every dawn to run three laps around the lake.",
    "exampleThai": "เธอตื่นนอนหกโมงเช้าทุกรุ่งอรุณเพื่อวิ่งออกกำลังกายสามรอบรอบทะเลสาบ"
  },
  {
    "id": "v_a1_hobby_05",
    "word": "swim",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ว่ายน้ำในสระ",
    "alternatives": [
      "ปีนป่ายต้นไม้",
      "ปั่นจักรยาน",
      "กระโดดเชือก"
    ],
    "example": "On scorching summer afternoons, we swim in the cool village pool.",
    "exampleThai": "ในบ่ายวันฤดูร้อนที่แดดแผดเผา พวกเราจะว่ายน้ำในสระของหมู่บ้านอันเย็นฉ่ำ"
  },
  {
    "id": "v_a1_hobby_06",
    "word": "jump",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กระโดด",
    "alternatives": [
      "นอนหลับ",
      "นั่งพักผ่อน",
      "คลาน"
    ],
    "example": "Track athletes train daily to jump higher over the hurdles.",
    "exampleThai": "นักกรีฑาฝึกซ้อมทุกวันเพื่อกระโดดข้ามสิ่งกีดขวางรั้วกั้นให้สูงขึ้น"
  },
  {
    "id": "v_a1_hobby_07",
    "word": "ball",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ลูกบอลกลม",
    "alternatives": [
      "ไม้ตีเบสบอล",
      "ตาข่ายกั้น",
      "ถุงมือหนัง"
    ],
    "example": "He kicked the inflatable soccer ball straight into the goal net.",
    "exampleThai": "เขาเตะลูกบอลกลมหนังเข้าสู่ก้นตาข่ายประตูอย่างแม่นยำ"
  },
  {
    "id": "v_a1_hobby_08",
    "word": "football",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กีฬาฟุตบอล",
    "alternatives": [
      "กีฬาเทนนิส",
      "กีฬาว่ายน้ำ",
      "กีฬากอล์ฟ"
    ],
    "example": "Football is the most passionately watched spectator sport across the globe.",
    "exampleThai": "กีฬาฟุตบอลคือกีฬาที่มีผู้ชมติดตามชมอย่างหลงใหลมากที่สุดทั่วทุกมุมโลก"
  },
  {
    "id": "v_a1_hobby_09",
    "word": "music",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เสียงดนตรีไพเราะ",
    "alternatives": [
      "เสียงแตรรถ",
      "เสียงลมพัด",
      "เสียงเครื่องจักร"
    ],
    "example": "Listening to gentle acoustic music helps him unwind after study sessions.",
    "exampleThai": "การรับฟังเสียงดนตรีไพเราะแบบอะคูสติกนุ่มนวลช่วยให้เขาผ่อนคลายหลังอ่านหนังสือ"
  },
  {
    "id": "v_a1_hobby_10",
    "word": "song",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "บทเพลงขับร้อง",
    "alternatives": [
      "บทความวิชาการ",
      "บทสนทนา",
      "คำแถลงการณ์"
    ],
    "example": "The choir sang an uplifting traditional folk song together harmoniously.",
    "exampleThai": "คณะนักร้องประสานเสียงขับร้องบทเพลงขับร้องพื้นบ้านอันไพเราะร่วมกันอย่างกลมกลืน"
  },
  {
    "id": "v_a1_hobby_11",
    "word": "draw",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "วาดภาพลายเส้น",
    "alternatives": [
      "ตัดแปะกระดาษ",
      "ปั้นดินน้ำมัน",
      "พับกระดาษ"
    ],
    "example": "She uses fine graphite pencils to draw realistic animal portraits.",
    "exampleThai": "เธอใช้ดินสอกราไฟต์หัวละเอียดเพื่อวาดภาพลายเส้นเหมือนจริงของสัตว์เลี้ยง"
  },
  {
    "id": "v_a1_hobby_12",
    "word": "paint",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ระบายสีภาพ",
    "alternatives": [
      "ตัดกระดาษ",
      "พิมพ์ตัวอักษร",
      "ฉีกรูปภาพ"
    ],
    "example": "The artist loves to paint vibrant watercolor landscapes of coastal beaches.",
    "exampleThai": "ศิลปินชื่นชอบที่จะระบายสีภาพทิวทัศน์สีน้ำอันสดใสของชายหาดริมทะเล"
  },
  {
    "id": "v_a1_hobby_13",
    "word": "book",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "หนังสืออ่านเล่น",
    "alternatives": [
      "สมุดบันทึกเปล่า",
      "หนังสือพิมพ์รายวัน",
      "แผ่นพับโฆษณา"
    ],
    "example": "Curling up with a captivating fantasy novel book is her favorite hobby.",
    "exampleThai": "การนอนอ่านหนังสืออ่านเล่นนิยายแฟนตาซีอันน่าหลงใหลคืองานอดิเรกที่เธอโปรดปราน"
  },
  {
    "id": "v_a1_hobby_14",
    "word": "film",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ภาพยนตร์บันเทิง",
    "alternatives": [
      "รายการข่าวเช้า",
      "การถ่ายทอดสดกีฬา",
      "สารคดีวิทยาศาสตร์"
    ],
    "example": "We bought buttered popcorn and watched a funny animated family film.",
    "exampleThai": "พวกเราซื้อป๊อปคอร์นเนยหอมกรุ่นและดูภาพยนตร์บันเทิงแอนิเมชันสำหรับครอบครัวแสนสนุก"
  },
  {
    "id": "v_a1_hobby_15",
    "word": "listen",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "รับฟังดนตรี",
    "alternatives": [
      "ร้องเพลงเสียงดัง",
      "เปิดเสียงรบกวน",
      "ปิดหูเงียบ"
    ],
    "example": "Put on your wireless headphones and listen to soothing nature sounds.",
    "exampleThai": "สวมหูฟังไร้สายและรับฟังดนตรีเสียงธรรมชาติอันผ่อนคลาย"
  },
  {
    "id": "v_a1_hobby_16",
    "word": "watch",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ชมการแข่งขัน",
    "alternatives": [
      "ลงสนามแข่งขัน",
      "ตัดสินการแข่งขัน",
      "เดินหนีไป"
    ],
    "example": "Thousands of eager spectators gather in the arena to watch the final.",
    "exampleThai": "ผู้ชมที่กระตือรือร้นหลายพันคนมารวมตัวกันในสนามเพื่อชมการแข่งขันรอบชิงชนะเลิศ"
  },
  {
    "id": "v_a1_hobby_17",
    "word": "guitar",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กีตาร์โปร่ง",
    "alternatives": [
      "กลองชุด",
      "ไวโอลิน",
      "แซกโซโฟน"
    ],
    "example": "He strummed soft chords on his wooden acoustic guitar around the campfire.",
    "exampleThai": "เขาดีดคอร์ดนุ่มนวลบนกีตาร์โปร่งไม้รอบกองไฟแคมป์ปิ้ง"
  },
  {
    "id": "v_a1_hobby_18",
    "word": "piano",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เปียโนคลาสสิก",
    "alternatives": [
      "ฟลูตเป่า",
      "ฮาร์ป",
      "ทรัมเป็ต"
    ],
    "example": "The young prodigy played a lively classical piece on the grand piano.",
    "exampleThai": "เด็กอัจฉริยะรุ่นเยาว์บรรเลงบทเพลงคลาสสิกอันมีชีวิตชีวาบนเปียโนคลาสสิกหลังใหญ่"
  },
  {
    "id": "v_a1_hobby_19",
    "word": "photo",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ภาพถ่ายประทับใจ",
    "alternatives": [
      "ภาพวาดสีน้ำมัน",
      "รูปปั้นหินอ่อน",
      "ภาพร่างดินสอ"
    ],
    "example": "She framed a scenic panoramic photo of the misty Chiang Mai mountains.",
    "exampleThai": "เธอใส่กรอบภาพถ่ายประทับใจมุมกว้างของขุนเขาเชียงใหม่อันปกคลุมด้วยไอหมอก"
  },
  {
    "id": "v_a1_hobby_20",
    "word": "park",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "สวนสาธารณะ",
    "alternatives": [
      "ลานจอดรถยนต์",
      "ห้างสรรพสินค้า",
      "โรงภาพยนตร์"
    ],
    "example": "Families enjoy relaxed picnics under the shade of ancient trees in the park.",
    "exampleThai": "ครอบครัวต่างๆ เพลิดเพลินกับการปิกนิกผ่อนคลายใต้ร่มเงาต้นไม้ใหญ่ในสวนสาธารณะ"
  },
  {
    "id": "v_a1_hobby_21",
    "word": "ride",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ขี่จักรยานท่องเที่ยว",
    "alternatives": [
      "เดินจูงจักรยาน",
      "ซ่อมยางรถ",
      "ล้างโซ่จักรยาน"
    ],
    "example": "On breezy Sunday mornings, we ride through scenic countryside cycling trails.",
    "exampleThai": "ในเช้าวันอาทิตย์ที่มีลมโชย พวกเราจะขี่จักรยานท่องเที่ยวตามเส้นทางธรรมชาติในชนบท"
  },
  {
    "id": "v_a1_hobby_22",
    "word": "fun",
    "pos": "adj.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "สนุกสนานเพลิดเพลิน",
    "alternatives": [
      "น่าเบื่อหน่าย",
      "เคร่งเครียด",
      "เศร้าซึม"
    ],
    "example": "Learning conversational English through lively roleplays is genuinely fun.",
    "exampleThai": "การเรียนรู้ภาษาอังกฤษเพื่อการสื่อสารผ่านบทบาทสมมติที่มีชีวิตชีวานั้นสนุกสนานเพลิดเพลินอย่างแท้จริง"
  },
  {
    "id": "v_a1_hobby_23",
    "word": "like",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ชื่นชอบโปรดปราน",
    "alternatives": [
      "เกลียดชัง",
      "ปฏิเสธ",
      "เบื่อหน่าย"
    ],
    "example": "I really like planting flowering herbs in our sunny balcony pots.",
    "exampleThai": "ฉันชื่นชอบโปรดปรานการปลูกสมุนไพรมีดอกในกระถางตรงระเบียงแดดส่องถึงอย่างยิ่ง"
  },
  {
    "id": "v_a1_hobby_24",
    "word": "hobby",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "งานอดิเรกยามว่าง",
    "alternatives": [
      "งานอาชีพประจำ",
      "ภาระหน้าที่บ้าน",
      "การศึกษาภาคบังคับ"
    ],
    "example": "Collecting vintage postage stamps is an educational and relaxing hobby.",
    "exampleThai": "การสะสมแสตมป์โบราณเป็นงานอดิเรกยามว่างที่ให้ความรู้และสร้างความผ่อนคลาย"
  },
  {
    "id": "v_a1_hobby_25",
    "word": "walk",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เดินเล่นผ่อนคลาย",
    "alternatives": [
      "วิ่งสปรินต์",
      "กระโดดข้ามรั้ว",
      "นั่งพักนิ่งๆ"
    ],
    "example": "Take a gentle thirty-minute walk every sunset to clear your mind.",
    "exampleThai": "ไปเดินเล่นผ่อนคลายเบาๆ สามสิบนาทีทุกยามอาทิตย์อัสดงเพื่อผ่อนคลายสมอง"
  },
  {
    "id": "v_a1_hobby_26",
    "word": "win",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ชนะการแข่งขัน",
    "alternatives": [
      "พ่ายแพ้การแข่งขัน",
      "สละสิทธิ์การแข่ง",
      "เสมอแต้มกัน"
    ],
    "example": "The school team fought valiantly to win the provincial football trophy.",
    "exampleThai": "ทีมโรงเรียนต่อสู้อย่างกล้าหาญจนสามารถชนะการแข่งขันและคว้าถ้วยฟุตบอลระดับจังหวัด"
  },
  {
    "id": "v_a1_hobby_27",
    "word": "lose",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "พ่ายแพ้ในเกม",
    "alternatives": [
      "คว้าชัยชนะ",
      "เสมอการแข่งขัน",
      "ทำลายสถิติ"
    ],
    "example": "Even if you lose a tough game, focus on lessons learned and keep spirits high.",
    "exampleThai": "แม้ว่าคุณจะพ่ายแพ้ในเกมอันยากลำบาก จงมุ่งเน้นบทเรียนที่ได้และรักษาขวัญกำลังใจไว้"
  },
  {
    "id": "v_a1_hobby_28",
    "word": "player",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ผู้เล่นในสนาม",
    "alternatives": [
      "กรรมการผู้ตัดสิน",
      "โค้ชผู้ฝึกสอน",
      "ผู้ชมบนอัฒจันทร์"
    ],
    "example": "Every football player must show mutual respect toward the referee's calls.",
    "exampleThai": "ผู้เล่นในสนามฟุตบอลทุกคนต้องแสดงความเคารพซึ่งกันและกันต่อคำตัดสินของกรรมการ"
  },
  {
    "id": "v_a1_hobby_29",
    "word": "team",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ทีมกีฬารวมใจ",
    "alternatives": [
      "นักกีฬาเดี่ยว",
      "กรรมการตัดสิน",
      "ผู้สนับสนุน"
    ],
    "example": "Our local volleyball team won five consecutive matches this championship season.",
    "exampleThai": "ทีมกีฬารวมใจวอลเลย์บอลประจำท้องถิ่นของเราชนะห้านัดติดต่อกันในฤดูกาลแข่งขันนี้"
  },
  {
    "id": "v_a1_hobby_30",
    "word": "match",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การแข่งขันกีฬา",
    "alternatives": [
      "การฝึกซ้อมเดี่ยว",
      "การประกาศรางวัลเกียรติยศ",
      "พิธีเปิดงาน"
    ],
    "example": "The championship tennis match stretched into an exciting five-set thriller.",
    "exampleThai": "การแข่งขันกีฬาหนึ่งนัดเทนนิสชิงชนะเลิศยืดเยื้อจนกลายเป็นการต่อสู้ห้าเซตอันน่าตื่นเต้น"
  },
  {
    "id": "v_a2_hobby_01",
    "word": "badminton",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กีฬาแบดมินตัน",
    "alternatives": [
      "กีฬาเทเบิลเทนนิส",
      "กีฬาสควอช",
      "กีฬาเบสบอล"
    ],
    "example": "Smashing the shuttlecock across the high net is central to badminton.",
    "exampleThai": "การตบลูกขนไก่ข้ามตาข่ายสูงเป็นหัวใจสำคัญของกีฬาแบดมินตัน"
  },
  {
    "id": "v_a2_hobby_02",
    "word": "tennis",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กีฬาเทนนิส",
    "alternatives": [
      "กีฬาแบดมินตัน",
      "กีฬากอล์ฟ",
      "กีฬาบิลเลียด"
    ],
    "example": "She practiced her powerful tennis serve on the clay court every morning.",
    "exampleThai": "เธอฝึกซ้อมการเสิร์ฟกีฬาเทนนิสอันทรงพลังบนคอร์ทดินทุกเช้า"
  },
  {
    "id": "v_a2_hobby_03",
    "word": "basketball",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กีฬาบาสเกตบอล",
    "alternatives": [
      "กีฬาวอลเลย์บอล",
      "กีฬาแฮนด์บอล",
      "กีฬาเบสบอล"
    ],
    "example": "Dribbling swiftly past defenders requires quick footwork in basketball.",
    "exampleThai": "การเลี้ยงลูกหลบกองหลังอย่างรวดเร็วต้องอาศัยสเต็ปเท้าที่คล่องแคล่วในกีฬาบาสเกตบอล"
  },
  {
    "id": "v_a2_hobby_04",
    "word": "volleyball",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กีฬาวอลเลย์บอล",
    "alternatives": [
      "กีฬาฟุตซอล",
      "กีฬาเซปักตะกร้อ",
      "กีฬาโบว์ลิ่ง"
    ],
    "example": "Thailand's national women's volleyball team is loved for their teamwork.",
    "exampleThai": "ทีมกีฬาวอลเลย์บอลหญิงทีมชาติไทยเป็นที่รักของผู้คนด้วยการเล่นเป็นทีมที่ยอดเยี่ยม"
  },
  {
    "id": "v_a2_hobby_05",
    "word": "instrument",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เครื่องดนตรีสากล",
    "alternatives": [
      "เครื่องเสียงลำโพง",
      "ไมโครโฟนไร้สาย",
      "แท่นวางโน้ตเพลง"
    ],
    "example": "Learning to play a musical instrument boosts cognitive memory and focus.",
    "exampleThai": "การเรียนรู้ที่จะเล่นเครื่องดนตรีสากลช่วยส่งเสริมความจำและสมาธิของสมอง"
  },
  {
    "id": "v_a2_hobby_06",
    "word": "concert",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "คอนเสิร์ตการแสดงสด",
    "alternatives": [
      "การซ้อมในห้องอัด",
      "การสัมภาษณ์วิทยุ",
      "งานแจกลายเซ็น"
    ],
    "example": "Thousands of cheering fans sang along at the stadium rock concert.",
    "exampleThai": "แฟนเพลงหลายพันคนที่ส่งเสียงเชียร์ร้องเพลงตามในคอนเสิร์ตการแสดงสดร็อคที่สนามกีฬา"
  },
  {
    "id": "v_a2_hobby_07",
    "word": "exhibition",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "นิทรรศการศิลปะ",
    "alternatives": [
      "การประมูลภาพเขียน",
      "การจัดสัมมนา",
      "การแข่งขันกีฬา"
    ],
    "example": "The contemporary art gallery hosted a fascinating photographic exhibition.",
    "exampleThai": "หอศิลป์ร่วมสมัยจัดนิทรรศการศิลปะภาพถ่ายที่น่าหลงใหลอย่างยิ่ง"
  },
  {
    "id": "v_a2_hobby_08",
    "word": "photography",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ศาสตร์การถ่ายภาพ",
    "alternatives": [
      "งานปั้นประติมากรรม",
      "การจัดดอกไม้",
      "การออกแบบสิ่งทอ"
    ],
    "example": "Landscape photography requires mastering natural lighting and composition.",
    "exampleThai": "ศาสตร์การถ่ายภาพทิวทัศน์ต้องอาศัยความเชี่ยวชาญด้านแสงธรรมชาติและการจัดองค์ประกอบ"
  },
  {
    "id": "v_a2_hobby_09",
    "word": "collection",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ของสะสมทรงคุณค่า",
    "alternatives": [
      "สิ่งของเหลือใช้",
      "ขยะรีไซเคิล",
      "สินค้าพร้อมจำหน่าย"
    ],
    "example": "He preserves a rare collection of antique vinyl records in special sleeves.",
    "exampleThai": "เขาเก็บรักษาของสะสมทรงคุณค่าแผ่นเสียงไวนิลโบราณหายากไว้ในซองเฉพาะ"
  },
  {
    "id": "v_a2_hobby_10",
    "word": "competition",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การประกวดประชันความสามารถ",
    "alternatives": [
      "การร่วมมือเป็นพันธมิตร",
      "การฝึกซ้อมส่วนตัว",
      "การพักผ่อน"
    ],
    "example": "High school bands entered the annual brass band music competition.",
    "exampleThai": "วงดนตรีระดับมัธยมศึกษาเข้าร่วมการประกวดประชันความสามารถวงดุริยางค์ประจำปี"
  },
  {
    "id": "v_a2_hobby_11",
    "word": "champion",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "แชมป์เปี้ยนผู้ชนะเลิศ",
    "alternatives": [
      "รองชนะเลิศอันดับหนึ่ง",
      "ผู้ร่วมการแข่งขัน",
      "คณะกรรมการตัดสิน"
    ],
    "example": "The reigning swimming champion broke another national speed record.",
    "exampleThai": "แชมป์เปี้ยนผู้ชนะเลิศว่ายน้ำคนปัจจุบันทำลายสถิติความเร็วระดับชาติลงได้อีกครั้ง"
  },
  {
    "id": "v_a2_hobby_12",
    "word": "medal",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เหรียญรางวัลเกียรติยศ",
    "alternatives": [
      "ใบประกาศนียบัตร",
      "ริบบิ้นประดับ",
      "ของที่ระลึก"
    ],
    "example": "The Olympic gymnast proudly wore her shining gold medal on the podium.",
    "exampleThai": "นักยิมนาสติกโอลิมปิกสวมเหรียญรางวัลเกียรติยศทองคำแวววาวอย่างภาคภูมิใจบนโพเดียม"
  },
  {
    "id": "v_a2_hobby_13",
    "word": "trophy",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ถ้วยรางวัลชนะเลิศ",
    "alternatives": [
      "ป้ายชื่อทีม",
      "ธงประจำสโมสร",
      "เหรียญทองแดง"
    ],
    "example": "The team captain hoisted the glittering silver championship trophy high.",
    "exampleThai": "กัปตันทีมชูถ้วยรางวัลชนะเลิศสีเงินอันระยิบระยับขึ้นสูงเหนือศีรษะ"
  },
  {
    "id": "v_a2_hobby_14",
    "word": "stadium",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "สนามกีฬาหลัก",
    "alternatives": [
      "โรงยิมในร่ม",
      "ห้องออกกำลังกาย",
      "ลานกิจกรรม"
    ],
    "example": "Sixty thousand supporters packed into Rajamangala National Stadium.",
    "exampleThai": "แฟนบอลหกหมื่นคนเบียดเสียดกันเข้ามาชมในสนามกีฬาหลักราชมังคลากีฬาสถาน"
  },
  {
    "id": "v_a2_hobby_15",
    "word": "gym",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "โรงยิมออกกำลังกาย",
    "alternatives": [
      "สนามฟุตบอลกลางแจ้ง",
      "สระว่ายน้ำ",
      "ลู่วิ่งกรีฑา"
    ],
    "example": "He hits the local weights gym three evenings every single week.",
    "exampleThai": "เขาเข้าโรงยิมออกกำลังกายยกน้ำหนักในท้องถิ่นสามช่วงเย็นในทุกๆ สัปดาห์"
  },
  {
    "id": "v_a2_hobby_16",
    "word": "fitness",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "สมรรถภาพทางกายภาพ",
    "alternatives": [
      "ทัศนคติทางสังคม",
      "ความรู้ทางทฤษฎี",
      "ทักษะการคำนวณ"
    ],
    "example": "Consistent aerobic workouts enhance overall stamina and cardiovascular fitness.",
    "exampleThai": "การออกกำลังกายแบบแอโรบิกอย่างต่อเนื่องช่วยเพิ่มความอึดและสมรรถภาพทางกายภาพของหัวใจ"
  },
  {
    "id": "v_a2_hobby_17",
    "word": "leisure",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เวลาว่างผ่อนคลาย",
    "alternatives": [
      "ชั่วโมงทำงานล่วงเวลา",
      "เวลาการประชุมเครียด",
      "การสอบสัมภาษณ์"
    ],
    "example": "Reading mystery novels by the seaside is her favored leisure pursuit.",
    "exampleThai": "การอ่านนิยายสืบสวนริมทะเลเป็นกิจกรรมในเวลาว่างผ่อนคลายที่เธอโปรดปราน"
  },
  {
    "id": "v_a2_hobby_18",
    "word": "camping",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การกางเต็นท์พักแรม",
    "alternatives": [
      "การพักโรงแรมหรู",
      "การเดินทางข้ามทวีป",
      "การล่องเรือยอชต์"
    ],
    "example": "Weekend forest camping allows friends to gaze at constellations by the fire.",
    "exampleThai": "การกางเต็นท์พักแรมในป่าช่วงสุดสัปดาห์ช่วยให้เพื่อนๆ ได้ชมกลุ่มดาวข้างกองไฟ"
  },
  {
    "id": "v_a2_hobby_19",
    "word": "hiking",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การเดินป่าขึ้นเขา",
    "alternatives": [
      "การนั่งรถราง",
      "การขับรถสปอร์ต",
      "การนอนอาบแดด"
    ],
    "example": "Pack sturdy boots and plentiful drinking water before embarking on alpine hiking.",
    "exampleThai": "เตรียมรองเท้าบูทที่ทนทานและน้ำดื่มปริมาณมากก่อนเริ่มการเดินป่าขึ้นเขาในแถบเทือกเขา"
  },
  {
    "id": "v_a2_hobby_20",
    "word": "diving",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การดำน้ำลึกชมปะการัง",
    "alternatives": [
      "การพายเรือคายัค",
      "การเล่นวินด์เซิร์ฟ",
      "การตกปลาริมฝั่ง"
    ],
    "example": "The Similan Islands offer world-class scuba diving among colorful marine reefs.",
    "exampleThai": "หมู่เกาะสิมิลันนำเสนอการดำน้ำลึกชมปะการังระดับโลกท่ามกลางแนวปะการังใต้ทะเลหลากสีสัน"
  },
  {
    "id": "v_a2_hobby_21",
    "word": "score",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "คะแนนการแข่งขัน",
    "alternatives": [
      "เวลาการแข่งขัน",
      "สถิติการครองบอล",
      "จำนวนผู้เข้าชม"
    ],
    "example": "The electric scoreboard showed an intense tie score of two-all.",
    "exampleThai": "ป้ายคะแนนไฟฟ้าแสดงคะแนนการแข่งขันที่เสมอกันอย่างดุเดือดสองต่อสอง"
  },
  {
    "id": "v_a2_hobby_22",
    "word": "referee",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กรรมการผู้ตัดสินในสนาม",
    "alternatives": [
      "กัปตันทีมฟุตบอล",
      "ผู้รักษาประตู",
      "โค้ชทีมเหย้า"
    ],
    "example": "The strict soccer referee blew his whistle and brandished a yellow card.",
    "exampleThai": "กรรมการผู้ตัดสินในสนามฟุตบอลผู้เข้มงวดเป่านกหวีดและชูใบเหลืองเตือน"
  },
  {
    "id": "v_a2_hobby_23",
    "word": "fan",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "แฟนคลับผู้สนับสนุน",
    "alternatives": [
      "นักข่าวกีฬา",
      "เจ้าหน้าที่สนาม",
      "สปอนเซอร์รายใหญ่"
    ],
    "example": "Passionate football fans waved colorful team scarves throughout the ninety minutes.",
    "exampleThai": "แฟนคลับผู้สนับสนุนฟุตบอลผู้กระตือรือร้นโบกผ้าพันคอทีมสีสันสดใสตลอดเก้าสิบนาที"
  },
  {
    "id": "v_a2_hobby_24",
    "word": "tournament",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การแข่งขันชิงแชมป์ตามรอบ",
    "alternatives": [
      "การฝึกซ้อมภายใน",
      "การสาธิตการเล่น",
      "การคัดเลือกตัว"
    ],
    "example": "Sixteen regional school teams advanced to the national youth basketball tournament.",
    "exampleThai": "ทีมโรงเรียนประจำภูมิภาคสิบหกทีมผ่านเข้าสู่การแข่งขันชิงแชมป์ตามรอบบาสเกตบอลเยาวชนระดับชาติ"
  },
  {
    "id": "v_a2_hobby_25",
    "word": "practice",
    "pos": "v.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ฝึกซ้อมทักษะอย่างสม่ำเสมอ",
    "alternatives": [
      "หยุดพักผ่อนยาว",
      "ละเลยการออกกำลัง",
      "ลงแข่งโดยไม่เตรียมตัว"
    ],
    "example": "You must practice scales on the violin daily to achieve fluid intonation.",
    "exampleThai": "คุณต้องฝึกซ้อมทักษะอย่างสม่ำเสมอในการไล่บันไดเสียงบนไวโอลินทุกวันเพื่อให้ได้สำเนียงที่พริ้วไหว"
  },
  {
    "id": "v_a2_hobby_26",
    "word": "join",
    "pos": "v.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เข้าร่วมชมรมกิจกรรม",
    "alternatives": [
      "ลาออกจากการเป็นสมาชิก",
      "ปฏิเสธการร่วมงาน",
      "ยกเลิกการสมัคร"
    ],
    "example": "She decided to join the university photography club to meet fellow shutterbugs.",
    "exampleThai": "เธอตัดสินใจเข้าร่วมชมรมกิจกรรมถ่ายภาพของมหาวิทยาลัยเพื่อพบปะเพื่อนๆ ที่รักการถ่ายภาพ"
  },
  {
    "id": "v_a2_hobby_27",
    "word": "court",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "คอร์ทสนามแข่งขัน",
    "alternatives": [
      "ลู่วิ่งดิน",
      "สระว่ายน้ำโอลิมปิก",
      "ลานสเก็ตน้ำแข็ง"
    ],
    "example": "The newly resurfaced tennis court provides superior traction and ball bounce.",
    "exampleThai": "คอร์ทสนามแข่งขันเทนนิสที่เพิ่งปูพื้นผิวใหม่ให้การยึดเกาะและการกระดอนของลูกที่ยอดเยี่ยม"
  },
  {
    "id": "v_b1_hobby_01",
    "word": "athletics",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กรีฑาประเภทลู่และลาน",
    "alternatives": [
      "กีฬาทางน้ำ",
      "กีฬาต่อสู้ประชิด",
      "กีฬาเอ็กซ์ตรีม"
    ],
    "example": "Olympic athletics encompass thrilling sprints, long-distance runs, and high jumps.",
    "exampleThai": "กรีฑาประเภทลู่และลานในโอลิมปิกรวมถึงการวิ่งระยะสั้นสุดตื่นเต้น การวิ่งระยะไกล และการกระโดดสูง"
  },
  {
    "id": "v_b1_hobby_02",
    "word": "marathon",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การวิ่งมาราธอนระยะไกล",
    "alternatives": [
      "การวิ่งระยะสั้นร้อยเมตร",
      "การเดินการกุศล",
      "การแข่งวิ่งผลัด"
    ],
    "example": "Completing a full forty-two-kilometer marathon demands months of rigorous endurance training.",
    "exampleThai": "การจบการวิ่งมาราธอนระยะไกลระยะทางสี่สิบสองกิโลเมตรต้องอาศัยการฝึกซ้อมความอึดอย่างเข้มงวดนานหลายเดือน"
  },
  {
    "id": "v_b1_hobby_03",
    "word": "endurance",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ความอดทนทนทานของร่างกาย",
    "alternatives": [
      "ความเร็วในการออกตัว",
      "ความยืดหยุ่นของข้อต่อ",
      "ความแม่นยำในการยิง"
    ],
    "example": "Triathletes cultivate immense physical endurance across swimming, cycling, and long running.",
    "exampleThai": "นักไตรกีฬาเพาะบ่มความอดทนทนทานของร่างกายอันมหาศาลผ่านการว่ายน้ำ ปั่นจักรยาน และวิ่งระยะไกล"
  },
  {
    "id": "v_b1_hobby_04",
    "word": "amateur",
    "pos": "adj.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ระดับสมัครเล่น",
    "alternatives": [
      "ระดับมืออาชีพชั้นแนวหน้า",
      "ระดับแชมป์โลก",
      "ระดับผู้ว่าจ้าง"
    ],
    "example": "The weekend tournament welcomed both amateur boxing clubs and novice practitioners.",
    "exampleThai": "ทัวร์นาเมนต์วันหยุดสุดสัปดาห์ต้อนรับทั้งชมรมมวยระดับสมัครเล่นและผู้ฝึกหัดมือใหม่"
  },
  {
    "id": "v_b1_hobby_05",
    "word": "professional",
    "pos": "adj.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ระดับมืออาชีพ",
    "alternatives": [
      "ระดับมือสมัครเล่น",
      "ระดับหัดเล่น",
      "ระดับทั่วไป"
    ],
    "example": "Transitioning from college leagues to professional soccer requires intense physical discipline.",
    "exampleThai": "การเปลี่ยนผ่านจากลีกระดับมหาวิทยาลัยไปสู่ฟุตบอลระดับมืออาชีพต้องใช้วินัยทางร่างกายอย่างเข้มงวด"
  },
  {
    "id": "v_b1_hobby_06",
    "word": "recreation",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กิจกรรมนันทนาการพักผ่อน",
    "alternatives": [
      "การทำงานล่วงเวลา",
      "การแข่งขันดุเดือด",
      "การศึกษาภาคทฤษฎี"
    ],
    "example": "Community sports facilities provide active physical recreation for neighborhood children.",
    "exampleThai": "ศูนย์กีฬาชุมชนจัดกิจกรรมนันทนาการพักผ่อนที่กระฉับกระเฉงทางร่างกายสำหรับเด็กๆ ในละแวกบ้าน"
  },
  {
    "id": "v_b1_hobby_07",
    "word": "wellness",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "สุขภาวะที่สมบูรณ์",
    "alternatives": [
      "อาการป่วยเรื้อรัง",
      "ความเหนื่อยล้าสะสม",
      "ความเครียดสะสม"
    ],
    "example": "Yoga retreats combine mindfulness and balanced nutrition to foster holistic wellness.",
    "exampleThai": "การเข้าค่ายโยคะผสมผสานการเจริญสติและโภชนาการที่สมดุลเพื่อส่งเสริมสุขภาวะที่สมบูรณ์แบบองค์รวม"
  },
  {
    "id": "v_b1_hobby_08",
    "word": "choreography",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การออกแบบท่าเต้น",
    "alternatives": [
      "การแต่งทำนองเพลง",
      "การจัดแสงบนเวที",
      "การตัดเย็บเครื่องแต่งกาย"
    ],
    "example": "The pop group spent weeks rehearsing synchronised choreography for the music video.",
    "exampleThai": "กลุ่มศิลปินป๊อปใช้เวลาหลายสัปดาห์ในการซักซ้อมการออกแบบท่าเต้นที่พร้อมเพรียงสำหรับมิวสิกวิดีโอ"
  },
  {
    "id": "v_b1_hobby_09",
    "word": "martial",
    "pos": "adj.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เกี่ยวกับศิลปะการต่อสู้",
    "alternatives": [
      "เกี่ยวกับการเต้นรำร่วมสมัย",
      "เกี่ยวกับกายกรรมผาดโผน",
      "เกี่ยวกับการดำน้ำ"
    ],
    "example": "Practicing traditional martial arts instills profound humility, discipline, and self-defense skills.",
    "exampleThai": "การฝึกฝนเกี่ยวกับศิลปะการต่อสู้แบบดั้งเดิมปลูกฝังความอ่อนน้อมถ่อมตน วินัย และทักษะการป้องกันตัว"
  },
  {
    "id": "v_b1_hobby_10",
    "word": "spectator",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ผู้ชมการแข่งขันในสนาม",
    "alternatives": [
      "นักกีฬาตัวจริง",
      "กรรมการตัดสิน",
      "ผู้จัดการแข่งขัน"
    ],
    "example": "Enthusiastic spectators roared when the underdog team scored in the final minute.",
    "exampleThai": "ผู้ชมการแข่งขันในสนามผู้กระตือรือร้นส่งเสียงเฮลั่นเมื่อทีมนอกสายตาทำประตูได้ในนาทีสุดท้าย"
  },
  {
    "id": "v_b1_hobby_11",
    "word": "agility",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ความคล่องแคล่วว่องไว",
    "alternatives": [
      "ความเฉื่อยชาเชื่องช้า",
      "พละกำลังการยกน้ำหนัก",
      "ความสูงของร่างกาย"
    ],
    "example": "Gymnasts rely on exceptional agility and balance to perform gravity-defying routines.",
    "exampleThai": "นักยิมนาสติกต้องพึ่งพาความคล่องแคล่วว่องไวและการทรงตัวที่ยอดเยี่ยมเพื่อแสดงท่าทางท้าทายแรงโน้มถ่วง"
  },
  {
    "id": "v_b1_hobby_compete",
    "word": "compete",
    "pos": "v.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "แข่งขันชิงชัย",
    "alternatives": [
      "ยอมแพ้ถอนตัว",
      "นั่งชมการแข่ง",
      "ตัดสินการแข่งขัน"
    ],
    "example": "Top athletes from fifty nations gather to compete in the championship tournament.",
    "exampleThai": "นักกีฬาชั้นนำจากห้าสิบประเทศมารวมตัวกันเพื่อแข่งขันชิงชัยในการแข่งขันชิงแชมป์"
  },
  {
    "id": "v_b1_hobby_13",
    "word": "strategy",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กลยุทธ์การวางแผนการเล่น",
    "alternatives": [
      "การพึ่งพาโชคชะตา",
      "การเล่นตามอารมณ์",
      "การละเมิดกฎกติกา"
    ],
    "example": "The head coach adjusted our defensive strategy during halftime to counter their fast breaks.",
    "exampleThai": "หัวหน้าโค้ชปรับเปลี่ยนกลยุทธ์การวางแผนการเล่นตั้งรับระหว่างพักครึ่งเพื่อรับมือเกมโต้กลับเร็วของคู่แข่ง"
  },
  {
    "id": "v_b1_hobby_14",
    "word": "championship",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การแข่งขันชิงชนะเลิศระดับชาติ",
    "alternatives": [
      "การแข่งขันกระชับมิตร",
      "การฝึกซ้อมอุ่นเครื่อง",
      "การแข่งขันคัดเลือกรอบแรก"
    ],
    "example": "Winning the national championship was the triumphant culmination of ten years of dedication.",
    "exampleThai": "การคว้าชัยชนะในการแข่งขันชิงชนะเลิศระดับชาติคือความสำเร็จสูงสุดอันรุ่งโรจน์ของการทุ่มเทยาวนานสิบปี"
  },
  {
    "id": "v_b1_hobby_15",
    "word": "motivation",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "แรงจูงใจในการฝึกซ้อม",
    "alternatives": [
      "ความขี้เกียจท้อแท้",
      "ความเบื่อหน่ายกิจกรรม",
      "การหมดไฟสิ้นหวัง"
    ],
    "example": "Cheering family members provided the emotional motivation she needed to cross the finish line.",
    "exampleThai": "เสียงเชียร์จากครอบครัวช่วยสร้างแรงจูงใจในการฝึกซ้อมทางใจที่เธอต้องการเพื่อวิ่งเข้าสู่เส้นชัย"
  },
  {
    "id": "v_b1_hobby_16",
    "word": "sportsmanship",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "น้ำใจนักกีฬาที่แท้จริง",
    "alternatives": [
      "การเอาเปรียบคู่แข่ง",
      "การประท้วงกรรมการ",
      "การกลั่นแกล้งฝ่ายตรงข้าม"
    ],
    "example": "Helping an injured competitor back to their feet demonstrated exemplary sportsmanship.",
    "exampleThai": "การช่วยพยุงคู่แข่งที่บาดเจ็บให้ลุกขึ้นยืนแสดงให้เห็นถึงน้ำใจนักกีฬาที่แท้จริงอันเป็นแบบอย่าง"
  },
  {
    "id": "v_b1_hobby_participate",
    "word": "participate",
    "pos": "v.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เข้าร่วมกิจกรรม",
    "alternatives": [
      "ปฏิเสธไม่ยอมร่วม",
      "นั่งสังเกตการณ์",
      "ยกเลิกงาน"
    ],
    "example": "All local residents are warmly invited to participate in the community charity marathon.",
    "exampleThai": "ชาวบ้านในท้องถิ่นทุกคนได้รับคำเชิญอย่างอบอุ่นให้เข้าร่วมกิจกรรมการวิ่งมาราธอนการกุศลของชุมชน"
  },
  {
    "id": "v_b1_hobby_18",
    "word": "interval",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ช่วงเวลาพักระหว่างยก",
    "alternatives": [
      "เวลาการแข่งขันทั้งหมด",
      "การเริ่มเกมใหม่",
      "การต่อเวลาพิเศษ"
    ],
    "example": "High-intensity interval training alternates short explosive sprints with brief recovery periods.",
    "exampleThai": "การฝึกแบบสปรินต์สลับช่วงเวลาพักระหว่างยกสั้นๆ ช่วยเร่งการเผาผลาญไขมันได้อย่างทรงประสิทธิภาพ"
  },
  {
    "id": "v_b2_hobby_01",
    "word": "virtuoso",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ผู้มีความสามารถทางดนตรีขั้นอัจฉริยะ",
    "alternatives": [
      "นักดนตรีฝึกหัด",
      "ครูสอนดนตรีทั่วไป",
      "ผู้ผลิตเครื่องดนตรี"
    ],
    "example": "The violin virtuoso rendered Paganini's complex caprices with astonishing technical precision.",
    "exampleThai": "ผู้มีความสามารถทางดนตรีขั้นอัจฉริยะด้านไวโอลินบรรเลงบทเพลงคาพริซอันซับซ้อนของปากานินีด้วยความแม่นยำทางเทคนิคอันน่าทึ่ง"
  },
  {
    "id": "v_b2_hobby_02",
    "word": "aesthetic",
    "pos": "adj.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เชิงสุนทรียศาสตร์ความงดงาม",
    "alternatives": [
      "เชิงพาณิชย์สร้างผลกำไร",
      "เชิงเทคนิคเครื่องจักร",
      "เชิงกฎหมายควบคุม"
    ],
    "example": "Figure skating seamlessly combines athletic athletic prowess with refined aesthetic artistry.",
    "exampleThai": "สเก็ตลีลาผสมผสานความสามารถทางกีฬาอันแข็งแกร่งเข้ากับศิลปะเชิงสุนทรียศาสตร์ความงดงามอันประณีตได้อย่างไร้รอยต่อ"
  },
  {
    "id": "v_b2_hobby_03",
    "word": "repertoire",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ชุดรายการแสดงที่เชี่ยวชาญ",
    "alternatives": [
      "ประวัติการศึกษาของศิลปิน",
      "รายรับจากการขายบัตร",
      "รายชื่อเครื่องดนตรีในวง"
    ],
    "example": "The classical cellist broadened her performance repertoire to encompass modern avant-garde works.",
    "exampleThai": "นักเชลโลคลาสสิกขยายชุดรายการแสดงที่เชี่ยวชาญของเธอให้ครอบคลุมผลงานร่วมสมัยแนวหน้า"
  },
  {
    "id": "v_b2_hobby_dominate",
    "word": "dominate",
    "pos": "v.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ครอบงำการแข่งขัน",
    "alternatives": [
      "พ่ายแพ้ยับเยิน",
      "ตามหลังคู่แข่ง",
      "ถอนตัวจากการแข่ง"
    ],
    "example": "The defending champions continued to dominate the national tournament for the third straight year.",
    "exampleThai": "แชมป์เก่าสามารถครอบงำการแข่งขันในระดับประเทศต่อไปได้เป็นปีที่สามติดต่อกัน"
  },
  {
    "id": "v_b2_hobby_05",
    "word": "adrenaline",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ฮอร์โมนกระตุ้นความตื่นเต้น",
    "alternatives": [
      "ฮอร์โมนควบคุมการนอน",
      "สารระงับประสาท",
      "สารต้านอนุมูลอิสระ"
    ],
    "example": "Wingsuit base-jumpers crave the heart-pounding rush of natural adrenaline as they leap.",
    "exampleThai": "นักกระโดดร่มแบบวิงสูทโหยหาการหลั่งของฮอร์โมนกระตุ้นความตื่นเต้นตามธรรมชาติที่ทำให้หัวใจเต้นระทึกขณะกระโดด"
  },
  {
    "id": "v_b2_hobby_06",
    "word": "acclimatize",
    "pos": "v.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ปรับสภาพร่างกายให้ชินกับความสูง",
    "alternatives": [
      "เร่งรีบพิชิตยอดเขา",
      "ยุติการปีนเขาทันที",
      "ละเลยอาการแพ้ที่สูง"
    ],
    "example": "Himalayan mountaineers spend several weeks at base camp to acclimatize to thin air.",
    "exampleThai": "นักปีนเขาหิมาลัยใช้เวลาหลายสัปดาห์ที่เบสแคมป์เพื่อปรับสภาพร่างกายให้ชินกับความสูงและอากาศเบาบาง"
  },
  {
    "id": "v_b2_hobby_07",
    "word": "accolade",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "รางวัลเกียรติยศสรรเสริญ",
    "alternatives": [
      "คำวิจารณ์เชิงลบ",
      "การตัดสิทธิ์การแข่งขัน",
      "การปรับเงินจากการละเมิด"
    ],
    "example": "The veteran gymnastics coach received the highest state sports accolade for lifetime mentoring.",
    "exampleThai": "โค้ชยิมนาสติกรุ่นเก๋าได้รับรางวัลเกียรติยศสรรเสริญทางการกีฬาสูงสุดของรัฐสำหรับการทุ่มเทเป็นผู้ฝึกสอนตลอดชีวิต"
  },
  {
    "id": "v_b2_hobby_08",
    "word": "dexterity",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ความชำนาญคล่องแคล่วของมือและนิ้ว",
    "alternatives": [
      "ความงุ่มง่ามซุ่มซ่าม",
      "พละกำลังกล้ามเนื้อแขน",
      "ความแข็งแกร่งของกระดูก"
    ],
    "example": "Concert harpists exhibit astounding manual dexterity when plucking sixty intricate strings per minute.",
    "exampleThai": "นักเล่นฮาร์ปในคอนเสิร์ตแสดงความชำนาญคล่องแคล่วของมือและนิ้วอันน่าทึ่งขณะดีดสายที่ซับซ้อนถึงหกสิบเส้นต่อนาที"
  },
  {
    "id": "v_b2_hobby_09",
    "word": "finesse",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ความประณีตละเอียดอ่อนของชั้นเชิง",
    "alternatives": [
      "การใช้กำลังเข้าห้ำหั่น",
      "ความหยาบคายรุนแรง",
      "การเล่นแบบไร้แบบแผน"
    ],
    "example": "Instead of relying on raw force, the champion snooker cueist potted balls with subtle finesse.",
    "exampleThai": "แทนที่จะพึ่งพาพละกำลังดิบ นักสอยคิวสนุกเกอร์แชมป์โลกตบลูกลงหลุมด้วยความประณีตละเอียดอ่อนของชั้นเชิงอันแยบยล"
  },
  {
    "id": "v_b2_hobby_10",
    "word": "grueling",
    "pos": "adj.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ที่เหน็ดเหนื่อยทรหดอย่างยิ่ง",
    "alternatives": [
      "ที่สบายผ่อนคลาย",
      "ที่ง่ายดายไม่เหนื่อย",
      "ที่สั้นกระชับ"
    ],
    "example": "The Tour de France challenges elite cyclists across thousands of kilometers of grueling mountain climbs.",
    "exampleThai": "การแข่งขันตูร์เดอฟร็องส์ท้าทายนักปั่นจักรยานชั้นนำข้ามเส้นทางภูเขาที่เหน็ดเหนื่อยทรหดอย่างยิ่งนับพันกิโลเมตร"
  },
  {
    "id": "v_b2_hobby_11",
    "word": "masterclass",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "คลาสเรียนพิเศษโดยปรมาจารย์",
    "alternatives": [
      "การเรียนภาคทฤษฎีเบื้องต้น",
      "การฝึกซ้อมตามลำพัง",
      "การทดสอบวัดระดับทั่วไป"
    ],
    "example": "Aspiring opera tenors attended an exclusive masterclass given by an internationally celebrated soprano.",
    "exampleThai": "นักร้องโอเปร่าเสียงเทเนอร์ผู้มีความมุ่งมั่นเข้าร่วมคลาสเรียนพิเศษโดยปรมาจารย์ที่จัดขึ้นโดยนักร้องโซปราโนชื่อก้องโลก"
  },
  {
    "id": "v_b2_hobby_12",
    "word": "underdog",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ทีมนอกสายตาที่เป็นมวยรอง",
    "alternatives": [
      "ทีมเต็งแชมป์อันดับหนึ่ง",
      "เจ้าภาพจัดการแข่งขัน",
      "แชมป์เก่าไร้พ่าย"
    ],
    "example": "Global sports enthusiasts celebrate when an underdog team overpowers an international giant.",
    "exampleThai": "ผู้รักกีฬาตกหลุมรักช่วงเวลาที่ทีมนอกสายตาที่เป็นมวยรองสามารถพลิกล็อกเอาชนะทีมยักษ์ใหญ่ระดับนานาชาติ"
  },
  {
    "id": "v_b2_hobby_persevere",
    "word": "persevere",
    "pos": "v.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "พากเพียรไม่ย่อท้อ",
    "alternatives": [
      "ล้มเลิกกลางคัน",
      "ยอมแพ้ต่ออุปสรรค",
      "ถอดใจถอยหนี"
    ],
    "example": "Marathon athletes must persevere through intense muscle exhaustion to cross the finish line.",
    "exampleThai": "นักกีฬามาราธอนต้องพากเพียรไม่ย่อท้อต่อความเหนื่อยล้าของกล้ามเนื้อเพื่อเข้าสู่เส้นชัย"
  },
  {
    "id": "v_b2_hobby_excel",
    "word": "excel",
    "pos": "v.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "โดดเด่นเป็นเลิศ",
    "alternatives": [
      "ทำผลงานได้ย่ำแย่",
      "ตกต่ำลงเรื่อยๆ",
      "ล้มเหลวไม่เป็นท่า"
    ],
    "example": "Through dedicated daily practice, young gymnasts can excel in international competitions.",
    "exampleThai": "ด้วยการฝึกซ้อมอย่างทุ่มเททุกวัน นักยิมนาสติกรุ่นเยาว์สามารถทำผลงานโดดเด่นเป็นเลิศในการแข่งขันระดับนานาชาติ"
  },
  {
    "id": "v_b2_hobby_15",
    "word": "exhilarating",
    "pos": "adj.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ที่น่าตื่นเต้นเร้าใจปลุกเร้าอารมณ์",
    "alternatives": [
      "ที่น่าเบื่อจนง่วงนอน",
      "ที่น่าหดหู่ใจ",
      "ที่เรียบง่ายธรรมดา"
    ],
    "example": "Whitewater rafting down roaring mountain river rapids is an exhilarating outdoor adventure.",
    "exampleThai": "การล่องแก่งฝ่าสายน้ำเชี่ยวกรากบนภูเขาเป็นการผจญภัยกลางแจ้งที่น่าตื่นเต้นเร้าใจปลุกเร้าอารมณ์อย่างยิ่ง"
  },
  {
    "id": "v_b2_hobby_16",
    "word": "staged",
    "pos": "adj.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ที่จัดฉากเตรียมการไว้ล่วงหน้า",
    "alternatives": [
      "ที่เกิดขึ้นเองตามธรรมชาติ",
      "ที่ไม่ได้นัดหมาย",
      "ที่โปร่งใสยุติธรรม"
    ],
    "example": "Fans were deeply disappointed when evidence revealed the exhibition bout had been staged.",
    "exampleThai": "แฟนกีฬาผิดหวังอย่างยิ่งเมื่อมีหลักฐานเปิดเผยว่าการแข่งขันนัดพิเศษนั้นเป็นเหตุการณ์ที่จัดฉากเตรียมการไว้ล่วงหน้า"
  },
  {
    "id": "v_b2_hobby_17",
    "word": "prowess",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ทักษะฝีมือความสามารถอันยอดเยี่ยม",
    "alternatives": [
      "ความเงอะงะขาดทักษะ",
      "ความล้มเหลวในการเล่น",
      "ความขลาดกลัวในสนาม"
    ],
    "example": "His exceptional tactical prowess on the clay court earned him numerous Grand Slam singles crowns.",
    "exampleThai": "ทักษะฝีมือความสามารถอันยอดเยี่ยมเชิงยุทธวิธีบนคอร์ทดินทำให้เขาคว้าแชมป์เดี่ยวแกรนด์สแลมมาครองได้นับไม่ถ้วน"
  },
  {
    "id": "v_a1_tech_01",
    "word": "phone",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "โทรศัพท์มือถือ",
    "alternatives": [
      "นาฬิกาตั้งโต๊ะ",
      "เครื่องคิดเลข",
      "ไฟฉายพกพา"
    ],
    "example": "She uses her smart mobile phone to check text messages and train schedules.",
    "exampleThai": "เธอใช้โทรศัพท์มือถือสมาร์ตโฟนเพื่อตรวจดูข้อความและตารางเวลารถไฟ"
  },
  {
    "id": "v_a1_tech_02",
    "word": "internet",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "อินเทอร์เน็ต",
    "alternatives": [
      "สถานีวิทยุชุมชน",
      "โทรทัศน์ดาวเทียม",
      "ตู้จดหมายปลายทาง"
    ],
    "example": "The cafe provides lightning-fast wireless internet access for patrons.",
    "exampleThai": "คาเฟ่ให้บริการการเข้าถึงเครือข่ายอินเทอร์เน็ตไร้สายความเร็วสูงแก่ลูกค้า"
  },
  {
    "id": "v_a1_tech_03",
    "word": "email",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "จดหมายอิเล็กทรอนิกส์",
    "alternatives": [
      "ไปรษณียบัตรกระดาษ",
      "จดหมายลงทะเบียน",
      "โทรเลขด่วน"
    ],
    "example": "I sent an email attachment to my teacher regarding the assignment.",
    "exampleThai": "ฉันส่งจดหมายอิเล็กทรอนิกส์พร้อมไฟล์แนบไปหาคุณครูเกี่ยวกับการบ้าน"
  },
  {
    "id": "v_a1_tech_04",
    "word": "text",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ส่งข้อความสั้น",
    "alternatives": [
      "โทรสายด่วน",
      "ส่งจดหมายกระดาษ",
      "เขียนโปสการ์ด"
    ],
    "example": "Please text me your live location when you arrive at the shopping mall.",
    "exampleThai": "กรุณาส่งข้อความสั้นบอกตำแหน่งปัจจุบันของคุณเมื่อมาถึงห้างสรรพสินค้า"
  },
  {
    "id": "v_a1_tech_05",
    "word": "message",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ข้อความแชท",
    "alternatives": [
      "เอกสารสัญญา",
      "ใบเสร็จค่าไฟ",
      "ใบสั่งยา"
    ],
    "example": "He received a cheerful morning message from his grandmother.",
    "exampleThai": "เขาได้รับข้อความแชททักทายยามเช้าอันแสนอบอุ่นจากคุณยาย"
  },
  {
    "id": "v_a1_tech_06",
    "word": "screen",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "หน้าจอแสดงผล",
    "alternatives": [
      "แป้นพิมพ์ดีด",
      "สายไฟเชื่อมต่อ",
      "ปุ่มเปิดปิด"
    ],
    "example": "The high-definition laptop screen renders vibrant natural colors.",
    "exampleThai": "หน้าจอแสดงผลแล็ปท็อปความละเอียดสูงแสดงผลสีธรรมชาติอันสดใส"
  },
  {
    "id": "v_a1_tech_07",
    "word": "call",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "โทรศัพท์ติดต่อ",
    "alternatives": [
      "ส่งพัสดุ",
      "บันทึกเสียง",
      "ปิดเครื่อง"
    ],
    "example": "I will call customer support to confirm my flight booking reservation.",
    "exampleThai": "ฉันจะโทรศัพท์ติดต่อฝ่ายบริการลูกค้าเพื่อยืนยันการจองตั๋วเที่ยวบินของฉัน"
  },
  {
    "id": "v_a1_tech_08",
    "word": "app",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แอปพลิเคชันมือถือ",
    "alternatives": [
      "อุปกรณ์ฮาร์ดแวร์",
      "สายชาร์จแบตเตอรี่",
      "การ์ดหน่วยความจำ"
    ],
    "example": "This language learning app helps students master vocabulary through games.",
    "exampleThai": "แอปพลิเคชันมือถือเรียนภาษานี้ช่วยให้นักเรียนจำคำศัพท์ได้ผ่านเกมสนุกๆ"
  },
  {
    "id": "v_a1_tech_09",
    "word": "click",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "คลิกเมาส์เลือก",
    "alternatives": [
      "กดแป้นเว้นวรรค",
      "เลื่อนหน้าจอลง",
      "ปิดเครื่อง"
    ],
    "example": "Click the blue submit button to complete your registration form.",
    "exampleThai": "คลิกเมาส์เลือกปุ่มส่งสีน้ำเงินเพื่อกรอกแบบฟอร์มลงทะเบียนให้เสร็จสิ้น"
  },
  {
    "id": "v_a1_tech_10",
    "word": "web",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ระบบเว็บสากล",
    "alternatives": [
      "โครงข่ายไฟฟ้า",
      "ระบบสายโทรศัพท์",
      "สัญญาณดาวเทียม"
    ],
    "example": "You can find educational articles across the worldwide web easily.",
    "exampleThai": "คุณสามารถค้นหาบทความเพื่อการศึกษาทั่วทั้งระบบเว็บสากลได้อย่างง่ายดาย"
  },
  {
    "id": "v_a1_tech_11",
    "word": "online",
    "pos": "adj.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "บนโลกออนไลน์",
    "alternatives": [
      "แบบออฟไลน์",
      "บนหน้ากระดาษ",
      "ในห้องสมุด"
    ],
    "example": "Online video classes make continuing education accessible anywhere.",
    "exampleThai": "ชั้นเรียนวิดีโอบนโลกออนไลน์ทำให้การศึกษาต่อเนื่องเข้าถึงได้จากทุกหนแห่ง"
  },
  {
    "id": "v_a1_tech_12",
    "word": "video",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "คลิปวิดีโอ",
    "alternatives": [
      "ไฟล์เสียงเปล่า",
      "ภาพนิ่ง",
      "ไฟล์ตัวอักษร"
    ],
    "example": "The science teacher showed an animated video explaining cellular mitosis.",
    "exampleThai": "คุณครูวิทยาศาสตร์เปิดคลิปวิดีโอแอนิเมชันอธิบายการแบ่งเซลล์ของสิ่งมีชีวิต"
  },
  {
    "id": "v_a1_tech_13",
    "word": "photo",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ภาพถ่ายดิจิทัล",
    "alternatives": [
      "คลิปเสียง",
      "เอกสารข้อความ",
      "รหัสผ่าน"
    ],
    "example": "Upload a recent passport-sized digital photo for student profile registration.",
    "exampleThai": "อัปโหลดภาพถ่ายดิจิทัลขนาดเท่ารูปถ่ายหนังสือเดินทางล่าสุดสำหรับโปรไฟล์นักเรียน"
  },
  {
    "id": "v_a1_tech_14",
    "word": "radio",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "วิทยุกระจายเสียง",
    "alternatives": [
      "เครื่องบันทึกเทป",
      "โทรทัศน์ดาวเทียม",
      "เครื่องเล่นเกม"
    ],
    "example": "Grandpa tunes in to morning news bulletins on his vintage transistor radio.",
    "exampleThai": "คุณปู่เปิดรับฟังข่าวสารยามเช้าบนวิทยุกระจายเสียงทรานซิสเตอร์รุ่นเก่าของท่าน"
  },
  {
    "id": "v_a1_tech_15",
    "word": "news",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ข่าวสารประจำวัน",
    "alternatives": [
      "นิยายเรื่องแต่ง",
      "บทละครเวที",
      "การ์ตูนช่อง"
    ],
    "example": "Reading reliable international news keeps citizens informed on global events.",
    "exampleThai": "การอ่านข่าวสารประจำวันระดับนานาชาติที่น่าเชื่อถือช่วยให้ประชาชนรู้เท่าทันเหตุการณ์โลก"
  },
  {
    "id": "v_a1_tech_16",
    "word": "chat",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "พูดคุยส่งข้อความ",
    "alternatives": [
      "บล็อกข้อความ",
      "ลบเพื่อนทิ้ง",
      "ปิดเสียงแจ้งเตือน"
    ],
    "example": "Teenagers chat enthusiastically with school friends through messaging apps.",
    "exampleThai": "วัยรุ่นพูดคุยส่งข้อความอย่างกระตือรือร้นกับเพื่อนร่วมโรงเรียนผ่านแอปแชท"
  },
  {
    "id": "v_a1_tech_17",
    "word": "type",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "พิมพ์ดีดแป้นพิมพ์",
    "alternatives": [
      "เขียนด้วยลายมือ",
      "วาดภาพ",
      "ตัดแปะรูป"
    ],
    "example": "Secretaries learn touch typing to type over seventy words per minute accurately.",
    "exampleThai": "เลขานุการเรียนรู้การพิมพ์สัมผัสเพื่อพิมพ์ดีดแป้นพิมพ์ได้มากกว่าเจ็ดสิบคำต่อนาทีอย่างแม่นยำ"
  },
  {
    "id": "v_a1_tech_18",
    "word": "send",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ส่งข้อมูลออกไป",
    "alternatives": [
      "รับข้อมูลเข้า",
      "ลบข้อมูลทิ้ง",
      "แก้ไขข้อมูล"
    ],
    "example": "Do not forget to attach the document before you send the official email.",
    "exampleThai": "อย่าลืมแนบเอกสารก่อนที่คุณจะส่งข้อมูลออกไปทางอีเมลอย่างเป็นทางการ"
  },
  {
    "id": "v_a1_tech_19",
    "word": "open",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เปิดโปรแกรมทำงาน",
    "alternatives": [
      "ปิดการทำงาน",
      "ถอนการติดตั้ง",
      "ลบแอปทิ้ง"
    ],
    "example": "Double-click the desktop icon to open the spreadsheet software.",
    "exampleThai": "ดับเบิลคลิกไอคอนบนหน้าจอเพื่อเปิดโปรแกรมทำงานตารางคำนวณ"
  },
  {
    "id": "v_a1_tech_20",
    "word": "close",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ปิดหน้าต่างโปรแกรม",
    "alternatives": [
      "ย่อหน้าต่าง",
      "ขยายเต็มจอ",
      "รีเฟรชหน้าจอ"
    ],
    "example": "Save your typed essay draft before you close the word processor application.",
    "exampleThai": "บันทึกร่างเรียงความที่พิมพ์ไว้ก่อนที่คุณจะปิดหน้าต่างโปรแกรมประมวลผลคำ"
  },
  {
    "id": "v_a1_tech_21",
    "word": "save",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "บันทึกไฟล์ข้อมูล",
    "alternatives": [
      "ลบทิ้งถาวร",
      "พิมพ์ลงกระดาษ",
      "ยกเลิกการแก้ไข"
    ],
    "example": "Press control plus S regularly to save your work without losing edits.",
    "exampleThai": "กดปุ่มคอนโทรลบวกเอสสม่ำเสมอเพื่อบันทึกไฟล์ข้อมูลงานของคุณโดยไม่สูญเสียสิ่งที่แก้ไข"
  },
  {
    "id": "v_a1_tech_22",
    "word": "hear",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ได้ยินเสียงชัดเจน",
    "alternatives": [
      "มองเห็นภาพ",
      "พิมพ์สัมผัส",
      "อ่านในใจ"
    ],
    "example": "Can you hear my voice clearly over the laptop microphone during this call?",
    "exampleThai": "คุณสามารถได้ยินเสียงชัดเจนของฉันผ่านไมโครโฟนแล็ปท็อประหว่างการโทรนี้ไหม"
  },
  {
    "id": "v_a1_tech_23",
    "word": "game",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "วิดีโอเกมดิจิทัล",
    "alternatives": [
      "หนังสือพิมพ์",
      "สมุดภาพระบายสี",
      "จดหมายข่าว"
    ],
    "example": "Educational roleplaying video games stimulate creative strategic thinking.",
    "exampleThai": "วิดีโอเกมดิจิทัลสวมบทบาทเชิงการศึกษาช่วยกระตุ้นความคิดเชิงกลยุทธ์ที่สร้างสรรค์"
  },
  {
    "id": "v_a1_tech_24",
    "word": "post",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "โพสต์เผยแพร่ข้อความ",
    "alternatives": [
      "ซ่อนข้อความ",
      "ลบบัญชีผู้ใช้",
      "ปิดการแจ้งเตือน"
    ],
    "example": "The photography club will post winning contest pictures on the social feed.",
    "exampleThai": "ชมรมถ่ายภาพจะโพสต์เผยแพร่ข้อความและรูปภาพที่ชนะการประกวดลงบนฟีดโซเชียล"
  },
  {
    "id": "v_a1_tech_25",
    "word": "link",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ลิงก์เชื่อมโยง",
    "alternatives": [
      "แป้นพิมพ์ลัด",
      "แผ่นรองเมาส์",
      "ปลั๊กไฟบ้าน"
    ],
    "example": "Click the blue hyperlink to read the full scientific journal article.",
    "exampleThai": "คลิกลิงก์เชื่อมโยงเว็บไซต์สีน้ำเงินเพื่ออ่านบทความวารสารวิทยาศาสตร์ฉบับเต็ม"
  },
  {
    "id": "v_a1_tech_26",
    "word": "mouse",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เมาส์คอมพิวเตอร์",
    "alternatives": [
      "แผ่นรองเมาส์",
      "แป้นพิมพ์ตัวเลข",
      "ลำโพงบลูทูธ"
    ],
    "example": "An ergonomic optical mouse reduces wrist fatigue during long office hours.",
    "exampleThai": "เมาส์คอมพิวเตอร์แบบออปติคัลตามหลักการยศาสตร์ช่วยลดความเมื่อยล้าข้อมือช่วงทำงานนาน"
  },
  {
    "id": "v_a1_tech_27",
    "word": "button",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ปุ่มกดคำสั่ง",
    "alternatives": [
      "หน้าจอสัมผัส",
      "สายไฟอะแดปเตอร์",
      "พอร์ตยูเอสบี"
    ],
    "example": "Press the green power button to boot up the desktop workstation.",
    "exampleThai": "กดปุ่มกดคำสั่งเปิดเครื่องสีเขียวเพื่อเริ่มต้นระบบเครื่องคอมพิวเตอร์ตั้งโต๊ะ"
  },
  {
    "id": "v_a1_tech_28",
    "word": "light",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ไฟสัญญาณเตือน",
    "alternatives": [
      "เสียงแจ้งเตือน",
      "การสั่นสะเทือน",
      "ข้อความเตือน"
    ],
    "example": "A blinking red indicator light warns that the battery is critically low.",
    "exampleThai": "ไฟสัญญาณเตือนสีแดงกะพริบเตือนว่าแบตเตอรี่เหลือน้อยในระดับวิกฤต"
  },
  {
    "id": "v_a1_tech_29",
    "word": "share",
    "pos": "v.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แชร์แบ่งปันข้อมูล",
    "alternatives": [
      "ปิดบังเป็นความลับ",
      "ลบออกจากระบบ",
      "เข้ารหัสข้อมูล"
    ],
    "example": "Students can share educational revision flashcards with classmates easily.",
    "exampleThai": "นักเรียนสามารถแชร์แบ่งปันข้อมูลการ์ดคำศัพท์ทบทวนกับเพื่อนร่วมชั้นได้อย่างง่ายดาย"
  },
  {
    "id": "v_a1_tech_30",
    "word": "battery",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แบตเตอรี่",
    "alternatives": [
      "หน้าจอภาพแสดงผล",
      "ลำโพงบลูทูธ",
      "กล้องเว็บแคม"
    ],
    "example": "This lightweight power bank provides enough battery capacity to charge two phones.",
    "exampleThai": "พาวเวอร์แบงก์น้ำหนักเบานี้มีความจุของแบตเตอรี่กักเก็บพลังงานเพียงพอที่จะชาร์จโทรศัพท์ได้สองเครื่อง"
  },
  {
    "id": "v_a2_tech_01",
    "word": "laptop",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "คอมพิวเตอร์พกพา",
    "alternatives": [
      "คอมพิวเตอร์ตั้งโต๊ะ",
      "จอโทรทัศน์",
      "แท่นชาร์จไร้สาย"
    ],
    "example": "Students carry a lightweight laptop in their backpacks to take digital lecture notes.",
    "exampleThai": "นักเรียนพกพาคอมพิวเตอร์พกพาน้ำหนักเบาไว้ในกระเป๋าเป้เพื่อจดบันทึกการบรรยายดิจิทัล"
  },
  {
    "id": "v_a2_tech_02",
    "word": "tablet",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แท็บเล็ตหน้าจอสัมผัส",
    "alternatives": [
      "สมาร์ทวอทช์",
      "เราเตอร์ไวไฟ",
      "เครื่องเล่นซีดี"
    ],
    "example": "Illustrators use a stylus pen on a high-resolution graphics tablet to sketch.",
    "exampleThai": "นักวาดภาพใช้ปากกาสไตลัสบนแท็บเล็ตหน้าจอสัมผัสความละเอียดสูงในการร่างภาพ"
  },
  {
    "id": "v_a2_tech_03",
    "word": "charger",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ที่ชาร์จแบตเตอรี่",
    "alternatives": [
      "หูฟังไร้สาย",
      "เคสโทรศัพท์มือถือ",
      "ขาตั้งกล้อง"
    ],
    "example": "Do not forget to pack your universal phone charger before travelling abroad.",
    "exampleThai": "อย่าลืมเก็บสายชาร์จและอุปกรณ์ชาร์จโทรศัพท์อเนกประสงค์ลงกระเป๋าก่อนเดินทางไปต่างประเทศ"
  },
  {
    "id": "v_a2_tech_04",
    "word": "password",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "รหัสผ่านความปลอดภัย",
    "alternatives": [
      "ชื่อบัญชีผู้ใช้",
      "อีเมลสำรอง",
      "คำถามเตือนความจำ"
    ],
    "example": "Create a complex password containing uppercase letters, numbers, and symbols.",
    "exampleThai": "สร้างรหัสผ่านความปลอดภัยที่ซับซ้อนซึ่งประกอบด้วยตัวพิมพ์ใหญ่ ตัวเลข และสัญลักษณ์"
  },
  {
    "id": "v_a2_tech_05",
    "word": "account",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "บัญชีผู้ใช้งานระบบ",
    "alternatives": [
      "ประวัติการเข้าชม",
      "บันทึกคุกกี้",
      "การตั้งค่าเครื่อง"
    ],
    "example": "You must create a registered account before accessing private student portals.",
    "exampleThai": "คุณต้องสร้างบัญชีผู้ใช้งานระบบที่ลงทะเบียนไว้ก่อนเข้าถึงพอร์ทัลส่วนตัวของนักเรียน"
  },
  {
    "id": "v_a2_tech_06",
    "word": "download",
    "pos": "v.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ดาวน์โหลดลงเครื่อง",
    "alternatives": [
      "อัปโหลดขึ้นเซิร์ฟเวอร์",
      "ลบไฟล์ถาวร",
      "แชร์สู่สาธารณะ"
    ],
    "example": "You can download the course syllabus PDF directly from the school homepage.",
    "exampleThai": "คุณสามารถดาวน์โหลดลงเครื่องไฟล์พีดีเอฟประมวลวิชาได้โดยตรงจากหน้าแรกของโรงเรียน"
  },
  {
    "id": "v_a2_tech_07",
    "word": "upload",
    "pos": "v.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "อัปโหลดขึ้นระบบ",
    "alternatives": [
      "ดาวน์โหลดลงมา",
      "พิมพ์ใส่กระดาษ",
      "บันทึกลงแฟลชไดรฟ์"
    ],
    "example": "Please upload your finished video project before midnight on Friday.",
    "exampleThai": "กรุณาอัปโหลดขึ้นระบบผลงานวิดีโอโครงงานที่เสร็จสมบูรณ์ก่อนเที่ยงคืนของวันศุกร์"
  },
  {
    "id": "v_a2_tech_08",
    "word": "website",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เว็บไซต์ทางการ",
    "alternatives": [
      "โปรแกรมติดตั้ง",
      "เอกสารสิ่งพิมพ์",
      "ป้ายโฆษณา"
    ],
    "example": "The university redesigned its official website to be clean and mobile-responsive.",
    "exampleThai": "มหาวิทยาลัยได้ออกแบบเว็บไซต์ทางการของตนใหม่ให้สะอาดตาและรองรับโทรศัพท์มือถือ"
  },
  {
    "id": "v_a2_tech_09",
    "word": "network",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "โครงข่ายการสื่อสาร",
    "alternatives": [
      "ฮาร์ดไดรฟ์จัดเก็บ",
      "ระบบควบคุมไฟ",
      "สายสัญญาณภาพ"
    ],
    "example": "Technicians maintain the secure enterprise network across seven branch offices.",
    "exampleThai": "ช่างเทคนิคดูแลรักษาโครงข่ายการสื่อสารขององค์กรที่มีความปลอดภัยครอบคลุมเจ็ดสาขา"
  },
  {
    "id": "v_a2_tech_10",
    "word": "connect",
    "pos": "v.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เชื่อมต่อสัญญาณ",
    "alternatives": [
      "ตัดการเชื่อมต่อ",
      "ปิดเครื่องทันที",
      "ลบการตั้งค่า"
    ],
    "example": "The laptop automatically connects to our encrypted home Wi-Fi upon startup.",
    "exampleThai": "แล็ปท็อปจะเชื่อมต่อสัญญาณกับไวไฟที่บ้านที่มีการเข้ารหัสโดยอัตโนมัติเมื่อเปิดเครื่อง"
  },
  {
    "id": "v_a2_tech_11",
    "word": "signal",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "สัญญาณคลื่นความถี่",
    "alternatives": [
      "ระดับพลังงานแบตเตอรี่",
      "ความสว่างหน้าจอ",
      "ระดับเสียงลำโพง"
    ],
    "example": "We lost cellular phone signal deep inside the underground metro tunnel.",
    "exampleThai": "พวกเราสูญเสียสัญญาณคลื่นความถี่โทรศัพท์มือถือเมื่ออยู่ลึกเข้าไปในอุโมงค์รถไฟใต้ดิน"
  },
  {
    "id": "v_a2_tech_12",
    "word": "device",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "อุปกรณ์อิเล็กทรอนิกส์",
    "alternatives": [
      "เครื่องใช้ไฟฟ้าแบบใช้มือหมุน",
      "เครื่องเรือนไม้",
      "อุปกรณ์กีฬา"
    ],
    "example": "Synchronize all your smart devices using single cloud account credentials.",
    "exampleThai": "ซิงโครไนซ์อุปกรณ์อิเล็กทรอนิกส์อัจฉริยะทั้งหมดของคุณโดยใช้บัญชีคลาวด์เดียว"
  },
  {
    "id": "v_a2_tech_13",
    "word": "keyboard",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แป้นพิมพ์คอมพิวเตอร์",
    "alternatives": [
      "แผ่นรองเมาส์",
      "จอภาพมอนิเตอร์",
      "กล้องเว็บแคม"
    ],
    "example": "Writers often prefer tactile mechanical switches on their computer keyboard.",
    "exampleThai": "นักเขียนมักชอบสวิตช์แบบแมคคานิคอลที่ให้สัมผัสการกดที่ดีบนแป้นพิมพ์คอมพิวเตอร์"
  },
  {
    "id": "v_a2_tech_14",
    "word": "printer",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เครื่องพิมพ์เอกสาร",
    "alternatives": [
      "เครื่องสแกนบาร์โค้ด",
      "เครื่องทำลายกระดาษ",
      "เครื่องเคลือบบัตร"
    ],
    "example": "The office laser printer churned out fifty double-sided survey handouts.",
    "exampleThai": "เครื่องพิมพ์เอกสารเลเซอร์ประจำออฟฟิศพิมพ์แบบสำรวจสองหน้าออกมาห้าสิบชุดอย่างรวดเร็ว"
  },
  {
    "id": "v_a2_tech_15",
    "word": "scan",
    "pos": "v.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "สแกนแปลงเป็นดิจิทัล",
    "alternatives": [
      "ฉีกกระดาษทิ้ง",
      "วาดสำเนาด้วยมือ",
      "ถ่ายเอกสารลงกระดาษ"
    ],
    "example": "Please scan the signed agreement and email the high-resolution PDF file.",
    "exampleThai": "กรุณาสแกนแปลงเป็นดิจิทัลสำหรับข้อตกลงที่ลงนามแล้วและส่งไฟล์พีดีเอฟความละเอียดสูงมาทางอีเมล"
  },
  {
    "id": "v_a2_tech_16",
    "word": "digital",
    "pos": "adj.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เชิงระบบดิจิทัล",
    "alternatives": [
      "เชิงกลไกอนาล็อก",
      "เชิงกระดาษทำมือ",
      "เชิงภาพวาด"
    ],
    "example": "Modern banking has shifted rapidly toward seamless digital payment services.",
    "exampleThai": "การธนาคารสมัยใหม่ได้เปลี่ยนผ่านอย่างรวดเร็วสู่บริการชำระเงินเชิงระบบดิจิทัลที่ไร้รอยต่อ"
  },
  {
    "id": "v_a2_tech_17",
    "word": "file",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ไฟล์ข้อมูลอิเล็กทรอนิกส์",
    "alternatives": [
      "แฟ้มกระดาษแข็ง",
      "แผ่นดิสก์โบราณ",
      "สมุดจดบันทึก"
    ],
    "example": "Compress heavy image files into a ZIP archive before emailing them.",
    "exampleThai": "บีบอัดไฟล์ข้อมูลอิเล็กทรอนิกส์รูปภาพที่มีขนาดใหญ่ลงในไฟล์ซิปก่อนส่งอีเมล"
  },
  {
    "id": "v_a2_tech_18",
    "word": "folder",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "โฟลเดอร์จัดเก็บข้อมูล",
    "alternatives": [
      "ถังขยะคอมพิวเตอร์",
      "เดสก์ท็อป",
      "แถบเมนู"
    ],
    "example": "Create a designated project folder on your drive to store all related spreadsheets.",
    "exampleThai": "สร้างโฟลเดอร์จัดเก็บข้อมูลโครงการเฉพาะบนไดรฟ์เพื่อเก็บตารางคำนวณที่เกี่ยวข้องทั้งหมด"
  },
  {
    "id": "v_a2_tech_19",
    "word": "media",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "สื่อสารมวลชน",
    "alternatives": [
      "องค์กรศาล",
      "สถาบันการเงิน",
      "หน่วยงานราชการ"
    ],
    "example": "Broadcast media outlets covered the general election results live throughout the night.",
    "exampleThai": "สื่อสารมวลชนแพร่ภาพกระจายเสียงรายงานผลการเลือกตั้งทั่วไปสดตลอดทั้งคืน"
  },
  {
    "id": "v_a2_tech_20",
    "word": "article",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "บทความข่าวสาร",
    "alternatives": [
      "โฆษณาสินค้า",
      "ใบแจ้งหนี้",
      "นิยายบันเทิง"
    ],
    "example": "She authored an insightful article on renewable energy trends for the morning daily.",
    "exampleThai": "เธอเขียนบทความข่าวสารเชิงลึกเกี่ยวกับแนวโน้มพลังงานหมุนเวียนลงในหนังสือพิมพ์รายวันยามเช้า"
  },
  {
    "id": "v_a2_tech_21",
    "word": "channel",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ช่องรายการโทรทัศน์",
    "alternatives": [
      "รีโมตคอนโทรล",
      "เสาอากาศทีวี",
      "สายสัญญาณ"
    ],
    "example": "Switch the television channel to watch the international documentary special.",
    "exampleThai": "เปลี่ยนช่องรายการโทรทัศน์เพื่อชมสารคดีพิเศษระดับนานาชาติ"
  },
  {
    "id": "v_a2_tech_22",
    "word": "podcast",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "รายการเสียงพอดแคสต์",
    "alternatives": [
      "เพลงบรรเลง",
      "เสียงประกอบภาพยนตร์",
      "สปอตโฆษณาวิทยุ"
    ],
    "example": "I tune in to a weekly history podcast while commuting on the morning subway.",
    "exampleThai": "ฉันเปิดฟังรายการเสียงพอดแคสต์ประวัติศาสตร์รายสัปดาห์ระหว่างเดินทางบนรถไฟใต้ดินช่วงเช้า"
  },
  {
    "id": "v_a2_tech_23",
    "word": "stream",
    "pos": "v.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "สตรีมรับชมออนไลน์",
    "alternatives": [
      "ดาวน์โหลดลงแผ่นดิสก์",
      "ซื้อแผ่นดีวีดี",
      "บันทึกลงเทป"
    ],
    "example": "Subscribers can stream thousands of blockbuster films in 4K resolution instantly.",
    "exampleThai": "สมาชิกสามารถสตรีมรับชมออนไลน์ภาพยนตร์ฟอร์มยักษ์หลายพันเรื่องในความละเอียด 4K ได้ทันที"
  },
  {
    "id": "v_a2_tech_24",
    "word": "headline",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "พาดหัวข่าวหน้าหนึ่ง",
    "alternatives": [
      "เชิงอรรถท้ายหน้า",
      "คอลัมน์ซุบซิบ",
      "หน้าพยากรณ์อากาศ"
    ],
    "example": "A bold front-page headline announced the breakthrough scientific medical discovery.",
    "exampleThai": "พาดหัวข่าวหน้าหนึ่งตัวหนาประกาศการค้นพบทางการแพทย์ทางวิทยาศาสตร์ครั้งสำคัญยิ่ง"
  },
  {
    "id": "v_a2_tech_25",
    "word": "broadcast",
    "pos": "v.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ออกอากาศกระจายภาพและเสียง",
    "alternatives": [
      "บันทึกเสียงส่วนตัว",
      "ระงับการฉาย",
      "ปิดสถานี"
    ],
    "example": "The network will broadcast the world championship match live to sixty countries.",
    "exampleThai": "สถานีโทรทัศน์จะออกอากาศกระจายภาพและเสียงการแข่งขันชิงแชมป์โลกสดไปยังหกสิบประเทศ"
  },
  {
    "id": "v_a2_tech_26",
    "word": "press",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แวดวงสื่อมวลชน",
    "alternatives": [
      "องค์กรตำรวจ",
      "คณะลูกขุนศาล",
      "พรรคการเมือง"
    ],
    "example": "The prime minister held a crowded press conference to answer tough economic queries.",
    "exampleThai": "นายกรัฐมนตรีจัดงานแถลงข่าวต่อแวดวงสื่อมวลชนอย่างแน่นขนัดเพื่อตอบข้อซักถามทางเศรษฐกิจ"
  },
  {
    "id": "v_a2_tech_27",
    "word": "social",
    "pos": "adj.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เกี่ยวกับโซเชียลมีเดีย",
    "alternatives": [
      "เกี่ยวกับโปรแกรมออฟไลน์",
      "เกี่ยวกับฮาร์ดแวร์ภายใน",
      "เกี่ยวกับการเงิน"
    ],
    "example": "Companies engage customers directly through creative social media brand campaigns.",
    "exampleThai": "บริษัทต่างๆ มีปฏิสัมพันธ์กับลูกค้าโดยตรงผ่านแคมเปญแบรนด์เกี่ยวกับโซเชียลมีเดียที่สร้างสรรค์"
  },
  {
    "id": "v_b1_tech_01",
    "word": "software",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ชุดคำสั่งโปรแกรมซอฟต์แวร์",
    "alternatives": [
      "ชิ้นส่วนเครื่องจักรฮาร์ดแวร์",
      "แผงวงจรไฟฟ้า",
      "สายเคเบิลทองแดง"
    ],
    "example": "Keep your operating system and antivirus software updated to defend against threats.",
    "exampleThai": "อัปเดตระบบปฏิบัติการและชุดคำสั่งโปรแกรมซอฟต์แวร์สแกนไวรัสให้ทันสมัยอยู่เสมอเพื่อต้านทานภัยคุกคาม"
  },
  {
    "id": "v_b1_tech_02",
    "word": "hardware",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "อุปกรณ์ชิ้นส่วนฮาร์ดแวร์",
    "alternatives": [
      "ระบบปฏิบัติการ",
      "แอปพลิเคชันมือถือ",
      "ไฟล์เอกสารข้อความ"
    ],
    "example": "Upgrading your graphics card hardware allows smoother 3D modeling and rendering.",
    "exampleThai": "การอัปเกรดอุปกรณ์ชิ้นส่วนฮาร์ดแวร์การ์ดจอช่วยให้การสร้างแบบจำลองและการเรนเดอร์สามมิติราบรื่นยิ่งขึ้น"
  },
  {
    "id": "v_b1_tech_03",
    "word": "wireless",
    "pos": "adj.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แบบไร้สาย",
    "alternatives": [
      "แบบต่อสายเคเบิล",
      "แบบใช้แบตเตอรี่แห้ง",
      "แบบใช้พลังงานแสงอาทิตย์"
    ],
    "example": "Wireless earbuds offer extraordinary portability and seamless Bluetooth pairing.",
    "exampleThai": "หูฟังแบบไร้สายมอบความสะดวกสบายในการพกพาเป็นพิเศษและการเชื่อมต่อบลูทูธที่ราบรื่น"
  },
  {
    "id": "v_b1_tech_04",
    "word": "database",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ฐานข้อมูลสารสนเทศ",
    "alternatives": [
      "เอกสารกระดาษในตู้",
      "แฟ้มงานส่วนบุคคล",
      "แผ่นพับประชาสัมพันธ์"
    ],
    "example": "The hospital maintains a secure encrypted database of confidential patient health records.",
    "exampleThai": "โรงพยาบาลดูแลรักษาฐานข้อมูลสารสนเทศที่มีการเข้ารหัสปลอดภัยของประวัติสุขภาพลับของผู้ป่วย"
  },
  {
    "id": "v_b1_tech_05",
    "word": "browser",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "โปรแกรมเว็บเบราว์เซอร์",
    "alternatives": [
      "โปรแกรมตัดต่อภาพ",
      "โปรแกรมคำนวณตัวเลข",
      "โปรแกรมเล่นดนตรี"
    ],
    "example": "Clear your web browser cache and cookies periodically to enhance browsing speed.",
    "exampleThai": "ล้างแคชและคุกกี้ในโปรแกรมเว็บเบราว์เซอร์เป็นระยะเพื่อเพิ่มความเร็วในการท่องเว็บ"
  },
  {
    "id": "v_b1_tech_06",
    "word": "notification",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "การแจ้งเตือนบนหน้าจอ",
    "alternatives": [
      "การดาวน์โหลดอัตโนมัติ",
      "การปิดเครื่องสำรอง",
      "การตั้งค่าความเป็นส่วนตัว"
    ],
    "example": "A push notification popped up to announce the breaking international headline.",
    "exampleThai": "การแจ้งเตือนบนหน้าจอเด้งขึ้นมาเพื่อประกาศข่าวด่วนสำคัญระดับนานาชาติ"
  },
  {
    "id": "v_b1_tech_07",
    "word": "security",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ระบบความปลอดภัยทางไซเบอร์",
    "alternatives": [
      "การส่งข้อความโฆษณา",
      "การตกแต่งหน้าจอ",
      "ความเร็วอินเทอร์เน็ต"
    ],
    "example": "Two-factor authentication adds an indispensable layer of online account security.",
    "exampleThai": "การยืนยันตัวตนสองขั้นตอนช่วยเพิ่มระดับระบบความปลอดภัยทางไซเบอร์ของบัญชีออนไลน์ที่ขาดไม่ได้"
  },
  {
    "id": "v_b1_tech_08",
    "word": "privacy",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ความเป็นส่วนตัวของข้อมูล",
    "alternatives": [
      "การเปิดเผยต่อสาธารณะ",
      "การกระจายข่าวสาร",
      "การจัดเก็บภาษี"
    ],
    "example": "Strict data privacy regulations prevent websites from selling user tracking histories.",
    "exampleThai": "กฎระเบียบความเป็นส่วนตัวของข้อมูลที่เข้มงวดห้ามไม่ให้เว็บไซต์ขายประวัติการติดตามผู้ใช้"
  },
  {
    "id": "v_b1_tech_09",
    "word": "interface",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ส่วนต่อประสานกับผู้ใช้งาน",
    "alternatives": [
      "รหัสโปรแกรมเบื้องหลัง",
      "แผงวงจรฮาร์ดแวร์",
      "คู่มือการผลิต"
    ],
    "example": "An intuitive graphical user interface ensures even novice smartphone users navigate smoothly.",
    "exampleThai": "ส่วนต่อประสานกับผู้ใช้งานแบบกราฟิกที่เข้าใจง่ายช่วยให้แม้แต่ผู้ใช้สมาร์ตโฟนมือใหม่ก็ใช้งานได้อย่างราบรื่น"
  },
  {
    "id": "v_b1_tech_10",
    "word": "viral",
    "pos": "adj.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แพร่ระบาดรวดเร็วบนโลกโซเชียล",
    "alternatives": [
      "ถูกปิดกั้นการมองเห็น",
      "ลบเลือนหายไป",
      "เฉพาะกลุ่มลับ"
    ],
    "example": "The rescued puppy video went viral overnight, garnering ten million views globally.",
    "exampleThai": "วิดีโอลูกสุนัขที่ได้รับการช่วยเหลือกลายเป็นกระแสแพร่ระบาดรวดเร็วบนโลกโซเชียลชั่วข้ามคืนมียอดดูสิบล้านวิว"
  },
  {
    "id": "v_b1_tech_11",
    "word": "cyber",
    "pos": "adj.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เกี่ยวกับโลกไซเบอร์และสารสนเทศ",
    "alternatives": [
      "เกี่ยวกับระบบเครื่องยนต์",
      "เกี่ยวกับการเกษตรกรรม",
      "เกี่ยวกับการแพทย์แผนโบราณ"
    ],
    "example": "Banks invest heavily in cyber defense specialists to thwart malicious phishing intrusions.",
    "exampleThai": "ธนาคารลงทุนอย่างมากในผู้เชี่ยวชาญการป้องกันเกี่ยวกับโลกไซเบอร์และสารสนเทศเพื่อขัดขวางการหลอกลวงข้อมูล"
  },
  {
    "id": "v_b1_tech_12",
    "word": "platform",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แพลตฟอร์มให้บริการดิจิทัล",
    "alternatives": [
      "ร้านขายอุปกรณ์มือถือ",
      "คู่มือคอมพิวเตอร์",
      "เครื่องพิมพ์ความเร็วสูง"
    ],
    "example": "The e-learning platform hosts video tutorials, practice quizzes, and interactive flashcards.",
    "exampleThai": "แพลตฟอร์มให้บริการดิจิทัลด้านการเรียนรู้ออนไลน์มีบทเรียนวิดีโอ แบบทดสอบฝึกฝน และการ์ดคำศัพท์"
  },
  {
    "id": "v_b1_tech_13",
    "word": "interactive",
    "pos": "adj.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ที่มีการโต้ตอบปฏิสัมพันธ์ได้",
    "alternatives": [
      "ที่สื่อสารทางเดียว",
      "ที่หยุดนิ่งไร้การตอบสนอง",
      "ที่พิมพ์ลงกระดาษ"
    ],
    "example": "Interactive digital classroom displays engage young students far better than passive lectures.",
    "exampleThai": "จอแสดงผลในห้องเรียนดิจิทัลที่มีการโต้ตอบปฏิสัมพันธ์ได้ดึงดูดนักเรียนรุ่นเยาว์ได้ดีกว่าการบรรยายแบบเดิม"
  },
  {
    "id": "v_b1_tech_14",
    "word": "subscriber",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ผู้สมัครรับข้อมูลสมาชิก",
    "alternatives": [
      "ผู้ชมทั่วไปที่ผ่านมา",
      "ผู้ไม่ประสงค์ออกนาม",
      "ผู้ดูแลระบบเซิร์ฟเวอร์"
    ],
    "example": "The popular tech review YouTube channel celebrated crossing one million loyal subscribers.",
    "exampleThai": "ช่องยูทูปรีวิวเทคโนโลยียอดนิยมฉลองการมีผู้สมัครรับข้อมูลสมาชิกผู้ภักดีทะลุหนึ่งล้านคน"
  },
  {
    "id": "v_b1_tech_15",
    "word": "streaming",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "บริการถ่ายทอดสัญญาณมัลติมีเดีย",
    "alternatives": [
      "การขายแผ่นบันทึกข้อมูล",
      "การฉายหนังกลางแปลง",
      "การส่งสัญญาณวิทยุเอเอ็ม"
    ],
    "example": "Music streaming services have completely transformed the economics of global sound recording.",
    "exampleThai": "บริการถ่ายทอดสัญญาณมัลติมีเดียเพลงได้เปลี่ยนแปลงระบบเศรษฐกิจของการบันทึกเสียงทั่วโลกอย่างสิ้นเชิง"
  },
  {
    "id": "v_b1_tech_16",
    "word": "journalism",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "วิชาชีพการสื่อสารมวลชน",
    "alternatives": [
      "การโฆษณาประชาสัมพันธ์",
      "การสร้างความบันเทิง",
      "การตลาดดิจิทัล"
    ],
    "example": "Ethical investigative journalism holds powerful corporations and corrupt politicians to account.",
    "exampleThai": "วิชาชีพการสื่อสารมวลชนเชิงสืบสวนที่มีจริยธรรมคอยตรวจสอบบรรษัทที่มีอำนาจและนักการเมืองทุจริต"
  },
  {
    "id": "v_b1_tech_17",
    "word": "censor",
    "pos": "v.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เซ็นเซอร์ตัดทอนเนื้อหา",
    "alternatives": [
      "เผยแพร่อย่างเสรี",
      "ส่งเสริมการแสดงออก",
      "แปลเป็นภาษาอื่น"
    ],
    "example": "Authoritarian regimes attempt to censor digital news websites during times of public protest.",
    "exampleThai": "ระบอบอำนาจนิยมพยายามเซ็นเซอร์ตัดทอนเนื้อหาเว็บไซต์ข่าวสารดิจิทัลในช่วงเวลาที่มีการประท้วงของประชาชน"
  },
  {
    "id": "v_b1_tech_18",
    "word": "algorithm",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ขั้นตอนวิธีประมวลผล",
    "alternatives": [
      "ฮาร์ดดิสก์บรรจุข้อมูล",
      "แผ่นพิมพ์วงจร",
      "คู่มือซ่อมบำรุง"
    ],
    "example": "Social platforms utilize a recommendation algorithm to personalize content shown on user feeds.",
    "exampleThai": "แพลตฟอร์มโซเชียลใช้ขั้นตอนวิธีประมวลผลแนะนำเพื่อปรับแต่งคอนเทนต์ที่แสดงบนฟีดของผู้ใช้เฉพาะบุคคล"
  },
  {
    "id": "v_b2_tech_01",
    "word": "encryption",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "การเข้ารหัสลับรักษาความปลอดภัยข้อมูล",
    "alternatives": [
      "การเปิดเผยข้อมูลสาธารณะ",
      "การถอดรหัสข้อความ",
      "การลบไฟล์ทิ้ง"
    ],
    "example": "End-to-end encryption shields private messaging conversations from unauthorized wiretapping.",
    "exampleThai": "การเข้ารหัสลับรักษาความปลอดภัยข้อมูลแบบต้นทางถึงปลายทางช่วยปกป้องการสนทนาส่วนตัวจากการลักลอบดักฟัง"
  },
  {
    "id": "v_b2_tech_02",
    "word": "misinformation",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ข้อมูลเท็จที่คลาดเคลื่อน",
    "alternatives": [
      "ข้อเท็จจริงที่ผ่านการพิสูจน์",
      "บทความวิชาการที่น่าเชื่อถือ",
      "เอกสารหลักฐานทางการ"
    ],
    "example": "Fact-checking organizations work tirelessly to debunk dangerous viral healthcare misinformation.",
    "exampleThai": "องค์กรตรวจสอบข้อเท็จจริงทำงานอย่างไม่รู้จักเหน็ดเหนื่อยเพื่อลบล้างข้อมูลเท็จที่คลาดเคลื่อนด้านสุขภาพ"
  },
  {
    "id": "v_b2_tech_03",
    "word": "propaganda",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "การโฆษณาชวนเชื่อทางการเมือง",
    "alternatives": [
      "การรายงานข่าวที่เป็นกลาง",
      "การศึกษาประวัติศาสตร์รอบด้าน",
      "การอภิปรายอย่างเสรี"
    ],
    "example": "State television broadcast manipulative propaganda to rally domestic public support for the war.",
    "exampleThai": "โทรทัศน์ของรัฐออกอากาศการโฆษณาชวนเชื่อทางการเมืองที่ชี้นำความคิดเพื่อระดมการสนับสนุนสงครามจากประชาชน"
  },
  {
    "id": "v_b2_tech_04",
    "word": "surveillance",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "การสอดแนมเฝ้าระวังทางดิจิทัล",
    "alternatives": [
      "ความเป็นส่วนตัวอย่างสมบูรณ์",
      "การปกปิดอัตลักษณ์",
      "การยกเลิกกล้องวงจรปิด"
    ],
    "example": "Civil liberties advocates warn against unchecked government biometric facial surveillance.",
    "exampleThai": "ผู้สนับสนุนเสรีภาพพลเมืองเตือนถึงอันตรายของการสอดแนมเฝ้าระวังทางดิจิทัลด้วยการจดจำใบหน้าของรัฐบาลที่ไร้การตรวจสอบ"
  },
  {
    "id": "v_b2_tech_05",
    "word": "monetization",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "การแปลงคอนเทนต์เป็นรายได้",
    "alternatives": [
      "การแจกจ่ายเพื่อการกุศล",
      "การระงับการโฆษณา",
      "การจำกัดการมองเห็น"
    ],
    "example": "Content creators explore podcast sponsorships and merchandise sales for sustainable monetization.",
    "exampleThai": "ผู้สร้างสรรค์คอนเทนต์สำรวจการสนับสนุนพอดแคสต์และการขายสินค้าสำหรับการแปลงคอนเทนต์เป็นรายได้ที่ยั่งยืน"
  },
  {
    "id": "v_b2_tech_06",
    "word": "broadband",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "โครงข่ายอินเทอร์เน็ตความเร็วสูง",
    "alternatives": [
      "ระบบโมเด็มต่อสายโทรศัพท์",
      "วิทยุสื่อสารคลื่นสั้น",
      "สัญญาณโทรเลข"
    ],
    "example": "Rural communities require state subsidies to extend fiber-optic broadband connectivity.",
    "exampleThai": "ชุมชนในชนบทต้องการเงินอุดหนุนจากรัฐบาลเพื่อขยายการเชื่อมต่อโครงข่ายอินเทอร์เน็ตความเร็วสูงใยแก้วนำแสง"
  },
  {
    "id": "v_b2_tech_07",
    "word": "automation",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ระบบอัตโนมัติทำงานแทนมนุษย์",
    "alternatives": [
      "การใช้แรงงานฝีมือดั้งเดิม",
      "การทำงานด้วยเอกสารกระดาษ",
      "การคำนวณด้วยลูกคิด"
    ],
    "example": "Industrial robotics automation dramatically accelerates manufacturing productivity while cutting manual labor.",
    "exampleThai": "ระบบอัตโนมัติทำงานแทนมนุษย์ด้วยหุ่นยนต์อุตสาหกรรมช่วยเร่งผลิตภาพการผลิตอย่างมหาศาลพร้อมลดแรงงานคน"
  },
  {
    "id": "v_b2_tech_streamline",
    "word": "streamline",
    "pos": "v.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ปรับกระบวนการให้คล่องตัว",
    "alternatives": [
      "สร้างขั้นตอนยุ่งยาก",
      "ทำให้ล่าช้าซับซ้อน",
      "ระงับการทำงาน"
    ],
    "example": "The company adopted automated software to streamline its customer support operations.",
    "exampleThai": "บริษัทได้นำซอฟต์แวร์อัตโนมัติมาใช้เพื่อปรับกระบวนการให้คล่องตัวในการปฏิบัติงานสนับสนุนลูกค้า"
  },
  {
    "id": "v_b2_tech_09",
    "word": "sensationalism",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "การทำข่าวเน้นกระแสเร้าอารมณ์",
    "alternatives": [
      "การวิเคราะห์ข้อมูลเชิงสถิติ",
      "การรายงานข้อเท็จจริงรอบด้าน",
      "การสัมภาษณ์ผู้เชี่ยวชาญ"
    ],
    "example": "Tabloid publications resort to exaggerated sensationalism to attract cheap click-through traffic.",
    "exampleThai": "สิ่งพิมพ์แนวแทบลอยด์หันไปใช้การทำข่าวเน้นกระแสเร้าอารมณ์เกินจริงเพื่อดึงดูดยอดคลิกผ่านราคาถูก"
  },
  {
    "id": "v_b2_tech_distort",
    "word": "distort",
    "pos": "v.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "บิดเบือนข้อเท็จจริง",
    "alternatives": [
      "รายงานอย่างเที่ยงตรง",
      "นำเสนอข้อมูลรอบด้าน",
      "ตรวจสอบความถูกต้อง"
    ],
    "example": "Biased commentators often distort economic figures to support their own political agenda.",
    "exampleThai": "ผู้วิเคราะห์ที่มีอคติมักบิดเบือนข้อเท็จจริงเกี่ยวกับตัวเลขเศรษฐกิจเพื่อสนับสนุนผลประโยชน์ทางการเมืองของตนเอง"
  },
  {
    "id": "v_b2_tech_11",
    "word": "pervasive",
    "pos": "adj.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ที่แทรกซึมแพร่หลายไปทั่วทุกแห่ง",
    "alternatives": [
      "ที่พบได้ยากยิ่ง",
      "ที่จำกัดเฉพาะจุด",
      "ที่ถูกลืมเลือน"
    ],
    "example": "Smartphones have exerted a pervasive influence on interpersonal human social communication.",
    "exampleThai": "สมาร์ตโฟนได้สร้างอิทธิพลที่แทรกซึมแพร่หลายไปทั่วทุกแห่งต่อการสื่อสารทางสังคมระหว่างบุคคลของมนุษย์"
  },
  {
    "id": "v_b2_tech_12",
    "word": "cybersecurity",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "การรักษาความมั่นคงปลอดภัยไซเบอร์",
    "alternatives": [
      "การตลาดทางอินเทอร์เน็ต",
      "การออกแบบเว็บไซต์",
      "การสร้างแอนิเมชัน"
    ],
    "example": "National critical infrastructure requires robust cybersecurity countermeasures against foreign state hacking.",
    "exampleThai": "โครงสร้างพื้นฐานสำคัญระดับชาติต้องการมาตรการการรักษาความมั่นคงปลอดภัยไซเบอร์ที่แข็งแกร่งต้านการแฮก"
  },
  {
    "id": "v_b2_tech_13",
    "word": "telecommunications",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "กิจการโทรคมนาคมทางไกล",
    "alternatives": [
      "การขนส่งสินค้าทางเรือ",
      "การพิมพ์สิ่งพิมพ์กระดาษ",
      "การกระจายสินค้าค้าปลีก"
    ],
    "example": "The nationwide telecommunications backbone was upgraded to fifth-generation cellular capability.",
    "exampleThai": "โครงข่ายหลักของกิจการโทรคมนาคมทางไกลระดับประเทศได้รับการยกระดับสู่ขีดความสามารถเซลลูลาร์ยุคที่ห้า"
  },
  {
    "id": "v_b2_tech_14",
    "word": "bias",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "อคติและความลำเอียงของสื่อ",
    "alternatives": [
      "ความเป็นกลางสมบูรณ์",
      "ความเที่ยงธรรมแม่นยำ",
      "การตรวจสอบอย่างเป็นธรรม"
    ],
    "example": "Media literacy courses teach students to detect political bias in television commentary.",
    "exampleThai": "วิชาการรู้เท่าทันสื่อสอนให้นักเรียนตรวจจับอคติและความลำเอียงของสื่อทางการเมืองในบทวิจารณ์ทางโทรทัศน์"
  },
  {
    "id": "v_b2_tech_manipulate",
    "word": "manipulate",
    "pos": "v.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ชักใยบงการข้อมูล",
    "alternatives": [
      "เปิดเผยอย่างโปร่งใส",
      "เคารพการตัดสินใจ",
      "รักษาความถูกต้อง"
    ],
    "example": "Hackers attempted to manipulate online voting results by creating fake user accounts.",
    "exampleThai": "แฮกเกอร์พยายามชักใยบงการข้อมูลผลการลงคะแนนออนไลน์ด้วยการสร้างบัญชีผู้ใช้ปลอม"
  },
  {
    "id": "v_b2_tech_authenticate",
    "word": "authenticate",
    "pos": "v.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ยืนยันความถูกต้องแท้จริง",
    "alternatives": [
      "ปลอมแปลงเอกสาร",
      "แอบอ้างสิทธิ์",
      "ยกเลิกรหัสผ่าน"
    ],
    "example": "Two-factor security requires users to authenticate their identity using an SMS code.",
    "exampleThai": "ความปลอดภัยแบบสองชั้นกำหนดให้ผู้ใช้ต้องยืนยันความถูกต้องแท้จริงของตัวตนโดยใช้รหัสทางข้อความสั้น"
  },
  {
    "id": "v_b2_tech_17",
    "word": "copyright",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ลิขสิทธิ์ทางปัญญา",
    "alternatives": [
      "การละเมิดทรัพย์สิน",
      "ของขวัญสาธารณะ",
      "เครื่องหมายทางการค้าปลอม"
    ],
    "example": "Streaming illegal copies of newly premiered cinema releases violates international copyright treaties.",
    "exampleThai": "การสตรีมสำเนาภาพยนตร์ที่เพิ่งเข้าฉายอย่างผิดกฎหมายถือเป็นการละเมิดสนธิสัญญาลิขสิทธิ์ทางปัญญาระหว่างประเทศ"
  },
  {
    "id": "v_a1_nature_01",
    "word": "sun",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ดวงอาทิตย์",
    "alternatives": [
      "ดวงจันทร์",
      "ดวงดาว",
      "ก้อนเมฆ"
    ],
    "example": "The bright golden sun rises over the horizon every morning.",
    "exampleThai": "ดวงอาทิตย์สีทองสดใสขึ้นเหนือขอบฟ้าในทุกๆ เช้า"
  },
  {
    "id": "v_a1_nature_02",
    "word": "rain",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สายฝน",
    "alternatives": [
      "หิมะตก",
      "ลูกเห็บ",
      "หมอกควัน"
    ],
    "example": "Gentle afternoon rain watered the thirsty flowering plants in our garden.",
    "exampleThai": "สายฝนยามบ่ายที่โปรยปรายช่วยรดน้ำต้นไม้ดอกที่กระหายน้ำในสวนของเรา"
  },
  {
    "id": "v_a1_nature_03",
    "word": "tree",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ต้นไม้ใหญ่",
    "alternatives": [
      "กอหญ้า",
      "พุ่มไม้เตี้ย",
      "แปลงดอกไม้"
    ],
    "example": "A massive mango tree provides cooling shade beside the wooden house.",
    "exampleThai": "ต้นไม้ใหญ่มะม่วงต้นยักษ์ให้ร่มเงาอันเย็นสบายข้างบ้านไม้"
  },
  {
    "id": "v_a1_nature_04",
    "word": "flower",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ดอกไม้บาน",
    "alternatives": [
      "ใบไม้แห้ง",
      "รากไม้",
      "กิ่งไม้หัก"
    ],
    "example": "Bees buzz happily from one fragrant yellow flower to another.",
    "exampleThai": "ผึ้งบินส่งเสียงหึ่งๆ อย่างมีความสุขจากดอกไม้บานสีเหลืองหอมดอกหนึ่งไปยังอีกดอก"
  },
  {
    "id": "v_a1_nature_05",
    "word": "sky",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ท้องฟ้ากว้างใหญ่",
    "alternatives": [
      "ผืนดิน",
      "มหาสมุทร",
      "ยอดเขา"
    ],
    "example": "White fluffy clouds floated lazily across the clear blue sky.",
    "exampleThai": "เมฆสีขาวปุยลอยเอื่อยๆ ข้ามผ่านท้องฟ้ากว้างใหญ่สีครามอันแจ่มใส"
  },
  {
    "id": "v_a1_nature_06",
    "word": "cloud",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ก้อนเมฆบนฟ้า",
    "alternatives": [
      "สายหมอกควัน",
      "หยดน้ำค้าง",
      "ประกายสายฟ้า"
    ],
    "example": "Dark grey clouds gathered above the mountains before the thunderstorm.",
    "exampleThai": "ก้อนเมฆบนฟ้าสีเทาเข้มรวมตัวกันเหนือเทือกเขาก่อนเกิดพายุฝนฟ้าคะนอง"
  },
  {
    "id": "v_a1_nature_07",
    "word": "hot",
    "pos": "adj.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "อากาศร้อนจัด",
    "alternatives": [
      "หนาวเหน็บ",
      "เย็นสบาย",
      "ชื้นแฉะ"
    ],
    "example": "April in central Thailand is notoriously sunny and hot.",
    "exampleThai": "เดือนเมษายนในภาคกลางของไทยมีแดดจัดจ้าและอากาศร้อนจัดอย่างยิ่ง"
  },
  {
    "id": "v_a1_nature_08",
    "word": "cold",
    "pos": "adj.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "อากาศหนาวเย็น",
    "alternatives": [
      "ร้อนอบอ้าว",
      "แดดแผดเผา",
      "อุ่นสบาย"
    ],
    "example": "Bring a thick wool jacket when visiting the cold northern peaks in December.",
    "exampleThai": "นำเสื้อแจ็คเก็ตขนสัตว์หนาติดตัวไปด้วยเมื่อไปเยือนยอดดอยทางเหนือที่มีอากาศหนาวเย็นในเดือนธันวาคม"
  },
  {
    "id": "v_a1_nature_09",
    "word": "wind",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สายลมพัด",
    "alternatives": [
      "กระแสน้ำวน",
      "แสงแดดแรง",
      "หมอกลงจัด"
    ],
    "example": "A gentle evening wind rustled dry leaves across the temple courtyard.",
    "exampleThai": "สายลมพัดยามเย็นอันแผ่วเบาพัดใบไม้แห้งให้ส่งเสียงกรอบแกรบข้ามลานวัด"
  },
  {
    "id": "v_a1_nature_10",
    "word": "bird",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "นกบิน",
    "alternatives": [
      "ผีเสื้อ",
      "กระรอก",
      "ค้างคาว"
    ],
    "example": "A colorful wild bird perched on the balcony railing to sing.",
    "exampleThai": "นกบินป่าสีสันสดใสเกาะบนราวระเบียงเพื่อส่งเสียงร้องเพลง"
  },
  {
    "id": "v_a1_nature_11",
    "word": "cat",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แมวบ้าน",
    "alternatives": [
      "สุนัขเฝ้าบ้าน",
      "กระต่ายแคระ",
      "หนูแฮมสเตอร์"
    ],
    "example": "The sleepy orange cat curled up in a sunny patch on the rug.",
    "exampleThai": "แมวบ้านสีส้มผู้ชอบนอนขดตัวอย่างสบายในจุดที่มีแสงแดดส่องบนพรม"
  },
  {
    "id": "v_a1_nature_12",
    "word": "dog",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สุนัขแสนซื่อสัตย์",
    "alternatives": [
      "แมวบ้าน",
      "กระรอกน้อย",
      "ม้าแคระ"
    ],
    "example": "Our golden retriever dog wags his bushy tail whenever we return home.",
    "exampleThai": "สุนัขแสนซื่อสัตย์พันธุ์โกลเด้นของเรากระดิกหางเป็นพวงทุกครั้งที่เรากลับถึงบ้าน"
  },
  {
    "id": "v_a1_nature_13",
    "word": "elephant",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ช้างไทย",
    "alternatives": [
      "เสือโคร่ง",
      "หมีควาย",
      "แรดป่า"
    ],
    "example": "The majestic Asian elephant is a revered national symbol of Thailand.",
    "exampleThai": "ช้างไทยเอเชียอันสง่างามเป็นสัญลักษณ์ประจำชาติที่ได้รับความเคารพอย่างสูงของไทย"
  },
  {
    "id": "v_a1_nature_14",
    "word": "river",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แม่น้ำสายใหญ่",
    "alternatives": [
      "สระว่ายน้ำ",
      "บ่อน้ำบาดาล",
      "คลองส่งน้ำ"
    ],
    "example": "Longtail passenger boats cruise along the historic Chao Phraya River.",
    "exampleThai": "เรือโดยสารหางยาวแล่นผ่านไปตามแม่น้ำสายใหญ่เจ้าพระยาอันทรงคุณค่าทางประวัติศาสตร์"
  },
  {
    "id": "v_a1_nature_15",
    "word": "sea",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ทะเลสีคราม",
    "alternatives": [
      "แม่น้ำจืด",
      "น้ำตกหินปูน",
      "เขื่อนเก็บน้ำ"
    ],
    "example": "The Andaman Sea is celebrated globally for its turquoise waters.",
    "exampleThai": "ทะเลสีครามอันดามันได้รับการยกย่องทั่วโลกในเรื่องผืนน้ำสีฟ้าอมเขียวสดใส"
  },
  {
    "id": "v_a1_nature_16",
    "word": "mountain",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ภูเขาสูงชัน",
    "alternatives": [
      "ที่ราบลุ่ม",
      "เนินทราย",
      "หุบเหวลึก"
    ],
    "example": "Doi Inthanon is the highest and most famous mountain peak in Thailand.",
    "exampleThai": "ดอยอินทนนท์เป็นยอดภูเขาสูงชันที่สูงที่สุดและมีชื่อเสียงที่สุดในประเทศไทย"
  },
  {
    "id": "v_a1_nature_17",
    "word": "grass",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ต้นหญ้าสีเขียว",
    "alternatives": [
      "ก้อนหินกรวด",
      "ทรายขาว",
      "เปลือกไม้"
    ],
    "example": "Dewdrops sparkled like diamonds on the fresh morning lawn grass.",
    "exampleThai": "หยดน้ำค้างส่องประกายราวกับเพชรบนต้นหญ้าสีเขียวสดบนสนามหญ้ายามเช้า"
  },
  {
    "id": "v_a1_nature_18",
    "word": "moon",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ดวงจันทร์",
    "alternatives": [
      "ดวงอาทิตย์",
      "ดาวตก",
      "ดาวหาง"
    ],
    "example": "The luminous full moon illuminated the midnight ocean waves beautifully.",
    "exampleThai": "ดวงจันทร์วันเพ็ญอันสุกสว่างสาดแสงส่องคลื่นทะเลเที่ยงคืนอย่างงดงาม"
  },
  {
    "id": "v_a1_nature_19",
    "word": "star",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ดวงดาวบนฟ้า",
    "alternatives": [
      "ก้อนเมฆทึบ",
      "ควันไฟ",
      "หมอกหนา"
    ],
    "example": "Far from city lights, countless bright stars twinkle across the night sky.",
    "exampleThai": "ห่างไกลจากแสงไฟในเมือง ดวงดาวบนฟ้านับไม่ถ้วนส่องแสงระยิบระยับทั่วฟ้าค่ำคืน"
  },
  {
    "id": "v_a1_nature_20",
    "word": "warm",
    "pos": "adj.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "อบอุ่นสบาย",
    "alternatives": [
      "หนาวสั่น",
      "เยือกแข็ง",
      "ร้อนจัด"
    ],
    "example": "A warm cup of hot chocolate is delightful on breezy rainy afternoons.",
    "exampleThai": "ช็อกโกแลตร้อนที่อบอุ่นสบายหนึ่งแก้วเป็นสิ่งที่น่ายินดีในบ่ายวันฝนพรำที่มีลมพัด"
  },
  {
    "id": "v_a1_nature_21",
    "word": "cool",
    "pos": "adj.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "เย็นสบาย",
    "alternatives": [
      "ร้อนระอุ",
      "แดดแผดเผา",
      "อับชื้น"
    ],
    "example": "The evening breeze feels delightfully cool after a sweltering afternoon.",
    "exampleThai": "สายลมยามเย็นให้ความรู้สึกเย็นสบายอย่างน่ารื่นรมย์หลังจากช่วงบ่ายที่ร้อนอบอ้าว"
  },
  {
    "id": "v_a1_nature_22",
    "word": "wet",
    "pos": "adj.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "เปียกชื้น",
    "alternatives": [
      "แห้งผาก",
      "แตกระแหง",
      "ไหม้เกรียม"
    ],
    "example": "Watch your step on the slick wet marble tiles after the shower.",
    "exampleThai": "ระมัดระวังก้าวเดินของคุณบนกระเบื้องหินอ่อนที่เปียกชื้นลื่นหลังฝนตก"
  },
  {
    "id": "v_a1_nature_23",
    "word": "dry",
    "pos": "adj.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แห้งแล้ง",
    "alternatives": [
      "ชุ่มฉ่ำ",
      "น้ำท่วมขัง",
      "เปียกโชก"
    ],
    "example": "Farmers in the plateau pray for monsoon showers during the long dry season.",
    "exampleThai": "ชาวนาบนที่ราบสูงสวดภาวนาขอฝนลมมรสุมในช่วงฤดูที่แห้งแล้งยาวนาน"
  },
  {
    "id": "v_a1_nature_24",
    "word": "plant",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "พืชพรรณธรรมชาติ",
    "alternatives": [
      "หินแร่",
      "สัตว์ป่า",
      "สิ่งปลูกสร้าง"
    ],
    "example": "Green plants absorb carbon dioxide and release life-giving oxygen.",
    "exampleThai": "พืชพรรณธรรมชาติต้นสีเขียวดูดซับก๊าซคาร์บอนไดออกไซด์และปล่อยออกซิเจนหล่อเลี้ยงชีวิต"
  },
  {
    "id": "v_a1_nature_25",
    "word": "forest",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ผืนป่าไม้",
    "alternatives": [
      "ทะเลทราย",
      "ย่านการค้า",
      "ทุ่งหญ้าเทียม"
    ],
    "example": "The dense tropical rainforest is home to thousands of unique species.",
    "exampleThai": "ผืนป่าไม้ดงดิบชื้นเขตร้อนอันอุดมสมบูรณ์เป็นบ้านของสิ่งมีชีวิตเฉพาะถิ่นหลายพันชนิด"
  },
  {
    "id": "v_a1_nature_26",
    "word": "summer",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ฤดูร้อน",
    "alternatives": [
      "ฤดูหนาว",
      "ฤดูฝนตกชุก",
      "ฤดูใบไม้ร่วง"
    ],
    "example": "Children look forward to swimming in the sea during their long summer break.",
    "exampleThai": "เด็กๆ ตั้งตารอที่จะได้ไปว่ายน้ำในทะเลในช่วงปิดเทอมฤดูร้อนอันยาวนาน"
  },
  {
    "id": "v_a1_nature_27",
    "word": "winter",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ฤดูหนาว",
    "alternatives": [
      "ฤดูร้อน",
      "ฤดูแล้ง",
      "ฤดูมรสุม"
    ],
    "example": "In European countries, winter brings heavy white snow and frosty mornings.",
    "exampleThai": "ในประเทศแถบยุโรป ฤดูหนาวจะนำพาหิมะสีขาวหนาทึบและเช้าวันที่มีน้ำค้างแข็งมาให้"
  },
  {
    "id": "v_a1_nature_28",
    "word": "air",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "อากาศบริสุทธิ์",
    "alternatives": [
      "ควันพิษ",
      "ไอน้ำร้อน",
      "ฝุ่นละออง"
    ],
    "example": "Breathing the crisp mountain air fills you with renewed physical energy.",
    "exampleThai": "การสูดอากาศบริสุทธิ์อันสดชื่นบนภูเขาช่วยเติมเต็มพลังกายใหม่ให้แก่คุณ"
  },
  {
    "id": "v_a1_nature_29",
    "word": "earth",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "โลกมนุษย์",
    "alternatives": [
      "ดาวอังคาร",
      "ดวงอาทิตย์",
      "ดาวพฤหัส"
    ],
    "example": "We must unite to protect our precious planet earth for generations ahead.",
    "exampleThai": "พวกเราต้องร่วมมือกันเพื่อปกป้องโลกมนุษย์อันล้ำค่าของเราเพื่อคนรุ่นต่อไป"
  },
  {
    "id": "v_a1_nature_30",
    "word": "lake",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ทะเลสาบน้ำนิ่ง",
    "alternatives": [
      "แม่น้ำไหลเชี่ยว",
      "น้ำตกสูง",
      "มหาสมุทรคลื่นแรง"
    ],
    "example": "The tranquil mountain lake mirrored the evergreen pine trees perfectly.",
    "exampleThai": "ทะเลสาบน้ำนิ่งอันเงียบสงบบนภูเขาสะท้อนภาพต้นสนเขียวชอุ่มได้อย่างสมบูรณ์แบบ"
  },
  {
    "id": "v_a2_nature_01",
    "word": "storm",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "พายุฝนฟ้าคะนอง",
    "alternatives": [
      "ลมพัดเอื่อยๆ",
      "แดดอ่อนๆ",
      "หมอกบางๆ"
    ],
    "example": "Fishermen stayed safely ashore as the tropical storm whipped up giant waves.",
    "exampleThai": "ชาวประมงจอดเรืออย่างปลอดภัยริมฝั่งขณะที่พายุฝนฟ้าคะนองเขตร้อนพัดกระหน่ำจนเกิดคลื่นยักษ์"
  },
  {
    "id": "v_a2_nature_02",
    "word": "thunder",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "เสียงฟ้าร้องกึกก้อง",
    "alternatives": [
      "แสงฟ้าแลบ",
      "เสียงลมพัด",
      "เสียงฝนตกกระทบ"
    ],
    "example": "Loud rolling thunder rattled the bedroom window glass during the storm.",
    "exampleThai": "เสียงฟ้าร้องกึกก้องคำรามดังสนั่นทำให้กระจกหน้าต่างห้องนอนสั่นสะเทือนช่วงพายุ"
  },
  {
    "id": "v_a2_nature_03",
    "word": "lightning",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สายฟ้าแลบแปลบปลาบ",
    "alternatives": [
      "เสียงฟ้าร้อง",
      "ลูกเห็บตก",
      "ฝนละออง"
    ],
    "example": "A dramatic flash of bright lightning lit up the pitch-black night sky.",
    "exampleThai": "สายฟ้าแลบแปลบปลาบอันสว่างวาบได้ส่องสว่างท้องฟ้ายามค่ำคืนที่มืดมิดสนิท"
  },
  {
    "id": "v_a2_nature_04",
    "word": "rainbow",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สายรุ้งเจ็ดสี",
    "alternatives": [
      "แสงเหนือ",
      "สุริยุปราคา",
      "จันทรุปราคา"
    ],
    "example": "A magnificent seven-colored rainbow arched across the hills after the shower.",
    "exampleThai": "สายรุ้งเจ็ดสีอันงดงามทอดโค้งข้ามผ่านทิวเขาหลังฝนหยุดตก"
  },
  {
    "id": "v_a2_nature_05",
    "word": "season",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ฤดูกาลตามธรรมชาติ",
    "alternatives": [
      "ช่วงเวลาหนึ่งสัปดาห์",
      "ปีปฏิทิน",
      "ศตวรรษ"
    ],
    "example": "Thailand experiences three main seasons including the hot, rainy, and cool periods.",
    "exampleThai": "ประเทศไทยมีสามฤดูกาลตามธรรมชาติหลัก ได้แก่ ฤดูร้อน ฤดูฝน และฤดูหนาว"
  },
  {
    "id": "v_a2_nature_06",
    "word": "temperature",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "อุณหภูมิอากาศ",
    "alternatives": [
      "ความกดอากาศ",
      "ความเร็วลม",
      "ระดับความชื้น"
    ],
    "example": "The thermometer indicated an afternoon temperature of thirty-eight degrees Celsius.",
    "exampleThai": "ปรอทวัดอุณหภูมิแสดงอุณหภูมิอากาศช่วงบ่ายที่สามสิบแปดองศาเซลเซียส"
  },
  {
    "id": "v_a2_nature_07",
    "word": "climate",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สภาพภูมิอากาศเฉลี่ย",
    "alternatives": [
      "พยากรณ์อากาศประจำวัน",
      "รายงานฝนตก",
      "ทิศทางลม"
    ],
    "example": "Tropical climates are characterized by year-round warmth and monsoon precipitation.",
    "exampleThai": "สภาพภูมิอากาศเฉลี่ยแบบเขตร้อนมีลักษณะเฉพาะคือความอบอุ่นตลอดปีและฝนมรสุม"
  },
  {
    "id": "v_a2_nature_08",
    "word": "jungle",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ป่าดงดิบทึบ",
    "alternatives": [
      "ทุ่งหญ้าสะวันนา",
      "พื้นที่เกษตรกรรม",
      "สวนพฤกษศาสตร์"
    ],
    "example": "Trekking through the impenetrable jungle requires long boots and sharp machetes.",
    "exampleThai": "การเดินป่าผ่านป่าดงดิบทึบที่รกชัฏต้องสวมรองเท้าบูทยาวและพกมีดพร้าที่คมกริบ"
  },
  {
    "id": "v_a2_nature_09",
    "word": "ocean",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "มหาสมุทรอันกว้างใหญ่",
    "alternatives": [
      "อ่างเก็บน้ำ",
      "ลำธารน้ำตก",
      "คลองส่งน้ำ"
    ],
    "example": "The Pacific Ocean covers more than thirty percent of the Earth's surface area.",
    "exampleThai": "มหาสมุทรอันกว้างใหญ่แปซิฟิกครอบคลุมพื้นที่มากกว่าร้อยละสามสิบของพื้นผิวโลก"
  },
  {
    "id": "v_a2_nature_10",
    "word": "island",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "เกาะแก่งกลางทะเล",
    "alternatives": [
      "คาบสมุทร",
      "แผ่นดินใหญ่",
      "ที่ราบชายฝั่ง"
    ],
    "example": "Koh Samui is a beloved tropical island renowned for coconut groves and white sands.",
    "exampleThai": "เกาะสมุยเป็นเกาะแก่งกลางทะเลเมืองร้อนที่เป็นที่รักและมีชื่อเสียงเรื่องสวนมะพร้าวและหาดทรายขาว"
  },
  {
    "id": "v_a2_nature_11",
    "word": "desert",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ทะเลทรายอันเวิ้งว้าง",
    "alternatives": [
      "ป่าสนเมืองหนาว",
      "พื้นที่ชุ่มน้ำ",
      "ทุ่งดอกไม้"
    ],
    "example": "Cacti and camels have adapted marvelously to survive in the arid Sahara desert.",
    "exampleThai": "ต้นกระบองเพชรและอูฐปรับตัวได้อย่างน่าอัศจรรย์เพื่อเอาชีวิตรอดในทะเลทรายอันเวิ้งว้างซาฮารา"
  },
  {
    "id": "v_a2_nature_12",
    "word": "hill",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "เนินเขาขนาดย่อม",
    "alternatives": [
      "หน้าผาสูงชัน",
      "หุบเหวลึก",
      "ที่ราบลุ่มน้ำ"
    ],
    "example": "The sheep grazed peacefully on the lush green grassy slopes of the rolling hill.",
    "exampleThai": "ฝูงแกะเล็มหญ้าอย่างสงบสุขบนลาดหญ้าเขียวชอุ่มของเนินเขาขนาดย่อมที่ทอดยาว"
  },
  {
    "id": "v_a2_nature_13",
    "word": "valley",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "หุบเขาเบื้องล่าง",
    "alternatives": [
      "ยอดเขาสูงสุด",
      "ที่ราบสูงแห้งแล้ง",
      "เกาะกลางน้ำ"
    ],
    "example": "A picturesque rural village is nestled quietly deep down in the lush valley.",
    "exampleThai": "หมู่บ้านชนบทอันงดงามราวภาพวาดตั้งอยู่อย่างเงียบสงบลึกในหุบเขาเบื้องล่างอันเขียวชอุ่ม"
  },
  {
    "id": "v_a2_nature_14",
    "word": "waterfall",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "น้ำตกธรรมชาติ",
    "alternatives": [
      "น้ำพุร้อน",
      "เขื่อนคอนกรีต",
      "คลองชลประทาน"
    ],
    "example": "Erawan Waterfall in Kanchanaburi boasts seven cascading tiers of emerald pools.",
    "exampleThai": "น้ำตกธรรมชาติเอราวัณในกาญจนบุรีมีแอ่งน้ำสีมรกตที่ไหลลดหลั่นกันถึงเจ็ดชั้น"
  },
  {
    "id": "v_a2_nature_15",
    "word": "insect",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แมลงตัวเล็ก",
    "alternatives": [
      "สัตว์เลี้ยงลูกด้วยนม",
      "นกนักล่า",
      "ปลาทะเล"
    ],
    "example": "Ants, bees, and beetles represent the most diverse insect class on the planet.",
    "exampleThai": "มด ผึ้ง และด้วง เป็นตัวแทนของแมลงตัวเล็กที่มีความหลากหลายทางสายพันธุ์มากที่สุดในโลก"
  },
  {
    "id": "v_a2_nature_16",
    "word": "butterfly",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ผีเสื้อแสนสวย",
    "alternatives": [
      "แมลงปอ",
      "ตั๊กแตน",
      "ผึ้งหลวง"
    ],
    "example": "A monarch butterfly with patterned orange wings fluttered between hibiscus blossoms.",
    "exampleThai": "ผีเสื้อแสนสวยโมนาร์ชที่มีปีกสีส้มลวดลายวิจิตรบินกระพือปีกไปมาระหว่างดอกชบา"
  },
  {
    "id": "v_a2_nature_17",
    "word": "reptile",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สัตว์เลื้อยคลาน",
    "alternatives": [
      "สัตว์ปีก",
      "สัตว์ครึ่งบกครึ่งน้ำ",
      "สัตว์เลี้ยงลูกด้วยนม"
    ],
    "example": "Lizards and tortoises belong to the cold-blooded, scaly-skinned reptile family.",
    "exampleThai": "จิ้งจกและเต่าบกจัดอยู่ในวงศ์สัตว์เลื้อยคลานเลือดเย็นที่มีผิวหนังเป็นเกล็ด"
  },
  {
    "id": "v_a2_nature_18",
    "word": "wild",
    "pos": "adj.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ในป่าตามธรรมชาติ",
    "alternatives": [
      "ที่เลี้ยงในฟาร์ม",
      "ที่เชื่องในบ้าน",
      "ในสวนสัตว์"
    ],
    "example": "Tigers hunting in the wild require vast tracts of undisturbed jungle wilderness.",
    "exampleThai": "เสือโคร่งที่ออกล่าในป่าตามธรรมชาติต้องการผืนป่าดงดิบกว้างใหญ่ที่ไร้การรบกวน"
  },
  {
    "id": "v_a2_nature_19",
    "word": "breeze",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ลมพัดโชยเอื่อยๆ",
    "alternatives": [
      "พายุทอร์นาโด",
      "ลมบ้าหมู",
      "ลมกรรโชกแรง"
    ],
    "example": "A fragrant sea breeze drifted across our hotel balcony as sunset approached.",
    "exampleThai": "ลมพัดโชยเอื่อยๆ จากทะเลพัดผ่านระเบียงโรงแรมของเราขณะที่ยามอาทิตย์อัสดงใกล้เข้ามา"
  },
  {
    "id": "v_a2_nature_20",
    "word": "humid",
    "pos": "adj.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "อบอ้าวชื้นแฉะ",
    "alternatives": [
      "แห้งกร้าน",
      "หนาวจัด",
      "เย็นสบาย"
    ],
    "example": "The air in Bangkok feels intensely humid right before a torrential monsoon rain.",
    "exampleThai": "อากาศในกรุงเทพฯ รู้สึกอบอ้าวชื้นแฉะเป็นพิเศษก่อนที่ฝนลมมรสุมกระหน่ำลงมา"
  },
  {
    "id": "v_a2_nature_21",
    "word": "freeze",
    "pos": "v.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "เย็นจนกลายเป็นน้ำแข็ง",
    "alternatives": [
      "เดือดพล่าน",
      "ละลายตัว",
      "ระเหยเป็นไอ"
    ],
    "example": "Ponds in high northern altitudes freeze solid when temperatures drop below zero.",
    "exampleThai": "สระน้ำในเขตที่สูงทางเหนือจะเย็นจนกลายเป็นน้ำแข็งเมื่ออุณหภูมิลดลงต่ำกว่าศูนย์"
  },
  {
    "id": "v_a2_nature_22",
    "word": "forecast",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "การพยากรณ์อากาศ",
    "alternatives": [
      "การสำรวจสำมะโนประชากร",
      "ดัชนีตลาดหุ้น",
      "สถิติการท่องเที่ยว"
    ],
    "example": "According to the meteorological morning forecast, sunny skies will prevail all weekend.",
    "exampleThai": "จากการพยากรณ์อากาศยามเช้าของกรมอุตุนิยมวิทยา ท้องฟ้าโปร่งแดดดีจะต่อเนื่องตลอดสุดสัปดาห์"
  },
  {
    "id": "v_a2_nature_23",
    "word": "sunshine",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แสงแดดเจิดจ้า",
    "alternatives": [
      "หมอกควันหนาทึบ",
      "เมฆฝนดำทะมึน",
      "แสงจันทร์สลัว"
    ],
    "example": "Basking in moderate morning sunshine helps the human body manufacture vital vitamin D.",
    "exampleThai": "การรับแสงแดดเจิดจ้าในยามเช้าแต่พอดีช่วยให้ร่างกายมนุษย์สร้างวิตามินดีที่จำเป็น"
  },
  {
    "id": "v_a2_nature_24",
    "word": "flood",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "อุทกภัยน้ำท่วม",
    "alternatives": [
      "ภัยแล้งขาดน้ำ",
      "พายุหิมะ",
      "คลื่นความร้อน"
    ],
    "example": "Incessant monsoon deluges caused riverbanks to burst and trigger severe flash flood.",
    "exampleThai": "ฝนมรสุมที่ตกหนักไม่หยุดทำให้ตลิ่งแม่น้ำพังทลายและก่อให้เกิดอุทกภัยน้ำท่วมฉับพลันรุนแรง"
  },
  {
    "id": "v_a2_nature_25",
    "word": "earthquake",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แผ่นดินไหว",
    "alternatives": [
      "ดินถล่ม",
      "พายุสุริยะ",
      "ภูเขาไฟสงบ"
    ],
    "example": "Seismologists registered a moderate magnitude 5.2 earthquake off the coast of Sumatra.",
    "exampleThai": "นักแผ่นดินไหววิทยาตรวจพบเหตุแผ่นดินไหวขนาดปานกลาง 5.2 แมกนิจูดนอกชายฝั่งเกาะสุมาตรา"
  },
  {
    "id": "v_a2_nature_26",
    "word": "fog",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "หมอกหนาจัด",
    "alternatives": [
      "ฝุ่นควันไฟป่า",
      "ฟ้าแลบ",
      "แดดจ้า"
    ],
    "example": "Dense morning fog reduced roadway visibility to less than fifty meters on the mountain pass.",
    "exampleThai": "หมอกหนาจัดยามเช้าลดทัศนวิสัยบนท้องถนนลงเหลือไม่ถึงห้าสิบเมตรบริเวณช่องเขา"
  },
  {
    "id": "v_a2_nature_27",
    "word": "creature",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สิ่งมีชีวิตในธรรมชาติ",
    "alternatives": [
      "หินแร่ธรรมชาติ",
      "ซากฟอสซิล",
      "พืชสังเคราะห์"
    ],
    "example": "The coral reef teems with thousands of fascinating and colorful marine creatures.",
    "exampleThai": "แนวปะการังอุดมสมบูรณ์ไปด้วยสิ่งมีชีวิตในธรรมชาติใต้ท้องทะเลอันน่าหลงใหลและมีสีสันสดใส"
  },
  {
    "id": "v_b1_nature_01",
    "word": "environment",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สิ่งแวดล้อมทางธรรมชาติ",
    "alternatives": [
      "สภาวะเศรษฐกิจ",
      "โครงสร้างอาคาร",
      "ระบบการเมือง"
    ],
    "example": "Reducing single-use plastics directly benefits our fragile global marine environment.",
    "exampleThai": "การลดการใช้พลาสติกใช้ครั้งเดียวส่งผลดีโดยตรงต่อสิ่งแวดล้อมทางธรรมชาติทางทะเลที่เปราะบางของโลก"
  },
  {
    "id": "v_b1_nature_02",
    "word": "pollution",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "มลภาวะและสารพิษ",
    "alternatives": [
      "การบำบัดน้ำเสีย",
      "การปลูกป่าทดแทน",
      "พลังงานสะอาด"
    ],
    "example": "Vehicle exhaust emissions contribute severely to hazardous urban air pollution.",
    "exampleThai": "ควันไอเสียจากยานพาหนะก่อให้เกิดมลภาวะและสารพิษทางอากาศในเมืองที่เป็นอันตรายอย่างยิ่ง"
  },
  {
    "id": "v_b1_nature_03",
    "word": "conservation",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "การอนุรักษ์ธรรมชาติ",
    "alternatives": [
      "การทำลายผืนป่า",
      "การล่าสัตว์เชิงพาณิชย์",
      "การระบายน้ำทิ้ง"
    ],
    "example": "Marine conservation reserves protect endangered sea turtles during their nesting season.",
    "exampleThai": "เขตการอนุรักษ์ธรรมชาติทางทะเลช่วยปกป้องเต่าทะเลใกล้สูญพันธุ์ในช่วงฤดูวางไข่"
  },
  {
    "id": "v_b1_nature_04",
    "word": "ecosystem",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ระบบนิเวศวิทยา",
    "alternatives": [
      "โครงข่ายคมนาคม",
      "วงจรเศรษฐกิจ",
      "ระบบการศึกษา"
    ],
    "example": "Mangrove swamps form an indispensable coastal ecosystem that shelters juvenile fish.",
    "exampleThai": "ป่าชายเลนเป็นระบบนิเวศวิทยาชายฝั่งที่ขาดไม่ได้ซึ่งเป็นที่หลบภัยของสัตว์น้ำวัยอ่อน"
  },
  {
    "id": "v_b1_nature_05",
    "word": "endangered",
    "pos": "adj.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ใกล้สูญพันธุ์อย่างวิกฤต",
    "alternatives": [
      "มีอยู่อย่างแพร่หลาย",
      "ปรับตัวได้ง่าย",
      "แพร่พันธุ์รวดเร็ว"
    ],
    "example": "The Javan rhinoceros is one of the most critically endangered mammals on the planet.",
    "exampleThai": "แรดชวาเป็นหนึ่งในสัตว์เลี้ยงลูกด้วยนมที่ใกล้สูญพันธุ์อย่างวิกฤตที่สุดในโลก"
  },
  {
    "id": "v_b1_nature_06",
    "word": "habitat",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ถิ่นที่อยู่อาศัยตามธรรมชาติ",
    "alternatives": [
      "สวนสัตว์เพาะพันธุ์",
      "กรงขังทดลอง",
      "คลินิกรักษาสัตว์"
    ],
    "example": "Urban sprawl encroaches dangerously onto the natural forest habitat of wild elephants.",
    "exampleThai": "การขยายตัวของเมืองรุกล้ำอย่างอันตรายเข้าไปในถิ่นที่อยู่อาศัยตามธรรมชาติของช้างป่า"
  },
  {
    "id": "v_b1_nature_07",
    "word": "deforestation",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "การตัดไม้ทำลายป่า",
    "alternatives": [
      "การปลูกป่าเฉลิมพระเกียรติ",
      "การฟื้นฟูต้นน้ำ",
      "การเพาะพันธุ์กล้าไม้"
    ],
    "example": "Rampant agricultural deforestation accelerates soil erosion and global carbon release.",
    "exampleThai": "การตัดไม้ทำลายป่าเพื่อการเกษตรกรรมอย่างไม่หยุดยั้งเร่งการพังทลายของหน้าดินและการปล่อยคาร์บอน"
  },
  {
    "id": "v_b1_nature_08",
    "word": "drought",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ภัยแล้งรุนแรง",
    "alternatives": [
      "น้ำท่วมฉับพลัน",
      "ฝนตกชุกต่อเนื่อง",
      "พายุหิมะ"
    ],
    "example": "Prolonged summer drought dried up regional reservoir storage and devastated rice harvests.",
    "exampleThai": "ภัยแล้งรุนแรงในฤดูร้อนที่ยาวนานทำให้อ่างเก็บน้ำในภูมิภาคแห้งขอดและทำลายผลผลิตข้าว"
  },
  {
    "id": "v_b1_nature_09",
    "word": "hurricane",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "พายุหมุนเฮอริเคน",
    "alternatives": [
      "ลมบ้าหมูขนาดเล็ก",
      "ลมทะเลพัดเอื่อย",
      "ฝนตกปรอยๆ"
    ],
    "example": "The destructive Category 4 hurricane tore roofs off coastal homes with fierce gale winds.",
    "exampleThai": "พายุหมุนเฮอริเคนระดับสี่อันทรงพลังทำลายล้างพัดหลังคาบ้านริมชายฝั่งหลุดกระจุยด้วยลมพายุรุนแรง"
  },
  {
    "id": "v_b1_nature_10",
    "word": "emissions",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "การปล่อยก๊าซเรือนกระจก",
    "alternatives": [
      "การดูดซับก๊าซ",
      "การสังเคราะห์แสง",
      "การผลิตพลังงานหมุนเวียน"
    ],
    "example": "Nations committed to slashing industrial greenhouse emissions to combat global warming.",
    "exampleThai": "นานาประเทศให้คำมั่นสัญญาที่จะลดการปล่อยก๊าซเรือนกระจกจากภาคอุตสาหกรรมเพื่อต่อสู้กับภาวะโลกร้อน"
  },
  {
    "id": "v_b1_nature_11",
    "word": "biodiversity",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ความหลากหลายทางชีวภาพ",
    "alternatives": [
      "การปลูกพืชเชิงเดี่ยว",
      "การสูญพันธุ์ครั้งใหญ่",
      "การกลายพันธุ์"
    ],
    "example": "Tropical coral reefs host an astonishing richness of marine species biodiversity.",
    "exampleThai": "แนวปะการังเขตร้อนเป็นแหล่งรวมความหลากหลายทางชีวภาพของสิ่งมีชีวิตใต้ทะเลอันน่าทึ่ง"
  },
  {
    "id": "v_b1_nature_adapt",
    "word": "adapt",
    "pos": "v.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ปรับตัวให้เข้ากับสภาพแวดล้อม",
    "alternatives": [
      "ต่อต้านการเปลี่ยนแปลง",
      "ไม่ยอมปรับเปลี่ยน",
      "อยู่อย่างเดิม"
    ],
    "example": "Polar bears must adapt to shrinking arctic ice sheets caused by rising temperatures.",
    "exampleThai": "หมีขั้วโลกต้องปรับตัวให้เข้ากับสภาพแวดล้อมที่แผ่นน้ำแข็งอาร์กติกหดตัวลงจากอุณหภูมิที่สูงขึ้น"
  },
  {
    "id": "v_b1_nature_13",
    "word": "wildlife",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สัตว์ป่าและพืชพรรณธรรมชาติ",
    "alternatives": [
      "สัตว์เลี้ยงในบ้าน",
      "พืชสวนครัว",
      "สัตว์ในฟาร์มปศุสัตว์"
    ],
    "example": "Khao Yai National Park provides sanctuary for diverse Asian wildlife species.",
    "exampleThai": "อุทยานแห่งชาติเขาใหญ่มอบที่ลี้ภัยให้แก่สัตว์ป่าและพืชพรรณธรรมชาติในเอเชียหลากหลายสายพันธุ์"
  },
  {
    "id": "v_b1_nature_14",
    "word": "renewable",
    "pos": "adj.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "พลังงานหมุนเวียนสะอาด",
    "alternatives": [
      "เชื้อเพลิงฟอสซิลที่หมดไป",
      "พลังงานถ่านหิน",
      "กากกัมมันตรังสี"
    ],
    "example": "Harnessing renewable solar and wind energy significantly curbs environmental degradation.",
    "exampleThai": "การใช้ประโยชน์จากพลังงานหมุนเวียนสะอาดจากแสงอาทิตย์และลมช่วยลดความเสื่อมโทรมของสิ่งแวดล้อมได้อย่างมาก"
  },
  {
    "id": "v_b1_nature_15",
    "word": "glacier",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ธารน้ำแข็งขั้วโลก",
    "alternatives": [
      "ก้อนน้ำแข็งในแก้ว",
      "บ่อน้ำพุร้อน",
      "ทะเลสาบน้ำอุ่น"
    ],
    "example": "Climatologists track how rapidly alpine glaciers are melting due to atmospheric warming.",
    "exampleThai": "นักภูมิอากาศวิทยาติดตามว่าธารน้ำแข็งขั้วโลกบนเทือกเขากำลังละลายอย่างรวดเร็วเพียงใดเนื่องจากภาวะโลกร้อน"
  },
  {
    "id": "v_b1_nature_survive",
    "word": "survive",
    "pos": "v.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "เอาชีวิตรอด",
    "alternatives": [
      "ล้มตายสูญพันธุ์",
      "ยอมแพ้ต่อภัยธรรมชาติ",
      "ละทิ้งถิ่นฐาน"
    ],
    "example": "Desert plants develop deep root systems to survive long periods of severe drought.",
    "exampleThai": "พืชในทะเลทรายพัฒนาระบบรากลึกเพื่อเอาชีวิตรอดจากภัยแล้งรุนแรงที่ยาวนาน"
  },
  {
    "id": "v_b1_nature_17",
    "word": "extinction",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "การสูญพันธุ์อย่างถาวร",
    "alternatives": [
      "การขยายพันธุ์อย่างรวดเร็ว",
      "การปรับตัวสู่สิ่งแวดล้อมใหม่",
      "การค้นพบสายพันธุ์ใหม่"
    ],
    "example": "Habitat destruction pushed the gentle flightless dodo bird into irreversible extinction.",
    "exampleThai": "การทำลายถิ่นที่อยู่อาศัยผลักดันให้นกโดโดที่บินไม่ได้สูญพันธุ์อย่างถาวรโดยไม่อาจย้อนคืน"
  },
  {
    "id": "v_b1_nature_18",
    "word": "atmosphere",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ชั้นบรรยากาศของโลก",
    "alternatives": [
      "แกนโลกชั้นใน",
      "เปลือกโลกส่วนนอก",
      "ก้นบึ้งมหาสมุทร"
    ],
    "example": "The ozone layer within Earth's upper atmosphere filters out lethal ultraviolet solar rays.",
    "exampleThai": "ชั้นโอโซนในชั้นบรรยากาศของโลกตอนบนทำหน้าที่กรองรังสีอัลตราไวโอเลตที่เป็นอันตรายจากดวงอาทิตย์"
  },
  {
    "id": "v_b2_nature_01",
    "word": "precipitation",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "หยาดน้ำฟ้าทั้งฝนและหิมะ",
    "alternatives": [
      "การระเหยกลายเป็นไอ",
      "ความดันบรรยากาศ",
      "ทิศทางลมชั้นบน"
    ],
    "example": "Meteorologists recorded uncharacteristically heavy annual precipitation across the southern provinces.",
    "exampleThai": "นักอุตุนิยมวิทยาบันทึกปริมาณหยาดน้ำฟ้าทั้งฝนและหิมะประจำปีที่ตกหนักผิดปกติทั่วจังหวัดภาคใต้"
  },
  {
    "id": "v_b2_nature_02",
    "word": "degradation",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ความเสื่อมโทรมของทรัพยากร",
    "alternatives": [
      "การฟื้นฟูความอุดมสมบูรณ์",
      "การอนุรักษ์เชิงรุก",
      "การเจริญเติบโตอย่างยั่งยืน"
    ],
    "example": "Overgrazing and commercial deforestation lead directly to irreversible soil degradation.",
    "exampleThai": "การปล่อยให้สัตว์เล็มหญ้ามากเกินไปและการตัดไม้ทำลายป่าเชิงพาณิชย์นำไปสู่ความเสื่อมโทรมของทรัพยากรหน้าดินที่ไม่อาจฟื้นฟูได้"
  },
  {
    "id": "v_b2_nature_03",
    "word": "sustainability",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ความยั่งยืนด้านสิ่งแวดล้อม",
    "alternatives": [
      "การผลาญทรัพยากรหมดสิ้น",
      "ผลประโยชน์ระยะสั้น",
      "การทำลายระบบนิเวศ"
    ],
    "example": "Modern agricultural policies must prioritize long-term ecological sustainability over quick profit.",
    "exampleThai": "นโยบายการเกษตรสมัยใหม่ต้องให้ความสำคัญกับความยั่งยืนด้านสิ่งแวดล้อมเชิงนิเวศในระยะยาวมากกว่าผลกำไรชั่วคราว"
  },
  {
    "id": "v_b2_nature_04",
    "word": "contamination",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "การปนเปื้อนของสารพิษ",
    "alternatives": [
      "ความบริสุทธิ์ผุดผ่อง",
      "การกรองสิ่งสกปรก",
      "การฆ่าเชื้อโรค"
    ],
    "example": "Chemical runoff from nearby factories caused dangerous heavy metal contamination in the reservoir.",
    "exampleThai": "สารเคมีไหลบ่าจากโรงงานใกล้เคียงก่อให้เกิดการปนเปื้อนของสารพิษโลหะหนักอันตรายในอ่างเก็บน้ำ"
  },
  {
    "id": "v_b2_nature_conserve",
    "word": "conserve",
    "pos": "v.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "อนุรักษ์สงวนรักษา",
    "alternatives": [
      "ผลาญทำลายสิ้น",
      "ปล่อยให้สูญพันธุ์",
      "ใช้ประโยชน์จนหมด"
    ],
    "example": "International organizations urge governments to conserve natural wetlands and mangrove forests.",
    "exampleThai": "องค์กรระหว่างประเทศกระตุ้นให้รัฐบาลอนุรักษ์สงวนรักษาพื้นที่ชุ่มน้ำตามธรรมชาติและป่าชายเลน"
  },
  {
    "id": "v_b2_nature_06",
    "word": "carnivore",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สัตว์กินเนื้อเป็นอาหารหลัก",
    "alternatives": [
      "สัตว์กินพืชเป็นอาหาร",
      "สัตว์กินทั้งพืชและสัตว์",
      "สิ่งมีชีวิตย่อยสลาย"
    ],
    "example": "As apex carnivores, lions regulate herbivore populations and preserve savannah equilibrium.",
    "exampleThai": "ในฐานะสัตว์กินเนื้อเป็นอาหารหลักลำดับบนสุด สิงโตช่วยควบคุมจำนวนประชากรสัตว์กินพืชและรักษาสมดุลทุ่งสะวันนา"
  },
  {
    "id": "v_b2_nature_07",
    "word": "herbivore",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สัตว์กินพืชเป็นอาหารหลัก",
    "alternatives": [
      "สัตว์กินเนื้อเป็นอาหาร",
      "สัตว์นักล่าเหยื่อ",
      "สัตว์กินซาก"
    ],
    "example": "Elephants, zebras, and giraffes are majestic wild herbivores native to the African plains.",
    "exampleThai": "ช้าง ม้าลาย และยีราฟ เป็นสัตว์กินพืชเป็นอาหารหลักในป่าที่สง่างามประจำถิ่นที่ราบแอฟริกา"
  },
  {
    "id": "v_b2_nature_08",
    "word": "nocturnal",
    "pos": "adj.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ซึ่งออกหากินในเวลากลางคืน",
    "alternatives": [
      "ซึ่งตื่นตัวในเวลากลางวัน",
      "ซึ่งจำศีลในฤดูหนาว",
      "ซึ่งอาศัยเฉพาะใต้น้ำ"
    ],
    "example": "Owls and bats possess extraordinary sensory adaptations tailored for nocturnal hunting.",
    "exampleThai": "นกฮูกและค้างคาวมีการปรับตัวของประสาทสัมผัสอันยอดเยี่ยมที่ออกแบบมาสำหรับการล่าซึ่งออกหากินในเวลากลางคืน"
  },
  {
    "id": "v_b2_nature_deplete",
    "word": "deplete",
    "pos": "v.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ทำให้ร่อยหรอสูญสิ้น",
    "alternatives": [
      "ฟื้นฟูให้เต็มเปี่ยม",
      "เติมเต็มทดแทน",
      "สะสมเพิ่มพูน"
    ],
    "example": "Overfishing and pollution continue to deplete marine fish stocks across coastal waters.",
    "exampleThai": "การทำประมงเกินขนาดและมลพิษยังคงทำให้ปริมาณปลาในทะเลทำให้ร่อยหรอสูญสิ้นไปอย่างต่อเนื่อง"
  },
  {
    "id": "v_b2_nature_10",
    "word": "barren",
    "pos": "adj.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แห้งแล้งจนเพาะปลูกไม่ขึ้น",
    "alternatives": [
      "อุดมสมบูรณ์เขียวชอุ่ม",
      "เหมาะแก่การทำกสิกรรม",
      "ชุ่มน้ำตลอดปี"
    ],
    "example": "The rocky, arid landscape was so completely barren that not a single shrub could sprout.",
    "exampleThai": "ภูมิทัศน์ที่เต็มไปด้วยหินและแห้งผากนั้นแห้งแล้งจนเพาะปลูกไม่ขึ้นจนไม่มีไม้พุ่มแม้แต่ต้นเดียวงอกขึ้นมาได้"
  },
  {
    "id": "v_b2_nature_11",
    "word": "erosion",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "การสึกกร่อนพังทลายของดิน",
    "alternatives": [
      "การสะสมของตะกอนดิน",
      "การเกิดดินใหม่",
      "การบำรุงหน้าดิน"
    ],
    "example": "Planting deep-rooted vetiver grass along steep highway hillsides halts catastrophic soil erosion.",
    "exampleThai": "การปลูกหญ้าแฝกที่มีรากลึกตามแนวลาดไหล่เขาทางหลวงช่วยยับยั้งการสึกกร่อนพังทลายของดินได้อย่างชะงัด"
  },
  {
    "id": "v_b2_nature_emit",
    "word": "emit",
    "pos": "v.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ปล่อยก๊าซหรือมลพิษ",
    "alternatives": [
      "ดูดซับสารพิษ",
      "กักเก็บคาร์บอน",
      "กรองอากาศบริสุทธิ์"
    ],
    "example": "Coal power plants emit substantial volumes of greenhouse gases into the upper atmosphere.",
    "exampleThai": "โรงไฟฟ้าถ่านหินปล่อยก๊าซหรือมลพิษเรือนกระจกในปริมาณมหาศาลขึ้นสู่ชั้นบรรยากาศระดับบน"
  },
  {
    "id": "v_b2_nature_13",
    "word": "catastrophic",
    "pos": "adj.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ที่ก่อให้เกิดหายนะรุนแรง",
    "alternatives": [
      "ที่ไม่ส่งผลกระทบใดๆ",
      "ที่ก่อประโยชน์ระยะยาว",
      "ที่ควบคุมได้ง่าย"
    ],
    "example": "Unchecked global temperature rises risk triggering catastrophic sea level inundation worldwide.",
    "exampleThai": "อุณหภูมิโลกที่เพิ่มขึ้นอย่างควบคุมไม่ได้เสี่ยงที่จะกระตุ้นให้เกิดน้ำท่วมจากระดับน้ำทะเลที่ก่อให้เกิดหายนะรุนแรง"
  },
  {
    "id": "v_b2_nature_14",
    "word": "flora",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "พืชพรรณประจำถิ่น",
    "alternatives": [
      "สัตว์ป่าประจำถิ่น",
      "สิ่งมีชีวิตเซลล์เดียว",
      "สัตว์เลื้อยคลาน"
    ],
    "example": "Botanists spent three years cataloguing the endemic alpine flora of the northern limestone ranges.",
    "exampleThai": "นักพฤกษศาสตร์ใช้เวลาสามปีในการจัดทำบัญชีพืชพรรณประจำถิ่นบนเทือกเขาหินปูนทางตอนเหนือ"
  },
  {
    "id": "v_b2_nature_15",
    "word": "fauna",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สัตว์ป่าประจำถิ่น",
    "alternatives": [
      "พืชดอกประจำถิ่น",
      "เห็ดราในป่า",
      "สิ่งไม่มีชีวิต"
    ],
    "example": "Australia's isolated geographic evolution produced unique marsupial fauna found nowhere else.",
    "exampleThai": "วิวัฒนาการทางภูมิศาสตร์ที่โดดเดี่ยวของออสเตรเลียให้กำเนิดสัตว์ป่าประจำถิ่นกลุ่มมีกระเป๋าหน้าท้องอันเป็นเอกลักษณ์"
  },
  {
    "id": "v_b2_nature_16",
    "word": "ecological",
    "pos": "adj.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "เชิงระบบนิเวศทางธรรมชาติ",
    "alternatives": [
      "เชิงเศรษฐศาสตร์การเงิน",
      "เชิงวิศวกรรมโยธา",
      "เชิงอุตสาหกรรมปิโตรเคมี"
    ],
    "example": "Dams drastically disrupt downstream fish migration and alter the ecological balance of rivers.",
    "exampleThai": "การสร้างเขื่อนส่งผลกระทบอย่างรุนแรงต่อการอพยพของปลาท้ายน้ำและเปลี่ยนสมดุลเชิงระบบนิเวศทางธรรมชาติของแม่น้ำ"
  },
  {
    "id": "v_b2_nature_17",
    "word": "poaching",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "การลักลอบล่าสัตว์ป่าผิดกฎหมาย",
    "alternatives": [
      "การขยายพันธุ์สัตว์ในป่า",
      "การติดแท็กดาวเทียมติดตาม",
      "การรักษาพยาบาลสัตว์ป่า"
    ],
    "example": "Armed forest rangers risk their lives patroling vast sanctuaries to deter ivory poaching syndicates.",
    "exampleThai": "เจ้าหน้าที่พิทักษ์ป่าติดอาวุธเสี่ยงชีวิตลาดตระเวนเขตรักษาพันธุ์สัตว์ป่าเพื่อยับยั้งการลักลอบล่าสัตว์ป่าผิดกฎหมายเอางาช้าง"
  },
  {
    "id": "v_a1_shop_01",
    "word": "buy",
    "pos": "v.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ซื้อหาสิ่งของ",
    "alternatives": [
      "ขายทอดตลาด",
      "ขอยืมใช้",
      "แจกจ่ายฟรี"
    ],
    "example": "I want to buy fresh tropical fruit at the open-air morning market.",
    "exampleThai": "ฉันต้องการซื้อหาสิ่งของผลไม้เมืองร้อนสดใหม่ที่ตลาดเช้ากลางแจ้ง"
  },
  {
    "id": "v_a1_shop_02",
    "word": "sell",
    "pos": "v.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ขายสินค้า",
    "alternatives": [
      "ซื้อเข้ามา",
      "บริจาคให้",
      "กักตุนไว้"
    ],
    "example": "Street merchants sell crispy banana fritters along the bustling sidewalk.",
    "exampleThai": "พ่อค้าแม่ค้าริมทางขายสินค้ากล้วยทอดกรอบตลอดแนวทางเท้าอันคึกคัก"
  },
  {
    "id": "v_a1_shop_03",
    "word": "cost",
    "pos": "v.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "มีราคาขาย",
    "alternatives": [
      "ได้กำไร",
      "ลดราคาลง",
      "แจกให้ฟรี"
    ],
    "example": "How much does this handcrafted ceramic coffee mug cost?",
    "exampleThai": "แก้วกาแฟเซรามิกทำมือใบนี้มีราคาขายเท่าไหร่"
  },
  {
    "id": "v_a1_shop_04",
    "word": "pay",
    "pos": "v.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ชำระเงินค่าสินค้า",
    "alternatives": [
      "ขอผัดผ่อนหนี้",
      "รับเงินทอน",
      "ขอยืมเงิน"
    ],
    "example": "Can I pay for these groceries with a digital QR code scan?",
    "exampleThai": "ฉันสามารถชำระเงินค่าสินค้าของชำเหล่านี้ด้วยการสแกนคิวอาร์โค้ดดิจิทัลได้ไหม"
  },
  {
    "id": "v_a1_shop_05",
    "word": "price",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ราคาป้ายจำหน่าย",
    "alternatives": [
      "คุณภาพสินค้า",
      "วันที่ผลิต",
      "ขนาดบรรจุ"
    ],
    "example": "The price tag on the cotton shirt clearly shows three hundred baht.",
    "exampleThai": "ราคาป้ายจำหน่ายบนเสื้อเชิ้ตผ้าฝ้ายแสดงตัวเลขสามร้อยบาทไว้อย่างชัดเจน"
  },
  {
    "id": "v_a1_shop_06",
    "word": "money",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เงินทองใช้จ่าย",
    "alternatives": [
      "กระเป๋าสตางค์",
      "ตู้เซฟ",
      "บัตรประชาชน"
    ],
    "example": "Always keep emergency cash money tucked safely in your inside pocket.",
    "exampleThai": "เก็บเงินทองใช้จ่ายสดฉุกเฉินไว้ในกระเป๋าเสื้อด้านในอย่างปลอดภัยเสมอ"
  },
  {
    "id": "v_a1_shop_07",
    "word": "cash",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เงินสดในมือ",
    "alternatives": [
      "เช็คสั่งจ่าย",
      "บัตรเครดิต",
      "เหรียญดิจิทัล"
    ],
    "example": "Traditional small noodle vendors prefer receiving exact payment in cash.",
    "exampleThai": "ร้านก๋วยเตี๋ยวโบราณขนาดเล็กชอบรับการชำระเงินด้วยเงินสดในมือตามจำนวนที่พอดี"
  },
  {
    "id": "v_a1_shop_08",
    "word": "coin",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เหรียญกษาปณ์",
    "alternatives": [
      "ธนบัตรใบใหญ่",
      "บัตรสมาชิก",
      "คูปองกระดาษ"
    ],
    "example": "Insert a ten-baht coin into the laundry washing machine slot.",
    "exampleThai": "หยอดเหรียญกษาปณ์สิบบาทลงในช่องหยอดของเครื่องซักผ้าหยอดเหรียญ"
  },
  {
    "id": "v_a1_shop_09",
    "word": "dollar",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สกุลเงินดอลลาร์",
    "alternatives": [
      "สกุลเงินยูโร",
      "สกุลเงินเยน",
      "สกุลเงินปอนด์"
    ],
    "example": "The tourist exchanged two hundred American dollar banknotes at the counter.",
    "exampleThai": "นักท่องเที่ยวแลกธนบัตรสกุลเงินดอลลาร์สหรัฐสองร้อยดอลลาร์ที่เคาน์เตอร์"
  },
  {
    "id": "v_a1_shop_10",
    "word": "baht",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สกุลเงินบาทไทย",
    "alternatives": [
      "สกุลเงินดอลลาร์",
      "สกุลเงินเยน",
      "สกุลเงินวอน"
    ],
    "example": "A fragrant bowl of boat noodles costs only fifty Thai baht.",
    "exampleThai": "ก๋วยเตี๋ยวเรือรสหอมเข้มข้นราคาเพียงห้าสิบสกุลเงินบาทไทยเท่านั้น"
  },
  {
    "id": "v_a1_shop_11",
    "word": "market",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ตลาดสดชุมชน",
    "alternatives": [
      "ห้างสรรพสินค้าหรู",
      "โรงพยาบาล",
      "สถานีตำรวจ"
    ],
    "example": "Locals flock to the fresh morning market to buy seafood and crisp vegetables.",
    "exampleThai": "ชาวบ้านหลั่งไหลไปยังตลาดสดชุมชนยามเช้าเพื่อซื้ออาหารทะเลและผักสดกรอบ"
  },
  {
    "id": "v_a1_shop_12",
    "word": "store",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ร้านค้าขายของ",
    "alternatives": [
      "โรงงานผลิต",
      "อู่ซ่อมรถ",
      "ธนาคาร"
    ],
    "example": "There is a twenty-four-hour convenience store situated directly across our street.",
    "exampleThai": "มีร้านค้าขายของสะดวกซื้อเปิดยี่สิบสี่ชั่วโมงตั้งอยู่ตรงข้ามถนนของเราพอดี"
  },
  {
    "id": "v_a1_shop_13",
    "word": "cheap",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ราคาถูกย่อมเยา",
    "alternatives": [
      "ราคาแพงลิบลิ่ว",
      "หรูหราฟุ่มเฟือย",
      "หายากราคาแพง"
    ],
    "example": "Street food meals in Bangkok are deliciously cheap and nutritious.",
    "exampleThai": "อาหารริมทางในกรุงเทพฯ มีรสชาติอร่อยในราคาถูกย่อมเยาและมีคุณค่าทางอาหาร"
  },
  {
    "id": "v_a1_shop_14",
    "word": "expensive",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ราคาแพงเกินตัว",
    "alternatives": [
      "ราคาถูกย่อมเยา",
      "แจกจ่ายฟรี",
      "ลดกระหน่ำ"
    ],
    "example": "Designer leather handbags displayed in luxury boutiques are extremely expensive.",
    "exampleThai": "กระเป๋าถือหนังแท้แบรนด์เนมที่จัดแสดงในร้านบูติกหรูหรามีราคาแพงเกินตัวอย่างยิ่ง"
  },
  {
    "id": "v_a1_shop_15",
    "word": "spend",
    "pos": "v.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ใช้จ่ายเงินทอง",
    "alternatives": [
      "เก็บออมเงิน",
      "หาเงินเข้ากระเป๋า",
      "ฝากเงินธนาคาร"
    ],
    "example": "Be prudent and do not spend more money than you earn each month.",
    "exampleThai": "จงรอบคอบและอย่าใช้จ่ายเงินทองมากเกินกว่าที่ตนเองหาได้ในแต่ละเดือน"
  },
  {
    "id": "v_a1_shop_16",
    "word": "shop",
    "pos": "v.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เดินเลือกซื้อของ",
    "alternatives": [
      "ทำงานในออฟฟิศ",
      "นั่งอ่านหนังสือ",
      "นอนหลับพัก"
    ],
    "example": "We love to shop for handmade vintage dresses at the weekend flea market.",
    "exampleThai": "พวกเราชอบเดินเลือกซื้อของชุดกระโปรงวินเทจทำมือที่ตลาดนัดสุดสัปดาห์"
  },
  {
    "id": "v_a1_shop_17",
    "word": "free",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "แจกฟรีไม่คิดเงิน",
    "alternatives": [
      "คิดราคาแพง",
      "มีค่าธรรมเนียม",
      "ต้องวางมัดจำ"
    ],
    "example": "The bookstore offers a complimentary free bookmark with every novel purchased.",
    "exampleThai": "ร้านหนังสือมอบที่คั่นหนังสือแจกฟรีไม่คิดเงินเป็นของสมนาคุณสำหรับนิยายทุกเล่มที่ซื้อ"
  },
  {
    "id": "v_a1_shop_18",
    "word": "change",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เงินทอนค่าสินค้า",
    "alternatives": [
      "ใบเสร็จภาษี",
      "คูปองแลกของ",
      "ถุงช้อปปิ้ง"
    ],
    "example": "Here is your grocery receipt and twenty baht in coin change.",
    "exampleThai": "นี่คือใบเสร็จของชำและเงินทอนค่าสินค้าเหรียญยี่สิบบาทของคุณค่ะ"
  },
  {
    "id": "v_a1_shop_19",
    "word": "purse",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "กระเป๋าใส่สตางค์สตรี",
    "alternatives": [
      "กระเป๋าเดินทางใหญ่",
      "ถุงผ้าใบหนา",
      "เป้สะพายหลัง"
    ],
    "example": "She reached into her leather shoulder purse to retrieve the house keys.",
    "exampleThai": "เธอล้วงมือเข้าไปในกระเป๋าใส่สตางค์สตรีหนังสะพายไหล่เพื่อหยิบกุญแจบ้าน"
  },
  {
    "id": "v_a1_shop_20",
    "word": "bag",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ถุงผ้าใส่ของ",
    "alternatives": [
      "กล่องกระดาษพัสดุ",
      "ถังขยะพลาสติก",
      "ตระกร้าผ้า"
    ],
    "example": "Bring a reusable cotton shopping bag to reduce single-use plastic waste.",
    "exampleThai": "พกถุงผ้าใส่ของผ้าฝ้ายที่นำกลับมาใช้ซ้ำได้เพื่อลดขยะพลาสติกใช้ครั้งเดียว"
  },
  {
    "id": "v_a1_shop_21",
    "word": "shoe",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "รองเท้าคู่ใหม่",
    "alternatives": [
      "ถุงเท้าคู่สั้น",
      "เชือกผูกรองเท้า",
      "แผ่นรองพื้นรองเท้า"
    ],
    "example": "He bought a durable pair of cushioned running shoes for the marathon.",
    "exampleThai": "เขาซื้อรองเท้าคู่ใหม่สำหรับวิ่งที่มีพื้นนุ่มและทนทานสำหรับการแข่งขันมาราธอน"
  },
  {
    "id": "v_a1_shop_22",
    "word": "shirt",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เสื้อเชิ้ตสวมใส่",
    "alternatives": [
      "กางเกงขายาว",
      "เข็มขัดหนัง",
      "เนคไทไหม"
    ],
    "example": "Iron your crisp white collared shirt neatly before heading to work.",
    "exampleThai": "รีดเสื้อเชิ้ตสวมใส่มีปกสีขาวตัวเก่งของคุณให้เรียบก่อนเดินทางไปทำงาน"
  },
  {
    "id": "v_a1_shop_23",
    "word": "dress",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ชุดกระโปรงสตรี",
    "alternatives": [
      "ชุดสูทสากล",
      "กางเกงยีนส์",
      "เสื้อกั๊กกันหนาว"
    ],
    "example": "She wore a graceful floral silk dress to her sister's wedding party.",
    "exampleThai": "เธอสวมชุดกระโปรงสตรีผ้าไหมลายดอกไม้อันสง่างามไปงานเลี้ยงแต่งงานของพี่สาว"
  },
  {
    "id": "v_a1_shop_24",
    "word": "hat",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "หมวกปีกบังแดด",
    "alternatives": [
      "แว่นตากันแดด",
      "ผ้าพันคอ",
      "ร่มพับ"
    ],
    "example": "Put on a wide-brimmed straw hat to protect your face at the beach.",
    "exampleThai": "สวมหมวกปีกบังแดดสานปีกกว้างเพื่อปกป้องใบหน้าของคุณที่ชายหาด"
  },
  {
    "id": "v_a1_shop_25",
    "word": "open",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เปิดทำการค้าขาย",
    "alternatives": [
      "ปิดร้านสนิท",
      "หยุดปรับปรุง",
      "ย้ายสถานที่"
    ],
    "example": "The department store is open from ten in the morning until nine at night.",
    "exampleThai": "ห้างสรรพสินค้าเปิดทำการค้าขายตั้งแต่สิบโมงเช้าจนถึงสามทุ่มทุกวัน"
  },
  {
    "id": "v_a1_shop_26",
    "word": "close",
    "pos": "v.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ปิดร้านค้า",
    "alternatives": [
      "เปิดต้อนรับลูกค้า",
      "จัดวางสินค้า",
      "เริ่มโปรโมชัน"
    ],
    "example": "The specialty bakery shops close early once daily batches sell out completely.",
    "exampleThai": "ร้านขนมอบพิเศษปิดร้านค้าแต่หัววันทันทีที่สินค้าที่ทำในแต่ละวันขายหมดเกลี้ยง"
  },
  {
    "id": "v_a1_shop_27",
    "word": "heavy",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "หนักมากเกินยก",
    "alternatives": [
      "เบาหวิว",
      "พกพาสะดวก",
      "กะทัดรัด"
    ],
    "example": "The supermarket grocery basket was too heavy for the young child to lift.",
    "exampleThai": "ตะกร้าของชำซูเปอร์มาร์เก็ตหนักมากเกินยกสำหรับเด็กเล็กที่จะยกขึ้นไหว"
  },
  {
    "id": "v_a1_shop_28",
    "word": "light",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "น้ำหนักเบาพกง่าย",
    "alternatives": [
      "หนักอึ้ง",
      "เทอะทะเกะกะ",
      "เคลื่อนย้ายยาก"
    ],
    "example": "Carbon-fiber shopping trolley frames are impressively light and sturdy.",
    "exampleThai": "โครงรถเข็นช้อปปิ้งคาร์บอนไฟเบอร์มีน้ำหนักเบาพกง่ายและแข็งแรงทนทานอย่างน่าประทับใจ"
  },
  {
    "id": "v_a1_shop_29",
    "word": "big",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ขนาดใหญ่จุใจ",
    "alternatives": [
      "ขนาดเล็กจิ๋ว",
      "ขนาดพอดีตัว",
      "คับแคบ"
    ],
    "example": "They purchased a big stainless steel refrigerator during the annual factory sale.",
    "exampleThai": "พวกเขาซื้อตู้เย็นสแตนเลสขนาดใหญ่จุใจในช่วงลดราคาประจำปีของโรงงาน"
  },
  {
    "id": "v_a1_shop_30",
    "word": "small",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ขนาดกะทัดรัด",
    "alternatives": [
      "ขนาดใหญ่โต",
      "มหึมา",
      "เทอะทะ"
    ],
    "example": "She opted for a small leather purse that easily fits into her blazer pocket.",
    "exampleThai": "เธอเลือกกระเป๋าสตางค์หนังขนาดกะทัดรัดที่ใส่ลงในกระเป๋าเสื้อสูทได้อย่างพอดี"
  },
  {
    "id": "v_a2_shop_01",
    "word": "receipt",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ใบเสร็จรับเงิน",
    "alternatives": [
      "ใบเสนอราคา",
      "คูปองแลกของ",
      "ใบปลิวโฆษณา"
    ],
    "example": "Retain your purchase receipt to validate the one-year manufacturer warranty.",
    "exampleThai": "เก็บใบเสร็จรับเงินค่าสินค้าไว้เพื่อเป็นหลักฐานยืนยันการรับประกันของบริษัทผู้ผลิตหนึ่งปี"
  },
  {
    "id": "v_a2_shop_02",
    "word": "discount",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ส่วนลดพิเศษ",
    "alternatives": [
      "ภาษีเพิ่ม",
      "ค่าบริการเสริม",
      "ดอกเบี้ยปรับ"
    ],
    "example": "The clearance sale offers a twenty percent discount on selected kitchen appliances.",
    "exampleThai": "งานลดล้างสต็อกมอบส่วนลดพิเศษร้อยละยี่สิบสำหรับเครื่องใช้ในครัวที่ร่วมรายการ"
  },
  {
    "id": "v_a2_shop_03",
    "word": "bargain",
    "pos": "v.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ต่อรองราคาซื้อขาย",
    "alternatives": [
      "จ่ายเต็มราคาป้าย",
      "ให้ทิปเพิ่ม",
      "ยกเลิกการสั่งซื้อ"
    ],
    "example": "Shoppers can politely bargain for handicrafts at weekend night street markets.",
    "exampleThai": "ผู้ซื้อสามารถต่อรองราคาซื้อขายสินค้าหัตถกรรมอย่างสุภาพที่ตลาดนัดกลางคืนสุดสัปดาห์"
  },
  {
    "id": "v_a2_shop_04",
    "word": "wallet",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "กระเป๋าสตางค์พกพา",
    "alternatives": [
      "กระเป๋าเอกสาร",
      "ถุงช้อปปิ้ง",
      "เป้เดินทาง"
    ],
    "example": "He took out his leather wallet to pay for the three cups of iced latte.",
    "exampleThai": "เขาหยิบกระเป๋าสตางค์พกพาหนังแท้ออกมาเพื่อจ่ายค่ากาแฟลาเต้เย็นสามแก้ว"
  },
  {
    "id": "v_a2_shop_05",
    "word": "credit",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "วงเงินบัตรเครดิต",
    "alternatives": [
      "เงินสดธนบัตร",
      "เหรียญสลึง",
      "สมุดเช็ค"
    ],
    "example": "Paying with a contactless credit card earns loyalty points on every purchase.",
    "exampleThai": "การชำระเงินด้วยวงเงินบัตรเครดิตแบบไร้สัมผัสช่วยสะสมคะแนนในทุกการซื้อ"
  },
  {
    "id": "v_a2_shop_06",
    "word": "customer",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ลูกค้าผู้มาอุดหนุน",
    "alternatives": [
      "พนักงานแคชเชียร์",
      "ผู้จัดการสาขา",
      "พนักงานรักษาความปลอดภัย"
    ],
    "example": "The store manager greeted each valued customer with a polite traditional bow.",
    "exampleThai": "ผู้จัดการร้านกล่าวต้อนรับลูกค้าผู้มาอุดหนุนคนสำคัญแต่ละท่านด้วยการไหว้อย่างสุภาพ"
  },
  {
    "id": "v_a2_shop_07",
    "word": "clerk",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "พนักงานขายหน้าร้าน",
    "alternatives": [
      "ลูกค้าผู้ซื้อ",
      "คนส่งของ",
      "เจ้าของอาคาร"
    ],
    "example": "The helpful sales clerk checked warehouse inventory to find my shoe size.",
    "exampleThai": "พนักงานขายหน้าร้านผู้กระตือรือร้นช่วยเช็กสินค้าในโกดังเพื่อค้นหารองเท้าไซส์ของฉัน"
  },
  {
    "id": "v_a2_shop_08",
    "word": "mall",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ห้างสรรพสินค้า",
    "alternatives": [
      "ร้านสะดวกซื้อหัวมุมถนน",
      "แผงขายของสดริมทาง",
      "ร้านขายยาชุมชน"
    ],
    "example": "Bangkok malls feature air-conditioned boutiques, restaurants, and multiplex cinemas.",
    "exampleThai": "ห้างสรรพสินค้าครบวงจรในกรุงเทพฯ มีร้านค้าปรับอากาศ ร้านอาหาร และโรงภาพยนตร์ครบครัน"
  },
  {
    "id": "v_a2_shop_09",
    "word": "brand",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "แบรนด์ตราสินค้า",
    "alternatives": [
      "บาร์โค้ด",
      "ป้ายราคาลด",
      "ใบกำกับภาษี"
    ],
    "example": "Consumers trust the Japanese electronics brand for unparalleled build reliability.",
    "exampleThai": "ผู้บริโภคไว้วางใจแบรนด์ตราสินค้าอิเล็กทรอนิกส์ของญี่ปุ่นในเรื่องความทนทานอันไร้ที่ติ"
  },
  {
    "id": "v_a2_shop_10",
    "word": "size",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ขนาดไซส์เสื้อผ้า",
    "alternatives": [
      "สีสันผ้า",
      "ชนิดเส้นใย",
      "ราคาสินค้า"
    ],
    "example": "Do you happen to have this denim jacket available in a medium size?",
    "exampleThai": "คุณพอจะมีเสื้อแจ็คเก็ตยีนส์ตัวนี้ในขนาดไซส์เสื้อผ้าขนาดกลางไหมครับ"
  },
  {
    "id": "v_a2_shop_11",
    "word": "borrow",
    "pos": "v.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ขอยืมเงินชั่วคราว",
    "alternatives": [
      "ให้เงินกู้",
      "ชำระคืนเงิน",
      "แจกจ่ายให้"
    ],
    "example": "He had to borrow fifty baht from his coworker to pay for bus fare.",
    "exampleThai": "เขาต้องขอยืมเงินชั่วคราวห้าสิบบาทจากเพื่อนร่วมงานเพื่อจ่ายค่ารถเมล์"
  },
  {
    "id": "v_a2_shop_12",
    "word": "lend",
    "pos": "v.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ให้ผู้อื่นยืมเงิน",
    "alternatives": [
      "กู้ยืมเงินมา",
      "ริบทรัพย์สิน",
      "ทวงหนี้สิน"
    ],
    "example": "She agreed to lend her younger brother enough money to buy textbooks.",
    "exampleThai": "เธอตกลงที่จะให้ผู้อื่นยืมเงินแก่น้องชายของเธอมากพอที่จะซื้อหนังสือเรียน"
  },
  {
    "id": "v_a2_shop_13",
    "word": "debt",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ภาระหนี้สินค้างชำระ",
    "alternatives": [
      "เงินออมสะสม",
      "เงินปันผลหุ้น",
      "เงินรางวัล"
    ],
    "example": "Living within your means is the surest strategy to avoid crushing credit debt.",
    "exampleThai": "การใช้ชีวิตอย่างพอเพียงเป็นกลยุทธ์ที่แน่นอนที่สุดในการหลีกเลี่ยงภาระหนี้สินค้างชำระจากบัตรเครดิต"
  },
  {
    "id": "v_a2_shop_14",
    "word": "banknote",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ธนบัตรกระดาษ",
    "alternatives": [
      "เหรียญกษาปณ์",
      "เช็คสั่งจ่าย",
      "สลิปบัตร"
    ],
    "example": "The bank teller counted stacks of pristine thousand-baht paper banknotes.",
    "exampleThai": "พนักงานหน้าเคาน์เตอร์ธนาคารนับปึกธนบัตรกระดาษใบละหนึ่งพันบาทสภาพใหม่เอี่ยม"
  },
  {
    "id": "v_a2_shop_15",
    "word": "cart",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "รถเข็นใส่ของ",
    "alternatives": [
      "ตะกร้าถือขนาดเล็ก",
      "เคาน์เตอร์แคชเชียร์",
      "ชั้นวางสินค้า"
    ],
    "example": "Wheeling a heavy shopping cart through crowded grocery aisles requires care.",
    "exampleThai": "การเข็นรถเข็นใส่ของช้อปปิ้งหนักๆ ผ่านทางเดินของชำที่แออัดต้องใช้ความระมัดระวัง"
  },
  {
    "id": "v_a2_shop_16",
    "word": "exchange",
    "pos": "v.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เปลี่ยนขนาดสินค้า",
    "alternatives": [
      "ทิ้งลงถัง",
      "ยึดสินค้าคืน",
      "ขอรับรางวัล"
    ],
    "example": "The boutique allowed her to exchange the oversized silk blouse for a smaller one.",
    "exampleThai": "ร้านบูติกอนุญาตให้เธอเปลี่ยนขนาดสินค้าเสื้อเบลาส์ผ้าไหมที่ตัวใหญ่เกินไปเป็นขนาดที่เล็กลง"
  },
  {
    "id": "v_a2_shop_17",
    "word": "return",
    "pos": "v.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ส่งคืนสินค้าเพื่อรับเงิน",
    "alternatives": [
      "ซื้อสินค้าเพิ่ม",
      "แลกของแถม",
      "ซ่อมแซมเอง"
    ],
    "example": "Customers may return defective gadgets within thirty days of retail purchase.",
    "exampleThai": "ลูกค้าสามารถส่งคืนสินค้าเพื่อรับเงินสำหรับอุปกรณ์ที่ชำรุดได้ภายในสามสิบวันนับแต่วันที่ซื้อ"
  },
  {
    "id": "v_a2_shop_18",
    "word": "counter",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เคาน์เตอร์ชำระเงิน",
    "alternatives": [
      "ประตูทางเข้า",
      "ห้องลองเสื้อ",
      "ลานจอดรถ"
    ],
    "example": "Queue up politely behind the designated line at the checkout payment counter.",
    "exampleThai": "เข้าแถวอย่างสุภาพหลังเส้นที่กำหนดไว้ตรงเคาน์เตอร์ชำระเงินคิดเงิน"
  },
  {
    "id": "v_a2_shop_19",
    "word": "fashion",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "แฟชั่นเครื่องแต่งกาย",
    "alternatives": [
      "นโยบายภาษีโรงเรือน",
      "การก่อสร้างถนน",
      "อัตราดอกเบี้ย"
    ],
    "example": "Youth clothing stores continually adapt to rapid seasonal shifts in street fashion.",
    "exampleThai": "ร้านเสื้อผ้าวัยรุ่นปรับตัวอย่างต่อเนื่องตามกระแสแฟชั่นเครื่องแต่งกายแนวสตรีทที่เปลี่ยนไว"
  },
  {
    "id": "v_a2_shop_20",
    "word": "order",
    "pos": "v.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สั่งซื้อสินค้า",
    "alternatives": [
      "ยกเลิกบริการทั้งหมด",
      "ร้องเรียนการบริการ",
      "ส่งซ่อมแซม"
    ],
    "example": "You can order authentic northern woven cotton scarves directly from the artisans.",
    "exampleThai": "คุณสามารถสั่งซื้อสินค้าทางร้านผ้าพันคอผ้าฝ้ายทอมือแท้จากภาคเหนือได้โดยตรงจากช่างฝีมือ"
  },
  {
    "id": "v_a2_shop_21",
    "word": "deliver",
    "pos": "v.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "จัดส่งพัสดุถึงบ้าน",
    "alternatives": [
      "เก็บไว้ที่สาขา",
      "ยกเลิกคำสั่งซื้อ",
      "ระงับการจัดส่ง"
    ],
    "example": "Express courier couriers deliver package boxes to residential doorsteps overnight.",
    "exampleThai": "พนักงานขนส่งด่วนจัดส่งพัสดุถึงบ้านกล่องพัสดุถึงหน้าประตูบ้านพักอาศัยข้ามคืน"
  },
  {
    "id": "v_a2_shop_22",
    "word": "parcel",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "กล่องพัสดุไปรษณีย์",
    "alternatives": [
      "จดหมายซองขาว",
      "โปสการ์ดภาพวิว",
      "ใบเสร็จค่าไฟ"
    ],
    "example": "The courier handed over a securely taped cardboard parcel containing books.",
    "exampleThai": "พนักงานส่งของส่งมอบกล่องพัสดุไปรษณีย์กระดาษแข็งที่ติดเทปแน่นหนาซึ่งบรรจุหนังสือ"
  },
  {
    "id": "v_a2_shop_23",
    "word": "warranty",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เอกสารรับประกันคุณภาพ",
    "alternatives": [
      "ใบเสนอราคา",
      "คู่มือการติดตั้ง",
      "แผ่นพับโฆษณา"
    ],
    "example": "The electric blender comes with a two-year manufacturer replacement warranty.",
    "exampleThai": "เครื่องปั่นไฟฟ้ามาพร้อมเอกสารรับประกันคุณภาพเปลี่ยนเครื่องใหม่จากผู้ผลิตสองปี"
  },
  {
    "id": "v_a2_shop_24",
    "word": "fit",
    "pos": "v.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สวมใส่ได้พอดีตัว",
    "alternatives": [
      "คับแน่นเกินไป",
      "หลวมโพรก",
      "ขาดชำรุด"
    ],
    "example": "These tailored linen trousers fit comfortably around the waist and hips.",
    "exampleThai": "กางเกงผ้าลินินสั่งตัดตัวนี้สวมใส่ได้พอดีตัวอย่างสบายรอบเอวและสะโพก"
  },
  {
    "id": "v_a2_shop_25",
    "word": "try",
    "pos": "v.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ลองสวมใส่ดู",
    "alternatives": [
      "ซื้อทันที",
      "ตัดป้ายทิ้ง",
      "สั่งเย็บแก้"
    ],
    "example": "You should try on the leather boots in the fitting room before buying.",
    "exampleThai": "คุณควรลองสวมใส่ดูรองเท้าบูทหนังในห้องลองชุดก่อนตัดสินใจซื้อ"
  },
  {
    "id": "v_a2_shop_26",
    "word": "sale",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เทศกาลลดราคาสินค้า",
    "alternatives": [
      "การปรับราคาขึ้น",
      "การประมูลของเก่า",
      "การตรวจสต็อก"
    ],
    "example": "Shoppers eagerly await the mid-year mega shopping sale in downtown Bangkok.",
    "exampleThai": "นักช้อปตั้งตารอคอยเทศกาลลดราคาสินค้าครั้งใหญ่กลางปีในใจกลางกรุงเทพฯ"
  },
  {
    "id": "v_a2_shop_27",
    "word": "payback",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "การชำระหนี้คืน",
    "alternatives": [
      "การผิดนัดชำระ",
      "การขอยกเลิกหนี้",
      "การขอกู้เงินเพิ่ม"
    ],
    "example": "He scheduled prompt monthly paybacks to clear the student loan debt.",
    "exampleThai": "เขาจัดตารางการชำระหนี้คืนรายเดือนอย่างตรงเวลาเพื่อปลดหนี้กองทุนเงินให้กู้ยืมเพื่อการศึกษา"
  },
  {
    "id": "v_b1_shop_01",
    "word": "refund",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "การคืนเงินเต็มจำนวน",
    "alternatives": [
      "การหักค่าธรรมเนียม",
      "การให้บัตรของขวัญ",
      "การคิดดอกเบี้ย"
    ],
    "example": "The airline issued a full cash refund following the unexpected flight cancellation.",
    "exampleThai": "สายการบินได้ออกการคืนเงินเต็มจำนวนเป็นเงินสดหลังจากการยกเลิกเที่ยวบินที่ไม่คาดคิด"
  },
  {
    "id": "v_b1_shop_02",
    "word": "transaction",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "รายการธุรกรรมทางการเงิน",
    "alternatives": [
      "การโฆษณาสินค้า",
      "การสัมภาษณ์งาน",
      "การจัดส่งพัสดุ"
    ],
    "example": "Banking apps notify smartphone users immediately for every processed debit transaction.",
    "exampleThai": "แอปพลิเคชันธนาคารแจ้งเตือนผู้ใช้สมาร์ตโฟนทันทีสำหรับทุกรายการธุรกรรมทางการเงินตัดบัญชี"
  },
  {
    "id": "v_b1_shop_03",
    "word": "investment",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "การลงทุนเพื่อหวังผลกำไร",
    "alternatives": [
      "การพนันเสี่ยงโชค",
      "การใช้จ่ายสุรุ่ยสุร่าย",
      "การกักตุนเงินสด"
    ],
    "example": "Diversifying investments across mutual funds and gold mitigates economic portfolio volatility.",
    "exampleThai": "การกระจายการลงทุนเพื่อหวังผลกำไรในกองทุนรวมและทองคำช่วยลดความผันผวนของพอร์ตการเงิน"
  },
  {
    "id": "v_b1_shop_04",
    "word": "budget",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "งบประมาณ",
    "alternatives": [
      "ใบเสร็จค่าน้ำมัน",
      "ยอดหนี้สินบัตรเครดิต",
      "อัตราภาษีมูลค่าเพิ่ม"
    ],
    "example": "Setting a strict monthly personal budget keeps unexpected household expenses under control.",
    "exampleThai": "การตั้งแผนงบประมาณรายรับรายจ่ายส่วนตัวรายเดือนที่เข้มงวดช่วยควบคุมรายจ่ายในครัวเรือน"
  },
  {
    "id": "v_b1_shop_05",
    "word": "currency",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สกุลเงิน",
    "alternatives": [
      "ตั๋วจำนำ",
      "สลากกินแบ่งรัฐบาล",
      "หุ้นสามัญ"
    ],
    "example": "International traders constantly monitor foreign currency exchange rate fluctuations.",
    "exampleThai": "ผู้ค้าสินค้าระหว่างประเทศติดตามความผันผวนของอัตราแลกเปลี่ยนสกุลเงินตราแลกเปลี่ยนต่างประเทศตลอดเวลา"
  },
  {
    "id": "v_b1_shop_06",
    "word": "financial",
    "pos": "adj.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เกี่ยวกับด้านการเงินการธนาคาร",
    "alternatives": [
      "เกี่ยวกับกฎหมายอาญา",
      "เกี่ยวกับวิศวกรรมโยธา",
      "เกี่ยวกับการแพทย์"
    ],
    "example": "Seeking certified financial advisory guidance helps families plan securely for retirement.",
    "exampleThai": "การขอคำแนะนำเกี่ยวกับด้านการเงินการธนาคารจากผู้เชี่ยวชาญช่วยให้ครอบครัววางแผนการเกษียณได้อย่างมั่นคง"
  },
  {
    "id": "v_b1_shop_07",
    "word": "inflation",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ภาวะเงินเฟ้อ",
    "alternatives": [
      "ภาวะฟองสบู่แตก",
      "อัตราดอกเบี้ยคงที่",
      "ดุลการค้าเกินดุล"
    ],
    "example": "Persistent high inflation reduces the purchasing power of middle-class consumer wages.",
    "exampleThai": "ภาวะเงินเฟ้อข้าวของแพงที่ยืดเยื้อลดทอนอำนาจการซื้อของค่าจ้างแรงงานชนชั้นกลาง"
  },
  {
    "id": "v_b1_shop_08",
    "word": "purchase",
    "pos": "v.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "จัดซื้อจัดหาเป็นทางการ",
    "alternatives": [
      "เช่าใช้ชั่วคราว",
      "ประมูลทิ้ง",
      "ปฏิเสธสินค้า"
    ],
    "example": "The school board voted to purchase sixty new interactive smartboards for classrooms.",
    "exampleThai": "คณะกรรมการโรงเรียนลงมติจัดซื้อจัดหาเป็นทางการกระดานอัจฉริยะแบบโต้ตอบใหม่หกสิบเครื่อง"
  },
  {
    "id": "v_b1_shop_09",
    "word": "retail",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ธุรกิจการค้าปลีกหน้าร้าน",
    "alternatives": [
      "อุตสาหกรรมหนัก",
      "การเกษตรส่งออก",
      "การขนส่งทางเรือ"
    ],
    "example": "The traditional retail clothing sector faces fierce competition from cheap online storefronts.",
    "exampleThai": "ภาคธุรกิจการค้าปลีกหน้าร้านเสื้อผ้าแบบดั้งเดิมเผชิญการแข่งขันอันดุเดือดจากร้านค้าออนไลน์ราคาถูก"
  },
  {
    "id": "v_b1_shop_10",
    "word": "wholesale",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ธุรกิจการค้าส่งยกล็อต",
    "alternatives": [
      "การขายปลีกชิ้นเดียว",
      "การประมูลของสะสม",
      "การขายฝากจำนำ"
    ],
    "example": "Supermarket chains buy produce in bulk directly from farmers at wholesale rates.",
    "exampleThai": "เครือซูเปอร์มาร์เก็ตซื้อผลผลิตทางการเกษตรจำนวนมากจากชาวนาโดยตรงในราคาธุรกิจการค้าส่งยกล็อต"
  },
  {
    "id": "v_b1_shop_11",
    "word": "interest",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "อัตราดอกเบี้ยเงินกู้เงินฝาก",
    "alternatives": [
      "เงินต้นที่ยืม",
      "ค่าธรรมเนียมถอนเงิน",
      "ภาษีมูลค่าเพิ่ม"
    ],
    "example": "Central banks elevated the benchmark policy interest rate to tame rising living costs.",
    "exampleThai": "ธนาคารกลางปรับขึ้นอัตราดอกเบี้ยเงินกู้เงินฝากนโยบายอ้างอิงเพื่อชะลอค่าครองชีพที่สูงขึ้น"
  },
  {
    "id": "v_b1_shop_12",
    "word": "balance",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ยอดเงินคงเหลือในบัญชี",
    "alternatives": [
      "วงเงินที่กู้ได้",
      "ดอกเบี้ยค้างจ่าย",
      "ค่าธรรมเนียมรายปี"
    ],
    "example": "Log in to check your savings account balance before transferring large sums.",
    "exampleThai": "เข้าสู่ระบบเพื่อตรวจสอบยอดเงินคงเหลือในบัญชีเงินฝากออมทรัพย์ก่อนโอนเงินจำนวนมาก"
  },
  {
    "id": "v_b1_shop_13",
    "word": "economy",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ระบบเศรษฐกิจภาพรวม",
    "alternatives": [
      "การคลังส่วนบุคคล",
      "การเมืองการปกครอง",
      "การศึกษาพื้นฐาน"
    ],
    "example": "Tourism revenue is an indispensable pillar driving Thailand's national economy.",
    "exampleThai": "รายได้จากการท่องเที่ยวเป็นเสาหลักที่ขาดไม่ได้ในการขับเคลื่อนระบบเศรษฐกิจภาพรวมของไทย"
  },
  {
    "id": "v_b1_shop_14",
    "word": "consumer",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ผู้บริโภคในตลาด",
    "alternatives": [
      "ผู้ผลิตสินค้าในโรงงาน",
      "ผู้ค้าส่งสินค้ารายใหญ่",
      "ผู้ตรวจสอบบัญชี"
    ],
    "example": "Consumer watchdog agencies safeguard shoppers against deceptive marketing claims.",
    "exampleThai": "หน่วยงานพิทักษ์สิทธิผู้บริโภคในตลาดปกป้องผู้ซื้อจากการกล่าวอ้างทางการตลาดที่หลอกลวง"
  },
  {
    "id": "v_b1_shop_15",
    "word": "coupon",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "คูปองส่วนลดพิเศษ",
    "alternatives": [
      "ใบเสร็จรับเงิน",
      "ใบกำกับภาษี",
      "ใบแจ้งหนี้"
    ],
    "example": "Enter this promotional digital coupon code during checkout for ten percent off.",
    "exampleThai": "กรอกรหัสคูปองส่วนลดพิเศษดิจิทัลสำหรับโปรโมชันนี้ระหว่างชำระเงินเพื่อรับส่วนลดร้อยละสิบ"
  },
  {
    "id": "v_b1_shop_16",
    "word": "affordable",
    "pos": "adj.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ราคาสมเหตุสมผลจับต้องได้",
    "alternatives": [
      "ราคาแพงเกินเอื้อม",
      "หรูหราราคาเกินตัว",
      "สินค้ามีตำหนิ"
    ],
    "example": "The government launched housing initiatives to provide affordable apartments for young families.",
    "exampleThai": "รัฐบาลเปิดตัวโครงการที่อยู่อาศัยเพื่อจัดหาอพาร์ตเมนต์ที่ราคาสมเหตุสมผลจับต้องได้สำหรับครอบครัวคนรุ่นใหม่"
  },
  {
    "id": "v_b1_shop_17",
    "word": "bankrupt",
    "pos": "adj.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ล้มละลายทางการเงิน",
    "alternatives": [
      "ร่ำรวยมั่งคั่ง",
      "มีกำไรมหาศาล",
      "ขยายกิจการ"
    ],
    "example": "Mismanagement and crushing mounting debts drove the regional airline bankrupt.",
    "exampleThai": "การบริหารงานผิดพลาดและหนี้สินที่พอกพูนขับเคลื่อนให้สายการบินระดับภูมิภาคล้มละลายทางการเงิน"
  },
  {
    "id": "v_b1_shop_18",
    "word": "deposit",
    "pos": "v.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ฝากเงินเข้าบัญชี",
    "alternatives": [
      "ถอนเงินสดออก",
      "โอนเงินชำระหนี้",
      "ปิดบัญชี"
    ],
    "example": "He stops by the automated cash machine weekly to deposit his earnings into savings.",
    "exampleThai": "เขาแวะที่ตู้ฝากเงินสดอัตโนมัติทุกสัปดาห์เพื่อฝากเงินเข้าบัญชีรายได้ลงในบัญชีออมทรัพย์"
  },
  {
    "id": "v_b2_shop_01",
    "word": "lucrative",
    "pos": "adj.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ที่ทำกำไรงดงามเป็นกอบเป็นกำ",
    "alternatives": [
      "ที่ขาดทุนป่นปี้",
      "ที่ไม่คุ้มค่าเหนื่อย",
      "ที่เสมอทุนพอดี"
    ],
    "example": "Investing early in commercial cloud infrastructure proved to be an immensely lucrative venture.",
    "exampleThai": "การลงทุนตั้งแต่เนิ่นๆ ในโครงสร้างพื้นฐานคลาวด์เชิงพาณิชย์พิสูจน์แล้วว่าเป็นการลงทุนที่ทำกำไรงดงามเป็นกอบเป็นกำ"
  },
  {
    "id": "v_b2_shop_02",
    "word": "fiscal",
    "pos": "adj.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เกี่ยวกับนโยบายการคลังและภาษี",
    "alternatives": [
      "เกี่ยวกับนโยบายการศึกษา",
      "เกี่ยวกับการทูตต่างประเทศ",
      "เกี่ยวกับสาธารณสุข"
    ],
    "example": "The finance ministry introduced prudent fiscal measures to rein in ballooning public deficits.",
    "exampleThai": "กระทรวงการคลังได้นำมาตรการเกี่ยวกับนโยบายการคลังและภาษีที่รอบคอบมาใช้เพื่อควบคุมการขาดดุลงบประมาณ"
  },
  {
    "id": "v_b2_shop_03",
    "word": "expenditure",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "รายจ่ายงบประมาณทั้งหมด",
    "alternatives": [
      "รายรับจากภาษี",
      "เงินบริจาคช่วยเหลือน้ำท่วม",
      "เงินปันผลสุทธิ"
    ],
    "example": "Auditors scrutinized the company's capital expenditure on foreign manufacturing plants.",
    "exampleThai": "ผู้ตรวจสอบบัญชีตรวจสอบรายจ่ายงบประมาณทั้งหมดเพื่อการลงทุนของบริษัทในโรงงานผลิตในต่างประเทศอย่างละเอียด"
  },
  {
    "id": "v_b2_shop_allocate",
    "word": "allocate",
    "pos": "v.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "จัดสรรงบประมาณ",
    "alternatives": [
      "ยึดทรัพย์สินคืน",
      "ตัดงบประมาณทิ้ง",
      "ใช้จ่ายอย่างฟุ่มเฟือย"
    ],
    "example": "The board agreed to allocate more capital to scientific research and green energy development.",
    "exampleThai": "คณะกรรมการตกลงที่จะจัดสรรงบประมาณเงินทุนเพิ่มเติมให้แก่การวิจัยทางวิทยาศาสตร์และการพัฒนาพลังงานสะอาด"
  },
  {
    "id": "v_b2_shop_05",
    "word": "depreciation",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ค่าเสื่อมราคาของทรัพย์สินตามกาลเวลา",
    "alternatives": [
      "การเพิ่มมูลค่าทางตลาด",
      "กำไรจากการขายสินทรัพย์",
      "ดอกเบี้ยทบต้น"
    ],
    "example": "Vehicles suffer steep monetary depreciation during their first three years of commercial road operation.",
    "exampleThai": "ยานพาหนะประสบกับค่าเสื่อมราคาของทรัพย์สินตามกาลเวลาทางการเงินอย่างรวดเร็วในช่วงสามปีแรกของการใช้งานบนท้องถนน"
  },
  {
    "id": "v_b2_shop_06",
    "word": "mortgage",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สัญญาจำนองอสังหาริมทรัพย์",
    "alternatives": [
      "สัญญาเช่าระยะสั้น",
      "การซื้อขายเงินสด",
      "การประกันอัคคีภัย"
    ],
    "example": "The couple secured a thirty-year fixed-rate bank mortgage to finance their suburban home.",
    "exampleThai": "คู่สามีภรรยาได้รับอนุมัติสัญญาจำนองอสังหาริมทรัพย์จากธนาคารอัตราดอกเบี้ยคงที่สามสิบปีเพื่อซื้อบ้านชานเมือง"
  },
  {
    "id": "v_b2_shop_07",
    "word": "commodity",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สินค้าโภคภัณฑ์ขั้นปฐม",
    "alternatives": [
      "สินค้าแฟชั่นหรู",
      "บริการซอฟต์แวร์",
      "งานศิลปะโบราณ"
    ],
    "example": "Crude oil, copper, and wheat are vital raw commodities traded on international futures exchanges.",
    "exampleThai": "น้ำมันดิบ ทองแดง และข้าวสาลี เป็นสินค้าโภคภัณฑ์ขั้นปฐมดิบสำคัญที่ซื้อขายในตลาดซื้อขายล่วงหน้าระหว่างประเทศ"
  },
  {
    "id": "v_b2_shop_08",
    "word": "dividend",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เงินปันผล",
    "alternatives": [
      "เงินกู้ยืมระยะสั้น",
      "ภาษีมูลค่าเพิ่ม",
      "ค่างวดรายเดือน"
    ],
    "example": "The profitable telecommunications giant distributed a generous quarterly cash dividend to shareholders.",
    "exampleThai": "บริษัทยักษ์ใหญ่ด้านโทรคมนาคมที่มีกำไรได้จ่ายเงินปันผลตอบแทนผู้ถือหุ้นเป็นเงินสดประจำไตรมาสแก่ผู้ถือหุ้น"
  },
  {
    "id": "v_b2_shop_09",
    "word": "insolvency",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ภาวะมีหนี้สินล้นพ้นตัวไร้สภาพคล่อง",
    "alternatives": [
      "สภาพคล่องทางการเงินสูง",
      "ความมั่งคั่งมหาศาล",
      "การทำกำไรต่อเนื่อง"
    ],
    "example": "Severe supply chain disruptions pushed several small manufacturing subcontractors into sudden corporate insolvency.",
    "exampleThai": "การหยุดชะงักของห่วงโซ่อุปทานอย่างรุนแรงผลักดันให้ผู้รับเหมาช่วงการผลิตรายย่อยเข้าสู่ภาวะมีหนี้สินล้นพ้นตัวไร้สภาพคล่อง"
  },
  {
    "id": "v_b2_shop_10",
    "word": "monopoly",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "การผูกขาดตัดตอนทางการค้า",
    "alternatives": [
      "การแข่งขันเสรีสมบูรณ์",
      "ตลาดผู้ซื้อเป็นใหญ่",
      "สหกรณ์รวมใจ"
    ],
    "example": "Antitrust regulators sued the tech conglomerate to break its anti-competitive digital search monopoly.",
    "exampleThai": "หน่วยงานกำกับดูแลการผูกขาดฟ้องร้องกลุ่มบริษัทเทคโนโลยีเพื่อทลายการผูกขาดตัดตอนทางการค้าด้านการค้นหาดิจิทัล"
  },
  {
    "id": "v_b2_shop_11",
    "word": "audit",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "การตรวจสอบบัญชีอย่างเป็นทางการ",
    "alternatives": [
      "การคาดการณ์ยอดขาย",
      "การสัมภาษณ์งานใหม่",
      "การจัดเลี้ยงพนักงาน"
    ],
    "example": "An independent forensic financial audit exposed hidden off-balance-sheet corporate liabilities.",
    "exampleThai": "การตรวจสอบบัญชีอย่างเป็นทางการทางนิติวิทยาศาสตร์ที่เป็นอิสระได้เปิดโปงหนี้สินนอกงบดุลของบริษัทที่ถูกซุกซ่อนไว้"
  },
  {
    "id": "v_b2_shop_12",
    "word": "recession",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ภาวะเศรษฐกิจถดถอยซบเซา",
    "alternatives": [
      "การเติบโตทางเศรษฐกิจอย่างก้าวกระโดด",
      "ยุคทองของการค้า",
      "การลงทุนเฟื่องฟู"
    ],
    "example": "Rising interest rates and reduced consumer expenditure tipped the national economy into a mild recession.",
    "exampleThai": "อัตราดอกเบี้ยที่เพิ่มขึ้นและรายจ่ายผู้บริโภคที่ลดลงทำให้เศรษฐกิจของประเทศเข้าสู่ภาวะเศรษฐกิจถดถอยซบเซาเล็กน้อย"
  },
  {
    "id": "v_b2_shop_fluctuate",
    "word": "fluctuate",
    "pos": "v.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ผันผวนขึ้นลง",
    "alternatives": [
      "หยุดนิ่งคงที่",
      "รักษาระดับสม่ำเสมอ",
      "พุ่งสูงขึ้นไม่หยุด"
    ],
    "example": "Fuel prices continue to fluctuate wildly in response to shifting geopolitical conflicts.",
    "exampleThai": "ราคาเชื้อเพลิงยังคงผันผวนขึ้นลงอย่างมากเพื่อตอบสนองต่อความขัดแย้งทางภูมิรัฐศาสตร์ที่เปลี่ยนแปลงไป"
  },
  {
    "id": "v_b2_shop_14",
    "word": "collateral",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "หลักทรัพย์ค้ำประกันเงินกู้",
    "alternatives": [
      "หนังสือรับรองเงินเดือน",
      "ประวัติการทำงาน",
      "ลายมือชื่อพยาน"
    ],
    "example": "Commercial banks demand physical real estate deed deeds as secure collateral for multimillion-dollar corporate loans.",
    "exampleThai": "ธนาคารพาณิชย์ต้องการโฉนดอสังหาริมทรัพย์เป็นหลักทรัพย์ค้ำประกันเงินกู้ที่มั่นคงสำหรับเงินกู้ธุรกิจหลายล้านดอลลาร์"
  },
  {
    "id": "v_b2_shop_compensate",
    "word": "compensate",
    "pos": "v.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ชดเชยค่าเสียหาย",
    "alternatives": [
      "เรียกเก็บค่าปรับ",
      "ริบเงินมัดจำ",
      "ปฏิเสธความรับผิดชอบ"
    ],
    "example": "The airline offered cash vouchers to compensate passengers for the extended flight delay.",
    "exampleThai": "สายการบินเสนอบัตรกำนัลเงินสดเพื่อชดเชยค่าเสียหายให้แก่ผู้โดยสารสำหรับเที่ยวบินที่ล่าช้าเป็นเวลานาน"
  },
  {
    "id": "v_b2_shop_16",
    "word": "acquisition",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "การเข้าซื้อและครอบงำกิจการ",
    "alternatives": [
      "การขายทรัพย์สินทอดตลาด",
      "การปิดสาขาย่อย",
      "การเลิกจ้างพนักงาน"
    ],
    "example": "The telecommunications giant completed the multi-billion-dollar strategic acquisition of its chief competitor.",
    "exampleThai": "บริษัทยักษ์ใหญ่ด้านโทรคมนาคมเสร็จสิ้นการเข้าซื้อและครอบงำกิจการเชิงกลยุทธ์มูลค่าหลายพันล้านดอลลาร์ของคู่แข่งรายสำคัญ"
  },
  {
    "id": "v_b2_shop_diminish",
    "word": "diminish",
    "pos": "v.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ลดน้อยถอยลง",
    "alternatives": [
      "เพิ่มพูนมหาศาล",
      "ขยายตัวอย่างรวดเร็ว",
      "คงที่มั่นคง"
    ],
    "example": "High inflation rates can rapidly diminish the real purchasing power of household savings.",
    "exampleThai": "อัตราเงินเฟ้อที่สูงสามารถทำให้กำลังซื้อที่แท้จริงของเงินออมในครัวเรือนลดน้อยถอยลงอย่างรวดเร็ว"
  },
  {
    "id": "v_a1_feel_01",
    "word": "happy",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีความสุข",
    "alternatives": [
      "เศร้าใจ",
      "โกรธเคือง",
      "เหน็ดเหนื่อย"
    ],
    "example": "The smiling children looked extraordinarily happy playing on the swing.",
    "exampleThai": "เด็กๆ ที่ยิ้มแย้มดูมีความสุขอย่างยิ่งขณะเล่นบนชิงช้า"
  },
  {
    "id": "v_a1_feel_02",
    "word": "sad",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เศร้าโศกเสียใจ",
    "alternatives": [
      "ร่าเริงเบิกบาน",
      "ตื่นเต้นดีใจ",
      "ภาคภูมิใจ"
    ],
    "example": "She felt deeply sad when her beloved childhood pet passed away.",
    "exampleThai": "เธอรู้สึกเศร้าโศกเสียใจอย่างสุดซึ้งเมื่อสัตว์เลี้ยงแสนรักในวัยเด็กจากไป"
  },
  {
    "id": "v_a1_feel_03",
    "word": "angry",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "โกรธเคืองโมโห",
    "alternatives": [
      "ใจเย็นสงบ",
      "ยิ้มแย้มแจ่มใส",
      "รู้สึกผ่อนคลาย"
    ],
    "example": "His face turned red because he was extremely angry at the unfair referee call.",
    "exampleThai": "หน้าของเขาแดงก่ำเพราะเขาโกรธเคืองโมโหอย่างยิ่งกับคำตัดสินที่ไม่เป็นธรรมของกรรมการ"
  },
  {
    "id": "v_a1_feel_04",
    "word": "tired",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เหน็ดเหนื่อยอ่อนล้า",
    "alternatives": [
      "กระปรี้กระเปร่า",
      "มีพลังล้นเหลือ",
      "ตื่นตัวเต็มที่"
    ],
    "example": "After walking five kilometers in the tropical heat, we felt thoroughly tired.",
    "exampleThai": "หลังจากเดินห้ากิโลเมตรท่ามกลางแดดร้อนเมืองร้อน พวกเรารู้สึกเหน็ดเหนื่อยอ่อนล้าอย่างมาก"
  },
  {
    "id": "v_a1_feel_05",
    "word": "good",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ดีงามน่าชื่นชม",
    "alternatives": [
      "เลวร้าย",
      "น่าผิดหวัง",
      "เสียหาย"
    ],
    "example": "He did a remarkably good deed by helping the elderly woman across the avenue.",
    "exampleThai": "เขาทำความดีที่น่าชื่นชมอย่างยิ่งด้วยการช่วยหญิงชราข้ามถนนใหญ่"
  },
  {
    "id": "v_a1_feel_06",
    "word": "bad",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "แย่ไม่ดี",
    "alternatives": [
      "ยอดเยี่ยม",
      "น่าประทับใจ",
      "งดงาม"
    ],
    "example": "Waking up with a splitting migraine headache is a very bad start to any day.",
    "exampleThai": "การตื่นนอนขึ้นมาพร้อมกับอาการปวดหัวไมเกรนจี๊ดๆ เป็นการเริ่มต้นวันที่แย่ไม่ดีอย่างยิ่ง"
  },
  {
    "id": "v_a1_feel_07",
    "word": "nice",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "จิตใจดีมีมิตรไมตรี",
    "alternatives": [
      "หยาบคายก้าวร้าว",
      "เห็นแก่ตัว",
      "แล้งน้ำใจ"
    ],
    "example": "Our new neighbors are exceptionally nice and brought warm freshly baked cookies.",
    "exampleThai": "เพื่อนบ้านใหม่ของเราเป็นคนจิตใจดีมีมิตรไมตรีเป็นพิเศษและนำคุกกี้อบอุ่นๆ มาฝาก"
  },
  {
    "id": "v_a1_feel_08",
    "word": "kind",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีเมตตาโอบอ้อมอารี",
    "alternatives": [
      "ใจร้ายใจแคบ",
      "โหดเหี้ยมทารุณ",
      "ตระหนี่ขี้เหนียว"
    ],
    "example": "The kind elderly nurse spoke softly to ease the frightened young patient.",
    "exampleThai": "พยาบาลสูงวัยผู้มีเมตตาโอบอ้อมอารีพูดจานุ่มนวลเพื่อปลอบโยนผู้ป่วยตัวน้อยที่หวาดกลัว"
  },
  {
    "id": "v_a1_feel_09",
    "word": "smile",
    "pos": "v.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ยิ้มแย้มแจ่มใส",
    "alternatives": [
      "ขมวดคิ้วบึ้งตึง",
      "ร้องไห้คร่ำครวญ",
      "ตะโกนด่าทอ"
    ],
    "example": "A genuine warm smile can instantly brighten someone's difficult day.",
    "exampleThai": "รอยยิ้มที่ยิ้มแย้มแจ่มใสอย่างจริงใจและอบอุ่นสามารถทำให้วันอันยากลำบากของใครบางคนสว่างสดใสขึ้นได้ทันที"
  },
  {
    "id": "v_a1_feel_10",
    "word": "laugh",
    "pos": "v.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "หัวเราะร่าเริง",
    "alternatives": [
      "ส่งเสียงร้องไห้",
      "ถอนหายใจยาว",
      "นิ่งเงียบขรึม"
    ],
    "example": "The audience could not help but laugh loudly at the clown's silly antics.",
    "exampleThai": "ผู้ชมอดไม่ได้ที่จะหัวเราะร่าเริงเสียงดังกับท่าทางตลกขบขันของตัวตลก"
  },
  {
    "id": "v_a1_feel_11",
    "word": "cry",
    "pos": "v.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ร้องไห้น้ำตาซึม",
    "alternatives": [
      "ยิ้มกว้าง",
      "หัวเราะลั่น",
      "โห่ร้องยินดี"
    ],
    "example": "The touching ending of the poignant family drama made everyone cry.",
    "exampleThai": "ตอนจบอันซาบซึ้งของละครครอบครัวสะเทือนอารมณ์ทำให้ทุกคนร้องไห้น้ำตาซึม"
  },
  {
    "id": "v_a1_feel_12",
    "word": "scared",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "หวาดกลัวตกใจ",
    "alternatives": [
      "กล้าหาญเด็ดเดี่ยว",
      "มั่นใจเต็มเปี่ยม",
      "สงบนิ่งผ่อนคลาย"
    ],
    "example": "The puppy was scared of the loud booming thunderclaps during the storm.",
    "exampleThai": "ลูกสุนัขรู้สึกหวาดกลัวตกใจเสียงฟ้าร้องคำรามกึกก้องช่วงพายุ"
  },
  {
    "id": "v_a1_feel_13",
    "word": "funny",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ตลกขบขัน",
    "alternatives": [
      "เคร่งเครียดซีเรียส",
      "น่ากลัวสยดสยอง",
      "น่าเศร้าสลด"
    ],
    "example": "He told a delightfully funny joke that made the whole dinner table giggle.",
    "exampleThai": "เขาเล่าเรื่องตลกขบขันอันน่ารื่นรมย์ที่ทำให้ทั้งโต๊ะอาหารหัวเราะคิกคัก"
  },
  {
    "id": "v_a1_feel_14",
    "word": "shy",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ขี้อายประหม่า",
    "alternatives": [
      "กล้าแสดงออก",
      "พูดจาฉะฉาน",
      "ทะเยอทะยาน"
    ],
    "example": "The shy primary school pupil hid behind his mother when meeting strangers.",
    "exampleThai": "นักเรียนชั้นประถมผู้ขี้อายประหม่าแอบอยู่ข้างหลังคุณแม่เมื่อต้องพบปะคนแปลกหน้า"
  },
  {
    "id": "v_a1_feel_15",
    "word": "brave",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "กล้าหาญชาญชัย",
    "alternatives": [
      "ขี้ขลาดตาขาว",
      "ตื่นตระหนกง่าย",
      "ลังเลไม่แน่ใจ"
    ],
    "example": "The brave young firefighter dashed into the smoke-filled building to rescue a kitten.",
    "exampleThai": "นักดับเพลิงหนุ่มผู้กล้าหาญชาญชัยพุ่งเข้าไปในอาคารที่เต็มไปด้วยควันเพื่อช่วยลูกแมว"
  },
  {
    "id": "v_a1_feel_16",
    "word": "quiet",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เงียบสงบสำรวม",
    "alternatives": [
      "เอะอะโวยวาย",
      "พูดจาเจื้อยแจ้ว",
      "ส่งเสียงดัง"
    ],
    "example": "She is a quiet observant student who excels at in-depth scientific research.",
    "exampleThai": "เธอเป็นนักเรียนที่เงียบสงบสำรวมและช่างสังเกตซึ่งเก่งกาจด้านงานวิจัยทางวิทยาศาสตร์เชิงลึก"
  },
  {
    "id": "v_a1_feel_17",
    "word": "loud",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ส่งเสียงดังอึกทึก",
    "alternatives": [
      "เงียบกริบ",
      "กระซิบแผ่วเบา",
      "สุขุมเรียบร้อย"
    ],
    "example": "Do not use loud amplified microphones inside designated quiet hospital zones.",
    "exampleThai": "อย่าใช้ไมโครโฟนขยายเสียงที่ส่งเสียงดังอึกทึกภายในเขตพื้นที่เงียบสงบของโรงพยาบาล"
  },
  {
    "id": "v_a1_feel_18",
    "word": "calm",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ใจเย็นสุขุมนิ่ง",
    "alternatives": [
      "ตื่นตระหนกวุ่นวาย",
      "ฉุนเฉียวเกรี้ยวกราด",
      "กระวนกระวาย"
    ],
    "example": "Take five deep breaths to keep yourself calm during intense oral presentations.",
    "exampleThai": "สูดหายใจเข้าลึกๆ ห้าครั้งเพื่อให้ตัวคุณใจเย็นสุขุมนิ่งระหว่างการนำเสนอผลงานด้วยวาจา"
  },
  {
    "id": "v_a1_feel_19",
    "word": "sweet",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "อ่อนหวานน่ารัก",
    "alternatives": [
      "ดุร้ายฉุนเฉียว",
      "เย็นชาไร้ความรู้สึก",
      "ก้าวร้าว"
    ],
    "example": "The little girl gave a sweet thoughtful card to her beloved grandmother.",
    "exampleThai": "เด็กหญิงตัวน้อยมอบการ์ดที่อ่อนหวานน่ารักและเต็มไปด้วยความใส่ใจให้แก่คุณย่าแสนรัก"
  },
  {
    "id": "v_a1_feel_20",
    "word": "cute",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "น่ารักน่าเอ็นดู",
    "alternatives": [
      "น่าเกลียดน่ากลัว",
      "ดุร้าย",
      "ไม่น่ามอง"
    ],
    "example": "The fluffy sleeping puppy looked undeniably cute resting on the soft pillow.",
    "exampleThai": "ลูกสุนัขขนปุยที่กำลังหลับดูน่ารักน่าเอ็นดูอย่างยิ่งขณะนอนหนุนหมอนนุ่ม"
  },
  {
    "id": "v_a1_feel_21",
    "word": "love",
    "pos": "v.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "รักใคร่ผูกพัน",
    "alternatives": [
      "เกลียดชัง",
      "รังเกียจ",
      "เพิกเฉย"
    ],
    "example": "Parents love and nurture their children through every triumph and hardship.",
    "exampleThai": "พ่อแม่รักใคร่ผูกพันและเลี้ยงดูเอาใจใส่ลูกๆ ผ่านทุกชัยชนะและความยากลำบาก"
  },
  {
    "id": "v_a1_feel_22",
    "word": "like",
    "pos": "v.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ชื่นชอบพึงพอใจ",
    "alternatives": [
      "เกลียดขี้หน้า",
      "ไม่สบอารมณ์",
      "ต่อต้าน"
    ],
    "example": "I truly like spending quiet weekend mornings reading books by the pond.",
    "exampleThai": "ฉันชื่นชอบพึงพอใจการใช้เวลาเช้าสุดสัปดาห์อันเงียบสงบอ่านหนังสือริมสระน้ำอย่างแท้จริง"
  },
  {
    "id": "v_a1_feel_23",
    "word": "hate",
    "pos": "v.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เกลียดชังรังเกียจ",
    "alternatives": [
      "รักใคร่เสน่หา",
      "ชื่นชมยินดี",
      "ให้อภัย"
    ],
    "example": "I deeply hate dishonesty and deceit in personal friendships.",
    "exampleThai": "ฉันเกลียดชังรังเกียจความไม่ซื่อสัตย์และการหลอกลวงในมิตรภาพส่วนตัวอย่างลึกซึ้ง"
  },
  {
    "id": "v_a1_feel_24",
    "word": "sorry",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "รู้สึกเสียใจขอโทษ",
    "alternatives": [
      "สะใจเยาะเย้ย",
      "ไม่แยแส",
      "ภาคภูมิใจ"
    ],
    "example": "I am truly sorry for accidentally spilling water over your textbook.",
    "exampleThai": "ฉันรู้สึกเสียใจขอโทษจริงๆ ที่เผลอทำน้ำหกลงบนหนังสือเรียนของคุณโดยไม่ตั้งใจ"
  },
  {
    "id": "v_a1_feel_25",
    "word": "hope",
    "pos": "v.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีความหวังตั้งใจ",
    "alternatives": [
      "สิ้นหวังท้อแท้",
      "ยอมแพ้ถอดใจ",
      "หวาดหวั่นพรั่นพรึง"
    ],
    "example": "We hope that fair sunny skies will bless our annual school sports day.",
    "exampleThai": "พวกเรามีความหวังตั้งใจว่าท้องฟ้าแจ่มใสแดดดีจะเป็นใจแก่งานกีฬาสีประจำปีของเรา"
  },
  {
    "id": "v_a1_feel_26",
    "word": "feel",
    "pos": "v.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "รู้สึกถึงอารมณ์",
    "alternatives": [
      "ไร้ความรู้สึก",
      "ชาด้าน",
      "ไม่แยแส"
    ],
    "example": "Do you feel rested and rejuvenated after the refreshing weekend vacation?",
    "exampleThai": "คุณรู้สึกถึงอารมณ์ที่ได้พักผ่อนและสดชื่นขึ้นไหมหลังจากวันหยุดสุดสัปดาห์อันน่ารื่นรมย์"
  },
  {
    "id": "v_a1_feel_27",
    "word": "proud",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ภาคภูมิใจในตนเอง",
    "alternatives": [
      "ละอายใจ",
      "รู้สึกผิด",
      "น้อยเนื้อต่ำใจ"
    ],
    "example": "Her parents felt immensely proud when she received her academic gold medal.",
    "exampleThai": "พ่อแม่ของเธอรู้สึกภาคภูมิใจในตนเองอย่างยิ่งเมื่อเธอได้รับเหรียญทองเกียรตินิยมทางการเรียน"
  },
  {
    "id": "v_a1_feel_28",
    "word": "worry",
    "pos": "v.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "วิตกกังวลใจ",
    "alternatives": [
      "วางใจสบาย",
      "เฉยชา",
      "เบิกบานสำราญ"
    ],
    "example": "Do not worry excessively about small setbacks because mistakes help you grow.",
    "exampleThai": "อย่าวิตกกังวลใจกับอุปสรรคเล็กๆ น้อยๆ มากเกินไปเพราะความผิดพลาดช่วยให้คุณเติบโต"
  },
  {
    "id": "v_a1_feel_29",
    "word": "glad",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ยินดีปรีดา",
    "alternatives": [
      "เสียใจขื่นขม",
      "อึดอัดใจ",
      "เคียดแค้น"
    ],
    "example": "I am so glad that all our classmates passed the final English examination.",
    "exampleThai": "ฉันรู้สึกยินดีปรีดามากที่เพื่อนร่วมชั้นทุกคนสอบผ่านการสอบไล่วิชาภาษาอังกฤษ"
  },
  {
    "id": "v_a1_feel_30",
    "word": "smart",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เฉลียวฉลาดปราดเปรื่อง",
    "alternatives": [
      "โง่เขลาเบาปัญญา",
      "เชื่องช้า",
      "ไร้ไหวพริบ"
    ],
    "example": "The smart young girl solved the complex math puzzle in just two minutes.",
    "exampleThai": "เด็กหญิงผู้เฉลียวฉลาดปราดเปรื่องแก้โจทย์คณิตศาสตร์ที่ซับซ้อนได้ในเวลาเพียงสองนาที"
  },
  {
    "id": "v_a2_feel_01",
    "word": "excited",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ตื่นเต้นดีใจ",
    "alternatives": [
      "เบื่อหน่ายซึมเซา",
      "สงบนิ่งเฉยชา",
      "เศร้าหมอง"
    ],
    "example": "The pupils were excited about the upcoming camping excursion to the national park.",
    "exampleThai": "เหล่านักเรียนรู้สึกตื่นเต้นดีใจกับการไปทัศนศึกษาตั้งแคมป์ที่อุทยานแห่งชาติที่กำลังจะมาถึง"
  },
  {
    "id": "v_a2_feel_02",
    "word": "nervous",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ประหม่ากังวลใจ",
    "alternatives": [
      "มั่นใจไร้กังวล",
      "ผ่อนคลายสบายใจ",
      "กล้าหาญ"
    ],
    "example": "Singers often feel a little nervous right before stepping out onto the brightly lit stage.",
    "exampleThai": "นักร้องมักรู้สึกประหม่ากังวลใจเล็กน้อยก่อนที่จะก้าวออกไปสู่เวทีที่สว่างจ้า"
  },
  {
    "id": "v_a2_feel_03",
    "word": "bored",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "รู้สึกเบื่อหน่าย",
    "alternatives": [
      "ตื่นเต้นสนุกสนาน",
      "กระตือรือร้น",
      "เพลิดเพลิน"
    ],
    "example": "The prolonged three-hour meeting left participants feeling exhausted and bored.",
    "exampleThai": "การประชุมยาวนานถึงสามชั่วโมงทำให้ผู้เข้าร่วมรู้สึกเหนื่อยล้าและรู้สึกเบื่อหน่าย"
  },
  {
    "id": "v_a2_feel_04",
    "word": "lonely",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "รู้สึกโดดเดี่ยวอ้างว้าง",
    "alternatives": [
      "อบอุ่นมีเพื่อนล้อมรอบ",
      "รื่นเริงหรรษา",
      "สุขสบายใจ"
    ],
    "example": "Moving across the country to a strange new city can make anyone feel lonely at first.",
    "exampleThai": "การย้ายข้ามประเทศไปยังเมืองใหม่ที่ไม่คุ้นเคยอาจทำให้ทุกคนรู้สึกโดดเดี่ยวอ้างว้างในช่วงแรก"
  },
  {
    "id": "v_a2_feel_05",
    "word": "jealous",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "รู้สึกอิจฉาริษยา",
    "alternatives": [
      "ร่วมยินดีด้วยใจจริง",
      "ชื่นชมยกย่อง",
      "มีเมตตากรุณา"
    ],
    "example": "Try not to be jealous of other people's achievements; focus instead on your own progress.",
    "exampleThai": "พยายามอย่ารู้สึกอิจฉาริษยาความสำเร็จของผู้อื่น แต่จงมุ่งเน้นไปที่ความก้าวหน้าของตนเองแทน"
  },
  {
    "id": "v_a2_feel_06",
    "word": "upset",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "อารมณ์เสียหงุดหงิด",
    "alternatives": [
      "อารมณ์ดีเบิกบาน",
      "สบายอกสบายใจ",
      "สงบเย็น"
    ],
    "example": "He was visibly upset after discovering that his bicycle tire had been punctured.",
    "exampleThai": "เขาแสดงอาการอารมณ์เสียหงุดหงิดอย่างเห็นได้ชัดหลังจากพบว่ายางรถจักรยานถูกเจาะรั่ว"
  },
  {
    "id": "v_a2_feel_07",
    "word": "patient",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีความอดทนอดกลั้น",
    "alternatives": [
      "ใจร้อนวู่วาม",
      "หงุดหงิดง่าย",
      "ฉุนเฉียว"
    ],
    "example": "Teaching lively kindergarten children requires a remarkably patient and warm demeanor.",
    "exampleThai": "การสอนเด็กอนุบาลที่กระตือรือร้นต้องอาศัยท่าทีที่มีความอดทนอดกลั้นและอบอุ่นเป็นอย่างยิ่ง"
  },
  {
    "id": "v_a2_feel_08",
    "word": "generous",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ใจกว้างเอื้อเฟื้อเผื่อแผ่",
    "alternatives": [
      "ตระหนี่ถี่เหนียว",
      "เห็นแก่ตัว",
      "แล้งน้ำใจ"
    ],
    "example": "The generous philanthropist donated five million baht to build a rural medical clinic.",
    "exampleThai": "ผู้ใจบุญที่ใจกว้างเอื้อเฟื้อเผื่อแผ่บริจาคเงินห้าล้านบาทเพื่อสร้างคลินิกการแพทย์ในชนบท"
  },
  {
    "id": "v_a2_feel_09",
    "word": "honest",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ซื่อสัตย์สุจริต",
    "alternatives": [
      "คดโกงหลอกลวง",
      "ปลิ้นปล้อน",
      "ไม่น่าไว้วางใจ"
    ],
    "example": "An honest taxi driver returned a lost leather purse containing significant cash.",
    "exampleThai": "คนขับแท็กซี่ผู้ซื่อสัตย์สุจริตได้นำกระเป๋าสตางค์หนังที่บรรจุเงินสดจำนวนมากส่งคืนเจ้าของ"
  },
  {
    "id": "v_a2_feel_10",
    "word": "polite",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "สุภาพอ่อนน้อมมีมารยาท",
    "alternatives": [
      "หยาบคายก้าวร้าว",
      "ไร้มารยาท",
      "กวนประสาท"
    ],
    "example": "Always use polite formal phrasing when addressing international business counterparts.",
    "exampleThai": "ใช้ถ้อยคำที่สุภาพอ่อนน้อมมีมารยาทอย่างเป็นทางการเสมอเมื่อติดต่อกับคู่ค้าทางธุรกิจระหว่างประเทศ"
  },
  {
    "id": "v_a2_feel_11",
    "word": "rude",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "หยาบคายไร้มารยาท",
    "alternatives": [
      "สุภาพเรียบร้อย",
      "มีสัมมาคารวะ",
      "อ่อนหวาน"
    ],
    "example": "Interrupting someone while they are speaking mid-sentence is considered quite rude.",
    "exampleThai": "การพูดแทรกขณะที่คนอื่นกำลังพูดอยู่กลางประโยคถือเป็นการกระทำที่หยาบคายไร้มารยาทมาก"
  },
  {
    "id": "v_a2_feel_12",
    "word": "lazy",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เกียจคร้านเฉื่อยชา",
    "alternatives": [
      "ขยันขันแข็ง",
      "กระฉับกระเฉง",
      "มีความมุมานะ"
    ],
    "example": "Do not let yourself become lazy during holidays; keep reading and learning every day.",
    "exampleThai": "อย่าปล่อยให้ตนเองกลายเป็นคนเกียจคร้านเฉื่อยชาช่วงปิดเทอม จงอ่านและเรียนรู้ต่อไปในทุกวัน"
  },
  {
    "id": "v_a2_feel_13",
    "word": "confident",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีความมั่นใจในตนเอง",
    "alternatives": [
      "ประหม่าขลาดกลัว",
      "ลังเลไม่แน่ใจ",
      "รู้สึกด้อยกว่า"
    ],
    "example": "Practicing your public speech several times helps you sound steady and confident.",
    "exampleThai": "การฝึกซ้อมการพูดในที่สาธารณะหลายๆ ครั้งช่วยให้คุณพูดได้อย่างมั่นคงและมีความมั่นใจในตนเอง"
  },
  {
    "id": "v_a2_feel_14",
    "word": "curious",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "อยากรู้อยากเห็นใฝ่รู้",
    "alternatives": [
      "เฉยเมยไม่สนใจ",
      "ไม่แยแสสิ่งใด",
      "เบื่อหน่ายการเรียน"
    ],
    "example": "Young inquisitive children are naturally curious about stars, animals, and machines.",
    "exampleThai": "เด็กๆ ที่ช่างซักถามมักมีความอยากรู้อยากเห็นใฝ่รู้ตามธรรมชาติเกี่ยวกับดวงดาว สัตว์ และเครื่องจักร"
  },
  {
    "id": "v_a2_feel_15",
    "word": "disappointed",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ผิดหวังไม่ได้ดังใจ",
    "alternatives": [
      "สมหวังดั่งใจ",
      "ปลาบปลื้มใจ",
      "พึงพอใจยิ่ง"
    ],
    "example": "The football fans were deeply disappointed by the team's lackluster second-half showing.",
    "exampleThai": "แฟนบอลรู้สึกผิดหวังไม่ได้ดังใจอย่างสุดซึ้งกับฟอร์มการเล่นที่ไร้ชีวิตชีวาของทีมในครึ่งหลัง"
  },
  {
    "id": "v_a2_feel_16",
    "word": "cheerful",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ร่าเริงแจ่มใสเบิกบาน",
    "alternatives": [
      "เศร้าหมองซึมเซา",
      "บูดบึ้ง",
      "หดหู่ใจ"
    ],
    "example": "Her cheerful disposition brought a refreshing breath of optimism to the whole office.",
    "exampleThai": "อุปนิสัยที่ร่าเริงแจ่มใสเบิกบานของเธอนำสายลมแห่งการมองโลกในแง่ดีอันสดชื่นมาสู่ออฟฟิศทั้งหมด"
  },
  {
    "id": "v_a2_feel_17",
    "word": "selfish",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เห็นแก่ตัวเอาแต่ได้",
    "alternatives": [
      "เสียสละเพื่อส่วนรวม",
      "มีน้ำใจโอบอ้อม",
      "คิดถึงผู้อื่น"
    ],
    "example": "Refusing to share team credit with hardworking colleagues is petty and selfish.",
    "exampleThai": "การปฏิเสธที่จะแบ่งปันผลงานทีมกับเพื่อนร่วมงานที่ทุ่มเทถือเป็นการกระทำที่ใจแคบและเห็นแก่ตัวเอาแต่ได้"
  },
  {
    "id": "v_a2_feel_18",
    "word": "energetic",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "กระปรี้กระเปร่าเปี่ยมพลัง",
    "alternatives": [
      "เหนื่อยล้าหมดแรง",
      "เฉื่อยชาไร้เรี่ยวแรง",
      "ง่วงซึม"
    ],
    "example": "The energetic aerobics instructor motivated everyone to keep jumping with enthusiasm.",
    "exampleThai": "ครูสอนเต้นแอโรบิกผู้กระปรี้กระเปร่าเปี่ยมพลังกระตุ้นให้ทุกคนกระโดดต่อไปด้วยความกระตือรือร้น"
  },
  {
    "id": "v_a2_feel_19",
    "word": "emotional",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "อ่อนไหวง่ายทางอารมณ์",
    "alternatives": [
      "นิ่งเฉยไร้อารมณ์",
      "มีเหตุผลเข้มแข็ง",
      "เย็นชาเด็ดเดี่ยว"
    ],
    "example": "Graduation ceremonies are always deeply emotional occasions for students and proud parents.",
    "exampleThai": "พิธีจบการศึกษามักเป็นโอกาสที่อ่อนไหวง่ายทางอารมณ์และซาบซึ้งสำหรับนักเรียนและผู้ปกครองเสมอ"
  },
  {
    "id": "v_a2_feel_20",
    "word": "mood",
    "pos": "n.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "อารมณ์ความรู้สึกชั่วขณะ",
    "alternatives": [
      "ความเฉลียวฉลาด",
      "สุขภาพกาย",
      "ฐานะการเงิน"
    ],
    "example": "Listening to lively bossa nova music instantly put him in a splendid morning mood.",
    "exampleThai": "การฟังเพลงบอสซาโนวาอันมีชีวิตชีวาช่วยทำให้อารมณ์ความรู้สึกชั่วขณะยามเช้าของเขาเบิกบานขึ้นทันที"
  },
  {
    "id": "v_a2_feel_21",
    "word": "relief",
    "pos": "n.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ความโล่งอกสบายใจ",
    "alternatives": [
      "ความวิตกกังวลเพิ่มขึ้น",
      "ความหวาดผวา",
      "ความตึงเครียด"
    ],
    "example": "Hearing that the biopsy results came back completely clear was an immense relief.",
    "exampleThai": "การได้ยินว่าผลการตรวจชิ้นเนื้อปกติปลอดภัยทุกประการนำมาซึ่งความโล่งอกสบายใจอันมหาศาล"
  },
  {
    "id": "v_a2_feel_22",
    "word": "fear",
    "pos": "n.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ความหวาดหวั่นกลัวเกรง",
    "alternatives": [
      "ความกล้าหาญเด็ดเดี่ยว",
      "ความผ่อนคลาย",
      "ความมั่นใจ"
    ],
    "example": "Overcoming your fear of public speaking takes steady guided practice and patience.",
    "exampleThai": "การเอาชนะความหวาดหวั่นกลัวเกรงการพูดต่อหน้าชุมชนต้องอาศัยการฝึกฝนและเวลาอย่างต่อเนื่อง"
  },
  {
    "id": "v_a2_feel_23",
    "word": "regret",
    "pos": "n.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ความเสียดายเสียใจภายหลัง",
    "alternatives": [
      "ความภาคภูมิใจ",
      "ความพึงพอใจสูงสุด",
      "ความยินดี"
    ],
    "example": "He expressed sincere regret for arriving late and delaying the important client presentation.",
    "exampleThai": "เขาแสดงความเสียดายเสียใจภายหลังอย่างจริงใจที่มาสายและทำให้การนำเสนองานกับลูกค้าล่าช้า"
  },
  {
    "id": "v_a2_feel_24",
    "word": "attitude",
    "pos": "n.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ทัศนคติมุมมองความคิด",
    "alternatives": [
      "สรีระร่างกาย",
      "เครื่องแต่งกาย",
      "สำเนียงการพูด"
    ],
    "example": "A proactive can-do attitude helps young professionals overcome daunting career hurdles.",
    "exampleThai": "ทัศนคติมุมมองความคิดเชิงบวกที่พร้อมลงมือทำช่วยให้คนทำงานรุ่นใหม่ก้าวข้ามอุปสรรคในอาชีพได้"
  },
  {
    "id": "v_a2_feel_25",
    "word": "habit",
    "pos": "n.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "อุปนิสัยความเคยชิน",
    "alternatives": [
      "เหตุบังเอิญ",
      "ความผิดพลาดชั่วคราว",
      "การตัดสินใจครั้งเดียว"
    ],
    "example": "Reading twenty pages of an English book every night is a wonderful lifelong habit.",
    "exampleThai": "การอ่านหนังสือภาษาอังกฤษยี่สิบหน้าทุกคืนเป็นอุปนิสัยความเคยชินตลอดชีวิตที่ยอดเยี่ยม"
  },
  {
    "id": "v_a2_feel_26",
    "word": "bravery",
    "pos": "n.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ความกล้าหาญเด็ดเดี่ยว",
    "alternatives": [
      "ความขลาดกลัว",
      "ความลังเลสงสัย",
      "ความหวาดระแวง"
    ],
    "example": "The lifeguard was honored by the mayor for exceptional bravery during the beach rescue.",
    "exampleThai": "เจ้าหน้าที่กู้ภัยทางน้ำได้รับเกียรติจากนายกเทศมนตรีสำหรับความกล้าหาญเด็ดเดี่ยวในการช่วยชีวิต"
  },
  {
    "id": "v_a2_feel_27",
    "word": "charming",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีเสน่ห์น่าหลงใหล",
    "alternatives": [
      "น่ารังเกียจ",
      "กระด้างกระเดื่อง",
      "น่าเบื่อหน่าย"
    ],
    "example": "The guest speaker entertained the conference audience with his witty and charming personality.",
    "exampleThai": "วิทยากรรับเชิญสร้างความเพลิดเพลินแก่ผู้ฟังในการประชุมด้วยบุคลิกที่เฉลียวฉลาดและมีเสน่ห์น่าหลงใหล"
  },
  {
    "id": "v_b1_feel_01",
    "word": "anxious",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "วิตกกังวลใจไม่สงบ",
    "alternatives": [
      "สงบเยือกเย็น",
      "มั่นใจไร้หวั่น",
      "ผ่อนคลายสบาย"
    ],
    "example": "High school seniors often feel anxious while waiting for university entrance exam results.",
    "exampleThai": "นักเรียนชั้นมัธยมปลายมักรู้สึกวิตกกังวลใจไม่สงบขณะรอคอยผลการสอบคัดเลือกเข้ามหาวิทยาลัย"
  },
  {
    "id": "v_b1_feel_02",
    "word": "enthusiastic",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "กระตือรือร้นเปี่ยมไฟ",
    "alternatives": [
      "เฉื่อยชาเบื่อหน่าย",
      "ไม่สนใจใยดี",
      "เย็นชาเพิกเฉย"
    ],
    "example": "Volunteers were enthusiastic about launching the community environmental clean-up campaign.",
    "exampleThai": "เหล่าอาสาสมัครรู้สึกกระตือรือร้นเปี่ยมไฟเกี่ยวกับการเปิดตัวแคมเปญทำความสะอาดสิ่งแวดล้อมในชุมชน"
  },
  {
    "id": "v_b1_feel_03",
    "word": "arrogant",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "หยิ่งยโสโอหังอวดดี",
    "alternatives": [
      "อ่อนน้อมถ่อมตน",
      "สุภาพเรียบร้อย",
      "มีสัมมาคารวะ"
    ],
    "example": "His arrogant dismissive remarks alienate supportive coworkers and undermine teamwork.",
    "exampleThai": "คำพูดที่หยิ่งยโสโอหังอวดดีและไม่เห็นหัวใครของเขาทำให้เพื่อนร่วมงานที่คอยสนับสนุนถอยห่าง"
  },
  {
    "id": "v_b1_feel_04",
    "word": "humble",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "อ่อนน้อมถ่อมตน",
    "alternatives": [
      "หลงตัวเอง",
      "โอ้อวดความสำเร็จ",
      "เย่อหยิ่งจองหอง"
    ],
    "example": "Despite winning international awards, the master pianist remained remarkably humble and gracious.",
    "exampleThai": "แม้จะได้รับรางวัลระดับนานาชาติ นักเปียโนปรมาจารย์ก็ยังคงอ่อนน้อมถ่อมตนและสง่างามอย่างน่าทึ่ง"
  },
  {
    "id": "v_b1_feel_05",
    "word": "optimistic",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มองโลกในแง่ดีเปี่ยมหวัง",
    "alternatives": [
      "มองโลกในแง่ร้าย",
      "สิ้นหวังท้อแท้",
      "หวาดระแวง"
    ],
    "example": "Maintaining an optimistic mindset helps resilient entrepreneurs persevere through economic crises.",
    "exampleThai": "การรักษาจิตใจที่มองโลกในแง่ดีเปี่ยมหวังช่วยให้ผู้ประกอบการที่ทรหดก้าวผ่านวิกฤตเศรษฐกิจไปได้"
  },
  {
    "id": "v_b1_feel_06",
    "word": "pessimistic",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มองโลกในแง่ร้ายหดหู่",
    "alternatives": [
      "เปี่ยมด้วยความหวัง",
      "สดใสร่าเริง",
      "มั่นใจในอนาคต"
    ],
    "example": "Constantly dwelling on pessimistic scenarios clouds your judgment and breeds unnecessary hesitation.",
    "exampleThai": "การจมอยู่กับสถานการณ์ที่มองโลกในแง่ร้ายหดหู่อย่างต่อเนื่องบดบังการตัดสินใจและสร้างความลังเล"
  },
  {
    "id": "v_b1_feel_07",
    "word": "stubborn",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ดื้อรั้นหัวแข็งไม่ยอมใคร",
    "alternatives": [
      "โอนอ่อนผ่อนตาม",
      "ยืดหยุ่นรับฟัง",
      "ว่าง่ายคล้อยตาม"
    ],
    "example": "He was too stubborn to admit his strategic calculation mistake during the boardroom debate.",
    "exampleThai": "เขาเป็นคนดื้อรั้นหัวแข็งไม่ยอมใครเกินกว่าจะยอมรับข้อผิดพลาดในการคำนวณกลยุทธ์ระหว่างการโต้วาที"
  },
  {
    "id": "v_b1_feel_08",
    "word": "empathetic",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เข้าใจความรู้สึกผู้อื่นลึกซึ้ง",
    "alternatives": [
      "ไร้ความเห็นใจ",
      "เย็นชาแล้งน้ำใจ",
      "เย่อหยิ่ง"
    ],
    "example": "Empathetic counselors listen attentively to troubled teenagers without passing hasty moral judgments.",
    "exampleThai": "ที่ปรึกษาผู้เข้าใจความรู้สึกผู้อื่นลึกซึ้งรับฟังวัยรุ่นที่มีปัญหาอย่างตั้งใจโดยไม่ด่วนตัดสินทางศีลธรรม"
  },
  {
    "id": "v_b1_feel_09",
    "word": "considerate",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "นึกถึงใจผู้อื่นเกรงใจ",
    "alternatives": [
      "เห็นแก่ตัว",
      "หยาบคายไร้มารยาท",
      "ไม่เกรงใจ"
    ],
    "example": "It was very considerate of him to lower his music volume while his roommate studied.",
    "exampleThai": "เป็นการกระทำที่นึกถึงใจผู้อื่นเกรงใจมากที่เขาลดเสียงเพลงลงขณะที่รูมเมทกำลังอ่านหนังสือ"
  },
  {
    "id": "v_b1_feel_10",
    "word": "affectionate",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "แสดงความรักใคร่อบอุ่น",
    "alternatives": [
      "เย็นชาห่างเหิน",
      "ดุร้ายก้าวร้าว",
      "เฉยเมย"
    ],
    "example": "Golden retrievers are famously affectionate family dogs that adore gentle head pats.",
    "exampleThai": "โกลเด้นรีทรีฟเวอร์เป็นสุนัขประจำครอบครัวที่แสดงความรักใคร่อบอุ่นและชอบให้ลูบหัวเบาๆ"
  },
  {
    "id": "v_b1_feel_11",
    "word": "frustrated",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "หงุดหงิดคับข้องใจ",
    "alternatives": [
      "สบายใจโล่งอก",
      "พึงพอใจในผลงาน",
      "มีความสุข"
    ],
    "example": "The developer grew frustrated when the software bug stubbornly resisted three days of debugging.",
    "exampleThai": "นักพัฒนารู้สึกหงุดหงิดคับข้องใจเมื่อบั๊กในซอฟต์แวร์ยังคงไม่ได้รับการแก้ไขหลังพยายามมาสามวัน"
  },
  {
    "id": "v_b1_feel_react",
    "word": "react",
    "pos": "v.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ตอบสนองต่อสิ่งเร้า",
    "alternatives": [
      "เพิกเฉยเฉยเมย",
      "หยุดนิ่งไม่ขยับ",
      "ไม่รู้สึกรู้สา"
    ],
    "example": "People react differently when facing unexpected bad news or sudden crises.",
    "exampleThai": "ผู้คนมีวิธีตอบสนองต่อสิ่งเร้าแตกต่างกันเมื่อเผชิญกับข่าวร้ายที่ไม่คาดคิดหรือวิกฤตที่กะทันหัน"
  },
  {
    "id": "v_b1_feel_13",
    "word": "introverted",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ชอบเก็บตัวรักความสงบ",
    "alternatives": [
      "ชอบสังสรรค์เข้าสังคม",
      "กล้าแสดงออกตลอดเวลา",
      "พูดคุยไม่หยุด"
    ],
    "example": "Introverted individuals recharge their mental energy through quiet solitary activities like reading.",
    "exampleThai": "บุคคลที่ชอบเก็บตัวรักความสงบจะฟื้นฟูพลังงานในใจผ่านกิจกรรมสันโดษอันเงียบสงบเช่นการอ่านหนังสือ"
  },
  {
    "id": "v_b1_feel_14",
    "word": "extroverted",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ชอบเข้าสังคมเปิดเผย",
    "alternatives": [
      "ชอบเก็บตัวอยู่คนเดียว",
      "ขี้อายประหม่า",
      "เงียบขรึม"
    ],
    "example": "Extroverted sales representatives thrive when mingling and networking in lively crowded events.",
    "exampleThai": "ตัวแทนขายที่ชอบเข้าสังคมเปิดเผยจะทำงานได้ยอดเยี่ยมเมื่อได้พบปะและสร้างเครือข่ายในงานที่มีผู้คนคึกคัก"
  },
  {
    "id": "v_b1_feel_express",
    "word": "express",
    "pos": "v.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "แสดงความรู้สึก",
    "alternatives": [
      "เก็บกดอารมณ์ไว้",
      "ปิดบังซ่อนเร้น",
      "แสร้งทำเป็นไม่รู้"
    ],
    "example": "Art and music allow shy teenagers to express their innermost emotions freely.",
    "exampleThai": "ศิลปะและดนตรีช่วยให้วัยรุ่นที่ขี้อายสามารถแสดงความรู้สึกส่วนลึกที่สุดของตนได้อย่างอิสระ"
  },
  {
    "id": "v_b1_feel_16",
    "word": "passionate",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "หลงใหลมุ่งมั่นทุ่มเท",
    "alternatives": [
      "เฉื่อยชาเบื่อหน่าย",
      "ทำไปตามหน้าที่",
      "ไม่แยแส"
    ],
    "example": "The biology teacher is genuinely passionate about protecting endangered tropical marine ecosystems.",
    "exampleThai": "ครูชีววิทยามีความหลงใหลมุ่งมั่นทุ่มเทอย่างแท้จริงในการปกป้องระบบนิเวศทางทะเลเขตร้อนที่ใกล้สูญพันธุ์"
  },
  {
    "id": "v_b1_feel_17",
    "word": "authentic",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "จริงใจเป็นตัวของตัวเอง",
    "alternatives": [
      "เสแสร้งแกล้งทำ",
      "หลอกลวงสับปลับ",
      "หน้าไหว้หลังหลอก"
    ],
    "example": "Voters appreciate leaders who speak with authentic sincerity rather than rehearsed spin.",
    "exampleThai": "ผู้ลงคะแนนชื่นชมผู้นำที่พูดจาด้วยความจริงใจเป็นตัวของตัวเองมากกว่าการท่องบทพูดที่ซักซ้อมมา"
  },
  {
    "id": "v_b1_feel_18",
    "word": "compassionate",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีเมตตากรุณาอย่างยิ่ง",
    "alternatives": [
      "โหดร้ายทารุณ",
      "ไร้ความรู้สึก",
      "ตระหนี่ใจแคบ"
    ],
    "example": "The compassionate volunteer comforted scared stray animals at the rescue shelter.",
    "exampleThai": "อาสาสมัครผู้มีเมตตากรุณาอย่างยิ่งคอยปลอบโยนสัตว์จรจัดที่หวาดกลัว ณ สถานสงเคราะห์สัตว์"
  },
  {
    "id": "v_b2_feel_01",
    "word": "altruistic",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เสียสละเพื่อประโยชน์สุขผู้อื่น",
    "alternatives": [
      "เห็นแก่ประโยชน์ส่วนตน",
      "ละโมบโลภมาก",
      "เอารัดเอาเปรียบ"
    ],
    "example": "Donating bone marrow to save an unknown leukemia patient is an extraordinarily altruistic act.",
    "exampleThai": "การบริจาคไขกระดูกเพื่อช่วยชีวิตผู้ป่วยลูคีเมียที่ไม่รู้จักเป็นการกระทำที่เสียสละเพื่อประโยชน์สุขผู้อื่นอย่างยิ่ง"
  },
  {
    "id": "v_b2_feel_02",
    "word": "meticulous",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ละเอียดรอบคอบประณีตพิถีพิถัน",
    "alternatives": [
      "สะเพร่าเลินเล่อ",
      "ทำงานลวกๆ",
      "ขาดความระมัดระวัง"
    ],
    "example": "The forensic detective conducted a meticulous search of the crime scene for trace fibers.",
    "exampleThai": "นักสืบนิติวิทยาศาสตร์ดำเนินการค้นหาอย่างละเอียดรอบคอบประณีตพิถีพิถันในที่เกิดเหตุเพื่อหาเส้นใยหลักฐาน"
  },
  {
    "id": "v_b2_feel_03",
    "word": "gregarious",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ชอบเข้าสังคมรักเพื่อนฝูง",
    "alternatives": [
      "ชอบเก็บตัวสันโดษ",
      "หวาดกลัวผู้คน",
      "เงียบขรึมไร้เพื่อน"
    ],
    "example": "Her naturally gregarious personality made her the beloved social hub of our university cohort.",
    "exampleThai": "บุคลิกที่เป็นคนชอบเข้าสังคมรักเพื่อนฝูงโดยธรรมชาติทำให้เธอเป็นศูนย์รวมใจของเพื่อนร่วมรุ่นในมหาวิทยาลัย"
  },
  {
    "id": "v_b2_feel_04",
    "word": "ambivalent",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "รู้สึกสองจิตสองใจก้ำกึ่ง",
    "alternatives": [
      "เด็ดเดี่ยวแน่วแน่",
      "ตัดสินใจชัดเจน",
      "ไม่มีข้อกังขา"
    ],
    "example": "He felt ambivalent about accepting the lucrative overseas job offer because it meant leaving his family.",
    "exampleThai": "เขารู้สึกสองจิตสองใจก้ำกึ่งเกี่ยวกับการตอบรับงานต่างประเทศที่รายได้ดีเพราะต้องอยู่ห่างจากครอบครัว"
  },
  {
    "id": "v_b2_feel_05",
    "word": "pragmatic",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เน้นการปฏิบัติที่ได้ผลจริง",
    "alternatives": [
      "เพ้อฝันเพ้อเจ้อ",
      "ยึดทฤษฎีไม่สนความจริง",
      "ไม่สมจริง"
    ],
    "example": "Instead of chasing idealistic visions, the mayor adopted a pragmatic approach to affordable housing.",
    "exampleThai": "แทนที่จะวิ่งตามวิสัยทัศน์ในอุดมคติ นายกเทศมนตรีเลือกใช้วิธีการที่เน้นการปฏิบัติที่ได้ผลจริงในการจัดหาที่อยู่อาศัย"
  },
  {
    "id": "v_b2_feel_06",
    "word": "apprehensive",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "หวาดหวั่นพรั่นพรึงในใจ",
    "alternatives": [
      "มั่นใจไร้กังวล",
      "อุ่นใจปลอดภัย",
      "ตื่นเต้นยินดี"
    ],
    "example": "Residents were understandably apprehensive about the structural safety of the storm-damaged dam.",
    "exampleThai": "ชาวบ้านรู้สึกหวาดหวั่นพรั่นพรึงในใจอย่างเข้าใจได้เกี่ยวกับความปลอดภัยเชิงโครงสร้างของเขื่อนที่ถูกพายุซัด"
  },
  {
    "id": "v_b2_feel_07",
    "word": "volatile",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "อารมณ์แปรปรวนขึ้นลงง่าย",
    "alternatives": [
      "อารมณ์มั่นคงเสมอต้นเสมอปลาย",
      "ใจเย็นสุขุม",
      "คาดเดาได้ง่าย"
    ],
    "example": "Managing a volatile boss who erupts over minor oversights creates severe workplace tension.",
    "exampleThai": "การรับมือกับเจ้านายที่มีอารมณ์แปรปรวนขึ้นลงง่ายและระเบิดอารมณ์กับข้อผิดพลาดเล็กน้อยสร้างความตึงเครียดในที่ทำงาน"
  },
  {
    "id": "v_b2_feel_08",
    "word": "resilience",
    "pos": "n.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "พลังใจที่ล้มแล้วลุกขึ้นใหม่",
    "alternatives": [
      "ความอ่อนแอยอมแพ้ง่าย",
      "ความท้อแท้สิ้นหวัง",
      "ความเปราะบางทางใจ"
    ],
    "example": "Inner psychological resilience enables trauma survivors to rebuild fulfilling lives after grief.",
    "exampleThai": "พลังใจที่ล้มแล้วลุกขึ้นใหม่ภายในช่วยให้ผู้รอดชีวิตจากเหตุสะเทือนใจสร้างชีวิตที่มีความสุขขึ้นมาใหม่ได้"
  },
  {
    "id": "v_b2_feel_09",
    "word": "introspective",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ชอบใคร่ครวญสำรวจจิตใจตนเอง",
    "alternatives": [
      "ผิวเผินไม่คิดลึก",
      "สนใจแต่สิ่งภายนอก",
      "ใจร้อนวู่วาม"
    ],
    "example": "Keeping a daily reflective journal cultivates a deeply introspective and mindful perspective.",
    "exampleThai": "การเขียนบันทึกสะท้อนความคิดประจำวันช่วยเสริมสร้างมุมมองที่ชอบใคร่ครวญสำรวจจิตใจตนเองและมีสติ"
  },
  {
    "id": "v_b2_feel_anticipate",
    "word": "anticipate",
    "pos": "v.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "คาดการณ์ล่วงหน้า",
    "alternatives": [
      "รำลึกอดีต",
      "มองข้ามสิ่งสำคัญ",
      "เพิกเฉยต่อสัญญาณ"
    ],
    "example": "Economists anticipate that consumer confidence will rise gradually in the second half of the year.",
    "exampleThai": "นักเศรษฐศาสตร์คาดการณ์ล่วงหน้าว่าความเชื่อมั่นของผู้บริโภคจะทยอยปรับตัวสูงขึ้นในครึ่งปีหลัง"
  },
  {
    "id": "v_b2_feel_11",
    "word": "cynical",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มองโลกแบบคลางแคลงใจ",
    "alternatives": [
      "มองโลกในแง่ดีบริสุทธิ์",
      "เชื่อใจผู้อื่นง่าย",
      "มีศรัทธาแรงกล้า"
    ],
    "example": "Repeated broken campaign pledges made ordinary citizens cynical about political promises.",
    "exampleThai": "คำสัญญาในการหาเสียงที่ถูกผิดซ้ำๆ ทำให้ประชาชนทั่วไปมองโลกแบบคลางแคลงใจต่อคำมั่นทางการเมือง"
  },
  {
    "id": "v_b2_feel_12",
    "word": "stoic",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "อดทนอดกลั้นไม่แสดงอารมณ์",
    "alternatives": [
      "โวยวายคร่ำครวญ",
      "ตื่นตระหนกง่าย",
      "อ่อนไหวฟูมฟาย"
    ],
    "example": "He bore severe physical pain with stoic composure, never complaining to the attending nurses.",
    "exampleThai": "เขาทนรับความเจ็บปวดทางกายอย่างรุนแรงด้วยความอดทนอดกลั้นไม่แสดงอารมณ์โดยไม่เคยบ่นกับพยาบาลเลย"
  },
  {
    "id": "v_b2_feel_13",
    "word": "narcissistic",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "หลงตัวเองหมกมุ่นภาพลักษณ์",
    "alternatives": [
      "อ่อนน้อมถ่อมตน",
      "เห็นอกเห็นใจผู้อื่น",
      "เสียสละเพื่อส่วนรวม"
    ],
    "example": "His narcissistic obsession with social media approval destroyed meaningful real-life friendships.",
    "exampleThai": "ความหลงตัวเองหมกมุ่นภาพลักษณ์กับการได้รับการยอมรับบนโซเชียลมีเดียทำลายมิตรภาพในชีวิตจริงที่มีความหมาย"
  },
  {
    "id": "v_b2_feel_distinguish",
    "word": "distinguish",
    "pos": "v.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "แยกแยะความแตกต่าง",
    "alternatives": [
      "รวมเป็นสิ่งเดียวกัน",
      "ทำให้สับสนปนเป",
      "มองข้ามความต่าง"
    ],
    "example": "It is crucial to distinguish between genuine scientific evidence and mere online rumors.",
    "exampleThai": "สิ่งสำคัญอย่างยิ่งคือต้องแยกแยะความแตกต่างระหว่างหลักฐานทางวิทยาศาสตร์ที่แท้จริงกับเพียงแค่ข่าวลือทางอินเทอร์เน็ต"
  },
  {
    "id": "v_b2_feel_15",
    "word": "poignant",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "สะเทือนอารมณ์จับใจลึกซึ้ง",
    "alternatives": [
      "ตลกขบขันไร้สาระ",
      "น่าเบื่อจืดชืด",
      "ไม่เร้าอารมณ์"
    ],
    "example": "The museum exhibition featured a poignant photograph of war refugees reuniting after decades.",
    "exampleThai": "นิทรรศการในพิพิธภัณฑ์จัดแสดงภาพถ่ายที่สะเทือนอารมณ์จับใจลึกซึ้งของผู้ลี้ภัยสงครามที่ได้กลับมาพบกันหลังผ่านไปหลายทศวรรษ"
  },
  {
    "id": "v_b2_feel_perceive",
    "word": "perceive",
    "pos": "v.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "รับรู้และเข้าใจ",
    "alternatives": [
      "มองข้ามไป",
      "ปิดหูปิดตา",
      "เข้าใจคลาดเคลื่อน"
    ],
    "example": "How we perceive everyday stressful situations largely determines our mental well-being.",
    "exampleThai": "วิธีการที่เรารับรู้และเข้าใจสถานการณ์ตึงเครียดในชีวิตประจำวันมีผลอย่างมากต่อสุขภาวะทางจิตของเรา"
  },
  {
    "id": "v_b2_feel_empathize",
    "word": "empathize",
    "pos": "v.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เห็นอกเห็นใจ",
    "alternatives": [
      "ซ้ำเติมความทุกข์",
      "เหยียดหยามดูแคลน",
      "เฉยเมยเย็นชา"
    ],
    "example": "Counselors are trained to listen actively and empathize with patients coping with personal grief.",
    "exampleThai": "ที่ปรึกษาได้รับการฝึกฝนให้รับฟังอย่างตั้งใจและเห็นอกเห็นใจผู้ป่วยที่กำลังรับมือกับความสูญเสียส่วนบุคคล"
  },
  {
    "id": "v_a1_edu_01",
    "word": "school",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "โรงเรียน",
    "alternatives": [
      "โรงพยาบาล",
      "สถานีรถไฟ",
      "ห้างสรรพสินค้า"
    ],
    "example": "Children walk happily to their local neighborhood school every morning.",
    "exampleThai": "เด็กๆ เดินไปโรงเรียนในละแวกบ้านอย่างมีความสุขในทุกเช้า"
  },
  {
    "id": "v_a1_edu_02",
    "word": "class",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ชั้นเรียน",
    "alternatives": [
      "สนามเด็กเล่น",
      "โรงอาหาร",
      "ห้องสมุด"
    ],
    "example": "Our English class begins promptly at nine o'clock every Monday.",
    "exampleThai": "ชั้นเรียนภาษาอังกฤษของเราเริ่มต้นตรงเวลาตอนเก้าโมงเช้าในทุกวันจันทร์"
  },
  {
    "id": "v_a1_edu_03",
    "word": "teacher",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ครูผู้สอน",
    "alternatives": [
      "นักเรียน",
      "ภารโรง",
      "คนขับรถโรงเรียน"
    ],
    "example": "The kind science teacher showed pupils how seeds germinate in moist soil.",
    "exampleThai": "ครูผู้สอนวิทยาศาสตร์ใจดีสาธิตให้นักเรียนดูว่าเมล็ดพืชงอกในดินชื้นอย่างไร"
  },
  {
    "id": "v_a1_edu_04",
    "word": "student",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "นักเรียน",
    "alternatives": [
      "ผู้ปกครอง",
      "ครูใหญ่",
      "พนักงานขับรถ"
    ],
    "example": "Every diligent student listened attentively to the morning grammar lesson.",
    "exampleThai": "นักเรียนที่ขยันทุกคนตั้งใจฟังบทเรียนไวยากรณ์ช่วงเช้าอย่างจดจ่อ"
  },
  {
    "id": "v_a1_edu_05",
    "word": "book",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "หนังสือเรียน",
    "alternatives": [
      "สมุดวาดภาพ",
      "กล่องดินสอ",
      "กระดานชนวน"
    ],
    "example": "Please turn to page twenty-five of your English reader book.",
    "exampleThai": "กรุณาเปิดไปที่หน้ายี่สิบห้าของหนังสือเรียนการอ่านภาษาอังกฤษของคุณ"
  },
  {
    "id": "v_a1_edu_06",
    "word": "notebook",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "สมุดจดบันทึก",
    "alternatives": [
      "กระดาษทด",
      "แฟ้มเอกสาร",
      "ซองจดหมาย"
    ],
    "example": "She jotted down the teacher's vocabulary definitions in her notebook.",
    "exampleThai": "เธอจดคำนิยามคำศัพท์ของครูลงในสมุดจดบันทึกของเธอ"
  },
  {
    "id": "v_a1_edu_07",
    "word": "pencil",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ดินสอไม้",
    "alternatives": [
      "ปากกาหมึกซึม",
      "สีเทียน",
      "พู่กันระบายสี"
    ],
    "example": "Sharpen your wooden pencil before drawing geometric shapes.",
    "exampleThai": "เหลาดินสอไม้ของคุณให้แหลมก่อนวาดรูปทรงเรขาคณิต"
  },
  {
    "id": "v_a1_edu_08",
    "word": "pen",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ปากกาหมึก",
    "alternatives": [
      "ดินสอไม้",
      "ไม้บรรทัด",
      "ยางลบ"
    ],
    "example": "Please write your full name at the top of the test paper using a blue pen.",
    "exampleThai": "กรุณาเขียนชื่อ-นามสกุลของคุณที่ด้านบนของกระดาษข้อสอบด้วยปากกาหมึกสีน้ำเงิน"
  },
  {
    "id": "v_a1_edu_09",
    "word": "ruler",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ไม้บรรทัดวัด",
    "alternatives": [
      "วงเวียน",
      "กบเหลาดินสอ",
      "กรรไกรตัดกระดาษ"
    ],
    "example": "Use a straight plastic ruler to draw a neat line across the paper.",
    "exampleThai": "ใช้ไม้บรรทัดวัดพลาสติกตรงขีดเส้นอย่างเป็นระเบียบข้ามหน้ากระดาษ"
  },
  {
    "id": "v_a1_edu_10",
    "word": "eraser",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ยางลบดินสอ",
    "alternatives": [
      "น้ำยาลบคำผิด",
      "เทปกาว",
      "คลิปหนีบกระดาษ"
    ],
    "example": "He rubbed out the spelling mistake cleanly using a soft rubber eraser.",
    "exampleThai": "เขาลบคำสะกดที่ผิดออกอย่างสะอาดโดยใช้ยางลบดินสอเนื้อนุ่ม"
  },
  {
    "id": "v_a1_edu_11",
    "word": "desk",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "โต๊ะนักเรียน",
    "alternatives": [
      "ตู้เก็บเอกสาร",
      "กระดานไวท์บอร์ด",
      "ชั้นวางหนังสือ"
    ],
    "example": "Keep your school study desk tidy and free of food wrappers.",
    "exampleThai": "จัดโต๊ะนักเรียนสำหรับเรียนหนังสือของคุณให้เป็นระเบียบและไม่มีเศษซองขนม"
  },
  {
    "id": "v_a1_edu_12",
    "word": "chair",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "เก้าอี้เรียน",
    "alternatives": [
      "โต๊ะครู",
      "ม้านั่งยาว",
      "พรมปูพื้น"
    ],
    "example": "Please tuck your wooden chair under the desk before leaving the classroom.",
    "exampleThai": "กรุณาเลื่อนเก้าอี้เรียนไม้เก็บใต้โต๊ะก่อนออกจากห้องเรียน"
  },
  {
    "id": "v_a1_edu_13",
    "word": "room",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ห้องเรียน",
    "alternatives": [
      "ทางเดินระเบียง",
      "โรงอาหาร",
      "ลานเข้าแถว"
    ],
    "example": "Our primary classroom is bright, airy, and decorated with colorful maps.",
    "exampleThai": "ห้องเรียนชั้นประถมของเราสว่าง โปร่งสบาย และตกแต่งด้วยแผนที่สีสันสดใส"
  },
  {
    "id": "v_a1_edu_14",
    "word": "read",
    "pos": "v.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "อ่านหนังสือ",
    "alternatives": [
      "เขียนตามคำบอก",
      "วาดภาพประกอบ",
      "ระบายสี"
    ],
    "example": "Primary pupils read short English fables aloud every morning.",
    "exampleThai": "นักเรียนชั้นประถมศึกษาอ่านหนังสือนิทานอีสปภาษาอังกฤษสั้นๆ ออกเสียงทุกเช้า"
  },
  {
    "id": "v_a1_edu_15",
    "word": "write",
    "pos": "v.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "เขียนบทความ",
    "alternatives": [
      "อ่านออกเสียง",
      "ท่องจำ",
      "ฉีกกระดาษ"
    ],
    "example": "Students write a short journal entry about their weekend activities.",
    "exampleThai": "นักเรียนเขียนบทความบันทึกประจำวันสั้นๆ เกี่ยวกับกิจกรรมช่วงสุดสัปดาห์"
  },
  {
    "id": "v_a1_edu_16",
    "word": "learn",
    "pos": "v.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "เรียนรู้ทักษะใหม่",
    "alternatives": [
      "ลืมเลือน",
      "ละทิ้ง",
      "ปฏิเสธความรู้"
    ],
    "example": "Children learn how to tell the time using an interactive wooden clock.",
    "exampleThai": "เด็กๆ เรียนรู้ทักษะใหม่ในการดูเวลาโดยใช้นาฬิกาไม้จำลองแบบมีปฏิสัมพันธ์"
  },
  {
    "id": "v_a1_edu_17",
    "word": "study",
    "pos": "v.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ศึกษาทบทวน",
    "alternatives": [
      "เล่นซน",
      "นอนหลับ",
      "ออกไปวิ่งเล่น"
    ],
    "example": "I study English vocabulary for thirty minutes before bedtime every evening.",
    "exampleThai": "ฉันศึกษาทบทวนคำศัพท์ภาษาอังกฤษวันละสามสิบนาทีก่อนนอนทุกคืน"
  },
  {
    "id": "v_a1_edu_18",
    "word": "draw",
    "pos": "v.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วาดรูปภาพ",
    "alternatives": [
      "ตัดกระดาษ",
      "ฉีกกระดาษ",
      "พิมพ์ตัวหนังสือ"
    ],
    "example": "In art period, pupils draw pictures of their pets and families.",
    "exampleThai": "ในชั่วโมงศิลปะ นักเรียนวาดรูปภาพสัตว์เลี้ยงและครอบครัวของพวกเขา"
  },
  {
    "id": "v_a1_edu_19",
    "word": "test",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "แบบทดสอบย่อย",
    "alternatives": [
      "การบ้านประจำสัปดาห์",
      "การเล่นเกม",
      "การเข้าแถวเคารพธงชาติ"
    ],
    "example": "We took a ten-question spelling test on common fruit names.",
    "exampleThai": "พวกเราทำแบบทดสอบย่อยการสะกดคำสิบข้อเกี่ยวกับชื่อผลไม้ทั่วไป"
  },
  {
    "id": "v_a1_edu_20",
    "word": "friend",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "เพื่อนร่วมชั้นเรียน",
    "alternatives": [
      "คนแปลกหน้า",
      "อาจารย์ใหญ่",
      "เจ้าหน้าที่รักษาความปลอดภัย"
    ],
    "example": "She plays jump rope with her best friend during morning recess.",
    "exampleThai": "เธอเล่นกระโดดเชือกกับเพื่อนร่วมชั้นเรียนคนสนิทช่วงพักเบรกตอนเช้า"
  },
  {
    "id": "v_a1_edu_21",
    "word": "board",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "กระดานดำหน้าห้อง",
    "alternatives": [
      "ประตูห้อง",
      "หน้าต่างกระจก",
      "พื้นกระเบื้อง"
    ],
    "example": "The teacher wrote the new vocabulary words on the green blackboard.",
    "exampleThai": "คุณครูเขียนคำศัพท์ใหม่ลงบนกระดานดำหน้าห้องสีเขียว"
  },
  {
    "id": "v_a1_edu_22",
    "word": "bell",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "กริ่งสัญญาณโรงเรียน",
    "alternatives": [
      "เสียงนกหวีด",
      "แตรรถยนต์",
      "เสียงนาฬิกาปลุก"
    ],
    "example": "The school bell rang loudly to announce the start of lunchtime.",
    "exampleThai": "กริ่งสัญญาณโรงเรียนดังขึ้นอย่างกึกก้องเพื่อประกาศการเริ่มต้นเวลาอาหารกลางวัน"
  },
  {
    "id": "v_a1_edu_23",
    "word": "bag",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "กระเป๋านักเรียน",
    "alternatives": [
      "กล่องดินสอ",
      "ถุงพลาสติก",
      "แฟ้มเอกสาร"
    ],
    "example": "Pack your notebooks, pencils, and water tumbler into your school bag.",
    "exampleThai": "เก็บสมุดจด ดินสอ และแก้วน้ำลงในกระเป๋านักเรียนของคุณ"
  },
  {
    "id": "v_a1_edu_24",
    "word": "question",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "คำถามข้อสงสัย",
    "alternatives": [
      "คำตอบที่ถูกต้อง",
      "บทสรุป",
      "หัวข้อรายงาน"
    ],
    "example": "Raise your hand politely if you have a question about the math exercise.",
    "exampleThai": "ยกมือขึ้นอย่างสุภาพหากคุณมีคำถามข้อสงสัยเกี่ยวกับแบบฝึกหัดคณิตศาสตร์"
  },
  {
    "id": "v_a1_edu_25",
    "word": "answer",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "คำตอบที่ถูกต้อง",
    "alternatives": [
      "คำถามยาก",
      "ตัวเลือกหลอก",
      "โจทย์ปัญหา"
    ],
    "example": "Write your final answer clearly in the space provided on the worksheet.",
    "exampleThai": "เขียนคำตอบที่ถูกต้องของคุณอย่างชัดเจนในช่องว่างที่จัดไว้บนใบงาน"
  },
  {
    "id": "v_a1_edu_26",
    "word": "lesson",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "บทเรียนประจำวัน",
    "alternatives": [
      "เวลาพักผ่อน",
      "การสอบไล่",
      "วันหยุดราชการ"
    ],
    "example": "Today's history lesson focused on ancient Sukhothai kingdom monuments.",
    "exampleThai": "บทเรียนประจำวันวิชาประวัติศาสตร์ของวันนี้เน้นไปที่โบราณสถานแห่งอาณาจักรสุโขทัย"
  },
  {
    "id": "v_a1_edu_27",
    "word": "homework",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "การบ้านแบบฝึกหัด",
    "alternatives": [
      "เกมคอมพิวเตอร์",
      "การซ้อมกีฬา",
      "การดูการ์ตูน"
    ],
    "example": "Always finish your math homework before watching television in the evening.",
    "exampleThai": "ทำการบ้านแบบฝึกหัดวิชาคณิตศาสตร์ให้เสร็จเสมอก่อนดูโทรทัศน์ในตอนเย็น"
  },
  {
    "id": "v_a1_edu_28",
    "word": "math",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิชาคณิตศาสตร์",
    "alternatives": [
      "วิชาศิลปะ",
      "วิชาดนตรี",
      "วิชาพลศึกษา"
    ],
    "example": "We practiced adding and subtracting two-digit numbers in math class.",
    "exampleThai": "พวกเราฝึกบวกและลบเลขสองหลักในคาบวิชาคณิตศาสตร์"
  },
  {
    "id": "v_a1_edu_29",
    "word": "art",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิชาศิลปะสร้างสรรค์",
    "alternatives": [
      "วิชาวิทยาศาสตร์",
      "วิชาคณิตศาสตร์",
      "วิชาภาษาไทย"
    ],
    "example": "Children used watercolors to paint cheerful tropical fish during art hour.",
    "exampleThai": "เด็กๆ ใช้สีน้ำระบายรูปปลาเมืองร้อนแสนสดใสในชั่วโมงวิชาศิลปะสร้างสรรค์"
  },
  {
    "id": "v_a1_edu_30",
    "word": "english",
    "pos": "n.",
    "level": "A1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิชาภาษาอังกฤษ",
    "alternatives": [
      "วิชาสังคมศึกษา",
      "วิชาประวัติศาสตร์",
      "วิชาสุขศึกษา"
    ],
    "example": "Learning to speak fluent English opens doors to international friendships.",
    "exampleThai": "การเรียนรู้ที่จะพูดวิชาภาษาอังกฤษได้อย่างคล่องแคล่วช่วยเปิดประตูสู่มิตรภาพระดับสากล"
  },
  {
    "id": "v_a2_edu_01",
    "word": "exam",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "การสอบไล่ประจำภาค",
    "alternatives": [
      "การบ้านส่งท้ายสัปดาห์",
      "การเข้าแถวหน้าเสาธง",
      "การฝึกซ้อมกีฬา"
    ],
    "example": "Students revised their science formulas thoroughly before the final exam.",
    "exampleThai": "นักเรียนทบทวนสูตรวิทยาศาสตร์อย่างละเอียดก่อนการสอบไล่ประจำภาคปลายภาค"
  },
  {
    "id": "v_a2_edu_02",
    "word": "subject",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "รายวิชาการเรียน",
    "alternatives": [
      "เวลาพักเที่ยง",
      "ชุดนักเรียน",
      "รถรับส่งนักเรียน"
    ],
    "example": "Physics and world history are her two most beloved academic subjects.",
    "exampleThai": "ฟิสิกส์และประวัติศาสตร์โลกเป็นรายวิชาการเรียนที่เธอโปรดปรานที่สุดสองวิชา"
  },
  {
    "id": "v_a2_edu_03",
    "word": "library",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ห้องสมุดค้นคว้า",
    "alternatives": [
      "โรงยิมเนเซียม",
      "โรงอาหาร",
      "สระว่ายน้ำ"
    ],
    "example": "The school library contains thousands of fiction novels and reference encyclopedias.",
    "exampleThai": "ห้องสมุดค้นคว้าของโรงเรียนมีหนังสือนิยายและสารานุกรมอ้างอิงหลายพันเล่ม"
  },
  {
    "id": "v_a2_edu_04",
    "word": "uniform",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ชุดเครื่องแบบนักเรียน",
    "alternatives": [
      "ชุดลำลอง",
      "ชุดนอน",
      "ชุดว่ายน้ำ"
    ],
    "example": "Pupils wear their crisp, neatly pressed school uniform every weekday morning.",
    "exampleThai": "นักเรียนสวมชุดเครื่องแบบนักเรียนที่รีดเรียบกริบในทุกเช้าวันธรรมดา"
  },
  {
    "id": "v_a2_edu_05",
    "word": "timetable",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ตารางสอนรายสัปดาห์",
    "alternatives": [
      "เมนูอาหารกลางวัน",
      "แผนผังอาคาร",
      "สมุดพก"
    ],
    "example": "Check your weekly class timetable to see which books to pack each day.",
    "exampleThai": "ตรวจดูตารางสอนรายสัปดาห์ของคุณเพื่อดูว่าต้องจัดหนังสือเล่มไหนลงกระเป๋าในแต่ละวัน"
  },
  {
    "id": "v_a2_edu_06",
    "word": "grade",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ระดับผลการเรียน",
    "alternatives": [
      "ลำดับที่นั่ง",
      "หมายเลขประจำตัว",
      "คะแนนพฤติกรรม"
    ],
    "example": "She earned an excellent grade of A in advanced biology through diligent study.",
    "exampleThai": "เธอได้รับระดับผลการเรียนเออันยอดเยี่ยมในวิชาชีววิทยาขั้นสูงด้วยความขยันหมั่นเพียร"
  },
  {
    "id": "v_a2_edu_07",
    "word": "pass",
    "pos": "v.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "สอบผ่านเกณฑ์มาตรฐาน",
    "alternatives": [
      "สอบตกไม่ผ่าน",
      "ถูกหักคะแนน",
      "ขาดสอบ"
    ],
    "example": "All candidates worked hard to pass the standardized secondary entrance examination.",
    "exampleThai": "ผู้สมัครทุกคนพยายามอย่างหนักเพื่อสอบผ่านเกณฑ์มาตรฐานการคัดเลือกเข้าเรียนต่อชั้นมัธยม"
  },
  {
    "id": "v_a2_edu_08",
    "word": "fail",
    "pos": "v.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "สอบตกไม่ผ่านเกณฑ์",
    "alternatives": [
      "สอบได้คะแนนเต็ม",
      "ผ่านเกณฑ์ดีเยี่ยม",
      "ได้รับรางวัลเรียนดี"
    ],
    "example": "Students who fail the mid-term test must attend supplementary tutorial clinics.",
    "exampleThai": "นักเรียนที่สอบตกไม่ผ่านเกณฑ์การสอบกลางภาคต้องเข้าเรียนเสริมทบทวนบทเรียนเพิ่มเติม"
  },
  {
    "id": "v_a2_edu_09",
    "word": "laboratory",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ห้องปฏิบัติการวิทยาศาสตร์",
    "alternatives": [
      "ห้องดนตรีไทย",
      "ห้องพักครู",
      "ห้องพยาบาล"
    ],
    "example": "Wear protective plastic safety goggles inside the chemistry laboratory at all times.",
    "exampleThai": "สวมแว่นตานิรภัยพลาสติกป้องกันดวงตาภายในห้องปฏิบัติการวิทยาศาสตร์เคมีตลอดเวลา"
  },
  {
    "id": "v_a2_edu_10",
    "word": "project",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "โครงงานการเรียนรู้",
    "alternatives": [
      "การลงโทษทำความสะอาด",
      "การตรวจระเบียบ",
      "การเข้าแถว"
    ],
    "example": "Our group completed an interactive geography project on volcanic island formations.",
    "exampleThai": "กลุ่มของพวกเราทำโครงงานการเรียนรู้เชิงปฏิสัมพันธ์วิชาภูมิศาสตร์เรื่องการก่อตัวของเกาะภูเขาไฟจนสำเร็จ"
  },
  {
    "id": "v_a2_edu_11",
    "word": "dictionary",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "พจนานุกรมแปลคำศัพท์",
    "alternatives": [
      "สมุดวาดเขียน",
      "แผนที่ภูมิศาสตร์",
      "ตารางธาตุ"
    ],
    "example": "Look up unfamiliar vocabulary definitions and pronunciations in an English dictionary.",
    "exampleThai": "ค้นหาคำนิยามและการออกเสียงของคำศัพท์ที่ไม่คุ้นเคยในพจนานุกรมแปลคำศัพท์ภาษาอังกฤษ"
  },
  {
    "id": "v_a2_edu_12",
    "word": "presentation",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "การนำเสนอผลงานหน้าชั้น",
    "alternatives": [
      "การสอบข้อเขียน",
      "การท่องจำในใจ",
      "การทำข้อสอบช้อยส์"
    ],
    "example": "Each student delivered a five-minute slide presentation on renewable energy sources.",
    "exampleThai": "นักเรียนแต่ละคนทำการนำเสนอผลงานหน้าชั้นผ่านสไลด์เป็นเวลาห้านาทีเกี่ยวกับแหล่งพลังงานหมุนเวียน"
  },
  {
    "id": "v_a2_edu_13",
    "word": "gymnasium",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "โรงยิมเนเซียมกีฬา",
    "alternatives": [
      "ห้องพักครู",
      "ห้องพยาบาล",
      "ห้องประชุมใหญ่"
    ],
    "example": "Indoor basketball and volleyball drills take place inside the sheltered school gymnasium.",
    "exampleThai": "การฝึกซ้อมบาสเกตบอลและวอลเลย์บอลในร่มจัดขึ้นภายในโรงยิมเนเซียมกีฬาของโรงเรียนที่มีหลังคาคลุม"
  },
  {
    "id": "v_a2_edu_14",
    "word": "cafeteria",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "โรงอาหารของโรงเรียน",
    "alternatives": [
      "ห้องทดลอง",
      "ห้องดนตรี",
      "สนามฟุตบอล"
    ],
    "example": "The school cafeteria serves nutritious hot noodle soups and fresh seasonal fruit.",
    "exampleThai": "โรงอาหารของโรงเรียนเสิร์ฟก๋วยเตี๋ยวน้ำร้อนๆ ที่มีคุณค่าทางอาหารและผลไม้สดตามฤดูกาล"
  },
  {
    "id": "v_a2_edu_15",
    "word": "principal",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ผู้อำนวยการโรงเรียน",
    "alternatives": [
      "นักการภารโรง",
      "ครูฝึกสอน",
      "ประธานนักเรียน"
    ],
    "example": "The school principal delivered an inspiring welcome speech on the opening day of term.",
    "exampleThai": "ผู้อำนวยการโรงเรียนกล่าวสุนทรพจน์ต้อนรับอันสร้างแรงบันดาลใจในวันเปิดภาคเรียนวันแรก"
  },
  {
    "id": "v_a2_edu_16",
    "word": "science",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิชาวิทยาศาสตร์",
    "alternatives": [
      "วิชาดนตรีสากล",
      "วิชาทัศนศิลป์",
      "วิชาพลศึกษา"
    ],
    "example": "Science classes encourage curious students to formulate hypotheses and conduct experiments.",
    "exampleThai": "วิชาวิทยาศาสตร์กระตุ้นให้นักเรียนที่ใฝ่รู้ตั้งสมมติฐานและลงมือทำการทดลองจริง"
  },
  {
    "id": "v_a2_edu_17",
    "word": "history",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิชาประวัติศาสตร์",
    "alternatives": [
      "วิชาคณิตศาสตร์",
      "วิชาเคมี",
      "วิชาฟิสิกส์"
    ],
    "example": "Studying world history provides profound insight into human societal triumphs and conflicts.",
    "exampleThai": "การเรียนวิชาประวัติศาสตร์โลกมอบความเข้าใจเชิงลึกเกี่ยวกับชัยชนะและความขัดแย้งของสังคมมนุษย์"
  },
  {
    "id": "v_a2_edu_18",
    "word": "geography",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิชาภูมิศาสตร์",
    "alternatives": [
      "วิชาวรรณคดี",
      "วิชาดนตรีไทย",
      "วิชาการงานอาชีพ"
    ],
    "example": "In geography lessons, students examine global map projections and oceanic atmospheric currents.",
    "exampleThai": "ในคาบวิชาภูมิศาสตร์ นักเรียนตรวจสอบการฉายแผนที่โลกและกระแสน้ำและบรรยากาศในมหาสมุทร"
  },
  {
    "id": "v_a2_edu_19",
    "word": "practice",
    "pos": "v.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ฝึกฝนทำโจทย์",
    "alternatives": [
      "ละเลยไม่ใส่ใจ",
      "หยุดพักยาว",
      "เดาคำตอบ"
    ],
    "example": "You must practice solving past exam papers to build test-taking speed and accuracy.",
    "exampleThai": "คุณต้องฝึกฝนทำโจทย์ข้อสอบเก่าเพื่อสร้างความเร็วและความแม่นยำในการทำข้อสอบ"
  },
  {
    "id": "v_a2_edu_20",
    "word": "review",
    "pos": "v.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ทบทวนบทเรียนซ้ำ",
    "alternatives": [
      "เพิกเฉยทิ้งไว้",
      "ลืมทิ้งไป",
      "เริ่มเรียนเรื่องใหม่"
    ],
    "example": "Always review chapter summaries every Sunday to reinforce long-term memory retention.",
    "exampleThai": "ทบทวนบทเรียนซ้ำในส่วนสรุปท้ายบททุกวันอาทิตย์เสมอเพื่อเสริมสร้างการจดจำในระยะยาว"
  },
  {
    "id": "v_a2_edu_21",
    "word": "mistake",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ข้อผิดพลาดในข้อสอบ",
    "alternatives": [
      "คำตอบที่แม่นยำ",
      "คะแนนโบนัส",
      "ลายมือชื่อครู"
    ],
    "example": "Analyze every calculation mistake carefully so you do not repeat it on the final exam.",
    "exampleThai": "วิเคราะห์ข้อผิดพลาดในข้อสอบทุกจุดในการคำนวณอย่างรอบคอบเพื่อไม่ให้ทำผิดซ้ำอีกในการสอบปลายภาค"
  },
  {
    "id": "v_a2_edu_22",
    "word": "rule",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "กฎระเบียบวินัยโรงเรียน",
    "alternatives": [
      "คำแนะนำทั่วไป",
      "ข้อเสนอแนะ",
      "สิทธิพิเศษ"
    ],
    "example": "School rules prohibit students from using mobile smartphones during formal instructional hours.",
    "exampleThai": "กฎระเบียบวินัยโรงเรียนห้ามมิให้นักเรียนใช้สมาร์ตโฟนมือถือในระหว่างชั่วโมงการเรียนการสอนทางการ"
  },
  {
    "id": "v_a2_edu_23",
    "word": "absent",
    "pos": "adj.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ขาดเรียนไม่มาโรงเรียน",
    "alternatives": [
      "มาเรียนตรงเวลา",
      "นั่งเรียนหน้าห้อง",
      "มีส่วนร่วมในชั้น"
    ],
    "example": "He was absent from school for three days because of a high viral fever.",
    "exampleThai": "เขาขาดเรียนไม่มาโรงเรียนเป็นเวลาสามวันเนื่องจากมีไข้สูงจากการติดเชื้อไวรัส"
  },
  {
    "id": "v_a2_edu_24",
    "word": "attend",
    "pos": "v.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "เข้าชั้นเรียนสม่ำเสมอ",
    "alternatives": [
      "โดดเรียน",
      "มาสายเป็นประจำ",
      "ขาดเรียนบ่อย"
    ],
    "example": "Students must attend at least eighty percent of scheduled lectures to qualify for finals.",
    "exampleThai": "นักเรียนต้องเข้าชั้นเรียนสม่ำเสมออย่างน้อยร้อยละแปดสิบของการบรรยายเพื่อมีสิทธิ์สอบปลายภาค"
  },
  {
    "id": "v_a2_edu_25",
    "word": "exercise",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "แบบฝึกหัดท้ายบท",
    "alternatives": [
      "การสอบระดับชาติ",
      "คำนำหนังสือ",
      "ดัชนีท้ายเล่ม"
    ],
    "example": "Complete the ten multiple-choice exercises at the end of Chapter 3 before tomorrow.",
    "exampleThai": "ทำแบบฝึกหัดท้ายบทแบบเลือกตอบสิบข้อท้ายบทที่ 3 ให้เสร็จก่อนวันพรุ่งนี้"
  },
  {
    "id": "v_a2_edu_26",
    "word": "term",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ภาคเรียนการศึกษา",
    "alternatives": [
      "ช่วงปิดเทอมใหญ่",
      "วันหยุดสุดสัปดาห์",
      "ปีงบประมาณ"
    ],
    "example": "The first academic term concludes with examinations in late September.",
    "exampleThai": "ภาคเรียนการศึกษาภาคแรกจะสิ้นสุดลงด้วยการสอบปลายภาคในปลายเดือนกันยายน"
  },
  {
    "id": "v_a2_edu_27",
    "word": "score",
    "pos": "n.",
    "level": "A2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "คะแนนสอบที่ทำได้",
    "alternatives": [
      "เวลาที่ใช้ทำข้อสอบ",
      "จำนวนข้อสอบ",
      "ลำดับเลขที่"
    ],
    "example": "She achieved an impressive top score of ninety-five percent on the national English quiz.",
    "exampleThai": "เธอทำคะแนนสอบที่ทำได้สูงสุดอันน่าประทับใจถึงร้อยละเก้าสิบห้าในการทดสอบภาษาอังกฤษระดับชาติ"
  },
  {
    "id": "v_b1_edu_01",
    "word": "curriculum",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "หลักสูตรการศึกษา",
    "alternatives": [
      "ระเบียบการแต่งกาย",
      "ตารางสอนประจำวัน",
      "ค่าธรรมเนียมบำรุง"
    ],
    "example": "The national educational curriculum was modernized to incorporate coding and digital literacy.",
    "exampleThai": "หลักสูตรการศึกษาระดับชาติได้รับการปรับปรุงให้ทันสมัยโดยบรรจุวิชาการเขียนโค้ดและการรู้เท่าทันดิจิทัล"
  },
  {
    "id": "v_b1_edu_02",
    "word": "scholarship",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ทุนการศึกษาเรียนดี",
    "alternatives": [
      "เงินกู้ยืมเพื่อการศึกษา",
      "ค่าปรับการลงทะเบียนช้า",
      "เงินบริจาคสมาคม"
    ],
    "example": "Her stellar academic record earned her a full prestigious scholarship to Oxford University.",
    "exampleThai": "ประวัติการเรียนที่ยอดเยี่ยมทำให้เธอได้รับทุนการศึกษาเรียนดีเต็มจำนวนอันทรงเกียรติไปศึกษาต่อที่มหาวิทยาลัยออกซฟอร์ด"
  },
  {
    "id": "v_b1_edu_03",
    "word": "assignment",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "งานที่ได้รับมอบหมาย",
    "alternatives": [
      "การสอบไล่",
      "การเข้าแถว",
      "การปิดเทอม"
    ],
    "example": "The economics lecturer assigned a comprehensive research assignment on Southeast Asian inflation.",
    "exampleThai": "อาจารย์ผู้บรรยายวิชาเศรษฐศาสตร์ได้มอบหมายงานชิ้นใหญ่ที่ได้รับมอบหมายเชิงวิจัยเรื่องภาวะเงินเฟ้อในเอเชียตะวันออกเฉียงใต้"
  },
  {
    "id": "v_b1_edu_04",
    "word": "degree",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ปริญญาบัตร",
    "alternatives": [
      "บัตรนักศึกษา",
      "ใบเสร็จค่าเทอม",
      "ชุดครุย"
    ],
    "example": "Graduating with an accredited engineering degree opens exceptional worldwide career opportunities.",
    "exampleThai": "การสำเร็จการศึกษาได้รับปริญญาบัตรมหาวิทยาลัยด้านวิศวกรรมที่ได้รับการรับรองช่วยเปิดโอกาสในการทำงานระดับโลก"
  },
  {
    "id": "v_b1_edu_05",
    "word": "campus",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิทยาเขตมหาวิทยาลัย",
    "alternatives": [
      "เขตอุตสาหกรรม",
      "ย่านการค้าในเมือง",
      "สนามบินนานาชาติ"
    ],
    "example": "The university's lush green campus features shaded pedestrian walkways and modern laboratories.",
    "exampleThai": "วิทยาเขตมหาวิทยาลัยอันเขียวชอุ่มและร่มรื่นมีทางเดินคนเดินใต้ร่มเงาและห้องปฏิบัติการที่ทันสมัย"
  },
  {
    "id": "v_b1_edu_06",
    "word": "lecture",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "การบรรยายทางวิชาการ",
    "alternatives": [
      "การสนทนาส่วนตัว",
      "การซุบซิบนินทา",
      "การสอบสัมภาษณ์"
    ],
    "example": "Over three hundred undergraduates gathered in the auditorium for the guest professor's lecture.",
    "exampleThai": "นักศึกษาระดับปริญญาตรีกว่าสามร้อยคนมารวมตัวกันในหอประชุมเพื่อฟังการบรรยายทางวิชาการของศาสตราจารย์รับเชิญ"
  },
  {
    "id": "v_b1_edu_07",
    "word": "admission",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "การรับเข้าศึกษาต่อ",
    "alternatives": [
      "การพ้นสภาพนักศึกษา",
      "การขอสำเร็จการศึกษา",
      "การลาพักการเรียน"
    ],
    "example": "Gaining admission to prestigious national medical faculties requires top-tier entrance test scores.",
    "exampleThai": "การได้รับการรับเข้าศึกษาต่อในคณะแพทยศาสตร์ระดับชาติชั้นนำต้องอาศัยคะแนนสอบคัดเลือกระดับหัวกะทิ"
  },
  {
    "id": "v_b1_edu_08",
    "word": "tuition",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ค่าเล่าเรียน",
    "alternatives": [
      "เงินเดือนครู",
      "ค่าชุดนักเรียน",
      "ทุนการศึกษา"
    ],
    "example": "Public state universities maintain affordable tuition rates to guarantee equitable student access.",
    "exampleThai": "มหาวิทยาลัยของรัฐรักษาระดับค่าธรรมเนียมการศึกษาเล่าเรียนให้อยู่ในเกณฑ์ย่อมเยาเพื่อรับรองความเท่าเทียมในการเข้าถึง"
  },
  {
    "id": "v_b1_edu_09",
    "word": "semester",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ภาคการศึกษา",
    "alternatives": [
      "วันหยุดประจำสัปดาห์",
      "การปฐมนิเทศ",
      "พิธีประสาทปริญญา"
    ],
    "example": "Students typically register for five to six rigorous academic courses each semester.",
    "exampleThai": "นักศึกษามักลงทะเบียนเรียนห้าถึงห้ารายวิชาเข้มข้นในแต่ละภาคการศึกษาของมหาวิทยาลัย"
  },
  {
    "id": "v_b1_edu_10",
    "word": "diploma",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ประกาศนียบัตรวิชาชีพ",
    "alternatives": [
      "ใบเสร็จชำระเงิน",
      "บัตรประจำตัวสอบ",
      "ใบแจ้งผลคะแนน"
    ],
    "example": "Graduates celebrated proudly on stage while receiving their hard-earned vocational diploma.",
    "exampleThai": "ผู้สำเร็จการศึกษาเฉลิมฉลองอย่างภาคภูมิใจบนเวทีขณะรับประกาศนียบัตรวิชาชีพที่ได้มาจากความพยายาม"
  },
  {
    "id": "v_b1_edu_11",
    "word": "faculty",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "คณะวิชาในมหาวิทยาลัย",
    "alternatives": [
      "หอพักนักศึกษา",
      "สโมสรนิสิต",
      "โรงอาหารกลาง"
    ],
    "example": "The Faculty of Medicine is celebrated worldwide for its cutting-edge tropical disease research.",
    "exampleThai": "คณะวิชาในมหาวิทยาลัยแพทยศาสตร์มีชื่อเสียงระดับโลกในด้านงานวิจัยโรคเขตร้อนอันล้ำสมัย"
  },
  {
    "id": "v_b1_edu_12",
    "word": "academic",
    "pos": "adj.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "เชิงวิชาการรอบด้าน",
    "alternatives": [
      "เชิงบันเทิงเริงรมย์",
      "เชิงการค้าพาณิชย์",
      "เชิงสันทนาการ"
    ],
    "example": "The university honors students who demonstrate outstanding academic performance and ethics.",
    "exampleThai": "มหาวิทยาลัยเชิดชูเกียรตินักศึกษาที่แสดงออกถึงผลงานเชิงวิชาการรอบด้านและจริยธรรมที่โดดเด่น"
  },
  {
    "id": "v_b1_edu_13",
    "word": "dormitory",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "หอพักนักศึกษา",
    "alternatives": [
      "ห้องสมุดกลาง",
      "โรงอาหาร",
      "สนามกีฬา"
    ],
    "example": "Living in an on-campus dormitory helps freshmen make lifelong friendships easily.",
    "exampleThai": "การอาศัยในหอพักนักศึกษาในมหาวิทยาลัยช่วยให้นักศึกษาปีหนึ่งสร้างมิตรภาพตลอดชีวิตได้อย่างง่ายดาย"
  },
  {
    "id": "v_b1_edu_14",
    "word": "syllabus",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ประมวลรายวิชา",
    "alternatives": [
      "ใบแจ้งเกรด",
      "สมุดบันทึกการบ้าน",
      "ระเบียบการรับสมัคร"
    ],
    "example": "Review the course syllabus thoroughly to understand grading criteria and exam dates.",
    "exampleThai": "อ่านประมวลรายวิชาและแผนการสอนอย่างละเอียดเพื่อทำความเข้าใจเกณฑ์การให้คะแนนและวันสอบ"
  },
  {
    "id": "v_b1_edu_15",
    "word": "register",
    "pos": "v.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ลงทะเบียนเรียนรายวิชา",
    "alternatives": [
      "ถอนรายวิชา",
      "ขอจบการศึกษา",
      "ยื่นใบลาพัก"
    ],
    "example": "Undergraduates must register for their elective courses before the system closes at midnight.",
    "exampleThai": "นักศึกษาปริญญาชาติต้องลงทะเบียนเรียนรายวิชาเลือกก่อนระบบปิดทำการตอนเที่ยงคืน"
  },
  {
    "id": "v_b1_edu_16",
    "word": "deadline",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "กำหนดเวลาส่งงาน",
    "alternatives": [
      "วันเปิดภาคเรียน",
      "ตารางสอบ",
      "ชั่วโมงกิจกรรม"
    ],
    "example": "The strict assignment submission deadline is Friday at five in the afternoon sharp.",
    "exampleThai": "กำหนดเวลาส่งงานวิชาการที่เข้มงวดของการส่งงานคือวันศุกร์เวลาห้าโมงเย็นตรงเป๊ะ"
  },
  {
    "id": "v_b1_edu_17",
    "word": "discipline",
    "pos": "n.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ระเบียบวินัย",
    "alternatives": [
      "การลงโทษ",
      "การขาดเรียน",
      "การสอบตก"
    ],
    "example": "Cultivating steady self-discipline is essential for successful independent university study.",
    "exampleThai": "การปลูกฝังวินัยในการศึกษาเรียนรู้ในตนเองที่สม่ำเสมอเป็นสิ่งจำเป็นสำหรับการเรียนมหาวิทยาลัยที่ประสบความสำเร็จ"
  },
  {
    "id": "v_b1_edu_18",
    "word": "evaluate",
    "pos": "v.",
    "level": "B1",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ประเมินผล",
    "alternatives": [
      "เข้าชั้นเรียน",
      "ลงทะเบียน",
      "สอบตก"
    ],
    "example": "Professors use continuous assessment rubrics to evaluate student critical thinking skills.",
    "exampleThai": "อาจารย์ใช้เกณฑ์การประเมินแบบต่อเนื่องเพื่อประเมินผลสัมฤทธิ์ทางการเรียนด้านทักษะการคิดวิเคราะห์ของนักศึกษา"
  },
  {
    "id": "v_b2_edu_comprehend",
    "word": "comprehend",
    "pos": "v.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "เข้าใจอย่างลึกซึ้ง",
    "alternatives": [
      "เข้าใจผิดเพี้ยน",
      "มองข้ามเนื้อหา",
      "ปฏิเสธที่จะฟัง"
    ],
    "example": "Students often struggle to comprehend complex scientific texts without clear visual diagrams.",
    "exampleThai": "นักเรียนมักประสบความยากลำบากในการเข้าใจอย่างลึกซึ้งในตำราวิทยาศาสตร์ที่ซับซ้อนหากไม่มีแผนภาพประกอบที่ชัดเจน"
  },
  {
    "id": "v_b2_edu_02",
    "word": "dissertation",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ดุษฎีนิพนธ์ปริญญาเอก",
    "alternatives": [
      "รายงานการบ้านประจำสัปดาห์",
      "แบบทดสอบปลายภาค",
      "บทความหนังสือพิมพ์"
    ],
    "example": "The doctoral candidate defended her three-hundred-page dissertation before an international committee.",
    "exampleThai": "ผู้สมัครระดับปริญญาเอกได้สอบป้องกันดุษฎีนิพนธ์ปริญญาเอกความยาวสามร้อยหน้าต่อหน้าคณะกรรมการนานาชาติ"
  },
  {
    "id": "v_b2_edu_03",
    "word": "thesis",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิทยานิพนธ์ระดับบัณฑิตศึกษา",
    "alternatives": [
      "ใบรายงานผลการเรียน",
      "เอกสารประกอบการสอน",
      "สมุดจดเลกเชอร์"
    ],
    "example": "His master's thesis analyzed macroeconomic policy adjustments across emerging Asian manufacturing hubs.",
    "exampleThai": "วิทยานิพนธ์ระดับบัณฑิตศึกษาปริญญาโทของเขาวิเคราะห์การปรับนโยบายเศรษฐกิจมหภาคในศูนย์กลางการผลิตในเอเชีย"
  },
  {
    "id": "v_b2_edu_cite",
    "word": "cite",
    "pos": "v.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "อ้างอิงแหล่งที่มา",
    "alternatives": [
      "คัดลอกผลงานผู้อื่น",
      "ปลอมแปลงเอกสาร",
      "ละเลยข้อมูล"
    ],
    "example": "Always remember to cite your sources properly to avoid committing academic plagiarism.",
    "exampleThai": "อย่าลืมอ้างอิงแหล่งที่มาของข้อมูลอย่างถูกต้องเสมอเพื่อหลีกเลี่ยงการโจรกรรมผลงานทางวิชาการ"
  },
  {
    "id": "v_b2_edu_05",
    "word": "plagiarism",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "การคัดลอกผลงานหรือโจรกรรมทางวิชาการ",
    "alternatives": [
      "การอ้างอิงอย่างถูกต้อง",
      "งานวิจัยต้นฉบับแท้จริง",
      "การคิดค้นนวัตกรรมใหม่"
    ],
    "example": "Universities enforce zero-tolerance disciplinary policies against deliberate academic plagiarism.",
    "exampleThai": "มหาวิทยาลัยบังคับใช้นโยบายทางวินัยที่ไม่ยอมความเด็ดขาดต่อการคัดลอกผลงานหรือโจรกรรมทางวิชาการโดยเจตนา"
  },
  {
    "id": "v_b2_edu_06",
    "word": "prerequisite",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิชาบังคับก่อน",
    "alternatives": [
      "วิชาเลือกเสรี",
      "วิทยานิพนธ์",
      "การฝึกงาน"
    ],
    "example": "Passing introductory calculus is an essential prerequisite before enrolling in advanced thermodynamics.",
    "exampleThai": "การสอบผ่านแคลคูลัสเบื้องต้นเป็นวิชาบังคับก่อนที่ต้องสอบผ่านที่สำคัญก่อนลงทะเบียนเรียนอุณหพลศาสตร์ขั้นสูง"
  },
  {
    "id": "v_b2_edu_07",
    "word": "alumni",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ศิษย์เก่า",
    "alternatives": [
      "คณาจารย์",
      "นักศึกษาปัจจุบัน",
      "ผู้ปกครอง"
    ],
    "example": "Distinguished university alumni funded an endowment for underprivileged STEM students.",
    "exampleThai": "สมาคมศิษย์เก่าของสถาบันที่มีชื่อเสียงได้ร่วมบริจาคกองทุนเพื่อนักเรียนสาขาวิทยาศาสตร์ที่ขาดแคลนทุนทรัพย์"
  },
  {
    "id": "v_b2_edu_08",
    "word": "accreditation",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "การรับรองมาตรฐานวิทยฐานะสถาบัน",
    "alternatives": [
      "การเพิกถอนใบอนุญาต",
      "การจัดอันดับมหาวิทยาลัยไม่เป็นทางการ",
      "การประท้วงของนักศึกษา"
    ],
    "example": "The business school attained prestigious international accreditation for its MBA program.",
    "exampleThai": "คณะบริหารธุรกิจได้รับการรับรองมาตรฐานวิทยฐานะสถาบันระดับนานาชาติอันทรงเกียรติสำหรับหลักสูตรเอ็มบีเอ"
  },
  {
    "id": "v_b2_edu_09",
    "word": "methodology",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ระเบียบวิธีวิจัยทางวิชาการ",
    "alternatives": [
      "การคาดเดาส่วนบุคคล",
      "ความเชื่อโบราณ",
      "บทความวิจารณ์ทั่วไป"
    ],
    "example": "The empirical paper outlines rigorous statistical methodology used to analyze climate datasets.",
    "exampleThai": "บทความวิจัยเชิงประจักษ์สรุประเบียบวิธีวิจัยทางวิชาการทางสถิติที่เข้มงวดซึ่งใช้ในการวิเคราะห์ชุดข้อมูลสภาพภูมิอากาศ"
  },
  {
    "id": "v_b2_edu_10",
    "word": "extracurricular",
    "pos": "adj.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "กิจกรรมเสริมหลักสูตร",
    "alternatives": [
      "วิชาบังคับแกนกลาง",
      "การสอบวัดระดับมาตรฐาน",
      "การบรรยายภาคทฤษฎี"
    ],
    "example": "Active participation in extracurricular debate and sports clubs enriches university applications.",
    "exampleThai": "การมีส่วนร่วมอย่างกระตือรือร้นในกิจกรรมเสริมหลักสูตรด้านการโต้วาทีและชมรมกีฬาช่วยเพิ่มความโดดเด่นให้ใบสมัครมหาวิทยาลัย"
  },
  {
    "id": "v_b2_edu_illustrate",
    "word": "illustrate",
    "pos": "v.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ยกตัวอย่างอธิบาย",
    "alternatives": [
      "บิดเบือนข้อเท็จจริง",
      "ปกปิดหลักฐาน",
      "ทำให้สับสนงุนงง"
    ],
    "example": "The professor used real-world case studies to illustrate complex economic principles.",
    "exampleThai": "อาจารย์ใช้กรณีศึกษาในโลกแห่งความเป็นจริงเพื่อยกตัวอย่างอธิบายหลักการทางเศรษฐศาสตร์ที่ซับซ้อน"
  },
  {
    "id": "v_b2_edu_formulate",
    "word": "formulate",
    "pos": "v.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "คิดค้นกำหนดขึ้น",
    "alternatives": [
      "ลบล้างข้อเท็จจริง",
      "ลอกเลียนแบบคำตอบ",
      "ยกเลิกโครงการ"
    ],
    "example": "Researchers must formulate a testable hypothesis before conducting clinical experiments.",
    "exampleThai": "นักวิจัยต้องคิดค้นกำหนดสมมติฐานที่สามารถทดสอบได้ก่อนจะเริ่มการทดลองทางคลินิก"
  },
  {
    "id": "v_b2_edu_13",
    "word": "symposium",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "การประชุมทางวิชาการเพื่อแลกเปลี่ยนความรู้",
    "alternatives": [
      "การประกวดความสามารถดนตรี",
      "งานแสดงสินค้า",
      "การชุมนุมประท้วง"
    ],
    "example": "The international symposium on renewable biofuels brought together leading biochemists and engineers.",
    "exampleThai": "การประชุมทางวิชาการเพื่อแลกเปลี่ยนความรู้ระดับนานาชาติเรื่องเชื้อเพลิงชีวภาพหมุนเวียนได้รวบรวมนักชีวเคมีและวิศวกรชั้นนำ"
  },
  {
    "id": "v_b2_edu_analyze",
    "word": "analyze",
    "pos": "v.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "วิเคราะห์อย่างละเอียด",
    "alternatives": [
      "เดาสุ่มคำตอบ",
      "มองข้ามรายละเอียด",
      "รวบรวมแบบผิวเผิน"
    ],
    "example": "Candidates in the examination are asked to analyze historical trends from various data tables.",
    "exampleThai": "ผู้เข้าสอบถูกขอให้วิเคราะห์อย่างละเอียดเกี่ยวกับแนวโน้มทางประวัติศาสตร์จากตารางข้อมูลต่างๆ"
  },
  {
    "id": "v_b2_edu_15",
    "word": "cognition",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "กระบวนการรับรู้และคิดของสมอง",
    "alternatives": [
      "การเคลื่อนไหวของกล้ามเนื้อ",
      "การย่อยอาหารของร่างกาย",
      "การไหลเวียนโลหิต"
    ],
    "example": "Educational psychologists study how multilingual environments enhance executive human cognition.",
    "exampleThai": "นักจิตวิทยาการศึกษาศึกษาวิธีการที่สภาพแวดล้อมหลายภาษาช่วยเสริมสร้างกระบวนการรับรู้และคิดของสมองของมนุษย์"
  },
  {
    "id": "v_b2_edu_16",
    "word": "memorandum",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "บันทึกข้อตกลงความร่วมมือทางวิชาการ",
    "alternatives": [
      "ใบเสร็จชำระเงิน",
      "จดหมายตักเตือน",
      "เอกสารโฆษณา"
    ],
    "example": "The two universities signed a historic memorandum of understanding for student exchanges.",
    "exampleThai": "สองมหาวิทยาลัยได้ลงนามในบันทึกข้อตกลงความร่วมมือทางวิชาการครั้งประวัติศาสตร์เพื่อการแลกเปลี่ยนนักศึกษา"
  },
  {
    "id": "v_b2_edu_17",
    "word": "fellowship",
    "pos": "n.",
    "level": "B2",
    "category": "education-school",
    "categoryLabel": "การศึกษา & โรงเรียน",
    "thai": "ทุนวิจัย",
    "alternatives": [
      "เงินกู้ยืม",
      "ค่าธรรมเนียมหอพัก",
      "รางวัลเรียนดี"
    ],
    "example": "She was awarded an international postdoctoral research fellowship to study cancer genomics.",
    "exampleThai": "เธอได้รับรางวัลทุนทำวิจัยหลังปริญญาเอกระดับนานาชาติเพื่อศึกษาพันธุศาสตร์ของโรคมะเร็ง"
  },
  {
    "id": "v_a1_home_01",
    "word": "house",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "บ้านพักอาศัย",
    "alternatives": [
      "โรงเรียน",
      "โรงพยาบาล",
      "ห้างร้าน"
    ],
    "example": "They painted their two-story wooden family house light yellow.",
    "exampleThai": "พวกเขาทาสีบ้านพักอาศัยครอบครัวไม้สองชั้นด้วยสีเหลืองอ่อน"
  },
  {
    "id": "v_a1_home_02",
    "word": "home",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "บ้านอันอบอุ่น",
    "alternatives": [
      "ที่ทำงาน",
      "ตลาดสด",
      "สนามบิน"
    ],
    "example": "There is no place as comforting and peaceful as home.",
    "exampleThai": "ไม่มีสถานที่ใดที่ให้ความรู้สึกสบายใจและเงียบสงบเท่ากับบ้านอันอบอุ่น"
  },
  {
    "id": "v_a1_home_03",
    "word": "door",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ประตูทางเข้า",
    "alternatives": [
      "หน้าต่างกระจก",
      "หลังคาบ้าน",
      "พื้นกระเบื้อง"
    ],
    "example": "Please remember to lock the front entrance door before going to bed.",
    "exampleThai": "กรุณาอย่าลืมล็อคประตูทางเข้าบ้านด้านหน้าก่อนเข้านอน"
  },
  {
    "id": "v_a1_home_04",
    "word": "window",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "หน้าต่างกระจก",
    "alternatives": [
      "ประตูหน้าบ้าน",
      "เพดานห้อง",
      "เสาบ้าน"
    ],
    "example": "Open the bedroom window to let the fresh morning breeze circulate.",
    "exampleThai": "เปิดหน้าต่างกระจกห้องนอนเพื่อให้ลมยามเช้าอันสดชื่นพัดถ่ายเท"
  },
  {
    "id": "v_a1_home_05",
    "word": "bed",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "เตียงนอนนุ่ม",
    "alternatives": [
      "โต๊ะรับประทานอาหาร",
      "ตู้เสื้อผ้า",
      "เก้าอี้โยก"
    ],
    "example": "After a tiring long day at school, he collapsed onto his soft bed.",
    "exampleThai": "หลังจากวันที่เหน็ดเหนื่อยยาวนานที่โรงเรียน เขาก็ทิ้งตัวลงบนเตียงนอนนุ่มของเขา"
  },
  {
    "id": "v_a1_home_06",
    "word": "table",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "โต๊ะรับประทานอาหาร",
    "alternatives": [
      "ตู้กับข้าว",
      "อ่างล้างจาน",
      "โซฟานั่งเล่น"
    ],
    "example": "Our whole family gathers around the wooden table for dinner every evening.",
    "exampleThai": "ครอบครัวของเราทุกคนมารวมตัวกันรอบโต๊ะรับประทานอาหารไม้สำหรับมื้อค่ำทุกเย็น"
  },
  {
    "id": "v_a1_home_07",
    "word": "room",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ห้องส่วนตัว",
    "alternatives": [
      "หลังคา",
      "สนามหญ้า",
      "รั้วบ้าน"
    ],
    "example": "Her private study room is quiet, bright, and lined with book shelves.",
    "exampleThai": "ห้องส่วนตัวสำหรับอ่านหนังสือของเธอเงียบสงบ สว่าง และเรียงรายไปด้วยชั้นหนังสือ"
  },
  {
    "id": "v_a1_home_08",
    "word": "kitchen",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ห้องครัวประกอบอาหาร",
    "alternatives": [
      "ห้องน้ำ",
      "ห้องนอน",
      "ห้องนั่งเล่น"
    ],
    "example": "Mother is in the kitchen preparing aromatic chicken and rice for dinner.",
    "exampleThai": "คุณแม่อยู่ในห้องครัวประกอบอาหารกำลังเตรียมข้าวมันไก่หอมกรุ่นสำหรับมื้อค่ำ"
  },
  {
    "id": "v_a1_home_09",
    "word": "bedroom",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ห้องนอนพักผ่อน",
    "alternatives": [
      "ห้องครัว",
      "ห้องซักรีด",
      "โรงจอดรถ"
    ],
    "example": "He keeps his cozy upstairs bedroom tidy and organized neatly.",
    "exampleThai": "เขาดูแลห้องนอนพักผ่อนชั้นบนอันแสนอบอุ่นให้สะอาดและเป็นระเบียบเรียบร้อย"
  },
  {
    "id": "v_a1_home_10",
    "word": "bathroom",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ห้องน้ำชำระล้าง",
    "alternatives": [
      "ห้องเก็บของ",
      "ห้องทำงาน",
      "ระเบียง"
    ],
    "example": "Wash your hands thoroughly at the sink inside the clean bathroom.",
    "exampleThai": "ล้างมือของคุณให้สะอาดหมดจดที่อ่างล้างมือภายในห้องน้ำชำระล้างที่สะอาด"
  },
  {
    "id": "v_a1_home_11",
    "word": "morning",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ยามเช้าตรู่",
    "alternatives": [
      "ยามบ่ายคล้อย",
      "ยามค่ำคืน",
      "เวลาเที่ยงวัน"
    ],
    "example": "The rooster crows loudly outside in the cool fresh morning.",
    "exampleThai": "ไก่ขันเสียงดังอยู่ข้างนอกในยามเช้าตรู่อันเย็นสดชื่น"
  },
  {
    "id": "v_a1_home_12",
    "word": "night",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ยามค่ำคืน",
    "alternatives": [
      "ยามเช้าตรู่",
      "ตอนกลางวัน",
      "ยามบ่าย"
    ],
    "example": "Stars shine brightly in the dark sky as peaceful night falls over the village.",
    "exampleThai": "ดวงดาวส่องประกายสุกสว่างบนท้องฟ้ามืดเมื่อยามค่ำคืนอันเงียบสงบมาเยือนหมู่บ้าน"
  },
  {
    "id": "v_a1_home_13",
    "word": "wake",
    "pos": "v.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ตื่นจากนิทรา",
    "alternatives": [
      "ผล็อยหลับไป",
      "นอนกรน",
      "ฝันกลางวัน"
    ],
    "example": "I usually wake up at six-thirty every morning to prepare for school.",
    "exampleThai": "ฉันมักจะตื่นจากนิทราตอนหกโมงครึ่งทุกเช้าเพื่อเตรียมตัวไปโรงเรียน"
  },
  {
    "id": "v_a1_home_14",
    "word": "sleep",
    "pos": "v.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "นอนหลับสนิท",
    "alternatives": [
      "ตื่นตัวทำงาน",
      "ออกกำลังกาย",
      "อ่านหนังสือ"
    ],
    "example": "Turn off bright overhead lights so you can sleep peacefully all night.",
    "exampleThai": "ปิดไฟสว่างบนเพดานเพื่อให้คุณสามารถนอนหลับสนิทได้อย่างสงบตลอดคืน"
  },
  {
    "id": "v_a1_home_15",
    "word": "eat",
    "pos": "v.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "รับประทานอาหาร",
    "alternatives": [
      "ปรุงอาหาร",
      "ล้างจานชาม",
      "เก็บกวาดโต๊ะ"
    ],
    "example": "Children sit politely at the breakfast counter to eat warm toast and eggs.",
    "exampleThai": "เด็กๆ นั่งอย่างสุภาพที่เคาน์เตอร์อาหารเช้าเพื่อรับประทานอาหารขนมปังปิ้งและไข่ดาวอุ่นๆ"
  },
  {
    "id": "v_a1_home_16",
    "word": "drink",
    "pos": "v.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ดื่มน้ำสะอาด",
    "alternatives": [
      "เคี้ยวกลืนอาหาร",
      "บ้วนปาก",
      "เทน้ำทิ้ง"
    ],
    "example": "Remember to drink a large glass of pure water upon waking up.",
    "exampleThai": "อย่าลืมดื่มน้ำสะอาดหนึ่งแก้วใหญ่ทันทีที่ตื่นนอน"
  },
  {
    "id": "v_a1_home_17",
    "word": "wash",
    "pos": "v.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ล้างทำความสะอาด",
    "alternatives": [
      "ทำเปรอะเปื้อน",
      "ขยี้ตา",
      "สวมใส่เสื้อ"
    ],
    "example": "Wash your face with gentle foaming cleanser and cool water.",
    "exampleThai": "ล้างทำความสะอาดใบหน้าของคุณด้วยโฟมล้างหน้าสูตรอ่อนโยนและน้ำเย็น"
  },
  {
    "id": "v_a1_home_18",
    "word": "clean",
    "pos": "v.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ทำความสะอาดบ้าน",
    "alternatives": [
      "ทำเลอะเทอะ",
      "รื้อค้นสิ่งของ",
      "สะสมขยะ"
    ],
    "example": "We spend Saturday mornings together to clean and dust the living room.",
    "exampleThai": "พวกเราใช้เวลาเช้าวันเสาร์ร่วมกันเพื่อทำความสะอาดบ้านและปัดฝุ่นห้องนั่งเล่น"
  },
  {
    "id": "v_a1_home_19",
    "word": "key",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ลูกกุญแจไขบ้าน",
    "alternatives": [
      "แม่กุญแจ",
      "โซ่คล้องประตู",
      "กลอนประตู"
    ],
    "example": "She keeps her brass front door house key securely attached to her keyring.",
    "exampleThai": "เธอเก็บลูกกุญแจไขบ้านประตูหน้าทองเหลืองไว้อย่างปลอดภัยบนพวงกุญแจ"
  },
  {
    "id": "v_a1_home_20",
    "word": "light",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "แสงสว่างจากหลอดไฟ",
    "alternatives": [
      "ความมืดมิด",
      "หมอกควัน",
      "เงาดำ"
    ],
    "example": "Switch off the reading desk light to conserve electricity when leaving.",
    "exampleThai": "ปิดแสงสว่างจากหลอดไฟโต๊ะอ่านหนังสือเพื่อประหยัดไฟฟ้าเมื่อออกจากห้อง"
  },
  {
    "id": "v_a1_home_21",
    "word": "clock",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "นาฬิกาบอกเวลา",
    "alternatives": [
      "ปฏิทินติดผนัง",
      "เทอร์โมมิเตอร์",
      "กระจกเงา"
    ],
    "example": "The ticking wall clock in the kitchen chimed precisely at noon.",
    "exampleThai": "นาฬิกาบอกเวลาติดผนังในห้องครัวส่งเสียงดังบอกเวลาตอนเที่ยงวันตรงเป๊ะ"
  },
  {
    "id": "v_a1_home_22",
    "word": "soap",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "สบู่ทำความสะอาด",
    "alternatives": [
      "ยาสีฟัน",
      "แชมพูสระผม",
      "ครีมนวด"
    ],
    "example": "Wash hands with antibacterial scented soap to banish germs.",
    "exampleThai": "ล้างมือด้วยสบู่ทำความสะอาดที่มีกลิ่นหอมและฆ่าเชื้อแบคทีเรียเพื่อกำจัดเชื้อโรค"
  },
  {
    "id": "v_a1_home_23",
    "word": "towel",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ผ้าขนหนูเช็ดตัว",
    "alternatives": [
      "พรมเช็ดเท้า",
      "ผ้าปูที่นอน",
      "ปลอกหมอน"
    ],
    "example": "Hang your damp cotton bath towel on the rack to dry thoroughly.",
    "exampleThai": "แขวนผ้าขนหนูเช็ดตัวผ้าฝ้ายที่เปียกชื้นบนราวแขวนเพื่อให้แห้งสนิท"
  },
  {
    "id": "v_a1_home_24",
    "word": "clothes",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "เสื้อผ้า",
    "alternatives": [
      "รองเท้าหนัง",
      "ผ้าปูที่นอน",
      "ผ้าม่าน"
    ],
    "example": "Fold your clean washed clothes neatly into the wooden closet drawers.",
    "exampleThai": "พับเสื้อผ้าเครื่องแต่งกายที่ซักสะอาดแล้วอย่างเป็นระเบียบลงในลิ้นชักตู้ไม้"
  },
  {
    "id": "v_a1_home_25",
    "word": "mirror",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "กระจกเงาส่องหน้า",
    "alternatives": [
      "กรอบรูปภาพ",
      "กระจกหน้าต่าง",
      "เลนส์กล้อง"
    ],
    "example": "He checked his collar and brushed his hair in front of the bathroom mirror.",
    "exampleThai": "เขาตรวจดูปกเสื้อและหวีผมต่อหน้ากระจกเงาส่องหน้าในห้องน้ำ"
  },
  {
    "id": "v_a1_home_26",
    "word": "family",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ครอบครัว",
    "alternatives": [
      "เพื่อนร่วมงาน",
      "เพื่อนบ้าน",
      "คนแปลกหน้า"
    ],
    "example": "Spending quality weekend time with family creates cherished lifetime memories.",
    "exampleThai": "การใช้เวลาวันหยุดสุดสัปดาห์ที่มีคุณภาพกับครอบครัวอันเป็นที่รักสร้างความทรงจำที่น่าประทับใจไปตลอดชีวิต"
  },
  {
    "id": "v_a1_home_27",
    "word": "mother",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "คุณแม่",
    "alternatives": [
      "คุณครู",
      "คุณยาย",
      "พี่สาว"
    ],
    "example": "My mother packed a delicious lunchbox of fried rice and sliced fruit.",
    "exampleThai": "คุณแม่ของฉันเตรียมกล่องอาหารกลางวันแสนอร่อยเป็นข้าวผัดและผลไม้หั่นชิ้น"
  },
  {
    "id": "v_a1_home_28",
    "word": "father",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "คุณพ่อ",
    "alternatives": [
      "คุณลุง",
      "คุณปู่",
      "พี่ชาย"
    ],
    "example": "My father showed me how to plant aromatic basil seedlings in the garden.",
    "exampleThai": "คุณพ่อของฉันสอนวิธีปลูกต้นกล้าโหระพาหอมในสวนให้ฉันดู"
  },
  {
    "id": "v_a1_home_29",
    "word": "sister",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "พี่สาวหรือน้องสาว",
    "alternatives": [
      "ลูกพี่ลูกน้องชาย",
      "เพื่อนสนิท",
      "เพื่อนบ้าน"
    ],
    "example": "My older sister helps me review English grammar exercises after school.",
    "exampleThai": "พี่สาวหรือน้องสาวของฉันช่วยฉันทบทวนแบบฝึกหัดไวยากรณ์ภาษาอังกฤษหลังเลิกเรียน"
  },
  {
    "id": "v_a1_home_30",
    "word": "brother",
    "pos": "n.",
    "level": "A1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "พี่ชายหรือน้องชาย",
    "alternatives": [
      "คุณน้าชาย",
      "คุณตา",
      "ครูผู้สอน"
    ],
    "example": "My younger brother loves kicking a soccer ball around our front lawn.",
    "exampleThai": "พี่ชายหรือน้องชายของฉันชอบเตะลูกฟุตบอลไปรอบๆ สนามหญ้าหน้าบ้าน"
  },
  {
    "id": "v_a2_home_01",
    "word": "balcony",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ระเบียงกลางแจ้ง",
    "alternatives": [
      "ห้องใต้ดิน",
      "โรงรถ",
      "ห้องเก็บของ"
    ],
    "example": "We grow fragrant jasmine and colorful orchids in clay pots on our balcony.",
    "exampleThai": "พวกเราปลูกมะลิหอมและกล้วยไม้หลากสีสันในกระถางดินเผาบนระเบียงกลางแจ้ง"
  },
  {
    "id": "v_a2_home_02",
    "word": "blanket",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ผ้าห่มกันหนาว",
    "alternatives": [
      "ผ้าปูโต๊ะ",
      "ผ้าม่าน",
      "พรมเช็ดเท้า"
    ],
    "example": "Pull up the thick fleece blanket to stay warm on chilly winter nights.",
    "exampleThai": "ดึงผ้าห่มกันหนาวฟลีซหนานุ่มขึ้นมาคลุมเพื่อให้อบอุ่นในคืนฤดูหนาวที่อากาศเย็นเฉียบ"
  },
  {
    "id": "v_a2_home_03",
    "word": "pillow",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "หมอนหนุนนอน",
    "alternatives": [
      "ที่นอน",
      "ผ้าปูที่นอน",
      "ผ้านวม"
    ],
    "example": "Rest your tired head on this supportive ergonomic memory foam pillow.",
    "exampleThai": "วางศีรษะที่เมื่อยล้าของคุณลงบนหมอนหนุนนอนเมมโมรีโฟมเพื่อสุขภาพใบนี้"
  },
  {
    "id": "v_a2_home_04",
    "word": "wardrobe",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ตู้เสื้อผ้าไม้",
    "alternatives": [
      "ชั้นวางรองเท้า",
      "โต๊ะเครื่องแป้ง",
      "ตู้หนังสือ"
    ],
    "example": "Hang ironed collared shirts neatly on wooden hangers inside the wardrobe.",
    "exampleThai": "แขวนเสื้อเชิ้ตมีปกที่รีดแล้วอย่างเรียบร้อยบนไม้แขวนเสื้อไม้ในตู้เสื้อผ้าไม้"
  },
  {
    "id": "v_a2_home_05",
    "word": "curtain",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ผ้าม่านหน้าต่าง",
    "alternatives": [
      "มู่ลี่เหล็ก",
      "กระจกติดฟิล์ม",
      "บานเกล็ดไม้"
    ],
    "example": "Draw the thick blackout curtains to block harsh afternoon sunlight completely.",
    "exampleThai": "รูดผ้าม่านหน้าต่างกันแสงแบบหนาเพื่อกันแสงแดดยามบ่ายที่แผดเผาอย่างสมบูรณ์"
  },
  {
    "id": "v_a2_home_06",
    "word": "appliance",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "เครื่องใช้ไฟฟ้าในบ้าน",
    "alternatives": [
      "เฟอร์นิเจอร์ไม้",
      "ของตกแต่งบ้าน",
      "เครื่องครัวพลาสติก"
    ],
    "example": "Energy-saving home appliances significantly reduce monthly household electricity bills.",
    "exampleThai": "เครื่องใช้ไฟฟ้าในบ้านที่ประหยัดพลังงานช่วยลดค่าไฟฟ้าประจำเดือนของครัวเรือนได้อย่างมาก"
  },
  {
    "id": "v_a2_home_07",
    "word": "microwave",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "เตาอบไมโครเวฟ",
    "alternatives": [
      "เตาแก๊สหัวคู่",
      "เตาอบลมร้อน",
      "หม้อหุงข้าว"
    ],
    "example": "Reheat the leftover vegetable soup in the microwave for two quick minutes.",
    "exampleThai": "อุ่นซุปผักที่เหลือในเตาอบไมโครเวฟเป็นเวลาสองนาทีอย่างรวดเร็ว"
  },
  {
    "id": "v_a2_home_08",
    "word": "fridge",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ตู้เย็นเก็บความสด",
    "alternatives": [
      "ตู้เก็บของแห้ง",
      "เตาอบไฟฟ้า",
      "เครื่องล้างจาน"
    ],
    "example": "Store fresh milk, butter, and raw vegetables inside the chilled fridge.",
    "exampleThai": "เก็บนมสด เนย และผักสดไว้ภายในตู้เย็นเก็บความสดที่เย็นฉ่ำ"
  },
  {
    "id": "v_a2_home_09",
    "word": "kettle",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "กาต้มน้ำร้อนไฟฟ้า",
    "alternatives": [
      "เครื่องปั่นผลไม้",
      "เครื่องชงกาแฟดริป",
      "หม้อตุ๋นยาจีน"
    ],
    "example": "Fill the stainless steel kettle with filtered water to make hot morning tea.",
    "exampleThai": "เติมน้ำกรองลงในกาต้มน้ำร้อนไฟฟ้าสแตนเลสเพื่อชงชาร้อนยามเช้า"
  },
  {
    "id": "v_a2_home_10",
    "word": "vacuum",
    "pos": "v.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ดูดฝุ่นทำความสะอาด",
    "alternatives": [
      "ถูพื้นด้วยน้ำ",
      "ขัดพื้นด้วยแปรง",
      "กวาดด้วยไม้กวาด"
    ],
    "example": "Remember to vacuum the living room carpets thoroughly every weekend.",
    "exampleThai": "อย่าลืมดูดฝุ่นทำความสะอาดพรมในห้องนั่งเล่นอย่างทั่วถึงในทุกวันหยุดสุดสัปดาห์"
  },
  {
    "id": "v_a2_home_11",
    "word": "iron",
    "pos": "v.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "รีดผ้าให้เรียบ",
    "alternatives": [
      "ซักผ้าด้วยมือ",
      "ตากผ้าแดดเดียว",
      "พับเก็บใส่ตู้"
    ],
    "example": "I will iron my school uniform shirts while listening to the evening news.",
    "exampleThai": "ฉันจะรีดผ้าให้เรียบสำหรับเสื้อเครื่องแบบนักเรียนขณะรับฟังข่าวค่ำ"
  },
  {
    "id": "v_a2_home_12",
    "word": "broom",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ไม้กวาดทำความสะอาด",
    "alternatives": [
      "ที่โกยผง",
      "ไม้ม็อบถูพื้น",
      "แปรงขัดห้องน้ำ"
    ],
    "example": "Use the soft grass broom to sweep fallen leaves off the front veranda.",
    "exampleThai": "ใช้ไม้กวาดทำความสะอาดดอกหญ้าเนื้อนุ่มกวาดใบไม้ร่วงออกจากเฉลียงหน้าบ้าน"
  },
  {
    "id": "v_a2_home_13",
    "word": "trash",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ขยะมูลฝอยครัวเรือน",
    "alternatives": [
      "สิ่งของรีไซเคิล",
      "ปุ๋ยหมักธรรมชาติ",
      "ของสะสมเก่า"
    ],
    "example": "Tie the plastic rubbish bag tightly and take out the household trash.",
    "exampleThai": "มัดปากถุงขยะพลาสติกให้แน่นหนาและนำขยะมูลฝอยครัวเรือนออกไปทิ้งข้างนอก"
  },
  {
    "id": "v_a2_home_14",
    "word": "routine",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "กิจวัตรประจำวัน",
    "alternatives": [
      "วันหยุดพิเศษ",
      "การท่องเที่ยว",
      "เหตุฉุกเฉิน"
    ],
    "example": "A predictable morning routine of meditation and stretching starts the day well.",
    "exampleThai": "กิจวัตรประจำวันที่ทำสม่ำเสมอในยามเช้าด้วยการทำสมาธิและยืดเหยียดเริ่มต้นวันได้อย่างยอดเยี่ยม"
  },
  {
    "id": "v_a2_home_15",
    "word": "laundry",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "งานซักรีดเสื้อผ้า",
    "alternatives": [
      "การล้างจานชาม",
      "การขัดห้องน้ำ",
      "การทำอาหาร"
    ],
    "example": "Sunday afternoons are reserved for washing, drying, and folding family laundry.",
    "exampleThai": "ช่วงบ่ายวันอาทิตย์ถูกจัดไว้สำหรับงานซัก ตาก และพับงานซักรีดเสื้อผ้าของครอบครัว"
  },
  {
    "id": "v_a2_home_16",
    "word": "shower",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "การอาบน้ำฝักบัว",
    "alternatives": [
      "การแช่อ่างน้ำร้อน",
      "การล้างมือ",
      "การสระผม"
    ],
    "example": "Taking a refreshing cool shower invigorates you after a sweaty afternoon run.",
    "exampleThai": "การอาบน้ำฝักบัวเย็นๆ ช่วยเติมความสดชื่นให้คุณหลังจากการวิ่งยามบ่ายที่เหงื่อท่วมตัว"
  },
  {
    "id": "v_a2_home_17",
    "word": "neighbor",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "เพื่อนบ้านใกล้เคียง",
    "alternatives": [
      "คนแปลกหน้า",
      "ผู้มาเยือนจากแดนไกล",
      "ผู้ร่วมงาน"
    ],
    "example": "Our friendly neighbor waters our balcony garden plants whenever we travel.",
    "exampleThai": "เพื่อนบ้านใกล้เคียงผู้มีน้ำใจช่วยรดน้ำต้นไม้ที่ระเบียงให้เราทุกครั้งที่เราเดินทาง"
  },
  {
    "id": "v_a2_home_18",
    "word": "garden",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "สวนหย่อมรอบบ้าน",
    "alternatives": [
      "ลานจอดรถคอนกรีต",
      "ดาดฟ้าตึก",
      "ห้องเก็บของ"
    ],
    "example": "We planted sweet papayas, lemongrass, and red chili peppers in our garden.",
    "exampleThai": "พวกเราปลูกมะละกอหวาน ตะไคร้ และพริกขี้หนูสีแดงไว้ในสวนหย่อมรอบบ้านของเรา"
  },
  {
    "id": "v_a2_home_19",
    "word": "roof",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "หลังคาบ้าน",
    "alternatives": [
      "ฐานรากบ้าน",
      "พื้นชั้นล่าง",
      "ผนังกำแพง"
    ],
    "example": "Rainwater dripped rhythmically onto the sturdy corrugated zinc roof.",
    "exampleThai": "น้ำฝนหยดเป็นจังหวะลงบนหลังคาบ้านสังกะสีลูกฟูกที่ทนทาน"
  },
  {
    "id": "v_a2_home_20",
    "word": "stairs",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "บันไดบ้าน",
    "alternatives": [
      "ลิฟต์โดยสาร",
      "ทางลาดคนพิการ",
      "ระเบียงทางเดิน"
    ],
    "example": "Hold the wooden handrail carefully while descending the polished wooden stairs.",
    "exampleThai": "จับราวบันไดไม้อย่างระมัดระวังขณะเดินลงบันไดบ้านไม้ที่ขัดเงา"
  },
  {
    "id": "v_a2_home_21",
    "word": "ceiling",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "เพดานห้อง",
    "alternatives": [
      "พื้นห้อง",
      "ผนังห้อง",
      "บานประตู"
    ],
    "example": "An oscillating ceiling fan circulates cool air throughout the high-ceilinged room.",
    "exampleThai": "พัดลมเพดานห้องแบบหมุนส่ายช่วยพัดให้อากาศเย็นถ่ายเททั่วห้องที่มีเพดานสูง"
  },
  {
    "id": "v_a2_home_22",
    "word": "floor",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "พื้นบ้านปูกระเบื้อง",
    "alternatives": [
      "เพดานห้อง",
      "ขอบหน้าต่าง",
      "โครงหลังคา"
    ],
    "example": "Mop the ceramic tile kitchen floor with disinfectant to remove cooking grease.",
    "exampleThai": "ถูพื้นบ้านปูกระเบื้องเซรามิกในห้องครัวด้วยน้ำยาฆ่าเชื้อเพื่อขจัดคราบไขมันจากการทำอาหาร"
  },
  {
    "id": "v_a2_home_23",
    "word": "repair",
    "pos": "v.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ซ่อมแซมสิ่งของชำรุด",
    "alternatives": [
      "ทำลายทิ้ง",
      "ซื้อใหม่ทันที",
      "เพิกเฉยทิ้งไว้"
    ],
    "example": "Grandpa used wood glue and clamps to repair the wobbly rocking chair leg.",
    "exampleThai": "คุณปู่ใช้กาวติดไม้และตัวหนีบเพื่อซ่อมแซมสิ่งของชำรุดขาเก้าอี้โยกที่โยกเยก"
  },
  {
    "id": "v_a2_home_24",
    "word": "tidy",
    "pos": "v.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "จัดข้าวของให้เป็นระเบียบ",
    "alternatives": [
      "รื้อค้นกระจัดกระจาย",
      "ทำรกรุงรัง",
      "กองสุมไว้"
    ],
    "example": "Children must tidy up their toys and storybooks before going to sleep.",
    "exampleThai": "เด็กๆ ต้องจัดข้าวของให้เป็นระเบียบสำหรับของเล่นและหนังสือนิทานก่อนเข้านอน"
  },
  {
    "id": "v_a2_home_25",
    "word": "cozy",
    "pos": "adj.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "อบอุ่นสบายผ่อนคลาย",
    "alternatives": [
      "หนาวเหน็บคับแคบ",
      "อึดอัดไม่น่าอยู่",
      "วุ่นวายเสียงดัง"
    ],
    "example": "The small living room felt cozy with its warm amber lighting and thick rugs.",
    "exampleThai": "ห้องนั่งเล่นขนาดเล็กให้ความรู้สึกอบอุ่นสบายผ่อนคลายด้วยแสงไฟสีอำพันนวลตาและพรมหนานุ่ม"
  },
  {
    "id": "v_a2_home_26",
    "word": "comfortable",
    "pos": "adj.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "สะดวกสบายไม่เมื่อย",
    "alternatives": [
      "แข็งกระด้างปวดหลัง",
      "คับแคบอึดอัด",
      "ทรมาน"
    ],
    "example": "This wide fabric armchair is remarkably comfortable for reading afternoon novels.",
    "exampleThai": "เก้าอี้เท้าแขนบุผ้าตัวกว้างนี้สะดวกสบายไม่เมื่อยอย่างยิ่งสำหรับการนั่งอ่านนิยายยามบ่าย"
  },
  {
    "id": "v_a2_home_27",
    "word": "chore",
    "pos": "n.",
    "level": "A2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "งานบ้าน",
    "alternatives": [
      "การบ้านวิชาคณิต",
      "งานเลี้ยงสังสรรค์",
      "การนอนหลับ"
    ],
    "example": "Washing the dinner dishes and taking out rubbish are my evening household chores.",
    "exampleThai": "การล้างจานมื้อค่ำและการนำขยะออกไปทิ้งเป็นงานบ้านงานเรือนประจำวันช่วงเย็นของฉัน"
  },
  {
    "id": "v_b1_home_01",
    "word": "maintenance",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "การบำรุงรักษา",
    "alternatives": [
      "การรื้อถอนทิ้ง",
      "การปล่อยให้ทรุดโทรม",
      "การสร้างใหม่หมด"
    ],
    "example": "Routine roof and pipe maintenance prevents costly domestic water leak damages.",
    "exampleThai": "การซ่อมบำรุงรักษาอาคารสำหรับหลังคาและท่อน้ำเป็นประจำช่วยป้องกันความเสียหายจากน้ำรั่วในบ้านที่ต้องจ่ายแพง"
  },
  {
    "id": "v_b1_home_02",
    "word": "renovation",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "การปรับปรุงซ่อมแซม",
    "alternatives": [
      "การรื้อถอนทำลาย",
      "การขายทอดตลาด",
      "การปล่อยให้รกร้าง"
    ],
    "example": "The kitchen renovation transformed the cramped space into a bright, open cooking hub.",
    "exampleThai": "การปรับปรุงตกแต่งบ้านใหม่ในห้องครัวเปลี่ยนพื้นที่คับแคบให้กลายเป็นศูนย์กลางการทำอาหารที่สว่างและเปิดโล่ง"
  },
  {
    "id": "v_b1_home_03",
    "word": "inhabitant",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ผู้อยู่อาศัย",
    "alternatives": [
      "ผู้มาเยือนชั่วคราว",
      "นายหน้าอสังหา",
      "ช่างก่อสร้าง"
    ],
    "example": "Every inhabitant in the residential apartment block must follow communal recycling guidelines.",
    "exampleThai": "ผู้อยู่อาศัยในบ้านเรือนทุกคนในอาคารอพาร์ตเมนต์ต้องปฏิบัติตามแนวทางการรีไซเคิลของส่วนรวม"
  },
  {
    "id": "v_b1_home_04",
    "word": "electricity",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ระบบพลังงานไฟฟ้า",
    "alternatives": [
      "ระบบแก๊สหุงต้ม",
      "ท่อระบายน้ำทิ้ง",
      "สัญญาณวิทยุ"
    ],
    "example": "Rooftop solar panels generate green electricity to power household air conditioners.",
    "exampleThai": "แผงโซลาร์เซลล์บนหลังคาผลิตระบบพลังงานไฟฟ้าสะอาดเพื่อจ่ายไฟให้เครื่องปรับอากาศในบ้าน"
  },
  {
    "id": "v_b1_home_05",
    "word": "plumbing",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ระบบท่อประปาสุขาภิบาล",
    "alternatives": [
      "ระบบสายไฟบ้าน",
      "โครงสร้างคานไม้",
      "ฉนวนกันเสียง"
    ],
    "example": "A certified technician inspected the copper bathroom plumbing for corrosion leaks.",
    "exampleThai": "ช่างเทคนิคที่ได้รับการรับรองตรวจสอบระบบท่อประปาสุขาภิบาลทองแดงในห้องน้ำเพื่อหารอยรั่วจากการกัดกร่อน"
  },
  {
    "id": "v_b1_home_06",
    "word": "tenant",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ผู้เช่าพักอาศัย",
    "alternatives": [
      "เจ้าของห้องชุด",
      "นิติบุคคลอาคาร",
      "ผู้ตรวจสอบอาคาร"
    ],
    "example": "The reliable tenant paid her monthly rent promptly on the first of each month.",
    "exampleThai": "ผู้เช่าพักอาศัยที่น่าเชื่อถือจ่ายค่าเช่ารายเดือนตรงเวลาในวันที่หนึ่งของทุกเดือน"
  },
  {
    "id": "v_b1_home_07",
    "word": "landlord",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "เจ้าของบ้านเช่า",
    "alternatives": [
      "ผู้เช่าอาศัย",
      "คนดูแลสวน",
      "เจ้าหน้าที่รักษาความปลอดภัย"
    ],
    "example": "The courteous landlord promptly arranged a plumber to fix the kitchen drain.",
    "exampleThai": "เจ้าของบ้านผู้ให้เช่าผู้สุภาพรีบจัดหาช่างประปามาซ่อมท่อระบายน้ำในครัวทันที"
  },
  {
    "id": "v_b1_home_08",
    "word": "lease",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "สัญญาเช่าที่พักอาศัย",
    "alternatives": [
      "โฉนดที่ดิน",
      "ใบอนุญาตก่อสร้าง",
      "ใบเสร็จค่าส่วนกลาง"
    ],
    "example": "They signed a twelve-month residential apartment lease with an option to renew.",
    "exampleThai": "พวกเขาลงนามในสัญญาเช่าที่พักอาศัยอพาร์ตเมนต์สิบสองเดือนพร้อมสิทธิ์เลือกต่อสัญญา"
  },
  {
    "id": "v_b1_home_09",
    "word": "residential",
    "pos": "adj.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "เกี่ยวกับย่านพักอาศัย",
    "alternatives": [
      "เกี่ยวกับเขตอุตสาหกรรม",
      "เกี่ยวกับย่านธุรกิจการค้า",
      "เกี่ยวกับพื้นที่เกษตร"
    ],
    "example": "Commercial noisy factories are strictly banned inside quiet residential neighborhoods.",
    "exampleThai": "โรงงานที่มีเสียงดังเชิงพาณิชย์ถูกสั่งห้ามเด็ดขาดภายในเกี่ยวกับย่านพักอาศัยอันเงียบสงบ"
  },
  {
    "id": "v_b1_home_maintain",
    "word": "maintain",
    "pos": "v.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ดูแลบำรุงรักษา",
    "alternatives": [
      "ปล่อยให้ทรุดโทรม",
      "ทอดทิ้งบ้านเรือน",
      "ทำลายข้าวของ"
    ],
    "example": "Homeowners need to regularly maintain their water filters and air conditioning units.",
    "exampleThai": "เจ้าของบ้านจำเป็นต้องดูแลบำรุงรักษาเครื่องกรองน้ำและเครื่องปรับอากาศอย่างสม่ำเสมอ"
  },
  {
    "id": "v_b1_home_11",
    "word": "decoration",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "การตกแต่งประดับประดาบ้าน",
    "alternatives": [
      "การรื้อถอนคาน",
      "การปูกระเบื้องมุงหลังคา",
      "การวางท่อระบายน้ำ"
    ],
    "example": "Woven tapestries and potted green ferns add natural warmth to home interior decoration.",
    "exampleThai": "พรมทอแขวนผนังและเฟิร์นเขียวในกระถางช่วยเพิ่มความอบอุ่นตามธรรมชาติให้การตกแต่งประดับประดาบ้านภายใน"
  },
  {
    "id": "v_b1_home_12",
    "word": "neighborhood",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ชุมชนละแวกบ้าน",
    "alternatives": [
      "ป่าสงวนแห่งชาติ",
      "พื้นที่ห่างไกลความเจริญ",
      "เขตทหาร"
    ],
    "example": "Our safe suburban neighborhood organized a friendly weekend community flea market.",
    "exampleThai": "ชุมชนละแวกบ้านชานเมืองที่ปลอดภัยของเราจัดตลาดนัดชุมชนสุดสัปดาห์อันเป็นกันเอง"
  },
  {
    "id": "v_b1_home_13",
    "word": "utilities",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ค่าสาธารณูปโภคน้ำไฟ",
    "alternatives": [
      "ค่าเช่าห้องพื้นฐาน",
      "เงินมัดจำล่วงหน้า",
      "ค่าเฟอร์นิเจอร์"
    ],
    "example": "The monthly apartment rent excludes basic household utilities like water and electricity.",
    "exampleThai": "ค่าเช่าอพาร์ตเมนต์รายเดือนไม่รวมค่าสาธารณูปโภคน้ำไฟพื้นฐานของครัวเรือน เช่น ค่าน้ำและค่าไฟฟ้า"
  },
  {
    "id": "v_b1_home_14",
    "word": "insulation",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ฉนวนกันความร้อนใต้หลังคา",
    "alternatives": [
      "รางระบายน้ำฝน",
      "เสาเข็มคอนกรีต",
      "บานพับหน้าต่าง"
    ],
    "example": "Installing fiberglass ceiling insulation reduces attic heat buildup significantly.",
    "exampleThai": "การติดตั้งฉนวนกันความร้อนใต้หลังคาไฟเบอร์กลาสช่วยลดการสะสมความร้อนใต้หลังคาได้อย่างมาก"
  },
  {
    "id": "v_b1_home_15",
    "word": "ventilation",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ระบบการระบายถ่ายเทอากาศ",
    "alternatives": [
      "ระบบทำความร้อน",
      "การปิดห้องทึบ",
      "การกั้นห้องกระจก"
    ],
    "example": "Proper natural ventilation prevents damp mold spores from colonizing bathroom walls.",
    "exampleThai": "ระบบการระบายถ่ายเทอากาศตามธรรมชาติที่เหมาะสมช่วยป้องกันสปอร์เชื้อราไม่ให้เกาะผนังห้องน้ำ"
  },
  {
    "id": "v_b1_home_16",
    "word": "lifestyle",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "วิถีการดำเนินชีวิต",
    "alternatives": [
      "ฐานะทางกฎหมาย",
      "พันธุกรรม",
      "สัญชาติตามกำเนิด"
    ],
    "example": "Adopting an active outdoor lifestyle enhances both cardiovascular health and mental vitality.",
    "exampleThai": "การเลือกใช้วิถีการดำเนินชีวิตกลางแจ้งที่กระฉับกระเฉงช่วยเสริมสร้างทั้งสุขภาพหัวใจและความแจ่มใสของจิตใจ"
  },
  {
    "id": "v_b1_home_17",
    "word": "spacious",
    "pos": "adj.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "กว้างขวางโปร่งสบาย",
    "alternatives": [
      "คับแคบอึดอัด",
      "มืดทึบ",
      "แออัดยัดเยียด"
    ],
    "example": "The condominium unit features high ceilings and a wonderfully spacious open living room.",
    "exampleThai": "ห้องชุดคอนโดมิเนียมมีเพดานสูงและห้องนั่งเล่นแบบเปิดโล่งที่กว้างขวางโปร่งสบายอย่างยิ่ง"
  },
  {
    "id": "v_b1_home_18",
    "word": "clutter",
    "pos": "n.",
    "level": "B1",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "สิ่งของเกะกะ",
    "alternatives": [
      "ความเป็นระเบียบเรียบร้อย",
      "ความว่างเปล่าสะอาดตา",
      "ความสมมาตร"
    ],
    "example": "Clearing desk clutter creates a serene and productive home office environment.",
    "exampleThai": "การเคลียร์สิ่งของเกะกะระเกะระกะบนโต๊ะสร้างสภาพแวดล้อมโฮมออฟฟิศที่สงบและทำงานได้มีประสิทธิภาพ"
  },
  {
    "id": "v_b2_home_accommodate",
    "word": "accommodate",
    "pos": "v.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "จัดที่พักให้",
    "alternatives": [
      "ขับไล่ออกจากที่",
      "ปฏิเสธไม่รับ",
      "รื้อถอนทำลาย"
    ],
    "example": "The newly renovated building can accommodate up to one hundred residents comfortably.",
    "exampleThai": "อาคารที่เพิ่งปรับปรุงใหม่สามารถจัดที่พักรองรับผู้อยู่อาศัยได้มากถึงหนึ่งร้อยคนอย่างสะดวกสบาย"
  },
  {
    "id": "v_b2_home_02",
    "word": "architecture",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "สถาปัตยกรรมการออกแบบอาคาร",
    "alternatives": [
      "จิตรกรรมฝาผนัง",
      "ประติมากรรมหินอ่อน",
      "วรรณกรรมร้อยแก้ว"
    ],
    "example": "Traditional Thai timber architecture incorporates elevated stilts to survive annual seasonal monsoon inundation.",
    "exampleThai": "สถาปัตยกรรมการออกแบบอาคารไม้แบบดั้งเดิมของไทยใช้เสายกสูงเพื่อให้อยู่รอดจากน้ำท่วมขังช่วงมรสุมประจำปี"
  },
  {
    "id": "v_b2_home_03",
    "word": "dwell",
    "pos": "v.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "อาศัยอยู่",
    "alternatives": [
      "แวะพักชั่วคราว",
      "อพยพย้ายถิ่นหนี",
      "เดินทางผ่านไป"
    ],
    "example": "Indigenous tribes dwell sustainably within ancient tropical forest canopy sanctuaries.",
    "exampleThai": "ชนเผ่าพื้นเมืองพำนักพักอาศัยอยู่เป็นประจำอย่างยั่งยืนภายในเขตรักษาพันธุ์ป่าดงดิบโบราณ"
  },
  {
    "id": "v_b2_home_04",
    "word": "refurbishment",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "การบูรณะปรับปรุงอาคารครั้งใหญ่",
    "alternatives": [
      "การทุบทิ้งทำลาย",
      "การสร้างเต็นท์ชั่วคราว",
      "การทาสีผนังภายนอกอย่างเดียว"
    ],
    "example": "The heritage colonial mansion underwent a multi-million-dollar structural refurbishment into a luxury boutique hotel.",
    "exampleThai": "คฤหาสน์มรดกยุคอาณานิคมผ่านการบูรณะปรับปรุงอาคารครั้งใหญ่มูลค่าหลายล้านดอลลาร์จนกลายเป็นโรงแรมบูติกหรู"
  },
  {
    "id": "v_b2_home_05",
    "word": "occupancy",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "อัตราการเข้าพักอยู่อาศัย",
    "alternatives": [
      "อัตราห้องว่างร้าง",
      "ราคาประเมินที่ดิน",
      "ภาษีโรงเรือน"
    ],
    "example": "The new eco-friendly condominium attained full residential occupancy within three months of opening.",
    "exampleThai": "คอนโดมิเนียมรักษ์โลกแห่งใหม่มีอัตราการเข้าพักอยู่อาศัยเต็มร้อยเปอร์เซ็นต์ภายในสามเดือนหลังเปิดตัว"
  },
  {
    "id": "v_b2_home_06",
    "word": "tenancy",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ระยะเวลาการเช่าถือครองที่พัก",
    "alternatives": [
      "การเป็นกรรมสิทธิ์สมบูรณ์",
      "การถูกขับไล่ทันที",
      "การซื้อขายโอนกรรมสิทธิ์"
    ],
    "example": "Tenants must adhere to building noise bylaws throughout their period of legal tenancy.",
    "exampleThai": "ผู้เช่าต้องปฏิบัติตามกฎระเบียบเรื่องเสียงของอาคารตลอดระยะเวลาการเช่าถือครองที่พักตามกฎหมาย"
  },
  {
    "id": "v_b2_home_07",
    "word": "sanctuary",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "แหล่งพักพิงปลอดภัย",
    "alternatives": [
      "ย่านธุรกิจอันวุ่นวาย",
      "ศูนย์การค้าที่จอแจ",
      "ลานชุมนุมสาธารณะ"
    ],
    "example": "Her quiet sunlit apartment serves as a tranquil personal sanctuary away from urban hustle.",
    "exampleThai": "อพาร์ตเมนต์อันเงียบสงบที่แสงแดดส่องถึงของเธอทำหน้าที่เป็นสถานที่พักผ่อนอันสงบปลอดภัยจากความวุ่นวายในเมือง"
  },
  {
    "id": "v_b2_home_08",
    "word": "condominium",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "อาคารชุดพักอาศัยส่วนบุคคล",
    "alternatives": [
      "บ้านเดี่ยวพร้อมที่ดิน",
      "แคมป์คนงานก่อสร้าง",
      "หอพักรวม"
    ],
    "example": "High-rise luxury condominiums overlooking the Chao Phraya River command premium market valuations.",
    "exampleThai": "อาคารชุดพักอาศัยส่วนบุคคลหรูหราระฟ้าที่มองเห็นแม่น้ำเจ้าพระยามีมูลค่าตลาดในระดับพรีเมียม"
  },
  {
    "id": "v_b2_home_09",
    "word": "infrastructure",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "โครงสร้างพื้นฐานด้านสาธารณูปโภค",
    "alternatives": [
      "การตกแต่งบ้านสวยงาม",
      "ของใช้ส่วนตัว",
      "การจัดสวนหย่อม"
    ],
    "example": "Robust neighborhood municipal infrastructure guarantees uninterrupted water, sewage, and high-speed fiber internet.",
    "exampleThai": "โครงสร้างพื้นฐานด้านสาธารณูปโภคของเทศบาลชุมชนที่แข็งแกร่งรับประกันว่าน้ำ ประปา บำบัดน้ำเสีย และเน็ตใยแก้วจะไม่สะดุด"
  },
  {
    "id": "v_b2_home_reside",
    "word": "reside",
    "pos": "v.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "พำนักอาศัย",
    "alternatives": [
      "อพยพย้ายหนี",
      "ท่องเที่ยวชั่วคราว",
      "เดินทางผ่าน"
    ],
    "example": "Most of the university professors reside in the quiet suburbs rather than the busy city center.",
    "exampleThai": "อาจารย์มหาวิทยาลัยส่วนใหญ่พำนักอาศัยอยู่ในแถบชานเมืองอันเงียบสงบมากกว่าใจกลางเมืองที่วุ่นวาย"
  },
  {
    "id": "v_b2_home_11",
    "word": "vicinity",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "บริเวณใกล้เคียง",
    "alternatives": [
      "ดินแดนโพ้นทะเล",
      "ป่าลึกห่างไกล",
      "ยอดเขาสูงชัน"
    ],
    "example": "Having reliable supermarkets and public transit within the immediate residential vicinity adds substantial property value.",
    "exampleThai": "การมีซูเปอร์มาร์เก็ตและระบบขนส่งสาธารณะที่ไว้ใจได้ในบริเวณละแวกใกล้เคียงโดยรอบของบ้านช่วยเพิ่มมูลค่าทรัพย์สิน"
  },
  {
    "id": "v_b2_home_12",
    "word": "premises",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "สถานที่และอาณาบริเวณตัวอาคาร",
    "alternatives": [
      "ทางสาธารณะ",
      "พื้นที่นอกโฉนด",
      "สวนสาธารณะส่วนกลาง"
    ],
    "example": "Smoking is strictly prohibited throughout all shared residential premises and garden corridors.",
    "exampleThai": "การสูบบุหรี่เป็นสิ่งต้องห้ามอย่างเด็ดขาดทั่วสถานที่และอาณาบริเวณตัวอาคารและทางเดินในสวนที่ใช้ร่วมกัน"
  },
  {
    "id": "v_b2_home_13",
    "word": "domicile",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ภูมิลำเนาที่อยู่อาศัยตามกฎหมาย",
    "alternatives": [
      "ที่พักชั่วคราวขณะท่องเที่ยว",
      "ห้องพักโรงแรม",
      "สถานที่ทำงาน"
    ],
    "example": "For statutory taxation purposes, citizens must declare their primary permanent legal domicile annually.",
    "exampleThai": "เพื่อวัตถุประสงค์ทางภาษีตามกฎหมาย ประชาชนต้องแจ้งภูมิลำเนาที่อยู่อาศัยตามกฎหมายถาวรหลักเป็นประจำทุกปี"
  },
  {
    "id": "v_b2_home_14",
    "word": "amenity",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "สิ่งอำนวยความสะดวก",
    "alternatives": [
      "ภาระค่าใช้จ่ายแฝง",
      "กฎข้อห้ามเคร่งครัด",
      "ความไม่สะดวกสบาย"
    ],
    "example": "The residential complex boasts luxury amenities including an infinity swimming pool and state-of-the-art gym.",
    "exampleThai": "โครงการที่อยู่อาศัยแห่งนี้มีสิ่งอำนวยความสะดวกสบายในที่พักหรูหรา รวมถึงสระว่ายน้ำไร้ขอบและยิมออกกำลังกายทันสมัย"
  },
  {
    "id": "v_b2_home_15",
    "word": "eviction",
    "pos": "n.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "การขับไล่ออกจากที่พัก",
    "alternatives": [
      "การต่อสัญญาเช่า",
      "การลดค่าเช่า",
      "การเชิญเข้าอยู่อาศัย"
    ],
    "example": "Tenants who chronically default on contract payments may face legal eviction proceedings through court channels.",
    "exampleThai": "ผู้เช่าที่ผิดนัดชำระเงินตามสัญญาอย่างต่อเนื่องอาจต้องเผชิญกับกระบวนการการบังคับขับไล่ออกจากที่พักอาศัยผ่านช่องทางศาล"
  },
  {
    "id": "v_b2_home_renovate",
    "word": "renovate",
    "pos": "v.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "ปรับปรุงซ่อมแซม",
    "alternatives": [
      "ทุบทำลายทิ้ง",
      "ปล่อยให้ทรุดโทรม",
      "สร้างสิ่งกีดขวาง"
    ],
    "example": "The couple decided to renovate the old wooden townhouse before moving in.",
    "exampleThai": "คู่สามีภรรยาตัดสินใจปรับปรุงซ่อมแซมบ้านทาวน์เฮาส์ไม้หลังเก่าก่อนจะย้ายเข้าไปอยู่"
  },
  {
    "id": "v_b2_home_demolish",
    "word": "demolish",
    "pos": "v.",
    "level": "B2",
    "category": "home-daily",
    "categoryLabel": "บ้าน & กิจวัตรประจำวัน",
    "thai": "รื้อถอนทำลาย",
    "alternatives": [
      "ก่อสร้างขึ้นใหม่",
      "บูรณะซ่อมแซม",
      "จัดตกแต่งภายใน"
    ],
    "example": "The city council voted to demolish the abandoned warehouse to build a public park.",
    "exampleThai": "สภาเทศบาลเมืองลงมติให้รื้อถอนทำลายโกดังร้างเพื่อสร้างสวนสาธารณะ"
  }
];
