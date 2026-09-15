import path from "node:path";

const isCompiled = import.meta.url.includes("$bunfs");

function getCompiledDir() {
  // 일부 Bun 버전에서 process.execPath가 /$bunfs/ 가상 경로를 반환하는 경우가 있음
  // 이 경우 실제 바이너리 경로인 process.argv[0] 을 사용
  if (!process.execPath.startsWith("/$bunfs/")) {
    return path.dirname(process.execPath);
  }
  return path.dirname(path.resolve(process.argv[0]));
}

export const __dirname = isCompiled
  ? getCompiledDir()
  : path.dirname(new URL(import.meta.url).pathname);

export const getAbsolutePath = (...args) => {
  return path.resolve(__dirname, ...args);
};

export const isInvalidDate = (date) => {
  return isNaN(date);
};

export const getFormattedTime = (date) => {
  const now = new Date(date);

  if (isInvalidDate(now)) throw Error("잘못된 날짜입니다.");

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 1월이 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
};
