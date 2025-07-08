import { generateGrid } from '../puzzle/generateGrid.js';
import { createWordsObjectFromGrid } from '../scrabblegram/wordsObject.js';
import { assignTempColors } from '../scrabblegram/assignTempColors.js';
import { enableLetterSwapping } from '../scrabblegram/clickLetterSwap.js';
import { countMinimumSwapsToSolve } from './minimumSwaps.js';

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
        const res = await fetch(`https://scrabblegrams-fox-90a0cb6e632f.herokuapp.com/api/puzzle/${id}`);
        if (!res.ok) {
          const error = await res.json();
          alert(`Failed to load puzzle: ${error.message}`);
          return;
        }

        const puzzleData = await res.json();
        console.log("🧩 Retrieved puzzle:", puzzleData.grid);

        const modal = document.getElementById('play-modal');
        modal.style.display = 'block';

        const playGrid = document.getElementById('play-grid');
        playGrid.innerHTML = '';

        generateGrid(puzzleData.grid, 'play-grid');

        const wordsObject = createWordsObjectFromGrid(puzzleData.grid);
        assignTempColors(wordsObject, puzzleData.grid);

        const { swapCount, swapSteps } = countMinimumSwapsToSolve(puzzleData.grid);
        console.log(`🔁 Minimum swaps needed: ${swapCount}`);
        logFormattedSwapSteps(swapSteps);

        let currentSwaps = 0;
        const maxSwapsAllowed = swapCount + 10;

        const swapCountDisplay = document.getElementById('swap-count-display');
        if (swapCountDisplay) {
          swapCountDisplay.textContent = `${currentSwaps} / ${maxSwapsAllowed}`;
        }

        enableLetterSwapping(puzzleData.grid, wordsObject, '#play-grid', () => {
          currentSwaps++;
          if (swapCountDisplay) {
            swapCountDisplay.textContent = `${currentSwaps} / ${maxSwapsAllowed}`;
            // Optional: color red when exceeded
            if (currentSwaps > maxSwapsAllowed) {
              swapCountDisplay.style.color = 'red';
            } else {
              swapCountDisplay.style.color = 'black';
            }
          }
        });

      } catch (err) {
        console.error('Error fetching puzzle:', err);
        alert('Could not retrieve puzzle.');
      }
    });
  });

  document.querySelector('.close-button')?.addEventListener('click', () => {
    document.getElementById('play-modal').style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    const modal = document.getElementById('play-modal');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
