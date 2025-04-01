export function generateGrid(array) {
  
    const gridContainer = document.getElementById("grid");
    const gridSize = Math.ceil(Math.sqrt(array.length))
    
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    gridContainer.innerHTML = "";
    
    array.forEach(item => {
      const cell = document.createElement("div");
      cell.classList.add("grid-item");
      cell.textContent = item;
      gridContainer.appendChild(cell);
     
    });
  }
  


