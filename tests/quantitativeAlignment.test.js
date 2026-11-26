import test from 'node:test';
import assert from 'node:assert/strict';
import { QUANTITATIVE_EXPANSION } from '../src/data/quantitativeExpansion.js';
import { alignQuantitativeQuestions } from '../src/data/quantitativeAlignment.js';

const legacyTrains = Array.from({ length: 6 }, (_, index) => ({
  id: `legacy_train_${index}`, grade: '2', batteryId: 'quantitative', subtestId: 'number_puzzles',
  rendererType: 'balance_puzzle', testId: `test_${Math.floor(index / 2) + 1}`, purpose: 'practice',
  difficulty: index % 2 ? 'medium' : 'easy', data: { type: 'object_trains', topCars: [4, 3], bottomCars: [5, '?'] }
}));
const source = [...legacyTrains, ...QUANTITATIVE_EXPANSION];
const aligned = alignQuantitativeQuestions(source);
const replacements = aligned.filter(q => q.replacesId);

const evaluateSide = (tokens, answer) => {
  const values = tokens.map(token => token === '?' ? answer : token);
  assert.ok(values.length === 1 || values.length === 3);
  if (values.length === 1) return values[0];
  assert.ok(values[1] === '+' || values[1] === '-');
  return values[1] === '+' ? values[0] + values[2] : values[0] - values[2];
};

test('quantitative alignment preserves source data and replaces every enrichment-format slot', () => {
  const before = JSON.stringify(source);
  const result = alignQuantitativeQuestions(source);
  assert.equal(JSON.stringify(source), before);
  assert.equal(replacements.length, 46);
  assert.equal(result.length, source.length + 46);
  assert.equal(new Set(result.map(q => q.id)).size, result.length);
  for (const q of source) {
    const original = result.find(item => item.id === q.id);
    assert.ok(original);
    if (original.alignment === 'enrichment') {
      assert.equal(original.purpose, 'practice');
      assert.equal(original.testId, 'enrichment');
      assert.ok(original.alignmentReason);
      const replacement = result.find(item => item.replacesId === q.id);
      assert.ok(replacement, q.id);
      assert.equal(replacement.alignment, 'test_format');
      assert.equal(replacement.testId, q.testId, q.id);
      assert.equal(replacement.purpose, q.purpose, q.id);
      assert.equal(replacement.difficulty, q.difficulty, q.id);
      assert.equal(replacement.subtestId, q.subtestId, q.id);
    }
  }
  assert.ok(result.filter(q => q.purpose === 'check').every(q => q.alignment === 'test_format'));
  assert.deepEqual(alignQuantitativeQuestions(result), result, 'reapplying alignment must not duplicate replacements');
});

test('all 24 Level 8 equation items have exactly one valid missing-number answer', () => {
  const questions = replacements.filter(q => q.rendererType === 'equation_puzzle');
  assert.equal(questions.length, 24);
  const stimuli = new Set();
  const missingKinds = new Set();
  for (const q of questions) {
    const { left, right } = q.data;
    assert.equal([...left, ...right].filter(t => t === '?').length, 1, q.id);
    assert.ok([...left, ...right].filter(t => typeof t === 'number').every(n => Number.isInteger(n) && n >= 0 && n <= 20));
    const key = JSON.stringify(q.data);
    assert.ok(!stimuli.has(key), q.id); stimuli.add(key);
    const matching = q.options.flatMap((option, i) =>
      evaluateSide(left, Number(option.text)) === evaluateSide(right, Number(option.text)) ? [i] : []);
    assert.deepEqual(matching, [q.correctAnswer], q.id);
    assert.equal(new Set(q.options.map(o => o.text)).size, 4, q.id);
    assert.ok(q.options.every(o => o.quantity === undefined && Number(o.text) > 0 && Number(o.text) <= 20));
    assert.match(q.audioScript, /blank/);
    assert.doesNotMatch(q.audioScript, /equals \d+.*therefore|the answer/i);
    for (const side of [left, right]) if (side.includes('?')) missingKinds.add(`${side.length}:${side.indexOf('?')}`);
    assert.ok(q.explanation.description && q.explanation.parentTip);
    assert.doesNotMatch(q.explanation.whyOthersWrong, /Choice [A-D]/);
  }
  assert.ok(missingKinds.has('1:0'), 'unknown result');
  assert.ok(missingKinds.has('3:0'), 'unknown first operand');
  assert.ok(missingKinds.has('3:2'), 'unknown second operand');
  assert.ok(questions.some(q => q.data.left.length === 3 && q.data.right.length === 3));
});

test('replacement quantity analogies use a single example and exclude competing simple answers', () => {
  const questions = replacements.filter(q => q.subtestId === 'number_analogies');
  assert.equal(questions.length, 18);
  for (const q of questions) {
    assert.equal(q.data.examplePairs, undefined);
    const { left: a, right: b } = q.data.topPair;
    const c = q.data.bottomStimulus.left;
    assert.notEqual(a, c, q.id);
    const candidates = new Set([c + b - a, c * b / a]);
    const matching = q.options.flatMap((option, i) => candidates.has(option.quantity) ? [i] : []);
    assert.deepEqual(matching, [q.correctAnswer], q.id);
    assert.equal(new Set(q.options.map(o => o.quantity)).size, 4);
    assert.equal(q.audioScript, q.prompt);
  }
});

test('gap-series replacements ask for the next group while leaving gap originals as enrichment', () => {
  const questions = replacements.filter(q => q.subtestId === 'number_series');
  assert.equal(questions.length, 4);
  for (const q of questions) {
    assert.equal(q.data.missingIndex, undefined);
    assert.ok(q.data.items.every(item => Number.isInteger(item.count)));
    const counts = q.data.items.map(item => item.count);
    const step = counts[1] - counts[0];
    assert.ok(counts.slice(1).every((n, i) => n - counts[i] === step));
    assert.equal(q.options[q.correctAnswer].quantity, counts.at(-1) + step);
    assert.equal(new Set(q.options.map(o => o.quantity)).size, 4);
    assert.match(q.prompt, /comes next/);
  }
});
