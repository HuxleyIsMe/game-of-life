import React from "react";
import "./App.css";

const CUBE_OF_TILES = 10;

const howManyLivingNeighbours = (cellIndex, cells) => {
  let neighboursCoords = {
    n: -CUBE_OF_TILES,
    ne: -CUBE_OF_TILES + 1,
    e: 1,
    se: CUBE_OF_TILES + 1,
    s: CUBE_OF_TILES,
    sw: CUBE_OF_TILES - 1,
    w: -1,
    nw: -CUBE_OF_TILES - 1,
  };

  let neighboursIndexs = Object.values(neighboursCoords).map(
    (coord) => cellIndex + coord
  );

  let livingCellIndexs = neighboursIndexs.filter(
    (index) => cells[index]
  ).length;

  return livingCellIndexs;
};

const generateNextState = (currentState) => {
  // loop over the cells and check
  let flatMatrix = [...currentState].flat();

  let nextMatrix = flatMatrix.map((alive, index) => {
    let livingNeighbours = howManyLivingNeighbours(index, flatMatrix);
    if ((livingNeighbours === 2 || livingNeighbours === 3) && alive) {
      return 1;
    } else if (livingNeighbours === 3 && !alive) {
      return 1;
    } else {
      return 0;
    }
  });

  const backToNested = (flatArray, length = CUBE_OF_TILES) =>
    new Array(length)
      .fill("lol")
      .map((__, index) =>
        flatArray.slice(index * length, index * length + length)
      );

  return backToNested(nextMatrix);
};
function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [tileMatrix, setTileMatrix] = React.useState(
    new Array(CUBE_OF_TILES)
      .fill("")
      .map(() => new Array(CUBE_OF_TILES).fill(0))
  );
  const [initialTiles, setInitialTiles] = React.useState([
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 5, y: 3 },
    // { x: 5, y: 0 },
    // { x: 5, y: 8 },
    // { x: 5, y: 9 },
  ]);

  const isAlive = (coords) => !!tileMatrix[coords.y][coords.x];

  React.useEffect(() => {
    let NextTileMatrix = [...tileMatrix];
    initialTiles.forEach((tile) => (NextTileMatrix[tile.y][tile.x] = 1));
    setTileMatrix(NextTileMatrix);
  }, [initialTiles]);

  React.useEffect(() => {
    let nextState = generateNextState(tileMatrix);
    setTimeout(() => setTileMatrix(nextState), 1000);
  }, [tileMatrix]);

  const TILE_GRID = React.useMemo(() => {
    const generateRow = (yPosition) =>
      new Array(CUBE_OF_TILES).fill("").map((__, index) => (
        <div
          disabled={isPlaying}
          onClick={() =>
            !isPlaying
              ? setInitialTiles((prev) => [...prev, { x: index, y: yPosition }])
              : null
          }
          className={`Tile ${
            isAlive({ x: index, y: yPosition }) && isPlaying ? "Alive" : ""
          }
          ${isAlive({ x: index, y: yPosition }) && !isPlaying ? "Chosen" : ""}`}
          key={`${index}-${yPosition}`}
        >
          {index}
        </div>
      ));

    return (
      <div className="TileGrid">
        {new Array(CUBE_OF_TILES).fill("").map((__, index) => (
          <div className="row" key={`row-${index}`}>
            {generateRow(index)}
          </div>
        ))}
      </div>
    );
  }, [tileMatrix]);

  return (
    <div className="App">
      <div>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? "choose new tiles" : "choose tiles"}
        </button>
      </div>
      {TILE_GRID}
    </div>
  );
}

export default App;
