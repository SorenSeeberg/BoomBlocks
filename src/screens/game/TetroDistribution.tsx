import React from "react";
import { useGameState } from "../../context/GameContext";
import { Theme, useTheme } from "../../context/ThemeContext";
import { Row } from "../../components/Layout";
import { useSettingsState } from "../../context/SettingsContxt";

function Bar({ height = "100px", index }) {
  const { themeName } = useSettingsState();
  const currentTheme: Theme = useTheme()[themeName];

  return (
    <div
      style={{
        height: height === "0px" ? "4px" : height,
        width: "30px",
        background: currentTheme.tetroColors[`${parseInt(index, 0) + 1}`],
        transition: "height 0.35s ease"
      }}
    />
  );
}

export function TetroDistribution() {
  let highestValue = 0;
  const { statistics } = useGameState();

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
