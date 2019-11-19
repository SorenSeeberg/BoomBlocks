import React from "react";
import { useGameState } from "../../context/GameContext";
import { STYLES } from "../../constants";
import { Row } from "../../components/Layout";
import { H2 } from "../../components/Text";
import { Window } from "../../components/Window";

type LevelProps = {
  width: string;
};

export default function Level({ width }: LevelProps) {
  const { levelInfo } = useGameState();

  return (
    <Window width={width} height={STYLES.infoBoxHeight} background="black">
      <Row height="100%" width="100%">
        <H2>Level {levelInfo.level}</H2>
      </Row>
    </Window>
  );
}
