// buildLetterCountMap.js
export function buildLetterCountMap(word) {
  const map = {};
  for (const char of word) {
    map[char] = (map[char] || 0) + 1;
  }
  return map;
}