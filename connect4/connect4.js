/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  let board = $('#board');

  // Create a table row (top) that will run handleClick when clicked.
  // Add enough table cells to match the width, giving each a single digit ID.
  // Append that entire top row to the (previously empty) board.
  const top = $("<tr class='column-top'></tr>").on('click', handleClick);
  for (let x = 0; x < WIDTH; x++) {
    top.append($(`<td id='${x}'>`));
  }
  board.append(top);

  // Create HEIGHT rows, each with WIDTH cells. Each cell has an ID representing
  // its vertical (y) and horizontal (x) position for later reference. Each row
  // is appended to the board, which previously just held the top row.
  for (let y = 0; y < HEIGHT; y++) {
    const row = $('<tr />');
    for (let x = 0; x < WIDTH; x++) {
      row.append($(`<td id='${y}-${x}'>`));
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = board.length - 1; y >= 0; y--) {
    if (board[y][x] === undefined) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  let token = $('<div>');
  token.addClass(`piece p${currPlayer}`);
  $(`#${y}-${x}`).append(token);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  // const y = 4;
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    setTimeout(function() {
      return endGame(`Player ${currPlayer} won!`);
    }, 100);
  }

  // check for tie
  if (
    board[0].every(function(val) {
      return val > 0;
    })
  ) {
    return endGame(`It's a tie!`);
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;

  console.log(board);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // for every square (i.e. for every y,x) declare/assign an array with:
  // 1) itself and the 3 to the right
  // 2) itself and the three below
  // 3) itself and the three diagonally downward & to the right
  // 4) itself and the three diagonally downward & to the left
  // Then, run _win on each of those, and if any of the four return True, that's a win.
  // What does _win do? Checks if y and x are both within bounds and if the value of
  // that (in bounds) cell matches currPlayer, for all four cells being checked.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
