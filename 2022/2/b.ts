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

const playerInput: any = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "lose",
  Y: "draw",
  Z: "win",
};

let score = 0;
for (let i = 0; i < lines.length; i++) {
  const player1 = parsedAsColumns[0][i];
  const player2 = parsedAsColumns[1][i];

  const parsed1 = playerInput[player1];
  const parsed2 = playerInput[player2];

  if (parsed2 === "draw") {
    score += 3;
    if (parsed1 === "rock") {
      score += 1;
    }
    if (parsed1 === "paper") {
      score += 2;
    }
    if (parsed1 === "scissors") {
      score += 3;
    }
  }

  if (parsed2 === "win") {
    score += 6;
    if (parsed1 === "rock") {
      score += 2;
    }
    if (parsed1 === "paper") {
      score += 3;
    }
    if (parsed1 === "scissors") {
      score += 1;
    }
  }

  if (parsed2 === "lose") {
    score += 0;
    if (parsed1 === "scissors") {
      score += 2;
    }
    if (parsed1 === "rock") {
      score += 3;
    }
    if (parsed1 === "paper") {
      score += 1;
    }
  }
}

console.log(score);
