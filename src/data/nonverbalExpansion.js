import { buildPaperData } from '../utils/paperGeometry.js';

// Authored items, not random instances. Each check uses different figures or fold
// configurations from the accompanying practice items.
const difficultyByIndex = [
  'easy', 'easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium',
  'hard', 'hard', 'hard', 'hard', 'easy', 'medium', 'medium', 'hard', 'easy', 'hard'
];
function metadata(subtestId, shortId, index, skillId, skillName) {
  const difficulty = difficultyByIndex[index];
  const purpose = index < 12 ? 'practice' : 'check';
  const testId = purpose === 'practice'
    ? { easy: 'foundations', medium: 'developing', hard: 'stretch' }[difficulty]
    : `check_${Math.floor((index - 12) / 2) + 1}`;
  return { id: `g2_x_${shortId}${String(index + 1).padStart(2, '0')}`, grade: '2',
    batteryId: 'nonverbal', subtestId, purpose, testId, difficulty, skillId, skillName };
}
const shape = (name, features = {}) => ({ shape: name, fill: 'none', color: '#1e293b', ...features });
const inner = (name, fill = 'none') => shape(name, { fill });
const choice = (figure, misconception) => ({ shape: figure, ...(misconception ? { misconception } : {}) });
function choices(correct, wrong, index) {
  const result = [...wrong];
  const correctAnswer = index % 4;
  result.splice(correctAnswer, 0, correct);
  return { options: result.map((option, i) => ({ ...option, id: String.fromCharCode(65 + i) })), correctAnswer };
}
function matrix(index, skillId, skillName, a, b, c, answer, wrong, description) {
  const prompt = 'Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?';
  return { ...metadata('figure_matrices', 'fm', index, skillId, skillName), rendererType: 'figure_matrix',
    prompt, audioScript: prompt, data: { topRow: { left: a, right: b }, bottomRow: { left: c } },
    ...choices(choice(answer), wrong.map(([figure, error]) => choice(figure, error)), index),
    explanation: { rule: skillName, description,
      whyOthersWrong: wrong.map(([, error]) => error).join(' '),
      parentTip: 'Describe the change in the top row before looking at the choices. Then check that the same change, and only that change, happens below.' } };
}

const matrices = [
  matrix(0, 'remove_fill', 'Remove the fill',
    shape('square', { fill: 'solid' }), shape('square'), shape('triangle', { fill: 'solid' }), shape('triangle'),
    [[shape('triangle', { fill: 'solid' }), 'Keeping the solid fill misses the change.'],
      [shape('square'), 'Copying the top shape changes the bottom shape.'],
      [shape('triangle', { fill: 'striped' }), 'Adding stripes is different from removing the fill.']],
    'The solid square becomes an outline square. The solid triangle must become an outline triangle.'),
  matrix(1, 'remove_dot', 'Remove one dot',
    shape('circle', { dots: 2 }), shape('circle', { dots: 1 }), shape('square', { dots: 3 }), shape('square', { dots: 2 }),
    [[shape('square', { dots: 3 }), 'Keeping three dots makes no change.'],
      [shape('square', { dots: 1 }), 'Copying the top answer removes two dots from the bottom.'],
      [shape('square', { dots: 4 }), 'Adding a dot changes the count in the opposite direction.']],
    'One dot is removed in the top row. Removing one of the three bottom dots leaves two dots.'),
  matrix(2, 'enlarge', 'Make the figure larger',
    shape('triangle', { size: 30 }), shape('triangle', { size: 60 }), shape('square', { size: 30 }), shape('square', { size: 60 }),
    [[shape('square', { size: 30 }), 'Keeping the small size misses the enlargement.'],
      [shape('triangle', { size: 60 }), 'Copying the top figure changes the bottom shape.'],
      [shape('square', { size: 60, fill: 'solid' }), 'Filling the larger figure adds an extra change.']],
    'The triangle grows while its shape and fill stay the same. The square must also grow.'),
  matrix(3, 'turn_counterclockwise', 'Turn one quarter counterclockwise',
    shape('arrow_up'), shape('arrow_up', { rotation: 270 }), shape('arrow_up', { rotation: 90 }), shape('arrow_up'),
    [[shape('arrow_up', { rotation: 180 }), 'Turning clockwise sends the bottom arrow the wrong way.'],
      [shape('arrow_up', { rotation: 90 }), 'Keeping the arrow in place misses the turn.'],
      [shape('arrow_up', { rotation: 270 }), 'Copying the top answer ignores the bottom starting direction.']],
    'The up arrow turns one quarter counterclockwise to point left. Starting from right, the same turn points up.'),
  matrix(4, 'replace_inner', 'Replace the inner shape',
    shape('square', { innerShape: inner('circle') }), shape('square', { innerShape: inner('triangle') }),
    shape('diamond', { innerShape: inner('circle') }), shape('diamond', { innerShape: inner('triangle') }),
    [[shape('diamond', { innerShape: inner('circle') }), 'Keeping the inner circle misses the replacement.'],
      [shape('triangle', { innerShape: inner('circle') }), 'Changing the outside instead of the inside changes the wrong feature.'],
      [shape('diamond'), 'Removing the inner figure does not replace it with a triangle.']],
    'The outside square stays the same while the inner circle becomes a triangle. Keep the bottom diamond and replace its inner circle with a triangle.'),
  matrix(5, 'remove_line', 'Remove the line inside',
    shape('square', { lines: 'vertical' }), shape('square'), shape('circle', { lines: 'vertical' }), shape('circle'),
    [[shape('circle', { lines: 'vertical' }), 'Keeping the line makes no change.'],
      [shape('circle', { lines: 'horizontal' }), 'Turning the line is different from removing it.'],
      [shape('square'), 'Copying the top square changes the outside shape.']],
    'The line disappears from the square. The line must also disappear from the circle.'),
  matrix(6, 'half_turn', 'Turn halfway around',
    shape('arrow_up'), shape('arrow_up', { rotation: 180 }), shape('arrow_up', { rotation: 90 }), shape('arrow_up', { rotation: 270 }),
    [[shape('arrow_up', { rotation: 90 }), 'Keeping the direction misses the half turn.'],
      [shape('arrow_up', { rotation: 180 }), 'A quarter turn is shorter than the half turn shown.'],
      [shape('arrow_up'), 'Turning the other quarter also stops too soon.']],
    'The upward arrow makes a half turn to point down. A right-pointing arrow making the same half turn points left.'),
  matrix(7, 'add_stripes', 'Add stripes',
    shape('circle'), shape('circle', { fill: 'striped' }), shape('hexagon'), shape('hexagon', { fill: 'striped' }),
    [[shape('hexagon'), 'Leaving the inside blank misses the stripes.'],
      [shape('hexagon', { fill: 'solid' }), 'A solid fill is not a striped fill.'],
      [shape('circle', { fill: 'striped' }), 'Copying the circle changes the bottom shape.']],
    'The circle gains stripes. Keep the hexagon shape and give it stripes too.'),
  matrix(8, 'shrink_and_stripe', 'Shrink and add stripes',
    shape('circle', { size: 60 }), shape('circle', { size: 30, fill: 'striped' }),
    shape('square', { size: 60 }), shape('square', { size: 30, fill: 'striped' }),
    [[shape('square', { size: 30 }), 'Shrinking alone misses the new stripes.'],
      [shape('square', { size: 60, fill: 'striped' }), 'Adding stripes alone misses the smaller size.'],
      [shape('circle', { size: 30, fill: 'striped' }), 'Copying the top answer changes the outside shape.']],
    'Two features change: the figure becomes smaller and gains stripes. The square needs both changes.'),
  matrix(9, 'turn_and_add_dot', 'Turn and add one dot',
    shape('arrow_up', { dots: 1 }), shape('arrow_up', { rotation: 90, dots: 2 }),
    shape('arrow_up', { rotation: 180, dots: 2 }), shape('arrow_up', { rotation: 270, dots: 3 }),
    [[shape('arrow_up', { rotation: 270, dots: 2 }), 'Turning without adding a dot misses one change.'],
      [shape('arrow_up', { rotation: 180, dots: 3 }), 'Adding a dot without turning misses one change.'],
      [shape('arrow_up', { rotation: 90, dots: 3 }), 'The direction must turn from the bottom arrow, not copy the top direction.']],
    'The arrow turns one quarter clockwise and gains one dot. A down arrow with two dots becomes a left arrow with three dots.'),
  matrix(10, 'remove_inner_and_shade', 'Remove the inner figure and shade the outside',
    shape('square', { innerShape: inner('circle') }), shape('square', { fill: 'semi' }),
    shape('triangle', { innerShape: inner('circle') }), shape('triangle', { fill: 'semi' }),
    [[shape('triangle'), 'Removing the inner figure alone misses the shading.'],
      [shape('triangle', { fill: 'semi', innerShape: inner('circle') }), 'Adding shading alone leaves an inner figure that should disappear.'],
      [shape('square', { fill: 'semi' }), 'Copying the outside square changes the bottom shape.']],
    'The inner circle disappears and the outside figure becomes lightly shaded. Apply both changes to the triangle.'),
  matrix(11, 'shrink_and_add_dot', 'Shrink and add one dot',
    shape('triangle', { size: 60, dots: 2 }), shape('triangle', { size: 40, dots: 3 }),
    shape('square', { size: 60, dots: 1 }), shape('square', { size: 40, dots: 2 }),
    [[shape('square', { size: 40, dots: 1 }), 'Shrinking alone keeps too few dots.'],
      [shape('square', { size: 60, dots: 2 }), 'Adding a dot alone keeps the large size.'],
      [shape('square', { size: 40, dots: 3 }), 'Copying the top dot count adds too many dots.']],
    'The triangle shrinks and gains one dot. The square must shrink by the same amount and change from one dot to two.'),
  matrix(12, 'light_shading', 'Add light shading',
    shape('pentagon'), shape('pentagon', { fill: 'semi' }), shape('star'), shape('star', { fill: 'semi' }),
    [[shape('star'), 'An empty star misses the shading.'],
      [shape('star', { fill: 'solid' }), 'Solid black is darker than the light shading shown.'],
      [shape('pentagon', { fill: 'semi' }), 'Copying the pentagon changes the bottom shape.']],
    'The pentagon gains light shading. The star must keep its shape and gain the same light shading.'),
  matrix(13, 'complete_cross', 'Add the missing crossing line',
    shape('circle', { lines: 'horizontal' }), shape('circle', { lines: 'cross' }),
    shape('square', { lines: 'horizontal' }), shape('square', { lines: 'cross' }),
    [[shape('square', { lines: 'horizontal' }), 'Keeping one horizontal line misses the added vertical line.'],
      [shape('square', { lines: 'vertical' }), 'Replacing the old line is different from keeping it and adding another.'],
      [shape('circle', { lines: 'cross' }), 'Copying the top answer changes the bottom outside shape.']],
    'A vertical line is added while the horizontal line stays. The bottom square needs both crossing lines.'),
  matrix(14, 'enlarge_preserve_fill', 'Enlarge while preserving the fill',
    shape('pentagon', { size: 30, fill: 'striped' }), shape('pentagon', { size: 60, fill: 'striped' }),
    shape('star', { size: 30, fill: 'striped' }), shape('star', { size: 60, fill: 'striped' }),
    [[shape('star', { size: 30, fill: 'striped' }), 'Keeping the small star misses the enlargement.'],
      [shape('star', { size: 60 }), 'Removing the stripes adds a change not shown above.'],
      [shape('pentagon', { size: 60, fill: 'striped' }), 'Copying the pentagon changes the bottom shape.']],
    'The striped pentagon grows but stays striped. The striped star must also grow and keep its stripes.'),
  matrix(15, 'shrink_and_unfill', 'Shrink and remove the fill',
    shape('square', { size: 60, fill: 'solid' }), shape('square', { size: 30 }),
    shape('circle', { size: 60, fill: 'solid' }), shape('circle', { size: 30 }),
    [[shape('circle', { size: 30, fill: 'solid' }), 'Shrinking alone leaves the solid fill.'],
      [shape('circle', { size: 60 }), 'Removing the fill alone leaves the large size.'],
      [shape('square', { size: 30 }), 'Copying the top answer changes the bottom shape.']],
    'The square becomes smaller and loses its solid fill. The circle must become a smaller outline circle.'),
  matrix(16, 'add_two_dots', 'Add two dots',
    shape('triangle', { dots: 1 }), shape('triangle', { dots: 3 }), shape('pentagon', { dots: 2 }), shape('pentagon', { dots: 4 }),
    [[shape('pentagon', { dots: 3 }), 'Adding only one dot is too small a change.'],
      [shape('pentagon', { dots: 2 }), 'Keeping the old dots misses the change.'],
      [shape('triangle', { dots: 4 }), 'Changing the outside figure is not part of the rule.']],
    'The top figure gains two dots. Starting with two bottom dots, adding two gives four dots.'),
  matrix(17, 'turn_and_remove_line', 'Turn and remove the line',
    shape('arrow_up', { lines: 'vertical' }), shape('arrow_up', { rotation: 90 }),
    shape('arrow_up', { rotation: 270, lines: 'vertical' }), shape('arrow_up'),
    [[shape('arrow_up', { lines: 'vertical' }), 'Turning alone leaves a line that should disappear.'],
      [shape('arrow_up', { rotation: 270 }), 'Removing the line alone misses the turn.'],
      [shape('arrow_up', { rotation: 180 }), 'Turning the opposite way points down instead of up.']],
    'The arrow turns one quarter clockwise and its inner line disappears. From left, that turn points up, with no inner line.')
];

function classification(index, skillId, skillName, figures, answer, wrong, description) {
  const prompt = 'Look at the three figures. Which choice belongs in the same group?';
  return { ...metadata('figure_classification', 'fc', index, skillId, skillName), rendererType: 'figure_classification',
    prompt, audioScript: prompt, data: { stimulusFigures: figures },
    ...choices(choice(answer), wrong.map(([figure, error]) => choice(figure, error)), index),
    explanation: { rule: skillName, description, whyOthersWrong: wrong.map(([, error]) => error).join(' '),
      parentTip: 'Try a rule that fits every example. For a rule with two parts, check both parts before choosing.' } };
}
const classifications = [
  classification(0, 'same_curved_shape', 'Circles in different styles',
    [shape('circle'), shape('circle', { fill: 'semi', size: 40 }), shape('circle', { fill: 'striped', size: 70 })], shape('circle', { fill: 'solid', size: 50 }),
    [[shape('square'), 'A square has corners.'], [shape('triangle'), 'A triangle has straight sides and corners.'], [shape('hexagon'), 'A hexagon also has corners.']],
    'All three examples are circles. Their size and fill can change while their circular shape stays the same.'),
  classification(1, 'outline_only', 'Outline figures without shading',
    [shape('square'), shape('triangle'), shape('circle')], shape('pentagon'),
    [[shape('pentagon', { fill: 'semi' }), 'Light shading still fills the inside.'], [shape('pentagon', { fill: 'solid' }), 'Solid fill does not match the empty insides.'], [shape('pentagon', { fill: 'striped' }), 'Stripes add marks inside the figure.']],
    'Each example has an empty inside and an outline. The outline pentagon shares that feature.'),
  classification(2, 'three_dots', 'Exactly three dots',
    [shape('circle', { dots: 3 }), shape('diamond', { dots: 3 }), shape('square', { dots: 3 })], shape('star', { dots: 3 }),
    [[shape('star', { dots: 2 }), 'Two dots are too few.'], [shape('star', { dots: 4 }), 'Four dots are too many.'], [shape('star'), 'No dots does not match the shared count.']],
    'The examples have different outside shapes, but each has exactly three dots.'),
  classification(3, 'triangles_any_direction', 'Triangles in any direction',
    [shape('triangle'), shape('triangle', { rotation: 90, fill: 'semi' }), shape('triangle', { rotation: 180, fill: 'striped' })], shape('triangle', { rotation: 270 }),
    [[shape('diamond'), 'A diamond has four sides, not three.'], [shape('pentagon'), 'A pentagon has five sides.'], [shape('circle'), 'A circle has no straight sides.']],
    'Turning a triangle or changing its fill does not change its three straight sides.'),
  classification(4, 'solid_inner_circle', 'A solid circle inside',
    ['square', 'triangle', 'diamond'].map(name => shape(name, { innerShape: inner('circle', 'solid') })), shape('hexagon', { innerShape: inner('circle', 'solid') }),
    [[shape('hexagon'), 'An empty hexagon has no inner circle.'], [shape('hexagon', { innerShape: inner('triangle', 'solid') }), 'An inner triangle is a different shape.'], [shape('hexagon', { innerShape: inner('circle') }), 'An outline inner circle misses the solid fill.']],
    'Every example contains a smaller solid circle. Both the circle shape and its solid fill must match.'),
  classification(5, 'horizontal_line', 'One horizontal line',
    ['circle', 'square', 'pentagon'].map(name => shape(name, { lines: 'horizontal' })), shape('triangle', { lines: 'horizontal' }),
    [[shape('triangle', { lines: 'vertical' }), 'A vertical line goes in the wrong direction.'], [shape('triangle', { lines: 'cross' }), 'Crossing lines add an extra line.'], [shape('triangle'), 'An empty inside misses the line.']],
    'Each example contains one horizontal line across it. The outside shape can vary.'),
  classification(6, 'small_size', 'The same small size',
    ['circle', 'square', 'triangle'].map(name => shape(name, { size: 30 })), shape('pentagon', { size: 30 }),
    [[shape('pentagon', { size: 60 }), 'This figure is much larger.'], [shape('pentagon', { size: 75 }), 'The largest figure does not match the small examples.'], [shape('pentagon', { size: 45 }), 'This intermediate size is still larger than the examples.']],
    'The examples have different shapes but share the same small size. Choose the similarly small pentagon.'),
  classification(7, 'two_dots_ignore_size', 'Two dots despite size changes',
    [shape('circle', { dots: 2, size: 40 }), shape('square', { dots: 2, size: 65 }), shape('triangle', { dots: 2, size: 70 })], shape('star', { dots: 2, size: 65 }),
    [[shape('star', { dots: 1, size: 65 }), 'Matching size does not make one dot into two.'], [shape('star', { dots: 3, size: 65 }), 'Three dots break the shared count.'], [shape('star', { dots: 4, size: 65 }), 'Four dots also break the shared count.']],
    'All three figures contain two dots even though their sizes differ. Count the dots instead of matching size.'),
  classification(8, 'four_sides_and_stripes', 'Four sides and stripes',
    ['square', 'diamond', 'trapezoid'].map(name => shape(name, { fill: 'striped' })), shape('square', { rotation: 45, fill: 'striped' }),
    [[shape('triangle', { fill: 'striped' }), 'Stripes fit, but three sides do not.'], [shape('square', { fill: 'solid' }), 'Four sides fit, but solid fill does not.'], [shape('circle'), 'The circle has neither straight sides nor stripes.']],
    'Every example has four straight sides and a striped inside. The matching choice must satisfy both parts.'),
  classification(9, 'one_dot_and_light_fill', 'One dot and light shading',
    ['circle', 'square', 'triangle'].map(name => shape(name, { dots: 1, fill: 'semi' })), shape('diamond', { dots: 1, fill: 'semi' }),
    [[shape('diamond', { dots: 2, fill: 'semi' }), 'The shading fits, but two dots do not.'], [shape('diamond', { dots: 1 }), 'One dot fits, but the light shading is missing.'], [shape('diamond', { fill: 'solid' }), 'Solid fill does not match the lightly shaded one-dot figures.']],
    'Each example is lightly shaded and contains one dot. Keep both features when choosing.'),
  classification(10, 'different_inner_outer', 'Different inner and outer shapes',
    [shape('circle', { innerShape: inner('triangle') }), shape('pentagon', { innerShape: inner('square') }), shape('square', { innerShape: inner('hexagon') })], shape('hexagon', { innerShape: inner('circle') }),
    [[shape('circle', { innerShape: inner('circle') }), 'Two circles have matching inner and outer shapes.'], [shape('triangle', { innerShape: inner('triangle') }), 'Two triangles also match instead of differing.'], [shape('square'), 'A single square has no inner figure to compare.']],
    'Each example has a smaller figure inside, and the inner figure is a different kind of shape from the outside figure.'),
  classification(11, 'vertical_line_and_two_dots', 'A vertical line and two dots',
    ['circle', 'square', 'pentagon'].map(name => shape(name, { lines: 'vertical', dots: 2 })), shape('triangle', { lines: 'vertical', dots: 2 }),
    [[shape('triangle', { lines: 'horizontal', dots: 2 }), 'Two dots fit, but the line points in the wrong direction.'], [shape('triangle', { lines: 'vertical', dots: 1 }), 'The line fits, but the dot count does not.'], [shape('triangle', { lines: 'vertical' }), 'The line fits, but both dots are missing.']],
    'All three examples contain one vertical line and exactly two dots. Both features must be present.'),
  classification(12, 'five_sides', 'Five straight sides',
    [shape('pentagon'), shape('pentagon', { fill: 'semi', rotation: 72 }), shape('pentagon', { fill: 'striped', rotation: 144 })], shape('pentagon', { rotation: 20 }),
    [[shape('hexagon'), 'Six sides are too many.'], [shape('triangle'), 'Three sides are too few.'], [shape('circle'), 'A circle has no straight sides.']],
    'All the examples have five straight sides. Their fill and direction can vary.'),
  classification(13, 'solid_fill', 'Solid fill across different shapes',
    ['star', 'hexagon', 'triangle'].map(name => shape(name, { fill: 'solid' })), shape('diamond', { fill: 'solid' }),
    [[shape('diamond', { fill: 'semi' }), 'Light shading is not solid black.'], [shape('diamond', { fill: 'striped' }), 'Striped fill leaves gaps.'], [shape('diamond'), 'An outline leaves the inside empty.']],
    'The outside figures differ, but every example has a solid black inside.'),
  classification(14, 'inner_triangle', 'A triangle inside each figure',
    ['square', 'circle', 'hexagon'].map(name => shape(name, { innerShape: inner('triangle') })), shape('diamond', { innerShape: inner('triangle') }),
    [[shape('diamond', { innerShape: inner('circle') }), 'The inner circle is a different shape.'], [shape('diamond', { innerShape: inner('square') }), 'The inner square is a different shape.'], [shape('diamond'), 'The inner triangle is missing.']],
    'Every example contains a smaller triangle. The outside figure is allowed to change.'),
  classification(15, 'small_and_striped', 'Small size and striped fill',
    ['pentagon', 'diamond', 'circle'].map(name => shape(name, { size: 30, fill: 'striped' })), shape('star', { size: 30, fill: 'striped' }),
    [[shape('star', { size: 60, fill: 'striped' }), 'Stripes fit, but the figure is too large.'], [shape('star', { size: 30, fill: 'solid' }), 'The small size fits, but the solid fill does not.'], [shape('star', { size: 60 }), 'Both the size and the fill differ.']],
    'All three examples are small and striped. The matching choice must keep both size and fill.'),
  classification(16, 'four_dots', 'Exactly four dots',
    ['hexagon', 'circle', 'diamond'].map(name => shape(name, { dots: 4 })), shape('square', { dots: 4 }),
    [[shape('square', { dots: 3 }), 'Three dots are too few.'], [shape('square', { dots: 2 }), 'Two dots are too few.'], [shape('square', { dots: 1 }), 'One dot is too few.']],
    'The examples have four dots each. Their outside shapes do not have to match.'),
  classification(17, 'four_sides_and_one_dot', 'Four sides and one dot',
    [shape('square', { dots: 1 }), shape('diamond', { dots: 1 }), shape('square', { rotation: 20, dots: 1 })], shape('trapezoid', { dots: 1 }),
    [[shape('triangle', { dots: 1 }), 'One dot fits, but three sides do not.'], [shape('square', { dots: 2 }), 'Four sides fit, but two dots do not.'], [shape('pentagon'), 'Five sides and no dots miss both parts.']],
    'Every example has four straight sides and one dot. A different four-sided outline can still belong if it has one dot.')
];

const foldSpecs = [
  [['left'], { x: 25, y: 70, r: 5 }, 'single_vertical', 'A vertical fold toward the left'],
  [['down'], { x: 65, y: 75, r: 5 }, 'single_horizontal', 'A horizontal fold toward the bottom'],
  [['right'], { x: 65, y: 40, r: 5 }, 'interior_vertical', 'Reflect a hole near the middle of a folded half'],
  [['up'], { x: 70, y: 35, r: 5 }, 'interior_horizontal', 'Reflect a hole across a horizontal crease'],
  [['left'], { x: 50, y: 30, r: 5 }, 'vertical_crease', 'A hole centered on a vertical crease'],
  [['down'], { x: 30, y: 50, r: 5 }, 'horizontal_crease', 'A hole centered on a horizontal crease'],
  [['diagonal'], { x: 25, y: 65, r: 5 }, 'diagonal_reflection', 'Reflection across one diagonal'],
  [['anti_diagonal'], { x: 25, y: 35, r: 5 }, 'other_diagonal_reflection', 'Reflection across the other diagonal'],
  [['left', 'down'], { x: 30, y: 70, r: 5 }, 'two_creases', 'Undo two folds in reverse order'],
  [['right', 'down'], { x: 70, y: 65, r: 5 }, 'two_creases_offset', 'Two creases with an off-center punch'],
  [['up', 'left'], { x: 50, y: 30, r: 5 }, 'one_crease_join', 'Two folds with the punch on one crease'],
  [['down', 'right'], { x: 70, y: 50, r: 5 }, 'other_crease_join', 'A crease punch after two folds'],
  [['left'], { x: 30, y: 45, r: 5 }, 'single_vertical_transfer', 'Transfer a vertical reflection'],
  [['anti_diagonal'], { x: 35, y: 45, r: 5 }, 'diagonal_offset_transfer', 'Transfer a diagonal reflection'],
  [['diagonal'], { x: 35, y: 35, r: 5 }, 'diagonal_crease_join', 'A punch centered on a diagonal crease'],
  [['right', 'down'], { x: 50, y: 50, r: 5 }, 'crease_intersection', 'A punch at the meeting of two creases'],
  [['down'], { x: 35, y: 65, r: 5 }, 'single_horizontal_transfer', 'Transfer a horizontal reflection'],
  [['left', 'up'], { x: 25, y: 35, r: 5 }, 'two_creases_transfer', 'Transfer a two-fold reflection']
];
const holeKey = holes => [...new Set(holes.map(h => `${h.x},${h.y},${h.r || 5}`))].sort().join(';');
function folding(index, [folds, punch, skillId, skillName]) {
  const data = buildPaperData(folds, punch);
  const expected = data.finalUnfoldedHoles;
  const distractorPool = [
    { holes: [punch], misconception: 'Leaving only the punched mark ignores copies made when the paper opens.' },
    { holes: [punch, { ...punch, x: punch.x, y: 100 - punch.y }], misconception: 'Mirroring only from top to bottom uses the wrong crease or misses another fold.' },
    { holes: [{ x: 30, y: 30, r: 5 }, { x: 70, y: 30, r: 5 }, { x: 30, y: 70, r: 5 }, { x: 70, y: 70, r: 5 }], misconception: 'Assuming four separate holes ignores the actual punch position and whether holes join on a crease.' },
    { holes: [{ x: 50, y: 50, r: 5 }], misconception: 'Moving the hole to the center changes its distance from the creases.' },
    { holes: expected.map(h => ({ ...h, x: h.x + 8 })), misconception: 'Shifting the holes sideways changes their positions relative to the fold.' },
    { holes: [{ x: 25, y: 50, r: 5 }, { x: 75, y: 50, r: 5 }], misconception: 'A side-to-side pair on the middle row does not follow this punch and fold sequence.' }
  ];
  const used = new Set([holeKey(expected)]);
  const wrong = distractorPool.filter(option => {
    const key = holeKey(option.holes);
    if (used.has(key)) return false;
    used.add(key); return true;
  }).slice(0, 3);
  const prompt = 'Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?';
  return { ...metadata('paper_folding', 'pf', index, skillId, skillName), rendererType: 'paper_folding',
    prompt, audioScript: prompt, data,
    ...choices({ holes: expected, creases: data.creases }, wrong.map(o => ({ ...o, creases: data.creases })), index),
    explanation: { rule: skillName,
      description: `Undo the folds in reverse order, keeping each hole the same distance from its crease. The opened paper has ${expected.length} distinct circular hole${expected.length === 1 ? '' : 's'}. A punch centered exactly on a crease can join its reflected copy into one hole.`,
      whyOthersWrong: 'Trace the punch through every unfolding. Check both the number of distinct holes and their positions; a matching count alone is not enough.',
      parentTip: 'Use a real paper fold after the child predicts the answer. Point to the crease and compare each hole with its mirror partner.' } };
}

export const NONVERBAL_EXPANSION = [...matrices, ...foldSpecs.map((spec, index) => folding(index, spec)), ...classifications];
