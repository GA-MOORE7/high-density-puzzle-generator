import { getDisplayedLetterMap } from './displayedLetter.js';
import { getPrimaryWordMap } from './primaryWord.js';

export function addDisplayedLetterCount() {
  const displayedLetterMap = getDisplayedLetterMap();
  const primaryWordMap = getPrimaryWordMap();

  // Group displayed letters by primaryWord
  const wordToLetters = {};

  // Collect displayed letters for each primaryWord
  for (const key in displayedLetterMap) {
    const displayedLetter = displayedLetterMap[key]?.displayedLetter || null;
    const primaryWord = primaryWordMap[key]?.primaryWord || null;

    if (primaryWord && displayedLetter) {
      if (!wordToLetters[primaryWord]) {
        wordToLetters[primaryWord] = [];
      }
      wordToLetters[primaryWord].push(displayedLetter.toLowerCase());
    }
  }

  // Now create a map with counts per cell key
  const countMap = {};

  for (const key in displayedLetterMap) {
    const displayedLetter = displayedLetterMap[key]?.displayedLetter || null;
    const primaryWord = primaryWordMap[key]?.primaryWord || null;

    if (primaryWord && displayedLetter) {
      // Count how many times displayedLetter appears in that word's displayed letters
      const lettersArray = wordToLetters[primaryWord] || [];
      const count = lettersArray.filter(letter => letter === displayedLetter.toLowerCase()).length;

      countMap[key] = { displayedLetterCount: count };
    } else {
      countMap[key] = { displayedLetterCount: 0 };
    }
  }

  return countMap;
}
