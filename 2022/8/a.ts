const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");

const lines = input.split("\n");

const heightMap = lines.reduce((acc: any, line) => {
  const cols = line.split("");
  for (let i = 0; i < cols.length; i++) {
    if (!acc[i]) {
      acc[i] = [];
    }
    acc[i].push(+cols[i]);
  }
  return acc;
}, []);

const isOnEdge = (x: number, y: number) => {
  return y === 0 || y === heightMap.length - 1 || x === 0 || x === heightMap.length - 1;
};

const hasPathToEdge = (x: number, y: number, heightValue: number, dir: number) => {
  if (heightMap[x][y] >= heightValue) return false;
  if (isOnEdge(x, y)) return true;
  if (dir === 0) {
    if (hasPathToEdge(x - 1, y, heightValue, dir)) return true;
  } else if (dir === 1) {
    if (hasPathToEdge(x + 1, y, heightValue, dir)) return true;
  } else if (dir === 2) {
    if (hasPathToEdge(x, y - 1, heightValue, dir)) return true;
  } else if (dir === 3) {
    if (hasPathToEdge(x, y + 1, heightValue, dir)) return true;
  }
  return false;
};

let numberOfTreesVisible = 0;
for (let i = 0; i < heightMap.length * heightMap.length; i++) {
  const x = i % heightMap.length;
  const y = Math.floor(i / heightMap.length);
  if (isOnEdge(x, y)) {
    numberOfTreesVisible++;
    continue;
  }

  const heightValue = heightMap[x][y];
  if (hasPathToEdge(x - 1, y, heightValue, 0)) numberOfTreesVisible++;
  else if (hasPathToEdge(x + 1, y, heightValue, 1)) numberOfTreesVisible++;
  else if (hasPathToEdge(x, y - 1, heightValue, 2)) numberOfTreesVisible++;
  else if (hasPathToEdge(x, y + 1, heightValue, 3)) numberOfTreesVisible++;
}

console.log(numberOfTreesVisible);
