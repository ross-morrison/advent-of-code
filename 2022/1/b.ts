const input = Deno.readTextFileSync("input-a.txt");

const totals = input.split("\n\n").map((elf) => {
    return elf.split("\n").reduce((acc, val) => acc + parseInt(val), 0);
}).sort((a: number, b: number) => b - a);

const answer = totals[0] + totals[1] + totals[2];
console.log(answer);
