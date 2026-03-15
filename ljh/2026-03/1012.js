// 8시 40분 시작 - 9시 12분 종료

// 해충ㅇ잡아먹기. 인접한 배추까지 커버.
// 한 군락에 한마리만 있으면 되는건가?  ㅇㅇ 한군락에 하나만 있으면 됨.
// 1로부터 시작해서 상하좌우 다 찾아보기.
// 한군락은 visited처리해서 중복 처리안하게

const fs = require("fs");
const inputs = fs.readFileSync(0).toString().trim().split("\n");

// testcase 수
const t = Number(inputs[0]);

// m = 가로길이, n= 세로길이, 배추 심어져 있는 위치 개수
// 최대 arr  = [50][50] 2500개. visited는 굳이 그거 다 .. 안만들어도 되지 않을까.
let startIdx = 1;

for (let test = 0; test < t; test++) {
  const [m, n, k] = inputs[startIdx].split(" ").map(Number);

  const map = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => 0),
  );
  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => 0),
  );

  for (let i = startIdx + 1; i < startIdx + 1 + k; i++) {
    const [col, row] = inputs[i].split(" ").map(Number);

    map[row][col] = 1;
  }

  // 상하좌우, row, col
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let cnt = 0;

  function solution(row = 0, col = 0) {
    if (visited[row][col]) return false;

    visited[row][col] = 1;

    for (let direction of directions) {
      const nextRow = row + direction[0];
      const nextCol = col + direction[1];

      if (nextRow < 0 || nextRow >= n || nextCol < 0 || nextCol >= m) continue;

      if (map[nextRow][nextCol]) solution(nextRow, nextCol);
    }
    return true;
  }

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (map[row][col] && !visited[row][col]) {
        cnt++;
        solution(row, col);
      }
    }
  }

  console.log(cnt);

  startIdx += k + 1;
}
