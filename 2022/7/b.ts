const input = Deno.readTextFileSync("input-a.txt");
const lines = input.split("\n");

const SPACE_AVAILABLE = 70000000;
const SPACE_NEEDED = 30000000;
const commands = lines
  .map((l, i) => {
    return { index: i, text: l };
  })
  .filter((line) => line.text.charAt(0) === "$");

let currentPath = "/";
const fileStructure: any = {
  "/": {},
};

for (const command of commands) {
  const [_, cmd, target] = command.text.split(" ");
  if (cmd.trim() === "cd") {
    if (target === "..") {
      currentPath = currentPath.split("/").slice(0, -1).join("/");
    }
    if (target === "/") {
      currentPath = "/";
    }

    if (target !== ".." && target !== "/") {
      currentPath = `${currentPath === "/" ? "" : currentPath}/${target}`;
    }
  }

  if (cmd.trim() === "ls") {
    const result = lines.slice(
      command.index,
      commands.find((c) => c.index > command.index)?.index ?? lines.length
    );

    const directories = result.filter((line) => line.split(" ")[0] === "dir");
    const files = result.filter(
      (line) => !directories.includes(line) && line.charAt(0) !== "$"
    );

    for (const dir of directories) {
      const [_, name] = dir.split(" ");
      fileStructure[currentPath] ??= {};
      fileStructure[currentPath][name] = true;
    }

    for (const file of files) {
      const [size, name] = file.split(" ");
      fileStructure[currentPath] ??= {};
      fileStructure[currentPath][name] ??= {};
      fileStructure[currentPath][name] = size;
    }
  }
}

const getDirSize = (path: string) => {
  let sumOfDir = 0;
  const directories = Object.keys(fileStructure[path]).filter(
    (key) => fileStructure[path][key] === true
  );
  const files = Object.keys(fileStructure[path]).filter(
    (key) => fileStructure[path][key] !== true
  );
  for (const file of files) {
    const size = fileStructure[path][file];
    sumOfDir += +size;
  }
  for (const dir of directories) {
    const size = getDirSize(`${path === "/" ? "" : path}/${dir}`);
    sumOfDir += +size;
  }
  return sumOfDir;
};

const usedSpace = new Map<string, number>();
for (const path in fileStructure) {
  const size = getDirSize(path);
  usedSpace.set(path, size);
}

const needToFree = getDirSize("/") - (SPACE_AVAILABLE - SPACE_NEEDED);
const sorted = [...usedSpace.entries()].sort((a, b) => a[1] - b[1]).filter(([, size]) => size > needToFree);
const smallest = sorted[0];

console.log(smallest?.[1]);
