// 1시 43분 시작
// 0.25초 -> 이건 그럼.. 그 머시기냐 연산 횟수가 중요한 것임니다 ~!

// 피보나치가 뭐였지 기억이 안나넴; ㅎㅎ.

//1시 55분 시작
/**
 * fibo(3) = fibo(2)+fibo(1)
 *         = fibo(1) + fibo(0) + fibo(1) => fibo(1), 2번호출, fibo 1은 1번 호출
 * 1,0의 조합이 될때까지 반복됨.
 *
 *
 * 7 => 6+5 => 5+4 + 4+ 3 => 4+3+3+2+3+2+2+1 => 3+2+2+1+2+1+1+0+
 * 흠 f(0)과 f(1)이 각 몇 번 호출되었느냐.. 공식이 있긴 할텐데요.
 *
 */

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n").map(Number);

const rowNum = input[0];

const fiboCall = [
  [1, 0],
  [0, 1],
];

const result = [];

const calculateFiboCall = (to) => {
  const lastIdx = fiboCall.length - 1;
  for (let i = lastIdx; i < to; i++) {
    fiboCall.push([
      fiboCall[i][0] + fiboCall[i - 1][0],
      fiboCall[i][1] + fiboCall[i - 1][1],
    ]);
  }
};

for (let i = 1; i <= rowNum; i++) {
  const target = input[i];
  if (target >= fiboCall.length) {
    calculateFiboCall(target);
  }

  result.push(fiboCall[target]);
}

console.log(result.map((item) => item.join(" ")).join("\n"));
//return 0이 출력되는 횟수, 1이 출력되는 횟수
