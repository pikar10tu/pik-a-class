// คลังคำศัพท์ภาษาอังกฤษในชีวิตประจำวัน (Everyday English Vocabulary Bank)
// ครอบคลุมระดับ CEFR A1 - B2 พร้อมคำแปล ชนิดของคำ ตัวอย่างประโยค และตัวเลือกหลอกสำหรับเกม
// คำแปลทุกคำผ่านการตรวจสอบให้เป็นคำแปลเดี่ยวกระชับ ไม่บอกใบ้เฉลย และมีตัวเลือกหลอก 3 ข้อที่สมดุล

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
    "example": "After running in the sun, I was very thirsty.",
    "exampleThai": "หลังจากวิ่งกลางแดด ฉันรู้สึกหิวน้ำมาก"
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
    "example": "You should drink plenty of clean water every day.",
    "exampleThai": "คุณควรดื่มน้ำสะอาดให้มากๆ ในทุกๆ วัน"
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
      "ดอกไม้",
      "ขนมปัง",
      "ธัญพืช"
    ],
    "example": "Apples and bananas are my favorite fruits.",
    "exampleThai": "แอปเปิลและกล้วยคือผลไม้โปรดของฉัน"
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
      "หนาว"
    ],
    "example": "The kids were hungry after swimming in the pool.",
    "exampleThai": "เด็กๆ รู้สึกหิวข้าวหลังจากว่ายน้ำในสระ"
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
    "example": "Fresh ingredients make a big difference in cooking.",
    "exampleThai": "วัตถุดิบที่สดใหม่สร้างความแตกต่างอย่างมากในการทำอาหาร"
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
    "example": "She followed her grandmother’s cake recipe.",
    "exampleThai": "เธอทำตามสูตรเค้กของคุณยาย"
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
    "example": "We had vanilla ice cream with strawberries for dessert.",
    "exampleThai": "เรากินไอศกรีมวานิลลากับสตรอว์เบอร์รีเป็นของหวาน"
  },
  {
    "id": "v_a2_food_04",
    "word": "beverage",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เครื่องดื่ม",
    "alternatives": [
      "ของคาว",
      "ขนมขบเคี้ยว",
      "ซอสปรุงรส"
    ],
    "example": "Hot beverages like green tea are popular in the morning.",
    "exampleThai": "เครื่องดื่มร้อนเช่นชาเขียวเป็นที่นิยมในตอนเช้า"
  },
  {
    "id": "v_a2_food_05",
    "word": "flavor",
    "pos": "n.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสชาติ",
    "alternatives": [
      "กลิ่นหอม",
      "สีสัน",
      "อุณหภูมิ"
    ],
    "example": "Which ice cream flavor do you prefer?",
    "exampleThai": "คุณชอบไอศกรีมรสชาติไหนมากกว่ากัน?"
  },
  {
    "id": "v_a2_food_06",
    "word": "order",
    "pos": "v.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "สั่งอาหาร",
    "alternatives": [
      "จ่ายเงิน",
      "ปรุงอาหาร",
      "เสิร์ฟอาหาร"
    ],
    "example": "Are you ready to order your dinner now?",
    "exampleThai": "คุณพร้อมที่จะสั่งอาหารเย็นแล้วหรือยัง?"
  },
  {
    "id": "v_a2_food_07",
    "word": "spicy",
    "pos": "adj.",
    "level": "A2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เผ็ดร้อน",
    "alternatives": [
      "หวานเจี๊ยบ",
      "เค็มจัด",
      "ขมขื่น"
    ],
    "example": "Thai food is known for its spicy and sour flavors.",
    "exampleThai": "อาหารไทยขึ้นชื่อเรื่องรสชาติที่เผ็ดร้อนและเปรี้ยว"
  },
  {
    "id": "v_b1_food_01",
    "word": "nutrition",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "โภชนาการ",
    "alternatives": [
      "พลังงาน",
      "สุขอนามัย",
      "การเจริญเติบโต"
    ],
    "example": "Good nutrition is essential for growing children.",
    "exampleThai": "โภชนาการที่ดีเป็นสิ่งจำเป็นสำหรับเด็กที่กำลังเติบโต"
  },
  {
    "id": "v_b1_food_02",
    "word": "cuisine",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อาหารประจำชาติ",
    "alternatives": [
      "การจัดโต๊ะ",
      "วิธีล้างจาน",
      "การตกแต่งร้าน"
    ],
    "example": "Italian cuisine is famous around the whole world.",
    "exampleThai": "อาหารประจำชาติอิตาลีมีชื่อเสียงไปทั่วโลก"
  },
  {
    "id": "v_b1_food_03",
    "word": "vegetarian",
    "pos": "adj.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "มังสวิรัติ",
    "alternatives": [
      "ทอดกรอบ",
      "สดใหม่",
      "รสจัด"
    ],
    "example": "The restaurant offers a wide variety of vegetarian dishes.",
    "exampleThai": "ร้านอาหารแห่งนี้มีอาหารมังสวิรัติให้เลือกมากมาย"
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
      "ปรุงแต่ง",
      "หมักดอง",
      "ดัดแปลงพันธุกรรม"
    ],
    "example": "Many families choose to buy organic milk and eggs.",
    "exampleThai": "หลายครอบครัวเลือกซื้อนมและไข่ที่ปลอดสารเคมี"
  },
  {
    "id": "v_b1_food_05",
    "word": "portion",
    "pos": "n.",
    "level": "B1",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "ปริมาณอาหารต่อจาน",
    "alternatives": [
      "ความเร็วในการเสิร์ฟ",
      "ความสดใหม่",
      "ราคาอาหาร"
    ],
    "example": "The restaurant served generous portions of pasta.",
    "exampleThai": "ร้านอาหารเสิร์ฟพาสต้าในปริมาณอาหารต่อจานที่เยอะมาก"
  },
  {
    "id": "v_b2_food_01",
    "word": "delicacy",
    "pos": "n.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อาหารเลิศรส",
    "alternatives": [
      "อาหารจานด่วน",
      "อาหารแช่แข็ง",
      "อาหารเหลือ"
    ],
    "example": "Truffles are considered a rare and expensive delicacy.",
    "exampleThai": "เห็ดทรัฟเฟิลถือเป็นอาหารเลิศรสที่หายากและราคาแพง"
  },
  {
    "id": "v_b2_food_02",
    "word": "appetizer",
    "pos": "n.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "อาหารเรียกน้ำย่อย",
    "alternatives": [
      "อาหารจานหลัก",
      "ของหวานล้างปาก",
      "เครื่องดื่ม"
    ],
    "example": "We ordered crispy spring rolls as an appetizer.",
    "exampleThai": "พวกเราสั่งปอเปี๊ยะทอดกรอบเป็นอาหารเรียกน้ำย่อย"
  },
  {
    "id": "v_b2_food_03",
    "word": "preservative",
    "pos": "n.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "สารกันบูด",
    "alternatives": [
      "กลิ่นสังเคราะห์",
      "สารให้ความหวาน",
      "ผงชูรส"
    ],
    "example": "Natural fruit juices contain no artificial preservatives.",
    "exampleThai": "น้ำผลไม้ธรรมชาติไม่มีการใส่สารกันบูดสังเคราะห์"
  },
  {
    "id": "v_b2_food_04",
    "word": "culinary",
    "pos": "adj.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "เกี่ยวกับการทำอาหาร",
    "alternatives": [
      "เกี่ยวกับการเกษตร",
      "เกี่ยวกับการค้า",
      "เกี่ยวกับการท่องเที่ยว"
    ],
    "example": "He enrolled in a prestigious culinary school in France.",
    "exampleThai": "เขาสมัครเรียนในโรงเรียนเกี่ยวกับการทำอาหารชื่อดังในฝรั่งเศส"
  },
  {
    "id": "v_b2_food_05",
    "word": "savory",
    "pos": "adj.",
    "level": "B2",
    "category": "food-drink",
    "categoryLabel": "อาหาร & เครื่องดื่ม",
    "thai": "รสกลมกล่อม",
    "alternatives": [
      "หวานเลี่ยน",
      "เหม็นไหม้",
      "จืดสนิท"
    ],
    "example": "The chef prepared a savory pie filled with mushrooms.",
    "exampleThai": "เชฟได้เตรียมพายรสกลมกล่อมที่สอดไส้ด้วยเห็ด"
  },
  {
    "id": "v_a1_travel_01",
    "word": "airport",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "สนามบิน",
    "alternatives": [
      "ท่าเรือ",
      "สถานีรถไฟ",
      "ป้ายรถเมล์"
    ],
    "example": "We arrived at the international airport two hours early.",
    "exampleThai": "เรามาถึงสนามบินนานาชาติล่วงหน้าสองชั่วโมง"
  },
  {
    "id": "v_a1_travel_02",
    "word": "ticket",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ตั๋วโดยสาร",
    "alternatives": [
      "หนังสือเดินทาง",
      "ใบเสร็จรับเงิน",
      "บัตรประชาชน"
    ],
    "example": "Please keep your train ticket until you leave the station.",
    "exampleThai": "กรุณาเก็บตั๋วโดยสารรถไฟของคุณไว้จนกว่าจะออกจากสถานี"
  },
  {
    "id": "v_a1_travel_03",
    "word": "luggage",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "กระเป๋าเดินทาง",
    "alternatives": [
      "กล่องจดหมาย",
      "กระเป๋าสตางค์",
      "เป้สะพายหลัง"
    ],
    "example": "Make sure your luggage does not exceed the weight limit.",
    "exampleThai": "ตรวจสอบให้แน่ใจว่ากระเป๋าเดินทางของคุณน้ำหนักไม่เกินกำหนด"
  },
  {
    "id": "v_a1_travel_04",
    "word": "bus",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "รถประจำทาง",
    "alternatives": [
      "รถแท็กซี่",
      "รถไฟ",
      "เรือข้ามฟาก"
    ],
    "example": "I take the city bus to school every morning.",
    "exampleThai": "ฉันขึ้นรถประจำทางไปโรงเรียนทุกเช้า"
  },
  {
    "id": "v_a1_travel_05",
    "word": "station",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "สถานี",
    "alternatives": [
      "โรงแรม",
      "สนามบิน",
      "ทางหลวง"
    ],
    "example": "Meet me in front of the central railway station.",
    "exampleThai": "มาเจอกันที่หน้าสถานีรถไฟกลางนะ"
  },
  {
    "id": "v_a1_travel_06",
    "word": "hotel",
    "pos": "n.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "โรงแรม",
    "alternatives": [
      "ร้านอาหาร",
      "พิพิธภัณฑ์",
      "ศูนย์การค้า"
    ],
    "example": "We booked a cozy hotel near the beach.",
    "exampleThai": "เราจองโรงแรมแสนสบายใกล้ชายหาด"
  },
  {
    "id": "v_a1_travel_07",
    "word": "travel",
    "pos": "v.",
    "level": "A1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ท่องเที่ยว",
    "alternatives": [
      "ทำงาน",
      "พักผ่อน",
      "อ่านหนังสือ"
    ],
    "example": "Many people love to travel abroad during holidays.",
    "exampleThai": "หลายคนชอบไปท่องเที่ยวต่างประเทศในช่วงวันหยุด"
  },
  {
    "id": "v_a2_travel_01",
    "word": "departure",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การออกเดินทาง",
    "alternatives": [
      "การมาถึง",
      "การแวะพัก",
      "การยกเลิก"
    ],
    "example": "Check the flight board for your departure gate.",
    "exampleThai": "ตรวจสอบป้ายตารางบินเพื่อดูประตูสำหรับการออกเดินทางของคุณ"
  },
  {
    "id": "v_a2_travel_02",
    "word": "passenger",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ผู้โดยสาร",
    "alternatives": [
      "คนขับรถ",
      "พนักงานต้อนรับ",
      "กัปตัน"
    ],
    "example": "All passengers must fasten their seatbelts now.",
    "exampleThai": "ผู้โดยสารทุกคนต้องรัดเข็มขัดนิรภัยทันที"
  },
  {
    "id": "v_a2_travel_03",
    "word": "journey",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การเดินทาง",
    "alternatives": [
      "จุดเริ่มต้น",
      "แผนการท่องเที่ยว",
      "แผนที่เส้นทาง"
    ],
    "example": "Have a safe and pleasant journey to Japan!",
    "exampleThai": "ขอให้เป็นการเดินทางที่ปลอดภัยและน่ารื่นรมย์สู่ญี่ปุ่นนะ!"
  },
  {
    "id": "v_a2_travel_04",
    "word": "passport",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "หนังสือเดินทาง",
    "alternatives": [
      "ใบขับขี่",
      "บัตรประชาชน",
      "ตั๋วเครื่องบิน"
    ],
    "example": "You must show your passport at the immigration counter.",
    "exampleThai": "คุณต้องแสดงหนังสือเดินทางที่เคาน์เตอร์ตรวจคนเข้าเมือง"
  },
  {
    "id": "v_a2_travel_05",
    "word": "platform",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ชานชาลา",
    "alternatives": [
      "ทางด่วน",
      "ช่องขายตั๋ว",
      "จุดรับฝากกระเป๋า"
    ],
    "example": "The train to Chiang Mai will arrive at platform 3.",
    "exampleThai": "รถไฟไปเชียงใหม่จะเทียบที่ชานชาลาหมายเลข 3"
  },
  {
    "id": "v_a2_travel_06",
    "word": "delayed",
    "pos": "adj.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ล่าช้า",
    "alternatives": [
      "ตรงเวลา",
      "ล่วงหน้า",
      "ยกเลิก"
    ],
    "example": "Our flight was delayed due to heavy rain.",
    "exampleThai": "เที่ยวบินของเราล่าช้าเนื่องจากฝนตกหนัก"
  },
  {
    "id": "v_a2_travel_07",
    "word": "boarding",
    "pos": "n.",
    "level": "A2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การขึ้นเครื่องบิน",
    "alternatives": [
      "การลงเครื่อง",
      "การเช็กอิน",
      "การตรวจค้น"
    ],
    "example": "Boarding will begin in approximately fifteen minutes.",
    "exampleThai": "การขึ้นเครื่องบินจะเริ่มในอีกประมาณ 15 นาที"
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
      "จุดแวะพัก",
      "ทางผ่าน",
      "จุดนัดพบ"
    ],
    "example": "Paris is one of the most visited destinations in Europe.",
    "exampleThai": "ปารีสเป็นหนึ่งในจุดหมายปลายทางที่มีผู้มาเยือนมากที่สุดในยุโรป"
  },
  {
    "id": "v_b1_travel_02",
    "word": "commute",
    "pos": "v.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เดินทางไปกลับ",
    "alternatives": [
      "ย้ายที่อยู่",
      "ท่องเที่ยวผจญภัย",
      "พักค้างคืน"
    ],
    "example": "He commutes to downtown Bangkok by sky train every weekday.",
    "exampleThai": "เขาเดินทางไปกลับใจกลางกรุงเทพฯ ด้วยรถไฟฟ้าทุกวันธรรมดา"
  },
  {
    "id": "v_b1_travel_03",
    "word": "accommodation",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ที่พักอาศัย",
    "alternatives": [
      "ค่าเดินทาง",
      "ร้านอาหาร",
      "แหล่งช้อปปิ้ง"
    ],
    "example": "The tour package includes luxury hotel accommodation.",
    "exampleThai": "แพ็กเกจทัวร์รวมที่พักอาศัยในโรงแรมหรูหราไว้แล้ว"
  },
  {
    "id": "v_b1_travel_04",
    "word": "sightseeing",
    "pos": "n.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การเที่ยวชมทิวทัศน์",
    "alternatives": [
      "การซื้อของฝาก",
      "การประชุมสัมมนา",
      "การสำรวจทางน้ำ"
    ],
    "example": "We spent the whole afternoon sightseeing around the old town.",
    "exampleThai": "เราใช้เวลาตลอดช่วงบ่ายในการเที่ยวชมทิวทัศน์รอบเมืองเก่า"
  },
  {
    "id": "v_b1_travel_05",
    "word": "transfer",
    "pos": "v.",
    "level": "B1",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "เปลี่ยนขบวนรถ",
    "alternatives": [
      "ซื้อตั๋วใหม่",
      "คืนตั๋วเดินทาง",
      "ตรวจสอบสัมภาระ"
    ],
    "example": "You need to transfer to line 2 at Siam Station.",
    "exampleThai": "คุณต้องเปลี่ยนขบวนรถไปสาย 2 ที่สถานีสยาม"
  },
  {
    "id": "v_b2_travel_01",
    "word": "itinerary",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "แผนการเดินทาง",
    "alternatives": [
      "งบประมาณเดินทาง",
      "บันทึกความทรงจำ",
      "คู่มือภาษา"
    ],
    "example": "The tour guide shared a detailed daily itinerary with the group.",
    "exampleThai": "มัคคุเทศก์ได้แจกแผนการเดินทางประจำวันอย่างละเอียดให้แก่กลุ่มลูกทัวร์"
  },
  {
    "id": "v_b2_travel_02",
    "word": "expedition",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การสำรวจ",
    "alternatives": [
      "การพักผ่อนหย่อนใจ",
      "การเจรจาธุรกิจ",
      "การสัมภาษณ์งาน"
    ],
    "example": "The team prepared for an Arctic scientific expedition.",
    "exampleThai": "ทีมงานเตรียมความพร้อมสำหรับการสำรวจทางวิทยาศาสตร์แถบอาร์กติก"
  },
  {
    "id": "v_b2_travel_03",
    "word": "customs",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "ด่านศุลกากร",
    "alternatives": [
      "ประตูขึ้นเครื่อง",
      "เคาน์เตอร์เช็กอิน",
      "จุดแลกเงิน"
    ],
    "example": "All international travelers must pass through customs.",
    "exampleThai": "นักเดินทางระหว่างประเทศทุกคนต้องผ่านด่านศุลกากร"
  },
  {
    "id": "v_b2_travel_04",
    "word": "voyage",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การเดินทางไกลทางทะเล",
    "alternatives": [
      "การบินในประเทศ",
      "การเดินป่าระยะสั้น",
      "การขับรถข้ามจังหวัด"
    ],
    "example": "Sailors embarked on a perilous voyage across the Atlantic.",
    "exampleThai": "ลูกเรือเริ่มออกเดินทางไกลทางทะเลที่เต็มไปด้วยอันตรายข้ามมหาสมุทรแอตแลนติก"
  },
  {
    "id": "v_b2_travel_05",
    "word": "transit",
    "pos": "n.",
    "level": "B2",
    "category": "travel-transport",
    "categoryLabel": "การเดินทาง & คมนาคม",
    "thai": "การแวะเปลี่ยนเครื่อง",
    "alternatives": [
      "การยกเลิกตั๋ว",
      "การบินตรง",
      "การตรวจลงตราวีซ่า"
    ],
    "example": "We had a four-hour transit at Doha airport before flying to London.",
    "exampleThai": "เรามีการแวะเปลี่ยนเครื่องสี่ชั่วโมงที่สนามบินโดฮาก่อนบินต่อไปลอนดอน"
  },
  {
    "id": "v_a1_health_01",
    "word": "stomach",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "กระเพาะอาหาร",
    "alternatives": [
      "กล้ามเนื้อแขน",
      "หัวใจ",
      "ข้อเท้า"
    ],
    "example": "Eating too fast gave him an upset stomach.",
    "exampleThai": "การกินเร็วเกินไปทำให้เขาปวดกระเพาะอาหาร"
  },
  {
    "id": "v_a1_health_02",
    "word": "headache",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการปวดหัว",
    "alternatives": [
      "เจ็บคอ",
      "ปวดฟัน",
      "ปวดหลัง"
    ],
    "example": "She took an aspirin to relieve her severe headache.",
    "exampleThai": "เธอกินยาแอสไพรินเพื่อบรรเทาอาการปวดหัวรุนแรง"
  },
  {
    "id": "v_a1_health_03",
    "word": "doctor",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "คุณหมอ",
    "alternatives": [
      "ทนายความ",
      "คุณครู",
      "วิศวกร"
    ],
    "example": "The doctor advised him to get plenty of rest.",
    "exampleThai": "คุณหมอแนะนำให้เขาพักผ่อนมากๆ"
  },
  {
    "id": "v_a1_health_04",
    "word": "hospital",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "โรงพยาบาล",
    "alternatives": [
      "ศูนย์กีฬา",
      "โรงเรียน",
      "ธนาคาร"
    ],
    "example": "There is a modern hospital near the city center.",
    "exampleThai": "มีโรงพยาบาลที่ทันสมัยอยู่ใกล้ใจกลางเมือง"
  },
  {
    "id": "v_a1_health_05",
    "word": "healthy",
    "pos": "adj.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "มีสุขภาพดี",
    "alternatives": [
      "อ่อนแอ",
      "ป่วยไข้",
      "เหน็ดเหนื่อย"
    ],
    "example": "Exercise and good sleep keep your body healthy.",
    "exampleThai": "การออกกำลังกายและการนอนหลับที่ดีช่วยให้ร่างกายมีสุขภาพดี"
  },
  {
    "id": "v_a1_health_06",
    "word": "pain",
    "pos": "n.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ความเจ็บปวด",
    "alternatives": [
      "ความสบาย",
      "ความอ่อนเพลีย",
      "ความหิว"
    ],
    "example": "He felt a sharp pain in his left knee.",
    "exampleThai": "เขารู้สึกถึงความเจ็บปวดแปลบๆ ที่หัวเข่าข้างซ้าย"
  },
  {
    "id": "v_a1_health_07",
    "word": "exercise",
    "pos": "v.",
    "level": "A1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ออกกำลังกาย",
    "alternatives": [
      "นอนหลับ",
      "รับประทานอาหาร",
      "อ่านหนังสือ"
    ],
    "example": "You should exercise at least three times a week.",
    "exampleThai": "คุณควรออกกำลังกายอย่างน้อยสัปดาห์ละ 3 ครั้ง"
  },
  {
    "id": "v_a2_health_01",
    "word": "medicine",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ยารักษาโรค",
    "alternatives": [
      "อาหารเสริม",
      "เครื่องมือแพทย์",
      "น้ำยาฆ่าเชื้อ"
    ],
    "example": "Remember to take your prescribed medicine after each meal.",
    "exampleThai": "อย่าลืมกินยารักษาโรคตามแพทย์สั่งหลังอาหารทุกมื้อ"
  },
  {
    "id": "v_a2_health_02",
    "word": "fever",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการมีไข้",
    "alternatives": [
      "ท้องร่วง",
      "ผื่นคัน",
      "ฟันผุ"
    ],
    "example": "The thermometer showed that the child had a high fever.",
    "exampleThai": "ปรอทวัดไข้แสดงว่าเด็กมีอาการมีไข้สูง"
  },
  {
    "id": "v_a2_health_03",
    "word": "cough",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการไอ",
    "alternatives": [
      "อาการจาม",
      "อาการหาว",
      "อาการสะอึก"
    ],
    "example": "Drink warm water with honey to soothe your dry cough.",
    "exampleThai": "ดื่มน้ำอุ่นผสมน้ำผึ้งเพื่อบรรเทาอาการไอแห้งของคุณ"
  },
  {
    "id": "v_a2_health_04",
    "word": "bandage",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ผ้าพันแผล",
    "alternatives": [
      "เข็มฉีดยา",
      "สำลีก้อน",
      "สายน้ำเกลือ"
    ],
    "example": "The nurse gently wrapped a clean bandage around his wrist.",
    "exampleThai": "พยาบาลพันผ้าพันแผลที่สะอาดรอบข้อมือของเขาอย่างเบามือ"
  },
  {
    "id": "v_a2_health_05",
    "word": "dentist",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "หมอฟัน",
    "alternatives": [
      "จักษุแพทย์",
      "เภสัชกร",
      "ศัลยแพทย์"
    ],
    "example": "You should visit the dentist twice a year for checkups.",
    "exampleThai": "คุณควรไปพบหมอฟันปีละสองครั้งเพื่อตรวจฟัน"
  },
  {
    "id": "v_a2_health_06",
    "word": "muscle",
    "pos": "n.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "กล้ามเนื้อ",
    "alternatives": [
      "กระดูกอ่อน",
      "เส้นเลือด",
      "ข้อต่อกระดูก"
    ],
    "example": "Stretching before jogging prevents muscle strain.",
    "exampleThai": "การยืดเหยียดก่อนวิ่งช่วยป้องกันการบาดเจ็บของกล้ามเนื้อ"
  },
  {
    "id": "v_a2_health_07",
    "word": "injure",
    "pos": "v.",
    "level": "A2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ได้รับบาดเจ็บ",
    "alternatives": [
      "รักษาหาย",
      "ป้องกันโรค",
      "ฟื้นฟูกำลัง"
    ],
    "example": "He injured his ankle while playing basketball yesterday.",
    "exampleThai": "เขาได้รับบาดเจ็บที่ข้อเท้าขณะเล่นบาสเกตบอลเมื่อวานนี้"
  },
  {
    "id": "v_b1_health_01",
    "word": "recover",
    "pos": "v.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ฟื้นตัว",
    "alternatives": [
      "ทรุดหนัก",
      "ตรวจโรค",
      "หมดสติ"
    ],
    "example": "It took him two weeks to fully recover from the flu.",
    "exampleThai": "เขาใช้เวลาสองสัปดาห์ในการฟื้นตัวอย่างสมบูรณ์จากไข้หวัดใหญ่"
  },
  {
    "id": "v_b1_health_02",
    "word": "symptom",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการของโรค",
    "alternatives": [
      "สาเหตุของโรค",
      "แผนการรักษา",
      "ผลตรวจเลือด"
    ],
    "example": "Loss of smell is a common symptom of this viral infection.",
    "exampleThai": "การสูญเสียการได้กลิ่นเป็นอาการของโรคที่พบบ่อยในการติดเชื้อไวรัสนี้"
  },
  {
    "id": "v_b1_health_03",
    "word": "prescription",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "ใบสั่งยา",
    "alternatives": [
      "ใบรับรองแพทย์",
      "ใบนัดตรวจ",
      "ใบเสร็จรับเงิน"
    ],
    "example": "The pharmacist carefully prepared the medicine according to the prescription.",
    "exampleThai": "เภสัชกรจัดเตรียมยาอย่างรอบคอบตามใบสั่งยาของแพทย์"
  },
  {
    "id": "v_b1_health_04",
    "word": "allergy",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "อาการแพ้",
    "alternatives": [
      "โรคติดต่อ",
      "บาดแผลสด",
      "โรคกระดูก"
    ],
    "example": "Tell the waiter if you have a peanut allergy.",
    "exampleThai": "แจ้งบริกรทันทีหากคุณมีอาการแพ้ถั่วลิสง"
  },
  {
    "id": "v_b1_health_05",
    "word": "infection",
    "pos": "n.",
    "level": "B1",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การติดเชื้อ",
    "alternatives": [
      "การฉีดวัคซีน",
      "การฟอกไต",
      "การสมานแผล"
    ],
    "example": "Keep the wound clean and dry to prevent bacterial infection.",
    "exampleThai": "รักษาแผลให้สะอาดและแห้งเพื่อป้องกันการติดเชื้อแบคทีเรีย"
  },
  {
    "id": "v_b2_health_01",
    "word": "chronic",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "เรื้อรัง",
    "alternatives": [
      "เฉียบพลัน",
      "ชั่วคราว",
      "เล็กน้อย"
    ],
    "example": "She suffers from chronic back pain caused by sitting too long.",
    "exampleThai": "เธอทรมานจากอาการปวดหลังเรื้อรังที่เกิดจากการนั่งนานเกินไป"
  },
  {
    "id": "v_b2_health_02",
    "word": "diagnosis",
    "pos": "n.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การวินิจฉัยโรค",
    "alternatives": [
      "การบำบัดรักษา",
      "การจ่ายยา",
      "การผ่าตัดด่วน"
    ],
    "example": "An early medical diagnosis significantly improves survival rates.",
    "exampleThai": "การวินิจฉัยโรคตั้งแต่เนิ่นๆ ช่วยเพิ่มโอกาสรอดชีวิตได้อย่างมาก"
  },
  {
    "id": "v_b2_health_03",
    "word": "therapy",
    "pos": "n.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "การบำบัดรักษา",
    "alternatives": [
      "การผ่าตัดใหญ่",
      "การเอกซเรย์",
      "การวินิจฉัยโรค"
    ],
    "example": "Physical therapy helped the injured athlete walk again.",
    "exampleThai": "การบำบัดรักษาทางกายภาพช่วยให้นักกีฬาที่บาดเจ็บกลับมาเดินได้อีกครั้ง"
  },
  {
    "id": "v_b2_health_04",
    "word": "immune",
    "pos": "adj.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "มีภูมิคุ้มกัน",
    "alternatives": [
      "ติดเชื้อง่าย",
      "อ่อนแอทางกาย",
      "แพ้ยาอย่างรุนแรง"
    ],
    "example": "Vaccination helps your body become immune to dangerous diseases.",
    "exampleThai": "การฉีดวัคซีนช่วยให้ร่างกายของคุณมีภูมิคุ้มกันต่อโรคร้ายแรง"
  },
  {
    "id": "v_b2_health_05",
    "word": "fracture",
    "pos": "n.",
    "level": "B2",
    "category": "health-body",
    "categoryLabel": "สุขภาพ & ร่างกาย",
    "thai": "กระดูกหัก",
    "alternatives": [
      "แผลถลอก",
      "รอยฟกช้ำ",
      "กล้ามเนื้อฉีก"
    ],
    "example": "The X-ray clearly confirmed a hairline fracture in his arm.",
    "exampleThai": "ภาพเอกซเรย์ยืนยันชัดเจนว่ามีรอยกระดูกหักเป็นเส้นเล็กๆ ที่แขนของเขา"
  },
  {
    "id": "v_a1_jobs_01",
    "word": "teacher",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "คุณครู",
    "alternatives": [
      "นักเรียน",
      "แพทย์",
      "วิศวกร"
    ],
    "example": "Our English teacher explains difficult grammar very clearly.",
    "exampleThai": "คุณครูภาษาอังกฤษของเราอธิบายไวยากรณ์ยากๆ ได้อย่างชัดเจนมาก"
  },
  {
    "id": "v_a1_jobs_02",
    "word": "office",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ที่ทำงาน",
    "alternatives": [
      "โรงเรียน",
      "บ้านพัก",
      "สวนสาธารณะ"
    ],
    "example": "His modern office is situated on the twenty-fifth floor.",
    "exampleThai": "ที่ทำงานที่ทันสมัยของเขาตั้งอยู่บนชั้นยี่สิบห้า"
  },
  {
    "id": "v_a1_jobs_03",
    "word": "worker",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "คนทำงาน",
    "alternatives": [
      "ลูกค้า",
      "เจ้าของตึก",
      "นักเรียน"
    ],
    "example": "Factory workers wear protective yellow helmets.",
    "exampleThai": "คนทำงานในโรงงานสวมหมวกนิรภัยสีเหลืองเพื่อป้องกันอันตราย"
  },
  {
    "id": "v_a1_jobs_04",
    "word": "police",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ตำรวจ",
    "alternatives": [
      "ทหารเรือ",
      "เจ้าหน้าที่ป่าไม้",
      "นักดับเพลิง"
    ],
    "example": "The police officer helped the lost tourist find the station.",
    "exampleThai": "ตำรวจช่วยเหลือเพื่อให้นักท่องเที่ยวที่หลงทางพบสถานี"
  },
  {
    "id": "v_a1_jobs_05",
    "word": "nurse",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "พยาบาล",
    "alternatives": [
      "เภสัชกร",
      "นักจิตวิทยา",
      "ผู้ป่วย"
    ],
    "example": "The kind nurse checked the patient’s pulse and temperature.",
    "exampleThai": "พยาบาลผู้ใจดีตรวจวัดชีพจรและอุณหภูมิของผู้ป่วย"
  },
  {
    "id": "v_a1_jobs_06",
    "word": "cook",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "พ่อครัว",
    "alternatives": [
      "บริกร",
      "ผู้จัดการร้าน",
      "แคชเชียร์"
    ],
    "example": "The restaurant hired a talented cook from Italy.",
    "exampleThai": "ร้านอาหารจ้างพ่อครัวผู้มีพรสวรรค์จากอิตาลี"
  },
  {
    "id": "v_a1_jobs_07",
    "word": "uniform",
    "pos": "n.",
    "level": "A1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เครื่องแบบ",
    "alternatives": [
      "รองเท้ากีฬา",
      "หมวกกันน็อก",
      "กระเป๋าสะพาย"
    ],
    "example": "All staff members are required to wear a neat uniform.",
    "exampleThai": "พนักงานทุกคนต้องสวมเครื่องแบบที่เรียบร้อย"
  },
  {
    "id": "v_a2_jobs_01",
    "word": "colleague",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เพื่อนร่วมงาน",
    "alternatives": [
      "เจ้านาย",
      "ลูกค้าประจำ",
      "ผู้ถือหุ้น"
    ],
    "example": "I usually have lunch with my friendly colleagues.",
    "exampleThai": "ฉันมักจะทานอาหารกลางวันกับเพื่อนร่วมงานที่เป็นมิตร"
  },
  {
    "id": "v_a2_jobs_02",
    "word": "interview",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การสัมภาษณ์งาน",
    "alternatives": [
      "การฝึกอบรม",
      "การประชุมกลุ่ม",
      "การตรวจรับสินค้า"
    ],
    "example": "He dressed formally for his morning job interview.",
    "exampleThai": "เขาแต่งกายสุภาพอย่างเป็นทางการสำหรับการสัมภาษณ์งานในตอนเช้า"
  },
  {
    "id": "v_a2_jobs_03",
    "word": "salary",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เงินเดือน",
    "alternatives": [
      "โบนัสพิเศษ",
      "เงินทอน",
      "เงินกู้ยืม"
    ],
    "example": "The company pays our monthly salary on the 28th.",
    "exampleThai": "บริษัทจ่ายเงินเดือนประจำเดือนให้เราในวันที่ 28"
  },
  {
    "id": "v_a2_jobs_04",
    "word": "manager",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ผู้จัดการ",
    "alternatives": [
      "พนักงานต้อนรับ",
      "ลูกจ้างฝึกหัด",
      "ครูผู้ช่วย"
    ],
    "example": "The store manager resolved the customer complaint swiftly.",
    "exampleThai": "ผู้จัดการร้านจัดการข้อร้องเรียนของลูกค้าได้อย่างรวดเร็ว"
  },
  {
    "id": "v_a2_jobs_05",
    "word": "engineer",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "วิศวกร",
    "alternatives": [
      "สถาปนิก",
      "ช่างไม้",
      "ช่างทาสี"
    ],
    "example": "Software engineers build apps used by millions of people.",
    "exampleThai": "วิศวกรซอฟต์แวร์สร้างแอปที่มีผู้ใช้งานนับล้านคน"
  },
  {
    "id": "v_a2_jobs_06",
    "word": "client",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ลูกค้าธุรกิจ",
    "alternatives": [
      "ที่ปรึกษา",
      "คู่แข่งทางการค้า",
      "ผู้ผลิตวัตถุดิบ"
    ],
    "example": "The lawyer met with an important client this morning.",
    "exampleThai": "ทนายความได้พบกับลูกค้าธุรกิจคนสำคัญเมื่อเช้านี้"
  },
  {
    "id": "v_a2_jobs_07",
    "word": "meeting",
    "pos": "n.",
    "level": "A2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การประชุม",
    "alternatives": [
      "งานเลี้ยงสังสรรค์",
      "การท่องเที่ยว",
      "การแข่งขันกีฬา"
    ],
    "example": "We scheduled a team meeting for tomorrow afternoon.",
    "exampleThai": "พวกเรานัดหมายการประชุมทีมไว้สำหรับช่วงบ่ายวันพรุ่งนี้"
  },
  {
    "id": "v_b1_jobs_01",
    "word": "deadline",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "กำหนดส่งงาน",
    "alternatives": [
      "วันเริ่มงานใหม่",
      "เวลาพักกลางวัน",
      "วันหยุดประจำสัปดาห์"
    ],
    "example": "We had to work hard to meet the tight project deadline.",
    "exampleThai": "พวกเราต้องทำงานอย่างหนักเพื่อให้ทันกำหนดส่งงานที่กระชั้นชิด"
  },
  {
    "id": "v_b1_jobs_02",
    "word": "promote",
    "pos": "v.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "เลื่อนตำแหน่ง",
    "alternatives": [
      "ลาออกจากงาน",
      "พักงานชั่วคราว",
      "ลงโทษทางวินัย"
    ],
    "example": "She was promoted to senior marketing director last month.",
    "exampleThai": "เธอได้รับการเลื่อนตำแหน่งเป็นผู้อำนวยการฝ่ายการตลาดอาวุโสเมื่อเดือนก่อน"
  },
  {
    "id": "v_b1_jobs_03",
    "word": "freelance",
    "pos": "adj.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "รับงานอิสระ",
    "alternatives": [
      "ข้าราชการประจำ",
      "พนักงานรายวัน",
      "ลูกจ้างทดลองงาน"
    ],
    "example": "He works as a freelance graphic designer from home.",
    "exampleThai": "เขาทำงานเป็นนักออกแบบกราฟิกรับงานอิสระจากที่บ้าน"
  },
  {
    "id": "v_b1_jobs_04",
    "word": "resume",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ประวัติการทำงาน",
    "alternatives": [
      "สัญญาว่าจ้าง",
      "จดหมายเตือน",
      "ใบรับรองเงินเดือน"
    ],
    "example": "Send your updated resume and cover letter via email.",
    "exampleThai": "ส่งประวัติการทำงานฉบับอัปเดตและจดหมายแนะนำตัวของคุณทางอีเมล"
  },
  {
    "id": "v_b1_jobs_05",
    "word": "negotiation",
    "pos": "n.",
    "level": "B1",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การเจรจาต่อรอง",
    "alternatives": [
      "การถกเถียงรุนแรง",
      "การฟ้องร้องศาล",
      "การประกาศลาออก"
    ],
    "example": "Successful wage negotiations ended the factory strike peacefully.",
    "exampleThai": "การเจรจาต่อรองเรื่องค่าจ้างที่ประสบความสำเร็จยุติการหยุดงานประท้วงอย่างสงบ"
  },
  {
    "id": "v_b2_jobs_01",
    "word": "entrepreneur",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ผู้ประกอบการ",
    "alternatives": [
      "ผู้จัดการฝ่ายบุคคล",
      "ลูกจ้างรายวัน",
      "ที่ปรึกษากฎหมาย"
    ],
    "example": "An ambitious entrepreneur launched a renewable energy startup.",
    "exampleThai": "ผู้ประกอบการผู้มุ่งมั่นได้ก่อตั้งสตาร์ตอัปด้านพลังงานหมุนเวียน"
  },
  {
    "id": "v_b2_jobs_02",
    "word": "profession",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "วิชาชีพ",
    "alternatives": [
      "งานอดิเรก",
      "กิจกรรมยามว่าง",
      "หน้าที่ชั่วคราว"
    ],
    "example": "Teaching is a highly respected and noble profession.",
    "exampleThai": "วิชาชีพครูเป็นวิชาชีพที่ได้รับความเคารพยกย่องอย่างสูง"
  },
  {
    "id": "v_b2_jobs_03",
    "word": "overtime",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "การทำงานล่วงเวลา",
    "alternatives": [
      "การพักร้อนประจำปี",
      "การลาป่วยมีใบรับรอง",
      "การอบรมสัมมนา"
    ],
    "example": "Employees receive double pay when working overtime on weekends.",
    "exampleThai": "พนักงานจะได้รับค่าจ้างสองเท่าเมื่อทำงานล่วงเวลาในวันหยุดสุดสัปดาห์"
  },
  {
    "id": "v_b2_jobs_04",
    "word": "executive",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "ผู้บริหารระดับสูง",
    "alternatives": [
      "พนักงานฝึกหัด",
      "เจ้าหน้าที่ประสานงาน",
      "ธุรการสำนักงาน"
    ],
    "example": "Senior company executives approved the multi-million dollar expansion.",
    "exampleThai": "ผู้บริหารระดับสูงของบริษัทอนุมัติแผนการขยายกิจการมูลค่าหลายล้านดอลลาร์"
  },
  {
    "id": "v_b2_jobs_05",
    "word": "qualification",
    "pos": "n.",
    "level": "B2",
    "category": "jobs-work",
    "categoryLabel": "อาชีพ & การทำงาน",
    "thai": "คุณสมบัติเฉพาะทาง",
    "alternatives": [
      "เงินเดือนที่คาดหวัง",
      "สวัสดิการพนักงาน",
      "เวลาเข้างาน"
    ],
    "example": "The applicant possesses excellent technical qualifications for the position.",
    "exampleThai": "ผู้สมัครมีคุณสมบัติเฉพาะทางด้านเทคนิคที่ยอดเยี่ยมสำหรับตำแหน่งนี้"
  },
  {
    "id": "v_a1_hobbies_01",
    "word": "music",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ดนตรี",
    "alternatives": [
      "ภาพยนตร์",
      "ภาพวาดระบายสี",
      "วรรณกรรม"
    ],
    "example": "Listening to classical music helps me focus while studying.",
    "exampleThai": "การฟังดนตรีคลาสสิกช่วยให้ฉันมีสมาธิขณะอ่านหนังสือ"
  },
  {
    "id": "v_a1_hobbies_02",
    "word": "guitar",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กีตาร์",
    "alternatives": [
      "เปียโน",
      "กลองชุด",
      "ไวโอลิน"
    ],
    "example": "He learned to play acoustic guitar when he was ten.",
    "exampleThai": "เขาเรียนรู้การเล่นกีตาร์โปร่งตั้งแต่ตอนอายุ 10 ขวบ"
  },
  {
    "id": "v_a1_hobbies_03",
    "word": "football",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กีฬาฟุตบอล",
    "alternatives": [
      "บาสเกตบอล",
      "เทนนิส",
      "แบดมินตัน"
    ],
    "example": "We play football in the school playground every Friday.",
    "exampleThai": "พวกเราเล่นกีฬาฟุตบอลที่สนามโรงเรียนทุกวันศุกร์"
  },
  {
    "id": "v_a1_hobbies_04",
    "word": "swim",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ว่ายน้ำ",
    "alternatives": [
      "วิ่งแข่ง",
      "ปีนเขา",
      "กระโดดเชือก"
    ],
    "example": "Can you swim across this Olympic-sized pool?",
    "exampleThai": "เธอสามารถว่ายน้ำข้ามสระขนาดโอลิมปิกนี้ได้ไหม?"
  },
  {
    "id": "v_a1_hobbies_05",
    "word": "draw",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "วาดรูป",
    "alternatives": [
      "ร้องเพลง",
      "เต้นรำ",
      "เย็บปัก"
    ],
    "example": "She likes to draw cute animals in her sketchbook.",
    "exampleThai": "เธอชอบวาดรูปสัตว์น่ารักๆ ลงในสมุดวาดภาพ"
  },
  {
    "id": "v_a1_hobbies_06",
    "word": "sing",
    "pos": "v.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ร้องเพลง",
    "alternatives": [
      "เล่นละคร",
      "แต่งกลอน",
      "จัดดอกไม้"
    ],
    "example": "The children love to sing cheerful songs together.",
    "exampleThai": "เด็กๆ ชอบร้องเพลงที่ร่าเริงสนุกสนานร่วมกัน"
  },
  {
    "id": "v_a1_hobbies_07",
    "word": "game",
    "pos": "n.",
    "level": "A1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เกมการเล่น",
    "alternatives": [
      "หนังสือเรียน",
      "แบบฝึกหัด",
      "การบ้าน"
    ],
    "example": "We played a fun board game with the whole family.",
    "exampleThai": "พวกเราเล่นเกมการเล่นกระดานที่สนุกสนานกับทุกคนในครอบครัว"
  },
  {
    "id": "v_a2_hobbies_01",
    "word": "camera",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กล้องถ่ายรูป",
    "alternatives": [
      "ขาตั้งไฟ",
      "เลนส์แว่นตา",
      "สมาร์ตโฟน"
    ],
    "example": "She bought a digital camera to capture bird photos.",
    "exampleThai": "เธอซื้อกล้องถ่ายรูปดิจิทัลเพื่อถ่ายภาพนก"
  },
  {
    "id": "v_a2_hobbies_02",
    "word": "cycling",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การปั่นจักรยาน",
    "alternatives": [
      "การเดินป่า",
      "การพายเรือ",
      "การวิ่งผลัด"
    ],
    "example": "Cycling around the scenic lake is great morning cardio.",
    "exampleThai": "การปั่นจักรยานรอบทะเลสาบที่สวยงามเป็นการออกกำลังกายยามเช้าที่ดี"
  },
  {
    "id": "v_a2_hobbies_03",
    "word": "camping",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การตั้งแคมป์",
    "alternatives": [
      "การพักโรงแรม",
      "การช้อปปิ้ง",
      "การล่องเรือสำราญ"
    ],
    "example": "We set up our tents for a weekend camping trip in the forest.",
    "exampleThai": "พวกเรากางเต็นท์สำหรับการตั้งแคมป์ช่วงสุดสัปดาห์ในป่า"
  },
  {
    "id": "v_a2_hobbies_04",
    "word": "chess",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "หมากรุก",
    "alternatives": [
      "ไพ่บริดจ์",
      "บิลเลียด",
      "โดมิโน"
    ],
    "example": "Playing chess teaches patience and strategic thinking skills.",
    "exampleThai": "การเล่นหมากรุกสอนความอดทนและทักษะการคิดเชิงกลยุทธ์"
  },
  {
    "id": "v_a2_hobbies_05",
    "word": "painting",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ภาพวาดสี",
    "alternatives": [
      "งานปั้นดินเผา",
      "ภาพถ่ายฟิล์ม",
      "งานแกะสลัก"
    ],
    "example": "Her watercolor painting won first prize at the school art fair.",
    "exampleThai": "ภาพวาดสีน้ำของเธอได้รับรางวัลชนะเลิศในงานศิลปะของโรงเรียน"
  },
  {
    "id": "v_a2_hobbies_06",
    "word": "tournament",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การแข่งขันชิงชัย",
    "alternatives": [
      "การฝึกซ้อม",
      "การคัดเลือกตัว",
      "การเปิดฤดูกาล"
    ],
    "example": "Our school soccer team advanced to the finals of the tournament.",
    "exampleThai": "ทีมฟุตบอลโรงเรียนของเราผ่านเข้ารอบชิงชนะเลิศของการแข่งขันชิงชัย"
  },
  {
    "id": "v_a2_hobbies_07",
    "word": "concert",
    "pos": "n.",
    "level": "A2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การแสดงดนตรี",
    "alternatives": [
      "งานประกวดคำขวัญ",
      "การฉายหนังกลางแปลง",
      "นิทรรศการวิชาการ"
    ],
    "example": "Thousands of happy fans cheered loudly during the live concert.",
    "exampleThai": "แฟนคลับหลายพันคนส่งเสียงเชียร์ดังกระหึ่มระหว่างการแสดงดนตรีสด"
  },
  {
    "id": "v_b1_hobbies_01",
    "word": "leisure",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เวลาว่าง",
    "alternatives": [
      "ชั่วโมงทำงาน",
      "การสอบคัดเลือก",
      "ภารกิจเร่งด่วน"
    ],
    "example": "Gardening is his favorite leisure activity on Sundays.",
    "exampleThai": "การทำสวนคือกิจกรรมยามมีเวลาว่างที่เขาโปรดปรานที่สุดในวันอาทิตย์"
  },
  {
    "id": "v_b1_hobbies_02",
    "word": "instrument",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "เครื่องดนตรี",
    "alternatives": [
      "อุปกรณ์กีฬา",
      "เครื่องมือช่าง",
      "อุปกรณ์สื่อสาร"
    ],
    "example": "Learning a musical instrument improves memory and motor coordination.",
    "exampleThai": "การเรียนรู้เครื่องดนตรีช่วยพัฒนาความจำและการประสานงานของร่างกาย"
  },
  {
    "id": "v_b1_hobbies_03",
    "word": "photography",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การถ่ายภาพ",
    "alternatives": [
      "การตัดต่อวิดีโอ",
      "การเขียนนิยาย",
      "การทำอาหาร"
    ],
    "example": "Landscape photography requires patience to catch the perfect lighting.",
    "exampleThai": "การถ่ายภาพทิวทัศน์ต้องใช้ความอดทนเพื่อรอจับจังหวะแสงที่สมบูรณ์แบบ"
  },
  {
    "id": "v_b1_hobbies_04",
    "word": "competition",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การแข่งขัน",
    "alternatives": [
      "การประนีประนอม",
      "การร่วมมือกัน",
      "การฝึกซ้อมร่วม"
    ],
    "example": "He entered a national swimming competition and won silver.",
    "exampleThai": "เขาเข้าร่วมการแข่งขันว่ายน้ำระดับชาติและคว้าเหรียญเงินมาได้"
  },
  {
    "id": "v_b1_hobbies_05",
    "word": "marathon",
    "pos": "n.",
    "level": "B1",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การวิ่งมาราธอน",
    "alternatives": [
      "การกระโดดไกล",
      "การวิ่งผลัดสี่ร้อยเมตร",
      "การเดินเร็ว"
    ],
    "example": "Running a full marathon requires months of dedicated training.",
    "exampleThai": "การวิ่งมาราธอนระยะเต็มต้องอาศัยการฝึกซ้อมอย่างมุ่งมั่นหลายเดือน"
  },
  {
    "id": "v_b2_hobbies_01",
    "word": "enthusiast",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ผู้คลั่งไคล้",
    "alternatives": [
      "ผู้ชมทั่วไป",
      "ผู้ตัดสินมืออาชีพ",
      "ผู้จัดการทีม"
    ],
    "example": "As a fitness enthusiast, he exercises at the gym five days a week.",
    "exampleThai": "ในฐานะผู้คลั่งไคล้การออกกำลังกาย เขาไปฟิตเนสสัปดาห์ละ 5 วัน"
  },
  {
    "id": "v_b2_hobbies_02",
    "word": "stamina",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ความอดทนทางร่างกาย",
    "alternatives": [
      "ความยืดหยุ่นของกล้ามเนื้อ",
      "ความเร็วสูงสุด",
      "พละกำลังยกน้ำหนัก"
    ],
    "example": "Long-distance cyclists build remarkable cardiovascular stamina.",
    "exampleThai": "นักปั่นจักรยานทางไกลสร้างความอดทนทางร่างกายและหัวใจได้อย่างยอดเยี่ยม"
  },
  {
    "id": "v_b2_hobbies_03",
    "word": "championship",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "การชิงตำแหน่งแชมป์",
    "alternatives": [
      "การแข่งขันกระชับมิตร",
      "การคัดเลือกตัวสำรอง",
      "การแข่งขันรอบแรก"
    ],
    "example": "The team celebrated winning the world basketball championship.",
    "exampleThai": "ทีมเฉลิมฉลองการคว้าชัยชนะในการชิงตำแหน่งแชมป์บาสเกตบอลระดับโลก"
  },
  {
    "id": "v_b2_hobbies_04",
    "word": "recreation",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "กิจกรรมนันทนาการ",
    "alternatives": [
      "ภาระหน้าที่การงาน",
      "การสอบวัดผลประจำปี",
      "การทำความสะอาดบ้าน"
    ],
    "example": "The new community center offers diverse sports and recreation facilities.",
    "exampleThai": "ศูนย์ชุมชนแห่งใหม่มีสิ่งอำนวยความสะดวกสำหรับกีฬาและกิจกรรมนันทนาการที่หลากหลาย"
  },
  {
    "id": "v_b2_hobbies_05",
    "word": "spectator",
    "pos": "n.",
    "level": "B2",
    "category": "hobbies-sports",
    "categoryLabel": "งานอดิเรก & กีฬา",
    "thai": "ผู้ชมการแข่งขัน",
    "alternatives": [
      "ผู้ฝึกสอนทีม",
      "นักกีฬาตัวจริง",
      "ผู้ตัดสินในสนาม"
    ],
    "example": "Thousands of passionate spectators cheered the runners in the rain.",
    "exampleThai": "ผู้ชมการแข่งขันที่กระตือรือร้นหลายพันคนร่วมเชียร์นักวิ่งท่ามกลางสายฝน"
  },
  {
    "id": "v_a1_tech_01",
    "word": "computer",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "คอมพิวเตอร์",
    "alternatives": [
      "โทรทัศน์จอแบน",
      "วิทยุสื่อสาร",
      "เครื่องคิดเลข"
    ],
    "example": "Students use computers in the library to complete homework.",
    "exampleThai": "นักเรียนใช้คอมพิวเตอร์ในห้องสมุดเพื่อทำการบ้านให้เสร็จ"
  },
  {
    "id": "v_a1_tech_02",
    "word": "phone",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "โทรศัพท์",
    "alternatives": [
      "กล้องวงจรปิด",
      "แท็บเล็ต",
      "นาฬิกาแขวน"
    ],
    "example": "She answered the ringing phone after just two rings.",
    "exampleThai": "เธอรับสายโทรศัพท์ที่ส่งเสียงดังหลังจากดังเพียงสองครั้ง"
  },
  {
    "id": "v_a1_tech_03",
    "word": "screen",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "หน้าจอแสดงผล",
    "alternatives": [
      "แป้นพิมพ์",
      "ลำโพงบลูทูธ",
      "เมาส์ไร้สาย"
    ],
    "example": "Do not look at the bright computer screen in the dark.",
    "exampleThai": "อย่ามองหน้าจอแสดงผลคอมพิวเตอร์ที่สว่างจ้าในที่มืด"
  },
  {
    "id": "v_a1_tech_04",
    "word": "internet",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "อินเทอร์เน็ต",
    "alternatives": [
      "สายเคเบิล",
      "ดาวเทียม",
      "เสาอากาศ"
    ],
    "example": "You can search for almost any information on the internet.",
    "exampleThai": "คุณสามารถค้นหาข้อมูลแทบทุกอย่างได้บนอินเทอร์เน็ต"
  },
  {
    "id": "v_a1_tech_05",
    "word": "mouse",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เมาส์คอมพิวเตอร์",
    "alternatives": [
      "แผ่นรองเขียน",
      "ปลั๊กไฟ",
      "รีโมตคอนโทรล"
    ],
    "example": "Click the left button on your mouse to open the folder.",
    "exampleThai": "คลิกปุ่มซ้ายบนเมาส์คอมพิวเตอร์เพื่อเปิดโฟลเดอร์"
  },
  {
    "id": "v_a1_tech_06",
    "word": "message",
    "pos": "n.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ข้อความสั้น",
    "alternatives": [
      "สายโทรเข้า",
      "เสียงเตือนภัย",
      "ภาพเคลื่อนไหว"
    ],
    "example": "I sent a quick text message to my mom saying I arrived safely.",
    "exampleThai": "ฉันส่งข้อความสั้นบอกแม่ว่าฉันเดินทางถึงอย่างปลอดภัยแล้ว"
  },
  {
    "id": "v_a1_tech_07",
    "word": "online",
    "pos": "adj.",
    "level": "A1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ออนไลน์",
    "alternatives": [
      "ปิดระบบ",
      "สายขาด",
      "แบตหมด"
    ],
    "example": "Many students enjoy learning English through online classes.",
    "exampleThai": "นักเรียนหลายคนชอบเรียนภาษาอังกฤษผ่านชั้นเรียนออนไลน์"
  },
  {
    "id": "v_a2_tech_01",
    "word": "password",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "รหัสผ่าน",
    "alternatives": [
      "ชื่อผู้ใช้งาน",
      "อีเมลแอดเดรส",
      "หมายเลขประจำตัว"
    ],
    "example": "Never share your secret account password with anyone.",
    "exampleThai": "อย่าเปิดเผยรหัสผ่านบัญชีลับของคุณให้ผู้อื่นรู้เด็ดขาด"
  },
  {
    "id": "v_a2_tech_02",
    "word": "download",
    "pos": "v.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ดาวน์โหลด",
    "alternatives": [
      "ลบไฟล์ทิ้ง",
      "แก้ไขเอกสาร",
      "ส่งจดหมาย"
    ],
    "example": "It only took thirty seconds to download the new reading app.",
    "exampleThai": "ใช้เวลาเพียง 30 วินาทีในการดาวน์โหลดแอปการอ่านใหม่"
  },
  {
    "id": "v_a2_tech_03",
    "word": "website",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "เว็บไซต์",
    "alternatives": [
      "โฟลเดอร์เก็บงาน",
      "ไฟล์เอกสาร",
      "กล่องข้อความ"
    ],
    "example": "Visit our school website for the updated exam schedule.",
    "exampleThai": "เข้าไปดูเว็บไซต์ของโรงเรียนเพื่อดูตารางสอบที่อัปเดตใหม่"
  },
  {
    "id": "v_a2_tech_04",
    "word": "battery",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แบตเตอรี่",
    "alternatives": [
      "สายชาร์จไฟ",
      "อะแดปเตอร์แปลงไฟ",
      "เต้าเสียบผนัง"
    ],
    "example": "My phone battery died because I forgot to charge it overnight.",
    "exampleThai": "แบตเตอรี่โทรศัพท์ของฉันหมดเพราะฉันลืมชาร์จไว้ข้ามคืน"
  },
  {
    "id": "v_a2_tech_05",
    "word": "keyboard",
    "pos": "n.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แป้นพิมพ์",
    "alternatives": [
      "ไมโครโฟน",
      "หูฟังมีสาย",
      "เคสกันกระแทก"
    ],
    "example": "Practice typing without looking down at the keyboard.",
    "exampleThai": "ฝึกการพิมพ์สัมผัสโดยไม่ต้องก้มมองที่แป้นพิมพ์"
  },
  {
    "id": "v_a2_tech_06",
    "word": "update",
    "pos": "v.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "อัปเดต",
    "alternatives": [
      "ล็อกเอาต์",
      "ค้นหาคำศัพท์",
      "คัดลอกไฟล์"
    ],
    "example": "Remember to update your phone system to the latest version.",
    "exampleThai": "อย่าลืมอัปเดตระบบโทรศัพท์ของคุณให้เป็นเวอร์ชันล่าสุด"
  },
  {
    "id": "v_a2_tech_07",
    "word": "wireless",
    "pos": "adj.",
    "level": "A2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ไร้สาย",
    "alternatives": [
      "ใช้สายเชื่อม",
      "สั่งงานด้วยเสียง",
      "ชำรุดเสียหาย"
    ],
    "example": "These wireless headphones connect quickly via Bluetooth.",
    "exampleThai": "หูฟังไร้สายเหล่านี้เชื่อมต่อผ่านบลูทูธได้อย่างรวดเร็ว"
  },
  {
    "id": "v_b1_tech_01",
    "word": "device",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "อุปกรณ์อิเล็กทรอนิกส์",
    "alternatives": [
      "โปรแกรมแชต",
      "สายเคเบิลอินเทอร์เน็ต",
      "คลื่นความถี่"
    ],
    "example": "Electronic devices should be turned off during take-off.",
    "exampleThai": "อุปกรณ์อิเล็กทรอนิกส์ควรปิดใช้งานระหว่างการนำเครื่องบินขึ้น"
  },
  {
    "id": "v_b1_tech_02",
    "word": "software",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ซอฟต์แวร์",
    "alternatives": [
      "ชิ้นส่วนตัวเครื่อง",
      "ชิปประมวลผล",
      "แผงวงจรหลัก"
    ],
    "example": "Antivirus software protects your personal computer from threats.",
    "exampleThai": "ซอฟต์แวร์ป้องกันไวรัสช่วยปกป้องคอมพิวเตอร์ส่วนตัวของคุณจากภัยคุกคาม"
  },
  {
    "id": "v_b1_tech_03",
    "word": "application",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "แอปพลิเคชัน",
    "alternatives": [
      "สายเชื่อมต่อ",
      "หน้าจอสัมผัส",
      "ช่องเสียบการ์ด"
    ],
    "example": "This mobile application tracks your daily vocabulary practice.",
    "exampleThai": "แอปพลิเคชันบนมือถือนี้ติดตามการฝึกฝนคำศัพท์ประจำวันของคุณ"
  },
  {
    "id": "v_b1_tech_04",
    "word": "streaming",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "การสตรีมออนไลน์",
    "alternatives": [
      "การบันทึกเทป",
      "การพิมพ์เอกสาร",
      "การสำรองข้อมูลฮาร์ดดิสก์"
    ],
    "example": "Video streaming platforms have changed how we watch movies.",
    "exampleThai": "แพลตฟอร์มการสตรีมออนไลน์ได้เปลี่ยนรูปแบบการรับชมภาพยนตร์ของเรา"
  },
  {
    "id": "v_b1_tech_05",
    "word": "database",
    "pos": "n.",
    "level": "B1",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ฐานข้อมูล",
    "alternatives": [
      "หน้าต่างบราวเซอร์",
      "ไดรฟ์พกพา",
      "เดสก์ท็อป"
    ],
    "example": "The school stores all student test results in a secure database.",
    "exampleThai": "โรงเรียนเก็บผลการสอบทั้งหมดของนักเรียนไว้ในฐานข้อมูลที่ปลอดภัย"
  },
  {
    "id": "v_b2_tech_01",
    "word": "cybersecurity",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ความปลอดภัยไซเบอร์",
    "alternatives": [
      "การตลาดดิจิทัล",
      "การเขียนบทความ",
      "การออกแบบกราฟิก"
    ],
    "example": "Banks invest millions annually to strengthen their cybersecurity.",
    "exampleThai": "ธนาคารลงทุนหลายล้านต่อปีเพื่อเสริมสร้างความปลอดภัยไซเบอร์"
  },
  {
    "id": "v_b2_tech_02",
    "word": "artificial",
    "pos": "adj.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "ที่ประดิษฐ์ขึ้น",
    "alternatives": [
      "ที่เกิดขึ้นตามธรรมชาติ",
      "ที่ยั่งยืนยาวนาน",
      "ที่จับต้องไม่ได้"
    ],
    "example": "Artificial intelligence transforms medicine, education, and transport.",
    "exampleThai": "ปัญญาที่ประดิษฐ์ขึ้นกำลังปฏิรูปวงการแพทย์ การศึกษา และการคมนาคม"
  },
  {
    "id": "v_b2_tech_03",
    "word": "algorithm",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "อัลกอริทึม",
    "alternatives": [
      "ภาษาโปรแกรม",
      "การเชื่อมต่อบลูทูธ",
      "รหัสผ่านลับ"
    ],
    "example": "Social media algorithms recommend posts based on your interests.",
    "exampleThai": "อัลกอริทึมของโซเชียลมีเดียแนะนำโพสต์ตามความสนใจของคุณ"
  },
  {
    "id": "v_b2_tech_04",
    "word": "encryption",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "การเข้ารหัสข้อมูล",
    "alternatives": [
      "การบีบอัดไฟล์ภาพ",
      "การลบประวัติการท่องเว็บ",
      "การแชร์ตำแหน่งพิกัด"
    ],
    "example": "End-to-end encryption guarantees that only chat participants read messages.",
    "exampleThai": "การเข้ารหัสข้อมูลตั้งแต่ต้นทางถึงปลายทางรับประกันว่ามีเพียงผู้สนทนาเท่านั้นที่อ่านข้อความได้"
  },
  {
    "id": "v_b2_tech_05",
    "word": "innovation",
    "pos": "n.",
    "level": "B2",
    "category": "tech-media",
    "categoryLabel": "เทคโนโลยี & สื่อ",
    "thai": "นวัตกรรมใหม่",
    "alternatives": [
      "ประเพณีโบราณ",
      "สินค้ามือสอง",
      "วิธีปฏิบัติเดิม"
    ],
    "example": "Technological innovation drives economic growth in modern nations.",
    "exampleThai": "นวัตกรรมใหม่ทางเทคโนโลยีเป็นแรงขับเคลื่อนการเติบโตทางเศรษฐกิจในประเทศยุคใหม่"
  },
  {
    "id": "v_a1_nature_01",
    "word": "sunny",
    "pos": "adj.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แดดจัด",
    "alternatives": [
      "ฝนตกหนัก",
      "ลมแรงมาก",
      "หิมะตก"
    ],
    "example": "It is a lovely sunny day for playing outside in the park.",
    "exampleThai": "วันนี้เป็นวันที่แดดจัดและน่ารักเหมาะแก่การออกไปเล่นในสวนสาธารณะ"
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
      "เมฆครึ้ม",
      "แสงแดด",
      "หมอกหนา"
    ],
    "example": "The plants grew rapidly after the gentle morning rain.",
    "exampleThai": "ต้นไม้เติบโตอย่างรวดเร็วหลังจากได้รับสายฝนยามเช้าที่นุ่มนวล"
  },
  {
    "id": "v_a1_nature_03",
    "word": "tree",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ต้นไม้",
    "alternatives": [
      "ทุ่งหญ้า",
      "ดอกไม้ป่า",
      "ก้อนหิน"
    ],
    "example": "Birds built a little nest high up in the oak tree.",
    "exampleThai": "นกสร้างรังเล็กๆ อยู่สูงบนต้นไม้ต้นโอ๊ก"
  },
  {
    "id": "v_a1_nature_04",
    "word": "sky",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ท้องฟ้า",
    "alternatives": [
      "ภูเขาสูง",
      "แม่น้ำกว้าง",
      "ทะเลลึก"
    ],
    "example": "The blue sky turned orange and pink during sunset.",
    "exampleThai": "ท้องฟ้าสีครามเปลี่ยนเป็นสีส้มและชมพูระหว่างพระอาทิตย์ตกดิน"
  },
  {
    "id": "v_a1_nature_05",
    "word": "cold",
    "pos": "adj.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "หนาวเย็น",
    "alternatives": [
      "ร้อนอบอ้าว",
      "แห้งแล้ง",
      "เปียกชื้น"
    ],
    "example": "Put on your warm woolen jacket because it is very cold outside.",
    "exampleThai": "สวมเสื้อแจ็กเก็ตขนสัตว์แสนอบอุ่นนะเพราะข้างนอกหนาวเย็นมาก"
  },
  {
    "id": "v_a1_nature_06",
    "word": "umbrella",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ร่มกันฝน",
    "alternatives": [
      "แว่นตากันแดด",
      "หมวกไหมพรม",
      "ผ้าพันคอ"
    ],
    "example": "Take an umbrella with you in case it showers later.",
    "exampleThai": "พกร่มกันฝนไปด้วยเผื่อว่าช่วงสายฝนจะตกนะ"
  },
  {
    "id": "v_a1_nature_07",
    "word": "wind",
    "pos": "n.",
    "level": "A1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สายลม",
    "alternatives": [
      "คลื่นทะเล",
      "ประกายไฟ",
      "แผ่นดินไหว"
    ],
    "example": "The kite soared high when a strong gust of wind blew.",
    "exampleThai": "ว่าวลอยขึ้นสูงเมื่อมีสายลมกรรโชกแรงพัดมา"
  },
  {
    "id": "v_a2_nature_01",
    "word": "forest",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ป่าไม้",
    "alternatives": [
      "ทะเลทราย",
      "ชายหาด",
      "เมืองใหญ่"
    ],
    "example": "Tropical forests are home to millions of animal species.",
    "exampleThai": "ป่าไม้เขตร้อนเป็นที่อยู่อาศัยของสิ่งมีชีวิตและสัตว์นับล้านสายพันธุ์"
  },
  {
    "id": "v_a2_nature_02",
    "word": "river",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แม่น้ำ",
    "alternatives": [
      "มหาสมุทร",
      "สระว่ายน้ำ",
      "บ่อน้ำบาดาล"
    ],
    "example": "The Chao Phraya River flows peacefully through Bangkok.",
    "exampleThai": "แม่น้ำเจ้าพระยาไหลผ่านกรุงเทพฯ อย่างสงบ"
  },
  {
    "id": "v_a2_nature_03",
    "word": "cloudy",
    "pos": "adj.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "มีเมฆมาก",
    "alternatives": [
      "แดดแผดเผา",
      "ท้องฟ้าโปร่งใส",
      "แห้งสนิท"
    ],
    "example": "The weather forecast predicts a cool and cloudy afternoon.",
    "exampleThai": "พยากรณ์อากาศคาดการณ์ว่าช่วงบ่ายจะมีอากาศเย็นและมีเมฆมาก"
  },
  {
    "id": "v_a2_nature_04",
    "word": "stormy",
    "pos": "adj.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "มีพายุจัด",
    "alternatives": [
      "สงบนิ่ง",
      "อบอุ่นสบาย",
      "แห้งแล้ง"
    ],
    "example": "Small fishing boats returned safely to port before the stormy night.",
    "exampleThai": "เรือประมงขนาดเล็กกลับเข้าเทียบท่าอย่างปลอดภัยก่อนคืนที่มีพายุจัด"
  },
  {
    "id": "v_a2_nature_05",
    "word": "mountain",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ภูเขาสูง",
    "alternatives": [
      "ที่ราบลุ่ม",
      "ชายฝั่งทะเล",
      "เกาะร้าง"
    ],
    "example": "We enjoyed hiking up the mountain to see the sunrise.",
    "exampleThai": "พวกเราสนุกกับการเดินขึ้นภูเขาสูงเพื่อชมพระอาทิตย์ขึ้น"
  },
  {
    "id": "v_a2_nature_06",
    "word": "climate",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สภาพภูมิอากาศ",
    "alternatives": [
      "อุณหภูมิห้อง",
      "พยากรณ์อากาศชั่วโมงนี้",
      "ความดันบรรยากาศ"
    ],
    "example": "Thailand has a tropical climate with warm temperatures all year.",
    "exampleThai": "ประเทศไทยมีสภาพภูมิอากาศแบบเขตร้อนโดยมีอุณหภูมิอบอุ่นตลอดปี"
  },
  {
    "id": "v_a2_nature_07",
    "word": "rainbow",
    "pos": "n.",
    "level": "A2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "รุ้งกินน้ำ",
    "alternatives": [
      "แสงฟ้าผ่า",
      "ดาวตก",
      "สุริยุปราคา"
    ],
    "example": "A vibrant seven-colored rainbow appeared after the sudden rain shower.",
    "exampleThai": "รุ้งกินน้ำเจ็ดสีสดใสปรากฏขึ้นหลังฝนที่ตกลงมาอย่างกะทันหัน"
  },
  {
    "id": "v_b1_nature_01",
    "word": "pollution",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "มลพิษ",
    "alternatives": [
      "พลังงานสะอาด",
      "ความอุดมสมบูรณ์",
      "ความบริสุทธิ์"
    ],
    "example": "Air pollution from traffic can cause respiratory issues in children.",
    "exampleThai": "มลพิษทางอากาศจากการจราจรสามารถทำให้เกิดปัญหาทางเดินหายใจในเด็ก"
  },
  {
    "id": "v_b1_nature_02",
    "word": "wildlife",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "สัตว์ป่า",
    "alternatives": [
      "สัตว์เลี้ยงในบ้าน",
      "สัตว์ในฟาร์ม",
      "ปศุสัตว์"
    ],
    "example": "National parks protect indigenous wildlife from poaching.",
    "exampleThai": "อุทยานแห่งชาติปกป้องสัตว์ป่าท้องถิ่นจากการล่าสัตว์ที่ผิดกฎหมาย"
  },
  {
    "id": "v_b1_nature_03",
    "word": "drought",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ภัยแล้ง",
    "alternatives": [
      "น้ำท่วมฉับพลัน",
      "โคลนถล่ม",
      "พายุหิมะ"
    ],
    "example": "Severe drought ruined rice crops across the northern provinces.",
    "exampleThai": "ภัยแล้งที่รุนแรงสร้างความเสียหายแก่นาข้าวทั่วจังหวัดทางภาคเหนือ"
  },
  {
    "id": "v_b1_nature_04",
    "word": "ocean",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "มหาสมุทร",
    "alternatives": [
      "คลองส่งน้ำ",
      "สระน้ำจำลอง",
      "อ่างเก็บน้ำ"
    ],
    "example": "Coral reefs in the Pacific Ocean shelter countless marine species.",
    "exampleThai": "แนวปะการังในมหาสมุทรแปซิฟิกเป็นแหล่งพักพิงของสิ่งมีชีวิตใต้ทะเลนับไม่ถ้วน"
  },
  {
    "id": "v_b1_nature_05",
    "word": "earthquake",
    "pos": "n.",
    "level": "B1",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "แผ่นดินไหว",
    "alternatives": [
      "ภูเขาไฟระเบิด",
      "คลื่นลมทะเล",
      "ไฟป่า"
    ],
    "example": "Modern skyscrapers in Tokyo are engineered to withstand strong earthquakes.",
    "exampleThai": "ตึกระฟ้าสมัยใหม่ในโตเกียวได้รับการออกแบบทางวิศวกรรมให้ทนทานต่อแผ่นดินไหวรุนแรง"
  },
  {
    "id": "v_b2_nature_01",
    "word": "renewable",
    "pos": "adj.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "หมุนเวียนใช้ใหม่ได้",
    "alternatives": [
      "ใช้แล้วหมดสิ้นไป",
      "มีสารพิษตกค้าง",
      "ไม่สามารถย่อยสลาย"
    ],
    "example": "Solar and wind power are leading sources of renewable green energy.",
    "exampleThai": "พลังงานแสงอาทิตย์และลมเป็นแหล่งพลังงานสีเขียวที่หมุนเวียนใช้ใหม่ได้ชั้นนำ"
  },
  {
    "id": "v_b2_nature_02",
    "word": "conservation",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "การอนุรักษ์ธรรมชาติ",
    "alternatives": [
      "การตัดไม้ทำลายป่า",
      "การพัฒนาอุตสาหกรรม",
      "การล่าสัตว์พาณิชย์"
    ],
    "example": "Wildlife conservation efforts helped save the giant panda from extinction.",
    "exampleThai": "ความพยายามในการอนุรักษ์ธรรมชาติและสัตว์ป่าช่วยให้แพนด้ายักษ์รอดพ้นจากการสูญพันธุ์"
  },
  {
    "id": "v_b2_nature_03",
    "word": "biodiversity",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ความหลากหลายทางชีวภาพ",
    "alternatives": [
      "การทำการเกษตรเชิงเดี่ยว",
      "การกระจายประชากร",
      "การกลายพันธุ์"
    ],
    "example": "Deforestation causes severe loss of rainforest biodiversity.",
    "exampleThai": "การตัดไม้ทำลายป่าทำให้เกิดการสูญเสียความหลากหลายทางชีวภาพในป่าดงดิบอย่างรุนแรง"
  },
  {
    "id": "v_b2_nature_04",
    "word": "sustainable",
    "pos": "adj.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ยั่งยืน",
    "alternatives": [
      "ชั่วคราวฉาบฉวย",
      "สิ้นเปลืองทรัพยากร",
      "เสื่อมโทรมเร็ว"
    ],
    "example": "Sustainable farming methods preserve topsoil nutrients for future generations.",
    "exampleThai": "วิธีการทำฟาร์มที่ยั่งยืนช่วยรักษาแร่ธาตุในหน้าดินไว้สำหรับคนรุ่นต่อไป"
  },
  {
    "id": "v_b2_nature_05",
    "word": "ecosystem",
    "pos": "n.",
    "level": "B2",
    "category": "nature-weather",
    "categoryLabel": "ธรรมชาติ & ดินฟ้าอากาศ",
    "thai": "ระบบนิเวศ",
    "alternatives": [
      "ชั้นบรรยากาศโอโซน",
      "ปรากฏการณ์เรือนกระจก",
      "วัฏจักรน้ำผิวดิน"
    ],
    "example": "Plastic debris dumped in the seas threatens the marine ecosystem.",
    "exampleThai": "ขยะพลาสติกที่ถูกทิ้งลงสู่ท้องทะเลคุกคามระบบนิเวศทางทะเล"
  },
  {
    "id": "v_a1_shop_01",
    "word": "cheap",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ราคาถูก",
    "alternatives": [
      "ราคาแพง",
      "หาซื้อยาก",
      "หรูหราฟุ่มเฟือย"
    ],
    "example": "Street food in Thailand is very cheap and tasty.",
    "exampleThai": "อาหารริมทางในประเทศไทยราคาถูกมากและรสชาติดี"
  },
  {
    "id": "v_a1_shop_02",
    "word": "expensive",
    "pos": "adj.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ราคาแพง",
    "alternatives": [
      "ราคาย่อมเยา",
      "แจกฟรี",
      "ลดกระหน่ำ"
    ],
    "example": "Designer handbags at the mall are way too expensive for me.",
    "exampleThai": "กระเป๋าแบรนด์เนมที่ห้างราคาแพงเกินไปสำหรับฉันมาก"
  },
  {
    "id": "v_a1_shop_03",
    "word": "buy",
    "pos": "v.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ซื้อของ",
    "alternatives": [
      "ขายสินค้า",
      "ยืมเงิน",
      "แลกเปลี่ยนของ"
    ],
    "example": "I want to buy fresh fruits at the weekend farmers market.",
    "exampleThai": "ฉันต้องการซื้อของผลไม้สดที่ตลาดนัดเกษตรกรสุดสัปดาห์"
  },
  {
    "id": "v_a1_shop_04",
    "word": "money",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เงินทอง",
    "alternatives": [
      "สิ่งของขวัญ",
      "บัตรกำนัล",
      "สินค้าตัวอย่าง"
    ],
    "example": "Children should learn how to save their pocket money.",
    "exampleThai": "เด็กๆ ควรเรียนรู้วิธีการเก็บออมเงินทองค่าขนมของตนเอง"
  },
  {
    "id": "v_a1_shop_05",
    "word": "shop",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ร้านค้า",
    "alternatives": [
      "โรงพยาบาล",
      "โรงเรียน",
      "สถานีตำรวจ"
    ],
    "example": "There is a lovely bakery shop right around the corner.",
    "exampleThai": "มีร้านค้าเบเกอรีที่น่ารักอยู่ตรงหัวมุมถนนนี้เอง"
  },
  {
    "id": "v_a1_shop_06",
    "word": "cash",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เงินสด",
    "alternatives": [
      "เช็คธนาคาร",
      "สลากกินแบ่ง",
      "คูปองแลกของ"
    ],
    "example": "Do you prefer to pay with cash or a credit card?",
    "exampleThai": "คุณสะดวกจ่ายด้วยเงินสดหรือบัตรเครดิตมากกว่ากัน?"
  },
  {
    "id": "v_a1_shop_07",
    "word": "price",
    "pos": "n.",
    "level": "A1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ราคาสินค้า",
    "alternatives": [
      "น้ำหนักสินค้า",
      "วันหมดอายุ",
      "ขนาดบรรจุภัณฑ์"
    ],
    "example": "Check the price tag before heading to the cashier.",
    "exampleThai": "ตรวจสอบราคาสินค้าบนป้ายก่อนเดินไปที่เคาน์เตอร์แคชเชียร์นะ"
  },
  {
    "id": "v_a2_shop_01",
    "word": "discount",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ส่วนลด",
    "alternatives": [
      "อัตราดอกเบี้ย",
      "ค่าภาษีมูลค่าเพิ่ม",
      "ค่าธรรมเนียมจัดส่ง"
    ],
    "example": "Students get a twenty percent discount on all bookstore purchases.",
    "exampleThai": "นักเรียนได้รับส่วนลด 20% สำหรับการซื้อสินค้าในร้านหนังสือทุกรายการ"
  },
  {
    "id": "v_a2_shop_02",
    "word": "receipt",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ใบเสร็จรับเงิน",
    "alternatives": [
      "ใบเสนอราคา",
      "ป้ายโฆษณา",
      "แคตตาล็อกสินค้า"
    ],
    "example": "Keep your purchase receipt in case you want to exchange the shirt.",
    "exampleThai": "เก็บใบเสร็จรับเงินของคุณไว้เผื่อคุณต้องการเปลี่ยนเสื้อตัวนี้"
  },
  {
    "id": "v_a2_shop_03",
    "word": "wallet",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "กระเป๋าสตางค์",
    "alternatives": [
      "กระเป๋าเป้สะพายหลัง",
      "ซองจดหมายติดแสตมป์",
      "กล่องดินสอ"
    ],
    "example": "He accidentally left his leather wallet on the coffee table.",
    "exampleThai": "เขาเผลอลืมกระเป๋าสตางค์หนังไว้บนโต๊ะกาแฟโดยไม่ได้ตั้งใจ"
  },
  {
    "id": "v_a2_shop_04",
    "word": "customer",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ลูกค้า",
    "alternatives": [
      "พนักงานร้าน",
      "เจ้าของอาคาร",
      "ผู้ส่งพัสดุ"
    ],
    "example": "The friendly shopkeeper greeted every customer with a warm smile.",
    "exampleThai": "เจ้าของร้านที่เป็นมิตรทักทายลูกค้าทุกคนด้วยรอยยิ้มที่อบอุ่น"
  },
  {
    "id": "v_a2_shop_05",
    "word": "market",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ตลาดสด",
    "alternatives": [
      "โรงภาพยนตร์",
      "โรงยิมเนเซียม",
      "สนามบิน"
    ],
    "example": "My grandmother wakes up early to buy vegetables at the morning market.",
    "exampleThai": "คุณยายของฉันตื่นแต่เช้าเพื่อไปซื้อผักที่ตลาดสดยามเช้า"
  },
  {
    "id": "v_a2_shop_06",
    "word": "refund",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "การคืนเงิน",
    "alternatives": [
      "การเพิ่มยอดเงิน",
      "การหักภาษี",
      "การคิดค่าปรับ"
    ],
    "example": "If the appliance is defective, you are entitled to a full refund.",
    "exampleThai": "หากเครื่องใช้ไฟฟ้าชำรุดเสียหาย คุณมีสิทธิ์ได้รับการคืนเงินเต็มจำนวน"
  },
  {
    "id": "v_a2_shop_07",
    "word": "credit",
    "pos": "n.",
    "level": "A2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สินเชื่อเครดิต",
    "alternatives": [
      "เงินสดในมือ",
      "บัตรของขวัญ",
      "เหรียญหยอดตู้"
    ],
    "example": "She used a credit card to pay for her online airplane tickets.",
    "exampleThai": "เธอใช้สินเชื่อเครดิตผ่านบัตรเพื่อชำระค่าตั๋วเครื่องบินออนไลน์"
  },
  {
    "id": "v_b1_shop_01",
    "word": "bargain",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สินค้าราคาพิเศษ",
    "alternatives": [
      "สินค้าหรูหราฟุ่มเฟือย",
      "สินค้าชำรุดรอซ่อม",
      "สินค้าประมูลราคาสูง"
    ],
    "example": "At half the original price, this winter coat is a real bargain.",
    "exampleThai": "ด้วยราคาลดครึ่งหนึ่งจากป้าย เสื้อโค้ตกันหนาวตัวนี้ถือเป็นสินค้าราคาพิเศษอย่างแท้จริง"
  },
  {
    "id": "v_b1_shop_02",
    "word": "currency",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "สกุลเงินตรา",
    "alternatives": [
      "อัตราดอกเบี้ยเงินกู้",
      "พันธบัตรรัฐบาล",
      "ราคาหุ้นรายวัน"
    ],
    "example": "You should exchange your local currency into Japanese yen before traveling.",
    "exampleThai": "คุณควรแลกเปลี่ยนสกุลเงินตราท้องถิ่นของคุณเป็นเงินเยนญี่ปุ่นก่อนออกเดินทาง"
  },
  {
    "id": "v_b1_shop_03",
    "word": "budget",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "งบประมาณ",
    "alternatives": [
      "กำไรสุทธิ",
      "หนี้สินค้างชำระ",
      "เงินปันผล"
    ],
    "example": "Creating a monthly budget helps families control household spending.",
    "exampleThai": "การวางแผนงบประมาณประจำเดือนช่วยให้ครอบครัวควบคุมค่าใช้จ่ายในบ้านได้"
  },
  {
    "id": "v_b1_shop_04",
    "word": "investment",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "การลงทุน",
    "alternatives": [
      "การใช้จ่ายฟุ่มเฟือย",
      "การกู้หนี้ยืมสิน",
      "การเสี่ยงโชค"
    ],
    "example": "Education is the most rewarding long-term investment for a child’s future.",
    "exampleThai": "การศึกษาคือการลงทุนระยะยาวที่คุ้มค่าที่สุดสำหรับอนาคตของเด็ก"
  },
  {
    "id": "v_b1_shop_05",
    "word": "loan",
    "pos": "n.",
    "level": "B1",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "เงินกู้ยืม",
    "alternatives": [
      "เงินให้เปล่า",
      "เงินรางวัลสลาก",
      "รายได้จากการขาย"
    ],
    "example": "They applied for a low-interest bank loan to purchase their first family home.",
    "exampleThai": "พวกเขายื่นขอเงินกู้ยืมจากธนาคารในอัตราดอกเบี้ยต่ำเพื่อซื้อบ้านหลังแรกของครอบครัว"
  },
  {
    "id": "v_b2_shop_01",
    "word": "inflation",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ภาวะเงินเฟ้อ",
    "alternatives": [
      "ภาวะเงินฝืด",
      "การลดอัตราดอกเบี้ย",
      "การล้มละลายทางการเงิน"
    ],
    "example": "Rising food and fuel costs are direct consequences of high inflation.",
    "exampleThai": "ราคาอาหารและเชื้อเพลิงที่เพิ่มขึ้นเป็นผลโดยตรงจากภาวะเงินเฟ้อที่พุ่งสูง"
  },
  {
    "id": "v_b2_shop_02",
    "word": "transaction",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ธุรกรรมการเงิน",
    "alternatives": [
      "การเปิดบัญชีใหม่",
      "การขอสินเชื่อ",
      "การลืมรหัสบัตร"
    ],
    "example": "Online mobile banking confirms every financial transaction instantly via SMS.",
    "exampleThai": "ธนาคารบนมือถือออนไลน์ยืนยันทุกธุรกรรมการเงินได้ทันทีผ่านข้อความ"
  },
  {
    "id": "v_b2_shop_03",
    "word": "bankrupt",
    "pos": "adj.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "ล้มละลาย",
    "alternatives": [
      "ร่ำรวยมั่งคั่ง",
      "มีสภาพคล่องสูง",
      "เติบโตรวดเร็ว"
    ],
    "example": "Poor management drove the once-flourishing airline completely bankrupt.",
    "exampleThai": "การบริหารจัดการที่ย่ำแย่ทำให้สายการบินที่เคยรุ่งเรืองต้องล้มละลายลงอย่างสิ้นเชิง"
  },
  {
    "id": "v_b2_shop_04",
    "word": "wholesale",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "การขายส่ง",
    "alternatives": [
      "การขายปลีกหน้าร้าน",
      "การประมูลของเก่า",
      "การเปิดให้เช่า"
    ],
    "example": "Small retailers purchase goods at wholesale prices to resell for a profit.",
    "exampleThai": "ร้านค้าปลีกขนาดเล็กซื้อสินค้าในราคาการขายส่งเพื่อนำไปขายต่อเอากำไร"
  },
  {
    "id": "v_b2_shop_05",
    "word": "revenue",
    "pos": "n.",
    "level": "B2",
    "category": "shopping-money",
    "categoryLabel": "ซื้อของ & การเงิน",
    "thai": "รายได้รวม",
    "alternatives": [
      "ต้นทุนการผลิต",
      "ค่าเสื่อมราคา",
      "ค่าปรับทางกฎหมาย"
    ],
    "example": "The company reported a record-breaking increase in annual revenue.",
    "exampleThai": "บริษัทรายงานตัวเลขการเพิ่มขึ้นของรายได้รวมประจำปีที่เป็นสถิติสูงสุด"
  },
  {
    "id": "v_a1_feelings_01",
    "word": "happy",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีความสุข",
    "alternatives": [
      "เศร้าหมอง",
      "โกรธแค้น",
      "หวาดหวั่น"
    ],
    "example": "The boy felt so happy when he opened his birthday presents.",
    "exampleThai": "เด็กชายรู้สึกมีความสุขมากเมื่อได้เปิดกล่องของขวัญวันเกิด"
  },
  {
    "id": "v_a1_feelings_02",
    "word": "tired",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เหนื่อยล้า",
    "alternatives": [
      "สดชื่นกระปรี้กระเปร่า",
      "แข็งแรงคึกคัก",
      "ตื่นเต้นดีใจ"
    ],
    "example": "I was exhausted and tired after cycling uphill all afternoon.",
    "exampleThai": "ฉันรู้สึกหมดแรงและเหนื่อยล้าหลังจากปั่นจักรยานขึ้นเนินตลอดช่วงบ่าย"
  },
  {
    "id": "v_a1_feelings_03",
    "word": "sad",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เศร้าใจ",
    "alternatives": [
      "เบิกบานใจ",
      "ภาคภูมิใจ",
      "สนุกสนาน"
    ],
    "example": "She felt very sad when her pet goldfish died.",
    "exampleThai": "เธอรู้สึกเศร้าใจมากเมื่อปลาทองสัตว์เลี้ยงของเธอตายจากไป"
  },
  {
    "id": "v_a1_feelings_04",
    "word": "angry",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "โกรธเคือง",
    "alternatives": [
      "ใจเย็นสงบ",
      "สบายอกสบายใจ",
      "ร่าเริงแจ่มใส"
    ],
    "example": "He got angry when his younger brother broke his favorite toy.",
    "exampleThai": "เขาโกรธเคืองเมื่อน้องชายทำของเล่นชิ้นโปรดของเขาพัง"
  },
  {
    "id": "v_a1_feelings_05",
    "word": "kind",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีน้ำใจ",
    "alternatives": [
      "ดุร้ายเกรี้ยวกราด",
      "เห็นแก่ตัว",
      "เย็นชาเฉยเมย"
    ],
    "example": "It was very kind of you to help the elderly lady carry her bags.",
    "exampleThai": "คุณมีน้ำใจมากที่ช่วยคุณยายถือกระเป๋าเดินทาง"
  },
  {
    "id": "v_a1_feelings_06",
    "word": "scared",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "หวาดกลัว",
    "alternatives": [
      "กล้าหาญเด็ดเดี่ยว",
      "มั่นใจในตนเอง",
      "ผ่อนคลายสบายใจ"
    ],
    "example": "The loud thunder in the night made the little puppy scared.",
    "exampleThai": "เสียงฟ้าร้องดังในยามค่ำคืนทำให้ลูกสุนัขตัวน้อยหวาดกลัว"
  },
  {
    "id": "v_a1_feelings_07",
    "word": "friendly",
    "pos": "adj.",
    "level": "A1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "เป็นมิตร",
    "alternatives": [
      "ขี้โมโห",
      "หยิ่งยโส",
      "แปลกหน้า"
    ],
    "example": "Our new neighbors are remarkably friendly and helpful.",
    "exampleThai": "เพื่อนบ้านใหม่ของเราเป็นมิตรและพร้อมช่วยเหลืออย่างน่าประทับใจ"
  },
  {
    "id": "v_a2_feelings_01",
    "word": "anxious",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "กังวลใจ",
    "alternatives": [
      "ผ่อนคลายสบายอารมณ์",
      "กล้าเสี่ยง",
      "นิ่งนอนใจ"
    ],
    "example": "She felt anxious right before taking the national math exam.",
    "exampleThai": "เธอรู้สึกกังวลใจทันทีก่อนที่จะต้องลงมือทำข้อสอบคณิตศาสตร์ระดับชาติ"
  },
  {
    "id": "v_a2_feelings_02",
    "word": "excited",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ตื่นเต้น",
    "alternatives": [
      "เบื่อหน่าย",
      "ง่วงซึม",
      "เฉยชา"
    ],
    "example": "The students were excited about the upcoming school camping trip.",
    "exampleThai": "นักเรียนทุกคนต่างรู้สึกตื่นเต้นกับทริปตั้งแคมป์ของโรงเรียนที่กำลังจะมาถึง"
  },
  {
    "id": "v_a2_feelings_03",
    "word": "polite",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "สุภาพเรียบร้อย",
    "alternatives": [
      "หยาบคายก้าวร้าว",
      "ดื้อดึงไม่ฟังใคร",
      "เจ้าอารมณ์"
    ],
    "example": "Saying please and thank you shows that you are well-mannered and polite.",
    "exampleThai": "การพูดได้โปรดและขอบคุณแสดงให้เห็นว่าคุณเป็นคนมีมารยาทและสุภาพเรียบร้อย"
  },
  {
    "id": "v_a2_feelings_04",
    "word": "nervous",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ประหม่า",
    "alternatives": [
      "สุขุมรอบคอบ",
      "อาจหาญ",
      "ร่าเริงบันเทิงใจ"
    ],
    "example": "His hands shook slightly because he felt nervous speaking on stage.",
    "exampleThai": "มือของเขาสั่นเล็กน้อยเพราะเขารู้สึกประหม่าที่ต้องพูดบนเวที"
  },
  {
    "id": "v_a2_feelings_05",
    "word": "honest",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ซื่อสัตย์",
    "alternatives": [
      "หลอกลวงตลบแตลง",
      "โลเลไม่แน่นอน",
      "ขี้ขลาดตาขาว"
    ],
    "example": "An honest student returned the lost wallet to the teacher.",
    "exampleThai": "นักเรียนที่ซื่อสัตย์ได้นำกระเป๋าสตางค์ที่ตกหล่นไปส่งคืนให้คุณครู"
  },
  {
    "id": "v_a2_feelings_06",
    "word": "calm",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "สงบเยือกเย็น",
    "alternatives": [
      "ตื่นตระหนกตกใจ",
      "ว้าวุ่นกระวนกระวาย",
      "ฉุนเฉียวง่าย"
    ],
    "example": "Stay calm and breathe slowly if an emergency occurs.",
    "exampleThai": "ตั้งสติให้สงบเยือกเย็นและหายใจช้าๆ หากเกิดเหตุฉุกเฉินขึ้น"
  },
  {
    "id": "v_a2_feelings_07",
    "word": "proud",
    "pos": "adj.",
    "level": "A2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ภาคภูมิใจ",
    "alternatives": [
      "อับอายขายหน้า",
      "ผิดหวังท้อแท้",
      "น้อยเนื้อต่ำใจ"
    ],
    "example": "Her parents were very proud when she graduated with top honors.",
    "exampleThai": "พ่อแม่ของเธอรู้สึกภาคภูมิใจมากเมื่อเธอสำเร็จการศึกษาด้วยเกียรตินิยมอันดับหนึ่ง"
  },
  {
    "id": "v_b1_feelings_01",
    "word": "generous",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ใจกว้างเอื้อเฟื้อ",
    "alternatives": [
      "ตระหนี่ถี่เหนียว",
      "ขี้อิจฉาริษยา",
      "เย็นชาไร้หัวใจ"
    ],
    "example": "The generous donor provided scholarships for twenty underprivileged students.",
    "exampleThai": "ผู้บริจาคผู้มีใจกว้างเอื้อเฟื้อได้มอบทุนการศึกษาให้แก่นักเรียนที่ขาดแคลนจำนวน 20 คน"
  },
  {
    "id": "v_b1_feelings_02",
    "word": "confident",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีความมั่นใจ",
    "alternatives": [
      "ขี้อายไม่กล้าแสดงออก",
      "ลังเลไม่แน่ใจ",
      "ตระหนกง่าย"
    ],
    "example": "Regular speaking practice made her confident during English presentations.",
    "exampleThai": "การฝึกพูดอย่างสม่ำเสมอทำให้เธอมีความมั่นใจระหว่างการนำเสนอภาษาอังกฤษ"
  },
  {
    "id": "v_b1_feelings_03",
    "word": "curious",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ใคร่รู้สงสัย",
    "alternatives": [
      "เพิกเฉยไม่แยแส",
      "ชินชาเฉื่อยเนือย",
      "ไม่สนใจใยดี"
    ],
    "example": "Curious young minds are always asking exciting scientific questions.",
    "exampleThai": "เด็กๆ ที่มีความใคร่รู้สงสัยมักจะตั้งคำถามทางวิทยาศาสตร์ที่น่าตื่นเต้นอยู่เสมอ"
  },
  {
    "id": "v_b1_feelings_04",
    "word": "grateful",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "กตัญญูรู้คุณ",
    "alternatives": [
      "เนรคุณลืมตัว",
      "ขุ่นเคืองไม่พอใจ",
      "เรียกร้องไม่สิ้นสุด"
    ],
    "example": "I am deeply grateful for all the support my family gave me.",
    "exampleThai": "ฉันรู้สึกกตัญญูรู้คุณอย่างสุดซึ้งต่อการสนับสนุนทั้งหมดที่ครอบครัวมอบให้"
  },
  {
    "id": "v_b1_feelings_05",
    "word": "jealous",
    "pos": "adj.",
    "level": "B1",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ขี้อิจฉา",
    "alternatives": [
      "ยินดีด้วยใจจริง",
      "มีน้ำใจนักกีฬา",
      "ชื่นชมสรรเสริญ"
    ],
    "example": "Try to celebrate your friends achievements instead of feeling jealous.",
    "exampleThai": "พยายามร่วมยินดีกับความสำเร็จของเพื่อนแทนที่จะรู้สึกขี้อิจฉา"
  },
  {
    "id": "v_b2_feelings_01",
    "word": "stubborn",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ดื้อรั้น",
    "alternatives": [
      "ว่าง่ายสอนง่าย",
      "คล้อยตามผู้อื่น",
      "อ่อนโยนประนีประนอม"
    ],
    "example": "He was too stubborn to admit that his navigation map was upside down.",
    "exampleThai": "เขาดื้อรั้นเกินกว่าจะยอมรับว่าตนเองกำลังถือแผนที่นำทางกลับหัวอยู่"
  },
  {
    "id": "v_b2_feelings_02",
    "word": "empathy",
    "pos": "n.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "ความเห็นอกเห็นใจ",
    "alternatives": [
      "ความเย็นชาเฉยเมย",
      "ความริษยาชิงชัง",
      "ความหลงตัวเอง"
    ],
    "example": "Great leaders demonstrate deep empathy when listening to team concerns.",
    "exampleThai": "ผู้นำที่ดีแสดงความเห็นอกเห็นใจอย่างลึกซึ้งเมื่อรับฟังข้อกังวลของทีมงาน"
  },
  {
    "id": "v_b2_feelings_03",
    "word": "optimistic",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มองโลกแง่ดี",
    "alternatives": [
      "มองโลกแง่ร้าย",
      "หวาดระแวงท้อถอย",
      "สิ้นหวังหมดกำลังใจ"
    ],
    "example": "She remains optimistic about passing the scholarship exam despite tough odds.",
    "exampleThai": "เธอยังคงมองโลกแง่ดีเกี่ยวกับการสอบผ่านชิงทุนแม้ว่าจะมีการแข่งขันที่ยากลำบาก"
  },
  {
    "id": "v_b2_feelings_04",
    "word": "pessimistic",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มองโลกแง่ร้าย",
    "alternatives": [
      "ร่าเริงแจ่มใส",
      "มีความหวังเปี่ยมล้น",
      "เปิดรับสิ่งใหม่"
    ],
    "example": "Do not be so pessimistic before we have even tested the prototype.",
    "exampleThai": "อย่าเพิ่งมองโลกแง่ร้ายจนเกินไปก่อนที่เราจะได้ทดสอบเครื่องต้นแบบนี้ด้วยซ้ำ"
  },
  {
    "id": "v_b2_feelings_05",
    "word": "compassionate",
    "pos": "adj.",
    "level": "B2",
    "category": "feelings-personality",
    "categoryLabel": "อารมณ์ & บุคลิก",
    "thai": "มีเมตตากรุณา",
    "alternatives": [
      "โหดร้ายทารุณ",
      "ไร้ความรู้สึก",
      "ตระหนี่ใจแคบ"
    ],
    "example": "The compassionate volunteer comforted scared stray animals at the rescue shelter.",
    "exampleThai": "อาสาสมัครผู้มีเมตตากรุณาคอยปลอบโยนสัตว์จรจัดที่หวาดกลัว ณ สถานสงเคราะห์สัตว์"
  }
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
