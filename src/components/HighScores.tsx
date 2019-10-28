import React from "react";
import { loadHighScore, HighScore } from "../util/highScore";
import { Column, Row } from "./Layout";
import { H1, H3 } from "./Text";

/*
function dummyScores(): void {
  addHighScore({
    name: "Zoidberg",
    levelStart: 1,
    levelEnd: 21,
    lines: 181,
    score: 182374
  });

  addHighScore({
    name: "Zoidberg",
    levelStart: 1,
    levelEnd: 19,
    lines: 187,
    score: 282374
  });

  addHighScore({
    name: "Zoidberg",
    levelStart: 1,
    levelEnd: 23,
    lines: 173,
    score: 172374
  });
}*/

function HighScoreRow({ highScore }: { highScore: HighScore }) {
  return (
    <Row justifyContent="space-evenly" width="100%">
      <H3>{highScore.score}</H3>
      <H3>{highScore.name}</H3>
    </Row>
  );
}

export function HighScores() {
  const highScore: HighScore[] = loadHighScore();

  return (
    <Column width="100%">
      <H1 padding="0 0 20px 0">HighScore</H1>
      {highScore.map(h => (
        <HighScoreRow highScore={h} />
      ))}
    </Column>
  );
}
