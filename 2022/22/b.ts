const test = Deno.readTextFileSync("test-a.txt");
const input = Deno.readTextFileSync("input-a.txt");

const parseBoard = (board: string) => {
  // Parse the board into a 2D array
  const lines = board.split("\n");
  const boardArray = lines.map((line) => line.split(""));
  return boardArray;
};

const directionToString = {
  0: ">",
  1: "v",
  2: "<",
  3: "^",
};

const solve = (input: string) => {
  const [input_board, input_moves] = input.split("\n\n");

  const board = parseBoard(input_board);

  const moves = [];
  //Write regex to match a number (1-100), or a direction (L, R)
  const moveRegex = /(\d+|[LR])/g;
  const matches = input_moves.matchAll(moveRegex);
  for (const match of matches) {
    moves.push(match[0]);
  }

  let column = board[0].findIndex((cell) => cell === ".");
  let row = 0;
  let direction = 0;

  const grid = [...board.map((line) => [...line])];
  console.log("Starting at", column, row, direction);

  for (const move of moves) {
    if (move === "L") {
      direction = (direction + 3) % 4;
      continue;
    }

    if (move === "R") {
      direction = (direction + 1) % 4;
      continue;
    }

    const steps = parseInt(move);
    for (let i = 0; i < steps; i++) {
      // @ts-ignore - we know this is a number
      grid[row][column] = directionToString[direction];
      const dx = [1, 0, -1, 0][direction];
      const dy = [0, 1, 0, -1][direction];

      let nextColumn = column + dx;
      let nextRow = row + dy;
      let nextDirection = direction;

      let nextCell = board[nextRow]?.[nextColumn];

      if (!nextCell || nextCell === " ") {
        // Wrap around in the direction we're facing
        const sideLength = Math.max(board[0].length / 3);
        switch (direction) {
          case 0: {
            // Right
            if (column === sideLength * 3 - 1) {
              nextColumn = sideLength * 2 - 1;
              nextRow = sideLength * 3 - row;
              nextDirection = 2;
              break;
            }

            if (column === sideLength * 2 - 1) {
              if (row >= sideLength - 1 && row <= sideLength * 2 - 1) {
                nextColumn = sideLength - 1;
                nextRow = sideLength + row - 1;
                nextDirection = 3;
                break;
              }
              if (row >= sideLength * 2 - 1 && row <= sideLength * 3 - 1) {
                nextColumn = sideLength * 3 - 1;
                nextRow = sideLength * 3 - row;
                nextDirection = 2;
                break;
              }
            }

            if (column === sideLength - 1) {
              nextColumn = sideLength + row - 1;
              nextRow = sideLength * 3 - 1;
              nextDirection = 3;
              break;
            }

            break;
          }

          case 1: {
            // Down
            if (row === sideLength - 1) {
              nextRow = sideLength * 2 - 1;
              nextColumn = sideLength + column - 1;
              nextDirection = 2;
              break;
            }

            if (row === sideLength * 3 - 1) {
              nextRow = sideLength - 1;
              nextColumn = sideLength * 2 + column - 1;
              nextDirection = 1;
              break;
            }

            if (row === sideLength * 4 - 1) {
              nextRow = column + sideLength - 1;
              nextColumn = 0;
              nextDirection = 2;
              break;
            }

            break;
          }

          case 2: {
            // Left
            if (column === sideLength - 1) {
              if (row >= 0 && row <= sideLength - 1) {
                nextColumn = 0;
                nextRow = sideLength * 3 - row;
                nextDirection = 0;
                break;
              }

              if (row >= sideLength - 1 && row <= sideLength * 2 - 1) {
                nextColumn = row - sideLength + 1;
                nextRow = sideLength * 2 - 1;
                nextDirection = 1;
                break;
              }
            }

            if (column === 0) {
              if (row >= sideLength * 2 - 1 && row <= sideLength * 3 - 1) {
                nextColumn = sideLength - 1;
                nextRow = row - sideLength * 2 + 1;
                nextDirection = 0;
                break;
              }
            }

            break;
          }

          case 3: {
            // Up
            if (row === 0) {
              if (column >= sideLength - 1 && column <= sideLength * 2 - 1) {
                nextRow = 0;
                nextColumn = sideLength * 2 + column - 1;
                nextDirection = 0;
                break;
              }
            }

            if (row === sideLength * 2 - 1) {
              nextRow = sideLength - 1;
              nextColumn = sideLength + column - 1;
              nextDirection = 0;
              break;
            }

            break;
          }
        }

        nextCell = board[nextRow]?.[nextColumn];

        if (!nextCell || nextCell === "#") {
          break;
        }

        column = nextColumn;
        row = nextRow;
        direction = nextDirection;
        continue;
      }

      if (nextCell === "#" || nextCell === " ") {
        break;
      }

      column += dx;
      row += dy;
    }
  }

  return 1000 * (row + 1) + 4 * (column + 9) + direction - 1;
};

const result = solve(input);
console.log("result", result);
