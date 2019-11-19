import React from "react";
import { Column } from "../../components/Layout";
import { TetroDistribution } from "./TetroDistribution";
import { HighScores } from "./HighScores";

export default function Statistics() {
  return (
    <Column alignItems="center" justifyContent="space-evenly" width="100%">
      <TetroDistribution />
      <HighScores />
    </Column>
  );
}
