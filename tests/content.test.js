import test from 'node:test';
import assert from 'node:assert/strict';
import * as content from '../src/data/cogatData.js';
import { generateProceduralQuestion } from '../src/utils/cogatGenerators.js';
import { buildPaperData, reflectHole } from '../src/utils/paperGeometry.js';

const { QUESTIONS } = content;
const subtests = [
  'picture_analogies', 'sentence_completion', 'picture_classification',
  'number_analogies', 'number_puzzles', 'number_series',
  'figure_matrices', 'paper_folding', 'figure_classification'
];

// Defaults and unordered hole arrays must not make identical pictures seem different.
function shapeKey(s) {
  const symmetry = { circle: 1, square: 90, diamond: 90, triangle: 120, pentagon: 72, hexagon: 60, star: 72, cross: 90 };
  const fill = s.fill ?? 'none';
  const dots = fill === 'solid' ? 0 : (s.dots ?? 0);
  const asymmetric = dots > 1 || s.innerShape || s.lines;
  const period = asymmetric ? 360 : (symmetry[s.shape] ?? 360);
  return {
    shape: s.shape, fill, color: s.color ?? '#1e293b',
    rotation: ((s.rotation ?? 0) % period + period) % period,
    size: s.size ?? 60, dots, lines: s.lines || 0,
    innerShape: s.innerShape ? shapeKey(s.innerShape) : null
  };
}

function holeKey(holes) {
  return [...new Set(holes.map(h => `${h.x},${h.y},${h.r || 5}`))].sort();
}

function optionKey(o) {
  if (o.scene) return JSON.stringify(o.scene);
  if (o.cuts) return JSON.stringify(o.cuts);
  if (o.shape) return JSON.stringify(shapeKey(o.shape));
  if (o.holes) return JSON.stringify(holeKey(o.holes));
  if (o.quantity !== undefined) return `quantity:${o.quantity}`;
  if (o.illustration) return `illustration:${o.illustration}`;
  return o.emoji ? `emoji:${o.emoji}` : `text:${o.text ?? o.label}`;
}

function assertQuestion(q) {
  assert.equal(q.grade, '2', q.id);
  assert.ok(subtests.includes(q.subtestId), q.id);
  assert.equal(q.options.length, 4, q.id);
  assert.ok(Number.isInteger(q.correctAnswer) && q.correctAnswer >= 0 && q.correctAnswer < 4, q.id);
  assert.equal(new Set(q.options.map(optionKey)).size, 4, `${q.id}: every rendered choice must differ`);
  assert.deepEqual(q.options.map(o => o.id), ['A', 'B', 'C', 'D'], q.id);
  assert.ok(q.prompt && q.audioScript && q.explanation?.description, q.id);
  for (const option of q.options) {
    assert.equal(option.caption, undefined, `${q.id}: category/function captions leak reasoning`);
    if (option.quantity !== undefined) assert.ok(Number.isInteger(option.quantity) && option.quantity > 0, q.id);
  }
  if (q.rendererType === 'sentence_completion') {
    assert.equal(q.audioScript, q.data.sentence.replace(/_+/g, 'blank') + ' Which picture completes the sentence?', q.id);
  } else if (q.rendererType === 'equation_puzzle') {
    const expected = [...q.data.left, '=', ...q.data.right].map(token => ({'+':'plus','-':'minus','=':'equals','?':'blank'})[token] || token).join(' ');
    assert.ok(q.audioScript.includes(expected), q.id);
  } else {
    assert.equal(q.audioScript, q.prompt, `${q.id}: audio must not add a reasoning hint`);
  }
  assert.doesNotMatch(q.explanation.description, /Choice [A-D]\b/, `${q.id}: answer ordering may change`);
  assert.doesNotMatch(q.explanation.whyOthersWrong, /Choice [A-D]\b/, `${q.id}: answer ordering may change`);
}

function assertQuantitativeAnswer(q) {
  const answer = q.options[q.correctAnswer].quantity;
  if (q.subtestId === 'number_puzzles') {
    assert.equal(q.data.type, 'object_trains', q.id);
    const top = q.data.topCars.reduce((a, b) => a + b, 0);
    const bottom = q.data.bottomCars.reduce((a, b) => a + (b === '?' ? answer : b), 0);
    assert.equal(bottom, top, q.id);
  } else if (q.subtestId === 'number_series') {
    assert.equal(q.data.seriesType, 'beads', q.id);
    const counts = q.data.items.map(o => o.count);
    const delta = counts[1] - counts[0];
    assert.ok(counts.every((n, i) => i === 0 || n - counts[i - 1] === delta), q.id);
    assert.equal(answer, counts.at(-1) + delta, q.id);
  } else if (q.subtestId === 'number_analogies') {
    const { left: a, right: b } = q.data.topPair;
    const c = q.data.bottomStimulus.left;
    const plausible = new Set([c + b - a, c * b / a]);
    assert.ok(plausible.has(answer), q.id);
    assert.equal(q.options.filter(o => plausible.has(o.quantity)).length, 1,
      `${q.id}: additive and multiplicative interpretations must not key different choices`);
    assert.equal(q.data.topPair.relation, undefined, q.id);
  }
}

function assertPaperAnswer(q) {
  const { folds, punch, steps, unfolding, finalUnfoldedHoles } = q.data;
  // Independent reflection calculation guards against diagrams and answer keys drifting.
  let expected = [punch];
  for (const fold of [...folds].reverse()) {
    const reflected = expected.map(h => fold === 'right' ? { ...h, x: 100 - h.x }
      : fold === 'up' ? { ...h, y: 100 - h.y } : { ...h, x: h.y, y: h.x });
    expected = [...expected, ...reflected];
  }
  assert.deepEqual(holeKey(finalUnfoldedHoles), holeKey(expected), q.id);
  assert.deepEqual(holeKey(q.options[q.correctAnswer].holes), holeKey(expected), q.id);
  assert.deepEqual(steps.at(-1).hole, punch, q.id);
  assert.deepEqual(holeKey(unfolding.at(-1).holes), holeKey(expected), q.id);
  assert.equal(steps.length, folds.length + 1, q.id);
  assert.equal(unfolding.length, folds.length + 1, q.id);
  for (const o of q.options) assert.deepEqual(o.creases, q.data.creases, `${q.id}: creases must not identify answer`);
}

function assertFigureAnswer(q) {
  if (q.subtestId === 'figure_matrices') {
    const { left: a, right: b } = q.data.topRow;
    const c = q.data.bottomRow.left;
    const expected = { ...c };
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (JSON.stringify(a[key]) === JSON.stringify(b[key])) continue;
      if (key === 'rotation' || key === 'dots') expected[key] = (c[key] ?? 0) + (b[key] ?? 0) - (a[key] ?? 0);
      else if (key === 'size') expected.size = (c.size ?? 60) * (b.size ?? 60) / (a.size ?? 60);
      else expected[key] = b[key];
    }
    assert.deepEqual(shapeKey(q.options[q.correctAnswer].shape), shapeKey(expected), `${q.id}: apply the top-row transformation`);
  } else if (q.subtestId === 'figure_classification') {
    const figures = q.data.stimulusFigures;
    const sides = { circle: 0, triangle: 3, square: 4, diamond: 4, trapezoid: 4, pentagon: 5, hexagon: 6 };
    const commonSides = sides[figures[0].shape];
    const matches = figures.every(s => s.innerShape?.shape === s.shape) ? s => s.innerShape?.shape === s.shape
      : figures.every(s => s.dots > 0 && s.dots === figures[0].dots) ? s => s.dots === figures[0].dots
      : figures.every(s => s.lines && s.lines === figures[0].lines) ? s => s.lines === figures[0].lines
      : figures.every(s => s.fill === 'striped') ? s => s.fill === 'striped'
      : figures.every(s => sides[s.shape] === commonSides) ? s => sides[s.shape] === commonSides : null;
    assert.ok(matches, `${q.id}: supported invariant in the stimulus`);
    assert.ok(matches(q.options[q.correctAnswer].shape), `${q.id}: correct choice shares invariant`);
    assert.equal(q.options.filter(o => matches(o.shape)).length, 1, `${q.id}: only one choice shares invariant`);
  }
}

test('curated bank preserves the original content and adds aligned gap coverage', () => {
  assert.equal(content.BASE_QUESTIONS.length, 216);
  assert.ok(QUESTIONS.length > content.BASE_QUESTIONS.length);
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size, QUESTIONS.length);
  for (const id of subtests) assert.ok(QUESTIONS.filter(q => q.subtestId === id && q.alignment === 'test_format').length >= 24, id);
  assert.ok(content.ENRICHMENT_QUESTIONS.length > 0);
  assert.ok(content.CHECK_QUESTIONS.every(q => q.alignment === 'test_format'));
  assert.ok(content.PRACTICE_QUESTIONS.every(q => q.alignment === 'test_format'));
  assert.equal(content.PRACTICE_QUESTIONS.length + content.CHECK_QUESTIONS.length + content.ENRICHMENT_QUESTIONS.length, QUESTIONS.length);
  assert.deepEqual(content.GRADE_LEVELS.map(g => g.id), ['2']);
  assert.equal(content.calculateCogATScore, undefined);
});

test('all curated choices are distinct, keys solve the shown problem, and audio adds no hints', () => {
  for (const q of QUESTIONS) {
    assertQuestion(q);
    // Expanded families have independent rule-specific checks in their authoring suites.
    if (q.id.startsWith('g2_t')) {
      if (q.batteryId === 'quantitative') assertQuantitativeAnswer(q);
      if (q.subtestId === 'paper_folding') assertPaperAnswer(q);
      if (q.subtestId.startsWith('figure_')) assertFigureAnswer(q);
    }
  }
  for (const q of QUESTIONS) assert.doesNotMatch(q.prompt, /It added|It multiplied|Each shape contains|turns 90|fills in solid/i, q.id);
});

test('misidentified pictures use matching illustrations instead of unrelated emoji', () => {
  const illustrations = new Map();
  for (const q of QUESTIONS) {
    const pictures = [...q.options, ...(q.data.topPair instanceof Array ? q.data.topPair : []), q.data.bottomStimulus];
    for (const p of pictures.filter(Boolean)) if (p.illustration) illustrations.set(p.label, p.illustration);
  }
  for (const [label, illustration] of [['Leash', 'leash'], ['Doghouse', 'doghouse'], ['Tadpole', 'tadpole'],
    ['Barn', 'barn'], ['Harp', 'harp'], ['Oven', 'oven'], ['Freezer', 'freezer'], ['Dam', 'dam'],
    ['Watering Can', 'watering_can'], ['Paint Roller', 'paint_roller']]) {
    assert.equal(illustrations.get(label), illustration);
  }
});

test('paper folds preserve punch position and handle crease, corner, and diagonal cases', () => {
  const cases = [
    [['right'], { x: 75, y: 25 }, ['25,25,5', '75,25,5']],
    [['up'], { x: 25, y: 25 }, ['25,25,5', '25,75,5']],
    [['up', 'right'], { x: 75, y: 25 }, ['25,25,5', '25,75,5', '75,25,5', '75,75,5']],
    [['right'], { x: 50, y: 50 }, ['50,50,5']],
    [['up', 'right'], { x: 50, y: 50 }, ['50,50,5']],
    [['diagonal'], { x: 40, y: 60 }, ['40,60,5', '60,40,5']]
  ];
  for (const [folds, punch, expected] of cases) {
    const data = buildPaperData(folds, punch);
    assert.deepEqual(holeKey(data.finalUnfoldedHoles), expected);
    assert.deepEqual(data.steps.at(-1).hole, punch);
  }
  assert.throws(() => reflectHole({ x: 25, y: 25 }, 'unknown'), /Unsupported fold/);
});

test('6,000 seeded generated questions have distinct choices and correct quantities/reflections', () => {
  const originalRandom = Math.random;
  let state = 0x26c08;
  Math.random = () => ((state = (Math.imul(1664525, state) + 1013904223) >>> 0) / 0x100000000);
  try {
    const ids = new Set();
    for (const subtest of subtests.filter(id => !id.startsWith('picture') && id !== 'sentence_completion')) {
      for (let i = 0; i < 1000; i++) {
        const q = generateProceduralQuestion(subtest);
        assertQuestion(q);
        assert.equal(q.subtestId, subtest);
        assert.ok(!ids.has(q.id), `${q.id}: unique instance ID`);
        ids.add(q.id);
        if (q.batteryId === 'quantitative') assertQuantitativeAnswer(q);
        if (subtest === 'paper_folding') assertPaperAnswer(q);
        if (subtest.startsWith('figure_')) assertFigureAnswer(q);
      }
    }
    assert.equal(ids.size, 6000);
  } finally {
    Math.random = originalRandom;
  }
  assert.throws(() => generateProceduralQuestion('picture_analogies'), /No reviewed generator/);
  assert.throws(() => generateProceduralQuestion('number_series', '3'), /Grade 2 only/);
});


test('all curated stimuli are distinct, including reserved checks and original practice', () => {
  const seen = new Map();
  for (const q of QUESTIONS) {
    let stimulus = q.data;
    if (q.subtestId === 'paper_folding') stimulus = { folds: q.data.folds, punch: q.data.punch, cuts: q.data.cuts };
    if (q.subtestId === 'number_analogies') stimulus = { examples: q.data.examplePairs || [q.data.topPair], last: q.data.bottomStimulus };
    const key = q.subtestId + JSON.stringify(stimulus);
    assert.ok(!seen.has(key), `${q.id} repeats ${seen.get(key)}`);
    seen.set(key, q.id);
  }
});
