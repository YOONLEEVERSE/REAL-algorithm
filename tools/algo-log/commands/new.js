import prompts from "prompts";
import fs from "fs/promises";
import { getAbsolutePath, getFormattedTime } from "../utility.js";
import { NEW_PROMPT_QUESTION } from "./questions/problem.js";
import { findOne, findAll } from "../db.js";

export const newPrompt = async (config) => {
  const responses = await prompts(NEW_PROMPT_QUESTION(config));
  if (!responses.platform || !responses.number || !responses.language) return;

  const problem = await findOne(
    "problems",
    (p) => p.platform === responses.platform && p.number === responses.number,
  );

  let retryCnt = 0;
  if (problem) {
    const solved = await findAll(
      "solvedProblems",
      (sp) => sp.problemId === problem.id && sp.userId === config.userId,
    );
    retryCnt = solved.length;
  }

  const baseName =
    retryCnt > 0
      ? `${responses.platform}_${responses.number}_${retryCnt}`
      : `${responses.platform}_${responses.number}`;

  const fileName = `${baseName}.${responses.language}`;

  // @TODO: language별 템플릿 적용
  await fs.writeFile(
    getAbsolutePath("..", "..", config.baseDir, fileName),
    `// 시작 시간 : ${getFormattedTime(new Date())}`,
  );

  console.log(`파일이 성공적으로 생성되었습니다! (${fileName})`);
};
