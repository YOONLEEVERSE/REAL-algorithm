// 가장 긴, 증가하는 부분 수열의 길이
// LIS. 걍 외우셈
const fs = require("fs");
const inputs = fs.readFileSync(0).toString().trim().split("\n");
const n = Number(inputs[0]);
const numbers = inputs[1].split(" ").map(Number);

const memo = Array.from({ length: n }, () => 1);

for (let i = 1; i < n; i++) {
  // 내 앞 구간 탐색
  for (let j = 0; j < i; j++) {
    if (numbers[j] < numbers[i] && memo[j] + 1 > memo[i]) {
      memo[i] = memo[j] + 1;
    }
  }
}

console.log(Math.max(...memo));
