export function arrayGenerator(num) {
    const gridSize = num * num;
    const array = [];

    for (let i = 0; i < gridSize; i++) {
        array.push(" "); // Fills with empty spaces
    }

    return array;
}



