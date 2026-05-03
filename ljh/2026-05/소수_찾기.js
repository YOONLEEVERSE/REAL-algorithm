function solution(numbers) {
  const isPrime = Array.from({ length: 10 ** numbers.length }, () => true);
  for (let i = 2; i < isPrime.length; i++) {
    if (isPrime[i]) {
      let multiple = 2;
      while (i * multiple <= isPrime.length) {
        isPrime[i * multiple++] = false;
      }
    }
  } // numbers length만큼의 소수는 다 구해둔 상태

  var answer = 0;
  const countCharactor = (string) => {
    return Array.from(string).reduce((acc, cur) => {
      acc.set(cur, acc.get(cur) ? acc.get(cur) + 1 : 1);
      return acc;
    }, new Map());
  };

  const numberCnt = countCharactor(numbers);

  for (let i = 2; i < isPrime.length; i++) {
    if (!isPrime[i]) continue;
    const targetCharCnt = countCharactor(`${i}`);

    let canMake = true;
    for (let [key, value] of targetCharCnt) {
      if (!numberCnt.has(key) || numberCnt.get(key) < value) {
        canMake = false;
        break;
      }
    }
    if (canMake) answer++;
  }

  return answer;
}
