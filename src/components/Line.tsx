import React from "react";
import Window from "./Window";
import { useGame } from "../context/GameContext";
import { STYLES, ZERO_LINES } from "../constants";
import { H2 } from "./Text";
import { Column } from "./Layout";

type LevelProps = {
  width: string;
};

export default function Level({ width }: LevelProps) {
  const [{ line }] = useGame();
  const lineString = line ? line.toString() : "";
  return (
    <Window width={width} height={STYLES.infoBoxHeight} background="black">
      <Column height="100%">
        <H2>LINE</H2>
        <H2>{ZERO_LINES.slice(lineString.length) + lineString}</H2>
      </Column>
    </Window>
  );
}
