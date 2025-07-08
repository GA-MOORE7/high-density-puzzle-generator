export let wordList = [];

export function getWordList() {
  return wordList;
}

export function updateWordListFromInput() {
  const textArea = document.getElementById("wordInput");
  if (!textArea) return;

  const words = textArea.value
    .split(/[\n, ]+/)
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length > 0);

  wordList.length = 0;
  wordList.push(...words);
}

// 🔗 Wire up the button click when the DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("applyWordsButton");
  if (button) {
    button.addEventListener("click", () => {
      updateWordListFromInput();
    });
  }
});





