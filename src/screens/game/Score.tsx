import React from "react";
import { Window } from "../../components/Window";
import { useGameState } from "../../context/GameContext";
import { STYLES, ZERO_SCORE } from "../../constants";
import { Row } from "../../components/Layout";
import { H1, H3 } from "../../components/Text";
import { useWindowSize } from "../../util/useWindowSize";

type ScoreProps = {
  width: string;
};

export default function Score({ width }: ScoreProps) {
  const { scoreDisplay } = useGameState();
  const scoreString: string = scoreDisplay.toString();
  const windowSize = useWindowSize();
  return (
    <Window width={width} height={STYLES.infoBoxHeight}>
      <Row height="100%" width="100%">
        <div
          style={{
            letterSpacing: "4px"
          }}
        >
          {windowSize.width > 768 ? (
            <H1>{ZERO_SCORE.slice(scoreString.length) + scoreString}</H1>
          ) : (
            <H3>{ZERO_SCORE.slice(scoreString.length) + scoreString}</H3>
          )}
        </div>
      </Row>
    </Window>
  );
}
