export const wordList = [
 "walk",
 "hug",
 "climb",
 "jump",
 "swim",
 "hop",
 "crawl",
 "fly",
 "can",
 "onion",
 "bean",
 "potato",
 "carrot",
 "tomato",
 "they",
 "soup",
 "yummy",
 "drive",
 "cook",
 "music",
 "play"
  ];

  // Newly coded sortByBest function using Map object:
  
  function sortByBest(words) {

    if (words.length === 0) return [];

    // Step 1: Create an array of characters
    const allChars = words.join('').split('');
   
    // Step 2: Get the total amount of letters
    const totalChars = allChars.length; 
  
    // Step 3: Create a map objects for the letter counts
    const frequency = new Map(); 

    // Step 4: Set the char and its corresponding count
    for (const char of allChars) {
      frequency.set(char, (frequency.get(char) || 0) + 1);
    }
  
    // Step 5: Set the char and its relative frequency
    for (const [char, count] of frequency.entries()) {
      frequency.set(char, count / totalChars)
    }

    // Step 6: Helper function to rate each word based on its letters' relative frequencies 
    function rateWord(word) {
      return [...word].reduce((sum, char) => sum + (frequency.get(char) || 0), 0);
    }
  
    // Step 7: Rank the words in the array based on their letters' relative frequencies
    return [...words].sort((a, b) => rateWord(b) - rateWord(a));
   

  }
  
  export const words = sortByBest(wordList);





