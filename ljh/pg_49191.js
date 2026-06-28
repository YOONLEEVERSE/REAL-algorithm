// 시작 시간 : 2026년 06월 28일 11시 26분 08초/

function solution(n, results) {
  // 일단 graph로 만들어야 함. linked list로 해야하지 않을까?
  // a - [b,c,d] a보다 작은 애들.
  // 나는 저 만들어진 그래프에서 a보다 큰애들, a보다 작은 애들의 수를 cnt를 할 수 있어야 함.
  // 나누어진 2개의 tree가 있다면 일단 안 됨 => 바로 0출력
  // a -> a보다 큰 애들 cnt, + a보다 작은 애들 cnt + 1 가 n이면 순위를 알 수 있음댱
  // a - [b,c,d] => 이런식으로 가서.. children의 갯수를 recursive하게 타고 들어가서.. 해야할 것 같음.  + mem도 해둬야겠네
  // 나보다 큰 애들은 어떻게 구하지? -> 나를 child로 갖는 애들 + 그것도 recursive하게 구하면 될 것 가은뎀.
  // 그냥 한 바퀴 쭉 돌면서 cnt하는 게 낫겠다.
  //

  let result = 0;

  const scoreCnt = Array.from({ length: n + 1 }, () => [new Set(), new Set()]); // index 0 : higherThanMe, index 1 : lowerThanMe
  const memo = Array.from({ length: n + 1 }, () => [undefined, undefined]); // recursive한 것까지 한거의 개수

  function getHigherThanMe(me, type = "score") {
    return type === "score" ? scoreCnt[me][0] : memo[me][0];
  }

  function getLowerThanMe(me, type = "score") {
    return type === "score" ? scoreCnt[me][1] : memo[me][1];
  }

  for (let [winner, looser] of results) {
    getLowerThanMe(winner, "score").add(looser);
    getHigherThanMe(looser, "score").add(winner);
  }

  // 이제 memo해야지

  function memoHigherItem(item) {
    const memoized = getHigherThanMe(item, "memo");

    if (!!memoized) return memoized;

    const higherList = getHigherThanMe(item, "score");
    let tmp = [...higherList];
    for (let newItem of higherList) {
      tmp = tmp.concat(memoHigherItem(newItem));
    }

    memo[item][0] = [...new Set(tmp)];
    return tmp;
  }

  function memoLowerItem(item) {
    const memoized = getLowerThanMe(item, "memo");

    if (!!memoized) return memoized;

    const lowerList = getLowerThanMe(item, "score");

    let tmp = [...lowerList];

    for (let newItem of lowerList) {
      tmp = tmp.concat(memoLowerItem(newItem));
    }

    memo[item][1] = [...new Set(tmp)];
    return tmp;
  }

  for (let i = 1; i <= n; i++) {
    memoHigherItem(i).length;
    memoLowerItem(i).length;

    if (memo[i][0].length + memo[i][1].length === n - 1) {
      result += 1;
    }
  }

  return result;
}

console.log(
  solution(5, [
    [4, 3],
    [4, 2],
    [3, 2],
    [1, 2],
    [2, 5],
  ]),
);
