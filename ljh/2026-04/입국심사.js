/**범위보고 그냥 반복문 쓰면 안되는 건 알았는데. . . 어따 써야 될 질 몰랐음
 *
 * '시간'에 초점을 두고 탐색하는 문제 << 이 부분을 파악하는 게 중요
 */

function solution(n, times) {
  var answer = 0;

  let startTime = Math.min(...times); //한 사람이라도 처리할 경우 걸리는 최소 시간
  let endTime = Math.max(...times) * n; //가장 오랜 시간 걸리는 심사관이 모든 사람을 맡았을 경우 소요 시간

  const binarySearch = (start, end) => {
    if (start > end) return answer;

    const mid = Math.floor((start + end) / 2); //mid분

    let passedPeopleNum = 0; //mid분까지 처리가능한 사람의 수

    for (let time of times) {
      passedPeopleNum += Math.floor(mid / time);
    }

    // 이 시간내엔 n명 처리 불가
    if (passedPeopleNum < n) {
      binarySearch(mid + 1, end);
    } else {
      answer = mid;
      binarySearch(start, mid - 1);
    }
  };

  binarySearch(startTime, endTime);

  return answer;
}

console.log(solution(6, [7, 10]));
