import { getDisplayedLetterCountsFromGrid } from './displayedLetters.js';

export function colorCoordinates() {
    const displayedLetters = getDisplayedLetterCountsFromGrid();

    for (const word in displayedLetters) {
        const wordData = displayedLetters[word];

        // To track misplaced letters
        const wordLetters = word.split('');

        for (const letter in wordData) {
            const letterData = wordData[letter];
            const { actualGridItems } = letterData;

            actualGridItems.forEach(item => {
                // Get the displayed letter (from textContent of the grid item)
                const displayedLetter = item.textContent.trim().toLowerCase();

                // Extract the letter from the id attribute using a regular expression
                const letterFromId = (item.id.match(/letter-([a-z])/i) || [])[1]?.toLowerCase();

               

                // Check if the displayed letter matches the correct letter in the word (correct position)
                if (displayedLetter === letterFromId) {
                    item.style.backgroundColor = '#90EE90'; // Green for correct letter in correct position
                }
                // Check if the displayed letter is in the word but in the wrong position (misplaced)
                else if (wordLetters.includes(displayedLetter)) {
                    item.style.backgroundColor = '#FFEB3B'; // Yellow for misplaced letter
                } else {
                    item.style.backgroundColor = 'red'; // White for incorrect letter
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Your colorCoordinates function will now run only after the DOM is ready
    colorCoordinates();
});

