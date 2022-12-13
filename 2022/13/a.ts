const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");

const compare = (a: number | any[], b: number | any[]): boolean | null => {
  if (typeof a === "number" && typeof b === "number") {
    return a === b ? null : a < b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const [a0, ...aRest] = a;
    const [b0, ...bRest] = b;
    if (a0 === undefined && b0 === undefined) {
      return null;
    }
    if (a0 === undefined) {
      return true;
    }
    if (b0 === undefined) {
      return false;
    }
    const result = compare(a0, b0);
    if (result === null) {
      return compare(aRest, bRest);
    }
    return result;
  }

  const aArray = typeof a === "number" ? [a] : a;
  const bArray = typeof b === "number" ? [b] : b;
  return compare(aArray, bArray);
};

const pairs: number[] = [];
const groups = input.split("\n\n");
for (const group of groups) {
  const [left, right] = group.split("\n");
  const leftAsArray = JSON.parse(left);
  const rightAsArray = JSON.parse(right);

  const matching = compare(leftAsArray, rightAsArray);
  if (matching) {
    pairs.push(groups.indexOf(group) + 1);
  }
}
const sum = pairs.reduce((a, b) => a + b, 0);
console.log(sum);
