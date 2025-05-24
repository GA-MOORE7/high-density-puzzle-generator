import { getCorrectLetterMap } from './correctLetter.js';
import { getDisplayedLetterMap } from './displayedLetter.js';
import { getExpectedLetterMap } from './expectedLetter.js';
import { getPrimaryWordMap } from './primaryWord.js';
import { getInCorrectWordMap } from './inCorrectWord.js';
import { addDisplayedLetterCount } from './displayedLetterCount.js';
import { addExpectedLetterCount } from './expectedLetterCount.js';
import { addExcessLetterCount } from './excessLetterCount.js';  // ✅ NEW import
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
    addExcessLetterCount()  // ✅ NEW integrated here
  );
  console.log("Initial grid state:", initialMap);
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
        const temp = selectedGridItem.textContent.trim();
        selectedGridItem.textContent = item.textContent.trim();
        item.textContent = temp;

        const correctLetterMap = getCorrectLetterMap();
        const displayedLetterMap = getDisplayedLetterMap();
        const expectedLetterMap = getExpectedLetterMap();
        const primaryWordMap = getPrimaryWordMap();
        const inCorrectWordMap = getInCorrectWordMap();
        const displayedLetterCount = addDisplayedLetterCount();
        const expectedLetterCount = addExpectedLetterCount();
        const excessLetterCount = addExcessLetterCount();  // ✅ NEW integrated here

        const combinedMap = mergeMaps(
          correctLetterMap,
          displayedLetterMap,
          expectedLetterMap,
          primaryWordMap,
          inCorrectWordMap,
          displayedLetterCount,
          expectedLetterCount,
          excessLetterCount  // ✅ NEW merged here
        );

        console.clear();
        console.log("Updated grid state:", combinedMap);

        selectedGridItem.classList.remove('selected');
        selectedGridItem = null;
      } else {
        selectedGridItem.classList.remove('selected');
        selectedGridItem = null;
      }
    });
  });
}





