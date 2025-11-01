const [initialValue, instructionLength, ...instructions] = require("fs")
  //   .readFileSync("/dev/stdin") // 백준 제출시
  .readFileSync("./1406_input.txt")
  .toString()
  .trim()
  .split("\n");

let editor = initialValue;
let cursor = editor.length;

// for (let i = 0; i < Number(instructionLength); i++) {
//   console.log(editor);
//   switch (instructions[i][0]) {
//     case "L":
//       if (cursor > 1) cursor -= 1;
//       break;
//     case "D":
//       if (cursor < editor.length) cursor += 1;
//       break;
//     case "B":
//       editor = editor.substring(0, cursor) + editor.substring(cursor);
//       if (cursor > 1) cursor -= 1;
//       break;
//     case "P":
//       const [, newChar] = instructions[i].split(" ");
//       cursor += 1;
//       let tmp = Array.from(editor);
//       tmp.splice(cursor, 0, newChar);
//       editor = tmp.join("");
//       //   console.log("뽀뀨", instructions[i], newChar, Array.from(editor).splice
//       break;
//   }
// }
// console.log(":", editor);
// // console.log("editor", editor);

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
    this.length = !!node ? 1 : 0;
  }

  append(newNode) {
    if (!this.head) {
      this.head = newNode;
    } else {
      // 하나라도 있는경우
      // 마지막 노드를 찾아서 ( next가 null일 때까지) 그 노드의 next로 이 노드를 넣는다.
      let cur = this.head;
      while (cur.next) {
        cur = cur.next;
      }

      newNode.prev = cur;
      cur.next = newNode;
    }

    this.length += 1;
  }

  insert(targetNode, newNode) {
    if (!this.head) return;

    let cursor = this.head;
    while (cursor && cursor.value !== targetNode.value) {
      cursor = cursor.next;
    }

    if (cursor) {
      const nextNode = cursor.next;

      cursor.next = newNode;
      newNode.next = nextNode;
    }
  }

  delete(value) {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (this.head) {
        // ← 이 체크 추가!
        this.head.prev = null;
      }
    } else {
      let cur = this.head; // ← let 추가!
      while (cur && cur.value !== value) {
        // ← cur && 추가!
        cur = cur.next;
      }

      if (!cur) return;

      let prevNode = cur.prev;
      let nextNode = cur.next;

      prevNode.next = nextNode;
      if (nextNode) {
        // ← 이 체크 추가!
        nextNode.prev = prevNode;
      }
    }
    this.length -= 1;
  }
}

const linkedEditor = new LinkedList();
let curNode = null;

Array.from(initialValue).forEach((element) => {
  const newNode = new Node(element);
  linkedEditor.append(newNode);
  curNode = newNode;
});

for (let i = 0; i < Number(instructionLength); i++) {
  switch (instructions[i][0]) {
    case "L":
      if (curNode.prev) curNode = curNode.prev;
      break;
    case "D":
      if (curNode.next) curNode = curNode.next;
      break;
    case "B":
      linkedEditor.delete(curNode.value);
      break;
    case "P":
      const [, newValue] = instructions[i].split(" ");
      linkedEditor.insert(curNode, new Node(newValue));
      break;
  }
}

let _ = linkedEditor.head;
while (_.next) {
  console.log(_.value);
  _ = _.next;
}

//이거 또 설계안하고 해서 그렇구만.
