/** 2시 44분 시작 */

/** 각 노드의 부모를 구하세용.
 * 이진 트리 아님 ~!
 * 자료구조를 구현하는 게 빠른 편일까?
 * 1이 root니깐.. 모르겟눈뎀?
 * 3시 24분에 제출완. 정답 맞히긴 했는데, bfs로 좀 더 효율적으로 할수 있나 봄.
 */

const fs = require("fs");
const inputs = fs.readFileSync(0).toString().trim().split("\n");
const n = Number(inputs[0]);

// 0번째 : 연결된 애들(list), 1번째 부모
const tree = [[], [[], -1], ...Array.from({ length: n - 1 }, () => [[], null])];

const addLink = (a, b) => {
  //1. 서로에게 합침. 부모가 정의되는 순간, 내 하위의 부모도 정의됨.
  tree[a][0].push(b);
  tree[b][0].push(a);
};

for (let i = 1; i < n; i++) {
  const [a, b] = inputs[i].split(" ").map(Number);
  addLink(a, b);
}

const solution = (edge) => {
  const linkedEdges = tree[edge][0];
  const parent = tree[edge][1];

  if (parent) {
    linkedEdges.forEach((e) => {
      if (!tree[e][1]) {
        tree[e][1] = edge;
        solution(e);
      }
    });
  }
};

solution(1);

const result = [];
for (let i = 2; i <= n; i++) {
  result.push(tree[i][1]);
}

console.log(result.join("\n"));
