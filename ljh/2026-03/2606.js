/**
 * 시작 1시34분 종료 1시 56분.
 */

const fs = require("fs");

const input = fs.readFileSync(0).toString().trim().split("\n");

const computerCnt = Number(input[0]);
const edgeCnt = Number(input[1]);

const edgeGraph = Array.from({ length: computerCnt + 1 }, () => []);

for (let i = 2; i - 2 < edgeCnt; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  // a->b 연결
  edgeGraph[a].push(b);

  // b->a 연결
  edgeGraph[b].push(a);
}

const visited = new Set();

function solution(cur = 1) {
  visited.add(cur);

  let neighbors = edgeGraph[cur];

  for (let neighbor of neighbors) {
    if (!visited.has(neighbor)) solution(neighbor);
  }
}

solution();

// 전체 방문 노드에 1이 포함되어 있으므로 전체 카운트에서 1 빼기
console.log(visited.size - 1);
