import test from 'node:test';
import assert from 'node:assert/strict';
import { VERBAL_EXPANSION } from '../src/data/verbalExpansion.js';

const subtests = ['picture_analogies', 'sentence_completion', 'picture_classification'];
const scene = q => JSON.stringify(q.rendererType === 'sentence_completion' ? q.data.sentence : q.data);

test('verbal expansion provides balanced practice and separate unfamiliar check scenes', () => {
  assert.equal(VERBAL_EXPANSION.length, 54);
  assert.equal(new Set(VERBAL_EXPANSION.map(q => q.id)).size, 54);
  const practiceScenes = new Set(VERBAL_EXPANSION.filter(q => q.purpose === 'practice').map(scene));
  for (const subtest of subtests) {
    const questions = VERBAL_EXPANSION.filter(q => q.subtestId === subtest);
    assert.equal(questions.length, 18);
    assert.equal(questions.filter(q => q.purpose === 'practice').length, 12);
    assert.equal(questions.filter(q => q.purpose === 'check').length, 6);
    assert.ok(new Set(questions.map(q => q.skillId)).size >= 10, `${subtest}: more than cosmetic variation`);
    for (const difficulty of ['easy', 'medium', 'hard']) {
      assert.equal(questions.filter(q => q.purpose === 'practice' && q.difficulty === difficulty).length, 4);
      assert.equal(questions.filter(q => q.purpose === 'check' && q.difficulty === difficulty).length, 2);
    }
    for (const testId of ['check_1', 'check_2', 'check_3']) {
      assert.equal(questions.filter(q => q.testId === testId).length, 2);
    }
    for (const q of questions.filter(q => q.purpose === 'check')) assert.ok(!practiceScenes.has(scene(q)), q.id);
  }
});

test('verbal audio preserves the task and distractor explanations name specific errors', () => {
  const illustrations = new Set(['leash', 'doghouse', 'tadpole', 'barn', 'freezer', 'oven', 'dam', 'harp', 'watering_can', 'paint_roller', 'tennis_racket']);
  for (const q of VERBAL_EXPANSION) {
    assert.equal(q.grade, '2');
    assert.equal(q.batteryId, 'verbal');
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map(o => o.illustration || o.emoji)).size, 4, q.id);
    assert.equal(new Set(q.options.map(o => o.label)).size, 4, q.id);
    assert.ok(q.options[q.correctAnswer]);
    assert.doesNotMatch(JSON.stringify(q), /\?\?|\uFFFD|Choice [A-D]\b/, q.id);
    for (const [i, option] of q.options.entries()) {
      if (i !== q.correctAnswer) {
        assert.ok(option.misconception?.length > 20, q.id);
        assert.ok(q.explanation.whyOthersWrong.includes(option.label), q.id);
      }
      if (option.illustration) assert.ok(illustrations.has(option.illustration), q.id);
      assert.equal(option.caption, undefined, q.id);
    }
    if (q.rendererType === 'sentence_completion') {
      assert.ok(q.data.sentence.includes('______'), q.id);
      assert.equal(q.audioScript, q.data.sentence.replace(/_+/g, 'blank') + ' Which picture completes the sentence?', q.id);
    } else assert.equal(q.audioScript, q.prompt, q.id);
  }
});

test('specific verbal distinctions preserve direction and narrow-category reasoning', () => {
  const bySkill = Object.fromEntries(VERBAL_EXPANSION.map(q => [q.skillId, q]));
  const answer = skill => { const q = bySkill[skill]; return q.options[q.correctAnswer].label; };
  assert.equal(answer('worker_workplace'), 'School');
  assert.equal(answer('trace_maker'), 'Dog');
  assert.equal(answer('container_contents'), 'Shirt');
  assert.equal(answer('constraint_power'), 'Flashlight');
  assert.equal(answer('medical_measurement'), 'Thermometer');
  assert.equal(answer('tree_fruits'), 'Lemon');
  assert.equal(answer('aquatic_mammals'), 'Otter');
  assert.equal(answer('egg_layers'), 'Duck');
  assert.equal(answer('light_sources'), 'Fire');
  assert.match(bySkill.light_sources.explanation.whyOthersWrong, /moon reflects sunlight/);
  assert.match(bySkill.tree_fruits.explanation.whyOthersWrong, /vines rather than trees/);
});
