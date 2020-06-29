import {
    TetroGameObject,
    Tetromino,
    LevelInfo,
    Statistics,
} from '../../../types';
import { TransformAction } from '../../../util/tetromino';

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

export type Action = { type: GameActionTypes; value?: any };
