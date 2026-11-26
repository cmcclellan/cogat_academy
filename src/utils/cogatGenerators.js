import { buildPaperData } from './paperGeometry.js';

const pick = values => values[Math.floor(Math.random() * values.length)];
const integer = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
let sequence = 0;
const shuffle = values => {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = integer(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

function question(subtestId, rendererType, prompt, data, correct, distractors, explanation, grade, difficulty) {
  if (grade !== '2') throw new Error('Generated content supports Grade 2 only.');
  const options = shuffle([correct, ...distractors]);
  return {
    id: `generated_${subtestId}_${++sequence}`, grade, subtestId,
    batteryId: ['figure_matrices', 'paper_folding', 'figure_classification'].includes(subtestId) ? 'nonverbal' : 'quantitative',
    difficulty, rendererType, prompt, audioScript: prompt, data,
    correctAnswer: options.indexOf(correct),
    options: options.map((o, i) => ({ ...o, id: String.fromCharCode(65 + i) })),
    explanation
  };
}

const quantity = value => ({ quantity: value, text: String(value), label: String(value) });
function numberChoices(answer, excluded = []) {
  const values = [];
  for (const delta of [-1, 1, 2, -2, 3, -3, 4, 5, 6]) {
    const value = answer + delta;
    if (value > 0 && !excluded.includes(value)) values.push(quantity(value));
    if (values.length === 3) return values;
  }
  throw new Error('Cannot create unique distractors');
}
const explain = (rule, description, parentTip) => ({ rule, description, parentTip,
  whyOthersWrong: 'Check every part of the rule against each choice. The other choices change a different feature or amount.' });

export function generateNumberAnalogy(grade = '2', difficulty = 'medium') {
  const operation = pick(['add', 'subtract', 'double', 'triple']);
  const amount = integer(2, 4);
  const a = integer(4, 6), c = integer(7, 9);
  const apply = n => operation === 'add' ? n + amount : operation === 'subtract' ? n - amount : n * (operation === 'double' ? 2 : 3);
  const b = apply(a), answer = apply(c);
  // Exclude the competing additive or multiplicative rule suggested by a single pair.
  const alternatives = [c + (b - a), c * b / a];
  return question('number_analogies', 'number_analogy',
    'Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?',
    { topPair: { left: a, right: b }, bottomStimulus: { left: c } }, quantity(answer), numberChoices(answer, alternatives),
    explain(operation, `${a} becomes ${b}. Using the same ${operation} rule, ${c} becomes ${answer}.`, 'Compare the two quantities before looking at the choices.'), grade, difficulty);
}

export function generateNumberPuzzle(grade = '2', difficulty = 'medium') {
  const a = integer(2, 6), b = integer(2, 6), c = integer(1, a + b - 2);
  const answer = a + b - c;
  return question('number_puzzles', 'balance_puzzle',
    'Which choice makes the two trains carry the same total number of objects?',
    { type: 'object_trains', topCars: [a, b], bottomCars: [c, '?'] }, quantity(answer), numberChoices(answer),
    explain('Equal totals', `${a} + ${b} = ${a + b}. The other train needs ${c} + ${answer} = ${a + b}.`, 'Count the objects in each train, then find the missing amount.'), grade, difficulty);
}

export function generateNumberSeries(grade = '2', difficulty = 'medium') {
  const step = pick([2, 3]), descending = Math.random() < 0.5;
  const start = descending ? integer(15, 18) : integer(1, 3);
  const change = descending ? -step : step;
  const counts = Array.from({ length: 4 }, (_, i) => start + change * i);
  const answer = start + change * 4;
  return question('number_series', 'number_series', 'Look at the groups of beads. Which group comes next?',
    { seriesType: 'beads', items: counts.map(count => ({ count, color: '#0284c7' })) }, quantity(answer), numberChoices(answer),
    explain(`Change by ${change}`, `Each group changes by ${change} beads. ${counts[3]} + (${change}) = ${answer}.`, 'Compare each group with the group just before it.'), grade, difficulty);
}

export function generateFigureMatrix(grade = '2', difficulty = 'medium') {
  const transformation = pick(['fill', 'rotation', 'dots', 'inscribed']);
  const a = { shape: 'square', fill: 'none', color: '#1e293b' };
  const c = { shape: 'triangle', fill: 'none', color: '#1e293b' };
  let b, correct, wrong, rule;
  if (transformation === 'fill') {
    b = { ...a, fill: 'solid' }; correct = { ...c, fill: 'solid' };
    wrong = [c, { ...b }, { ...c, fill: 'striped' }]; rule = 'Fill the shape';
  } else if (transformation === 'rotation') {
    a.shape = c.shape = 'arrow_up'; c.rotation = 180;
    b = { ...a, rotation: 90 }; correct = { ...c, rotation: 270 };
    wrong = [0, 90, 180].map(rotation => ({ ...c, rotation })); rule = 'Turn one quarter clockwise';
  } else if (transformation === 'dots') {
    a.dots = 1; c.dots = 2;
    b = { ...a, dots: 2 }; correct = { ...c, dots: 3 };
    wrong = [0, 1, 2].map(dots => ({ ...c, dots })); rule = 'Add one dot';
  } else {
    const innerShape = { shape: 'circle', fill: 'solid', color: '#1e293b' };
    b = { ...a, innerShape }; correct = { ...c, innerShape };
    wrong = [c, { ...c, innerShape: { ...innerShape, shape: 'square' } }, { ...c, fill: 'solid' }];
    rule = 'Add a solid circle inside';
  }
  return question('figure_matrices', 'figure_matrix',
    'Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?',
    { topRow: { left: a, right: b }, bottomRow: { left: c } }, { shape: correct }, wrong.map(shape => ({ shape })),
    explain(rule, `Apply this change to the bottom figure: ${rule.toLowerCase()}. Keep the other features the same.`, 'Ask what changed and what stayed the same.'), grade, difficulty);
}

export function generatePaperFolding(grade = '2', difficulty = 'medium') {
  const folds = pick([['right'], ['up'], ['up', 'right'], ['diagonal']]);
  const punch = folds[0] === 'diagonal' ? { x: 30, y: 70, r: 5 }
    : folds.length === 2 ? { x: 75, y: 25, r: 5 }
    : folds[0] === 'right' ? { x: 75, y: pick([25, 75]), r: 5 } : { x: pick([25, 75]), y: 25, r: 5 };
  const data = buildPaperData(folds, punch);
  const holes = data.finalUnfoldedHoles;
  const wrong = [[punch], [{ x: 50, y: 50, r: 5 }], [{ x: 25, y: 50, r: 5 }, { x: 75, y: 50, r: 5 }]];
  return question('paper_folding', 'paper_folding',
    'Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?', data,
    { holes, creases: data.creases }, wrong.map(holes => ({ holes, creases: data.creases })),
    explain('Reflect across each crease', `Undo the folds in reverse order. Each crease mirrors the hole, giving ${holes.length} separate holes in this example.`, 'Holes away from a crease make separate copies. Holes centered on a crease can join when opened.'), grade, difficulty);
}

export function generateFigureClassification(grade = '2', difficulty = 'medium') {
  const kind = pick(['dots', 'stripes', 'sides']);
  let figures, correct, wrong, rule;
  if (kind === 'dots') {
    const dots = integer(1, 3);
    figures = ['circle', 'square', 'triangle'].map(shape => ({ shape, dots }));
    correct = { shape: 'diamond', dots };
    wrong = [0, dots % 3 + 1, 4].map(dots => ({ shape: 'diamond', dots })); rule = `Exactly ${dots} dots`;
  } else if (kind === 'stripes') {
    figures = ['circle', 'square', 'triangle'].map(shape => ({ shape, fill: 'striped' }));
    correct = { shape: 'diamond', fill: 'striped' };
    wrong = ['none', 'solid', 'semi'].map(fill => ({ shape: 'diamond', fill })); rule = 'Striped fill';
  } else {
    figures = ['square', 'diamond', 'trapezoid'].map(shape => ({ shape }));
    correct = { shape: 'square', rotation: 20 };
    wrong = ['circle', 'triangle', 'pentagon'].map(shape => ({ shape })); rule = 'Four straight sides';
  }
  return question('figure_classification', 'figure_classification',
    'Look at the three figures. Which choice belongs in the same group?', { stimulusFigures: figures },
    { shape: correct }, wrong.map(shape => ({ shape })),
    explain(rule, `All three examples share this feature: ${rule.toLowerCase()}. The correct choice shares it too.`, 'Check the proposed rule against all three examples.'), grade, difficulty);
}

const generators = { number_analogies: generateNumberAnalogy, number_puzzles: generateNumberPuzzle,
  number_series: generateNumberSeries, figure_matrices: generateFigureMatrix,
  paper_folding: generatePaperFolding, figure_classification: generateFigureClassification };

export function generateProceduralQuestion(subtestId, grade = '2', difficulty = 'medium') {
  const id = subtestId ?? pick(Object.keys(generators));
  if (!generators[id]) throw new Error(`No reviewed generator for ${id}`);
  return generators[id](grade, difficulty);
}
