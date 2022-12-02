const input = Deno.readTextFileSync("input-a.txt");
const lines = input.split("\n");
const grouped = input.split("\n\n");

type NodeData = {
  id: string;
  cost?: number;
};

const adjacencyList = new Map<string, NodeData[]>();
const dfs = (
  start: NodeData,
  target: NodeData,
  visited = new Set<NodeData>(),
  cost = 0
) => {
  visited.add(start);

  const destinations = adjacencyList.get(start.id);

  for (const destination of destinations ?? []) {
    if (destination.id === target.id) {
      console.log(`TARGET FOUND: ${destination}, cost: ${cost}`);
      return;
    }

    if (!visited.has(destination)) {
      if (destination.cost) {
        cost += destination.cost;
      }
      dfs(destination, target, visited, cost);
    }
  }
};

function addNode(pKey: NodeData) {
  adjacencyList.set(pKey.id, []);
}

function addEdge(
  origin: NodeData,
  destination: NodeData,
  cost?: number,
  isDirected = false
) {
  adjacencyList.get(origin.id)?.push({ cost, ...destination });
  if (isDirected) return;
  adjacencyList.get(destination.id)?.push({ cost, ...origin });
}

const linesParsed = lines
  .map((line) => parseInt(line))
  .filter((l) => !isNaN(l));
const linesSummed = lines.reduce((acc, val) => acc + parseInt(val), 0);
const indexOfHighest = linesParsed.findIndex(
  (line) => line === Math.max(...linesParsed)
);

const parsedAsObjects = grouped.map((group) => {
  const [name, ...values] = group.split("\n");
  return { name, values };
});
const indexOfHighestObject = parsedAsObjects.findIndex(
  (obj) =>
    +obj.values[0] === Math.max(...parsedAsObjects.map((obj) => +obj.values[0]))
);

const parsedAsCommands = lines.map((line) => {
  const [command, value] = line.split(" ");
  return { command, value: parseInt(value) };
});

const parsedAsColumnsBySpace = lines.reduce(
  (acc: any, line) => {
    const [col1, col2, col3] = line.split(" ");
    acc[0].push(col1);
    acc[1].push(col2);
    acc[2].push(col3);
    return acc;
  },
  [[], [], []]
);

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

console.log(linesSummed);
console.log(indexOfHighest);
console.log(parsedAsObjects);
console.log(indexOfHighestObject);
console.log(parsedAsCommands);
console.log(parsedAsColumnsBySpace);
console.log(parsedAsColumns);
