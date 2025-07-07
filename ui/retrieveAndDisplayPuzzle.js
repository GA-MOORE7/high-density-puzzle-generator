import { generateGrid } from '../puzzle/generateGrid.js';
import { createWordsObjectFromGrid } from '../scrabblegram/wordsObject.js';
import { assignTempColors } from '../scrabblegram/assignTempColors.js';
import { enableLetterSwapping } from '../scrabblegram/clickLetterSwap.js';
import { countMinimumSwapsToSolve } from './minimumSwaps.js';

// Helper: Logs swap steps in your requested format
function logFormattedSwapSteps(swapSteps) {
  swapSteps.forEach((step, index) => {
    console.log(
      `Step ${index + 1}: swap "${step.letterA}" (x: ${step.xA}, y: ${step.yA}) and "${step.letterB}" (x: ${step.xB}, y: ${step.yB});`
    );
  });
}

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

        // Show the modal
        const modal = document.getElementById('play-modal');
        modal.style.display = 'block';

        // Clear any previous puzzle display
        const playGrid = document.getElementById('play-grid');
        playGrid.innerHTML = '';

        // Generate the puzzle grid inside #play-grid
        generateGrid(puzzleData.grid, 'play-grid');

        // Add interactivity
        const wordsObject = createWordsObjectFromGrid(puzzleData.grid);
        assignTempColors(wordsObject, puzzleData.grid);
        enableLetterSwapping(puzzleData.grid, wordsObject, '#play-grid');

        // Show swap stats
        const { swapCount, swapSteps } = countMinimumSwapsToSolve(puzzleData.grid);
        console.log(`🔁 Minimum swaps needed: ${swapCount}`);
        logFormattedSwapSteps(swapSteps);

        // Optionally update a UI element if available
        const swapCountDisplay = document.getElementById('swap-count-display');
        if (swapCountDisplay) {
          swapCountDisplay.textContent = `0 / ${swapCount + 10}`;
        }

      } catch (err) {
        console.error('Error fetching puzzle:', err);
        alert('Could not retrieve puzzle.');
      }
    });
  });

  // Handle modal close (clicking the X)
  document.querySelector('.close-button')?.addEventListener('click', () => {
    document.getElementById('play-modal').style.display = 'none';
  });

  // Close when clicking outside the modal content
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('play-modal');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
