// n과 k
// 9시 10분즘 시작

let stack = [];
let result = null;
let order = 0;
let permutation = null;

const dfs = (k) => (leftNumbers) => {
  if (!leftNumbers.length) {
    if (++order === k) {
      result = [...stack];
      stack = [];
      return;
    }
  } else {
    for (let item of leftNumbers) {
      stack.push(item);
      permutation(leftNumbers.filter((n) => n !== item));
      stack.pop();
    }
  }
};

function solution(n, k) {
  permutation = dfs(k);
  permutation(Array.from({ length: n }, (_, idx) => idx + 1));
  return result;
}

console.log(solution(3, 5));

// 팩토리알 수 체계 풀이
function solution2(n, k) {
  const left = Array.from({ length: n }, (_, i) => i + 1);
  const answer = [];
  let remaining = BigInt(k) - 1n;

  const factorial = (num) => {
    let f = 1n;
    for (let i = 2n; i <= BigInt(num); i++) f *= i;
    return f;
  };

  for (let i = n - 1; i >= 0; i--) {
    const fact = factorial(i);
    const idx = Number(remaining / fact);
    answer.push(left[idx]);
    left.splice(idx, 1);
    remaining %= fact;
  }

  return answer;
}

console.log(solution2(3, 5));
