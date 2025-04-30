export function scrambleGridLetters() {
    const gridItems = document.querySelectorAll('.grid-item');

    // Step 0: Group non-empty grid items by word
    const wordMap = {};

    gridItems.forEach(item => {
        const letter = item.textContent.trim();
        if (!letter) return; // ⛔ Skip empty cells

        const match = item.id.match(/word-([a-zA-Z]+)/);
        const word = match ? match[1] : null;
        if (!word) return;

        if (!wordMap[word]) wordMap[word] = [];
        wordMap[word].push(item);
    });

    const words = Object.keys(wordMap);

    // Step 1: Randomly swap two letters in the same word
    for (const word of words) {
        const items = wordMap[word];
        if (items.length < 2) continue;

        let idx1 = Math.floor(Math.random() * items.length);
        let idx2;
        do {
            idx2 = Math.floor(Math.random() * items.length);
        } while (idx1 === idx2);

        const item1 = items[idx1];
        const item2 = items[idx2];

        // Swap letters (but not metadata like id/class)
        const temp = item1.textContent;
        item1.textContent = item2.textContent;
        item2.textContent = temp;
    }

    // Step 2: For each word, swap one letter with another word
    for (let i = 0; i < words.length; i++) {
        const wordA = words[i];
        const itemsA = wordMap[wordA];
        if (itemsA.length === 0) continue;

        const otherWords = words.filter(w => w !== wordA && wordMap[w].length > 0);
        if (otherWords.length === 0) break;

        const wordB = otherWords[Math.floor(Math.random() * otherWords.length)];
        const itemsB = wordMap[wordB];

        const itemA = itemsA[Math.floor(Math.random() * itemsA.length)];
        const itemB = itemsB[Math.floor(Math.random() * itemsB.length)];

        // Swap letters
        const temp = itemA.textContent;
        itemA.textContent = itemB.textContent;
        itemB.textContent = temp;
    }

    console.log("Scrambling complete (no empty cell involvement).");
}


// document.addEventListener('DOMContentLoaded', () => {
//     scrambleGridLetters();  // or on a button click
// });

