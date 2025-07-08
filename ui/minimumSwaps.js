export function countMinimumSwapsToSolve(puzzleGrid, gridWidth = 9) {
  const flat = puzzleGrid.map(cell => cell.displayedLetter);
  const target = puzzleGrid.map(cell => cell.expectedLetter);
  const swaps = [];
  const visited = new Array(flat.length).fill(false);

  // Map each letter in target to its possible indices
  const letterToIndices = {};
  for (let i = 0; i < target.length; i++) {
    const letter = target[i];
    if (!letterToIndices[letter]) letterToIndices[letter] = [];
    letterToIndices[letter].push(i);
  }

  // Build target position map
  const positionMap = new Array(flat.length);
  const used = new Array(flat.length).fill(false);
  for (let i = 0; i < flat.length; i++) {
    const letter = flat[i];
    const possibleIndices = letterToIndices[letter];
    if (possibleIndices) {
      for (let j = 0; j < possibleIndices.length; j++) {
        const targetIndex = possibleIndices[j];
        if (!used[targetIndex]) {
          used[targetIndex] = true;
          positionMap[i] = targetIndex;
          break;
        }
      }
    }
  }

  // Detect and execute swaps using cycles
  for (let i = 0; i < flat.length; i++) {
    if (visited[i] || positionMap[i] === i) continue;

    let cycle = [];
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      cycle.push(j);
      j = positionMap[j];
    }

    // Perform actual swaps for this cycle
    for (let k = 0; k < cycle.length - 1; k++) {
      const indexA = cycle[k];
      const indexB = cycle[k + 1];

      swaps.push({
        letterA: flat[indexA],
        xA: indexA % gridWidth,
        yA: Math.floor(indexA / gridWidth),

        letterB: flat[indexB],
        xB: indexB % gridWidth,
        yB: Math.floor(indexB / gridWidth)
      });

      // Simulate the swap in flat
      [flat[indexA], flat[indexB]] = [flat[indexB], flat[indexA]];
    }
  }

  return {
    swapCount: swaps.length,
    swapSteps: swaps
  };
}

