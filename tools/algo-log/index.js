#!/usr/bin/env node

import prompts from "prompts";
import path from "path";

import chalk from "chalk";
import { newPrompt } from "./prompts/new.js";

function main() {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const LOG_DB_PATH = path.resolve(__dirname, "db", "log.db");

  const args = process.argv.slice(2);

  const action = args[0];

  if (!args.length) {
    console.log(chalk.red("명령어 또는 옵션을 입력해주세요"));
    showHelp();
    return;
  }

  switch (action) {
    case "new": {
      newPrompt();
      break;
    }

    case "commit": {
      console.log("COMMIT!");
      break;
    }

    case "--help": {
      showHelp();
      break;
    }

    default: {
      console.log(
        chalk.bold(
          "올바르지 않은 명령어 혹은 옵션을 입력했습니다. 입력값을 확인해주세요.",
        ),
      );
      showHelp();
    }
  }

  function showHelp() {
    console.log(`
${chalk.bold.cyan("algo 명령어 및 옵션")}

------------------------------------------------------------------------------------------


${chalk.yellow("new")}     ${chalk.white("인터랙티브 파일 생성")}
            ${chalk.gray("• 대화형 프롬프트를 통해 문제 정보 입력")}
            ${chalk.gray("• 이름 규칙(Convention)에 맞는 소스코드 및 입력값(.txt) 자동 생성")}
            ${chalk.cyan("ex) algo new")}

${chalk.yellow("commit")}  ${chalk.white("풀이 기록 및 자동 커밋")}
            ${chalk.gray("• 문제 정보를 입력받아 README.md 및 로그(JSON) 업데이트")}
            ${chalk.gray("• 변경사항 자동 스테이징 및 Git 커밋 실행")}
            ${chalk.cyan("ex) algo commit")}

${chalk.yellow("--help")}  ${chalk.white("명령어 도움말 실행")}
            ${chalk.cyan("ex) algo --help")}

            
------------------------------------------------------------------------------------------
  `);
  }
}

main();
