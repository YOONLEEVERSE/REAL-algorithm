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

const PUSH_BACK = "push_back";
const PUSH_FRONT = "push_front";
const POP_BACK = "pop_back";
const POP_FRONT = "pop_front";
const FRONT = "front";
const BACK = "back";
const SIZE = "size";
const EMPTY = "empty";

const [len, ...instructions] = require("fs")
  //   .readFileSync("./10866_input.txt")
  .readFileSync("/dev/stdin") // 백준 제출시
  .toString()
  .trim()
  .split("\n");

const deque = new Deque();
const result = [];

for (let i = 0; i < Number(len); i++) {
  const [opcode, operand] = instructions[i].split(" ");

  switch (opcode) {
    case PUSH_BACK:
      deque.push_back(operand);
      break;
    case PUSH_FRONT:
      deque.push_front(operand);
      break;
    case POP_BACK:
      result.push(deque.pop_back());
      break;
    case POP_FRONT:
      result.push(deque.pop_front());
      break;
    case BACK:
      result.push(deque.back);
      break;
    case FRONT:
      result.push(deque.front);
      break;
    case SIZE:
      result.push(deque.size);
      break;
    case EMPTY:
      result.push(deque.empty);
      break;
  }
}

console.log(result.join("\n"));
