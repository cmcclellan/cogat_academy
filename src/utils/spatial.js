const angle = rotation => ((rotation % 360) + 360) % 360;

export function translateScene(scene, dx, dy) {
  return { elements: scene.elements.map(element => ({ ...element, x: element.x + dx, y: element.y + dy })) };
}

export function reflectScene(scene, axis) {
  if (!['vertical', 'horizontal'].includes(axis)) throw new Error(`Unsupported reflection: ${axis}`);
  return { elements: scene.elements.map(element => ({ ...element,
    x: axis === 'vertical' ? 100 - element.x : element.x,
    y: axis === 'horizontal' ? 100 - element.y : element.y,
    ...(['arrow', 'triangle'].includes(element.shape) ? {
      rotation: angle(axis === 'vertical' ? -(element.rotation || 0) : 180 - (element.rotation || 0))
    } : {})
  })) };
}

export function swapScenePositions(scene, first = 0, second = 1) {
  const a = scene.elements[first], b = scene.elements[second];
  return { elements: scene.elements.map((element, index) => index === first ? { ...element, x: b.x, y: b.y }
    : index === second ? { ...element, x: a.x, y: a.y } : { ...element }) };
}

export function sceneKey(scene) {
  return scene.elements.map(e => JSON.stringify({ shape: e.shape, x: e.x, y: e.y,
    size: e.size, fill: e.fill || 'outline', rotation: ['arrow', 'triangle'].includes(e.shape) ? angle(e.rotation || 0) : 0 }))
    .sort().join('|');
}

export function sceneWithinFrame(scene) {
  return scene.elements.every(e => e.x - e.size / 2 >= 5 && e.x + e.size / 2 <= 95
    && e.y - e.size / 2 >= 5 && e.y + e.size / 2 <= 95);
}
