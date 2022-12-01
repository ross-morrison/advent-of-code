const input = Deno.readTextFileSync("2022/1/input-a.txt");

const totals = input.split("\n\n").map((elf) => {
    return elf.split("\n").reduce((acc, val) => acc + parseInt(val), 0);
}).sort((a: number, b: number) => b - a);

const answer = totals[0];
console.log(answer);

Deno.exit(0);
