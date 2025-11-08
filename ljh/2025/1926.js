// ```
// 시작시간 : 12시 34분 종료시간 : 12시 58분
// 소요시간 24분
// ```;

const [size, ...datas] = require("fs")
  //   .readFileSync("/dev/stdin") // 백준 제출시
  .readFileSync("./1926.txt")
  .toString()
  .trim()
  .split("\n");

const [rows, cols] = size.split(" ").map(Number);

const maps = datas.map((data) => data.split(" ").map(Number));
const visited = Array.from({ length: rows }).map((_) =>
  Array.from({ length: cols }).map((_) => false)
);

let number = 0;
let largest_area = 0;

const LEFT = [0, -1];
const RIGHT = [0, 1];
const TOP = [-1, 0];
const BOTTOM = [1, 0];

const PATH = [TOP, RIGHT, BOTTOM, LEFT];

function isValidArea(y, x) {
  return 0 <= x && x < cols && 0 <= y && y < rows;
}
function find(y, x) {
  //   console.log("CURRENT PATH", y, "번째 줄", x, "번째 열");
  if (!isValidArea(y, x)) return 0;

  if (maps[y][x] === 0) return 0;

  if (visited[y][x]) return 0;

  visited[y][x] = true;

  let area = 1;
  PATH.forEach((path) => {
    area += find(y + path[0], x + path[1]);
  });

  return area;
}

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (!visited[r][c]) {
      const current_size = find(r, c);
      if (current_size > 0) number += 1;
      largest_area = current_size > largest_area ? current_size : largest_area;
    }
  }
}

console.log(number);
console.log(largest_area);
