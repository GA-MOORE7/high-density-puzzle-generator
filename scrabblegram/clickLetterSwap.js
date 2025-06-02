export function enableLetterSwapping() {
  const gridItems = document.querySelectorAll('.grid-item');
  let selectedGridItem = null;

  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      const content = item.textContent.trim();
      if (!content) return;

      if (!selectedGridItem) {
        selectedGridItem = item;
        item.classList.add('selected');
      } else if (selectedGridItem !== item) {
        // Swap letters
        const temp = selectedGridItem.textContent.trim();
        selectedGridItem.textContent = item.textContent.trim();
        item.textContent = temp;


        selectedGridItem.classList.remove('selected');
        selectedGridItem = null;
      } else {
        // Clicked same item twice -> deselect
        selectedGridItem.classList.remove('selected');
        selectedGridItem = null;
      }
    });
  });
}





