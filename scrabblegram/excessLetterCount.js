import { addDisplayedLetterCount } from './displayedLetterCount.js';
import { addExpectedLetterCount } from './expectedLetterCount.js';

export function addExcessLetterCount() {
  const displayedCountMap = addDisplayedLetterCount();
  const expectedCountMap = addExpectedLetterCount();

  const excessMap = {};

  for (const key in displayedCountMap) {
    const displayedCount = displayedCountMap[key]?.displayedLetterCount || 0;
    const expectedCount = expectedCountMap[key]?.expectedLetterCount || 0;
    const excess = displayedCount - expectedCount;

    excessMap[key] = {
      excessLetterCount: excess,
      excess: excess > 0
    };
  }

  return excessMap;
}
