import { wordsWithExcess } from "./wordsWithExcess.js";

export function filterMismatchedGridItems() {
    const excessDetails = wordsWithExcess(); // Get the words with excess letter counts

    // Iterate through the words with excess letters
    for (const word in excessDetails) {
        const letters = excessDetails[word]; // Get the letters for each word

        // Iterate through the letters for each word
        for (const letterKey in letters) {
            const { actualGridItems } = letters[letterKey]; // Get the grid items for each letter

            // Filter out grid items where the letter id matches the letter key
            const updatedGridItems = actualGridItems.filter(({ item }) => {
                // Extract the letter from the ID attribute of the item (e.g., 'letter-b')
                const idMatch = item.id.match(/letter-([a-z])/i);
                const letterFromId = idMatch ? idMatch[1].toLowerCase() : null;

                // Return true if the letter ID doesn't match the letter key (keep it)
                return letterFromId !== letterKey.toLowerCase();
            });

            // Update the actualGridItems array in the excessDetails object with the filtered items
            letters[letterKey].actualGridItems = updatedGridItems;
        }
    }

    // Optionally, return the updated wordsWithExcess object if needed
    return excessDetails;
}








