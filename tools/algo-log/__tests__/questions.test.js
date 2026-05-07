import { describe, it, expect } from "bun:test";
import {
  PLATFORM_CHOICES,
  LANGUAGE_CHOICES,
  CATEGORY_CHOICES,
  questions,
  NEW_PROMPT_QUESTION,
} from "../commands/questions/problem.js";

describe("PLATFORM_CHOICES", () => {
  it("각 항목이 title과 value를 가짐", () => {
    for (const choice of PLATFORM_CHOICES) {
      expect(typeof choice.title).toBe("string");
      expect(typeof choice.value).toBe("string");
    }
  });
});

describe("LANGUAGE_CHOICES", () => {
  it("각 항목이 title과 value를 가짐", () => {
    for (const choice of LANGUAGE_CHOICES) {
      expect(typeof choice.title).toBe("string");
      expect(typeof choice.value).toBe("string");
    }
  });
});

describe("CATEGORY_CHOICES", () => {
  it("각 항목이 title과 value를 가짐", () => {
    for (const choice of CATEGORY_CHOICES) {
      expect(typeof choice.title).toBe("string");
      expect(typeof choice.value).toBe("string");
    }
  });
});

describe("questions.PLATFORM", () => {
  it("initialValue에 맞는 initial 인덱스 반환", () => {
    const platform = PLATFORM_CHOICES[1].value;
    const q = questions.PLATFORM(platform);
    expect(q.initial).toBe(1);
  });

  it("없는 값은 -1 반환", () => {
    const q = questions.PLATFORM("unknown");
    expect(q.initial).toBe(-1);
  });
});

describe("questions.LANGUAGE", () => {
  it("initialValue에 맞는 initial 인덱스 반환", () => {
    const lang = LANGUAGE_CHOICES[0].value;
    const q = questions.LANGUAGE(lang);
    expect(q.initial).toBe(0);
  });

  it("없는 값은 0으로 fallback", () => {
    const q = questions.LANGUAGE("unknown");
    expect(q.initial).toBe(0);
  });
});

describe("questions.NUMBER", () => {
  it("빈 값 입력 시 에러 메세지 반환", () => {
    const { validate } = questions.NUMBER();
    expect(validate("")).not.toBe(true);
    expect(validate(null)).not.toBe(true);
    expect(validate(undefined)).not.toBe(true);
  });

  it("0 이하 입력 시 에러 메세지 반환", () => {
    const { validate } = questions.NUMBER();
    expect(validate(0)).not.toBe(true);
    expect(validate(-1)).not.toBe(true);
  });

  it("양수 입력 시 true 반환", () => {
    const { validate } = questions.NUMBER();
    expect(validate(1)).toBe(true);
    expect(validate(9999)).toBe(true);
  });
});

describe("NEW_PROMPT_QUESTION", () => {
  it("4개의 질문 반환", () => {
    const config = { defaultPlatform: "programmers", language: "js", defaultGenerateInputfile: false };
    const result = NEW_PROMPT_QUESTION(config);
    expect(result).toHaveLength(4);
  });

  it("config.language가 LANGUAGE initial에 반영됨", () => {
    const lang = LANGUAGE_CHOICES[2].value;
    const config = { defaultPlatform: "programmers", language: lang };
    const result = NEW_PROMPT_QUESTION(config);
    const langQuestion = result.find((q) => q.name === "language");
    expect(langQuestion.initial).toBe(2);
  });

  it("defaultGenerateInputfile 없으면 false로 fallback", () => {
    const config = { defaultPlatform: "programmers", language: "js" };
    const result = NEW_PROMPT_QUESTION(config);
    const inputfileQ = result.find((q) => q.name === "inputfile");
    expect(inputfileQ.initial).toBe(false);
  });
});
