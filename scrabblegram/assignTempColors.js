export function assignTempColors(wordsObject, puzzleGrid) {
  Object.values(wordsObject).forEach(wordEntry => {
    const { targetWord, cells } = wordEntry;

    const displayedLetters = cells.map(({ x, y }) => {
      const gridCell = puzzleGrid.find(c => c.x === x && c.y === y);
      return gridCell?.displayedLetter?.toLowerCase() || '';
    });

    // First pass: greens
    const tempColors = Array(targetWord.length).fill(null);
    const targetLetters = targetWord.split('');
    const letterUsage = {};

    for (let i = 0; i < targetLetters.length; i++) {
      if (displayedLetters[i] === targetLetters[i]) {
        tempColors[i] = 'green';
        letterUsage[targetLetters[i]] = (letterUsage[targetLetters[i]] || 0) + 1;
      }
    }

    // Second pass: browns or reds
    for (let i = 0; i < targetLetters.length; i++) {
      if (tempColors[i]) continue;

      const displayed = displayedLetters[i];
      const countInTarget = targetLetters.filter(l => l === displayed).length;
      const used = letterUsage[displayed] || 0;

      if (countInTarget > used) {
        tempColors[i] = 'brown';
        letterUsage[displayed] = used + 1;
      } else {
        tempColors[i] = 'red';
      }
    }

    wordEntry.tempColors = tempColors;
  });
}
