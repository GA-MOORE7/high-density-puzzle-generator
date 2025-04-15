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
placeInitialWord(letterArray, rowSize, words[0], true, false);

const gridObjects = getGridAsObjects(letterArray, rowSize);
const validSpots = validIntersections(words[1], gridObjects, rowSize);
const chosenSpot = validSpots[0];
placeWordAtPosition(words[1], letterArray, rowSize, chosenSpot);

const gridObjects_2 = getGridAsObjects(letterArray, rowSize);
const validSpots_2 = validIntersections(words[2], gridObjects_2, rowSize);
const chosenSpot_2 = validSpots_2[0];
placeWordAtPosition(words[2], letterArray, rowSize, chosenSpot_2);

const gridObjects_3 = getGridAsObjects(letterArray, rowSize);
const validSpots_3 = validIntersections(words[3], gridObjects_3, rowSize);
const chosenSpot_3 = validSpots_3[0];
placeWordAtPosition(words[3], letterArray, rowSize, chosenSpot_3);

const gridObjects_4 = getGridAsObjects(letterArray, rowSize);
const validSpots_4 = validIntersections(words[4], gridObjects_4, rowSize);
const chosenSpot_4 = validSpots_4[0];
placeWordAtPosition(words[4], letterArray, rowSize, chosenSpot_4);

// const gridObjects_5 = getGridAsObjects(letterArray, rowSize);
// const validSpots_5 = validIntersections(words[5], gridObjects_5, rowSize);
// const chosenSpot_5 = validSpots_5[0];
// placeWordAtPosition(words[5], letterArray, rowSize, chosenSpot_5);

// const gridObjects_6 = getGridAsObjects(letterArray, rowSize);
// const validSpots_6 = validIntersections(words[6], gridObjects_6, rowSize);
// const chosenSpot_6 = validSpots_6[0];
// placeWordAtPosition(words[6], letterArray, rowSize, chosenSpot_6);

// const gridObjects_7 = getGridAsObjects(letterArray, rowSize);
// const validSpots_7 = validIntersections(words[7], gridObjects_7, rowSize);
// const chosenSpot_7 = validSpots_7[0];
// placeWordAtPosition(words[7], letterArray, rowSize, chosenSpot_7);




generateGrid(letterArray);
const updatedGridObjects = getGridAsObjects(letterArray, rowSize);
console.log(updatedGridObjects);
