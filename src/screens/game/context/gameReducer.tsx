import { Action, GameState } from './types';
import { frameStep } from './frameStep';
import { initGameState } from './GameContext';

export function gameReducer(state: GameState, action: Action): GameState {
    switch (action.type) {
        case 'FRAME_STEP': {
            if (!state.gameOver) {
                return frameStep(state);
            } else {
                return state;
            }
        }
        case 'KEY_DOWN': {
            switch (action.value.key) {
                case 'ArrowLeft': {
                    if (state.inputBuffer.includes('left')) {
                        return { ...state };
                    }
                    if (state.inputBuffer.includes('right')) {
                        return {
                            ...state,
                            inputBuffer: [
                                ...state.inputBuffer.filter(
                                    (i) => i !== 'right'
                                ),
                                'left',
                            ],
                        };
                    }
                    return {
                        ...state,
                        inputBuffer: [...state.inputBuffer, 'left'],
                    };
                }
                case 'ArrowRight': {
                    if (state.inputBuffer.includes('right')) {
                        return { ...state };
                    }
                    if (state.inputBuffer.includes('left')) {
                        return {
                            ...state,
                            inputBuffer: [
                                ...state.inputBuffer.filter(
                                    (i) => i !== 'left'
                                ),
                                'right',
                            ],
                        };
                    }
                    return {
                        ...state,
                        inputBuffer: [...state.inputBuffer, 'right'],
                    };
                }
                case 'ArrowDown': {
                    if (!state.inputBuffer.includes('down')) {
                        return {
                            ...state,
                            inputBuffer: [...state.inputBuffer, 'down'],
                        };
                    }
                    return { ...state };
                }
                case 'ArrowUp': {
                    if (!state.inputBuffer.includes('rotate')) {
                        return {
                            ...state,
                            inputBuffer: [...state.inputBuffer, 'rotate'],
                        };
                    }
                    return { ...state };
                }
                case 'Escape': {
                    return { ...state, pause: true };
                }
                default: {
                    return { ...state };
                }
            }
        }
        case 'NEW_GAME': {
            return initGameState();
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
