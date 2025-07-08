export function sortByBest(words) {
  if (words.length === 0) return [];

  const allChars = words.join('').split('');
  const totalChars = allChars.length;
  const frequency = new Map();

  for (const char of allChars) {
    frequency.set(char, (frequency.get(char) || 0) + 1);
  }

  for (const [char, count] of frequency.entries()) {
    frequency.set(char, count / totalChars);
  }

  function rateWord(word) {
    return [...word].reduce((sum, char) => sum + (frequency.get(char) || 0), 0);
  }

  return [...words].sort((a, b) => rateWord(b) - rateWord(a));
}

// ✅ Export a function instead of the result
export function getSortedWords() {
  return sortByBest(wordList);
}






