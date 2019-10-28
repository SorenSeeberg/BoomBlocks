import React, { useEffect } from "react";
import Grid from "./Grid";
import {
  GRID_SIZE,
  BLOCK_SIZE,
  GAME_INPUT_KEYS,
  HIDDEN_ROW_COUNT
} from "../constants";
import Window from "./Window";
import Score from "./Score";
import { useGame } from "../context/GameContext";
import useEventListener from "../util/useEventListener";
import Level from "./Level";
import Line from "./Line";
import NextBlock from "./NextBlock";
import Statistics from "./Statistics";
import { Row, Column } from "./Layout";

function Game() {
  const [game, dispatch] = useGame();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "FRAME_STEP" });
    }, game.levelInfo.msPerFrame);
  }, [game.currentFrame]);

  function handler({ key }) {
    if (GAME_INPUT_KEYS.includes(key)) {
      dispatch({ type: "KEY_DOWN", value: { key } });
    }
    // https://stackoverflow.com/questions/29069639/listen-to-keypress-for-document-in-reactjs
  }

  useEventListener("keydown", handler);

  const width: number = GRID_SIZE.x * BLOCK_SIZE;
  const widthStyle: string = `${width}px`;
  const halfWidthStyle: string = `${width / 2 - 4}px`;

  return (
    <>
      <Row>
        <Column>
          <Row>
            <Line width={halfWidthStyle} />
            <NextBlock width={halfWidthStyle} />
          </Row>
          <Window
            width={widthStyle}
            height={`${GRID_SIZE.y * BLOCK_SIZE -
              HIDDEN_ROW_COUNT * BLOCK_SIZE}px`}
          >
            <Grid lines={game.grid} activePiece={game.active} />
          </Window>
        </Column>
        <Column height="746px">
          <Score width={widthStyle} />
          <Level width={widthStyle} />
          <Window width={widthStyle} fillHeight={true} background="black">
            <Statistics />
          </Window>
        </Column>
      </Row>
    </>
  );
}

export default Game;
