import React from "react";
import "./App.css";
import { GameGrid } from "./components/game-grid";

const CUBE_OF_TILES = 10;
const generateTileMatrix = () =>
  new Array(CUBE_OF_TILES).fill("").map(() => new Array(CUBE_OF_TILES).fill(0));

function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [initialTiles, setInitialTiles] = React.useState([
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 5, y: 3 },
    // { x: 5, y: 0 },
    // { x: 5, y: 8 },
    // { x: 5, y: 9 },
  ]);

  const startingMatrix = (() => {
    let NextTileMatrix = [...generateTileMatrix()];
    initialTiles.forEach((tile) => (NextTileMatrix[tile.y][tile.x] = 1));
    return NextTileMatrix;
  })();

  return (
    <div className="App">
      <div>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? "choose new tiles" : "choose tiles"}
        </button>
      </div>
      {isPlaying ? (
        <GameGrid startingTiles={startingMatrix} cubeSize={CUBE_OF_TILES} />
      ) : (
        <div>select tiles</div>
      )}
    </div>
  );
}

export default App;
