import React, {
    useReducer,
    useContext,
    Dispatch,
    createContext,
    ReactNode,
} from 'react';
import { SettingsState } from '../types';

type SettingsActionTypes =
    | 'INC_START_LEVEL'
    | 'DEC_START_LEVEL'
    | 'NEXT_DISPLAY_STANDARD'
    | 'PREV_DISPLAY_STANDARD'
    | 'NEXT_THEME'
    | 'NEXT_RNG_MODEL';
type Action = { type: SettingsActionTypes; value?: any };

const initSettingsState: SettingsState = {
    displayStandard: 'ntsc',
    displayStandardOptions: ['ntsc', 'pal'],
    startLevel: 0,
    startLevelLimits: { x: 0, y: 19 },
    themeName: 'arcade',
    themeNameOptions: ['soviet', 'arcade'],
    randomModel: 'random',
    randomModelOptions: ['random', '7bag', '14bag'],
};

function nextOption<T>(options: T[], selection: T): T {
    const selectedIndex = options.indexOf(selection);

    return selectedIndex < options.length - 1
        ? options[selectedIndex + 1]
        : options[0];
}

//@ts-ignore
const StateContext = createContext<SettingsState>();
//@ts-ignore
const DispatchContext = createContext<Dispatch<Action>>();

function reducer(state: SettingsState, action: Action): SettingsState {
    if (action.type === 'INC_START_LEVEL') {
        return state.startLevel < state.startLevelLimits.y
            ? { ...state, startLevel: state.startLevel + 1 }
            : { ...state, startLevel: state.startLevelLimits.x };
    }

    if (action.type === 'DEC_START_LEVEL') {
        return state.startLevel > state.startLevelLimits.x
            ? { ...state, startLevel: state.startLevel + 1 }
            : { ...state, startLevel: state.startLevelLimits.y };
    }

    if (action.type === 'NEXT_DISPLAY_STANDARD') {
        return {
            ...state,
            displayStandard: nextOption(
                state.displayStandardOptions,
                state.displayStandard
            ),
        };
    }

    if (action.type === 'NEXT_THEME') {
        return {
            ...state,
            themeName: nextOption(state.themeNameOptions, state.themeName),
        };
    }

    if (action.type === 'NEXT_RNG_MODEL') {
        return {
            ...state,
            randomModel: nextOption(
                state.randomModelOptions,
                state.randomModel
            ),
        };
    }

    return { ...state };
}

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settingsState, settingsDispatch] = useReducer(
        reducer,
        initSettingsState
    );

    return (
        <DispatchContext.Provider value={settingsDispatch}>
            <StateContext.Provider value={settingsState}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
}

export function useSettingsState(): SettingsState {
    return useContext(StateContext);
}

export function useSettingsDispatch(): Dispatch<Action> {
    return useContext(DispatchContext);
}
