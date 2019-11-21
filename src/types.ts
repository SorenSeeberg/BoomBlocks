import { ThemeName } from "./context/ThemeContext";

export type DisplayStandard = "pal" | "ntsc";
export type RandomModel = "random" | "7bag" | "14bag";

export type SettingsState = {
  displayStandard: DisplayStandard;
  displayStandardOptions: DisplayStandard[];
  startLevel: number;
  startLevelLimits: Vector2;
  themeName: ThemeName;
  themeNameOptions: ThemeName[];
  randomModel: RandomModel;
  randomModelOptions: RandomModel[];
};

export type Vector2 = {
  x: number;
  y: number;
};

export type Grid = number[][];

export type BlockProps = {
  transform: string;
  value: number;
};

export type LinesProps = {
  lines: number[][];
  activePiece: TetroGameObject;
};

export type Tetromino = {
  index: number;
  name: string;
  size: Vector2;
  data: number[][];
};

export type TetroGameObject = {
  position: Vector2;
  lockDelay: number;
  tetromino: Tetromino;
};

export type LevelInfo = {
  levelStart: number;
  level: number;
  msPerFrame: number;
  framesPerStep: number;
  lines: number;
  standard: DisplayStandard;
};

export type Statistics = {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
};
