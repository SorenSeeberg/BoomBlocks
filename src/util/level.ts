import { LevelInfo } from "../types";

type DisplayStandard = "pal" | "ntsc";

const ntscFrameTimings = [
  48,
  43,
  38,
  33,
  28,
  23,
  18,
  13,
  8,
  6,
  5,
  5,
  5,
  4,
  4,
  4,
  3,
  3,
  3,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  1
];

const palFrameTimings = [
  36,
  32,
  29,
  25,
  22,
  18,
  15,
  11,
  7,
  5,
  4,
  4,
  4,
  3,
  3,
  3,
  2,
  2,
  2,
  1
];

const msPerFrame = { ntsc: 1000 / 60, pal: 1000 / 50 };

function lineByLevel(level: number): number {
  // TODO : this must be further refined
  // https://tetris.wiki/Tetris_(NES,_Nintendo)

  return level * 10 + 10;
}

function levelByLine(line: number): number {
  return line < 10 ? 0 : Math.floor((line - 10) / 10) + 1;
}

function getFrameTiming(level: number, standard: DisplayStandard): number {
  return standard === "ntsc"
    ? level < ntscFrameTimings.length
      ? ntscFrameTimings[level]
      : 1
    : level < palFrameTimings.length
    ? palFrameTimings[level]
    : 1;
}

export function getLevelInfo(
  line: number,
  standard: DisplayStandard = "ntsc"
): LevelInfo {
  const level = levelByLine(line);
  return {
    levelStart: level,
    level,
    msPerFrame: msPerFrame[standard],
    framesPerStep: getFrameTiming(level, standard),
    lines: lineByLevel(level)
  };
}
