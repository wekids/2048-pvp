import { Injectable } from '@angular/core';
import {X_LENGTH, Y_LENGTH} from './constants';
import {Grid} from './board';

@Injectable()
export class BoardService {
  constructor() {
    let allGridIds = Array.from(Array(X_LENGTH * Y_LENGTH).keys());
    this.gridIdsToMove = {
      "left": [],
      "up": [],
      "down": [],
      "right": []
    };
    for (let i = 1; i < X_LENGTH; i++) {
      this.gridIdsToMove["left"].push(...allGridIds.filter((id) => id % X_LENGTH == i));
    }
    for (let i = X_LENGTH - 2; i >= 0; i--) {
      this.gridIdsToMove["right"].push(...allGridIds.filter((id) => id % X_LENGTH == i));
    }
    for (let i = 1; i < Y_LENGTH; i++) {
      this.gridIdsToMove["up"].push(...allGridIds.filter((id) => Math.floor(id / X_LENGTH) == i));
    }
    for (let i = Y_LENGTH - 2; i >= 0; i--) {
      this.gridIdsToMove["down"].push(...allGridIds.filter((id) => Math.floor(id / X_LENGTH) == i));
    }
  }

  resetBoard(board) {
    board.grids.forEach((grid) => {
      grid.number = null;
    });
    this.addTiles(board.grids, 2);
  }

  addTiles(grids, num) {
    let randomIds = this.getRandomEmptyGridIds(grids, num, X_LENGTH * Y_LENGTH);
    randomIds.forEach((randomId) => {
      grids[randomId].number = 2;
    });
  }

  getRandomEmptyGridIds(grids, num, max) {
    let result = new Set();
    while(result.size < num) {
      let randomId = Math.floor(Math.random() * max);
      if (grids[randomId].isEmpty()) result.add(randomId);
    }
    return Array.from(result);
  }

  moveTiles(grids: Array<Grid>, xDirection: number, yDirection: number) {
    let gridsForTilesToMove = this.getGridsForTilesToMove(grids, xDirection, yDirection);
    gridsForTilesToMove.forEach((grid) => {
      let gridToMove = grid;
      while(!this.isTileGoingOutsideBoard(gridToMove, xDirection, yDirection)) {
        let gridAfterMove = this.getGridAfterMove(grids, gridToMove, xDirection, yDirection);
        if (gridAfterMove.isEmpty()) {
          gridAfterMove.number = gridToMove.number;
          gridToMove.number = null;
          gridToMove = gridAfterMove;
        } else if (gridAfterMove.number == gridToMove.number) {
          gridAfterMove.number *= 2;
          gridToMove.number = null;
          break;
        } else {
          break;
        }
      }
    });
    this.addTiles(grids, 1);
  }

  isTileGoingOutsideBoard(grid: Grid, xDirection: number, yDirection: number) {
    let x = grid.getX() + xDirection;
    let y = grid.getY() + yDirection;
    if (x < 0 || x >= X_LENGTH || y < 0 || y >= Y_LENGTH) return true;
    else return false;
  }

  getGridAfterMove(grids : Array<Grid>, grid: Grid, xDirection: number, yDirection: number) : Grid {
    return grids[grid.id + xDirection + yDirection * X_LENGTH]
  }

  getGridsForTilesToMove(grids : Array<Grid>, xDirection: number, yDirection: number) {
    let result = [];
    let gridIdsToFilter;

    if (xDirection > 0) {
      gridIdsToFilter = this.gridIdsToMove["right"];
    } else if (xDirection < 0) {
      gridIdsToFilter = this.gridIdsToMove["left"];
    } else if (yDirection > 0) {
      gridIdsToFilter = this.gridIdsToMove["down"];
    } else if (yDirection < 0) {
      gridIdsToFilter = this.gridIdsToMove["up"];
    }
    let resultIds = gridIdsToFilter.filter((id) => !grids[id].isEmpty());
    result = resultIds.map((gridId) => grids[gridId]);
    return result;
  }
}
