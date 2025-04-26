import { getExpectedLetterCountsFromGrid } from './expectedLetterCount.js';

export function getDisplayedLetterCountsFromGrid() {
    const expectedLetterCounts = getExpectedLetterCountsFromGrid(); // ⬅️ Grab expected counts!

    const gridItems = document.querySelectorAll('.grid-item');
    const displayedCounts = {};

    gridItems.forEach(item => {
        const letter = item.textContent.trim().toLowerCase();
        if (!letter) return;

        const id = item.id;

        // Get primary word
        const wordMatch = id.match(/word-([a-z]+)/i);
        const primaryWord = wordMatch ? wordMatch[1].toLowerCase() : null;

        // Get intersecting words
        const intersectsMatch = id.match(/intersectsWith-([a-z,]+)/i);
        const intersectsRaw = intersectsMatch ? intersectsMatch[1].toLowerCase() : null;
        const intersectsWith = intersectsRaw && intersectsRaw !== 'none' ? intersectsRaw.split(',') : [];

        const allWords = [primaryWord, ...intersectsWith];

        allWords.forEach(word => {
            if (!word) return;

            if (!displayedCounts[word]) {
                displayedCounts[word] = {};
            }

            if (!displayedCounts[word][letter]) {
                // 🛠 Here we safely get the expected count
                const expectedData = expectedLetterCounts[word]?.[letter];
                const expectedCount = expectedData ? expectedData.count : 0;

                displayedCounts[word][letter] = {
                    count: 0,
                    expectedLetterCount: expectedCount, // ✅ Add expected count
                    actualGridItems: []
                };
            }

            displayedCounts[word][letter].count += 1;
            displayedCounts[word][letter].actualGridItems.push(item);
        });
    });

    return displayedCounts;
}











