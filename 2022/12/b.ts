const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");

const lines = input.split("\n");

type Node = {
  id: string;
  col: number;
  row: number;
  value: number;
  start: boolean;
  end: boolean;
};

const parsedAsColumns = lines.reduce((acc: any, line) => {
  const cols = line.split("");
  for (let i = 0; i < cols.length; i++) {
    if (!acc[i]) {
      acc[i] = [];
    }
    acc[i].push(cols[i]);
  }
  return acc;
}, []);

// Map columns and rows into nodes
const nodes = parsedAsColumns.reduce((acc: any, col: any, colIndex: any) => {
  col.forEach((row: any, rowIndex: any) => {
    const val = row === "E" ? 26 : row === "S" ? 1 : row.charCodeAt(0) - 96;
    acc.push({
      id: `${colIndex}-${rowIndex}`,
      col: colIndex,
      row: rowIndex,
      value: val,
      start: row === "S" || row === "a",
      end: row === "E",
    });
  });
  return acc;
}, []);

// Map nodes into adjacency list
const adjacencyList = new Map<string, Node[]>();
nodes.forEach((node: Node) => {
  const { col, row } = node;
  const adjacentNodes = [
    nodes.find((n: Node) => n.col === col - 1 && n.row === row),
    nodes.find((n: Node) => n.col === col + 1 && n.row === row),
    nodes.find((n: Node) => n.col === col && n.row === row - 1),
    nodes.find((n: Node) => n.col === col && n.row === row + 1),
  ].filter((n) => n);
  adjacencyList.set(node.id, adjacentNodes);
});

const steps = (start: Node, end: Node): number => {
  const queue: [Node, number][] = [[start, 0]];
  const visited = new Set<string>();
  while (queue.length > 0) {
    const [current, stepCount] = queue.shift()!;
    if (visited.has(current.id)) continue;
    visited.add(current.id);
    if (current.id === end.id) return stepCount;

    const neighbors = adjacencyList.get(current.id) ?? [];
    for (const neighbor of neighbors) {
      if (neighbor.value <= current.value + 1) {
        queue.push([neighbor, stepCount + 1]);
      }
    }
  }
  return 999999;
};

const end = nodes.find((n: Node) => n.end);
const lowest = Math.min(...nodes.filter((n: Node) => n.start).map((n: Node) => steps(n, end)));
console.log(lowest);
