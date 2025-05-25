import { getCorrectLetterMap } from './correctLetter.js';
import { getDisplayedLetterMap } from './displayedLetter.js';
import { getExpectedLetterMap } from './expectedLetter.js';
import { getPrimaryWordMap } from './primaryWord.js';
import { getInCorrectWordMap } from './inCorrectWord.js';
import { addDisplayedLetterCount } from './displayedLetterCount.js';
import { addExpectedLetterCount } from './expectedLetterCount.js';
import { addExcessLetterCount } from './excessLetterCount.js';  
import { categorizeGridItems } from './categorizeGridItems.js';
import { addIntersectionFlagFromDOM } from './intersectsBoolean.js';
import { mergeMaps } from './mergeMaps.js';

document.addEventListener('DOMContentLoaded', () => {
  const initialMap = mergeMaps(
    getCorrectLetterMap(),
    getDisplayedLetterMap(),
    getExpectedLetterMap(), 
    getPrimaryWordMap(),
    getInCorrectWordMap(),
    addDisplayedLetterCount(),
    addExpectedLetterCount(),
    addExcessLetterCount(),  
    addIntersectionFlagFromDOM()
  );

  console.log("Initial grid state:", initialMap);

  // Generate and log categories from the initial map
  const initialCategories = categorizeGridItems(initialMap);
  console.log("Initial grid categories:", initialCategories);
});

export function enableLetterSwapping() {
  const gridItems = document.querySelectorAll('.grid-item');
  let selectedGridItem = null;

  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      const content = item.textContent.trim();
      if (!content) return;

      if (!selectedGridItem) {
        selectedGridItem = item;
        item.classList.add('selected');
      } else if (selectedGridItem !== item) {
        // Swap letters
        const temp = selectedGridItem.textContent.trim();
        selectedGridItem.textContent = item.textContent.trim();
        item.textContent = temp;

        // Rebuild all maps after swap
        const correctLetterMap = getCorrectLetterMap();
        const displayedLetterMap = getDisplayedLetterMap();
        const expectedLetterMap = getExpectedLetterMap();
        const primaryWordMap = getPrimaryWordMap();
        const inCorrectWordMap = getInCorrectWordMap();
        const displayedLetterCount = addDisplayedLetterCount();
        const expectedLetterCount = addExpectedLetterCount();
        const excessLetterCount = addExcessLetterCount();
        const intersectionMap = addIntersectionFlagFromDOM();

        const combinedMap = mergeMaps(
          correctLetterMap,
          displayedLetterMap,
          expectedLetterMap,
          primaryWordMap,
          inCorrectWordMap,
          displayedLetterCount,
          expectedLetterCount,
          excessLetterCount,  
          intersectionMap
        );

        console.clear();
        console.log("Updated grid state:", combinedMap);

        // Categorize updated grid
        const categories = categorizeGridItems(combinedMap);
        console.log("Grid categories:", categories);

        selectedGridItem.classList.remove('selected');
        selectedGridItem = null;
      } else {
        // Clicked same item twice -> deselect
        selectedGridItem.classList.remove('selected');
        selectedGridItem = null;
      }
    });
  });
}






