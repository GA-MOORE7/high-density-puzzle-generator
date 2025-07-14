export async function fetchSolutionGridById(id) {
  try {
    const res = await fetch(`https://scrabblegrams-fox-90a0cb6e632f.herokuapp.com/api/puzzle/${id}/solution`);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`Failed to load solution: ${error.message}`);
    }

    const solutionData = await res.json();
    console.log('🟢 Retrieved solution:', solutionData.grid);
    return solutionData.grid;

  } catch (err) {
    console.error('❌ Error fetching solution:', err);
    throw err;
  }
}
