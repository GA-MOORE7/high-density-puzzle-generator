import { getDisplayedLetterCountsFromGrid } from './displayedLetters.js';

export function addExcessFlagToGridItems() {
    const displayedLetters = getDisplayedLetterCountsFromGrid();

    for (const word in displayedLetters) {
        const wordData = displayedLetters[word];

        for (const letter in wordData) {
            const letterData = wordData[letter];
            const { actualGridItems } = letterData;

            const allowedCount = letterData.count;

            // Track how many valid (non-excess) letters we've seen
            let validCount = 0;

            actualGridItems.forEach(item => {
                const displayedLetter = item.textContent.trim().toLowerCase();
                let isExcess = false;

                if (displayedLetter === letter) {
                    if (validCount < allowedCount) {
                        // Still within allowed
                        validCount++;
                    } else {
                        // Over the allowed amount
                        isExcess = true;
                    }
                }

                item.dataset.isExcess = isExcess ? 'true' : 'false';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    addExcessFlagToGridItems();
});





