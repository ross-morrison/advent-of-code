const input = Deno.readTextFileSync("input-a.txt");

const parseMarkers = (pInput: string) => {
  const characters = pInput.split("");
  const lastFourCharacters: string[] = [];
  let count = 0;
  for (const character of characters) {
    if (lastFourCharacters.length === 4) {
      const uniqueCharacters = new Set(lastFourCharacters);
      if (uniqueCharacters.size === 4) {
        break;
      }
      lastFourCharacters.shift();
    }
    lastFourCharacters.push(character);
    count++;
  }
  return count;
};

console.log(parseMarkers(input));
