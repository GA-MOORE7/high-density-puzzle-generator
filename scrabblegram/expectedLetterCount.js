import { extractAllWordsFromGrid } from './puzzleWords.js';

export function getExpectedLetterCountsFromGrid() {
    const wordMap = extractAllWordsFromGrid(); // { word: [array of gridItems] }
    const letterCounts = {};

    Object.entries(wordMap).forEach(([word, gridItems]) => {
        const normalizedWord = word.toLowerCase();

        letterCounts[normalizedWord] = {};

        // Step 1: Build letter counts from the correct word spelling (not grid)
        for (const letter of normalizedWord) {
            if (!letterCounts[normalizedWord][letter]) {
                letterCounts[normalizedWord][letter] = {
                    count: 0,
                    correctGridItems: []
                };
            }
            letterCounts[normalizedWord][letter].count += 1;
        }

        // Step 2: Attach correctGridItems based on actual gridItems
        gridItems.forEach(item => {
            const letter = item.textContent.trim().toLowerCase();
            if (!letter) return;

            // Only attach if the letter exists in the expected structure
            if (letterCounts[normalizedWord][letter]) {
                letterCounts[normalizedWord][letter].correctGridItems.push(item);
            }
        });
    });

    return letterCounts;
}




