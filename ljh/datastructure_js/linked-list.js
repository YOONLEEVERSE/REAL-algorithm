/** 단방향 방향 리스트 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 끝에 추가
  append(value) {
    const newNode = new Node(value);

    //리스트가 비어있는 경우
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
    return this;
  }

  // 앞에 추가
  prepend(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.size++;
    return this;
  }

  // 중간에 Node 넣기
  insertAt(index, value) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      return this.prepend(value);
    }

    if (index === this.size) {
      return this.append(value);
    }

    const newNode = new Node(value);

    let target = this.head;

    for (let i = 0; i < index - 1; i++) {
      target = target.next;
    }

    newNode.next = target.next;
    target.next = newNode;
    this.size++;
    return this;
  }

  // 값으로 삭제 (첫 번째 발견된 것만) - O(n)
  remove(value) {
    if (!this.head) return null;

    // head가 삭제 대상인 경우
    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.size--;
      return value;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        const removedNode = current.next;
        current.next = current.next.next;

        // 삭제된 노드가 tail이었다면 tail 업데이트
        if (removedNode === this.tail) {
          this.tail = current;
        }

        this.size--;
        return value;
      }
      current = current.next;
    }

    return null;
  }

  // 인덱스로 삭제 - O(n)
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      const value = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.size--;
      return value;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    const removedValue = current.next.value;
    current.next = current.next.next;

    // 마지막 노드를 삭제한 경우 tail 업데이트
    if (!current.next) {
      this.tail = current;
    }

    this.size--;
    return removedValue;
  }

  // 값 찾기 - O(n)
  find(value) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) {
        return { value: current.value, index };
      }
      current = current.next;
      index++;
    }

    return null;
  }

  // 인덱스로 접근 - O(n)
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current.value;
  }

  // 리스트를 배열로 변환
  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  // 리스트 비우기
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 출력용
  toString() {
    return this.toArray().join(" -> ");
  }
}
