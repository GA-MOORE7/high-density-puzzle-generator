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

            const excessCount = actualLetterCount - expectedLetterCount;
            if (excessCount <= 0) continue;

            // Clone and sort items to prioritize non-intersecting first
            const sortedItems = [...actualGridItems].sort((a, b) => {
                const aIntersects = a.item.id.includes("intersectsWith-") && !a.item.id.includes("intersectsWith-none");
                const bIntersects = b.item.id.includes("intersectsWith-") && !b.item.id.includes("intersectsWith-none");
                return aIntersects - bIntersects;
            });

            let flagged = 0;

            for (const { item } of sortedItems) {
                // ✅ Skip if this item doesn't belong to the current word
                const idMatch = item.id.match(/word-([a-zA-Z]+)/);
                const wordFromId = idMatch ? idMatch[1].toLowerCase() : '';
                if (wordFromId !== word) continue;

                if (flagged >= excessCount) break;

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
                    flagged++;
                }
            }
        }
    }
}





