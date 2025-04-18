export const wordList = [
  "cat", "dog", "sun", "hat", "pen",       // 3 letters
  "frog", "milk", "star", "book", "jump",  // 4 letters
  "plant", "grape", "chair", "cloud", "train", // 5 letters
  "banana", "pencil", "rocket", "flower", "sneeze", // 6 letters
  "teacher", "diamond", "blanket", "monster", "freight", // 7 letters
  "map", "red", "fan", "box", "owl",        // 3 letters
  "tree", "lamp", "fish", "game", "ball",   // 4 letters
  "apple", "mouse", "tiger", "beach", "brush", // 5 letters
  "window", "guitar", "bottle", "saddle", "basket", // 6 letters
  "picture", "journey", "present", "harmony", "library" // 7 letters
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





