const input = Deno.readTextFileSync("input-a.txt");

const test = [
  {
    id: "blueprint-1",
    ore: {
      ore: 4,
    },
    clay: {
      ore: 2,
    },
    obsidian: {
      ore: 3,
      clay: 14,
    },
    geode: {
      ore: 2,
      obsidian: 7,
    },
  },
  {
    id: "blueprint-2",
    ore: {
      ore: 2,
    },
    clay: {
      ore: 3,
    },
    obsidian: {
      ore: 3,
      clay: 8,
    },
    geode: {
      ore: 3,
      obsidian: 12,
    },
  },
];

type OreInput = typeof test;

const MINUTES = 32;
const getCountOfGeodes = (blueprint: typeof test[0], index: number): number => {
  let maximumGeodeCount = 0;
  let queue: any[] = [];

  const getScore = (resources: number[]) => {
    return (
      10000 * resources[3] +
      1009 * resources[2] +
      190 * resources[1] +
      10 * resources[0]
    );
  };

  const maxOreSpent = Math.max(
    blueprint.ore.ore,
    blueprint.clay.ore,
    blueprint.obsidian.ore,
    blueprint.geode.ore
  );
  const maxClaySpent = blueprint.obsidian.clay;
  const maxObsidianSpent = blueprint.geode.obsidian;

  queue.push([[0, 0, 0, 0], [1, 0, 0, 0], 0, [0, 0, 0, 0]]);

  let depth = 1;
  while (queue.length > 0) {
    const [resourceCounts, robotCount, minute, total] = queue.shift() as [
      number[],
      number[],
      number,
      number[]
    ];

    if (minute > MINUTES) {
      continue;
    }

    if (total[3] > maximumGeodeCount) {
      maximumGeodeCount = total[3];
    }

    if (minute > depth) {
      depth = minute;
      queue.sort((a, b) => {
        return getScore(b[3]) - getScore(a[3]);
      });
      queue = queue.slice(0, 500);
    }

    const buildList = [];
    // Figure out what we can build
    if (
      blueprint.geode.ore <= resourceCounts[0] &&
      blueprint.geode.obsidian <= resourceCounts[2]
    ) {
      buildList.push(3);
    }
    if (
      blueprint.obsidian.ore <= resourceCounts[0] &&
      blueprint.obsidian.clay <= resourceCounts[1] &&
      robotCount[2] < maxObsidianSpent
    ) {
      buildList.push(2);
    }
    if (
      blueprint.clay.ore <= resourceCounts[0] &&
      robotCount[1] < maxClaySpent
    ) {
      buildList.push(1);
    }
    if (blueprint.ore.ore <= resourceCounts[0] && robotCount[0] < maxOreSpent) {
      buildList.push(0);
    }

    // Increase the resource counts
    for (let i = 0; i < 4; i++) {
      resourceCounts[i] += robotCount[i];
      total[i] += robotCount[i];
    }

    const buildToString = {
      0: "ore",
      1: "clay",
      2: "obsidian",
      3: "geode",
    } as const;
    for (const build of buildList) {
      // Build each robot and enqueue
      const newResourceCounts = [...resourceCounts];
      const newRobotCounts = [...robotCount];
      // @ts-ignore
      const bpRobot = blueprint[buildToString[build]];
      newResourceCounts[0] -= bpRobot.ore ?? 0;
      newResourceCounts[1] -= bpRobot.clay ?? 0;
      newResourceCounts[2] -= bpRobot.obsidian ?? 0;

      newRobotCounts[build] += 1;

      queue.push([newResourceCounts, newRobotCounts, minute + 1, [...total]]);
    }

    // Ignore building robot for this loop
    queue.push([resourceCounts, robotCount, minute + 1, total]);
  }
  console.log(`Blueprint ${index} can hold ${maximumGeodeCount} geodes`);
  return maximumGeodeCount;
};

const solve = (input: OreInput) => {
  let sum = 1;
  for (const blueprint of input) {
    const index = input.indexOf(blueprint);
    if (index >= 3) break;
    const geodes = getCountOfGeodes(blueprint, index);
    sum *= geodes;
  }
  return sum;
};

const testResult = solve(test);
console.log("test", testResult);

const parseInput = (input: string) => {
  const lines = input.split("\n");
  const blueprints = [];
  for (const line of lines) {
    const [id, eachOre, eachClay, eachObisidan, eachGeode] = line.split("Each");
    const ore = parseInt(eachOre.split(" ")[4]);
    const clay = parseInt(eachClay.split(" ")[4]);
    const obsidian = parseInt(eachObisidan.split(" ")[4]);
    const obsidianClay = parseInt(eachObisidan.split(" ")[7]);
    const geode = parseInt(eachGeode.split(" ")[4]);
    const geodeObsidian = parseInt(eachGeode.split(" ")[7]);

    blueprints.push({
      id,
      ore: {
        ore,
      },
      clay: {
        ore: clay,
      },
      obsidian: {
        ore: obsidian,
        clay: obsidianClay,
      },
      geode: {
        ore: geode,
        obsidian: geodeObsidian,
      },
    });
  }

  return blueprints;
};

const start = performance.now();
const result = solve(parseInput(input));
const end = performance.now();
console.log("time", end - start);
console.log("result", result);
