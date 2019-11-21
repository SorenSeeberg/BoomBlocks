import React, { useEffect } from "react";
import { Column, Row } from "../../components/Layout";
import {
  GameState,
  useGameState,
  useGameDispatch
} from "../../context/GameContext";
import {
  GAME_INPUT_KEYS,
  GRID_SIZE,
  BLOCK_SIZE,
  HIDDEN_ROW_COUNT
} from "../../constants";
import NextBlock from "./NextBlock";
import Grid from "./Grid";
import Score from "./Score";
import Line from "./Line";
import Statistics from "./Statistics";
import { Window } from "../../components/Window";
import useEventListener from "../../util/useEventListener";
import Level from "./Level";
import { useHistory } from "react-router-dom";

function Game() {
  const game: GameState = useGameState();
  const dispatch = useGameDispatch();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "FRAME_STEP" });
    }, game.levelInfo.msPerFrame);
  }, [game.currentFrame, game.levelInfo.msPerFrame, dispatch]);

  useEffect(() => {
    if (game.pause) {
      history.push("/menu");
    }
  }, [game.pause]);

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
          background="black"
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
  );
}

export default Game;
