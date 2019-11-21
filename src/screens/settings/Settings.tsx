import React from "react";
import { MenuItem } from "../../components/MenuItem";
import {
  useSettingsState,
  useSettingsDispatch
} from "../../context/SettingsContxt";

const displayStrings = {
  ntsc: "NTSC 60Hz",
  pal: "PAL 50Hz",
  arcade: "Arcade",
  soviet: "Soviet",
  random: "Random",
  "7bag": "7 bag",
  "14bag": "14 bag"
};

export function Settings() {
  const settingsState = useSettingsState();
  const settingsDispatch = useSettingsDispatch();

  return (
    <>
      <MenuItem
        type="option"
        displayValue={settingsState.startLevel}
        onClick={() => {
          settingsDispatch({ type: "INC_START_LEVEL" });
        }}
      >
        Start level
      </MenuItem>
      <MenuItem
        type="option"
        displayValue={displayStrings[settingsState.displayStandard]}
        onClick={() => {
          settingsDispatch({ type: "NEXT_DISPLAY_STANDARD" });
        }}
      >
        Display
      </MenuItem>
      <MenuItem
        type="option"
        displayValue={displayStrings[settingsState.themeName]}
        onClick={() => {
          settingsDispatch({ type: "NEXT_THEME" });
        }}
      >
        Theme
      </MenuItem>
      <MenuItem
        type="option"
        displayValue={displayStrings[settingsState.randomModel]}
        onClick={() => {
          settingsDispatch({ type: "NEXT_RNG_MODEL" });
        }}
      >
        Tetro RNG
      </MenuItem>
      <MenuItem linkTo="/menu">{"<= Back"}</MenuItem>
    </>
  );
}

export default Settings;
