import path from "path";

export const __dirname = path.dirname(new URL(import.meta.url).pathname);

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
