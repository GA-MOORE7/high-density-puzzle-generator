import { assignTempColors } from "./assignTempColors.js";
import { mergeColors } from "./mergeColors.js";

export function enableLetterSwapping(puzzleGrid, wordsObject, gridContainerSelector = '#grid', onSwap = null) {
  const container = document.querySelector(gridContainerSelector);
  if (!container) {
    console.warn('Grid container not found:', gridContainerSelector);
    return;
  }

  let selectedGridItem = null;
  const clickSound = new Audio('https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3');

  function parseCoords(id) {
    const parts = id.split(' ');
    const x = parseInt(parts[0].split('-')[1], 10);
    const y = parseInt(parts[1].split('-')[1], 10);
    return { x, y };
  }

  function updateCellColors(container) {
    const gridItems = container.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
      const { x, y } = parseCoords(item.id);
      const cell = puzzleGrid.find(c => c.x === x && c.y === y);

      if (!cell || !cell.displayedLetter) {
        item.style.backgroundColor = '#d0e7ff';
        item.textContent = '';
        item.classList.remove('correct-green-static');
        return;
      }

      const colors = [];

      for (const wordId in wordsObject) {
        const wordEntry = wordsObject[wordId];
        const index = wordEntry.cells.findIndex(c => c.x === x && c.y === y);
        if (index !== -1 && wordEntry.tempColors) {
          colors.push(wordEntry.tempColors[index]);
        }
      }

      let finalColor = null;
      if (colors.length > 0) {
        finalColor = colors.reduce((acc, color) => mergeColors(acc, color));
      }

      item.classList.remove('correct-green-static');

      item.style.backgroundColor =
        finalColor === 'green' ? '#6aaa64' :
        finalColor === 'brown' ? '#c9b458' :
        finalColor === 'red' ? '#d9534f' :
        '#eee';

      if (finalColor === 'green') {
        if (gridContainerSelector === '#play-grid') {
          item.classList.add('correct-green-static');
        }
      }
    });
  }

  const gridItems = container.querySelectorAll('.grid-item');

  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      const content = item.textContent.trim();
      if (!content) return;

      if (item.classList.contains('correct-green-static')) return;

      if (!selectedGridItem) {
        selectedGridItem = item;
        item.classList.add('selected', 'swapping');
      } else if (selectedGridItem !== item) {
        if (item.classList.contains('correct-green-static')) return;

        item.classList.add('swapping');

        const { x: x1, y: y1 } = parseCoords(selectedGridItem.id);
        const { x: x2, y: y2 } = parseCoords(item.id);

        const cell1 = puzzleGrid.find(c => c.x === x1 && c.y === y1);
        const cell2 = puzzleGrid.find(c => c.x === x2 && c.y === y2);

        if (!cell1 || !cell2) {
          console.warn("Grid cell not found for swapping.");
          selectedGridItem.classList.remove('selected', 'swapping');
          item.classList.remove('swapping');
          selectedGridItem = null;
          return;
        }

        clickSound.currentTime = 0;
        clickSound.play();

        requestAnimationFrame(() => {
          // Swap displayed letters
          const tempLetter = cell1.displayedLetter;
          cell1.displayedLetter = cell2.displayedLetter;
          cell2.displayedLetter = tempLetter;

          // Update UI
          selectedGridItem.textContent = cell1.displayedLetter || '';
          item.textContent = cell2.displayedLetter || '';

          // Recolor after swap
          assignTempColors(wordsObject, puzzleGrid);
          updateCellColors(container);

          if (typeof onSwap === 'function') {
            onSwap();
          }

          selectedGridItem.classList.remove('selected', 'swapping');
          item.classList.remove('swapping');
          selectedGridItem = null;
        });
      } else {
        // Deselect same cell
        selectedGridItem.classList.remove('selected', 'swapping');
        selectedGridItem = null;
      }
    });
  });

  updateCellColors(container); // initial run
}








