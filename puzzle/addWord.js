// addWord.js

export function placeWordAtPosition(word, letterArray, rowSize, position) {
  const { x, y, vertical } = position;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    const targetX = vertical ? x : x + i;
    const targetY = vertical ? y + i : y;
    const index = targetY * rowSize + targetX;

    letterArray[index] = {
      letter,
      word,
      vertical
    };
  }
}


