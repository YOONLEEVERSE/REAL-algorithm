const BJ_TIERS = ["bronze", "silver", "gold", "platinum", "diamond", "ruby"];
const BJ_TIER_KR = {
  bronze: "브론즈",
  silver: "실버",
  gold: "골드",
  platinum: "플래티넘",
  diamond: "다이아몬드",
  ruby: "루비",
};
const BJ_STEPS = ["5", "4", "3", "2", "1"];

export const DIFFICULTY_BAEKJOON = {
  UNRATED: "unrated",
  ...Object.fromEntries(
    BJ_TIERS.flatMap((tier) =>
      BJ_STEPS.map((step) => [
        `${tier.toUpperCase()}_${step}`,
        `${tier}-${step}`,
      ])
    )
  ),
};

export const DIFFICULTY_BAEKJOON_KR = {
  [DIFFICULTY_BAEKJOON.UNRATED]: "Unrated",
  ...Object.fromEntries(
    BJ_TIERS.flatMap((tier) =>
      BJ_STEPS.map((step) => [`${tier}-${step}`, `${BJ_TIER_KR[tier]} ${step}`])
    )
  ),
};

export const DIFFICULTY_PROGRAMMERS = {
  LV0: "lv0",
  LV1: "lv1",
  LV2: "lv2",
  LV3: "lv3",
  LV4: "lv4",
  LV5: "lv5",
};

export const DIFFICULTY_PROGRAMMERS_KR = {
  [DIFFICULTY_PROGRAMMERS.LV0]: "Lv.0",
  [DIFFICULTY_PROGRAMMERS.LV1]: "Lv.1",
  [DIFFICULTY_PROGRAMMERS.LV2]: "Lv.2",
  [DIFFICULTY_PROGRAMMERS.LV3]: "Lv.3",
  [DIFFICULTY_PROGRAMMERS.LV4]: "Lv.4",
  [DIFFICULTY_PROGRAMMERS.LV5]: "Lv.5",
};

export const DIFFICULTY_LEETCODE = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export const DIFFICULTY_LEETCODE_KR = {
  [DIFFICULTY_LEETCODE.EASY]: "Easy",
  [DIFFICULTY_LEETCODE.MEDIUM]: "Medium",
  [DIFFICULTY_LEETCODE.HARD]: "Hard",
};

export const PERSONAL_DIFFICULTY = {
  VERY_EASY: 1,
  EASY: 2,
  MEDIUM: 3,
  HARD: 4,
  VERY_HARD: 5,
};

export const PERSONAL_DIFFICULTY_KR = {
  [PERSONAL_DIFFICULTY.VERY_EASY]: "매우 쉬움",
  [PERSONAL_DIFFICULTY.EASY]: "쉬움",
  [PERSONAL_DIFFICULTY.MEDIUM]: "보통",
  [PERSONAL_DIFFICULTY.HARD]: "어려움",
  [PERSONAL_DIFFICULTY.VERY_HARD]: "매우 어려움",
};
