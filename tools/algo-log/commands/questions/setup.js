import { PLATFORM_CHOICES, LANGUAGE_CHOICES } from "./problem.js";

export const setupQuestions = {
  USERNAME: {
    type: "text",
    name: "username",
    message: "사용자 이름을 입력해주세요",
    validate: (v) => v.trim().length > 0 || "이름을 입력해주세요",
  },
  BASE_DIR: (initial = "") => ({
    type: "text",
    name: "baseDir",
    message: "풀이 파일이 저장될 디렉토리 이름 (ex: ljh)",
    initial,
    validate: (v) => v.trim().length > 0 || "디렉토리를 입력해주세요",
  }),
  DEFAULT_PLATFORM: (initial = 0) => ({
    type: "select",
    name: "defaultPlatform",
    message: "기본 플랫폼을 선택해주세요",
    choices: PLATFORM_CHOICES,
    initial,
  }),
  LANGUAGE: (initial = 0) => ({
    type: "select",
    name: "language",
    message: "주로 사용하는 언어를 선택해주세요",
    choices: LANGUAGE_CHOICES,
    initial,
  }),
  USE_EXISTING_USER: (username) => ({
    type: "toggle",
    name: "useExisting",
    message: `'${username}' 유저가 이미 존재합니다. 이 유저로 사용하시겠어요?`,
    active: "네",
    inactive: "아니오",
    initial: true,
  }),
};

export const SETUP_PROMPT_QUESTION = (defaults = {}) => [
  setupQuestions.BASE_DIR(defaults.baseDir ?? ""),
  setupQuestions.DEFAULT_PLATFORM(
    Math.max(
      0,
      PLATFORM_CHOICES.findIndex((c) => c.value === defaults.defaultPlatform),
    ),
  ),
  setupQuestions.LANGUAGE(
    Math.max(
      0,
      LANGUAGE_CHOICES.findIndex((c) => c.value === defaults.language),
    ),
  ),
];
