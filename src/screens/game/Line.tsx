import React from "react";
import { useGameState } from "../../context/GameContext";
import { STYLES, ZERO_LINES } from "../../constants";
import { Column } from "../../components/Layout";
import { H2, H3 } from "../../components/Text";
import { Window } from "../../components/Window";

type LevelProps = {
  width: string;
};

export function Line({ width }: LevelProps) {
  const { line } = useGameState();
  const lineString = line ? line.toString() : "";
  return (
    <Window width={width} height={STYLES.infoBoxHeight}>
      <Column height="100%">
        <H3>LINE</H3>
        <H2>{ZERO_LINES.slice(lineString.length) + lineString}</H2>
      </Column>
    </Window>
  );
}

export default Line;
