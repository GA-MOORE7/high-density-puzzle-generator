import { generateGrid } from "./generateGrid.js"; 
import { arrayGenerator } from "./letterArraySize.js";
import { words } from "./wordData.js"; 
  
const letterArray = arrayGenerator(7);   

function addWord(word) {

   let position = 0;

    for (let i = 0; i < letterArray.length; i++) {

        if (letterArray[i] === " ") {

            position = i;
            break;

        }
    }
       
    // Ensure the word fits within the remaining space
    if (position + word.length > letterArray.length) {
        console.error(`Not enough space to add "${word}"`);
        return;
    }

     // Place the word in the next available slots
    word.split("").forEach((letter, i) => {
            letterArray[position + i] = letter; 

    });

     // Log the updated letter array
    generateGrid(letterArray);
    
}


addWord(words[0]); // Add the first word to the grid
addWord(words[1]); // Add the second word to the grid
addWord(words[2]); // Add the third word to the grid 
addWord(words[3]); // Add the fourth word to the grid
addWord(words[4]); // Add the fifth word to the grid

console.log(letterArray); // Log the updated letter array
