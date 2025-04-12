import { generateGrid } from "./generateGrid.js";
import { arrayGenerator } from "./letterArraySize.js";
import { placeInitialWord } from "./placeInitialWord.js";
import { words } from "./wordData.js";
import { getGridAsObjects } from "./letterPositions.js";
import { validIntersections } from "./validIntersections.js";
import { placeWordAtPosition } from "./addWord.js";

const rowSize = 7;
const letterArray = arrayGenerator(rowSize);
generateGrid(letterArray);
placeInitialWord(letterArray, rowSize, words[0], false, false);

const gridObjects = getGridAsObjects(letterArray, rowSize);
const validSpots = validIntersections("grape", gridObjects, rowSize);
const chosenSpot = validSpots[0];
placeWordAtPosition("grape", letterArray, rowSize, chosenSpot);

const gridObjects_2 = getGridAsObjects(letterArray, rowSize);
const validSpots_2 = validIntersections("cherry", gridObjects_2, rowSize);
const chosenSpot_2 = validSpots_2[0];
placeWordAtPosition("cherry", letterArray, rowSize, chosenSpot_2);

const gridObjects_3 = getGridAsObjects(letterArray, rowSize);
const validSpots_3 = validIntersections("egg", gridObjects_3, rowSize);
const chosenSpot_3 = validSpots_3[0];
placeWordAtPosition("egg", letterArray, rowSize, chosenSpot_3);




generateGrid(letterArray);
const updatedGridObjects = getGridAsObjects(letterArray, rowSize);
console.log(updatedGridObjects);
