// checkCorrectLetterMap.js
export function getCorrectLetterMap() {
  const gridItems = document.querySelectorAll('.grid-item');
  const correctLetterMap = {};

  gridItems.forEach(item => {
    const idParts = item.id.split(' ');
    const xPart = idParts.find(part => part.startsWith('x-'));
    const yPart = idParts.find(part => part.startsWith('y-'));
    const letterPart = idParts.find(part => part.startsWith('letter-'));

    const x = parseInt(xPart.split('-')[1], 10);
    const y = parseInt(yPart.split('-')[1], 10);
    const expectedLetter = letterPart?.split('-')[1];
    const displayedLetter = item.textContent.trim();

    const key = `${x},${y}`;

    let correctLetter;
    if (!displayedLetter) {
      correctLetter = null;
    } else {
      correctLetter = expectedLetter !== null && displayedLetter === expectedLetter;
    }

    correctLetterMap[key] = { correctLetter };
  });

  return correctLetterMap;
}
