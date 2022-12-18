const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");

const getVisibleSides = (x, y, z, positions) => {
  // Get the visible sides of the cube
  let visibleSides = 6;
  for (const cube of positions) {
    const [x2, y2, z2] = cube.map(Number);
    if (x2 === x && y2 === y && z2 === z) continue;
    // Check if a the cube is a neighbour
    if (
      (x2 === x && y2 === y && Math.abs(z2 - z) === 1) ||
      (x2 === x && z2 === z && Math.abs(y2 - y) === 1) ||
      (y2 === y && z2 === z && Math.abs(x2 - x) === 1)
    ) {
      visibleSides -= 1;
    }
  }
  return visibleSides;
};

const getAdjacentCubes = (x, y, z) => {
  const adjacentCubes = [];
  adjacentCubes.push([x + 1, y, z]);
  adjacentCubes.push([x - 1, y, z]);
  adjacentCubes.push([x, y + 1, z]);
  adjacentCubes.push([x, y - 1, z]);
  adjacentCubes.push([x, y, z + 1]);
  adjacentCubes.push([x, y, z - 1]);
  return adjacentCubes;
};

const solve = (input: string) => {
  const positions = input
    .split("\n")
    .map((line) => line.split(",").map(Number));

  const maxX = Math.max(...positions.map((cube) => cube[0]));
  const maxY = Math.max(...positions.map((cube) => cube[1]));
  const maxZ = Math.max(...positions.map((cube) => cube[2]));

  let totalSurfaceArea = 0;
  for (const cube of positions) {
    const [x, y, z] = cube.map(Number);
    totalSurfaceArea += getVisibleSides(x, y, z, positions);
  }

  const inside = new Set<string>();
  const outside = new Set<string>();

  let surfaceArea = totalSurfaceArea;
  for (const [x, y, z] of positions) {
    const adjacentCubes = getAdjacentCubes(x, y, z);
    for (const [x2, y2, z2] of adjacentCubes) {
      if (inside.has(`${x2},${y2},${z2}`) || outside.has(`${x2},${y2},${z2}`)) {
        continue;
      }
      if (x2 < 0 || x2 > maxX || y2 < 0 || y2 > maxY || z2 < 0 || z2 > maxZ) {
        outside.add(`${x},${y},${z}`);
      } else {
        inside.add(`${x},${y},${z}`);
      }

      const visited = new Set();
      const queue = new Array([x2, y2, z2]);
      while (queue.length) {
        const [x3, y3, z3] = queue.shift()!;
        if (
          visited.has(`${x3},${y3},${z3}`) ||
          positions.some(
            (cube) => cube[0] === x3 && cube[1] === y3 && cube[2] === z3
          )
        ) {
          continue;
        }
        visited.add(`${x3},${y3},${z3}`);
        if (visited.size > (maxX * maxY * maxZ) / 3) {
          for (const p of visited) {
            outside.add(`${p[0]},${p[1]},${p[2]}`);
          }
          surfaceArea -= 1;
          break;
        }
        queue.push(...getAdjacentCubes(x3, y3, z3));
      }

      for (const p of visited) {
        inside.add(`${p[0]},${p[1]},${p[2]}`);
      }
    }
  }
  return totalSurfaceArea - surfaceArea;
};

const testResult = solve(test);
console.log("test", testResult);
const result = solve(input);
console.log("result", result);
