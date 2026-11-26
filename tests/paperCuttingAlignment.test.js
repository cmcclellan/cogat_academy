import test from 'node:test';
import assert from 'node:assert/strict';
import { PAPER_CUTTING_ALIGNMENT as questions, visibleCutKey } from '../src/data/paperCuttingAlignment.js';
import { PAPER, buildPaperCutData, clipCutToPaper, cutKey, polygonArea } from '../src/utils/paperGeometry.js';

const area = cuts => cuts.reduce((total, cut) => total + polygonArea(cut.points), 0);
const key = cuts => cuts.map(cutKey).sort();
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.0001, `${actual} != ${expected}`);

function independentReflection(cut, fold) {
  return { points: cut.points.map(([x, y]) => {
    if (fold === 'left' || fold === 'right') return [100 - x, y];
    if (fold === 'up' || fold === 'down') return [x, 100 - y];
    if (fold === 'diagonal') return [y, x];
    if (fold === 'anti_diagonal') return [100 - y, 100 - x];
    assert.fail(`Unknown fold ${fold}`);
  }) };
}

test('paper cutting adds balanced original cut and multiple-punch practice with reserved checks', () => {
  assert.equal(questions.length, 24);
  assert.equal(new Set(questions.map(q => q.id)).size, 24);
  assert.equal(questions.filter(q => q.purpose === 'practice').length, 18);
  assert.equal(questions.filter(q => q.purpose === 'check').length, 6);
  for (const set of ['foundations', 'developing', 'stretch']) assert.equal(questions.filter(q => q.testId === set).length, 6);
  for (const set of ['check_1', 'check_2', 'check_3']) assert.equal(questions.filter(q => q.testId === set).length, 2);
  const seen = new Set();
  for (const q of questions) {
    assert.equal(q.grade, '2');
    assert.equal(q.alignment, 'test_format');
    assert.equal(q.subtestId, 'paper_folding');
    assert.equal(q.audioScript, q.prompt);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map(o => visibleCutKey(o.cuts))).size, 4, q.id);
    assert.ok(q.options.every((o, i) => i === q.correctAnswer || o.misconception), q.id);
    assert.ok(q.options.every(o => JSON.stringify(o.creases) === JSON.stringify(q.data.creases)), q.id);
    const scene = JSON.stringify([q.data.folds, key(q.data.cuts)]);
    assert.ok(!seen.has(scene), `${q.id}: repeated cut stimulus`);
    seen.add(scene);
  }
  assert.ok(questions.filter(q => q.data.cuts.length > 1).length >= 5);
});

test('each removed polygon follows independent reverse reflections and preserves removed area', () => {
  for (const q of questions) {
    const { folds, cuts, steps, unfolding, finalUnfoldedCuts } = q.data;
    assert.equal(steps.at(-1).type, 'cut');
    assert.deepEqual(steps.at(-1).cuts, cuts);
    assert.equal(unfolding.length, folds.length + 1);
    let expected = cuts;
    let frame = 1;
    for (const fold of [...folds].reverse()) {
      expected = [...expected, ...expected.map(cut => independentReflection(cut, fold))];
      assert.deepEqual(key(unfolding[frame++].cuts), key(expected), q.id);
    }
    assert.deepEqual(key(finalUnfoldedCuts), key(expected), q.id);
    assert.deepEqual(key(q.options[q.correctAnswer].cuts), key(expected), q.id);
    near(area(finalUnfoldedCuts), area(cuts) * 2 ** folds.length);
    for (const cut of finalUnfoldedCuts) {
      assert.ok(polygonArea(cut.points) > 0, q.id);
      assert.ok(cut.points.every(([x, y]) => x >= 10 && x <= 90 && y >= 10 && y <= 90), q.id);
    }
    for (const cut of cuts) for (const [x, y] of cut.points) for (const fold of folds) {
      if (fold === 'right') assert.ok(x >= 50, q.id);
      if (fold === 'left') assert.ok(x <= 50, q.id);
      if (fold === 'up') assert.ok(y <= 50, q.id);
      if (fold === 'down') assert.ok(y >= 50, q.id);
      if (fold === 'diagonal') assert.ok(y >= x, q.id);
      if (fold === 'anti_diagonal') assert.ok(x + y <= 100.000001, q.id);
    }
  }
});

test('edge notches clip material at the outside boundary and crease cuts join consistently', () => {
  const notch = clipCutToPaper({ points: [[6, 64], [18, 70], [6, 76]] }, PAPER);
  assert.equal(cutKey(notch), cutKey({ points: [[10, 66], [18, 70], [10, 74]] }));
  near(polygonArea(notch.points), 32);
  const cut = buildPaperCutData(['right', 'up'], [{ points: [[50, 42], [58, 50], [50, 58], [42, 50]] }]);
  near(area(cut.finalUnfoldedCuts), 128);
  // No phantom piece remains outside the physical paper when an edge is cut.
  assert.equal(clipCutToPaper({ points: [[1, 1], [4, 1], [4, 4]] }, PAPER), null);
  assert.throws(() => buildPaperCutData(['right'], [{ points: [[10, 20], [20, 20], [15, 30]] }]), /nonempty piece/);
});
