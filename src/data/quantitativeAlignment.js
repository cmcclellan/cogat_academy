// Riverside's Level 8 directions specify a missing-number equation, a 2x2
// quantity analogy, and selecting the next bead string. Teaching scaffolds are
// retained separately instead of being relabeled as assessment-format items.
const EQUATIONS = [
  [[3, '+', 4], ['?'], 7, [6, 8, 1]],
  [['?', '+', 2], [8], 6, [10, 8, 5]],
  [[9, '-', 3], ['?'], 6, [12, 3, 5]],
  [[8, '-', '?'], [5], 3, [7, 5, 2]],
  [['?'], [4, '+', 5], 9, [1, 8, 10]],
  [['?', '-', 4], [7], 11, [3, 7, 12]],
  [[2, '+', '?'], [5], 3, [7, 2, 4]],
  [[7, '-', 2], ['?'], 5, [9, 2, 4]],
  [['?'], [1, '+', 5], 6, [4, 5, 7]],
  [[6, '-', '?'], [4], 2, [6, 4, 3]],
  [['?', '+', 5], [12], 7, [17, 5, 6]],
  [[14, '-', '?'], [8], 6, [14, 8, 5]],
  [['?'], [13, '-', 4], 9, [17, 4, 8]],
  [['?', '-', 6], [5], 11, [1, 5, 12]],
  [[7, '+', '?'], [5, '+', 8], 6, [13, 7, 5]],
  [[16, '-', '?'], [3, '+', 5], 8, [16, 3, 7]],
  [['?', '+', 4], [15, '-', 3], 8, [12, 16, 7]],
  [['?', '-', 5], [4, '+', 6], 15, [5, 10, 14]],
  [[4, '+', 2], ['?'], 6, [2, 5, 7]],
  [['?', '+', 6], [14], 8, [20, 14, 7]],
  [[15, '-', '?'], [9], 6, [19, 9, 5]],
  [['?', '+', 3], [16, '-', 4], 9, [12, 15, 8]],
  [[8, '-', 5], ['?'], 3, [13, 5, 4]],
  [[18, '-', '?'], [5, '+', 4], 9, [18, 8, 10]]
];

const ANALOGIES = [
  [2, 3, 4, 5, 'Add one'], [5, 4, 7, 6, 'Remove one'],
  [3, 3, 6, 6, 'Keep the quantity'], [3, 6, 5, 10, 'Double the quantity'],
  [2, 5, 4, 7, 'Add three'], [7, 4, 9, 6, 'Remove three'],
  [8, 4, 12, 6, 'Take half'], [2, 6, 4, 12, 'Make three equal groups'],
  [3, 7, 5, 9, 'Add four'], [10, 6, 7, 3, 'Remove four'],
  [4, 8, 6, 12, 'Double the quantity'], [12, 6, 8, 4, 'Take half'],
  [4, 6, 7, 9, 'Add two'], [6, 3, 10, 5, 'Take half'],
  [5, 8, 8, 11, 'Add three'], [3, 9, 6, 18, 'Make three equal groups'],
  [8, 6, 5, 3, 'Remove two'], [5, 10, 8, 16, 'Double the quantity']
];

const number = (value, misconception) => ({ text: String(value), label: String(value),
  ...(misconception ? { misconception } : {}) });
const quantity = (value, misconception) => ({ ...number(value, misconception), quantity: value });
const options = (correct, wrong) => [correct, ...wrong].map((option, i) => ({ ...option, id: String.fromCharCode(65 + i) }));
const show = tokens => tokens.join(' ');
const speak = tokens => tokens.map(t => t === '?' ? 'blank' : t === '+' ? 'plus' : t === '-' ? 'minus' : t).join(' ');
const valueOf = tokens => tokens.length === 1 ? tokens[0]
  : tokens[1] === '+' ? tokens[0] + tokens[2] : tokens[0] - tokens[2];
const describeValue = value => value < 0 ? 'a result below zero (more is taken away than is available)' : value;

function metadata(source, id, skillId, skillName) {
  return { id, grade: '2', batteryId: 'quantitative', subtestId: source.subtestId,
    testId: source.testId, purpose: source.purpose || 'practice', difficulty: source.difficulty,
    skillId, skillName, alignment: 'test_format', replacesId: source.id };
}

function equation(source, index) {
  const [left, right, answer, wrong] = EQUATIONS[index];
  if (!left) throw new Error('Equation replacement specification is missing.');
  const unknownSide = left.includes('?') ? 'left' : 'right';
  const known = valueOf(unknownSide === 'left' ? right : left);
  const filled = tokens => tokens.map(t => t === '?' ? answer : t);
  const correctEquation = `${show(filled(left))} = ${show(filled(right))}`;
  const prompt = 'Which number makes the equation true?';
  return { ...metadata(source, `g2_a_eq${String(index + 1).padStart(2, '0')}`,
    left.length > 1 && right.length > 1 ? 'equation_two_expressions' : `equation_${unknownSide}_${left.includes('-') || right.includes('-') ? 'subtraction' : 'addition'}`,
    left.length > 1 && right.length > 1 ? 'Make both expressions equal' : 'Find the missing number'),
    alignmentReason: 'One missing number in an addition or subtraction equation, matching the published Level 8 Number Puzzles format.',
    rendererType: 'equation_puzzle', prompt,
    audioScript: `${speak(left)} equals ${speak(right)}. Which number makes the equation true?`,
    data: { left, right }, correctAnswer: 0,
    options: options(number(answer), wrong.map(n => number(n,
      `Substituting ${n} does not make both sides equal. Check the operation and the position of the missing number.`))),
    explanation: { rule: 'Both sides have the same value',
      description: `The complete side has value ${known}. Substituting ${answer} gives ${correctEquation}; both sides have value ${known}.`,
      whyOthersWrong: wrong.map(n => {
        const l = valueOf(left.map(t => t === '?' ? n : t));
        const r = valueOf(right.map(t => t === '?' ? n : t));
        return `Using ${n} makes the left side ${describeValue(l)} and the right side ${describeValue(r)}, so they are unequal.`;
      }).join(' '),
      parentTip: 'Read the equals sign as "has the same value as." Find the complete side, then check a missing number by substitution.' }
  };
}

function quantityAnalogy(source, index) {
  const [a, b, c, answer, rule] = ANALOGIES[index];
  const competing = new Set([c + b - a, c * b / a]);
  const wrong = [];
  for (const delta of [-1, 1, -2, 2, -3, 3, -4, 4]) {
    const n = answer + delta;
    if (n > 0 && n <= 24 && !competing.has(n)) wrong.push(quantity(n,
      `This gives ${Math.abs(delta)} ${Math.abs(delta) === 1 ? 'object' : 'objects'} ${delta < 0 ? 'fewer' : 'more'} than applying the same change.`));
    if (wrong.length === 3) break;
  }
  const prompt = 'Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?';
  return { ...metadata(source, `g2_a_na${String(index + 1).padStart(2, '0')}`, `quantity_${rule.toLowerCase().replaceAll(' ', '_')}`, rule),
    alignmentReason: 'One complete quantity pair and one incomplete pair in a 2x2 matrix, matching the published Level 8 analogy format.',
    rendererType: 'number_analogy', prompt, audioScript: prompt,
    data: { topPair: { left: a, right: b }, bottomStimulus: { left: c } },
    options: options(quantity(answer), wrong), correctAnswer: 0,
    explanation: { rule, description: `${a} changes to ${b}. Apply the same rule, "${rule.toLowerCase()}," to ${c}; it becomes ${answer}.`,
      whyOthersWrong: wrong.map(o => `${o.quantity} objects: ${o.misconception}`).join(' '),
      parentTip: 'Describe the relationship in the top row, then check that the bottom pair follows that same relationship.' }
  };
}

function nextSeries(source, index) {
  const missing = source.options[source.correctAnswer].quantity;
  const counts = source.data.items.map(item => item === null ? missing : item.count);
  const step = counts[1] - counts[0];
  if (!counts.every((n, i) => i === 0 || n - counts[i - 1] === step)) throw new Error('A gap series needs an explicitly authored next-item replacement.');
  const answer = counts.at(-1) + step;
  const wrongValues = [...new Set([answer - 1, answer + 1, counts.at(-1), answer + 2])].filter(n => n > 0 && n !== answer).slice(0, 3);
  const prompt = 'Look at the groups of beads. Which group comes next?';
  return { ...metadata(source, `g2_a_ns${String(index + 1).padStart(2, '0')}`, step > 0 ? 'next_beads_grow' : 'next_beads_shrink', step > 0 ? 'Find the next growing group' : 'Find the next shrinking group'),
    alignmentReason: 'Select the next bead group, matching the published Level 8 Number Series response format.',
    rendererType: 'number_series', prompt, audioScript: prompt,
    data: { seriesType: 'beads', items: counts.map(count => ({ count, color: '#0284c7' })) },
    options: options(quantity(answer), wrongValues.map(n => quantity(n,
      n === counts.at(-1) ? 'This repeats the final shown group rather than making the next change.' : `This does not continue the change of ${Math.abs(step)} objects in the same direction.`))),
    correctAnswer: 0, explanation: { rule: `Change by ${step}`, description: `Each group ${step > 0 ? 'gains' : 'loses'} ${Math.abs(step)} beads. After ${counts.at(-1)}, the next group has ${answer}.`,
      whyOthersWrong: 'The next group must continue the same change seen between every pair of neighboring groups.',
      parentTip: 'Compare successive groups first. Apply the same change once more after the last shown group.' }
  };
}

export function alignQuantitativeQuestions(questions) {
  const additions = [];
  let equationIndex = 0, analogyIndex = 0, seriesIndex = 0;
  const aligned = questions.map(q => {
    if (q.batteryId !== 'quantitative') return q;
    if (q.alignment === 'enrichment' && q.originalTestId !== undefined) return q;
    let reason;
    if (q.subtestId === 'number_puzzles' && q.data.type === 'object_trains') {
      additions.push(equation(q, equationIndex++));
      reason = 'Object trains are a supporting model; published Level 8 Number Puzzles use missing-number equations.';
    } else if (q.subtestId === 'number_analogies' && q.data.examplePairs?.length > 1) {
      additions.push(quantityAnalogy(q, analogyIndex++));
      reason = 'Two complete example pairs scaffold reasoning beyond the published Level 8 2x2 matrix format.';
    } else if (q.subtestId === 'number_series' && q.data.missingIndex !== undefined) {
      additions.push(nextSeries(q, seriesIndex++));
      reason = 'Beginning and middle gaps are enrichment; the published Level 8 task selects the next bead string.';
    }
    if (reason) return { ...q, alignment: 'enrichment', alignmentReason: reason,
      purpose: 'practice', testId: 'enrichment', originalTestId: q.testId };
    return { ...q, alignment: 'test_format', alignmentReason: q.alignmentReason || 'Uses the published Level 8 question and response format; content and difficulty are independently authored.' };
  });
  return [...aligned, ...additions];
}
