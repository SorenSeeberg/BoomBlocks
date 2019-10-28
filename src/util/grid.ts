import { TetroGameObject, Vector2, Grid } from "../types";
import { array2d } from "./tetromino";
import { GRID_SIZE } from "../constants";
import { sum } from "./misc";

function cloneGrid(grid: Grid): Grid {
  return [...grid.map(l => [...l])];
}

/**
 * Tests if a given tetro can fit inside the grid
 */

export function fits(grid: Grid, tetro: TetroGameObject): boolean {
  const gridSize: Vector2 = { x: grid[0].length, y: grid.length };

  let currentBlockValue: number;
  let currentBlockPosX: number;
  let currentBlockPosY: number;

  for (let y = 0; y < tetro.tetromino.size.y; y++) {
    for (let x = 0; x < tetro.tetromino.size.x; x++) {
      currentBlockPosX = tetro.position.x + x;
      currentBlockPosY = tetro.position.y + y;
      currentBlockValue = tetro.tetromino.data[y][x];

      // Check if it's a solid block
      if (currentBlockValue !== 0) {
        // Check if the solid block is outside the grid bounds
        if (
          currentBlockPosX < 0 ||
          currentBlockPosX >= gridSize.x ||
          currentBlockPosY < 0 ||
          currentBlockPosY >= gridSize.y
        ) {
          return false;
          // Check if the solid block that is inside the grid bounds
          // is colliding with a solid block on the grid
        } else {
          if (grid[currentBlockPosY][currentBlockPosX] !== 0) {
            return false;
          }
        }
      }
    }
  }

  // If all tests are passed, the tetro fits on the grid
  return true;
}

/**
 * Writes a tetromino to the grid. Only use this if you have
 * performed a successfull collision check first.
 */
export function freeze(grid: number[][], tetro: TetroGameObject): number[][] {
  let currentBlockValue: number;
  let currentBlockPosX: number;
  let currentBlockPosY: number;

  const updatedGrid: Grid = cloneGrid(grid);

  for (let y = 0; y < tetro.tetromino.size.y; y++) {
    for (let x = 0; x < tetro.tetromino.size.x; x++) {
      currentBlockPosX = tetro.position.x + x;
      currentBlockPosY = tetro.position.y + y;
      currentBlockValue = tetro.tetromino.data[y][x];

      if (currentBlockValue !== 0) {
        updatedGrid[currentBlockPosY][currentBlockPosX] = currentBlockValue;
      }
    }
  }

  return updatedGrid;
}

/**
 * Returns the indices of collapsable lines:
 */
export function collapsableLInes(grid: Grid): number[] {
  const fullLines: number[] = [];

  for (let l = 0; l < grid.length; l++) {
    if (!grid[l].includes(0)) {
      fullLines.push(l);
    }
  }

  return fullLines;
}

/**
 * Removes full lines and inserts as many empty lines at the top.
 * A clone of the modified grid is returned
 */
export function collapseLines(grid: Grid, collapse: number[]): Grid {
  const updatedGrid: Grid = cloneGrid(grid).filter(
    (l: number[], i: number) => !collapse.includes(i)
  );

  return [...array2d(GRID_SIZE.x, collapse.length), ...updatedGrid];
}

/**
 * Checks if the grid has any solid blocks in the two top rows.
 * If it does, the game cannot continue and we have Game Over
 */
export function gameOver(grid: Grid): boolean {
  for (let l = 0; l < 2; l++) {
    if (sum(grid[l]) > 0) {
      return true;
    }
  }

  return false;
}
