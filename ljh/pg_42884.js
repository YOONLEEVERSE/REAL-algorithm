// 시작 시간 : 2026년 09월 27일 22시 12분 44초

/**
 * 고속도로를 이동하는 모든 차량이 고속도로를 이용하면서 단속용 카메라를 한 번은 만나도록 카메라 설치.
 *
 * routes가 주어짐 > 모든 차량이 한 번은 카메라를 만나도록 설계. 그러려면 "최소한" 몇대의 카메라가 필요한가?
 */

// routes = Array([entry, exit])
// -30000 <= entry, exit <= 30000
function solution(routes) {
  let cnt = 0;
  let camera = -Infinity;

  // 가장 먼저 나가는 차량부터 확인한다.
  routes.sort((a, b) => a[1] - b[1]);
  console.log(routes);

  for (const [entry, exit] of routes) {
    // 진출 지점 순으로 정렬했으므로 camera <= exit는 항상 성립한다.
    // entry <= camera라면 기존 카메라를 만나므로 추가 설치가 필요 없다.
    if (entry > camera) {
      // 아직 감지되지 않은 차량의 진출 지점에 설치한다.
      // 최대한 뒤에 설치해야 뒤따르는 차량도 함께 감지할 수 있다.
      camera = exit;
      cnt++;
    }
  }

  return cnt;
}

console.log(
  solution([
    [-20, -15],
    [-14, -5],
    [-18, -13],
    [-5, -3],
  ]),
);
