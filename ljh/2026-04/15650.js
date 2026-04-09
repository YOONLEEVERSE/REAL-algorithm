const fs = require("fs");

const [n, m] = fs.readFileSync(0).toString().trim().split(" ").map(Number);

// value 쌍으로 저장
let stack = [];
const result = [];

const solution = (startValue, depth) => {
  if (depth === m) {
    result.push(stack.join(" "));
  } else {
    if (depth + 1 > m) return;

    for (let i = startValue + 1; i <= n; i++) {
      stack.push(i);
      solution(i, depth + 1);
    }
  }
  stack.pop();
};

for (let i = 1; i <= n - m + 1; i++) {
  stack.push(i);
  solution(i, 1);
  stack = [];
}

console.log(result.join("\n"));

/** 좀 더 깔끔한 버전은 아래 */

const solution2 = (value, depth) => {
  if (depth === m) {
    result.push(stack.join(" "));
    // depth가 m인 경우, 더 이상 자식 노드를 탐색하지 않으므로 stack에 넣지 않고 함수 실행을 종료함.
    return;
  }

  // 동일한 숫자는 사용 불가. 고로 사용 가능한 숫자는 현재 숫자 다음부터 N까지.
  for (let i = value + 1; i <= n; i++) {
    stack.push(i);
    solution2(i, cnt + 1);
    // 해당 노드에 대한 탐색이 끝났으므로 stack에서 빼줌.
    stack.pop();
  }
};

solution2(0, 0); // 이래야 m으로 1을 입력받았을 때도 복잡한 절차없이 단순하게 처리됨.
