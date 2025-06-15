// evaluateWord.js
import { buildLetterCountMap } from './buildLetterCountMap.js';

export function evaluateWord(wordObj) {
  const { targetWord, cells } = wordObj;
  const letterCountMap = buildLetterCountMap(targetWord);
  const greenMatched = {};
  const brownMatched = {};
  const colors = Array(targetWord.length).fill('');

  // First pass: green letters
  for (let i = 0; i < targetWord.length; i++) {
    const expected = targetWord[i];
    const actual = cells[i].displayedLetter;
    if (actual === expected) {
      colors[i] = 'green';
      greenMatched[actual] = (greenMatched[actual] || 0) + 1;
    }
  }

  // Second pass: brown and red
  for (let i = 0; i < targetWord.length; i++) {
    if (colors[i]) continue; // already green
    const actual = cells[i].displayedLetter;
    const totalAvailable = letterCountMap[actual] || 0;
    const used = (greenMatched[actual] || 0) + (brownMatched[actual] || 0);

    if (totalAvailable > used) {
      colors[i] = 'brown';
      brownMatched[actual] = (brownMatched[actual] || 0) + 1;
    } else {
      colors[i] = 'red';
    }
  }

  wordObj.tempColors = colors;
}