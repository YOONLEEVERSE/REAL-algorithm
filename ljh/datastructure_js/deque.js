```
deque = queue + stack
- 넣기 : 앞,뒤 둘 다 가능
- 빼기 : 앞, 뒤 둘 다 가능

- push_front, push_back, pop_front, pop_back, size, empty, front(출력만), back(출력만)
```;

class Deque {
  constructor() {
    this.deque = [];
  }

  get size() {
    return this.deque.length;
  }

  get empty() {
    return this.deque.length ? 0 : 1;
  }

  get front() {
    if (this.empty) {
      return -1;
    }
    return this.deque[0];
  }

  get back() {
    if (this.empty) {
      return -1;
    }
    return this.deque[this.size - 1];
  }

  push_front(x) {
    this.deque.splice(0, 0, x);
  }

  push_back(x) {
    this.deque.push(x);
  }

  pop_front() {
    if (this.empty) {
      return -1;
    }
    return this.deque.shift();
  }

  pop_back() {
    if (this.empty) {
      return -1;
    }
    return this.deque.pop();
  }
}
