/**
 * CogAT Test Prep Question Bank & Battery Configurations
 * Full-length test batteries covering Form 7 and Form 8 specifications.
 * Supports:
 * - All Questions (Full Bank of 54+ Questions)
 * - Practice Test 1 (18 Questions: 2 per subtest across all 9 subtests)
 * - Practice Test 2 (18 Questions: 2 per subtest across all 9 subtests)
 * - Practice Test 3 (18 Questions: 2 per subtest across all 9 subtests)
 * - Procedural Infinite Generator Mode
 */

export const PRACTICE_TESTS = [
  { id: 'all_bank', name: 'All Questions (Full Bank)', badge: '54+ Qs', description: 'Complete question bank across all subtests' },
  { id: 'test_1', name: 'Practice Test 1', badge: '18 Qs - Diagnostic', description: 'Standard 18-question diagnostic test (2 per subtest)' },
  { id: 'test_2', name: 'Practice Test 2', badge: '18 Qs - Standard', description: 'Standard 18-question intermediate test with new patterns' },
  { id: 'test_3', name: 'Practice Test 3', badge: '18 Qs - Challenge', description: 'Advanced 18-question challenge test for maximum readiness' },
  { id: 'infinite', name: 'Infinite Generator ⚡', badge: 'Unlimited', description: 'Endless procedurally generated questions on demand' }
];

export const GRADE_LEVELS = [
  { id: 'k', name: 'Kindergarten', level: 'Level 5/6', primary: true },
  { id: '1', name: 'Grade 1', level: 'Level 7', primary: true },
  { id: '2', name: 'Grade 2', level: 'Level 8', primary: true, isDefault: true },
  { id: '3', name: 'Grade 3', level: 'Level 9', primary: false },
  { id: '4', name: 'Grade 4', level: 'Level 10', primary: false },
  { id: '5', name: 'Grade 5', level: 'Level 11', primary: false },
  { id: '6', name: 'Grade 6+', level: 'Level 12-18', primary: false },
];

export const BATTERIES = [
  {
    id: 'all',
    name: 'All Batteries (Full Test)',
    description: 'Complete CogAT test containing all subtests',
    icon: 'Brain',
    color: 'sky'
  },
  {
    id: 'verbal',
    name: 'Verbal Battery',
    description: 'Measures flexibility, retrieval, and verbal reasoning skills',
    icon: 'MessageSquare',
    color: 'emerald',
    subtests: ['picture_analogies', 'sentence_completion', 'picture_classification', 'verbal_analogies', 'verbal_classification']
  },
  {
    id: 'quantitative',
    name: 'Quantitative Battery',
    description: 'Measures abstract quantitative reasoning and pattern induction',
    icon: 'Calculator',
    color: 'amber',
    subtests: ['number_analogies', 'number_puzzles', 'number_series']
  },
  {
    id: 'nonverbal',
    name: 'Nonverbal Battery',
    description: 'Measures spatial and abstract geometric reasoning independent of language',
    icon: 'Shapes',
    color: 'purple',
    subtests: ['figure_matrices', 'paper_folding', 'figure_classification']
  }
];

export const SUBTESTS = {
  picture_analogies: { id: 'picture_analogies', batteryId: 'verbal', name: 'Picture Analogies', type: 'visual_analogy', primaryOnly: true },
  sentence_completion: { id: 'sentence_completion', batteryId: 'verbal', name: 'Sentence Completion', type: 'sentence_pic', primaryOnly: true },
  picture_classification: { id: 'picture_classification', batteryId: 'verbal', name: 'Picture Classification', type: 'pic_classification', primaryOnly: true },
  verbal_analogies: { id: 'verbal_analogies', batteryId: 'verbal', name: 'Verbal Analogies', type: 'text_analogy', upperOnly: true },
  verbal_classification: { id: 'verbal_classification', batteryId: 'verbal', name: 'Verbal Classification', type: 'text_classification', upperOnly: true },
  number_analogies: { id: 'number_analogies', batteryId: 'quantitative', name: 'Number Analogies', type: 'num_analogy' },
  number_puzzles: { id: 'number_puzzles', batteryId: 'quantitative', name: 'Number Puzzles', type: 'balance_puzzle' },
  number_series: { id: 'number_series', batteryId: 'quantitative', name: 'Number Series', type: 'num_series' },
  figure_matrices: { id: 'figure_matrices', batteryId: 'nonverbal', name: 'Figure Matrices', type: 'fig_matrix' },
  paper_folding: { id: 'paper_folding', batteryId: 'nonverbal', name: 'Paper Folding', type: 'paper_fold' },
  figure_classification: { id: 'figure_classification', batteryId: 'nonverbal', name: 'Figure Classification', type: 'fig_classification' }
};

export const QUESTIONS = [
  // =========================================================================
  // GRADE 2 (LEVEL 8) - PRACTICE TEST 1 (18 Full Questions)
  // =========================================================================
  {
    id: 'g2_t1_pa1',
    grade: '2',
    testId: 'test_1',
    batteryId: 'verbal',
    subtestId: 'picture_analogies',
    difficulty: 'easy',
    prompt: 'Look at the top two pictures. How do they go together? Now look at the bottom picture. Which picture goes with it in the exact same way?',
    audioScript: 'Look at Bird and Nest. A bird lives in a nest. Now look at Dog. Where does a pet dog live? Choose the correct shelter.',
    rendererType: 'picture_analogy',
    data: {
      topPair: [{ emoji: '🐦', label: 'Bird' }, { emoji: '🪹', label: 'Nest' }],
      bottomStimulus: { emoji: '🐶', label: 'Dog' }
    },
    options: [
      { id: 'A', emoji: '🦴', label: 'Bone', caption: 'Food' },
      { id: 'B', emoji: '🐕‍🦺', label: 'Leash', caption: 'Tool' },
      { id: 'C', emoji: '🏠', label: 'Doghouse', caption: 'Home' },
      { id: 'D', emoji: '🐈', label: 'Cat', caption: 'Animal' }
    ],
    correctAnswer: 2,
    explanation: {
      rule: 'Animal to Home Shelter',
      description: 'A bird lives in a nest; a dog sleeps and lives in a doghouse.',
      whyOthersWrong: 'A bone is food, a leash is gear, and a cat is an animal.',
      parentTip: 'Where does an outdoor pet dog sleep?'
    }
  },
  {
    id: 'g2_t1_pa2',
    grade: '2',
    testId: 'test_1',
    batteryId: 'verbal',
    subtestId: 'picture_analogies',
    difficulty: 'medium',
    prompt: 'Look at Glove and Hand. Where does a sock belong?',
    audioScript: 'A glove covers a hand. Where is a sock worn?',
    rendererType: 'picture_analogy',
    data: {
      topPair: [{ emoji: '🧤', label: 'Glove' }, { emoji: '✋', label: 'Hand' }],
      bottomStimulus: { emoji: '🧦', label: 'Sock' }
    },
    options: [
      { id: 'A', emoji: '🦶', label: 'Foot', caption: 'Body part' },
      { id: 'B', emoji: '👟', label: 'Shoe', caption: 'Footwear' },
      { id: 'C', emoji: '👖', label: 'Pants', caption: 'Clothing' },
      { id: 'D', emoji: '👂', label: 'Ear', caption: 'Body part' }
    ],
    correctAnswer: 0,
    explanation: {
      rule: 'Clothing to Body Part',
      description: 'A glove covers a hand; a sock covers a foot.',
      whyOthersWrong: 'A shoe is clothing, not the body part covered by a sock.',
      parentTip: 'Gloves go on hands, socks go on feet!'
    }
  },
  {
    id: 'g2_t1_sc1',
    grade: '2',
    testId: 'test_1',
    batteryId: 'verbal',
    subtestId: 'sentence_completion',
    difficulty: 'easy',
    prompt: 'Listen: "When dark storm clouds rolled in and rain poured down, Maya stayed dry by opening her ______."',
    audioScript: 'When rain poured down, Maya stayed dry by opening her... Which picture finishes the sentence?',
    rendererType: 'sentence_completion',
    data: { sentence: 'When dark storm clouds rolled in and rain poured down, Maya stayed dry by opening her ______.' },
    options: [
      { id: 'A', emoji: '☂️', label: 'Umbrella', caption: 'Rain protection' },
      { id: 'B', emoji: '🎒', label: 'Backpack', caption: 'School bag' },
      { id: 'C', emoji: '📖', label: 'Book', caption: 'Reading' },
      { id: 'D', emoji: '🕶️', label: 'Sunglasses', caption: 'Sun protection' }
    ],
    correctAnswer: 0,
    explanation: {
      rule: 'Rain Contextual Protection',
      description: 'An umbrella protects against pouring rain to stay dry.',
      whyOthersWrong: 'Sunglasses are for sun; books and backpacks do not protect from rain.',
      parentTip: 'Listen for clue words: "rain", "stayed dry", "opening".'
    }
  },
  {
    id: 'g2_t1_sc2',
    grade: '2',
    testId: 'test_1',
    batteryId: 'verbal',
    subtestId: 'sentence_completion',
    difficulty: 'medium',
    prompt: 'Listen: "When Tommy had a checkup at the clinic, the doctor listened to his heartbeat using a ______."',
    audioScript: 'The doctor listened to Tommy\'s heartbeat using a... Which medical tool finishes the sentence?',
    rendererType: 'sentence_completion',
    data: { sentence: 'When Tommy had a checkup at the clinic, the doctor listened to his heartbeat using a ______.' },
    options: [
      { id: 'A', emoji: '🩺', label: 'Stethoscope', caption: 'Listens to heart' },
      { id: 'B', emoji: '🩹', label: 'Bandage', caption: 'Covers cuts' },
      { id: 'C', emoji: '🌡️', label: 'Thermometer', caption: 'Measures fever' },
      { id: 'D', emoji: '🔦', label: 'Flashlight', caption: 'Looks in throat' }
    ],
    correctAnswer: 0,
    explanation: {
      rule: 'Medical Tool Function',
      description: 'A stethoscope is specifically designed to listen to heartbeats.',
      whyOthersWrong: 'A thermometer measures body temperature, not heart sounds.',
      parentTip: 'What tool does your pediatrician put on your chest?'
    }
  },
  {
    id: 'g2_t1_pc1',
    grade: '2',
    testId: 'test_1',
    batteryId: 'verbal',
    subtestId: 'picture_classification',
    difficulty: 'easy',
    prompt: 'Look at Apple, Banana, and Grapes. Which choice belongs in the same group?',
    audioScript: 'Look at Apple, Banana, and Grapes. What fruit belongs with them?',
    rendererType: 'picture_classification',
    data: { items: [{ emoji: '🍎', label: 'Apple' }, { emoji: '🍌', label: 'Banana' }, { emoji: '🍇', label: 'Grapes' }] },
    options: [
      { id: 'A', emoji: '🥕', label: 'Carrot', caption: 'Vegetable' },
      { id: 'B', emoji: '🍊', label: 'Orange', caption: 'Fruit' },
      { id: 'C', emoji: '🥦', label: 'Broccoli', caption: 'Vegetable' },
      { id: 'D', emoji: '🍞', label: 'Bread', caption: 'Grain' }
    ],
    correctAnswer: 1,
    explanation: {
      rule: 'Category: Fresh Fruits',
      description: 'Apple, Banana, Grapes, and Orange are all fruits.',
      whyOthersWrong: 'Carrots and broccoli are vegetables; bread is baked grain.',
      parentTip: 'They are all delicious fruits with seeds!'
    }
  },
  {
    id: 'g2_t1_pc2',
    grade: '2',
    testId: 'test_1',
    batteryId: 'verbal',
    subtestId: 'picture_classification',
    difficulty: 'medium',
    prompt: 'Look at Car, Bus, and Truck. Which vehicle belongs in this group?',
    audioScript: 'Look at Car, Bus, and Truck. They all drive on the road with rubber wheels. Which vehicle belongs with them?',
    rendererType: 'picture_classification',
    data: { items: [{ emoji: '🚗', label: 'Car' }, { emoji: '🚌', label: 'Bus' }, { emoji: '🚚', label: 'Truck' }] },
    options: [
      { id: 'A', emoji: '🏍️', label: 'Motorcycle', caption: 'Land wheeled vehicle' },
      { id: 'B', emoji: '⛵', label: 'Sailboat', caption: 'Water vehicle' },
      { id: 'C', emoji: '🚁', label: 'Helicopter', caption: 'Air vehicle' },
      { id: 'D', emoji: '🛶', label: 'Canoe', caption: 'Water vehicle' }
    ],
    correctAnswer: 0,
    explanation: {
      rule: 'Land Wheeled Vehicles',
      description: 'Car, bus, truck, and motorcycle are land vehicles traveling on roads with wheels.',
      whyOthersWrong: 'Sailboats and canoes are watercraft; helicopters are aircraft.',
      parentTip: 'Which choice drives on roads with wheels?'
    }
  },
  {
    id: 'g2_t1_na1',
    grade: '2',
    testId: 'test_1',
    batteryId: 'quantitative',
    subtestId: 'number_analogies',
    difficulty: 'easy',
    prompt: 'Look at [ 3 ➔ 6 ]. Now look at [ 4 ➔ ? ]. Find the number that follows the same rule.',
    audioScript: '3 is doubled to make 6. What does 4 become when doubled?',
    rendererType: 'number_analogy',
    data: {
      topPair: { left: 3, right: 6, relation: 'doubling (x2)' },
      bottomStimulus: { left: 4 }
    },
    options: [{ id: 'A', text: '5', label: '5' }, { id: 'B', text: '10', label: '10' }, { id: 'C', text: '8', label: '8' }, { id: 'D', text: '9', label: '9' }],
    correctAnswer: 2,
    explanation: { rule: 'Doubling (Multiply by 2)', description: '3 × 2 = 6. 4 × 2 = 8.', whyOthersWrong: '8 is 4 + 4.', parentTip: 'Double numbers: 2->4, 3->6, 4->8.' }
  },
  {
    id: 'g2_t1_na2',
    grade: '2',
    testId: 'test_1',
    batteryId: 'quantitative',
    subtestId: 'number_analogies',
    difficulty: 'medium',
    prompt: 'Look at [ 7 ➔ 9 ]. It added 2! What does [ 5 ➔ ? ] become using the exact same rule?',
    audioScript: '7 plus 2 equals 9. What is 5 plus 2?',
    rendererType: 'number_analogy',
    data: {
      topPair: { left: 7, right: 9, relation: 'add 2 (+2)' },
      bottomStimulus: { left: 5 }
    },
    options: [{ id: 'A', text: '6', label: '6' }, { id: 'B', text: '7', label: '7' }, { id: 'C', text: '8', label: '8' }, { id: 'D', text: '10', label: '10' }],
    correctAnswer: 1,
    explanation: { rule: 'Add 2 (+2)', description: '7 + 2 = 9. 5 + 2 = 7.', whyOthersWrong: '5 + 2 = 7.', parentTip: 'Count up by 2: 5 plus 2 is 7!' }
  },
  {
    id: 'g2_t1_np1',
    grade: '2',
    testId: 'test_1',
    batteryId: 'quantitative',
    subtestId: 'number_puzzles',
    difficulty: 'medium',
    prompt: 'The scale is balanced. Left pan has 5 and 3 (Total = 8). Right pan has 6 and [?]. What number balances the scale?',
    audioScript: 'The left side has 5 plus 3 equals 8. The right side has 6 and a question mark. What number plus 6 makes 8?',
    rendererType: 'balance_puzzle',
    data: { type: 'balance', leftWeights: [5, 3], rightWeights: [6, '?'] },
    options: [{ id: 'A', text: '1', label: '1' }, { id: 'B', text: '2', label: '2' }, { id: 'C', text: '3', label: '3' }, { id: 'D', text: '4', label: '4' }],
    correctAnswer: 1,
    explanation: { rule: 'Scale Equivalence: 8 = 8', description: '5 + 3 = 8. 6 + 2 = 8.', whyOthersWrong: '6 + 2 = 8.', parentTip: 'Left side is 8. Right side needs 2 more to reach 8.' }
  },
  {
    id: 'g2_t1_np2',
    grade: '2',
    testId: 'test_1',
    batteryId: 'quantitative',
    subtestId: 'number_puzzles',
    difficulty: 'easy',
    prompt: 'In this number train, the engine total is 9. Car 1 has 4. What number must be in Car 2?',
    audioScript: 'The engine has 9. Car 1 has 4. What number goes in the question mark car to make 9?',
    rendererType: 'balance_puzzle',
    data: { type: 'train', targetTotal: 9, trainCars: [4, '?'] },
    options: [{ id: 'A', text: '4', label: '4' }, { id: 'B', text: '5', label: '5' }, { id: 'C', text: '6', label: '6' }, { id: 'D', text: '3', label: '3' }],
    correctAnswer: 1,
    explanation: { rule: 'Part-Whole Addition', description: '4 + 5 = 9. Missing number is 5.', whyOthersWrong: '4 + 5 = 9.', parentTip: 'Count up from 4 to 9: 5 fingers!' }
  },
  {
    id: 'g2_t1_ns1',
    grade: '2',
    testId: 'test_1',
    batteryId: 'quantitative',
    subtestId: 'number_series',
    difficulty: 'easy',
    prompt: 'Look at the bead pattern: 2 beads, 4 beads, 6 beads, 8 beads. How many beads come next?',
    audioScript: '2 beads, 4 beads, 6 beads, 8 beads. Counting by twos! What comes next?',
    rendererType: 'number_series',
    data: {
      seriesType: 'beads',
      items: [{ count: 2, color: '#0ea5e9' }, { count: 4, color: '#0ea5e9' }, { count: 6, color: '#0ea5e9' }, { count: 8, color: '#0ea5e9' }]
    },
    options: [{ id: 'A', text: '9', label: '9 beads' }, { id: 'B', text: '10', label: '10 beads' }, { id: 'C', text: '11', label: '11 beads' }, { id: 'D', text: '12', label: '12 beads' }],
    correctAnswer: 1,
    explanation: { rule: 'Skip Counting by 2 (+2)', description: '2, 4, 6, 8, 10.', whyOthersWrong: '8 + 2 = 10 beads.', parentTip: '2, 4, 6, 8, 10!' }
  },
  {
    id: 'g2_t1_ns2',
    grade: '2',
    testId: 'test_1',
    batteryId: 'quantitative',
    subtestId: 'number_series',
    difficulty: 'medium',
    prompt: 'Look at the block towers: 1 block, 3 blocks, 5 blocks, 7 blocks. How many blocks in the next tower?',
    audioScript: 'Look at the tower heights: 1, 3, 5, 7. It adds 2 blocks each time. What comes next?',
    rendererType: 'number_series',
    data: { seriesType: 'blocks', items: [1, 3, 5, 7] },
    options: [{ id: 'A', text: '8', label: '8 blocks' }, { id: 'B', text: '9', label: '9 blocks' }, { id: 'C', text: '10', label: '10 blocks' }, { id: 'D', text: '11', label: '11 blocks' }],
    correctAnswer: 1,
    explanation: { rule: 'Odd Numbers (+2)', description: '1, 3, 5, 7, 9. Adding 2 to 7 gives 9.', whyOthersWrong: '7 + 2 = 9.', parentTip: 'Odd numbers jump by 2!' }
  },
  {
    id: 'g2_t1_fm1',
    grade: '2',
    testId: 'test_1',
    batteryId: 'nonverbal',
    subtestId: 'figure_matrices',
    difficulty: 'easy',
    prompt: 'The clear circle fills in solid black. What happens to the clear triangle in the bottom row?',
    audioScript: 'A clear circle turns solid black. What does a clear triangle turn into?',
    rendererType: 'figure_matrix',
    data: {
      topRow: { left: { shape: 'circle', fill: 'none', color: '#1e293b' }, right: { shape: 'circle', fill: 'solid', color: '#1e293b' } },
      bottomRow: { left: { shape: 'triangle', fill: 'none', color: '#1e293b' } }
    },
    options: [
      { id: 'A', shape: { shape: 'triangle', fill: 'solid', color: '#1e293b' }, label: 'Solid Triangle' },
      { id: 'B', shape: { shape: 'square', fill: 'solid', color: '#1e293b' }, label: 'Solid Square' },
      { id: 'C', shape: { shape: 'triangle', fill: 'none', color: '#1e293b' }, label: 'Clear Triangle' },
      { id: 'D', shape: { shape: 'circle', fill: 'solid', color: '#1e293b' }, label: 'Solid Circle' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Fill Transformation', description: 'Shape stays triangle; fill turns solid black.', whyOthersWrong: 'Choice A keeps the triangle shape and fills it in.', parentTip: 'Shape stays the same, color fills in!' }
  },
  {
    id: 'g2_t1_fm2',
    grade: '2',
    testId: 'test_1',
    batteryId: 'nonverbal',
    subtestId: 'figure_matrices',
    difficulty: 'medium',
    prompt: 'The arrow pointing UP turns 90° clockwise to point RIGHT. Where does the arrow pointing DOWN turn?',
    audioScript: 'An arrow pointing up turns right. Where does an arrow pointing down turn?',
    rendererType: 'figure_matrix',
    data: {
      topRow: { left: { shape: 'arrow_up', rotation: 0, fill: 'semi', color: '#0284c7' }, right: { shape: 'arrow_up', rotation: 90, fill: 'semi', color: '#0284c7' } },
      bottomRow: { left: { shape: 'arrow_up', rotation: 180, fill: 'semi', color: '#0284c7' } }
    },
    options: [
      { id: 'A', shape: { shape: 'arrow_up', rotation: 270, fill: 'semi', color: '#0284c7' }, label: 'Points Left' },
      { id: 'B', shape: { shape: 'arrow_up', rotation: 0, fill: 'semi', color: '#0284c7' }, label: 'Points Up' },
      { id: 'C', shape: { shape: 'arrow_up', rotation: 90, fill: 'semi', color: '#0284c7' }, label: 'Points Right' },
      { id: 'D', shape: { shape: 'arrow_up', rotation: 180, fill: 'semi', color: '#0284c7' }, label: 'Points Down' }
    ],
    correctAnswer: 0,
    explanation: { rule: '90° Clockwise Rotation', description: 'Clockwise quarter turn from down points to the left.', whyOthersWrong: 'Down turns to left.', parentTip: 'Like the hand of a clock!' }
  },
  {
    id: 'g2_t1_pf1',
    grade: '2',
    testId: 'test_1',
    batteryId: 'nonverbal',
    subtestId: 'paper_folding',
    difficulty: 'medium',
    prompt: 'Paper is folded in half to the right. A hole is punched in the top-right corner. What does it look like unfolded?',
    audioScript: 'Paper is folded in half to the right. A hole is punched in the top corner. Where will the holes be unfolded?',
    rendererType: 'paper_folding',
    data: {
      steps: [
        { type: 'initial-fold', foldDirection: 'right', caption: 'Fold in half right' },
        { type: 'punch', foldedBounds: { x: 50, y: 10, w: 40, h: 80 }, hole: { x: 75, y: 25, r: 5 }, caption: 'Punch top corner' }
      ],
      creases: ['vertical'],
      finalUnfoldedHoles: [{ x: 75, y: 25 }, { x: 25, y: 25 }]
    },
    options: [
      { id: 'A', holes: [{ x: 75, y: 25 }, { x: 25, y: 25 }], creases: ['vertical'], label: 'Two holes across top' },
      { id: 'B', holes: [{ x: 75, y: 25 }, { x: 75, y: 75 }], creases: ['vertical'], label: 'Vertical pair' },
      { id: 'C', holes: [{ x: 75, y: 25 }], creases: ['vertical'], label: 'One hole' },
      { id: 'D', holes: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 75, y: 75 }], creases: ['vertical', 'horizontal'], label: 'Four holes' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Vertical Crease Reflection', description: 'The vertical crease reflects the punched hole to the top-left.', whyOthersWrong: '1 fold = 2 layers = 2 holes along the top.', parentTip: 'Watch the unfold animation demo!' }
  },
  {
    id: 'g2_t1_pf2',
    grade: '2',
    testId: 'test_1',
    batteryId: 'nonverbal',
    subtestId: 'paper_folding',
    difficulty: 'medium',
    prompt: 'Paper is folded in half from bottom to top. A hole is punched near the left edge. What does it look like unfolded?',
    audioScript: 'Paper is folded UP in half. A hole is punched near the left edge. Where are the holes unfolded?',
    rendererType: 'paper_folding',
    data: {
      steps: [
        { type: 'initial-fold', foldDirection: 'up', caption: 'Fold in half up' },
        { type: 'punch', foldedBounds: { x: 10, y: 10, w: 80, h: 40 }, hole: { x: 25, y: 25, r: 6 }, caption: 'Punch left edge' }
      ],
      creases: ['horizontal'],
      finalUnfoldedHoles: [{ x: 25, y: 25 }, { x: 25, y: 75 }]
    },
    options: [
      { id: 'A', holes: [{ x: 25, y: 25 }, { x: 25, y: 75 }], creases: ['horizontal'], label: 'Two holes stacked on left' },
      { id: 'B', holes: [{ x: 25, y: 25 }, { x: 75, y: 25 }], creases: ['horizontal'], label: 'Horizontal pair across top' },
      { id: 'C', holes: [{ x: 25, y: 25 }], creases: ['horizontal'], label: 'Single hole' },
      { id: 'D', holes: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 75, y: 75 }], creases: ['vertical', 'horizontal'], label: 'Four corners' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Horizontal Crease Reflection', description: 'The horizontal fold at the center reflects top to bottom along the left edge.', whyOthersWrong: 'A horizontal crease mirrors vertically.', parentTip: 'Top mirrors to bottom!' }
  },
  {
    id: 'g2_t1_fc1',
    grade: '2',
    testId: 'test_1',
    batteryId: 'nonverbal',
    subtestId: 'figure_classification',
    difficulty: 'medium',
    prompt: 'Look at the 3 shapes: rectangle, diamond, trapezoid. Which shape below belongs with them?',
    audioScript: 'Look at the rectangle, diamond, and trapezoid. They all have 4 straight sides. Which shape below also has 4 sides?',
    rendererType: 'figure_classification',
    data: {
      stimulusFigures: [
        { shape: 'square', fill: 'semi', color: '#4f46e5' },
        { shape: 'diamond', fill: 'semi', color: '#4f46e5' },
        { shape: 'trapezoid', fill: 'semi', color: '#4f46e5' }
      ],
      ruleDescription: 'All figures have 4 straight sides (Quadrilaterals)'
    },
    options: [
      { id: 'A', shape: { shape: 'triangle', fill: 'semi', color: '#4f46e5' }, label: 'Triangle (3 sides)' },
      { id: 'B', shape: { shape: 'pentagon', fill: 'semi', color: '#4f46e5' }, label: 'Pentagon (5 sides)' },
      { id: 'C', shape: { shape: 'square', rotation: 45, fill: 'semi', color: '#4f46e5' }, label: 'Square (4 sides)' },
      { id: 'D', shape: { shape: 'circle', fill: 'semi', color: '#4f46e5' }, label: 'Circle (0 straight sides)' }
    ],
    correctAnswer: 2,
    explanation: { rule: '4 Straight Sides (Quadrilaterals)', description: 'All shapes have 4 straight sides. Square has 4 sides.', whyOthersWrong: 'Triangles have 3 sides; pentagons have 5 sides.', parentTip: 'Count the sides: 1, 2, 3, 4!' }
  },
  {
    id: 'g2_t1_fc2',
    grade: '2',
    testId: 'test_1',
    batteryId: 'nonverbal',
    subtestId: 'figure_classification',
    difficulty: 'medium',
    prompt: 'Look at the 3 shapes. Each shape contains a single dot right in the center. Which shape from below belongs in the exact same group?',
    audioScript: 'Look at the three shapes. Each one has a single dot in the center. Which shape below also has one dot in the center?',
    rendererType: 'figure_classification',
    data: {
      stimulusFigures: [
        { shape: 'circle', fill: 'none', color: '#0284c7', dots: 1 },
        { shape: 'square', fill: 'none', color: '#0284c7', dots: 1 },
        { shape: 'triangle', fill: 'none', color: '#0284c7', dots: 1 }
      ],
      ruleDescription: 'All figures contain exactly 1 center dot'
    },
    options: [
      { id: 'A', shape: { shape: 'diamond', fill: 'none', color: '#0284c7', dots: 1 } },
      { id: 'B', shape: { shape: 'diamond', fill: 'none', color: '#0284c7', dots: 2 } },
      { id: 'C', shape: { shape: 'diamond', fill: 'solid', color: '#0284c7', dots: 0 } },
      { id: 'D', shape: { shape: 'star', fill: 'none', color: '#0284c7', dots: 0 } }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Invariant: Exactly 1 Center Dot', description: 'Every shape in the group has exactly one dot located in its center. Choice A also has exactly one dot in its center.', whyOthersWrong: 'Choice B has 2 dots; Choice C and D have no dots.', parentTip: 'Look at the center of each shape: count the dots!' }
  },

  // =========================================================================
  // GRADE 2 (LEVEL 8) - PRACTICE TEST 2 (18 Full Questions)
  // =========================================================================
  {
    id: 'g2_t2_pa1',
    grade: '2',
    testId: 'test_2',
    batteryId: 'verbal',
    subtestId: 'picture_analogies',
    difficulty: 'medium',
    prompt: 'Caterpillar transforms into a Butterfly. What does a Tadpole grow into?',
    audioScript: 'A caterpillar grows into a butterfly. What does a tadpole grow into?',
    rendererType: 'picture_analogy',
    data: {
      topPair: [{ emoji: '🐛', label: 'Caterpillar' }, { emoji: '🦋', label: 'Butterfly' }],
      bottomStimulus: { emoji: '🐟', label: 'Tadpole' }
    },
    options: [
      { id: 'A', emoji: '🐸', label: 'Frog', caption: 'Adult Amphibian' },
      { id: 'B', emoji: '🐢', label: 'Turtle', caption: 'Reptile' },
      { id: 'C', emoji: '🦆', label: 'Duck', caption: 'Bird' },
      { id: 'D', emoji: '🦈', label: 'Shark', caption: 'Fish' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Metamorphosis / Life Cycle', description: 'A tadpole grows legs and lungs to become a frog.', whyOthersWrong: 'Tadpoles grow into frogs.', parentTip: 'Think about animal life cycles!' }
  },
  {
    id: 'g2_t2_pa2',
    grade: '2',
    testId: 'test_2',
    batteryId: 'verbal',
    subtestId: 'picture_analogies',
    difficulty: 'medium',
    prompt: 'Bee is to Honey as Cow is to ______.',
    audioScript: 'A bee produces sweet honey. What healthy drink does a cow produce?',
    rendererType: 'picture_analogy',
    data: {
      topPair: [{ emoji: '🐝', label: 'Bee' }, { emoji: '🍯', label: 'Honey' }],
      bottomStimulus: { emoji: '🐄', label: 'Cow' }
    },
    options: [
      { id: 'A', emoji: '🥛', label: 'Milk', caption: 'Dairy product' },
      { id: 'B', emoji: '🌾', label: 'Hay', caption: 'Cow food' },
      { id: 'C', emoji: '🚜', label: 'Tractor', caption: 'Farm machine' },
      { id: 'D', emoji: '🥩', label: 'Barn', caption: 'Shelter' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Animal to Product Made', description: 'Bees produce honey; cows produce milk.', whyOthersWrong: 'Hay is food eaten, not what the animal produces.', parentTip: 'What does the cow give us?' }
  },
  {
    id: 'g2_t2_sc1',
    grade: '2',
    testId: 'test_2',
    batteryId: 'verbal',
    subtestId: 'sentence_completion',
    difficulty: 'medium',
    prompt: 'Listen: "The baker mixed the dough, shaped it into loaves, and put it into the hot ______ so it would bake into fresh bread."',
    audioScript: 'The baker put the dough into the hot... to bake into fresh bread. Which picture finishes the sentence?',
    rendererType: 'sentence_completion',
    data: { sentence: 'The baker mixed the dough, shaped it into loaves, and put it into the hot ______ so it would bake into fresh bread.' },
    options: [
      { id: 'A', emoji: '🧊', label: 'Freezer', caption: 'Cold freezer' },
      { id: 'B', emoji: '🔥', label: 'Oven', caption: 'Bakes bread hot' },
      { id: 'C', emoji: '🥣', label: 'Bowl', caption: 'Mixing bowl' },
      { id: 'D', emoji: '🧺', label: 'Basket', caption: 'Bread basket' }
    ],
    correctAnswer: 1,
    explanation: { rule: 'Baking Context', description: 'An oven is hot and bakes bread.', whyOthersWrong: 'Freezers are cold; baskets do not cook.', parentTip: 'Look for "hot" and "bake".' }
  },
  {
    id: 'g2_t2_sc2',
    grade: '2',
    testId: 'test_2',
    batteryId: 'verbal',
    subtestId: 'sentence_completion',
    difficulty: 'hard',
    prompt: 'Listen: "With its sharp teeth, the busy beaver cut down tree branches and built a sturdy ______ across the river."',
    audioScript: 'The busy beaver cut down branches and built a sturdy... across the river.',
    rendererType: 'sentence_completion',
    data: { sentence: 'With its sharp teeth, the busy beaver cut down tree branches and built a sturdy ______ across the river.' },
    options: [
      { id: 'A', emoji: '🪵', label: 'Dam', caption: 'Beaver home across water' },
      { id: 'B', emoji: '🪺', label: 'Nest', caption: 'Bird nest' },
      { id: 'C', emoji: '⛺', label: 'Tent', caption: 'Camping' },
      { id: 'D', emoji: '🏰', label: 'Castle', caption: 'Stone building' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Animal Architecture', description: 'Beavers build dams across rivers using logs and branches.', whyOthersWrong: 'Birds build nests; humans pitch tents.', parentTip: 'What do beavers build in water? A dam!' }
  },
  {
    id: 'g2_t2_pc1',
    grade: '2',
    testId: 'test_2',
    batteryId: 'verbal',
    subtestId: 'picture_classification',
    difficulty: 'medium',
    prompt: 'Look at Guitar, Violin, and Banjo. Which instrument belongs with them?',
    audioScript: 'Guitar, Violin, and Banjo all make music with strings. Which instrument below belongs with them?',
    rendererType: 'picture_classification',
    data: { items: [{ emoji: '🎸', label: 'Guitar' }, { emoji: '🎻', label: 'Violin' }, { emoji: '🪕', label: 'Banjo' }] },
    options: [
      { id: 'A', emoji: '🥁', label: 'Drum', caption: 'Percussion' },
      { id: 'B', emoji: '🎺', label: 'Trumpet', caption: 'Brass wind' },
      { id: 'C', emoji: '🪗', label: 'Harp', caption: 'String instrument' },
      { id: 'D', emoji: '🔔', label: 'Bell', caption: 'Percussion' }
    ],
    correctAnswer: 2,
    explanation: { rule: 'String Musical Instruments', description: 'Guitar, violin, banjo, and harp all have strings.', whyOthersWrong: 'Drums and bells are struck; trumpets are blown.', parentTip: 'They all have vibrating strings!' }
  },
  {
    id: 'g2_t2_pc2',
    grade: '2',
    testId: 'test_2',
    batteryId: 'verbal',
    subtestId: 'picture_classification',
    difficulty: 'medium',
    prompt: 'Look at Lion, Tiger, and Leopard. Which wild animal belongs with them?',
    audioScript: 'Look at Lion, Tiger, and Leopard. They are big wild cats! Which animal below belongs in the cat family?',
    rendererType: 'picture_classification',
    data: { items: [{ emoji: '🦁', label: 'Lion' }, { emoji: '🐯', label: 'Tiger' }, { emoji: '🐆', label: 'Leopard' }] },
    options: [
      { id: 'A', emoji: '🐈‍⬛', label: 'Cheetah / Panther', caption: 'Wild big cat' },
      { id: 'B', emoji: '🐺', label: 'Wolf', caption: 'Dog family' },
      { id: 'C', emoji: '🐻', label: 'Bear', caption: 'Bear family' },
      { id: 'D', emoji: '🦊', label: 'Fox', caption: 'Dog family' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Category: Felines (Wild Big Cats)', description: 'Lions, tigers, leopards, and cheetahs are all wild felines (cats).', whyOthersWrong: 'Wolves and foxes are canines; bears are ursids.', parentTip: 'They are all roaring big cats!' }
  },
  {
    id: 'g2_t2_na1',
    grade: '2',
    testId: 'test_2',
    batteryId: 'quantitative',
    subtestId: 'number_analogies',
    difficulty: 'medium',
    prompt: 'Look at [ 8 ➔ 5 ]. What happened? Apply the exact same rule to [ 9 ➔ ? ].',
    audioScript: '8 turns into 5. It decreased by 3! What is 9 minus 3?',
    rendererType: 'number_analogy',
    data: { topPair: { left: 8, right: 5, relation: 'subtract 3 (-3)' }, bottomStimulus: { left: 9 } },
    options: [{ id: 'A', text: '6', label: '6' }, { id: 'B', text: '7', label: '7' }, { id: 'C', text: '4', label: '4' }, { id: 'D', text: '12', label: '12' }],
    correctAnswer: 0,
    explanation: { rule: 'Subtract 3 (-3)', description: '8 - 3 = 5. 9 - 3 = 6.', whyOthersWrong: '9 - 3 = 6.', parentTip: 'Count backward by 3!' }
  },
  {
    id: 'g2_t2_na2',
    grade: '2',
    testId: 'test_2',
    batteryId: 'quantitative',
    subtestId: 'number_analogies',
    difficulty: 'hard',
    prompt: 'Look at [ 2 ➔ 6 ]. It multiplied by 3! What does [ 3 ➔ ? ] turn into using the same rule?',
    audioScript: '2 turns into 6. It multiplied by 3! What is 3 times 3?',
    rendererType: 'number_analogy',
    data: { topPair: { left: 2, right: 6, relation: 'tripling (x3)' }, bottomStimulus: { left: 3 } },
    options: [{ id: 'A', text: '11', label: '11' }, { id: 'B', text: '8', label: '8' }, { id: 'C', text: '9', label: '9' }, { id: 'D', text: '12', label: '12' }],
    correctAnswer: 2,
    explanation: { rule: 'Multiply by 3 (Tripling)', description: '2 × 3 = 6. 3 × 3 = 9.', whyOthersWrong: '3 + 3 + 3 = 9.', parentTip: '3 groups of 3 is 9!' }
  },
  {
    id: 'g2_t2_np1',
    grade: '2',
    testId: 'test_2',
    batteryId: 'quantitative',
    subtestId: 'number_puzzles',
    difficulty: 'medium',
    prompt: 'The balance scale has 7 and 4 on the left side (Total = 11). Right pan has 8 and [?]. What number balances the scale?',
    audioScript: 'The left side has 7 plus 4 equals 11. Right side has 8 and a question mark. What number plus 8 equals 11?',
    rendererType: 'balance_puzzle',
    data: { type: 'balance', leftWeights: [7, 4], rightWeights: [8, '?'] },
    options: [{ id: 'A', text: '2', label: '2' }, { id: 'B', text: '3', label: '3' }, { id: 'C', text: '4', label: '4' }, { id: 'D', text: '5', label: '5' }],
    correctAnswer: 1,
    explanation: { rule: 'Equivalence: 11 = 11', description: '7 + 4 = 11. 8 + 3 = 11.', whyOthersWrong: '8 + 3 = 11.', parentTip: 'Count up from 8 to 11: 3 fingers!' }
  },
  {
    id: 'g2_t2_np2',
    grade: '2',
    testId: 'test_2',
    batteryId: 'quantitative',
    subtestId: 'number_puzzles',
    difficulty: 'medium',
    prompt: 'The red engine has 12. Car 1 has 8. What number must be in Car 2 to equal 12?',
    audioScript: 'The engine has 12. Car 1 has 8. What number in Car 2 makes 12?',
    rendererType: 'balance_puzzle',
    data: { type: 'train', targetTotal: 12, trainCars: [8, '?'] },
    options: [{ id: 'A', text: '3', label: '3' }, { id: 'B', text: '4', label: '4' }, { id: 'C', text: '5', label: '5' }, { id: 'D', text: '6', label: '6' }],
    correctAnswer: 1,
    explanation: { rule: 'Conservation of Total (12)', description: '8 + 4 = 12.', whyOthersWrong: '8 + 4 = 12.', parentTip: '8 plus what equals 12? Four!' }
  },
  {
    id: 'g2_t2_ns1',
    grade: '2',
    testId: 'test_2',
    batteryId: 'quantitative',
    subtestId: 'number_series',
    difficulty: 'medium',
    prompt: 'Look at the numbers: 15, 12, 9, 6, [ ? ]. What number comes next?',
    audioScript: '15, 12, 9, 6. The numbers are going down by 3. What is 6 minus 3?',
    rendererType: 'number_series',
    data: { seriesType: 'numbers', items: [15, 12, 9, 6] },
    options: [{ id: 'A', text: '4', label: '4' }, { id: 'B', text: '3', label: '3' }, { id: 'C', text: '2', label: '2' }, { id: 'D', text: '1', label: '1' }],
    correctAnswer: 1,
    explanation: { rule: 'Subtract 3 (-3)', description: '6 - 3 = 3.', whyOthersWrong: '6 minus 3 is 3.', parentTip: 'Count down: 6 minus 3 is 3!' }
  },
  {
    id: 'g2_t2_ns2',
    grade: '2',
    testId: 'test_2',
    batteryId: 'quantitative',
    subtestId: 'number_series',
    difficulty: 'medium',
    prompt: 'Look at the bead pattern: 3 beads, 6 beads, 9 beads, 12 beads. How many beads in the next group?',
    audioScript: '3 beads, 6 beads, 9 beads, 12 beads. Counting by threes! What comes next?',
    rendererType: 'number_series',
    data: {
      seriesType: 'beads',
      items: [{ count: 3, color: '#059669' }, { count: 6, color: '#059669' }, { count: 9, color: '#059669' }, { count: 12, color: '#059669' }]
    },
    options: [{ id: 'A', text: '14', label: '14 beads' }, { id: 'B', text: '15', label: '15 beads' }, { id: 'C', text: '16', label: '16 beads' }, { id: 'D', text: '18', label: '18 beads' }],
    correctAnswer: 1,
    explanation: { rule: 'Skip Counting by 3 (+3)', description: '12 + 3 = 15.', whyOthersWrong: '12 + 3 is 15.', parentTip: 'Count by 3s: 3, 6, 9, 12, 15!' }
  },
  {
    id: 'g2_t2_fm1',
    grade: '2',
    testId: 'test_2',
    batteryId: 'nonverbal',
    subtestId: 'figure_matrices',
    difficulty: 'medium',
    prompt: 'The square with 1 dot turns into a square with 2 dots (+1 dot). What happens to the triangle with 2 dots?',
    audioScript: 'One dot turns into two dots. What does two dots turn into?',
    rendererType: 'figure_matrix',
    data: {
      topRow: { left: { shape: 'square', fill: 'none', color: '#0f766e', dots: 1 }, right: { shape: 'square', fill: 'none', color: '#0f766e', dots: 2 } },
      bottomRow: { left: { shape: 'triangle', fill: 'none', color: '#0f766e', dots: 2 } }
    },
    options: [
      { id: 'A', shape: { shape: 'triangle', fill: 'none', color: '#0f766e', dots: 3 }, label: 'Triangle with 3 dots' },
      { id: 'B', shape: { shape: 'square', fill: 'none', color: '#0f766e', dots: 3 }, label: 'Square with 3 dots' },
      { id: 'C', shape: { shape: 'triangle', fill: 'solid', color: '#0f766e', dots: 2 }, label: 'Solid triangle' },
      { id: 'D', shape: { shape: 'circle', fill: 'none', color: '#0f766e', dots: 3 }, label: 'Circle with 3 dots' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Add 1 Inner Dot (+1)', description: 'The shape gains one extra dot: 2 dots + 1 = 3 dots.', whyOthersWrong: 'Triangle with 3 dots.', parentTip: 'Count the dots inside!' }
  },
  {
    id: 'g2_t2_fm2',
    grade: '2',
    testId: 'test_2',
    batteryId: 'nonverbal',
    subtestId: 'figure_matrices',
    difficulty: 'hard',
    prompt: 'An arrow pointing RIGHT flips 180° to point LEFT. If an arrow points UP, where will it point after a 180° flip?',
    audioScript: 'An arrow pointing right flips to the left. If an arrow points up, where does it flip?',
    rendererType: 'figure_matrix',
    data: {
      topRow: { left: { shape: 'arrow_up', rotation: 90, fill: 'semi', color: '#4f46e5' }, right: { shape: 'arrow_up', rotation: 270, fill: 'semi', color: '#4f46e5' } },
      bottomRow: { left: { shape: 'arrow_up', rotation: 0, fill: 'semi', color: '#4f46e5' } }
    },
    options: [
      { id: 'A', shape: { shape: 'arrow_up', rotation: 180, fill: 'semi', color: '#4f46e5' }, label: 'Points Down' },
      { id: 'B', shape: { shape: 'arrow_up', rotation: 90, fill: 'semi', color: '#4f46e5' }, label: 'Points Right' },
      { id: 'C', shape: { shape: 'arrow_up', rotation: 0, fill: 'semi', color: '#4f46e5' }, label: 'Points Up' },
      { id: 'D', shape: { shape: 'arrow_up', rotation: 270, fill: 'semi', color: '#4f46e5' }, label: 'Points Left' }
    ],
    correctAnswer: 0,
    explanation: { rule: '180° Inversion / Opposite Direction', description: 'Right flips to left (opposite). Up flips to down (opposite).', whyOthersWrong: 'The opposite of Up is Down.', parentTip: 'Think about opposites: Up flips to Down!' }
  },
  {
    id: 'g2_t2_pf1',
    grade: '2',
    testId: 'test_2',
    batteryId: 'nonverbal',
    subtestId: 'paper_folding',
    difficulty: 'hard',
    prompt: 'Paper is folded in half UP, then folded in half RIGHT into quarters. A hole is punched in the outer corner. What does it look like unfolded?',
    audioScript: 'Paper is folded up, then right into quarters. A hole is punched in the outside corner. Where are the holes unfolded?',
    rendererType: 'paper_folding',
    data: {
      steps: [
        { type: 'initial-fold', foldDirection: 'up', caption: 'Fold in half up' },
        { type: 'second-fold', caption: 'Fold right into quarter' },
        { type: 'punch', foldedBounds: { x: 50, y: 10, w: 40, h: 40 }, hole: { x: 75, y: 20, r: 6 }, caption: 'Punch outer corner' }
      ],
      creases: ['vertical', 'horizontal'],
      finalUnfoldedHoles: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 75, y: 75 }]
    },
    options: [
      { id: 'A', holes: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 75, y: 75 }], creases: ['vertical', 'horizontal'], label: 'Four corner holes' },
      { id: 'B', holes: [{ x: 50, y: 50, r: 9 }], creases: ['vertical', 'horizontal'], label: 'One center hole' },
      { id: 'C', holes: [{ x: 50, y: 25 }, { x: 50, y: 75 }], creases: ['vertical', 'horizontal'], label: 'Two edge holes' },
      { id: 'D', holes: [{ x: 75, y: 25 }, { x: 75, y: 75 }], creases: ['vertical'], label: 'Two right holes' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Quarter Fold Outer Corner Reflection', description: '2 folds = 4 layers. Punching the open outer corner produces 4 holes in the 4 corners.', whyOthersWrong: 'Outer punch creates 4 corner holes.', parentTip: '4 layers = 4 holes in the corners!' }
  },
  {
    id: 'g2_t2_pf2',
    grade: '2',
    testId: 'test_2',
    batteryId: 'nonverbal',
    subtestId: 'paper_folding',
    difficulty: 'medium',
    prompt: 'Paper is folded in half from left to right. A hole is punched in the middle of the folded crease. What does it look like unfolded?',
    audioScript: 'Paper is folded in half. A hole is punched along the folded crease line in the middle. Where will the hole be unfolded?',
    rendererType: 'paper_folding',
    data: {
      steps: [
        { type: 'initial-fold', foldDirection: 'right', caption: 'Fold in half right' },
        { type: 'punch', foldedBounds: { x: 50, y: 10, w: 40, h: 80 }, hole: { x: 52, y: 50, r: 6 }, caption: 'Punch along fold crease' }
      ],
      creases: ['vertical'],
      finalUnfoldedHoles: [{ x: 50, y: 50, r: 8 }]
    },
    options: [
      { id: 'A', holes: [{ x: 50, y: 50, r: 8 }], creases: ['vertical'], label: 'One hole in middle crease' },
      { id: 'B', holes: [{ x: 25, y: 50 }, { x: 75, y: 50 }], creases: ['vertical'], label: 'Two holes on sides' },
      { id: 'C', holes: [{ x: 50, y: 25 }, { x: 50, y: 75 }], creases: ['vertical'], label: 'Two holes top and bottom' },
      { id: 'D', holes: [{ x: 25, y: 25 }, { x: 75, y: 75 }], creases: ['vertical'], label: 'Two diagonal holes' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Crease Line Punch', description: 'Punching right on the folded crease opens into a single complete hole directly on the center fold line.', whyOthersWrong: 'A half-circle punch on the crease opens to one full circle.', parentTip: 'Punching on the fold line makes 1 hole in the middle!' }
  },
  {
    id: 'g2_t2_fc1',
    grade: '2',
    testId: 'test_2',
    batteryId: 'nonverbal',
    subtestId: 'figure_classification',
    difficulty: 'hard',
    prompt: 'Look at the 3 shapes. Each shape has 2 small dots inside. Which shape below also has 2 dots?',
    audioScript: 'Look at the shapes. Each one has two dots inside. Which shape below also has two dots?',
    rendererType: 'figure_classification',
    data: {
      stimulusFigures: [
        { shape: 'circle', fill: 'none', color: '#0f766e', dots: 2 },
        { shape: 'square', fill: 'none', color: '#0f766e', dots: 2 },
        { shape: 'triangle', fill: 'none', color: '#0f766e', dots: 2 }
      ],
      ruleDescription: 'All figures contain exactly 2 inner dots'
    },
    options: [
      { id: 'A', shape: { shape: 'diamond', fill: 'none', color: '#0f766e', dots: 2 }, label: 'Diamond with 2 dots' },
      { id: 'B', shape: { shape: 'diamond', fill: 'none', color: '#0f766e', dots: 1 }, label: 'Diamond with 1 dot' },
      { id: 'C', shape: { shape: 'pentagon', fill: 'none', color: '#0f766e', dots: 3 }, label: 'Pentagon with 3 dots' },
      { id: 'D', shape: { shape: 'circle', fill: 'solid', color: '#0f766e', dots: 0 }, label: 'Solid circle no dots' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Exactly 2 Inner Dots', description: 'The invariant rule is having 2 dots inside.', whyOthersWrong: 'Only Choice A has 2 dots.', parentTip: 'Count the dots inside!' }
  },
  {
    id: 'g2_t2_fc2',
    grade: '2',
    testId: 'test_2',
    batteryId: 'nonverbal',
    subtestId: 'figure_classification',
    difficulty: 'medium',
    prompt: 'Look at the 3 shapes. Each shape is cut by a vertical line down the center. Which shape belongs with them?',
    audioScript: 'Each shape has a vertical line dividing it down the middle. Which shape below also has a vertical line?',
    rendererType: 'figure_classification',
    data: {
      stimulusFigures: [
        { shape: 'circle', lines: 'vertical', fill: 'none', color: '#7c3aed' },
        { shape: 'square', lines: 'vertical', fill: 'none', color: '#7c3aed' },
        { shape: 'triangle', lines: 'vertical', fill: 'none', color: '#7c3aed' }
      ],
      ruleDescription: 'All figures have a vertical division line'
    },
    options: [
      { id: 'A', shape: { shape: 'diamond', lines: 'vertical', fill: 'none', color: '#7c3aed' }, label: 'Diamond with vertical line' },
      { id: 'B', shape: { shape: 'diamond', lines: 'horizontal', fill: 'none', color: '#7c3aed' }, label: 'Diamond with horizontal line' },
      { id: 'C', shape: { shape: 'diamond', fill: 'solid', color: '#7c3aed' }, label: 'Solid diamond' },
      { id: 'D', shape: { shape: 'star', fill: 'none', color: '#7c3aed' }, label: 'Empty star' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Vertical Line Symmetry', description: 'All stimulus shapes are split by a vertical line.', whyOthersWrong: 'Choice B has a horizontal line.', parentTip: 'Check the line direction: top to bottom (vertical)!' }
  },

  // =========================================================================
  // GRADE 2 (LEVEL 8) - PRACTICE TEST 3 (18 Full Questions - Challenge)
  // =========================================================================
  {
    id: 'g2_t3_pa1',
    grade: '2',
    testId: 'test_3',
    batteryId: 'verbal',
    subtestId: 'picture_analogies',
    difficulty: 'hard',
    prompt: 'Painter is to Paintbrush as Chef is to ______.',
    audioScript: 'A painter creates art with a paintbrush. What hand tool does a chef use to mix and cook?',
    rendererType: 'picture_analogy',
    data: {
      topPair: [{ emoji: '🧑‍🎨', label: 'Painter' }, { emoji: '🖌️', label: 'Paintbrush' }],
      bottomStimulus: { emoji: '👨‍🍳', label: 'Chef' }
    },
    options: [
      { id: 'A', emoji: '🥄', label: 'Whisk / Spoon', caption: 'Cooking tool' },
      { id: 'B', emoji: '🔨', label: 'Hammer', caption: 'Carpentry tool' },
      { id: 'C', emoji: '🩺', label: 'Stethoscope', caption: 'Doctor tool' },
      { id: 'D', emoji: '🚒', label: 'Fire Truck', caption: 'Firefighter vehicle' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Worker to Primary Hand Tool', description: 'A painter uses a paintbrush; a chef uses a whisk or cooking spoon.', whyOthersWrong: 'A hammer is for carpentry, stethoscope is for doctors.', parentTip: 'What tool does the chef hold in their hand?' }
  },
  {
    id: 'g2_t3_pa2',
    grade: '2',
    testId: 'test_3',
    batteryId: 'verbal',
    subtestId: 'picture_analogies',
    difficulty: 'hard',
    prompt: 'Boat travels on Water. Airplane travels through the ______.',
    audioScript: 'A boat travels on water. Where does an airplane travel?',
    rendererType: 'picture_analogy',
    data: {
      topPair: [{ emoji: '⛵', label: 'Boat' }, { emoji: '🌊', label: 'Water' }],
      bottomStimulus: { emoji: '✈️', label: 'Airplane' }
    },
    options: [
      { id: 'A', emoji: '☁️', label: 'Sky / Clouds', caption: 'Air' },
      { id: 'B', emoji: '🛤️', label: 'Railroad Tracks', caption: 'Train track' },
      { id: 'C', emoji: '🛣️', label: 'Highway Road', caption: 'Car road' },
      { id: 'D', emoji: '🏔️', label: 'Mountain', caption: 'Land' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Vehicle to Travel Medium', description: 'Boats travel on water; airplanes travel in the sky.', whyOthersWrong: 'Airplanes fly in the sky/air.', parentTip: 'Where does each vehicle travel?' }
  },
  {
    id: 'g2_t3_sc1',
    grade: '2',
    testId: 'test_3',
    batteryId: 'verbal',
    subtestId: 'sentence_completion',
    difficulty: 'hard',
    prompt: 'Listen: "The astronaut put on his spacesuit and boarded the ______ to travel to the space station."',
    audioScript: 'The astronaut boarded the... to travel into outer space. Choose the vehicle.',
    rendererType: 'sentence_completion',
    data: { sentence: 'The astronaut put on his spacesuit and boarded the ______ to travel to the space station.' },
    options: [
      { id: 'A', emoji: '🚀', label: 'Rocket', caption: 'Space travel' },
      { id: 'B', emoji: '⛵', label: 'Sailboat', caption: 'Water vehicle' },
      { id: 'C', emoji: '🚂', label: 'Train', caption: 'Railroad' },
      { id: 'D', emoji: '🚁', label: 'Helicopter', caption: 'Air' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Spacecraft Domain', description: 'A rocket is the only vehicle that travels into outer space.', whyOthersWrong: 'Sailboats and trains cannot travel to space.', parentTip: 'Which vehicle flies all the way to outer space?' }
  },
  {
    id: 'g2_t3_sc2',
    grade: '2',
    testId: 'test_3',
    batteryId: 'verbal',
    subtestId: 'sentence_completion',
    difficulty: 'medium',
    prompt: 'Listen: "The gardener planted flower seeds in the rich soil and used a ______ to water them every morning."',
    audioScript: 'The gardener planted flower seeds and used a... to water them every morning.',
    rendererType: 'sentence_completion',
    data: { sentence: 'The gardener planted flower seeds in the rich soil and used a ______ to water them every morning.' },
    options: [
      { id: 'A', emoji: '🚿', label: 'Watering Can', caption: 'Waters plants' },
      { id: 'B', emoji: '✂️', label: 'Scissors', caption: 'Cutting paper' },
      { id: 'C', emoji: '🧹', label: 'Broom', caption: 'Sweeping floor' },
      { id: 'D', emoji: '🪣', label: 'Paint Roller', caption: 'Painting walls' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Gardening Tool Function', description: 'A watering can holds water to nourish growing seeds.', whyOthersWrong: 'Brooms sweep and scissors cut.', parentTip: 'Look for the clue word "water them".' }
  },
  {
    id: 'g2_t3_pc1',
    grade: '2',
    testId: 'test_3',
    batteryId: 'verbal',
    subtestId: 'picture_classification',
    difficulty: 'hard',
    prompt: 'Look at Eagle, Hawk, and Owl. Which bird belongs in this group?',
    audioScript: 'Look at Eagle, Hawk, and Owl. They are sharp-eyed birds of prey! Which bird belongs with them?',
    rendererType: 'picture_classification',
    data: { items: [{ emoji: '🦅', label: 'Eagle' }, { emoji: '🦉', label: 'Owl' }, { emoji: '🪶', label: 'Hawk / Falcon' }] },
    options: [
      { id: 'A', emoji: '🦜', label: 'Falcon', caption: 'Bird of prey' },
      { id: 'B', emoji: '🐧', label: 'Penguin', caption: 'Flightless seabird' },
      { id: 'C', emoji: '🦆', label: 'Duck', caption: 'Waterfowl' },
      { id: 'D', emoji: '🐔', label: 'Chicken', caption: 'Poultry' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Category: Birds of Prey (Raptors)', description: 'Eagles, hawks, owls, and falcons are predatory raptors with talons and sharp beaks.', whyOthersWrong: 'Penguins, ducks, and chickens are not birds of prey.', parentTip: 'They are hunters with sharp talons and beaks!' }
  },
  {
    id: 'g2_t3_pc2',
    grade: '2',
    testId: 'test_3',
    batteryId: 'verbal',
    subtestId: 'picture_classification',
    difficulty: 'medium',
    prompt: 'Look at Boots, Sneakers, and Sandals. Which item belongs in this group?',
    audioScript: 'Boots, Sneakers, and Sandals are all worn on your feet. Which item below also belongs on your feet?',
    rendererType: 'picture_classification',
    data: { items: [{ emoji: '👢', label: 'Boots' }, { emoji: '👟', label: 'Sneakers' }, { emoji: '👡', label: 'Sandals' }] },
    options: [
      { id: 'A', emoji: '🥿', label: 'Slippers / Flats', caption: 'Footwear' },
      { id: 'B', emoji: '🧤', label: 'Gloves', caption: 'Hand wear' },
      { id: 'C', emoji: '🧢', label: 'Hat', caption: 'Head wear' },
      { id: 'D', emoji: '🧣', label: 'Scarf', caption: 'Neck wear' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Category: Footwear (Shoes)', description: 'Boots, sneakers, sandals, and slippers are footwear worn on feet.', whyOthersWrong: 'Gloves go on hands, hats on heads, scarves on necks.', parentTip: 'Which choice is shoes for your feet?' }
  },
  {
    id: 'g2_t3_na1',
    grade: '2',
    testId: 'test_3',
    batteryId: 'quantitative',
    subtestId: 'number_analogies',
    difficulty: 'hard',
    prompt: 'Look at [ 5 ➔ 15 ]. It multiplied by 3! What does [ 4 ➔ ? ] become using the exact same rule?',
    audioScript: '5 times 3 is 15. What is 4 times 3?',
    rendererType: 'number_analogy',
    data: { topPair: { left: 5, right: 15, relation: 'multiply by 3 (x3)' }, bottomStimulus: { left: 4 } },
    options: [{ id: 'A', text: '12', label: '12' }, { id: 'B', text: '10', label: '10' }, { id: 'C', text: '16', label: '16' }, { id: 'D', text: '7', label: '7' }],
    correctAnswer: 0,
    explanation: { rule: 'Multiply by 3 (Tripling)', description: '5 × 3 = 15. 4 × 3 = 12.', whyOthersWrong: '4 + 4 + 4 = 12.', parentTip: 'Add 4 three times: 4, 8, 12!' }
  },
  {
    id: 'g2_t3_na2',
    grade: '2',
    testId: 'test_3',
    batteryId: 'quantitative',
    subtestId: 'number_analogies',
    difficulty: 'hard',
    prompt: 'Look at [ 10 ➔ 6 ]. It decreased by 4! What does [ 11 ➔ ? ] become using the same rule?',
    audioScript: '10 minus 4 is 6. What is 11 minus 4?',
    rendererType: 'number_analogy',
    data: { topPair: { left: 10, right: 6, relation: 'subtract 4 (-4)' }, bottomStimulus: { left: 11 } },
    options: [{ id: 'A', text: '7', label: '7' }, { id: 'B', text: '8', label: '8' }, { id: 'C', text: '6', label: '6' }, { id: 'D', text: '5', label: '5' }],
    correctAnswer: 0,
    explanation: { rule: 'Subtract 4 (-4)', description: '10 - 4 = 6. 11 - 4 = 7.', whyOthersWrong: '11 - 4 = 7.', parentTip: 'Count down 4 from 11!' }
  },
  {
    id: 'g2_t3_np1',
    grade: '2',
    testId: 'test_3',
    batteryId: 'quantitative',
    subtestId: 'number_puzzles',
    difficulty: 'hard',
    prompt: 'The balance scale has 9 and 5 on the left (Total = 14). Right side has 8 and [?]. What number balances the scale?',
    audioScript: 'Left side has 9 plus 5 equals 14. Right side has 8 and a question mark. What number plus 8 equals 14?',
    rendererType: 'balance_puzzle',
    data: { type: 'balance', leftWeights: [9, 5], rightWeights: [8, '?'] },
    options: [{ id: 'A', text: '5', label: '5' }, { id: 'B', text: '6', label: '6' }, { id: 'C', text: '7', label: '7' }, { id: 'D', text: '8', label: '8' }],
    correctAnswer: 1,
    explanation: { rule: 'Two-Step Balance Equivalence', description: '9 + 5 = 14. 8 + 6 = 14.', whyOthersWrong: '8 + 6 = 14.', parentTip: '9 + 5 = 14. Count from 8 up to 14: 6!' }
  },
  {
    id: 'g2_t3_np2',
    grade: '2',
    testId: 'test_3',
    batteryId: 'quantitative',
    subtestId: 'number_puzzles',
    difficulty: 'hard',
    prompt: 'The left side has 6 and 6 (Total = 12). The right side has 7 and [?]. What balances the scale?',
    audioScript: '6 plus 6 is 12. 7 plus what equals 12?',
    rendererType: 'balance_puzzle',
    data: { type: 'balance', leftWeights: [6, 6], rightWeights: [7, '?'] },
    options: [{ id: 'A', text: '4', label: '4' }, { id: 'B', text: '5', label: '5' }, { id: 'C', text: '6', label: '6' }, { id: 'D', text: '3', label: '3' }],
    correctAnswer: 1,
    explanation: { rule: 'Equivalence: 12 = 12', description: '6 + 6 = 12. 7 + 5 = 12.', whyOthersWrong: '7 + 5 = 12.', parentTip: '12 minus 7 is 5!' }
  },
  {
    id: 'g2_t3_ns1',
    grade: '2',
    testId: 'test_3',
    batteryId: 'quantitative',
    subtestId: 'number_series',
    difficulty: 'medium',
    prompt: 'Look at the numbers: 5, 10, 15, 20, [ ? ]. What number comes next?',
    audioScript: '5, 10, 15, 20. Count by fives! What comes next?',
    rendererType: 'number_series',
    data: { seriesType: 'numbers', items: [5, 10, 15, 20] },
    options: [{ id: 'A', text: '22', label: '22' }, { id: 'B', text: '25', label: '25' }, { id: 'C', text: '30', label: '30' }, { id: 'D', text: '24', label: '24' }],
    correctAnswer: 1,
    explanation: { rule: 'Counting by Fives (+5)', description: '5, 10, 15, 20, 25.', whyOthersWrong: '20 + 5 = 25.', parentTip: '5, 10, 15, 20, 25!' }
  },
  {
    id: 'g2_t3_ns2',
    grade: '2',
    testId: 'test_3',
    batteryId: 'quantitative',
    subtestId: 'number_series',
    difficulty: 'hard',
    prompt: 'Look at the numbers: 20, 18, 16, 14, [ ? ]. What number comes next?',
    audioScript: '20, 18, 16, 14. Count backward by twos! What comes next?',
    rendererType: 'number_series',
    data: { seriesType: 'numbers', items: [20, 18, 16, 14] },
    options: [{ id: 'A', text: '13', label: '13' }, { id: 'B', text: '12', label: '12' }, { id: 'C', text: '10', label: '10' }, { id: 'D', text: '11', label: '11' }],
    correctAnswer: 1,
    explanation: { rule: 'Counting Backwards by 2 (-2)', description: '14 - 2 = 12.', whyOthersWrong: '14 - 2 = 12.', parentTip: 'Even numbers counting down: 16, 14, 12!' }
  },
  {
    id: 'g2_t3_fm1',
    grade: '2',
    testId: 'test_3',
    batteryId: 'nonverbal',
    subtestId: 'figure_matrices',
    difficulty: 'hard',
    prompt: 'A solid circle is inserted inside the square. What happens to the triangle in the bottom row?',
    audioScript: 'A circle is added inside the square. Apply the exact same rule to the triangle.',
    rendererType: 'figure_matrix',
    data: {
      topRow: {
        left: { shape: 'square', fill: 'none', color: '#4f46e5' },
        right: { shape: 'square', fill: 'none', color: '#4f46e5', innerShape: { shape: 'circle', fill: 'solid', color: '#4f46e5' } }
      },
      bottomRow: { left: { shape: 'triangle', fill: 'none', color: '#4f46e5' } }
    },
    options: [
      { id: 'A', shape: { shape: 'triangle', fill: 'none', color: '#4f46e5', innerShape: { shape: 'circle', fill: 'solid', color: '#4f46e5' } }, label: 'Triangle with circle inside' },
      { id: 'B', shape: { shape: 'circle', fill: 'solid', color: '#4f46e5' }, label: 'Solid circle' },
      { id: 'C', shape: { shape: 'triangle', fill: 'solid', color: '#4f46e5' }, label: 'Solid triangle' },
      { id: 'D', shape: { shape: 'square', fill: 'none', color: '#4f46e5' }, label: 'Empty square' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Inscribed Inner Shape', description: 'The outer triangle keeps its shape and gains a solid circle inside.', whyOthersWrong: 'Choice A places the solid circle inside the triangle.', parentTip: 'Look at what was added inside!' }
  },
  {
    id: 'g2_t3_fm2',
    grade: '2',
    testId: 'test_3',
    batteryId: 'nonverbal',
    subtestId: 'figure_matrices',
    difficulty: 'medium',
    prompt: 'A large square shrinks into a small square. What happens to the large circle in the bottom row?',
    audioScript: 'A large square shrinks into a small square. What happens to the large circle?',
    rendererType: 'figure_matrix',
    data: {
      topRow: { left: { shape: 'square', size: 60, fill: 'semi', color: '#d97706' }, right: { shape: 'square', size: 30, fill: 'semi', color: '#d97706' } },
      bottomRow: { left: { shape: 'circle', size: 60, fill: 'semi', color: '#d97706' } }
    },
    options: [
      { id: 'A', shape: { shape: 'circle', size: 30, fill: 'semi', color: '#d97706' }, label: 'Small Circle' },
      { id: 'B', shape: { shape: 'square', size: 30, fill: 'semi', color: '#d97706' }, label: 'Small Square' },
      { id: 'C', shape: { shape: 'circle', size: 60, fill: 'solid', color: '#d97706' }, label: 'Large Solid Circle' },
      { id: 'D', shape: { shape: 'circle', size: 60, fill: 'semi', color: '#d97706' }, label: 'Unchanged Circle' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Scale Reduction (Shrinking)', description: 'The shape scales down to half its size. Large circle shrinks to small circle.', whyOthersWrong: 'Choice A shrinks the circle.', parentTip: 'Big turns into small!' }
  },
  {
    id: 'g2_t3_pf1',
    grade: '2',
    testId: 'test_3',
    batteryId: 'nonverbal',
    subtestId: 'paper_folding',
    difficulty: 'hard',
    prompt: 'The paper is folded UP in half, then folded RIGHT in half into quarters. A hole is punched in the inner folded corner (vertex). What does it look like unfolded?',
    audioScript: 'Paper is folded up, then right into quarters. A hole is punched in the folded center corner. What does it look like unfolded?',
    rendererType: 'paper_folding',
    data: {
      steps: [
        { type: 'initial-fold', foldDirection: 'up', caption: 'Fold in half up' },
        { type: 'second-fold', caption: 'Fold right into quarter' },
        { type: 'punch', foldedBounds: { x: 50, y: 10, w: 40, h: 40 }, hole: { x: 52, y: 48, r: 6 }, caption: 'Punch folded center corner' }
      ],
      creases: ['vertical', 'horizontal'],
      finalUnfoldedHoles: [{ x: 50, y: 50, r: 8 }]
    },
    options: [
      { id: 'A', holes: [{ x: 50, y: 50, r: 9 }], creases: ['vertical', 'horizontal'], label: 'One center hole' },
      { id: 'B', holes: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 75, y: 75 }], creases: ['vertical', 'horizontal'], label: 'Four corner holes' },
      { id: 'C', holes: [{ x: 50, y: 25 }, { x: 50, y: 75 }], creases: ['vertical', 'horizontal'], label: 'Two edge holes' },
      { id: 'D', holes: [{ x: 75, y: 25 }, { x: 75, y: 75 }], creases: ['vertical'], label: 'Two right holes' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Folded Center Vertex Punch', description: 'Punching the corner where all folds intersect opens into one hole right in the center.', whyOthersWrong: 'The 4 quarter-punches join at the center to form 1 round hole.', parentTip: 'Punching the folded vertex makes 1 center hole!' }
  },
  {
    id: 'g2_t3_pf2',
    grade: '2',
    testId: 'test_3',
    batteryId: 'nonverbal',
    subtestId: 'paper_folding',
    difficulty: 'hard',
    prompt: 'Paper is folded in half diagonally. A hole is punched near the center diagonal crease. Where will the holes be unfolded?',
    audioScript: 'Paper is folded in half diagonally. A hole is punched near the crease. Where are the holes unfolded?',
    rendererType: 'paper_folding',
    data: {
      steps: [
        { type: 'initial-fold', foldDirection: 'right', caption: 'Fold along diagonal' },
        { type: 'punch', foldedBounds: { x: 20, y: 20, w: 60, h: 60 }, hole: { x: 40, y: 60, r: 6 }, caption: 'Punch near diagonal fold' }
      ],
      creases: ['diagonal-main'],
      finalUnfoldedHoles: [{ x: 40, y: 60 }, { x: 60, y: 40 }]
    },
    options: [
      { id: 'A', holes: [{ x: 40, y: 60 }, { x: 60, y: 40 }], creases: ['diagonal-main'], label: 'Two mirrored diagonal holes' },
      { id: 'B', holes: [{ x: 25, y: 25 }, { x: 75, y: 75 }], creases: ['diagonal-main'], label: 'Corner diagonal holes' },
      { id: 'C', holes: [{ x: 40, y: 60 }], creases: ['diagonal-main'], label: 'Single hole' },
      { id: 'D', holes: [{ x: 25, y: 75 }, { x: 75, y: 25 }], creases: ['diagonal-main'], label: 'Opposite corners' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Diagonal Symmetry Reflection', description: 'The diagonal fold mirrors across the y=x line, placing matching holes on opposite sides of the diagonal.', whyOthersWrong: 'The hole mirrors across the diagonal crease line.', parentTip: 'The fold line acts like a mirror tilted at an angle!' }
  },
  {
    id: 'g2_t3_fc1',
    grade: '2',
    testId: 'test_3',
    batteryId: 'nonverbal',
    subtestId: 'figure_classification',
    difficulty: 'hard',
    prompt: 'Look at the 3 shapes. Each shape has diagonal stripes inside. Which shape below belongs with them?',
    audioScript: 'Look at the three shapes. Each one has diagonal stripes. Which shape below also has diagonal stripes?',
    rendererType: 'figure_classification',
    data: {
      stimulusFigures: [
        { shape: 'circle', fill: 'striped', color: '#d97706' },
        { shape: 'square', fill: 'striped', color: '#d97706' },
        { shape: 'triangle', fill: 'striped', color: '#d97706' }
      ],
      ruleDescription: 'All figures have diagonal stripe patterns'
    },
    options: [
      { id: 'A', shape: { shape: 'diamond', fill: 'striped', color: '#d97706' }, label: 'Diamond with diagonal stripes' },
      { id: 'B', shape: { shape: 'diamond', fill: 'none', color: '#d97706' }, label: 'Empty diamond' },
      { id: 'C', shape: { shape: 'diamond', fill: 'solid', color: '#d97706' }, label: 'Solid diamond' },
      { id: 'D', shape: { shape: 'star', fill: 'none', color: '#d97706' }, label: 'Empty star' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Diagonal Stripe Fill Pattern', description: 'All stimulus figures have diagonal striped fills.', whyOthersWrong: 'Choice A is the only figure with diagonal stripes.', parentTip: 'Look at the pattern inside: stripes!' }
  },
  {
    id: 'g2_t3_fc2',
    grade: '2',
    testId: 'test_3',
    batteryId: 'nonverbal',
    subtestId: 'figure_classification',
    difficulty: 'hard',
    prompt: 'Look at the 3 figures. Each figure is a shape with an identical smaller shape inside it (concentric). Which choice belongs?',
    audioScript: 'Each figure has a smaller twin shape inside it. Which figure below also has a twin shape inside?',
    rendererType: 'figure_classification',
    data: {
      stimulusFigures: [
        { shape: 'circle', fill: 'none', color: '#2563eb', innerShape: { shape: 'circle', fill: 'none', color: '#2563eb' } },
        { shape: 'square', fill: 'none', color: '#2563eb', innerShape: { shape: 'square', fill: 'none', color: '#2563eb' } },
        { shape: 'triangle', fill: 'none', color: '#2563eb', innerShape: { shape: 'triangle', fill: 'none', color: '#2563eb' } }
      ],
      ruleDescription: 'All figures have an identical nested shape inside'
    },
    options: [
      { id: 'A', shape: { shape: 'diamond', fill: 'none', color: '#2563eb', innerShape: { shape: 'diamond', fill: 'none', color: '#2563eb' } }, label: 'Diamond inside diamond' },
      { id: 'B', shape: { shape: 'square', fill: 'none', color: '#2563eb', innerShape: { shape: 'circle', fill: 'none', color: '#2563eb' } }, label: 'Circle inside square' },
      { id: 'C', shape: { shape: 'circle', fill: 'solid', color: '#2563eb' }, label: 'Solid circle' },
      { id: 'D', shape: { shape: 'triangle', fill: 'none', color: '#2563eb' }, label: 'Single triangle' }
    ],
    correctAnswer: 0,
    explanation: { rule: 'Identical Nested Shapes (Concentric)', description: 'The inner shape must be identical in geometry to the outer shape.', whyOthersWrong: 'Choice B mixes a circle inside a square; only Choice A nests twin shapes.', parentTip: 'The baby shape inside must be the exact same shape as the mommy shape outside!' }
  },

  // =========================================================================
  // GRADE 3 (LEVEL 9) & OTHER GRADES
  // =========================================================================
  {
    id: 'g3_t1_va1',
    grade: '3',
    testId: 'test_1',
    batteryId: 'verbal',
    subtestId: 'verbal_analogies',
    difficulty: 'medium',
    prompt: 'Puppy is to Dog as Kitten is to ______.',
    audioScript: 'Puppy is to Dog as Kitten is to what?',
    rendererType: 'text_analogy',
    data: { stimulus: 'Puppy : Dog :: Kitten : ______' },
    options: [{ id: 'A', text: 'Cat', label: 'Cat' }, { id: 'B', text: 'Mouse', label: 'Mouse' }, { id: 'C', text: 'Whiskers', label: 'Whiskers' }, { id: 'D', text: 'Purr', label: 'Purr' }],
    correctAnswer: 0,
    explanation: { rule: 'Young to Adult Animal', description: 'A puppy is a baby dog; a kitten is a baby cat.', whyOthersWrong: 'Kitten grows into cat.', parentTip: 'Baby animal to adult animal.' }
  },
  {
    id: 'g3_t1_np1',
    grade: '3',
    testId: 'test_1',
    batteryId: 'quantitative',
    subtestId: 'number_puzzles',
    difficulty: 'hard',
    prompt: 'Solve: ⚪ + ⚪ = 10, and ⚪ + 🟦 = 12. What is the value of 🟦?',
    audioScript: 'Two circles add to 10. A circle plus a square is 12. What is the square?',
    rendererType: 'balance_puzzle',
    data: { type: 'equation', equationRows: ['⚪ + ⚪ = 10', '⚪ + 🟦 = 12', '🟦 = ?'] },
    options: [{ id: 'A', text: '5', label: '5' }, { id: 'B', text: '6', label: '6' }, { id: 'C', text: '7', label: '7' }, { id: 'D', text: '8', label: '8' }],
    correctAnswer: 2,
    explanation: { rule: 'Pre-Algebra Substitution', description: '⚪ = 5. 5 + 🟦 = 12 ➔ 🟦 = 7.', whyOthersWrong: '5 + 7 = 12.', parentTip: 'Find the circle first, then find the square.' }
  },
  {
    id: 'g3_t2_va1',
    grade: '3',
    testId: 'test_2',
    batteryId: 'verbal',
    subtestId: 'verbal_analogies',
    difficulty: 'hard',
    prompt: 'Author is to Book as Sculptor is to ______.',
    audioScript: 'An author creates a book. What does a sculptor create?',
    rendererType: 'text_analogy',
    data: { stimulus: 'Author : Book :: Sculptor : ______' },
    options: [{ id: 'A', text: 'Statue', label: 'Statue' }, { id: 'B', text: 'Clay', label: 'Clay' }, { id: 'C', text: 'Chisel', label: 'Chisel' }, { id: 'D', text: 'Museum', label: 'Museum' }],
    correctAnswer: 0,
    explanation: { rule: 'Creator to Finished Work', description: 'An author makes books; a sculptor makes statues.', whyOthersWrong: 'Clay is material, chisel is tool.', parentTip: 'Distinguish tool from finished work.' }
  },
  {
    id: 'g1_t1_pa1',
    grade: '1',
    testId: 'test_1',
    batteryId: 'verbal',
    subtestId: 'picture_analogies',
    difficulty: 'easy',
    prompt: 'Sun is to Day as Moon is to ______.',
    audioScript: 'The sun shines in the day. What shines in the night?',
    rendererType: 'picture_analogy',
    data: { topPair: [{ emoji: '☀️', label: 'Sun' }, { emoji: '🏙️', label: 'Day' }], bottomStimulus: { emoji: '🌙', label: 'Moon' } },
    options: [{ id: 'A', emoji: '🌌', label: 'Night', caption: 'Dark sky' }, { id: 'B', emoji: '🌧️', label: 'Rain', caption: 'Weather' }, { id: 'C', emoji: '🥪', label: 'Lunch', caption: 'Meal' }, { id: 'D', emoji: '⚽', label: 'Play', caption: 'Game' }],
    correctAnswer: 0,
    explanation: { rule: 'Day and Night Opposites', description: 'Sun is daytime; Moon is nighttime.', whyOthersWrong: 'Sun by day, Moon by night.', parentTip: 'Day and night!' }
  },
  {
    id: 'gk_t1_pa1',
    grade: 'k',
    testId: 'test_1',
    batteryId: 'verbal',
    subtestId: 'picture_analogies',
    difficulty: 'easy',
    prompt: 'Fish swims in Water. Bird flies in ______.',
    audioScript: 'A fish swims in water. Where does a bird fly?',
    rendererType: 'picture_analogy',
    data: { topPair: [{ emoji: '🐟', label: 'Fish' }, { emoji: '🌊', label: 'Water' }], bottomStimulus: { emoji: '🐦', label: 'Bird' } },
    options: [{ id: 'A', emoji: '☁️', label: 'Sky / Air', caption: 'Flight' }, { id: 'B', emoji: '🪨', label: 'Rock', caption: 'Ground' }, { id: 'C', emoji: '🥣', label: 'Bowl', caption: 'Food' }, { id: 'D', emoji: '🛏️', label: 'Bed', caption: 'Sleep' }],
    correctAnswer: 0,
    explanation: { rule: 'Locomotion Medium', description: 'Fish swim in water; birds fly in the sky.', whyOthersWrong: 'Birds fly in the sky.', parentTip: 'Where does a bird fly?' }
  }
];

export function calculateCogATScore(score, total) {
  if (total === 0) return { stanine: 1, percentile: '10th', sas: 80, rating: 'Practice Started' };
  const pct = Math.round((score / total) * 100);

  if (pct >= 95) return { stanine: 9, percentile: '96th - 99th', sas: 135, rating: 'Very High / Gifted Range (GATE)' };
  if (pct >= 88) return { stanine: 8, percentile: '89th - 95th', sas: 125, rating: 'Above Average / Advanced' };
  if (pct >= 76) return { stanine: 7, percentile: '77th - 88th', sas: 118, rating: 'Well Above Average' };
  if (pct >= 60) return { stanine: 6, percentile: '60th - 76th', sas: 108, rating: 'Above Average' };
  if (pct >= 40) return { stanine: 5, percentile: '40th - 59th', sas: 100, rating: 'Average' };
  if (pct >= 24) return { stanine: 4, percentile: '24th - 39th', sas: 92, rating: 'Below Average' };
  if (pct >= 12) return { stanine: 3, percentile: '12th - 23rd', sas: 84, rating: 'Well Below Average' };
  return { stanine: 2, percentile: '4th - 11th', sas: 75, rating: 'Needs Review' };
}
