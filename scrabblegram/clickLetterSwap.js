import { colorMatchingLetters } from './colorMatchingLetters.js'; // Make sure this path is correct


let selectedGridItem = null;

export function enableLetterSwapping() {

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', () => {

            const content = item.textContent.trim();

            // only allow clicks on items that have a letter
            if(!content) return;

            if (!selectedGridItem) {
                // First letter selected
                selectedGridItem = item;
                item.style.border = '1px solid blue';
            } else if (selectedGridItem !== item) {

                // Second letter selected
                const temp = selectedGridItem.textContent;
                selectedGridItem.textContent = item.textContent;
                item.textContent = temp;

                // Recheck letter colors after swap
                colorMatchingLetters();
    

                // Clear border and reset selection
                selectedGridItem.style.border = '';
                selectedGridItem = null;

            } else {

                // Clicked the same cell again - deselect
                selectedGridItem.style.border = '';
                selectedGridItem = null;

            }

        })
    })

}





