#!/bin/zsh

# Finder에서 한 번만 더블클릭하세요.
# 이후 새 zsh 터미널에서는 ./ 없이 algo 명령어를 사용할 수 있습니다.
set -e

SCRIPT_DIR="${0:A:h}"
ZSHRC_PATH="${HOME}/.zshrc"
MARKER_START="# >>> algo-log >>>"
MARKER_END="# <<< algo-log <<<"

touch "${ZSHRC_PATH}"

if ! grep -Fq "${MARKER_START}" "${ZSHRC_PATH}"; then
  {
    print ""
    print "${MARKER_START}"
    print "export PATH=\"${SCRIPT_DIR}:\$PATH\""
    print "${MARKER_END}"
  } >> "${ZSHRC_PATH}"
fi

print "설치가 완료되었습니다."
print "새 터미널을 열면 ./ 없이 바로 사용할 수 있습니다:"
print "  cd ~/Desktop/study/REAL-algorithm/ljh"
print "  algo new"
print "  algo commit"
print ""
read -k 1 "?아무 키나 누르면 종료합니다..."
