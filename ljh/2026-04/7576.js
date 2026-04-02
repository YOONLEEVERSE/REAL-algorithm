/** 시작시간 : 10시
 * 1초(연산횟수 1억번 넘지 않게 주의), 256MB
 * 보관 + 1day => 익은 토마토가 주변 토마토도 익힘. 주변의 기준은 상하좌우.
 * 창고에 보관된 토마토들이 며칠이 지나면 다 익는가? 최소 일수를 알고 싶어 함.
 *
 * 모든 칸에 토마토가 있는 건 아님.
 * 토마토가 모두 익지 못하면 -1을 출력.
 *
 * 1인 좌표를 taskQueue에 넣어둠
 *
 * -> time 1업 -> taskQueue에 있는 걸 다 꺼내서 처리함. -> 주변오염. -
 * taskQueue에 남는게 없을 때까지 반복.
 *
 *
 */

const fs = require("fs");
const inputs = fs.readFileSync(0).toString().trim().split("\n");
const [m, n] = inputs[0].split(" ").map(Number);

//-1은 비어있는 곳. 0은 안익음. 1은 익음
const rottenMap = [[]];
const taskQueue = [];

for (let row = 1; row <= n; row++) {
  inputs[row] = inputs[row].split(" ").map(Number);
  rottenMap.push([]);

  for (let col = 0; col < m; col++) {
    if (inputs[row][col] === 1) {
      taskQueue.push([row, col, 0]);
      rottenMap[row].push(1);
    } else rottenMap[row].push(inputs[row][col] === -1 ? -1 : 0);
  }
}

let taskQueueLastIndex = 0;
let days = 0;

// 상, 하 , 좌, 우
const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

while (taskQueue.length > taskQueueLastIndex) {
  const [curRow, curCol, day] = taskQueue[taskQueueLastIndex++];
  days = day;

  for (let dir of dirs) {
    const nextRow = curRow + dir[0];
    const nextCol = curCol + dir[1];

    if (
      1 <= nextRow &&
      nextRow <= n &&
      0 <= nextCol &&
      nextCol < m &&
      inputs[nextRow][nextCol] !== -1 &&
      rottenMap[nextRow][nextCol] === 0
    ) {
      rottenMap[nextRow][nextCol] = 1;
      taskQueue.push([nextRow, nextCol, day + 1]);
    }
  }
}

const isValid = !rottenMap.some((row) => row.includes(0));
if (!isValid) console.log(-1);
else console.log(days);
