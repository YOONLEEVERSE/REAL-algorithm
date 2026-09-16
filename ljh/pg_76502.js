// 시작 시간 : 2026년 09월 16일 21시 25분 07초

/**
 *(), [], {} 쌍을 지키면 올바른 괄호 문자열

 중첩 가능

 A , B가 올바른 괄호 문자일 ㄱㅕㅇ우
 B(A), AB 이것도 다 올바른 문자열

 s를 왼쪽으로 x칸만큼 회전시켰을 때s가 올바른 괄호 문자열이 되게 하는 x의 개수

 0<=x<=s길이
 */

const openingBrackets = new Set(["(", "[", "{"]);
const matchingOpeningBracket = {
  ")": "(",
  "]": "[",
  "}": "{",
};

function isCorrectBrackets(brackets) {
  const stack = [];

  for (const bracket of brackets) {
    if (openingBrackets.has(bracket)) {
      stack.push(bracket);
      continue;
    }

    if (stack.at(-1) !== matchingOpeningBracket[bracket]) return false;

    stack.pop();
  }

  return stack.length === 0;
}

function solution(s) {
  let validRotationCount = 0;
  const rotatedBrackets = [...s];

  for (let rotation = 0; rotation < s.length; rotation++) {
    if (isCorrectBrackets(rotatedBrackets)) validRotationCount++;

    rotatedBrackets.push(rotatedBrackets.shift());
  }

  return validRotationCount;
}

/**정리 전 코드
 * 
 * 
function isCorrect(s) {
  const stack = [];

  for (let item of s) {
    if (item === "(" || item === "[" || item === "{") {
      stack.push(item);
    } else {
      if ((item === ")" || item === "]" || item === "}") && !stack.length) {
        return false;
      }

      let hasCombi = false;
      const topOfStack = stack.at(-1);

      if (
        (item === ")" && topOfStack === "(") ||
        (item === "]" && topOfStack === "[") ||
        (item === "}" && topOfStack === "{")
      ) {
        hasCombi = true;
        stack.pop();
      }

      if (!hasCombi) {
        return false;
      }
    }
  }

  return stack.length ===0;
}

function solution(s) {
  let answer = 0;

  let target = Array.from(s);

  for (let i = 0; i < s.length; i++) {
    if (isCorrect(target)) {
      answer += 1;
    }

    let firstItem = target.shift();
    target.push(firstItem);
  }

  return answer;
}
 */
