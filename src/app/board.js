import {Component} from '@angular/core';
import {BoardService} from './boardService';

// tried to extract this class to a separate file and to import above but somehow the Grid class came after BoardComponent in the webpack-compiled js file.
// as a result, Grid could not be initialized in the constructor
export class Grid {
  constructor(id) {
    this.id = id;
    this.number = null;
  }
}

@Component({
  template: require('./board.html'),
  providers: [BoardService]
})
export class BoardComponent {
  constructor(boardService: BoardService) {
    this.boardService = boardService;
    this.X_LENGTH = 4;
    this.Y_LENGTH = 4;
	  this.grids = [];
	  this.resetButtonText = "New Game!";
    for (let i = 0; i < this.X_LENGTH; i++) {
      for (let j = 0; j < this.Y_LENGTH; j++) {
        this.grids.push(new Grid(this.X_LENGTH * i + j));
      }
    }
  }

  isGridRightMost(grid) {
    return grid.id % this.X_LENGTH == this.X_LENGTH - 1;
  }

  resetBoard() {
    this.boardService.resetBoard(this);
  }
}
