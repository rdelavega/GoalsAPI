import { writeFile } from "fs/promises";

async function writeJson(filePath, goals, res) {
  const content = JSON.stringify(goals, null, 2);
  await writeFile(filePath, content);
  sendResponse(res, 201, "Write Success", goalData);
}

export default writeJson;
