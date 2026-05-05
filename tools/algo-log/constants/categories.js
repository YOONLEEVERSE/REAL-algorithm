export const CATEGORY = {
  HASH: "hash",
  STACK_QUEUE: "stack-queue",
  HEAP: "heap",
  SORT: "sort",
  BRUTE_FORCE: "brute-force",
  GREEDY: "greedy",
  DP: "dynamic-programming",
  DFS_BFS: "dfs-bfs",
  BINARY_SEARCH: "binary-search",
  GRAPH: "graph",
  SQL: "sql",
  IMPLEMENTATION: "implementation", // 구현
  KAKAO: "kakao", // 카카오 기출
  ETC: "etc", // 기타
};

// 한글 출력용 매퍼
export const CATEGORY_KR = {
  [CATEGORY.HASH]: "해시",
  [CATEGORY.STACK_QUEUE]: "스택/큐",
  [CATEGORY.HEAP]: "힙",
  [CATEGORY.SORT]: "정렬",
  [CATEGORY.BRUTE_FORCE]: "완전탐색",
  [CATEGORY.GREEDY]: "탐욕법",
  [CATEGORY.DP]: "동적계획법",
  [CATEGORY.DFS_BFS]: "깊이/너비 우선 탐색",
  [CATEGORY.BINARY_SEARCH]: "이분탐색",
  [CATEGORY.GRAPH]: "그래프",
  [CATEGORY.SQL]: "SQL",
  [CATEGORY.IMPLEMENTATION]: "구현",
  [CATEGORY.KAKAO]: "카카오 기출",
  [CATEGORY.ETC]: "기타",
};

// 사용자 입력 줄임말 매퍼
export const CATEGORY_ALIAS = {
  h: CATEGORY.HASH,
  sq: CATEGORY.STACK_QUEUE,
  hp: CATEGORY.HEAP,
  s: CATEGORY.SORT,
  bf: CATEGORY.BRUTE_FORCE,
  g: CATEGORY.GREEDY,
  dp: CATEGORY.DP,
  db: CATEGORY.DFS_BFS,
  bs: CATEGORY.BINARY_SEARCH,
  gr: CATEGORY.GRAPH,
  sql: CATEGORY.SQL,
  imp: CATEGORY.IMPLEMENTATION,
  k: CATEGORY.KAKAO,
  e: CATEGORY.ETC,
  etc: CATEGORY.ETC,
};
