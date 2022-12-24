const test = Deno.readTextFileSync("test-a.txt");
const input = Deno.readTextFileSync("input-a.txt");

const blizzardOffsets = {
  ">": [1, 0],
  "<": [-1, 0],
  "^": [0, -1],
  v: [0, 1],
};

const solve = (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  const targetRow = grid.length - 1;
  const targetColumn = grid[targetRow].findIndex((c) => c === ".");

  const blizzards = grid.reduce<
    {
      id: string;
      direction: keyof typeof blizzardOffsets;
      row: number;
      col: number;
    }[]
  >((acc, row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (Object.keys(blizzardOffsets).includes(col)) {
        acc.push({
          id: `${rowIndex},${colIndex}`,
          direction: col,
          row: rowIndex,
          col: colIndex,
        });

        grid[rowIndex][colIndex] = ".";
      }
    });
    return acc;
  }, []);

  let minute = 0;
  let positions = new Set<string>();

  positions.add(`0,1`);

  while (true) {
    if (positions.has(`${targetRow},${targetColumn}`)) {
      return minute;
    }

    minute++;
    // Calculate the next positions of each blizzard
    for (const blizzard of blizzards) {
      const [offsetCol, offsetRow] = blizzardOffsets[blizzard.direction];
      const nextRow = blizzard.row + offsetRow;
      const nextCol = blizzard.col + offsetCol;

      if (grid[nextRow][nextCol] === "#") {
        // Handle wrapping
        if (blizzard.direction === "^") {
          // Wrap top to bottom
          blizzard.row = grid.length - 2;
        }

        if (blizzard.direction === "v") {
          // Wrap bottom to top
          blizzard.row = 1;
        }

        if (blizzard.direction === ">") {
          // Wrap right to left
          blizzard.col = 1;
        }

        if (blizzard.direction === "<") {
          // Wrap left to right
          blizzard.col = grid[0].length - 2;
        }
      } else {
        blizzard.row = nextRow;
        blizzard.col = nextCol;
      }
    }

    const nextMoves = [
      [0, 0],
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    const newPositions = new Set<string>();
    for (const position of positions) {
      const [row, col] = position.split(",").map((n) => +n);
      for (const [offsetRow, offsetCol] of nextMoves) {
        const nextRow = row + offsetRow;
        const nextCol = col + offsetCol;
        const blizzard = blizzards.find(
          (b) => b.row === nextRow && b.col === nextCol
        );
        const next = grid[row]?.[col];
        if (!blizzard && next === ".") {
          newPositions.add(`${nextRow},${nextCol}`);
        }
      }
    }

    positions = newPositions;
  }
};

const testResult = solve(test);
console.log("test", testResult);

const result = solve(input);
console.log("result", result);
