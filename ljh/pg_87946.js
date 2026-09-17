// 시작 시간 : 2026년 09월 17일 17시 43분 10초

/**
 * 피로도 시스템. 피로도는 0이상의 정수로 표현됨
 *
 * 던전 탐험시 요구하는 최소 피로도가 남아있어야 됨.
 * 최소 요구 피로도 -> 던전 입장하기 위해선 이정도의 피로도는 남아있어야 해.
 * 소모 피로도 -> 던전 탐험 후 실제로 소모되는 피로도
 *
 * 던전은 하루에 한 번식 탐험 가능. -> 하루에 최대한 많은 던전을 탐험해야함.
 *
 * greedy인가? 이거 풀었던 문젠데. 기억이 안남. 어떤 걸 기준으로 삼았었는지.
 *
 * -> 이전 선택에 따라 이후 선택가능한 던전이 달라짐. 한 번에 최적해를 구할 방법은 없음. = 즉 완탐을 해야함.
 *
 * how )
 * function recursive:
 *
 *      const 후보들 ; // 현재 피로도 기준 최소 피로도 충족되는 애들
 *
 *      dfs/ bfs 뭐든 상관없는뎅.. dfs로 해결하는게 빠르겠다 이거는.
 *
 *      최대 던전 수를 구하면 됨.
 */

//k = 현재 피로도, dungeongs = ["최소 필요 피로도", "소모 피로도"][]

function solution(k, dungeons) {
  let maximumNum = 0;
  const stack = [];

  dfs(k);

  function dfs(remainHp) {
    const candidates = dungeons.reduce((prev, [neededHp, consumeHp], idx) => {
      if (neededHp <= remainHp && !stack.includes(idx)) {
        prev.push({ idx, info: [neededHp, consumeHp] });
      }
      return prev;
    }, []);

    for (let candidate of candidates) {
      stack.push(candidate.idx);
      // stack에 쌓인게 많음 = 간 갯수가 많음
      if (maximumNum < stack.length) maximumNum = stack.length;
      dfs(remainHp - candidate.info[1]);

      stack.pop();
    }
  }

  return maximumNum;
}

console.log(
  solution(80, [
    [80, 20],
    [50, 40],
    [30, 10],
  ]),
);
