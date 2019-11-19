import React, { useEffect } from "react";
import { loadHighScore, HighScore } from "../../util/highScore";
import { Row, Column } from "../../components/Layout";
import { H3, H2 } from "../../components/Text";
import { ZERO_SCORE, NO_NAME } from "../../constants";

function dummyScores(): void {
  if (loadHighScore().length < 5) {
    localStorage.setItem(
      "highScore",
      JSON.stringify([
        {
          name: "Bohr",
          levelStart: 1,
          levelEnd: 10,
          lines: 100,
          score: 50000
        },
        {
          name: "Einstein",
          levelStart: 1,
          levelEnd: 9,
          lines: 90,
          score: 40000
        },
        {
          name: "Feynman",
          levelStart: 1,
          levelEnd: 8,
          lines: 80,
          score: 30000
        },
        {
          name: "Newton",
          levelStart: 1,
          levelEnd: 7,
          lines: 70,
          score: 20000
        },
        {
          name: "Maxwell",
          levelStart: 1,
          levelEnd: 6,
          lines: 60,
          score: 10000
        }
      ])
    );
  }
}

function HighScoreRow({
  entry,
  highScores
}: {
  entry: number;
  highScores: HighScore[];
}) {
  useEffect(() => {
    dummyScores();
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
      <H3 padding="3px 0">
        {highScore.name.replace(" ", ".") +
          NO_NAME.slice(highScore.name.length)}
      </H3>
    </Row>
  );
}

const entries = [0, 1, 2, 3, 4];

export function HighScores() {
  const highScores: HighScore[] = loadHighScore();

  return (
    <Column width="100%">
      <H2 padding="0 0 40px 0">High Score</H2>
      {entries.map((e: number) => (
        <HighScoreRow key={e} entry={e} highScores={highScores} />
      ))}
    </Column>
  );
}
