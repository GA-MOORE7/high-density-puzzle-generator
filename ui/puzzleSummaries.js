import { attachDeleteHandlers } from './deletePuzzle.js';
import { attachPlayHandlers } from './retrieveAndDisplayPuzzle.js';

async function fetchPuzzles() {
  const res = await fetch('http://scrabblegrams-fox-90a0cb6e632f.herokuapp.com/api/puzzles/summary');
  const puzzles = await res.json();

  const tbody = document.querySelector('#puzzleTable tbody');
  tbody.innerHTML = '';

  puzzles.forEach(puzzle => {
    const row = document.createElement('tr');
    const formattedDate = new Date(puzzle.createdAt).toLocaleDateString();

    row.innerHTML = `
      <td>${formattedDate}</td>
      <td>${puzzle.title}</td>
      <td>${puzzle.wordCount}</td>
      <td>${puzzle.words.join(', ')}</td>
      <td>${puzzle.size}</td>
      <td>${puzzle.density}</td>
      <td><button class="play-btn" data-id="${puzzle.id}">Let's Play</button></td>
      <td><button class="delete-btn" data-id="${puzzle.id}">Delete</button></td>
    `;

    tbody.appendChild(row);
  });

  attachDeleteHandlers(fetchPuzzles); 
  attachPlayHandlers(fetchPuzzles);
}

fetchPuzzles();
