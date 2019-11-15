export const BLOCK_SIZE: number = 32;
export const GRID_SIZE: { x: number; y: number } = { x: 10, y: 22 };
export const HIDDEN_ROW_COUNT: number = 2;

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
  infoBoxHeight: "90px"
};
