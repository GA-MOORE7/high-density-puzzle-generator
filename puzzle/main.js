import { generateGrid } from "./generateGrid.js";
import { arrayGenerator } from "./letterArraySize.js";
import { placeInitialWord } from "./placeInitialWord.js";
import { words } from "./wordData.js";
import { getGridAsObjects } from "./letterPositions.js";
import { validIntersections } from "./validIntersections.js";
import { placeWordAtPosition } from "./addWord.js";

const rowSize = 10;
const letterArray = arrayGenerator(rowSize);
generateGrid(letterArray);
placeInitialWord(letterArray, rowSize, words[0], false, false);

const gridObjects = getGridAsObjects(letterArray, rowSize);
const validSpots = validIntersections("banana", gridObjects, rowSize);
const chosenSpot = validSpots[0];
placeWordAtPosition("banana", letterArray, rowSize, chosenSpot);

generateGrid(letterArray);
const updatedGridObjects = getGridAsObjects(letterArray, rowSize);
console.log(updatedGridObjects);
