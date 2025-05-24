import { getDisplayedLetterMap } from './displayedLetter.js';
import { getPrimaryWordMap } from './primaryWord.js';

function countLetterInWord(letter, word) {
  if (!letter || !word) return 0;
  let count = 0;
  for (const char of word) {
    if (char === letter) count++;
  }
  return count;
}

export function addExpectedLetterCount() {
  const displayedLetterMap = getDisplayedLetterMap();
  const primaryWordMap = getPrimaryWordMap();

  const countMap = {};

  for (const key in displayedLetterMap) {
    const displayedLetter = displayedLetterMap[key]?.displayedLetter || null;
    const primaryWord = primaryWordMap[key]?.primaryWord || null;
    const count = countLetterInWord(displayedLetter, primaryWord);

    countMap[key] = { expectedLetterCount: count };
  }

  return countMap;
}
