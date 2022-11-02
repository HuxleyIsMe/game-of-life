const generateNeighboursCoords = (cellXpos, cellYpos) => ({
  north: { x: cellXpos, y: cellYpos - 1 },
  northEast: { x: cellXpos + 1, y: cellYpos - 1 },
  east: { x: cellXpos + 1, y: cellYpos },
  southEast: { x: cellXpos + 1, y: cellYpos + 1 },
  south: { x: cellXpos, y: cellYpos + 1 },
  southWest: { x: cellXpos - 1, y: cellYpos + 1 },
  west: { x: cellXpos - 1, y: cellYpos },
  northWest: { x: cellXpos - 1, y: cellYpos - 1 },
});

export const generateNextState = (matrix) => {
  const nextMatrix = matrix.map((row, yPos) =>
    row.map((isAlive, xPos) => {
      const neighboursCoords = generateNeighboursCoords(xPos, yPos);
      let livingNeighbours = Object.values(neighboursCoords).filter((coord) =>
        matrix[coord.y] ? matrix[coord.y][coord.x] : false
      ).length;

      if ((livingNeighbours === 2 || livingNeighbours === 3) && isAlive) {
        return 1;
      } else if (livingNeighbours === 3 && !isAlive) {
        return 1;
      } else {
        return 0;
      }
    })
  );
  return nextMatrix;
};
