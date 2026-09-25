// 시작 시간 : 2026년 09월 25일 23시 14분 35초

function solution(order) {
  let increaseNum = 1;

  let cnt = 0;

  const stack = [];

  for (let targetNumber of order) {
    while (increaseNum < targetNumber) {
      stack.push(increaseNum++);
    }

    if (increaseNum === targetNumber) {
      cnt += 1;
      increaseNum++;
    } else if (stack.at(-1) === targetNumber) {
      cnt += 1;
      stack.pop();
    } else {
      return cnt;
    }
  }

  return cnt;
}

console.log(solution([4, 3, 1, 2, 5]));
console.log(solution([5, 4, 3, 2, 1]));
