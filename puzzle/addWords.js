import { generateGrid } from "./generateGrid.js"; 
import { arrayGenerator } from "./letterArraySize.js";
import { words } from "./wordData.js"; 
  
const letterArray = arrayGenerator(7);

const rowSize = 7;

function addWord(word) {

   let position = -1;

   // Find an available position where the word can fit
    for (let i = 0; i < letterArray.length; i++) {
        if (letterArray[i] === " ") {
            
            // First constraint: Ensure enough space in the array
            if (i + word.length > letterArray.length) {
                console.error(`Not enough space to add "${word}"`);
                return;
            }

            // Second constraint: Ensure word does not wrap across rows
            let rowStart = Math.floor(i / rowSize) * rowSize;
            let rowEnd = rowStart + rowSize;

            if (i + word.length <= rowEnd) {
                position = i;
                break;
            }
        }
    }

    // If no valid position was found, return
    if (position === -1) {
        console.error(`Cannot place "${word}" without wrapping`);
        return;
    }
       
     // Place the word in the next available slots
    word.split("").forEach((letter, i) => {
            letterArray[position + i] = letter; 

    });

     // Log the updated letter array
    generateGrid(letterArray);
    
}



console.log(letterArray); // Log the updated letter array
