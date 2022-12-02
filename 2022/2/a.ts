const input = Deno.readTextFileSync("input-a.txt");
const lines = input.split("\n");

const parsedAsColumns = lines.reduce((acc: any, line) => {
  const cols = line.split(" ");
  for (let i = 0; i < cols.length; i++) {
    if (!acc[i]) {
      acc[i] = [];
    }
    acc[i].push(cols[i]);
  }
  return acc;
}, []);

const values: any = { rock: 1, paper: 2, scissors: 3 };

const playerInput: any = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

let score = 0;
for (let i = 0; i < lines.length; i++) {
  const player1 = parsedAsColumns[0][i];
  const player2 = parsedAsColumns[1][i];

  const parsed1 = playerInput[player1];
  const parsed2 = playerInput[player2];

  if (parsed1 === parsed2) {
    score += 3;
  }

  if (parsed1 === "rock" && parsed2 === "paper") {
    score += 6;
  }

  if (parsed1 === "paper" && parsed2 === "scissors") {
    score += 6;
  }

  if (parsed1 === "scissors" && parsed2 === "rock") {
    score += 6;
  }

  score += values[parsed2];
}

console.log(score);
