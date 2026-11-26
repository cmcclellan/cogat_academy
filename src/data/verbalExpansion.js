// Original Grade 2 items. Difficulty describes authoring complexity, not a normed scale.
// The final six items in each subtest are held out from routine practice.
const p = (emoji, label) => ({ emoji, label });
const drawing = (illustration, label) => ({ illustration, label });
const P = {
  scissors: p('\u2702\uFE0F', 'Scissors'), paper: p('\u{1F4C4}', 'Paper'), saw: p('\u{1FA9A}', 'Saw'),
  logs: p('\u{1FAB5}', 'Logs'), book: p('\u{1F4D6}', 'Book'), tree: p('\u{1F333}', 'Tree'),
  fish: p('\u{1F420}', 'Fish'), water: p('\u{1F30A}', 'Water'), camel: p('\u{1F42A}', 'Camel'),
  desert: p('\u{1F3DC}\uFE0F', 'Desert'), mountain: p('\u{1F3D4}\uFE0F', 'Mountain'),
  nest: p('\u{1FAB9}', 'Nest'), rabbit: p('\u{1F407}', 'Rabbit'), carrot: p('\u{1F955}', 'Carrot'),
  squirrel: p('\u{1F43F}\uFE0F', 'Squirrel'), chestnut: p('\u{1F330}', 'Chestnut'),
  shoe: p('\u{1F45F}', 'Shoe'), leaf: p('\u{1F343}', 'Leaf'), banana: p('\u{1F34C}', 'Banana'),
  yellow: p('\u{1F7E8}', 'Yellow'), broccoli: p('\u{1F966}', 'Broccoli'), green: p('\u{1F7E9}', 'Green'),
  red: p('\u{1F7E5}', 'Red'), blue: p('\u{1F7E6}', 'Blue'), purple: p('\u{1F7EA}', 'Purple'),
  footprints: p('\u{1F463}', 'Human Footprints'), person: p('\u{1F9CD}', 'Person'),
  pawprints: p('\u{1F43E}', 'Paw Prints'), dog: p('\u{1F415}', 'Dog'), bird: p('\u{1F426}', 'Bird'),
  butterfly: p('\u{1F98B}', 'Butterfly'), umbrella: p('\u2602\uFE0F', 'Umbrella'), rain: p('\u{1F327}\uFE0F', 'Rain'),
  sunglasses: p('\u{1F576}\uFE0F', 'Sunglasses'), sun: p('\u2600\uFE0F', 'Sun'),
  snow: p('\u2744\uFE0F', 'Snowflake'), rainbow: p('\u{1F308}', 'Rainbow'),
  feather: p('\u{1FAB6}', 'Feather'), shell: p('\u{1F41A}', 'Seashell'),
  key: p('\u{1F511}', 'Key'), lock: p('\u{1F512}', 'Lock'),
  television: p('\u{1F4FA}', 'Television'), videoGame: p('\u{1F3AE}', 'Game Controller'),
  lightBulb: p('\u{1F4A1}', 'Light Bulb'), phone: p('\u{1F4DE}', 'Telephone'),
  egg: p('\u{1F95A}', 'Egg'), chick: p('\u{1F423}', 'Hatching Chick'),
  seedling: p('\u{1F331}', 'Seedling'), flower: p('\u{1F33C}', 'Flower'),
  firefighter: p('\u{1F9D1}\u200D\u{1F692}', 'Firefighter'), firetruck: p('\u{1F692}', 'Fire Truck'),
  doctor: p('\u{1F9D1}\u200D\u2695\uFE0F', 'Doctor'), hospital: p('\u{1F3E5}', 'Hospital'),
  teacher: p('\u{1F9D1}\u200D\u{1F3EB}', 'Teacher'), school: p('\u{1F3EB}', 'School'),
  farmer: p('\u{1F9D1}\u200D\u{1F33E}', 'Farmer'), tractor: p('\u{1F69C}', 'Tractor'),
  ambulance: p('\u{1F691}', 'Ambulance'), rocket: p('\u{1F680}', 'Rocket'),
  corn: p('\u{1F33D}', 'Corn'), popcorn: p('\u{1F37F}', 'Popcorn'), potato: p('\u{1F954}', 'Potato'),
  fries: p('\u{1F35F}', 'French Fries'), rice: p('\u{1F35A}', 'Cooked Rice'),
  fire: p('\u{1F525}', 'Fire'), ice: p('\u{1F9CA}', 'Ice'), snowman: p('\u26C4', 'Snowman'),
  crown: p('\u{1F451}', 'Crown'), king: p('\u{1F934}', 'King'), balletShoes: p('\u{1FA70}', 'Ballet Shoes'),
  dancer: p('\u{1F483}', 'Dancer'), detective: p('\u{1F575}\uFE0F', 'Detective'),
  toothbrush: p('\u{1FAA5}', 'Toothbrush'), teeth: p('\u{1F9B7}', 'Tooth'), soap: p('\u{1F9FC}', 'Soap'),
  hands: p('\u{1F450}', 'Hands'), eyes: p('\u{1F440}', 'Eyes'), ear: p('\u{1F442}', 'Ear'),
  bell: p('\u{1F514}', 'Bell'), eye: p('\u{1F441}\uFE0F', 'Eye'), picture: p('\u{1F5BC}\uFE0F', 'Picture'),
  nose: p('\u{1F443}', 'Nose'), tongue: p('\u{1F445}', 'Tongue'),
  skates: p('\u26F8\uFE0F', 'Ice Skate'), skis: p('\u{1F3BF}', 'Skis'),
  sand: p('\u{1F3D6}\uFE0F', 'Sandy Beach'), envelope: p('\u2709\uFE0F', 'Envelope'),
  suitcase: p('\u{1F9F3}', 'Suitcase'), shirt: p('\u{1F455}', 'Shirt'), airplane: p('\u2708\uFE0F', 'Airplane'),
  spider: p('\u{1F577}\uFE0F', 'Spider'), web: p('\u{1F578}\uFE0F', 'Spider Web'),
  beaver: p('\u{1F9AB}', 'Beaver'), dam: drawing('dam', 'Dam'), tent: p('\u26FA', 'Tent'),
  soapBubbles: p('\u{1FAE7}', 'Bubbles'), spoon: p('\u{1F944}', 'Spoon'), cap: p('\u{1F9E2}', 'Cap'),
  soup: p('\u{1F372}', 'Soup'), forkKnife: p('\u{1F374}', 'Fork and Knife'),
  drops: p('\u{1F4A7}', 'Water'), bone: p('\u{1F9B4}', 'Bone'), cookie: p('\u{1F36A}', 'Cookie'),
  broom: p('\u{1F9F9}', 'Broom'), hammer: p('\u{1F528}', 'Hammer'), comb: p('\u{1FAAE}', 'Comb'),
  flashlight: p('\u{1F526}', 'Flashlight'), candle: p('\u{1F56F}\uFE0F', 'Candle'),
  clock: p('\u{1F552}', 'Clock'), headphones: p('\u{1F3A7}', 'Headphones'), drum: p('\u{1F941}', 'Drum'),
  hat: p('\u{1F3A9}', 'Top Hat'), boots: p('\u{1F462}', 'Boots'), sandals: p('\u{1F461}', 'Sandals'),
  flatShoe: p('\u{1F97F}', 'Flat Shoe'), freezer: drawing('freezer', 'Freezer'), oven: drawing('oven', 'Oven'),
  basket: p('\u{1F9FA}', 'Basket'), magnifier: p('\u{1F50D}', 'Magnifying Glass'),
  telescope: p('\u{1F52D}', 'Telescope'), microscope: p('\u{1F52C}', 'Microscope'),
  box: p('\u{1F4E6}', 'Box'), bottle: p('\u{1F37C}', 'Baby Bottle'), cup: p('\u2615', 'Mug'),
  cloud: p('\u2601\uFE0F', 'Sky'), wateringCan: drawing('watering_can', 'Watering Can'),
  paintRoller: drawing('paint_roller', 'Paint Roller'), thermometer: p('\u{1F321}\uFE0F', 'Thermometer'),
  bandage: p('\u{1FA79}', 'Bandage'), stethoscope: p('\u{1FA7A}', 'Stethoscope'),
  scale: p('\u2696\uFE0F', 'Balance Scale'), ruler: p('\u{1F4CF}', 'Ruler'), abacus: p('\u{1F9EE}', 'Abacus'),
  bee: p('\u{1F41D}', 'Bee'), ant: p('\u{1F41C}', 'Ant'), ladybug: p('\u{1F41E}', 'Ladybug'),
  snail: p('\u{1F40C}', 'Snail'), worm: p('\u{1FAB1}', 'Worm'), pineapple: p('\u{1F34D}', 'Pineapple'),
  watermelon: p('\u{1F349}', 'Watermelon'), peach: p('\u{1F351}', 'Peach'), pear: p('\u{1F350}', 'Pear'),
  ball: p('\u26BD', 'Soccer Ball'), bus: p('\u{1F68D}', 'Bus'), taxi: p('\u{1F695}', 'Taxi'),
  scooter: p('\u{1F6F5}', 'Motor Scooter'), bike: p('\u{1F6B2}', 'Bicycle'), sailboat: p('\u26F5', 'Sailboat'),
  dress: p('\u{1F457}', 'Dress'), coat: p('\u{1F9E5}', 'Coat'), pants: p('\u{1F456}', 'Pants'),
  knife: p('\u{1F52A}', 'Kitchen Knife'), axe: p('\u{1FA93}', 'Axe'),
  iceCream: p('\u{1F366}', 'Ice Cream'), newspaper: p('\u{1F4F0}', 'Newspaper'), scroll: p('\u{1F4DC}', 'Scroll'),
  microphone: p('\u{1F3A4}', 'Microphone'), palette: p('\u{1F3A8}', 'Paint Palette'),
  apple: p('\u{1F34E}', 'Apple'), cherries: p('\u{1F352}', 'Cherries'), lemon: p('\u{1F34B}', 'Lemon'),
  grapes: p('\u{1F347}', 'Grapes'), bread: p('\u{1F35E}', 'Bread'), whale: p('\u{1F40B}', 'Whale'),
  dolphin: p('\u{1F42C}', 'Dolphin'), seal: p('\u{1F9AD}', 'Seal'), otter: p('\u{1F9A6}', 'Otter'),
  octopus: p('\u{1F419}', 'Octopus'), shark: p('\u{1F988}', 'Shark'),
  cricket: p('\u{1F3CF}', 'Cricket Bat and Ball'), tennis: drawing('tennis_racket', 'Tennis Racket and Ball'),
  badminton: p('\u{1F3F8}', 'Badminton Racket and Shuttlecock'), pingPong: p('\u{1F3D3}', 'Table Tennis Paddle and Ball'),
  skateboard: p('\u{1F6F9}', 'Skateboard'), onion: p('\u{1F9C5}', 'Onion'), garlic: p('\u{1F9C4}', 'Garlic'),
  helmet: p('\u{1FA96}', 'Helmet'), ring: p('\u{1F48D}', 'Ring'), sock: p('\u{1F9E6}', 'Sock'),
  glove: p('\u{1F9E4}', 'Glove'), sponge: p('\u{1F9FD}', 'Sponge'), needle: p('\u{1FAA1}', 'Needle'),
  paintbrush: p('\u{1F58C}\uFE0F', 'Paintbrush'), bucket: p('\u{1FAA3}', 'Bucket'),
  teapot: p('\u{1FAD6}', 'Teapot'), plate: p('\u{1F37D}\uFE0F', 'Plate'), bowl: p('\u{1F963}', 'Bowl'),
  chicken: p('\u{1F414}', 'Chicken'), penguin: p('\u{1F427}', 'Penguin'), turtle: p('\u{1F422}', 'Turtle'),
  duck: p('\u{1F986}', 'Duck'), cat: p('\u{1F408}', 'Cat'), cow: p('\u{1F404}', 'Cow'),
  canoe: p('\u{1F6F6}', 'Canoe'), ship: p('\u{1F6A2}', 'Ship'), speedboat: p('\u{1F6A4}', 'Speedboat'),
  helicopter: p('\u{1F681}', 'Helicopter'), train: p('\u{1F682}', 'Train'),
  mirror: p('\u{1FA9E}', 'Mirror'), moon: p('\u{1F319}', 'Moon')
};

const DIRECTIONS = {
  picture_analogy: 'Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?',
  sentence_completion: 'Listen to the sentence. Which picture completes it?',
  picture_classification: 'Look at the three pictures. Which choice belongs in the same group?'
};
const wrong = (key, misconception) => ({ ...P[key], misconception });
const checkSettings = [
  ['check_1', 'easy'], ['check_1', 'medium'], ['check_2', 'medium'],
  ['check_2', 'hard'], ['check_3', 'easy'], ['check_3', 'hard']
];
function make(kind, index, skillId, skillName, data, correctKey, distractors, description, parentTip) {
  const heldOut = index >= 12;
  const [testId, difficulty] = heldOut ? checkSettings[index - 12]
    : [[ 'foundations', 'easy' ], [ 'developing', 'medium' ], [ 'stretch', 'hard' ]][Math.floor(index / 4)];
  const options = [...distractors];
  const correctAnswer = index % 4;
  options.splice(correctAnswer, 0, { ...P[correctKey] });
  const prefix = { picture_analogy: 'pa', sentence_completion: 'sc', picture_classification: 'pc' }[kind];
  return {
    id: `g2_x_${prefix}${String(index + 1).padStart(2, '0')}`, grade: '2', testId,
    purpose: heldOut ? 'check' : 'practice', batteryId: 'verbal',
    subtestId: { picture_analogy: 'picture_analogies', sentence_completion: 'sentence_completion', picture_classification: 'picture_classification' }[kind],
    rendererType: kind, difficulty, skillId, skillName, prompt: DIRECTIONS[kind],
    audioScript: kind === 'sentence_completion' ? data.sentence.replace(/_+/g, 'blank') + ' Which picture completes the sentence?' : DIRECTIONS[kind],
    data, options: options.map((option, i) => ({ ...option, id: String.fromCharCode(65 + i) })), correctAnswer,
    explanation: { rule: skillName, description,
      whyOthersWrong: distractors.map(o => `${o.label}: ${o.misconception}`).join(' '), parentTip }
  };
}
const analogy = (index, skillId, skillName, a, b, c, answer, errors, description, tip) => make('picture_analogy', index, skillId, skillName,
  { topPair: [P[a], P[b]], bottomStimulus: P[c] }, answer, errors, description, tip);
const sentence = (index, skillId, skillName, text, answer, errors, description, tip) => make('sentence_completion', index, skillId, skillName,
  { sentence: text }, answer, errors, description, tip);
const classification = (index, skillId, skillName, group, answer, errors, description, tip) => make('picture_classification', index, skillId, skillName,
  { items: group.map(key => P[key]) }, answer, errors, description, tip);

const analogies = [
  analogy(0, 'tool_material', 'Tool and material', 'scissors', 'paper', 'saw', 'logs', [
    wrong('book', 'A book is made of paper, but logs are the material a saw cuts in this pair.'),
    wrong('key', 'A key opens a lock; it is not a material cut by a saw.'), wrong('spoon', 'A spoon is another tool, not the material being cut.')
  ], 'Scissors cut paper. In the same way, a saw cuts logs.', 'Name what the first tool does to the second picture, then keep that action.'),
  analogy(1, 'animal_habitat', 'Animal and habitat', 'fish', 'water', 'camel', 'desert', [
    wrong('nest', 'A nest is a shelter for some animals, but it is not the camel habitat shown by this relationship.'),
    wrong('saw', 'A saw is a tool, not a habitat.'), wrong('book', 'A book can show an animal, but it is not where the animal lives.')
  ], 'Fish live in water. Camels are adapted to live in deserts.', 'Ask which choice names the kind of place where the animal lives.'),
  analogy(2, 'animal_food', 'Animal and food', 'rabbit', 'carrot', 'squirrel', 'chestnut', [
    wrong('tree', 'A squirrel may climb a tree, but this pair asks for something it eats.'),
    wrong('squirrel', 'Repeating the animal does not supply its food.'), wrong('shoe', 'A shoe is not squirrel food.')
  ], 'A rabbit can eat a carrot. A squirrel can eat a chestnut. The relationship is animal to a food it eats.', 'Use a short sentence that names the same relationship for both pairs.'),
  analogy(3, 'object_colour', 'Object and usual color', 'banana', 'yellow', 'broccoli', 'green', [
    wrong('red', 'Red does not match the broccoli shown.'), wrong('blue', 'Blue does not match the broccoli shown.'),
    wrong('purple', 'Purple does not match the green broccoli shown.')
  ], 'The banana shown is yellow. The broccoli shown is green.', 'Compare the color of each pictured object rather than naming its category.'),
  analogy(4, 'trace_maker', 'Trace and maker', 'footprints', 'person', 'pawprints', 'dog', [
    wrong('bird', 'A bird leaves a different kind of track from these paw prints.'), wrong('butterfly', 'A butterfly does not leave these paw prints.'),
    wrong('shoe', 'A shoe can make a human footprint, but the bottom picture shows animal paw prints.')
  ], 'Human footprints can be left by a person. Paw prints like these can be left by a dog.', 'Notice whether the pair goes from maker to mark or from mark to maker.'),
  analogy(5, 'protection_condition', 'Protection and condition', 'umbrella', 'rain', 'sunglasses', 'sun', [
    wrong('rainbow', 'A rainbow can appear in the sky, but sunglasses are used to reduce bright sunlight.'),
    wrong('snow', 'A snowflake does not match the everyday sunlight relationship in this pair.'),
    wrong('umbrella', 'An umbrella is another protective object, not the condition it protects against.')
  ], 'An umbrella helps protect against rain. Sunglasses help protect the eyes from bright sunlight.', 'Ask what each object helps protect someone from.'),
  analogy(6, 'part_whole', 'Part and whole', 'leaf', 'tree', 'feather', 'bird', [
    wrong('nest', 'A bird may use feathers in a nest, but a feather is a body part of a bird.'),
    wrong('shell', 'A shell belongs to a different kind of animal; it is not the whole that has feathers.'),
    wrong('tree', 'A feather may land in a tree, but it is not part of the tree.')
  ], 'A leaf is part of a tree. A feather is part of a bird.', 'Keep the direction part first, whole second.'),
  analogy(7, 'worker_workplace', 'Worker and workplace', 'doctor', 'hospital', 'teacher', 'school', [
    wrong('book', 'A book is something a teacher uses, rather than the workplace.'),
    wrong('thermometer', 'A thermometer is a medical tool, rather than a teacher workplace.'), wrong('tractor', 'A tractor is farm equipment, rather than a teacher workplace.')
  ], 'A doctor can work in a hospital. A teacher can work in a school.', 'Several things may connect to a worker. Keep the specific relationship worker to workplace.'),
  analogy(8, 'growth_change', 'Earlier stage and later stage', 'egg', 'chick', 'seedling', 'tree', [
    wrong('leaf', 'A leaf is a part of a plant, rather than the larger plant the seedling can become.'),
    wrong('chestnut', 'A chestnut may grow into a seedling, which reverses the direction of the relationship.'),
    wrong('wateringCan', 'A watering can helps a plant grow; it is not what the plant becomes.')
  ], 'An egg can hatch into a chick. A tree seedling can grow into a tree. Both pairs move from an earlier stage to a later stage.', 'Ask what each living thing can become, not what helps it grow.'),
  analogy(9, 'worker_vehicle', 'Worker and work vehicle', 'firefighter', 'firetruck', 'farmer', 'tractor', [
    wrong('ambulance', 'An ambulance is mainly used by emergency medical workers, rather than for farm work.'),
    wrong('rocket', 'A rocket is used for space travel, rather than farm work.'), wrong('corn', 'Corn is something a farmer may grow, rather than a vehicle the farmer uses.')
  ], 'A firefighter uses a fire truck for work. A farmer uses a tractor for farm work.', 'Several choices may connect to the worker. Keep the specific relationship work vehicle.'),
  analogy(10, 'food_processing', 'Ingredient and prepared food', 'corn', 'popcorn', 'potato', 'fries', [
    wrong('rice', 'Cooked rice is made from rice grains, not potatoes.'), wrong('popcorn', 'Popcorn repeats the first finished food instead of showing a food made from potatoes.'),
    wrong('knife', 'A knife can help prepare food, but it is a tool rather than the finished food.')
  ], 'Corn kernels can be heated to make popcorn. Potatoes can be cut and cooked to make French fries.', 'Distinguish the ingredient, the tool, and the finished food.'),
  analogy(11, 'contrasting_temperature', 'Hot example and cold example', 'fire', 'ice', 'sun', 'snowman', [
    wrong('candle', 'A burning candle is another hot example, so it does not preserve the hot-to-cold contrast.'),
    wrong('lightBulb', 'A light bulb relates to light, but it is not the cold example in this pair.'),
    wrong('rainbow', 'A rainbow is not an example of something frozen or cold.')
  ], 'Fire is hot and ice is cold. The sun is hot, while a snowman is made from cold snow. Both pairs contrast hot with cold.', 'Look for the contrasting feature rather than an object that merely belongs in the sky.'),
  analogy(12, 'clothing_wearer', 'Special clothing and wearer', 'crown', 'king', 'balletShoes', 'dancer', [
    wrong('detective', 'A detective is a person, but ballet shoes belong with dancing.'),
    wrong('firefighter', 'A firefighter uses protective boots for work, rather than ballet shoes.'),
    wrong('balletShoes', 'Repeating the clothing does not identify its wearer.')
  ], 'A king may wear a crown. A dancer may wear ballet shoes. Each first picture is something worn by the person in the second picture.', 'Keep the clothing-to-wearer direction.'),
  analogy(13, 'cleaner_target', 'Cleaning item and what it cleans', 'toothbrush', 'teeth', 'soap', 'hands', [
    wrong('comb', 'A comb is another grooming tool, not what the soap cleans in this relationship.'),
    wrong('eye', 'Soap should be kept out of the eyes.'), wrong('soap', 'Repeating the cleaning item does not give its target.')
  ], 'A toothbrush cleans teeth. Soap and water are used to clean hands.', 'Name the job of the item, then identify what receives that action.'),
  analogy(14, 'sense_information', 'Sense organ and something sensed', 'ear', 'bell', 'eye', 'picture', [
    wrong('nose', 'A nose is another sense organ, but the second position needs something seen.'),
    wrong('tongue', 'A tongue is another body part, rather than something viewed by an eye.'),
    wrong('ear', 'An ear repeats a sense organ from the first pair instead of providing a visual object.')
  ], 'An ear can hear a ringing bell. An eye can see a picture. Both pairs connect a sense organ to something it senses.', 'Say what kind of information each organ receives.'),
  analogy(15, 'equipment_surface', 'Equipment and surface', 'skates', 'ice', 'skis', 'snow', [
    wrong('sand', 'Skis in this winter-sport relationship are used on snow rather than a sandy beach.'),
    wrong('skateboard', 'A skateboard is another piece of equipment, rather than a surface.'),
    wrong('water', 'Water skis exist, but the pictured winter skis with poles are for snow.')
  ], 'An ice skate is used on ice. The pictured winter skis are used on snow.', 'Check both the relationship and the kind of equipment shown.'),
  analogy(16, 'container_contents', 'Container and contents', 'envelope', 'paper', 'suitcase', 'shirt', [
    wrong('airplane', 'A suitcase may travel on an airplane, but an airplane is not packed inside it.'),
    wrong('lock', 'A lock may secure a suitcase, but it is not the clothing carried inside.'),
    wrong('key', 'A key may unlock a suitcase, but the pair asks for ordinary contents like the letter in an envelope.')
  ], 'An envelope can contain a sheet of paper. A suitcase can contain clothing such as a shirt.', 'Ask which object goes inside the container, rather than where the container travels.'),
  analogy(17, 'animal_construction', 'Animal and structure it builds', 'spider', 'web', 'beaver', 'dam', [
    wrong('logs', 'Logs are a building material, rather than the completed structure.'),
    wrong('water', 'Water is part of the setting, rather than the structure the beaver builds.'),
    wrong('tent', 'A tent is a shelter made by people, not a beaver construction.')
  ], 'A spider builds a web. A beaver builds a dam from branches and other materials.', 'Separate the builder, the materials, and the finished structure.')
];

const sentences = [
  sentence(0, 'purpose_cleaning', 'Choose the item for a purpose', 'After splashing through mud, Nora washed her hands with water and ______.', 'soap', [
    wrong('book', 'A book is for reading, not washing hands.'), wrong('sock', 'A sock is clothing, not a cleaning item.'), wrong('toothbrush', 'A toothbrush is for teeth, not washing muddy hands.')
  ], 'Soap and water help wash dirt off hands.', 'Name the action in the sentence and choose the item used for that action.'),
  sentence(1, 'cause_light', 'Use a cause and effect clue', 'The room was dark, so Ben switched on the ______ to see his book.', 'lightBulb', [
    wrong('bell', 'A bell makes sound rather than light.'), wrong('mirror', 'A mirror reflects available light; switching it on does not light the room.'), wrong('clock', 'A clock tells time rather than lighting a book.')
  ], 'Switching on an electric light bulb helps Ben see in the dark room.', 'Listen for what changed and what the person needs.'),
  sentence(2, 'utensil_function', 'Match a utensil to its use', 'Kai used a ______ to lift soup from his bowl to his mouth.', 'spoon', [
    wrong('scissors', 'Scissors cut; they do not hold a spoonful of soup.'), wrong('comb', 'A comb is for hair, not eating soup.'), wrong('ruler', 'A ruler measures length, not a serving of soup.')
  ], 'A spoon has a small bowl that can hold soup.', 'Think about what the object must be able to hold or do.'),
  sentence(3, 'clothing_feature', 'Use a described feature', 'To keep the sun out of her eyes, Ava wore a ______ with a brim on her head.', 'cap', [
    wrong('glove', 'A glove goes on a hand and does not have a brim.'), wrong('sock', 'A sock goes on a foot and does not shade the eyes.'), wrong('ring', 'A ring goes on a finger, rather than on the head.')
  ], 'A cap has a brim that can shade the eyes from sunlight.', 'Check every clue: where it is worn and the feature it has.'),
  sentence(4, 'need_thirst', 'Infer a need from context', 'The puppy had been playing and was thirsty, so Mina filled its bowl with fresh ______.', 'drops', [
    wrong('bone', 'A bone is not a drink for a thirsty puppy.'), wrong('cookie', 'A cookie is food rather than something to drink.'), wrong('leaf', 'A leaf does not supply the drink the puppy needs.')
  ], 'A thirsty puppy needs fresh water to drink.', 'Which clue tells you whether the puppy needs food, a drink, or rest?'),
  sentence(5, 'cleaning_location', 'Choose a tool for the setting', 'Crumbs were scattered across the kitchen floor. Omar swept them into a pile with a ______.', 'broom', [
    wrong('comb', 'A comb sorts hair, rather than sweeping a floor.'), wrong('hammer', 'A hammer drives or pulls nails, rather than gathering crumbs.'), wrong('paintbrush', 'A paintbrush spreads paint; a broom is designed to sweep a floor.')
  ], 'A broom is used to sweep crumbs from a floor into a pile.', 'Act out the verb and ask which tool performs it.'),
  sentence(6, 'constraint_power', 'Combine a purpose and a constraint', 'During the power cut, the ceiling lights did not work. Eli carried a battery-powered ______ to see the stairs.', 'flashlight', [
    wrong('candle', 'A candle can give light, but it is not battery-powered.'), wrong('clock', 'A clock can use a battery, but it is not the portable light Eli needs.'), wrong('umbrella', 'An umbrella does not light the stairs.')
  ], 'A flashlight is portable, uses batteries, and provides light. It fits all the clues.', 'A choice must fit every clue, not just one of them.'),
  sentence(7, 'weather_response', 'Choose a response to changed conditions', 'The picnic table had no roof. When rain began to fall, the family opened a large ______ above their food.', 'umbrella', [
    wrong('book', 'Opening a book is not a suitable way to shelter picnic food from rain.'), wrong('basket', 'The sentence asks for something opened above the food, not its carrying container.'), wrong('sunglasses', 'Sunglasses help with bright light rather than sheltering food from rain.')
  ], 'A large umbrella can be opened above the table to help keep rain off the food.', 'Use the changed weather to decide what is needed.'),
  sentence(8, 'contrast_inference', 'Use a contrast to make an inference', 'Although the path was dry yesterday, overnight rain left deep puddles. Leo chose his waterproof ______ to keep his feet dry.', 'boots', [
    wrong('sandals', 'Sandals leave parts of the feet open to water.'), wrong('flatShoe', 'The pictured flat shoe is open at the top and is not a waterproof puddle boot.'), wrong('skates', 'Ice skates are intended for ice rather than walking through puddles.')
  ], 'Waterproof boots cover the feet and lower legs and are suitable for puddles.', 'The word although tells you the conditions have changed.'),
  sentence(9, 'temperature_preservation', 'Choose a place that preserves a condition', 'The ice pops would melt on the counter. To keep them frozen until tomorrow, Dad put them in the ______.', 'freezer', [
    wrong('oven', 'An oven heats food and would melt the ice pops.'), wrong('basket', 'A basket does not keep its contents frozen.'), wrong('box', 'An ordinary box does not provide the cold needed to keep ice pops frozen.')
  ], 'A freezer keeps food cold enough to remain frozen.', 'Distinguish something that stores an object from something that keeps it frozen.'),
  sentence(10, 'observation_scale', 'Infer the appropriate observation tool', 'Lena wanted a closer look at a tiny insect on a leaf without touching it. She held a ______ just above the leaf.', 'magnifier', [
    wrong('telescope', 'A telescope is generally used to view distant objects, rather than being held just above a leaf.'), wrong('mirror', 'A mirror reflects an image but does not provide the close-up view described.'), wrong('ruler', 'A ruler measures length; it does not enlarge the insect for viewing.')
  ], 'A magnifying glass can be held near a small object to make its details look larger.', 'Use both the goal and the distance mentioned in the sentence.'),
  sentence(11, 'container_fit', 'Infer a suitable container from size', 'The package was too wide for the small mailing envelope, so Nia packed it in a larger ______.', 'box', [
    wrong('bottle', 'A bottle has a narrow opening and is not an appropriate mailing container for this package.'), wrong('cup', 'A mug is not an appropriate closed mailing container.'), wrong('sock', 'A sock is clothing, not a sturdy mailing container.')
  ], 'A larger box can hold and protect a package that will not fit in an envelope.', 'Ask why the first container failed and which choice solves that problem.'),
  sentence(12, 'listening_privacy', 'Choose an item for a listening goal', 'Rosa wanted to hear quiet music without waking her baby brother, so she wore ______ over her ears.', 'headphones', [
    wrong('sunglasses', 'Sunglasses go over the eyes, rather than sending music to the ears.'), wrong('hat', 'A hat does not deliver the music privately to the ears.'), wrong('drum', 'A drum makes sound in the room rather than keeping listening private.')
  ], 'Headphones let Rosa listen close to her ears without playing music aloud through a room speaker.', 'Use the goal and the body part mentioned in the sentence.'),
  sentence(13, 'motion_destination', 'Use a direction clue', 'When the balloon string slipped out of Jo\'s hand, the balloon rose higher and higher into the ______.', 'cloud', [
    wrong('water', 'Water is not the place above Jo described by higher and higher.'), wrong('desert', 'A desert is a place on the ground, not the destination indicated by rising upward.'), wrong('nest', 'A nest is a small shelter, not the open space the balloon rises into.')
  ], 'A balloon that rises higher moves upward into the sky.', 'Follow the direction words rather than choosing any outdoor place.'),
  sentence(14, 'plant_need', 'Choose a tool from a stated need', 'The plant had plenty of sunlight, but its soil felt dry. Sam brought a ______ filled with water to pour onto the soil.', 'wateringCan', [
    wrong('paintRoller', 'A paint roller applies paint, rather than holding water to pour onto soil.'), wrong('broom', 'A broom sweeps; it does not hold water for pouring.'), wrong('scissors', 'Scissors cut, rather than carrying the water the plant needs.')
  ], 'A watering can holds water and has a spout for pouring it onto soil. The dry soil tells Sam the plant needs water.', 'Notice which need has already been met and which need remains.'),
  sentence(15, 'medical_measurement', 'Distinguish measuring from listening', 'The doctor wanted to find out whether Mara had a fever by measuring her temperature. She used a ______.', 'thermometer', [
    wrong('stethoscope', 'A stethoscope is used to listen to body sounds, not measure temperature.'), wrong('bandage', 'A bandage covers or supports an injury; it does not measure temperature.'), wrong('ruler', 'A ruler measures length, not body temperature.')
  ], 'A thermometer measures temperature, which helps the doctor check for a fever.', 'Identify exactly what the doctor needs to measure.'),
  sentence(16, 'mail_sequence', 'Complete a familiar sequence', 'To send Grandma a paper message through the mail, Sam folded the letter and placed it inside an ______.', 'envelope', [
    wrong('umbrella', 'An umbrella shelters people from weather, rather than enclosing a letter.'), wrong('spoon', 'A spoon does not enclose a letter for mailing.'), wrong('shoe', 'A shoe is footwear rather than a mailing container.')
  ], 'An envelope holds a paper letter for mailing.', 'Think about the next step after folding a letter.'),
  sentence(17, 'measurement_attribute', 'Choose a tool for the measured attribute', 'The class had counted all the shells. Now they wanted to compare how heavy the shells were, so they placed them on a ______.', 'scale', [
    wrong('ruler', 'A ruler measures length, not how heavy the shells are.'), wrong('abacus', 'An abacus can help count, but the shells have already been counted.'), wrong('clock', 'A clock measures time rather than how heavy the shells are.')
  ], 'A balance scale can compare how heavy objects are. Counting, measuring length, and measuring time answer different questions.', 'Ask what information is already known and what new information is wanted.')
];

const classifications = [
  classification(0, 'insect_group', 'Insects', ['butterfly', 'bee', 'ant'], 'ladybug', [
    wrong('spider', 'A spider has eight legs and is an arachnid, not an insect.'), wrong('snail', 'A snail is a mollusk, not an insect.'), wrong('worm', 'A worm is not an insect and does not have six jointed legs.')
  ], 'Butterflies, bees, ants, and ladybugs are insects. Adult insects have six legs.', 'Check a feature shared by all the examples, including the one that does not fly.'),
  classification(1, 'fruit_group', 'Fruits', ['pineapple', 'watermelon', 'peach'], 'pear', [
    wrong('ball', 'A soccer ball is sports equipment, not a fruit.'), wrong('hat', 'A hat is clothing, not a fruit.'), wrong('book', 'A book is for reading, not a fruit.')
  ], 'A pineapple, watermelon, peach, and pear are fruits.', 'Name the category, then check every pictured example.'),
  classification(2, 'road_wheels', 'Wheeled road vehicles', ['bus', 'taxi', 'scooter'], 'bike', [
    wrong('airplane', 'An airplane mainly travels through the air rather than along a road.'), wrong('sailboat', 'A sailboat travels on water.'), wrong('rocket', 'A rocket is not a wheeled road vehicle.')
  ], 'Buses, taxis, motor scooters, and bicycles travel on roads using wheels.', 'Do not make the rule narrower than the examples: a vehicle does not need an engine to belong.'),
  classification(3, 'clothing_group', 'Clothing', ['shirt', 'dress', 'coat'], 'pants', [
    wrong('ball', 'A soccer ball is used in sport rather than worn as clothing.'), wrong('tree', 'A tree is a plant, not clothing.'), wrong('spoon', 'A spoon is a utensil, not clothing.')
  ], 'A shirt, dress, coat, and pair of pants are clothing worn on the body.', 'Describe the shared use rather than the color of the examples.'),
  classification(4, 'cutting_tools', 'Tools with cutting edges', ['scissors', 'knife', 'saw'], 'axe', [
    wrong('comb', 'A comb separates hair but does not have a cutting edge.'), wrong('spoon', 'A spoon holds food rather than cutting with an edge.'), wrong('flashlight', 'A flashlight provides light rather than cutting material.')
  ], 'Scissors, a knife, a saw, and an axe have edges used to cut material.', 'Ask what action each tool performs even though the tools look different.'),
  classification(5, 'measuring_tools', 'Tools for measuring', ['thermometer', 'ruler', 'scale'], 'clock', [
    wrong('paintbrush', 'A paintbrush applies paint rather than measuring an attribute.'), wrong('hammer', 'A hammer acts on materials rather than measuring them.'), wrong('book', 'A book can contain measurements, but it is not itself a measuring tool.')
  ], 'A thermometer measures temperature, a ruler measures length, a scale measures weight or mass, and a clock measures time.', 'Different objects can belong together because they share a purpose.'),
  classification(6, 'cold_examples', 'Cold or frozen examples', ['snow', 'ice', 'snowman'], 'iceCream', [
    wrong('fire', 'Fire is hot rather than frozen.'), wrong('sun', 'The sun is hot rather than frozen.'), wrong('candle', 'A burning candle is a source of heat rather than a frozen object.')
  ], 'Snowflakes, ice, snowmen, and ice cream are cold or frozen examples.', 'Ignore color and compare the physical condition shared by the examples.'),
  classification(7, 'written_text', 'Things with written text', ['book', 'newspaper', 'scroll'], 'paper', [
    wrong('microphone', 'A microphone carries sound rather than displaying written text.'), wrong('palette', 'A paint palette holds colors rather than written text.'), wrong('drum', 'A drum makes sound rather than displaying written text.')
  ], 'The book, newspaper, scroll, and pictured written page all display text that can be read.', 'Find a rule that works for the old-fashioned scroll as well as the familiar book.'),
  classification(8, 'tree_fruits', 'Fruits that grow on trees', ['apple', 'pear', 'cherries'], 'lemon', [
    wrong('grapes', 'Grapes are fruit, but they grow on vines rather than trees.'), wrong('carrot', 'A carrot is a root that grows in soil, not a tree fruit.'), wrong('bread', 'Bread is prepared food rather than fruit growing on a tree.')
  ], 'Apples, pears, cherries, and lemons grow on trees. Grapes also are fruit, but grow on vines.', 'A broad rule may fit too many choices. Look for a more specific rule that still fits all examples.'),
  classification(9, 'aquatic_mammals', 'Mammals that spend time in water', ['whale', 'dolphin', 'seal'], 'otter', [
    wrong('fish', 'A fish is an aquatic animal but is not a mammal.'), wrong('octopus', 'An octopus lives in water but is not a mammal.'), wrong('shark', 'A shark is a fish, not a mammal.')
  ], 'Whales, dolphins, seals, and otters are mammals that spend time in water. They breathe air and feed their babies milk.', 'Living in water is not enough; check which animal family the examples share.'),
  classification(10, 'striking_sport_equipment', 'Sports equipment for striking an object', ['cricket', 'tennis', 'badminton'], 'pingPong', [
    wrong('ball', 'A soccer ball is the object being kicked, not a bat, racket, or paddle used to strike another object.'), wrong('skateboard', 'A skateboard is ridden rather than held to strike a ball or shuttlecock.'), wrong('skates', 'An ice skate is worn on a foot rather than held to strike an object.')
  ], 'A cricket bat, tennis racket, badminton racket, and table tennis paddle are held to strike a ball or shuttlecock.', 'All the choices relate to sport. Identify the more specific job of the equipment.'),
  classification(11, 'underground_food_parts', 'Plant foods harvested from below the ground', ['carrot', 'potato', 'onion'], 'garlic', [
    wrong('apple', 'Apples grow above ground on trees.'), wrong('corn', 'Corn ears grow above ground on stalks.'), wrong('banana', 'Bananas grow above ground on banana plants.')
  ], 'The edible carrot root, potato tuber, onion bulb, and garlic bulb develop below ground.', 'These are not all roots. Use where the edible part grows as the shared rule.'),
  classification(12, 'headwear', 'Things worn on the head', ['crown', 'hat', 'cap'], 'helmet', [
    wrong('ring', 'A ring is worn on a finger.'), wrong('sock', 'A sock is worn on a foot.'), wrong('glove', 'A glove is worn on a hand.')
  ], 'A crown, top hat, cap, and helmet are all worn on the head.', 'Check where each item is worn.'),
  classification(13, 'cleaning_items', 'Items used for cleaning', ['broom', 'soap', 'sponge'], 'toothbrush', [
    wrong('scissors', 'Scissors cut rather than clean.'), wrong('needle', 'A needle is used for sewing rather than cleaning.'), wrong('paintbrush', 'A paintbrush is used to apply paint rather than remove dirt.')
  ], 'A broom, soap, sponge, and toothbrush help clean different surfaces or body parts.', 'The examples look different. Think about their shared purpose.'),
  classification(14, 'handled_containers', 'Containers with a handle', ['bucket', 'basket', 'cup'], 'teapot', [
    wrong('plate', 'The pictured plate has no carrying handle.'), wrong('bottle', 'The pictured baby bottle has no carrying handle.'), wrong('bowl', 'The pictured bowl has no carrying handle.')
  ], 'The bucket, basket, mug, and teapot shown are containers with handles.', 'Check both the use as a container and the visible handle.'),
  classification(15, 'egg_layers', 'Animals that lay eggs', ['chicken', 'penguin', 'turtle'], 'duck', [
    wrong('dog', 'Dogs give birth to live puppies rather than laying eggs.'), wrong('cat', 'Cats give birth to live kittens rather than laying eggs.'), wrong('cow', 'Cows give birth to live calves rather than laying eggs.')
  ], 'Chickens, penguins, turtles, and ducks lay eggs. The turtle shows that the group is broader than birds.', 'Propose a rule, then make sure it also includes the turtle.'),
  classification(16, 'water_transport', 'Water vehicles', ['canoe', 'sailboat', 'ship'], 'speedboat', [
    wrong('taxi', 'A taxi travels on roads.'), wrong('helicopter', 'A helicopter travels through the air.'), wrong('train', 'A train travels on tracks.')
  ], 'Canoes, sailboats, ships, and speedboats travel on water.', 'Ignore how the vehicle is powered and compare where it travels.'),
  classification(17, 'light_sources', 'Objects that produce light', ['candle', 'flashlight', 'lightBulb'], 'fire', [
    wrong('mirror', 'A mirror reflects light from another source rather than producing its own light.'), wrong('moon', 'The moon reflects sunlight rather than making its own light.'), wrong('sunglasses', 'Sunglasses reduce light reaching the eyes rather than producing light.')
  ], 'A burning candle, a switched-on flashlight, a switched-on light bulb, and fire produce light. A mirror and the moon reflect light.', 'Distinguish an object that makes light from an object that reflects or blocks it.')
];

export const VERBAL_EXPANSION = [...analogies, ...sentences, ...classifications];
