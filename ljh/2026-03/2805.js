// 시작 10시 50분

/**
 * 만들어야 하는 거 M미터.
 * 집 근처 나무 한줄에 대한 벌목 허가.
 * 목재절단기로 벌목
 * 절단기(H) => ground+H일직선으로 그어버림.
 *
 * H >= 0
 *
 * 나무를 딱 필요한 만큼만 집으로 가져가려고 함. > 자르는 높이의 최댓값을 구하세요.
 * 나무수 N, 총 필요한 나무 길이 M
 */

// ===================== 기존 풀이 (시간초과) =====================
// const fs = require("fs");
// const inputs = fs.readFileSync(0).toString().trim().split("\n");
// const [N, M] = inputs[0].split(" ").map(Number);
//
// const heights = inputs[1]
//   .split(" ")
//   .map(Number)
//   .sort((a, b) => b - a);
//
// heights.sort((a, b) => b - a);
//
// let baseIndex = -1;
// let baseCuttedLength = 0;
//
// for (let i = 0; i < N; i++) {
//   const closestIndex = i;
//   let cuttedLength = 0;
//
//   for (let j = 0; j < N; j++) {
//     if (heights[j] <= heights[closestIndex]) break;
//
//     cuttedLength += heights[j] - heights[closestIndex];
//   }
//
//   if (cuttedLength >= M) {
//     baseIndex = closestIndex;
//     baseCuttedLength = cuttedLength;
//     break;
//   }
// }
//
// if (baseCuttedLength === M) {
//   console.log(heights[baseIndex]);
//   return;
// }
//
// const largerCnt = baseIndex;
// const lastHeight = baseCuttedLength - M;
// const baseHeight = heights[baseIndex];
// let addHeight = 1;
//
// while (true) {
//   if (largerCnt * addHeight >= lastHeight) {
//     break;
//   }
//
//   addHeight++;
// }
//
// console.log(baseHeight + addHeight);
//
// // 필요한 거 M
// // 최대높이부터 내려가는게 .. 맞을것같은디.. !?
// ===================== 기존 풀이 끝 =====================

// ===================== 이분탐색 풀이 O(N log maxH) =====================
const fs = require("fs");
const inputs = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = inputs[0].split(" ").map(Number);

const heights = inputs[1].split(" ").map(Number);

// H로 잘랐을 때 얻는 나무 총량
function getCutAmount(H) {
  let total = 0;
  for (let i = 0; i < N; i++) {
    if (heights[i] > H) total += heights[i] - H;
  }
  return total;
}

let lo = 0;
let hi = Math.max(...heights);
let answer = 0;

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  if (getCutAmount(mid) >= M) {
    answer = mid; // 조건 만족 → 더 높게 잘라볼 수 있음
    lo = mid + 1;
  } else {
    hi = mid - 1;
  }
}

console.log(answer);
