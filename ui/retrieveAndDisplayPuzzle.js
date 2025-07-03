import { generateGrid } from '../puzzle/generateGrid.js';
import { createWordsObjectFromGrid } from '../scrabblegram/wordsObject.js';
import { assignTempColors } from '../scrabblegram/assignTempColors.js';
import { enableLetterSwapping } from '../scrabblegram/clickLetterSwap.js';

export function attachPlayHandlers() {
  document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;

      try {
        const res = await fetch(`http://localhost:3000/api/puzzle/${id}`);

        if (!res.ok) {
          const error = await res.json();
          alert(`Failed to load puzzle: ${error.message}`);
          return;
        }

        const puzzleData = await res.json();
        console.log("🧩 Retrieved puzzle:", puzzleData.grid);

        // Clear any previous puzzle display
        const playGrid = document.getElementById('play-grid');
        playGrid.innerHTML = '';

        // Generate the puzzle grid inside #play-grid
        generateGrid(puzzleData.grid, 'play-grid');

        // 🔁 Add interactivity:
        const wordsObject = createWordsObjectFromGrid(puzzleData.grid);
        assignTempColors(wordsObject, puzzleData.grid);
        enableLetterSwapping(puzzleData.grid, wordsObject, '#play-grid');

      } catch (err) {
        console.error('Error fetching puzzle:', err);
        alert('Could not retrieve puzzle.');
      }
    });
  });
}

