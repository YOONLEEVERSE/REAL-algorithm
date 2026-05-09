import fs from "fs/promises";
import {
  PLATFORM_KR,
  CATEGORY_KR,
  PERSONAL_DIFFICULTY_KR,
  DIFFICULTY_BAEKJOON_KR,
  DIFFICULTY_PROGRAMMERS_KR,
  DIFFICULTY_LEETCODE_KR,
} from "../constants/index.js";
import { findAll } from "../db.js";
import { getAbsolutePath } from "../utility.js";

const DIFFICULTY_KR_BY_PLATFORM = {
  baekjoon: DIFFICULTY_BAEKJOON_KR,
  programmers: DIFFICULTY_PROGRAMMERS_KR,
  leetcode: DIFFICULTY_LEETCODE_KR,
};

export function buildReadmeContent(problems, solvedProblems) {
  const problemMap = new Map(problems.map((p) => [p.id, p]));

  // 문제별로 그룹핑 후 각 그룹 내 날짜순 정렬, 그룹 자체는 첫 풀이 날짜 기준 정렬
  const groups = new Map();
  for (const sp of solvedProblems) {
    if (!groups.has(sp.problemId)) groups.set(sp.problemId, []);
    groups.get(sp.problemId).push(sp);
  }
  for (const entries of groups.values()) {
    entries.sort((a, b) => new Date(a.solvedAt) - new Date(b.solvedAt));
  }
  const sorted = [...groups.values()]
    .sort((a, b) => new Date(a[0].solvedAt) - new Date(b[0].solvedAt))
    .flat();

  const rows = sorted
    .map((sp) => {
      const problem = problemMap.get(sp.problemId);
      if (!problem) return null;

      const platformName = PLATFORM_KR[problem.platform] ?? problem.platform;
      const diffKr = DIFFICULTY_KR_BY_PLATFORM[problem.platform];
      const diffLabel =
        diffKr?.[problem.difficulty] ?? problem.difficulty ?? "-";
      const categories =
        (problem.category ?? []).map((c) => CATEGORY_KR[c] ?? c).join(", ") ||
        "기타";
      const lang = sp.language ?? "-";
      const pd = PERSONAL_DIFFICULTY_KR[sp.personalDifficulty] ?? "-";
      const date = sp.solvedAt ? sp.solvedAt.slice(0, 10) : "-";
      const review = sp.isReview ? "✓" : "";
      const memo = sp.memo || "-";

      return `| ${platformName} | ${problem.number} | ${diffLabel} | ${categories} | ${lang} | ${pd} | ${date} | ${review} | ${memo} |`;
    })
    .filter(Boolean);

  const lines = [
    "# 알고리즘 풀이 기록",
    "",
    "| 플랫폼 | 번호 | 난이도 | 유형 | 언어 | 체감 난이도 | 날짜 | 복습 | 비고 |",
    "| :----: | :--: | :----: | :--: | :--: | :---------: | :--: | :--: | :--: |",
    ...rows,
  ];

  return lines.join("\n") + "\n";
}

export async function generateReadme(config) {
  const problems = await findAll("problems");
  const solvedProblems = await findAll(
    "solvedProblems",
    (sp) => sp.userId === config.userId,
  );

  const content = buildReadmeContent(problems, solvedProblems);
  const readmePath = getAbsolutePath("..", "..", config.baseDir, "README.md");
  await fs.writeFile(readmePath, content, "utf-8");
  return readmePath;
}
