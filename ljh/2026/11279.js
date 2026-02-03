class MaxHeap {
  constructor() {
    this.heap = [0];
  }

  pop() {
    // heap이 비었음
    if (this.heap.length === 1) return 0;

    // node가 하나뿐임
    if (this.heap.length === 2) return this.heap.pop();

    const max = this.heap[1];
    this.heap[1] = this.heap.pop(); //마지막 요소 꺼내서 위로 올림
    this.heapifyDown();

    return max;
  }

  add(value) {
    this.heap.push(value);

    this.heapifyUp();
  }

  // index === 1 : root
  heapifyDown(index = 1) {
    // 내가 부모임.
    let childIdx = index * 2;

    if (childIdx >= this.heap.length) return;

    if (
      this.heap[childIdx + 1] &&
      this.heap[childIdx] < this.heap[childIdx + 1]
    ) {
      childIdx += 1;
    }

    // 부모와 자식 크기 비교
    if (this.heap[index] < this.heap[childIdx]) {
      const tmp = this.heap[index];
      this.heap[index] = this.heap[childIdx];
      this.heap[childIdx] = tmp;

      this.heapifyDown(childIdx);
    }
  }

  // index === this.heap.length
  heapifyUp(index) {
    const currentIdx = index ?? this.heap.length - 1;
    const parentIdx = Math.floor(currentIdx / 2);

    if (currentIdx <= 0 || parentIdx <= 0) return;

    //부모가 나보다 작으면 서로 바꿔야 함.
    if (this.heap[currentIdx] > this.heap[parentIdx]) {
      const tmp = this.heap[currentIdx];
      this.heap[currentIdx] = this.heap[parentIdx];
      this.heap[parentIdx] = tmp;
      this.heapifyUp(parentIdx);
    }
  }
}

function main() {
  const maxHeap = new MaxHeap();
  const result = [];
  const [times, ...numbers] = require("fs")
    .readFileSync("./11279_input.txt")
    .toString()
    .trim()
    .split("\n")
    .map(Number);

  for (let t = 0; t < times; t++) {
    const current = numbers[t];

    if (current === 0) {
      result.push(maxHeap.pop());
    } else maxHeap.add(current);
  }

  console.log(result.join("\n"));
}

main();
