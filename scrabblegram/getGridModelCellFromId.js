export function getGridModelCellFromId(id, gridModel) {
  const xMatch = id.match(/x-(\d+)/);
  const yMatch = id.match(/y-(\d+)/);

  if (!xMatch || !yMatch) {
    console.warn("Invalid ID format:", id);
    return null;
  }

  const x = parseInt(xMatch[1], 10);
  const y = parseInt(yMatch[1], 10);

  if (!gridModel[y] || !gridModel[y][x]) {
    console.warn(`Invalid coordinates: x=${x}, y=${y}`);
    return null;
  }

  return gridModel[y][x];
}

