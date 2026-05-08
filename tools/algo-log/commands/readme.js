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

  const byProblem = new Map();
  const sortedSolves = [...solvedProblems].sort(
    (a, b) => new Date(a.solvedAt) - new Date(b.solvedAt),
  );
  for (const sp of sortedSolves) {
    if (!byProblem.has(sp.problemId)) byProblem.set(sp.problemId, []);
    byProblem.get(sp.problemId).push(sp);
  }

  const problemEntries = [...byProblem.entries()].sort(
    ([, a], [, b]) => new Date(a[0].solvedAt) - new Date(b[0].solvedAt),
  );

  const rows = [];
  for (const [problemId, solves] of problemEntries) {
    const problem = problemMap.get(problemId);
    if (!problem) continue;

    const platformName = PLATFORM_KR[problem.platform] ?? problem.platform;
    const diffKr = DIFFICULTY_KR_BY_PLATFORM[problem.platform];
    const diffLabel = diffKr?.[problem.difficulty] ?? problem.difficulty ?? "-";
    const categories =
      (problem.category ?? []).map((c) => CATEGORY_KR[c] ?? c).join(", ") ||
      "기타";

    for (let idx = 0; idx < solves.length; idx++) {
      const solve = solves[idx];
      const lang = solve.language ?? "-";
      const pd = PERSONAL_DIFFICULTY_KR[solve.personalDifficulty] ?? "-";
      const memo = solve.memo || "-";

      if (idx === 0) {
        rows.push(
          `| ${platformName} | ${problem.number} | ${diffLabel} | ${categories} | ${lang} | ${pd} | ${memo} |`,
        );
      } else {
        rows.push(`| | | | | (${idx + 1}회차) ${lang} | ${pd} | ${memo} |`);
      }
    }
  }

  const lines = [
    "# 알고리즘 풀이 기록",
    "",
    "| 플랫폼 | 번호 | 난이도 | 유형 | 언어 | 체감 난이도 | 비고 |",
    "| :----: | :--: | :----: | :--: | :--: | :---------: | :--: |",
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
