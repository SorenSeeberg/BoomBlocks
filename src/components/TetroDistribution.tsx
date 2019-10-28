import React from "react";
import { useGame } from "../context/GameContext";
import { Row } from "./Layout";
import { BLOCK_COLORS } from "../constants";

function Bar({ height = "100px", index }) {
  return (
    <div
      style={{
        height: height === "0px" ? "4px" : height,
        width: "30px",
        background: BLOCK_COLORS[`${parseInt(index, 0) + 1}`],
        transition: "height 0.35s ease"
      }}
    />
  );
}

export function TetroDistribution() {
  let highestValue = 0;

  const [{ statistics }, dispatch] = useGame();

  Object.keys(statistics).forEach(k => {
    if (statistics[k] > highestValue) {
      highestValue = statistics[k];
    }
  });

  const unit = highestValue > 0 ? 100 / highestValue : 0;

  return (
    <Row alignItems="flex-end" justifyContent="space-evenly" width="100%">
      {Object.keys(statistics).map(k => (
        <Bar
          key={k}
          index={k}
          height={highestValue > 0 ? `${unit * statistics[k]}px` : "0px"}
        />
      ))}
    </Row>
  );
}
