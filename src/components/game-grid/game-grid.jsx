import React from "react";
import { generateNextState } from "./game-grid.utils";
import "./game-grid.css";

export const GameGrid = ({ startingTiles, cubeSize }) => {
  const [tileMatrix, setTileMatrix] = React.useState(startingTiles);

  const cubeSizeAsArray = React.useMemo(
    () => new Array(cubeSize).fill(""),
    [cubeSize]
  );

  React.useEffect(() => {
    setTimeout(
      () => setTileMatrix(generateNextState(tileMatrix, cubeSize)),
      1000
    );
  }, [tileMatrix]);

  const isAlive = (coords) => !!tileMatrix[coords.y][coords.x];

  const TILE_GRID = React.useMemo(() => {
    const generateRow = (yPosition) =>
      cubeSizeAsArray.map((__, index) => (
        <div
          className={`Tile ${
            isAlive({ x: index, y: yPosition }) ? "Alive" : ""
          }`}
          key={`${index}-${yPosition}`}
          //   disabled={isPlaying}
          //   onClick={() =>
          //     !isPlaying
          //       ? setInitialTiles((prev) => [...prev, { x: index, y: yPosition }])
          //       : null
          //   }

          //   ${
          //     isAlive({ x: index, y: yPosition }) && !isPlaying
          //       ? "Chosen"
          //       : ""
          //   }`}
        >
          {index}
        </div>
      ));

    return (
      <div className="TileGrid">
        {cubeSizeAsArray.map((__, index) => (
          <div className="row" key={`row-${index}`}>
            {generateRow(index)}
          </div>
        ))}
      </div>
    );
  }, [tileMatrix]);

  return <>{TILE_GRID}</>;
};
