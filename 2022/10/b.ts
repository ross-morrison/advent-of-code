const input = Deno.readTextFileSync("input-a.txt");
const test = Deno.readTextFileSync("test-a.txt");
const lines = input.split("\n");

let row = "";
let x = 1;
let cycle = 0;
const drawPixel = (useX: number) => {
  const curX = cycle % 40;
  row += useX === curX || useX === curX + 1 || useX === curX - 1 ? "#" : ".";
  if (curX === 39) {
    console.log(row);
    row = "";
  }
};
drawPixel(x);
for (const [op, value] of lines.map((l) => l.split(" "))) {
  cycle++;
  drawPixel(x);
  if (op === "addx") {
    cycle++;
    x += +value;
    drawPixel(x);
  }
}

