class Queue {
  constructor() {
    this.queue = [];
  }

  // 1. enqueue(value) : 큐의 맨 뒤에 요소를 추가하는 메서드
  enqueue(value) {
    this.queue.push(value);
  }
  // 2. dequeue() : 큐의 맨 앞 요소를 제거하고 반환하는 메서드
  dequeue() {
    this.queue.shift();
  }

  // 3. front() : 큐의 맨 앞 요소를 반환하는 메서드
  front() {
    return this.queue[0];
  }
  // 4. rear() : 큐의 맨 뒤 요소를 반환하는 메서드
  rear() {
    return this.queue[this.queue.length - 1];
  }
  // 5. isEmpty() : 큐가 비어 있는지 확인하는 메서드
  isEmpty() {
    return this.queue.length === 0;
  }
  // 6. size() : 큐에 포함된 요소 개수를 반환하는 메서드
  size() {
    return this.queue.length;
  }
}
