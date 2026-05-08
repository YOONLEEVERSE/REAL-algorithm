import prompts from "prompts";
import path from "path";
import { PLATFORM_ALIAS, PLATFORM_KR } from "../constants/platforms.js";
import { COMMIT_PROMPT_QUESTION } from "./questions/problem.js";
import { getAbsolutePath } from "../utility.js";

// alias -> platform (e.g. "lc" -> "leetcode")
const ALIAS_TO_PLATFORM = Object.fromEntries(
  Object.entries(PLATFORM_ALIAS).map(([platform, alias]) => [alias, platform]),
);

// "lc_505005.java" -> { alias: "lc", platform: "leetcode", problemId: "505005", isInput: false }
function parseFileName(filePath) {
  const baseName = path.basename(filePath);
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
    const { baseName, isInput, platform, problemId, isReview, pairKey } =
      parseFileName(file);
    const key = `${dir}/${pairKey}`;

    if (!groups.has(key)) {
      groups.set(key, {
        platform,
        problemId,
        isReview,
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

    const { confirmed } = await prompts({
      type: "toggle",
      name: "confirmed",
      message: `파싱 정보 확인: ${platformName} - ${group.problemId} (${fileNames})`,
      initial: true,
      active: "맞아요",
      inactive: "아니에요",
    });

    if (confirmed === undefined) return;
    if (!confirmed) {
      console.log("파일 이름을 수정한 후 다시 시도해주세요.");
      continue;
    }

    const info = await prompts(
      COMMIT_PROMPT_QUESTION(group.platform, group.isReview),
    );
    if (info.difficulty === undefined) return;

    const files = [group.solutionFile?.path, group.inputFile?.path]
      .filter(Boolean)
      .map((f) => getAbsolutePath("..", "..", f));
    const commitMsg = `${config.username}: ${platformName}, ${group.problemId}`;

    await Bun.$`git add ${files}`;
    await Bun.$`git commit -m ${commitMsg}`;
    console.log(`커밋 완료: ${commitMsg}`);
  }
};
