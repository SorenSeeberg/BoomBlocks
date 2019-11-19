import React from "react";
import { MenuItem } from "../../components/MenuItem";

export function Menu() {
  return (
    <>
      <MenuItem linkTo="/game">New Game</MenuItem>
      <MenuItem linkTo="/settings">Settings</MenuItem>
      <MenuItem linkTo="/highscore">Highscore</MenuItem>
      <MenuItem linkTo="/about">About</MenuItem>
    </>
  );
}

export default Menu;
