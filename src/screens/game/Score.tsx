import React from "react";
import { Window } from "../../components/Window";
import { useGameState } from "../../context/GameContext";
import { STYLES, ZERO_SCORE } from "../../constants";
import { Row } from "../../components/Layout";
import { H1 } from "../../components/Text";

type ScoreProps = {
  width: string;
};

export default function Score({ width }: ScoreProps) {
  const { scoreDisplay } = useGameState();
  const scoreString: string = scoreDisplay.toString();
  return (
    <Window width={width} height={STYLES.infoBoxHeight} background="black">
      <Row height="100%" width="100%">
        <div
          style={{
            letterSpacing: "4px"
          }}
        >
          <H1>{ZERO_SCORE.slice(scoreString.length) + scoreString}</H1>
        </div>
      </Row>
    </Window>
  );
}
