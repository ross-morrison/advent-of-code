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
    outer: for (let i = 0; i < steps; i++) {
      // @ts-ignore - we know this is a number
      grid[row][column] = directionToString[direction];
      let dx = 0;
      let dy = 0;
      switch (direction) {
        case 0:
          dx = 1;
          break;
        case 1:
          dy = 1;
          break;
        case 2:
          dx = -1;
          break;
        case 3:
          dy = -1;
          break;
      }

      let nextCell = board[row + dy]?.[column + dx];

      if (!nextCell || nextCell === " ") {
        let nextColumn = column;
        let nextRow = row;
        // Wrap around in the direction we're facing
        switch (direction) {
          case 0: // Right
            nextColumn = board[row].findIndex((cell) => cell !== " ");
            break;
          case 1: // Down
            nextRow = board.findIndex((line) => line[column] !== " ");
            break;
          case 2: // Left
            nextColumn = board[row].length - 1;
            break;
          case 3: {
            // Up
            let idx = -1;
            for (let i = board.length - 1; i >= 0; i--) {
              if (board[i][column] === undefined) continue;
              if (board[i][column] === ".") {
                idx = i;
                break;
              } else {
                break outer;
              }
            }
            nextRow = idx;
            break;
          }
        }

        nextCell = board[nextRow][nextColumn];

        if (nextCell === "#" || nextCell === " ") {
          break;
        }

        column = nextColumn;
        row = nextRow;
        continue;
      }

      if (nextCell === "#") {
        break;
      }

      column += dx;
      row += dy;
    }
  }

  return 1000 * (row + 1) + 4 * (column + 1) + direction;
};

const testResult = solve(test);
console.log("test", testResult);

const result = solve(input);
console.log("result", result);
