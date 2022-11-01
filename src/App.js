import React from "react";
import "./App.css";

const CUBE_OF_TILES = 10;
function App() {
  const [tileMatrix, setTileMatrix] = React.useState(
    new Array(CUBE_OF_TILES)
      .fill("")
      .map(() => new Array(CUBE_OF_TILES).fill(0))
  );
  const [initialTiles, setInitialTiles] = React.useState([
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 2, y: 3 },
  ]);

  const isAlive = (coords) => !!tileMatrix[coords.y][coords.x];

  React.useEffect(() => {
    let NextTileMatrix = [...tileMatrix];
    initialTiles.forEach((tile) => (NextTileMatrix[tile.y][tile.x] = 1));
    setTileMatrix(NextTileMatrix);
  }, []);

  React.useEffect(() => {
    console.log("hi");
  }, [tileMatrix]);

  const TILE_GRID = React.useMemo(() => {
    const generateRow = (yPosition) =>
      new Array(CUBE_OF_TILES).fill("").map((__, index) => (
        <div
          className={`Tile ${
            isAlive({ x: index, y: yPosition }) ? "Alive" : ""
          }`}
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
        <h1>tile clicked {JSON.stringify(initialTiles)}</h1>
        <label htmlFor="intialStart">Intial starting cells</label>
        <input></input>
      </div>

      {TILE_GRID}
    </div>
  );
}

export default App;
