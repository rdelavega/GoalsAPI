import { writeFile } from "fs/promises";
import sendResponse from "./sendResponse.js";

async function writeJson(res, filePath, goals) {
  try {
    const content = JSON.stringify(goals, null, 2);
    await writeFile(filePath, content, { encoding: "utf8" });
    return content;
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

export default writeJson;
