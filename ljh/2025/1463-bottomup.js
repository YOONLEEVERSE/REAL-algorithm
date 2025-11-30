const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = parseInt(input);
/*
* Bottom-up 방식 풀이법
* */

// DP 배열 초기화, dp[i] === 숫자 i를 1로 만들기 위한 최소 연산 횟수
const dp = new Array(N + 1).fill(0);

for (let i = 2; i <= N; i++) {
    // 1을 빼는 경우, 일단 이 경우로 초기화
    dp[i] = dp[i - 1] + 1;

    // 2로 나누어떨어지는 경우, 2로 나누는 게 더 횟수가 적으면 이 값으로 갱신
    if (i % 2 === 0) {
        dp[i] = Math.min(dp[i], dp[i / 2] + 1);// 만약 i가 4라고 치면 2로 연산하는데 드는 최소 횟수(dp[2]) + 현재 연산(*2) 1번해서 +1할 때보다 최소 연산인지 확인해 봄
    }

    // 3으로 나누어떨어지는 경우, 3으로 나누는 게 더 횟수가 적으면 이 값으로 갱신
    if (i % 3 === 0) {
        dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    }
}

console.log(dp[N]);

```예시 (N=10):
- dp[1] = 0
- dp[2] = 1 (2 → 1)
- dp[3] = 1 (3 → 1)
- dp[4] = 2 (4 → 2 → 1)
- dp[5] = 3 (5 → 4 → 2 → 1)
- ...
- dp[10] = 3 (10 → 9 → 3 → 1)

시간 복잡도: O(N)공간 복잡도: O(N)```