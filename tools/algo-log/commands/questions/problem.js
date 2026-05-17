import {
  PLATFORM,
  PLATFORM_KR,
  CATEGORY_KR,
  LANGUAGE_KR,
  DIFFICULTY_BAEKJOON_KR,
  DIFFICULTY_PROGRAMMERS_KR,
  DIFFICULTY_LEETCODE_KR,
  PERSONAL_DIFFICULTY_KR,
} from "../../constants/index.js";

export const PLATFORM_CHOICES = Object.entries(PLATFORM_KR).map(
  ([key, value]) => ({
    title: value,
    value: key,
  }),
);

const DIFFICULTY_KR_BY_PLATFORM = {
  [PLATFORM.BAEKJOON]: DIFFICULTY_BAEKJOON_KR,
  [PLATFORM.PROGRAMMERS]: DIFFICULTY_PROGRAMMERS_KR,
  [PLATFORM.LEETCODE]: DIFFICULTY_LEETCODE_KR,
};

export const DIFFICULTY_CHOICES_BY_PLATFORM = Object.fromEntries(
  Object.entries(DIFFICULTY_KR_BY_PLATFORM).map(([platform, krMap]) => [
    platform,
    Object.entries(krMap).map(([key, value]) => ({ title: value, value: key })),
  ]),
);

export const PERSONAL_DIFFICULTY_CHOICES = Object.entries(
  PERSONAL_DIFFICULTY_KR,
).map(([key, value]) => ({ title: value, value: Number(key) }));

export const CATEGORY_CHOICES = Object.entries(CATEGORY_KR).map(
  ([key, value]) => ({
    title: value,
    value: key,
  }),
);

export const LANGUAGE_CHOICES = Object.entries(LANGUAGE_KR).map(
  ([key, value]) => ({
    title: value,
    value: key,
  }),
);

export const questions = {
  PLATFORM: (initialValue) => ({
    type: "select",
    name: "platform",
    message: "문제 플랫폼을 골라주세요",
    choices: PLATFORM_CHOICES,
    initial: PLATFORM_CHOICES.findIndex(
      (choice) => choice.value === initialValue,
    ),
  }),
  NUMBER: (initialValue) => ({
    type: "number",
    name: "number",
    message: "문제의 번호를 입력해주세요",
    initial: initialValue,
    validate: (value) => {
      if (value === undefined || value === null || value === "")
        return "번호를 입력해주세요.";
      if (value <= 0) return "1 이상의 숫자만 입력 가능합니다.";
      return true;
    },
  }),
  NAME: (initialValue) => ({
    type: "text",
    name: "name",
    message: "문제의 이름을 입력해주세요",
    initial: initialValue,
  }),
  CATEGORY: (initialValues = []) => ({
    type: "autocompleteMultiselect",
    name: "category",
    message: "알고리즘 유형을 선택해주세요(선택)",
    choices: CATEGORY_CHOICES.map((c) => ({
      ...c,
      selected: initialValues.includes(c.value),
    })),
    instructions:
      "\n [방향키↑↓]: 방향키 이동 | [Space]: 선택/해제 | [Enter]: 완료 | [Type]: 검색",
    hint: "미입력시 '기타'로 분류됩니다.",
  }),
  LANGUAGE: (initialValue) => ({
    type: "select",
    name: "language",
    message: "언어를 선택해주세요",
    choices: LANGUAGE_CHOICES,
    initial: Math.max(
      0,
      LANGUAGE_CHOICES.findIndex((c) => c.value === initialValue),
    ),
  }),
  INPUTFILE: (initialValue) => ({
    type: "toggle",
    name: "inputfile",
    message: "별도의 입력파일이 필요한가요?",
    initial: initialValue,
    active: "네",
    inactive: "아니오",
  }),
  IS_REVIEW: (initialValue = false) => ({
    type: "toggle",
    name: "isReview",
    message: "복습인가요?",
    initial: initialValue,
    active: "네",
    inactive: "아니오",
  }),
  MEMO: {
    type: "text",
    name: "memo",
    message: "비고를 입력해주세요 (선택)",
  },
  DIFFICULTY: (platform, initialValue) => ({
    type: "select",
    name: "difficulty",
    message: "문제 난이도를 선택해주세요",
    choices: DIFFICULTY_CHOICES_BY_PLATFORM[platform] ?? [],
    initial: initialValue
      ? Math.max(
          0,
          (DIFFICULTY_CHOICES_BY_PLATFORM[platform] ?? []).findIndex(
            (c) => c.value === initialValue,
          ),
        )
      : 0,
  }),
  PERSONAL_DIFFICULTY: {
    type: "select",
    name: "personalDifficulty",
    message: "체감 난이도를 선택해주세요",
    choices: PERSONAL_DIFFICULTY_CHOICES,
  },
};

export const NEW_PROMPT_QUESTION = (config) => [
  questions.PLATFORM(config.defaultPlatform),
  questions.NUMBER(),
  questions.LANGUAGE(config.language),
  questions.INPUTFILE(config.defaultGenerateInputfile ?? false),
];

export const COMMIT_PROMPT_QUESTION = (platform, isReview = false) => [
  questions.DIFFICULTY(platform),
  questions.PERSONAL_DIFFICULTY,
  questions.CATEGORY(),
  questions.IS_REVIEW(isReview),
];

export const SOLVED_PROMPT_QUESTION = (isReview = false) => [
  questions.PERSONAL_DIFFICULTY,
  questions.MEMO,
  questions.IS_REVIEW(isReview),
];

export const NEW_PROBLEM_PROMPT_QUESTION = (platform, isReview = false, fetchedInfo = null) => [
  questions.DIFFICULTY(platform, fetchedInfo?.difficulty),
  questions.PERSONAL_DIFFICULTY,
  questions.CATEGORY(fetchedInfo?.category ?? []),
  questions.MEMO,
  questions.IS_REVIEW(isReview),
];
