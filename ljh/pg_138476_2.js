// 시작 시간 : 2026년 09월 28일 23시 45분 53초

/**
 * 귤 k개를 고를 때 서로 다른 크기 종류 수의 최솟값을 구한다.
 * 크기별 개수를 세고, 개수가 많은 종류부터 선택한다.
 */
function solution(k, tangerine) {
  const countBySize = new Map();

  for (const size of tangerine) {
    countBySize.set(size, (countBySize.get(size) ?? 0) + 1);
  }

  const counts = [...countBySize.values()].sort((a, b) => b - a);

  let selectedCount = 0;
  let kindCount = 0;

  for (const count of counts) {
    selectedCount += count;
    kindCount += 1;

    if (selectedCount >= k) return kindCount;
  }
}

console.log(solution(6, [1, 3, 2, 5, 4, 5, 2, 3])); // 3
console.log(solution(4, [1, 3, 2, 5, 4, 5, 2, 3])); // 2
console.log(solution(2, [1, 1, 1, 1, 2, 2, 2, 3])); // 1
