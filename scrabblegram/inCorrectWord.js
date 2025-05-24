export function getInCorrectWordMap() {
  const gridItems = document.querySelectorAll('.grid-item');
  const inCorrectWordMap = {};

  gridItems.forEach(item => {
    const idParts = item.id.split(' ');

    const xPart = idParts.find(part => part.startsWith('x-'));
    const yPart = idParts.find(part => part.startsWith('y-'));
    const letterPart = idParts.find(part => part.startsWith('letter-'));
    const wordPart = idParts.find(part => part.startsWith('word-'));

    const x = parseInt(xPart.split('-')[1], 10);
    const y = parseInt(yPart.split('-')[1], 10);
    const key = `${x},${y}`;

    const expectedLetter = letterPart ? letterPart.split('-')[1].toUpperCase() : '';
    const word = wordPart ? wordPart.split('-')[1].toUpperCase() : '';
    const displayedLetter = item.textContent.trim().toUpperCase();

    let inCorrectWord;

    if (!displayedLetter) {
      inCorrectWord = null; // no letter displayed
    } else {
      inCorrectWord = word.includes(displayedLetter);
    }

    inCorrectWordMap[key] = { inCorrectWord };
  });

  return inCorrectWordMap;
}

