const test = Deno.readTextFileSync("test-a.txt");
const input = Deno.readTextFileSync("input-a.txt");

const solve = (input: string) => {
  const lines = input.split("\n");
  const dependencyMap = new Map<string, string[]>();
  const monkeys = lines.map((line) => {
    let [id, value] = line.split(": ");
    if (isNaN(+value)) {
      // Add dependency
      let dependencies: any[] = [];
      if (value.includes(" + ")) {
        dependencies = value.split(" + ");
      } else if (value.includes(" * ")) {
        dependencies = value.split(" * ");
      } else if (value.includes(" - ")) {
        dependencies = value.split(" - ");
      } else if (value.includes(" / ")) {
        dependencies = value.split(" / ");
      }
      if (id === "root") {
        value = value.replace("+", "-");
      }
      dependencyMap.set(
        id,
        dependencies.map((dependency) => dependency.trim())
      );
      return { id, value: value, hasDependency: true };
    }
    return { id, value: value, hasDependency: false };
  });

  let lastOutput = 1;
  let currentHuman = +monkeys.find((monkey) => monkey.id === "humn")!.value;
  while (true) {
    if (lastOutput === 0) {
      return currentHuman - 1;
    }
    const nextMonkeys = monkeys.map((m) => ({ ...m }));
    const human = nextMonkeys.find((monkey) => monkey.id === "humn")!;
    human.value = currentHuman.toString();

    if (lastOutput < 1 && lastOutput > -1) {
      return currentHuman;
    }

    currentHuman += Math.ceil(Math.abs(lastOutput) / 20);

    outer: while (true) {
      for (const monkey of nextMonkeys.filter((monkey) => monkey.hasDependency)) {
        const dependencies = dependencyMap.get(monkey.id);
        if (!dependencies) continue;
        if (
          dependencies.some(
            (dependency) =>
            nextMonkeys.find((monkey) => monkey.id === dependency)!.hasDependency
          )
        ) {
          continue;
        }
        // All dependencies are solved
        const depends = dependencies.map(
          (dependency) =>
          nextMonkeys.find((monkey) => monkey.id === dependency)!
        );
        // Replace the values in the expression
        let expression = monkey.value;
        for (const depend of depends) {
          expression = expression.replace(depend.id, depend?.value);
        }
        // Evaluate the expression
        const result = eval(expression);

        monkey.hasDependency = false;
        monkey.value = result;

        if (monkey.id === "root" && !monkey.hasDependency) {
          lastOutput = +monkey.value;
          break outer;
        }
      }
    }
  }
};

const testResult = solve(test);
console.log("test", testResult);

const result = solve(input);
console.log("result", result);
