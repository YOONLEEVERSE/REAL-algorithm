# REAL-algorithm

알고리즘 문제 풀이 기록 레포지토리

## 구조

```
REAL-algorithm/
├── [username]/ # 개인 문제 풀이 폴더
    └── README.md # 개인별 문제 풀이 기록
└── tools/
    └── algo-log/ # 풀이 기록 자동화 도구
```

## algo-log 빠른 시작

`algo-log`는 파일 생성 → 풀이 → 커밋까지 반자동화해주는 TUI 도구입니다.
Programmers / LeetCode 문제 정보(제목·난이도·유형)를 API로 자동 조회합니다.

> 바이너리는 반드시 `tools/algo-log/` 디렉토리에서 실행해야 합니다.
> 전역 등록: `ln -s "$(pwd)/algo" /usr/local/bin/algo`

자세한 사용법 → [tools/algo-log/README.md](tools/algo-log/README.md)
