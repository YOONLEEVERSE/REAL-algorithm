// 시작 시간 : 2026년 05월 17일 13시 49분 35초

function solution(n, s, a, b, fares) {
  const hash = (a, b) => {
    return [a, b].sort((a, b) => a - b).join(",");
  };

  const getFare = (a, b) => {
    const key = hash(a, b);
    return fareMap.get(key);
  };

  const graph = Array.from({ length: n + 1 }, () => []);

  const fareMap = new Map([[hash(s, s), 0]]);

  const minimumCosts = [];

  for (let [v1, v2, fare] of fares) {
    graph[v1].push(v2);
    graph[v2].push(v1);

    fareMap.set(hash(v1, v2), fare);
  }

  const initialize = () => {
    // 1~n, x 1~n
    for (let i = 0; i <= n; i++) {
      const initialFare = [];
      for (let j = 0; j <= n; j++) {
        if (i !== 0 && j !== 0 && i === j) {
          initialFare.push(0);
        } else {
          initialFare.push(getFare(i, j) ?? Infinity);
        }
      }
      minimumCosts.push(initialFare);
    }
  };

  const updateMinimumCosts = () => {
    for (let d = 1; d <= n; d++) {
      //1번~n번을 거친다고 생각했을 때 . 점화식 S(ab) =  min(S(ad) + S(db), S(ab))

      // 각자리 갱신할 수 있는지 확인하고 기존값보다 d를 거치는 게 더 비용이 싸다 -> 갱신
      for (let v1 = 1; v1 <= n; v1++) {
        for (let v2 = 1; v2 <= n; v2++) {
          // 1을 통해 갈 수 있는지부터 확인해야 할 것 같은뎀.
          const tmp = minimumCosts[v1][d] + minimumCosts[d][v2];

          if (tmp < minimumCosts[v1][v2]) {
            minimumCosts[v1][v2] = tmp;
            minimumCosts[v2][v1] = tmp;
          }
        }
      }
    }
  };

  const findMinimumTotalCost = () => {
    //minimumCost를 또 돌아야함. D(s,i) + D(i,a) + D(i,b)가 제일 작은값이 답임 i -> 1~n
    let minCost = minimumCosts[s][a] + minimumCosts[s][b];

    for (let i = 1; i <= n; i++) {
      const tmpMinimumTotalCost =
        minimumCosts[s][i] + minimumCosts[i][a] + minimumCosts[i][b];

      if (minCost > tmpMinimumTotalCost) minCost = tmpMinimumTotalCost;
    }

    return minCost;
  };

  initialize();
  updateMinimumCosts();

  return findMinimumTotalCost();
}

console.log(
  solution(6, 4, 6, 2, [
    [4, 1, 10],
    [3, 5, 24],
    [5, 6, 2],
    [3, 1, 41],
    [5, 1, 24],
    [4, 6, 50],
    [2, 4, 66],
    [2, 3, 22],
    [1, 6, 25],
  ]),
);

console.log(
  solution(7, 3, 4, 1, [
    [5, 7, 9],
    [4, 6, 4],
    [3, 6, 1],
    [3, 2, 3],
    [2, 1, 6],
  ]),
);
console.log(
  solution(6, 4, 5, 6, [
    [2, 6, 6],
    [6, 3, 7],
    [4, 6, 7],
    [6, 5, 11],
    [2, 5, 12],
    [5, 3, 20],
    [2, 4, 8],
    [4, 3, 9],
  ]),
);
