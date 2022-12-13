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

const div1 = [[2]];
const div2 = [[6]];
const packets = [div1, div2];
for (const line of input.split("\n")) {
  if (line === "") {
    continue;
  }

  const parsed = JSON.parse(line);
  packets.push(parsed);
}

packets.sort((a, b) => (compare(a, b) ? -1 : 1));

console.log((packets.indexOf(div1) + 1) * (packets.indexOf(div2) + 1));
