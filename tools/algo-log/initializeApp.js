import fs from "fs/promises";
import { getAbsolutePath } from "./utility.js";
import {
  findOne as _findOne,
  insert as _insert,
  getMeta as _getMeta,
  setMeta as _setMeta,
} from "./db.js";
import {
  askUsername as _askUsername,
  askConfigFields as _askConfigFields,
  askUseExistingUser as _askUseExistingUser,
} from "./services/setup.js";

const CONFIG_PATH = getAbsolutePath("config.json");
const DB_PATH = getAbsolutePath("data", "db.json");

const _loadConfig = async () => {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
};

const _dbExists = async () => {
  try {
    await fs.access(DB_PATH);
    return true;
  } catch {
    return false;
  }
};

const _saveConfig = async (fields) => {
  await fs.writeFile(CONFIG_PATH, JSON.stringify(fields, null, 2), "utf-8");
  return fields;
};

const issueUserId = async (deps) => {
  const meta = await deps.getMeta();
  const nextId = (meta.userIdSeq ?? 0) + 1;
  await deps.setMeta({ userIdSeq: nextId });
  return nextId;
};

const createUser = async (username, deps) => {
  const userId = await issueUserId(deps);
  await deps.insert("users", { id: userId, username });
  return userId;
};

const resolveUser = async (deps) => {
  const { username } = await deps.askUsername();
  if (!username) process.exit(0);

  const existing = await deps.findOne("users", (u) => u.username === username);

  if (existing) {
    const { useExisting } = await deps.askUseExistingUser(username);
    if (useExisting)
      return { userId: existing.id, username: existing.username };

    const { username: newName } = await deps.askUsername();
    if (!newName) process.exit(0);
    const userId = await createUser(newName, deps);
    return { userId, username: newName };
  }

  const userId = await createUser(username, deps);
  return { userId, username };
};

export const initializeApp = async (deps = {}) => {
  const ctx = {
    loadConfig: deps.loadConfig ?? _loadConfig,
    dbExists: deps.dbExists ?? _dbExists,
    saveConfig: deps.saveConfig ?? _saveConfig,
    findOne: deps.findOne ?? _findOne,
    insert: deps.insert ?? _insert,
    getMeta: deps.getMeta ?? _getMeta,
    setMeta: deps.setMeta ?? _setMeta,
    askUsername: deps.askUsername ?? _askUsername,
    askConfigFields: deps.askConfigFields ?? _askConfigFields,
    askUseExistingUser: deps.askUseExistingUser ?? _askUseExistingUser,
  };

  const [config, hasDb] = await Promise.all([ctx.loadConfig(), ctx.dbExists()]);
  const hasConfig = config !== null;

  // 비정상 상태: config는 있는데 db가 없음
  if (hasConfig && !hasDb) {
    console.error(
      "data/db.json이 없습니다. 파일을 복구하거나 config.json을 삭제 후 재실행해주세요.",
    );
    process.exit(1);
  }

  // 정상 상태: config와 db 모두 있고 userId 유효
  if (hasConfig && hasDb) {
    const user = await ctx.findOne("users", (u) => u.id === config.userId);
    if (user) return config;

    // invalid user: config의 userId가 db에 없음 → re-onboarding
    console.log("저장된 사용자 정보를 찾을 수 없습니다. 다시 설정합니다.");
  }

  // onboarding (최초 설정 or invalid user 복구)
  const { userId, username } = await resolveUser(ctx);
  const configFields = await ctx.askConfigFields();

  if (!configFields.baseDir) process.exit(0);

  console.log("설정파일이 정상적으로 생성되었습니다.");

  return ctx.saveConfig({ userId, username, ...configFields });
};
