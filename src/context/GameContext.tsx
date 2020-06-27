import React, {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';
import { accumulateScore, lineScore, moveScore } from '../util/score';
import {
    array2d,
    getFirstTetro,
    getNextTetro,
    getRandomTetro,
    TransformAction,
    transformBlock,
} from '../util/tetromino';
import { collapsableLInes, collapseLines, fits, freeze } from '../util/grid';
import { getLevelInfo } from '../util/level';
import {
    Grid,
    LevelInfo,
    Statistics,
    TetroGameObject,
    Tetromino,
} from '../types';
import { GRID_SIZE } from '../constants';

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export type GameState = {
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
    pause: boolean;
};
type GameActionTypes =
    | 'SCORE_ADD'
    | 'NEW_GAME'
    | 'RESUME_GAME'
    | 'GAME_END'
    | 'NEXT_LEVEL'
    | 'NEXT_BLOCK'
    | 'FRAME_STEP'
    | 'KEY_DOWN';

/*
type ActionNewGame = {
  type: "NEW_GAME"
  payload:
}
*/

type Action = { type: GameActionTypes; value?: any };

function initGameState(): GameState {
    const active = getFirstTetro();
    const statistics = [0, 0, 0, 0, 0, 0, 0];
    statistics[active.tetromino.index] = 1;

    return {
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
        statistics,
        pause: false,
    };
}

//@ts-ignore
const StateContext = createContext<GameState>();
//@ts-ignore
const DispatchContext = createContext<Dispatch<Action>>();

function frameStep(state: GameState): GameState {
    let canMove: boolean;
    let transformedTetro: TetroGameObject;
    let active: TetroGameObject = state.active;
    let currentY: number = active.position.y;
    let moveScoreTrigger: number;
    let gridFragment: { grid: Grid; evaluateGrid: boolean } = {
        grid: state.grid,
        evaluateGrid: state.evaluateGrid,
    };
    let next: Tetromino = state.next;
    let nextFrame: number;
    let score: number = state.score;
    let line: number = state.line;
    const statistics: Statistics = [...state.statistics];

    // Auto moving piece and update grid
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
                    grid: collapseLines(state.grid, collapseIndices),
                };
            }
        }

        moveScoreTrigger = 2;
        transformedTetro = transformBlock(active, [
            ...state.inputBuffer,
            'down',
        ]);

        canMove = fits(state.grid, transformedTetro);

        if (!canMove) {
            transformedTetro = transformBlock(active, ['down']);
            canMove = fits(state.grid, transformedTetro);
        }

        // move tetro and update score
        if (canMove) {
            const futureY: number = transformedTetro.position.y;
            score +=
                currentY + moveScoreTrigger === futureY
                    ? moveScore(state.levelInfo.level)
                    : 0;
            active = transformedTetro;
            // freeze current tetro and bring in next tetro
        } else {
            active = getNextTetro(state.next.index);
            next = getRandomTetro();
            gridFragment = {
                grid: freeze(state.grid, state.active),
                evaluateGrid: true,
            };
            statistics[active.tetromino.index] += 1;
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
        statistics,
        ...gridFragment,
        ...(next ? { next } : undefined),
    };
}

function reducer(state: GameState, action: Action): GameState {
    switch (action.type) {
        case 'FRAME_STEP': {
            return frameStep(state);
        }
        case 'KEY_DOWN': {
            if (action.value.key === 'ArrowLeft') {
                if (state.inputBuffer.includes('left')) {
                    return { ...state };
                }

                if (state.inputBuffer.includes('right')) {
                    return {
                        ...state,
                        inputBuffer: [
                            ...state.inputBuffer.filter((i) => i !== 'right'),
                            'left',
                        ],
                    };
                }

                return {
                    ...state,
                    inputBuffer: [...state.inputBuffer, 'left'],
                };
            }

            if (action.value.key === 'ArrowRight') {
                if (state.inputBuffer.includes('right')) {
                    return { ...state };
                }

                if (state.inputBuffer.includes('left')) {
                    return {
                        ...state,
                        inputBuffer: [
                            ...state.inputBuffer.filter((i) => i !== 'left'),
                            'right',
                        ],
                    };
                }
                return {
                    ...state,
                    inputBuffer: [...state.inputBuffer, 'right'],
                };
            }

            if (action.value.key === 'ArrowDown') {
                if (!state.inputBuffer.includes('down')) {
                    return {
                        ...state,
                        inputBuffer: [...state.inputBuffer, 'down'],
                    };
                }
            }

            if (action.value.key === 'ArrowUp') {
                if (!state.inputBuffer.includes('rotate')) {
                    return {
                        ...state,
                        inputBuffer: [...state.inputBuffer, 'rotate'],
                    };
                }
            }

            if (action.value.key === 'Escape') {
                return { ...state, pause: true };
            }

            return { ...state };
        }
        case 'NEW_GAME': {
            return { ...state };
        }
        case 'RESUME_GAME': {
            return { ...state, pause: false };
        }
        case 'SCORE_ADD': {
            return {
                ...state,
                score: state.score + action.value.points,
            };
        }
        default: {
            return state;
        }
    }
}

export function GameProvider({ children }: { children: ReactNode }) {
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
