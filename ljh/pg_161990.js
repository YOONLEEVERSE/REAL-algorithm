// 시작 시간 : 2026년 09월 15일 22시 59분 19초

/**
 * wallpaper -> 바탕화면 좌표
 * 빈캄 . 파일 있는 칸 #
 * 드래그 시 파일 선택 가능, 선택된 파일 삭제 가능
 *
 * '최소한의' 이동거리를 갖는 한 번의 드래그로 모든 파일을 선택해서 한 번에 지우려고 함.
 *
 *
 * 이건 그냥 좌표중에서 시작점 : (가장 높은 행, 가장 작은 열) -> (가장 낮은 행, 가장 큰 열)
 *
 */

function solution(wallpaper) {
  const maxRow = wallpaper.length,
    maxCol = wallpaper[0].length;

  // 시작점 x, y / 끝점 x , y

  let [lux, luy, rdx, rdy] = [maxCol, maxRow, 0, 0];

  for (let i = 0; i < maxRow; i++) {
    let hasFile = false;
    for (let j = 0; j < maxCol; j++) {
      //x는 j - j+1, y는 i - i+1 사이에 있는 파일 식별

      if (wallpaper[i][j] === "#") {
        if (lux > j) {
          lux = j;
        }

        if (rdx < j + 1) {
          rdx = j + 1;
        }

        hasFile = true;
      }
    }

    if (hasFile) {
      if (luy > i) luy = i;
      if (rdy < i + 1) rdy = i + 1;
    }
  }

  console.log(`결과 : (${luy},${lux}) - (${rdy},${rdx})`);

  return [luy, lux, rdy, rdx];
}

solution([".#...", "..#..", "...#."]);
solution([
  "..........",
  ".....#....",
  "......##..",
  "...##.....",
  "....#.....",
]);
solution([
  ".##...##.",
  "#..#.#..#",
  "#...#...#",
  ".#.....#.",
  "..#...#..",
  "...#.#...",
  "....#....",
]);
solution(["..", "#."]);
