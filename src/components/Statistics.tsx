import React from "react";
import { HighScores } from "./HighScores";
import { Column } from "./Layout";
import { TetroDistribution } from "./TetroDistribution";

export default function Statistics() {
  return (
    <Column alignItems="center" justifyContent="space-evenly" width="100%">
      <TetroDistribution />
      <HighScores />
    </Column>
  );
}
