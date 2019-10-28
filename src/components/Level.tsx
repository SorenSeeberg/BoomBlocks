import React from "react";
import Window from "./Window";
import { useGame } from "../context/GameContext";
import { STYLES } from "../constants";
import { H2 } from "./Text";
import { Row } from "./Layout";

type LevelProps = {
  width: string;
};

export default function Level({ width }: LevelProps) {
  const [{ levelInfo }] = useGame();

  return (
    <Window width={width} height={STYLES.infoBoxHeight} background="black">
      <Row height="100%" width="100%">
        <H2>Level {levelInfo.level}</H2>
      </Row>
    </Window>
  );
}
