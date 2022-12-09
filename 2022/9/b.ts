const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");
const lines = input.split("\n");

let hX = 0;
let hY = 0;
let tX = 0;
let tY = 0;

const positionsVisited = new Set();

// Tail objects are objects moving towards the head, with a maximum length of 10
const tailObjects: { x: number; y: number }[] = [];

for (let i = 0; i < 9; i++) {
  tailObjects.push({ x: tX, y: tY });
}

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
    tX = hX;
    tY = hY;
    for (let i = 0; i < tailObjects.length; i++) {
      const tail = tailObjects[i];
      const xDist = Math.abs(tX - tail.x);
      const yDist = Math.abs(tY - tail.y);
      // Move the tail (tx, ty) must be within 1 unit of the previous tail
      if (xDist > 1 || yDist > 1) {
        if (xDist !== 0) {
          tail.x += (tX - tail.x) / xDist;
        }
        if (yDist !== 0) {
          tail.y += (tY - tail.y) / yDist;
        }
      }
      tX = tail.x;
      tY = tail.y;
    }
    const lastTail = tailObjects[tailObjects.length - 1];
    const position = `${lastTail.x},${lastTail.y}`;
    positionsVisited.add(position);
  }
}

console.log(positionsVisited.size);
