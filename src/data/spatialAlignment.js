import { translateScene, reflectScene, swapScenePositions, sceneKey, sceneWithinFrame } from '../utils/spatial.js';

// Original scene-based items extend the spatial formats; they do not assert that
// every transformation appears on every official Level 8 form.
const E = (shape, x, y, size = 16, fill = 'outline', rotation = 0) => ({ shape, x, y, size, fill, rotation });
const S = (...elements) => ({ elements });

function metadata(kind, index, skillId, skillName) {
  const purpose = index < 9 ? 'practice' : 'check';
  const difficulty = index < 9 ? ['easy', 'medium', 'hard'][Math.floor(index / 3)] : ['easy', 'medium', 'hard'][index - 9];
  return { id: `g2_a_${kind === 'figure_matrices' ? 'sm' : 'sc'}${String(index + 1).padStart(2, '0')}`,
    grade: '2', batteryId: 'nonverbal', subtestId: kind, purpose, difficulty,
    testId: index < 9 ? { easy: 'foundations', medium: 'developing', hard: 'stretch' }[difficulty] : `check_${index - 8}`,
    alignment: 'test_format', alignmentReason: 'Original spatial reasoning in the published matrix or classification format.',
    skillId, skillName };
}
function choices(answer, wrong, index) {
  const result = [...wrong];
  const correctAnswer = index % 4;
  result.splice(correctAnswer, 0, { scene: answer });
  return { correctAnswer, options: result.map((o, i) => ({ ...o, id: String.fromCharCode(65 + i) })) };
}
function applyRule(scene, rule) {
  if (rule.type === 'translate') return translateScene(scene, rule.dx, rule.dy);
  if (rule.type === 'reflect') return reflectScene(scene, rule.axis);
  if (rule.type === 'swap') return swapScenePositions(scene);
  if (rule.type === 'move_solid') return { elements: scene.elements.map(e => e.fill === 'solid' ? { ...e, x: e.x + rule.dx, y: e.y + rule.dy } : { ...e }) };
  if (rule.type === 'cycle') return { elements: scene.elements.map((e, i) => ({ ...e,
    x: scene.elements[(i + 1) % scene.elements.length].x, y: scene.elements[(i + 1) % scene.elements.length].y })) };
  throw new Error(`Unsupported scene rule ${rule.type}`);
}
function matrix(index, skillId, skillName, rule, top, bottom, description) {
  const answer = applyRule(bottom, rule);
  const pool = [
    [bottom, 'This leaves the positions unchanged instead of applying the change shown above.'],
    [translateScene(bottom, 20, 0), 'This moves the whole group to the right. Check which figures move and how far they move in the example.'],
    [translateScene(bottom, 0, 20), 'This moves the whole group downward. Compare the direction and the figures that move in the example.'],
    [reflectScene(bottom, 'vertical'), 'This mirrors the group from side to side. Check whether that is the change in the example.'],
    [reflectScene(bottom, 'horizontal'), 'This mirrors the group from top to bottom. Compare the example before choosing a mirror direction.'],
    bottom.elements.length > 1
      ? [swapScenePositions(bottom), 'This exchanges only the first two figures. Check every figure in the example.']
      : [translateScene(bottom, -20, 0), 'This moves left by a different amount. Compare the direction and distance in the example.'],
    [{ elements: bottom.elements.map((e, i) => i === 0 ? { ...e, fill: e.fill === 'solid' ? 'outline' : 'solid' } : { ...e }) }, 'This changes a fill instead of making the required change of position.']
  ];
  const seen = new Set([sceneKey(answer)]);
  const wrong = pool.filter(([scene]) => {
    const key = sceneKey(scene);
    if (seen.has(key) || !sceneWithinFrame(scene)) return false;
    seen.add(key); return true;
  }).slice(0, 3).map(([scene, misconception]) => ({ scene, misconception }));
  if (wrong.length !== 3) throw new Error(`Not enough distinct scene choices: ${skillId}`);
  const prompt = 'Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?';
  return { ...metadata('figure_matrices', index, skillId, skillName), rendererType: 'spatial_matrix',
    prompt, audioScript: prompt, data: { topRow: { left: top, right: applyRule(top, rule) }, bottomRow: { left: bottom } },
    spatialRule: rule, ...choices(answer, wrong, index),
    explanation: { rule: skillName, description,
      whyOthersWrong: 'Check each figure separately. The answer must preserve its identity while matching the same movement or positional relationship.',
      parentTip: 'Track one figure with a finger, then check the other figures. Ask what moved and what stayed in place.' } };
}

const matrices = [
  matrix(0, 'position_right', 'Move the figure to the right', { type: 'translate', dx: 40, dy: 0 },
    S(E('circle', 25, 30)), S(E('triangle', 25, 65)),
    'The circle moves straight to the right without turning. The triangle must move the same distance to the right.'),
  matrix(1, 'position_down', 'Move the figure downward', { type: 'translate', dx: 0, dy: 35 },
    S(E('square', 30, 25, 16, 'solid')), S(E('circle', 70, 25)),
    'The filled square moves downward. The outline circle must move down by the same distance, keeping its shape and fill.'),
  matrix(2, 'two_figures_together', 'Move a group together', { type: 'translate', dx: 25, dy: 0 },
    S(E('circle', 20, 30, 12, 'solid'), E('square', 40, 65, 14)),
    S(E('triangle', 20, 25, 14), E('circle', 45, 65, 12, 'solid')),
    'Both figures move to the right by the same amount. Their spacing and identities stay the same.'),
  matrix(3, 'mirror_left_right', 'Reflect the whole arrangement left to right', { type: 'reflect', axis: 'vertical' },
    S(E('circle', 20, 25, 12, 'solid'), E('square', 60, 65, 16)),
    S(E('triangle', 25, 30, 14), E('circle', 65, 70, 12, 'solid')),
    'The figures mirror across the middle from left to right. Each stays at the same height, on the opposite side.'),
  matrix(4, 'mirror_top_bottom', 'Reflect the whole arrangement top to bottom', { type: 'reflect', axis: 'horizontal' },
    S(E('circle', 25, 20, 12), E('square', 65, 65, 14, 'solid')),
    S(E('square', 30, 25, 14), E('circle', 70, 60, 12, 'solid')),
    'Each figure mirrors across the horizontal middle. Left and right positions stay the same while top and bottom positions reverse.'),
  matrix(5, 'exchange_positions', 'Exchange the figures without changing them', { type: 'swap' },
    S(E('arrow', 25, 35, 20, 'solid'), E('square', 70, 65, 16)),
    S(E('triangle', 30, 25, 14, 'solid'), E('circle', 65, 70, 12)),
    'The two figures trade places. Each keeps its own shape, size, fill, and direction.'),
  matrix(6, 'move_selected_figure', 'Move only the solid figure', { type: 'move_solid', dx: 30, dy: 0 },
    S(E('circle', 20, 25, 12, 'solid'), E('square', 65, 70, 16)),
    S(E('square', 25, 30, 14, 'solid'), E('triangle', 60, 70, 16)),
    'Only the solid figure moves right. The outline figure stays exactly where it was.'),
  matrix(7, 'mirror_arrow_and_position', 'Mirror position and direction together', { type: 'reflect', axis: 'vertical' },
    S(E('arrow', 25, 30, 20, 'solid', 90), E('circle', 65, 65, 12)),
    S(E('arrow', 30, 65, 20, 'outline', 90), E('square', 65, 25, 14, 'solid')),
    'A side-to-side mirror reverses the arrow direction as well as its position. The other figure also moves to its mirror position.'),
  matrix(8, 'cycle_three_positions', 'Move three figures around their places', { type: 'cycle' },
    S(E('circle', 25, 30, 12), E('square', 70, 30, 14, 'solid'), E('triangle', 50, 70, 14)),
    S(E('triangle', 25, 25, 14, 'solid'), E('circle', 70, 30, 12), E('square', 50, 70, 14)),
    'Each figure moves into the next figure position: first into second, second into third, and third into first. Track all three.'),
  matrix(9, 'position_left_transfer', 'Move the figure to the left', { type: 'translate', dx: -35, dy: 0 },
    S(E('triangle', 70, 30, 16, 'solid')), S(E('square', 70, 65, 14)),
    'The top figure moves left without changing. Apply the same leftward move to the bottom square.'),
  matrix(10, 'diagonal_translation', 'Slide a group diagonally', { type: 'translate', dx: 20, dy: -25 },
    S(E('circle', 25, 65, 12), E('square', 60, 70, 14, 'solid')),
    S(E('triangle', 25, 60, 14), E('circle', 60, 65, 12, 'solid')),
    'Both figures slide right and upward together. They do not turn or exchange places.'),
  matrix(11, 'horizontal_arrow_reflection', 'Reflect an arrow arrangement top to bottom', { type: 'reflect', axis: 'horizontal' },
    S(E('arrow', 30, 25, 20, 'solid'), E('square', 70, 60, 14)),
    S(E('circle', 25, 65, 12), E('arrow', 65, 30, 20, 'outline', 180)),
    'The top-to-bottom mirror reverses each height and flips an up or down arrow. Left and right positions stay the same.')
];

function classification(index, skillId, skillName, examples, answer, wrong, description) {
  const prompt = 'Look at the three figures. Which choice belongs in the same group?';
  return { ...metadata('figure_classification', index, skillId, skillName), rendererType: 'spatial_classification',
    prompt, audioScript: prompt, data: { stimulusScenes: examples }, ...choices(answer,
      wrong.map(([scene, misconception]) => ({ scene, misconception })), index),
    explanation: { rule: skillName, description, whyOthersWrong: wrong.map(([, error]) => error).join(' '),
      parentTip: 'Describe where the figures are in relation to each other. Check the rule against every example and every part of the answer.' } };
}
const classifications = [
  classification(0, 'solid_left_of_outline', 'Solid figure to the left of an outline figure',
    [S(E('circle', 25, 40, 14, 'solid'), E('square', 70, 40)), S(E('triangle', 25, 65, 16, 'solid'), E('circle', 70, 65)), S(E('square', 25, 25, 14, 'solid'), E('triangle', 70, 25))],
    S(E('circle', 30, 55, 16, 'solid'), E('triangle', 75, 55)),
    [[S(E('circle', 70, 55, 16, 'solid'), E('triangle', 25, 55)), 'The solid figure is on the right instead of the left.'],
      [S(E('circle', 50, 25, 16, 'solid'), E('triangle', 50, 70)), 'This puts the figures above and below instead of left and right.'],
      [S(E('circle', 25, 55), E('triangle', 70, 55)), 'Both figures are outlines, so the solid figure is missing.']],
    'Each example has a solid figure on the left and an outline figure on the right.'),
  classification(1, 'small_above_large', 'A small figure above a larger figure',
    [S(E('circle', 50, 25, 10), E('circle', 50, 70, 26)), S(E('square', 50, 25, 10, 'solid'), E('square', 50, 70, 26, 'solid')), S(E('triangle', 50, 25, 10), E('triangle', 50, 70, 26))],
    S(E('square', 50, 25, 12, 'solid'), E('square', 50, 70, 28, 'solid')),
    [[S(E('square', 50, 25, 28), E('square', 50, 70, 12)), 'The larger figure is above the smaller one.'],
      [S(E('square', 25, 50, 12), E('square', 70, 50, 28)), 'The small figure is beside the large one instead of above it.'],
      [S(E('square', 50, 25, 18), E('square', 50, 70, 18)), 'The two figures are the same size.']],
    'A smaller figure is above a larger figure. Both the relative size and the above-below order matter.'),
  classification(2, 'figure_inside_outline', 'A small figure inside an outline',
    [S(E('circle', 50, 50, 64), E('square', 50, 50, 12, 'solid')), S(E('square', 50, 50, 64), E('triangle', 45, 50, 12, 'solid')), S(E('circle', 50, 50, 64), E('circle', 55, 50, 12, 'solid'))],
    S(E('square', 50, 50, 64), E('circle', 50, 55, 12, 'solid')),
    [[S(E('circle', 35, 50, 48), E('square', 80, 50, 12, 'solid')), 'The small figure is outside the outline.'],
      [S(E('square', 25, 50, 16), E('circle', 70, 50, 16, 'solid')), 'These separate figures do not show one inside the other.'],
      [S(E('circle', 50, 50, 64)), 'The small inner figure is missing.']],
    'Each example has one small solid figure entirely inside a larger outline. The inner figure need not be exactly centered.'),
  classification(3, 'solid_above_outline', 'Solid figure above an outline figure',
    [S(E('circle', 30, 25, 14, 'solid'), E('square', 30, 70)), S(E('triangle', 70, 25, 16, 'solid'), E('circle', 70, 70)), S(E('square', 50, 25, 14, 'solid'), E('triangle', 50, 70))],
    S(E('triangle', 40, 30, 16, 'solid'), E('square', 40, 75)),
    [[S(E('triangle', 40, 75, 16, 'solid'), E('square', 40, 30)), 'The solid figure is below the outline.'],
      [S(E('triangle', 25, 50, 16, 'solid'), E('square', 70, 50)), 'The solid figure is beside the outline rather than above it.'],
      [S(E('triangle', 40, 30), E('square', 40, 75)), 'The upper figure is not solid.']],
    'The solid figure is directly above the outline figure. Their actual shapes can vary.'),
  classification(4, 'matching_pair_around_middle', 'A different figure between a matching pair',
    [S(E('circle', 20, 50), E('triangle', 50, 50, 12, 'solid'), E('circle', 80, 50)), S(E('square', 20, 50), E('circle', 50, 50, 12, 'solid'), E('square', 80, 50)), S(E('triangle', 20, 50), E('square', 50, 50, 12, 'solid'), E('triangle', 80, 50))],
    S(E('square', 20, 50, 14), E('triangle', 50, 50, 12, 'solid'), E('square', 80, 50, 14)),
    [[S(E('square', 20, 50), E('square', 50, 50, 12, 'solid'), E('triangle', 80, 50)), 'The matching pair is not on the two outside positions.'],
      [S(E('square', 20, 50), E('triangle', 50, 50, 12), E('square', 80, 50)), 'The middle figure is an outline instead of solid.'],
      [S(E('square', 20, 50), E('triangle', 80, 50, 12, 'solid'), E('square', 50, 50)), 'The solid figure is at the end, not between the matching pair.']],
    'Two matching outline figures surround a different, solid figure in the middle.'),
  classification(5, 'same_height', 'Three figures on one horizontal row',
    [S(E('circle', 20, 30), E('square', 50, 30), E('triangle', 80, 30)), S(E('triangle', 20, 70, 16, 'solid'), E('circle', 50, 70), E('square', 80, 70)), S(E('square', 20, 50), E('triangle', 50, 50), E('circle', 80, 50, 16, 'solid'))],
    S(E('circle', 20, 60, 14, 'solid'), E('triangle', 50, 60), E('square', 80, 60)),
    [[S(E('circle', 20, 25), E('triangle', 50, 50), E('square', 80, 75)), 'These figures rise or fall along a diagonal instead of sharing one height.'],
      [S(E('circle', 50, 20), E('triangle', 50, 50), E('square', 50, 80)), 'This is a vertical column instead of a horizontal row.'],
      [S(E('circle', 20, 60), E('triangle', 50, 35), E('square', 80, 60)), 'The middle figure is above the other two.']],
    'All three figures have the same height in each example, making one horizontal row.'),
  classification(6, 'one_inside_one_outside', 'One solid figure inside and one outline figure outside',
    [S(E('square', 40, 50, 50), E('circle', 40, 50, 10, 'solid'), E('triangle', 82, 50, 12)), S(E('circle', 40, 50, 50), E('triangle', 40, 50, 10, 'solid'), E('square', 82, 50, 12)), S(E('square', 40, 50, 50), E('square', 35, 50, 10, 'solid'), E('circle', 82, 50, 12))],
    S(E('circle', 40, 50, 50), E('square', 40, 45, 10, 'solid'), E('triangle', 82, 50, 12)),
    [[S(E('circle', 40, 50, 50), E('square', 35, 50, 10, 'solid'), E('triangle', 48, 50, 10)), 'Both small figures are inside; one should be outside.'],
      [S(E('circle', 40, 50, 50), E('square', 82, 35, 10, 'solid'), E('triangle', 82, 65, 12)), 'Both small figures are outside; the solid figure should be inside.'],
      [S(E('circle', 40, 50, 50), E('square', 82, 50, 10, 'solid'), E('triangle', 40, 50, 12)), 'The solid figure is outside and the outline figure is inside, reversing their roles.']],
    'The larger outline contains one small solid figure. A second small outline figure stays outside it.'),
  classification(7, 'balanced_flanking_pair', 'Matching figures equally spaced around a center',
    [S(E('circle', 20, 50, 10, 'solid'), E('square', 50, 50, 14), E('circle', 80, 50, 10, 'solid')), S(E('circle', 50, 20, 10, 'solid'), E('square', 50, 50, 14), E('circle', 50, 80, 10, 'solid')), S(E('circle', 25, 25, 10, 'solid'), E('square', 50, 50, 14), E('circle', 75, 75, 10, 'solid'))],
    S(E('circle', 25, 75, 10, 'solid'), E('square', 50, 50, 14), E('circle', 75, 25, 10, 'solid')),
    [[S(E('circle', 25, 50, 10, 'solid'), E('square', 60, 50, 14), E('circle', 75, 50, 10, 'solid')), 'The square is not halfway between the circles.'],
      [S(E('circle', 25, 50, 10, 'solid'), E('square', 50, 50, 14), E('circle', 75, 50, 18, 'solid')), 'The two outer circles do not match in size.'],
      [S(E('circle', 25, 50, 10, 'solid'), E('square', 50, 50, 14), E('circle', 75, 50, 10)), 'One outer circle is an outline instead of matching the other solid circle.']],
    'The two solid circles match and sit equally far from the square on opposite sides. The whole arrangement can turn.'),
  classification(8, 'arrow_points_to_solid', 'An arrow points toward a solid circle',
    [S(E('arrow', 25, 50, 20, 'outline', 90), E('circle', 75, 50, 12, 'solid')), S(E('arrow', 50, 75, 20), E('circle', 50, 25, 12, 'solid')), S(E('arrow', 75, 50, 20, 'outline', 270), E('circle', 25, 50, 12, 'solid'))],
    S(E('arrow', 50, 25, 20, 'outline', 180), E('circle', 50, 75, 12, 'solid')),
    [[S(E('arrow', 50, 25, 20), E('circle', 50, 75, 12, 'solid')), 'The arrow points away from the circle.'],
      [S(E('arrow', 50, 25, 20, 'outline', 90), E('circle', 50, 75, 12, 'solid')), 'The arrow points sideways rather than toward the circle.'],
      [S(E('arrow', 50, 25, 20, 'outline', 180), E('circle', 50, 75, 12)), 'The arrow direction fits, but the circle is not solid.']],
    'The arrow points toward the solid circle, even when the whole arrangement faces a different direction.'),
  classification(9, 'solid_below_outline', 'Solid figure below an outline figure',
    [S(E('circle', 50, 70, 14, 'solid'), E('square', 50, 25)), S(E('square', 30, 70, 14, 'solid'), E('circle', 30, 25)), S(E('triangle', 70, 70, 16, 'solid'), E('square', 70, 25))],
    S(E('square', 40, 75, 14, 'solid'), E('triangle', 40, 30)),
    [[S(E('square', 40, 30, 14, 'solid'), E('triangle', 40, 75)), 'The solid figure is above instead of below.'],
      [S(E('square', 25, 50, 14, 'solid'), E('triangle', 70, 50)), 'The figures are beside one another rather than above and below.'],
      [S(E('square', 40, 75), E('triangle', 40, 30)), 'Both figures are outlines, so the solid lower figure is missing.']],
    'Each example has a solid figure below an outline figure, aligned in one column.'),
  classification(10, 'same_vertical_column', 'Three figures in one vertical column',
    [S(E('circle', 30, 20), E('square', 30, 50), E('triangle', 30, 80)), S(E('square', 70, 20), E('triangle', 70, 50, 16, 'solid'), E('circle', 70, 80)), S(E('triangle', 50, 20, 16, 'solid'), E('circle', 50, 50), E('square', 50, 80))],
    S(E('square', 60, 20), E('circle', 60, 50, 14, 'solid'), E('triangle', 60, 80)),
    [[S(E('square', 20, 50), E('circle', 50, 50, 14, 'solid'), E('triangle', 80, 50)), 'These figures make a horizontal row instead of a vertical column.'],
      [S(E('square', 25, 20), E('circle', 50, 50, 14, 'solid'), E('triangle', 75, 80)), 'These figures form a diagonal instead of sharing one left-right position.'],
      [S(E('square', 60, 20), E('circle', 35, 50, 14, 'solid'), E('triangle', 60, 80)), 'The middle figure is outside the column.']],
    'All three figures share the same left-right position, forming one vertical column.'),
  classification(11, 'solid_arrow_points_outline_square', 'An arrow points toward an outline square',
    [S(E('arrow', 25, 50, 20, 'solid', 90), E('square', 75, 50)), S(E('arrow', 50, 25, 20, 'solid', 180), E('square', 50, 75)), S(E('arrow', 75, 50, 20, 'solid', 270), E('square', 25, 50))],
    S(E('arrow', 50, 75, 20, 'solid'), E('square', 50, 25)),
    [[S(E('arrow', 50, 75, 20, 'solid', 180), E('square', 50, 25)), 'The arrow points away from the square.'],
      [S(E('arrow', 50, 75, 20, 'solid'), E('square', 50, 25, 16, 'solid')), 'The arrow direction fits, but the target square should be an outline.'],
      [S(E('arrow', 50, 75, 20), E('square', 50, 25)), 'The arrow is an outline instead of solid.']],
    'Each solid arrow points toward an outline square. Both direction and the filled-versus-outline roles matter.')
];

export const SPATIAL_ALIGNMENT = [...matrices, ...classifications];
