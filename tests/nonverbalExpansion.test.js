import test from 'node:test';
import assert from 'node:assert/strict';
import { NONVERBAL_EXPANSION } from '../src/data/nonverbalExpansion.js';
import { BASE_QUESTIONS as QUESTIONS } from '../src/data/cogatData.js';

function normalizedShape(s) {
  if (!s) return null;
  const symmetrical = { circle: 1, square: 90, diamond: 90, triangle: 120, pentagon: 72, hexagon: 60, star: 72 };
  const asymmetric = s.innerShape || s.lines || (s.dots || 0) > 1;
  const period = asymmetric ? 360 : symmetrical[s.shape] || 360;
  return { shape: s.shape, fill: s.fill || 'none', color: s.color || '#1e293b',
    size: s.size || 60, rotation: (((s.rotation || 0) % period) + period) % period,
    dots: s.fill === 'solid' ? 0 : s.dots || 0, lines: s.lines || 0,
    innerShape: normalizedShape(s.innerShape) };
}
function holesKey(holes) {
  return [...new Set(holes.map(h => `${h.x},${h.y},${h.r || 5}`))].sort().join(';');
}
function optionKey(o) { return o.shape ? JSON.stringify(normalizedShape(o.shape)) : holesKey(o.holes); }
const bySubtest = id => NONVERBAL_EXPANSION.filter(q => q.subtestId === id);
const indexOf = q => Number(q.id.slice(-2)) - 1;
const sideCount = { circle: 0, triangle: 3, square: 4, diamond: 4, trapezoid: 4, pentagon: 5, hexagon: 6 };
const classificationRules = [
  s => s.shape === 'circle',
  s => (s.fill || 'none') === 'none',
  s => s.dots === 3,
  s => s.shape === 'triangle',
  s => s.innerShape?.shape === 'circle' && s.innerShape.fill === 'solid',
  s => s.lines === 'horizontal',
  s => s.size === 30,
  s => s.dots === 2,
  s => sideCount[s.shape] === 4 && s.fill === 'striped',
  s => s.dots === 1 && s.fill === 'semi',
  s => !!s.innerShape && s.innerShape.shape !== s.shape,
  s => s.lines === 'vertical' && s.dots === 2,
  s => s.shape === 'pentagon',
  s => s.fill === 'solid',
  s => s.innerShape?.shape === 'triangle',
  s => s.size === 30 && s.fill === 'striped',
  s => s.dots === 4,
  s => sideCount[s.shape] === 4 && s.dots === 1
];

test('nonverbal expansion has a balanced progression and separate mixed-difficulty checks', () => {
  assert.equal(NONVERBAL_EXPANSION.length, 54);
  for (const id of ['figure_matrices', 'paper_folding', 'figure_classification']) {
    const items = bySubtest(id);
    assert.equal(items.length, 18);
    for (const [level, set] of [['easy', 'foundations'], ['medium', 'developing'], ['hard', 'stretch']]) {
      assert.equal(items.filter(q => q.purpose === 'practice' && q.difficulty === level && q.testId === set).length, 4);
      assert.equal(items.filter(q => q.purpose === 'check' && q.difficulty === level).length, 2);
    }
    for (const set of ['check_1', 'check_2', 'check_3']) {
      const check = items.filter(q => q.testId === set);
      assert.equal(check.length, 2);
      assert.equal(new Set(check.map(q => q.difficulty)).size, 2);
    }
    assert.ok(new Set(items.map(q => q.skillId)).size >= 12);
  }
  for (const q of NONVERBAL_EXPANSION) {
    assert.equal(q.grade, '2');
    assert.equal(q.audioScript, q.prompt, q.id);
    assert.equal(q.options.length, 4, q.id);
    assert.equal(new Set(q.options.map(optionKey)).size, 4, `${q.id}: visually distinct choices`);
    assert.ok(q.options.every((o, i) => i === q.correctAnswer || o.misconception), q.id);
    assert.doesNotMatch(JSON.stringify(q.explanation), /Choice [A-D]\b/, q.id);
  }
});

test('expanded figure matrices transfer all changes while preserving other features', () => {
  for (const q of bySubtest('figure_matrices')) {
    const { left: a, right: b } = q.data.topRow;
    const c = q.data.bottomRow.left;
    const expected = { ...c };
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (JSON.stringify(a[key]) === JSON.stringify(b[key])) continue;
      if (key === 'rotation' || key === 'dots') expected[key] = (c[key] || 0) + (b[key] || 0) - (a[key] || 0);
      else if (key === 'size') expected.size = (c.size || 60) * (b.size || 60) / (a.size || 60);
      else expected[key] = b[key];
    }
    assert.deepEqual(normalizedShape(q.options[q.correctAnswer].shape), normalizedShape(expected), q.id);
  }
});

test('expanded classification rules fit every example and exactly one answer', () => {
  for (const q of bySubtest('figure_classification')) {
    const rule = classificationRules[indexOf(q)];
    assert.ok(q.data.stimulusFigures.every(rule), `${q.id}: every example must fit`);
    const matching = q.options.flatMap((o, i) => rule(o.shape) ? [i] : []);
    assert.deepEqual(matching, [q.correctAnswer], q.id);
  }
});

test('expanded paper-fold answers follow independent reflections and physically possible punches', () => {
  for (const q of bySubtest('paper_folding')) {
    let holes = [q.data.punch];
    for (const fold of [...q.data.folds].reverse()) {
      const reflected = holes.map(h => {
        if (fold === 'left' || fold === 'right') return { ...h, x: 100 - h.x };
        if (fold === 'up' || fold === 'down') return { ...h, y: 100 - h.y };
        if (fold === 'diagonal') return { ...h, x: h.y, y: h.x };
        if (fold === 'anti_diagonal') return { ...h, x: 100 - h.y, y: 100 - h.x };
        throw new Error(fold);
      });
      holes = [...holes, ...reflected];
    }
    assert.equal(holesKey(q.options[q.correctAnswer].holes), holesKey(holes), q.id);
    assert.equal(holesKey(q.data.finalUnfoldedHoles), holesKey(holes), q.id);
    const { x, y } = q.data.punch;
    for (const fold of q.data.folds) {
      if (fold === 'left') assert.ok(x <= 50, q.id);
      if (fold === 'right') assert.ok(x >= 50, q.id);
      if (fold === 'up') assert.ok(y <= 50, q.id);
      if (fold === 'down') assert.ok(y >= 50, q.id);
      if (fold === 'diagonal') assert.ok(y >= x, q.id);
      if (fold === 'anti_diagonal') assert.ok(x + y <= 100, q.id);
    }
    for (const option of q.options) assert.deepEqual(option.creases, q.data.creases, q.id);
  }
});

test('new nonverbal stimuli do not duplicate the legacy or one another', () => {
  const old = QUESTIONS.filter(q => !q.id.startsWith('g2_x_') && q.batteryId === 'nonverbal');
  const seen = new Set();
  function stimulusKey(q) {
    if (q.subtestId === 'paper_folding') return JSON.stringify([q.subtestId, q.data.folds, q.data.punch]);
    if (q.subtestId === 'figure_matrices') return JSON.stringify([q.subtestId,
      normalizedShape(q.data.topRow.left), normalizedShape(q.data.topRow.right), normalizedShape(q.data.bottomRow.left)]);
    return JSON.stringify([q.subtestId, q.data.stimulusFigures.map(normalizedShape)]);
  }
  old.forEach(q => seen.add(stimulusKey(q)));
  for (const q of NONVERBAL_EXPANSION) {
    const key = stimulusKey(q);
    assert.ok(!seen.has(key), q.id);
    seen.add(key);
  }
});
