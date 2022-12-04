const input = Deno.readTextFileSync("input-a.txt");
const lines = input.split("\n");

const assignments = [];

for (const line of lines) {
  const [left, right] = line.split(",");
  assignments.push({ left, right });
}

let overlaps = 0;

for (const assignment of assignments) {
  const [leftStart, leftEnd] = assignment.left.split("-").map(Number);
  const [rightStart, rightEnd] = assignment.right.split("-").map(Number);

  const overlap = (leftStart >= rightStart && leftEnd <= rightEnd) || (rightStart >= leftStart && rightEnd <= leftEnd);

  if (overlap) overlaps++;
}

console.log(overlaps);
