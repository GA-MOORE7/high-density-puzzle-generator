export function getLongestWordLength(wordList) {
  if (!Array.isArray(wordList) || wordList.length === 0) return 0;

  const longestWord = wordList.reduce((a, b) => (b.length > a.length ? b : a), '');
  console.log(`📏 Longest word: "${longestWord}" (${longestWord.length} letters)`);
  return longestWord.length;
}
