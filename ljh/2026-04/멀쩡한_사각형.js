/** 2차 시작 3시 18분 */
function solution(w, h) {
  let cnt = 0;

  let prevX = 0; //x,y
  for (let y = 1; y <= h; y++) {
    const x = (w * y) / h;

    cnt += Math.ceil(x) - prevX;

    prevX = Math.floor(x);
  }

  // JavaScript Number의 안전한 정수 범위는 Number.MAX_SAFE_INTEGER = 2^53 - 1 ≈ 9 × 10^15
  return Number(BigInt(w) * BigInt(h)) - cnt;
}

console.log(solution(8, 12));

/**
 * 공식을 이용하면 아래처럼 풀 수 있음.
 *   function solution(w, h) {
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
    return w * h - (w + h - gcd(w, h));
  }
 */
