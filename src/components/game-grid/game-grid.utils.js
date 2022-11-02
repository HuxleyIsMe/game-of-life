const generateNeighboursCoords = (cubeSize) => ({
  north: -cubeSize,
  northEast: -cubeSize + 1,
  east: 1,
  southEast: cubeSize + 1,
  south: cubeSize,
  southWest: cubeSize - 1,
  west: -1,
  northWest: -cubeSize - 1,
});

const howManyLivingNeighbours = (cellIndex, cells, cubeSize) => {
  const neighboursCoords = generateNeighboursCoords(cubeSize);

  let neighboursIndexs = Object.values(neighboursCoords).map(
    (coord) => cellIndex + coord
  );

  let livingCellIndexs = neighboursIndexs.filter(
    (index) => cells[index]
  ).length;

  return livingCellIndexs;
};

const backToNestedArray = (flatArray, length) =>
  new Array(length)
    .fill("lol")
    .map((__, index) =>
      flatArray.slice(index * length, index * length + length)
    );

export const generateNextState = (currentState, cubeSize) => {
  // loop over the cells and check
  let flatMatrix = [...currentState].flat();

  let nextMatrix = flatMatrix.map((alive, index) => {
    let livingNeighbours = howManyLivingNeighbours(index, flatMatrix, cubeSize);
    if ((livingNeighbours === 2 || livingNeighbours === 3) && alive) {
      return 1;
    } else if (livingNeighbours === 3 && !alive) {
      return 1;
    } else {
      return 0;
    }
  });

  return backToNestedArray(nextMatrix, cubeSize);
};
