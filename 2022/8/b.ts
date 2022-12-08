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

const hasPathToEdge = (x: number, y: number, heightValue: number, dir: number, acc: number): number => {
  const treeValue = heightMap[x][y];
  if (treeValue >= heightValue) return acc;
  if (isOnEdge(x, y)) return acc;
  if (dir === 0) {
    return hasPathToEdge(x - 1, y, heightValue, dir, acc + 1);
  } else if (dir === 1) {
    return hasPathToEdge(x + 1, y, heightValue, dir, acc + 1);
  } else if (dir === 2) {
    return hasPathToEdge(x, y - 1, heightValue, dir, acc + 1);
  } else if (dir === 3) {
    return hasPathToEdge(x, y + 1, heightValue, dir, acc + 1);
  }
  return 0;
};

let maxScenicScore = 0;
for (let i = 0; i < heightMap.length * heightMap.length; i++) {
  const x = i % heightMap.length;
  const y = Math.floor(i / heightMap.length);
  if (isOnEdge(x, y)) {
    continue;
  }

  const heightValue = heightMap[x][y];
  const score1 = hasPathToEdge(x - 1, y, heightValue, 0, 1);
  const score2 = hasPathToEdge(x + 1, y, heightValue, 1, 1);
  const score3 = hasPathToEdge(x, y - 1, heightValue, 2, 1);
  const score4 = hasPathToEdge(x, y + 1, heightValue, 3, 1);
  maxScenicScore = Math.max(maxScenicScore, score1 * score2 * score3 * score4);
}

console.log(maxScenicScore);
