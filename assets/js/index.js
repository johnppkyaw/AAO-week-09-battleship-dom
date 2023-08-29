import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

document.addEventListener("DOMContentLoaded", () => {
  const boardContainer = document.createElement('div');
  boardContainer.setAttribute('id', 'main-board');

  for (let row = 0; row < board.grid.length; row++) {
    const mainRow = document.createElement('div');
    mainRow.setAttribute('class', "main-rows");
    for (let col = 0; col < board.grid[row].length; col++) {
      createSquare(row, col, mainRow);
    }
    boardContainer.appendChild(mainRow);
  }

  document.body.appendChild(boardContainer);

  function createSquare(row, col, currentMainRow) {
    const div = document.createElement('div');
    div.setAttribute('data-col', row);
    div.setAttribute('data-row', col);
    div.setAttribute('class', 'each-square');
    currentMainRow.appendChild(div);
  }
});
