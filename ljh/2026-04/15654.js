/** 시작 1시 15분
 * m = 길이
 * n개의 자연수가 주어질거임.  n개.. 라고 함음. 정렬되어서 오는건가?
 */

const fs = require("fs");
const inputs = fs.readFileSync(0).toString().trim().split("\n");

const [n, m] = inputs[0].split(" ").map(Number);
const numbers = inputs[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b); // 정렬이 안돼서 옴

const stack = [];
const result = [];
const visited = new Array(n).fill(false);

const solution = (depth) => {
  if (depth === m) {
    result.push(stack.join(" "));
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue; // 가지치기: 이미 선택한 인덱스는 건너뜀 (O(1))

    // 백트래킹 핵심: 선택 → 탐색 → 선택 취소
    // stack.pop()과 visited[i]=false를 세트로 묶어야 함
    // 기존 코드는 visited 없이 stack.includes()로 체크했는데,
    // 이건 O(M) 탐색인데다 값이 중복일 경우 다른 인덱스도 잘못 막아버리는 버그가 있음
    visited[i] = true;
    stack.push(numbers[i]);

    solution(depth + 1);

    visited[i] = false; // 되돌아올 때 반드시 해제 → 다음 경로에서 재사용 가능
    stack.pop();
  }
};

solution(0);

console.log(result.join("\n"));
