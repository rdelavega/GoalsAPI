import { writeFile } from "fs/promises";
import sendResponse from "./sendResponse.js";

async function writeJson(filePath, goals, res) {
  try {
    const content = JSON.stringify(goals, null, 2);
    await writeFile(filePath, content, { encoding: "utf8" });
    return content;
  } catch (err) {
    sendResponse(res, 500, "writeJson Error", err);
  }
}

export default writeJson;
