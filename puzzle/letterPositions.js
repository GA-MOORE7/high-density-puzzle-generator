// letterPositions.js
export function getGridAsObjects(letterArray, rowSize) {
    return letterArray.map((cellData, index) => {
      const x = index % rowSize;
      const y = Math.floor(index / rowSize);
  
      if (cellData) {
        return {
          x,
          y,
          letter: cellData.letter ?? null,
          word: cellData.word ?? null,
          vertical: cellData.vertical ?? null,
          intersectsWith: cellData.intersectsWith ?? null  // 👈 Add this line
        };
      } else {
        return { x, y, letter: null, word: null, vertical: null, intersectsWith: null };
      }
    });
  }
  




