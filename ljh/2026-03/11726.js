// 6시 35분 시작

const fs = require("fs");
const n = Number(fs.readFileSync(0).toString().trim());

/**2xn 사이즈를 1x2, 2x1로 채우는 방법의 수를 구하시오.
 *
 * 1x2는 얼마든지 사용 가능 m개
 * 2x1는 세트로 사용 해야함 2xk개
 * 가로사이즈가 핵심임.
 */

// m=1*2 타일의 개수. k = 2*1 타일의 개수
// k의 범위 = 0개~ Math.floor(n/2)
// 0개를 배치하는 법  => 1 1개를 배치하는 법 =>

let result = 0n;
for (let k = 0; k <= Math.floor(n / 2); k++) {
  let top = 1n;
  let bottom = 1n;

  for (let j = 0; j < k; j++) {
    top *= BigInt(n - k - j);
    bottom *= BigInt(k - j);
  }

  result += top / bottom;
}

console.log((result % 10007n).toString());
