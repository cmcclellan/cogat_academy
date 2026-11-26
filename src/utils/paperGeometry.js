// All fold diagrams, answer choices, and demonstrations share these coordinates.
export const PAPER = [[10, 10], [90, 10], [90, 90], [10, 90]];

export function reflectHole(hole, fold) {
  if (fold === 'right' || fold === 'left') return { ...hole, x: 100 - hole.x };
  if (fold === 'up' || fold === 'down') return { ...hole, y: 100 - hole.y };
  if (fold === 'diagonal') return { ...hole, x: hole.y, y: hole.x };
  if (fold === 'anti_diagonal') return { ...hole, x: 100 - hole.y, y: 100 - hole.x };
  throw new Error(`Unsupported fold: ${fold}`);
}

export function uniqueHoles(holes) {
  return [...new Map(holes.map(h => [`${h.x},${h.y},${h.r || 5}`, h])).values()];
}

export function unfoldHoles(holes, fold) {
  return uniqueHoles([...holes, ...holes.map(h => reflectHole(h, fold))]);
}

function clipPaper(polygon, fold) {
  const distances = {
    right: ([x]) => x - 50, left: ([x]) => 50 - x,
    up: ([, y]) => 50 - y, down: ([, y]) => y - 50,
    diagonal: ([x, y]) => y - x, anti_diagonal: ([x, y]) => 100 - x - y
  };
  const distance = distances[fold];
  if (!distance) throw new Error(`Unsupported fold: ${fold}`);
  const result = [];
  polygon.forEach((a, i) => {
    const b = polygon[(i + 1) % polygon.length];
    const da = distance(a), db = distance(b);
    if (da >= 0) result.push(a);
    if ((da < 0) !== (db < 0)) {
      const t = da / (da - db);
      result.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
    }
  });
  return result;
}

export function buildPaperData(folds, punch) {
  let polygon = PAPER;
  const steps = folds.map(fold => {
    const before = polygon;
    polygon = clipPaper(polygon, fold);
    return { type: 'fold', foldDirection: fold, before, polygon,
      caption: { right: 'Fold left to right', left: 'Fold right to left', up: 'Fold bottom to top',
        down: 'Fold top to bottom', diagonal: 'Fold across the diagonal toward the lower left',
        anti_diagonal: 'Fold across the diagonal toward the upper left' }[fold] };
  });
  steps.push({ type: 'punch', polygon, hole: punch, caption: 'Punch through the folded paper' });
  let holes = [punch];
  const unfolding = [{ polygon, holes, caption: 'Start with the punched paper' }];
  for (let i = folds.length - 1; i >= 0; i--) {
    holes = unfoldHoles(holes, folds[i]);
    unfolding.push({ polygon: steps[i].before, holes, caption: `Undo fold ${i + 1}` });
  }
  const creases = folds.map(f => ({ right: 'vertical', left: 'vertical', up: 'horizontal', down: 'horizontal',
    diagonal: 'diagonal-main', anti_diagonal: 'diagonal-other' })[f]);
  return { folds, punch, steps, creases, finalUnfoldedHoles: holes, unfolding };
}

const rounded = n => Math.round(n * 1000000) / 1000000;
export function polygonArea(points) {
  return Math.abs(points.reduce((sum, p, i) => {
    const next = points[(i + 1) % points.length];
    return sum + p[0] * next[1] - next[0] * p[1];
  }, 0)) / 2;
}

// Convex clipping turns a cut crossing a paper edge into the material actually removed.
export function clipCutToPaper(cut, paper) {
  const signedArea = paper.reduce((sum, p, i) => {
    const next = paper[(i + 1) % paper.length];
    return sum + p[0] * next[1] - next[0] * p[1];
  }, 0);
  const orientation = signedArea >= 0 ? 1 : -1;
  let result = cut.points.map(p => [...p]);
  for (let i = 0; i < paper.length && result.length; i++) {
    const a = paper[i], b = paper[(i + 1) % paper.length];
    const distance = p => orientation * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
    const input = result;
    result = [];
    input.forEach((p, index) => {
      const q = input[(index + 1) % input.length];
      const dp = distance(p), dq = distance(q);
      if (dp >= -1e-8) result.push(p);
      if ((dp < -1e-8) !== (dq < -1e-8)) {
        const t = dp / (dp - dq);
        result.push([rounded(p[0] + t * (q[0] - p[0])), rounded(p[1] + t * (q[1] - p[1]))]);
      }
    });
  }
  result = result.filter((p, i) => i === 0 || p[0] !== result[i - 1][0] || p[1] !== result[i - 1][1]);
  if (result.length > 1 && result[0][0] === result.at(-1)[0] && result[0][1] === result.at(-1)[1]) result.pop();
  return result.length >= 3 && polygonArea(result) > 1e-7 ? { points: result } : null;
}

export function cutKey(cut) {
  const values = cut.points.map(([x, y]) => `${rounded(x)},${rounded(y)}`);
  const variants = [];
  for (const order of [values, [...values].reverse()]) {
    for (let i = 0; i < order.length; i++) variants.push([...order.slice(i), ...order.slice(0, i)].join(';'));
  }
  return variants.sort()[0];
}

export function uniqueCuts(cuts) {
  return [...new Map(cuts.map(cut => [cutKey(cut), cut])).values()];
}

export function reflectCut(cut, fold) {
  return { points: cut.points.map(([x, y]) => {
    const point = reflectHole({ x, y }, fold);
    return [rounded(point.x), rounded(point.y)];
  }) };
}

export function unfoldCuts(cuts, fold) {
  return uniqueCuts([...cuts, ...cuts.map(cut => reflectCut(cut, fold))]);
}

export function buildPaperCutData(folds, cuts) {
  // Reuse the exact fold polygons and sequence used by legacy circular punches.
  const folded = buildPaperData(folds, { x: 50, y: 50 });
  const steps = folded.steps.slice(0, -1);
  const polygon = folded.steps.at(-1).polygon;
  const clipped = uniqueCuts(cuts.map(cut => clipCutToPaper(cut, polygon)).filter(Boolean));
  if (clipped.length !== cuts.length) throw new Error('Every cut must remove a distinct nonempty piece of folded paper.');
  steps.push({ type: 'cut', polygon, cuts: clipped, caption: 'Cut out the marked pieces through every layer' });
  let opened = clipped;
  const unfolding = [{ polygon, cuts: opened, caption: 'Start with the cut paper' }];
  for (let i = folds.length - 1; i >= 0; i--) {
    opened = unfoldCuts(opened, folds[i]);
    unfolding.push({ polygon: steps[i].before, cuts: opened, caption: `Undo fold ${i + 1}` });
  }
  return { folds, cuts: clipped, steps, creases: folded.creases, finalUnfoldedCuts: opened, unfolding };
}
