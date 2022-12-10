const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");
const lines = input.split("\n");

let cyclesToSum = [20, 60, 100, 140, 180, 220];

let x = 1;
let cycle = 0;
let sum = 0;
let count = 0;
while (count < 1000) {
  const line = lines[count % lines.length];
  const [op, value] = line.split(" ");
  const addx = parseInt(value);
  count++;

  if (cyclesToSum.includes(++cycle)) {
    sum += x * cycle;
  }

  if (op === "noop") {
    continue;
  }

  if (op === "addx") {
    const prevX = x;
    x += addx;
    if (cyclesToSum.includes(++cycle)) {
      sum += prevX * cycle;
    }
  }
}

console.log(sum);
