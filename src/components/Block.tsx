import React from "react";
import { BlockProps } from "../types";
import { BLOCK_SIZE } from "../constants";
import { useTheme, Theme } from "../context/ThemeContext";
import { useGameState } from "../context/GameContext";

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
