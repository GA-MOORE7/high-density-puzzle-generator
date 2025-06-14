export function createWordsObjectFromGrid(puzzleGrid) {
  // Step 1: Collect all unique word IDs from both `word` and `intersectsWith`
  const wordSet = new Set();

  puzzleGrid.forEach(cell => {
    if (typeof cell.word === 'string') wordSet.add(cell.word);

    if (Array.isArray(cell.intersectsWith)) {
      cell.intersectsWith.forEach(w => wordSet.add(w));
    } else if (typeof cell.intersectsWith === 'string') {
      wordSet.add(cell.intersectsWith);
    }
  });

  const uniqueWords = [...wordSet];

  // Step 2: Create the wordsObject container
  const wordsObject = {};

  // Step 3: For each word ID
  uniqueWords.forEach(wordId => {
    // Get all cells that are part of this word, directly or via intersection
    const wordCells = puzzleGrid.filter(cell =>
      cell.word === wordId ||
      (Array.isArray(cell.intersectsWith) && cell.intersectsWith.includes(wordId)) ||
      cell.intersectsWith === wordId
    );

    if (wordCells.length === 0) return;

    // Step 4: Find the anchor cell (where this word is defined)
    const anchorCell = wordCells.find(c => c.word === wordId);
    if (!anchorCell) return;

    const direction = anchorCell.vertical ? "down" : "across";

    // Step 5: Sort cells based on reading order
    wordCells.sort((a, b) => {
      if (direction === "across") {
        if (a.y !== b.y) return a.y - b.y;
        return a.x - b.x;
      } else {
        if (a.x !== b.x) return a.x - b.x;
        return a.y - b.y;
      }
    });

    // Step 6: Compose the target word string from letters in order
    const targetWord = wordCells.map(c => c.letter).join("");

    // Step 7: Build the letter count map
    const letterCountMap = {};
    for (const letter of targetWord) {
      letterCountMap[letter] = (letterCountMap[letter] || 0) + 1;
    }

    // Step 8: Build cells metadata
    const cells = wordCells.map(cell => ({
      x: cell.x,
      y: cell.y,
      intersectsWith: cell.intersectsWith || null
    }));

    // Step 9: Store word object
    wordsObject[wordId] = {
      id: wordId,
      direction,
      startX: anchorCell.x,
      startY: anchorCell.y,
      targetWord,
      cells,
      letterCountMap,
      tempColors: new Array(wordCells.length).fill(null)
    };
  });

  return wordsObject;
}



