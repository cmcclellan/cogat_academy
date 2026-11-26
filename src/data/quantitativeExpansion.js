/** Original Grade 2 items. Fixed authoring specs keep practice and check contexts separate. */
const CONFIG = [
  ['easy', 'foundations'], ['easy', 'foundations'], ['easy', 'foundations'], ['easy', 'foundations'],
  ['medium', 'developing'], ['medium', 'developing'], ['medium', 'developing'], ['medium', 'developing'],
  ['hard', 'stretch'], ['hard', 'stretch'], ['hard', 'stretch'], ['hard', 'stretch'],
  ['easy', 'check_1'], ['medium', 'check_1'], ['medium', 'check_2'], ['hard', 'check_2'],
  ['easy', 'check_3'], ['hard', 'check_3']
];
const PROMPTS = {
  number_analogy: 'Look at the complete pairs of quantities. Which choice completes the last pair using the same rule?',
  balance_puzzle: 'Which choice makes the two trains carry the same total number of objects?',
  number_series: 'Look at the groups of beads. Which group belongs in the question-mark position?'
};
const numericOptions = (answer, wrong) => [
  { quantity: answer, text: String(answer), label: String(answer), misconception: null },
  ...wrong.map(([quantity, misconception]) => ({ quantity, text: String(quantity), label: String(quantity), misconception }))
].map((o, i) => ({ ...o, id: String.fromCharCode(65 + i) }));

function makeQuestion(kind, index, spec) {
  const [difficulty, testId] = CONFIG[index];
  const [skillId, skillName, data, answer, wrong, description, parentTip] = spec;
  const subtestId = { number_analogy: 'number_analogies', balance_puzzle: 'number_puzzles', number_series: 'number_series' }[kind];
  const prefix = { number_analogy: 'na', balance_puzzle: 'np', number_series: 'ns' }[kind];
  return {
    id: `g2_x_${prefix}${String(index + 1).padStart(2, '0')}`, grade: '2', batteryId: 'quantitative', subtestId,
    rendererType: kind, difficulty, testId, purpose: index < 12 ? 'practice' : 'check', skillId, skillName,
    prompt: PROMPTS[kind], audioScript: PROMPTS[kind], data,
    correctAnswer: 0, options: numericOptions(answer, wrong),
    explanation: { rule: skillName, description, whyOthersWrong: wrong.map(([n, why]) => `${n} objects: ${why}`).join(' '), parentTip }
  };
}
const pairs = (examples, last) => ({ topPair: { left: examples[0][0], right: examples[0][1] },
  examplePairs: examples.map(([left, right]) => ({ left, right })), bottomStimulus: { left: last } });
const trains = (topCars, bottomCars) => ({ type: 'object_trains', topCars, bottomCars });
const beads = (counts, missingIndex) => ({ seriesType: 'beads', items: counts.map(count => count === null ? null : ({ count, color: '#0284c7' })),
  ...(missingIndex === undefined ? {} : { missingIndex }) });

const ANALOGIES = [
  ['add_one', 'One more', pairs([[2,3],[5,6]],7),8, [[7,'This leaves the amount unchanged.'],[9,'This adds two instead of one.'],[6,'This removes one instead of adding one.']],
    'Both complete pairs gain one object: 2 becomes 3 and 5 becomes 6. The last pair must gain one too: 7 becomes 8.', 'Ask how much was added in each complete pair.'],
  ['subtract_one', 'One fewer', pairs([[5,4],[8,7]],6),5, [[6,'This leaves the amount unchanged.'],[4,'This removes two instead of one.'],[7,'This adds one instead of removing one.']],
    'Each complete pair loses one object. Taking one away from 6 leaves 5.', 'Check whether each pair grows or shrinks.'],
  ['same_quantity', 'Keep the quantity', pairs([[3,3],[7,7]],5),5, [[4,'This removes an object although the examples keep their quantities.'],[6,'This adds an object although the examples keep their quantities.'],[10,'This doubles the amount rather than keeping it.']],
    'Neither complete pair changes its quantity. A group of 5 must stay a group of 5.', 'A rule can keep something the same. Ask what changed in the examples.'],
  ['double_quantity', 'Two equal groups', pairs([[2,4],[4,8]],3),6, [[5,'This adds the first example difference without checking the second pair.'],[7,'This adds four to the last amount instead of doubling it.'],[3,'This leaves the quantity unchanged.']],
    'Each complete pair doubles: 2 and another 2 make 4; 4 and another 4 make 8. Two groups of 3 make 6.', 'Make two equal groups with counters rather than relying on a multiplication fact.'],
  ['add_three', 'Three more', pairs([[3,6],[5,8]],7),10, [[9,'This adds two rather than three.'],[11,'This adds four rather than three.'],[4,'This subtracts three instead of adding it.']],
    'Each complete pair gains 3 objects. Adding 3 to 7 gives 10.', 'Have the child verify the same change in both examples.'],
  ['subtract_three', 'Three fewer', pairs([[8,5],[6,3]],10),7, [[8,'This removes only two objects.'],[6,'This removes four rather than three.'],[13,'This adds three instead of removing it.']],
    'Both complete pairs lose 3 objects. Removing 3 from 10 leaves 7.', 'Keep the direction of the change the same.'],
  ['half_quantity', 'One of two equal groups', pairs([[4,2],[8,4]],12),6, [[8,'This subtracts four, which does not fit both examples.'],[10,'This subtracts two, which only fits the first example.'],[7,'This is one more than half of twelve.']],
    'The right side is half of the left side. Split 12 into two equal groups: each group has 6.', 'Use counters to share the quantity equally between two groups.'],
  ['triple_quantity', 'Three equal groups', pairs([[2,6],[3,9]],5),15, [[10,'This makes two equal groups instead of three.'],[9,'This adds four from the first example without checking the second.'],[14,'This is one short of three groups of five.']],
    'The complete pairs make three equal groups: three groups of 2 make 6 and three groups of 3 make 9. Three groups of 5 make 15.', 'Build three equal groups and count the total.'],
  ['double_add_one', 'Double, then one more', pairs([[2,5],[4,9]],6),13, [[12,'This doubles but forgets the extra object.'],[7,'This adds one but does not double.'],[9,'This adds the first difference instead of using both examples.']],
    'Double the left quantity, then add 1. Twice 2 plus 1 is 5; twice 4 plus 1 is 9. Twice 6 plus 1 is 13.', 'Do one step at a time and check both examples.'],
  ['double_subtract_one', 'Double, then one fewer', pairs([[3,5],[5,9]],7),13, [[14,'This doubles but forgets to remove one.'],[12,'This removes two after doubling instead of one.'],[9,'This adds two, which fits only the first example.']],
    'Double, then remove 1: 3 becomes 6 then 5; 5 becomes 10 then 9. Seven becomes 14 then 13.', 'Ask the child to explain both steps using counters.'],
  ['half_add_one', 'Half, then one more', pairs([[4,3],[8,5]],12),7, [[6,'This halves but forgets the extra object.'],[9,'This removes three instead of sharing into equal groups.'],[13,'This adds one but does not halve first.']],
    'Take half, then add 1: half of 4 plus 1 is 3; half of 8 plus 1 is 5. Half of 12 plus 1 is 7.', 'Share into two equal groups first, then add one counter to one group.'],
  ['complement_twelve', 'Pairs that total twelve', pairs([[3,9],[5,7]],8),4, [[5,'This gives a pair totaling thirteen.'],[3,'This gives a pair totaling eleven.'],[8,'This repeats the left quantity rather than keeping the total twelve.']],
    'Each complete pair totals 12: 3 plus 9 and 5 plus 7. Eight needs 4 more to total 12.', 'Check the total of each pair rather than only the difference.'],
  ['add_two', 'Two more', pairs([[1,3],[4,6]],6),8, [[7,'This adds one rather than two.'],[9,'This adds three rather than two.'],[4,'This removes two instead of adding it.']],
    'Both complete pairs gain 2 objects. Six plus 2 is 8.', 'Compare the two completed pairs before choosing.'],
  ['half_quantity', 'One of two equal groups', pairs([[6,3],[10,5]],14),7, [[11,'This subtracts three instead of halving.'],[9,'This subtracts five instead of checking both examples.'],[8,'This is one more than an equal half.']],
    'The right quantity is half the left quantity in both examples. Fourteen shared equally into two groups gives 7 in each.', 'Show equal sharing without doing the final step for the child.'],
  ['complement_ten', 'Pairs that total ten', pairs([[1,9],[4,6]],7),3, [[4,'This makes a pair totaling eleven.'],[2,'This makes a pair totaling nine.'],[7,'This repeats the last quantity instead of keeping the total ten.']],
    'Both complete pairs total 10. Seven needs 3 more to reach the same total.', 'Try a rule about the sum, then check it against both examples.'],
  ['double_add_two', 'Double, then two more', pairs([[1,4],[3,8]],5),12, [[10,'This doubles but forgets the two extra objects.'],[7,'This adds two but does not double first.'],[11,'This adds only one after doubling.']],
    'Double each left quantity, then add 2. Twice 1 plus 2 is 4; twice 3 plus 2 is 8. Twice 5 plus 2 is 12.', 'Use both examples to check a two-step idea.'],
  ['subtract_two', 'Two fewer', pairs([[7,5],[10,8]],5),3, [[4,'This removes only one object.'],[2,'This removes three objects.'],[7,'This adds two instead of removing it.']],
    'Each complete pair loses 2 objects. Five minus 2 is 3.', 'Keep the same change and the same direction.'],
  ['half_subtract_one', 'Half, then one fewer', pairs([[6,2],[10,4]],14),6, [[7,'This halves but forgets to remove one.'],[5,'This removes two after halving.'],[13,'This removes one but does not halve first.']],
    'Take half, then remove 1. Half of 6 minus 1 is 2; half of 10 minus 1 is 4. Half of 14 minus 1 is 6.', 'Describe the two steps aloud before choosing an answer.']
];

const PUZZLES = [
  ['equal_single_load', 'Match equal train loads', trains([6],['?']),6, [[5,'This leaves the second train one short.'],[7,'This gives the second train one too many.'],[3,'This uses half the required total.']],
    'The first train has 6 objects. The second train must also carry 6.', 'Count the first train, then match its total.'],
  ['part_whole', 'Find a missing part', trains([8],[3,'?']),5, [[3,'This repeats the known car without checking the total.'],[8,'This puts the entire total in the missing car as well.'],[6,'This gives a total of nine rather than eight.']],
    'The first train carries 8. The known car carries 3, so the missing car needs 5: 3 plus 5 equals 8.', 'Count on from the known part to the total.'],
  ['combine_two_parts', 'Combine two loads', trains([2,4],['?']),6, [[2,'This counts only the first car.'],[4,'This counts only the second car.'],[8,'This doubles the second car instead of adding both cars.']],
    'The first train carries 2 plus 4, which is 6. One car on the other train must carry all 6.', 'A train can have fewer cars and still carry the same total.'],
  ['missing_first_car', 'Find the first missing load', trains([9],['?',4]),5, [[4,'This copies the visible car without matching the total.'],[9,'This forgets that four objects are already on the train.'],[6,'This makes ten instead of nine.']],
    'The train needs 9 objects altogether. Four are already shown, leaving 5 for the first car.', 'The missing part can appear before the known part.'],
  ['regroup_two_cars', 'Regroup without changing the total', trains([6,3],[7,'?']),2, [[3,'This copies one car even though the other car changed.'],[9,'This ignores the seven objects already shown.'],[4,'This makes eleven rather than nine.']],
    'The first train has 9 objects. After 7 are put in one car, 2 remain for the missing car.', 'Compare totals rather than pairing cars by position.'],
  ['three_parts', 'Combine three loads', trains([2,3,4],['?',5]),4, [[9,'This uses the whole total and ignores the five already shown.'],[5,'This copies the known car, producing ten.'],[3,'This leaves the second train one short.']],
    'The three cars hold 2 plus 3 plus 4, totaling 9. Nine minus 5 leaves 4.', 'Count every car before finding what is missing.'],
  ['missing_top_car', 'Find a missing load in the first train', trains([3,'?'],[4,5]),6, [[9,'This forgets the three objects already in the first train.'],[5,'This copies the last visible car instead of comparing totals.'],[7,'This gives the first train ten rather than nine.']],
    'The second train holds 4 plus 5, or 9. The first train already has 3, so it needs 6 more.', 'Start with the train whose full load is known.'],
  ['equal_totals_different_cars', 'Different cars, equal totals', trains([4,4,4],[7,'?']),5, [[4,'This copies one first-train car without checking the total.'],[12,'This forgets the seven already carried.'],[6,'This makes thirteen instead of twelve.']],
    'Three loads of 4 make 12 objects. The second train has 7, so it needs 5 to make 12.', 'The number of cars does not determine the total load.'],
  ['missing_middle_car', 'Missing middle load', trains([5,6],[2,'?',4]),5, [[7,'This subtracts four but forgets the two in the first car.'],[9,'This subtracts two but forgets the four in the last car.'],[6,'This copies a visible car rather than balancing totals.']],
    'The complete train totals 11. The known parts on the other train total 6, so its middle car needs 5.', 'Combine the known parts on both sides of the question mark.'],
  ['three_against_three', 'Compare two three-car trains', trains([3,5,6],[4,7,'?']),3, [[7,'This forgets the four already in the first car.'],[10,'This forgets the seven in the second car.'],[4,'This makes fifteen instead of fourteen.']],
    'The first train totals 14. The two known loads on the second total 11. The missing load is 3.', 'Make one total for each complete group of known cars.'],
  ['unknown_at_start', 'Find an unknown before two known parts', trains(['?',3,2],[6,4]),5, [[7,'This subtracts only three from the total ten.'],[8,'This subtracts only two from the total ten.'],[10,'This ignores both known cars beside the missing load.']],
    'The complete train totals 10. The first train already carries 3 plus 2, or 5. It needs 5 more.', 'A missing load can be on either train and in any position.'],
  ['equalize_regrouped_loads', 'Keep a total while regrouping', trains([6,6,3],[8,'?',2]),5, [[7,'This forgets the two objects in the last car.'],[13,'This subtracts only two from fifteen.'],[6,'This copies an existing load rather than matching totals.']],
    'The first train totals 15. The second already carries 8 plus 2, or 10, leaving 5.', 'Check the finished totals as a final step.'],
  ['part_whole', 'Find a missing part', trains([10],[6,'?']),4, [[6,'This copies the visible part.'],[10,'This ignores the objects already shown.'],[5,'This makes eleven rather than ten.']],
    'The complete train carries 10. Six are already on the other train, leaving 4.', 'Count on from the known load to the target total.'],
  ['missing_top_car', 'Find a missing load in the first train', trains([4,'?'],[6,5]),7, [[11,'This uses the entire target total rather than the missing part.'],[6,'This copies a car and leaves the train one short.'],[8,'This makes twelve instead of eleven.']],
    'The second train totals 11. Four plus 7 also totals 11.', 'Find the total from the complete train first.'],
  ['three_parts', 'Combine three loads', trains([1,5,7],[9,'?']),4, [[3,'This is one fewer than the amount needed.'],[5,'This is one more than the amount needed.'],[13,'This forgets that nine objects are already shown.']],
    'The first train carries 13. The second train already has 9, so the missing car needs 4.', 'Count every load, including a small first load.'],
  ['unknown_at_end', 'Missing load after two known parts', trains([7,5],[3,5,'?']),4, [[7,'This forgets the three objects in the first car.'],[9,'This forgets the five objects in the second car.'],[5,'This copies the nearby load and makes thirteen.']],
    'The complete train totals 12. Three plus 5 is 8, so 4 objects are missing.', 'Combine both known parts before finding what remains.'],
  ['combine_two_parts', 'Combine two loads', trains([3,5],['?']),8, [[3,'This counts only one car.'],[5,'This counts only one car.'],[9,'This counts one extra object.']],
    'Three plus 5 is 8. The single car on the second train needs 8 objects.', 'Match the total, not the number of cars.'],
  ['missing_middle_car', 'Missing middle load', trains([4,'?',3],[6,6,2]),7, [[10,'This subtracts four but forgets the three.'],[11,'This subtracts three but forgets the four.'],[8,'This gives a total of fifteen rather than fourteen.']],
    'The second train totals 14. The first already has 4 plus 3, or 7, leaving 7 for its middle car.', 'Use the fully known train to set the target total.']
];

const SERIES = [
  ['series_add_one', 'Groups grow by one', beads([2,3,4,5]),6, [[5,'This repeats the last group.'],[7,'This adds two instead of one.'],[4,'This moves backward instead of continuing.']],
    'The groups grow by 1 each time: 2, 3, 4, 5, then 6.', 'Compare each pair of neighboring groups.'],
  ['series_subtract_one', 'Groups shrink by one', beads([8,7,6,5]),4, [[5,'This repeats the last group.'],[3,'This removes two instead of one.'],[6,'This moves back to an earlier group.']],
    'Each group loses 1 object. After 5 comes 4.', 'Check whether the groups grow or shrink.'],
  ['series_add_two', 'Groups grow by two', beads([4,6,8,10]),12, [[11,'This adds only one object.'],[13,'This adds three objects.'],[10,'This repeats the last group.']],
    'Each group gains 2 objects. Ten plus 2 is 12.', 'Count the change rather than recounting the whole pattern each time.'],
  ['series_repeat_pair', 'Repeat a pair of groups', beads([2,5,2,5]),2, [[5,'This repeats one group instead of the two-group unit.'],[8,'This continues adding three instead of noticing the repeating pair.'],[3,'This changes the size of the repeated small group.']],
    'The pair of groups repeats: 2 then 5, 2 then 5. The next group starts the pair again with 2.', 'Ask for the smallest part that repeats.'],
  ['series_missing_middle', 'Find a middle group', beads([2,5,null,11,14],2),8, [[7,'This is only two more than five.'],[9,'This is four more than five.'],[17,'This continues beyond the end instead of filling the gap.']],
    'The groups increase by 3. Between 5 and 11 belongs 8, because 5 plus 3 is 8 and 8 plus 3 is 11.', 'The missing group must fit the neighbor on each side.'],
  ['series_missing_first', 'Find the starting group', beads([null,12,10,8,6],0),14, [[10,'This goes forward from twelve instead of finding what came before.'],[13,'This puts a change of one before changes of two.'],[16,'This makes the first change four instead of two.']],
    'The shown groups decrease by 2. Before 12 must be 14 so that the first change also removes 2.', 'Work backward once, then check the whole sequence forward.'],
  ['series_repeat_three', 'Repeat three groups', beads([1,3,5,1,3]),5, [[1,'This restarts the repeating unit too soon.'],[7,'This keeps growing instead of completing the three-group repeat.'],[3,'This repeats the last group.']],
    'The repeating unit is 1, 3, 5. After the second 1 and 3, the pattern needs 5.', 'Point to complete repeating units before predicting.'],
  ['series_doubling', 'Make twice as many', beads([1,2,4,8]),16, [[10,'This adds two rather than doubling.'],[12,'This adds four rather than doubling the current group.'],[9,'This adds one instead of checking every change.']],
    'Each group has twice as many objects as the previous group. Two groups of 8 make 16.', 'Use two equal groups to explain doubling.'],
  ['series_alternating_changes', 'Alternate two changes', beads([2,5,4,7,6]),9, [[5,'This repeats the subtract-one step instead of switching back.'],[8,'This adds two instead of three.'],[10,'This adds four instead of three.']],
    'The changes alternate: add 3, remove 1, add 3, remove 1. Next add 3 to 6, making 9.', 'Track the changes separately from the quantities.'],
  ['series_growing_jumps', 'Increase the size of each jump', beads([1,2,4,7]),11, [[10,'This repeats the last jump of three.'],[8,'This returns to a jump of one.'],[12,'This skips the required jump of four.']],
    'The gains are 1, then 2, then 3. The next gain is 4, so 7 becomes 11.', 'Count the extra objects added at each step.'],
  ['series_growing_removals', 'Remove one more each time', beads([20,19,17,14]),10, [[11,'This repeats the previous removal of three.'],[13,'This returns to removing one.'],[9,'This removes five instead of four.']],
    'The amounts removed are 1, 2, and 3. Next remove 4 from 14, leaving 10.', 'Describe the amount removed, not only the remaining amount.'],
  ['series_interleaved', 'Follow two alternating sequences', beads([2,10,4,12,6]),14, [[8,'This continues the smaller groups in a position for the larger groups.'],[12,'This repeats the previous larger group.'],[16,'This increases the larger groups by four rather than two.']],
    'Every other group forms its own pattern. The smaller groups are 2, 4, 6. The larger groups are 10, 12, then 14.', 'Cover every other group, then switch which groups are covered.'],
  ['series_missing_middle', 'Find a middle group', beads([3,4,null,6,7],2),5, [[4,'This repeats the group before the gap.'],[6,'This repeats the group after the gap.'],[8,'This adds beyond the end instead of filling the gap.']],
    'The groups grow by 1. The missing group between 4 and 6 is 5.', 'Check the group on both sides of the gap.'],
  ['series_subtract_three', 'Groups shrink by three', beads([17,14,11,8]),5, [[6,'This removes only two objects.'],[4,'This removes four objects.'],[11,'This adds three instead of removing it.']],
    'Each group loses 3 objects. Eight minus 3 is 5.', 'Compare several changes before choosing the rule.'],
  ['series_paired_groups', 'Repeat each size twice', beads([3,3,6,6,9]),9, [[12,'This increases before repeating the current size.'],[6,'This returns to the previous pair.'],[10,'This adds one instead of completing a repeated pair.']],
    'Each size appears twice: 3, 3, then 6, 6, then 9, 9. The next group is another 9.', 'Look for pairs before comparing their sizes.'],
  ['series_alternating_changes', 'Alternate two changes', beads([5,7,6,8,7]),9, [[6,'This repeats the remove-one step instead of switching back.'],[8,'This adds one instead of two.'],[10,'This adds three instead of two.']],
    'The changes alternate: add 2, remove 1. The next step adds 2 to 7, making 9.', 'Say each change in order, then decide which comes next.'],
  ['series_missing_middle', 'Find a middle group', beads([10,9,8,null,6],3),7, [[8,'This repeats the previous group.'],[6,'This repeats the following group.'],[5,'This goes beyond the end instead of filling the gap.']],
    'Each group loses 1. Seven fits between 8 and 6.', 'Fill the gap and check the entire pattern.'],
  ['series_growing_even_jumps', 'Jumps grow by two', beads([1,3,7,13]),21, [[19,'This repeats the jump of six.'],[20,'This adds seven rather than the next even jump.'],[15,'This returns to the first jump of two.']],
    'The gains are 2, 4, and 6. The next gain is 8, so 13 becomes 21.', 'Count the gains, then find the pattern in those gains.']
];

export const QUANTITATIVE_EXPANSION = [
  ...ANALOGIES.map((spec, i) => makeQuestion('number_analogy', i, spec)),
  ...PUZZLES.map((spec, i) => makeQuestion('balance_puzzle', i, spec)),
  ...SERIES.map((spec, i) => makeQuestion('number_series', i, spec))
];
