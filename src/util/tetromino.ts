import { Tetromino, TetroGameObject } from "../types";

export function array2d(x: number, y: number): number[][] {
  return new Array(y).fill(0).map(() => new Array(x).fill(0));
}

export type TransformAction = "left" | "right" | "down" | "rotate";

export function transformBlock(
  tetro: TetroGameObject,
  actions: TransformAction[]
): TetroGameObject {
  const futureTetro: TetroGameObject = cloneTetroGameObject(tetro);

  if (actions.includes("left")) {
    futureTetro.position.x--;
  }

  if (actions.includes("right")) {
    futureTetro.position.x++;
  }

  if (actions.includes("down")) {
    futureTetro.position.y++;
  }

  // (2, 0) => (5, 2) ?
  // (x, y) => (x: length - 1 - y, y: x)

  if (actions.includes("rotate")) {
    if (futureTetro.tetromino.size.x === futureTetro.tetromino.size.y) {
      const rotated = array2d(
        futureTetro.tetromino.size.x,
        futureTetro.tetromino.size.y
      );
      const length: number = futureTetro.tetromino.size.x;

      for (let y = 0; y < futureTetro.tetromino.size.y; y++) {
        for (let x = 0; x < futureTetro.tetromino.size.x; x++) {
          rotated[y][x] = futureTetro.tetromino.data[x][length - y - 1];
        }
      }

      futureTetro.tetromino.data = [...rotated];
    }
  }

  return futureTetro;
}

// https://gamedev.stackexchange.com/questions/17974/how-to-rotate-blocks-in-tetris

function block1(): Tetromino {
  const c = 1;

  return {
    index: c - 1,
    name: "Long",
    size: { x: 4, y: 4 },
    data: [[0, 0, 0, 0], [c, c, c, c], [0, 0, 0, 0], [0, 0, 0, 0]]
  };
}

function block2(): Tetromino {
  const c = 2;

  return {
    index: c - 1,
    name: "J",
    size: { x: 3, y: 3 },
    data: [[c, 0, 0], [c, c, c], [0, 0, 0]]
  };
}

function block3(): Tetromino {
  const c = 3;

  return {
    index: c - 1,
    name: "L",
    size: { x: 3, y: 3 },
    data: [[0, 0, c], [c, c, c], [0, 0, 0]]
  };
}

function block4(): Tetromino {
  const c = 4;

  return {
    index: c - 1,
    name: "Square",
    size: { x: 4, y: 3 },
    data: [[0, c, c, 0], [0, c, c, 0], [0, 0, 0, 0]]
  };
}

function block5(): Tetromino {
  const c = 5;

  return {
    index: c - 1,
    name: "S",
    size: { x: 3, y: 3 },
    data: [[0, c, c], [c, c, 0], [0, 0, 0]]
  };
}

function block6(): Tetromino {
  const c = 6;

  return {
    index: c - 1,
    name: "T",
    size: { x: 3, y: 3 },
    data: [[0, c, 0], [c, c, c], [0, 0, 0]]
  };
}

function block7(): Tetromino {
  const c = 7;

  return {
    index: c - 1,
    name: "Z",
    size: { x: 3, y: 3 },
    data: [[c, c, 0], [0, c, c], [0, 0, 0]]
  };
}

const tetrominoes: Tetromino[] = [
  block1(),
  block2(),
  block3(),
  block4(),
  block5(),
  block6(),
  block7()
];

export function cloneTetroGameObject(
  tetroGameObject: TetroGameObject
): TetroGameObject {
  return {
    ...tetroGameObject,
    position: { ...tetroGameObject.position },
    tetromino: cloneTetromino(tetroGameObject.tetromino)
  };
}

export function cloneTetromino(tetromino: Tetromino): Tetromino {
  return {
    ...tetromino,
    data: [...tetromino.data],
    size: { ...tetromino.size }
  };
}

export function getRandomTetro(): Tetromino {
  return { ...tetrominoes[Math.floor(Math.random() * tetrominoes.length)] };
}

export function getTetro(index: number): Tetromino {
  return { ...tetrominoes[index] };
}

export function getNextTetro(index: number): TetroGameObject {
  return {
    position: { x: 3, y: 0 },
    lockDelay: 100,
    tetromino: getTetro(index)
  };
}

export function getFirstTetro(): TetroGameObject {
  return getNextTetro(Math.floor(Math.random() * tetrominoes.length));
}
