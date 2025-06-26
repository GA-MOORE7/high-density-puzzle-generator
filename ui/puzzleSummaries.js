    async function fetchPuzzles() {
      const res = await fetch('http://localhost:3000/api/puzzles/summary');
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
        `;

        tbody.appendChild(row);
      });
    }

    fetchPuzzles();