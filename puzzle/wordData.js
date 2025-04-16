export const wordList = [
    "apple", "banana", "cherry", "grape", "orange", "melon", "mango", "lemon",
    "kiwi", "peach", "pear", "plum", "fig", "date", "apricot", "blueberry",
    "cantaloupe", "papaya", "pineapple", "watermelon", "raspberry", "blackberry",
    "cranberry", "guava", "pomegranate", "lychee", "starfruit", "dragonfruit",
    "passionfruit", "tangerine", "nectarine", "coconut", "lime", "boysenberry",
    "persimmon", "currant", "gooseberry", "quince", "jackfruit", "durian",
    "mulberry", "longan", "soursop", "rambutan", "blood orange",
    "jabuticaba", "miracle fruit"
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





