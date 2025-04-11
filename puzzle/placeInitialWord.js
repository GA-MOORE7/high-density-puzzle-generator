import { generateGrid } from "./generateGrid.js";

/**
 * Places the initial word in the grid
 * @param {string[]} letterArray - the grid array.
 * @param {number} rowSize - the number of columns per row.
 * @param {string} word - the initial word.
 * @param {boolean} vertical - Whether to place it vertically or horizontally.
 * @param {boolean} center - Whether to center the word.
 */

export function placeInitialWord(letterArray, rowSize, word, vertical = false, center = false) {
    let positionX, positionY;

    if (center) {

        // Centered placement
        positionX = vertical ? Math.floor(rowSize / 2) : Math.floor((rowSize - word.length) / 2);
        positionY = vertical ? Math.floor((rowSize - word.length) / 2) : Math.floor(rowSize / 2);

    } else {

        // Random placement
        positionX = vertical ? Math.floor(Math.random() * rowSize) : Math.floor(Math.random() * (rowSize - word.length +1));
        positionY = vertical ? Math.floor(Math.random() * (rowSize - word.length + 1)) : Math.floor(Math.random() * rowSize);

    }

    // Insert word into the grid
    for (let i = 0; i < word.length; i++) {
        let index = vertical ? (positionY + i) * rowSize + positionX : positionY * rowSize + (positionX + i);
         
        letterArray[index] = {  positionY: positionY,
                                positionX: positionX,
                                letter: word[i], 
                                word: word,
                                vertical: vertical};

    }

    generateGrid(letterArray); // Update the grid display
}

