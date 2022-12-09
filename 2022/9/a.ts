const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");
const lines = input.split("\n");

let hX = 0;
let hY = 0;
let tX = 0;
let tY = 0;

const positionsVisited = new Set();

for (const line of lines) {
  const [direction, amount] = line.split(" ");
  const distance = parseInt(amount);

  for (let i = 0; i < distance; i++) {
    switch (direction) {
      case "U":
        hY += 1;
        break;
      case "D":
        hY -= 1;
        break;
      case "R":
        hX += 1;
        break;
      case "L":
        hX -= 1;
        break;
    }

    const xDist = Math.abs(hX - tX);
    const yDist = Math.abs(hY - tY);
    // Move the tail (tx, ty) must be within 1 unit of the head
    if (xDist > 1 || yDist > 1) {
      if (xDist !== 0) {
        tX += (hX - tX) / xDist;
      }
      if (yDist !== 0) {
        tY += (hY - tY) / yDist;
      }
    }
    const position = `${tX},${tY}`;
    positionsVisited.add(position);
  }
}

console.log(positionsVisited.size);
