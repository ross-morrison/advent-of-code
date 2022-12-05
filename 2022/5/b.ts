const input = Deno.readTextFileSync("input-a.txt");
const lines = input.split("\n");

const moveStart = lines.findIndex((line) => line.startsWith("move"));

const boxes = lines.slice(0, moveStart - 2).map((line) => line.trim());

const parsedAsColumns = boxes.reduce((acc: any, line) => {
  const cols = line.split(" ");
  for (let i = 0; i < cols.length; i++) {
    if (!acc[i]) {
      acc[i] = [];
    }
    acc[i].push(cols[i]);
  }
  return acc;
}, []);

const containers = parsedAsColumns.map((col: any) => col.filter((c: any) => c !== "[!]"));

const moves = lines.slice(moveStart).map((line) => line.trim());

for (const move of moves) {
  const [_, amount, from, source, to, destination] = move.split(" ");
  const fromBox: any[] = containers[+source - 1];
  const toBox: any[] = containers[+destination - 1];

  let itemsToMove = fromBox.splice(0, +amount);
  toBox.unshift(...itemsToMove);
}

const topOfEachContainer = containers.map((container: any) => container[0]);
console.log(topOfEachContainer);
