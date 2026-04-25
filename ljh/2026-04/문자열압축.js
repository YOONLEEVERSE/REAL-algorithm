/* 시작 2시 15분 종료 2시 43분

마지막 막혔던 점
1. 압축 횟수의 자릿수 처리: if (cur.cnt > 1) acc++; 부분에서 압축 횟수가 10회 이상(예: 10a, 100a)일 경우 자릿수를 제대로 반영하지 못합니다. String(cur.cnt).length를 더해주어야 합니다.
2. 문자열 길이가 1인 경우: s.length가 1이면 maxLength가 0이 되어 반복문이 아예 실행되지 않고 answer가 Infinity로 반환됩니다. (프로그래머스 테스트 케이스 5번 등이 이에 해당할 수 있습니다.)

*/
function solution(s) {
  let answer = Infinity;
  const maxLength = Math.floor(s.length / 2) > 1 ? Math.floor(s.length / 2) : 1;

  for (let i = maxLength; i >= 1; i--) {
    const stack = [];
    let isCompressed = false;

    for (let j = 0; j < s.length; j += i) {
      const cur = s.slice(j, j + i);
      if (stack.length && stack[stack.length - 1].word === cur) {
        stack[stack.length - 1].cnt += 1;
        isCompressed = true;
      } else {
        stack.push({ word: cur, cnt: 1 });
      }
    }

    let tmpAnswer;
    if (isCompressed) {
      tmpAnswer = stack.reduce((acc, cur) => {
        if (cur.cnt > 1) {
          acc += `${cur.cnt}`.length;
        }
        acc += cur.word.length;

        return acc;
      }, 0);
    } else tmpAnswer = s.length;

    if (answer > tmpAnswer) answer = tmpAnswer;
    // 여기서 길이가 정해지면 그거 바로 리턴해버리면 됨.
  }

  return answer;
}

console.log(solution("aabbaccc")); //7
console.log(solution("ababcdcdababcdcd")); // 9
console.log(solution("abcabcdede")); //8
console.log(solution("abcabcabcabcdededededede")); //14
console.log(solution("xababcdcdababcdcd")); //17
