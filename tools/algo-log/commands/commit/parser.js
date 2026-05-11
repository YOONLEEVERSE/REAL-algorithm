import path from "path";
import { PLATFORM_ALIAS, PLATFORM_KR } from "../../constants/platforms.js";
import {
  CATEGORY_KR,
  DIFFICULTY_BAEKJOON_KR,
  DIFFICULTY_PROGRAMMERS_KR,
  DIFFICULTY_LEETCODE_KR,
} from "../../constants/index.js";

export const ALIAS_TO_PLATFORM = Object.fromEntries(
  Object.entries(PLATFORM_ALIAS).map(([platform, alias]) => [alias, platform]),
);

const DIFFICULTY_KR_BY_PLATFORM = {
  baekjoon: DIFFICULTY_BAEKJOON_KR,
  programmers: DIFFICULTY_PROGRAMMERS_KR,
  leetcode: DIFFICULTY_LEETCODE_KR,
};

// "lc_505005.java" -> { platform: "leetcode", problemId: "505005", ... }
export function parseFileName(filePath) {
  const baseName = path.basename(filePath);
  const extMatch = baseName.match(/\.([^.]+)$/);
  const language = extMatch ? extMatch[1] : null;
  const nameWithoutExt = baseName.replace(/\.[^.]+$/, "");

  const isInput = nameWithoutExt.endsWith("_input");
  const coreName = isInput
    ? nameWithoutExt.slice(0, -"_input".length)
    : nameWithoutExt;

  const aliasMatch = coreName.match(/^(lc|bj|pg)_(.+)$/);
  const platform = aliasMatch ? ALIAS_TO_PLATFORM[aliasMatch[1]] : null;

  let problemId = aliasMatch ? aliasMatch[2] : coreName;
  let isReview = false;
  const retryCntMatch = problemId.match(/^(.+)_(\d+)$/);
  if (retryCntMatch) {
    problemId = retryCntMatch[1];
    isReview = true;
  }

  return {
    baseName,
    isInput,
    language: isInput ? null : language,
    platform,
    problemId,
    isReview,
    pairKey: coreName,
  };
}

export function groupFiles(changedFiles) {
  const groups = new Map();

  for (const { file } of changedFiles) {
    const dir = path.dirname(file);
    const { baseName, isInput, language, platform, problemId, isReview, pairKey } =
      parseFileName(file);
    const key = `${dir}/${pairKey}`;

    if (!groups.has(key)) {
      groups.set(key, {
        platform,
        problemId,
        isReview,
        language,
        solutionFile: null,
        inputFile: null,
      });
    }

    const group = groups.get(key);
    if (isInput) {
      group.inputFile = { path: file, name: baseName };
    } else {
      group.solutionFile = { path: file, name: baseName };
      if (platform && !group.platform) group.platform = platform;
      if (language && !group.language) group.language = language;
    }
  }

  return Array.from(groups.values());
}

export function formatGroupTitle(group) {
  const platformName = group.platform ? PLATFORM_KR[group.platform] : "기타";
  const files = [group.solutionFile?.name, group.inputFile?.name]
    .filter(Boolean)
    .join(", ");
  return `${platformName} - ${group.problemId} (${files})`;
}

export function formatDifficultyAndCategory(problem) {
  const difficultyKr = DIFFICULTY_KR_BY_PLATFORM[problem.platform];
  const difficultyLabel =
    difficultyKr?.[problem.difficulty] ?? problem.difficulty ?? "?";
  const categories =
    (problem.category ?? []).map((c) => CATEGORY_KR[c] ?? c).join(", ") ||
    "기타";
  return `난이도: ${difficultyLabel} / 유형: ${categories}`;
}
