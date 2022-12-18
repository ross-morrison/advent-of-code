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

const solve = (input: string) => {
  const positions = input.split("\n").map((line) => line.split(","));

  // Get the surface area of each cube
  let totalSurfaceArea = 0;
  for (const cube of positions) {
    const [x, y, z] = cube.map(Number);
    totalSurfaceArea += getVisibleSides(x, y, z, positions);
  }

  return totalSurfaceArea;
};

const testResult = solve(test);
console.log("test", testResult);
const result = solve(input);
console.log("result", result);
