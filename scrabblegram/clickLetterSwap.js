import { getDisplayedLetterCountsFromGrid } from "./displayedLetters.js";
import { getExpectedLetterCountsFromGrid } from './expectedLetterCount.js';
import { colorCoordinates } from "./colorCoordinates.js";
import { wordsWithExcess } from "./wordsWithExcess.js";
import { filterMismatchedGridItems } from "./filterMissmatchedGridItems.js";
import { markExcessNonIntersectingItems } from "./addExcessLetterFlag.js";
import { scrambleGridLetters } from "./puzzleScramble.js";

let selectedGridItem = null;

document.addEventListener('DOMContentLoaded', () => {
    scrambleGridLetters();
    colorCoordinates();
    lockCorrectlyPlacedLetters(); // 🔒 Lock correct cells after coloring
});

export function enableLetterSwapping() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('locked')) return; // 🔒 Skip locked cells

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

                // Update logic
                // const expectedLetters = getExpectedLetterCountsFromGrid();
                // console.log(expectedLetters);
                // const displayedLetters = getDisplayedLetterCountsFromGrid();
                // console.log(displayedLetters);

                const wordsWithexcess = wordsWithExcess();
                console.log("Words with excess:", wordsWithexcess);
                const mismatchedGridItems = filterMismatchedGridItems();
                console.log("Mismatched grid items:", mismatchedGridItems);
                markExcessNonIntersectingItems();
                colorCoordinates();
                lockCorrectlyPlacedLetters(); // 🔒 Re-lock after swap

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

// 🔒 Lock correctly placed grid items
function lockCorrectlyPlacedLetters() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        const displayedLetter = item.textContent.trim().toLowerCase();
        const match = item.id.match(/letter-([a-z])/i);
        const expectedLetter = match ? match[1].toLowerCase() : null;

        if (displayedLetter && displayedLetter === expectedLetter) {
            item.classList.add('locked');
            item.style.pointerEvents = 'none';
            item.style.opacity = '0.7';
        } else {
            item.classList.remove('locked');
            item.style.pointerEvents = 'auto';
            item.style.opacity = '1';
        }
    });
}





