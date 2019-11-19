import React from "react";
import { useGameState } from "../../context/GameContext";
import { Tetromino } from "../../types";
import { STYLES, BLOCK_SIZE } from "../../constants";
import { Column } from "../../components/Layout";
import { Window } from "../../components/Window";
import Block from "./Block";

type NextBlockProps = {
  width: string;
};

export default function NextBlock({ width }: NextBlockProps) {
  const { next } = useGameState();

  const strippedData: number[][] = next.data.filter(
    l => l.reduce((a, b) => a + b, 0) > 0
  );
  const strippedNext: Tetromino = {
    ...next,
    data: strippedData,
    size: { x: strippedData[0].length, y: strippedData.length }
  };

  return (
    <Window width={width} height={STYLES.infoBoxHeight} background="black">
      <Column height="100%">
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
      </Column>
    </Window>
  );
}
