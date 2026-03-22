// 4시 17분
const fs = require("fs");

const inputs = fs.readFileSync(0).toString().trim().split("\n");

const [v, e] = inputs[0].split(" ").map(Number);

// 연결이 돼있는지 확인. .
// parent를 저장해야할까요? 양방향인데.. 흠. 서로 한 그룹이기만 하다면..

const graph = new Map();
const marking = new Map();

for (let i = 1; i <= e; i++) {
  const [v1, v2] = inputs[i].split(" ").map(Number);

  const v1Edges = graph.get(v1) ?? [];
  v1Edges.push(v2);

  graph.set(v1, v1Edges);

  const v2Edges = graph.get(v2) ?? [];
  v2Edges.push(v1);

  graph.set(v2, v2Edges);
}

function mark(curVertex, groupNumber) {
  if (!!marking.get(curVertex)) return;

  marking.set(curVertex, groupNumber);

  const edges = graph.get(curVertex);

  for (let e of edges) {
    mark(e, groupNumber);
  }
}

let groupNum = 0;

for (let [key, _] of graph) {
  if (marking.get(key)) continue;

  mark(key, ++groupNum);
}
// console.log(v, marking.size);
console.log(groupNum + v - marking.size);
