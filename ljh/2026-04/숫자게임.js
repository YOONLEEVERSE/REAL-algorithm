/*
 * 1시 45분 시작
 * 2xN명의 사원들 => N명씩 두팀으로 나눔
 * 각 사원 ->  키 갖고 있음. 딱 한번 경기
 * 대결 방식 : 서로의 키 공유, 큰 쪽이 승점 얻음(+1)
 * A의 출전순서를 아는 상태 => B의 최대 승점을 구하시오
 */

function solution(A, B) {
  var answer = 0;

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b); //twopointer로 될 것 같기도 하고..?

  let idx = 0;

  for (let i = 0; i < A.length; i++) {
    // B의 인덱스를 upupup
    while (A[i] >= B[idx]) {
      idx++;
    }

    // 얘보다 큰애가 없다는 뜻이니까 얘는 영원히 이길 수 없음. 얘보다 큰 애도 마찬가지.
    if (idx === undefined || idx >= A.length) {
      return answer;
    }

    //이번 idx는 여기서 소비하므로 idx를 한 번 더 옮겨줘야 함.
    idx += 1;
    answer++;
  }

  return answer;
}
