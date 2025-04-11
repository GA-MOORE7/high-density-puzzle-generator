// validIntersections.js

export function validIntersections(word, gridObjects, rowSize) {
  const validPlacements = [];

  for (let i = 0; i < word.length; i++) {
    const char = word[i];

    gridObjects.forEach(cell => {
      if (cell.letter === char) {
        const intersectX = cell.x;
        const intersectY = cell.y;

        // Vertical
        const startY = intersectY - i;
        if (startY >= 0 && startY + word.length <= rowSize) {
          let isValid = true;
          for (let j = 0; j < word.length; j++) {
            const targetY = startY + j;
            const match = gridObjects.find(c => c.x === intersectX && c.y === targetY);
            if (match.letter && match.letter !== word[j]) {
              isValid = false;
              break;
            }
          }
          if (isValid) {
            validPlacements.push({
              word,
              vertical: true,
              x: intersectX,
              y: startY,
              intersectsAt: { x: intersectX, y: intersectY }
            });
          }
        }

        // Horizontal
        const startX = intersectX - i;
        if (startX >= 0 && startX + word.length <= rowSize) {
          let isValid = true;
          for (let j = 0; j < word.length; j++) {
            const targetX = startX + j;
            const match = gridObjects.find(c => c.x === targetX && c.y === intersectY);
            if (match.letter && match.letter !== word[j]) {
              isValid = false;
              break;
            }
          }
          if (isValid) {
            validPlacements.push({
              word,
              vertical: false,
              x: startX,
              y: intersectY,
              intersectsAt: { x: intersectX, y: intersectY }
            });
          }
        }
      }
    });
  }

  return validPlacements;
}
