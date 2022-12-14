const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");
const lines = input.split("\n");

const grid = Array(176).fill(0).map(() => Array(1000).fill("."));

let maxY = 0;
for (const path of lines) {
  const parts = path.split(" -> ");
  for (let i = 0; i < parts.length - 1; i++) {
    let [x, y] = parts[i].split(",").map(Number);
    let [x2, y2] = parts[i + 1].split(",").map(Number);
    // Set every point between the two points to #
    maxY = Math.max(maxY, y, y2);
    while (x !== x2 || y !== y2) {
      grid[y][x] = "#";
      if (x < x2) {
        x++;
      } else if (x > x2) {
        x--;
      }
      if (y < y2) {
        y++;
      } else if (y > y2) {
        y--;
      }
    }

    grid[y][x] = "#";
  }
}
console.log(maxY + 2);

const sandMove = (x: number, y: number) => {
  if (y === grid.length - 1) {
    return false;
  }

  if (grid[y + 1][x] === ".") {
    return [x, y + 1];
  }

  if (grid[y + 1][x - 1] === ".") {
    return [x - 1, y];
  }

  if (grid[y + 1][x + 1] === ".") {
    return [x + 1, y];
  }
  return true;
};

const addSand = () => {
  let curX = 500;
  let curY = 0;
  if (grid[curY][curX] === "o") {
    return false;
  }
  while (true) {
    const next = sandMove(curX, curY);
    if (typeof next === "boolean") {
      if (next) {
        break;
      } else {
        return false;
      }
    }
    curX = next[0];
    curY = next[1];
  }
  grid[curY][curX] = "o";
  return true;
};

for (let i = 0; i < 1000; i++) {
  grid[grid.length - 1][i] = "#";
}

let inAbyss = true;
let runs = 0;
while (inAbyss) {
  runs++;
  inAbyss = addSand();
}

// for (let i = 0; i < grid.length; i++) {
//   Deno.writeFileSync('output.txt', new TextEncoder().encode(grid[i].join("")), { append: true });
//   Deno.writeFileSync('output.txt', new TextEncoder().encode("\n"), { append: true });
// }

console.log(runs - 1);
