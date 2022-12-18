const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");

const rocks = [
  {
    shape: [["#", "#", "#", "#"]],
  },
  {
    shape: [
      [".", "#", "."],
      ["#", "#", "#"],
      [".", "#", "."],
    ],
  },
  {
    shape: [
      ["#", "#", "#"],
      [".", ".", "#"],
      [".", ".", "#"],
    ],
  },
  {
    shape: [["#"], ["#"], ["#"], ["#"]],
  },
  {
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

let currentGasMove = 0;
for (let move = 0; move < 2022; move++) {
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
}
console.log(heightOfLastRock());
