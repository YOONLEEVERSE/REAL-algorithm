# 이 프로젝트용 터미널 세션에서만 algo 명령어를 사용할 수 있게 합니다.
typeset -g ALGO_LOG_DIR="${${(%):-%x}:A:h}"
export PATH="${ALGO_LOG_DIR}:${PATH}"
