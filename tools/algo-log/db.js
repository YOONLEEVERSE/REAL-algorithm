import { JSONFilePreset } from "lowdb/node";
import { getAbsolutePath } from "./utility.js";

const DB_PATH = getAbsolutePath("data", "db.json");

const defaultData = {
  users: [],
  problems: [],
  solvedProblems: [],
  meta: {},
};

let _db = null;

async function getDb() {
  if (!_db) {
    _db = await JSONFilePreset(DB_PATH, defaultData);
  }
  return _db;
}

export async function insert(collection, item) {
  const db = await getDb();
  db.data[collection].push(item);
  await db.write();
  return item;
}

export async function findAll(collection, predicate) {
  const db = await getDb();
  const items = db.data[collection];
  return predicate ? items.filter(predicate) : [...items];
}

export async function findOne(collection, predicate) {
  const db = await getDb();
  return db.data[collection].find(predicate) ?? null;
}

export async function update(collection, predicate, updater) {
  const db = await getDb();
  let count = 0;
  db.data[collection] = db.data[collection].map((item) => {
    if (!predicate(item)) return item;
    count++;
    return typeof updater === "function" ? { ...item, ...updater(item) } : { ...item, ...updater };
  });
  await db.write();
  return count;
}

export async function remove(collection, predicate) {
  const db = await getDb();
  const before = db.data[collection].length;
  db.data[collection] = db.data[collection].filter((item) => !predicate(item));
  await db.write();
  return before - db.data[collection].length;
}

export async function getMeta() {
  const db = await getDb();
  return db.data.meta;
}

export async function setMeta(updates) {
  const db = await getDb();
  db.data.meta = { ...db.data.meta, ...updates };
  await db.write();
}
