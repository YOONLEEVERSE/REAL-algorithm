/**
 * 4시 3분 시작
 *
 * Z모양 ( [0,0] -> [1,0] -> [0,1] -> [1,1]  => 그 다음 값.. queue에 넣어야것네.
 * 4등분 후, 재귀적으로 순서대로 방문.
 * N이 주어졌을 때 r행 c열을 몇 번째로 방문하는지
 * 2^3 X 2^3
 *
 * 4등분으로 .. 나눔.
 * => 시작점을 차례로 queue에 넣음
 * => 나머지 visit처리하면서 ..? 처리할 필요 있나? 숫자만 세면 될 것 같은데. 단순 방문처리가 나으려나? 흠.
 * )
 */

/* 기존 코드 주석 처리 시작
const fs = require("fs");

const [N, r, c] = fs.readFileSync(0).toString().trim().split(" ").map(Number);

const sideLength = 2 ** N;
const halfOfSide = sideLength / 2;

const sectionStartPoint = [
  [0, 0],
  [0, halfOfSide],
  [halfOfSide, 0],
  [halfOfSide, halfOfSide],
];

let section = 1;

function isInSection(sectionNumber, position) {
  const startPoint = sectionStartPoint[sectionNumber - 1];
  const rowArea = [startPoint[0], startPoint[0] + halfOfSide - 1];
  const colArea = [startPoint[1], startPoint[1] + halfOfSide - 1];

  if (
    rowArea[0] <= position[0] &&
    position[0] <= rowArea[1] &&
    colArea[0] <= position[1] &&
    position[1] <= colArea[1]
  ) {
    return true;
  }

  return false;
}

while (section <= 4) {
  if (isInSection(section, [r, c])) break;

  section++;
}

const oneSectionCnt = halfOfSide ** 2;
let totalCnt = (section - 1) * oneSectionCnt;

const ZPathDirs = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
];

const curPosition = sectionStartPoint[section - 1];

function goZPath([curRow, curCol]) {
  for (let dir of ZPathDirs) {
    totalCnt += 1;
    if (curRow + dir[0] === r && curCol + dir[1]) return;
  }

  if (isInSection(section, [curRow, curCol + 2])) {
    goZPath([curRow, curCol + 2]);
  } else if (isInSection(section, [curRow + 2, curCol])) {
    goZPath([curRow + 2, curCol]);
  }
}

goZPath(curPosition);

console.log(totalCnt);
기존 코드 주석 처리 끝 */

// --- 수정된 분할 정복 코드 ---
const fs = require("fs");

// 입력을 읽어옵니다.
const input = fs.readFileSync(0).toString().trim();
if (!input) process.exit(0);

const [N, r, c] = input.split(" ").map(Number);

/**
 * @param {number} n 현재 사각형의 한 변의 길이를 결정하는 지수 (2^n)
 * @param {number} row 현재 사각형 내에서의 상대적인 행 위치
 * @param {number} col 현재 사각형 내에서의 상대적인 열 위치
 */
function solve(n, row, col) {
  // 기저 사례: n이 0이면 (1x1 칸이면) 더 이상 쪼갤 수 없으므로 0 반환
  if (n === 0) return 0;

  const half = 1 << (n - 1); // 2^(n-1), 즉 현재 영역의 절반 길이
  const area = half * half; // 한 사분면의 넓이 (건너뛸 때 더할 값)

  // 1사분면 (왼쪽 위)
  if (row < half && col < half) {
    return solve(n - 1, row, col);
  }
  // 2사분면 (오른쪽 위)
  if (row < half && col >= half) {
    // 1사분면의 넓이를 더하고, 2사분면으로 들어감 (col에서 절반을 뺌)
    return area + solve(n - 1, row, col - half);
  }
  // 3사분면 (왼쪽 아래)
  if (row >= half && col < half) {
    // 1, 2사분면의 넓이를 더하고, 3사분면으로 들어감 (row에서 절반을 뺌)
    return 2 * area + solve(n - 1, row - half, col);
  }
  // 4사분면 (오른쪽 아래)
  if (row >= half && col >= half) {
    // 1, 2, 3사분면의 넓이를 더하고, 4사분면으로 들어감 (row, col 모두 절반을 뺌)
    return 3 * area + solve(n - 1, row - half, col - half);
  }
}

console.log(solve(N, r, c));
