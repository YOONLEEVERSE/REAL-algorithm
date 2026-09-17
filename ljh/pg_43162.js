// 시작 시간 : 2026년 09월 17일 18시 11분 48초

/** 네트워크 -> 옆 노드 통해서라도 연결돼있으면 그건 한 네트워크
 *
 * 네트워크 = 묶여있는 애들의 개수. 를 return
 *    i. j.  k
 * i [1, 1, 0 ]
 * j.|.  1,
 * k
 *
 * 위쪽 삼각형만 보거나 아래쪽삼각형 보면 됨.
 * 나는 아래쪽 삼각형만 봐야징..
 *
 * graph root개수를 count하면 됨
 *
 * 1로 출발해서 연결돼있는 애들을 다 묶음(dfs) => 하나의 네트워크 성공
 * 이제 또 쭉-봄 네트워크 못 찾아준 애들 -> 어 얘부터 출발 -> 네트워크 개수 cnt++, 방문 표시
 *
 */

function solution(n, computers) {
  var answer = 0;

  const isVisited = Array.from({ length: n }, () => false);
  const stack = [];

  function dfs(computerNum) {
    stack.push(computerNum);
    isVisited[computerNum] = true;

    for (let i = 0; i < n; i++) {
      if (!isVisited[i] && computers[computerNum][i] === 1) dfs(i);
    }

    stack.pop();
    //현재 타겟을 stack에 넣는다.
    // 그 stack의 친구들을 stack에 넣는다.
    // dfs이므로 stack에서 해당 아이템을 뺀다.
  }

  for (let i = 0; i < n; i++) {
    console.log("ISVISITED?", isVisited);
    if (!isVisited[i]) {
      answer += 1;
      dfs(i);
    }
  }

  return answer;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ]),
);

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ]),
);
