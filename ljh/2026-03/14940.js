const fs = require("fs");

const inputs = fs.readFileSync(0).toString().trim().split("\n");
const [n, m] = inputs[0].split(" ").map(Number);

const map = [];
const result = Array.from({ length: n }, () => Array(m).fill(-1));
let goalPos = null;

for (let row = 0; row < n; row++) {
  // 행 데이터를 가져올 때 양끝 공백을 제거하고 공백 기준으로 나눕니다.
  map[row] = inputs[row + 1].trim().split(/\s+/).map(Number);
  
  for (let col = 0; col < m; col++) {
    if (map[row][col] === 2) {
      goalPos = [row, col];
      result[row][col] = 0; // 목표 지점 거리는 0
    } else if (map[row][col] === 0) {
      result[row][col] = 0; // 원래 갈 수 없는 땅은 항상 0
    }
    // map[row][col] === 1인 곳은 초기값 -1을 유지하여 도달 불가능 시 -1 출력
  }
}

const dirs = [
  [-1, 0], [1, 0], [0, -1], [0, 1],
];
const queue = [[goalPos[0], goalPos[1]]];
let head = 0;

while (queue.length > head) {
  const [r, c] = queue[head++];

  for (const [dr, dc] of dirs) {
    const nr = r + dr;
    const nc = c + dc;

    // 범위 내에 있고, 아직 방문하지 않은(-1) 갈 수 있는 땅인지 확인
    if (nr >= 0 && nr < n && nc >= 0 && nc < m && result[nr][nc] === -1) {
      result[nr][nc] = result[r][c] + 1;
      queue.push([nr, nc]);
    }
  }
}

console.log(result.map((row) => row.join(" ")).join("\n"));

/* 기존 코드 주석 처리
const fs = require("fs");

const inputs = fs.readFileSync(0).toString().trim().split("\n");

// 모든 지점 ~ 목표 지점까지의 거리

// n = 세로 크기, m = 가로 크기. 각각 2~1000 범위의 정수

const [n, m] = inputs[0].split(" ").map(Number);
const map = [];
const result = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => -1),
);

let goalPos = null;

for (let row = 0; row < n; row++) {
  map[row] = inputs[row + 1].split(" ").map(Number);

  if (goalPos) continue;

  const goalCol = map[row].findIndex((value) => value === 2);
  if (goalCol !== -1) {
    goalPos = [row, goalCol];
  }
}

// 상하좌우
const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const queue = [[goalPos[0], goalPos[1], 0]];
let head = 0;

result[goalPos[0]][goalPos[1]] = 0;

while (queue.length > head) {
  const [row, col, depth] = queue[head++];

  for (let dir of dirs) {
    const next = [row + dir[0], col + dir[1], depth + 1];

    if (
      next[0] < 0 ||
      next[0] >= n ||
      next[1] < 0 ||
      next[1] >= m ||
      result[next[0]][next[1]] !== -1
    )
      continue;

    if (map[next[0]][next[1]] === 0) {
      result[next[0]][next[1]] = 0;
      continue;
    }

    result[next[0]][next[1]] = depth + 1;
    queue.push(next);
  }
}

console.log(result.map((row) => row.join(" ")).join("\n"));
*/
