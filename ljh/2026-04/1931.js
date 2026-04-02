/** 시작 : 9시 23분
 * 한 개의 회의실. <- N개의 회의를 여기서 해야 함.
 * 각 회의 I 의 시작시간(startTime) ~ 종료시간(endTime)
 * 회의 겹치지 않게 하면서 회의실 사용할 수 있는 회의의 최대 갯수를 찾아보자.
 * I(n-1)의 endTime과 I(n)의 startTime이 같아도 무방함.
 *
 *
 * 회의 종료시간(t) 기준으로 정렬.
 * t까지의 시간에 가능한 많은 회의를 꾸역꾸역 넣어야 됨 > greedy
 */

const fs = require("fs");
const inputs = fs.readFileSync(0).toString().trim().split("\n");

const n = Number(inputs[0]);
inputs.shift();
const numbers = inputs.map((input) => input.split(" ").map(Number));

numbers.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

// console.log(numbers);

let lastIdx = 0;
let cnt = 1;

for (let i = 1; i < n; i++) {
  const [, prevEndTime] = numbers[lastIdx];
  const [startTime] = numbers[i];

  if (startTime < prevEndTime) {
    continue;
  }

  lastIdx = i;
  cnt++;
}

console.log(cnt);
