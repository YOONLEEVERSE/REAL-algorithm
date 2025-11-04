const [initialValue, instructionLength, ...instructions] = require("fs")
  //   .readFileSync("/dev/stdin") // 백준 제출시
  .readFileSync("./1406_input.txt")
  .toString()
  .trim()
  .split("\n");

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

const linkedEditor = new LinkedList();
let curNode = null;

// 초기화: tail을 활용한 append로 O(N)
Array.from(initialValue).forEach((char) => {
  const newNode = new Node(char);
  linkedEditor.append(newNode);
  curNode = newNode; // 커서를 맨 뒤로
});

for (let i = 0; i < Number(instructionLength); i++) {
  switch (instructions[i][0]) {
    case "L":
      // 커서를 왼쪽으로: curNode를 이전 노드로 이동
      if (curNode) {
        curNode = curNode.prev; // prev가 null이면 맨 앞으로 이동
      }
      break;
    case "D":
      // 커서를 오른쪽으로: curNode를 다음 노드로 이동
      if (curNode === null) {
        // 커서가 맨 앞일 때는 head로 이동
        curNode = linkedEditor.head;
      } else if (curNode.next) {
        curNode = curNode.next;
      }
      break;
    case "B":
      // 커서 왼쪽 문자 삭제: curNode를 삭제하고 이전 노드로 이동
      if (curNode) {
        const prevNode = curNode.prev;
        linkedEditor.delete(curNode);
        curNode = prevNode; // 이전 노드로 이동 (null이 될 수도 있음)
      }
      break;
    case "P":
      // 커서 왼쪽에 문자 추가
      const [, newValue] = instructions[i].split(" ");
      const newNode = new Node(newValue);

      if (curNode === null) {
        // 커서가 맨 앞에 있을 때
        if (linkedEditor.head) {
          newNode.next = linkedEditor.head;
          linkedEditor.head.prev = newNode;
          linkedEditor.head = newNode;
        } else {
          // 빈 리스트일 때
          linkedEditor.head = newNode;
          linkedEditor.tail = newNode;
        }
        linkedEditor.length += 1;
        curNode = newNode;
      } else {
        linkedEditor.insert(curNode, newNode);
        curNode = newNode; // 새로 삽입한 노드로 이동
      }
      break;
  }
}

let result = [];
let _ = linkedEditor.head;
while (_) {
  result.push(_.value);
  _ = _.next;
}
console.log(result.join(""));

//이거 또 설계안하고 해서 그렇구만.
