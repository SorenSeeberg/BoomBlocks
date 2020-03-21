import React from "react";
import { useGameState } from "../../context/GameContext";
import { STYLES } from "../../constants";
import { Column } from "../../components/Layout";
import { H2, H3 } from "../../components/Text";
import { Window } from "../../components/Window";

type LevelProps = {
  width: string;
};

export default function Level({ width }: LevelProps) {
  const { levelInfo } = useGameState();

  return (
    <Window width={width} height={STYLES.infoBoxHeight}>
      <Column height="100%" width="100%">
        <H3>Level</H3>
        <H2>{levelInfo.level}</H2>
      </Column>
    </Window>
  );
}
