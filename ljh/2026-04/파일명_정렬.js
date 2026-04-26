/** 7시 31분 시작
 * 파일 저장소 서버 관리 < 프로그램의 과거 버전을 모두 담고 있음. ver-10.zip이 ver-9.zip보다 먼저 표시되는
 * 파일명에 포함된 숫자를 반영한 정렬 기능 -> 저장소 관리 프로그램에 구현
 * 1 > 10이런식으로 가는게 아니라, 숫자로 보기
 * 파일명 : 100글자 이내, 영문 대소문자, 숫자, 공백(" "), ., - 만으로 구현돼있
 * HEAD(문자 only, 1+) / NUMBER([0-9]{1,5}). 00001등의 표시도 가능 / TAIL[숫자/문자]* 구조.
 *
 * 숫자 나오는 부분있으면 그 부분으로 분리(1~5 자리 까지라는 것 명심)/그외는 다 TAIL로 취급
 *
 * 정렬 기준
 * 1. HEAD부분을 사전 순 정렬. 대소문자 구분X
 * 2. 1이 같을 경우 NUMBER의 숫자 순 정렬. 앞에 0이 있어도 무시하고 그 값 자체만으로 판단
 * 3. 1,2가 같을 경우 원래 입력에 주어진 순서 유지.
 */
function solution(files) {
  // 1. 파싱을 한다 (HEAD/NUMBER/TAIL로 구분하면 되겠네.)
  // 2. 정렬을 한다.
  // 3. 정렬된 배열을 return - 여기선 다시 합쳐진 상태여야 함.

  const parseFileName = (fileName) => {
    let head = "";
    let number = "";

    const numberStartIdx = fileName.match(/[0-9]/).index; // index를 찾아오자
    let numberEndIdx = null;
    // 숫자파트
    for (
      let i = numberStartIdx;
      i < fileName.length && i < numberStartIdx + 5;
      i++
    ) {
      if (!fileName[i].match(/[0-9]/)) {
        numberEndIdx = i;
        break;
      }
    }

    if (!numberEndIdx) numberEndIdx = numberStartIdx + 5;

    head = fileName.slice(0, numberStartIdx).toLowerCase();
    number = Number(fileName.slice(numberStartIdx, numberEndIdx));

    return [head, number]; //head, number, tail
  };

  const sortByFileName = (a, b) => {
    if (a[0] === b[0]) {
      return a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1;
    }

    return a[0] > b[0] ? 1 : -1;
  };

  const parsedFileNames = files.map((f) => ({
    parsed: parseFileName(f),
    origin: f,
  }));

  parsedFileNames.sort((a, b) => sortByFileName(a.parsed, b.parsed));
  const result = parsedFileNames.map((f) => f.origin);

  return result;
}

console.log(
  solution([
    "F-5 Freedom Fighter",
    "B-50 Superfortress",
    "A-10 Thunderbolt II",
    "F-14 Tomcat",
  ]),
);

function solution2(files) {
  return files
    .map((file) => {
      const [, head, number] = file.match(/^([^0-9]+)([0-9]{1,5})/i);
      return { file, head: head.toLowerCase(), number: Number(number) };
    })
    .sort((a, b) => {
      if (a.head !== b.head) return a.head > b.head ? 1 : -1;
      return a.number - b.number;
    })
    .map(({ file }) => file);
}
