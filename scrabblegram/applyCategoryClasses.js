// ✳️ Add this helper function once, above your main logic
export function applyCategoryClasses(gridData, categories) {
  const allGridItems = document.querySelectorAll('.grid-item');

  allGridItems.forEach(item => {
    item.classList.remove('correct-green', 'wrong-word-red', 'misplaced-yellow', 'potential-excess');

    const match = item.id.match(/x-(\d+)\s*y-(\d+)/);
    if (!match) return;

    const x = match[1];
    const y = match[2];
    const key = `${x},${y}`;

    if (categories.correctGreen.includes(key)) {
      item.classList.add('correct-green');
    } else if (categories.wrongWordRed.includes(key)) {
      item.classList.add('wrong-word-red');
    } else if (categories.misplacedYellow.includes(key)) {
      item.classList.add('misplaced-yellow');
    } else if (categories.potentialExcess.includes(key)) {
      item.classList.add('potential-excess');
    }
  });
}