import React from "react";
import { MenuItem } from "../../components/MenuItem";
import { useGameState, useGameDispatch } from "../../context/GameContext";
import { useSettingsState } from "../../context/SettingsContxt";

export function Menu() {
  const { pause } = useGameState();
  const gameDispatch = useGameDispatch();
  const settingsState = useSettingsState();

  return (
    <>
      {pause ? (
        <MenuItem
          linkTo="/game"
          onClick={() =>
            gameDispatch({
              type: "RESUME_GAME"
            })
          }
        >
          Resume Game
        </MenuItem>
      ) : (
        <MenuItem
          linkTo="/game"
          onClick={() =>
            gameDispatch({
              type: "NEW_GAME",
              value: {
                settingsState: settingsState.displayStandard,
                startLevel: settingsState.startLevel,
                randomModel: settingsState.randomModel
              }
            })
          }
        >
          New Game
        </MenuItem>
      )}
      <MenuItem linkTo="/settings">Settings</MenuItem>
      <MenuItem linkTo="/highscore">Highscore</MenuItem>
      <MenuItem linkTo="/about">About</MenuItem>
    </>
  );
}

export default Menu;
