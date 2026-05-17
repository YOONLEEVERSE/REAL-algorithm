import { PLATFORM } from "../constants/platforms.js";
import { CATEGORY } from "../constants/categories.js";

const LEETCODE_TAG_TO_CATEGORY = {
  "Hash Table": CATEGORY.HASH,
  "Stack": CATEGORY.STACK_QUEUE,
  "Queue": CATEGORY.STACK_QUEUE,
  "Monotonic Stack": CATEGORY.STACK_QUEUE,
  "Monotonic Queue": CATEGORY.STACK_QUEUE,
  "Heap (Priority Queue)": CATEGORY.HEAP,
  "Sorting": CATEGORY.SORT,
  "Greedy": CATEGORY.GREEDY,
  "Dynamic Programming": CATEGORY.DP,
  "Memoization": CATEGORY.DP,
  "Depth-First Search": CATEGORY.DFS_BFS,
  "Breadth-First Search": CATEGORY.DFS_BFS,
  "Binary Search": CATEGORY.BINARY_SEARCH,
  "Binary Search Tree": CATEGORY.BINARY_SEARCH,
  "Graph": CATEGORY.GRAPH,
  "Topological Sort": CATEGORY.GRAPH,
  "Union Find": CATEGORY.GRAPH,
  "Bipartite Graph": CATEGORY.GRAPH,
  "Database": CATEGORY.SQL,
};

// { name, difficulty, category } | null
export async function fetchProblemInfo(platform, number) {
  try {
    if (platform === PLATFORM.PROGRAMMERS) return await fetchProgrammers(number);
    if (platform === PLATFORM.LEETCODE) return await fetchLeetcode(number);
  } catch {
    // silently fall back to manual input
  }
  return null;
}

async function fetchProgrammers(number) {
  const res = await fetch(
    `https://school.programmers.co.kr/learn/courses/30/lessons/${number}`,
  );
  if (!res.ok) return null;
  const html = await res.text();

  const nameMatch = html.match(/<span class="challenge-title">([^<]+)<\/span>/);
  const name = nameMatch?.[1]?.trim() ?? null;

  const levelMatch = html.match(/data-challenge-level="(\d)"/);
  const difficulty = levelMatch ? `lv${levelMatch[1]}` : null;

  return { name, difficulty, category: [] };
}

let lcSlugCache = null;

async function getLeetcodeSlug(number) {
  if (!lcSlugCache) {
    const res = await fetch("https://leetcode.com/api/problems/algorithms/");
    if (!res.ok) return null;
    const data = await res.json();
    lcSlugCache = new Map(
      data.stat_status_pairs.map(({ stat }) => [
        stat.frontend_question_id,
        stat.question__title_slug,
      ]),
    );
  }
  return lcSlugCache.get(Number(number)) ?? null;
}

async function fetchLeetcode(number) {
  const slug = await getLeetcodeSlug(number);
  if (!slug) return null;

  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          title
          difficulty
          topicTags { name }
        }
      }`,
      variables: { titleSlug: slug },
    }),
  });
  if (!res.ok) return null;
  const json = await res.json();
  const q = json?.data?.question;
  if (!q) return null;

  const diffMap = { Easy: "easy", Medium: "medium", Hard: "hard" };
  const difficulty = diffMap[q.difficulty] ?? null;
  const category = [
    ...new Set(
      (q.topicTags ?? [])
        .map((t) => LEETCODE_TAG_TO_CATEGORY[t.name])
        .filter(Boolean),
    ),
  ];

  return { name: q.title, difficulty, category };
}
