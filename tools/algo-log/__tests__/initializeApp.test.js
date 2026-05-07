import { describe, it, expect, mock } from "bun:test";
import { initializeApp } from "../initializeApp.js";

const makeValidConfig = (overrides = {}) => ({
  userId: 1,
  username: "testuser",
  baseDir: "ljh",
  defaultPlatform: "baekjoon",
  language: "js",
  ...overrides,
});

const makeConfigFields = () => ({
  baseDir: "ljh",
  defaultPlatform: "baekjoon",
  language: "js",
});

const baseDeps = (overrides = {}) => ({
  loadConfig: async () => null,
  dbExists: async () => false,
  saveConfig: async (fields) => fields,
  findOne: async () => null,
  insert: async () => {},
  getMeta: async () => ({}),
  setMeta: async () => {},
  askUsername: async () => ({ username: "testuser" }),
  askConfigFields: async () => makeConfigFields(),
  askUseExistingUser: async () => ({ useExisting: true }),
  ...overrides,
});

describe("initializeApp - resolveUserContext 흐름", () => {
  describe("valid user: config와 userId 모두 유효", () => {
    it("db에서 userId가 확인되면 config를 그대로 반환", async () => {
      const config = makeValidConfig();
      const askUsername = mock(async () => ({ username: "testuser" }));
      const saveConfig = mock(async (f) => f);

      const result = await initializeApp(
        baseDeps({
          loadConfig: async () => config,
          dbExists: async () => true,
          findOne: async () => ({ id: 1, username: "testuser" }),
          askUsername,
          saveConfig,
        }),
      );

      expect(result).toEqual(config);
      expect(askUsername).not.toHaveBeenCalled();
      expect(saveConfig).not.toHaveBeenCalled();
    });
  });

  describe("config 없음 → onboarding", () => {
    it("config가 없으면 onboarding 후 새 config 반환", async () => {
      const result = await initializeApp(
        baseDeps({
          loadConfig: async () => null,
          dbExists: async () => false,
          askUsername: async () => ({ username: "newuser" }),
          askConfigFields: async () => ({
            baseDir: "newdir",
            defaultPlatform: "baekjoon",
            language: "js",
          }),
        }),
      );

      expect(result.username).toBe("newuser");
      expect(result.baseDir).toBe("newdir");
      expect(typeof result.userId).toBe("number");
    });

    it("onboarding 시 saveConfig와 insert가 호출됨", async () => {
      const saveConfig = mock(async (f) => f);
      const insert = mock(async () => {});

      await initializeApp(
        baseDeps({
          loadConfig: async () => null,
          dbExists: async () => false,
          saveConfig,
          insert,
          askUsername: async () => ({ username: "newuser" }),
          askConfigFields: async () => makeConfigFields(),
        }),
      );

      expect(saveConfig).toHaveBeenCalledTimes(1);
      expect(saveConfig).toHaveBeenCalledWith(
        expect.objectContaining({ username: "newuser" }),
      );
      expect(insert).toHaveBeenCalledWith(
        "users",
        expect.objectContaining({ username: "newuser" }),
      );
    });

    it("db는 있고 config만 없어도 onboarding으로 진입", async () => {
      const result = await initializeApp(
        baseDeps({
          loadConfig: async () => null,
          dbExists: async () => true,
          askUsername: async () => ({ username: "newuser" }),
          askConfigFields: async () => makeConfigFields(),
        }),
      );

      expect(result.username).toBe("newuser");
    });
  });

  describe("invalid user → recovery/onboarding", () => {
    it("config는 있지만 userId가 db에 없으면 re-onboarding 후 새 config 반환", async () => {
      const result = await initializeApp(
        baseDeps({
          loadConfig: async () => makeValidConfig({ userId: 999 }),
          dbExists: async () => true,
          findOne: async () => null,
          askUsername: async () => ({ username: "recovereduser" }),
          askConfigFields: async () => makeConfigFields(),
        }),
      );

      expect(result.username).toBe("recovereduser");
      expect(typeof result.userId).toBe("number");
    });

    it("re-onboarding 시 이전 config의 userId는 사용하지 않음", async () => {
      const result = await initializeApp(
        baseDeps({
          loadConfig: async () => makeValidConfig({ userId: 999 }),
          dbExists: async () => true,
          findOne: async () => null,
          askUsername: async () => ({ username: "recovereduser" }),
          askConfigFields: async () => makeConfigFields(),
        }),
      );

      expect(result.userId).not.toBe(999);
    });

    it("re-onboarding 시 insert와 saveConfig가 호출됨", async () => {
      const insert = mock(async () => {});
      const saveConfig = mock(async (f) => f);

      await initializeApp(
        baseDeps({
          loadConfig: async () => makeValidConfig({ userId: 999 }),
          dbExists: async () => true,
          findOne: async () => null,
          insert,
          saveConfig,
          askUsername: async () => ({ username: "recovereduser" }),
          askConfigFields: async () => makeConfigFields(),
        }),
      );

      expect(insert).toHaveBeenCalledWith(
        "users",
        expect.objectContaining({ username: "recovereduser" }),
      );
      expect(saveConfig).toHaveBeenCalledWith(
        expect.objectContaining({ username: "recovereduser" }),
      );
    });
  });
});
