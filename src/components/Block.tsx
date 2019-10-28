import React from "react";
import { BlockProps } from "../types";
import { BLOCK_SIZE, BLOCK_COLORS } from "../constants";

export default function Block({ transform, value }: BlockProps) {
  return (
    <rect
      transform={transform}
      width={BLOCK_SIZE}
      height={BLOCK_SIZE}
      stroke={![8, 0].includes(value) ? "black" : "transparent"}
      fill={BLOCK_COLORS[value]}
    />
  );
}
