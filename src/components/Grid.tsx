import React from "react";
import { BLOCK_SIZE, GRID_SIZE, HIDDEN_ROW_COUNT } from "../constants";
import { LinesProps } from "../types";
import Block from "./Block";

function Grid({ lines, activePiece }: LinesProps) {
  return (
    <svg width={BLOCK_SIZE * GRID_SIZE.x} height={BLOCK_SIZE * GRID_SIZE.y}>
      {[].concat(
        lines.map((line: number[], y: number) =>
          line.map((value: number, x: number) => {
            return y >= HIDDEN_ROW_COUNT ? (
              <Block
                key={`${x}_${y}`}
                transform={`translate(${x * BLOCK_SIZE} ${y * BLOCK_SIZE -
                  HIDDEN_ROW_COUNT * BLOCK_SIZE})`}
                value={value}
              />
            ) : (
              undefined
            );
          })
        )
      )}
      {[].concat(
        activePiece.tetromino.data.map((line: number[], y: number) =>
          line.map((value: number, x: number) => {
            return activePiece.position.y + y >= HIDDEN_ROW_COUNT ? (
              <Block
                key={`${activePiece.position.x + x}_${activePiece.position.y +
                  y}`}
                transform={`translate(${(activePiece.position.x + x) *
                  BLOCK_SIZE} ${(activePiece.position.y + y) * BLOCK_SIZE -
                  HIDDEN_ROW_COUNT * BLOCK_SIZE})`}
                value={value !== 0 ? value : 8}
              />
            ) : (
              undefined
            );
          })
        )
      )}
    </svg>
  );
}

export default Grid;
