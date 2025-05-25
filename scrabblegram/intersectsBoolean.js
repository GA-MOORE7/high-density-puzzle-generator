export function addIntersectionFlagFromDOM() {
  const gridItems = document.querySelectorAll('.grid-item');
  const intersectionMap = {};

  gridItems.forEach(item => {
    // Check if the id contains 'intersectsWith-'
    const intersects = item.id.includes('intersectsWith-');
    
    // Extract coordinates from id, assuming format like "x-2 y-3 ..."
    const coordsMatch = item.id.match(/x-(\d+)\s+y-(\d+)/);
    if (!coordsMatch) return;

    const x = coordsMatch[1];
    const y = coordsMatch[2];
    const key = `${x},${y}`;

    intersectionMap[key] = { intersects };
  });

  return intersectionMap;
}


