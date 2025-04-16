import { generateGrid } from "./generateGrid.js";
import { arrayGenerator } from "./letterArraySize.js";
import { placeInitialWord } from "./placeInitialWord.js";
import { words } from "./wordData.js";
import { getGridAsObjects } from "./letterPositions.js";
import { validIntersections } from "./validIntersections.js";
import { placeWordAtPosition } from "./addWord.js";

const rowSize = 12;
const letterArray = arrayGenerator(rowSize);

// Step 1: Place the initial word
placeInitialWord(letterArray, rowSize, words[0], true, false);

// Step 2: Try to place remaining words up to 10 times, but only once per word
const maxPasses = 100;
const placedWords = new Set();
placedWords.add(words[0]); // Mark the first word as placed

for (let pass = 0; pass < maxPasses; pass++) {
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        if (placedWords.has(word)) continue; // Skip if already placed

         const gridObjects = getGridAsObjects(letterArray, rowSize);
         const validSpots = validIntersections(word, gridObjects, rowSize);

         if (validSpots.length > 0) {

            const chosenSpot = validSpots[0];
            placeWordAtPosition(word, letterArray, rowSize, chosenSpot);
            placedWords.add(word);
         }
    }
}

// Step 3: Fill empty cells with letters
generateGrid(letterArray);
console.log(getGridAsObjects(letterArray, rowSize))

// Step 4: Calculate and display grid density
const totalCells = rowSize * rowSize;
const filledCells = letterArray.flat().filter(cell => cell.letter && cell.letter !== "").length;
const density = (filledCells / totalCells).toFixed(2);
console.log(`Filled cells: ${filledCells} / ${totalCells}`);
console.log(`Grid density: ${density}`);


