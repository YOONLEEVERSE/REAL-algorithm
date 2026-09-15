#!/bin/zsh

# Finder에서 더블클릭하면 프로젝트 전용 터미널을 엽니다.
# 이 터미널에서만 `algo` 명령어가 PATH에 추가됩니다.
set -e

SCRIPT_DIR="${0:A:h}"
PROJECT_DIR="${SCRIPT_DIR:h:h}"

if [[ ! -x "${SCRIPT_DIR}/algo" ]]; then
  print -u2 "실행 파일을 찾을 수 없습니다: ${SCRIPT_DIR}/algo"
  print -u2 "개발 환경에서는 tools/algo-log 폴더에서 npm run build를 먼저 실행해주세요."
  read -k 1 "?아무 키나 누르면 종료합니다..."
  exit 1
fi

source "${SCRIPT_DIR}/activate.zsh"
cd "${PROJECT_DIR}"

print "algo 전용 터미널을 시작했습니다."
print "이 터미널에서는 어느 하위 폴더에서나 'algo'를 실행할 수 있습니다."
print "예: cd ljh && algo commit"
print ""

exec zsh -i
