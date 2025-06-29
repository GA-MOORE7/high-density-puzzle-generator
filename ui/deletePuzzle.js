// deletePuzzleHandler.js
export function attachDeleteHandlers(fetchPuzzles) {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      if (confirm('Are you sure you want to delete this puzzle?')) {
        try {
          const deleteRes = await fetch(`http://localhost:3000/api/puzzle/${id}`, {
            method: 'DELETE',
          });

          if (deleteRes.ok) {
            alert('Puzzle deleted successfully.');
            fetchPuzzles(); // Refresh table
          } else {
            const error = await deleteRes.json();
            alert(`Delete failed: ${error.message}`);
          }
        } catch (err) {
          console.error('Error deleting puzzle:', err);
          alert('Failed to delete puzzle.');
        }
      }
    });
  });
}
