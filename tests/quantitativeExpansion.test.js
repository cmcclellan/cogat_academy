import test from 'node:test';
import assert from 'node:assert/strict';
import { QUANTITATIVE_EXPANSION as questions } from '../src/data/quantitativeExpansion.js';

const analogyRules = {
  add_one: n => n + 1, subtract_one: n => n - 1, same_quantity: n => n,
  double_quantity: n => n * 2, add_three: n => n + 3, subtract_three: n => n - 3,
  half_quantity: n => n / 2, triple_quantity: n => n * 3,
  double_add_one: n => n * 2 + 1, double_subtract_one: n => n * 2 - 1,
  half_add_one: n => n / 2 + 1, complement_twelve: n => 12 - n,
  add_two: n => n + 2, complement_ten: n => 10 - n,
  double_add_two: n => n * 2 + 2, subtract_two: n => n - 2,
  half_subtract_one: n => n / 2 - 1
};
const numeric = q => q.options[q.correctAnswer].quantity;
const differences = values => values.slice(1).map((v, i) => v - values[i]);
const repeated = (values, changes) => differences(values).every((v, i) => v === changes[i % changes.length]);

function assertSeries(q) {
  const values = q.data.items.map(item => item === null ? null : item.count);
  if (q.data.missingIndex === undefined) values.push(numeric(q));
  else {
    assert.equal(values[q.data.missingIndex], null, q.id);
    assert.equal(values.filter(v => v === null).length, 1, q.id);
    values[q.data.missingIndex] = numeric(q);
  }
  const delta = differences(values);
  switch (q.skillId) {
    case 'series_add_one': assert.ok(repeated(values, [1]), q.id); break;
    case 'series_subtract_one': assert.ok(repeated(values, [-1]), q.id); break;
    case 'series_add_two': assert.ok(repeated(values, [2]), q.id); break;
    case 'series_repeat_pair': assert.ok(values.every((v, i) => v === [2, 5][i % 2]), q.id); break;
    case 'series_repeat_three': assert.ok(values.every((v, i) => v === [1, 3, 5][i % 3]), q.id); break;
    case 'series_missing_middle':
    case 'series_missing_first': assert.ok(delta.every(v => v === delta[0]), q.id); break;
    case 'series_doubling': assert.ok(values.slice(1).every((v, i) => v === 2 * values[i]), q.id); break;
    case 'series_alternating_changes': assert.ok(delta.every((v, i) => v === delta[i % 2]), q.id); break;
    case 'series_growing_jumps': assert.ok(delta.every((v, i) => v === i + 1), q.id); break;
    case 'series_growing_removals': assert.ok(delta.every((v, i) => v === -i - 1), q.id); break;
    case 'series_interleaved': assert.ok(values.slice(2).every((v, i) => v === values[i] + 2), q.id); break;
    case 'series_subtract_three': assert.ok(repeated(values, [-3]), q.id); break;
    case 'series_paired_groups': assert.ok(values.every((v, i) => v === 3 + 3 * Math.floor(i / 2)), q.id); break;
    case 'series_growing_even_jumps': assert.ok(delta.every((v, i) => v === 2 * (i + 1)), q.id); break;
    default: assert.fail(`No independent oracle for ${q.skillId}`);
  }
  return values;
}

test('quantitative expansion contains balanced progression and separate checks', () => {
  assert.equal(questions.length, 54);
  assert.equal(new Set(questions.map(q => q.id)).size, 54);
  for (const subtest of ['number_analogies', 'number_puzzles', 'number_series']) {
    const group = questions.filter(q => q.subtestId === subtest);
    assert.equal(group.length, 18);
    for (const difficulty of ['easy', 'medium', 'hard']) {
      assert.equal(group.filter(q => q.difficulty === difficulty && q.purpose === 'practice').length, 4);
      assert.equal(group.filter(q => q.difficulty === difficulty && q.purpose === 'check').length, 2);
    }
    for (const check of ['check_1', 'check_2', 'check_3']) {
      assert.equal(group.filter(q => q.testId === check).length, 2);
    }
    assert.ok(new Set(group.map(q => q.skillId)).size >= 8, subtest);
  }
});

test('all new quantity keys satisfy the shown relationships and choices are distinct', () => {
  const fingerprints = new Set();
  for (const q of questions) {
    assert.equal(q.grade, '2', q.id);
    assert.equal(q.batteryId, 'quantitative', q.id);
    assert.equal(q.audioScript, q.prompt, q.id);
    assert.equal(q.options.length, 4, q.id);
    assert.equal(new Set(q.options.map(o => o.quantity)).size, 4, q.id);
    assert.deepEqual(q.options.map(o => o.id), ['A', 'B', 'C', 'D'], q.id);
    q.options.forEach((option, i) => {
      assert.ok(Number.isInteger(option.quantity) && option.quantity > 0 && option.quantity <= 24, q.id);
      assert.equal(option.caption, undefined, q.id);
      if (i !== q.correctAnswer) assert.ok(option.misconception?.length > 15, q.id);
    });
    assert.ok(q.explanation.parentTip && q.explanation.whyOthersWrong, q.id);
    assert.doesNotMatch(q.explanation.description + q.explanation.whyOthersWrong, /Choice [A-D]\b/, q.id);
    const fingerprint = `${q.subtestId}:${JSON.stringify(q.data)}`;
    assert.ok(!fingerprints.has(fingerprint), `${q.id}: duplicate problem`);
    fingerprints.add(fingerprint);
    if (q.subtestId === 'number_analogies') {
      const rule = analogyRules[q.skillId];
      assert.ok(rule, q.id);
      assert.equal(q.data.examplePairs.length, 2, q.id);
      for (const pair of q.data.examplePairs) assert.equal(rule(pair.left), pair.right, q.id);
      assert.equal(rule(q.data.bottomStimulus.left), numeric(q), q.id);
      assert.ok(q.data.examplePairs.every(pair => pair.left !== q.data.bottomStimulus.left), `${q.id}: require transfer to a new amount`);
    } else if (q.subtestId === 'number_puzzles') {
      const all = [...q.data.topCars, ...q.data.bottomCars];
      assert.equal(all.filter(v => v === '?').length, 1, q.id);
      const sum = cars => cars.reduce((total, value) => total + (value === '?' ? numeric(q) : value), 0);
      assert.equal(sum(q.data.topCars), sum(q.data.bottomCars), q.id);
      assert.ok(sum(q.data.topCars) <= 20, q.id);
    } else assertSeries(q);
  }
});
