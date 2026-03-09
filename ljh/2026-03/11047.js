//6시 8분

// N 종류, 각각의 동전을 매우 많이 가지고 있음.
// K값.. => 무조건 큰걸로 땜빵채우는 게  최솟값은 아닐 수 잇음.

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

// k가 타입
const [n, k] = input[0].split(" ").map(Number);

const coinType = input.slice(1).map(Number);
// 이거 dp네
// n 만드는데

// 얼마만드는데 최소 몇개 들었습니당 ~!
const memo = Array.from({ length: k + 1 }, () => Infinity);

// coinType.forEach((type) => (memo[type] = 1)); // 동전타입이 있으므로 그 가격을 만들 수 있는 수단이 반드시 하나 있다.

// for (let i = 1; i <= k; i++) {
//   //   console.log("지금 만들 값 ", i);
//   let min = memo[i]; // i를 만드는데 드는 코인의 최소 갯수

//   //   console.log("검사 범위 : ", 1, "TO", Math.ceil(i / 2));
//   for (let j = 1; j <= Math.ceil(i / 2); j++) {
//     if (i - j < 1 || memo[j] === -1 || memo[i - j] === -1) {
//       continue;
//     }

//     let tmp = memo[j] + memo[i - j];
//     if (min === -1 || min > tmp) min = tmp;
//   }

//   memo[i] = min;
// }

// console.log(memo[k]);

memo[0] = 0; // 0원을 만드는 데 드는 동전은 0개

for (let coin of coinType) {
  // 동전 종류를 하나씩 꺼내서
  for (let i = coin; i <= k; i++) {
    // 그 동전으로 만들 수 있는 금액들을 업데이트
    if (memo[i - coin] !== Infinity) {
      memo[i] = Math.min(memo[i], memo[i - coin] + 1);
    }
  }
}

const result = memo[k] === Infinity ? -1 : memo[k];
console.log(result);
