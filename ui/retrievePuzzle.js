// retrievePuzzle.js
export function attachPlayHandlers() {
  document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;

      try {
        const res = await fetch(`http://localhost:3000/api/puzzle/${id}`);

        if (!res.ok) {
          const error = await res.json();
          alert(`Failed to load puzzle: ${error.message}`);
          return;
        }

        const puzzleData = await res.json();

        console.log("🧩 Retrieved puzzle:", puzzleData);

      } catch (err) {
        console.error('Error fetching puzzle:', err);
        alert('Could not retrieve puzzle.');
      }
    });
  });
}
