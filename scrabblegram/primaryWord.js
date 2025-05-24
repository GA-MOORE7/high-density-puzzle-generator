// primaryWord.js
export function getPrimaryWordMap() {
  const gridItems = document.querySelectorAll('.grid-item');
  const primaryWordMap = {};

  gridItems.forEach(item => {
    const idParts = item.id.split(' ');

    const xPart = idParts.find(part => part.startsWith('x-'));
    const yPart = idParts.find(part => part.startsWith('y-'));
    const wordPart = idParts.find(part => part.startsWith('word-'));

    const x = parseInt(xPart.split('-')[1], 10);
    const y = parseInt(yPart.split('-')[1], 10);
    const primaryWord = wordPart?.split('-')[1] || null;

    const key = `${x},${y}`;
    primaryWordMap[key] = { primaryWord };
  });

  return primaryWordMap;
}
