// 1시 23분 시작

// 5초 -> 연산 5억번 가능~
// 비밀번호를 사이트 주소 - 비밀번호를 저장.
// N = 저장된 사이트 주소 수, M = 비밀번호 찾으려는 사이트 주소 수
// 사이트 주소(소문자,대문자,대시,마침표)) - 비밀번호 매핑(only 알파벳 대문자.).

const fs = require("fs");
const args = fs.readFileSync(0).toString().trim().split("\n");
const [n, m] = args[0].split(" ").map(Number);

const memo = new Map(args.slice(1, 1 + n).map((arg) => arg.split(" ")));

const result = [];

for (let i = n + 1; i <= args.length; i++) {
  result.push(memo.get(args[i]));
}

console.log(result.join("\n"));
