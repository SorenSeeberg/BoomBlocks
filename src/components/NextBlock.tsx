import React from "react";
import Window from "./Window";
import { useGame } from "../context/GameContext";
import { STYLES, BLOCK_SIZE } from "../constants";
import Block from "./Block";
import { Tetromino } from "../types";

type NextBlockProps = {
  width: string;
};

export default function NextBlock({ width }: NextBlockProps) {
  const [{ next }, dispatch] = useGame();

  const strippedData: number[][] = next.data.filter(
    l => l.reduce((a, b) => a + b, 0) > 0
  );
  const strippedNext: Tetromino = {
    ...next,
    data: strippedData,
    size: { x: strippedData[0].length, y: strippedData.length }
  };

  return (
    <Window width={width} height={STYLES.infoBoxHeight}>
      <div
        style={{
          color: STYLES.fontColorInfo,
          fontSize: STYLES.fontSizeInfo,
          background: "black",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <svg
          width={BLOCK_SIZE * strippedNext.size.x}
          height={BLOCK_SIZE * strippedNext.size.y}
        >
          {[].concat(
            strippedNext.data.map((line: number[], y: number) =>
              line.map((value: number, x: number) => (
                <Block
                  key={`${x}_${y}`}
                  transform={`translate(${x * BLOCK_SIZE} ${y * BLOCK_SIZE})`}
                  value={value !== 0 ? value : 9}
                />
              ))
            )
          )}
        </svg>
      </div>
    </Window>
  );
}
