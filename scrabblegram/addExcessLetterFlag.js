import { filterMismatchedGridItems } from "./filterMissmatchedGridItems.js";

export function markExcessNonIntersectingItems() {
    // 🔄 Clear all previously marked excess items
    document.querySelectorAll('.excess-flag').forEach(item => {
        item.classList.remove('excess-flag');
    });

    const excessDetails = filterMismatchedGridItems();

    for (const word in excessDetails) {
        const letters = excessDetails[word];

        for (const letterKey in letters) {
            const { actualGridItems, actualLetterCount, expectedLetterCount } = letters[letterKey];

            if (actualLetterCount <= expectedLetterCount) continue;

            for (const { item } of actualGridItems) {
                const idMatch = item.id.match(/word-([a-zA-Z]+)/);
                const wordFromId = idMatch ? idMatch[1] : null;

                if (wordFromId !== word) continue;

                const intersectMatch = item.id.match(/intersectsWith-([a-zA-Z]+)/);
                const intersectsWith = intersectMatch ? intersectMatch[1] : "none";
                const isIntersecting = intersectsWith !== "none";

                let markAsExcess = true;

                if (isIntersecting) {
                    const intersectingWordData = excessDetails[intersectsWith];
                    const intersectingHasSameExcess =
                        intersectingWordData &&
                        intersectingWordData[letterKey] &&
                        intersectingWordData[letterKey].actualLetterCount >
                        intersectingWordData[letterKey].expectedLetterCount;

                    if (!intersectingHasSameExcess) {
                        markAsExcess = false;
                    }
                }

                if (markAsExcess) {
                    item.classList.add("excess-flag");
                }
            }
        }
    }
}




