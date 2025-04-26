import { getDisplayedLetterCountsFromGrid } from "./displayedLetters.js";
import { getExpectedLetterCountsFromGrid } from './expectedLetterCount.js';
import { colorCoordinates } from "./colorCoordinates.js";

let selectedGridItem = null;

export function enableLetterSwapping() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.textContent.trim();

            if (!content) return;

            if (!selectedGridItem) {
                // First letter selected
                selectedGridItem = item;
                item.style.border = '1px solid blue';
            } else if (selectedGridItem !== item) {
                // Second letter selected
                const temp = selectedGridItem.textContent;
                selectedGridItem.textContent = item.textContent;
                item.textContent = temp;

                const expectedLetters = getExpectedLetterCountsFromGrid();
                console.log(expectedLetters); // For debugging purposes
                const displayedLetters = getDisplayedLetterCountsFromGrid();
                console.log(displayedLetters); // For debugging purposes
                
                colorCoordinates(); // Update colors based on new letters
            

                // Clear border and reset selection
                selectedGridItem.style.border = '';
                selectedGridItem = null;
            } else {
                // Clicked the same cell again - deselect
                selectedGridItem.style.border = '';
                selectedGridItem = null;
            }
        });
    });
}






