import { SettingsState } from "../types";
import React, {
  useReducer,
  useContext,
  Dispatch,
  createContext,
  Context
} from "react";

type SettingsActionTypes = "KEY_DOWN" | "INC_START_LEVEL" | "DEC_START_LEVEL";
type Action = { type: SettingsActionTypes; value?: any };

const initSettingsState: SettingsState = {
  displayStandard: "ntsc",
  startLevel: 0,
  startLevelLimits: { x: 0, y: 19 },
  themeName: "soviet"
};

const StateContext: Context<SettingsState> = createContext(null);
const DispatchContext: Context<Dispatch<Action>> = createContext(null);

function reducer(action: Action, state: SettingsState): SettingsState {
  if (action.type === "INC_START_LEVEL") {
    return state.startLevel < state.startLevelLimits.y
      ? { ...state, startLevel: state.startLevel + 1 }
      : state;
  }

  if (action.type === "DEC_START_LEVEL") {
    return state.startLevel > state.startLevelLimits.x
      ? { ...state, startLevel: state.startLevel + 1 }
      : state;
  }
  return state;
}

export function SettingsProvider({ children }) {
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

export function useGameState(): SettingsState {
  return useContext(StateContext);
}

export function useGameDispatch(): Dispatch<Action> {
  return useContext(DispatchContext);
}
