// 시작 시간 : 2026년 09월 28일 23시 27분 30초

/** 과수원 귤 수확. k개를 상제 하나에 담음. => 혼자 크기 다른 애들 빼고 싶음
 * 크기가 서로 다른 종류의 수의 최솟값을 return 하도록 solution함수 작성
 * 한 박스에 k개, 수확한 귤의 종류 tangerine
 *
 * Set으로 중복 없앰 => or array돌면서 cnt한후, 갯수 적은 순으로 sort함 => 뒤에서 n개되도록 뺌 => 그럼 크기 종류 return 할 수 잇음
 */

function solution(k, tangerine) {
  const countMap = tangerine.reduce((acc, cur) => {
    if (acc.has(cur)) {
      const tmp = acc.get(cur);
      acc.set(cur, tmp + 1);
    } else acc.set(cur, 1);

    return acc;
  }, new Map());

  let result = countMap.size;

  const tangerineCount = [...countMap].toSorted((a, b) => b[1] - a[1]);

  let tmpCnt = tangerine.length;
  while (tmpCnt > k) {
    const smallestOne = tangerineCount.pop();

    result -= 1;

    tmpCnt -= smallestOne[1];

    if (tmpCnt < k) result += 1;
  }

  return result;
}

console.log(solution(6, [1, 3, 2, 5, 4, 5, 2, 3])); //3
console.log(solution(4, [1, 3, 2, 5, 4, 5, 2, 3])); //2
console.log(solution(2, [1, 1, 1, 1, 2, 2, 2, 3])); //1
