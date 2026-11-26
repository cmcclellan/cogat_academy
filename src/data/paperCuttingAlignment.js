import { PAPER, buildPaperCutData, clipCutToPaper, unfoldCuts } from '../utils/paperGeometry.js';

const polygon = points => ({ points });
const square = (x, y, radius = 5) => polygon([[x - radius, y - radius], [x + radius, y - radius], [x + radius, y + radius], [x - radius, y + radius]]);
const triangle = (x, y, radius = 6) => polygon([[x, y - radius], [x - radius, y + radius], [x + radius, y + radius]]);
const diamond = (x, y, radius = 6) => polygon([[x, y - radius], [x + radius, y], [x, y + radius], [x - radius, y]]);
const roundPunch = (x, y, radius = 4) => polygon(Array.from({ length: 24 }, (_, i) => {
  const angle = i * Math.PI / 12;
  return [Number((x + radius * Math.cos(angle)).toFixed(6)), Number((y + radius * Math.sin(angle)).toFixed(6))];
}));

// A geometric occupancy signature compares visible unions, including polygons
// that touch at a crease, rather than counting polygon records as separate holes.
function contains([x, y], points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
  }
  return inside;
}
export function visibleCutKey(cuts) {
  let result = '';
  for (let y = 11; y < 90; y += 2) for (let x = 11; x < 90; x += 2) {
    result += cuts.some(cut => contains([x, y], cut.points)) ? '1' : '0';
  }
  return result;
}
const onPaper = cuts => cuts.map(cut => clipCutToPaper(cut, PAPER)).filter(Boolean);
const shifted = (cuts, dx, dy) => onPaper(cuts.map(cut => polygon(cut.points.map(([x, y]) => [x + dx, y + dy]))));

const specs = [
  [['right'], [triangle(70, 30)], 'interior_triangle', 'A triangular cut through one fold'],
  [['up'], [square(28, 28, 6)], 'interior_square', 'A square cut through one fold'],
  [['left'], [polygon([[6, 64], [18, 70], [6, 76]])], 'outer_edge_notch', 'A triangular notch in an outside edge'],
  [['down'], [square(70, 90, 6)], 'straight_edge_notch', 'A rectangular notch in an outside edge'],
  [['right'], [roundPunch(68, 28), roundPunch(77, 68, 5)], 'two_round_punches', 'Two round punches through one fold'],
  [['up'], [roundPunch(70, 25, 5), square(30, 35, 4)], 'mixed_cut_shapes', 'Two different cut shapes'],
  [['right'], [polygon([[46, 24], [60, 30], [46, 36]])], 'crease_notch_triangle', 'A cut that touches a vertical crease'],
  [['down'], [square(30, 50, 6)], 'crease_notch_square', 'A cut that touches a horizontal crease'],
  [['diagonal'], [triangle(25, 65, 5)], 'diagonal_triangle', 'A triangular cut after a diagonal fold'],
  [['anti_diagonal'], [square(30, 35, 5)], 'other_diagonal_square', 'A square cut after the other diagonal fold'],
  [['left', 'down'], [triangle(30, 70, 5)], 'two_fold_triangle', 'A triangular cut after two folds'],
  [['up', 'right'], [square(75, 25, 4), triangle(62, 38, 4)], 'two_fold_mixed_cuts', 'Two different cuts after two folds'],
  [['left', 'down'], [square(50, 70, 6)], 'one_crease_two_folds', 'A cut on one crease after two folds'],
  [['right', 'up'], [diamond(50, 50, 8)], 'intersection_diamond', 'A cut where two creases meet'],
  [['down', 'right'], [square(90, 90, 7)], 'outer_corner_removal', 'An outside corner cut after two folds'],
  [['diagonal'], [triangle(40, 40, 6)], 'diagonal_crease_cut', 'A triangular cut touching a diagonal crease'],
  [['anti_diagonal'], [triangle(60, 10, 8), square(25, 45, 5)], 'edge_and_interior', 'An edge notch and an inside cut'],
  [['left', 'up'], [roundPunch(25, 25, 4), roundPunch(40, 38, 4)], 'two_fold_two_punches', 'Two punches after two folds'],
  [['left'], [diamond(28, 40, 5)], 'diamond_transfer', 'Transfer a noncircular cut'],
  [['up'], [polygon([[64, 54], [70, 40], [76, 54]])], 'horizontal_crease_transfer', 'Transfer a crease-touching triangular cut'],
  [['anti_diagonal'], [square(10, 35, 7)], 'diagonal_edge_transfer', 'Transfer an edge notch across a diagonal'],
  [['down', 'left'], [square(50, 50, 6)], 'intersection_square_transfer', 'A square cut where two creases meet'],
  [['down'], [roundPunch(30, 70, 4), roundPunch(70, 65, 5)], 'multiple_punch_transfer', 'Transfer two separate punches'],
  [['up', 'right'], [polygon([[94, 18], [82, 25], [94, 32]])], 'two_fold_notch_transfer', 'Transfer an edge notch through two folds']
];

function metadata(index) {
  const check = index >= 18;
  const checkLevels = ['easy', 'medium', 'medium', 'hard', 'easy', 'hard'];
  const difficulty = check ? checkLevels[index - 18] : ['easy', 'medium', 'hard'][Math.floor(index / 6)];
  return {
    id: `g2_a_pc${String(index + 1).padStart(2, '0')}`, grade: '2', batteryId: 'nonverbal', subtestId: 'paper_folding',
    rendererType: 'paper_folding', difficulty, purpose: check ? 'check' : 'practice',
    testId: check ? `check_${Math.floor((index - 18) / 2) + 1}` : { easy: 'foundations', medium: 'developing', hard: 'stretch' }[difficulty],
    alignment: 'test_format', alignmentReason: 'Original fold-cut-unfold practice in the published primary paper-folding format; not a claim that every cut appears on an official form.'
  };
}

function makeQuestion([folds, cuts, skillId, skillName], index) {
  const data = buildPaperCutData(folds, cuts);
  const expected = data.finalUnfoldedCuts;
  const alternateAxis = folds[0] === 'right' || folds[0] === 'left' ? 'up' : 'right';
  const pool = [
    [data.cuts, 'This leaves only the cuts visible on the folded paper and misses the reflected copies.'],
    [unfoldCuts(data.cuts, alternateAxis), 'This reflects across a different crease or stops before all folds have been undone.'],
    [shifted(expected, 8, 0), 'These cutouts have moved sideways instead of keeping their distances from the crease.'],
    [shifted(expected, 0, 8), 'These cutouts have moved down instead of following the shown folds.'],
    [[square(50, 50, 7)], 'A single central square ignores the shown cut shapes and locations.'],
    [[], 'Opening the paper cannot put the removed pieces back.']
  ];
  const used = new Set([visibleCutKey(expected)]);
  const wrong = pool.filter(([candidate]) => {
    const key = visibleCutKey(candidate);
    if (used.has(key)) return false;
    used.add(key); return true;
  }).slice(0, 3);
  if (wrong.length !== 3) throw new Error(`Cannot form distinct cut choices for ${index}`);
  const correctAnswer = index % 4;
  const options = wrong.map(([cuts, misconception]) => ({ cuts, creases: data.creases, misconception }));
  options.splice(correctAnswer, 0, { cuts: expected, creases: data.creases });
  const prompt = 'Follow the folds and the marked cuts. Which choice shows the paper when it is completely opened?';
  return { ...metadata(index), skillId, skillName, prompt, audioScript: prompt, data,
    options: options.map((o, i) => ({ ...o, id: String.fromCharCode(65 + i) })), correctAnswer,
    explanation: { rule: skillName,
      description: 'Undo the last fold first. Reflect every removed piece across that crease, then undo the earlier folds in the same way. Edge cuts change the paper outline, and cutouts that meet at a crease can join into one opening.',
      whyOthersWrong: wrong.map(([, misconception]) => misconception).join(' '),
      parentTip: 'Before unfolding real paper, ask the child to predict where each cut will move. Check the shape, location, and outside edges, rather than only counting openings.' }
  };
}

export const PAPER_CUTTING_ALIGNMENT = specs.map(makeQuestion);
