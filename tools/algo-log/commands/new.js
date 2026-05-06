import prompts from "prompts";
import {
  PLATFORM,
  PLATFORM_KR,
  CATEGORY,
  CATEGORY_KR,
} from "../constants/index.js";
import fs from "fs";
import { getAbsolutePath, getFormattedTime } from "../utility.js";
import { NEW_PROMPT_QUESTION } from "./questions/problem.js";

export const newPrompt = async (config) => {
  const responses = await prompts(NEW_PROMPT_QUESTION(config));

  //@TODO
  // 0.이미 제출한 적 있는지 확인 필요
  // 1.0도 반영해서, response기반으로 파일 이름 만들기
  // 2.language별로 템플릿 만들어놓고 가져와서 사용
  fs.writeFile(
    getAbsolutePath("..", "..", config.baseDir, `example.${config.language}`),
    `// 시작 시간 : ${getFormattedTime(new Date())}`,
    (err) => {
      if (err) throw err;
      console.log("파일이 성공적으로 생성되었습니다!");
    },
  );
};
