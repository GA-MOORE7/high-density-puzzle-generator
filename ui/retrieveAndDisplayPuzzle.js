import { generateGrid } from '../puzzle/generateGrid.js';
import { createWordsObjectFromGrid } from '../scrabblegram/wordsObject.js';
import { assignTempColors } from '../scrabblegram/assignTempColors.js';
import { enableLetterSwapping } from '../scrabblegram/clickLetterSwap.js';
import { countMinimumSwapsToSolve } from './minimumSwaps.js';
import { fetchSolutionGridById } from './fetchSolution.js';

let currentPlayerGrid = null;
let solutionGrid = null;
let currentPuzzleId = null;
let currentSwaps = 0;
let maxSwapsAllowed = 0;
let swapCountDisplay = null;

function logFormattedSwapSteps(swapSteps) {
  swapSteps.forEach((step, index) => {
    console.log(
      `Step ${index + 1}: swap "${step.letterA}" (x: ${step.xA}, y: ${step.yA}) and "${step.letterB}" (x: ${step.xB}, y: ${step.yB});`
    );
  });
}

function renderPlayGrid(grid) {
  const playGrid = document.getElementById('play-grid');
  playGrid.innerHTML = '';
  generateGrid(grid, 'play-grid');

  const wordsObject = createWordsObjectFromGrid(grid);
  assignTempColors(wordsObject, grid);

  enableLetterSwapping(grid, wordsObject, '#play-grid', () => {
    currentSwaps++;
    if (swapCountDisplay) {
      swapCountDisplay.textContent = `${currentSwaps} / ${maxSwapsAllowed}`;
      swapCountDisplay.style.color = currentSwaps > maxSwapsAllowed ? 'red' : 'black';
    }
  });
}

export function attachPlayHandlers() {
  document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      currentPuzzleId = id;

      try {
        const res = await fetch(`https://scrabblegrams-fox-90a0cb6e632f.herokuapp.com/api/puzzle/${id}`);
        if (!res.ok) {
          const error = await res.json();
          alert(`Failed to load puzzle: ${error.message}`);
          return;
        }

        const puzzleData = await res.json();
        console.log("🧩 Retrieved puzzle:", puzzleData.grid);

        currentPlayerGrid = JSON.parse(JSON.stringify(puzzleData.grid)); // Start with the original scrambled grid
        solutionGrid = null; // Clear out any previous solution

        const modal = document.getElementById('play-modal');
        modal.style.display = 'block';

        currentSwaps = 0;
        const { swapCount, swapSteps } = countMinimumSwapsToSolve(currentPlayerGrid);
        console.log(`🔁 Minimum swaps needed: ${swapCount}`);
        logFormattedSwapSteps(swapSteps);
        maxSwapsAllowed = swapCount;

        swapCountDisplay = document.getElementById('swap-count-display');
        if (swapCountDisplay) {
          swapCountDisplay.textContent = `${currentSwaps} / ${maxSwapsAllowed}`;
          swapCountDisplay.style.color = 'black';
        }

        renderPlayGrid(currentPlayerGrid);

        // Setup Hint Toggle with new logic
        const oldHintToggle = document.getElementById('hint-toggle');
        if (oldHintToggle) {
          const newHintToggle = oldHintToggle.cloneNode(true);
          oldHintToggle.parentNode.replaceChild(newHintToggle, oldHintToggle);
          newHintToggle.checked = false;

          let savedPlayerState = null;

          newHintToggle.addEventListener('change', async function () {
            if (!currentPuzzleId) return;

            if (this.checked) {
              try {
                console.log('🟡 Hint toggled ON. Fetching solution...');
                savedPlayerState = JSON.parse(JSON.stringify(currentPlayerGrid)); // Save player's current state
                if (!solutionGrid) {
                  solutionGrid = await fetchSolutionGridById(currentPuzzleId);
                }
                renderPlayGrid(solutionGrid);
              } catch (err) {
                console.error('❌ Could not load solution:', err);
                this.checked = false;
              }
            } else {
              console.log('🟡 Hint toggled OFF. Restoring player’s current puzzle state.');
              if (savedPlayerState) {
                currentPlayerGrid = JSON.parse(JSON.stringify(savedPlayerState));
                renderPlayGrid(currentPlayerGrid);
              }
            }
          });
        }

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
