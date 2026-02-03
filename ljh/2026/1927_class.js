const input = require("fs")
  .readFileSync("./1927_input.txt")
  // .readFileSync("/dev/stdin") // 백준 제출시
  .toString()
  .trim()
  .split("\n");

class MinHeap {
  constructor() {
    this.heap = [0]; // 1-based index
  }

  // 삽입
  insert(value) {
    this.heap.push(value); // 마지막 노드에 새 값추가
    this.heapifyUp(); // 이제 얘의 위치를 잡아줘야함
  }

  // 삭제 (최솟값 반환)
  remove() {
    if (this.heap.length === 1) return 0;
    if (this.heap.length === 2) return this.heap.pop();

    const min = this.heap[1];
    this.heap[1] = this.heap.pop(); // pop : 마지막꺼 삭제 및 리턴. 제일 마지막 애(큰애)를 위로 올려서 다시 정렬함.
    this.heapifyDown();
    return min;
  }

  // 위로 올리면서 정렬
  heapifyUp() {
    let current = this.heap.length - 1;

    while (current > 1) {
      const parent = Math.floor(current / 2);

      if (this.heap[parent] <= this.heap[current]) break;

      // 교체
      const temp = this.heap[current];
      this.heap[current] = this.heap[parent];
      this.heap[parent] = temp;
      current = parent;
    }
  }

  // 아래로 내리면서 정렬
  heapifyDown() {
    let current = 1;
    const len = this.heap.length;

    // len => 마지막 node Index + 1임.
    while (current * 2 < len) {
      let smallest = current * 2; // 왼쪽자식

      // 오른쪽 자식이 존재하고, 오른쪽 자식이 왼쪽 자식보다 더 작으면
      if (smallest + 1 < len && this.heap[smallest + 1] < this.heap[smallest]) {
        smallest++;
      }

      // 현재 노드가 자식보다 작거나 같으면 종료
      if (this.heap[current] <= this.heap[smallest]) break;

      // 교체
      const temp = this.heap[current];
      this.heap[current] = this.heap[smallest];
      this.heap[smallest] = temp;
      current = smallest;
    }
  }
}

const n = +input[0];
const minHeap = new MinHeap();
const result = [];

for (let i = 1; i <= n; i++) {
  const x = +input[i];

  if (x === 0) {
    result.push(minHeap.remove());
  } else {
    minHeap.insert(x);
  }
}

console.log(result.join("\n"));
