import config from "../config.json" with { type: "json" };

export const PLATFORM_CHOICES = Object.entries(PLATFORM_KR).map(
  ([key, value]) => ({
    title: value,
    value: PLATFORM[key], //PLATFORM
  }),
);

export const CATEGORY_CHOICES = Object.entries(CATEGORY_KR).map(
  ([key, value]) => ({
    title: value,
    value: CATEGORY[key],
  }),
);

export const questions = {
  PLATFORM:
    // 플랫폼
    (initialValue) => ({
      type: "select",
      name: "platform",
      message: "문제 플랫폼을 골라주세요",
      choices: PLATFORM_CHOICES,
      initial: PLATFORM_CHOICES.findIndex(initialValue),
    }),
  // 문제번호
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
  //문제이름
  NAME: (initialValue) => ({
    type: "text",
    name: "name",
    message: "문제의 이름을 입력해주세요",
    initial: initialValue,
  }),

  //문제 유형
  CATEGORY: {
    type: "autocompleteMultiselect",
    name: "category",
    message: "알고리즘 유형을 선택해주세요(선택)",
    choices: CATEGORY_CHOICES,
    instructions:
      "\n [방향키↑↓]: 방향키 이동 | [Space]: 선택/해제 | [Enter]: 완료 | [Type]: 검색",
    hint: "미입력시 '기타'로 분류됩니다.",
  },

  //테스트를 위한 input파일 필요 여부
  INPUTFILE: (initialValue) => ({
    type: "toggle",
    name: "inputfile",
    message: "별도의 입력파일이 필요한가요?",
    initial: initialValue,
    active: "네",
    inactive: "아니오",
  }),
  //재풀이 여부
  IS_REVIEW: (initialValue = false) => ({
    type: "toggle",
    name: "isReview",
    message: "복습인가요?",
    initial: initialValue,
    active: "네",
    inactive: "아니오",
  }),
};

export const NEW_PROMPT_QUESTION = (defaultValues = config) => [
  questions.PLATFORM(defaultValues.defaultPlatform),
  questions.NUMBER(),
  questions.INPUTFILE(config.defaultGenerateInputfile ?? false),
];

export const COMMIT_PROMPT_QUESTION = (defaultValues = config) => [
  questions.PLATFORM, //파일 제목에서 읽음 -> config에서 읽음 -> 없으면 undefined
  questions.NUMBER, // 파일 제목에서 읽음 -> 없으면 undefined
  questions.CATEGORY, // 기본값 x
  questions.IS_REVIEW, // 파일이름에 _2, _3붙어있으면 자동으로 true
];
