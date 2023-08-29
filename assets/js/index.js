import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

//creates HTML elements for the grids
document.addEventListener("DOMContentLoaded", () => {
  //main board
  const boardContainer = document.createElement('div');
  boardContainer.setAttribute('id', 'main-board');

  //main rows
  for (let row = 0; row < board.grid.length; row++) {
    const mainRow = document.createElement('div');
    mainRow.setAttribute('class', "main-rows");
    for (let col = 0; col < board.grid[row].length; col++) {
      createSquare(row, col, mainRow);
    }
    boardContainer.appendChild(mainRow);
  }

  //append main board to the body
  document.body.appendChild(boardContainer);

  //helper function to create a square for each grid in the main row
  function createSquare(row, col, currentMainRow) {
    const div = document.createElement('div');
    div.setAttribute('data-col', row);
    div.setAttribute('data-row', col);
    div.setAttribute('class', 'each-square');
    currentMainRow.appendChild(div);
  }

  //Clicking a square
  boardContainer.addEventListener('click', (event) => {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    if (board.makeHit(row, col) === null) {
      event.target.classList.add('miss');
    } else {
      event.target.classList.add('hit');
      event.target.textContent = board.grid[row][col]
    }
  })
});
