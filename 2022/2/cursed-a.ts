const input = Deno.readTextFileSync("input-a.txt");
const lines = input.split("\n");

const score = lines.reduce(
  (acc, line) =>
    acc +
    line
      .split(" ")
      .map((c) => c.charCodeAt(0) - 65 + (c.charCodeAt(0) > 80 ? -23 : 0))
      .reduce(
        (acc, _, index, arr) =>
          acc + index === 0
            ? 0
            : arr[1] +
              (arr[1] === arr[0] ? 3 : arr[0] % 3 !== (arr[1] + 1) % 3 ? 6 : 0),
        0
      ),
  lines.length
);

console.log(score);
