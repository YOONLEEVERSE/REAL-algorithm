/* 시작 : 4시 31분 */

function solution(N, number) {
  var answer = -1;
  const memo = Array.from({ length: 9 });

  let defaultNum = "";

  for (let i = 1; i <= 8; i++) {
    //N을 i개 썼을 때 => N , NN, NNN, NNNN
    defaultNum += N;

    const candidates = [parseInt(defaultNum)];

    for (let j = 1; j <= Math.floor(i / 2); j++) {
      for (let a of memo[j]) {
        for (let b of memo[i - j]) {
          candidates.push(a + b);
          candidates.push(a * b);
          candidates.push(a - b);
          candidates.push(b - a);
          if (a !== 0) candidates.push(Math.trunc(b / a));
          if (b !== 0) candidates.push(Math.trunc(a / b));
        }
      }
    }

    memo[i] = new Set(candidates);

    if (memo[i].has(number)) return i;
  }

  return answer;
}
