import { generateGrid } from "./generateGrid.js";
import { arrayGenerator } from "./letterArraySize.js";
import { placeInitialWord } from "./placeInitialWord.js";
import { words } from "./wordData.js";
import { getGridAsObjects } from "./letterPositions.js";
import { validIntersections } from "./validIntersections.js";
import { placeWordAtPosition } from "./addWord.js";
import { enableLetterSwapping } from "../scrabblegram/clickLetterSwap.js";
import { createWordsObjectFromGrid } from "../scrabblegram/wordsObject.js";
import { assignTempColors } from "../scrabblegram/assignTempColors.js";  // <-- Added import

const rowSize = 7;
const attempts = 1000;
const totalCells = rowSize * rowSize;
const results = [];

let initialWordIndex = 0; // Start with the first word in the array

for (let run = 0; run < attempts; run++) {
  const initialWord = words[initialWordIndex];
  
  const letterArray = arrayGenerator(rowSize);
  placeInitialWord(letterArray, rowSize, initialWord, true, false);

  const placedWords = new Set();
  const wordAttempts = {};
  placedWords.add(initialWord);

  for (let pass = 0; pass < 100; pass++) {
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      if (placedWords.has(word)) continue;

      const attempts = wordAttempts[word] || 0;
      if (attempts >= 3) continue;
      wordAttempts[word] = attempts + 1;

      const gridObjects = getGridAsObjects(letterArray, rowSize);
      const validSpots = validIntersections(word, gridObjects, rowSize);

      if (validSpots.length > 0) {
        const chosenSpot = validSpots[Math.floor(Math.random() * validSpots.length)];
        placeWordAtPosition(word, letterArray, rowSize, chosenSpot);
        placedWords.add(word);
      }
    }
  }

  const filledCells = letterArray.flat().filter(cell => {
    if (typeof cell === 'object' && cell !== null) return cell.letter && cell.letter !== "";
    return false;
  }).length;
  const density = filledCells / totalCells;

  // Normalize entire grid here
  const normalizedGrid = getGridAsObjects(letterArray, rowSize);

  // ✅ Add displayedLetter property (can scramble later if needed)
  normalizedGrid.forEach(cell => {
    if (cell.letter) {
      cell.displayedLetter = cell.letter; // You can scramble this later
    } else {
      cell.displayedLetter = null;
    }
  });

  results.push({
    grid: normalizedGrid,
    filledCells,
    density,
    run
  });

  initialWordIndex = (initialWordIndex + 1) % words.length;
}

results.sort((a, b) => b.density - a.density);

const best = results[0];
console.log(`🏆 Best Grid (Run #${best.run}):`);
console.log(best.grid);
console.log(`Filled cells: ${best.filledCells} / ${totalCells}`);
console.log(`Grid density: ${best.density.toFixed(2)}`);

generateGrid(best.grid);

const wordsObject = createWordsObjectFromGrid(best.grid);
assignTempColors(wordsObject, best.grid);   // <-- Added this call

console.log("📚 Words Object with tempColors:", wordsObject);

enableLetterSwapping(best.grid, wordsObject);










