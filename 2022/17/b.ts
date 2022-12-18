const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");

const rocks = [
  {
    id: "line",
    shape: [["#", "#", "#", "#"]],
  },
  {
    id: "cross",
    shape: [
      [".", "#", "."],
      ["#", "#", "#"],
      [".", "#", "."],
    ],
  },
  {
    id: "lshape",
    shape: [
      ["#", "#", "#"],
      [".", ".", "#"],
      [".", ".", "#"],
    ],
  },
  {
    id: "tower",
    shape: [["#"], ["#"], ["#"], ["#"]],
  },
  {
    id: "square",
    shape: [
      ["#", "#"],
      ["#", "#"],
    ],
  },
];

const bitMap = [[0, 0, 0, 0, 0, 0, 0, 0]];

const isOverlapping = (x: number, y: number, rock: typeof rocks[0]) => {
  for (let ry = 0; ry < rock.shape.length; ry++) {
    for (let rx = 0; rx < rock.shape[0].length; rx++) {
      if (rock.shape[ry][rx] === ".") continue;
      if (bitMap[y + ry]?.[x + rx]) {
        return true;
      }
    }
  }
  return false;
};

const increaseSize = (size: number) => {
  for (let i = 0; i < size; i++) {
    bitMap.push([0, 0, 0, 0, 0, 0, 0, 0]);
  }
};

const heightOfLastRock = () => {
  for (let i = bitMap.length - 1; i >= 0; i--) {
    for (let j = 0; j < bitMap[i].length; j++) {
      if (bitMap[i][j]) {
        return i + 1;
      }
    }
  }
  return 0;
};

const history = [];
let currentGasMove = 0;
for (let move = 0; move < 5000; move++) {
  const rock = rocks[move % rocks.length];
  let currentX = 2;
  let currentY = heightOfLastRock() + 3;

  increaseSize(rock.shape.length + 3);

  let isFalling = true;
  while (isFalling) {
    const nextGasMove = input[currentGasMove++ % input.length];
    const rightOverlapping = isOverlapping(currentX + 1, currentY, rock);
    const leftOverlapping = isOverlapping(currentX - 1, currentY, rock);
    if (
      nextGasMove === ">" &&
      currentX + rock.shape[0].length < 7 &&
      !rightOverlapping
    ) {
      currentX++;
    }

    if (nextGasMove === "<" && currentX > 0 && !leftOverlapping) {
      currentX--;
    }

    const downOverlapping = isOverlapping(currentX, currentY - 1, rock);
    if (currentY === 0 || downOverlapping) {
      isFalling = false;
      break;
    }

    currentY--;
  }
  for (let ry = 0; ry < rock.shape.length; ry++) {
    for (let rx = 0; rx < rock.shape[0].length; rx++) {
      if (rock.shape[ry][rx] === ".") continue;
      bitMap[currentY + ry][currentX + rx] = 1;
    }
  }
  history.push({ rock, x: currentX, y: currentY });
}
console.log(heightOfLastRock());

const lastIndex = history.length - 1;
const lastMove = history[lastIndex];
let foundPeriod = 0;
let foundHeight = 0;
for (let i = lastIndex - 1; i > 0; i--) {
  const curMove = history[i];
  const period = lastIndex - i;
  if (curMove.rock.id !== lastMove.rock.id || curMove.x !== lastMove.x) {
    continue;
  }

  let matching = true;
  const toMove = history[lastIndex - period];
  for (let j = 0; j < period; j++) {
    const start = history[lastIndex - j];
    const end = history[lastIndex - j - period];
    if (!start || !end) continue;
    if (
      start.rock.id !== end.rock.id ||
      start.x !== end.x ||
      curMove.y - end.y !== toMove.y - end.y
    ) {
      matching = false;
      break;
    }
  }
  if (matching) {
    foundPeriod = period;
    foundHeight = curMove.y - history[i - foundPeriod].y;
    break;
  }
}

const startingHeight = history.findIndex((_, i, arr) => {
  const start = arr[i];
  const end = arr[i + foundPeriod];
  return start.rock.id === end.rock.id && start.x === end.x;
});

// Should use Math.floor here, but foundHeight * 2 works as well.
const iterations = Math.round((1000000000000 - startingHeight) / foundPeriod);
const remaining = (1000000000000 - startingHeight) % foundPeriod;
const remainingHeight = history[startingHeight + remaining + foundPeriod].y;
const result = iterations * foundHeight + remainingHeight - foundHeight * 2;
console.log(result);
