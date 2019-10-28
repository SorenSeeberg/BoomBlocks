export type HighScore = {
  name: string;
  score: number;
  levelStart: number;
  levelEnd: number;
  lines: number;
};

function saveHighScore(highScores: HighScore[]) {
  localStorage.setItem("highScore", JSON.stringify(highScores));
}

export function loadHighScore(): HighScore[] {
  const highScoreString: string | null = localStorage.getItem("highScore");

  if (highScoreString === null) {
    return [];
  }

  return JSON.parse(highScoreString);
}

export function addHighScore(highScore: HighScore): void {
  let highScores: HighScore[] = loadHighScore();

  if (highScores.length === 0) {
    highScores.push(highScore);
  } else {
    for (let x = 0; x < highScores.length; x++) {
      if (highScore.score > highScores[x].score) {
        highScores.splice(x + 1, 0, highScore);
      }
    }

    while (highScores.length > 5) {
      highScores.pop();
    }
  }

  saveHighScore(highScores);
}
