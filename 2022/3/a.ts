const input = Deno.readTextFileSync("input-a.txt");
const lines = input.split("\n");

const items = lines.map((line) => line.trim().split(""));

const split = items.reduce<any>((acc, val, index) => {
  if (!acc[index]) {
    acc[index] = [];
  }
  acc[index][0] = val.slice(0, val.length / 2);
  acc[index][1] = val.slice(val.length / 2);
  return acc;
}, []);

const getPriority = (item: string) => {
  return item.charCodeAt(0) > 97 ? item.charCodeAt(0) - 96 : item.charCodeAt(0) - 38;
};

const sum = split.reduce((acc: number, val: string) => {
  const [left, right] = val;
  const matching: string[] = [];
  for (const value of left) {
    if (right.includes(value) && !matching.includes(value)) {
        matching.push(value);
    }
  }
  return acc + matching.reduce((acc, val) => acc + getPriority(val), 0);
}, 0);

console.log(sum);
