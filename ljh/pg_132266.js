// 시작 시간 : 2026년 06월 26일 18시 31분 28초
/**
 *
 * 여러 지역에 흩어져 특수 임무 수행 중.
 * 지역별 고윳값 존재.
 * 두 지역간 이동 비용은 모두 동일, 다만 돌아오는 길이 없어진 경우가 있음.
 *
 * 총 지역 수 n
 * 두 지역 왕복 할 수 있는 길 정보 roads
 * 부대원이 위치한 지역 -> sources
 * 강철부대의 지역(destination)
 *
 */

function solution(n, roads, sources, destination) {
  const roadLinkedList = new Map();

  const minimumPaths = Array.from({ length: n + 1 }, (_, idx) =>
    idx === destination ? 0 : -1,
  );

  for (let [a, b] of roads) {
    if (!roadLinkedList.has(a)) roadLinkedList.set(a, []);
    if (!roadLinkedList.has(b)) roadLinkedList.set(b, []);
    roadLinkedList.get(a).push(b);
    roadLinkedList.get(b).push(a);
  }

  const visited = new Set([destination]);
  const queue = [destination];
  let idx = 0;

  while (idx < queue.length) {
    const currentNode = queue[idx++];
    const neighbors = roadLinkedList.get(currentNode) ?? [];

    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        minimumPaths[neighbor] = minimumPaths[currentNode] + 1;
        queue.push(neighbor);
      }
    }
  }

  return sources.map((source) => minimumPaths[source]);
}

console.log(
  solution(
    3,
    [
      [1, 2],
      [2, 3],
    ],
    [2, 3],
    1,
  ),
);

console.log(
  solution(
    5,
    [
      [1, 2],
      [1, 4],
      [2, 4],
      [2, 5],
      [4, 5],
    ],
    [1, 3, 5],
    5,
  ),
);
