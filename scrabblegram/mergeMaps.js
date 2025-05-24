import { getCorrectLetterMap } from './correctLetter.js';
import { getDisplayedLetterMap } from './displayedLetter.js';
import { getExpectedLetterMap } from './expectedLetter.js';

// mergeMaps.js
export function mergeMaps(...maps) {
  const merged = {};

  maps.forEach(map => {
    for (const [key, value] of Object.entries(map)) {
      if (!merged[key]) {
        merged[key] = {};
      }
      Object.assign(merged[key], value);
    }
  });

  return merged;
}

