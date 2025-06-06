// mergeColors.js
export function mergeColors(acrossColor, downColor) {
  if (acrossColor === 'green' || downColor === 'green') return 'green';
  if (acrossColor === 'brown' || downColor === 'brown') return 'brown';
  return 'red';
}