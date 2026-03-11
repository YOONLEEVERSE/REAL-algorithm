/**
 * 시작 2시 17분
 *
 * 한번에 한계단 혹은 두계단 오를 수 있음.
 * 연속된 세계단 밟으면 안됨 => 연속으로 한계단 3번오르는 건 안된다는 뜻
 * 마지막 도착 계단은 무조건~! 밟아야함.
 *
 * 총 점수의 최댓값을 구하시오
 */

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n").map(Number);
input[0] = 0;
const memo = new Map();

// 반환값: entry 계단까지의 최대 누적 점수
function findMax(entry, continuous = 0) {
  if (entry === 1 || entry === 0) return input[entry];
  if (entry < 0) return -Infinity;

  const key = `${entry},${continuous}`;
  if (memo.has(key)) return memo.get(key);

  let maxSum = -Infinity;
  if (continuous < 1) {
    maxSum = findMax(entry - 1, continuous + 1);
  }

  const result = input[entry] + Math.max(maxSum, findMax(entry - 2, 0));
  memo.set(key, result);
  return result;
}

console.log(findMax(input.length - 1));
