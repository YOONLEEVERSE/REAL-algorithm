const fs = require("fs");

//5시 40분쯤
const [nums, ...input] = fs.readFileSync(0).toString().trim().split("\n");

const [n, m] = nums.split(" ").map(Number);

const pocketmonDict = {};

for (let i = 0; i < n; i++) {
  const pocket = input[i];
  const number = i + 1;

  pocketmonDict[pocket] = number;
  pocketmonDict[number] = pocket;
}

const result = [];
for (let i = 0; i < m; i++) {
  const key = input[n + i];
  result.push(pocketmonDict[key]);
}

console.log(result.join("\n"));
