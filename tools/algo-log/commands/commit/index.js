import prompts from "prompts";
import { PLATFORM_KR } from "../../constants/platforms.js";
import {
  SOLVED_PROMPT_QUESTION,
  NEW_PROBLEM_PROMPT_QUESTION,
} from "../questions/problem.js";
import { getAbsolutePath } from "../../utility.js";
import { findOne, findAll, insert, remove } from "../../db.js";
import { generateReadme } from "../../services/readme.js";
import { fetchProblemInfo } from "../../services/problem-fetcher.js";
import {
  groupFiles,
  formatGroupTitle,
  formatDifficultyAndCategory,
} from "./parser.js";

class PromptCancelled extends Error {}

function ask(questions) {
  return prompts(questions, {
    onCancel() {
      throw new PromptCancelled();
    },
  });
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

  try {
    const { selected } = await ask({
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

    const fetchMap = new Map(
      selected.map((group) => [
        group,
        group.platform
          ? fetchProblemInfo(group.platform, group.problemId)
          : Promise.resolve(null),
      ]),
    );

    for (const group of selected) {
      const platformName = group.platform ? PLATFORM_KR[group.platform] : "기타";
      const fileNames = [group.solutionFile?.name, group.inputFile?.name]
        .filter(Boolean)
        .join(", ");

      const [existingProblem, fetchedInfo] = await Promise.all([
        group.platform
          ? findOne(
              "problems",
              (p) => p.platform === group.platform && p.number === group.problemId,
            )
          : null,
        fetchMap.get(group),
      ]);

      const namePart = fetchedInfo?.name ? ` / ${fetchedInfo.name}` : "";
      const confirmMsg = existingProblem
        ? `파싱 정보 확인: ${platformName} - ${group.problemId} (${fileNames}) / ${formatDifficultyAndCategory(existingProblem)}`
        : `파싱 정보 확인: ${platformName} - ${group.problemId} (${fileNames})${namePart}`;

      const { confirmed } = await ask({
        type: "toggle",
        name: "confirmed",
        message: confirmMsg,
        initial: true,
        active: "맞아요",
        inactive: "아니에요",
      });

      if (!confirmed) {
        console.log("파일 이름을 수정한 후 다시 시도해주세요.");
        continue;
      }

      let problemId;
      let insertedProblemId = null;
      let insertedSolvedId = null;

      if (existingProblem) {
        problemId = existingProblem.id;
        const info = await ask(SOLVED_PROMPT_QUESTION(group.isReview));

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
        const info = await ask(
          NEW_PROBLEM_PROMPT_QUESTION(group.platform, group.isReview, fetchedInfo),
        );

        problemId = await getNextId("problems");
        insertedProblemId = problemId;
        await insert("problems", {
          id: problemId,
          platform: group.platform,
          number: group.problemId,
          name: fetchedInfo?.name ?? null,
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
      const readmePath = await generateReadme(config);
      const commitMsg = `${config.username}: ${platformName}, ${group.problemId}`;

      try {
        await Bun.$`git add ${files} ${dbPath} ${readmePath}`;
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
  } catch (e) {
    if (!(e instanceof PromptCancelled)) throw e;
  }
};
