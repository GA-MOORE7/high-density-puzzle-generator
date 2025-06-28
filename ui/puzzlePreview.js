export function createPuzzleUploader(getCurrentGridData) {
  // Select the container where you want to insert uploader (inside .left-panel after #grid)
  const leftPanel = document.querySelector('.left-panel');
  const gridContainer = document.getElementById('grid');

  // Create container for uploader elements
  const uploaderContainer = document.createElement('div');
  uploaderContainer.style.margin = '1em 0';

  // Title input
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Enter Puzzle Title';
  titleInput.style.marginRight = '1em';
  titleInput.style.padding = '0.5em';
  titleInput.id = 'puzzle-title';

  // Upload button
  const uploadButton = document.createElement('button');
  uploadButton.textContent = 'Upload Puzzle';
  uploadButton.style.padding = '0.5em 1em';
  uploadButton.style.cursor = 'pointer';

  uploaderContainer.appendChild(titleInput);
  uploaderContainer.appendChild(uploadButton);

  // Insert uploaderContainer immediately after the gridContainer inside leftPanel
  if (gridContainer && leftPanel) {
    gridContainer.insertAdjacentElement('afterend', uploaderContainer);
  } else if (leftPanel) {
    // fallback: append at end of leftPanel if #grid not found
    leftPanel.appendChild(uploaderContainer);
  } else {
    // fallback: append to body if .left-panel missing
    document.body.appendChild(uploaderContainer);
  }

  // Upload logic
  uploadButton.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const grid = getCurrentGridData(); // should return the array like in your structure

    if (!title) {
      alert('Please enter a puzzle title.');
      return;
    }

    const puzzleData = { title, grid };

    try {
      const response = await fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(puzzleData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Upload failed with status ${response.status}`);
      }

      const result = await response.json();
      alert(`✅ Puzzle uploaded successfully with ID: ${result._id || 'N/A'}`);
    } catch (error) {
      console.error('❌ Error uploading puzzle:', error);
      alert(`Upload failed: ${error.message}`);
    }
  });
}


