// getExpectedLetterMap.js
export function getExpectedLetterMap() {
  const gridItems = document.querySelectorAll('.grid-item');
  const expectedLetterMap = {};

  gridItems.forEach(item => {
    const idParts = item.id.split(' ');
    const x = parseInt(idParts.find(p => p.startsWith('x-')).split('-')[1], 10);
    const y = parseInt(idParts.find(p => p.startsWith('y-')).split('-')[1], 10);
    const letterPart = idParts.find(part => part.startsWith('letter-'));
    const expectedLetter = letterPart?.split('-')[1] || null;
    const key = `${x},${y}`;

    expectedLetterMap[key] = { expectedLetter };
  });

  return expectedLetterMap;
}
