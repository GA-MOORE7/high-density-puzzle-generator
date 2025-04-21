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
      const { letter, word, vertical, intersectsWith } = cellData;
      const intersectTag = intersectsWith ? `intersectsWith-${intersectsWith}` : `intersectsWith-none`;
      cell.textContent = letter;
      cell.id = `x-${x} y-${y} letter-${letter} word-${word} vertical-${vertical} ${intersectTag}`;
    } else {
      cell.textContent = "";
      cell.id = `x-${x} y-${y} empty`;
    }

    gridContainer.appendChild(cell);
  });
}

  

  
  


