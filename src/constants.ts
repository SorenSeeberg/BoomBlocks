export const BLOCK_SIZE: number = 32;
export const GRID_SIZE: { x: number; y: number } = { x: 10, y: 22 };
export const HIDDEN_ROW_COUNT: number = 2;
export const BLOCK_COLORS: string[] = [
  "black",
  "cyan",
  "blue",
  "orange",
  "yellow",
  "green",
  "purple",
  "red",
  "transparent"
];
type GameInputKeys = "ArrowLeft" | "ArrowRight" | "ArrowDown" | "ArrowUp";
export const GAME_INPUT_KEYS: GameInputKeys[] = [
  "ArrowLeft",
  "ArrowRight",
  "ArrowDown",
  "ArrowUp"
];
export const ZERO_SCORE = "0000000";
export const NO_NAME = "..........";
export const ZERO_LINES = "000";
export const STYLES = {
  fontSizeH1: "50px",
  fontSizeH2: "35px",
  fontSizeH3: "28px",
  fontColorInfo: "#0f0",
  infoBoxHeight: "90px"
};
