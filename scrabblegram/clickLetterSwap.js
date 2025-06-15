import { assignTempColors } from "./assignTempColors.js";
import { mergeColors } from "./mergeColors.js";  // import your merging function

export function enableLetterSwapping(puzzleGrid, wordsObject) {
  const gridItems = document.querySelectorAll('.grid-item');
  let selectedGridItem = null;

  function parseCoords(id) {
    const parts = id.split(' ');
    const x = parseInt(parts[0].split('-')[1], 10);
    const y = parseInt(parts[1].split('-')[1], 10);
    return { x, y };
  }

function updateCellColors() {
  gridItems.forEach(item => {
    const { x, y } = parseCoords(item.id);
    const cell = puzzleGrid.find(c => c.x === x && c.y === y);

    if (!cell || !cell.displayedLetter) {
      // No letter displayed: set to gray (empty)
      item.style.backgroundColor = '#d0e7ff';  // or '#ccc', whichever you prefer
      item.textContent = ''; // Clear text to be sure
      return;
    }

    // Find all words including this cell
    const colors = [];

    for (const wordId in wordsObject) {
      const wordEntry = wordsObject[wordId];
      const index = wordEntry.cells.findIndex(c => c.x === x && c.y === y);
      if (index !== -1 && wordEntry.tempColors) {
        colors.push(wordEntry.tempColors[index]);
      }
    }

    let finalColor = null; // default no color
    if (colors.length > 0) {
      finalColor = colors.reduce((acc, color) => mergeColors(acc, color));
    }

    item.style.backgroundColor = finalColor === 'green' ? '#6aaa64' :
                                finalColor === 'brown' ? '#c9b458' :
                                finalColor === 'red' ? '#d9534f' :
                                '#eee';  // fallback gray for no color
  });
}


  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      const content = item.textContent.trim();
      if (!content) return;

      if (!selectedGridItem) {
        selectedGridItem = item;
        item.classList.add('selected');
      } else if (selectedGridItem !== item) {
        const { x: x1, y: y1 } = parseCoords(selectedGridItem.id);
        const { x: x2, y: y2 } = parseCoords(item.id);

        const cell1 = puzzleGrid.find(c => c.x === x1 && c.y === y1);
        const cell2 = puzzleGrid.find(c => c.x === x2 && c.y === y2);

        if (!cell1 || !cell2) {
          console.warn("Grid cell not found for swapping.");
          selectedGridItem.classList.remove('selected');
          selectedGridItem = null;
          return;
        }

        // Swap displayedLetter
        const tempLetter = cell1.displayedLetter;
        cell1.displayedLetter = cell2.displayedLetter;
        cell2.displayedLetter = tempLetter;

        // Update UI text
        selectedGridItem.textContent = cell1.displayedLetter || '';
        item.textContent = cell2.displayedLetter || '';

        // Recalculate tempColors for all words
        assignTempColors(wordsObject, puzzleGrid);

        // Update UI colors for all cells
        updateCellColors();

        selectedGridItem.classList.remove('selected');
        selectedGridItem = null;
      } else {
        selectedGridItem.classList.remove('selected');
        selectedGridItem = null;
      }
    });
  });

  // Initial coloring when enabling swapping
  updateCellColors();
}






