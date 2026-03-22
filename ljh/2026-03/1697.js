const fs = require("fs");
const [N, K] = fs.readFileSync(0).toString().trim().split(" ").map(Number);

const queue = [[N, 0]];
const visited = Array.from({ length: 100000 + 1 }, () => 0);
let head = 0;

while (queue.length) {
  const [curPosition, curDepth] = queue[head++];

  if (visited[curPosition]) continue;
  visited[curPosition] = 1;

  if (curPosition === K) {
    console.log(curDepth);
    return;
  }

  // 한칸 앞으로
  if (curPosition + 1 <= 100000) {
    queue.push([curPosition + 1, curDepth + 1]);
  }

  //한칸 뒤로
  if (curPosition - 1 >= 0) {
    queue.push([curPosition - 1, curDepth + 1]);
  }

  //두칸 점프
  if (curPosition * 2 <= 100000) {
    queue.push([curPosition * 2, curDepth + 1]);
  }
}
