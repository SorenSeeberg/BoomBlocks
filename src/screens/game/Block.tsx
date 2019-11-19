import React from "react";
import { BlockProps } from "../../types";
import { useGameState } from "../../context/GameContext";
import { Theme, useTheme } from "../../context/ThemeContext";
import { BLOCK_SIZE } from "../../constants";

export default function Block({ transform, value }: BlockProps) {
  const { themeName } = useGameState();
  const currentTheme: Theme = useTheme()[themeName];

  return (
    <rect
      transform={transform}
      width={BLOCK_SIZE}
      height={BLOCK_SIZE}
      stroke={![8, 0].includes(value) ? "black" : "transparent"}
      fill={currentTheme.tetroColors[value]}
    />
  );
}
