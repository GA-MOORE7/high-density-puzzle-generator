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

                // ✅ Skip if this item doesn't belong to the current word
                const wordMatch = item.id.match(/word-([a-zA-Z]+)/);
                const wordFromId = wordMatch ? wordMatch[1].toLowerCase() : '';
                if (wordFromId !== word) return;

                const hasExcessFlag = item.classList.contains('excess-flag');

                // 🔄 Get intersecting word letters (if any)
                const intersectsWithMatch = item.id.match(/intersectsWith-([a-z]+)/i);
                const intersectingWord = intersectsWithMatch ? intersectsWithMatch[1].toLowerCase() : '';
                const intersectingLetters = intersectingWord.split('');
                const allRelevantLetters = new Set([...wordLetters, ...intersectingLetters]);

                // 🎨 Apply color logic
                if (hasExcessFlag) {
                    item.style.backgroundColor = 'red'; // ❌ Excess letter
                } else if (displayedLetter === letterFromId) {
                    item.style.backgroundColor = '#90EE90'; // ✅ Correct position
                } else if (allRelevantLetters.has(displayedLetter)) {
                    item.style.backgroundColor = '#FFEB3B'; // 🟫 Misplaced letter
                } else {
                    item.style.backgroundColor = 'red'; // ❌ Wrong letter
                }
            });
        }
    }
}







