const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");

class Monkey {
  startingItems: number[];
  operation: {
    multiply: number;
    add: number;
    square: number;
  };
  test: number;
  testPass: number;
  testFail: number;
  inspected: number;

  constructor(
    startingItems: number[],
    operation: { [key: string]: number },
    test: number,
    testPass: number,
    testFail: number
  ) {
    this.startingItems = startingItems;
    this.operation = operation as typeof this.operation;
    this.test = test;
    this.testPass = testPass;
    this.testFail = testFail;
    this.inspected = 0;
  }

  runOperation(itemIndex: number) {
    let item = this.startingItems[itemIndex];
    if (this.operation.square) {
      item *= item;
    }
    if (this.operation.multiply) {
      item *= this.operation.multiply;
    }
    if (this.operation.add) {
      item += this.operation.add;
    }
    this.startingItems[itemIndex] = Math.floor(item / 3);
  }

  runTest(item: number) {
    this.inspected++;
    return [item, item % this.test === 0 ? this.testPass : this.testFail];
  }
}

const monkeys: Monkey[] = [];
const split = input.split("\n\n");
for (const group of split) {
  const [name, ...values] = group.split("\n");
  const [startingItems, operation, test, testPass, testFail] = values;

  const startingItemsParsed = startingItems
    .trim()
    .split(":")[1]
    .trim()
    .split(",")
    .map((item) => +item);

  const operationParsed = operation.split("=")[1].trim();
  const operations: any = {};
  if (operationParsed.startsWith("old * old")) {
    operations.square = 1;
  } else if (operationParsed.startsWith("old * ")) {
    operations.multiply = +operationParsed.split(" * ")[1];
  } else if (operationParsed.includes(" + ")) {
    operations.add = +operationParsed.split(" + ")[1];
  }

  const testParsed = +test.split("by ")[1];
  const testPassParsed = +testPass.split("to monkey ")[1];
  const testFailParsed = +testFail.split("to monkey ")[1];

  monkeys.push(
    new Monkey(
      startingItemsParsed,
      operations,
      testParsed,
      testPassParsed,
      testFailParsed
    )
  );
}

const numRounds = 20;
for (let i = 0; i < numRounds; i++) {
  for (const monkey of monkeys) {
    for (let j = 0; j < monkey.startingItems.length; j++) {
      monkey.runOperation(j);
    }
    for (const item of monkey.startingItems) {
      const [item2, result] = monkey.runTest(item);
      monkeys[result].startingItems.push(item2);
      monkey.startingItems = monkey.startingItems.filter((i) => i !== item2);
    }
  }
}

console.log(monkeys.map((m) => m.inspected));

const twoMostInspected = monkeys
  .sort((a, b) => b.inspected - a.inspected)
  .slice(0, 2);

const monkeyBusiness = twoMostInspected.reduce((acc, cur) => {
  return acc * cur.inspected;
}, 1);
console.log(monkeyBusiness);
