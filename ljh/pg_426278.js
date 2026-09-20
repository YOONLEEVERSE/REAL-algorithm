// 시작 시간 : 2026년 09월 20일 14시 55분 38초

/**
 * I {number} - insert number
 * D 1 큐에서 최댓값을 삭제합니다.
 * D -1 큐에서 최솟값을 삭제합니다.
 *
 * 모든 연산 처리, 큐가비어있으면 [0,0] 비어있지 않으면 [최댓값, 최솟값] return
 *
 */

class MaxHeap {
  heap = [];

  getMax() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  insert(n) {
    this.heap.push(n);

    this.shiftup(this.heap.length - 1); //맨 마지막 요소를 올바른 위치로 올려야 함.
  }

  //   remove(n) {
  //     const idx = heap.findIndex(idx);

  //     const lastItem = heap.pop();
  //     heap[idx] = lastItem;

  //     shiftup(idx);
  //     shiftdown(idx);
  //   }

  pop() {
    if (this.heap.length === 0) return;

    const max = this.heap[0];
    const lastItem = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = lastItem;

      this.shiftdown(0);
    }

    return max;
  }

  shiftup(currentIdx) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);

    if (this.heap[currentIdx]?.value > this.heap[parentIdx]?.value) {
      [this.heap[currentIdx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[currentIdx],
      ];

      this.shiftup(parentIdx);
    }
  }

  shiftdown(currentIdx) {
    const leftChildIdx = currentIdx * 2 + 1;
    const rightChildIdx = currentIdx * 2 + 2;

    if (leftChildIdx >= this.heap.length) return;

    const maxChildIdx =
      rightChildIdx >= this.heap.length ||
      this.heap[leftChildIdx].value > this.heap[rightChildIdx].value
        ? leftChildIdx
        : rightChildIdx;

    if (this.heap[currentIdx].value < this.heap[maxChildIdx].value) {
      [this.heap[currentIdx], this.heap[maxChildIdx]] = [
        this.heap[maxChildIdx],
        this.heap[currentIdx],
      ];

      this.shiftdown(maxChildIdx);
    }
  }
}

class MinHeap {
  heap = [];

  getMin() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  insert(n) {
    this.heap.push(n);

    this.shiftup(this.heap.length - 1); //맨 마지막 요소를 올바른 위치로 올려야 함.
  }

  //   remove(n) {
  //     const idx = heap.findIndex(idx);

  //     const lastItem = heap.pop();
  //     heap[idx] = lastItem;

  //     shiftup(idx);
  //     shiftdown(idx);
  //   }

  pop() {
    if (this.heap.length === 0) return;

    const min = this.heap[0];
    const lastItem = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = lastItem;

      this.shiftdown(0);
    }

    return min;
  }

  shiftup(currentIdx) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);

    if (this.heap[currentIdx]?.value < this.heap[parentIdx]?.value) {
      [this.heap[currentIdx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[currentIdx],
      ];

      this.shiftup(parentIdx);
    }
  }
  shiftdown(currentIdx) {
    const leftChildIdx = currentIdx * 2 + 1;
    const rightChildIdx = currentIdx * 2 + 2;

    if (leftChildIdx >= this.heap.length) return;

    const minChildIdx =
      rightChildIdx >= this.heap.length ||
      this.heap[leftChildIdx].value < this.heap[rightChildIdx].value
        ? leftChildIdx
        : rightChildIdx;

    if (this.heap[currentIdx].value > this.heap[minChildIdx].value) {
      [this.heap[currentIdx], this.heap[minChildIdx]] = [
        this.heap[minChildIdx],
        this.heap[currentIdx],
      ];

      this.shiftdown(minChildIdx);
    }
  }
}

function solution(operations) {
  const maxHeap = new MaxHeap();
  const minHeap = new MinHeap();
  const isRemoved = new Set();

  let autoIncreaseId = 0;

  const I = "I"; //insert

  for (let operation of operations) {
    const [instruction, number] = operation.split(" ");

    if (instruction === I) {
      const id = autoIncreaseId++;
      maxHeap.insert({ value: Number.parseInt(number), id });
      minHeap.insert({ value: Number.parseInt(number), id });
    } else {
      let removedId;

      if (number === "-1") {
        while (minHeap.size() && isRemoved.has(minHeap.getMin().id)) {
          minHeap.pop();
        }

        if (minHeap.size() === 0) continue;

        removedId = minHeap.getMin().id;
        minHeap.pop();
      }
      if (number === "1") {
        while (maxHeap.size() && isRemoved.has(maxHeap.getMax().id)) {
          maxHeap.pop();
        }

        if (maxHeap.size() === 0) continue;

        removedId = maxHeap.getMax().id;
        maxHeap.pop();
      }

      isRemoved.add(removedId);
    }
  }

  while (maxHeap.size() && isRemoved.has(maxHeap.getMax().id)) {
    maxHeap.pop();
  }

  while (minHeap.size() && isRemoved.has(minHeap.getMin().id)) {
    minHeap.pop();
  }

  if (maxHeap.size() === 0) return [0, 0];

  const max = maxHeap.getMax().value;
  const min = minHeap.getMin().value;

  return [max, min];
}

console.log(
  solution(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]),
);

console.log(
  solution([
    "I -45",
    "I 653",
    "D 1",
    "I -642",
    "I 45",
    "I 97",
    "D 1",
    "D -1",
    "I 333",
  ]),
);
