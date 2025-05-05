export function generateGrid(array) {
  // 1. Get the grid container element from the DOM
  const gridContainer = document.getElementById("grid");

  // 2. Determine the grid size (square layout) based on the number of items
  const gridSize = Math.ceil(Math.sqrt(array.length));

  // 3. Apply the grid layout styling to the container
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  // 4. Clear any existing content in the grid
  gridContainer.innerHTML = "";

  // 5. Loop through each item in the array and create a grid cell for it
  array.forEach((cellData, index) => {
    // 5a. Calculate the cell's x and y position in the grid
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);

    // 5b. Create a new <div> element for the cell
    const cell = document.createElement("div");
    cell.classList.add("grid-item");

    // 5c. If the cellData exists, fill in its details
    if (cellData) {
      // Destructure with default values to avoid undefined errors
      const {
        letter = "",
        word = "none",
        vertical = false,
        intersectsWith = null
      } = cellData;

      // 5d. Create a tag for intersection status
      const intersectTag = `intersectsWith-${intersectsWith || "none"}`;

      // 5e. Set the text content of the cell to the letter
      cell.textContent = letter;

      // 5f. Construct a detailed ID with all useful metadata
      cell.id = [
        `x-${x}`,
        `y-${y}`,
        `letter-${letter}`,
        `word-${word}`,
        `vertical-${vertical}`,
        intersectTag
      ].join(" ");
    } else {
      // 5g. If no data, make it an empty cell with coordinates
      cell.textContent = "";
      cell.id = `x-${x} y-${y} empty`;
    }

    // 5h. Add the cell to the grid container
    gridContainer.appendChild(cell);
  });
}

  

  
  


