import React, {
  useReducer,
  useContext,
  Dispatch,
  createContext,
  Context
} from "react";
import {
  TetroGameObject,
  Tetromino,
  LevelInfo,
  Grid,
  Statistics
} from "../types";
import {
  array2d,
  getRandomTetro,
  transformBlock,
  TransformAction,
  getNextTetro,
  getFirstTetro
} from "../util/tetromino";
import { GRID_SIZE } from "../constants";
import { getLevelInfo } from "../util/level";
import { accumulateScore, lineScore, moveScore } from "../util/score";
import { fits, freeze, collapsableLInes, collapseLines } from "../util/grid";
import { ThemeName } from "./ThemeContext";

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export type GameState = {
  themeName: ThemeName;
  grid: number[][];
  active: TetroGameObject;
  next: Tetromino;
  levelInfo: LevelInfo;
  gameOver: boolean;
  line: number;
  score: number;
  scoreDisplay: number;
  currentFrame: number;
  inputBuffer: TransformAction[];
  evaluateGrid: boolean;
  statistics: Statistics;
};
type GameActionTypes =
  | "SCORE_ADD"
  | "GAME_BEGIN"
  | "GAME_END"
  | "NEXT_LEVEL"
  | "NEXT_BLOCK"
  | "FRAME_STEP"
  | "KEY_DOWN"
  | "INC_START_LEVEL"
  | "DEC_START_LEVEL";
type Action = { type: GameActionTypes; value?: any };

function initGameState(): GameState {
  const active = getFirstTetro();
  let statistics = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  statistics[active.tetromino.index] = 1;

  return {
    themeName: "soviet",
    grid: array2d(GRID_SIZE.x, GRID_SIZE.y),
    active,
    next: getRandomTetro(),
    levelInfo: getLevelInfo(80),
    gameOver: false,
    line: 80,
    score: 0,
    scoreDisplay: 0,
    currentFrame: 0,
    inputBuffer: [],
    evaluateGrid: false,
    statistics
  };
}

const StateContext: Context<GameState> = createContext(null);
const DispatchContext: Context<Dispatch<Action>> = createContext(null);

function frameStep(state: GameState): GameState {
  let canMove: boolean;
  let transformedTetro: TetroGameObject;
  let active: TetroGameObject = state.active;
  let currentY: number = active.position.y;
  let moveScoreTrigger: number;
  let gridFragment: { grid: Grid; evaluateGrid: boolean };
  let next: Tetromino;
  let nextFrame: number;
  let score: number = state.score;
  let line: number = state.line;
  let statistics: Statistics = state.statistics;

  // Auto moving piece and updating grid
  if (state.currentFrame === state.levelInfo.framesPerStep) {
    nextFrame = 0;

    // Collapse lines
    if (state.evaluateGrid) {
      const collapseIndices: number[] = collapsableLInes(state.grid);

      if (collapseIndices.length > 0) {
        const lineCount = collapseIndices.length;
        line += lineCount;
        score += lineScore(state.levelInfo.level, lineCount);
        gridFragment = {
          evaluateGrid: false,
          grid: collapseLines(state.grid, collapseIndices)
        };
      }
    }

    moveScoreTrigger = 2;
    transformedTetro = transformBlock(active, [...state.inputBuffer, "down"]);

    canMove = fits(state.grid, transformedTetro);

    if (!canMove) {
      transformedTetro = transformBlock(active, ["down"]);
      canMove = fits(state.grid, transformedTetro);
    }

    // freeze current and use next
    if (canMove) {
      const futureY: number = transformedTetro.position.y;
      score +=
        currentY + moveScoreTrigger === futureY
          ? moveScore(state.levelInfo.level)
          : 0;
      active = transformedTetro;
      // freeze current and use next
    } else {
      active = getNextTetro(state.next.index);
      next = getRandomTetro();
      gridFragment = {
        grid: freeze(state.grid, state.active),
        evaluateGrid: true
      };
      statistics = {
        ...state.statistics,
        [active.tetromino.index]: state.statistics[active.tetromino.index] + 1
      };
    }
  }
  // User Input handling between auto moves
  else {
    nextFrame = state.currentFrame + 1;
    moveScoreTrigger = 1;
    transformedTetro = transformBlock(active, state.inputBuffer);
    canMove = fits(state.grid, transformedTetro);

    if (canMove) {
      const futureY: number = transformedTetro.position.y;
      score +=
        currentY + moveScoreTrigger === futureY
          ? moveScore(state.levelInfo.level)
          : 0;
      active = transformedTetro;
    }
  }

  return {
    ...state,
    currentFrame: nextFrame,
    active,
    scoreDisplay: accumulateScore(score, state.scoreDisplay),
    inputBuffer: [],
    score,
    line,
    levelInfo: getLevelInfo(line),
    ...gridFragment,
    ...(next ? { next } : undefined),
    ...(statistics ? { statistics } : undefined)
  };
}

function reducer(state: GameState, action: Action): GameState {
  if (action.type === "FRAME_STEP") {
    return frameStep(state);
  }

  if (action.type === "NEXT_BLOCK") {
  }

  if (action.type === "KEY_DOWN") {
    if (action.value.key === "ArrowLeft") {
      if (state.inputBuffer.includes("left")) {
        return { ...state };
      }

      if (state.inputBuffer.includes("right")) {
        return {
          ...state,
          inputBuffer: [...state.inputBuffer.filter(i => i !== "right"), "left"]
        };
      }

      return { ...state, inputBuffer: [...state.inputBuffer, "left"] };
    }

    if (action.value.key === "ArrowRight") {
      if (state.inputBuffer.includes("right")) {
        return { ...state };
      }

      if (state.inputBuffer.includes("left")) {
        return {
          ...state,
          inputBuffer: [...state.inputBuffer.filter(i => i !== "left"), "right"]
        };
      }
      return { ...state, inputBuffer: [...state.inputBuffer, "right"] };
    }

    if (action.value.key === "ArrowDown") {
      if (!state.inputBuffer.includes("down")) {
        return { ...state, inputBuffer: [...state.inputBuffer, "down"] };
      }
    }

    if (action.value.key === "ArrowUp") {
      if (!state.inputBuffer.includes("rotate")) {
        return { ...state, inputBuffer: [...state.inputBuffer, "rotate"] };
      }
    }

    return { ...state };
  }

  if (action.type === "GAME_BEGIN") {
  }

  if (action.type === "SCORE_ADD") {
    return {
      ...state,
      score: state.score + action.value.points
    };
  }
}

export function GameProvider({ children }) {
  const [gameState, gameDispatch] = useReducer(reducer, initGameState());

  return (
    <DispatchContext.Provider value={gameDispatch}>
      <StateContext.Provider value={gameState}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export function useGameState(): GameState {
  return useContext(StateContext);
}

export function useGameDispatch(): Dispatch<Action> {
  return useContext(DispatchContext);
}
