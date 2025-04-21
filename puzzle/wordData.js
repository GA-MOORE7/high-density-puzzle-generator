export const wordList = [
  "hamster",
  "rabbit",
  "fish",
  "cat",
  "duck",
  "dog",
  "like",
  "home",
  "look",
  "what",
  "really",
  "sad",
  "ready",
  "angry",
  "sad",
  "thirsty",
  "tired",
  "hungry",
  "sleepy",
  "water",
  "want",
  "need",
  "happy",
  "mad",
  "excited",
  "bored",
  "scared"

  ];
  
  function sortByBest(words) {

    // Flatten all the characters into a single array
    const allChars = words.join('').split('');
    const allCharsCount = allChars.length;

    // Calculate the frequency of each character
    const frequency = {};
    for (const char of allChars) {

      frequency[char] = (frequency[char] || 0) + 1;

    }
    for (const char in frequency) {

      frequency[char] /= allCharsCount;

    }

    // Rate a word by summing frequencies of its characters
    function rateWord(word) {

      return [...word].reduce((sum, char) => sum + (frequency[char] || 0), 0);
    }

    // Sort words by their rating in descending order
    return [...words].sort((a, b) => rateWord(b)- rateWord(a));

  }

  export const words = sortByBest(wordList);





