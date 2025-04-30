import { getDisplayedLetterCountsFromGrid } from './displayedLetters.js';
import { markExcessNonIntersectingItems } from './addExcessLetterFlag.js';

export function colorCoordinates() {
    const displayedLetters = getDisplayedLetterCountsFromGrid();

    // Step 1: Mark excess letters
    markExcessNonIntersectingItems();

    for (const word in displayedLetters) {
        const wordData = displayedLetters[word];
        const wordLetters = word.split('');

        for (const letter in wordData) {
            const letterData = wordData[letter];
            const { actualGridItems } = letterData;

            actualGridItems.forEach(item => {
                const displayedLetter = item.textContent.trim().toLowerCase();
                const letterFromId = (item.id.match(/letter-([a-z])/i) || [])[1]?.toLowerCase();

                // ✅ Remove excess flag if letter now matches expected
                if (displayedLetter === letterFromId && item.classList.contains('excess-flag')) {
                    item.classList.remove('excess-flag');
                }

                const hasExcessFlag = item.classList.contains('excess-flag');

                // 🔄 Merge letters from main word and intersecting word (if any)
                const intersectsWithMatch = item.id.match(/intersectsWith-([a-z]+)/i);
                const intersectingWord = intersectsWithMatch ? intersectsWithMatch[1].toLowerCase() : '';
                const allWordLetters = new Set([...wordLetters, ...intersectingWord.split('')]);

                // 🎨 Apply color logic
                if (hasExcessFlag) {
                    item.style.backgroundColor = 'red'; // ❌ Excess letter
                } else if (displayedLetter === letterFromId) {
                    item.style.backgroundColor = '#90EE90'; // ✅ Correct position
                } else if (allWordLetters.has(displayedLetter)) {
                    item.style.backgroundColor = '#FFEB3B'; // 🟫 Misplaced
                } else {
                    item.style.backgroundColor = 'red'; // ❌ Wrong letter
                }
            });
        }
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     colorCoordinates();
// });




