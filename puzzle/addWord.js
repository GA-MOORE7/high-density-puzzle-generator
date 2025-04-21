export function placeWordAtPosition(word, letterArray, rowSize, position) {
  const { x, y, vertical } = position;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    const targetX = vertical ? x : x + i;
    const targetY = vertical ? y + i : y;
    const index = targetY * rowSize + targetX;

    const existing = letterArray[index];

    // If the cell already has the same letter, it's an intersection
    if (existing && existing.letter === letter) {
      // Initialize intersectsWith if not present
      if (!existing.intersectsWith) {
        existing.intersectsWith = [];
      }

      // Only add the intersecting word if it's not the same as the current word
      if (word !== existing.word && !existing.intersectsWith.includes(word)) {
        existing.intersectsWith.push(word);
      }

      // Preserve the existing letter, update intersectsWith
      letterArray[index] = {
        ...existing,
        intersectsWith: existing.intersectsWith,
      };
    } else {
      // Fresh placement
      letterArray[index] = {
        letter,
        word,
        vertical,
        intersectsWith: null,
      };
    }
  }
}



