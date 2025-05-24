// getDisplayedLetterMap.js
export function getDisplayedLetterMap() {
  const gridItems = document.querySelectorAll('.grid-item');
  const displayedLetterMap = {};

  gridItems.forEach(item => {
    const idParts = item.id.split(' ');
    const x = parseInt(idParts.find(p => p.startsWith('x-')).split('-')[1], 10);
    const y = parseInt(idParts.find(p => p.startsWith('y-')).split('-')[1], 10);
    const key = `${x},${y}`;
    const displayedLetter = item.textContent.trim() || null;

    displayedLetterMap[key] = { displayedLetter };
  });

  return displayedLetterMap;
}
