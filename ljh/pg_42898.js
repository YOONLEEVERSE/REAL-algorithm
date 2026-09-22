// 시작 시간 : 2026년 09월 22일 17시 55분 23초

//m = col, n = row. 좌표는 1,1부터 시작함.
// puddles => 물에 잠긴 곳
// 최단경로의 개수를 1_000_000_007로 나눈 나머지를 return

// 오른쪽/아래로만 가면 모든 경로의 길이가 (m-1)+(n-1)로 동일함.
// => 최단경로를 "찾을" 필요 없이 경로의 "개수"만 세면 됨.
const MOD = 1_000_000_007;

function solution(m, n, puddles) {
  // memo[r][c] = (1,1)에서 (r,c)까지 오는 경로의 수
  const memo = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  //puddle은 col, row 순. -1로 표시해두고 나중에 0으로 확정.
  for (let puddle of puddles) {
    memo[puddle[1]][puddle[0]] = -1;
  }

  memo[1][1] = 1;

  for (let r = 1; r <= n; r++) {
    for (let c = 1; c <= m; c++) {
      if (memo[r][c] === -1) {
        memo[r][c] = 0; // 물에 잠긴 곳은 지나갈 수 없음
        continue;
      }
      if (r === 1 && c === 1) continue; // 출발점은 1로 고정

      // 위에서 내려오거나 왼쪽에서 오거나, 둘뿐
      memo[r][c] = (memo[r - 1][c] + memo[r][c - 1]) % MOD;
    }
  }

  return memo[n][m];
}
