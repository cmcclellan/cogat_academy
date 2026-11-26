import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, PRACTICE_TESTS, ASSESSMENT_TESTS, SESSION_SETS, PRACTICE_QUESTIONS, CHECK_QUESTIONS, ENRICHMENT_QUESTIONS } from '../src/data/cogatData.js';
import { arrangeAnswers, buildSession, generatePracticeBatch, summarizeSession } from '../src/utils/session.js';

function withoutId(option) {
  const { id, ...value } = option;
  return value;
}

test('answer arrangement balances all four positions and preserves keys and bank content', () => {
  const before = JSON.stringify(QUESTIONS);
  for (const offset of [0, 1, 2, 3]) {
    const session = arrangeAnswers(QUESTIONS, offset);
    const counts = [0, 0, 0, 0];
    session.forEach((q, index) => {
      counts[q.correctAnswer]++;
      assert.deepEqual(withoutId(q.options[q.correctAnswer]), withoutId(QUESTIONS[index].options[QUESTIONS[index].correctAnswer]));
      assert.deepEqual(q.options.map(o => o.id), ['A', 'B', 'C', 'D']);
      assert.notEqual(q.options, QUESTIONS[index].options);
    });
    assert.ok(Math.max(...counts) - Math.min(...counts) <= 1);
  }
  assert.equal(JSON.stringify(QUESTIONS), before);
});

test('curated assessment filters honor the selected battery and never pad with generated questions', () => {
  for (const { id: testId, questionIds } of PRACTICE_TESTS) {
    for (const batteryId of ['all', 'verbal', 'quantitative', 'nonverbal']) {
      const session = buildSession({ testId, batteryId, mode: 'assessment' });
      const expectedCount = QUESTIONS.filter(q => questionIds.includes(q.id) && (batteryId === 'all' || q.batteryId === batteryId)).length;
      assert.equal(session.length, expectedCount, `${testId}/${batteryId}`);
      assert.ok(session.every(q => q.grade === '2'));
      assert.ok(session.every(q => questionIds.includes(q.id)));
      assert.ok(session.every(q => batteryId === 'all' || q.batteryId === batteryId));
      assert.ok(session.every(q => QUESTIONS.some(source => source.id === q.id)));
    }
  }
  assert.deepEqual(buildSession({ testId: 'unsupported', batteryId: 'all' }), []);
});

test('generated practice is constrained and cannot become an unlimited assessment', () => {
  assert.throws(() => buildSession({ testId: 'infinite', mode: 'assessment' }), /finite curated set/);
  assert.deepEqual(generatePracticeBatch('verbal', 12), []);
  assert.deepEqual(buildSession({ testId: 'infinite', batteryId: 'verbal', mode: 'practice' }), []);
  for (const batteryId of ['quantitative', 'nonverbal']) {
    const batch = generatePracticeBatch(batteryId, 12);
    assert.equal(batch.length, 12);
    assert.ok(batch.every(q => q.batteryId === batteryId && q.grade === '2'));
    assert.equal(new Set(batch.map(q => q.subtestId)).size, 3);
  }
  const mixed = generatePracticeBatch('all', 12);
  assert.equal(new Set(mixed.map(q => q.subtestId)).size, 6);
  assert.ok(mixed.every(q => q.batteryId !== 'verbal'));
});

test('results distinguish incorrect and unanswered and ignore answers outside this session', () => {
  const questions = buildSession({ testId: 'test_1', batteryId: 'quantitative' });
  const [first, second] = questions;
  const answers = {
    [first.id]: first.correctAnswer,
    [second.id]: (second.correctAnswer + 1) % 4,
    foreign_question: 0
  };
  const summary = summarizeSession(questions, answers);
  assert.equal(summary.total, 9);
  assert.equal(summary.answered, 2);
  assert.equal(summary.correct, 1);
  assert.deepEqual(summary.batteries, { quantitative: { total: 9, answered: 2, correct: 1 } });
  assert.deepEqual(summarizeSession([], answers), { total: 0, answered: 0, correct: 0, batteries: {} });
  for (const invalid of [-1, 4, null, undefined, '0', NaN]) {
    const result = summarizeSession(questions, { [first.id]: invalid });
    assert.equal(result.answered, 0);
    assert.equal(result.correct, 0);
  }
});


test('reserved independent checks stay out of every routine practice collection', () => {
  const practiceIds = new Set();
  for (const { id: testId } of PRACTICE_TESTS) {
    const session = buildSession({ testId, mode: 'practice' });
    assert.ok(session.length > 0, testId);
    assert.ok(session.every(q => q.purpose === 'practice'), testId);
    session.forEach(q => practiceIds.add(q.id));
  }
  assert.equal(practiceIds.size, PRACTICE_QUESTIONS.length);
  const seen = new Set();
  for (const testId of ['check_1', 'check_2', 'check_3']) {
    assert.throws(() => buildSession({ testId, mode: 'practice' }), /assessment mode/);
    for (const batteryId of ['all', 'verbal', 'quantitative', 'nonverbal']) {
      const session = buildSession({ testId, batteryId, mode: 'assessment' });
      assert.equal(session.length, CHECK_QUESTIONS.filter(q => q.testId === testId && (batteryId === 'all' || q.batteryId === batteryId)).length);
      assert.ok(session.every(q => q.purpose === 'check' && !practiceIds.has(q.id)));
      if (batteryId === 'all') for (const q of session) { assert.ok(!seen.has(q.id)); seen.add(q.id); }
    }
  }
  assert.equal(seen.size, CHECK_QUESTIONS.length);
});

test('six practice tests partition the whole format bank with all nine subtests in each', () => {
  assert.equal(PRACTICE_TESTS.length, 6);
  const seen = new Set();
  const source = JSON.stringify(QUESTIONS);
  for (const form of PRACTICE_TESTS) {
    assert.equal(form.count, 33);
    const session = buildSession({ testId: form.id });
    assert.equal(session.length, 33);
    assert.equal(new Set(session.map(q => q.subtestId)).size, 9);
    assert.deepEqual(session.map(q => q.id), form.questionIds);
    assert.equal(session.filter(q => q.batteryId === 'verbal').length, 9);
    assert.equal(session.filter(q => q.batteryId === 'quantitative').length, 9);
    assert.equal(session.filter(q => q.batteryId === 'nonverbal').length, 15);
    for (const q of session) {
      assert.equal(q.purpose, 'practice');
      assert.equal(q.alignment, 'test_format');
      assert.ok(!seen.has(q.id), `${q.id} occurs in multiple practice tests`);
      seen.add(q.id);
    }
  }
  assert.deepEqual([...seen].sort(), PRACTICE_QUESTIONS.map(q => q.id).sort());
  assert.equal(JSON.stringify(QUESTIONS), source);
  assert.equal(ASSESSMENT_TESTS.length, 3);
  for (const oldId of ['all_bank', 'foundations', 'developing', 'stretch']) assert.deepEqual(buildSession({ testId: oldId }), []);
});

test('enrichment cannot enter any format practice or assessment session', () => {
  const enrichment = buildSession({ testId: 'enrichment', mode: 'practice' });
  assert.equal(enrichment.length, ENRICHMENT_QUESTIONS.length);
  assert.ok(enrichment.every(q => q.alignment === 'enrichment' && q.purpose === 'practice'));
  assert.throws(() => buildSession({ testId: 'enrichment', mode: 'assessment' }), /excluded from assessments/);
  for (const set of SESSION_SETS.filter(s => ['practice', 'check'].includes(s.purpose))) {
    for (const mode of set.purpose === 'check' ? ['assessment'] : ['practice', 'assessment']) {
      const session = buildSession({ testId: set.id, mode });
      assert.equal(session.length, set.count);
      assert.ok(session.every(q => q.alignment === 'test_format'), set.id);
      for (const q of session) {
        if (q.subtestId === 'number_puzzles') assert.equal(q.rendererType, 'equation_puzzle', q.id);
        if (q.subtestId === 'number_analogies') assert.ok(!q.data.examplePairs || q.data.examplePairs.length === 1, q.id);
        if (q.subtestId === 'number_series') assert.equal(q.data.missingIndex, undefined, q.id);
      }
    }
  }
  assert.ok(generatePracticeBatch('all', 12).every(q => q.alignment === 'enrichment'));
});
