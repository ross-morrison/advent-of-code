const test = Deno.readTextFileSync("test-a.txt");
const input = Deno.readTextFileSync("input-a.txt");

const solve = (input: string) => {
  const lines = input.split("\n");
  const dependencyMap = new Map<string, string[]>();
  const monkeys = lines.map((line) => {
    const [id, value] = line.split(": ");
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
      dependencyMap.set(
        id,
        dependencies.map((dependency) => dependency.trim())
      );
      return { id, value: value, hasDependency: true };
    }
    return { id, value: value, hasDependency: false };
  });

  while (true) {
    for (const monkey of monkeys.filter((monkey) => monkey.hasDependency)) {
      const dependencies = dependencyMap.get(monkey.id);
      if (!dependencies) continue;
      if (
        dependencies.some(
          (dependency) =>
            monkeys.find((monkey) => monkey.id === dependency)!.hasDependency
        )
      ) {
        continue;
      }
      // All dependencies are solved
      const depends = dependencies.map(
        (dependency) =>
          monkeys.find((monkey) => monkey.id === dependency)!
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
        return monkey.value;
      }
    }
  }
};

const testResult = solve(test);
console.log("test", testResult);

const result = solve(input);
console.log("result", result);
