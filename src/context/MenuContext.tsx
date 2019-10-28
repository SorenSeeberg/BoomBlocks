//import React, { useReducer, useContext } from "react";

// Not in use

// https://kentcdodds.com/blog/how-to-use-react-context-effectively
/*
const GameContext = React.createContext([{}, () => {}]);

type GameGlobalState = {
  screenTitle: string;
  score: number;
};

type ScreenActionTypes =
  | "SCORE_ADD"
  | "MAIN_MENU"
  | "HIGH_SCORE"
  | "SETTINGS"
  | "RUNNING_GAME"
  | "GAME_OVER";
type ActionTypes = ScreenActionTypes;

type Action = {
  type: ActionTypes;
  value?: any;
};

const initState = {
  screenTitle: "Reactris",
  score: 30
};

function reducer(state: GameGlobalState, action: Action) {
  if (action.type === "SCORE_ADD") {
    return {
      ...state,
      score: state.score + action.value.points
    };
  }

  if (action.type === "MAIN_MENU") {
    return {
      ...state,
      screenTitle: "Reactris"
    };
  }

  if (action.type === "SETTINGS") {
    return {
      ...state,
      screenTitle: "Game Settings"
    };
  }

  if (action.type === "RUNNING_GAME") {
    return {
      ...state,
      screenTitle: "Game Time"
    };
  }

  if (action.type === "GAME_OVER") {
    return {
      ...state,
      screenTitle: "Game Over"
    };
  }

  return state;
}

export function GameProvider(props) {
  const [{ screenTitle }, dispatch] = useReducer(reducer, initState);

  function handleScreenChange(screen: ScreenActionTypes) {
    dispatch({ type: screen });
  }

  function handleScoreIncrease(points: number) {
    dispatch({ type: "SCORE_ADD", value: { points } });
  }

  return (
    <GameContext.Provider value={[]}>{props.children}</GameContext.Provider>
  );
}

export function useGame() {
  {
    const contextValue = useContext(GameContext);
    return contextValue;
  }
}
*/
