export function generateGrid(array, containerId = "grid") {
  const gridContainer = document.getElementById(containerId);
  if (!gridContainer) {
    console.error(`generateGrid: container with id="${containerId}" not found`);
    return;
  }

  const gridSize = Math.ceil(Math.sqrt(array.length));
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  gridContainer.innerHTML = ""; // Only clears this specific grid

  array.forEach((cellData, index) => {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);
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
        `x-${x}`,
        `y-${y}`,
        letter ? `letter-${letter}` : null,
        word ? `word-${word}` : null,
        vertical !== null ? `vertical-${vertical}` : null,
        intersectsWith ? `intersectsWith-${intersectsWith}` : null
      ].filter(Boolean);

      cell.textContent = cellData.displayedLetter || "";
      cell.id = idParts.join(" ");
    } else {
      cell.textContent = "";
      cell.id = `x-${x} y-${y} empty`;
    }

    gridContainer.appendChild(cell);
  });
}


  

  
  


