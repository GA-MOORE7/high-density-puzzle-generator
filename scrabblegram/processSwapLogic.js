// logic/swapLetters.js
import { evaluateWord } from './evaluateWord.js';
import { mergeColors } from './mergeColors.js';

export function processSwapLogic(cellA, cellB) {
  // Swap displayed letters
  const temp = cellA.displayedLetter;
  cellA.displayedLetter = cellB.displayedLetter;
  cellB.displayedLetter = temp;

  // Get unique words affected
  const affectedWords = new Set([
    cellA.acrossWord, cellA.downWord,
    cellB.acrossWord, cellB.downWord
  ].filter(Boolean));

  // Re-evaluate affected words
  for (const word of affectedWords) {
    evaluateWord(word);
    word.cells.forEach((cell, idx) => {
      if (word.direction === 'across') {
        cell.tempColorAcross = word.tempColors[idx];
      } else {
        cell.tempColorDown = word.tempColors[idx];
      }
    });
  }

  // Update final color per cell
  for (const word of affectedWords) {
    word.cells.forEach(cell => {
      cell.finalColor = mergeColors(cell.tempColorAcross, cell.tempColorDown);
    });
  }
}