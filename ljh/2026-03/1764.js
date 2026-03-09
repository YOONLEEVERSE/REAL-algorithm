// 5시 57분 시작

// 듣도 못한 사람 , 보도 못한 사람 명단 줌 => 듣도보도 못한 사람 명단 구하셈.
// set을 써야겠죵~!

const fs = require("fs");
const [number, ...line] = fs.readFileSync(0).toString().trim().split("\n");

const [n, m] = number.split(" ").map(Number);

const noHearSet = new Set(line.slice(0, n));
const noSeeSet = new Set(line.slice(n));

const intersectionSet = noHearSet.intersection(noSeeSet);
const result = Array.from(intersectionSet);
result.sort();

console.log(result.length);
console.log(result.join("\n"));

//아래버전은 백준 제출 버전
// const fs = require("fs");
// // trim() 위치 주의: 전체 데이터 끝의 공백만 제거
// const input = fs.readFileSync(0).toString().trim().split("\n");

// // 1. map(Number)로 안전하게 파싱
// const [n, m] = input[0].split(" ").map(Number);

// // 2. slice 범위 지정 (input[0]이 n, m이므로 데이터는 index 1부터 시작)
// const noHearSet = new Set(input.slice(1, n + 1));
// const noSee = input.slice(n + 1);

// // 3. intersection 대신 filter 사용 (호환성 및 속도)
// const result = noSee.filter((name) => noHearSet.has(name));

// // 4. 사전순 정렬
// result.sort();

// // 5. 결과 출력
// console.log(result.length);
// if (result.length > 0) {
//   console.log(result.join("\n"));
// }
