import { generateGrid } from "./generateGrid.js";
import { arrayGenerator } from "./letterArraySize.js";
import { placeInitialWord } from "./placeInitialWord.js";
import { words } from "./wordData.js";
import { getGridAsObjects } from "./letterPositions.js";
import { validIntersections } from "./validIntersections.js";
import { placeWordAtPosition } from "./addWord.js";
import { enableLetterSwapping } from "../scrabblegram/clickLetterSwap.js";
import { colorMatchingLetters } from "../scrabblegram/colorMatchingLetters.js";


const rowSize = 7;
const attempts = 1000;
const totalCells = rowSize * rowSize;
const results = [];

let initialWordIndex = 0; // Start with the first word in the array

for (let run = 0; run < attempts; run++) {
  // Ensure the initial word increments by 1 each time
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

  const filledCells = letterArray.flat().filter(cell => cell.letter && cell.letter !== "").length;
  const density = filledCells / totalCells;

  results.push({
    grid: JSON.parse(JSON.stringify(letterArray)), // Deep copy to preserve this run
    filledCells,
    density,
    run
  });

  // Increment the initial word index to the next word for the next run
  initialWordIndex = (initialWordIndex + 1) % words.length; // Wrap around if it exceeds the array length
}

// Sort by highest density
results.sort((a, b) => b.density - a.density);

// Log the top grid
const best = results[0];
console.log(`🏆 Best Grid (Run #${best.run}):`);
console.log(best.grid);
console.log(`Filled cells: ${best.filledCells} / ${totalCells}`);
console.log(`Grid density: ${best.density.toFixed(2)}`);

// Optionally display best grid
generateGrid(best.grid);
enableLetterSwapping();
colorMatchingLetters();




