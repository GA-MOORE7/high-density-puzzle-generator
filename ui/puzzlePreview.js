export function createPuzzleUploader(getCurrentGridData) {
  const leftPanel = document.querySelector('.left-panel');
  const gridContainer = document.getElementById('grid');

  // Create the uploader container
  const uploaderContainer = document.createElement('div');
  uploaderContainer.style.marginTop = '1.5em';
  uploaderContainer.style.display = 'flex';
  uploaderContainer.style.flexDirection = 'column';
  uploaderContainer.style.alignItems = 'center'; // Center horizontally
  uploaderContainer.style.gap = '0.75em';

  // Horizontal row for input + button
  const inputRow = document.createElement('div');
  inputRow.style.display = 'flex';
  inputRow.style.flexDirection = 'row';
  inputRow.style.alignItems = 'center';
  inputRow.style.justifyContent = 'center';
  inputRow.style.gap = '0.5em';
  inputRow.style.flexWrap = 'wrap'; // Wrap on smaller screens

  // Input field
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Enter Puzzle Title';
  titleInput.style.padding = '0.5em';
  titleInput.style.fontSize = '1em';
  titleInput.style.maxWidth = '300px';
  titleInput.id = 'puzzle-title';

  // Upload button
  const uploadButton = document.createElement('button');
  uploadButton.textContent = 'Upload Puzzle';
  uploadButton.style.padding = '0.5em 1em';
  uploadButton.style.fontSize = '1em';
  uploadButton.style.backgroundColor = '#4CAF50';
  uploadButton.style.color = 'white';
  uploadButton.style.border = 'none';
  uploadButton.style.borderRadius = '4px';
  uploadButton.style.cursor = 'pointer';

  // Hover effect
  uploadButton.addEventListener('mouseenter', () => {
    uploadButton.style.backgroundColor = '#45a049';
  });
  uploadButton.addEventListener('mouseleave', () => {
    uploadButton.style.backgroundColor = '#4CAF50';
  });

  // Assemble uploader
  inputRow.appendChild(titleInput);
  inputRow.appendChild(uploadButton);
  uploaderContainer.appendChild(inputRow);

  // Insert uploader after grid
  if (gridContainer && leftPanel) {
    gridContainer.insertAdjacentElement('afterend', uploaderContainer);
  } else if (leftPanel) {
    leftPanel.appendChild(uploaderContainer);
  } else {
    document.body.appendChild(uploaderContainer);
  }

  // Upload logic
  uploadButton.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const grid = getCurrentGridData();

    if (!title) {
      alert('Please enter a puzzle title.');
      return;
    }

    const puzzleData = { title, grid };

    try {
      const response = await fetch('https://scrabblegrams-fox-90a0cb6e632f.herokuapp.com/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(puzzleData),
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



