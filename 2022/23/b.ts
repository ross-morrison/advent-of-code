const test = Deno.readTextFileSync("test-a.txt");
const input = Deno.readTextFileSync("input-a.txt");

const solve = (input: string) => {
  const initialPositions = input.split("\n").map((line) => line.split(""));

  const elves = initialPositions.reduce<any[]>((elves, line, y) => {
    line.forEach((char, x) => {
      if (char === "#") {
        elves.push({ x, y, id: elves.length });
      }
    });
    return elves;
  }, []);

  const movesToConsider = [
    {
      id: "north",
      directions: {
        north: { x: 0, y: -1 },
        northwest: { x: -1, y: -1 },
        northeast: { x: 1, y: -1 },
      },
    },
    {
      id: "south",
      directions: {
        south: { x: 0, y: 1 },
        southwest: { x: -1, y: 1 },
        southeast: { x: 1, y: 1 },
      },
    },
    {
      id: "west",
      directions: {
        west: { x: -1, y: 0 },
        northwest: { x: -1, y: -1 },
        southwest: { x: -1, y: 1 },
      },
    },
    {
      id: "east",
      directions: {
        east: { x: 1, y: 0 },
        northeast: { x: 1, y: -1 },
        southeast: { x: 1, y: 1 },
      },
    },
  ];

  for (let i = 0; i < 9999; i++) {
    let elvesMoved = 0;
    const proposedMoves = [];
    elves: for (const elf of elves) {
      let canMove = false;
      // Check the eight directions around the elf
      for (const move of movesToConsider) {
        for (const [direction, value] of Object.entries(move.directions)) {
          // check if there is an elf in the way
          const elfInWay = elves.find(
            (e) => e.x === elf.x + value.x && e.y === elf.y + value.y
          );
          if (elfInWay) {
            canMove = true;
          }
        }
      }

      if (!canMove) {
        continue;
      }

      elvesMoved++;

      outer: for (const move of movesToConsider) {
        for (const [direction, value] of Object.entries(move.directions)) {
          // check if there is an elf in the way
          const elfInWay = elves.find(
            (e) => e.x === elf.x + value.x && e.y === elf.y + value.y
          );
          if (elfInWay) {
            continue outer;
          }
        }

        const directionToMove = {
          north: { x: 0, y: -1 },
          south: { x: 0, y: 1 },
          west: { x: -1, y: 0 },
          east: { x: 1, y: 0 },
        };

        const proposedMove = {
          direction: move.id,
          ...elf,
          x: elf.x + directionToMove[move.id].x,
          y: elf.y + directionToMove[move.id].y,
        };
        proposedMoves.push(proposedMove);
        continue elves;
      }
    }

    if (elvesMoved === 0) {
      return i + 1;
    }

    for (const data of proposedMoves) {
      // Get count of other elves with this move
      const count = proposedMoves.filter(
        (m) => m.x === data.x && m.y === data.y
      ).length;
      if (count > 1) {
        continue;
      }

      // Move the elf
      const elf = elves.find((e) => e.id === data.id);
      elf.x = data.x;
      elf.y = data.y;
    }

    // Rotate the movesToConsider array
    movesToConsider.push(movesToConsider.shift());
  }
};

const testResult = solve(test);
console.log("test", testResult);

const result = solve(input);
console.log("result", result);
