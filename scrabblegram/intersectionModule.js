// intersectionModule.js

/**
 * Scans the DOM for grid cells and returns a map with intersection info.
 * Each key is "x,y" coordinates of a cell.
 * Value is an object:
 *  - intersects: boolean (whether this cell is shared between words)
 *  - intersectsWith: string|null (name of the intersecting word)
 */
export function addIntersectionFlagFromDOM() {
  const gridItems = document.querySelectorAll('.grid-item');
  const intersectionMap = {};

  gridItems.forEach(item => {
    const id = item.id;

    // Check if this grid cell intersects another word (has 'intersectsWith-' in id)
    const intersectsMatch = id.includes('intersectsWith-');

    // Extract coordinates from id in format "x-<num> y-<num>"
    const coordsMatch = id.match(/x-(\d+)\s+y-(\d+)/);
    if (!coordsMatch) return; // skip if no coords

    const x = coordsMatch[1];
    const y = coordsMatch[2];
    const key = `${x},${y}`;

    // Extract the intersecting word's name if present, otherwise null
    const intersectWordMatch = id.match(/intersectsWith-([a-z]+)/i);
    const intersectsWith = intersectWordMatch ? intersectWordMatch[1] : null;

    intersectionMap[key] = {
      intersects: intersectsMatch,
      intersectsWith: intersectsWith
    };
  });

  return intersectionMap;
}
