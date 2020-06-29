import { accumulateScore, lineScore, moveScore } from '../../../util/score';
import { GameState } from './types';
import { getLevelInfo } from '../../../util/level';
import { Grid, Statistics, TetroGameObject, Tetromino } from '../../../types';
import {
    getNextTetro,
    getRandomTetro,
    transformBlock,
} from '../../../util/tetromino';
import {
    collapsableLInes,
    collapseLines,
    fits,
    freeze,
    isGameOver,
} from '../../../util/grid';

export function frameStep(state: GameState): GameState {
    let canMove: boolean;
    let transformedTetro: TetroGameObject;
    let active: TetroGameObject = state.active;
    let currentY: number = active.position.y;
    let moveScoreTrigger: number;
    let gridFragment: {
        grid: Grid;
        evaluateGrid: boolean;
    } = {
        grid: state.grid,
        evaluateGrid: state.evaluateGrid,
    };
    let next: Tetromino = { ...state.next };
    let nextFrame: number;
    let score: number = state.score;
    let line: number = state.line;
    const statistics: Statistics = [...state.statistics];
    const gameOver = isGameOver(state.grid);
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
        gameOver,
        ...gridFragment,
        ...(next ? { next } : undefined),
    };
}
