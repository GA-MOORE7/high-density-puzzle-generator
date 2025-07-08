export function scrambleDisplayedLetters(grid) {
  const wordMap = new Map();

  // Step 0: Build a mapping of word -> list of cells
  for (const cell of grid) {
    if (cell.word) {
      if (!wordMap.has(cell.word)) {
        wordMap.set(cell.word, []);
      }
      wordMap.get(cell.word).push(cell);
    }
  }

grid.forEach(cell => {
  if (cell.hasOwnProperty('letter')) {
    if (cell.letter) {
      cell.expectedLetter = cell.letter;
    } else {
      cell.expectedLetter = null;
    }
    delete cell.letter;
  } else {
    cell.expectedLetter = null;
  }
});


  // Step 1: Swap two random letters within each word
  for (const cells of wordMap.values()) {
    if (cells.length >= 2) {
      const i = Math.floor(Math.random() * cells.length);
      let j;
      do {
        j = Math.floor(Math.random() * cells.length);
      } while (j === i);

      // Swap displayed letters
      [cells[i].displayedLetter, cells[j].displayedLetter] = [cells[j].expectedLetter, cells[i].expectedLetter];
    } else {
      // Only one letter — nothing to swap
      cells[0].displayedLetter = cells[0].expectedLetter;
    }
  }

  // Step 2: Cross-word letter swapping
  const words = Array.from(wordMap.keys());
  for (let i = 0; i < words.length - 1; i++) {
    const wordA = words[i];
    const wordB = words[i + 1];

    const cellsA = wordMap.get(wordA);
    const cellsB = wordMap.get(wordB);

    const randA = Math.floor(Math.random() * cellsA.length);
    const randB = Math.floor(Math.random() * cellsB.length);

    const cellA = cellsA[randA];
    const cellB = cellsB[randB];

    [cellA.displayedLetter, cellB.displayedLetter] = [cellB.displayedLetter, cellA.displayedLetter];
  }

  // Step 3: Ensure all cells have displayedLetter populated
  grid.forEach(cell => {
    if (!cell.displayedLetter && cell.expectedLetter) {
      cell.displayedLetter = cell.expectedLetter;
    }
  });
}
