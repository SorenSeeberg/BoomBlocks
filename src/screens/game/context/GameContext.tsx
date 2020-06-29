import { Action, GameState } from './types';
import { gameReducer } from './gameReducer';
import { getLevelInfo } from '../../../util/level';
import { GRID_SIZE } from '../../../constants';
import React, {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';
import {
    array2d,
    getFirstTetro,
    getRandomTetro,
} from '../../../util/tetromino';

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export function initGameState(): GameState {
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

export function GameProvider({ children }: { children: ReactNode }) {
    const [gameState, gameDispatch] = useReducer(gameReducer, initGameState());

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
