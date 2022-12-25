const test = Deno.readTextFileSync("test-a.txt");
const input = Deno.readTextFileSync("input-a.txt");

const snafuToDecimal = (snafu: string) => {
  const binary = snafu.split("");
  let decimal = 0;
  for (let i = 0; i < binary.length; i++) {
    const bit = binary[i];
    const multiplier = 5 ** (binary.length - 1 - i);
    if (bit === "-") {
      decimal += multiplier * -1;
    } else if (bit === "=") {
      decimal += multiplier * -2;
    } else if (bit === "1") {
      decimal += multiplier;
    } else if (bit === "2") {
      decimal += multiplier * 2;
    }
  }
  return decimal;
};

const decimalToSNAFU = (decimal: number) => {
  let snafu = "";

  while (decimal > 0) {
    const remainder = decimal % 5;

    if (remainder === 0) {
      snafu = "0" + snafu;
    }
    if (remainder === 1) {
      snafu = "1" + snafu;
    }
    if (remainder === 2) {
      snafu = "2" + snafu;
    }

    if (remainder === 3) {
      snafu = "=" + snafu;
      decimal += 2;
    }
    if (remainder === 4) {
      snafu = "-" + snafu;
      decimal += 1;
    }

    decimal = Math.floor(decimal / 5);
  }

  return snafu;
};

const solve = (input: string) => {
  const lines = input.split("\n");

  let sum = 0;
  for (const line of lines) {
    const decimal = snafuToDecimal(line);
    sum += decimal;
  }

  console.log("sum", sum);
  return decimalToSNAFU(sum);
};

const testResult = solve(test);
console.log("test", testResult);

const result = solve(input);
console.log("result", result);
