export function generateGrid(array) {
  const gridContainer = document.getElementById("grid");
  const gridSize = Math.ceil(Math.sqrt(array.length));
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  gridContainer.innerHTML = "";

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
      ].filter(Boolean); // remove null/undefined

      cell.textContent = letter;
      cell.id = idParts.join(" ");
    } else {
      cell.textContent = "";
      cell.id = `x-${x} y-${y} empty`;
    }

    gridContainer.appendChild(cell);
  });
}

  

  
  


