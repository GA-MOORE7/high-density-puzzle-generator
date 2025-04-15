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
          let intersects = false;

          for (let j = 0; j < word.length; j++) {
            const targetY = startY + j;
            const match = gridObjects.find(c => c.x === intersectX && c.y === targetY);
            if (match.letter && match.letter !== word[j]) {
              isValid = false;
              break;
            }
            if (match.letter === word[j]) intersects = true;

            // Check adjacent cells
            const left = gridObjects.find(c => c.x === intersectX - 1 && c.y === targetY);
            const right = gridObjects.find(c => c.x === intersectX + 1 && c.y === targetY);
            if ((left && left.letter) || (right && right.letter)) {
              if (!match.letter) {
                isValid = false;
                break;
              }
            }
          }

          // Check start/end boundaries
          const before = gridObjects.find(c => c.x === intersectX && c.y === startY -1);
          const after = gridObjects.find(c => c.x === intersectX && c.y === startY + word.length);
          if ((before && before.letter) || (after && after.letter)) isValid = false;


          if (isValid && intersects) {
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
          let intersects = false;

          for (let j = 0; j < word.length; j++) {
            const targetX = startX + j;
            const match = gridObjects.find(c => c.x === targetX && c.y === intersectY);
            if (match.letter && match.letter !== word[j]) {
              isValid = false;
              break;
            }
            if (match.letter === word[j]) intersects = true;

            // Check adjacent cells
            const above = gridObjects.find(c => c.x === targetX && c.y === intersectY -1);
            const below = gridObjects.find(c => c.x === targetX && c.y === intersectY + 1);
            if ((above && above.letter) || (below && below.letter)) {
              if (!match.letter) {
                isValid = false;
                break;
              }
            }
          }
        
          // Check start/end boundaries
          const before = gridObjects.find(c => c.x === startX -1 && c.y === intersectY);
          const after = gridObjects.find(c => c.x === startX + word.length && c.y === intersectY);
          if ((before && before.letter) || (after && after.letter)) isValid = false;

          if (isValid && intersects) {	
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
