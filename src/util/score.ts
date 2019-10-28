// https://tetris.fandom.com/wiki/Scoring

const LINE_BASE_SCORE = [40, 100, 300, 1200];

export function lineScore(level: number, lineCount: number): number {
  return LINE_BASE_SCORE[lineCount - 1] * (level + 1);
}

export function moveScore(level: number): number {
  return 1;
}

export function accumulateScore(score: number, scoreDisplay: number): number {
  return score > scoreDisplay
    ? score - scoreDisplay > 1000
      ? scoreDisplay + 1000
      : score - scoreDisplay > 100
      ? scoreDisplay + 100
      : score - scoreDisplay > 10
      ? scoreDisplay + 10
      : scoreDisplay + 1
    : scoreDisplay;
}
