import fs from "fs/promises";
import { getAbsolutePath } from "./utility.js";
import { findOne, insert, getMeta, setMeta } from "./db.js";
import {
  askUsername,
  askConfigFields,
  askUseExistingUser,
} from "./prompts/setup.js";

const CONFIG_PATH = getAbsolutePath("config.json");
const DB_PATH = getAbsolutePath("data", "db.json");

const loadConfig = async () => {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
};

const dbExists = async () => {
  try {
    await fs.access(DB_PATH);
    return true;
  } catch {
    return false;
  }
};

const saveConfig = async (fields) => {
  await fs.writeFile(CONFIG_PATH, JSON.stringify(fields, null, 2), "utf-8");
  return fields;
};

const issueUserId = async () => {
  const meta = await getMeta();
  const nextId = (meta.userIdSeq ?? 0) + 1;
  await setMeta({ userIdSeq: nextId });
  return nextId;
};

const createUser = async (username) => {
  const userId = await issueUserId();
  await insert("users", { id: userId, username });
  return userId;
};

const resolveUser = async () => {
  const { username } = await askUsername();
  if (!username) process.exit(0);

  const existing = await findOne("users", (u) => u.username === username);

  if (existing) {
    const { useExisting } = await askUseExistingUser(username);
    if (useExisting)
      return { userId: existing.id, username: existing.username };

    // 다른 이름으로 새 유저 생성
    const { username: newName } = await askUsername();
    if (!newName) process.exit(0);
    const userId = await createUser(newName);
    return { userId, username: newName };
  }

  const userId = await createUser(username);
  return { userId, username };
};

export const initializeApp = async () => {
  const [config, hasDb] = await Promise.all([loadConfig(), dbExists()]);
  const hasConfig = config !== null;

  // 정상 상태
  if (hasConfig && hasDb) return config;

  // 비정상 상태: config는 있는데 db가 없음
  if (hasConfig && !hasDb) {
    console.error(
      "data/db.json이 없습니다. 파일을 복구하거나 config.json을 삭제 후 재실행해주세요.",
    );
    process.exit(1);
  }

  // 최초 셋업 (둘 다 없음) or config만 없는 경우
  const { userId, username } = await resolveUser();
  const configFields = await askConfigFields();

  if (!configFields.baseDir) process.exit(0);

  console.log("설정파일이 정상적으로 생성되었습니다.");

  return saveConfig({ userId, username, ...configFields });
};
