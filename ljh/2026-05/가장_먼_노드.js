/**시작 9시 53분 */

/** 1번 노드에서 가장 멀리 떨어진 애를 찾기  bfs아닐까요?. 1번 노드로 부터 멀어진 애들을 넣으라. 이말입니다.
 *
 * "최단경로"로 이동시 간선의 개수가 가장 많은 노드들
 */
function solution(n, edge) {
  // graph를 만든다
  // 1부터 bfs로 탐색시작한다.
  // child를 queue에 넣을 때마다 depth++됨 -> 더 넣을 게 없을 때, 그 때 친구들 갯수를 return 하면 됨.
  // visited에 표기해야 함

  const graph = Array.from({ length: edge.length + 1 }, () => []);
  const visited = Array.from({ length: edge.length + 1 }, () => false);

  // 그래프 만듦
  for (let [v1, v2] of edge) {
    graph[v1].push(v2);
    graph[v2].push(v1);
  }

  const queue = [[1, 0]];
  let queueIdx = 0;

  const depthCnt = new Map();

  while (queue.length && queueIdx < queue.length) {
    const [node, depth] = queue[queueIdx++];

    if (!visited[node]) visited[node] = true;

    for (let child of graph[node]) {
      if (visited[child]) continue;

      depthCnt.set(
        depth + 1,
        depthCnt.get(depth + 1) ? depthCnt.get(depth + 1) + 1 : 1,
      );
      visited[child] = true;
      queue.push([child, depth + 1]);
    }
  }

  const maxDepth = depthCnt.size;
  return depthCnt.get(maxDepth);
}

console.log(
  solution(6, [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ]),
);
