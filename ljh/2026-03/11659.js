// 시작 2시 7분

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

// n = 수의 개수, m = 합을 구해야하는 횟수
const [n, m] = input[0].split(" ").map(Number);

const numbers = input[1].split(" ").map(Number);

//1에서 1까지.
const rangeSum = [0, numbers[0]];

for (let j = 1; j < n; j++) {
  rangeSum.push(rangeSum[j] + numbers[j]);
}

const result = [];

for (let i = 2; i < m + 2; i++) {
  const [start, end] = input[i].split(" ").map(Number);
  result.push(rangeSum[end] - rangeSum[start - 1]);
}

console.log(result.join("\n"));

// const maxRange = [m + 1, -1];

// for (let range of ranges) {
//   if (maxRange[0] > range[0]) maxRange[0] = range[0];
//   if (maxRange[1] < range[1]) maxRange[1] = range[1];
// }

// let maxRangeSum = 0;
// for (let i = maxRange[0] - 1; i < maxRange[1]; i++) {
//   maxRangeSum += numbers[i];
// }

// const result = [];

// for (let range of ranges) {
//   let tmp = maxRangeSum;
//   //   console.log("여기에서 시작 ", tmp);
//   for (let start = maxRange[0]; start < range[0]; start++) {
//     // console.log("왼쪽에서 빼는중", start, numbers[start - 1]);
//     tmp -= numbers[start - 1];
//   }

//   for (let end = maxRange[1]; end > range[1]; end--) {
//     // console.log("오른쪽에서 빼는중 : - ", end, numbers[end - 1]);
//     tmp -= numbers[end - 1];
//   }
//   //   console.log("결과,", tmp);

//   result.push(tmp);
// }
// console.log(result.join("\n"));

// console.log(result.join("\n"));
