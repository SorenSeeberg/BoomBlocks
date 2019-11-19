import React from "react";
import { MenuItem } from "../../components/MenuItem";
import { useGameState } from "../../context/GameContext";

const displayStrings = {
  ntsc: "NTSC 60Hz",
  pal: "PAL 50Hz",
  arcade: "Arcade",
  soviet: "Soviet"
};

export function Settings() {
  const { themeName, levelInfo } = useGameState();

  return (
    <>
      <MenuItem type="option" displayValue={levelInfo.levelStart}>
        Start level
      </MenuItem>
      <MenuItem type="option" displayValue={displayStrings[levelInfo.standard]}>
        Display
      </MenuItem>
      <MenuItem type="option" displayValue={displayStrings[themeName]}>
        Theme
      </MenuItem>
      <MenuItem type="option" displayValue="Random">
        Tetro selection
      </MenuItem>
      <MenuItem linkTo="/menu">{"<<< Back"}</MenuItem>
    </>
  );
}

export default Settings;
