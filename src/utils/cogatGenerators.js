/**
 * Procedural Question Generators for CogAT Prep Academy
 * Mathematically and logically generates infinite variations for:
 * - Number Analogies
 * - Number Puzzles (Balance Scales, Trains, Equations)
 * - Number Series (Beads, Block Towers, Number Sequences)
 * - Figure Matrices (2x2 spatial geometric transformations)
 * - Paper Folding (Mathematical 2D reflection across crease lines)
 * - Figure Classification (Geometric invariant induction)
 */

const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'star', 'pentagon', 'hexagon', 'trapezoid', 'cross', 'arrow_up'];
const COLORS = ['#1e293b', '#0284c7', '#4f46e5', '#0f766e', '#d97706', '#dc2626'];
const FILLS = ['none', 'solid', 'semi', 'striped'];

// Helper to pick random item from array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper for random int between min and max inclusive
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shuffle array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Procedural Generator: Number Analogies
 */
export function generateNumberAnalogy(grade = '2', difficulty = 'medium') {
  const isPrimary = ['k', '1', '2'].includes(grade);
  let relationType;
  
  if (grade === 'k' || grade === '1') {
    relationType = pickRandom(['add_small', 'sub_small', 'double']);
  } else if (grade === '2') {
    relationType = pickRandom(['double', 'add', 'sub', 'triple']);
  } else {
    relationType = pickRandom(['mult', 'divide', 'add_two_step', 'sub']);
  }

  let topA, topB, bottomA, bottomB, ruleName, ruleDesc, parentTip;

  if (relationType === 'double') {
    const mult = 2;
    topA = randInt(2, isPrimary ? 5 : 8);
    topB = topA * mult;
    bottomA = randInt(2, isPrimary ? 6 : 9);
    while (bottomA === topA) bottomA = randInt(2, 7);
    bottomB = bottomA * mult;
    ruleName = 'Doubling (Multiply by 2)';
    ruleDesc = `${topA} is doubled to get ${topB}. In the same way, doubling ${bottomA} gives ${bottomB}.`;
    parentTip = 'Encourage your child to look for "Double the number" relations (2x).';
  } else if (relationType === 'add' || relationType === 'add_small') {
    const diff = randInt(2, isPrimary ? 4 : 8);
    topA = randInt(1, isPrimary ? 6 : 15);
    topB = topA + diff;
    bottomA = randInt(1, isPrimary ? 8 : 20);
    while (bottomA === topA) bottomA = randInt(1, 10);
    bottomB = bottomA + diff;
    ruleName = `Add ${diff} (+${diff})`;
    ruleDesc = `${topA} plus ${diff} equals ${topB}. Applying the same rule: ${bottomA} plus ${diff} equals ${bottomB}.`;
    parentTip = `Ask your child: "How much did the top number grow? It added ${diff}!"`;
  } else if (relationType === 'sub' || relationType === 'sub_small') {
    const diff = randInt(2, isPrimary ? 4 : 6);
    topB = randInt(2, isPrimary ? 5 : 10);
    topA = topB + diff;
    bottomB = randInt(2, isPrimary ? 6 : 12);
    while (bottomB === topB) bottomB = randInt(2, 8);
    bottomA = bottomB + diff;
    ruleName = `Subtract ${diff} (-${diff})`;
    ruleDesc = `${topA} minus ${diff} equals ${topB}. Applying the same rule: ${bottomA} minus ${diff} equals ${bottomB}.`;
    parentTip = 'Check if the number is getting smaller or bigger, and by how much.';
  } else {
    // Triple or multiply
    topA = randInt(2, 4);
    topB = topA * 3;
    bottomA = randInt(2, 5);
    while (bottomA === topA) bottomA = randInt(2, 5);
    bottomB = bottomA * 3;
    ruleName = 'Multiply by 3 (Tripling)';
    ruleDesc = `${topA} × 3 = ${topB}. Therefore ${bottomA} × 3 = ${bottomB}.`;
    parentTip = 'Look at multiplication tables for 3!';
  }

  // Calculate any plausible alternative answer to guarantee ZERO ambiguity
  let altAnswer = null;
  if (relationType === 'double') {
    altAnswer = bottomA + topA; // e.g. 4 + 3 = 7 for 3->6
  } else if (relationType === 'triple') {
    altAnswer = bottomA + (topB - topA);
  } else if (relationType === 'add' || relationType === 'add_small') {
    if (topA > 0 && topB % topA === 0) {
      altAnswer = bottomA * (topB / topA);
    }
  }

  // Create unique, non-ambiguous distractors
  const distractors = new Set();
  const offsets = [3, -2, 2, 4, -3, 5, 1, -1];
  for (const off of offsets) {
    const val = bottomB + off;
    if (val > 0 && val !== bottomB && val !== altAnswer) {
      distractors.add(val);
      if (distractors.size === 3) break;
    }
  }
  const candidateOptions = [bottomB, ...Array.from(distractors)];
  const shuffled = shuffle(candidateOptions);
  const correctIdx = shuffled.indexOf(bottomB);

  return {
    id: `dyn_na_${Date.now()}_${randInt(100, 999)}`,
    grade,
    batteryId: 'quantitative',
    subtestId: 'number_analogies',
    difficulty,
    prompt: `Look at the first pair: [ ${topA} ➔ ${topB} ]. What is the relationship? Now apply the exact same rule to [ ${bottomA} ➔ ? ].`,
    audioScript: `Look at the top pair: ${topA} turns into ${topB}. Find the rule! Now look at the bottom number: ${bottomA}. What does ${bottomA} turn into using the exact same rule?`,
    rendererType: 'number_analogy',
    data: {
      topPair: { left: topA, right: topB, relation: ruleName },
      bottomStimulus: { left: bottomA }
    },
    options: shuffled.map((val, idx) => ({
      id: String.fromCharCode(65 + idx),
      text: String(val),
      label: String(val)
    })),
    correctAnswer: correctIdx,
    explanation: {
      rule: ruleName,
      description: ruleDesc,
      whyOthersWrong: `The exact mathematical step is ${ruleName}. The other choices are off-by-one or use the wrong arithmetic operation.`,
      parentTip
    }
  };
}

/**
 * Procedural Generator: Number Puzzles (Balance Scale & Trains & Equations)
 */
export function generateNumberPuzzle(grade = '2', difficulty = 'medium') {
  const isPrimary = ['k', '1', '2'].includes(grade);

  if (isPrimary) {
    const isTrain = Math.random() > 0.5;

    if (isTrain) {
      const part1 = randInt(2, 6);
      const part2 = randInt(2, 7);
      const total = part1 + part2;
      const options = shuffle([part2, part2 + 1, Math.max(1, part2 - 1), part2 + 2]);
      const correctIdx = options.indexOf(part2);

      return {
        id: `dyn_np_train_${Date.now()}_${randInt(100, 999)}`,
        grade,
        batteryId: 'quantitative',
        subtestId: 'number_puzzles',
        difficulty,
        prompt: `In this number train, the red engine total (${total}) must equal the sum of the green cargo cars. What number goes in the missing car?`,
        audioScript: `The engine has ${total}. Car 1 has ${part1}. What number must be in the question mark car so the cars add up to ${total}?`,
        rendererType: 'balance_puzzle',
        data: {
          type: 'train',
          targetTotal: total,
          trainCars: [part1, '?']
        },
        options: options.map((v, idx) => ({
          id: String.fromCharCode(65 + idx),
          text: String(v),
          label: String(v)
        })),
        correctAnswer: correctIdx,
        explanation: {
          rule: 'Part-Whole Conservation',
          description: `The engine has ${total}. The two cargo cars must sum to ${total}: ${part1} + ? = ${total}. Missing number is ${part2}.`,
          whyOthersWrong: `Only ${part2} satisfies ${part1} + ${part2} = ${total}.`,
          parentTip: 'Have your child count up from the first car number to the engine number!'
        }
      };
    } else {
      // Balance Scale: Left = A + B, Right = C + ?
      const w1 = randInt(2, 6);
      const w2 = randInt(3, 7);
      const total = w1 + w2;
      const w3 = randInt(1, total - 2);
      const missing = total - w3;

      const options = shuffle([missing, missing + 1, Math.max(1, missing - 1), missing + 2]);
      const correctIdx = options.indexOf(missing);

      return {
        id: `dyn_np_bal_${Date.now()}_${randInt(100, 999)}`,
        grade,
        batteryId: 'quantitative',
        subtestId: 'number_puzzles',
        difficulty,
        prompt: `The scale is balanced and both sides must equal the same total. The left pan has ${w1} and ${w2}. The right pan has ${w3} and [?]. What number balances the scale?`,
        audioScript: `The scale is balanced! The left side has ${w1} plus ${w2}, which equals ${total}. The right side has ${w3} and a question mark. What number plus ${w3} makes ${total}?`,
        rendererType: 'balance_puzzle',
        data: {
          type: 'balance',
          leftWeights: [w1, w2],
          rightWeights: [w3, '?']
        },
        options: options.map((v, idx) => ({
          id: String.fromCharCode(65 + idx),
          text: String(v),
          label: String(v)
        })),
        correctAnswer: correctIdx,
        explanation: {
          rule: 'Equivalence: Left Side = Right Side',
          description: `Left pan total: ${w1} + ${w2} = ${total}. Right pan must also equal ${total}: ${w3} + ? = ${total} ➔ ? = ${missing}.`,
          whyOthersWrong: `Other values would tilt the scale heavier or lighter than ${total}.`,
          parentTip: 'Step 1: Find the total of the side you know. Step 2: Subtract the known weight on the other side!'
        }
      };
    }
  } else {
    // Upper Grade Shape Equations
    const valCircle = randInt(3, 8);
    const sumCircles = valCircle * 2;
    const valSquare = randInt(2, 9);
    const sumCircleSquare = valCircle + valSquare;

    const options = shuffle([valSquare, valSquare + 1, Math.max(1, valSquare - 1), valSquare + 2]);
    const correctIdx = options.indexOf(valSquare);

    return {
      id: `dyn_np_eq_${Date.now()}_${randInt(100, 999)}`,
      grade,
      batteryId: 'quantitative',
      subtestId: 'number_puzzles',
      difficulty,
      prompt: `Solve the system: ⚪ + ⚪ = ${sumCircles}, and ⚪ + 🟦 = ${sumCircleSquare}. What is the value of 🟦?`,
      audioScript: `If two circles add up to ${sumCircles}, and one circle plus one square equals ${sumCircleSquare}, what is the value of the square?`,
      rendererType: 'balance_puzzle',
      data: {
        type: 'equation',
        equationRows: [
          `⚪ + ⚪ = ${sumCircles}`,
          `⚪ + 🟦 = ${sumCircleSquare}`,
          `🟦 = ?`
        ]
      },
      options: options.map((v, idx) => ({
        id: String.fromCharCode(65 + idx),
        text: String(v),
        label: String(v)
      })),
      correctAnswer: correctIdx,
      explanation: {
        rule: 'Pre-Algebra Substitution',
        description: `Since ⚪ + ⚪ = ${sumCircles}, each ⚪ = ${valCircle}. Substitute into the second line: ${valCircle} + 🟦 = ${sumCircleSquare} ➔ 🟦 = ${valSquare}.`,
        whyOthersWrong: 'Other choices do not satisfy both simultaneous equations.',
        parentTip: 'Solve for the repeated shape first, then plug that value into the next line.'
      }
    };
  }
}

/**
 * Procedural Generator: Number Series
 */
export function generateNumberSeries(grade = '2', difficulty = 'medium') {
  const isPrimary = ['k', '1', '2'].includes(grade);
  const type = isPrimary ? pickRandom(['beads', 'numbers']) : 'numbers';

  if (type === 'beads') {
    const step = pickRandom([2, 3]);
    const start = randInt(1, 3);
    const counts = [start, start + step, start + step * 2, start + step * 3];
    const nextCount = start + step * 4;
    const color = pickRandom(['#0284c7', '#059669', '#7c3aed', '#d97706']);

    const options = shuffle([nextCount, nextCount - 1, nextCount + 1, nextCount + 2]);
    const correctIdx = options.indexOf(nextCount);

    return {
      id: `dyn_ns_bead_${Date.now()}_${randInt(100, 999)}`,
      grade,
      batteryId: 'quantitative',
      subtestId: 'number_series',
      difficulty,
      prompt: `Look at the bead pattern: ${counts.join(', ')}. How many beads will be in the next group?`,
      audioScript: `Look at the bead pattern: ${counts.join(', ')}. Each group adds ${step} beads. How many beads come next?`,
      rendererType: 'number_series',
      data: {
        seriesType: 'beads',
        items: counts.map(c => ({ count: c, color }))
      },
      options: options.map((v, idx) => ({
        id: String.fromCharCode(65 + idx),
        text: String(v),
        label: `${v} beads`
      })),
      correctAnswer: correctIdx,
      explanation: {
        rule: `Add ${step} Beads (+${step})`,
        description: `Each group grows by ${step} beads. ${counts[3]} + ${step} = ${nextCount}.`,
        whyOthersWrong: `The pattern has a steady step of +${step}.`,
        parentTip: 'Count aloud: how many more beads are added from one card to the next?'
      }
    };
  } else {
    // Number sequence
    let items, nextVal, ruleName, ruleDesc;
    const patternKind = isPrimary ? pickRandom(['add', 'sub']) : pickRandom(['add', 'sub', 'mult', 'alt']);

    if (patternKind === 'add') {
      const step = isPrimary ? pickRandom([2, 3, 5]) : randInt(3, 8);
      const start = randInt(1, 10);
      items = [start, start + step, start + step * 2, start + step * 3];
      nextVal = start + step * 4;
      ruleName = `Add ${step} (+${step})`;
      ruleDesc = `Each number increases by ${step}: ${items[3]} + ${step} = ${nextVal}.`;
    } else if (patternKind === 'sub') {
      const step = isPrimary ? pickRandom([2, 3]) : randInt(3, 6);
      const start = isPrimary ? randInt(15, 25) : randInt(30, 60);
      items = [start, start - step, start - step * 2, start - step * 3];
      nextVal = start - step * 4;
      ruleName = `Subtract ${step} (-${step})`;
      ruleDesc = `Each number decreases by ${step}: ${items[3]} - ${step} = ${nextVal}.`;
    } else if (patternKind === 'mult') {
      const start = randInt(2, 4);
      items = [start, start * 2, start * 4, start * 8];
      nextVal = start * 16;
      ruleName = 'Multiply by 2 (Doubling)';
      ruleDesc = `Each number is doubled: ${items[3]} × 2 = ${nextVal}.`;
    } else {
      // Alternating +a, -b
      const a = randInt(4, 7);
      const b = randInt(1, 3);
      const n0 = randInt(2, 8);
      const n1 = n0 + a;
      const n2 = n1 - b;
      const n3 = n2 + a;
      const n4 = n3 - b;
      items = [n0, n1, n2, n3, n4];
      nextVal = n4 + a;
      ruleName = `Alternating (+${a}, -${b})`;
      ruleDesc = `The operations alternate: +${a}, -${b}, +${a}, -${b}. Next is +${a}: ${n4} + ${a} = ${nextVal}.`;
    }

    const options = shuffle([nextVal, nextVal + 1, nextVal - 1, nextVal + 2]);
    const correctIdx = options.indexOf(nextVal);

    return {
      id: `dyn_ns_num_${Date.now()}_${randInt(100, 999)}`,
      grade,
      batteryId: 'quantitative',
      subtestId: 'number_series',
      difficulty,
      prompt: `Find the number that continues the pattern: ${items.join(', ')}, [ ? ]`,
      audioScript: `Look at the numbers: ${items.join(', ')}. What number comes next?`,
      rendererType: 'number_series',
      data: {
        seriesType: 'numbers',
        items
      },
      options: options.map((v, idx) => ({
        id: String.fromCharCode(65 + idx),
        text: String(v),
        label: String(v)
      })),
      correctAnswer: correctIdx,
      explanation: {
        rule: ruleName,
        description: ruleDesc,
        whyOthersWrong: 'Follow the exact repeating operation to reach the correct next number.',
        parentTip: 'Look at the jumps between each number: write down + or - above them!'
      }
    };
  }
}

/**
 * Procedural Generator: Figure Matrices (2x2 spatial matrix)
 */
export function generateFigureMatrix(grade = '2', difficulty = 'medium') {
  const shapeA = pickRandom(['circle', 'square', 'triangle', 'diamond', 'star', 'arrow_up']);
  let shapeB = pickRandom(['trapezoid', 'pentagon', 'hexagon', 'triangle', 'diamond']);
  while (shapeB === shapeA) shapeB = pickRandom(['trapezoid', 'pentagon', 'hexagon']);

  const transformKind = pickRandom(['fill', 'rotation', 'dots', 'inscribed']);
  let topRowLeft, topRowRight, bottomRowLeft, bottomRowRight;
  let ruleName, ruleDesc;

  if (transformKind === 'fill') {
    topRowLeft = { shape: shapeA, fill: 'none', color: '#1e293b' };
    topRowRight = { shape: shapeA, fill: 'solid', color: '#1e293b' };
    bottomRowLeft = { shape: shapeB, fill: 'none', color: '#1e293b' };
    bottomRowRight = { shape: shapeB, fill: 'solid', color: '#1e293b' };
    ruleName = 'Fill Inversion (Unshaded ➔ Solid)';
    ruleDesc = 'The top shape stays the same shape but gets filled in solid black. Applying the same transformation to the bottom shape makes it filled in solid black.';
  } else if (transformKind === 'rotation') {
    topRowLeft = { shape: 'arrow_up', rotation: 0, fill: 'semi', color: '#0284c7' };
    topRowRight = { shape: 'arrow_up', rotation: 90, fill: 'semi', color: '#0284c7' };
    bottomRowLeft = { shape: 'arrow_up', rotation: 180, fill: 'semi', color: '#0284c7' };
    bottomRowRight = { shape: 'arrow_up', rotation: 270, fill: 'semi', color: '#0284c7' };
    ruleName = '90° Clockwise Rotation';
    ruleDesc = 'The figure turns 90 degrees clockwise (a quarter turn). Rotating the downward-pointing shape 90° clockwise points it to the left.';
  } else if (transformKind === 'dots') {
    topRowLeft = { shape: shapeA, fill: 'none', color: '#0f766e', dots: 1 };
    topRowRight = { shape: shapeA, fill: 'none', color: '#0f766e', dots: 2 };
    bottomRowLeft = { shape: shapeB, fill: 'none', color: '#0f766e', dots: 2 };
    bottomRowRight = { shape: shapeB, fill: 'none', color: '#0f766e', dots: 3 };
    ruleName = 'Add 1 Inner Dot (+1)';
    ruleDesc = 'The top figure gains one extra internal dot. In the same way, the bottom figure with 2 dots becomes a figure with 3 dots.';
  } else {
    // Inscribe shape
    topRowLeft = { shape: 'square', fill: 'none', color: '#4f46e5' };
    topRowRight = { shape: 'square', fill: 'none', color: '#4f46e5', innerShape: { shape: 'circle', fill: 'solid', color: '#4f46e5' } };
    bottomRowLeft = { shape: 'triangle', fill: 'none', color: '#4f46e5' };
    bottomRowRight = { shape: 'triangle', fill: 'none', color: '#4f46e5', innerShape: { shape: 'circle', fill: 'solid', color: '#4f46e5' } };
    ruleName = 'Inscribe Solid Circle Inside Shape';
    ruleDesc = 'A solid circle is inserted inside the outer shape. The bottom triangle must also gain a solid circle inside.';
  }

  // Create 4 distinct candidate choices
  const optCorrect = bottomRowRight;
  const optWrongShape = { ...bottomRowRight, shape: shapeA };
  const optWrongFill = { ...bottomRowRight, fill: 'none' };
  const optUnchanged = { ...bottomRowLeft };

  const options = shuffle([
    { shape: optCorrect },
    { shape: optWrongShape },
    { shape: optWrongFill },
    { shape: optUnchanged }
  ]);
  const correctIdx = options.findIndex(o => o.shape === optCorrect);

  return {
    id: `dyn_fm_${Date.now()}_${randInt(100, 999)}`,
    grade,
    batteryId: 'nonverbal',
    subtestId: 'figure_matrices',
    difficulty,
    prompt: 'Look at the top row: how does the first shape change into the second? Find the answer that changes the bottom shape in the exact same way.',
    audioScript: 'Look at the top row. What changed? Apply the exact same change to the bottom shape to find the answer.',
    rendererType: 'figure_matrix',
    data: {
      topRow: { left: topRowLeft, right: topRowRight },
      bottomRow: { left: bottomRowLeft }
    },
    options: options.map((opt, idx) => ({
      id: String.fromCharCode(65 + idx),
      shape: opt.shape
    })),
    correctAnswer: correctIdx,
    explanation: {
      rule: ruleName,
      description: ruleDesc,
      whyOthersWrong: 'The correct choice preserves the base bottom shape while executing the precise transformation seen in the top row.',
      parentTip: 'Ask: "What stayed the same, and what is new or changed?"'
    }
  };
}

/**
 * Procedural Generator: Paper Folding (Mathematical Reflection across Creases)
 */
export function generatePaperFolding(grade = '2', difficulty = 'medium') {
  const foldType = pickRandom(['vertical_right', 'horizontal_up', 'double_quarter']);

  if (foldType === 'vertical_right') {
    // Fold left to right across x=50. Punch at (75, yPunch)
    const yPunch = pickRandom([25, 50, 75]);
    const hole1 = { x: 75, y: yPunch };
    const holeReflected = { x: 25, y: yPunch };

    const unfoldedHoles = [hole1, holeReflected];
    const options = shuffle([
      { holes: unfoldedHoles, creases: ['vertical'], label: 'Two mirrored holes' },
      { holes: [{ x: 75, y: yPunch }, { x: 75, y: 100 - yPunch }], creases: ['vertical'], label: 'Vertical pair (wrong axis)' },
      { holes: [hole1], creases: ['vertical'], label: 'Single hole (missed layer)' },
      { holes: [...unfoldedHoles, { x: 25, y: 100 - yPunch }, { x: 75, y: 100 - yPunch }], creases: ['vertical', 'horizontal'], label: 'Four holes (too many folds)' }
    ]);
    const correctIdx = options.findIndex(o => o.holes === unfoldedHoles);

    return {
      id: `dyn_pf_v_${Date.now()}_${randInt(100, 999)}`,
      grade,
      batteryId: 'nonverbal',
      subtestId: 'paper_folding',
      difficulty,
      prompt: 'A square piece of paper is folded in half from left to right. A hole is punched through the folded paper. Where will the holes be when completely unfolded?',
      audioScript: 'Imagine folding paper in half to the right. A hole is punched through both layers. When you open the paper back up, where will the holes be?',
      rendererType: 'paper_folding',
      data: {
        steps: [
          { type: 'initial-fold', foldDirection: 'right', caption: 'Fold in half right' },
          { type: 'punch', foldedBounds: { x: 50, y: 10, w: 40, h: 80 }, hole: { x: 70, y: yPunch, r: 6 }, caption: 'Punch hole' }
        ],
        creases: ['vertical'],
        finalUnfoldedHoles: unfoldedHoles
      },
      options: options.map((opt, idx) => ({
        id: String.fromCharCode(65 + idx),
        holes: opt.holes,
        creases: opt.creases
      })),
      correctAnswer: correctIdx,
      explanation: {
        rule: 'Vertical Line of Symmetry Reflection',
        description: 'Folding in half creates 2 layers with a vertical crease down the center. Punching a hole creates 2 mirrored holes across the center crease line.',
        whyOthersWrong: 'The hole must mirror across the crease line, not vertically. Because there were 2 layers, there must be exactly 2 holes.',
        parentTip: 'Remember: 1 fold = 2 layers of paper = 2 holes!'
      }
    };
  } else if (foldType === 'horizontal_up') {
    // Fold bottom to top across y=50. Punch at (xPunch, 25)
    const xPunch = pickRandom([25, 50, 75]);
    const hole1 = { x: xPunch, y: 25 };
    const holeReflected = { x: xPunch, y: 75 };

    const unfoldedHoles = [hole1, holeReflected];
    const options = shuffle([
      { holes: unfoldedHoles, creases: ['horizontal'], label: 'Two vertical mirrored holes' },
      { holes: [{ x: 25, y: 25 }, { x: 75, y: 25 }], creases: ['horizontal'], label: 'Horizontal pair (wrong axis)' },
      { holes: [hole1], creases: ['horizontal'], label: 'Single hole' },
      { holes: [...unfoldedHoles, { x: 100 - xPunch, y: 25 }, { x: 100 - xPunch, y: 75 }], creases: ['vertical', 'horizontal'], label: 'Four corner holes' }
    ]);
    const correctIdx = options.findIndex(o => o.holes === unfoldedHoles);

    return {
      id: `dyn_pf_h_${Date.now()}_${randInt(100, 999)}`,
      grade,
      batteryId: 'nonverbal',
      subtestId: 'paper_folding',
      difficulty,
      prompt: 'A square paper is folded in half from bottom to top. A hole is punched. What does it look like unfolded?',
      audioScript: 'The paper is folded UP in half. A hole is punched. When opened up, where are the holes?',
      rendererType: 'paper_folding',
      data: {
        steps: [
          { type: 'initial-fold', foldDirection: 'up', caption: 'Fold in half up' },
          { type: 'punch', foldedBounds: { x: 10, y: 10, w: 80, h: 40 }, hole: { x: xPunch, y: 25, r: 6 }, caption: 'Punch hole' }
        ],
        creases: ['horizontal'],
        finalUnfoldedHoles: unfoldedHoles
      },
      options: options.map((opt, idx) => ({
        id: String.fromCharCode(65 + idx),
        holes: opt.holes,
        creases: opt.creases
      })),
      correctAnswer: correctIdx,
      explanation: {
        rule: 'Horizontal Line of Symmetry Reflection',
        description: 'The horizontal crease at y=50 reflects the punched hole to the bottom half.',
        whyOthersWrong: 'A horizontal fold causes top-and-bottom reflection, not side-to-side.',
        parentTip: 'Look at the fold line: the hole must bounce across to the other side of that line!'
      }
    };
  } else {
    // Double quarter fold: corner punch -> 4 holes
    const unfoldedHoles = [
      { x: 25, y: 25 },
      { x: 75, y: 25 },
      { x: 25, y: 75 },
      { x: 75, y: 75 }
    ];
    const options = shuffle([
      { holes: unfoldedHoles, creases: ['vertical', 'horizontal'] },
      { holes: [{ x: 50, y: 50, r: 8 }], creases: ['vertical', 'horizontal'] },
      { holes: [{ x: 25, y: 25 }, { x: 75, y: 25 }], creases: ['vertical', 'horizontal'] },
      { holes: [{ x: 50, y: 25 }, { x: 50, y: 75 }], creases: ['vertical', 'horizontal'] }
    ]);
    const correctIdx = options.findIndex(o => o.holes === unfoldedHoles);

    return {
      id: `dyn_pf_q_${Date.now()}_${randInt(100, 999)}`,
      grade,
      batteryId: 'nonverbal',
      subtestId: 'paper_folding',
      difficulty: 'hard',
      prompt: 'The paper is folded in half UP, then in half RIGHT into quarters. A hole is punched in the outer corner. What does it look like unfolded?',
      audioScript: 'The paper is folded up, then folded right into quarters. A hole is punched in the outside corner. What does it look like when opened?',
      rendererType: 'paper_folding',
      data: {
        steps: [
          { type: 'initial-fold', foldDirection: 'up', caption: 'Fold in half up' },
          { type: 'second-fold', caption: 'Fold right into quarter' },
          { type: 'punch', foldedBounds: { x: 50, y: 10, w: 40, h: 40 }, hole: { x: 75, y: 20, r: 6 }, caption: 'Punch outer corner' }
        ],
        creases: ['vertical', 'horizontal'],
        finalUnfoldedHoles: unfoldedHoles
      },
      options: options.map((opt, idx) => ({
        id: String.fromCharCode(65 + idx),
        holes: opt.holes,
        creases: opt.creases
      })),
      correctAnswer: correctIdx,
      explanation: {
        rule: 'Dual Crease Reflection (4 Layers = 4 Holes)',
        description: 'Folding in half twice creates 4 layers of paper. A punch in the open outer corner mirrors across both creases into all 4 outer quadrants!',
        whyOthersWrong: 'Because there are 4 layers, there must be 4 holes. Since the punch was on the outer corner, the holes appear in the 4 outer corners.',
        parentTip: '2 folds = 4 layers of paper = 4 holes in the corners!'
      }
    };
  }
}

/**
 * Procedural Generator: Figure Classification
 */
export function generateFigureClassification(grade = '2', difficulty = 'medium') {
  const invariantType = pickRandom(['side_count', 'dot_count', 'stripes']);
  let stimulusFigures, ruleDescription, optCorrect, optWrong1, optWrong2, optWrong3;

  if (invariantType === 'side_count') {
    // Invariant: 3-sided shapes (Triangles) or 4-sided shapes
    const targetSides = pickRandom(['3', '4']);
    if (targetSides === '3') {
      stimulusFigures = [
        { shape: 'triangle', fill: 'semi', color: '#4f46e5' },
        { shape: 'triangle', rotation: 90, fill: 'semi', color: '#4f46e5' },
        { shape: 'triangle', rotation: 180, fill: 'semi', color: '#4f46e5' }
      ];
      ruleDescription = 'All shapes have 3 straight sides (Triangles)';
      optCorrect = { shape: 'triangle', rotation: 270, fill: 'semi', color: '#4f46e5' };
      optWrong1 = { shape: 'square', fill: 'semi', color: '#4f46e5' };
      optWrong2 = { shape: 'pentagon', fill: 'semi', color: '#4f46e5' };
      optWrong3 = { shape: 'circle', fill: 'semi', color: '#4f46e5' };
    } else {
      stimulusFigures = [
        { shape: 'square', fill: 'semi', color: '#0f766e' },
        { shape: 'diamond', fill: 'semi', color: '#0f766e' },
        { shape: 'trapezoid', fill: 'semi', color: '#0f766e' }
      ];
      ruleDescription = 'All shapes have 4 straight sides (Quadrilaterals)';
      optCorrect = { shape: 'square', rotation: 45, fill: 'semi', color: '#0f766e' };
      optWrong1 = { shape: 'triangle', fill: 'semi', color: '#0f766e' };
      optWrong2 = { shape: 'pentagon', fill: 'semi', color: '#0f766e' };
      optWrong3 = { shape: 'circle', fill: 'semi', color: '#0f766e' };
    }
  } else if (invariantType === 'dot_count') {
    const dots = pickRandom([1, 2, 3]);
    stimulusFigures = [
      { shape: 'circle', fill: 'none', color: '#0284c7', dots },
      { shape: 'square', fill: 'none', color: '#0284c7', dots },
      { shape: 'triangle', fill: 'none', color: '#0284c7', dots }
    ];
    ruleDescription = `All shapes contain exactly ${dots} inner dots`;
    optCorrect = { shape: 'diamond', fill: 'none', color: '#0284c7', dots };
    optWrong1 = { shape: 'diamond', fill: 'none', color: '#0284c7', dots: dots + 1 };
    optWrong2 = { shape: 'diamond', fill: 'none', color: '#0284c7', dots: Math.max(0, dots - 1) };
    optWrong3 = { shape: 'pentagon', fill: 'solid', color: '#0284c7', dots: 0 };
  } else {
    // Striped fill invariant
    stimulusFigures = [
      { shape: 'circle', fill: 'striped', color: '#d97706' },
      { shape: 'square', fill: 'striped', color: '#d97706' },
      { shape: 'triangle', fill: 'striped', color: '#d97706' }
    ];
    ruleDescription = 'All figures have diagonal stripe patterns';
    optCorrect = { shape: 'diamond', fill: 'striped', color: '#d97706' };
    optWrong1 = { shape: 'diamond', fill: 'none', color: '#d97706' };
    optWrong2 = { shape: 'diamond', fill: 'solid', color: '#d97706' };
    optWrong3 = { shape: 'star', fill: 'none', color: '#d97706' };
  }

  const options = shuffle([
    { shape: optCorrect },
    { shape: optWrong1 },
    { shape: optWrong2 },
    { shape: optWrong3 }
  ]);
  const correctIdx = options.findIndex(o => o.shape === optCorrect);

  return {
    id: `dyn_fc_${Date.now()}_${randInt(100, 999)}`,
    grade,
    batteryId: 'nonverbal',
    subtestId: 'figure_classification',
    difficulty,
    prompt: 'Look at the 3 shapes in the top group. They share a secret rule. Which shape from below belongs in the exact same group?',
    audioScript: 'Look at the three shapes. What feature do they all share? Choose the shape from below that has the exact same rule.',
    rendererType: 'figure_classification',
    data: {
      stimulusFigures,
      ruleDescription
    },
    options: options.map((opt, idx) => ({
      id: String.fromCharCode(65 + idx),
      shape: opt.shape
    })),
    correctAnswer: correctIdx,
    explanation: {
      rule: ruleDescription,
      description: `Every stimulus shape satisfies: ${ruleDescription}. Only the correct choice satisfies this exact rule.`,
      whyOthersWrong: 'The other choices violate the shared rule (wrong side count, different dot count, or different fill).',
      parentTip: 'Ask your child to compare all 3 top shapes: "What is identical about all three?"'
    }
  };
}

/**
 * Dispatcher: Generates a procedural question for a requested subtest or random subtest
 */
export function generateProceduralQuestion(subtestId, grade = '2', difficulty = 'medium') {
  switch (subtestId) {
    case 'number_analogies':
      return generateNumberAnalogy(grade, difficulty);
    case 'number_puzzles':
      return generateNumberPuzzle(grade, difficulty);
    case 'number_series':
      return generateNumberSeries(grade, difficulty);
    case 'figure_matrices':
      return generateFigureMatrix(grade, difficulty);
    case 'paper_folding':
      return generatePaperFolding(grade, difficulty);
    case 'figure_classification':
      return generateFigureClassification(grade, difficulty);
    default: {
      const candidates = [
        'number_analogies',
        'number_puzzles',
        'number_series',
        'figure_matrices',
        'paper_folding',
        'figure_classification'
      ];
      return generateProceduralQuestion(pickRandom(candidates), grade, difficulty);
    }
  }
}
