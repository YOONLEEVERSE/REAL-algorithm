/** 시작 : 3:22 */

// 하드디스크 -> 한번에 하나의 잡.
// 대기 큐 : 작업 번호, 작업 요청 시각, 작업 소요 시간 저장

// 작업 기준 : 작업X, 대기 큐가 있다면 => 우선순위 높은 작업을 대기 큐에서 꺼내서 하드디스크에서 작업
// 일단 대기 큐 쌓고, 우선순위 높은 순으로 작업하는 겉 같음.
// 우선순위 : 작업 소요시간 짧은 것, 작업 요청 시각이 빠른 것, 작업의 번호가 작은 것.

const MaxHeap = () => {
  let heap = [];

  const add = (job) => {
    heap.push(job);
    heapifyUp();

    console.log("ADD 후", heap);
  };

  const pop = () => {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();

    const highestPriorityJob = heap[0];
    heap[0] = heap.pop(); // 마지막 요소를 루트로 이동
    heapifyDown(0);

    return highestPriorityJob;

    //0번 꺼내고 이제 재정렬
  };

  // -> 순서, 요청 들어온 시간, 소요시간 순
  const isHigherPriority = (a, b) => {
    if (a[2] !== b[2]) return a[2] < b[2]; // 소요시간이 짧은 것
    if (a[1] !== b[1]) return a[1] < b[1]; //요청 시각이 빠른 것
    return a[0] < b[0]; // 작업 번호가 작은 것
  };

  const heapifyUp = () => {
    // 부모보다 내 우선순위가 높으면 자리 switch -> 부모 인덱스가 0일 때까지 반복하면 됩니두.
    let idx = heap.length - 1;
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);

      if (isHigherPriority(heap[parent], heap[idx])) break;

      [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
      idx = parent;
    }
  };

  const heapifyDown = (idx) => {
    const length = heap.length;

    while (true) {
      // 자식이랑 비교하고 내가 우선순위 더 낮으면 서로 자리 바꿈
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let higherPriorityIdx = idx;

      // 근데 자식 둘 중 누가 더 큰지 비교하고 걔랑 바꿀거임
      if (
        left < length &&
        isHigherPriority(heap[left], heap[higherPriorityIdx])
      ) {
        higherPriorityIdx = left;
      }

      if (
        right < length &&
        isHigherPriority(heap[right], heap[higherPriorityIdx])
      ) {
        higherPriorityIdx = right;
      }

      if (higherPriorityIdx === idx) break; //내가 자식보다 우선순위 높음 = 내 자리 찾았으므로 종료

      //위치 서로 바꿈
      [heap[idx], heap[higherPriorityIdx]] = [
        heap[higherPriorityIdx],
        heap[idx],
      ];
      idx = higherPriorityIdx;
    }
  };

  const size = () => {
    return heap.length;
  };

  return {
    heap,
    pop,
    add,
    size,
  };
};

//jobs => [요청 시각, 처리시간]
function solution(jobs) {
  let sumOfSpendTime = 0;

  jobs.sort((a, b) => a[0] - b[0]);
  const heap = MaxHeap();
  let jobIdx = 0;
  let curTime = 0;

  //jobs는 500개까지 가능. s는 작업이 요청되는 시점 -> 1000초까지 가능. 소요 시간 1000초까지가
  while (jobIdx < jobs.length || heap.size()) {
    // <= 대신 < 사용
    // 1. 현재 시간까지 도착한 작업을 모두 힙에 넣음
    while (jobIdx < jobs.length && jobs[jobIdx][0] <= curTime) {
      heap.add([jobIdx, ...jobs[jobIdx++]]);
    }

    if (heap.size()) {
      // 2. 작업 처리
      const job = heap.pop();
      curTime += job[2];
      sumOfSpendTime += curTime - job[1];
    } else {
      // 3. 힙이 비어있다면 다음 작업이 올 때까지 시간을 건너뜀 (무한 루프 방지)
      if (jobIdx < jobs.length) {
        curTime = jobs[jobIdx][0];
      }
    }
  }
  console.log(Math.floor(sumOfSpendTime / jobs.length));
}

console.log(
  solution([
    [0, 3],
    [1, 9],
    [3, 5],
  ]),
);
