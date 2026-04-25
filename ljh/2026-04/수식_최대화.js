/* [틀린 이유]
 * higherOp 단일 변수 방식은 한 번에 하나의 "우선순위 점프"만 처리할 수 있다.
 * 예) 10-5+3*2, 우선순위 * > + > - 인 경우:
 *   - '+' 만남 → higherOp = '+'
 *   - '3' 만남 → 즉시 5+3=8 계산 (아직 '*'를 못 봤는데 먼저 합쳐버림)
 *   - '*' 만남 → higherOp = '*'
 *   - '2' 만남 → 8*2=16 → 10-16=-6 (오답)
 *   정답: 3*2=6 먼저, 5+6=11, 10-11=-1
 * 우선순위 점프가 연속으로 발생할 때 이전 연산이 먼저 묶여버리는 구조적 한계.
 *
 * [이 방식이 적합한 경우 - Shunting-yard 알고리즘]
 * 우선순위가 고정된 중위 표기식(infix)을 한 번만 평가할 때 유효하다.
 * higherOp를 단일 변수 대신 스택으로 바꾸면 완전한 Shunting-yard가 된다.
 * 적합한 문제 유형:
 *   - 후위 표기식 변환 / 계산 (백준 1935, 1918)
 *   - 괄호가 있는 수식 계산 (백준 1935)
 *   - 우선순위가 고정된 상태에서 수식 하나를 효율적으로 평가해야 할 때
 * 이 문제처럼 우선순위 자체를 바꿔가며 모든 경우를 탐색할 때는 맞지 않는다.
 */

/* 시작 2시 48분
* 숫자,+,-,*의 연산 숫자. 연산의 우선순위를 자유롭게 재정의하여 만들 수 있는 가장 큰 숫자를 제출

만약 계산 결과가 음수 => 절댓값으로 변환하여 제출
제출한 숫자가 가장 큰 사람이 우승자.

*,+,- 의 우선순위 가능성 순열을 다 구함. -> 계산을 함.
순열이네용. 같은 연산자는 앞에 있는 것이 더 강함
*/

function solution(expression) {
  let answer = 0;

  // 연산자와 숫자 나눔.
  const finalExpression = [];
  let number = "";
  for (let i = 0; i < expression.length; i++) {
    if (expression[i].match(`[0-9]`)) {
      number += expression[i];
    } else {
      finalExpression.push(parseInt(number));
      number = "";

      finalExpression.push(expression[i]);
    }
  }
  finalExpression.push(parseInt(number));

  const permutations = [];

  const stack = [];
  const getPermutation = (numbers) => {
    if (!numbers.length) {
      permutations.push([...stack]);
      return;
    }

    for (let n of numbers) {
      stack.push(n);
      getPermutation(numbers.filter((number) => number != n));
      stack.pop();
    }
  };

  getPermutation([1, 2, 3]);

  for (let priority of permutations) {
    const numberStack = [];
    const operationStack = [];

    // *, +, - 에 매핑
    const operatorPriorityMap = {
      "*": priority[0],
      "+": priority[1],
      "-": priority[2],
    };

    let higherOp = null;

    // console.log("FINALEXPRESSION :: ", finalExpression, operatorPriorityMap);
    // console.log("==================================");

    for (let op of finalExpression) {
      if (typeof op === "number") {
        if (higherOp) {
          const operand1 = op;
          const operand2 = numberStack.pop();

          if (higherOp === "*") numberStack.push(operand1 * operand2);
          else if (higherOp === "+") numberStack.push(operand1 + operand2);
          else if (higherOp === "-") numberStack.push(operand2 - operand1);

          higherOp = null;
        } else numberStack.push(op);
      } else if (
        !operationStack.length ||
        operatorPriorityMap[operationStack[operationStack.length - 1]] >=
          operatorPriorityMap[op]
      ) {
        operationStack.push(op);
      } else {
        higherOp = op;
      }
    }

    let numberIdx = 1;
    let total = numberStack[0];

    for (let op of operationStack) {
      const operand = numberStack[numberIdx++];
      if (op === "*") total = total * operand;
      else if (op === "+") total = total + operand;
      else if (op === "-") total = total - operand;
    }

    if (Math.abs(total) > answer) {
      answer = Math.abs(total);
    }
  }

  return answer;
}

// module.exports = solution;

// console.log(solution("100-200*300-500+20"));
// console.log(solution("50*6-3*2"));

// ===================== 정석 풀이 =====================

function solution2(expression) {
  let answer = 0;

  // 숫자 배열, 연산자 배열 분리
  const nums = [];
  const ops = [];
  let number = "";
  for (let ch of expression) {
    if (ch.match(/[0-9]/)) {
      number += ch;
    } else {
      nums.push(parseInt(number));
      number = "";
      ops.push(ch);
    }
  }
  nums.push(parseInt(number));

  // [*, +, -] 순열 생성
  const permutations = [];
  const getPermutation = (remaining, current) => {
    if (!remaining.length) {
      permutations.push(current);
      return;
    }
    for (let op of remaining) {
      getPermutation(
        remaining.filter((o) => o !== op),
        [...current, op]
      );
    }
  };
  getPermutation(["*", "+", "-"], []);

  for (let opOrder of permutations) {
    const curNums = [...nums];
    const curOps = [...ops];

    // 우선순위 높은 연산자부터 순서대로 전체 스캔하며 적용
    for (let op of opOrder) {
      let i = 0;
      while (i < curOps.length) {
        if (curOps[i] === op) {
          let result;
          if (op === "*") result = curNums[i] * curNums[i + 1];
          else if (op === "+") result = curNums[i] + curNums[i + 1];
          else result = curNums[i] - curNums[i + 1];
          curNums.splice(i, 2, result);
          curOps.splice(i, 1);
        } else {
          i++;
        }
      }
    }

    if (Math.abs(curNums[0]) > answer) {
      answer = Math.abs(curNums[0]);
    }
  }

  return answer;
}

module.exports = solution2;

console.log(solution2("100-200*300-500+20")); // 60420
console.log(solution2("50*6-3*2")); // 300
