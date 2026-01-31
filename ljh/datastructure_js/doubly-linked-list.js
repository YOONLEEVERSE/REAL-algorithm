class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null; // 이전 노드 참조 추가
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 끝에 추가 - O(1)
  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
    return this;
  }

  // 앞에 추가 - O(1)
  prepend(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.size++;
    return this;
  }

  // 특정 인덱스에 삽입 - O(n)
  insertAt(index, value) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) return this.prepend(value);
    if (index === this.size) return this.append(value);

    const newNode = new Node(value);

    // 중간 지점 기준으로 앞/뒤에서 탐색 (최적화)
    let current;
    if (index < this.size / 2) {
      // 앞에서부터 탐색
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      // 뒤에서부터 탐색
      current = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
    }

    // 삽입
    newNode.prev = current.prev;
    newNode.next = current;
    current.prev.next = newNode;
    current.prev = newNode;

    this.size++;
    return this;
  }

  // 값으로 삭제 (첫 번째 발견된 것만) - O(n)
  remove(value) {
    if (!this.head) return null;

    let current = this.head;

    while (current) {
      if (current.value === value) {
        // head 삭제
        if (current === this.head) {
          this.head = current.next;
          if (this.head) {
            this.head.prev = null;
          } else {
            this.tail = null;
          }
        }
        // tail 삭제
        else if (current === this.tail) {
          this.tail = current.prev;
          this.tail.next = null;
        }
        // 중간 노드 삭제
        else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
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

    let current;

    // 중간 지점 기준으로 앞/뒤에서 탐색
    if (index < this.size / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
    }

    const value = current.value;

    // head 삭제
    if (current === this.head) {
      this.head = current.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
    }
    // tail 삭제
    else if (current === this.tail) {
      this.tail = current.prev;
      this.tail.next = null;
    }
    // 중간 노드 삭제
    else {
      current.prev.next = current.next;
      current.next.prev = current.prev;
    }

    this.size--;
    return value;
  }

  // 끝에서 제거 (pop) - O(1) ⭐ 단방향과의 큰 차이!
  pop() {
    if (!this.tail) return null;

    const value = this.tail.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.size--;
    return value;
  }

  // 앞에서 제거 (shift) - O(1)
  shift() {
    if (!this.head) return null;

    const value = this.head.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.size--;
    return value;
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

  // 인덱스로 접근 - O(n), 하지만 양방향이라 최적화 가능
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    let current;

    // 중간 지점 기준으로 앞/뒤에서 탐색
    if (index < this.size / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
    }

    return current.value;
  }

  // 정방향 배열로 변환
  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  // 역방향 배열로 변환 ⭐ 양방향만 가능!
  toArrayReverse() {
    const result = [];
    let current = this.tail;

    while (current) {
      result.push(current.value);
      current = current.prev;
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
    return this.toArray().join(" <-> ");
  }

  // 역방향 출력
  toStringReverse() {
    return this.toArrayReverse().join(" <-> ");
  }
}

// 사용 예시
const list = new DoublyLinkedList();
list.append(1).append(2).append(3).append(4);
list.prepend(0);

console.log(list.toString()); // 0 <-> 1 <-> 2 <-> 3 <-> 4
console.log(list.toStringReverse()); // 4 <-> 3 <-> 2 <-> 1 <-> 0

console.log("Size:", list.size); // 5
console.log("Head:", list.head.value); // 0
console.log("Tail:", list.tail.value); // 4

// 양방향의 장점: tail에서 제거가 O(1)
console.log(list.pop()); // 4
console.log(list.pop()); // 3
console.log(list.toString()); // 0 <-> 1 <-> 2

// 중간 삽입도 더 빠름 (뒤쪽 인덱스면 tail부터 탐색)
list.insertAt(2, 99);
console.log(list.toString()); // 0 <-> 1 <-> 99 <-> 2
