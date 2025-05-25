export function categorizeGridItems(gridData) {
  const categories = {
    correctGreen: [],     // correctLetter === true
    wrongWordRed: [],     // inCorrectWord === false
    misplacedYellow: [],  // excess === false
    potentialExcess: []   // everything else
  };

  for (const key in gridData) {
    const cell = gridData[key];

    // Exclude cells with no displayed letter
    if (!cell.displayedLetter) continue;

    // Prioritize correctLetter === true
    if (cell.correctLetter === true ) {
      categories.correctGreen.push(key);
    }
    // Then check inCorrectWord === false (explicitly false)
    else if (cell.inCorrectWord === false && cell.intersects === false) {
      categories.wrongWordRed.push(key);
    }
    // Then excess === false (explicitly false)
    else if (cell.excess === false) {
      categories.misplacedYellow.push(key);
    }
    // Everything else falls here
    else {
      categories.potentialExcess.push(key);
    }
  }

  return categories;
}

