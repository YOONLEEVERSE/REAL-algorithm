function solution(number, k) {
  var answer = "";
  // 해결책 > 만들어지는 string의 길이는 number.length-k. 앞자리 수가 클수록 커진다.
  // 맨 앞자리 / 두번째 자리 / ..../ number.length-k번째 자리 되도록 앞쪽에 큰 수가 오도록 배치.

  let i = 0;

  let tmp = [];
  while (i < number.length) {
    if (k === 0) return tmp.join("") + number.slice(i); // 여기 k가 미리 소진되어 , 뒤에게 남아있는 경우 생각해서 반환해야 함.

    // 중첩 루프지만 O(n²)이 아닌 O(n): 각 원소는 평생 push 1번, pop 1번만 가능.
    // inner loop는 tmp(공유 자원)를 소비하므로, 전체 실행에 걸친 pop 총합 ≤ n.
    // "중첩 루프 = O(n²)"는 inner loop가 매번 독립적으로 n번 실행될 때만 성립.
    while (k > 0 && tmp.length && tmp[tmp.length - 1] < number[i]) {
      tmp.pop();
      k -= 1;
    }
    tmp.push(number[i]);
    i += 1;
  }

  return tmp.slice(0, number.length - k).join("");
}

console.log(solution("1924", 2));
console.log(solution("1231234", 3));
console.log(solution("4177252841", 4));
console.log(solution("9999999999988", 2));
