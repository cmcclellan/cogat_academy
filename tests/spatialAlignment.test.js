import test from 'node:test';
import assert from 'node:assert/strict';
import { SPATIAL_ALIGNMENT } from '../src/data/spatialAlignment.js';
import { reflectScene, translateScene, sceneKey } from '../src/utils/spatial.js';

const matrices = SPATIAL_ALIGNMENT.filter(q => q.rendererType === 'spatial_matrix');
const classifications = SPATIAL_ALIGNMENT.filter(q => q.rendererType === 'spatial_classification');
const angle = n => ((n % 360) + 360) % 360;
const matrixRules = {
  position_right: ['move', 40, 0], position_down: ['move', 0, 35], two_figures_together: ['move', 25, 0],
  mirror_left_right: ['mirror_x'], mirror_top_bottom: ['mirror_y'], exchange_positions: ['swap'],
  move_selected_figure: ['solid', 30, 0], mirror_arrow_and_position: ['mirror_x'], cycle_three_positions: ['cycle'],
  position_left_transfer: ['move', -35, 0], diagonal_translation: ['move', 20, -25], horizontal_arrow_reflection: ['mirror_y']
};
function independentlyTransform(scene, [kind, dx, dy]) {
  return { elements: scene.elements.map((e, i, all) => {
    if (kind === 'move') return { ...e, x: e.x + dx, y: e.y + dy };
    if (kind === 'solid') return e.fill === 'solid' ? { ...e, x: e.x + dx, y: e.y + dy } : { ...e };
    if (kind === 'swap' || kind === 'cycle') {
      const position = all[kind === 'swap' ? 1 - i : (i + 1) % all.length];
      return { ...e, x: position.x, y: position.y };
    }
    const vertical = kind === 'mirror_x';
    return { ...e, x: vertical ? 100 - e.x : e.x, y: vertical ? e.y : 100 - e.y,
      ...(['arrow', 'triangle'].includes(e.shape) ? { rotation: angle(vertical ? -(e.rotation || 0) : 180 - (e.rotation || 0)) } : {}) };
  }) };
}
function inside(outer, inner) {
  if (outer.shape === 'circle') return Math.hypot(inner.x - outer.x, inner.y - outer.y) + inner.size * Math.SQRT2 / 2 < outer.size / 2;
  return Math.abs(inner.x - outer.x) + inner.size / 2 < outer.size / 2
    && Math.abs(inner.y - outer.y) + inner.size / 2 < outer.size / 2;
}
function pointsAt(arrow, target) {
  const dx = target.x - arrow.x, dy = target.y - arrow.y;
  const r = (arrow.rotation || 0) * Math.PI / 180;
  const vx = Math.sin(r), vy = -Math.cos(r);
  return dx * vx + dy * vy > 0 && Math.abs(dx * vy - dy * vx) < 1e-8;
}
const predicates = {
  solid_left_of_outline: ([a, b]) => a.fill === 'solid' && b.fill === 'outline' && a.x < b.x && a.y === b.y,
  small_above_large: ([a, b]) => a.size < b.size && a.y < b.y && a.x === b.x,
  figure_inside_outline: ([a, b]) => !!b && a.fill === 'outline' && b.fill === 'solid' && inside(a, b),
  solid_above_outline: ([a, b]) => a.fill === 'solid' && b.fill === 'outline' && a.y < b.y && a.x === b.x,
  matching_pair_around_middle: ([a, b, c]) => a.shape === c.shape && a.shape !== b.shape && a.fill === 'outline'
    && c.fill === 'outline' && b.fill === 'solid' && a.x < b.x && b.x < c.x && a.y === b.y && b.y === c.y,
  same_height: elements => elements.every(e => e.y === elements[0].y),
  one_inside_one_outside: ([a, b, c]) => b.fill === 'solid' && c.fill === 'outline' && inside(a, b) && !inside(a, c),
  balanced_flanking_pair: ([a, b, c]) => a.shape === c.shape && a.size === c.size && a.fill === c.fill
    && b.x === (a.x + c.x) / 2 && b.y === (a.y + c.y) / 2,
  arrow_points_to_solid: ([a, b]) => a.shape === 'arrow' && b.shape === 'circle' && b.fill === 'solid' && pointsAt(a, b),
  solid_below_outline: ([a, b]) => a.fill === 'solid' && b.fill === 'outline' && a.y > b.y && a.x === b.x,
  same_vertical_column: elements => elements.every(e => e.x === elements[0].x),
  solid_arrow_points_outline_square: ([a, b]) => a.shape === 'arrow' && a.fill === 'solid' && b.shape === 'square'
    && b.fill === 'outline' && pointsAt(a, b)
};

test('spatial bank adds balanced original matrices and relational classifications', () => {
  assert.equal(SPATIAL_ALIGNMENT.length, 24);
  assert.equal(new Set(SPATIAL_ALIGNMENT.map(q => q.id)).size, 24);
  for (const subtest of ['figure_matrices', 'figure_classification']) {
    const qs = SPATIAL_ALIGNMENT.filter(q => q.subtestId === subtest);
    assert.equal(qs.length, 12);
    assert.equal(qs.filter(q => q.purpose === 'practice').length, 9);
    for (const id of ['foundations', 'developing', 'stretch']) assert.equal(qs.filter(q => q.testId === id).length, 3);
    for (const id of ['check_1', 'check_2', 'check_3']) assert.equal(qs.filter(q => q.testId === id).length, 1);
  }
  for (const q of SPATIAL_ALIGNMENT) {
    assert.equal(q.grade, '2'); assert.equal(q.batteryId, 'nonverbal'); assert.equal(q.alignment, 'test_format');
    assert.equal(q.prompt, q.audioScript); assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map(o => sceneKey(o.scene))).size, 4, q.id);
    assert.ok(q.options.every((o, i) => i === q.correctAnswer || o.misconception?.length > 20), q.id);
    assert.doesNotMatch(JSON.stringify(q.explanation), /Choice [A-D]\b/);
  }
});

test('all spatial matrix answers transfer the independently specified geometric rule', () => {
  for (const q of matrices) {
    const rule = matrixRules[q.skillId];
    assert.ok(rule, q.id);
    assert.equal(sceneKey(q.data.topRow.right), sceneKey(independentlyTransform(q.data.topRow.left, rule)), q.id);
    const expected = sceneKey(independentlyTransform(q.data.bottomRow.left, rule));
    assert.deepEqual(q.options.flatMap((o, i) => sceneKey(o.scene) === expected ? [i] : []), [q.correctAnswer], q.id);
  }
});

test('each relational group rule fits all three examples and exactly one choice', () => {
  for (const q of classifications) {
    const rule = predicates[q.skillId];
    assert.ok(rule, q.id);
    assert.ok(q.data.stimulusScenes.every(scene => rule(scene.elements)), q.id);
    assert.deepEqual(q.options.flatMap((o, i) => rule(o.scene.elements) ? [i] : []), [q.correctAnswer], q.id);
  }
});

test('spatial scenes stay inside their frames and no complete stimulus is repeated', () => {
  const stimuli = new Set();
  for (const q of SPATIAL_ALIGNMENT) {
    const examples = q.rendererType === 'spatial_matrix' ? [q.data.topRow.left, q.data.topRow.right, q.data.bottomRow.left] : q.data.stimulusScenes;
    const signature = q.rendererType + examples.map(sceneKey).join('::');
    assert.ok(!stimuli.has(signature), q.id); stimuli.add(signature);
    for (const scene of [...examples, ...q.options.map(o => o.scene)]) {
      for (const e of scene.elements) {
        assert.ok(e.size > 0 && e.size <= 64, q.id);
        assert.ok(e.x - e.size / 2 >= 5 && e.x + e.size / 2 <= 95, q.id);
        assert.ok(e.y - e.size / 2 >= 5 && e.y + e.size / 2 <= 95, q.id);
      }
    }
  }
});

test('spatial transforms preserve the input and reverse mirrors including arrow direction', () => {
  const original = { elements: [{ shape: 'arrow', x: 25, y: 30, size: 20, fill: 'solid', rotation: 90 }] };
  const before = JSON.stringify(original);
  const mirrored = reflectScene(original, 'vertical');
  assert.equal(mirrored.elements[0].x, 75);
  assert.equal(mirrored.elements[0].rotation, 270);
  assert.equal(sceneKey(reflectScene(mirrored, 'vertical')), sceneKey(original));
  assert.equal(translateScene(original, 20, -10).elements[0].y, 20);
  assert.equal(JSON.stringify(original), before);
  assert.throws(() => reflectScene(original, 'diagonal'), /Unsupported reflection/);
});


test('exchange example distinguishes a positional swap from a half turn', () => {
  const q = matrices.find(item => item.skillId === 'exchange_positions');
  const before = q.data.topRow.left.elements.find(e => e.shape === 'arrow');
  const after = q.data.topRow.right.elements.find(e => e.shape === 'arrow');
  assert.ok(before && after, 'an asymmetric reference is needed to preserve direction visibly');
  assert.equal(after.rotation, before.rotation);
  assert.notEqual(after.x, before.x);
  assert.notEqual(after.y, before.y);
});
