class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor(node) {
    this.head = node;
    this.tail = node; // tail 포인터 추가
    this.length = !!node ? 1 : 0;
  }

  append(newNode) {
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // tail을 활용해서 O(1)로 추가
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  // targetNode 뒤에 newNode 삽입 (노드 레퍼런스를 직접 사용)
  insert(targetNode, newNode) {
    const nextNode = targetNode.next;

    targetNode.next = newNode;
    newNode.prev = targetNode;
    newNode.next = nextNode;
    if (nextNode) {
      nextNode.prev = newNode;
    } else {
      // 맨 끝에 삽입하는 경우 tail 업데이트
      this.tail = newNode;
    }

    this.length += 1;
  }

  // 노드를 직접 삭제 (노드 레퍼런스를 직접 사용)
  delete(node) {
    if (!node) return;

    if (node === this.head) {
      this.head = node.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        // 리스트가 비어버린 경우
        this.tail = null;
      }
    } else {
      const prevNode = node.prev;
      const nextNode = node.next;

      if (prevNode) {
        prevNode.next = nextNode;
      }
      if (nextNode) {
        nextNode.prev = prevNode;
      } else {
        // 맨 끝 노드를 삭제하는 경우 tail 업데이트
        this.tail = prevNode;
      }
    }
    this.length -= 1;
  }
}
