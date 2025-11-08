// 1시 16분 시작

const memo = {

}


// 연산을 하는 횟수의 최솟값.
function calculate(X,depth = 0){
    /* 이건 안되는 놈인겨 */
    if(X < 1) {
        return Infinity;
    }

    if(X === 1) {
        return depth;
    }

    if(memo[X] !== undefined) {
        return memo[X] + depth;
    }


    let a = Infinity, b = Infinity, c = Infinity;

    if(X % 3 === 0 ) {
        a=calculate(X / 3, depth + 1)
    }

    if(X % 2 === 0) {
         b = calculate(X / 2, depth + 1)
    }


    c =  calculate(X-1,depth+1)

    memo[X] = Math.min(a,b,c) - depth;
    return memo[X] + depth
}

function main(){

    let N = require("fs")
        //   .readFileSync("/dev/stdin") // 백준 제출시
        .readFileSync("./1463_input.txt")
        .toString()
        .trim()
    N = Number(N);

    console.log(calculate(N))

}

main();
/**
 * 규칙1. X % 3 === 0, X / 3
 *  규칙2. X % 2 === 2, X / 2
 *  규칙3. -1
 *  세개를 적절히 사용해서 1을 만들려고 한다.
 *
 *  봐바. 일단 N 에 1,2,3중에 하나는 저장해야함.
 *  이거 recursive..로 하면 될 것 같은데?
 *
 *  근데 1,2,3중에 하나만 되는 경우 = 문제 없음.
 *  근데, 1도 되고 2도 되고 3해도 되는 경우도 있음 => 하나만 하는게 아니라 세가지 경우의 수를 다 테스트 해야함
 */
