import {Component} from '@angular/core';
import {BoardService} from './boardService';
import {X_LENGTH, Y_LENGTH} from './constants';

// tried to extract this class to a separate file and to import above but somehow the Grid class came after BoardComponent in the webpack-compiled js file.
// as a result, Grid could not be initialized in the constructor
export class Grid {
  constructor(id) {
    this.id = id;
    this.number = null;
  }

  isEmpty() {
    return this.number == null;
  }

  getX() {
    return this.id % X_LENGTH;
  }

  getY() {
    return Math.floor(this.id / Y_LENGTH);
  }
}

@Component({
  template: require('./board.html'),
  providers: [BoardService]
})
export class BoardComponent {
  constructor(boardService: BoardService) {
    this.boardService = boardService;
	  this.grids = [];
	  this.resetButtonText = "New Game!";
    for (let i = 0; i < X_LENGTH; i++) {
      for (let j = 0; j < Y_LENGTH; j++) {
        this.grids.push(new Grid(X_LENGTH * i + j));
      }
    }
  }

  isGridRightMost(grid) {
    return grid.id % X_LENGTH == X_LENGTH - 1;
  }

  resetBoard() {
    this.boardService.resetBoard(this);
  }

  move(xDirection: number, yDirection: number) {
    this.boardService.moveTiles(this.grids, xDirection, yDirection);
  }
}
