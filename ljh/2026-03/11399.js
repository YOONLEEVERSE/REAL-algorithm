// 1시 11분 시작 1시 20분 종료

// 1초 => 1억번 연산
// 메모리 -> 256MB. 최대한 적게 나오기

// ATM앞에 N명의 사람들이 줄 서있음(1~N번_)
// 필요한 시간의 최솟값을 구해라.
// 최소한.. 으로.
// 음. sort해서 하면 되는 거 아닌감?

const fs = require("fs");
const [N, line] = fs.readFileSync(0).toString().trim().split("\n");

const p = line.split(" ").map(Number);
p.sort((a, b) => a - b);

let total = 0;
// 1번 ~ 5번 => 1번은 total 1,2,3,4,5 5(totallength-number(i+1)+1 = totalLength - i)번 더해져야 함.
// 2번 ~ 5번 => 2번은 total 2,3,4,5 4번 더해져야 함.

for (let i = 0; i < N; i++) {
  total += p[i] * (N - i);
}

console.log(total);
