import { getDisplayedLetterCountsFromGrid } from './displayedLetters.js';

export function wordsWithExcess() {
    const displayedLetters = getDisplayedLetterCountsFromGrid();
    const excessDetails = {}; // Object to store excess letter details by word

    // Iterate through each grid item
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        const displayedLetter = item.textContent.trim().toLowerCase();
        const id = item.id;

        // Extract words this item belongs to
        const primaryWordMatch = id.match(/word-([a-z]+)/i);
        const primaryWord = primaryWordMatch ? primaryWordMatch[1].toLowerCase() : null;

        const intersectsMatch = id.match(/intersectsWith-([a-z,]+)/i);
        const intersectsRaw = intersectsMatch ? intersectsMatch[1].toLowerCase() : null;
        const intersectsWith = intersectsRaw && intersectsRaw !== 'none' ? intersectsRaw.split(',') : [];

        const allWords = [primaryWord, ...intersectsWith].filter(Boolean);

        allWords.forEach(word => {
            if (displayedLetters[word]?.[displayedLetter]) {
                const letterData = displayedLetters[word][displayedLetter];
                const { actualLetterCount, expectedLetterCount } = letterData;

              

                // Check if there is excess of this letter
                if (actualLetterCount > expectedLetterCount) {
           
                    // If there's an excess, add to the excess details object
                    if (!excessDetails[word]) {
                        excessDetails[word] = {};
                    }

                    if (!excessDetails[word][displayedLetter]) {
                        excessDetails[word][displayedLetter] = {
                            actualLetterCount: actualLetterCount,
                            expectedLetterCount: expectedLetterCount,
                            actualGridItems: []
                        };
                    }

                    excessDetails[word][displayedLetter].actualGridItems.push({
                        item,
                        intersectsWith
                    });
                }
            }
        });
    });

    console.log(excessDetails); // Log the final excess details
    return excessDetails;
}








