import { describe, it, expect } from "bun:test";
import { PLATFORM, PLATFORM_KR, LANGUAGE, LANGUAGE_KR, CATEGORY, CATEGORY_KR } from "../constants/index.js";

describe("PLATFORM", () => {
  it("PLATFORM_KR의 키가 PLATFORM 값과 일치", () => {
    const platformValues = Object.values(PLATFORM);
    for (const key of Object.keys(PLATFORM_KR)) {
      expect(platformValues).toContain(key);
    }
  });
});

describe("LANGUAGE", () => {
  it("LANGUAGE_KR의 키가 LANGUAGE 값과 일치", () => {
    const languageValues = Object.values(LANGUAGE);
    for (const key of Object.keys(LANGUAGE_KR)) {
      expect(languageValues).toContain(key);
    }
  });
});

describe("CATEGORY", () => {
  it("CATEGORY_KR의 키가 CATEGORY 값과 일치", () => {
    const categoryValues = Object.values(CATEGORY);
    for (const key of Object.keys(CATEGORY_KR)) {
      expect(categoryValues).toContain(key);
    }
  });
});
