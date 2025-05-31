import { getDisplayedLetterMap } from './displayedLetter.js';
import { getPrimaryWordMap } from './primaryWord.js';
import { addIntersectionFlagFromDOM } from './intersectionModule.js';

export function addDisplayedLetterCount() {
  const displayedLetterMap = getDisplayedLetterMap();
  const primaryWordMap = getPrimaryWordMap();
  const intersectionMap = addIntersectionFlagFromDOM();

  const wordToLetters = {};

  // Collect letters per word including intersections
  for (const key in displayedLetterMap) {
    const displayedLetter = displayedLetterMap[key]?.displayedLetter?.toLowerCase() || null;
    const primaryWord = primaryWordMap[key]?.primaryWord || null;

    const intersectsData = intersectionMap[key] || {};
    const intersectsWith = intersectsData.intersectsWith ? [intersectsData.intersectsWith] : [];

    if (displayedLetter) {
      if (primaryWord) {
        if (!wordToLetters[primaryWord]) wordToLetters[primaryWord] = [];
        wordToLetters[primaryWord].push(displayedLetter);
      }
      intersectsWith.forEach(word => {
        if (!wordToLetters[word]) wordToLetters[word] = [];
        wordToLetters[word].push(displayedLetter);
      });
    }
  }

  const countMap = {};
  for (const key in displayedLetterMap) {
    const displayedLetter = displayedLetterMap[key]?.displayedLetter?.toLowerCase() || null;
    if (!displayedLetter) {
      countMap[key] = { displayedLetterCount: 0 };
      continue;
    }

    const primaryWord = primaryWordMap[key]?.primaryWord || null;
    const intersectsData = intersectionMap[key] || {};
    const intersectsWith = intersectsData.intersectsWith ? [intersectsData.intersectsWith] : [];

    const counts = [];

    if (primaryWord && wordToLetters[primaryWord]) {
      counts.push(wordToLetters[primaryWord].filter(l => l === displayedLetter).length);
    }

    intersectsWith.forEach(word => {
      if (wordToLetters[word]) {
        counts.push(wordToLetters[word].filter(l => l === displayedLetter).length);
      }
    });

    countMap[key] = { displayedLetterCount: counts.length ? Math.max(...counts) : 0 };
  }

  return countMap;
}
