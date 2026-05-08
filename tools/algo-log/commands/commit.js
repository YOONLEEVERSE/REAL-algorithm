import prompts from "prompts";
import path from "path";
import { PLATFORM_ALIAS, PLATFORM_KR } from "../constants/platforms.js";
import {
  CATEGORY_KR,
  DIFFICULTY_BAEKJOON_KR,
  DIFFICULTY_PROGRAMMERS_KR,
  DIFFICULTY_LEETCODE_KR,
} from "../constants/index.js";
import {
  SOLVED_PROMPT_QUESTION,
  NEW_PROBLEM_PROMPT_QUESTION,
} from "./questions/problem.js";
import { getAbsolutePath } from "../utility.js";
import { findOne, findAll, insert, remove } from "../db.js";

const ALIAS_TO_PLATFORM = Object.fromEntries(
  Object.entries(PLATFORM_ALIAS).map(([platform, alias]) => [alias, platform]),
);

const DIFFICULTY_KR_BY_PLATFORM = {
  baekjoon: DIFFICULTY_BAEKJOON_KR,
  programmers: DIFFICULTY_PROGRAMMERS_KR,
  leetcode: DIFFICULTY_LEETCODE_KR,
};

// "lc_505005.java" -> { alias: "lc", platform: "leetcode", problemId: "505005", isInput: false }
function parseFileName(filePath) {
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

function groupFiles(changedFiles) {
  const groups = new Map();

  for (const { file } of changedFiles) {
    const dir = path.dirname(file);
    const {
      baseName,
      isInput,
      language,
      platform,
      problemId,
      isReview,
      pairKey,
    } = parseFileName(file);
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

function formatGroupTitle(group) {
  const platformName = group.platform ? PLATFORM_KR[group.platform] : "기타";
  const files = [group.solutionFile?.name, group.inputFile?.name]
    .filter(Boolean)
    .join(", ");
  return `${platformName} - ${group.problemId} (${files})`;
}

function formatDifficultyAndCategory(problem) {
  const difficultyKr = DIFFICULTY_KR_BY_PLATFORM[problem.platform];
  const difficultyLabel =
    difficultyKr?.[problem.difficulty] ?? problem.difficulty ?? "?";
  const categories =
    (problem.category ?? []).map((c) => CATEGORY_KR[c] ?? c).join(", ") ||
    "기타";
  return `난이도: ${difficultyLabel} / 유형: ${categories}`;
}

async function getNextId(collection) {
  const all = await findAll(collection);
  if (all.length === 0) return 1;
  return Math.max(...all.map((item) => item.id)) + 1;
}

export const commitPrompt = async (config) => {
  const gitStatus = await Bun.$`git status --porcelain`.text();

  const changedFiles = gitStatus
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => ({ status: line.slice(0, 2).trim(), file: line.slice(3) }))
    .map(({ status, file }) => ({
      status,
      file: file.startsWith('"') ? file.slice(1, -1) : file,
    }))
    .filter(
      ({ file }) =>
        file.startsWith(config.baseDir + "/") || file === config.baseDir,
    );

  if (changedFiles.length === 0) {
    console.log("커밋할 파일이 없습니다.");
    return;
  }

  const groups = groupFiles(changedFiles);

  const { selected } = await prompts({
    type: "multiselect",
    name: "selected",
    message: "커밋할 문제를 선택해주세요",
    choices: groups.map((group) => ({
      title: formatGroupTitle(group),
      value: group,
    })),
    min: 1,
  });

  if (!selected || selected.length === 0) return;

  for (const group of selected) {
    const platformName = group.platform ? PLATFORM_KR[group.platform] : "기타";
    const fileNames = [group.solutionFile?.name, group.inputFile?.name]
      .filter(Boolean)
      .join(", ");

    const existingProblem = group.platform
      ? await findOne(
          "problems",
          (p) => p.platform === group.platform && p.number === group.problemId,
        )
      : null;

    const confirmMsg = existingProblem
      ? `파싱 정보 확인: ${platformName} - ${group.problemId} (${fileNames}) / ${formatDifficultyAndCategory(existingProblem)}`
      : `파싱 정보 확인: ${platformName} - ${group.problemId} (${fileNames})`;

    const { confirmed } = await prompts({
      type: "toggle",
      name: "confirmed",
      message: confirmMsg,
      initial: true,
      active: "맞아요",
      inactive: "아니에요",
    });

    if (confirmed === undefined) return;
    if (!confirmed) {
      console.log("파일 이름을 수정한 후 다시 시도해주세요.");
      continue;
    }

    let problemId;
    let insertedProblemId = null;
    let insertedSolvedId = null;

    if (existingProblem) {
      problemId = existingProblem.id;
      const info = await prompts(SOLVED_PROMPT_QUESTION(group.isReview));
      if (info.personalDifficulty === undefined) return;

      insertedSolvedId = await getNextId("solvedProblems");
      await insert("solvedProblems", {
        id: insertedSolvedId,
        userId: config.userId,
        problemId,
        personalDifficulty: info.personalDifficulty,
        memo: info.memo ?? "",
        language: group.language,
        isReview: info.isReview,
        solvedAt: new Date().toISOString(),
      });
    } else {
      const info = await prompts(
        NEW_PROBLEM_PROMPT_QUESTION(group.platform, group.isReview),
      );
      if (info.difficulty === undefined) return;

      problemId = await getNextId("problems");
      insertedProblemId = problemId;
      await insert("problems", {
        id: problemId,
        platform: group.platform,
        number: group.problemId,
        difficulty: info.difficulty,
        category: info.category ?? [],
      });

      insertedSolvedId = await getNextId("solvedProblems");
      await insert("solvedProblems", {
        id: insertedSolvedId,
        userId: config.userId,
        problemId,
        personalDifficulty: info.personalDifficulty,
        memo: info.memo ?? "",
        language: group.language,
        isReview: info.isReview,
        solvedAt: new Date().toISOString(),
      });
    }

    const files = [group.solutionFile?.path, group.inputFile?.path]
      .filter(Boolean)
      .map((f) => getAbsolutePath("..", "..", f));
    const dbPath = getAbsolutePath("data", "db.json");
    const commitMsg = `${config.username}: ${platformName}, ${group.problemId}`;

    try {
      await Bun.$`git add ${files} ${dbPath}`;
      await Bun.$`git commit -m ${commitMsg}`;
      console.log(`커밋 완료: ${commitMsg}`);
    } catch (err) {
      console.error("커밋 실패, DB 롤백 중...");
      if (insertedSolvedId !== null) {
        await remove("solvedProblems", (sp) => sp.id === insertedSolvedId);
      }
      if (insertedProblemId !== null) {
        await remove("problems", (p) => p.id === insertedProblemId);
      }
      console.error(err.message ?? err);
    }
  }
};
