import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {
  resetBoard(board) {
    board.grids.forEach((grid) => {
      grid.number = null;
    });
    let randomIds = this.getRandomIds(2, board.X_LENGTH * board.Y_LENGTH);
    randomIds.forEach((randomId) => {
      board.grids[randomId].number = 2;
    });
  }

  getRandomIds(num, max) {
    let result = new Set();
    while(result.size < num) {
      result.add(Math.floor(Math.random() * max));
    }
    return Array.from(result);
  }
}
