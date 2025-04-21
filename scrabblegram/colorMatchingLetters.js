export function colorMatchingLetters() {

    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {

        const id = item.id;
        const content = item.textContent.trim().toLowerCase();

        // Skip items with no letter displayed
        if (!content) {
            item.style.backgroundColor = '';
            return;
        }

        // Extract the expected letter
        const letterMatch = id.match(/letter-([a-z])/i);
        const letterFromID = letterMatch ? letterMatch[1].toLowerCase() : null;

        // Extract the full word
        const wordMatch = id.match(/word-([a-z]+)/i);
        const wordFromID = wordMatch ? wordMatch[1].toLowerCase(): null;

        // Extract intersectsWith array
        const intersectsMatch = id.match(/intersectsWith-([a-z,]+)/i);
        const intersectsRaw = intersectsMatch ? intersectsMatch[1].toLowerCase() : null;
        const intersectsWith = intersectsRaw && intersectsRaw !== 'none' ? intersectsRaw.split(',') : [];

        const allRelatedWords = [wordFromID, ...intersectsWith];


        if (letterFromID && content === letterFromID) {
            // Correct letter and correct position
            item.style.backgroundColor = '#00ff7f'; // green
        } else if (allRelatedWords.some(word => word && word.includes(content))) {
            // Letter exists in word (or intersectsWith word) but in wrong position
            item.style.backgroundColor = '#cd853f'; // brown
        } else {
            // Letter does not exist in word (or intersectsWith word)
            item.style.backgroundColor = '#ff4c4c'; // red

        }

    })

}

