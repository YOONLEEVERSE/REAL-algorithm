const fs = require("fs");

const [a, b] = fs.readFileSync(0).toString().trim().split("\n");

const memo = Array.from({ length: a.length + 1 }, () =>
  Array.from({ length: b.length + 1 }, () => 0),
);

for (let i = 1; i <= a.length; i++) {
  for (let j = 1; j <= b.length; j++) {
    if (a[i - 1] === b[j - 1]) {
      memo[i][j] = memo[i - 1][j - 1] + 1;
    } else {
      memo[i][j] = Math.max(memo[i - 1][j], memo[i][j - 1]);
    }
  }
}
console.log(memo[a.length][b.length]);
