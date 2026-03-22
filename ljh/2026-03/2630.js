// 10시 19분 시작 -> 10시 48분 끝. 근데 이거 순서 바뀐걸 고민을 못했오.. ㅎㅎ
// 전체 종이가 같은 경우의 수를 체크를 못했음.

/** recursion 이용. memoize할만한게 있는지 고민해보셈
 * 하얀색 = 0, 파란색 = 1
 * 하얀색 색종이 개수
 * 파란색 색종이 개수 출력
 *
 */

const fs = require("fs");
const inputs = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((s) => s.trim());

const N = Number(inputs[0]);
const map = [];
for (let i = 1; i <= N; i++) {
  map.push(inputs[i].split(" ").map(Number));
}

const result = { white: 0, blue: 0 };

/**
 *
 * 1. 영역을 나눈다. => 기존 구역의 정확히 1/4등분
 * 2. 각 영역을 확인한다.(같은 색인지)
 *
 * 같은 색이다 => white/blue cnt 업. 다음 섹션으로 감
 * 다른 색이 있다 => 영역을 또 1/4로 나눔.
 */

// // start => [y,x]
// function solution(start, len) {
//   if (len < 1) return;
//   const [y, x] = start;

//   if (len === 1) {
//     result[map[y][x] === 1 ? "blue" : "white"] += 1;
//     return;
//   }

//   const halfOfLen = len / 2;

//   const leftTop = [y, x];
//   const rightTop = [y, x + halfOfLen];
//   const leftBottom = [y + halfOfLen, x];
//   const rightBottom = [y + halfOfLen, x + halfOfLen];

//   const sections = [leftTop, rightTop, leftBottom, rightBottom];

//   for (let section of sections) {
//     let isSameColor = true;
//     const firstColor = map[section[0]][section[1]];

//     for (let row = section[0]; row < section[0] + halfOfLen; row++) {
//       if (!isSameColor) break;

//       for (let col = section[1]; col < section[1] + halfOfLen; col++) {
//         if (firstColor !== map[row][col]) {
//           isSameColor = false;
//           break;
//         }
//       }
//     }

//     if (isSameColor) {
//       result[firstColor === 1 ? "blue" : "white"] += 1;
//     } else {
//       solution(section, halfOfLen);
//     }
//   }
// }

// solution([0, 0], N);

// console.log(`${result.white}\n${result.blue}`);

// start => [y,x]
// 현재 영역 전체가 같은 색인지 먼저 확인 후, 다르면 4등분
function solution(start, len) {
  const [y, x] = start;
  const firstColor = map[y][x];
  let isSameColor = true;

  for (let row = y; row < y + len; row++) {
    if (!isSameColor) break;
    for (let col = x; col < x + len; col++) {
      if (map[row][col] !== firstColor) {
        isSameColor = false;
        break;
      }
    }
  }

  if (isSameColor) {
    result[firstColor === 1 ? "blue" : "white"] += 1;
    return;
  }

  const halfOfLen = len / 2;
  solution([y, x], halfOfLen);
  solution([y, x + halfOfLen], halfOfLen);
  solution([y + halfOfLen, x], halfOfLen);
  solution([y + halfOfLen, x + halfOfLen], halfOfLen);
}

solution([0, 0], N);

console.log(`${result.white}\n${result.blue}`);
