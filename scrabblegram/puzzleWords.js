export function extractAllWordsFromGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    const wordMap = {};

    gridItems.forEach(item => {
        const id = item.id;

        // Extract primary word
        const wordMatch = id.match(/word-([a-z]+)/i);
        const primaryWord = wordMatch?.[1]?.toLowerCase();
        if (primaryWord && primaryWord !== 'undefined') {
            if (!wordMap[primaryWord]) wordMap[primaryWord] = [];
            wordMap[primaryWord].push(item);
        }

        // Extract intersectsWith words
        const intersectsMatch = id.match(/intersectsWith-([a-z,]+)/i);
        const intersectsRaw = intersectsMatch?.[1]?.toLowerCase();
        if (intersectsRaw && intersectsRaw !== 'none') {
            const intersects = intersectsRaw.split(',').filter(Boolean);
            intersects.forEach(intersectingWord => {
                if (intersectingWord && intersectingWord !== 'undefined') {
                    if (!wordMap[intersectingWord]) wordMap[intersectingWord] = [];
                    wordMap[intersectingWord].push(item);
                }
            });
        }
    });

    return wordMap;
}




