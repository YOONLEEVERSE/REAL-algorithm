/** stack과 queue의 특징을 모두 갖는 자료구조 */
class Deque {
  constructor() {
    this.deque = [];
  }

  addFront(value) {
    //unshift: 배열의 맨 앞에 요소 추가
    this.deque.unshift(value);
  }

  addBack(value) {
    this.deque.push(value);
  }

  removeFront() {
    // shift: 배열의 맨 앞 요소 제거 및 반환
    return this.deque.shift();
  }

  removeBack() {
    return this.deque.pop();
  }

  front() {
    return this.deque[0];
  }

  rear() {
    return this.dewque[this.deque.length - 1];
  }

  isEmpty() {
    return this.deque.length === 0;
  }

  size() {
    return this.deque.length;
  }
}
