import React, { useEffect } from "react";
import { loadHighScore, HighScore, addHighScore } from "../util/highScore";
import { Column, Row } from "./Layout";
import { H3, H2 } from "./Text";
import { ZERO_SCORE, NO_NAME } from "../constants";

function dummyScores(): void {
  addHighScore({
    name: "Zoidberg",
    levelStart: 1,
    levelEnd: 21,
    lines: 181,
    score: 182374
  });
}

function HighScoreRow({
  entry,
  highScores
}: {
  entry: number;
  highScores: HighScore[];
}) {
  useEffect(() => {
    //dummyScores()
  }, []);

  const highScore: HighScore =
    highScores.length > entry
      ? highScores[entry]
      : {
          score: ".......",
          name: "..........",
          levelStart: 0,
          levelEnd: 0,
          lines: 0
        };

  const scoreString: string = highScore.score.toString();

  return (
    <Row justifyContent="space-between" width="calc(100% - 30px)">
      <H3>{ZERO_SCORE.slice(scoreString.length) + scoreString}</H3>
      <H3>{highScore.name + NO_NAME.slice(highScore.name.length)}</H3>
    </Row>
  );
}

const entries = [0, 1, 2, 3, 4];

export function HighScores() {
  const highScores: HighScore[] = loadHighScore();

  return (
    <Column width="100%">
      <H2 padding="0 0 20px 0">High Score</H2>
      {entries.map((e: number) => (
        <HighScoreRow key={e} entry={e} highScores={highScores} />
      ))}
    </Column>
  );
}
