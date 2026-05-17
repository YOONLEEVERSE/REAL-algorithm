import { readFile, writeFile } from "node:fs/promises";
import { buildReadmeContent } from "../services/readme.js";
import { getAbsolutePath } from "../utility.js";

const dbPath = getAbsolutePath("data", "db.mock.json");
const mockDb = JSON.parse(await readFile(dbPath, "utf-8"));

// userId 1 = ljh
const userId = 1;
const solvedProblems = mockDb.solvedProblems.filter(
  (sp) => sp.userId === userId,
);
const content = buildReadmeContent(mockDb.problems, solvedProblems);

const outPath = getAbsolutePath("data", "README.mock.md");
await writeFile(outPath, content, "utf-8");

console.log(`생성 완료: ${outPath}\n`);
console.log(content);
