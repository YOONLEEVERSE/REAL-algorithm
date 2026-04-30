/* 8시 28분 . 40분 소요
* n개의 송전탑이 전선을 통해 하나의 트리 형태로 연결되어 있dma
트리를 2개로 나눌 거임. 두 전력망이 갖게 되는 송전탑 개수 최대한 비슷하게.
두 전력망이 갖고 있는 송전탑 개수 차이(절대값)을 return

2<=n<=100

! 트리의 root를 '내가'정하는 것임~ !

*/

// 1. 트리생성

// 2. dfs를 하면서 depth 깊은 것부터 edge를 끊어 봄 -> subtree의 노드 개수 - (전체트리개수-subtree 노드 개수 -> 내 children갯수 + 내 children의 children개수...  aka.나머지 노드 개수) -> 0이면 즉시 종료해도 됨. 차이가 진짜 없게 나눌 수 있단 뜻. 나머지는 완전 다 한 번 봐야할 것 같음.
function solution(n, wires) {
  var answer = Infinity;

  const tree = Array.from({ length: n + 1 }, () => []); //인접 리스트로 트리 표현
  const visited = new Set();

  // 무방향이니까 서로 연결해줘야 함. -> 이 경우 중복으로 재귀돌리지 않도록 꼭 방문처리 해줘야 함.
  for (let wire of wires) {
    tree[wire[0]].push(wire[1]);
    tree[wire[1]].push(wire[0]);
  }

  /*출발점은 항상 1, 1을 root로 상정하고 갈 것임. */
  const dfs = (rootNode = 1, linkedNode = null) => {
    if (visited.has(rootNode)) return 0;

    visited.add(rootNode);
    const children = tree[rootNode];

    let curSubTreeSize = 1; //일단 나 포함, 이제 내 자식들의 subtree 사이즈들을 합해주면 됨.
    for (let child of children) {
      curSubTreeSize += dfs(child, rootNode); //dfs가 자식 트리의 subTreeSize를 return
    }

    // 현재 서브 트리 나머지 부분 크기 - 현재 서브 트리 크기 = (n - curSubTreeSize) - curSubTreeSize = n - 2*curSubTreeSize
    const difference = Math.abs(n - 2 * curSubTreeSize);

    answer = Math.min(answer, difference);
  };

  dfs();

  return answer;
}
