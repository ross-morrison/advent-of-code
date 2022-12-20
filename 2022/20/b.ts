const test = Deno.readTextFileSync("test-a.txt");
const input = Deno.readTextFileSync("input-a.txt");

const solve = (input: string) => {
  const lines = input.split("\n");
  const array = lines.map((line) => ({ id: line, value: parseInt(line) * 811589153}));

  const entries = [...array];

  for (let i = 0; i < 10; i++) {
    for (const entry of entries) {
      // Move the number + or minus its value in the array
      const index = array.indexOf(entry);
      let newIndex = (index + entry.value) % (array.length - 1);

      if (newIndex === 0) {
        newIndex = array.length;
      }

      // Remove the entry from the array
      array.splice(index, 1);
      // Insert the entry at the new index
      array.splice(newIndex, 0, entry);
    }
  }

  let sum = 0;
  const indexOfZero = array.findIndex((entry) => entry.id === "0");
  for (const index of [1000, 2000, 3000]) {
    const entry = array[(index + indexOfZero) % array.length];
    sum += entry.value;
  }
  return sum;
};

const testResult = solve(test);
console.log("test", testResult);

const result = solve(input);
console.log("result", result);
