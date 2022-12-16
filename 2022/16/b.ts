const input_valves = {
  WT: { flow: 0, tunnels: ["BD", "FQ"] }, //Valve WT has flow rate=0; tunnels lead to valves BD, FQ
  UG: { flow: 0, tunnels: ["FQ", "YB"] }, //Valve UG has flow rate=0; tunnels lead to valves FQ, YB
  FN: { flow: 0, tunnels: ["TV", "GA"] }, //Valve FN has flow rate=0; tunnels lead to valves TV, GA
  RU: { flow: 11, tunnels: ["YZ", "QS", "BL", "BT", "WJ"] }, //Valve RU has flow rate=11; tunnels lead to valves YZ, QS, BL, BT, WJ
  RH: { flow: 0, tunnels: ["AS", "II"] }, //Valve RH has flow rate=0; tunnels lead to valves AS, II
  FL: { flow: 0, tunnels: ["HR", "PQ"] }, //Valve FL has flow rate=0; tunnels lead to valves HR, PQ
  KQ: { flow: 18, tunnels: ["FR", "BN"] }, //Valve KQ has flow rate=18; tunnels lead to valves FR, BN
  PM: { flow: 25, tunnels: ["YZ", "FR"] }, //Valve PM has flow rate=25; tunnels lead to valves YZ, FR
  RQ: { flow: 0, tunnels: ["FQ", "MW"] }, //Valve RQ has flow rate=0; tunnels lead to valves FQ, MW
  BL: { flow: 0, tunnels: ["RU", "IR"] }, //Valve BL has flow rate=0; tunnels lead to valves RU, IR
  FF: { flow: 0, tunnels: ["QS", "ED"] }, //Valve FF has flow rate=0; tunnels lead to valves QS, ED
  KP: { flow: 0, tunnels: ["QM", "MA"] }, //Valve KP has flow rate=0; tunnels lead to valves QM, MA
  YB: { flow: 0, tunnels: ["UG", "HR"] }, //Valve YB has flow rate=0; tunnels lead to valves UG, HR
  TV: { flow: 17, tunnels: ["BD", "MT", "FN"] }, //Valve TV has flow rate=17; tunnels lead to valves BD, MT, FN
  HY: { flow: 0, tunnels: ["DW", "IU"] }, //Valve HY has flow rate=0; tunnels lead to valves DW, IU
  KF: { flow: 0, tunnels: ["AA", "HR"] }, //Valve KF has flow rate=0; tunnels lead to valves AA, HR
  YC: { flow: 0, tunnels: ["II", "MA"] }, //Valve YC has flow rate=0; tunnels lead to valves II, MA
  EE: { flow: 0, tunnels: ["AA", "CD"] }, //Valve EE has flow rate=0; tunnels lead to valves AA, CD
  ED: { flow: 9, tunnels: ["HG", "FF"] }, //Valve ED has flow rate=9; tunnels lead to valves HG, FF
  SA: { flow: 0, tunnels: ["MW", "LS"] }, //Valve SA has flow rate=0; tunnels lead to valves MW, LS
  II: { flow: 20, tunnels: ["YC", "CY", "QP", "RH"] }, //Valve II has flow rate=20; tunnels lead to valves YC, CY, QP, RH
  BN: { flow: 0, tunnels: ["BT", "KQ"] }, //Valve BN has flow rate=0; tunnels lead to valves BT, KQ
  MO: { flow: 0, tunnels: ["XO", "VI"] }, //Valve MO has flow rate=0; tunnels lead to valves XO, VI
  YZ: { flow: 0, tunnels: ["RU", "PM"] }, //Valve YZ has flow rate=0; tunnels lead to valves RU, PM
  WJ: { flow: 0, tunnels: ["RU", "QP"] }, //Valve WJ has flow rate=0; tunnels lead to valves RU, QP
  AW: { flow: 0, tunnels: ["HR", "DW"] }, //Valve AW has flow rate=0; tunnels lead to valves HR, DW
  MJ: { flow: 0, tunnels: ["BP", "AA"] }, //Valve MJ has flow rate=0; tunnels lead to valves BP, AA
  DW: { flow: 4, tunnels: ["AU", "CB", "HY", "GL", "AW"] }, //Valve DW has flow rate=4; tunnels lead to valves AU, CB, HY, GL, AW
  QM: { flow: 0, tunnels: ["KP", "FQ"] }, //Valve QM has flow rate=0; tunnels lead to valves KP, FQ
  LF: { flow: 5, tunnels: ["LS", "QN", "AU", "BP", "ZY"] }, //Valve LF has flow rate=5; tunnels lead to valves LS, QN, AU, BP, ZY
  QS: { flow: 0, tunnels: ["FF", "RU"] }, //Valve QS has flow rate=0; tunnels lead to valves FF, RU
  BT: { flow: 0, tunnels: ["BN", "RU"] }, //Valve BT has flow rate=0; tunnels lead to valves BN, RU
  VI: { flow: 22, tunnels: ["MO"] }, //Valve VI has flow rate=22; tunnel leads to valve MO
  LS: { flow: 0, tunnels: ["LF", "SA"] }, //Valve LS has flow rate=0; tunnels lead to valves LF, SA
  QD: { flow: 0, tunnels: ["HR", "ZY"] }, //Valve QD has flow rate=0; tunnels lead to valves HR, ZY
  HG: { flow: 0, tunnels: ["AS", "ED"] }, //Valve HG has flow rate=0; tunnels lead to valves AS, ED
  BD: { flow: 0, tunnels: ["WT", "TV"] }, //Valve BD has flow rate=0; tunnels lead to valves WT, TV
  CD: { flow: 0, tunnels: ["EE", "MW"] }, //Valve CD has flow rate=0; tunnels lead to valves EE, MW
  QP: { flow: 0, tunnels: ["II", "WJ"] }, //Valve QP has flow rate=0; tunnels lead to valves II, WJ
  MW: { flow: 7, tunnels: ["PQ", "SA", "CB", "CD", "RQ"] }, //Valve MW has flow rate=7; tunnels lead to valves PQ, SA, CB, CD, RQ
  AU: { flow: 0, tunnels: ["DW", "LF"] }, //Valve AU has flow rate=0; tunnels lead to valves DW, LF
  RR: { flow: 0, tunnels: ["AS", "MA"] }, //Valve RR has flow rate=0; tunnels lead to valves AS, MA
  GA: { flow: 0, tunnels: ["FN", "MA"] }, //Valve GA has flow rate=0; tunnels lead to valves FN, MA
  MT: { flow: 0, tunnels: ["CY", "TV"] }, //Valve MT has flow rate=0; tunnels lead to valves CY, TV
  HR: { flow: 14, tunnels: ["KF", "YB", "QD", "AW", "FL"] }, //Valve HR has flow rate=14; tunnels lead to valves KF, YB, QD, AW, FL
  AS: { flow: 16, tunnels: ["RR", "RH", "HG", "IR"] }, //Valve AS has flow rate=16; tunnels lead to valves RR, RH, HG, IR
  CY: { flow: 0, tunnels: ["MT", "II"] }, //Valve CY has flow rate=0; tunnels lead to valves MT, II
  AA: { flow: 0, tunnels: ["OX", "KF", "GL", "MJ", "EE"] }, //Valve AA has flow rate=0; tunnels lead to valves OX, KF, GL, MJ, EE
  IU: { flow: 0, tunnels: ["XO", "HY"] }, //Valve IU has flow rate=0; tunnels lead to valves XO, HY
  XO: { flow: 23, tunnels: ["IU", "MO"] }, //Valve XO has flow rate=23; tunnels lead to valves IU, MO
  FR: { flow: 0, tunnels: ["KQ", "PM"] }, //Valve FR has flow rate=0; tunnels lead to valves KQ, PM
  CB: { flow: 0, tunnels: ["MW", "DW"] }, //Valve CB has flow rate=0; tunnels lead to valves MW, DW
  ZY: { flow: 0, tunnels: ["QD", "LF"] }, //Valve ZY has flow rate=0; tunnels lead to valves QD, LF
  BP: { flow: 0, tunnels: ["LF", "MJ"] }, //Valve BP has flow rate=0; tunnels lead to valves LF, MJ
  QN: { flow: 0, tunnels: ["LF", "FQ"] }, //Valve QN has flow rate=0; tunnels lead to valves LF, FQ
  IR: { flow: 0, tunnels: ["AS", "BL"] }, //Valve IR has flow rate=0; tunnels lead to valves AS, BL
  PQ: { flow: 0, tunnels: ["FL", "MW"] }, //Valve PQ has flow rate=0; tunnels lead to valves FL, MW
  GL: { flow: 0, tunnels: ["AA", "DW"] }, //Valve GL has flow rate=0; tunnels lead to valves AA, DW
  OX: { flow: 0, tunnels: ["MA", "AA"] }, //Valve OX has flow rate=0; tunnels lead to valves MA, AA
  MA: { flow: 10, tunnels: ["RR", "YC", "GA", "OX", "KP"] }, //Valve MA has flow rate=10; tunnels lead to valves RR, YC, GA, OX, KP
  FQ: { flow: 12, tunnels: ["QN", "WT", "UG", "RQ", "QM"] }, //Valve FQ has flow rate=12; tunnels lead to valves QN, WT, UG, RQ, QM
};

const test_valves = {
  AA: { flow: 0, tunnels: ["DD", "II", "BB"] },
  BB: { flow: 13, tunnels: ["CC", "AA"] },
  CC: { flow: 2, tunnels: ["DD", "BB"] },
  DD: { flow: 20, tunnels: ["CC", "AA", "EE"] },
  EE: { flow: 3, tunnels: ["FF", "DD"] },
  FF: { flow: 0, tunnels: ["EE", "GG"] },
  GG: { flow: 0, tunnels: ["FF", "HH"] },
  HH: { flow: 22, tunnels: ["GG"] },
  II: { flow: 0, tunnels: ["AA", "JJ"] },
  JJ: { flow: 21, tunnels: ["II"] },
};

class PriorityQueue<T> {
  private items: T[];

  constructor(private comparator: (a: T, b: T) => boolean) {
    this.items = [];
  }

  enqueue(item: T) {
    this.items.push(item);
    this.bubbleUp();
  }

  dequeue() {
    const item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  private bubbleUp() {
    let index = this.items.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.items[index], this.items[parentIndex])) {
        [this.items[index], this.items[parentIndex]] = [
          this.items[parentIndex],
          this.items[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown() {
    let index = 0;
    while (index < this.items.length) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let minIndex = index;
      if (
        leftChildIndex < this.items.length &&
        this.comparator(this.items[leftChildIndex], this.items[minIndex])
      ) {
        minIndex = leftChildIndex;
      }
      if (
        rightChildIndex < this.items.length &&
        this.comparator(this.items[rightChildIndex], this.items[minIndex])
      ) {
        minIndex = rightChildIndex;
      }
      if (minIndex !== index) {
        [this.items[index], this.items[minIndex]] = [
          this.items[minIndex],
          this.items[index],
        ];
        index = minIndex;
      } else {
        break;
      }
    }
  }
}

type Node = {
  id: string;
  value: number;
  costs?: {
    [key: string]: number;
  };
};

const adjacencyList = new Map<string, Node[]>();
const nodes: Node[] = [];
for (const [id, { flow, tunnels }] of Object.entries(input_valves)) {
  const node: Node = { id, value: flow };
  nodes.push(node);
  adjacencyList.set(
    id,
    tunnels.map((tunnel) => ({ id: tunnel, value: 0 }))
  );
}

const bfs = (start: Node, end: Node): number => {
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
  return -1;
};

const keys = Object.entries(input_valves)
  .filter(([key, value]) => value.flow)
  .map(([key, value]) => key);

keys.push("AA");

for (const key of keys) {
  for (const key2 of keys) {
    if (key === key2) continue;
    const startNode = nodes.find((n: Node) => n.id === key)!;
    const endNode = nodes.find((n: Node) => n.id === key2)!;
    startNode.costs ??= {};
    startNode.costs[key2] = bfs(startNode, endNode);
  }
}

const starting = nodes.find((n: Node) => n.id === "AA")!;
let result = 0;
const playerCache = new Map<string, number>();
const elephantCache = new Map<string, number>();

const pq = new PriorityQueue<[number, Node, number, Set<string>, boolean]>(
  (a, b) => b[0] < a[0]
);
pq.enqueue([0, starting, 1, new Set(["AA"]), false]);

while (!pq.isEmpty()) {
  const [curValue, node, minute, opened, isElephant] = pq.dequeue()!;

  if (minute > 26) continue;
  if (result < curValue) {
    result = curValue;
    continue;
  }

  if (isElephant) {
    const cacheKey = `${[...opened].sort().join("")}:${minute}:${node.id}`;
    if (
      !elephantCache.has(cacheKey) ||
      elephantCache.get(cacheKey)! < curValue
    ) {
      elephantCache.set(cacheKey, curValue);
    }

    if (elephantCache.get(cacheKey)! > curValue) {
      continue;
    }
  } else {
    const cacheKey = `${[...opened].join("")}:${minute}:${node.id}`;
    if (!playerCache.has(cacheKey) || playerCache.get(cacheKey)! < curValue) {
      playerCache.set(cacheKey, curValue);
    }

    if (playerCache.get(cacheKey)! > curValue) {
      continue;
    }
  }

  if (opened.has(node.id)) {
    for (const [key, value] of Object.entries(node.costs ?? {})) {
      if (opened.has(key)) continue;
      pq.enqueue([
        curValue,
        nodes.find((n: Node) => n.id === key)!,
        minute + value,
        opened,
        isElephant,
      ]);
    }
    continue;
  }
  if (!isElephant)
    pq.enqueue([
      curValue + (26 - minute) * node.value,
      starting,
      1,
      new Set([...opened, node.id]),
      true,
    ]);
  pq.enqueue([
    curValue + (26 - minute) * node.value,
    node,
    minute + 1,
    new Set([...opened, node.id]),
    isElephant,
  ]);
}

console.log(result);
