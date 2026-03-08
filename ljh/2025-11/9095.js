//2시 30분 시작 - 2시 50분 종료

const [_, ...numbers] = require("fs")
  //   .readFileSync("/dev/stdin") // 백준 제출시
  .readFileSync("./9095_input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const maxNum = Math.max(...numbers);
const memo = new Array(maxNum + 1).fill(0);

// 초기값 설정
memo[0] = 1; // 0을 만드는 방법 (아무것도 선택 안함)
memo[1] = 1; // 1
memo[2] = 2; // 1+1, 2
memo[3] = 4; // 1+1+1, 1+2, 2+1, 3

// DP로 나머지 계산
for (let i = 4; i <= maxNum; i++) {
  memo[i] = memo[i - 1] + memo[i - 2] + memo[i - 3];
}

// 결과 출력
numbers.forEach((n) => console.log(memo[n]));
