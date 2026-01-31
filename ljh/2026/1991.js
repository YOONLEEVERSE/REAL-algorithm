const [nodeNum, ...nodes] = require("fs")
  //   .readFileSync("/dev/stdin") // 백준 제출시
  .readFileSync("./1991_input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 *
 * 트리 순회
 */

class Node {
  constructor(value = null) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(value, leftValue, rightValue) {
    if (!this.root) {
      const newNode = new Node(value);
      newNode.left = leftValue ? new Node(leftValue) : null;
      newNode.right = rightValue ? new Node(rightValue) : null;
      this.root = newNode;

      return;
    }

    const parent = this.search(this.root, value);

    if (parent) {
      parent.left = leftValue ? new Node(leftValue) : null;
      parent.right = rightValue ? new Node(rightValue) : null;
    }
  }

  search(node = this.root, value) {
    const current = node;

    if (!current) return null;

    if (current.value === value) return current;

    const leftSearch = this.search(current.left, value);
    if (leftSearch) return leftSearch;

    return this.search(current.right, value);
  }

  preorder(node = this.root, result = []) {
    if (!node) return result;

    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);

    return result;
  }

  inorder(node = this.root, result = []) {
    if (!node) return result;

    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);

    return result;
  }

  postorder(node = this.root, result = []) {
    if (!node) return result;

    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);

    return result;
  }
}

function main() {
  const tree = new Tree();

  for (let i = 0; i < nodeNum; i++) {
    const [value, leftValue, rightValue] = nodes[i].split(" ");
    tree.add(
      value,
      leftValue === "." ? null : leftValue,
      rightValue === "." ? null : rightValue,
    );
  }

  console.log(tree.preorder().join(""));
  console.log(tree.inorder().join(""));
  console.log(tree.postorder().join(""));
}

main();
