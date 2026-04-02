const fs = require("fs");
const inputs = fs.readFileSync(0).toString().trim().split("\n");

// const N = parseInt(inputs[0]);
const numbers = inputs[1].split(" ").map(Number);
const sortedNumbers = [...new Set(numbers)].sort((a, b) => a - b);

const rankMap = new Map();

sortedNumbers.forEach((n, index) => {
  rankMap.set(n, index);
});
// console.log(valueMap);

const result = numbers.map((n) => rankMap.get(n));

console.log(result.join(" "));
