const input = Deno.readTextFileSync("input-a.txt");
const lines = input.split("\n");

const items = lines.map((line) => line.trim().split(""));

const getPriority = (item: string) => {
  return item.charCodeAt(0) > 97
    ? item.charCodeAt(0) - 96
    : item.charCodeAt(0) - 38;
};

const groupsOfThree = [];
for (let i = 0; i < items.length; i += 3) {
  groupsOfThree.push(items.slice(i, i + 3));
}

const sum = groupsOfThree.reduce<any>((acc, val) => {
  const [left, right, middle] = val;
  const matching: string[] = [];
  for (const value of left) {
    if (right.includes(value) && middle.includes(value) && !matching.includes(value)) {
      matching.push(value);
    }
  }
  return acc + matching.reduce((acc, val) => acc + getPriority(val), 0);
}, 0);

console.log(sum);
