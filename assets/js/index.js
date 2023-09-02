import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

//creates HTML elements for the grids
document.addEventListener("DOMContentLoaded", initiateGame);

//main board
const boardContainer = document.createElement('div');
boardContainer.setAttribute('id', 'main-board');

function initiateGame() {
  //loop thru board grids
  for (let row = 0; row < board.grid.length; row++) {

    //for each row in grid, create a mainrow UI
    const mainRow = document.createElement('div');
    mainRow.setAttribute('class', "main-rows");

    //for each col in the current grid row,
    for (let col = 0; col < board.grid[row].length; col++) {
      //create a square UI, add that square to mainrow
      createSquare(row, col, mainRow);
    }

    //append each main row UI to main-board
    boardContainer.appendChild(mainRow);
  }

  //append main board to the body
  document.body.appendChild(boardContainer);

  //Clicking a square
  boardContainer.addEventListener('click', squareClicker);
}

//helper function to create a square for each grid in the main row
function createSquare(row, col, currentMainRow) {
  const div = document.createElement('div');
  div.setAttribute('data-col', row);
  div.setAttribute('data-row', col);
  div.setAttribute('class', 'each-square');
  currentMainRow.appendChild(div);
}

function squareClicker(event) {
  const targetElement = event.target;
  const row = targetElement.dataset.row;
  const col = targetElement.dataset.col;

  //Only change the square if it hasn't been clicked
  if (row !== undefined && col !== undefined && !targetElement.classList.contains("hit") && !targetElement.classList.contains("miss")) {
    const hitOrMiss = board.makeHit(row, col);
    if (hitOrMiss === null) {
      targetElement.classList.add('miss');
    } else {
      targetElement.classList.add('hit');
      targetElement.textContent = board.grid[row][col];
      const gameOver = board.isGameOver();
      if (gameOver) {
        handleGameOver();
      }
    }
  }
}

//End the game
function handleGameOver() {
  const h1 = document.querySelector('h1');
  const h3 = document.createElement('h3');
  h3.textContent = "YOU WIN!";
  h1.insertAdjacentElement("afterend", h3);
  boardContainer.removeEventListener('click', squareClicker)
}

//reset button
const reset = document.createElement('button');
reset.setAttribute('id', 'reset-game');
reset.textContent = "Reset Game";
const h1 = document.querySelector('h1');
h1.insertAdjacentElement("afterend", reset);
reset.addEventListener("click", cleanTheBoard)

function cleanTheBoard() {
  for (const row of boardContainer.children) {
    for (const square of row.children) {

      //remove the clicks on all the squares
      square.classList.remove('hit');
      square.classList.remove('miss');
      square.textContent = "";

      //reset the ships
      board.grid = board.populateGrid();
      board.numRemaining = 17;
    }
  }
  const h3 = document.querySelector('h3');
  if (h3) {
    h3.remove();
  };
  boardContainer.addEventListener('click', squareClicker);
}
