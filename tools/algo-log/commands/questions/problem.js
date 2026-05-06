import {
  PLATFORM,
  PLATFORM_KR,
  CATEGORY,
  CATEGORY_KR,
} from "../../constants/index.js";

export const PLATFORM_CHOICES = Object.entries(PLATFORM_KR).map(
  ([key, value]) => ({
    title: value,
    value: PLATFORM[key],
  }),
);

export const CATEGORY_CHOICES = Object.entries(CATEGORY_KR).map(
  ([key, value]) => ({
    title: value,
    value: CATEGORY[key],
  }),
);

export const questions = {
  PLATFORM: (initialValue) => ({
    type: "select",
    name: "platform",
    message: "문제 플랫폼을 골라주세요",
    choices: PLATFORM_CHOICES,
    initial: PLATFORM_CHOICES.findIndex(initialValue),
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
  CATEGORY: {
    type: "autocompleteMultiselect",
    name: "category",
    message: "알고리즘 유형을 선택해주세요(선택)",
    choices: CATEGORY_CHOICES,
    instructions:
      "\n [방향키↑↓]: 방향키 이동 | [Space]: 선택/해제 | [Enter]: 완료 | [Type]: 검색",
    hint: "미입력시 '기타'로 분류됩니다.",
  },
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
};

export const NEW_PROMPT_QUESTION = (config) => [
  questions.PLATFORM(config.defaultPlatform),
  questions.NUMBER(),
  questions.INPUTFILE(config.defaultGenerateInputfile ?? false),
];

export const COMMIT_PROMPT_QUESTION = (config) => [
  questions.PLATFORM,
  questions.NUMBER,
  questions.CATEGORY,
  questions.IS_REVIEW,
];
