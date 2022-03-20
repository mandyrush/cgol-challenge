// LOOP over all cells:
//     IF this cell is alive:
//         IF it has less than 2 or more than 3 neighbours:
//             This cell is dead
//     ELSE:
//         IF it has exactly 3 neighbours:
//             This cell is alive


let board = [];

const underpopulated = (liveNeighbors) => {
    return liveNeighbors < 2;
}

const overpopulated = (liveNeighbors) => {
    return liveNeighbors > 3;
}

const canReproduce = (liveNeighbors) => {
    return liveNeighbors === 3;
}

const isAlive = (x, y) => {
    return board[x][y];
}

const checkNeighbors = (x, y) => {
    let liveNeighbors = 0;

    const firstRow = x === 0;
    const lastRow = x === board.length - 1;
    const firstRowItem = y === 0;
    const lastRowItem = y === board[x].length - 1;

    // Look top left
    if (!firstRow && !firstRowItem) {
        if (board[x - 1][y - 1]) {
            liveNeighbors++;
        }
    }

    // Look up
    if (!firstRow) {
        if (board[x - 1][y]) {
            liveNeighbors++;
        }
    }

    // Look top right
    if (!firstRow && !lastRowItem) {
        if (board[x - 1][y + 1]) {
            liveNeighbors++;
        }
    }

    // Look left
    if (!firstRowItem) {
        if (board[x][y - 1]) {
            liveNeighbors++;
        }
    }

    // Look right
    if (!lastRowItem) {
        if (board[x][y + 1]) {
            liveNeighbors++;
        }
    }

    // Look bottom left
    if (!lastRow && !firstRowItem) {
        if (board[x + 1][y - 1]) {
            liveNeighbors++;
        }
    }

    // Look down
    if (!lastRow) {
        if (board[x + 1][y]) {
            liveNeighbors++;
        }
    }

    // Look bottom right
    if (!lastRow && !lastRowItem) {
        if (board[x + 1][y + 1]) {
            liveNeighbors++;
        }
    }

    return liveNeighbors;
}

const printBoard = (rows, cols) => {
    let gameBoard = document.getElementById('board');

    // Loop over rows
    for (let x = 0; x <= rows; x++) {
        board.push([]);
        // Loop over columns
        for (let y = 0; y <= cols; y++) {
            board[x].push(Math.floor(Math.random() * 2));

            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', `cell-${x}-${y}`);

            if (board[x][y]) {
                cell.classList.add('live-cell');
            }

            gameBoard.appendChild(cell);
        }
    }
}

const initiateGame = () => {
    // Loop over rows
    for (let x = 0; x < board.length; x++) {
        // Loop over columns
        for (let y = 0; y < board[x].length; y++) {
            let liveNeighbors = checkNeighbors(x, y);
            let cell = document.getElementById(`cell-${x}-${y}`);

            if (isAlive(x, y)) {
                // IF it has less than 2 or more than 3 neighbours:
                // This cell is dead
                if (underpopulated(liveNeighbors) || overpopulated(liveNeighbors)) {
                    board[x][y] = 0;
                    cell.classList.remove('live-cell');
                }
            } else {
                // IF it has exactly 3 neighbours:
                // This cell is alive
                if (canReproduce(liveNeighbors)) {
                    board[x][y] = 1;
                    cell.classList.add('live-cell');
                }
            }
        }
    }
}

printBoard(15, 80);


// for (let i = 0; i <= 200; i++) {
//     (function (i) {
//         setTimeout(function () {
//             console.log(i);
//             initiateGame();
//         }, i * 500);
//     })(i);
// }
