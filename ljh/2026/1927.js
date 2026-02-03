const input = require("fs")
  .readFileSync("./1927_input.txt")
  // .readFileSync("/dev/stdin") // 백준 제출시
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const heap = [0]; // 1-based index로 구현 (부모/자식 계산 쉬움)
const result = [];

// heapify down
function heapifyDown() {
  let current = 1;
  const len = heap.length;

  while (current * 2 < len) {
    let smallest = current * 2;

    // 오른쪽 자식이 존재하고 더 작으면
    if (smallest + 1 < len && heap[smallest + 1] < heap[smallest]) {
      smallest++;
    }

    // 현재 노드가 자식보다 작거나 같으면 종료
    if (heap[current] <= heap[smallest]) break;

    // 교체
    const temp = heap[current];
    heap[current] = heap[smallest];
    heap[smallest] = temp;
    current = smallest;
  }
}

// heapify up
function heapifyUp() {
  let current = heap.length - 1;

  while (current > 1) {
    const parent = Math.floor(current / 2);

    // 부모가 현재보다 작거나 같으면 종료
    if (heap[parent] <= heap[current]) break;

    // 교체
    const temp = heap[current];
    heap[current] = heap[parent];
    heap[parent] = temp;
    current = parent;
  }
}

// 삽입
function insert(value) {
  heap.push(value);
  heapifyUp();
}

// 삭제
function remove() {
  if (heap.length === 1) return 0;
  if (heap.length === 2) return heap.pop();

  const min = heap[1];
  heap[1] = heap.pop();
  heapifyDown();
  return min;
}

for (let i = 1; i <= n; i++) {
  const x = +input[i];

  if (x === 0) {
    result.push(remove());
  } else {
    insert(x);
  }
}

console.log(result.join("\n"));
