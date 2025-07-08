export function generateGrid(array, containerId = "grid") {
  const gridContainer = document.getElementById(containerId);
  if (!gridContainer) {
    console.error(`generateGrid: container with id="${containerId}" not found`);
    return;
  }

  const gridSize = Math.ceil(Math.sqrt(array.length));
  const isPlayGrid = containerId === "play-grid";

  const totalSize = isPlayGrid ? gridSize + 1 : gridSize;

  gridContainer.style.gridTemplateColumns = `repeat(${totalSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${totalSize}, 1fr)`;
  gridContainer.innerHTML = "";

  if (isPlayGrid) {
    // Add top row axis labels (A, B, C, ...)
    for (let col = 0; col < totalSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-axis-label");
      cell.textContent = col === 0 ? "" : String.fromCharCode(64 + col); // 64 + 1 = 'A'
      gridContainer.appendChild(cell);
    }
  }

  // Grid rows
  for (let row = 0; row < gridSize; row++) {
    if (isPlayGrid) {
      // Add row label (1, 2, 3, ...)
      const axisCell = document.createElement("div");
      axisCell.classList.add("grid-axis-label");
      axisCell.textContent = row + 1;
      gridContainer.appendChild(axisCell);
    }

    for (let col = 0; col < gridSize; col++) {
      const index = row * gridSize + col;
      const cellData = array[index];
      const cell = document.createElement("div");
      cell.classList.add("grid-item");

      if (cellData) {
        const {
          letter = "",
          word = null,
          vertical = false,
          intersectsWith = null
        } = cellData;

        const idParts = [
          `x-${col}`,
          `y-${row}`,
          letter ? `letter-${letter}` : null,
          word ? `word-${word}` : null,
          vertical !== null ? `vertical-${vertical}` : null,
          intersectsWith ? `intersectsWith-${intersectsWith}` : null
        ].filter(Boolean);

        cell.textContent = cellData.displayedLetter || "";
        cell.id = idParts.join(" ");
      } else {
        cell.textContent = "";
        cell.id = `x-${col} y-${row} empty`;
      }

      gridContainer.appendChild(cell);
    }
  }
}



  

  
  


